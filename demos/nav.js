/* nav — 내비게이션 (nv01~nv10) */
const NV_I = {
  home: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
  search: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  heart: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20s-7.5-4.6-9.3-9.2C1.5 7.6 3.6 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.4 0 5.5 3.1 4.3 6.3C19.5 15.4 12 20 12 20z"/></svg>',
  user: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
  chev: '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>',
  left: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m15 6-6 6 6 6"/></svg>',
  right: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>',
  cal: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  gear: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/></svg>',
  pin: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  scale: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M7 7l-3 7a3 3 0 0 0 6 0zM17 7l-3 7a3 3 0 0 0 6 0zM12 4v16M8 20h8"/></svg>',
  bell: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>'
};
const nvTap = (stage, t) => {
  if (!t) return;
  const s = stage.getBoundingClientRect(), r = t.getBoundingClientRect();
  const d = document.createElement('span');
  d.style.cssText = `position:absolute;left:${r.left - s.left + r.width / 2 - 15}px;top:${r.top - s.top + r.height / 2 - 15}px;width:30px;height:30px;border-radius:50%;background:var(--text);pointer-events:none;z-index:30;opacity:0`;
  stage.appendChild(d);
  const a = d.animate([{ transform: 'scale(.5)', opacity: .32 }, { transform: 'scale(1.5)', opacity: 0 }], { duration: 520, easing: 'ease-out' });
  a.onfinish = () => d.remove();
};

UIDEX.add('nav', [
  /* nv01 햄버거 메뉴 */
  {
    id: 'nv01', ko: '햄버거 메뉴', en: 'Hamburger menu', pair: 'nv02',
    desc: '세 줄 아이콘을 누르면 숨겨 둔 메뉴가 펼쳐져요. 아이콘은 X로 바뀌어요.',
    prompt: '「햄버거 메뉴(Hamburger menu)」를 만들어 줘. 왼쪽 위 세 줄 아이콘을 누르면 가운데 줄은 사라지고 위·아래 줄이 45도씩 돌아 X가 되며, 메뉴 목록이 헤더 아래로 0.3초 동안 위에서 미끄러져 내려와. 항목은 40ms씩 차례로 나타나게 하고, 버튼엔 aria-expanded와 "메뉴 열기/닫기" 라벨을 붙여 줘.',
    css: `
.d-nv01 .ui-phone{display:flex;flex-direction:column}
.d-nv01 .hd{height:46px;flex:none;display:flex;align-items:center;gap:8px;padding:0 8px;border-bottom:1px solid var(--line)}
.d-nv01 .hd b{font-size:14px;letter-spacing:-.02em}
.d-nv01 .hb{position:relative;width:32px;height:32px;border:0;border-radius:9px;background:transparent;cursor:pointer;padding:0}
.d-nv01 .hb:hover{background:var(--surface-2)}
.d-nv01 .hb i{position:absolute;left:8px;width:16px;height:2px;border-radius:2px;background:var(--text);transition:transform .3s cubic-bezier(.2,.8,.2,1),opacity .2s,top .3s cubic-bezier(.2,.8,.2,1)}
.d-nv01 .hb i:nth-child(1){top:10px}.d-nv01 .hb i:nth-child(2){top:15px}.d-nv01 .hb i:nth-child(3){top:20px}
.d-nv01 .open .hb i:nth-child(1){top:15px;transform:rotate(45deg)}
.d-nv01 .open .hb i:nth-child(2){opacity:0;transform:scaleX(.2)}
.d-nv01 .open .hb i:nth-child(3){top:15px;transform:rotate(-45deg)}
.d-nv01 .body{padding:12px;display:grid;gap:8px}
.d-nv01 .body .ui-thumb{height:62px}
.d-nv01 .menu{position:absolute;left:0;right:0;top:46px;background:var(--surface);padding:4px 0 8px;box-shadow:0 10px 18px -12px rgba(0,0,0,.35);opacity:0;transform:translateY(-10px);pointer-events:none;transition:opacity .25s,transform .3s cubic-bezier(.2,.8,.2,1)}
.d-nv01 .open .menu{opacity:1;transform:none;pointer-events:auto}
.d-nv01 .menu a{display:flex;align-items:center;justify-content:space-between;height:30px;padding:0 16px;font-size:13px;font-weight:600;color:var(--text);cursor:pointer;opacity:0;transform:translateY(-6px);transition:opacity .25s,transform .3s cubic-bezier(.2,.8,.2,1)}
.d-nv01 .menu a span{color:var(--muted);display:flex}
.d-nv01 .menu a:hover{background:var(--surface-2)}
.d-nv01 .open .menu a{opacity:1;transform:none}
.d-nv01 .open .menu a:nth-child(2){transition-delay:.04s}.d-nv01 .open .menu a:nth-child(3){transition-delay:.08s}.d-nv01 .open .menu a:nth-child(4){transition-delay:.12s}
`,
    html: `<div class="ui-phone">
  <div class="hd"><button class="hb" type="button" aria-label="메뉴 열기" aria-expanded="false"><i></i><i></i><i></i></button><b>제주 여행</b></div>
  <div class="body"><div class="ui-thumb"></div><div class="ui-line" style="width:80%"></div><div class="ui-line" style="width:55%"></div></div>
  <nav class="menu"><a>숙소<span>${NV_I.chev}</span></a><a>항공권<span>${NV_I.chev}</span></a><a>렌터카<span>${NV_I.chev}</span></a><a>마이페이지<span>${NV_I.chev}</span></a></nav>
</div>`,
    run(el, ctx) {
      const ph = el.querySelector('.ui-phone'), hb = el.querySelector('.hb');
      const toggle = () => { const o = ph.classList.toggle('open'); hb.setAttribute('aria-expanded', o); hb.setAttribute('aria-label', o ? '메뉴 닫기' : '메뉴 열기'); };
      ctx.timeout(() => { nvTap(el, hb); toggle(); }, 550);
      ctx.on(hb, 'click', toggle);
      el.querySelectorAll('.menu a').forEach(a => ctx.on(a, 'click', toggle));
    }
  },

  /* nv02 베지 버거 */
  {
    id: 'nv02', ko: '베지 버거', en: 'Veggie burger', pair: 'nv01',
    desc: '햄버거보다 한 줄 적은 두 줄 아이콘(비공식 명칭)이에요. 누르면 X가 되며 전체 메뉴가 덮여요.',
    prompt: '「베지 버거(Veggie burger)」 메뉴를 만들어 줘. 오른쪽 위 두 줄 아이콘을 누르면 두 줄이 가운데로 모여 ±45도로 교차해 X가 되고, 전체 화면 메뉴가 아이콘 위치에서 원형으로 0.5초 동안 퍼지며 열려. 큰 글씨 항목은 60ms 간격으로 떠오르게 하고, 열려 있을 땐 Esc 키로 닫혀. 세 줄 아이콘으로 만들지 마.',
    css: `
.d-nv02 .ui-phone{display:flex;flex-direction:column}
.d-nv02 .hd{height:46px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 8px 0 14px;position:relative;z-index:3}
.d-nv02 .logo{font-size:15px;font-weight:800;letter-spacing:-.03em;transition:color .3s}
.d-nv02 .logo em{font-style:normal;color:var(--accent);transition:color .3s}
.d-nv02 .vb{position:relative;width:32px;height:32px;border:0;border-radius:9px;background:transparent;cursor:pointer;padding:0;color:var(--text);transition:color .3s}
.d-nv02 .vb i{position:absolute;left:8px;width:16px;height:2px;border-radius:2px;background:currentColor;transition:transform .35s cubic-bezier(.2,.8,.2,1),top .35s cubic-bezier(.2,.8,.2,1)}
.d-nv02 .vb i:nth-child(1){top:12px}.d-nv02 .vb i:nth-child(2){top:18px}
.d-nv02 .open .vb{color:var(--accent-text)}
.d-nv02 .open .logo,.d-nv02 .open .logo em{color:var(--accent-text)}
.d-nv02 .open .vb i:nth-child(1){top:15px;transform:rotate(45deg)}
.d-nv02 .open .vb i:nth-child(2){top:15px;transform:rotate(-45deg)}
.d-nv02 .body{padding:4px 14px;display:grid;gap:8px}
.d-nv02 .body .hl{font-size:18px;font-weight:800;letter-spacing:-.03em;line-height:1.25}
.d-nv02 .body .ui-thumb{height:48px}
.d-nv02 .ov{position:absolute;inset:0;background:var(--accent);color:var(--accent-text);clip-path:circle(0 at 196px 23px);transition:clip-path .5s cubic-bezier(.2,.8,.2,1);padding:56px 18px 0;display:flex;flex-direction:column;gap:4px;z-index:2}
.d-nv02 .open .ov{clip-path:circle(300px at 196px 23px)}
.d-nv02 .ov a{font-size:21px;font-weight:800;letter-spacing:-.03em;cursor:pointer;opacity:0;transform:translateY(10px);transition:opacity .3s,transform .4s cubic-bezier(.2,.8,.2,1)}
.d-nv02 .ov small{margin-top:auto;margin-bottom:14px;font-size:11px;opacity:0;transition:opacity .3s}
.d-nv02 .open .ov a,.d-nv02 .open .ov small{opacity:1;transform:none}
.d-nv02 .open .ov a:nth-child(1){transition-delay:.18s}.d-nv02 .open .ov a:nth-child(2){transition-delay:.24s}.d-nv02 .open .ov a:nth-child(3){transition-delay:.3s}.d-nv02 .open .ov small{transition-delay:.4s}
`,
    html: `<div class="ui-phone">
  <div class="hd"><span class="logo">stay<em>.</em></span><button class="vb" type="button" aria-label="메뉴 열기" aria-expanded="false"><i></i><i></i></button></div>
  <div class="body"><div class="hl">이번 주말,<br>어디로 떠날까요?</div><div class="ui-thumb"></div><div class="ui-line" style="width:60%"></div></div>
  <nav class="ov"><a>숙소</a><a>체험</a><a>매거진</a><small>로그인 · 고객센터</small></nav>
</div>`,
    run(el, ctx) {
      const ph = el.querySelector('.ui-phone'), b = el.querySelector('.vb');
      const toggle = () => { const o = ph.classList.toggle('open'); b.setAttribute('aria-expanded', o); b.setAttribute('aria-label', o ? '메뉴 닫기' : '메뉴 열기'); };
      ctx.timeout(() => { nvTap(el, b); toggle(); }, 550);
      ctx.on(b, 'click', toggle);
    }
  },

  /* nv03 하단 탭바 */
  {
    id: 'nv03', ko: '하단 탭바', en: 'Tab bar',
    desc: '앱 아래쪽에 고정된 주요 메뉴 3~5개예요. 누른 탭만 색이 바뀌어요.',
    prompt: '「하단 탭바(Tab bar)」를 만들어 줘. 화면 아래에 홈·검색·찜·마이 4개 탭을 고정하고, 탭을 누르면 아이콘과 라벨이 회색에서 파란색으로 바뀌며 아이콘이 1.15배로 살짝 튀었다 돌아와(0.25초 ease-out). 위쪽 작은 막대가 선택 탭으로 미끄러지게 하고, role="tablist"와 aria-selected를 넣어 줘.',
    css: `
.d-nv03 .ui-phone{display:flex;flex-direction:column}
.d-nv03 .scr{flex:1;padding:14px 14px 0;position:relative}
.d-nv03 .scr h4{margin:0 0 10px;font-size:16px;letter-spacing:-.03em;transition:opacity .2s,transform .25s cubic-bezier(.2,.8,.2,1)}
.d-nv03 .scr h4.sw{opacity:0;transform:translateY(4px)}
.d-nv03 .row{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.d-nv03 .row .ui-thumb{height:46px;transition:background .3s}
.d-nv03 .tabs{height:52px;flex:none;display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--line);position:relative;background:var(--surface)}
.d-nv03 .tabs .ind{position:absolute;top:-1px;left:0;width:25%;height:2px;display:flex;justify-content:center;transition:transform .35s cubic-bezier(.2,.8,.2,1)}
.d-nv03 .tabs .ind:before{content:"";width:22px;height:2px;border-radius:2px;background:var(--accent)}
.d-nv03 .tab{border:0;background:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;color:var(--muted);font:inherit;font-size:11px;font-weight:600;padding:0;transition:color .2s}
.d-nv03 .tab svg{transition:transform .25s ease-out}
.d-nv03 .tab[aria-selected="true"]{color:var(--accent)}
.d-nv03 .tab.pop svg{animation:nv03-pop .25s ease-out}
@keyframes nv03-pop{50%{transform:scale(1.15)}}
`,
    html: `<div class="ui-phone">
  <div class="scr"><h4>홈</h4><div class="row"><div class="ui-thumb"></div><div class="ui-thumb"></div></div><div class="ui-line" style="width:70%;margin-top:10px"></div></div>
  <div class="tabs" role="tablist"><span class="ind"></span>
    <button class="tab" role="tab" aria-selected="true">${NV_I.home}홈</button>
    <button class="tab" role="tab" aria-selected="false">${NV_I.search}검색</button>
    <button class="tab" role="tab" aria-selected="false">${NV_I.heart}찜</button>
    <button class="tab" role="tab" aria-selected="false">${NV_I.user}마이</button>
  </div>
</div>`,
    run(el, ctx) {
      const tabs = [...el.querySelectorAll('.tab')], ind = el.querySelector('.ind'), h = el.querySelector('h4');
      const names = ['홈', '검색', '찜한 숙소', '마이페이지'];
      let cur = 0;
      const sel = i => {
        if (i === cur) return; cur = i;
        tabs.forEach((t, k) => { t.setAttribute('aria-selected', k === i); t.classList.remove('pop'); });
        void tabs[i].offsetWidth; tabs[i].classList.add('pop');
        ind.style.transform = `translateX(${i * 100}%)`;
        h.classList.add('sw'); ctx.timeout(() => { h.textContent = names[i]; h.classList.remove('sw'); }, 150);
      };
      ctx.timeout(() => { nvTap(el, tabs[1]); sel(1); }, 500);
      ctx.timeout(() => { nvTap(el, tabs[2]); sel(2); }, 1350);
      tabs.forEach((t, i) => ctx.on(t, 'click', () => sel(i)));
    }
  },

  /* nv04 상단 탭 */
  {
    id: 'nv04', ko: '상단 탭', en: 'Top tabs', pair: 'se09',
    desc: '화면 위쪽 탭으로 같은 화면 안의 내용을 바꿔 봐요. 밑줄이 따라 움직여요.',
    prompt: '「상단 탭(Top tabs)」을 만들어 줘. 추천·국내·해외·호텔 탭 아래 2px 파란 밑줄이 선택한 탭의 글자 너비에 맞춰 0.3초 동안 cubic-bezier(.2,.8,.2,1)로 미끄러지고, 내용은 누른 방향으로 16px 밀리며 교차 페이드돼. 좌우 화살표 키로 탭을 옮길 수 있게 하고, 검색 범위 탭이 아니라 화면 섹션 전환용으로 만들어 줘.',
    css: `
.d-nv04 .ui-phone{display:flex;flex-direction:column}
.d-nv04 h4{margin:0;padding:14px 14px 6px;font-size:15px;letter-spacing:-.03em}
.d-nv04 .tabs{display:flex;gap:16px;padding:0 14px;border-bottom:1px solid var(--line);position:relative}
.d-nv04 .tab{border:0;background:none;padding:8px 0 9px;font:inherit;font-size:13px;font-weight:600;color:var(--muted);cursor:pointer;transition:color .2s}
.d-nv04 .tab[aria-selected="true"]{color:var(--text)}
.d-nv04 .ul{position:absolute;bottom:-1px;left:0;height:2px;border-radius:2px;background:var(--accent);transition:transform .3s cubic-bezier(.2,.8,.2,1),width .3s cubic-bezier(.2,.8,.2,1)}
.d-nv04 .pan{position:relative;flex:1}
.d-nv04 .pn{position:absolute;inset:0;padding:10px 14px;display:grid;gap:8px;align-content:start;opacity:0;transform:translateX(16px);transition:opacity .25s,transform .3s cubic-bezier(.2,.8,.2,1);pointer-events:none}
.d-nv04 .pn.on{opacity:1;transform:none}
.d-nv04 .pn.out{transform:translateX(-16px)}
.d-nv04 .it{display:flex;gap:9px;align-items:center}
.d-nv04 .it .ui-thumb{width:38px;height:38px;flex:none}
.d-nv04 .it b{display:block;font-size:12px;font-weight:600;letter-spacing:-.02em}
.d-nv04 .it span{font-size:11px;color:var(--muted)}
.d-nv04 .it span em{font-style:normal;color:var(--text);font-weight:700}
`,
    html: `<div class="ui-phone">
  <h4>여행 상품</h4>
  <div class="tabs" role="tablist"><button class="tab" role="tab" aria-selected="true">추천</button><button class="tab" role="tab" aria-selected="false">국내</button><button class="tab" role="tab" aria-selected="false">해외</button><button class="tab" role="tab" aria-selected="false">호텔</button><span class="ul"></span></div>
  <div class="pan">
    <div class="pn on"><div class="it"><div class="ui-thumb"></div><div><b>오사카 미식 3일</b><span><em>329,000원</em> · 항공 포함</span></div></div><div class="it"><div class="ui-thumb"></div><div><b>강릉 바다 1박</b><span><em>89,000원</em> · 오션뷰</span></div></div></div>
    <div class="pn"><div class="it"><div class="ui-thumb"></div><div><b>제주 3박 4일</b><span><em>289,000원</em> · 렌터카</span></div></div><div class="it"><div class="ui-thumb"></div><div><b>경주 한옥 스테이</b><span><em>120,000원</em> · 조식</span></div></div></div>
    <div class="pn"><div class="it"><div class="ui-thumb"></div><div><b>다낭 리조트 4일</b><span><em>549,000원</em> · 풀빌라</span></div></div><div class="it"><div class="ui-thumb"></div><div><b>타이베이 2박</b><span><em>279,000원</em> · 야시장</span></div></div></div>
    <div class="pn"><div class="it"><div class="ui-thumb"></div><div><b>시티 호텔 디럭스</b><span><em>159,000원</em> · 1박</span></div></div><div class="it"><div class="ui-thumb"></div><div><b>스파 리조트</b><span><em>210,000원</em> · 2인</span></div></div></div>
  </div>
</div>`,
    run(el, ctx) {
      const tabs = [...el.querySelectorAll('.tab')], ul = el.querySelector('.ul'), pns = [...el.querySelectorAll('.pn')];
      let cur = 0;
      const place = i => { ul.style.width = tabs[i].offsetWidth + 'px'; ul.style.transform = `translateX(${tabs[i].offsetLeft}px)`; };
      ul.style.transition = 'none'; place(0); void ul.offsetWidth; ul.style.transition = '';
      const sel = i => {
        if (i === cur) return;
        const fwd = i > cur, old = pns[cur];
        old.classList.remove('on'); old.style.transform = `translateX(${fwd ? -16 : 16}px)`;
        const nw = pns[i]; nw.style.transition = 'none'; nw.style.transform = `translateX(${fwd ? 16 : -16}px)`; void nw.offsetWidth; nw.style.transition = ''; nw.style.transform = ''; nw.classList.add('on');
        tabs.forEach((t, k) => { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; });
        cur = i; place(i);
      };
      ctx.timeout(() => { nvTap(el, tabs[1]); sel(1); }, 550);
      ctx.timeout(() => { nvTap(el, tabs[2]); sel(2); }, 1350);
      tabs.forEach((t, i) => {
        ctx.on(t, 'click', () => sel(i));
        ctx.on(t, 'keydown', e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { const n = (cur + (e.key === 'ArrowRight' ? 1 : 3)) % 4; sel(n); tabs[n].focus(); } });
      });
    }
  },

  /* nv05 드로어 */
  {
    id: 'nv05', ko: '내비게이션 드로어', en: 'Navigation drawer',
    desc: '옆에서 서랍처럼 밀려 나오는 메뉴 패널이에요. 바깥을 누르면 닫혀요.',
    prompt: '「내비게이션 드로어(Navigation drawer)」를 만들어 줘. 메뉴 버튼을 누르면 화면 너비 70% 패널이 왼쪽에서 0.35초 동안 ease-out으로 밀려 나오고, 뒤 화면은 검정 45% 딤으로 덮여. 딤을 누르거나 Esc를 누르면 닫히고, 열릴 때 첫 메뉴로 포커스를 옮겨 줘.',
    css: `
.d-nv05 .hd{height:46px;display:flex;align-items:center;gap:8px;padding:0 8px;border-bottom:1px solid var(--line)}
.d-nv05 .hd b{font-size:14px;letter-spacing:-.02em}
.d-nv05 .mb{width:32px;height:32px;border:0;border-radius:9px;background:transparent;cursor:pointer;display:grid;place-items:center;color:var(--text);padding:0}
.d-nv05 .body{padding:12px;display:grid;gap:8px}
.d-nv05 .body .ui-thumb{height:56px}
.d-nv05 .dim{position:absolute;inset:0;background:rgba(8,10,14,.45);opacity:0;pointer-events:none;transition:opacity .35s;cursor:pointer}
.d-nv05 .dr{position:absolute;top:0;bottom:0;left:0;width:154px;background:var(--surface);transform:translateX(-100%);transition:transform .35s cubic-bezier(.2,.8,.2,1);padding:14px 8px;display:flex;flex-direction:column;gap:2px}
.d-nv05 .open .dr{box-shadow:6px 0 20px -8px rgba(0,0,0,.3)}
.d-nv05 .open .dim{opacity:1;pointer-events:auto}
.d-nv05 .open .dr{transform:none}
.d-nv05 .pf{display:flex;align-items:center;gap:8px;padding:0 6px 10px;margin-bottom:4px;border-bottom:1px solid var(--line)}
.d-nv05 .pf i{width:28px;height:28px;border-radius:50%;background:var(--accent-soft);flex:none}
.d-nv05 .pf b{font-size:12px;display:block}.d-nv05 .pf span{font-size:11px;color:var(--muted)}
.d-nv05 .dr a{display:flex;align-items:center;gap:8px;height:28px;padding:0 8px;border-radius:8px;font-size:12px;font-weight:600;color:var(--text);cursor:pointer}
.d-nv05 .dr a svg{color:var(--muted)}
.d-nv05 .dr a.on{background:var(--accent-soft);color:var(--accent)}
.d-nv05 .dr a.on svg{color:var(--accent)}
`,
    html: `<div class="ui-phone">
  <div class="hd"><button class="mb" type="button" aria-label="메뉴 열기" aria-expanded="false"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button><b>내 여행</b></div>
  <div class="body"><div class="ui-thumb"></div><div class="ui-line" style="width:75%"></div><div class="ui-line" style="width:45%"></div></div>
  <div class="dim"></div>
  <nav class="dr"><div class="pf"><i></i><div><b>여행자 님</b><span>골드 회원</span></div></div>
    <a class="on">${NV_I.home.replace('width="20" height="20"', 'width="16" height="16"')}홈</a><a>${NV_I.cal}예약 내역</a><a>${NV_I.heart.replace('width="20" height="20"', 'width="16" height="16"')}찜 목록</a><a>${NV_I.gear}설정</a></nav>
</div>`,
    run(el, ctx) {
      const ph = el.querySelector('.ui-phone'), b = el.querySelector('.mb'), dim = el.querySelector('.dim');
      const set = o => { ph.classList.toggle('open', o); b.setAttribute('aria-expanded', o); };
      ctx.timeout(() => { nvTap(el, b); set(true); }, 550);
      ctx.on(b, 'click', () => set(true));
      ctx.on(dim, 'click', () => set(false));
      const as = [...el.querySelectorAll('.dr a')];
      as.forEach(a => ctx.on(a, 'click', () => { as.forEach(x => x.classList.toggle('on', x === a)); ctx.timeout(() => set(false), 250); }));
    }
  },

  /* nv06 바텀시트 */
  {
    id: 'nv06', ko: '바텀시트', en: 'Bottom sheet', pair: 'in05',
    desc: '화면 아래에서 올라오는 패널이에요. 지금 화면을 벗어나지 않고 옵션을 골라요.',
    prompt: '「바텀시트(Bottom sheet)」를 만들어 줘. "옵션 선택"을 누르면 위 모서리 16px 둥근 패널이 아래에서 0.35초 동안 cubic-bezier(.2,.8,.2,1)로 올라오고 뒤는 40% 딤 처리돼. 맨 위에 손잡이 막대를 두고, 딤을 누르거나 아래로 끌면 닫혀. role="dialog"와 aria-modal="true"를 넣고, 값 하나만 고르는 바텀시트 피커처럼 목록만 두지 마.',
    css: `
.d-nv06 .pd{padding:14px;display:flex;gap:12px;align-items:center}
.d-nv06 .pd .ui-thumb{width:64px;height:64px;flex:none}
.d-nv06 .pd b{display:block;font-size:13px;letter-spacing:-.02em}
.d-nv06 .pd span{display:block;font-size:15px;font-weight:800;margin-top:3px}
.d-nv06 .pd small{font-size:11px;color:var(--muted)}
.d-nv06 .cta{position:absolute;left:14px;right:14px;bottom:14px;height:38px;width:auto}
.d-nv06 .dim{position:absolute;inset:0;background:rgba(8,10,14,.4);opacity:0;pointer-events:none;transition:opacity .3s;cursor:pointer}
.d-nv06 .sh{position:absolute;left:0;right:0;bottom:0;background:var(--surface);border-radius:16px 16px 0 0;padding:8px 14px 12px;transform:translateY(100%);transition:transform .35s cubic-bezier(.2,.8,.2,1)}
.d-nv06 .open .sh{box-shadow:0 -8px 24px -10px rgba(0,0,0,.3)}
.d-nv06 .open .dim{opacity:1;pointer-events:auto}
.d-nv06 .open .sh{transform:none}
.d-nv06 .sh{touch-action:none}
.d-nv06 .grab{cursor:grab;width:34px;height:4px;border-radius:2px;background:var(--line);margin:0 auto 10px}
.d-nv06 .sh h5{margin:0 0 8px;font-size:13px}
.d-nv06 .opts{display:flex;gap:6px;margin-bottom:10px}
.d-nv06 .opts .ui-chip{flex:1;justify-content:center;cursor:pointer;transition:all .2s;font-weight:600}
.d-nv06 .opts .ui-chip.on{background:var(--accent-soft);border-color:var(--accent);color:var(--accent)}
.d-nv06 .sh .ui-btn{width:100%;height:34px}
`,
    html: `<div class="ui-phone">
  <div class="pd"><div class="ui-thumb"></div><div><b>접이식 캠핑 의자</b><span>39,000원</span><small>무료배송 · 내일 도착</small></div></div>
  <button class="ui-btn cta" type="button">옵션 선택</button>
  <div class="dim"></div>
  <div class="sh" role="dialog" aria-modal="true" aria-label="옵션 선택"><div class="grab"></div><h5>색상</h5>
    <div class="opts"><span class="ui-chip">베이지</span><span class="ui-chip">카키</span><span class="ui-chip">블랙</span></div>
    <button class="ui-btn ok" type="button">장바구니 담기</button></div>
</div>`,
    run(el, ctx) {
      const ph = el.querySelector('.ui-phone'), cta = el.querySelector('.cta'), dim = el.querySelector('.dim'), chips = [...el.querySelectorAll('.opts .ui-chip')];
      const set = o => ph.classList.toggle('open', o);
      const pick = c => chips.forEach(x => x.classList.toggle('on', x === c));
      ctx.timeout(() => { nvTap(el, cta); set(true); }, 500);
      ctx.timeout(() => { nvTap(el, chips[1]); pick(chips[1]); }, 1400);
      ctx.on(cta, 'click', () => set(true));
      ctx.on(dim, 'click', () => set(false));
      ctx.on(el.querySelector('.ok'), 'click', () => set(false));
      chips.forEach(c => ctx.on(c, 'click', () => pick(c)));
      const sh = el.querySelector('.sh'); let y0 = null, dy = 0;
      ctx.on(sh, 'pointerdown', e => { if (!ph.classList.contains('open')) return; y0 = e.clientY; dy = 0; sh.style.transition = 'none'; });
      ctx.on(el, 'pointermove', e => { if (y0 === null) return; dy = Math.max(0, e.clientY - y0); sh.style.transform = 'translateY(' + dy + 'px)'; });
      const end = () => { if (y0 === null) return; y0 = null; sh.style.transition = ''; sh.style.transform = ''; if (dy > 40) set(false); };
      ctx.on(el, 'pointerup', end); ctx.on(el, 'pointercancel', end);
    }
  },

  /* nv07 브레드크럼 */
  {
    id: 'nv07', ko: '브레드크럼', en: 'Breadcrumb',
    desc: '홈 › 캠핑 › 의자처럼 지금 위치까지의 경로를 보여 주고, 눌러서 위로 돌아가요.',
    prompt: '「브레드크럼(Breadcrumb)」을 만들어 줘. 홈 › 캠핑 › 의자 › 접이식 의자 경로를 12px 회색 글자와 › 구분자로 한 줄에 놓고, 진입 시 항목이 120ms 간격으로 왼쪽에서 나타나. 상위 항목을 누르면 뒤 경로가 0.3초 동안 접히며 사라져. nav에 aria-label="breadcrumb", 마지막 항목엔 aria-current="page"를 넣어 줘.',
    css: `
.d-nv07 .bx{width:236px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);padding:14px 16px 16px}
.d-nv07 .bc{display:flex;align-items:center;white-space:nowrap;font-size:12px;color:var(--muted);height:20px;overflow:hidden}
.d-nv07 .c{display:inline-flex;align-items:center;max-width:110px;overflow:hidden;opacity:0;transform:translateX(-6px);transition:opacity .3s,transform .3s cubic-bezier(.2,.8,.2,1),max-width .3s cubic-bezier(.2,.8,.2,1),color .2s}
.d-nv07 .c.in{opacity:1;transform:none}
.d-nv07 .c.gone{max-width:0;opacity:0}
.d-nv07 .c svg{margin:0 5px;flex:none;opacity:.7}
.d-nv07 .c span{cursor:pointer;border-radius:5px;padding:1px 2px}
.d-nv07 .c span:hover{color:var(--accent)}
.d-nv07 .c.cur span{color:var(--text);font-weight:700}
.d-nv07 h4{margin:10px 0 12px;font-size:18px;letter-spacing:-.03em;transition:opacity .2s,transform .25s cubic-bezier(.2,.8,.2,1)}
.d-nv07 h4.sw{opacity:0;transform:translateY(4px)}
.d-nv07 .g{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.d-nv07 .g .ui-thumb{height:38px}
`,
    html: `<div class="bx">
  <nav class="bc" aria-label="breadcrumb"><span class="c"><span>홈</span></span><span class="c">${NV_I.chev}<span>캠핑</span></span><span class="c">${NV_I.chev}<span>의자</span></span><span class="c cur">${NV_I.chev}<span aria-current="page">접이식 의자</span></span></nav>
  <h4>접이식 의자</h4>
  <div class="g"><div class="ui-thumb"></div><div class="ui-thumb"></div><div class="ui-thumb"></div></div>
</div>`,
    run(el, ctx) {
      const cs = [...el.querySelectorAll('.c')], h = el.querySelector('h4');
      const names = ['홈', '캠핑', '의자', '접이식 의자'];
      let depth = 3;
      cs.forEach((c, i) => ctx.timeout(() => c.classList.add('in'), 200 + i * 120));
      const go = i => {
        if (i === depth) { if (depth === 3) return; i = 3; }
        depth = i;
        cs.forEach((c, k) => { c.classList.toggle('gone', k > i); c.classList.toggle('cur', k === i); const s = c.querySelector('span'); k === i ? s.setAttribute('aria-current', 'page') : s.removeAttribute('aria-current'); });
        h.classList.add('sw'); ctx.timeout(() => { h.textContent = names[i]; h.classList.remove('sw'); }, 160);
      };
      ctx.timeout(() => { nvTap(el, cs[1].querySelector('span')); go(1); }, 1250);
      cs.forEach((c, i) => ctx.on(c.querySelector('span'), 'click', () => go(i)));
    }
  },

  /* nv08 페이지네이션 */
  {
    id: 'nv08', ko: '페이지네이션', en: 'Pagination',
    desc: '목록을 1·2·3 페이지로 나눠 번호를 눌러 이동해요. 지금 페이지가 강조돼요.',
    prompt: '「페이지네이션(Pagination)」을 만들어 줘. 목록 아래 이전·다음 화살표와 1~5 숫자 버튼을 두고, 선택 페이지는 파란 원형 배경이 0.3초 동안 다음 숫자로 미끄러져 이동해. 목록은 0.2초 페이드로 바뀌고, 첫·끝 페이지에선 화살표를 흐리게 비활성화하며 현재 번호엔 aria-current="page"를 넣어 줘.',
    css: `
.d-nv08 .bx{width:236px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);padding:12px 14px}
.d-nv08 .list{display:grid;gap:8px;transition:opacity .2s,transform .25s cubic-bezier(.2,.8,.2,1)}
.d-nv08 .list.sw{opacity:0;transform:translateY(4px)}
.d-nv08 .r{display:flex;gap:9px;align-items:center}
.d-nv08 .r .ui-thumb{width:30px;height:30px;flex:none;border-radius:8px}
.d-nv08 .r div{flex:1;display:grid;gap:5px}
.d-nv08 .r b{font-size:12px;font-weight:600;letter-spacing:-.02em}
.d-nv08 .pg{display:flex;align-items:center;justify-content:center;gap:2px;margin-top:12px;padding-top:10px;border-top:1px solid var(--line)}
.d-nv08 .ar{width:26px;height:26px;border:0;background:none;color:var(--text);border-radius:8px;cursor:pointer;display:grid;place-items:center;padding:0;transition:opacity .2s}
.d-nv08 .ar:disabled{opacity:.25;cursor:default}
.d-nv08 .nums{position:relative;display:flex;gap:4px}
.d-nv08 .pill{position:absolute;left:0;top:0;width:26px;height:26px;border-radius:50%;background:var(--accent);transition:transform .3s cubic-bezier(.2,.8,.2,1)}
.d-nv08 .n{position:relative;width:26px;height:26px;border:0;background:none;border-radius:50%;font:inherit;font-size:12px;font-weight:600;color:var(--muted);cursor:pointer;padding:0;transition:color .25s}
.d-nv08 .n[aria-current="page"]{color:var(--accent-text)}
`,
    html: `<div class="bx">
  <div class="list"></div>
  <nav class="pg" aria-label="페이지"><button class="ar pv" type="button" aria-label="이전 페이지" disabled>${NV_I.left}</button>
    <div class="nums"><span class="pill"></span><button class="n" aria-current="page">1</button><button class="n">2</button><button class="n">3</button><button class="n">4</button><button class="n">5</button></div>
    <button class="ar nx" type="button" aria-label="다음 페이지">${NV_I.right}</button></nav>
</div>`,
    run(el, ctx) {
      const list = el.querySelector('.list'), ns = [...el.querySelectorAll('.n')], pill = el.querySelector('.pill'), pv = el.querySelector('.pv'), nx = el.querySelector('.nx');
      const data = [['캠핑 의자 후기', '텐트 설치 팁', '감성 랜턴 추천'], ['차박 준비물', '버너 고르는 법', '타프 치는 법'], ['겨울 캠핑 장비', '침낭 온도 보기', '난로 안전 수칙'], ['캠핑 요리 10선', '아이스박스 비교', '테이블 추천'], ['캠핑장 예약 팁', '우천 캠핑 대비', '철수 체크리스트']];
      const render = p => { list.innerHTML = data[p].map((t, i) => `<div class="r"><div class="ui-thumb"></div><div><b>${t}</b><span class="ui-line" style="width:${55 + ((p * 3 + i * 7) % 4) * 10}%"></span></div></div>`).join(''); };
      let cur = 0; render(0);
      const go = p => {
        if (p < 0 || p > 4 || p === cur) return; cur = p;
        ns.forEach((n, k) => k === p ? n.setAttribute('aria-current', 'page') : n.removeAttribute('aria-current'));
        pill.style.transform = `translateX(${p * 30}px)`;
        pv.disabled = p === 0; nx.disabled = p === 4;
        list.classList.add('sw'); ctx.timeout(() => { render(p); list.classList.remove('sw'); }, 180);
      };
      ctx.timeout(() => { nvTap(el, ns[1]); go(1); }, 550);
      ctx.timeout(() => { nvTap(el, nx); go(2); }, 1350);
      ns.forEach((n, i) => ctx.on(n, 'click', () => go(i)));
      ctx.on(pv, 'click', () => go(cur - 1)); ctx.on(nx, 'click', () => go(cur + 1));
    }
  },

  /* nv09 세그먼트 컨트롤 */
  {
    id: 'nv09', ko: '세그먼트 컨트롤', en: 'Segmented control',
    desc: '알약 모양 칸 2~4개 중 하나를 골라 같은 데이터를 다른 보기로 바꿔요.',
    prompt: '「세그먼트 컨트롤(Segmented control)」을 만들어 줘. 회색 트랙 안에 일간·주간·월간 3칸을 두고, 누르면 흰색 둥근 선택 칩이 0.3초 동안 cubic-bezier(.2,.8,.2,1)로 미끄러져 이동해. 아래 막대그래프 높이도 0.4초 동안 함께 바뀌게 하고, role="radiogroup"과 aria-checked로 선택 상태를 알려 줘.',
    css: `
.d-nv09 .box{width:236px;display:grid;gap:14px}
.d-nv09 .seg{position:relative;display:grid;grid-template-columns:repeat(3,1fr);height:34px;padding:3px;border-radius:11px;background:var(--line)}
.d-nv09 .th{position:absolute;top:3px;bottom:3px;left:3px;width:calc((100% - 6px)/3);border-radius:8px;background:var(--surface);box-shadow:0 1px 3px rgba(0,0,0,.14),0 2px 8px rgba(0,0,0,.06);transition:transform .3s cubic-bezier(.2,.8,.2,1)}
.d-nv09 .sg{position:relative;border:0;background:none;font:inherit;font-size:12px;font-weight:600;color:var(--muted);cursor:pointer;transition:color .2s}
.d-nv09 .sg[aria-checked="true"]{color:var(--text)}
.d-nv09 .top{display:flex;justify-content:space-between;align-items:baseline}
.d-nv09 .top span{font-size:11px;color:var(--muted)}
.d-nv09 .top b{font-size:18px;letter-spacing:-.03em;font-variant-numeric:tabular-nums}
.d-nv09 .ch{display:flex;align-items:flex-end;gap:7px;height:64px}
.d-nv09 .ch i{flex:1;border-radius:5px 5px 2px 2px;background:var(--accent);opacity:.85;transition:height .4s cubic-bezier(.2,.8,.2,1)}
.d-nv09 .ch i:last-child{opacity:1}
`,
    html: `<div class="box">
  <div class="seg" role="radiogroup" aria-label="기간"><span class="th"></span><button class="sg" role="radio" aria-checked="true">일간</button><button class="sg" role="radio" aria-checked="false">주간</button><button class="sg" role="radio" aria-checked="false">월간</button></div>
  <div class="top"><span>예약 건수</span><b>128건</b></div>
  <div class="ch"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
</div>`,
    run(el, ctx) {
      const sgs = [...el.querySelectorAll('.sg')], th = el.querySelector('.th'), bars = [...el.querySelectorAll('.ch i')], tot = el.querySelector('.top b');
      const H = [[30, 45, 38, 60, 52, 70, 48], [55, 40, 72, 64, 85, 58, 92], [80, 62, 95, 70, 52, 88, 100]], T = ['128건', '904건', '3,812건'];
      let cur = -1;
      const sel = i => {
        if (i === cur) return; cur = i;
        sgs.forEach((s, k) => s.setAttribute('aria-checked', k === i));
        th.style.transform = `translateX(${i * 100}%)`;
        bars.forEach((b, k) => b.style.height = H[i][k] + '%'); tot.textContent = T[i];
      };
      sel(0);
      ctx.timeout(() => { nvTap(el, sgs[1]); sel(1); }, 550);
      ctx.timeout(() => { nvTap(el, sgs[2]); sel(2); }, 1350);
      sgs.forEach((s, i) => ctx.on(s, 'click', () => sel(i)));
    }
  },

  /* nv10 온보딩 */
  {
    id: 'nv10', ko: '온보딩', en: 'Onboarding',
    desc: '앱을 처음 열 때 핵심 기능을 2~4장 화면으로 넘기며 소개해요.',
    prompt: '「온보딩(Onboarding)」 화면을 만들어 줘. 아이콘·제목·설명으로 된 3장을 "다음" 버튼으로 넘기면 현재 장은 왼쪽으로 24px 밀리며 사라지고 다음 장이 오른쪽에서 0.4초 동안 들어와. 아래 점 표시는 현재 장만 16px 알약으로 늘어나고, 마지막 장에선 버튼이 "시작하기"로 바뀌며 "건너뛰기" 링크도 둬. 점엔 aria-label을 달아 줘.',
    css: `
.d-nv10 .ui-phone{display:flex;flex-direction:column}
.d-nv10 .skip{position:absolute;top:10px;right:12px;font-size:11px;color:var(--muted);cursor:pointer;z-index:2}
.d-nv10 .sl{position:relative;flex:1}
.d-nv10 .s{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:10px 18px 0;opacity:0;transform:translateX(24px);transition:opacity .35s,transform .4s cubic-bezier(.2,.8,.2,1)}
.d-nv10 .s.on{opacity:1;transform:none}
.d-nv10 .s.out{opacity:0;transform:translateX(-24px)}
.d-nv10 .ic{width:52px;height:52px;border-radius:16px;background:var(--accent-soft);color:var(--accent);display:grid;place-items:center;margin-bottom:10px}
.d-nv10 .s b{font-size:14px;letter-spacing:-.03em}
.d-nv10 .s span{font-size:11px;color:var(--muted);margin-top:4px;line-height:1.45}
.d-nv10 .ft{height:52px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 14px}
.d-nv10 .dots{display:flex;gap:5px}
.d-nv10 .dots i{width:6px;height:6px;border-radius:3px;background:var(--line);transition:width .3s cubic-bezier(.2,.8,.2,1),background .3s;cursor:pointer}
.d-nv10 .dots i.on{width:16px;background:var(--accent)}
.d-nv10 .nx{height:32px;min-width:64px;font-size:12px;transition:min-width .3s cubic-bezier(.2,.8,.2,1)}
.d-nv10 .nx.last{min-width:96px}
`,
    html: `<div class="ui-phone">
  <span class="skip">건너뛰기</span>
  <div class="sl">
    <div class="s on"><div class="ic">${NV_I.pin}</div><b>내 주변 숙소를 바로 찾아요</b><span>지도에서 오늘 빈 방만 골라 보여 줘요</span></div>
    <div class="s"><div class="ic">${NV_I.scale}</div><b>가격을 한눈에 비교해요</b><span>같은 방도 가장 싼 날짜를 알려 줘요</span></div>
    <div class="s"><div class="ic">${NV_I.bell}</div><b>가격이 내리면 알려 드려요</b><span>찜한 숙소의 특가 소식을 받아요</span></div>
  </div>
  <div class="ft"><div class="dots" aria-hidden="true"><i class="on"></i><i></i><i></i></div><button class="ui-btn nx" type="button">다음</button></div>
</div>`,
    run(el, ctx) {
      const ss = [...el.querySelectorAll('.s')], ds = [...el.querySelectorAll('.dots i')], nx = el.querySelector('.nx');
      let cur = 0;
      const go = i => {
        if (i === cur) return;
        const fwd = i > cur;
        ss.forEach((s, k) => {
          s.classList.remove('on', 'out');
          if (k === cur) s.classList.add(fwd ? 'out' : 'x');
          if (k === i) { s.style.transition = 'none'; s.style.transform = `translateX(${fwd ? 24 : -24}px)`; void s.offsetWidth; s.style.transition = ''; s.style.transform = ''; s.classList.add('on'); }
        });
        ds.forEach((d, k) => d.classList.toggle('on', k === i));
        nx.textContent = i === 2 ? '시작하기' : '다음'; nx.classList.toggle('last', i === 2);
        cur = i;
      };
      ctx.timeout(() => { nvTap(el, nx); go(1); }, 700);
      ctx.timeout(() => { nvTap(el, nx); go(2); }, 1500);
      ctx.on(nx, 'click', () => go(cur === 2 ? 0 : cur + 1));
      ds.forEach((d, i) => ctx.on(d, 'click', () => go(i)));
      ctx.on(el.querySelector('.skip'), 'click', () => go(2));
    }
  }
]);
