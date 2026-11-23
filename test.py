#!/usr/bin/env python3
"""Playwright 검사: python3 test.py [--cat progress] [--dark] [--noshots] [--file path.html]
- 콘솔 에러/페이지 에러, 데모 개수, 빈 스테이지, 스테이지 밖 넘침, 0.3초 vs 2.2초 화면 변화 여부 검사
- 스크린샷: shots/<cat>/<id>_a.png (0.3s), _b.png (2.2s)  (--dark 이면 shots_dark/)
"""
import argparse, json, sys, subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
ap = argparse.ArgumentParser()
ap.add_argument('--cat'); ap.add_argument('--dark', action='store_true')
ap.add_argument('--noshots', action='store_true'); ap.add_argument('--file')
ap.add_argument('--width', type=int, default=1280)
a = ap.parse_args()

if a.file:
    target = Path(a.file).resolve()
else:
    target = HERE / 'shots' / f"_test_build_{a.cat or 'all'}{'_dark' if a.dark else ''}.html"
    target.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run([sys.executable, str(HERE / 'build.py'), str(target)], check=True, capture_output=True)

shotdir = HERE / ('shots_dark' if a.dark else 'shots')
problems = []
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': a.width, 'height': 900}, color_scheme='dark' if a.dark else 'light', device_scale_factor=1)
    errs = []
    pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
    pg.on('pageerror', lambda e: errs.append('PAGEERROR ' + str(e)))
    pg.goto(target.as_uri())
    pg.wait_for_timeout(300)
    ids = pg.evaluate("""cat => __UIDEX_TEST.cards.filter(c=>!cat||c.el.dataset.cat===cat).map(c=>[c.d.id,c.el.dataset.cat])""", a.cat)
    print(f'demos found: {len(ids)}' + (f' in {a.cat}' if a.cat else ''))
    for did, cat in ids:
        before = len(errs)
        el = pg.locator(f'#{did}')
        el.scroll_into_view_if_needed()
        pg.evaluate("id=>{const c=__UIDEX_TEST.cards.find(x=>x.d.id===id);__UIDEX_TEST.play(c)}", did)
        stage = pg.locator(f'#{did} .stage')
        pg.wait_for_timeout(300)
        d = shotdir / cat; d.mkdir(parents=True, exist_ok=True)
        s1 = stage.screenshot(path=str(d / f'{did}_a.png') if not a.noshots else None)
        pg.wait_for_timeout(1900)
        s2 = stage.screenshot(path=str(d / f'{did}_b.png') if not a.noshots else None)
        info = pg.evaluate("""id=>{const s=document.querySelector('#'+id+' .stage');const r=s.getBoundingClientRect();
          let over=0;s.querySelectorAll('*').forEach(e=>{const q=e.getBoundingClientRect();if(q.width&&q.height&&(q.right>r.right+40||q.left<r.left-40))over++});
          const d=__UIDEX_TEST.cards.find(x=>x.d.id===id).d;
          return {kids:s.children.length,text:s.innerText.trim().length,over,
            prompt:(d.prompt||'').length,desc:(d.desc||'').length,ko:d.ko,en:d.en,
            badcss:(d.css||'').split('}').map(x=>x.trim()).filter(x=>x&&!x.startsWith('@')&&!/^(from|to|\\d+%)/.test(x.split('{')[0].trim())&&x.includes('{')&&!x.split('{')[0].split(',').every(sel=>sel.trim().startsWith('.d-'+id)||/^(from|to|\\d)/.test(sel.trim()))).length}}""", did)
        new_errs = errs[before:]
        flags = []
        if info['kids'] == 0: flags.append('EMPTY')
        if s1 == s2: flags.append('STATIC(0.3s==2.2s)')
        if info['over']: flags.append(f"OVERFLOW x{info['over']}")
        if not (100 <= info['prompt'] <= 260): flags.append(f"PROMPT_LEN {info['prompt']}")
        if not info['desc']: flags.append('NO_DESC')
        if info['badcss']: flags.append(f"UNSCOPED_CSS x{info['badcss']}")
        if new_errs: flags.append('ERRORS: ' + ' | '.join(new_errs[:3]))
        pg.evaluate("id=>{const c=__UIDEX_TEST.cards.find(x=>x.d.id===id);__UIDEX_TEST.stop(c)}", did)
        line = f"{did} {info['ko']} / {info['en']}: " + ('OK' if not flags else ', '.join(flags))
        print(line)
        if flags: problems.append(line)
    if errs and not ids:
        print('ERRORS:', errs[:5])
    b.close()
print(f'\n== {len(problems)} flagged ==')
for x in problems: print(' -', x)
