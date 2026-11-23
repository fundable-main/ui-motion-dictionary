/* nav — 내비게이션 추가분 (nv11~nv20) */
const nv2P = {
  home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  heart: '<path d="M12 20s-7.5-4.6-9.3-9.2C1.5 7.6 3.6 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.4 0 5.5 3.1 4.3 6.3C19.5 15.4 12 20 12 20z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
  fold: '<path d="m11 6-6 6 6 6M19 6l-6 6 6 6"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  out: '<path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M15 8l4 4-4 4M19 12H9"/>',
  bell: '<path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 8 8 6 8-6"/>',
  chat: '<path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-5 4v-4H6a2 2 0 0 1-2-2z"/>',
  note: '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.500" cy="16" r="2.5"/>',
  cam: '<rect x="3" y="7" width="18" height="13" rx="3"/><path d="M8 7l1.5-3h5L16 7"/><circle cx="12" cy="13.500" r="3.2"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'
};
const nv2I = (n, s = 16, w = 2) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${nv2P[n]}</svg>`;
/* 스테이지 기준 요소 중심 좌표 */
const nv2Pos = (stage, t) => {
  const s = stage.getBoundingClientRect(), r = t.getBoundingClientRect();
  return { x: r.left - s.left + r.width / 2, y: r.top - s.top + r.height / 2 };
};
/* 탭(누름) 물결 */
const nv2Tap = (stage, t) => {
  if (!t) return;
  const p = nv2Pos(stage, t), d = document.createElement('span');
  d.style.cssText = `position:absolute;left:${p.x - 15}px;top:${p.y - 15}px;width:30px;height:30px;border-radius:50%;background:var(--text);pointer-events:none;z-index:30;opacity:0`;
  stage.appendChild(d);
  const a = d.animate([{ transform: 'scale(.5)', opacity: .32 }, { transform: 'scale(1.5)', opacity: 0 }], { duration: 520, easing: 'ease-out' });
  a.onfinish = () => d.remove();
};
/* 가짜 마우스 포인터(자동 시연용) */
const nv2Ptr = stage => {
  const d = document.createElement('span');
  d.style.cssText = 'position:absolute;left:0;top:0;width:16px;height:16px;pointer-events:none;z-index:40;color:var(--text);opacity:0;transition:opacity .2s';
  d.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="var(--surface)" stroke-width="1.6" stroke-linejoin="round"><path d="M5 3l14 8-6.200 1.600L10 19z"/></svg>';
  stage.appendChild(d);
  return {
    set(x, y) { d.style.opacity = 1; d.style.transform = `translate(${x - 4}px,${y - 2}px)`; },
    glide(x, y, ms) { d.style.transition = `opacity .2s,transform ${ms}ms cubic-bezier(.4,0,.2,1)`; this.set(x, y); },
    gone() { d.style.opacity = 0; }
  };
};
/* 손가락(터치 포인트) 반투명 원 */
const nv2Finger = stage => {
  const d = document.createElement('span');
  d.style.cssText = 'position:absolute;left:0;top:0;width:26px;height:26px;margin:-13px 0 0 -13px;border-radius:50%;background:var(--text);opacity:0;pointer-events:none;z-index:40;transition:opacity .2s;box-shadow:0 0 0 2px var(--surface)';
  stage.appendChild(d);
  return {
    set(x, y) { d.style.opacity = .3; d.style.transform = `translate(${x}px,${y}px)`; },
    gone() { d.style.opacity = 0; }
  };
};
const nv2Ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

UIDEX.add('nav', [
  /* nv11 접이식 사이드바 */
  {
    id: 'nv11', ko: '접이식 사이드바', en: 'Collapsible sidebar', pair: 'nv05',
    desc: '늘 보이는 왼쪽 메뉴가 아이콘만 남게 좁아져요. 드로어처럼 사라지진 않아요.',
    prompt: '「접이식 사이드바(Collapsible sidebar)」를 만들어 줘. 항상 보이는 왼쪽 메뉴가 토글 버튼을 누르면 너비 240px에서 아이콘만 남는 64px로 0.3초 동안 cubic-bezier(.2,.8,.2,1)로 좁아지고, 본문은 그만큼 넓어져. 접힌 상태에선 아이콘에 툴팁과 aria-label을 달아 줘. 드로어와 헷갈리지 않게 딤으로 본문을 덮거나 메뉴를 완전히 숨기지는 마.',
    css: `
.d-nv11 .win{width:240px;height:168px;border-radius:12px;background:var(--surface);box-shadow:var(--shadow);overflow:hidden;display:flex}
.d-nv11 .sb{width:104px;flex:none;background:var(--surface-2);border-right:1px solid var(--line);padding:8px 6px;display:flex;flex-direction:column;gap:2px;overflow:hidden;transition:width .3s cubic-bezier(.2,.8,.2,1)}
.d-nv11 .col .sb{width:41px}
.d-nv11 .top{display:flex;align-items:center;height:28px;margin-bottom:6px}
.d-nv11 .top b{flex:1;min-width:0;overflow:hidden;white-space:nowrap;padding-left:6px;font-size:14px;font-weight:800;letter-spacing:-.03em;transition:opacity .2s}
.d-nv11 .top b em{font-style:normal;color:var(--accent)}
.d-nv11 .tg{width:28px;height:28px;flex:none;border:0;border-radius:8px;background:transparent;color:var(--muted);display:grid;place-items:center;padding:0;cursor:pointer}
.d-nv11 .tg:hover{background:var(--line);color:var(--text)}
.d-nv11 .tg svg{transition:transform .3s cubic-bezier(.2,.8,.2,1)}
.d-nv11 .col .tg svg{transform:rotate(180deg)}
.d-nv11 .lk{display:flex;align-items:center;gap:8px;width:100%;flex:none;height:28px;border:0;background:transparent;padding:0 6px;border-radius:8px;font:inherit;font-size:12px;font-weight:600;color:var(--text);text-align:left;white-space:nowrap;overflow:hidden;cursor:pointer}
.d-nv11 .lk svg{flex:none;color:var(--muted)}
.d-nv11 .lk span{transition:opacity .2s}
.d-nv11 .lk:hover{background:var(--line)}
.d-nv11 .lk.on{background:var(--accent-soft);color:var(--accent)}
.d-nv11 .lk.on svg{color:var(--accent)}
.d-nv11 .lk:focus-visible,.d-nv11 .tg:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}
.d-nv11 .col .lk span,.d-nv11 .col .top b{opacity:0}
.d-nv11 .main{flex:1;min-width:0;padding:12px}
.d-nv11 .main h4{margin:0 0 3px;font-size:14px;letter-spacing:-.03em;white-space:nowrap}
.d-nv11 .main p{margin:0 0 10px;font-size:11px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-nv11 .gr{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.d-nv11 .gr .ui-thumb{height:40px}
`,
    html: `<div class="win">
  <nav class="sb" aria-label="주 메뉴">
    <div class="top"><b>stay<em>.</em></b><button class="tg" type="button" aria-label="사이드바 접기" aria-expanded="true">${nv2I('fold')}</button></div>
    <button class="lk on" type="button" aria-current="page">${nv2I('home')}<span>홈</span></button>
    <button class="lk" type="button">${nv2I('cal')}<span>예약 내역</span></button>
    <button class="lk" type="button">${nv2I('heart')}<span>찜 목록</span></button>
    <button class="lk" type="button">${nv2I('gear')}<span>설정</span></button>
  </nav>
  <div class="main"><h4>이번 달 예약</h4><p>확정 4건 · 대기 1건</p><div class="gr"><div class="ui-thumb"></div><div class="ui-thumb"></div><div class="ui-thumb"></div><div class="ui-thumb"></div></div></div>
</div>`,
    run(el, ctx) {
      const win = el.querySelector('.win'), tg = el.querySelector('.tg'), as = [...el.querySelectorAll('.lk')];
      /* 접히면 글자가 안 보이므로 아이콘에 툴팁(title)과 aria-label을 붙인다 */
      const set = c => {
        win.classList.toggle('col', c); tg.setAttribute('aria-expanded', !c); tg.setAttribute('aria-label', c ? '사이드바 펼치기' : '사이드바 접기');
        as.forEach(a => { const t = a.textContent.trim(); if (c) { a.title = t; a.setAttribute('aria-label', t); } else { a.removeAttribute('title'); a.removeAttribute('aria-label'); } });
      };
      let user = false;
      ctx.timeout(() => { nv2Tap(el, tg); set(true); }, 700);
      ctx.timeout(() => { if (!user) { nv2Tap(el, tg); set(false); } }, 2800);
      ctx.on(tg, 'click', () => { user = true; set(!win.classList.contains('col')); });
      as.forEach(a => ctx.on(a, 'click', () => as.forEach(x => { x.classList.toggle('on', x === a); if (x === a) x.setAttribute('aria-current', 'page'); else x.removeAttribute('aria-current'); })));
    }
  },

  /* nv12 메가 메뉴 */
  {
    id: 'nv12', ko: '메가 메뉴', en: 'Mega menu',
    desc: '상단 메뉴에 올리면 하위 메뉴가 여러 열로 묶인 큰 패널로 펼쳐져요.',
    prompt: '「메가 메뉴(Mega menu)」를 만들어 줘. 상단 메뉴 항목에 포인터를 올리거나 포커스하면 화면 너비 패널이 0.2초 동안 ease-out으로 8px 내려오며 펼쳐지고, 하위 링크는 제목이 붙은 3개 열로 묶어 보여 줘. 다른 항목으로 옮기면 패널은 그대로 두고 내용만 바꿔. 버튼엔 aria-expanded를 넣고 Esc로 닫히게 해 줘.',
    css: `
.d-nv12 .win{width:240px;height:168px;border-radius:12px;background:var(--surface);box-shadow:var(--shadow);overflow:hidden;position:relative}
.d-nv12 .bar{height:36px;display:flex;align-items:center;gap:2px;padding:0 6px 0 12px;border-bottom:1px solid var(--line);position:relative;z-index:2;background:var(--surface)}
.d-nv12 .bar b{font-size:14px;font-weight:800;letter-spacing:-.03em;margin-right:auto}
.d-nv12 .bar b em{font-style:normal;color:var(--accent)}
.d-nv12 .mi{height:36px;border:0;background:none;padding:0 7px;font:inherit;font-size:12px;font-weight:600;color:var(--text);display:flex;align-items:center;gap:3px;cursor:pointer;position:relative}
.d-nv12 .mi svg{color:var(--muted);transition:transform .2s ease-out}
.d-nv12 .mi:after{content:"";position:absolute;left:7px;right:7px;bottom:-1px;height:2px;border-radius:2px;background:var(--accent);transform:scaleX(0);transition:transform .2s ease-out}
.d-nv12 .mi.on{color:var(--accent)}
.d-nv12 .mi.on svg{transform:rotate(180deg);color:var(--accent)}
.d-nv12 .mi.on:after{transform:scaleX(1)}
.d-nv12 .body{padding:12px;display:grid;gap:8px}
.d-nv12 .body .ui-thumb{height:62px}
.d-nv12 .pn{position:absolute;left:0;right:0;top:36px;background:var(--surface);border-bottom:1px solid var(--line);box-shadow:0 12px 18px -12px rgba(0,0,0,.35);padding:10px 12px 12px;display:grid;grid-template-columns:repeat(3,1fr);gap:8px;opacity:0;transform:translateY(-8px);pointer-events:none;visibility:hidden;transition:opacity .2s ease-out,transform .2s ease-out,visibility 0s .2s;z-index:1}
.d-nv12 .open .pn{opacity:1;transform:none;pointer-events:auto;visibility:visible;transition-delay:0s}
.d-nv12 .cl{min-width:0;animation:nv12-in .28s cubic-bezier(.2,.8,.2,1) both}
.d-nv12 .cl:nth-child(2){animation-delay:.04s}
.d-nv12 .cl:nth-child(3){animation-delay:.08s}
.d-nv12 .cl h6{margin:0 0 4px;padding-bottom:4px;border-bottom:1px solid var(--line);font-size:11px;font-weight:700;color:var(--muted);white-space:nowrap}
.d-nv12 .cl button{display:block;width:calc(100% + 8px);height:21px;line-height:21px;margin:0 -4px;border:0;background:none;padding:0 4px;border-radius:6px;font:inherit;font-size:12px;font-weight:600;color:var(--text);text-align:left;white-space:nowrap;cursor:pointer}
.d-nv12 .cl button:hover,.d-nv12 .cl button.hv,.d-nv12 .cl button:focus-visible{background:var(--accent-soft);color:var(--accent);outline:0}
.d-nv12 .mi:focus-visible{outline:2px solid var(--accent);outline-offset:-3px;border-radius:8px}
@keyframes nv12-in{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}
`,
    html: `<div class="win">
  <div class="bar"><b>stay<em>.</em></b>
    <button class="mi" type="button" aria-expanded="false">숙소${nv2I('down', 10, 2.6)}</button>
    <button class="mi" type="button" aria-expanded="false">체험${nv2I('down', 10, 2.6)}</button>
    <button class="mi" type="button" aria-expanded="false">교통${nv2I('down', 10, 2.6)}</button>
  </div>
  <div class="body"><div class="ui-thumb"></div><div class="ui-line" style="width:78%"></div><div class="ui-line" style="width:52%"></div></div>
  <div class="pn"></div>
</div>`,
    run(el, ctx) {
      const win = el.querySelector('.win'), mis = [...el.querySelectorAll('.mi')], pn = el.querySelector('.pn');
      const data = [
        [['국내 숙소', '호텔', '펜션', '풀빌라'], ['해외 숙소', '리조트', '료칸', '한인 민박'], ['테마', '오션뷰', '반려견', '온천']],
        [['액티비티', '서핑', '카약', '스노클링'], ['클래스', '쿠킹', '도자기', '향수'], ['티켓', '전시', '공연', '테마파크']],
        [['항공', '국내선', '국제선', '특가'], ['렌터카', '제주', '내륙', '전기차'], ['기차·버스', '고속철', '고속버스', '공항버스']]
      ];
      let cur = -1;
      const open = i => {
        if (i !== cur) pn.innerHTML = data[i].map(c => `<div class="cl"><h6>${c[0]}</h6>${c.slice(1).map(t => `<button type="button">${t}</button>`).join('')}</div>`).join('');
        cur = i; win.classList.add('open');
        mis.forEach((m, k) => { m.classList.toggle('on', k === i); m.setAttribute('aria-expanded', k === i); });
      };
      const close = () => { cur = -1; win.classList.remove('open'); mis.forEach(m => { m.classList.remove('on'); m.setAttribute('aria-expanded', false); }); };
      const ptr = nv2Ptr(el);
      let user = false;
      const auto = (ms, fn) => ctx.timeout(() => { if (!user) fn(); }, ms);
      const s0 = nv2Pos(el, win);
      auto(150, () => { ptr.set(s0.x - 40, s0.y + 50); });
      auto(220, () => { const p = nv2Pos(el, mis[0]); ptr.glide(p.x, p.y + 4, 380); });
      auto(620, () => open(0));
      auto(1350, () => { const p = nv2Pos(el, mis[1]); ptr.glide(p.x, p.y + 4, 300); });
      auto(1660, () => open(1));
      auto(1950, () => { const a = pn.querySelectorAll('.cl')[1].querySelectorAll('button')[1]; const p = nv2Pos(el, a); ptr.glide(p.x - 6, p.y + 2, 420); ctx.timeout(() => { if (!user) a.classList.add('hv'); }, 420); });
      const take = () => { if (user) return; user = true; ptr.gone(); pn.querySelectorAll('.hv').forEach(a => a.classList.remove('hv')); };
      let mute = false;
      mis.forEach((m, i) => {
        ctx.on(m, 'pointerenter', () => { take(); open(i); });
        ctx.on(m, 'focus', () => { if (mute) return; take(); open(i); });
        ctx.on(m, 'click', () => { take(); open(i); });
      });
      ctx.on(win, 'pointerleave', () => { if (user) close(); });
      /* 키보드 초점이 메뉴 밖으로 나가면 닫는다 */
      ctx.on(win, 'focusout', e => { if (user && !mute && !win.contains(e.relatedTarget)) close(); });
      /* Esc: 패널 안에 초점이 있었으면 연 버튼으로 돌려놓고 닫는다 */
      ctx.on(win, 'keydown', e => {
        if (e.key !== 'Escape') return;
        const k = cur; take();
        if (k >= 0 && pn.contains(document.activeElement)) { mute = true; mis[k].focus(); mute = false; }
        close();
      });
      ctx.on(pn, 'click', e => { if (e.target.closest('button')) close(); });
    }
  },

  /* nv13 스크롤 숨김 헤더 */
  {
    id: 'nv13', ko: '스크롤 숨김 헤더', en: 'Hide-on-scroll header', pair: 'mo03',
    desc: '내리면 헤더가 위로 숨고 올리면 다시 나와요. 스티키 헤더는 계속 붙어 있어요.',
    prompt: '「스크롤 숨김 헤더(Hide-on-scroll header)」를 만들어 줘. 아래로 스크롤하면 헤더가 0.25초 동안 ease-out으로 translateY(-100%) 되어 위로 숨고, 위로 6px 이상 올리면 바로 다시 내려와. 맨 위 40px 안에서는 항상 보이게 하고, 헤더에 키보드 포커스가 들어오면 다시 나타나게 해 줘. 스티키 헤더와 헷갈리지 않게 내리는 동안 계속 고정해 두지는 마.',
    css: `
.d-nv13 .hd{position:absolute;left:0;right:0;top:0;height:42px;display:flex;align-items:center;justify-content:space-between;padding:0 7px 0 14px;background:var(--surface);border-bottom:1px solid var(--line);z-index:2;transition:transform .25s ease-out}
.d-nv13 .hd.hide{transform:translateY(-100%)}
.d-nv13 .hd b{font-size:14px;letter-spacing:-.02em}
.d-nv13 .hd button{width:28px;height:28px;border:0;border-radius:8px;background:none;padding:0;display:grid;place-items:center;color:var(--muted);cursor:pointer}
.d-nv13 .hd button:hover{background:var(--surface-2);color:var(--text)}
.d-nv13 .hd button:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}
.d-nv13 .sc{position:absolute;left:0;right:0;top:0;bottom:26px;overflow-y:auto;padding:46px 12px 8px;scrollbar-width:none}
.d-nv13 .sc::-webkit-scrollbar{display:none}
.d-nv13 .it{display:flex;gap:10px;align-items:center;padding:6px 0;border-bottom:1px solid var(--line)}
.d-nv13 .it .ui-thumb{width:40px;height:40px;flex:none}
.d-nv13 .it b{display:block;font-size:12px;font-weight:600;letter-spacing:-.02em}
.d-nv13 .it span{font-size:11px;color:var(--muted)}
.d-nv13 .st{position:absolute;left:0;right:0;bottom:0;height:26px;background:var(--surface-2);border-top:1px solid var(--line);color:var(--text);font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;gap:5px;white-space:nowrap;z-index:3;pointer-events:none}
.d-nv13 .st svg{transition:transform .25s ease-out}
.d-nv13 .st.up svg{transform:rotate(180deg)}
`,
    html: `<div class="ui-phone">
  <div class="hd"><b>제주 숙소</b><button type="button" aria-label="검색">${nv2I('search', 18)}</button></div>
  <div class="sc" tabindex="0" aria-label="숙소 목록">
    <div class="it"><div class="ui-thumb"></div><div><b>애월 바다 펜션</b><span>1박 129,000원</span></div></div>
    <div class="it"><div class="ui-thumb"></div><div><b>성산 일출 호텔</b><span>1박 98,000원</span></div></div>
    <div class="it"><div class="ui-thumb"></div><div><b>협재 독채 스테이</b><span>1박 210,000원</span></div></div>
    <div class="it"><div class="ui-thumb"></div><div><b>서귀포 숲속 리조트</b><span>1박 175,000원</span></div></div>
    <div class="it"><div class="ui-thumb"></div><div><b>함덕 오션뷰 룸</b><span>1박 142,000원</span></div></div>
    <div class="it"><div class="ui-thumb"></div><div><b>중문 풀빌라</b><span>1박 320,000원</span></div></div>
    <div class="it"><div class="ui-thumb"></div><div><b>한림 돌담집</b><span>1박 88,000원</span></div></div>
  </div>
  <div class="st" aria-live="polite">${nv2I('down', 12, 3)}<span>스크롤해 보세요</span></div>
</div>`,
    run(el, ctx) {
      const hd = el.querySelector('.hd'), sc = el.querySelector('.sc'), st = el.querySelector('.st'), lab = st.querySelector('span');
      let last = 0, user = false;
      /* 헤더 안에 키보드 초점이 있으면 숨기지 않는다 */
      const held = () => hd.contains(document.activeElement);
      const set = (hide, up) => {
        const h = hide && !held();
        hd.classList.toggle('hide', h); st.classList.toggle('up', up);
        lab.textContent = up ? '올리는 중 · 헤더 다시 표시' : h ? '내리는 중 · 헤더 숨김' : hide ? '포커스 · 헤더 계속 표시' : '맨 위 · 헤더 표시';
      };
      ctx.on(hd, 'focusin', () => { if (!hd.classList.contains('hide')) return; hd.classList.remove('hide'); lab.textContent = '포커스 · 헤더 다시 표시'; });
      ctx.on(sc, 'scroll', () => {
        const y = sc.scrollTop;
        if (y < 40) { set(false, y < last && y > 2); last = y; return; }
        if (Math.abs(y - last) < 6) return;
        set(y > last, y < last); last = y;
      });
      const stop = () => { user = true; };
      ctx.on(sc, 'wheel', stop, { passive: true });
      ctx.on(sc, 'pointerdown', stop);
      ctx.on(sc, 'touchstart', stop, { passive: true });
      const keys = [[400, 0], [1050, 150], [1250, 150], [1600, 84], [1850, 84], [2700, 230]];
      ctx.loop(t => {
        if (user) return false;
        if (t >= 2700) { sc.scrollTop = 230; return false; }
        for (let i = 0; i < keys.length - 1; i++) {
          const a = keys[i], b = keys[i + 1];
          if (t >= a[0] && t < b[0]) { sc.scrollTop = a[1] + (b[1] - a[1]) * nv2Ease((t - a[0]) / (b[0] - a[0])); break; }
        }
      });
    }
  },

  /* nv14 스크롤스파이 */
  {
    id: 'nv14', ko: '스크롤스파이', en: 'Scrollspy',
    desc: '본문을 스크롤하면 목차에서 지금 읽는 섹션이 자동으로 강조돼요.',
    prompt: '「스크롤스파이(Scrollspy)」 목차를 만들어 줘. 본문을 스크롤하면 IntersectionObserver로 화면 위쪽에 걸린 섹션을 찾아 목차의 해당 항목을 파란색 굵은 글씨로 바꾸고, 왼쪽 2px 표시 막대가 0.25초 동안 ease-out으로 그 항목까지 미끄러져. 목차를 누르면 그 섹션으로 부드럽게 스크롤하고, 현재 항목엔 aria-current="location"을 넣어 줘.',
    css: `
.d-nv14 .win{width:240px;height:168px;border-radius:12px;background:var(--surface);box-shadow:var(--shadow);overflow:hidden;display:flex}
.d-nv14 .toc{width:76px;flex:none;padding:10px 0 0 10px;border-right:1px solid var(--line);position:relative}
.d-nv14 .toc small{display:block;font-size:11px;font-weight:700;color:var(--muted);margin-bottom:6px}
.d-nv14 .ls{position:relative;border-left:2px solid var(--line)}
.d-nv14 .mk{position:absolute;left:-2px;top:4px;width:2px;height:18px;border-radius:2px;background:var(--accent);transition:transform .25s ease-out}
.d-nv14 .ls button{display:block;width:100%;height:26px;border:0;background:none;padding:0 0 0 9px;text-align:left;font:inherit;font-size:12px;font-weight:500;color:var(--muted);cursor:pointer;transition:color .2s}
.d-nv14 .ls button:hover{color:var(--text)}
.d-nv14 .ls button[aria-current]{color:var(--accent);font-weight:700}
.d-nv14 .pane{flex:1;min-width:0;overflow-y:auto;position:relative;padding:0 12px;scrollbar-width:thin}
.d-nv14 .sec{min-height:104px;padding-top:12px}
.d-nv14 .sec:last-child{min-height:168px}
.d-nv14 .sec h5{margin:0 0 4px;font-size:14px;letter-spacing:-.03em}
.d-nv14 .sec p{margin:0 0 8px;font-size:11px;line-height:1.45;color:var(--muted)}
.d-nv14 .sec .ui-thumb{height:30px}
`,
    html: `<div class="win">
  <nav class="toc" aria-label="목차"><small>목차</small>
    <div class="ls"><i class="mk"></i><button type="button" aria-current="location">소개</button><button type="button">객실</button><button type="button">위치</button><button type="button">후기</button></div>
  </nav>
  <div class="pane" tabindex="0">
    <div class="sec"><h5>소개</h5><p>바다가 보이는 애월의 작은 독채 숙소예요.</p><div class="ui-thumb"></div></div>
    <div class="sec"><h5>객실</h5><p>침실 2개, 최대 4인까지 머물 수 있어요.</p><div class="ui-thumb"></div></div>
    <div class="sec"><h5>위치</h5><p>공항에서 차로 30분, 해변까지 걸어서 5분.</p><div class="ui-thumb"></div></div>
    <div class="sec"><h5>후기</h5><p>평점 4.8 · 후기 126개가 모였어요.</p><div class="ui-thumb"></div><div class="ui-line" style="width:70%;margin-top:10px"></div></div>
  </div>
</div>`,
    run(el, ctx) {
      const pane = el.querySelector('.pane'), secs = [...el.querySelectorAll('.sec')], bts = [...el.querySelectorAll('.ls button')], mk = el.querySelector('.mk');
      let cur = 0, user = false, tw = 0;
      const mark = i => {
        if (i === cur) return; cur = i;
        bts.forEach((b, k) => { if (k === i) b.setAttribute('aria-current', 'location'); else b.removeAttribute('aria-current'); });
        mk.style.transform = `translateY(${i * 26}px)`;
      };
      const spy = () => { let i = 0; secs.forEach((s, k) => { if (s.offsetTop <= pane.scrollTop + 40) i = k; }); mark(i); };
      ctx.on(pane, 'scroll', spy);
      const stop = () => { user = true; tw++; };
      ctx.on(pane, 'wheel', stop, { passive: true });
      ctx.on(pane, 'pointerdown', stop);
      ctx.on(pane, 'touchstart', stop, { passive: true });
      const go = (to, ms) => { const id = ++tw, from = pane.scrollTop; ctx.loop(t => { if (id !== tw) return false; const k = Math.min(1, t / ms); pane.scrollTop = from + (to - from) * nv2Ease(k); return k < 1; }); };
      bts.forEach((b, i) => ctx.on(b, 'click', () => { user = true; go(secs[i].offsetTop, 350); }));
      ctx.loop(t => {
        if (user) return false;
        if (t < 450) return;
        const max = pane.scrollHeight - pane.clientHeight, k = Math.min(1, (t - 450) / 2300);
        pane.scrollTop = max * nv2Ease(k);
        return k < 1;
      });
    }
  },

  /* nv15 독 */
  {
    id: 'nv15', ko: '독', en: 'Dock',
    desc: '화면 아래 아이콘 줄이에요. 포인터에 가까운 아이콘일수록 크게 부풀어요.',
    prompt: '「독(Dock)」을 만들어 줘. 화면 아래에 앱 아이콘 6개를 둥근 바 안에 한 줄로 놓고, 포인터와의 가로 거리에 따라 아이콘 크기를 1배에서 최대 1.65배까지 부드러운 곡선으로 키워(영향 반경 76px, 아래쪽 기준 정렬). 포인터가 떠나면 0.2초 동안 ease-out으로 원래 크기로 돌아가. 가장 가까운 아이콘 위엔 이름 말풍선을 띄우고, 키보드 포커스에도 똑같이 반응하게 해 줘.',
    css: `
.d-nv15 .dk{width:100%;height:100%;position:relative}
.d-nv15 .wn{position:absolute;left:50%;top:14px;width:156px;height:92px;margin-left:-78px;border-radius:10px;background:var(--surface);box-shadow:var(--shadow);padding:22px 12px 0;display:grid;gap:7px;align-content:start}
.d-nv15 .wn:before{content:"";position:absolute;left:10px;top:9px;width:6px;height:6px;border-radius:50%;background:var(--line);box-shadow:10px 0 0 var(--line),20px 0 0 var(--line)}
.d-nv15 .bar{position:absolute;left:50%;bottom:12px;transform:translateX(-50%);height:38px;padding:0 8px 6px;display:flex;align-items:flex-end;gap:6px;border-radius:14px;background:var(--surface);border:1px solid var(--line);box-shadow:var(--shadow)}
.d-nv15 .ic{width:26px;height:26px;flex:none;border:0;padding:0;border-radius:28%;display:grid;place-items:center;color:var(--accent-text);background:var(--accent);cursor:pointer;position:relative;transition:width .09s linear,height .09s linear}
.d-nv15 .rest .ic{transition:width .2s ease-out,height .2s ease-out}
.d-nv15 .ic svg{width:58%;height:58%}
.d-nv15 .ic:nth-child(2){background:var(--success)}
.d-nv15 .ic:nth-child(3){background:var(--warn)}
.d-nv15 .ic:nth-child(4){background:var(--danger)}
.d-nv15 .ic:nth-child(5){background:var(--text);color:var(--surface)}
.d-nv15 .ic:nth-child(6){background:var(--muted)}
.d-nv15 .ic.hop{animation:nv15-hop .45s cubic-bezier(.3,0,.4,1)}
.d-nv15 .ic:after{content:"";position:absolute;left:50%;bottom:-5px;width:3px;height:3px;margin-left:-1.500px;border-radius:50%;background:var(--muted);opacity:0}
.d-nv15 .ic.run:after{opacity:1}
.d-nv15 .tip{position:absolute;left:50%;bottom:100%;margin-bottom:7px;transform:translateX(-50%) translateY(3px);padding:2px 7px;border-radius:6px;background:var(--text);color:var(--surface);font-size:11px;font-weight:700;line-height:1.5;white-space:nowrap;opacity:0;transition:opacity .12s,transform .12s;pointer-events:none}
.d-nv15 .ic.near .tip{opacity:1;transform:translateX(-50%)}
@keyframes nv15-hop{40%{transform:translateY(-12px)}100%{transform:none}}
`,
    html: `<div class="dk">
  <div class="wn"><div class="ui-line" style="width:70%"></div><div class="ui-line" style="width:92%"></div><div class="ui-line" style="width:48%"></div></div>
  <div class="bar rest" role="toolbar" aria-label="독">
    <button class="ic run" type="button" aria-label="파일">${nv2I('folder')}<span class="tip">파일</span></button>
    <button class="ic" type="button" aria-label="메일">${nv2I('mail')}<span class="tip">메일</span></button>
    <button class="ic" type="button" aria-label="메시지">${nv2I('chat')}<span class="tip">메시지</span></button>
    <button class="ic" type="button" aria-label="음악">${nv2I('note')}<span class="tip">음악</span></button>
    <button class="ic" type="button" aria-label="카메라">${nv2I('cam')}<span class="tip">카메라</span></button>
    <button class="ic" type="button" aria-label="설정">${nv2I('gear')}<span class="tip">설정</span></button>
  </div>
</div>`,
    run(el, ctx) {
      const bar = el.querySelector('.bar'), ics = [...el.querySelectorAll('.ic')];
      const B = 26, G = 6, R = 76, n = ics.length;
      const cx = i => el.clientWidth / 2 + (i - (n - 1) / 2) * (B + G);
      const mag = x => {
        bar.classList.remove('rest');
        let best = 0, bd = 1e9;
        ics.forEach((ic, i) => {
          const d = Math.abs(x - cx(i)), t = Math.max(0, 1 - d / R), s = 1 + .65 * t * t * (3 - 2 * t);
          ic.style.width = ic.style.height = (B * s).toFixed(1) + 'px';
          if (d < bd) { bd = d; best = i; }
        });
        ics.forEach((ic, i) => ic.classList.toggle('near', i === best && bd < 26));
      };
      const rest = () => { bar.classList.add('rest'); ics.forEach(ic => { ic.style.width = ic.style.height = ''; ic.classList.remove('near'); }); };
      const ptr = nv2Ptr(el);
      let user = false;
      const y0 = () => el.clientHeight - 34;
      const path = [[350, cx(0) - 26], [1300, cx(n - 1) + 8], [1450, cx(n - 1) + 8], [2000, cx(2)]];
      ctx.loop(t => {
        if (user) return false;
        if (t < path[0][0]) return;
        let x = path[path.length - 1][1];
        for (let i = 0; i < path.length - 1; i++) {
          const a = path[i], b = path[i + 1];
          if (t >= a[0] && t < b[0]) { x = a[1] + (b[1] - a[1]) * nv2Ease((t - a[0]) / (b[0] - a[0])); break; }
        }
        ptr.set(x, y0()); mag(x);
        return t < 2000;
      });
      ctx.on(el, 'pointermove', e => {
        if (!user) { user = true; ptr.gone(); }
        const r = el.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        if (y > r.height - 84) mag(x); else rest();
      });
      ctx.on(el, 'pointerleave', () => { if (user) rest(); });
      ics.forEach((ic, i) => {
        ctx.on(ic, 'focus', () => { user = true; ptr.gone(); mag(cx(i)); });
        ctx.on(ic, 'click', () => { ic.classList.remove('hop'); void ic.offsetWidth; ic.classList.add('hop', 'run'); });
      });
    }
  },

  /* nv16 풀스크린 메뉴 */
  {
    id: 'nv16', ko: '풀스크린 메뉴', en: 'Fullscreen menu', pair: 'nv01',
    desc: '메뉴 버튼을 누르면 화면 전체를 덮고 큰 글자 메뉴가 한 줄씩 떠올라요.',
    prompt: '「풀스크린 메뉴(Fullscreen menu)」를 만들어 줘. 메뉴 버튼을 누르면 짙은 색 면이 위에서 0.45초 동안 cubic-bezier(.7,0,.2,1)로 내려와 화면 전체를 덮고, 큰 글자 항목 4개가 줄 마스크 아래에서 70ms 간격으로 올라와. 열린 동안 뒤 화면 스크롤을 잠그고 포커스를 메뉴 안에 가둬 줘. 햄버거 메뉴와 헷갈리지 않게 헤더 아래 작은 목록으로 펼치지는 마.',
    css: `
.d-nv16 .hd{position:absolute;left:0;right:0;top:0;height:44px;display:flex;align-items:center;justify-content:space-between;padding:0 10px 0 14px;z-index:3}
.d-nv16 .logo{font-size:15px;font-weight:800;letter-spacing:-.03em;transition:color .3s .1s}
.d-nv16 .mb{height:26px;padding:0 11px;border-radius:999px;border:1.500px solid var(--text);background:transparent;color:var(--text);font:inherit;font-size:12px;font-weight:700;cursor:pointer;transition:color .3s .1s,border-color .3s .1s}
.d-nv16 .open .logo{color:var(--surface)}
.d-nv16 .open .mb{color:var(--surface);border-color:var(--surface)}
.d-nv16 .body{padding:52px 14px 0;display:grid;gap:8px}
.d-nv16 .body .hl{font-size:17px;font-weight:800;letter-spacing:-.03em;line-height:1.25}
.d-nv16 .body .ui-thumb{height:48px}
.d-nv16 .ov{position:absolute;inset:0;background:var(--text);color:var(--surface);transform:translateY(-101%);padding:44px 14px 0;z-index:2;visibility:hidden;transition:transform .45s cubic-bezier(.7,0,.2,1),visibility 0s .45s}
.d-nv16 .open .ov{transform:none;visibility:visible;transition-delay:0s}
.d-nv16 .ov button{display:block;width:100%;height:27px;border:0;background:none;padding:0;font:inherit;color:inherit;text-align:left;overflow:hidden;cursor:pointer}
.d-nv16 .ov button:focus-visible{outline:2px solid var(--surface);outline-offset:-2px;border-radius:4px}
.d-nv16 .mb:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.d-nv16 .ov button span{display:flex;align-items:baseline;gap:8px;height:27px;line-height:27px;font-size:21px;font-weight:800;letter-spacing:-.04em;transform:translateY(105%);transition:transform .5s cubic-bezier(.2,.8,.2,1),opacity .2s}
.d-nv16 .ov button i{font-style:normal;font-size:11px;font-weight:600;letter-spacing:0;opacity:.55}
.d-nv16 .open .ov button span{transform:none}
.d-nv16 .open .ov button:nth-child(1) span{transition-delay:.28s,0s}
.d-nv16 .open .ov button:nth-child(2) span{transition-delay:.35s,0s}
.d-nv16 .open .ov button:nth-child(3) span{transition-delay:.42s,0s}
.d-nv16 .open .ov button:nth-child(4) span{transition-delay:.49s,0s}
.d-nv16 .ov:hover button span{opacity:.45}
.d-nv16 .ov button:hover span,.d-nv16 .ov button:focus-visible span{opacity:1}
.d-nv16 .ov small{position:absolute;left:14px;bottom:8px;font-size:11px;opacity:0;transition:opacity .3s}
.d-nv16 .open .ov small{opacity:.7;transition-delay:.6s}
`,
    html: `<div class="ui-phone">
  <div class="hd"><span class="logo">stay.</span><button class="mb" type="button" aria-expanded="false">메뉴</button></div>
  <div class="body"><div class="hl">이번 주말,<br>어디로 떠날까요?</div><div class="ui-thumb"></div><div class="ui-line" style="width:60%"></div></div>
  <nav class="ov" aria-label="전체 메뉴"><button type="button"><span><i>01</i>숙소</span></button><button type="button"><span><i>02</i>체험</span></button><button type="button"><span><i>03</i>매거진</span></button><button type="button"><span><i>04</i>고객센터</span></button><small>로그인 · 회원가입</small></nav>
</div>`,
    run(el, ctx) {
      const ph = el.querySelector('.ui-phone'), b = el.querySelector('.mb'), its = [...el.querySelectorAll('.ov button')];
      const isOpen = () => ph.classList.contains('open');
      const set = o => { ph.classList.toggle('open', o); b.setAttribute('aria-expanded', o); b.textContent = o ? '닫기' : '메뉴'; };
      /* 자동 시연은 초점을 건드리지 않는다(페이지 초점을 빼앗지 않게) */
      ctx.timeout(() => { nv2Tap(el, b); set(true); }, 550);
      /* 직접 열면 첫 항목으로 초점을 옮기고, 닫으면 메뉴 버튼으로 돌려준다 */
      ctx.on(b, 'click', () => { const o = !isOpen(); set(o); if (o) its[0].focus({ preventScroll: true }); });
      its.forEach(a => ctx.on(a, 'click', () => { set(false); b.focus({ preventScroll: true }); }));
      ctx.on(ph, 'keydown', e => {
        if (!isOpen()) return;
        if (e.key === 'Escape') { set(false); b.focus({ preventScroll: true }); return; }
        if (e.key !== 'Tab') return;
        /* 포커스 가두기: 닫기 버튼 ↔ 마지막 항목 사이를 돈다 */
        const ring = [b, ...its], i = ring.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); ring[ring.length - 1].focus({ preventScroll: true }); }
        else if (!e.shiftKey && i === ring.length - 1) { e.preventDefault(); ring[0].focus({ preventScroll: true }); }
      });
    }
  },

  /* nv17 스크롤 탭 */
  {
    id: 'nv17', ko: '스크롤 탭', en: 'Scrollable tabs', pair: 'nv04',
    desc: '탭이 많아 가로로 넘쳐요. 고른 탭이 가운데로 스르륵 딸려 와요.',
    prompt: '「스크롤 탭(Scrollable tabs)」을 만들어 줘. 탭 7개를 줄바꿈 없이 한 줄에 놓아 가로로 넘치게 하고, 탭을 누르면 그 탭이 줄 가운데에 오도록 0.35초 동안 ease-out으로 가로 스크롤돼. 2px 밑줄도 함께 옮기고, 양 끝엔 20px 페이드로 더 있음을 알려 줘. 좌우 화살표 키로도 이동되게 해 줘. 상단 탭과 헷갈리지 않게 탭을 화면 너비에 맞춰 균등 분할하지는 마.',
    css: `
.d-nv17 .ui-phone{display:flex;flex-direction:column}
.d-nv17 h4{margin:0;padding:13px 14px 5px;font-size:15px;letter-spacing:-.03em}
.d-nv17 .tw{position:relative;border-bottom:1px solid var(--line)}
.d-nv17 .tw:before,.d-nv17 .tw:after{content:"";position:absolute;top:0;bottom:0;width:22px;z-index:2;pointer-events:none;transition:opacity .2s}
.d-nv17 .tw:before{left:0;background:linear-gradient(90deg,var(--surface),transparent)}
.d-nv17 .tw:after{right:0;background:linear-gradient(270deg,var(--surface),transparent)}
.d-nv17 .tw.s0:before,.d-nv17 .tw.s1:after{opacity:0}
.d-nv17 .tabs{display:flex;gap:4px;padding:0 10px;overflow-x:auto;position:relative;scrollbar-width:none;cursor:grab}
.d-nv17 .tabs::-webkit-scrollbar{display:none}
.d-nv17 .tabs:after{content:"";flex:0 0 6px}
.d-nv17 .tab{flex:none;border:0;background:none;padding:8px 5px 9px;font:inherit;font-size:13px;font-weight:600;color:var(--muted);white-space:nowrap;cursor:pointer;transition:color .2s}
.d-nv17 .tab[aria-selected="true"]{color:var(--text)}
.d-nv17 .ul{position:absolute;bottom:0;left:0;height:2px;border-radius:2px;background:var(--accent);transition:transform .3s cubic-bezier(.2,.8,.2,1),width .3s cubic-bezier(.2,.8,.2,1)}
.d-nv17 .pan{padding:10px 14px;display:grid;gap:8px;transition:opacity .15s}
.d-nv17 .pan.sw{opacity:0}
.d-nv17 .pan>b{font-size:12px;font-weight:700}
.d-nv17 .pan>b em{font-style:normal;color:var(--accent)}
.d-nv17 .it{display:flex;gap:9px;align-items:center}
.d-nv17 .it .ui-thumb{width:34px;height:34px;flex:none}
.d-nv17 .it div:last-child{flex:1;display:grid;gap:6px}
`,
    html: `<div class="ui-phone">
  <h4>숙소 유형</h4>
  <div class="tw s0"><div class="tabs" role="tablist"><button class="tab" role="tab" aria-selected="true">전체</button><button class="tab" role="tab" aria-selected="false" tabindex="-1">호텔</button><button class="tab" role="tab" aria-selected="false" tabindex="-1">펜션</button><button class="tab" role="tab" aria-selected="false" tabindex="-1">풀빌라</button><button class="tab" role="tab" aria-selected="false" tabindex="-1">캠핑</button><button class="tab" role="tab" aria-selected="false" tabindex="-1">한옥</button><button class="tab" role="tab" aria-selected="false" tabindex="-1">리조트</button><span class="ul"></span></div></div>
  <div class="pan"><b><em>전체</em> 248곳</b><div class="it"><div class="ui-thumb"></div><div><div class="ui-line" style="width:82%"></div><div class="ui-line" style="width:50%"></div></div></div><div class="it"><div class="ui-thumb"></div><div><div class="ui-line" style="width:68%"></div><div class="ui-line" style="width:40%"></div></div></div></div>
</div>`,
    run(el, ctx) {
      const tw = el.querySelector('.tw'), box = el.querySelector('.tabs'), tabs = [...el.querySelectorAll('.tab')], ul = el.querySelector('.ul'), pan = el.querySelector('.pan'), lab = pan.querySelector('b');
      const cnt = [248, 86, 52, 31, 24, 12, 15];
      let cur = 0, tk = 0;
      const place = i => { ul.style.width = (tabs[i].offsetWidth - 10) + 'px'; ul.style.transform = `translateX(${tabs[i].offsetLeft + 5}px)`; };
      ul.style.transition = 'none'; place(0); void ul.offsetWidth; ul.style.transition = '';
      const edge = () => { const m = box.scrollWidth - box.clientWidth; tw.classList.toggle('s0', box.scrollLeft < 2); tw.classList.toggle('s1', box.scrollLeft > m - 2); };
      ctx.on(box, 'scroll', edge); edge();
      const center = i => {
        const t = tabs[i], m = box.scrollWidth - box.clientWidth, from = box.scrollLeft;
        const to = Math.max(0, Math.min(m, t.offsetLeft + t.offsetWidth / 2 - box.clientWidth / 2)), id = ++tk;
        ctx.loop(ms => { if (id !== tk) return false; const k = Math.min(1, ms / 350); box.scrollLeft = from + (to - from) * (1 - Math.pow(1 - k, 3)); return k < 1; });
      };
      const sel = i => {
        if (i === cur) { center(i); return; }
        cur = i;
        tabs.forEach((t, k) => { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; });
        place(i); center(i);
        pan.classList.add('sw');
        ctx.timeout(() => { lab.innerHTML = `<em>${tabs[i].textContent}</em> ${cnt[i]}곳`; pan.classList.remove('sw'); }, 150);
      };
      ctx.timeout(() => { nv2Tap(el, tabs[4]); sel(4); }, 550);
      ctx.timeout(() => { nv2Tap(el, tabs[6]); sel(6); }, 1150);
      ctx.timeout(() => { nv2Tap(el, tabs[3]); sel(3); }, 1750);
      let down = null, moved = false;
      tabs.forEach((t, i) => ctx.on(t, 'click', () => { if (!moved) sel(i); }));
      ctx.on(box, 'keydown', e => {
        const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return; e.preventDefault();
        const i = Math.max(0, Math.min(tabs.length - 1, cur + d)); sel(i); tabs[i].focus({ preventScroll: true });
      });
      ctx.on(box, 'pointerdown', e => { if (e.pointerType === 'mouse') { down = { x: e.clientX, s: box.scrollLeft }; moved = false; tk++; } });
      ctx.on(el, 'pointermove', e => { if (!down) return; const dx = e.clientX - down.x; if (Math.abs(dx) > 4) moved = true; if (moved) box.scrollLeft = down.s - dx; });
      ctx.on(el, 'pointerup', () => { down = null; ctx.timeout(() => { moved = false; }, 0); });
      ctx.on(el, 'pointerleave', () => { down = null; moved = false; });
    }
  },

  /* nv18 프로필 메뉴 */
  {
    id: 'nv18', ko: '프로필 메뉴', en: 'Account menu',
    desc: '오른쪽 위 아바타를 누르면 이름·설정·로그아웃이 담긴 메뉴가 열려요.',
    prompt: '「프로필 메뉴(Account menu)」를 만들어 줘. 헤더 오른쪽 위 원형 아바타를 누르면 바로 아래에 너비 200px 드롭다운이 오른쪽 위 모서리를 기준으로 scale(.92)에서 1로 0.2초 동안 ease-out으로 열려. 맨 위엔 이름과 이메일, 그 아래 내 정보·설정, 구분선 뒤 빨간 로그아웃을 둬. 바깥 클릭과 Esc로 닫히고 위아래 화살표 키로 항목을 옮기게 해 줘.',
    css: `
.d-nv18 .hd{height:42px;display:flex;align-items:center;gap:8px;padding:0 10px 0 14px;border-bottom:1px solid var(--line)}
.d-nv18 .hd b{font-size:15px;font-weight:800;letter-spacing:-.03em;margin-right:auto}
.d-nv18 .hd b em{font-style:normal;color:var(--accent)}
.d-nv18 .bl{display:flex;color:var(--muted)}
.d-nv18 .av{width:28px;height:28px;border-radius:50%;border:0;padding:0;background:var(--accent);color:var(--accent-text);font:inherit;font-size:12px;font-weight:700;cursor:pointer;transition:box-shadow .2s}
.d-nv18 .open .av{box-shadow:0 0 0 2px var(--surface),0 0 0 4px var(--accent)}
.d-nv18 .body{padding:12px 14px;display:grid;gap:8px}
.d-nv18 .body .ui-thumb{height:58px}
.d-nv18 .mn{position:absolute;right:8px;top:38px;width:152px;padding:4px;border-radius:12px;background:var(--surface);border:1px solid var(--line);box-shadow:0 10px 24px -8px rgba(0,0,0,.35);transform-origin:calc(100% - 14px) 0;transform:scale(.92) translateY(-4px);opacity:0;pointer-events:none;visibility:hidden;transition:opacity .2s ease-out,transform .2s ease-out,visibility 0s .2s;z-index:3}
.d-nv18 .open .mn{opacity:1;transform:none;pointer-events:auto;visibility:visible;transition-delay:0s}
.d-nv18 .who{padding:3px 8px 5px;border-bottom:1px solid var(--line);margin-bottom:3px}
.d-nv18 .who b{display:block;font-size:12px}
.d-nv18 .who span{display:block;font-size:11px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-nv18 .mn button{display:flex;align-items:center;gap:8px;width:100%;height:24px;border:0;border-radius:7px;background:none;padding:0 8px;font:inherit;font-size:12px;font-weight:600;color:var(--text);cursor:pointer;text-align:left}
.d-nv18 .mn button svg{color:var(--muted)}
.d-nv18 .mn button:hover,.d-nv18 .mn button.hv,.d-nv18 .mn button:focus-visible{background:var(--surface-2);outline:0}
.d-nv18 .mn hr{border:0;border-top:1px solid var(--line);margin:3px 0}
.d-nv18 .mn button.dg,.d-nv18 .mn button.dg svg{color:var(--danger)}
`,
    html: `<div class="ui-phone">
  <div class="hd"><b>stay<em>.</em></b><span class="bl">${nv2I('bell', 18)}</span><button class="av" type="button" aria-label="계정 메뉴" aria-haspopup="menu" aria-expanded="false">여</button></div>
  <div class="body"><div class="ui-thumb"></div><div class="ui-line" style="width:80%"></div><div class="ui-line" style="width:55%"></div><div class="ui-line" style="width:68%"></div></div>
  <div class="mn" role="menu"><div class="who"><b>여행자 님</b><span>traveler@example.com</span></div>
    <button type="button" role="menuitem">${nv2I('user', 14)}내 정보</button>
    <button type="button" role="menuitem">${nv2I('gear', 14)}설정</button>
    <hr>
    <button type="button" role="menuitem" class="dg">${nv2I('out', 14)}로그아웃</button>
  </div>
</div>`,
    run(el, ctx) {
      const ph = el.querySelector('.ui-phone'), av = el.querySelector('.av'), mn = el.querySelector('.mn'), its = [...mn.querySelectorAll('button')];
      const set = o => { ph.classList.toggle('open', o); av.setAttribute('aria-expanded', o); if (!o) its.forEach(b => b.classList.remove('hv')); };
      let user = false;
      ctx.timeout(() => { nv2Tap(el, av); set(true); }, 550);
      ctx.timeout(() => { if (!user && ph.classList.contains('open')) its[1].classList.add('hv'); }, 1500);
      ctx.on(av, 'click', e => { user = true; e.stopPropagation(); set(!ph.classList.contains('open')); });
      ctx.on(mn, 'click', e => { user = true; e.stopPropagation(); if (e.target.closest('button')) set(false); });
      ctx.on(mn, 'pointerenter', () => { user = true; its.forEach(b => b.classList.remove('hv')); });
      ctx.on(el, 'click', () => set(false));
      ctx.on(ph, 'keydown', e => {
        if (e.key === 'Escape') { set(false); av.focus(); return; }
        const d = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
        if (!d || !ph.classList.contains('open')) return; e.preventDefault();
        const i = its.indexOf(document.activeElement);
        /* 초점이 메뉴 밖(아바타)이면 ↓는 첫 항목, ↑는 마지막 항목 */
        its[i < 0 ? (d > 0 ? 0 : its.length - 1) : (i + d + its.length) % its.length].focus({ preventScroll: true });
      });
    }
  },

  /* nv19 인덱스 스크러버 */
  {
    id: 'nv19', ko: '인덱스 스크러버', en: 'Index scrubber',
    desc: '목록 옆 ㄱㄴㄷ 띠를 손가락으로 훑으면 그 초성 위치로 바로 건너뛰어요.',
    prompt: '「인덱스 스크러버(Index scrubber)」를 만들어 줘. 가나다순 목록 오른쪽에 ㄱ~ㅎ 초성을 세로 띠로 세우고, 띠를 누른 채 위아래로 훑으면 손가락 아래 초성 구간으로 목록이 애니메이션 없이 즉시 점프해. 훑는 동안 띠 왼쪽에 지름 44px 말풍선으로 현재 초성을 크게 보여 주고 떼면 0.3초 뒤 사라지게 해. 띠엔 role="slider"와 aria-valuetext를 넣어 줘.',
    css: `
.d-nv19 .hd{height:30px;display:flex;align-items:center;padding:0 12px;font-size:13px;font-weight:700;letter-spacing:-.02em;border-bottom:1px solid var(--line)}
.d-nv19 .ls{position:absolute;left:0;right:22px;top:31px;bottom:0;overflow-y:auto;scrollbar-width:none;padding-bottom:74px}
.d-nv19 .ls::-webkit-scrollbar{display:none}
.d-nv19 .sh{position:sticky;top:0;height:20px;line-height:20px;padding:0 12px;background:var(--surface-2);font-size:11px;font-weight:700;color:var(--muted);z-index:1}
.d-nv19 .rw{height:28px;line-height:28px;padding:0 12px;font-size:12px;border-bottom:1px solid var(--line)}
.d-nv19 .ix{position:absolute;right:0;top:31px;bottom:0;width:22px;display:flex;flex-direction:column;justify-content:center;touch-action:none;cursor:pointer;user-select:none;-webkit-user-select:none}
.d-nv19 .ix span{height:12px;line-height:12px;text-align:center;font-size:11px;font-weight:700;color:var(--muted);transition:color .1s,transform .1s}
.d-nv19 .ix span.on{color:var(--accent);transform:scale(1.25)}
.d-nv19 .bb{position:absolute;right:30px;top:0;width:44px;height:44px;border-radius:50% 50% 6px 50%;background:var(--accent);color:var(--accent-text);display:grid;place-items:center;font-size:22px;font-weight:800;opacity:0;transform:scale(.6);transform-origin:100% 100%;transition:opacity .15s,transform .2s cubic-bezier(.2,.8,.2,1);pointer-events:none;z-index:3;box-shadow:var(--shadow)}
.d-nv19 .bb.on{opacity:1;transform:none}
`,
    html: `<div class="ui-phone">
  <div class="hd">여행지 찾기</div>
  <div class="ls"></div>
  <div class="ix" role="slider" tabindex="0" aria-label="초성 색인" aria-orientation="vertical" aria-valuemin="0" aria-valuemax="11" aria-valuenow="0" aria-valuetext="ㄱ"></div>
  <div class="bb" aria-hidden="true">ㄱ</div>
</div>`,
    run(el, ctx) {
      const ls = el.querySelector('.ls'), ix = el.querySelector('.ix'), bb = el.querySelector('.bb');
      const data = [['ㄱ', '가평', '강릉', '경주'], ['ㄴ', '남해', '논산'], ['ㄷ', '단양', '담양', '대구'], ['ㅁ', '목포', '무주'], ['ㅂ', '보성', '부산'], ['ㅅ', '속초', '순천'], ['ㅇ', '안동', '여수'], ['ㅈ', '전주', '제주'], ['ㅊ', '청주', '춘천'], ['ㅌ', '태안', '통영'], ['ㅍ', '파주', '포항'], ['ㅎ', '하동', '홍천']];
      ls.innerHTML = data.map(d => `<div class="sec"><div class="sh">${d[0]}</div>${d.slice(1).map(t => `<div class="rw">${t}</div>`).join('')}</div>`).join('');
      ix.innerHTML = data.map(d => `<span>${d[0]}</span>`).join('');
      const secs = [...ls.querySelectorAll('.sec')], ks = [...ix.querySelectorAll('span')], n = data.length;
      let cur = -1, drag = false, user = false, busy = false;
      const mark = i => { if (i === cur) return; cur = i; ks.forEach((k, j) => k.classList.toggle('on', j === i)); ix.setAttribute('aria-valuenow', i); ix.setAttribute('aria-valuetext', data[i][0]); };
      const top = s => s.getBoundingClientRect().top - ls.getBoundingClientRect().top + ls.scrollTop;
      const jump = i => {
        i = Math.max(0, Math.min(n - 1, i));
        busy = true; ls.scrollTop = top(secs[i]); mark(i);
        const pr = el.querySelector('.ui-phone').getBoundingClientRect(), kr = ks[i].getBoundingClientRect();
        bb.textContent = data[i][0];
        bb.style.top = Math.max(4, Math.min(132, kr.top - pr.top + kr.height / 2 - 40)) + 'px';
        bb.classList.add('on');
      };
      const hide = () => { bb.classList.remove('on'); busy = false; };
      const idx = y => { const a = ks[0].getBoundingClientRect().top, b = ks[n - 1].getBoundingClientRect().bottom; return Math.floor((y - a) / (b - a) * n); };
      mark(0);
      ctx.on(ls, 'scroll', () => { if (busy) return; let i = 0; secs.forEach((s, k) => { if (top(s) <= ls.scrollTop + 2) i = k; }); mark(i); });
      /* 자동 시연: 손가락이 ㄱ → ㅈ 까지 훑는다 */
      const fg = nv2Finger(el);
      ctx.loop(t => {
        if (user) return false;
        if (t < 400) return;
        if (t > 2700) { fg.gone(); hide(); return false; }
        const k = nv2Ease(Math.min(1, Math.max(0, (t - 600) / 1100))), f = k * 7;
        const a = nv2Pos(el, ks[0]), b = nv2Pos(el, ks[7]);
        fg.set(a.x, a.y + (b.y - a.y) * k);
        jump(Math.round(f));
      });
      const take = () => { if (!user) { user = true; fg.gone(); } };
      ctx.on(ix, 'pointerdown', e => { take(); drag = true; try { ix.setPointerCapture(e.pointerId); } catch (_) {} jump(idx(e.clientY)); e.preventDefault(); });
      ctx.on(ix, 'pointermove', e => { if (drag) jump(idx(e.clientY)); });
      const end = () => { if (!drag) return; drag = false; ctx.timeout(() => { if (!drag) hide(); }, 300); };
      ctx.on(ix, 'pointerup', end);
      ctx.on(ix, 'pointercancel', end);
      ctx.on(ix, 'keydown', e => {
        const d = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
        if (!d) return; e.preventDefault(); take(); jump(cur + d); ctx.timeout(() => { if (!drag) hide(); }, 600);
      });
    }
  },

  /* nv20 내비게이션 레일 */
  {
    id: 'nv20', ko: '내비게이션 레일', en: 'Navigation rail', pair: 'nv03',
    desc: '넓은 화면에서 왼쪽에 세로로 선 아이콘 탭이에요. 하단 탭바의 세로판이에요.',
    prompt: '「내비게이션 레일(Navigation rail)」을 만들어 줘. 넓은 화면 왼쪽에 너비 80px 세로 띠를 고정하고 아이콘 위·라벨 아래로 쌓은 탭 4개를 놓아. 탭을 누르면 아이콘 뒤 알약 모양 배경이 0.25초 동안 ease-out으로 퍼지며 파란색이 돼. 위아래 화살표 키 이동과 aria-orientation="vertical"을 넣어 줘. 하단 탭바와 헷갈리지 않게 화면 아래 가로 줄로 두지는 마.',
    css: `
.d-nv20 .win{width:240px;height:168px;border-radius:12px;background:var(--surface);box-shadow:var(--shadow);overflow:hidden;display:flex}
.d-nv20 .rail{width:56px;flex:none;background:var(--surface-2);border-right:1px solid var(--line);padding:8px 0;display:flex;flex-direction:column;align-items:center;gap:2px}
.d-nv20 .tab{width:56px;height:36px;border:0;background:none;padding:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;font:inherit;font-size:11px;font-weight:600;line-height:13px;color:var(--muted);cursor:pointer;transition:color .2s}
.d-nv20 .pl{position:relative;width:38px;height:20px;display:grid;place-items:center}
.d-nv20 .pl:before{content:"";position:absolute;inset:0;border-radius:10px;background:var(--accent-soft);opacity:0;transform:scaleX(.35);transition:opacity .2s,transform .25s ease-out}
.d-nv20 .pl svg{position:relative}
.d-nv20 .tab:hover .pl:before{opacity:.5;transform:none}
.d-nv20 .tab[aria-selected="true"]{color:var(--accent)}
.d-nv20 .tab[aria-selected="true"] .pl:before{opacity:1;transform:none}
.d-nv20 .main{flex:1;min-width:0;padding:14px 14px 0;transition:opacity .15s,transform .25s cubic-bezier(.2,.8,.2,1)}
.d-nv20 .main.sw{opacity:0;transform:translateX(8px)}
.d-nv20 .main h4{margin:0 0 2px;font-size:15px;letter-spacing:-.03em}
.d-nv20 .main p{margin:0 0 10px;font-size:11px;color:var(--muted)}
.d-nv20 .gr{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.d-nv20 .gr .ui-thumb{height:42px}
`,
    html: `<div class="win">
  <div class="rail" role="tablist" aria-orientation="vertical" aria-label="주 메뉴">
    <button class="tab" role="tab" aria-selected="true"><span class="pl">${nv2I('home')}</span>홈</button>
    <button class="tab" role="tab" aria-selected="false" tabindex="-1"><span class="pl">${nv2I('search')}</span>검색</button>
    <button class="tab" role="tab" aria-selected="false" tabindex="-1"><span class="pl">${nv2I('heart')}</span>찜</button>
    <button class="tab" role="tab" aria-selected="false" tabindex="-1"><span class="pl">${nv2I('user')}</span>마이</button>
  </div>
  <div class="main"><h4>홈</h4><p>추천 숙소 4곳</p><div class="gr"><div class="ui-thumb"></div><div class="ui-thumb"></div><div class="ui-thumb"></div><div class="ui-thumb"></div></div></div>
</div>`,
    run(el, ctx) {
      const tabs = [...el.querySelectorAll('.tab')], main = el.querySelector('.main'), h = main.querySelector('h4'), p = main.querySelector('p');
      const names = [['홈', '추천 숙소 4곳'], ['검색', '최근 검색 3건'], ['찜한 숙소', '저장한 숙소 12곳'], ['마이페이지', '다가오는 예약 2건']];
      let cur = 0;
      const sel = i => {
        if (i === cur) return; cur = i;
        tabs.forEach((t, k) => { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; });
        main.classList.add('sw');
        ctx.timeout(() => { h.textContent = names[i][0]; p.textContent = names[i][1]; main.classList.remove('sw'); }, 160);
      };
      ctx.timeout(() => { nv2Tap(el, tabs[1]); sel(1); }, 550);
      ctx.timeout(() => { nv2Tap(el, tabs[2]); sel(2); }, 1400);
      tabs.forEach((t, i) => ctx.on(t, 'click', () => sel(i)));
      ctx.on(el.querySelector('.rail'), 'keydown', e => {
        const d = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
        if (!d) return; e.preventDefault();
        const i = (cur + d + tabs.length) % tabs.length; sel(i); tabs[i].focus();
      });
    }
  }
]);
