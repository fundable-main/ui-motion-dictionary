/* input — 입력·선택 (in01~in14, v2 분할) */
const I_P = {
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  chev: '<path d="M6 9l6 6 6-6"/>',
  left: '<path d="M15 6l-6 6 6 6"/>',
  right: '<path d="M9 6l6 6-6 6"/>',
  cart: '<path d="M3.5 4.5h2.2l2 10.5h10l1.8-7.5H7"/><circle cx="9.5" cy="19.2" r="1.3"/><circle cx="17" cy="19.2" r="1.3"/>',
  photo: '<circle cx="8.5" cy="9" r="1.8"/><path d="M3.5 17.5l5-5 4 4 3-3 5 5"/>',
  bell: '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.8h-15z"/><path d="M10 20.8a2.1 2.1 0 0 0 4 0"/>'
};
const iIc = (n, s = 16, w = 2) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I_P[n]}</svg>`;
/* 단독 카드 공통: 흰 카드 · 탭 표시 · 체크박스 */
const iBase = id => `
.d-${id} .card{position:relative;width:calc(100% - 24px);max-width:280px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);padding:11px 14px 12px;box-sizing:border-box}
.d-${id} .ttl{display:flex;justify-content:space-between;align-items:center;font-size:12.5px;font-weight:800;color:var(--text);margin-bottom:6px;gap:8px}
.d-${id} .ttl small{font-size:11px;font-weight:700;color:var(--muted);white-space:nowrap}
.d-${id} button{font:inherit;-webkit-tap-highlight-color:transparent}
.d-${id} .tap{position:absolute;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;background:var(--accent);pointer-events:none;z-index:9;opacity:0;animation:${id}-tap .55s ease-out forwards}
@keyframes ${id}-tap{0%{opacity:.4;transform:scale(.3)}100%{opacity:0;transform:scale(1.5)}}
.d-${id} .cb{flex:none;width:18px;height:18px;border-radius:5px;border:2px solid var(--line);background:var(--surface);display:grid;place-items:center;color:var(--accent-text);transition:all .2s cubic-bezier(.2,.8,.2,1);box-sizing:border-box}
.d-${id} .cb svg{width:12px;height:12px;stroke-dasharray:24;stroke-dashoffset:24;transition:stroke-dashoffset .25s .05s ease-out}
.d-${id} .on > .cb,.d-${id} .cb.on{background:var(--accent);border-color:var(--accent)}
.d-${id} .on > .cb svg,.d-${id} .cb.on svg{stroke-dashoffset:0}
`;
function iTap(ctx, el, t) {
  const r = el.getBoundingClientRect(), q = t.getBoundingClientRect();
  const d = document.createElement('i'); d.className = 'tap';
  d.style.left = (q.left + q.width / 2 - r.left) + 'px'; d.style.top = (q.top + q.height / 2 - r.top) + 'px';
  el.appendChild(d); ctx.timeout(() => d.remove(), 600);
}
const iAuto = (ctx, el, t, fn, ms) => ctx.timeout(() => { iTap(ctx, el, typeof t === 'function' ? t() : t); fn(); }, ms);
const iCb = () => `<span class="cb">${iIc('check', 12, 3)}</span>`;
const iEase = p => 1 - Math.pow(1 - p, 3);
const iKey = (ctx, x, fn) => ctx.on(x, 'keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); fn(); } });

UIDEX.add('input', [
  /* ───────── in01 토글 ───────── */
  {
    id: 'in01', ko: '토글', en: 'Toggle', pair: 'in02',
    desc: '체크박스와 달리 누르는 순간 바로 켜지고 저장돼요.',
    prompt: '「토글(Toggle)」 스위치로 알림 설정 목록을 만들어 줘. 44×26px 트랙 위 손잡이가 0.25초 cubic-bezier(.2,.8,.2,1)로 18px 미끄러지며 초록으로 바뀌고, 그 즉시 "혜택 알림을 켰어요" 안내가 아래에 떠. 체크박스와 헷갈리지 않게 저장·다음 버튼은 두지 마. role="switch"와 aria-checked로 만들어 줘.',
    css: iBase('in01') + `
.d-in01 .row{display:flex;align-items:center;justify-content:space-between;gap:10px;height:36px;border-top:1px solid var(--line);cursor:pointer}
.d-in01 .row:first-of-type{border-top:0}
.d-in01 .row span{font-size:12.5px;font-weight:600;color:var(--text);white-space:nowrap}
.d-in01 .row small{display:block;font-size:11px;font-weight:500;color:var(--muted)}
.d-in01 .sw{flex:none;width:44px;height:26px;border-radius:13px;border:0;padding:0;background:var(--line);position:relative;cursor:pointer;transition:background .25s}
.d-in01 .sw i{position:absolute;left:3px;top:3px;width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:transform .25s cubic-bezier(.2,.8,.2,1)}
.d-in01 .sw[aria-checked="true"]{background:var(--success)}
.d-in01 .sw[aria-checked="true"] i{transform:translateX(18px)}
.d-in01 .toast{margin-top:6px;height:26px;border-radius:8px;background:color-mix(in srgb,var(--success) 14%,transparent);color:var(--success);font-size:11.5px;font-weight:700;display:flex;align-items:center;justify-content:center;gap:5px;opacity:0;transform:translateY(4px);transition:all .25s cubic-bezier(.2,.8,.2,1)}
.d-in01 .toast.on{opacity:1;transform:none}
`,
    html: `<div class="card"><div class="ttl">알림 설정<small>바로 적용</small></div>
  ${[['주문·배송 알림', '배송 출발·도착', true], ['혜택 알림', '쿠폰·특가 소식', false], ['야간 알림', '밤 9시 이후', false]].map(([t, s, on]) => `<div class="row"><span>${t}<small>${s}</small></span><button class="sw" type="button" role="switch" aria-checked="${on}" aria-label="${t}"><i></i></button></div>`).join('')}
  <div class="toast" aria-live="polite"></div></div>`,
    run(el, ctx) {
      const rows = [...el.querySelectorAll('.row')], toast = el.querySelector('.toast');
      const tog = r => {
        const sw = r.querySelector('.sw'), on = sw.getAttribute('aria-checked') !== 'true';
        sw.setAttribute('aria-checked', on);
        toast.innerHTML = `${iIc('check', 13, 3)}${sw.getAttribute('aria-label').replace(' 알림', '')} 알림을 ${on ? '켰어요' : '껐어요'} · 저장됨`;
        toast.classList.remove('on'); void toast.offsetWidth; toast.classList.add('on');
      };
      rows.forEach(r => ctx.on(r, 'click', () => tog(r)));
      iAuto(ctx, el, rows[1].querySelector('.sw'), () => tog(rows[1]), 550);
    }
  },

  /* ───────── in02 체크박스 ───────── */
  {
    id: 'in02', ko: '체크박스', en: 'Checkbox', pair: 'in01',
    desc: '토글과 달리 여러 개를 골라 두는 용도로, 보통 확인 버튼과 함께 써요.',
    prompt: '「체크박스(Checkbox)」로 추가 옵션을 여러 개 고르게 만들어 줘. 누르면 18px 네모가 0.2초 만에 파랗게 채워지고 체크 선이 stroke-dashoffset으로 그려지며, 하나 이상 고르면 아래 "옵션 2개 적용" 버튼이 활성화돼. 토글과 헷갈리지 않게 체크만으로 즉시 저장하지 말고 버튼을 눌러야 반영해. fieldset·legend로 묶어 줘.',
    css: iBase('in02') + `
.d-in02 .op{display:flex;align-items:center;gap:9px;height:32px;padding:0 8px;margin:0 -8px;border-radius:9px;font-size:12.5px;color:var(--text);cursor:pointer;transition:background .2s}
.d-in02 .op.on{background:var(--accent-soft)}
.d-in02 .op .t{flex:1;font-weight:600;white-space:nowrap}
.d-in02 .op .p{font-size:11.5px;color:var(--muted);font-variant-numeric:tabular-nums;white-space:nowrap}
.d-in02 .go{margin-top:8px;width:100%;height:32px;border-radius:9px;border:0;font-size:12.5px;font-weight:700;background:var(--surface-2);color:var(--muted);cursor:not-allowed;transition:background .25s,color .25s}
.d-in02 .go.on{background:var(--accent);color:var(--accent-text);cursor:pointer}
.d-in02 .go.done{background:var(--success);color:#fff}
`,
    html: `<div class="card" role="group" aria-label="추가 옵션"><div class="ttl">추가 옵션<small class="cnt">여러 개 선택</small></div>
  ${[['선물 포장', '+2,000원'], ['보냉백', '+1,500원'], ['일회용 수저', '무료']].map(([t, p]) => `<div class="op" role="checkbox" aria-checked="false" tabindex="0">${iCb()}<span class="t">${t}</span><span class="p">${p}</span></div>`).join('')}
  <button class="go" type="button" disabled>옵션을 골라 주세요</button></div>`,
    run(el, ctx) {
      const ops = [...el.querySelectorAll('.op')], go = el.querySelector('.go'), cnt = el.querySelector('.cnt');
      const sync = () => {
        const n = ops.filter(o => o.classList.contains('on')).length;
        go.classList.remove('done'); go.classList.toggle('on', n > 0); go.disabled = !n;
        go.textContent = n ? `옵션 ${n}개 적용` : '옵션을 골라 주세요';
        cnt.textContent = n ? `${n}개 선택됨` : '여러 개 선택';
      };
      const tg = o => { const on = o.classList.toggle('on'); o.setAttribute('aria-checked', on); sync(); };
      const apply = () => { if (go.disabled) return; go.classList.add('done'); go.textContent = '적용 완료'; };
      ops.forEach(o => { ctx.on(o, 'click', () => tg(o)); iKey(ctx, o, () => tg(o)); });
      ctx.on(go, 'click', apply);
      iAuto(ctx, el, () => ops[0].querySelector('.cb'), () => tg(ops[0]), 450);
      iAuto(ctx, el, () => ops[1].querySelector('.cb'), () => tg(ops[1]), 950);
      iAuto(ctx, el, go, apply, 1700);
    }
  },

  /* ───────── in03 라디오 버튼 ───────── */
  {
    id: 'in03', ko: '라디오 버튼', en: 'Radio button', pair: 'in02',
    desc: '체크박스와 달리 여러 개 중 딱 하나만 고를 수 있어요.',
    prompt: '「라디오 버튼(Radio button)」으로 배송 방법을 고르게 만들어 줘. 하나를 누르면 이전 원의 안쪽 점이 0.2초 만에 사라지고 새 원에 8px 점이 scale 0→1로 생기며, 아래 배송비가 바로 바뀌어. 체크박스와 헷갈리지 않게 두 개 이상 동시에 선택되면 안 되고, 처음부터 하나는 선택된 상태로 둬. role="radiogroup"과 방향키 이동을 지원해 줘.',
    css: iBase('in03') + `
.d-in03 .op{display:flex;align-items:center;gap:9px;height:34px;padding:0 9px;margin-bottom:4px;border-radius:10px;border:1.5px solid var(--line);font-size:12.5px;color:var(--text);cursor:pointer;transition:all .2s}
.d-in03 .op.on{background:var(--accent-soft);border-color:var(--accent)}
.d-in03 .op .t{flex:1;font-weight:600;white-space:nowrap}
.d-in03 .op .p{font-size:11.5px;color:var(--muted);white-space:nowrap}
.d-in03 .op.on .t{font-weight:800}
.d-in03 .rd{flex:none;width:18px;height:18px;border-radius:50%;border:2px solid var(--line);display:grid;place-items:center;transition:border-color .2s;box-sizing:border-box}
.d-in03 .rd i{width:8px;height:8px;border-radius:50%;background:var(--accent);transform:scale(0);transition:transform .2s cubic-bezier(.2,.8,.2,1)}
.d-in03 .op.on .rd{border-color:var(--accent)}
.d-in03 .op.on .rd i{transform:scale(1)}
.d-in03 .sum{display:flex;justify-content:space-between;font-size:11.5px;color:var(--muted);margin-top:4px}
.d-in03 .sum b{color:var(--text);font-variant-numeric:tabular-nums;transition:color .2s}
.d-in03 .sum b.flash{color:var(--accent)}
`,
    html: `<div class="card"><div class="ttl">배송 방법<small>하나만 선택</small></div>
  <div class="grp" role="radiogroup" aria-label="배송 방법">${[['일반배송', '무료', 0], ['빠른배송', '+3,000원', 3000], ['새벽배송', '+5,000원', 5000]].map(([t, p, v], i) => `<div class="op${i === 0 ? ' on' : ''}" role="radio" aria-checked="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-v="${v}"><span class="rd"><i></i></span><span class="t">${t}</span><span class="p">${p}</span></div>`).join('')}</div>
  <div class="sum"><span>배송비</span><b>0원</b></div></div>`,
    run(el, ctx) {
      const ops = [...el.querySelectorAll('.op')], b = el.querySelector('.sum b');
      const pick = i => {
        ops.forEach((o, k) => { o.classList.toggle('on', k === i); o.setAttribute('aria-checked', k === i); o.tabIndex = k === i ? 0 : -1; });
        b.textContent = (+ops[i].dataset.v).toLocaleString('ko-KR') + '원';
        b.classList.remove('flash'); void b.offsetWidth; b.classList.add('flash');
      };
      ops.forEach((o, i) => {
        ctx.on(o, 'click', () => pick(i));
        ctx.on(o, 'keydown', e => { const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]; if (d) { e.preventDefault(); const n = (i + d + 3) % 3; pick(n); ops[n].focus(); } });
      });
      iAuto(ctx, el, () => ops[1].querySelector('.rd'), () => pick(1), 500);
      iAuto(ctx, el, () => ops[2].querySelector('.rd'), () => pick(2), 1300);
    }
  },

  /* ───────── in04 드롭다운 ───────── */
  {
    id: 'in04', ko: '드롭다운', en: 'Dropdown', pair: 'in05',
    desc: '바텀시트 피커와 달리 입력칸 바로 아래로 목록이 펼쳐져요.',
    prompt: '「드롭다운(Dropdown)」으로 인원 선택칸을 만들어 줘. 칸을 누르면 바로 아래에 옵션 목록이 0.2초 동안 scaleY .6→1로 펼쳐지며 화살표가 180° 돌고, 고르면 칸 글자가 바뀌며 닫혀. 바텀시트 피커와 헷갈리지 않게 화면 아래에서 올라오거나 배경을 어둡게 하지 마. role="listbox"와 방향키·Esc 닫기를 지원해 줘.',
    css: iBase('in04') + `
.d-in04 .card{height:172px}
.d-in04 .lb{display:block;font-size:11px;font-weight:700;color:var(--muted);margin-bottom:4px}
.d-in04 .wrap{position:relative}
.d-in04 .fld{width:100%;height:36px;border-radius:10px;border:1.5px solid var(--line);background:var(--surface);color:var(--text);font-size:13px;font-weight:600;display:flex;align-items:center;justify-content:space-between;padding:0 10px 0 12px;cursor:pointer;transition:border-color .2s}
.d-in04 .fld.on{border-color:var(--accent)}
.d-in04 .fld svg{color:var(--muted);transition:transform .2s cubic-bezier(.2,.8,.2,1)}
.d-in04 .fld.on svg{transform:rotate(180deg);color:var(--accent)}
.d-in04 .lst{position:absolute;left:0;right:0;top:40px;z-index:3;border:1px solid var(--line);border-radius:10px;background:var(--surface);box-shadow:0 8px 20px rgba(0,0,0,.16);padding:4px;transform-origin:top;transform:scaleY(.6);opacity:0;pointer-events:none;transition:all .2s cubic-bezier(.2,.8,.2,1)}
.d-in04 .lst.on{transform:none;opacity:1;pointer-events:auto}
.d-in04 .lst div{font-size:12.5px;color:var(--text);height:25px;display:flex;align-items:center;justify-content:space-between;padding:0 8px;border-radius:6px;cursor:pointer}
.d-in04 .lst div.hi{background:var(--surface-2)}
.d-in04 .lst div.sel{color:var(--accent);font-weight:700}
.d-in04 .lst div svg{opacity:0}
.d-in04 .lst div.sel svg{opacity:1}
.d-in04 .ghost{margin-top:12px}
.d-in04 .ghost .fld{color:var(--muted);cursor:default}
`,
    html: `<div class="card"><span class="lb">인원</span>
  <div class="wrap"><button class="fld f1" type="button" aria-haspopup="listbox" aria-expanded="false"><span>성인 2명</span>${iIc('chev')}</button>
    <div class="lst" role="listbox" aria-label="인원">${[1, 2, 3, 4].map(n => `<div role="option" data-n="${n}" aria-selected="${n === 2}"${n === 2 ? ' class="sel"' : ''}>성인 ${n}명${iIc('check', 13, 3)}</div>`).join('')}</div></div>
  <div class="ghost"><span class="lb">객실</span><div class="fld"><span>스탠다드 더블</span>${iIc('chev')}</div></div></div>`,
    run(el, ctx) {
      const f1 = el.querySelector('.f1'), lst = el.querySelector('.lst'), ops = [...lst.children];
      let hiN = 2;
      const open = v => { lst.classList.toggle('on', v); f1.classList.toggle('on', v); f1.setAttribute('aria-expanded', v); };
      const hi = n => { hiN = n; ops.forEach(o => o.classList.toggle('hi', +o.dataset.n === n)); };
      const sel = n => { ops.forEach(o => { const s = +o.dataset.n === n; o.classList.toggle('sel', s); o.setAttribute('aria-selected', s); }); f1.querySelector('span').textContent = `성인 ${n}명`; hi(0); open(false); };
      ctx.on(f1, 'click', () => open(!lst.classList.contains('on')));
      ops.forEach(o => { ctx.on(o, 'click', () => sel(+o.dataset.n)); ctx.on(o, 'mouseenter', () => hi(+o.dataset.n)); });
      ctx.on(f1, 'keydown', e => {
        if (e.key === 'Escape') open(false);
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (!lst.classList.contains('on')) open(true); hi(Math.max(1, Math.min(4, hiN + (e.key === 'ArrowDown' ? 1 : -1)))); }
        if (e.key === 'Enter' && lst.classList.contains('on') && hiN) { e.preventDefault(); sel(hiN); }
      });
      iAuto(ctx, el, f1, () => open(true), 400);
      ctx.timeout(() => hi(3), 850);
      iAuto(ctx, el, () => ops[2], () => sel(3), 1350);
    }
  },

  /* ───────── in05 바텀시트 피커 ───────── */
  {
    id: 'in05', ko: '바텀시트 피커', en: 'Bottom sheet picker', pair: 'in04',
    desc: '드롭다운과 달리 화면 아래에서 선택지 목록이 올라와요.',
    prompt: '「바텀시트 피커(Bottom sheet picker)」로 배송 요청사항을 고르게 만들어 줘. 칸을 누르면 배경이 40% 어두워지고 아래에서 시트가 0.3초 ease-out으로 올라와 선택지 4개를 목록으로 보여 주며, 고르면 체크 후 내려가. 드롭다운과 헷갈리지 않게 칸 바로 아래로 펼치지 말고 휠처럼 굴리지도 마. role="dialog"와 Esc 닫기를 넣어 줘.',
    css: `
.d-in05 .ui-phone{position:relative}
.d-in05 .scr{padding:12px 14px}
.d-in05 .ttl{font-size:12.5px;font-weight:800;color:var(--text);margin-bottom:8px}
.d-in05 .lb{display:block;font-size:11px;font-weight:700;color:var(--muted);margin-bottom:4px}
.d-in05 .fld{width:100%;height:36px;border-radius:10px;border:1.5px solid var(--line);background:var(--surface);color:var(--text);font:inherit;font-size:12.5px;font-weight:600;display:flex;align-items:center;justify-content:space-between;padding:0 10px 0 12px;cursor:pointer;transition:border-color .2s}
.d-in05 .fld svg{color:var(--muted)}
.d-in05 .ui-line{margin-top:12px;width:70%}
.d-in05 .ui-line + .ui-line{margin-top:7px;width:45%}
.d-in05 .dim{position:absolute;inset:0;background:rgba(0,0,0,.4);opacity:0;pointer-events:none;transition:opacity .3s;z-index:4;cursor:pointer}
.d-in05 .dim.on{opacity:1;pointer-events:auto}
.d-in05 .sheet{position:absolute;left:0;right:0;bottom:0;z-index:5;background:var(--surface);border-radius:16px 16px 0 0;padding:6px 12px 8px;transform:translateY(105%);transition:transform .3s cubic-bezier(.2,.8,.2,1);box-shadow:0 -6px 18px rgba(0,0,0,.18)}
.d-in05 .sheet.on{transform:none}
.d-in05 .grab{width:32px;height:4px;border-radius:2px;background:var(--line);margin:0 auto 5px}
.d-in05 .sh{font-size:11px;font-weight:700;color:var(--muted);margin-bottom:2px}
.d-in05 .op{height:27px;display:flex;align-items:center;justify-content:space-between;font-size:12.5px;color:var(--text);border-top:1px solid var(--line);cursor:pointer;transition:color .15s}
.d-in05 .op:first-of-type{border-top:0}
.d-in05 .op svg{color:var(--accent);opacity:0;transform:scale(.5);transition:all .2s cubic-bezier(.2,.8,.2,1)}
.d-in05 .op.sel{color:var(--accent);font-weight:700}
.d-in05 .op.sel svg{opacity:1;transform:none}
.d-in05 .tap{position:absolute;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;background:var(--accent);pointer-events:none;z-index:9;opacity:0;animation:in05-tap .55s ease-out forwards}
@keyframes in05-tap{0%{opacity:.4;transform:scale(.3)}100%{opacity:0;transform:scale(1.5)}}
`,
    html: `<div class="ui-phone"><div class="scr"><div class="ttl">주문서</div><span class="lb">배송 요청사항</span>
    <button class="fld" type="button" aria-haspopup="dialog"><span>문 앞에 놔 주세요</span>${iIc('chev')}</button>
    <div class="ui-line"></div><div class="ui-line"></div></div>
  <div class="dim"></div>
  <div class="sheet" role="dialog" aria-modal="true" aria-label="배송 요청사항"><div class="grab"></div><div class="sh">배송 요청사항 선택</div>
    ${['문 앞에 놔 주세요', '경비실에 맡겨 주세요', '배송 전 연락 주세요', '택배함에 넣어 주세요'].map((t, i) => `<div class="op${i === 0 ? ' sel' : ''}" role="option" tabindex="0">${t}${iIc('check', 14, 3)}</div>`).join('')}</div></div>`,
    run(el, ctx) {
      const fld = el.querySelector('.fld'), dim = el.querySelector('.dim'), sheet = el.querySelector('.sheet'), ops = [...el.querySelectorAll('.op')];
      const open = v => { dim.classList.toggle('on', v); sheet.classList.toggle('on', v); };
      const pick = i => { ops.forEach((o, k) => o.classList.toggle('sel', k === i)); fld.querySelector('span').textContent = ops[i].textContent; ctx.timeout(() => open(false), 300); };
      ctx.on(fld, 'click', () => open(true)); ctx.on(dim, 'click', () => open(false));
      ops.forEach((o, i) => { ctx.on(o, 'click', () => pick(i)); iKey(ctx, o, () => pick(i)); });
      ctx.on(sheet, 'keydown', e => { if (e.key === 'Escape') open(false); });
      iAuto(ctx, el, fld, () => open(true), 350);
      iAuto(ctx, el, () => ops[2], () => pick(2), 1300);
    }
  },

  /* ───────── in06 캘린더 ───────── */
  {
    id: 'in06', ko: '캘린더', en: 'Calendar',
    desc: '한 달을 격자로 보여 주고, 날짜를 눌러 고르며 화살표로 달을 넘겨요.',
    prompt: '「캘린더(Calendar)」 날짜 선택기를 만들어 줘. 7열 월 격자에 오늘은 테두리 원, 선택한 날은 파란 채움 원이 0.25초 scale .6→1로 커지고, 화살표를 누르면 다음 달 격자가 오른쪽에서 24px 밀려 들어오며 fade-in 돼. 지난 날짜는 흐리게 막고, 격자는 role="grid"로 방향키 이동을 지원해 줘.',
    css: `
.d-in06 .cal{width:calc(100% - 24px);max-width:250px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);padding:9px 10px 8px}
.d-in06 .hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:3px}
.d-in06 .hd b{font-size:13px;font-weight:800;color:var(--text)}
.d-in06 .hd button{width:24px;height:24px;border-radius:7px;border:0;background:none;color:var(--text);display:grid;place-items:center;cursor:pointer;padding:0}
.d-in06 .hd button:hover{background:var(--surface-2)}
.d-in06 .wk,.d-in06 .gr{display:grid;grid-template-columns:repeat(7,1fr);text-align:center}
.d-in06 .wk span{font-size:11px;color:var(--muted);height:16px;line-height:16px}
.d-in06 .wk span:first-child,.d-in06 .gr .su{color:var(--danger)}
.d-in06 .vp{overflow:hidden}
.d-in06 .gr.in{animation:in06-in .32s cubic-bezier(.2,.8,.2,1)}
.d-in06 .gr span{height:21px;display:grid;place-items:center;font-size:11.5px;color:var(--text);position:relative;cursor:pointer;font-variant-numeric:tabular-nums}
.d-in06 .gr span::before{content:"";position:absolute;width:21px;height:21px;border-radius:50%;z-index:-1;left:50%;top:50%;transform:translate(-50%,-50%) scale(.6);opacity:0;transition:all .25s cubic-bezier(.2,.8,.2,1)}
.d-in06 .gr{position:relative;z-index:0}
.d-in06 .gr .past{color:var(--muted);opacity:.45;cursor:default}
.d-in06 .gr .today::before{opacity:1;transform:translate(-50%,-50%);border:1.5px solid var(--accent);background:none}
.d-in06 .gr .sel{color:var(--accent-text);font-weight:800}
.d-in06 .gr .sel::before{opacity:1;transform:translate(-50%,-50%);background:var(--accent);border:0}
.d-in06 .ft{font-size:11px;color:var(--muted);text-align:center;margin-top:2px;height:15px}
.d-in06 .ft b{color:var(--accent)}
.d-in06 .tap{position:absolute;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;background:var(--accent);pointer-events:none;z-index:9;opacity:0;animation:in06-tap .55s ease-out forwards}
@keyframes in06-tap{0%{opacity:.4;transform:scale(.3)}100%{opacity:0;transform:scale(1.5)}}
@keyframes in06-in{from{transform:translateX(24px);opacity:0}to{transform:none;opacity:1}}
`,
    html: `<div class="cal"><div class="hd"><button class="pv" type="button" aria-label="이전 달">${iIc('left')}</button><b class="mt" aria-live="polite"></b><button class="nx" type="button" aria-label="다음 달">${iIc('right')}</button></div>
  <div class="wk">${'일월화수목금토'.split('').map(d => `<span>${d}</span>`).join('')}</div>
  <div class="vp"><div class="gr" role="grid"></div></div>
  <div class="ft">날짜를 골라 주세요</div></div>`,
    run(el, ctx) {
      const gr = el.querySelector('.gr'), mt = el.querySelector('.mt'), ft = el.querySelector('.ft');
      const Y = 2026; let m = 10, sel = null; // 0-index month: 10 = 11월
      const wd = '일월화수목금토';
      const render = anim => {
        const first = new Date(Y, m, 1).getDay(), days = new Date(Y, m + 1, 0).getDate();
        mt.textContent = `${Y}년 ${m + 1}월`;
        let h = ''; for (let i = 0; i < first; i++) h += '<span></span>';
        for (let d = 1; d <= days; d++) {
          const dow = (first + d - 1) % 7, c = [];
          if (dow === 0) c.push('su');
          if (m === 10 && d < 23) c.push('past');
          if (m === 10 && d === 23) c.push('today');
          if (sel && sel.m === m && sel.d === d) c.push('sel');
          h += `<span class="${c.join(' ')}" data-d="${d}" role="gridcell">${d}</span>`;
        }
        gr.innerHTML = h;
        if (anim) { gr.classList.remove('in'); void gr.offsetWidth; gr.classList.add('in'); }
      };
      const pick = d => {
        sel = { m, d }; gr.querySelectorAll('.sel').forEach(x => x.classList.remove('sel'));
        const c = gr.querySelector(`[data-d="${d}"]`); c.classList.add('sel');
        ft.innerHTML = `<b>${m + 1}월 ${d}일 (${wd[new Date(Y, m, d).getDay()]})</b> 선택됨`;
      };
      ctx.on(gr, 'click', e => { const c = e.target.closest('[data-d]'); if (c && !c.classList.contains('past')) pick(+c.dataset.d); });
      const nx = el.querySelector('.nx'), pv = el.querySelector('.pv');
      ctx.on(nx, 'click', () => { if (m < 11) { m++; render(true); } });
      ctx.on(pv, 'click', () => { if (m > 10) { m--; render(true); } });
      render(false);
      iAuto(ctx, el, nx, () => { m = 11; render(true); }, 600);
      iAuto(ctx, el, () => gr.querySelector('[data-d="24"]'), () => pick(24), 1300);
    }
  },

  /* ───────── in07 기간 선택 ───────── */
  {
    id: 'in07', ko: '기간 선택', en: 'Date range picker',
    desc: '시작일과 종료일을 차례로 눌러 그 사이 기간을 띠로 채워 보여줘요.',
    prompt: '「기간 선택(Date range picker)」을 만들어 줘. 체크인 날짜를 누르면 파란 원, 체크아웃을 누르면 그 사이 날짜에 옅은 파란 띠가 왼쪽부터 30ms 간격으로 채워지고 상단 체크인·체크아웃 칸이 "12.15 (화)"·"12.18 (금)"으로 채워지고 옆에 "3박" 배지가 떠. 종료일이 시작일보다 앞이면 새 시작일로 바꾸고, 선택 범위는 aria-selected로 알려 줘.',
    css: `
.d-in07 .box{width:calc(100% - 24px);max-width:270px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);padding:10px}
.d-in07 .fs{display:flex;gap:6px;margin-bottom:8px}
.d-in07 .f{flex:1;min-width:0;border:1px solid var(--line);border-radius:9px;padding:4px 8px;transition:border-color .2s}
.d-in07 .f.act{border-color:var(--accent)}
.d-in07 .f small{display:block;font-size:11px;color:var(--muted);line-height:1.3}
.d-in07 .f b{display:block;font-size:12px;color:var(--text);line-height:1.35;white-space:nowrap;height:16px}
.d-in07 .n{flex:none;align-self:center;font-size:11px;font-weight:800;color:var(--accent);background:var(--accent-soft);border-radius:999px;padding:3px 7px;opacity:0;transition:opacity .25s}
.d-in07 .n.on{opacity:1}
.d-in07 .wk,.d-in07 .gr{display:grid;grid-template-columns:repeat(7,1fr);text-align:center}
.d-in07 .wk span{font-size:11px;color:var(--muted);height:15px;line-height:15px}
.d-in07 .gr{row-gap:3px}
.d-in07 .c{height:24px;display:grid;place-items:center;font-size:11.5px;color:var(--text);position:relative;cursor:pointer;z-index:0;font-variant-numeric:tabular-nums}
.d-in07 .c::after{content:"";position:absolute;inset:0;background:var(--accent-soft);z-index:-2;transform:scaleX(0);transform-origin:left;transition:transform .18s ease-out}
.d-in07 .c.in::after{transform:none}
.d-in07 .c.st::after{left:50%;transform:none}
.d-in07 .c.en::after{right:50%;transform:none}
.d-in07 .c.st.en::after{display:none}
.d-in07 .c::before{content:"";position:absolute;width:24px;height:24px;border-radius:50%;left:50%;top:50%;transform:translate(-50%,-50%) scale(.5);opacity:0;background:var(--accent);z-index:-1;transition:all .22s cubic-bezier(.2,.8,.2,1)}
.d-in07 .c.st::before,.d-in07 .c.en::before{opacity:1;transform:translate(-50%,-50%)}
.d-in07 .c.st,.d-in07 .c.en{color:var(--accent-text);font-weight:800}
.d-in07 .c.su{color:var(--danger)}
.d-in07 .c.st.su,.d-in07 .c.en.su{color:var(--accent-text)}
.d-in07 .tap{position:absolute;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;background:var(--accent);pointer-events:none;z-index:9;opacity:0;animation:in07-tap .55s ease-out forwards}
@keyframes in07-tap{0%{opacity:.4;transform:scale(.3)}100%{opacity:0;transform:scale(1.5)}}
`,
    html: `<div class="box"><div class="fs"><div class="f f1 act"><small>체크인</small><b>날짜 선택</b></div><div class="f f2"><small>체크아웃</small><b>-</b></div><span class="n">0박</span></div>
  <div class="wk">${'일월화수목금토'.split('').map(d => `<span>${d}</span>`).join('')}</div>
  <div class="gr" role="grid" aria-label="2026년 12월">${Array.from({ length: 21 }, (_, i) => `<span class="c${i % 7 === 0 ? ' su' : ''}" data-d="${i + 6}" role="gridcell" aria-selected="false">${i + 6}</span>`).join('')}</div></div>`,
    run(el, ctx) {
      const cs = [...el.querySelectorAll('.c')], f1 = el.querySelector('.f1'), f2 = el.querySelector('.f2'), n = el.querySelector('.n');
      const wd = '일월화수목금토'; const lab = d => `12.${d} (${wd[new Date(2026, 11, d).getDay()]})`;
      let s = null, e = null;
      const paint = () => {
        cs.forEach(c => { const d = +c.dataset.d; c.classList.remove('st', 'en', 'in'); c.style.transitionDelay = ''; c.setAttribute('aria-selected', 'false');
          if (d === s) c.classList.add('st'); if (d === e) c.classList.add('en'); });
        if (s && e) cs.forEach(c => { const d = +c.dataset.d; if (d >= s && d <= e) { c.setAttribute('aria-selected', 'true'); if (d > s && d < e) { c.style.transitionDelay = ((d - s) * 30) + 'ms'; ctx.raf(() => c.classList.add('in')); } } });
        f1.querySelector('b').textContent = s ? lab(s) : '날짜 선택'; f2.querySelector('b').textContent = e ? lab(e) : '-';
        f1.classList.toggle('act', !s || !!e); f2.classList.toggle('act', !!s && !e);
        n.textContent = e ? (e - s) + '박' : '0박'; n.classList.toggle('on', !!e);
      };
      const pick = d => { if (!s || e || d < s) { s = d; e = null; } else if (d > s) e = d; paint(); };
      cs.forEach(c => ctx.on(c, 'click', () => pick(+c.dataset.d)));
      iAuto(ctx, el, cs[9], () => pick(15), 500);
      iAuto(ctx, el, cs[12], () => pick(18), 1150);
    }
  },

  /* ───────── in08 휠 피커 ───────── */
  {
    id: 'in08', ko: '휠 피커', en: 'Wheel picker',
    desc: '돌림판처럼 위아래로 굴려 가운데 줄에 맞춘 값을 골라요. 시간·날짜 선택에 많이 써요.',
    prompt: '「휠 피커(Wheel picker)」로 알림 시간을 고르게 만들어 줘. 오전/오후·시·분 3열이 scroll-snap으로 28px 칸마다 멈추고, 가운데 줄에서 멀어질수록 rotateX 18°씩 기울며 투명도가 30%씩 줄어. 처음엔 각 열이 150ms 간격으로 굴러가 오후 7:30에 멈추고, 열마다 role="listbox"와 aria-activedescendant를 넣어 줘.',
    css: `
.d-in08 .box{width:calc(100% - 24px);max-width:250px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);padding:9px 10px 6px}
.d-in08 .hd{display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--muted);margin-bottom:2px}
.d-in08 .hd b{font-size:13px;color:var(--text);font-weight:800;font-variant-numeric:tabular-nums}
.d-in08 .wh{position:relative;display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;height:140px;perspective:400px}
.d-in08 .band{position:absolute;left:0;right:0;top:56px;height:28px;border-radius:9px;background:var(--surface-2);pointer-events:none}
.d-in08 .col{position:relative;height:140px;overflow-y:auto;scroll-snap-type:y mandatory;scrollbar-width:none;padding:56px 0;box-sizing:border-box;-webkit-mask-image:linear-gradient(transparent,#000 35%,#000 65%,transparent);mask-image:linear-gradient(transparent,#000 35%,#000 65%,transparent);cursor:grab;overscroll-behavior:contain}
.d-in08 .col::-webkit-scrollbar{display:none}
.d-in08 .col div{height:28px;display:grid;place-items:center;font-size:15px;font-weight:600;color:var(--text);scroll-snap-align:center;font-variant-numeric:tabular-nums;transform-style:preserve-3d}
`,
    html: `<div class="box"><div class="hd"><span>알림 시간</span><b class="val">오전 1:00</b></div>
  <div class="wh"><div class="band"></div>
    <div class="col" role="listbox" aria-label="오전 오후">${['오전', '오후'].map(t => `<div role="option">${t}</div>`).join('')}</div>
    <div class="col" role="listbox" aria-label="시">${Array.from({ length: 12 }, (_, i) => `<div role="option">${i + 1}</div>`).join('')}</div>
    <div class="col" role="listbox" aria-label="분">${Array.from({ length: 12 }, (_, i) => `<div role="option">${String(i * 5).padStart(2, '0')}</div>`).join('')}</div>
  </div></div>`,
    run(el, ctx) {
      const cols = [...el.querySelectorAll('.col')], val = el.querySelector('.val'), H = 28;
      const idx = c => Math.round(c.scrollTop / H);
      const upd = c => {
        [...c.children].forEach((it, i) => { const d = (i * H - c.scrollTop) / H, a = Math.abs(d); it.style.opacity = Math.max(.15, 1 - a * .3); it.style.transform = `rotateX(${-d * 18}deg) scale(${1 - Math.min(a, 3) * .05})`; });
        const t = cols.map(k => k.children[Math.min(k.children.length - 1, idx(k))].textContent);
        val.textContent = `${t[0]} ${t[1]}:${t[2]}`;
      };
      cols.forEach(c => { ctx.on(c, 'scroll', () => upd(c), { passive: true }); upd(c); });
      const targets = [1, 6, 6];
      cols.forEach((c, k) => {
        c.style.scrollSnapType = 'none';
        ctx.timeout(() => {
          const to = targets[k] * H;
          ctx.loop(t => { const p = Math.min(1, t / 1100); c.scrollTop = to * iEase(p); upd(c); if (p >= 1) { c.style.scrollSnapType = ''; return false; } });
        }, 300 + k * 150);
      });
    }
  },

  /* ───────── in09 슬라이더 ───────── */
  {
    id: 'in09', ko: '레인지 슬라이더', en: 'Range slider',
    desc: '막대 위 손잡이를 끌어 최소·최대 범위를 정해요. 가격·거리 필터에 자주 써요.',
    prompt: '「레인지 슬라이더(Range slider)」로 가격 필터를 만들어 줘. 손잡이 2개를 끌면 사이 트랙이 파랗게 채워지고 위 가격 분포 막대 중 범위 밖은 회색으로 바뀌며, 값은 5,000원 단위로 스냅해. 처음엔 손잡이가 0.9초 ease-out으로 2만~8만 원에 자리 잡고, 각 손잡이는 role="slider"로 방향키 조절이 되게 해 줘.',
    css: `
.d-in09 .box{width:calc(100% - 24px);max-width:290px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);padding:12px 16px 14px}
.d-in09 .hd{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px}
.d-in09 .hd span{font-size:12px;font-weight:700;color:var(--text)}
.d-in09 .hd b{font-size:12.5px;font-weight:800;color:var(--accent);font-variant-numeric:tabular-nums;white-space:nowrap}
.d-in09 .hist{display:flex;align-items:flex-end;gap:2px;height:44px;margin:0 0 -2px}
.d-in09 .hist i{flex:1;border-radius:2px 2px 0 0;background:var(--line);transition:background .2s}
.d-in09 .hist i.in{background:color-mix(in srgb,var(--accent) 55%,transparent)}
.d-in09 .tr{position:relative;height:28px;touch-action:none}
.d-in09 .rail{position:absolute;left:0;right:0;top:12px;height:4px;border-radius:2px;background:var(--line)}
.d-in09 .fill{position:absolute;top:12px;height:4px;background:var(--accent);border-radius:2px}
.d-in09 .th{position:absolute;top:3px;width:22px;height:22px;margin-left:-11px;border-radius:50%;background:#fff;border:2px solid var(--accent);box-shadow:0 2px 6px rgba(0,0,0,.18);cursor:grab;touch-action:none;transition:transform .15s}
.d-in09 .th:active,.d-in09 .th.drag{transform:scale(1.15);cursor:grabbing}
.d-in09 .th:focus-visible{outline:3px solid var(--accent-soft)}
.d-in09 .ax{display:flex;justify-content:space-between;font-size:11px;color:var(--muted)}
`,
    html: `<div class="box"><div class="hd"><span>가격</span><b class="v">0원 – 100,000원</b></div>
  <div class="hist">${[3, 5, 8, 12, 18, 26, 34, 40, 44, 41, 36, 30, 26, 20, 16, 12, 9, 6, 4, 3].map(h => `<i style="height:${h}px"></i>`).join('')}</div>
  <div class="tr"><div class="rail"></div><div class="fill"></div>
    <div class="th a" role="slider" tabindex="0" aria-label="최소 가격" aria-valuemin="0" aria-valuemax="100000"></div>
    <div class="th b" role="slider" tabindex="0" aria-label="최대 가격" aria-valuemin="0" aria-valuemax="100000"></div></div>
  <div class="ax"><span>0원</span><span>10만원+</span></div></div>`,
    run(el, ctx) {
      const tr = el.querySelector('.tr'), fill = el.querySelector('.fill'), A = el.querySelector('.th.a'), B = el.querySelector('.th.b'), v = el.querySelector('.v'), bars = [...el.querySelectorAll('.hist i')];
      let lo = 0, hi = 100;
      const won = p => (Math.round(p * 1000)).toLocaleString('ko-KR') + '원';
      const draw = () => {
        A.style.left = lo + '%'; B.style.left = hi + '%'; fill.style.left = lo + '%'; fill.style.width = (hi - lo) + '%';
        v.textContent = `${won(lo)} – ${won(hi)}`;
        A.setAttribute('aria-valuenow', lo * 1000); B.setAttribute('aria-valuenow', hi * 1000);
        bars.forEach((b, i) => { const c = (i + .5) * 5; b.classList.toggle('in', c >= lo && c <= hi); });
      };
      draw();
      let auto = true;
      ctx.timeout(() => ctx.loop(t => { if (!auto) return false; const p = Math.min(1, t / 900), e = iEase(p); lo = Math.round(20 * e); hi = Math.round(100 - 20 * e); draw(); return p < 1; }), 400);
      const snap = p => Math.round(Math.max(0, Math.min(100, p)) / 5) * 5;
      [A, B].forEach(th => {
        const set = p => { auto = false; if (th === A) lo = Math.min(snap(p), hi - 5); else hi = Math.max(snap(p), lo + 5); draw(); };
        ctx.on(th, 'pointerdown', e => { th.setPointerCapture(e.pointerId); th.classList.add('drag'); e.preventDefault(); });
        ctx.on(th, 'pointermove', e => { if (!th.hasPointerCapture(e.pointerId)) return; const r = tr.getBoundingClientRect(); set((e.clientX - r.left) / r.width * 100); });
        ctx.on(th, 'pointerup', () => th.classList.remove('drag'));
        ctx.on(th, 'keydown', e => { const cur = th === A ? lo : hi; if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { set(cur - 5); e.preventDefault(); } if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { set(cur + 5); e.preventDefault(); } });
      });
    }
  },

  /* ───────── in10 칩 ───────── */
  {
    id: 'in10', ko: '칩', en: 'Chip', pair: 'in11',
    desc: '배지와 달리 눌러서 조건을 켜고 끄는 작은 버튼이에요.',
    prompt: '「칩(Chip)」으로 숙소 필터를 만들어 줘. 둥근 칩을 누르면 0.2초 만에 파란 채움으로 바뀌고 왼쪽에 12px 체크가 밀려 나오며, 위 결과 수가 바로 줄어들어. 다시 누르면 해제돼. 상태 배지와 헷갈리지 않게 표시만 하는 라벨처럼 만들지 말고 반드시 누를 수 있게 해. button에 aria-pressed를 넣어 줘.',
    css: iBase('in10') + `
.d-in10 .ttl b{font-size:12px;color:var(--accent);font-variant-numeric:tabular-nums;transition:transform .2s}
.d-in10 .ttl b.bump{animation:in10-bump .3s ease-out}
.d-in10 .chips{display:flex;flex-wrap:wrap;gap:7px;margin-top:4px}
.d-in10 .chip{height:32px;padding:0 13px;border-radius:999px;border:1.5px solid var(--line);background:var(--surface);color:var(--text);font-size:12.5px;font-weight:600;display:inline-flex;align-items:center;cursor:pointer;transition:all .2s cubic-bezier(.2,.8,.2,1)}
.d-in10 .chip:hover{border-color:var(--accent)}
.d-in10 .chip svg{width:0;opacity:0;margin-right:0;transition:all .2s cubic-bezier(.2,.8,.2,1)}
.d-in10 .chip[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:var(--accent-text)}
.d-in10 .chip[aria-pressed="true"] svg{width:12px;opacity:1;margin-right:5px}
.d-in10 .hint{margin-top:10px;font-size:11px;color:var(--muted)}
@keyframes in10-bump{50%{transform:scale(1.2)}}
`,
    html: `<div class="card"><div class="ttl">숙소 필터<b class="n" aria-live="polite">128개</b></div>
  <div class="chips">${['캠핑', '조식 포함', '반려견 동반', '바다뷰', '수영장'].map(t => `<button class="chip" type="button" aria-pressed="false">${iIc('check', 12, 3)}${t}</button>`).join('')}</div>
  <div class="hint">눌러서 켜고, 다시 눌러 꺼요</div></div>`,
    run(el, ctx) {
      const chips = [...el.querySelectorAll('.chip')], n = el.querySelector('.n'), cut = [.6, .7, .45, .55, .65];
      const upd = () => {
        let v = 128; chips.forEach((c, i) => { if (c.getAttribute('aria-pressed') === 'true') v = Math.max(1, Math.round(v * cut[i])); });
        n.textContent = v + '개'; n.classList.remove('bump'); void n.offsetWidth; n.classList.add('bump');
      };
      const tg = c => { c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') !== 'true'); upd(); };
      chips.forEach(c => ctx.on(c, 'click', () => tg(c)));
      iAuto(ctx, el, chips[1], () => tg(chips[1]), 500);
      iAuto(ctx, el, chips[3], () => tg(chips[3]), 1100);
    }
  },

  /* ───────── in11 상태 배지 ───────── */
  {
    id: 'in11', ko: '상태 배지', en: 'Status badge', pair: 'in10',
    desc: '칩과 달리 누를 수 없고 NEW·BEST처럼 상태만 알려 줘요.',
    prompt: '「상태 배지(Status badge)」를 상품 카드에 붙여 줘. 사진 왼쪽 위 "NEW"·"BEST" 배지가 0.35초 scale 0→1로 150ms 차이를 두고 나타나고, 1.2초 뒤 "무료배송"이 회색 "품절" 배지로 바뀌며 1.2배로 튀었다 돌아와. 칩과 헷갈리지 않게 hover·클릭 효과나 cursor:pointer는 넣지 마. 품절 배지는 role="status"로 읽어 줘.',
    css: iBase('in11') + `
.d-in11 .card{display:flex;gap:12px;align-items:center;cursor:default}
.d-in11 .ph{position:relative;flex:none;width:92px;height:92px;border-radius:12px;background:var(--accent-soft);display:grid;place-items:center;color:var(--accent)}
.d-in11 .ph > svg{opacity:.55}
.d-in11 .bg{position:absolute;top:7px;font-size:10.5px;font-weight:800;letter-spacing:.04em;color:#fff;padding:2px 6px;border-radius:5px;line-height:1.35;transform:scale(0);transform-origin:left center}
.d-in11 .new{left:7px;background:var(--danger);animation:in11-in .35s .35s cubic-bezier(.2,.8,.2,1) forwards}
.d-in11 .best{left:46px;background:#14171c;box-shadow:0 0 0 1px rgba(255,255,255,.14);animation:in11-in .35s .5s cubic-bezier(.2,.8,.2,1) forwards}
.d-in11 .info{flex:1;min-width:0}
.d-in11 .nm{font-size:12.5px;font-weight:700;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-in11 .pr{font-size:13px;font-weight:800;color:var(--text);margin:2px 0 6px}
.d-in11 .soft{display:inline-block;font-size:10.5px;font-weight:700;color:var(--success);background:color-mix(in srgb,var(--success) 14%,transparent);padding:2px 7px;border-radius:5px;opacity:0;animation:in11-fade .3s .8s ease-out forwards}
.d-in11 .st{position:relative;height:20px}
.d-in11 .st > span{position:absolute;left:0;top:0}
.d-in11 .so{display:none;font-size:10.5px;font-weight:800;color:#fff;background:#6b7280;padding:2px 7px;border-radius:5px;transform-origin:left center}
.d-in11 .so.on{display:inline-block;animation:in11-pop .4s cubic-bezier(.2,.8,.2,1)}
@keyframes in11-in{to{transform:scale(1)}}
@keyframes in11-fade{to{opacity:1}}
@keyframes in11-pop{0%{transform:scale(1)}45%{transform:scale(1.2)}100%{transform:scale(1)}}
`,
    html: `<div class="card"><div class="ph">${iIc('photo', 28, 1.8)}<span class="bg new">NEW</span><span class="bg best">BEST</span></div>
  <div class="info"><div class="nm">캠핑 의자</div><div class="pr">39,000원</div><div class="st"><span class="soft">무료배송</span><span class="so" role="status">품절</span></div></div></div>`,
    run(el, ctx) {
      const soft = el.querySelector('.soft'), so = el.querySelector('.so');
      ctx.timeout(() => { soft.style.display = 'none'; so.classList.add('on'); }, 1200);
    }
  },

  /* ───────── in12 플레이스홀더 ───────── */
  {
    id: 'in12', ko: '플레이스홀더', en: 'Placeholder', pair: 'in13',
    desc: '플로팅 라벨과 달리 입력을 시작하면 안내 글자가 사라져요.',
    prompt: '「플레이스홀더(Placeholder)」가 있는 입력칸을 만들어 줘. 칸 안 회색 예시 "예) name@email.com"은 첫 글자를 입력하는 순간 사라지고, 포커스되면 테두리가 0.2초 동안 파란색으로 바뀌어. 플로팅 라벨과 헷갈리지 않게 안내 글자를 위로 올리거나 남기지 말고, 칸 이름은 칸 위 고정 <label for>로 따로 둬.',
    css: iBase('in12') + `
.d-in12 .fd + .fd{margin-top:10px}
.d-in12 label{display:block;font-size:11.5px;font-weight:700;color:var(--text);margin-bottom:4px}
.d-in12 input{width:100%;height:38px;box-sizing:border-box;font:inherit;font-size:13px;color:var(--text);background:var(--surface);border:1.5px solid var(--line);border-radius:10px;outline:none;padding:0 12px;transition:border-color .2s}
.d-in12 input::placeholder{color:var(--muted);opacity:.85}
.d-in12 input:focus,.d-in12 .f input{border-color:var(--accent)}
`,
    html: `<div class="card"><div class="fd"><label for="in12-a">이메일</label><input id="in12-a" type="email" placeholder="예) name@email.com" autocomplete="off"></div>
  <div class="fd"><label for="in12-b">휴대폰 번호</label><input id="in12-b" type="tel" placeholder="010-0000-0000" autocomplete="off"></div></div>`,
    run(el, ctx) {
      const [a, b] = el.querySelectorAll('input');
      const type = (inp, txt, delay) => {
        ctx.timeout(() => inp.parentElement.classList.add('f'), delay);
        for (let i = 1; i <= txt.length; i++) ctx.timeout(() => { inp.value = txt.slice(0, i); }, delay + 200 + i * 55);
        ctx.timeout(() => inp.parentElement.classList.remove('f'), delay + 300 + txt.length * 55);
      };
      type(a, 'hi@jeju.kr', 350);
      type(b, '010-12', 1350);
    }
  },

  /* ───────── in13 플로팅 라벨 ───────── */
  {
    id: 'in13', ko: '플로팅 라벨', en: 'Floating label', pair: 'in12',
    desc: '플레이스홀더와 달리 입력해도 라벨이 위로 올라가 남아요.',
    prompt: '「플로팅 라벨(Floating label)」 입력칸을 만들어 줘. 처음엔 라벨이 칸 안 가운데에 있다가 포커스되면 0.2초 ease-out으로 위로 10px 올라가며 80% 크기·파란색이 되고, 값이 있으면 그 자리에 계속 남아. 플레이스홀더와 헷갈리지 않게 입력 시 라벨이 사라지면 안 돼. 라벨은 <label for>로 input과 연결해 줘.',
    css: iBase('in13') + `
.d-in13 .fl{position:relative}
.d-in13 .fl + .fl{margin-top:10px}
.d-in13 input{width:100%;height:46px;box-sizing:border-box;font:inherit;font-size:13px;color:var(--text);background:var(--surface);border:1.5px solid var(--line);border-radius:10px;outline:none;padding:17px 12px 0;transition:border-color .2s}
.d-in13 input:focus,.d-in13 .f input{border-color:var(--accent)}
.d-in13 label{position:absolute;left:13px;top:14px;font-size:13px;color:var(--muted);pointer-events:none;transform-origin:left top;transition:transform .2s ease-out,color .2s}
.d-in13 input:focus + label,.d-in13 input:not(:placeholder-shown) + label,.d-in13 .f label{transform:translateY(-10px) scale(.8);color:var(--accent);font-weight:700}
.d-in13 input:not(:focus):not(:placeholder-shown) + label{color:var(--muted)}
.d-in13 .f input + label{color:var(--accent)}
`,
    html: `<div class="card"><div class="fl"><input id="in13-a" type="email" placeholder=" " autocomplete="off"><label for="in13-a">이메일</label></div>
  <div class="fl"><input id="in13-b" type="tel" placeholder=" " autocomplete="off"><label for="in13-b">휴대폰 번호</label></div></div>`,
    run(el, ctx) {
      const [a, b] = el.querySelectorAll('input');
      const type = (inp, txt, delay) => {
        ctx.timeout(() => inp.parentElement.classList.add('f'), delay);
        for (let i = 1; i <= txt.length; i++) ctx.timeout(() => { inp.value = txt.slice(0, i); }, delay + 300 + i * 55);
        ctx.timeout(() => inp.parentElement.classList.remove('f'), delay + 400 + txt.length * 55);
      };
      type(a, 'hi@jeju.kr', 350);
      type(b, '010-12', 1350);
    }
  },

  /* ───────── in14 약관 동의 ───────── */
  {
    id: 'in14', ko: '약관 동의', en: 'Terms agreement',
    desc: '전체 동의 한 번에 하위 항목이 모두 체크되고, 필수를 다 고르면 버튼이 켜져요.',
    prompt: '「약관 동의(Terms agreement)」 화면을 만들어 줘. "전체 동의"를 누르면 하위 항목 체크가 위에서부터 80ms 간격으로 차례로 켜지고, 필수 항목이 모두 체크되면 하단 버튼이 회색에서 파란색으로 0.25초 전환돼. 하위를 하나라도 끄면 전체 동의도 풀리고, 전체 동의는 aria-checked="mixed"로 일부 선택을 알려 줘.',
    css: iBase('in14') + `
.d-in14 .box{width:calc(100% - 24px);max-width:268px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);padding:10px 12px 12px;display:flex;flex-direction:column}
.d-in14 .all{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:800;color:var(--text);cursor:pointer;padding:2px 0 8px;border-bottom:1px solid var(--line);margin-bottom:5px}
.d-in14 .all .cb{width:22px;height:22px;border-radius:50%}
.d-in14 .all .cb svg{width:13px;height:13px}
.d-in14 .all.mixed .cb{border-color:var(--accent)}
.d-in14 .it{display:flex;align-items:center;gap:7px;height:24px;font-size:11.5px;color:var(--text);cursor:pointer;white-space:nowrap;min-width:0}
.d-in14 .it .cb{width:16px;height:16px;border:0;background:none;color:var(--line)}
.d-in14 .it .cb svg{width:14px;height:14px;stroke-dashoffset:0}
.d-in14 .it.on .cb{background:none;color:var(--accent)}
.d-in14 .it em{font-style:normal;font-weight:700;color:var(--accent)}
.d-in14 .it em.opt{color:var(--muted)}
.d-in14 .it .t{overflow:hidden;text-overflow:ellipsis;flex:1;min-width:0}
.d-in14 .it svg.ar{flex:none;color:var(--muted);width:13px;height:13px}
.d-in14 .go{margin-top:8px;height:34px;border-radius:10px;border:0;font-size:12.5px;font-weight:700;background:var(--surface-2);color:var(--muted);cursor:not-allowed;transition:background .25s,color .25s}
.d-in14 .go.on{background:var(--accent);color:var(--accent-text);cursor:pointer}
`,
    html: `<div class="box"><div class="all" role="checkbox" aria-checked="false" tabindex="0">${iCb()}전체 동의</div>
  ${[['필수', '이용약관 동의'], ['필수', '개인정보 수집·이용'], ['선택', '마케팅 정보 수신']].map(([k, t]) => `<div class="it${k === '필수' ? ' req' : ''}" role="checkbox" aria-checked="false" tabindex="0">${iCb()}<em class="${k === '선택' ? 'opt' : ''}">[${k}]</em><span class="t">${t}</span>${iIc('right', 13).replace('<svg', '<svg class="ar"')}</div>`).join('')}
  <button class="go" type="button" disabled>동의하고 시작하기</button></div>`,
    run(el, ctx) {
      const all = el.querySelector('.all'), its = [...el.querySelectorAll('.it')], go = el.querySelector('.go');
      const sync = () => {
        const n = its.filter(i => i.classList.contains('on')).length;
        all.classList.toggle('on', n === its.length); all.classList.toggle('mixed', n > 0 && n < its.length);
        all.setAttribute('aria-checked', n === its.length ? 'true' : n ? 'mixed' : 'false');
        const ok = its.filter(i => i.classList.contains('req')).every(i => i.classList.contains('on'));
        go.classList.toggle('on', ok); go.disabled = !ok;
      };
      const setIt = (i, v) => { i.classList.toggle('on', v); i.setAttribute('aria-checked', v); };
      const toggleAll = () => { const v = !all.classList.contains('on'); all.classList.toggle('on', v); its.forEach((i, k) => ctx.timeout(() => { setIt(i, v); sync(); }, 80 * (k + 1))); };
      ctx.on(all, 'click', toggleAll);
      its.forEach(i => ctx.on(i, 'click', () => { setIt(i, !i.classList.contains('on')); sync(); }));
      [all, ...its].forEach(x => ctx.on(x, 'keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); x.click(); } }));
      iAuto(ctx, el, () => all.querySelector('.cb'), toggleAll, 700);
    }
  }
]);
