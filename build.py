#!/usr/bin/env python3
"""shell.html + demos/*.js -> dist/index.html  (사용: python3 build.py [출력경로])"""
from pathlib import Path
import sys
HERE = Path(__file__).resolve().parent
ORDER = ['progress','commerce','action','input','search','layout','nav','feedback','motion','style','gesture','data','media']
out = HERE / 'dist' / 'index.html'
if len(sys.argv) > 1:
    out = Path(sys.argv[1])
shell = (HERE / 'shell.html').read_text(encoding='utf-8')
parts = []
for cat in ORDER:
    # <cat>.js 다음에 <cat>_2.js, <cat>_3.js … (추가분) 순서로 읽는다
    for f in [HERE / 'demos' / f'{cat}.js'] + sorted((HERE / 'demos').glob(f'{cat}_[0-9]*.js')):
        if not f.exists():
            continue
        js = f.read_text(encoding='utf-8').replace('</script', '<\\/script')
        parts.append(f'<script>/* {cat} */\ntry{{\n{js}\n}}catch(e){{console.error("[load {cat}]",e)}}\n</script>')
html = shell.replace('<!--DEMOS-->', '\n'.join(parts))
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(html, encoding='utf-8')
print(f'built {out} ({len(html)//1024} KB, {len(parts)} category files)')
