/* feedback 추가분 — 피드백·알림 (fb14~fb25) */
const fb2I = {
  check: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>',
  x: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  warn: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4 2.8 19.5h18.4z"/><path d="M12 10v4.5M12 17v.3"/></svg>',
  trash: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6.5 7l1 13h9l1-13"/></svg>',
  send: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
  wifiOff: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9a14 14 0 0 1 18 0M6.5 13a9 9 0 0 1 11 0M10 17a3.5 3.5 0 0 1 4 0"/><path d="M4 3l16 18"/></svg>',
  bell: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
  flag: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3"/></svg>',
  globe: '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.500 0 18M12 3c-3 3.5-3 14.500 0 18"/></svg>'
};
/* 탭 물결 */
const fb2Tap = (stage, t) => {
  if (!t) return;
  const s = stage.getBoundingClientRect(), r = t.getBoundingClientRect();
  const d = document.createElement('span');
  d.style.cssText = `position:absolute;left:${r.left - s.left + r.width / 2 - 14}px;top:${r.top - s.top + r.height / 2 - 14}px;width:28px;height:28px;border-radius:50%;background:var(--text);pointer-events:none;z-index:30;opacity:0`;
  stage.appendChild(d);
  const a = d.animate([{ transform: 'scale(.5)', opacity: .32 }, { transform: 'scale(1.5)', opacity: 0 }], { duration: 520, easing: 'ease-out' });
  a.onfinish = () => d.remove();
};
/* 자동 시연용 가짜 마우스 포인터 */
const fb2Cur = stage => {
  const c = document.createElement('span');
  c.style.cssText = 'position:absolute;left:0;top:0;width:16px;height:18px;z-index:40;pointer-events:none;opacity:0;transform:translate(0,0)';
  c.innerHTML = '<svg width="16" height="18" viewBox="0 0 16 18"><path d="M2 1.500v13l3.600-3.300 2.300 5.200 2.300-1-2.300-5.100H13z" fill="var(--text)" stroke="var(--surface)" stroke-width="1.300" stroke-linejoin="round"/></svg>';
  stage.appendChild(c);
  const pos = (t, fx, fy) => {
    const s = stage.getBoundingClientRect(), r = t.getBoundingClientRect();
    return `translate(${r.left - s.left + r.width * fx}px,${r.top - s.top + r.height * fy}px)`;
  };
  return {
    put(t, fx = .5, fy = .5) { c.style.transition = 'opacity .25s'; c.style.transform = pos(t, fx, fy); c.style.opacity = 1; },
    to(t, ms = 600, fx = .5, fy = .5, ease = 'cubic-bezier(.2,.8,.2,1)') { c.style.transition = `transform ${ms}ms ${ease},opacity .25s`; c.style.transform = pos(t, fx, fy); c.style.opacity = 1; },
    hide() { c.style.opacity = 0; }
  };
};
/* 단독 카드용 공통 화면 (id별로 스코프) */
const fb2Sc = id => `
.d-${id} .sc{position:relative;width:236px;height:176px;border-radius:18px;background:var(--surface);box-shadow:var(--shadow);overflow:hidden;padding:14px 14px;display:flex;flex-direction:column;gap:8px;word-break:keep-all;box-sizing:border-box;text-align:left}
.d-${id} .tp{display:flex;justify-content:space-between;align-items:center;flex:none;min-height:20px}
.d-${id} .tp b{font-size:13px;color:var(--text)}
`;

UIDEX.add('feedback', [
  /* fb14 인라인 배너 */
  {
    id: 'fb14', ko: '인라인 배너', en: 'Inline banner', pair: 'fb01',
    desc: '토스트와 달리 내용 위에 자리를 잡고 닫을 때까지 남아 있어요.',
    prompt: '「인라인 배너(Inline banner)」를 만들어 줘. 페이지 제목 아래에 점검 안내 띠가 0.3초 ease-out으로 높이가 펼쳐지며 아래 내용을 밀어내고, 닫기(X)를 누를 때까지 계속 남아 있어. 경고색 왼쪽 선과 아이콘을 쓰고 role="status"와 닫기 버튼 aria-label을 넣어 줘. 토스트와 헷갈리지 않게 내용 위에 떠서 몇 초 뒤 저절로 사라지게 하지 마.',
    css: fb2Sc('fb14') + `
.d-fb14 .re{height:24px;padding:0 9px;border-radius:999px;border:1px solid var(--line);background:var(--surface);font:inherit;font-size:11px;font-weight:600;color:var(--muted);cursor:pointer}
.d-fb14 .bn{display:grid;grid-template-rows:0fr;margin-bottom:-8px;opacity:0;flex:none;transition:grid-template-rows .3s cubic-bezier(.2,.8,.2,1),margin .3s cubic-bezier(.2,.8,.2,1),opacity .25s}
.d-fb14 .bn.on{grid-template-rows:1fr;margin-bottom:0;opacity:1}
.d-fb14 .in{overflow:hidden;min-height:0}
.d-fb14 .bx{display:flex;align-items:center;gap:8px;padding:7px 6px 7px 9px;border-radius:9px;border-left:3px solid var(--warn);background:color-mix(in srgb,var(--warn) 16%,var(--surface))}
.d-fb14 .bx>i{display:grid;color:var(--warn);flex:none}
.d-fb14 .bx p{margin:0;flex:1;min-width:0;display:flex;flex-direction:column;gap:1px}
.d-fb14 .bx p b{font-size:12px;line-height:1.3;color:var(--text);letter-spacing:-.02em}
.d-fb14 .bx p span{font-size:11px;line-height:1.3;color:var(--muted)}
.d-fb14 .x{width:24px;height:24px;border:0;border-radius:7px;background:none;color:var(--muted);display:grid;place-items:center;padding:0;cursor:pointer;flex:none}
.d-fb14 .x:hover{background:color-mix(in srgb,var(--text) 9%,transparent);color:var(--text)}
.d-fb14 .ui-thumb{height:30px;flex:none;border-radius:10px}
.d-fb14 .ui-line{flex:none}
`,
    html: `<div class="sc"><div class="tp"><b>내 예약</b><button class="re" type="button">안내 보기</button></div>
  <div class="bn" role="status"><div class="in"><div class="bx"><i>${fb2I.warn}</i><p><b>12/3 02~04시 점검</b><span>이 시간엔 결제가 멈춰요</span></p><button class="x" type="button" aria-label="배너 닫기">${fb2I.x}</button></div></div></div>
  <div class="ui-thumb"></div><div class="ui-line" style="width:86%"></div><div class="ui-line" style="width:60%"></div></div>`,
    run(el, ctx) {
      const bn = el.querySelector('.bn'), x = el.querySelector('.x'), re = el.querySelector('.re');
      ctx.timeout(() => bn.classList.add('on'), 450);
      ctx.on(x, 'click', () => bn.classList.remove('on'));
      ctx.on(re, 'click', () => bn.classList.toggle('on'));
    }
  },

  /* fb15 확인 대화상자 */
  {
    id: 'fb15', ko: '확인 대화상자', en: 'Confirm dialog', pair: 'fb04',
    desc: '모달 중에서도 "삭제할까요?" 한 문장에 예/아니요만 묻는 작은 창이에요.',
    prompt: '「확인 대화상자(Confirm dialog)」를 만들어 줘. 휴지통을 누르면 40% 딤 위에 "일정을 삭제할까요?" 한 문장과 취소·삭제 두 버튼만 있는 작은 창이 0.96배에서 0.2초 ease-out으로 열리고, 삭제 버튼은 빨간색이야. role="alertdialog"에 처음 포커스는 취소에 두고 Esc는 취소로 처리해 줘. 모달과 헷갈리지 않게 입력 폼이나 긴 본문은 넣지 마.',
    css: fb2Sc('fb15') + `
.d-fb15 .it{display:flex;gap:9px;align-items:center;height:32px;overflow:hidden;flex:none;transition:height .3s cubic-bezier(.2,.8,.2,1),opacity .25s,margin .3s}
.d-fb15 .it>i{width:30px;height:30px;border-radius:8px;background:var(--accent-soft);flex:none}
.d-fb15 .it em{flex:1;font-style:normal;font-size:12px;font-weight:600;color:var(--text)}
.d-fb15 .it.del{height:0;opacity:0;margin:-4px 0}
.d-fb15 .tr{width:28px;height:28px;border:0;border-radius:8px;background:none;color:var(--muted);display:grid;place-items:center;padding:0;cursor:pointer;flex:none}
.d-fb15 .tr:hover{background:var(--surface-2);color:var(--danger)}
.d-fb15 .dim{position:absolute;inset:0;background:rgba(8,10,14,.4);opacity:0;transition:opacity .2s;pointer-events:none}
.d-fb15 .dim.on{opacity:1;pointer-events:auto}
.d-fb15 .dlg{position:absolute;left:28px;right:28px;top:50%;background:var(--surface);border-radius:14px;padding:15px 12px 11px;text-align:center;box-shadow:0 14px 30px rgba(0,0,0,.32);opacity:0;transform:translateY(-50%) scale(.96);transition:opacity .2s,transform .2s cubic-bezier(.2,.8,.2,1);pointer-events:none}
.d-fb15 .dlg.on{opacity:1;transform:translateY(-50%) scale(1);pointer-events:auto}
.d-fb15 .dlg b{display:block;font-size:13px;color:var(--text);letter-spacing:-.02em}
.d-fb15 .dlg small{display:block;font-size:11px;color:var(--muted);margin:3px 0 11px}
.d-fb15 .bt{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.d-fb15 .bt button{height:30px;padding:0;border:0;border-radius:9px;font:inherit;font-size:12px;font-weight:700;cursor:pointer;background:var(--surface-2);color:var(--text);white-space:nowrap}
.d-fb15 .bt button.ok{background:var(--danger);color:var(--accent-text)}
`,
    html: `<div class="sc"><div class="tp"><b>저장한 일정</b></div>
  <div class="it"><i></i><em>제주 3박 4일</em><button class="tr" type="button" aria-label="제주 3박 4일 삭제">${fb2I.trash}</button></div>
  <div class="it"><i></i><em>부산 당일치기</em><button class="tr" type="button" aria-label="부산 당일치기 삭제">${fb2I.trash}</button></div>
  <div class="it"><i></i><em>강릉 1박 2일</em><button class="tr" type="button" aria-label="강릉 1박 2일 삭제">${fb2I.trash}</button></div>
  <div class="dim"></div>
  <div class="dlg" role="alertdialog" aria-modal="true" aria-labelledby="fb15h" aria-describedby="fb15d"><b id="fb15h">일정을 삭제할까요?</b><small id="fb15d">삭제하면 되돌릴 수 없어요</small><div class="bt"><button class="no" type="button">취소</button><button class="ok" type="button">삭제</button></div></div></div>`,
    run(el, ctx) {
      const dim = el.querySelector('.dim'), dlg = el.querySelector('.dlg'), items = [...el.querySelectorAll('.it')];
      const ok = dlg.querySelector('.ok'), no = dlg.querySelector('.no');
      let target = null, byUser = false;
      dlg.inert = true;
      /* 자동 시연은 페이지 포커스를 뺏지 않고, 사용자가 연 경우에만 취소 버튼으로 포커스를 옮긴다 */
      const open = (it, user) => {
        target = it; byUser = !!user; dlg.inert = false; dim.classList.add('on'); dlg.classList.add('on');
        if (user) no.focus({ preventScroll: true });
      };
      const close = del => {
        if (!target) return;
        const it = target, inside = dlg.contains(document.activeElement);
        target = null; dim.classList.remove('on'); dlg.classList.remove('on');
        if (del) it.classList.add('del');
        /* 닫히면 포커스를 연 버튼으로(삭제된 줄이면 남은 줄의 휴지통으로) 돌려준다 */
        if (byUser || inside) {
          const back = del ? items.find(x => !x.classList.contains('del')) : it;
          if (back) back.querySelector('.tr').focus({ preventScroll: true });
          else if (inside) document.activeElement.blur();
        }
        dlg.inert = true;
      };
      ctx.timeout(() => { fb2Tap(el, items[1].querySelector('.tr')); open(items[1], false); }, 450);
      items.forEach(it => ctx.on(it.querySelector('.tr'), 'click', () => open(it, true)));
      ctx.on(ok, 'click', () => close(true));
      ctx.on(no, 'click', () => close(false));
      ctx.on(dim, 'click', () => close(false));
      /* Esc는 취소. 포커스가 창 안이든 휴지통에 남아 있든 화면 안이면 듣는다. Tab은 두 버튼 안에서만 돈다 */
      ctx.on(el.querySelector('.sc'), 'keydown', e => {
        if (!target) return;
        if (e.key === 'Escape') { e.preventDefault(); close(false); }
        else if (e.key === 'Tab' && dlg.contains(document.activeElement)) { e.preventDefault(); (document.activeElement === no ? ok : no).focus({ preventScroll: true }); }
      });
    }
  },

  /* fb16 입력 중 표시 */
  {
    id: 'fb16', ko: '입력 중 표시', en: 'Typing indicator',
    desc: '상대가 답장을 쓰는 동안 말풍선 속 점 세 개가 움직여요.',
    prompt: '「입력 중 표시(Typing indicator)」를 만들어 줘. 채팅에서 상대가 입력하는 동안 왼쪽 말풍선 안에 6px 점 3개가 0.15초 간격으로 차례로 4px 튀어 오르는 1.2초 반복 모션을 보여 주고, 메시지가 도착하면 그 말풍선이 실제 글로 바뀌어. aria-live="polite"로 "입력 중"을 알리고 prefers-reduced-motion이면 깜빡임으로 바꿔 줘.',
    css: fb2Sc('fb16') + `
.d-fb16 .sc{padding:10px 12px 10px;gap:5px}
.d-fb16 .tp{justify-content:flex-start;gap:7px}
.d-fb16 .tp i{width:20px;height:20px;border-radius:50%;background:var(--accent-soft);flex:none}
.d-fb16 .tp small{font-size:11px;color:var(--muted);margin-left:auto;transition:opacity .2s;opacity:0}
.d-fb16 .tp small.on{opacity:1}
.d-fb16 .ms{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:flex-end;gap:5px;overflow:hidden}
.d-fb16 .b{flex:none;max-width:78%;padding:6px 10px;border-radius:13px;font-size:12px;line-height:1.3;animation:fb16-in .25s cubic-bezier(.2,.8,.2,1)}
.d-fb16 .b.me{align-self:flex-end;background:var(--accent);color:var(--accent-text);border-bottom-right-radius:4px}
.d-fb16 .b.you{align-self:flex-start;background:var(--surface-2);color:var(--text);border-bottom-left-radius:4px}
.d-fb16 .b.ty{display:flex;align-items:center;gap:4px;padding:10px 12px}
.d-fb16 .b.ty i{width:6px;height:6px;border-radius:50%;background:var(--muted);animation:fb16-dot 1.2s ease-in-out infinite}
.d-fb16 .b.ty i:nth-child(2){animation-delay:.15s}
.d-fb16 .b.ty i:nth-child(3){animation-delay:.3s}
.d-fb16 .b.pop{animation:fb16-pop .25s cubic-bezier(.2,.8,.2,1)}
.d-fb16 .ip{display:flex;gap:6px;align-items:center;flex:none}
.d-fb16 .ip span{flex:1;height:28px;border-radius:999px;background:var(--surface-2);font-size:11px;color:var(--muted);display:flex;align-items:center;padding:0 11px}
.d-fb16 .sd{width:28px;height:28px;border:0;border-radius:50%;background:var(--accent);color:var(--accent-text);display:grid;place-items:center;padding:0;cursor:pointer;flex:none}
@keyframes fb16-dot{0%,60%,100%{transform:translateY(0);opacity:.45}30%{transform:translateY(-4px);opacity:1}}
@keyframes fb16-in{from{opacity:0;transform:translateY(6px)}}
@keyframes fb16-pop{from{opacity:.4;transform:scale(.94)}}
@media (prefers-reduced-motion:reduce){.d-fb16 .b.ty i{animation-name:fb16-blink}}
@keyframes fb16-blink{0%,100%{opacity:.35}50%{opacity:1}}
`,
    html: `<div class="sc"><div class="tp"><i></i><b>숙소 호스트</b><small aria-live="polite">입력 중…</small></div>
  <div class="ms"><div class="b me">체크인 3시 전에도 되나요?</div></div>
  <div class="ip"><span>메시지 보내기</span><button class="sd" type="button" aria-label="보내기">${fb2I.send}</button></div></div>`,
    run(el, ctx) {
      const ms = el.querySelector('.ms'), st = el.querySelector('.tp small'), sd = el.querySelector('.sd');
      const mine = ['짐만 먼저 맡겨도 될까요?', '주차도 가능한가요?', '감사합니다!'];
      const yours = ['네, 1시부터 가능해요!', '짐도 미리 맡길 수 있어요.', '그럼요, 프런트에 맡겨 주세요.', '건물 뒤에 2대 댈 수 있어요.', '조심히 오세요 :)'];
      let n = 0, busy = false;
      const add = (cls, html) => {
        const b = document.createElement('div'); b.className = 'b ' + cls; b.innerHTML = html; ms.appendChild(b);
        while (ms.children.length > 3) ms.firstElementChild.remove();
        return b;
      };
      const reply = then => {
        busy = true;
        const t = add('you ty', '<i></i><i></i><i></i>'); t.setAttribute('aria-label', '상대가 입력 중'); st.classList.add('on');
        ctx.timeout(() => { t.classList.remove('ty'); t.removeAttribute('aria-label'); t.textContent = yours[n % yours.length]; t.classList.add('pop'); st.classList.remove('on'); n++; busy = false; if (typeof then === 'function') then(); }, 1150);
      };
      ctx.timeout(() => reply(() => ctx.timeout(() => { if (!busy) reply(); }, 450)), 350);
      ctx.on(sd, 'click', () => {
        if (busy) return;
        busy = true; add('me', mine[(n - 1 + mine.length) % mine.length]);
        ctx.timeout(() => reply(), 500);
      });
    }
  },

  /* fb17 읽음 표시 */
  {
    id: 'fb17', ko: '읽음 표시', en: 'Read receipt',
    desc: '보낸 메시지 옆 체크가 "전송됨"에서 "읽음"으로 바뀌어 알려 줘요.',
    prompt: '「읽음 표시(Read receipt)」를 만들어 줘. 내가 보낸 말풍선 옆에 회색 체크 1개와 "전송됨"을 보여 주다가, 상대가 읽으면 두 번째 체크가 0.25초 ease-out으로 그려지며 강조색으로 바뀌고 글자도 "읽음"으로 바뀌어. 글자 크기는 11px로 하고, 색만으로 구분되지 않게 글자를 함께 쓰며 aria-live="polite"로 상태 변화를 읽어 줘.',
    css: fb2Sc('fb17') + `
.d-fb17 .sc{padding:12px 12px 10px;gap:6px}
.d-fb17 .tp{justify-content:flex-start;gap:7px}
.d-fb17 .tp i{width:20px;height:20px;border-radius:50%;background:var(--accent-soft);flex:none}
.d-fb17 .ms{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:flex-end;gap:5px;overflow:hidden}
.d-fb17 .r{flex:none;display:flex;align-items:flex-end;gap:5px;animation:fb17-in .25s cubic-bezier(.2,.8,.2,1)}
.d-fb17 .r.me{justify-content:flex-end}
.d-fb17 .b{max-width:66%;padding:7px 10px;border-radius:13px;font-size:12px;line-height:1.3}
.d-fb17 .me .b{background:var(--accent);color:var(--accent-text);border-bottom-right-radius:4px}
.d-fb17 .you .b{background:var(--surface-2);color:var(--text);border-bottom-left-radius:4px}
.d-fb17 .rc{display:flex;align-items:center;gap:2px;font-size:11px;font-weight:600;color:var(--muted);white-space:nowrap;transition:color .25s}
.d-fb17 .rc svg{flex:none}
.d-fb17 .rc .c2{stroke-dasharray:16;stroke-dashoffset:16;transition:stroke-dashoffset .25s ease-out}
.d-fb17 .rc.rd{color:var(--accent)}
.d-fb17 .rc.rd .c2{stroke-dashoffset:0}
.d-fb17 .ip{display:flex;gap:6px;align-items:center;flex:none}
.d-fb17 .ip span{flex:1;height:28px;border-radius:999px;background:var(--surface-2);font-size:11px;color:var(--muted);display:flex;align-items:center;padding:0 11px}
.d-fb17 .sd{width:28px;height:28px;border:0;border-radius:50%;background:var(--accent);color:var(--accent-text);display:grid;place-items:center;padding:0;cursor:pointer;flex:none}
@keyframes fb17-in{from{opacity:0;transform:translateY(6px)}}
`,
    html: `<div class="sc"><div class="tp"><i></i><b>민서</b></div>
  <div class="ms" aria-live="polite"><div class="r you"><div class="b">도착하면 연락 줘!</div></div></div>
  <div class="ip"><span>메시지 보내기</span><button class="sd" type="button" aria-label="보내기">${fb2I.send}</button></div></div>`,
    run(el, ctx) {
      const ms = el.querySelector('.ms'), sd = el.querySelector('.sd');
      const texts = ['지금 출발했어', '10분 뒤 도착해', '1번 출구로 갈게', '거의 다 왔어'];
      const tick = '<svg width="19" height="12" viewBox="0 0 30 20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M2 10l5 5 9-11"/><path class="c2" d="M14 13l2 2 9-11"/></svg>';
      let n = 0;
      const send = wait => {
        const r = document.createElement('div'); r.className = 'r me';
        r.innerHTML = `<span class="rc">${tick}<em style="font-style:normal">전송됨</em></span><div class="b">${texts[n++ % texts.length]}</div>`;
        ms.appendChild(r);
        while (ms.children.length > 3) ms.firstElementChild.remove();
        ctx.timeout(() => { const rc = r.querySelector('.rc'); rc.classList.add('rd'); rc.querySelector('em').textContent = '읽음'; }, wait);
      };
      ctx.timeout(() => send(1150), 400);
      ctx.on(sd, 'click', () => send(1200));
    }
  },

  /* fb18 접속 상태 점 */
  {
    id: 'fb18', ko: '접속 상태 점', en: 'Presence indicator', pair: 'fb07',
    desc: '알림 배지와 달리 숫자 없이 색 점으로 지금 접속 중인지 알려 줘요.',
    prompt: '「접속 상태 점(Presence indicator)」을 만들어 줘. 48px 아바타 오른쪽 아래 모서리에 13px 원을 붙이고 온라인은 초록, 자리 비움은 노랑, 오프라인은 회색으로 표시해. 상태가 바뀌면 점이 0.3초 ease-out으로 살짝 커졌다 돌아와. 색만으로 구분되지 않게 "온라인" 같은 글자와 aria-label을 함께 줘. 알림 배지와 헷갈리지 않게 점 안에 숫자를 넣지 마.',
    css: fb2Sc('fb18') + `
.d-fb18 .tp small{font-size:11px;color:var(--muted)}
.d-fb18 .ps{flex:1;display:flex;justify-content:space-between;align-items:center;padding:0 2px}
.d-fb18 .p{width:64px;border:0;background:none;font:inherit;padding:6px 0;border-radius:12px;display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;transition:background .2s}
.d-fb18 .p:hover{background:var(--surface-2)}
.d-fb18 .av{position:relative;width:48px;height:48px;border-radius:50%;background:var(--accent-soft);color:var(--accent);display:grid;place-items:center;font-size:17px;font-weight:800;margin-bottom:5px;transition:opacity .3s}
.d-fb18 .dot{position:absolute;right:-1px;bottom:-1px;width:13px;height:13px;border-radius:50%;border:2.500px solid var(--surface);background:color-mix(in srgb,var(--muted) 60%,var(--surface));transition:background .3s}
.d-fb18 .p[data-s="on"] .dot{background:var(--success)}
.d-fb18 .p[data-s="away"] .dot{background:var(--warn)}
.d-fb18 .p[data-s="off"] .av{opacity:.62}
.d-fb18 .dot.ch{animation:fb18-pop .3s ease-out}
.d-fb18 .dot:after{content:"";position:absolute;inset:-2px;border-radius:50%;border:2px solid var(--success);opacity:0}
.d-fb18 .p[data-s="on"] .dot.ch:after{animation:fb18-ping .7s ease-out}
.d-fb18 .p b{font-size:12px;color:var(--text)}
.d-fb18 .p .tx{font-size:11px;color:var(--muted);white-space:nowrap}
@keyframes fb18-pop{40%{transform:scale(1.35)}}
@keyframes fb18-ping{from{transform:scale(1);opacity:.7}to{transform:scale(2.6);opacity:0}}
`,
    html: `<div class="sc"><div class="tp"><b>여행 멤버</b><small class="cnt">2명 접속 중</small></div>
  <div class="ps">
    <button class="p" type="button" data-s="on" data-n="민서"><span class="av">민<i class="dot"></i></span><b>민서</b><span class="tx">온라인</span></button>
    <button class="p" type="button" data-s="off" data-n="준호"><span class="av">준<i class="dot"></i></span><b>준호</b><span class="tx">오프라인</span></button>
    <button class="p" type="button" data-s="on" data-n="지아"><span class="av">지<i class="dot"></i></span><b>지아</b><span class="tx">온라인</span></button>
  </div></div>`,
    run(el, ctx) {
      const ps = [...el.querySelectorAll('.p')], cnt = el.querySelector('.cnt');
      const name = { on: '온라인', away: '자리 비움', off: '오프라인' }, order = ['on', 'away', 'off'];
      const set = (p, s) => {
        p.dataset.s = s; p.querySelector('.tx').textContent = name[s]; p.setAttribute('aria-label', p.dataset.n + ', ' + name[s]);
        const d = p.querySelector('.dot'); d.classList.remove('ch'); void d.offsetWidth; d.classList.add('ch');
        cnt.textContent = ps.filter(x => x.dataset.s === 'on').length + '명 접속 중';
      };
      ps.forEach(p => { p.setAttribute('aria-label', p.dataset.n + ', ' + name[p.dataset.s]); ctx.on(p, 'click', () => set(p, order[(order.indexOf(p.dataset.s) + 1) % 3])); });
      ctx.timeout(() => set(ps[1], 'on'), 600);
      ctx.timeout(() => set(ps[2], 'away'), 1500);
    }
  },

  /* fb19 컨페티 */
  {
    id: 'fb19', ko: '컨페티', en: 'Confetti',
    desc: '목표를 달성한 순간 색종이가 터져 흩날리며 축하해 줘요.',
    prompt: '「컨페티(Confetti)」 효과를 만들어 줘. 미션 완료 버튼을 누르면 버튼 위치에서 6가지 색 종이 조각 40개가 위로 터져 올랐다가 좌우로 흔들리고 회전하며 약 3초 동안 천천히 떨어진 뒤 사라져. 조각은 6~9px 사각형이고 클릭을 가로막지 않게 pointer-events:none으로 둬. prefers-reduced-motion이면 조각 없이 완료 문구만 보여 줘.',
    css: fb2Sc('fb19') + `
.d-fb19 .sc{align-items:center;justify-content:center;gap:5px;text-align:center}
.d-fb19 .ic{width:50px;height:50px;border-radius:50%;display:grid;place-items:center;background:var(--surface-2);color:var(--muted);transition:background .3s,color .3s,transform .4s cubic-bezier(.2,.8,.2,1)}
.d-fb19 .sc.done .ic{background:var(--accent-soft);color:var(--accent);transform:scale(1.1)}
.d-fb19 .t{font-size:14px;font-weight:800;color:var(--text);letter-spacing:-.02em;margin-top:5px}
.d-fb19 .s{font-size:11px;color:var(--muted)}
.d-fb19 .go{margin-top:7px;height:30px;padding:0 14px;border:0;border-radius:9px;background:var(--accent);color:var(--accent-text);font:inherit;font-size:12px;font-weight:700;cursor:pointer}
.d-fb19 .cf{position:absolute;inset:0;pointer-events:none;z-index:20;overflow:hidden}
.d-fb19 .cf i{position:absolute;left:0;top:0;border-radius:1.500px;will-change:transform}
`,
    html: `<div class="sc"><div class="ic">${fb2I.flag}</div><div class="t" role="status">6일 연속 도전 중</div><div class="s">오늘 미션: 물 2L 마시기</div><button class="go" type="button">오늘 미션 완료</button></div><div class="cf" aria-hidden="true"></div>`,
    run(el, ctx) {
      const sc = el.querySelector('.sc'), go = el.querySelector('.go'), cf = el.querySelector('.cf');
      const t = el.querySelector('.t'), s = el.querySelector('.s');
      const colors = ['#ff5d5d', '#ffb400', '#2fc488', '#4d8dff', '#b06bff', '#ff7ac3'];
      const still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const burst = () => {
        sc.classList.add('done'); t.textContent = '7일 연속 달성!'; s.textContent = '일주일 동안 한 번도 안 빠졌어요'; go.textContent = '한 번 더 축하';
        if (still) return;
        const S = el.getBoundingClientRect(), B = go.getBoundingClientRect();
        const ox = B.left - S.left + B.width / 2, oy = B.top - S.top;
        const ps = [];
        for (let i = 0; i < 40; i++) {
          const e = document.createElement('i'), w = 6 + Math.random() * 3;
          e.style.width = w + 'px'; e.style.height = (w * (.5 + Math.random() * .6)) + 'px'; e.style.background = colors[i % colors.length];
          cf.appendChild(e);
          const a = -Math.PI / 2 + (Math.random() - .5) * 2.2, v = 190 + Math.random() * 260;
          ps.push({ e, x: ox, y: oy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: Math.random() * 360, vr: (Math.random() - .5) * 720, ph: Math.random() * 6.28, sw: 10 + Math.random() * 16, life: 2700 + Math.random() * 600 });
        }
        let last = 0;
        ctx.loop(now => {
          const dt = Math.min(.034, (now - last) / 1000); last = now;
          let alive = 0;
          ps.forEach(p => {
            if (!p.e) return;
            const k = Math.exp(-2.4 * dt);
            p.vx *= k; p.vy = p.vy * k + 170 * dt;
            p.x += p.vx * dt + Math.cos(now / 260 + p.ph) * p.sw * dt; p.y += p.vy * dt; p.r += p.vr * dt;
            const left = p.life - now;
            if (left <= 0 || p.y > S.height + 12) { p.e.remove(); p.e = null; return; }
            alive++;
            p.e.style.opacity = Math.min(1, left / 400);
            p.e.style.transform = `translate(${p.x}px,${p.y}px) rotate(${p.r}deg) scaleY(${Math.cos(now / 130 + p.ph)})`;
          });
          return alive > 0;
        });
      };
      ctx.timeout(() => { fb2Tap(el, go); burst(); }, 450);
      ctx.on(go, 'click', burst);
    }
  },

  /* fb20 호버 카드 */
  {
    id: 'fb20', ko: '호버 카드', en: 'Hover card', pair: 'fb05',
    desc: '툴팁과 달리 이름에 올리면 사진·소개·버튼이 담긴 요약 카드가 떠요.',
    prompt: '「호버 카드(Hover card)」를 만들어 줘. 글쓴이 이름에 마우스를 0.3초 올리고 있으면 아래에 아바타·한 줄 소개·글 수·팔로우 버튼이 담긴 200px 카드가 6px 올라오며 0.2초 ease-out으로 뜨고, 카드 위로 옮겨 가도 유지되다가 벗어나면 0.2초 뒤 닫혀. 키보드 포커스로도 열리게 해 줘. 툴팁과 헷갈리지 않게 한 줄 글자만 띄우지 마.',
    css: fb2Sc('fb20') + `
.d-fb20 .by{font-size:11px;color:var(--muted);flex:none;display:flex;align-items:center;gap:4px}
.d-fb20 .nm{border:0;background:none;font:inherit;font-size:12px;font-weight:700;color:var(--accent);padding:1px 2px;border-radius:4px;cursor:pointer;text-decoration:underline;text-decoration-color:transparent;text-underline-offset:3px;transition:text-decoration-color .15s,background .15s}
.d-fb20 .nm:hover,.d-fb20 .nm.hv{text-decoration-color:currentColor;background:var(--accent-soft)}
.d-fb20 .ui-thumb{height:52px;flex:none;border-radius:10px}
.d-fb20 .ui-line{flex:none}
.d-fb20 .hc{position:absolute;left:14px;top:62px;width:200px;box-sizing:border-box;padding:11px;border-radius:13px;background:var(--surface);border:1px solid var(--line);box-shadow:0 12px 26px -8px rgba(0,0,0,.34);opacity:0;transform:translateY(6px);transition:opacity .2s,transform .2s ease-out;pointer-events:none;z-index:5}
.d-fb20 .hc.on{opacity:1;transform:none;pointer-events:auto}
.d-fb20 .hd{display:flex;align-items:center;gap:8px}
.d-fb20 .av{width:34px;height:34px;border-radius:50%;background:var(--accent-soft);color:var(--accent);display:grid;place-items:center;font-size:14px;font-weight:800;flex:none}
.d-fb20 .hd p{margin:0;flex:1;min-width:0;display:flex;flex-direction:column}
.d-fb20 .hd p b{font-size:12px;color:var(--text)}
.d-fb20 .hd p span{font-size:11px;color:var(--muted)}
.d-fb20 .fw{height:26px;padding:0 10px;border:0;border-radius:8px;background:var(--accent);color:var(--accent-text);font:inherit;font-size:11px;font-weight:700;cursor:pointer;flex:none;white-space:nowrap}
.d-fb20 .fw.on{background:var(--surface-2);color:var(--text)}
.d-fb20 .bio{font-size:11px;color:var(--text);margin:8px 0 0;line-height:1.4}
.d-fb20 .stt{font-size:11px;color:var(--muted);margin-top:4px}
.d-fb20 .stt b{color:var(--text)}
`,
    html: `<div class="sc"><div class="tp"><b>제주 동쪽 하루 코스</b></div>
  <div class="by">글 <button class="nm" type="button" aria-haspopup="dialog" aria-expanded="false">하늘 에디터</button>· 3분 전</div>
  <div class="ui-thumb"></div><div class="ui-line" style="width:88%"></div><div class="ui-line" style="width:64%"></div>
  <div class="hc" role="dialog" aria-label="하늘 에디터 프로필 요약"><div class="hd"><span class="av">하</span><p><b>하늘 에디터</b><span>여행 에디터</span></p><button class="fw" type="button">팔로우</button></div>
    <div class="bio">걸어서 다니는 제주 코스를 기록해요.</div><div class="stt"><b>128</b> 글 · <b>2.4천</b> 팔로워</div></div></div>`,
    run(el, ctx) {
      const nm = el.querySelector('.nm'), hc = el.querySelector('.hc'), fw = el.querySelector('.fw'), sc = el.querySelector('.sc');
      let tm = null, auto = true, esc = false;
      const show = () => { hc.classList.add('on'); nm.setAttribute('aria-expanded', 'true'); };
      const hide = () => { hc.classList.remove('on'); nm.classList.remove('hv'); nm.setAttribute('aria-expanded', 'false'); };
      const later = (fn, ms) => { clearTimeout(tm); tm = ctx.timeout(fn, ms); };
      const cur = fb2Cur(el);
      ctx.timeout(() => cur.put(sc, .8, .82), 60);
      ctx.timeout(() => cur.to(nm, 600, .6, .6), 250);
      ctx.timeout(() => { if (auto) nm.classList.add('hv'); }, 850);
      ctx.timeout(() => { if (auto) show(); }, 1150);
      ctx.timeout(() => { cur.hide(); if (auto) hide(); }, 4200);
      const user = () => { if (auto) { auto = false; cur.hide(); nm.classList.remove('hv'); } };
      ctx.on(nm, 'mouseenter', () => { user(); later(show, 300); });
      ctx.on(nm, 'mouseleave', () => later(hide, 200));
      ctx.on(hc, 'mouseenter', () => { user(); clearTimeout(tm); });
      ctx.on(hc, 'mouseleave', () => later(hide, 200));
      ctx.on(nm, 'focus', () => { if (esc) { esc = false; return; } user(); later(show, 0); });
      ctx.on(nm, 'blur', () => later(hide, 200));
      /* 키보드: 카드 안 버튼으로 Tab 이동해도 유지, 카드 밖으로 나가면 닫힘, Esc로 닫기 */
      ctx.on(hc, 'focusin', () => { user(); clearTimeout(tm); show(); });
      ctx.on(hc, 'focusout', () => later(hide, 200));
      ctx.on(sc, 'keydown', e => {
        if (e.key !== 'Escape' || !hc.classList.contains('on')) return;
        user(); clearTimeout(tm);
        if (hc.contains(document.activeElement)) { esc = true; nm.focus({ preventScroll: true }); }
        hide();
      });
      ctx.on(nm, 'click', () => { user(); clearTimeout(tm); show(); });
      ctx.on(fw, 'click', () => { const on = fw.classList.toggle('on'); fw.textContent = on ? '팔로잉' : '팔로우'; });
    }
  },

  /* fb21 쿠키 동의 배너 */
  {
    id: 'fb21', ko: '쿠키 동의 배너', en: 'Cookie consent banner',
    desc: '첫 방문 때 화면 하단에서 쿠키 사용 동의를 받아요.',
    prompt: '「쿠키 동의 배너(Cookie consent banner)」를 만들어 줘. 첫 방문 시 화면 하단에서 16px 아래에서 0.35초 ease-out으로 올라오고, 쿠키 안내 한 줄과 "모두 허용"·"필수만"·"설정" 버튼을 보여 줘. 설정을 누르면 분석·광고 스위치가 펼쳐지고, 선택하기 전에는 배너가 저절로 닫히지 않아. 세 버튼은 같은 크기로 두고 키보드 Tab 순서로 모두 닿게 해 줘.',
    css: fb2Sc('fb21') + `
.d-fb21 .ui-thumb{height:48px;flex:none;border-radius:10px}
.d-fb21 .ui-line{flex:none}
.d-fb21 .re{height:24px;padding:0 9px;border-radius:999px;border:1px solid var(--line);background:var(--surface);font:inherit;font-size:11px;font-weight:600;color:var(--muted);cursor:pointer}
.d-fb21 .ck{position:absolute;left:8px;right:8px;bottom:8px;padding:10px 10px 9px;border-radius:13px;background:var(--surface);border:1px solid var(--line);box-shadow:0 10px 26px -6px rgba(0,0,0,.32);opacity:0;transform:translateY(16px);transition:opacity .25s,transform .35s cubic-bezier(.2,.8,.2,1);pointer-events:none}
.d-fb21 .ck.on{opacity:1;transform:none;pointer-events:auto}
.d-fb21 .ck>b{display:block;font-size:12px;color:var(--text)}
.d-fb21 .ds,.d-fb21 .st{display:grid;transition:grid-template-rows .3s cubic-bezier(.2,.8,.2,1),opacity .25s}
.d-fb21 .ds{grid-template-rows:1fr}
.d-fb21 .st{grid-template-rows:0fr;opacity:0}
.d-fb21 .ds>div,.d-fb21 .st>div{overflow:hidden;min-height:0}
.d-fb21 .ds span{display:block;font-size:11px;color:var(--muted);line-height:1.4;padding-top:2px}
.d-fb21 .ck.set .ds{grid-template-rows:0fr;opacity:0}
.d-fb21 .ck.set .st{grid-template-rows:1fr;opacity:1}
.d-fb21 .rw{display:flex;align-items:center;justify-content:space-between;height:24px;font-size:11px;color:var(--text)}
.d-fb21 .rw em{font-style:normal;color:var(--muted)}
.d-fb21 .sw{position:relative;width:30px;height:18px;border:0;border-radius:999px;background:var(--line);padding:0;cursor:pointer;transition:background .2s;flex:none}
.d-fb21 .sw:after{content:"";position:absolute;left:2px;top:2px;width:14px;height:14px;border-radius:50%;background:var(--surface);box-shadow:0 1px 2px rgba(0,0,0,.3);transition:transform .2s cubic-bezier(.2,.8,.2,1)}
.d-fb21 .sw[aria-checked="true"]{background:var(--accent)}
.d-fb21 .sw[aria-checked="true"]:after{transform:translateX(12px)}
.d-fb21 .sw[disabled]{opacity:.5;cursor:not-allowed}
.d-fb21 .bt{display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;margin-top:8px}
.d-fb21 .bt button{height:28px;padding:0;border-radius:8px;border:1px solid var(--line);background:var(--surface);font:inherit;font-size:11px;font-weight:700;color:var(--text);cursor:pointer;white-space:nowrap}
.d-fb21 .bt button.all{background:var(--accent);border-color:var(--accent);color:var(--accent-text)}
`,
    html: `<div class="sc"><div class="tp"><b>오늘의 여행 특가</b><button class="re" type="button">쿠키 설정</button></div>
  <div class="ui-thumb"></div><div class="ui-line" style="width:84%"></div><div class="ui-line" style="width:58%"></div>
  <div class="ck" role="region" aria-label="쿠키 동의"><b>쿠키를 사용해요</b>
    <div class="ds"><div><span>필수 쿠키 외에는 동의한 것만 써요.</span></div></div>
    <div class="st"><div>
      <div class="rw">필수 <em>항상 켜짐</em></div>
      <div class="rw">분석 <button class="sw" type="button" role="switch" aria-checked="false" aria-label="분석 쿠키"></button></div>
      <div class="rw">광고 <button class="sw" type="button" role="switch" aria-checked="false" aria-label="광고 쿠키"></button></div>
    </div></div>
    <div class="bt"><button class="cfg" type="button" aria-expanded="false">설정</button><button class="ess" type="button">필수만</button><button class="all" type="button">모두 허용</button></div></div></div>`,
    run(el, ctx) {
      const ck = el.querySelector('.ck'), cfg = el.querySelector('.cfg'), re = el.querySelector('.re');
      const sws = [...el.querySelectorAll('.sw')];
      const setMode = on => { ck.classList.toggle('set', on); cfg.textContent = on ? '선택 저장' : '설정'; cfg.setAttribute('aria-expanded', on); };
      const open = () => { setMode(false); ck.classList.add('on'); };
      const close = () => ck.classList.remove('on');
      ctx.timeout(open, 500);
      ctx.on(cfg, 'click', () => { if (ck.classList.contains('set')) close(); else setMode(true); });
      ctx.on(el.querySelector('.ess'), 'click', () => { sws.forEach(s => s.setAttribute('aria-checked', 'false')); close(); });
      ctx.on(el.querySelector('.all'), 'click', () => { sws.forEach(s => s.setAttribute('aria-checked', 'true')); close(); });
      sws.forEach(s => ctx.on(s, 'click', () => s.setAttribute('aria-checked', s.getAttribute('aria-checked') !== 'true')));
      ctx.on(re, 'click', open);
    }
  },

  /* fb22 오프라인 배너 */
  {
    id: 'fb22', ko: '오프라인 배너', en: 'Offline banner',
    desc: '연결이 끊기면 상단에 띠가 뜨고, 돌아오면 알린 뒤 사라져요.',
    prompt: '「오프라인 배너(Offline banner)」를 만들어 줘. 연결이 끊기면 화면 맨 위에 26px 어두운 띠 "오프라인 상태예요"가 0.3초 ease-out으로 내려오고 연결될 때까지 유지돼. 다시 연결되면 띠가 초록색 "다시 연결됨"으로 바뀌었다가 1.5초 뒤 접혀 사라져. online·offline 이벤트로 감지하고 role="status"로 읽히게 해 줘.',
    css: fb2Sc('fb22') + `
.d-fb22 .sc{padding:0;gap:0}
.d-fb22 .of{display:grid;grid-template-rows:0fr;flex:none;transition:grid-template-rows .3s cubic-bezier(.2,.8,.2,1)}
.d-fb22 .of.on{grid-template-rows:1fr}
.d-fb22 .of>div{overflow:hidden;min-height:0}
.d-fb22 .st{height:26px;display:flex;align-items:center;justify-content:center;gap:5px;font-size:11px;font-weight:700;background:var(--text);color:var(--surface);transition:background .3s,color .3s}
.d-fb22 .st i{display:grid}
.d-fb22 .of.back .st{background:color-mix(in srgb,var(--success) 80%,black);color:var(--accent-text)}
.d-fb22 .bd{flex:1;min-height:0;padding:12px 14px;display:flex;flex-direction:column;gap:8px}
.d-fb22 .ui-thumb{height:44px;flex:none;border-radius:10px;transition:opacity .3s}
.d-fb22 .ui-line{flex:none;transition:opacity .3s}
.d-fb22 .sc.cut .ui-thumb,.d-fb22 .sc.cut .ui-line{opacity:.45}
.d-fb22 .tp small{font-size:11px;color:var(--muted)}
.d-fb22 .tg{margin-top:auto;align-self:center;height:28px;padding:0 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);font:inherit;font-size:11px;font-weight:700;color:var(--text);cursor:pointer;flex:none}
`,
    html: `<div class="sc"><div class="of" role="status" aria-live="polite"><div><div class="st"><i>${fb2I.wifiOff}</i><span>오프라인 상태예요</span></div></div></div>
  <div class="bd"><div class="tp"><b>실시간 예약 현황</b><small class="up">방금 업데이트</small></div>
  <div class="ui-thumb"></div><div class="ui-line" style="width:82%"></div>
  <button class="tg" type="button">연결 끊어 보기</button></div></div>`,
    run(el, ctx) {
      const sc = el.querySelector('.sc'), of = el.querySelector('.of'), ic = of.querySelector('i'), tx = of.querySelector('span');
      const up = el.querySelector('.up'), tg = el.querySelector('.tg');
      let online = true, tm = null;
      const cut = () => {
        online = false; clearTimeout(tm);
        of.classList.remove('back'); ic.innerHTML = fb2I.wifiOff; tx.textContent = '오프라인 상태예요';
        of.classList.add('on'); sc.classList.add('cut'); up.textContent = '업데이트 멈춤'; tg.textContent = '다시 연결하기';
      };
      const back = () => {
        online = true; clearTimeout(tm);
        of.classList.add('back'); ic.innerHTML = fb2I.check; tx.textContent = '다시 연결됨';
        sc.classList.remove('cut'); up.textContent = '방금 업데이트'; tg.textContent = '연결 끊어 보기';
        tm = ctx.timeout(() => of.classList.remove('on'), 1500);
      };
      let auto = true;
      ctx.timeout(() => { if (auto) cut(); }, 450);
      ctx.timeout(() => { if (auto) back(); }, 1800);
      ctx.on(tg, 'click', () => { auto = false; online ? cut() : back(); });
    }
  },

  /* fb23 추천 지수 조사 */
  {
    id: 'fb23', ko: '추천 지수 조사', en: 'NPS survey',
    desc: '0~10점 버튼으로 추천할 마음이 얼마나 있는지 한 번에 물어요.',
    prompt: '「추천 지수 조사(NPS survey)」를 만들어 줘. "친구에게 추천하시겠어요?" 질문 아래 0~10 숫자 버튼 11개를 한 줄로 놓고 양 끝에 "전혀 아니에요"·"꼭 추천해요"를 적어 줘. 점수를 누르면 그 버튼이 강조색으로 0.2초 만에 채워지고 아래에 감사 문구가 0.3초 ease-out으로 올라와. role="radiogroup"과 좌우 화살표 키 이동을 넣어 줘.',
    css: fb2Sc('fb23') + `
.d-fb23 .sc{padding:14px 10px 12px;gap:7px;justify-content:center}
.d-fb23 .q{font-size:13px;font-weight:800;color:var(--text);letter-spacing:-.02em;line-height:1.35;padding:0 4px}
.d-fb23 .sm{font-size:11px;color:var(--muted);padding:0 4px;margin-top:-3px}
.d-fb23 .sl{display:grid;grid-template-columns:repeat(11,1fr);gap:2px;margin-top:3px}
.d-fb23 .sl button{height:28px;padding:0;border:1px solid var(--line);border-radius:6px;background:var(--surface);font:inherit;font-size:11px;font-weight:700;color:var(--text);cursor:pointer;letter-spacing:-.04em;transition:background .2s,color .2s,border-color .2s,transform .2s cubic-bezier(.2,.8,.2,1)}
.d-fb23 .sl button:hover,.d-fb23 .sl button.hv{background:var(--accent-soft);border-color:var(--accent)}
.d-fb23 .sl button[aria-checked="true"]{background:var(--accent);border-color:var(--accent);color:var(--accent-text);transform:translateY(-2px)}
.d-fb23 .lg{display:flex;justify-content:space-between;font-size:11px;color:var(--muted);padding:0 2px}
.d-fb23 .th{display:flex;align-items:center;justify-content:center;gap:5px;height:26px;border-radius:8px;background:color-mix(in srgb,var(--success) 14%,var(--surface));font-size:11px;font-weight:700;color:var(--text);opacity:0;transform:translateY(6px);transition:opacity .3s,transform .3s ease-out}
.d-fb23 .th i{display:grid;color:var(--success)}
.d-fb23 .th.on{opacity:1;transform:none}
`,
    html: `<div class="sc"><div class="q" id="fb23q">이 서비스를 친구에게 추천하시겠어요?</div>
  <div class="sl" role="radiogroup" aria-labelledby="fb23q">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => `<button type="button" role="radio" aria-checked="false" aria-label="${n}점" tabindex="${n ? -1 : 0}">${n}</button>`).join('')}</div>
  <div class="lg"><span>전혀 아니에요</span><span>꼭 추천해요</span></div>
  <div class="th" role="status"><i>${fb2I.check}</i><span>고마워요!</span></div></div>`,
    run(el, ctx) {
      const bs = [...el.querySelectorAll('.sl button')], th = el.querySelector('.th'), tx = th.querySelector('span');
      const pick = i => {
        bs.forEach((b, j) => { b.setAttribute('aria-checked', j === i); b.tabIndex = j === i ? 0 : -1; b.classList.remove('hv'); });
        tx.textContent = i + '점, 소중한 의견 고마워요!';
        th.classList.remove('on'); void th.offsetWidth; th.classList.add('on');
      };
      let auto = true;
      const cur = fb2Cur(el);
      ctx.timeout(() => cur.put(bs[3], .5, .6), 150);
      ctx.timeout(() => cur.to(bs[9], 720, .5, .6, 'linear'), 450);
      for (let i = 4; i <= 9; i++) ctx.timeout(() => { if (!auto) return; bs.forEach(b => b.classList.remove('hv')); bs[i].classList.add('hv'); }, 450 + (i - 3) * 120);
      ctx.timeout(() => { if (auto) { fb2Tap(el, bs[9]); pick(9); } }, 1400);
      ctx.timeout(() => cur.hide(), 1900);
      bs.forEach((b, i) => {
        ctx.on(b, 'click', () => { auto = false; cur.hide(); pick(i); });
        ctx.on(b, 'keydown', e => {
          const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
          if (!d) return;
          e.preventDefault(); auto = false; cur.hide();
          const j = Math.max(0, Math.min(10, i + d)); pick(j); bs[j].focus();
        });
      });
    }
  },

  /* fb24 핫스팟 */
  {
    id: 'fb24', ko: '핫스팟', en: 'Hotspot', pair: 'fb10',
    desc: '코치마크와 달리 화면을 가리지 않고 깜빡이는 점으로 새 기능을 알려요.',
    prompt: '「핫스팟(Hotspot)」을 만들어 줘. 새 기능 옆에 10px 강조색 점을 두고 바깥 고리가 1.6초 간격으로 2.6배까지 퍼지며 사라지는 깜빡임을 반복해. 점을 누르면 설명 말풍선이 0.2초 ease-out으로 뜨고 "확인"을 누르면 닫히며 깜빡임이 멈춰. 점은 버튼으로 만들고 aria-expanded를 넣어 줘. 코치마크와 헷갈리지 않게 화면을 어둡게 가리거나 다른 조작을 막지 마.',
    css: fb2Sc('fb24') + `
.d-fb24 .fc{height:24px;padding:0 9px;border-radius:999px;border:1px solid var(--line);background:var(--surface);font:inherit;font-size:11px;font-weight:600;color:var(--text);cursor:pointer;transition:all .2s}
.d-fb24 .fc.on{background:var(--accent);border-color:var(--accent);color:var(--accent-text)}
.d-fb24 .ft{position:relative;display:flex;align-items:center;gap:7px;height:34px;padding:0 6px 0 10px;border-radius:10px;background:var(--surface-2);font-size:12px;font-weight:600;color:var(--text);flex:none}
.d-fb24 .ft>i{display:grid;color:var(--muted)}
.d-fb24 .hs{position:relative;margin-left:auto;width:28px;height:28px;border:0;border-radius:50%;background:none;padding:0;cursor:pointer;display:grid;place-items:center;flex:none}
.d-fb24 .hs i{position:relative;width:10px;height:10px;border-radius:50%;background:var(--accent);transition:background .3s}
.d-fb24 .hs i:before{content:"";position:absolute;inset:0;border-radius:50%;background:var(--accent);animation:fb24-ping 1.6s ease-out infinite}
.d-fb24 .hs.seen i{background:var(--muted)}
.d-fb24 .hs.seen i:before{animation:none;opacity:0}
.d-fb24 .ui-thumb{height:40px;flex:none;border-radius:10px}
.d-fb24 .ui-line{flex:none}
.d-fb24 .bb{position:absolute;right:10px;top:84px;width:170px;box-sizing:border-box;padding:9px 10px;border-radius:11px;background:var(--text);color:var(--surface);opacity:0;transform:translateY(-5px) scale(.97);transform-origin:calc(100% - 18px) 0;transition:opacity .2s,transform .2s ease-out;pointer-events:none;z-index:5}
.d-fb24 .bb:before{content:"";position:absolute;right:12px;bottom:100%;border:6px solid transparent;border-bottom-color:var(--text)}
.d-fb24 .bb.on{opacity:1;transform:none;pointer-events:auto}
.d-fb24 .bb b{display:block;font-size:12px;line-height:1.35}
.d-fb24 .bb span{display:block;font-size:11px;line-height:1.4;opacity:.82;margin-top:1px}
.d-fb24 .bb button{display:block;margin:6px 0 0 auto;height:24px;padding:0 10px;border:0;border-radius:7px;background:var(--surface);color:var(--text);font:inherit;font-size:11px;font-weight:700;cursor:pointer}
@keyframes fb24-ping{from{transform:scale(1);opacity:.55}to{transform:scale(2.6);opacity:0}}
@media (prefers-reduced-motion:reduce){.d-fb24 .hs i:before{animation:none;opacity:.3;transform:scale(1.8)}}
`,
    html: `<div class="sc"><div class="tp"><b>제주 항공권</b><button class="fc" type="button">직항만</button></div>
  <div class="ft"><i>${fb2I.bell}</i>가격 알림<button class="hs" type="button" aria-label="새 기능 설명 보기" aria-expanded="false"><i></i></button></div>
  <div class="ui-thumb"></div><div class="ui-line" style="width:80%"></div><div class="ui-line" style="width:56%"></div>
  <div class="bb" role="dialog" aria-label="새 기능 안내"><b>새 기능</b><span>가격이 내리면 알려 드려요.</span><button type="button">확인</button></div></div>`,
    run(el, ctx) {
      const hs = el.querySelector('.hs'), bb = el.querySelector('.bb'), okb = bb.querySelector('button'), fc = el.querySelector('.fc');
      const set = on => { bb.classList.toggle('on', on); hs.setAttribute('aria-expanded', on); };
      let auto = true;
      ctx.timeout(() => { if (auto) { fb2Tap(el, hs); set(true); } }, 1250);
      ctx.on(hs, 'click', () => { auto = false; set(!bb.classList.contains('on')); });
      ctx.on(okb, 'click', () => { auto = false; set(false); hs.classList.add('seen'); });
      ctx.on(fc, 'click', () => fc.classList.toggle('on'));
    }
  },

  /* fb25 404 페이지 */
  {
    id: 'fb25', ko: '404 페이지', en: '404 page', pair: 'fb11',
    desc: '빈 화면과 달리 주소 자체가 없을 때 큰 404와 홈으로 가는 길을 보여 줘요.',
    prompt: '「404 페이지(404 page)」를 만들어 줘. 없는 주소로 들어오면 큰 숫자 404가 한 글자씩 0.1초 간격으로 위에서 0.45초 ease-out으로 떨어져 자리 잡고, 아래에 "페이지를 찾을 수 없어요" 안내와 "홈으로" 버튼을 보여 줘. 안내 제목은 h1로 두고 버튼에 포커스가 가게 해 줘. 빈 화면과 헷갈리지 않게 "아직 데이터가 없어요"식 문구는 쓰지 마.',
    css: fb2Sc('fb25') + `
.d-fb25 .sc{padding:0;gap:0}
.d-fb25 .ab{flex:none;height:30px;display:flex;align-items:center;gap:6px;padding:0 10px;border-bottom:1px solid var(--line)}
.d-fb25 .ur{flex:1;min-width:0;height:20px;border-radius:999px;background:var(--surface-2);display:flex;align-items:center;gap:4px;padding:0 8px;font-size:11px;color:var(--muted);white-space:nowrap;overflow:hidden}
.d-fb25 .ur i{display:grid;flex:none}
.d-fb25 .ur b{font-weight:600;color:var(--text)}
.d-fb25 .bd{position:relative;flex:1;min-height:0}
.d-fb25 .v{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 14px}
.d-fb25 .sc[data-v="load"] .ld,.d-fb25 .sc[data-v="nf"] .nf,.d-fb25 .sc[data-v="home"] .hm{display:flex}
.d-fb25 .ld{align-items:stretch;gap:8px}
.d-fb25 .ld .ui-line{animation:fb25-pulse 1s ease-in-out infinite}
.d-fb25 .big{display:flex;gap:3px;font-size:46px;line-height:1;font-weight:900;letter-spacing:-.03em;color:var(--accent)}
.d-fb25 .big span{display:inline-block;animation:fb25-drop .45s cubic-bezier(.2,.8,.2,1) both}
.d-fb25 .big span:nth-child(2){animation-delay:.1s;color:var(--text)}
.d-fb25 .big span:nth-child(3){animation-delay:.2s}
.d-fb25 .big span em{display:inline-block;font-style:normal;animation:fb25-tilt 3s ease-in-out .8s infinite}
.d-fb25 .nf h1{margin:6px 0 0;font-size:13px;font-weight:800;color:var(--text);letter-spacing:-.02em;animation:fb25-fade .35s ease-out .35s both}
.d-fb25 .nf p{margin:2px 0 9px;font-size:11px;color:var(--muted);animation:fb25-fade .35s ease-out .45s both}
.d-fb25 .hb{height:28px;padding:0 14px;border:0;border-radius:8px;background:var(--accent);color:var(--accent-text);font:inherit;font-size:12px;font-weight:700;cursor:pointer;animation:fb25-fade .35s ease-out .55s both}
.d-fb25 .hm{align-items:stretch;gap:8px;text-align:left}
.d-fb25 .hm .ui-thumb{height:46px;border-radius:10px}
.d-fb25 .lk{align-self:flex-start;border:0;background:none;padding:0;font:inherit;font-size:11px;font-weight:700;color:var(--accent);cursor:pointer;text-decoration:underline;text-underline-offset:3px}
@keyframes fb25-drop{from{opacity:0;transform:translateY(-34px)}}
@keyframes fb25-tilt{0%,100%{transform:rotate(0)}25%{transform:rotate(-12deg)}60%{transform:rotate(8deg)}}
@keyframes fb25-fade{from{opacity:0;transform:translateY(5px)}}
@keyframes fb25-pulse{50%{opacity:.45}}
@media (prefers-reduced-motion:reduce){.d-fb25 .big span,.d-fb25 .big span em{animation:none}}
`,
    html: `<div class="sc" data-v="load"><div class="ab"><div class="ur"><i>${fb2I.globe}</i><span>trip.example<b class="pa">/summer-evnet</b></span></div></div>
  <div class="bd">
    <div class="v ld"><div class="ui-line" style="width:70%"></div><div class="ui-line" style="width:92%"></div><div class="ui-line" style="width:54%"></div></div>
    <div class="v nf"><div class="big" aria-hidden="true"><span>4</span><span><em>0</em></span><span>4</span></div><h1>페이지를 찾을 수 없어요</h1><p>주소가 바뀌었거나 삭제됐어요</p><button class="hb" type="button">홈으로</button></div>
    <div class="v hm"><div class="ui-thumb"></div><div class="ui-line" style="width:78%"></div><button class="lk" type="button">지난 여름 이벤트 보기</button></div>
  </div></div>`,
    run(el, ctx) {
      const sc = el.querySelector('.sc'), pa = el.querySelector('.pa');
      let tm = null;
      const lost = () => { clearTimeout(tm); pa.textContent = '/summer-evnet'; sc.dataset.v = 'load'; tm = ctx.timeout(() => { sc.dataset.v = 'nf'; }, 500); };
      tm = ctx.timeout(() => { sc.dataset.v = 'nf'; }, 550);
      ctx.on(el.querySelector('.hb'), 'click', () => { clearTimeout(tm); pa.textContent = '/'; sc.dataset.v = 'home'; });
      ctx.on(el.querySelector('.lk'), 'click', lost);
    }
  }
]);
