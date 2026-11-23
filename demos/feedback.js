/* feedback — 피드백·알림 (fb01~fb13, v2 분할) */
const FB_I = {
  check: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>',
  info: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5v.5"/></svg>',
  share: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 8l5-5 5 5M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/></svg>',
  link: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
  msg: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4z"/></svg>',
  mail: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  bell: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
  cart: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2l2.2 11h11l2-8H6.2"/><circle cx="9" cy="19.5" r="1.5"/><circle cx="17" cy="19.5" r="1.5"/></svg>',
  chat: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4z"/></svg>',
  box: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z"/><path d="m3 7.5 9 4.5 9-4.5M12 12v9"/></svg>',
  pin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  bag: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  plane: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21 15.5v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V8.5l-8 5v2l8-2.5V18l-2 1.5V21l3.5-1 3.5 1v-1.5L13 18v-5z"/></svg>',
  search: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>'
};
const fbTap = (stage, t) => {
  if (!t) return;
  const s = stage.getBoundingClientRect(), r = t.getBoundingClientRect();
  const d = document.createElement('span');
  d.style.cssText = `position:absolute;left:${r.left - s.left + r.width / 2 - 14}px;top:${r.top - s.top + r.height / 2 - 14}px;width:28px;height:28px;border-radius:50%;background:var(--text);pointer-events:none;z-index:30;opacity:0`;
  stage.appendChild(d);
  const a = d.animate([{ transform: 'scale(.5)', opacity: .32 }, { transform: 'scale(1.5)', opacity: 0 }], { duration: 520, easing: 'ease-out' });
  a.onfinish = () => d.remove();
};
/* 단독 카드용 공통 화면 (id별로 스코프) */
const fbSc = id => `
.d-${id} .sc{position:relative;width:236px;height:176px;border-radius:18px;background:var(--surface);box-shadow:var(--shadow);overflow:hidden;padding:14px 14px;display:flex;flex-direction:column;gap:8px;word-break:keep-all;box-sizing:border-box}
.d-${id} .tp{display:flex;justify-content:space-between;align-items:center;flex:none}
.d-${id} .tp b{font-size:13px;color:var(--text)}
`;

UIDEX.add('feedback', [
  /* fb01 토스트 */
  {
    id: 'fb01', ko: '토스트', en: 'Toast', pair: 'fb02',
    desc: '스낵바와 달리 버튼 없이 잠깐 떴다 저절로 사라져요.',
    prompt: '「토스트(Toast)」 알림을 만들어 줘. 저장 버튼을 누르면 화면 아래에서 8px 떠오르며 0.25초 페이드인하는 짧은 문구 "저장했어요"가 뜨고, 2초 뒤 저절로 사라져. role="status"와 aria-live="polite"로 읽히게 해 줘. 스낵바와 헷갈리지 않게 되돌리기 같은 버튼은 넣지 마.',
    css: fbSc('fb01') + `
.d-fb01 .ui-thumb{height:58px;flex:none;border-radius:10px}
.d-fb01 .sv{height:28px;padding:0 12px;border:0;border-radius:8px;background:var(--accent);color:var(--accent-text);font:inherit;font-size:12px;font-weight:700;cursor:pointer}
.d-fb01 .tst{position:absolute;left:50%;bottom:16px;transform:translate(-50%,8px);opacity:0;display:flex;align-items:center;gap:5px;padding:9px 15px;border-radius:999px;background:var(--text);color:var(--surface);font-size:12px;font-weight:600;white-space:nowrap;transition:opacity .25s,transform .3s cubic-bezier(.2,.8,.2,1);pointer-events:none}
.d-fb01 .tst span{display:flex;align-items:center;gap:5px}
.d-fb01 .tst svg{color:var(--success)}
.d-fb01 .tst.on{opacity:1;transform:translate(-50%,0)}
`,
    html: `<div class="sc"><div class="tp"><b>제주 3박 4일 일정</b><button class="sv" type="button">저장</button></div>
  <div class="ui-thumb"></div><div class="ui-line" style="width:88%"></div><div class="ui-line" style="width:62%"></div>
  <div class="tst" role="status" aria-live="polite"><span>${FB_I.check}저장했어요</span></div></div>`,
    run(el, ctx) {
      const tst = el.querySelector('.tst'), sv = el.querySelector('.sv');
      let tt = null;
      const toast = () => {
        tst.classList.remove('on'); void tst.offsetWidth; tst.classList.add('on');
        clearTimeout(tt); tt = ctx.timeout(() => tst.classList.remove('on'), 2000);
      };
      ctx.timeout(() => { fbTap(el, sv); toast(); }, 400);
      ctx.on(sv, 'click', toast);
    }
  },

  /* fb02 스낵바 */
  {
    id: 'fb02', ko: '스낵바', en: 'Snackbar', pair: 'fb01',
    desc: '토스트와 달리 "되돌리기" 같은 버튼이 붙어 바로 행동할 수 있어요.',
    prompt: '「스낵바(Snackbar)」를 만들어 줘. 장바구니 항목을 삭제하면 화면 하단에 "삭제했어요" 문구와 "되돌리기" 버튼이 있는 바가 12px 아래에서 0.3초 ease-out으로 올라오고, 4초 이상 유지돼. 되돌리기를 누르면 항목이 복구되고 바가 닫혀. 버튼은 키보드로 포커스할 수 있게 해. 토스트와 헷갈리지 않게 버튼 없이 2초 만에 사라지게 하지 마.',
    css: fbSc('fb02') + `
.d-fb02 .it{display:flex;gap:9px;align-items:center;height:30px;overflow:hidden;flex:none;cursor:pointer;transition:height .3s cubic-bezier(.2,.8,.2,1),opacity .25s,margin .3s}
.d-fb02 .it i{width:30px;height:30px;border-radius:8px;background:var(--accent-soft);flex:none}
.d-fb02 .it span{flex:1;display:flex;flex-direction:column;gap:5px}
.d-fb02 .it span em{display:block;font-style:normal;font-size:11px;font-weight:600;color:var(--text)}
.d-fb02 .it.del{height:0;opacity:0;margin:-4px 0}
.d-fb02 .snk{position:absolute;left:8px;right:8px;bottom:8px;height:38px;border-radius:10px;background:var(--text);color:var(--surface);display:flex;align-items:center;justify-content:space-between;padding:0 4px 0 12px;font-size:12px;font-weight:600;transform:translateY(12px);opacity:0;transition:opacity .25s,transform .3s cubic-bezier(.2,.8,.2,1);pointer-events:none}
.d-fb02 .snk.on{opacity:1;transform:none;pointer-events:auto}
.d-fb02 .snk button{border:0;background:none;font:inherit;font-size:12px;font-weight:800;color:color-mix(in srgb,var(--accent) 62%,var(--surface));cursor:pointer;padding:7px 8px;border-radius:7px}
.d-fb02 .snk button:hover{background:color-mix(in srgb,var(--surface) 14%,transparent)}
`,
    html: `<div class="sc"><div class="tp"><b>장바구니 3</b></div>
  <div class="it"><i></i><span><em>캠핑 의자</em><b class="ui-line" style="width:60%"></b></span></div>
  <div class="it dx"><i></i><span><em>접이식 테이블</em><b class="ui-line" style="width:45%"></b></span></div>
  <div class="it"><i></i><span><em>LED 랜턴</em><b class="ui-line" style="width:52%"></b></span></div>
  <div class="snk" role="status" aria-live="polite">삭제했어요<button type="button">되돌리기</button></div></div>`,
    run(el, ctx) {
      const snk = el.querySelector('.snk'), undo = snk.querySelector('button'), items = [...el.querySelectorAll('.it')];
      const del = it => { items.forEach(x => x.classList.remove('del')); it.classList.add('del'); ctx.timeout(() => snk.classList.add('on'), 150); };
      ctx.timeout(() => { const dx = el.querySelector('.dx'); fbTap(el, dx); del(dx); }, 400);
      ctx.timeout(() => undo.style.background = 'color-mix(in srgb,var(--surface) 14%,transparent)', 1300);
      ctx.on(undo, 'click', e => { e.stopPropagation(); undo.style.background = ''; snk.classList.remove('on'); items.forEach(x => x.classList.remove('del')); });
      items.forEach(it => ctx.on(it, 'click', () => del(it)));
    }
  },

  /* fb03 팝업 */
  {
    id: 'fb03', ko: '팝업', en: 'Popup', pair: 'fb04',
    desc: '모달과 달리 배경을 막지 않아 뒤 화면을 계속 쓸 수 있어요.',
    prompt: '「팝업(Popup)」을 만들어 줘. 쿠폰 안내처럼 무시해도 되는 정보를 화면 아래에 카드로 띄우고, 14px 아래에서 0.35초 ease-out으로 올라오게 해. 떠 있는 동안에도 뒤 화면의 필터 버튼을 그대로 누를 수 있고, "오늘 그만 보기"와 "닫기"로 닫혀. 닫기 버튼에 aria-label을 붙여 줘. 모달과 헷갈리지 않게 딤(어두운 배경)을 깔거나 뒤 화면 클릭을 막지 마.',
    css: fbSc('fb03') + `
.d-fb03 .fc{height:26px;padding:0 11px;border-radius:999px;border:1px solid var(--line);background:var(--surface);font:inherit;font-size:11px;color:var(--text);font-weight:600;cursor:pointer;transition:all .2s}
.d-fb03 .fc.on{background:var(--accent);border-color:var(--accent);color:var(--accent-text)}
.d-fb03 .row{display:flex;gap:8px;flex:none}
.d-fb03 .row .ui-thumb{flex:1;height:44px;border-radius:9px}
.d-fb03 .pop{position:absolute;left:10px;right:10px;bottom:10px;background:var(--surface);border:1px solid var(--line);border-radius:14px;box-shadow:0 10px 24px -6px rgba(0,0,0,.28);padding:10px 12px 0;opacity:0;transform:translateY(14px);transition:opacity .25s,transform .35s cubic-bezier(.2,.8,.2,1);pointer-events:none}
.d-fb03 .pop.on{opacity:1;transform:none;pointer-events:auto}
.d-fb03 .pop b{display:block;font-size:12px;color:var(--text)}
.d-fb03 .pop span{display:block;font-size:12px;color:var(--accent);font-weight:700;margin-top:1px}
.d-fb03 .pop .ft{display:flex;justify-content:space-between;margin-top:7px;border-top:1px solid var(--line)}
.d-fb03 .pop .ft a{font-size:11px;color:var(--muted);padding:6px 0;cursor:pointer}
`,
    html: `<div class="sc"><div class="tp"><b>제주 숙소</b><button class="fc" type="button">오션뷰</button></div>
  <div class="row"><div class="ui-thumb"></div><div class="ui-thumb"></div></div><div class="ui-line" style="width:70%"></div>
  <div class="pop" role="region" aria-label="쿠폰 안내"><b>12월 쿠폰이 도착했어요</b><span>숙소 최대 20% 할인</span><div class="ft"><a>오늘 그만 보기</a><a class="x" aria-label="팝업 닫기">닫기</a></div></div></div>`,
    run(el, ctx) {
      const sc = el.querySelector('.sc'), pop = el.querySelector('.pop'), fc = el.querySelector('.fc');
      ctx.timeout(() => pop.classList.add('on'), 300);
      ctx.timeout(() => { fbTap(el, fc); fc.classList.add('on'); }, 1200);
      ctx.on(fc, 'click', e => { e.stopPropagation(); fc.classList.toggle('on'); });
      pop.querySelectorAll('.ft a').forEach(a => ctx.on(a, 'click', e => { e.stopPropagation(); pop.classList.remove('on'); }));
      ctx.on(sc, 'click', () => pop.classList.add('on'));
    }
  },

  /* fb04 모달 */
  {
    id: 'fb04', ko: '모달', en: 'Modal', pair: 'fb03',
    desc: '팝업과 달리 배경을 어둡게 잠가 이 창을 처리해야 다음으로 넘어가요.',
    prompt: '「모달(Modal)」 대화상자를 만들어 줘. 예약 취소처럼 답이 꼭 필요할 때 45% 딤을 깔고, 가운데 창이 0.95배에서 1배로 0.2초 ease-out으로 커지며 열려. 딤을 누르면 닫히지 않고 창이 살짝 튀어 답을 요구해. 포커스를 창 안에 가두고 Esc로 닫혀. 팝업과 헷갈리지 않게 딤 없이 띄우거나 뒤 화면을 누를 수 있게 두지 마.',
    css: fbSc('fb04') + `
.d-fb04 .fc{height:26px;padding:0 11px;border-radius:999px;border:1px solid var(--line);background:var(--surface);font:inherit;font-size:11px;color:var(--text);font-weight:600;cursor:pointer}
.d-fb04 .ui-thumb{height:50px;flex:none;border-radius:10px}
.d-fb04 .dim{position:absolute;inset:0;background:rgba(8,10,14,.45);opacity:0;transition:opacity .25s;pointer-events:none;cursor:not-allowed}
.d-fb04 .dim.on{opacity:1;pointer-events:auto}
.d-fb04 .mdl{position:absolute;left:22px;right:22px;top:50%;background:var(--surface);border-radius:16px;padding:16px 12px 12px;text-align:center;box-shadow:0 14px 30px rgba(0,0,0,.32);opacity:0;transform:translateY(-50%) scale(.95);transition:opacity .2s,transform .2s cubic-bezier(.2,.8,.2,1);pointer-events:none}
.d-fb04 .mdl.on{opacity:1;transform:translateY(-50%) scale(1);pointer-events:auto}
.d-fb04 .mdl.nudge{animation:fb04-nudge .32s ease-out}
@keyframes fb04-nudge{40%{transform:translateY(-50%) scale(1.06)}}
.d-fb04 .mdl b{display:block;font-size:13px;color:var(--text);letter-spacing:-.02em}
.d-fb04 .mdl small{display:block;font-size:11px;color:var(--muted);margin:3px 0 12px}
.d-fb04 .mdl .bt{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.d-fb04 .mdl button{height:30px;padding:0;white-space:nowrap;border:0;border-radius:9px;font:inherit;font-size:12px;font-weight:700;cursor:pointer;background:var(--surface-2);color:var(--text)}
.d-fb04 .mdl button.no{background:var(--danger);color:#fff}
.d-fb04 .op{align-self:center;margin-top:auto;height:28px;padding:0 14px;border:0;border-radius:8px;background:var(--danger);color:#fff;font:inherit;font-size:12px;font-weight:700;cursor:pointer}
`,
    html: `<div class="sc"><div class="tp"><b>예약 상세</b><button class="fc" type="button">공유</button></div>
  <div class="ui-thumb"></div><div class="ui-line" style="width:75%"></div>
  <button class="op" type="button">예약 취소</button>
  <div class="dim"></div>
  <div class="mdl" role="dialog" aria-modal="true" aria-labelledby="fb04h"><b id="fb04h">예약을 취소할까요?</b><small>지금 취소하면 수수료가 없어요</small><div class="bt"><button type="button">아니요</button><button class="no" type="button">취소하기</button></div></div></div>`,
    run(el, ctx) {
      const dim = el.querySelector('.dim'), mdl = el.querySelector('.mdl'), op = el.querySelector('.op');
      const openM = () => { dim.classList.add('on'); mdl.classList.add('on'); };
      const closeM = () => { dim.classList.remove('on'); mdl.classList.remove('on'); };
      const nudge = () => { mdl.classList.remove('nudge'); void mdl.offsetWidth; mdl.classList.add('nudge'); };
      ctx.timeout(() => { fbTap(el, op); openM(); }, 350);
      ctx.timeout(() => { fbTap(el, el.querySelector('.fc')); nudge(); }, 1300);
      ctx.on(op, 'click', openM);
      ctx.on(dim, 'click', e => { e.stopPropagation(); nudge(); });
      mdl.querySelectorAll('button').forEach(b => ctx.on(b, 'click', e => { e.stopPropagation(); closeM(); }));
    }
  },

  /* fb05 툴팁 */
  {
    id: 'fb05', ko: '툴팁', en: 'Tooltip', pair: 'fb06',
    desc: '팝오버와 달리 누를 것 없이 짧은 설명만 잠깐 보여 줘요.',
    prompt: '「툴팁(Tooltip)」을 만들어 줘. 가격 옆 ⓘ 아이콘에 마우스를 올리거나 키보드로 포커스하면 "부가세·배송비 포함" 한 줄 설명이 위쪽에 3px 떠오르며 150ms 페이드로 뜨고, 벗어나면 바로 사라져. role="tooltip"과 aria-describedby로 연결해 줘. 팝오버와 헷갈리지 않게 링크·버튼처럼 누를 수 있는 요소는 넣지 마.',
    css: fbSc('fb05') + `
.d-fb05 .sc{align-items:center;justify-content:center;gap:6px}
.d-fb05 .ui-thumb{width:64px;height:46px;border-radius:10px;flex:none}
.d-fb05 .cap{font-size:12px;color:var(--muted)}
.d-fb05 .pr{position:relative;display:inline-flex;align-items:center;gap:4px}
.d-fb05 .pr b{font-size:20px;letter-spacing:-.03em;color:var(--text)}
.d-fb05 .ib{width:26px;height:26px;border:0;border-radius:50%;background:none;color:var(--muted);cursor:pointer;display:grid;place-items:center;padding:0;transition:color .15s}
.d-fb05 .ib:hover,.d-fb05 .ib.hv{color:var(--accent)}
.d-fb05 .tip{position:absolute;right:-12px;bottom:calc(100% + 8px);padding:6px 10px;border-radius:8px;background:var(--text);color:var(--surface);font-size:12px;font-weight:600;white-space:nowrap;opacity:0;transform:translateY(3px);transition:opacity .15s,transform .2s ease-out;pointer-events:none}
.d-fb05 .tip:after{content:"";position:absolute;right:20px;top:100%;border:5px solid transparent;border-top-color:var(--text)}
.d-fb05 .tip.on{opacity:1;transform:none}
`,
    html: `<div class="sc"><div class="ui-thumb"></div><span class="cap">캠핑 의자 1개</span>
  <div class="pr"><b>39,000원</b><button class="ib" type="button" aria-label="가격 안내" aria-describedby="fb05t">${FB_I.info}</button><span class="tip" id="fb05t" role="tooltip">부가세·배송비 포함</span></div></div>`,
    run(el, ctx) {
      const ib = el.querySelector('.ib'), tip = el.querySelector('.tip');
      let th = null;
      const show = auto => { tip.classList.add('on'); ib.classList.add('hv'); clearTimeout(th); if (auto) th = ctx.timeout(hide, auto); };
      const hide = () => { tip.classList.remove('on'); ib.classList.remove('hv'); };
      ctx.timeout(() => { fbTap(el, ib); show(2600); }, 400);
      ctx.on(ib, 'mouseenter', () => show(0));
      ctx.on(ib, 'focus', () => show(0));
      ctx.on(ib, 'mouseleave', hide);
      ctx.on(ib, 'blur', hide);
      ctx.on(ib, 'click', () => show(1500));
    }
  },

  /* fb06 팝오버 */
  {
    id: 'fb06', ko: '팝오버', en: 'Popover', pair: 'fb05',
    desc: '툴팁과 달리 눌러서 열고, 안의 선택지를 고를 수 있어요.',
    prompt: '「팝오버(Popover)」 메뉴를 만들어 줘. 공유 버튼을 누르면 링크 복사·메시지·이메일 항목이 담긴 작은 창이 화살표와 함께 버튼 위로 0.9배에서 1배로 0.2초 ease-out 커지며 열려. 항목을 고르거나 바깥을 누르거나 Esc를 누르면 닫히고, aria-expanded를 함께 바꿔 줘. 툴팁과 헷갈리지 않게 마우스를 올리기만 해서는 열리지 않게 해.',
    css: fbSc('fb06') + `
.d-fb06 .sc{align-items:center;justify-content:flex-end;padding-bottom:18px}
.d-fb06 .shb{height:34px;padding:0 16px;border-radius:10px;border:1px solid var(--line);background:var(--surface);color:var(--text);font:inherit;font-size:13px;font-weight:600;display:inline-flex;align-items:center;gap:6px;cursor:pointer;transition:all .2s}
.d-fb06 .shb.on{border-color:var(--accent);color:var(--accent);background:var(--accent-soft)}
.d-fb06 .pv{position:absolute;left:50%;bottom:62px;width:132px;margin-left:-66px;background:var(--surface);border:1px solid var(--line);border-radius:12px;box-shadow:0 12px 26px -6px rgba(0,0,0,.28);padding:5px;transform-origin:50% 100%;opacity:0;transform:scale(.9) translateY(4px);transition:opacity .2s,transform .2s cubic-bezier(.2,.8,.2,1);pointer-events:none}
.d-fb06 .pv:after{content:"";position:absolute;left:50%;top:100%;margin-left:-5px;width:10px;height:10px;background:var(--surface);border-right:1px solid var(--line);border-bottom:1px solid var(--line);transform:translateY(-5px) rotate(45deg)}
.d-fb06 .pv.on{opacity:1;transform:none;pointer-events:auto}
.d-fb06 .pv a{display:flex;align-items:center;gap:7px;height:28px;padding:0 9px;border-radius:8px;font-size:12px;font-weight:600;color:var(--text);cursor:pointer;transition:background .15s}
.d-fb06 .pv a svg{color:var(--muted)}
.d-fb06 .pv a:hover,.d-fb06 .pv a.hv{background:var(--surface-2)}
.d-fb06 .ok{position:absolute;left:50%;top:14px;transform:translateX(-50%);font-size:11px;color:var(--success);font-weight:700;opacity:0;transition:opacity .2s;white-space:nowrap}
.d-fb06 .ok.on{opacity:1}
`,
    html: `<div class="sc"><span class="ok" aria-live="polite"></span>
  <div class="pv" role="menu"><a role="menuitem">${FB_I.link}링크 복사</a><a role="menuitem">${FB_I.msg}메시지</a><a role="menuitem">${FB_I.mail}이메일</a></div>
  <button class="shb" type="button" aria-haspopup="menu" aria-expanded="false">${FB_I.share}공유</button></div>`,
    run(el, ctx) {
      const sc = el.querySelector('.sc'), shb = el.querySelector('.shb'), pv = el.querySelector('.pv'), ok = el.querySelector('.ok'), items = [...pv.querySelectorAll('a')];
      const setPv = o => { pv.classList.toggle('on', o); shb.classList.toggle('on', o); shb.setAttribute('aria-expanded', o); if (o) ok.classList.remove('on'); };
      ctx.timeout(() => { fbTap(el, shb); setPv(true); }, 400);
      ctx.timeout(() => items[0].classList.add('hv'), 1200);
      ctx.on(shb, 'click', e => { e.stopPropagation(); items.forEach(i => i.classList.remove('hv')); setPv(!pv.classList.contains('on')); });
      items.forEach(a => ctx.on(a, 'click', e => { e.stopPropagation(); setPv(false); ok.textContent = a.textContent.trim() + ' 선택'; ok.classList.add('on'); }));
      ctx.on(sc, 'click', () => setPv(false));
    }
  },

  /* fb07 알림 배지 */
  {
    id: 'fb07', ko: '알림 배지', en: 'Notification badge',
    desc: '아이콘 모서리의 빨간 숫자·점으로 안 읽은 알림이 있다는 걸 알려요.',
    prompt: '「알림 배지(Notification badge)」를 만들어 줘. 종 아이콘 오른쪽 위에 빨간 원형 숫자 배지를 두고, 새 알림이 오면 0→1.25→1배로 0.3초 튀어 오르며 숫자가 1씩 늘고 종이 ±12도 흔들려. 99개가 넘으면 "99+"로 줄이고, 아이콘 버튼 aria-label에 "알림 3개"처럼 개수를 함께 읽어 줘.',
    css: `
.d-fb07 .box{display:grid;justify-items:center;gap:12px}
.d-fb07 .dock{display:flex;gap:22px;padding:14px 22px;border-radius:20px;background:var(--surface);box-shadow:var(--shadow)}
.d-fb07 .ibt{position:relative;width:44px;height:44px;border:0;border-radius:13px;background:var(--surface-2);color:var(--text);cursor:pointer;display:grid;place-items:center;padding:0}
.d-fb07 .ibt svg{transform-origin:50% 10%}
.d-fb07 .ibt.ring svg{animation:fb07-ring .5s ease-out}
@keyframes fb07-ring{20%{transform:rotate(12deg)}45%{transform:rotate(-10deg)}70%{transform:rotate(5deg)}}
.d-fb07 .bd{position:absolute;top:-5px;right:-6px;min-width:19px;height:19px;padding:0 5px;border-radius:10px;background:var(--danger);color:#fff;font-size:11px;font-weight:800;line-height:19px;text-align:center;border:2px solid var(--surface);box-sizing:content-box;transform:scale(0);font-variant-numeric:tabular-nums}
.d-fb07 .bd.on{transform:scale(1)}
.d-fb07 .bd.pop{animation:fb07-pop .32s cubic-bezier(.2,.8,.2,1)}
.d-fb07 .bd.off{transform:scale(0);transition:transform .2s ease-in}
@keyframes fb07-pop{0%{transform:scale(.4)}60%{transform:scale(1.25)}100%{transform:scale(1)}}
.d-fb07 .dot{position:absolute;top:7px;right:7px;width:9px;height:9px;border-radius:50%;background:var(--danger);border:2px solid var(--surface-2)}
.d-fb07 .dot:after{content:"";position:absolute;inset:-2px;border-radius:50%;border:2px solid var(--danger);animation:fb07-pulse 1.6s ease-out infinite}
@keyframes fb07-pulse{0%{transform:scale(1);opacity:.8}100%{transform:scale(2.4);opacity:0}}
.d-fb07 .cap{font-size:12px;color:var(--muted);font-weight:600;transition:opacity .2s}
.d-fb07 .cap b{color:var(--text)}
`,
    html: `<div class="box">
  <div class="dock">
    <button class="ibt bell" type="button" aria-label="알림 0개">${FB_I.bell}<span class="bd">0</span></button>
    <button class="ibt cart" type="button" aria-label="장바구니 0개">${FB_I.cart}<span class="bd">0</span></button>
    <button class="ibt" type="button" aria-label="새 메시지 있음">${FB_I.chat}<span class="dot"></span></button>
  </div>
  <div class="cap">새 알림 <b>0</b>개</div>
</div>`,
    run(el, ctx) {
      const bell = el.querySelector('.bell'), cart = el.querySelector('.cart'), bb = bell.querySelector('.bd'), cb = cart.querySelector('.bd'), cap = el.querySelector('.cap');
      let n = 0, c = 0;
      const pop = (b, v) => { b.textContent = v > 99 ? '99+' : v; b.classList.remove('pop', 'off'); void b.offsetWidth; b.classList.add('on', 'pop'); };
      const addN = () => { n++; pop(bb, n); bell.classList.remove('ring'); void bell.offsetWidth; bell.classList.add('ring'); bell.setAttribute('aria-label', `알림 ${n}개`); cap.innerHTML = `새 알림 <b>${n}</b>개`; };
      const addC = () => { c++; pop(cb, c); cart.setAttribute('aria-label', `장바구니 ${c}개`); };
      ctx.timeout(addN, 450); ctx.timeout(addC, 750); ctx.timeout(addN, 1050); ctx.timeout(addN, 1550);
      ctx.on(bell, 'click', () => { if (!n) { addN(); return; } n = 0; bb.classList.remove('pop', 'on'); bb.classList.add('off'); bell.setAttribute('aria-label', '알림 0개'); cap.innerHTML = '모두 읽었어요'; });
      ctx.on(cart, 'click', addC);
    }
  },

  /* fb08 푸시 알림 */
  {
    id: 'fb08', ko: '푸시 알림', en: 'Push notification',
    desc: '앱을 안 켜도 잠금화면 위로 내려오는 알림 배너예요.',
    prompt: '「푸시 알림(Push notification)」 배너를 만들어 줘. 잠금화면 위쪽에서 앱 아이콘·제목·본문 2줄이 담긴 반투명 카드가 0.45초 동안 cubic-bezier(.2,.8,.2,1)로 내려오고, 알림이 더 오면 뒤에 겹친 카드가 살짝 보이게 쌓여. 위로 밀면 사라지고, 본문은 aria-live="polite"로 읽혀야 해.',
    css: `
.d-fb08 .ui-phone{background:linear-gradient(165deg,var(--accent-soft),var(--surface-2) 70%)}
.d-fb08 .tm{position:absolute;left:0;right:0;top:82px;text-align:center;transition:transform .45s cubic-bezier(.2,.8,.2,1)}
.d-fb08 .tm b{display:block;font-size:40px;font-weight:700;letter-spacing:-.04em;line-height:1}
.d-fb08 .tm span{font-size:11px;color:var(--muted);font-weight:600}
.d-fb08 .stk{position:absolute;left:8px;right:8px;top:8px}
.d-fb08 .nt{position:relative;display:flex;gap:8px;padding:8px 9px;border-radius:14px;background:color-mix(in srgb,var(--surface) 90%,transparent);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 6px 18px -6px rgba(0,0,0,.22);cursor:pointer;opacity:0;transform:translateY(-120%);transition:opacity .3s,transform .45s cubic-bezier(.2,.8,.2,1);z-index:2}
.d-fb08 .nt.on{opacity:1;transform:none}
.d-fb08 .nt.up{opacity:0;transform:translateY(-120%)}
.d-fb08 .back{position:absolute;left:10px;right:10px;top:8px;height:100%;border-radius:14px;background:color-mix(in srgb,var(--surface) 70%,transparent);box-shadow:0 4px 12px -6px rgba(0,0,0,.2);opacity:0;transform:scale(.9);transition:opacity .3s,transform .35s cubic-bezier(.2,.8,.2,1);z-index:1}
.d-fb08 .back.on{opacity:1;transform:translateY(0) scale(.94)}
.d-fb08 .ap{width:28px;height:28px;border-radius:8px;background:var(--accent);color:var(--accent-text);display:grid;place-items:center;flex:none}
.d-fb08 .tx{flex:1;min-width:0}
.d-fb08 .tx .h{display:flex;justify-content:space-between;font-size:12px;font-weight:700}
.d-fb08 .tx .h span{font-size:11px;color:var(--muted);font-weight:500}
.d-fb08 .tx p{margin:1px 0 0;word-break:keep-all;font-size:11px;line-height:1.35;color:var(--text);opacity:.85}
`,
    html: `<div class="ui-phone">
  <div class="tm"><b>9:41</b><span>11월 23일 월요일</span></div>
  <div class="stk"><div class="back"></div>
    <div class="nt" role="status" aria-live="polite"><div class="ap">${FB_I.box}</div><div class="tx"><div class="h">배송 출발<span>지금</span></div><p>주문하신 캠핑 의자가 오늘 저녁 도착해요</p></div></div>
  </div>
</div>`,
    run(el, ctx) {
      const nt = el.querySelector('.nt'), back = el.querySelector('.back'), tm = el.querySelector('.tm'), ph = el.querySelector('.ui-phone');
      const show = () => { nt.classList.remove('up'); nt.classList.add('on'); tm.style.transform = 'translateY(10px)'; };
      ctx.timeout(show, 450);
      ctx.timeout(() => back.classList.add('on'), 1350);
      ctx.on(nt, 'click', e => { e.stopPropagation(); nt.classList.add('up'); back.classList.remove('on'); tm.style.transform = ''; });
      ctx.on(ph, 'click', () => { if (nt.classList.contains('up')) { show(); ctx.timeout(() => back.classList.add('on'), 700); } });
    }
  },

  /* fb09 권한 요청 */
  {
    id: 'fb09', ko: '권한 요청', en: 'Permission request',
    desc: '위치·알림 권한을 묻기 전에 왜 필요한지 먼저 설명하고 시스템 창을 띄워요.',
    prompt: '「권한 요청(Permission request)」 흐름을 만들어 줘. 먼저 앱 안 카드로 "주변 숙소를 찾으려면 위치가 필요해요"를 설명하고, "위치 허용하기"를 누를 때만 navigator.geolocation으로 진짜 시스템 권한 창을 띄워. 거절하면 기능을 막지 말고 대체 안내를 보여 주고, 권한 창 버튼은 키보드로도 고를 수 있게 해 줘.',
    css: `
.d-fb09 .map{position:absolute;inset:0;background:var(--surface-2);background-image:linear-gradient(var(--line) 2px,transparent 2px),linear-gradient(90deg,var(--line) 2px,transparent 2px);background-size:44px 38px;background-position:10px 6px}
.d-fb09 .rd{position:absolute;left:-10px;right:-10px;top:74px;height:10px;background:var(--surface);opacity:.8;transform:rotate(-12deg)}
.d-fb09 .mp{position:absolute;left:96px;top:54px;color:var(--accent);opacity:0;transform:translateY(-14px);transition:opacity .2s,transform .4s cubic-bezier(.2,.8,.2,1)}
.d-fb09 .mp.on{opacity:1;transform:none}
.d-fb09 .st{position:absolute;left:50%;top:10px;transform:translate(-50%,-6px);opacity:0;height:24px;padding:0 10px;border-radius:999px;background:var(--surface);box-shadow:var(--shadow);font-size:11px;font-weight:700;display:flex;align-items:center;gap:4px;white-space:nowrap;transition:opacity .25s,transform .3s cubic-bezier(.2,.8,.2,1)}
.d-fb09 .st.on{opacity:1;transform:translate(-50%,0)}
.d-fb09 .st.ok{color:var(--success)}.d-fb09 .st.no{color:var(--muted)}
.d-fb09 .soft{position:absolute;left:9px;right:9px;bottom:9px;background:var(--surface);border-radius:14px;box-shadow:0 8px 22px -6px rgba(0,0,0,.25);padding:10px;opacity:0;transform:translateY(16px);transition:opacity .25s,transform .35s cubic-bezier(.2,.8,.2,1)}
.d-fb09 .soft.on{opacity:1;transform:none}
.d-fb09 .soft .r{display:flex;gap:8px;align-items:center;margin-bottom:8px}
.d-fb09 .soft .r i{width:28px;height:28px;border-radius:50%;background:var(--accent-soft);color:var(--accent);display:grid;place-items:center;flex:none}
.d-fb09 .soft .r b{font-size:12px;line-height:1.35;letter-spacing:-.02em}
.d-fb09 .soft .ui-btn{width:100%;height:30px;font-size:12px}
.d-fb09 .dim{position:absolute;inset:0;background:rgba(8,10,14,.38);opacity:0;pointer-events:none;transition:opacity .25s}
.d-fb09 .dim.on{opacity:1}
.d-fb09 .sys{position:absolute;left:50%;top:50%;width:184px;margin:0 0 0 -92px;border-radius:14px;background:color-mix(in srgb,var(--surface) 94%,transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);text-align:center;overflow:hidden;opacity:0;transform:translateY(-50%) scale(1.1);transition:opacity .2s,transform .25s cubic-bezier(.2,.8,.2,1);pointer-events:none;box-shadow:0 12px 30px rgba(0,0,0,.28)}
.d-fb09 .sys.on{opacity:1;transform:translateY(-50%) scale(1);pointer-events:auto}
.d-fb09 .sys b{display:block;font-size:12px;line-height:1.35;padding:11px 12px 2px;letter-spacing:-.02em}
.d-fb09 .sys small{display:block;font-size:11px;color:var(--muted);padding:0 12px 9px}
.d-fb09 .sys button{display:block;width:100%;height:26px;border:0;border-top:1px solid var(--line);background:none;font:inherit;font-size:12px;font-weight:600;color:var(--accent);cursor:pointer}
.d-fb09 .sys button:hover,.d-fb09 .sys button:focus-visible{background:var(--surface-2);outline:none}
`,
    html: `<div class="ui-phone">
  <div class="map"></div><div class="rd"></div><div class="mp">${FB_I.pin.replace('width="16" height="16"', 'width="26" height="26"')}</div>
  <div class="st"></div>
  <div class="soft"><div class="r"><i>${FB_I.pin}</i><b>주변 숙소를 찾으려면<br>위치 정보가 필요해요</b></div><button class="ui-btn ask" type="button">위치 허용하기</button></div>
  <div class="dim"></div>
  <div class="sys" role="alertdialog" aria-label="위치 권한"><b>'트립'이 내 위치를<br>사용하도록 허용할까요?</b><small>주변 숙소 추천에만 쓰여요</small>
    <button type="button" data-v="1">앱 사용 중 허용</button><button type="button" data-v="1">한 번 허용</button><button type="button" data-v="0">허용 안 함</button></div>
</div>`,
    run(el, ctx) {
      const soft = el.querySelector('.soft'), ask = el.querySelector('.ask'), dim = el.querySelector('.dim'), sys = el.querySelector('.sys'), st = el.querySelector('.st'), mp = el.querySelector('.mp');
      const openSys = () => { soft.classList.remove('on'); dim.classList.add('on'); sys.classList.add('on'); };
      ctx.timeout(() => soft.classList.add('on'), 300);
      ctx.timeout(() => { fbTap(el, ask); openSys(); }, 1050);
      ctx.on(ask, 'click', openSys);
      sys.querySelectorAll('button').forEach(b => ctx.on(b, 'click', () => {
        const ok = b.dataset.v === '1';
        dim.classList.remove('on'); sys.classList.remove('on');
        st.className = 'st on ' + (ok ? 'ok' : 'no');
        st.innerHTML = ok ? FB_I.pin + '위치 사용 중' : '지역을 직접 골라 주세요';
        mp.classList.toggle('on', ok);
        ctx.timeout(() => { st.classList.remove('on'); soft.classList.add('on'); }, 2200);
      }));
    }
  },

  /* fb10 코치마크 */
  {
    id: 'fb10', ko: '코치마크', en: 'Coach mark',
    desc: '화면을 어둡게 덮고 버튼 하나만 동그랗게 밝혀 "여기를 눌러 보세요"라고 알려 줘요.',
    prompt: '「코치마크(Coach mark)」를 만들어 줘. 화면 전체를 검정 62% 딤으로 덮고 안내할 버튼만 구멍 낸 듯 밝힌 뒤, 옆에 말풍선(설명·"1/2"·다음)을 붙여. "다음"을 누르면 밝은 구멍이 다음 요소로 0.45초 동안 크기와 위치를 바꾸며 이동해. 첫 실행 1회만 보여 주고, Esc나 "건너뛰기"로 언제든 닫히게 해 줘.',
    css: `
.d-fb10 .hd2{display:flex;justify-content:space-between;align-items:center;padding:12px 12px 8px}
.d-fb10 .hd2 b{font-size:15px;letter-spacing:-.03em}
.d-fb10 .add{width:28px;height:28px;border-radius:50%;border:0;background:var(--accent);color:var(--accent-text);display:grid;place-items:center;padding:0}
.d-fb10 .cps{display:flex;gap:6px;padding:0 12px 10px}
.d-fb10 .cps span{height:24px;padding:0 9px;border-radius:999px;border:1px solid var(--line);font-size:11px;font-weight:600;display:inline-flex;align-items:center}
.d-fb10 .cps span.on{background:var(--text);color:var(--surface);border-color:var(--text)}
.d-fb10 .rw{display:flex;gap:8px;align-items:center;padding:6px 12px}
.d-fb10 .rw i{width:30px;height:30px;border-radius:8px;background:var(--accent-soft);flex:none}
.d-fb10 .rw div{flex:1;display:grid;gap:5px}
.d-fb10 .ov{position:absolute;inset:0;opacity:0;pointer-events:none;transition:opacity .3s;cursor:pointer}
.d-fb10 .ov.on{opacity:1;pointer-events:auto}
.d-fb10 .spot{position:absolute;border-radius:999px;box-shadow:0 0 0 0 rgba(8,10,14,.62),0 0 0 500px rgba(8,10,14,.62);transition:left .45s cubic-bezier(.2,.8,.2,1),top .45s cubic-bezier(.2,.8,.2,1),width .45s cubic-bezier(.2,.8,.2,1),height .45s cubic-bezier(.2,.8,.2,1)}
.d-fb10 .spot:after{content:"";position:absolute;inset:-4px;border-radius:inherit;border:2px solid rgba(255,255,255,.7);animation:fb10-ring 1.4s ease-out infinite}
@keyframes fb10-ring{0%{transform:scale(1);opacity:.9}100%{transform:scale(1.35);opacity:0}}
.d-fb10 .tip{position:absolute;width:148px;background:var(--surface);border-radius:11px;padding:8px 10px;box-shadow:0 10px 24px rgba(0,0,0,.3);transition:left .45s cubic-bezier(.2,.8,.2,1),top .45s cubic-bezier(.2,.8,.2,1)}
.d-fb10 .tip:before{content:"";position:absolute;top:-5px;width:10px;height:10px;background:var(--surface);transform:rotate(45deg);left:var(--ax,120px);transition:left .45s cubic-bezier(.2,.8,.2,1)}
.d-fb10 .tip b{position:relative;display:block;font-size:12px;letter-spacing:-.02em;line-height:1.35}
.d-fb10 .tip .f{display:flex;justify-content:space-between;align-items:center;margin-top:6px;font-size:11px;color:var(--muted)}
.d-fb10 .tip button{border:0;background:none;font:inherit;font-size:11px;font-weight:700;color:var(--accent);cursor:pointer;padding:2px 0}
`,
    html: `<div class="ui-phone">
  <div class="hd2"><b>내 일정</b><button class="add" type="button" aria-label="일정 추가">${FB_I.plus}</button></div>
  <div class="cps"><span class="on wk">이번 주</span><span>다음 주</span><span>지난 일정</span></div>
  <div class="rw"><i></i><div><span class="ui-line" style="width:80%"></span><span class="ui-line" style="width:50%"></span></div></div>
  <div class="rw"><i></i><div><span class="ui-line" style="width:65%"></span><span class="ui-line" style="width:40%"></span></div></div>
  <div class="ov" role="dialog" aria-label="사용 안내"><div class="spot"></div><div class="tip"><b class="t"></b><div class="f"><span class="n"></span><button class="nx" type="button">다음</button></div></div></div>
</div>`,
    run(el, ctx) {
      const ph = el.querySelector('.ui-phone'), ov = el.querySelector('.ov'), spot = el.querySelector('.spot'), tip = el.querySelector('.tip'), nx = el.querySelector('.nx');
      const T = [el.querySelector('.add'), el.querySelector('.wk')], TX = ['+를 눌러 새 일정을 추가해요', '기간별로 일정을 모아 봐요'];
      let step = -1;
      const go = i => {
        step = i;
        const p = ph.getBoundingClientRect(), r = T[i].getBoundingClientRect(), pad = 5;
        const x = r.left - p.left - pad, y = r.top - p.top - pad, w = r.width + pad * 2, h = r.height + pad * 2;
        Object.assign(spot.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px' });
        const tl = Math.max(8, Math.min(p.width - 156, x + w / 2 - (i === 0 ? 128 : 20)));
        tip.style.left = tl + 'px'; tip.style.top = (y + h + 9) + 'px';
        tip.style.setProperty('--ax', (x + w / 2 - tl - 5) + 'px');
        tip.querySelector('.t').textContent = TX[i];
        tip.querySelector('.n').textContent = `${i + 1}/2 · 건너뛰기`;
        nx.textContent = i === 1 ? '완료' : '다음';
        ov.classList.add('on');
      };
      spot.style.transition = tip.style.transition = 'none'; go(0); ov.classList.remove('on');
      void spot.offsetWidth; spot.style.transition = tip.style.transition = '';
      ctx.timeout(() => ov.classList.add('on'), 350);
      ctx.timeout(() => { fbTap(el, nx); go(1); }, 1350);
      ctx.on(nx, 'click', e => { e.stopPropagation(); if (step === 0) go(1); else { ov.classList.remove('on'); step = -1; } });
      ctx.on(ov, 'click', () => { ov.classList.remove('on'); step = -1; });
      ctx.on(ph, 'click', e => { if (step === -1 && !ov.contains(e.target)) go(0); });
    }
  },

  /* fb11 빈 화면 */
  {
    id: 'fb11', ko: '빈 화면', en: 'Empty state',
    desc: '보여 줄 내용이 없을 때 그림·한 줄 설명·다음 행동 버튼으로 막막하지 않게 해요.',
    prompt: '「빈 화면(Empty state)」을 만들어 줘. 장바구니가 비었을 때 가운데에 옅은 파랑 원 속 가방 아이콘, "장바구니가 비어 있어요" 제목, 한 줄 설명, "상품 둘러보기" 버튼을 세로로 놓고 80ms 간격으로 아래에서 떠오르게 해. 아이콘은 2.4초 주기로 4px 둥실거리고, prefers-reduced-motion이면 멈춰 줘.',
    css: `
.d-fb11 .ui-phone{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.d-fb11 .ui-phone>*{opacity:0;animation:fb11-up .5s cubic-bezier(.2,.8,.2,1) forwards}
.d-fb11 .ui-phone>:nth-child(2){animation-delay:.28s}.d-fb11 .ui-phone>:nth-child(3){animation-delay:.36s}.d-fb11 .ui-phone>:nth-child(4){animation-delay:.44s}
.d-fb11 .ui-phone>:nth-child(1){animation-delay:.2s}
@keyframes fb11-up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.d-fb11 .ic{position:relative;width:62px;height:70px;display:flex;flex-direction:column;align-items:center}
.d-fb11 .ic .c{width:58px;height:58px;border-radius:50%;background:var(--accent-soft);color:var(--accent);display:grid;place-items:center;animation:fb11-bob 2.4s ease-in-out infinite}
.d-fb11 .ic .sh{width:34px;height:6px;border-radius:50%;background:var(--text);opacity:.1;margin-top:5px;animation:fb11-sh 2.4s ease-in-out infinite}
@keyframes fb11-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes fb11-sh{0%,100%{transform:scaleX(1);opacity:.12}50%{transform:scaleX(.75);opacity:.06}}
.d-fb11 .ic .c.jump{animation:fb11-jump .45s cubic-bezier(.2,.8,.2,1)}
@keyframes fb11-jump{40%{transform:translateY(-10px) rotate(-8deg)}}
.d-fb11 b{font-size:14px;letter-spacing:-.03em;margin-top:6px}
.d-fb11 span{font-size:11px;color:var(--muted);margin:3px 0 10px}
.d-fb11 .ui-btn{height:30px;font-size:12px;padding:0 14px}
`,
    html: `<div class="ui-phone">
  <div class="ic"><div class="c">${FB_I.bag}</div><div class="sh"></div></div>
  <b>장바구니가 비어 있어요</b>
  <span>마음에 드는 캠핑 용품을 담아 보세요</span>
  <button class="ui-btn" type="button">상품 둘러보기</button>
</div>`,
    run(el, ctx) {
      const b = el.querySelector('.ui-btn'), c = el.querySelector('.ic .c');
      ctx.on(b, 'click', () => { fbTap(el, b); c.classList.remove('jump'); void c.offsetWidth; c.classList.add('jump'); ctx.timeout(() => c.classList.remove('jump'), 460); });
    }
  },

  /* fb12 에러 흔들림 */
  {
    id: 'fb12', ko: '에러 흔들림', en: 'Shake error',
    desc: '틀린 값을 넣으면 입력칸이 좌우로 도리도리 흔들리며 빨갛게 바뀌어요.',
    prompt: '「에러 흔들림(Shake error)」을 만들어 줘. 비밀번호가 틀리면 입력칸이 0.42초 동안 좌우 8→6→3px로 줄어들며 흔들리고 테두리가 빨간색으로 바뀌며, 아래에 "비밀번호가 맞지 않아요" 문구가 페이드인돼. 입력칸에 aria-invalid="true"와 aria-describedby로 오류 문구를 연결하고, prefers-reduced-motion이면 흔들림 없이 색만 바꿔 줘.',
    css: `
.d-fb12 .bx2{width:228px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);padding:14px}
.d-fb12 label{display:block;font-size:11px;font-weight:700;color:var(--muted);margin-bottom:5px}
.d-fb12 .fd{height:38px;border-radius:10px;border:1.5px solid var(--line);background:var(--surface-2);display:flex;align-items:center;padding:0 11px;gap:3px;transition:border-color .2s,background .2s}
.d-fb12 .fd i{width:7px;height:7px;border-radius:50%;background:var(--text);animation:fb12-in .15s ease-out}
@keyframes fb12-in{from{transform:scale(0)}}
.d-fb12 .fd .cr{width:1.5px;height:16px;background:var(--accent);margin-left:2px;animation:fb12-blink 1s steps(1) infinite}
@keyframes fb12-blink{50%{opacity:0}}
.d-fb12 .fd.err{border-color:var(--danger);background:color-mix(in srgb,var(--danger) 7%,var(--surface))}
.d-fb12 .fd.shk{animation:fb12-shake .42s cubic-bezier(.36,.07,.19,.97)}
@keyframes fb12-shake{15%{transform:translateX(-8px)}30%{transform:translateX(8px)}45%{transform:translateX(-6px)}60%{transform:translateX(6px)}75%{transform:translateX(-3px)}90%{transform:translateX(3px)}}
.d-fb12 .msg{display:flex;align-items:center;gap:4px;font-size:11px;font-weight:600;color:var(--danger);height:0;opacity:0;overflow:hidden;transition:height .25s cubic-bezier(.2,.8,.2,1),opacity .25s,margin .25s}
.d-fb12 .msg.on{height:16px;opacity:1;margin-top:6px}
.d-fb12 .ui-btn{width:100%;height:36px;margin-top:12px}
`,
    html: `<div class="bx2">
  <label for="fb12p">비밀번호</label>
  <div class="fd" id="fb12p" role="textbox" aria-describedby="fb12m" aria-invalid="false"><span class="cr"></span></div>
  <div class="msg" id="fb12m">${FB_I.info.replace('width="15" height="15"', 'width="12" height="12"')}비밀번호가 맞지 않아요</div>
  <button class="ui-btn" type="button">로그인</button>
</div>`,
    run(el, ctx) {
      const fd = el.querySelector('.fd'), cr = el.querySelector('.cr'), msg = el.querySelector('.msg'), btn = el.querySelector('.ui-btn');
      for (let k = 0; k < 6; k++) ctx.timeout(() => fd.insertBefore(document.createElement('i'), cr), 150 + k * 90);
      const fail = () => {
        fd.classList.remove('shk'); void fd.offsetWidth; fd.classList.add('shk', 'err');
        fd.setAttribute('aria-invalid', 'true'); msg.classList.add('on');
      };
      ctx.timeout(() => { fbTap(el, btn); fail(); }, 1000);
      ctx.on(btn, 'click', fail);
      ctx.on(fd, 'click', () => { fd.classList.remove('err'); msg.classList.remove('on'); fd.setAttribute('aria-invalid', 'false'); });
    }
  },

  /* fb13 스플래시 */
  {
    id: 'fb13', ko: '스플래시', en: 'Splash screen',
    desc: '앱을 켜는 순간 로고가 잠깐 나타났다가 첫 화면으로 자연스럽게 넘어가요.',
    prompt: '「스플래시(Splash screen)」를 만들어 줘. 앱을 켜면 브랜드 파란 배경 가운데 로고가 0.6→1배로 0.45초 동안 커지고 앱 이름이 뒤따라 페이드인돼. 로딩이 끝나면 스플래시가 1.08배로 커지며 0.4초 페이드아웃되고 홈 화면 요소가 60ms 간격으로 떠올라. 1.5초를 넘기지 말고 prefers-reduced-motion이면 바로 홈을 보여 줘.',
    css: `
.d-fb13 .ui-phone{cursor:pointer}
.d-fb13 .home{position:absolute;inset:0;padding:14px 12px;display:flex;flex-direction:column;gap:9px}
.d-fb13 .home>*{opacity:0;transform:translateY(8px);transition:opacity .35s,transform .4s cubic-bezier(.2,.8,.2,1)}
.d-fb13 .home.in>*{opacity:1;transform:none}
.d-fb13 .home.in>:nth-child(2){transition-delay:.06s}.d-fb13 .home.in>:nth-child(3){transition-delay:.12s}.d-fb13 .home.in>:nth-child(4){transition-delay:.18s}
.d-fb13 .home small{font-size:11px;color:var(--muted);display:block}
.d-fb13 .home b{font-size:15px;letter-spacing:-.03em}
.d-fb13 .sb{height:30px;border-radius:10px;background:var(--surface-2);display:flex;align-items:center;gap:6px;padding:0 10px;font-size:11px;color:var(--muted)}
.d-fb13 .gr{display:grid;grid-template-columns:1fr 1fr;gap:7px}
.d-fb13 .gr .ui-thumb{height:46px}
.d-fb13 .spl{position:absolute;inset:0;background:var(--accent);color:var(--accent-text);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;transition:opacity .4s ease-out,transform .4s ease-out}
.d-fb13 .spl.out{opacity:0;transform:scale(1.08);pointer-events:none}
.d-fb13 .lg{width:48px;height:48px;border-radius:15px;background:var(--accent-text);color:var(--accent);display:grid;place-items:center;transform:scale(.6);opacity:0;box-shadow:0 8px 20px rgba(0,0,0,.18)}
.d-fb13 .nm{font-size:16px;font-weight:800;letter-spacing:-.02em;opacity:0;transform:translateY(4px)}
.d-fb13 .spl.go .lg{animation:fb13-lg .45s cubic-bezier(.2,.8,.2,1) forwards}
.d-fb13 .spl.go .nm{animation:fb13-nm .4s .25s ease-out forwards}
@keyframes fb13-lg{to{transform:scale(1);opacity:1}}
@keyframes fb13-nm{to{opacity:1;transform:none}}
.d-fb13 .ld{display:flex;gap:4px;margin-top:6px;opacity:0;animation:fb13-nm .3s .5s ease-out forwards}
.d-fb13 .ld i{width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.5;animation:fb13-dt .9s ease-in-out infinite}
.d-fb13 .ld i:nth-child(2){animation-delay:.15s}.d-fb13 .ld i:nth-child(3){animation-delay:.3s}
@keyframes fb13-dt{50%{opacity:1;transform:translateY(-2px)}}
`,
    html: `<div class="ui-phone">
  <div class="home"><div><small>안녕하세요</small><b>어디로 떠나 볼까요?</b></div><div class="sb">${FB_I.search}여행지·숙소 검색</div><div class="gr"><div class="ui-thumb"></div><div class="ui-thumb"></div></div><div class="ui-line" style="width:60%"></div></div>
  <div class="spl"><div class="lg">${FB_I.plane}</div><div class="nm">trip</div><div class="ld"><i></i><i></i><i></i></div></div>
</div>`,
    run(el, ctx) {
      const ph = el.querySelector('.ui-phone'), spl = el.querySelector('.spl'), home = el.querySelector('.home');
      const start = () => {
        spl.classList.remove('go', 'out'); home.classList.remove('in'); void spl.offsetWidth;
        spl.classList.add('go');
        ctx.timeout(() => { spl.classList.add('out'); home.classList.add('in'); }, 1100);
      };
      start();
      ctx.on(ph, 'click', () => { if (spl.classList.contains('out')) start(); });
    }
  }
]);
