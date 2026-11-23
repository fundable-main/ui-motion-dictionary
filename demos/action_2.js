/* action — 버튼·반응 추가분 (ac17~ac27, 카드 1장 = 패턴 1개) */
const ac2P = {
  chev: '<path d="M6.5 9.5l5.5 5.5 5.5-5.5"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  pen: '<path d="M4.5 19.5l1-4L15.8 5.2a2 2 0 0 1 2.9 2.9L8.5 18.5z"/>',
  photo: '<circle cx="8.5" cy="9" r="1.8"/><path d="M3.5 17.5l5-5 4 4 3-3 5 5"/>',
  cal: '<rect x="4" y="5.5" width="16" height="14" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',
  heart: '<path d="M12 20.3s-7.6-4.5-7.6-10.1A4.3 4.3 0 0 1 12 7.5a4.3 4.3 0 0 1 7.6 2.7c0 5.6-7.6 10.1-7.6 10.1z"/>',
  up: '<path d="M12 19V5.5"/><path d="M6 11.5l6-6 6 6"/>',
  triUp: '<path d="M12 6l7 11H5z"/>',
  triDown: '<path d="M12 18L5 7h14z"/>',
  folder: '<path d="M3.5 7a1.5 1.5 0 0 1 1.5-1.5h4l2 2h8A1.5 1.5 0 0 1 20.5 9v8.5A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5z"/>',
  file: '<path d="M6.5 3.5h7l4 4v13h-11z"/><path d="M13.5 3.5v4h4"/>',
  note: '<rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4"/>',
  trash: '<path d="M5 7h14M9.5 7V4.5h5V7M7 7l.8 12.5h8.4L17 7"/>',
  open: '<path d="M13 5h6v6M19 5l-8 8"/><path d="M17 14v5H5V7h5"/>',
  cart: '<path d="M3.5 4.5h2.2l2 10.5h10l1.8-7.5H7"/><circle cx="9.5" cy="19.2" r="1.3"/><circle cx="17" cy="19.2" r="1.3"/>'
};
const ac2Ic = (n, s = 20, w = 2) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ac2P[n]}</svg>`;
/* 공통: 가운데 한 장(.pn) + 탭 물결(.tap) + 손가락 터치 포인트(.fg) */
const ac2Base = id => `
.d-${id}{container-type:inline-size}
.d-${id} .pn{position:relative;width:calc(100% - 24px);max-width:300px;height:178px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);padding:12px;display:flex;flex-direction:column;gap:8px;overflow:hidden;box-sizing:border-box}
.d-${id} button{font:inherit;-webkit-tap-highlight-color:transparent}
.d-${id} .tap{position:absolute;width:32px;height:32px;margin:-16px 0 0 -16px;border-radius:50%;background:var(--accent);pointer-events:none;z-index:9;opacity:0;animation:${id}-tap .55s ease-out forwards}
@keyframes ${id}-tap{0%{opacity:.4;transform:scale(.3)}100%{opacity:0;transform:scale(1.5)}}
.d-${id} .fg{position:absolute;left:50%;top:50%;width:28px;height:28px;margin:-14px 0 0 -14px;border-radius:50%;background:color-mix(in srgb,var(--accent) 30%,transparent);border:2px solid color-mix(in srgb,var(--accent) 75%,transparent);box-sizing:border-box;pointer-events:none;z-index:10;opacity:0;transition:left .4s cubic-bezier(.2,.8,.2,1),top .4s cubic-bezier(.2,.8,.2,1),opacity .2s,transform .12s ease-out}
.d-${id} .fg.dn{transform:scale(.72);background:color-mix(in srgb,var(--accent) 50%,transparent)}
@container (max-width:300px){.d-${id} .pn{width:calc(100% - 16px);padding:10px}}
`;
const ac2Pos = (el, t, fx = .5, fy = .5) => {
  const r = el.getBoundingClientRect(), q = t.getBoundingClientRect();
  return [q.left + q.width * fx - r.left, q.top + q.height * fy - r.top];
};
const ac2Tap = (ctx, el, t, fx, fy) => {
  const [x, y] = ac2Pos(el, t, fx, fy);
  const d = document.createElement('i'); d.className = 'tap';
  d.style.left = x + 'px'; d.style.top = y + 'px';
  el.appendChild(d); ctx.timeout(() => d.remove(), 600);
};
const ac2Auto = (ctx, el, t, fn, ms) => ctx.timeout(() => { ac2Tap(ctx, el, t); fn(); }, ms);
const ac2Fg = el => {
  const f = document.createElement('i'); f.className = 'fg'; el.appendChild(f);
  return {
    at(t, fx, fy) { const [x, y] = ac2Pos(el, t, fx, fy); f.style.left = x + 'px'; f.style.top = y + 'px'; },
    show(v) { f.style.opacity = v ? '1' : '0'; },
    press(v) { f.classList.toggle('dn', v); }
  };
};

UIDEX.add('action', [
  /* ───────── ac17 스플릿 버튼 ───────── */
  {
    id: 'ac17', ko: '스플릿 버튼', en: 'Split button',
    desc: '기본 동작 버튼에 ▼를 붙여, 자주 쓰는 동작 옆에서 다른 동작도 골라요.',
    prompt: '「스플릿 버튼(Split button)」을 만들어 줘. 왼쪽은 기본 동작 "저장"을 바로 실행하고, 1px 구분선 오른쪽의 30px ▼ 버튼을 누르면 저장(현재 기본값에 체크 표시)·임시 저장·저장 후 닫기 메뉴가 0.18초 ease-out으로 scale .96→1 펼쳐져. 고른 항목은 왼쪽 버튼 글자로 바뀌어. ▼에는 aria-haspopup="menu"와 aria-expanded를 넣고 Esc로 닫히게 해 줘.',
    css: ac2Base('ac17') + `
.d-ac17 .hd{display:flex;align-items:center;justify-content:space-between;gap:8px;height:34px;flex:none}
.d-ac17 .hd>b{font-size:13px;color:var(--text);white-space:nowrap}
.d-ac17 .sp{position:relative;display:flex;flex:none}
.d-ac17 .mn{height:34px;min-width:88px;padding:0 10px;border:0;border-radius:10px 0 0 10px;background:var(--accent);color:var(--accent-text);font-weight:700;font-size:12.5px;cursor:pointer;white-space:nowrap;transition:filter .15s}
.d-ac17 .mn.hit{filter:brightness(.88)}
.d-ac17 .cv{width:30px;height:34px;padding:0;border:0;border-left:1px solid color-mix(in srgb,var(--accent-text) 40%,transparent);border-radius:0 10px 10px 0;background:var(--accent);color:var(--accent-text);display:grid;place-items:center;cursor:pointer}
.d-ac17 .cv svg{transition:transform .2s ease-out}
.d-ac17 .sp.open .cv svg{transform:rotate(180deg)}
.d-ac17 .menu{position:absolute;right:0;top:40px;width:148px;padding:4px;box-sizing:border-box;background:var(--surface);border:1px solid var(--line);border-radius:10px;box-shadow:var(--shadow);opacity:0;transform:translateY(-6px) scale(.96);transform-origin:top right;pointer-events:none;visibility:hidden;transition:opacity .18s ease-out,transform .18s ease-out,visibility 0s .18s;z-index:5}
.d-ac17 .sp.open .menu{opacity:1;transform:none;pointer-events:auto;visibility:visible;transition-delay:0s}
.d-ac17 .mi{display:flex;align-items:center;justify-content:space-between;width:100%;height:28px;padding:0 8px;border:0;background:none;border-radius:7px;font-size:12.5px;color:var(--text);cursor:pointer;text-align:left;white-space:nowrap}
.d-ac17 .mi svg{opacity:0;color:var(--accent)}
.d-ac17 .mi.sel{font-weight:700}
.d-ac17 .mi.sel svg{opacity:1}
.d-ac17 .mi:hover,.d-ac17 .mi.hit{background:var(--accent-soft)}
.d-ac17 .bd{display:flex;flex-direction:column;gap:8px;padding-top:4px}
.d-ac17 .bd .ui-line:nth-child(1){width:52%}
.d-ac17 .bd .ui-line:nth-child(2){width:40%}
.d-ac17 .bd .ui-line:nth-child(3){width:46%}
.d-ac17 .stt{margin-top:auto;font-size:12px;font-weight:600;color:var(--success);display:flex;align-items:center;gap:4px;opacity:0;transform:translateY(6px);transition:opacity .25s,transform .25s cubic-bezier(.2,.8,.2,1)}
.d-ac17 .stt.on{opacity:1;transform:none}
`,
    html: `<div class="pn">
  <div class="hd"><b>여행 견적서</b>
    <div class="sp"><button class="mn" type="button">저장</button><button class="cv" type="button" aria-haspopup="menu" aria-expanded="false" aria-label="다른 저장 방법">${ac2Ic('chev', 16, 2.4)}</button>
      <div class="menu" role="menu">
        <button class="mi sel" type="button" role="menuitem"><span>저장</span>${ac2Ic('check', 14, 2.6)}</button>
        <button class="mi" type="button" role="menuitem"><span>임시 저장</span>${ac2Ic('check', 14, 2.6)}</button>
        <button class="mi" type="button" role="menuitem"><span>저장 후 닫기</span>${ac2Ic('check', 14, 2.6)}</button>
      </div></div></div>
  <div class="bd"><div class="ui-line"></div><div class="ui-line"></div><div class="ui-line"></div></div>
  <div class="stt" aria-live="polite">${ac2Ic('check', 14, 2.6)}<span></span></div>
</div>`,
    run(el, ctx) {
      const sp = el.querySelector('.sp'), mn = el.querySelector('.mn'), cv = el.querySelector('.cv'), mis = [...el.querySelectorAll('.mi')];
      const stt = el.querySelector('.stt'), msg = ['저장했어요', '임시 저장했어요', '저장하고 닫았어요'];
      let cur = 0;
      const open = v => {
        if (!v && sp.querySelector('.menu').contains(document.activeElement)) cv.focus({ preventScroll: true });
        sp.classList.toggle('open', v); cv.setAttribute('aria-expanded', v);
      };
      const pick = i => { cur = i; mn.textContent = mis[i].querySelector('span').textContent; mis.forEach((m, k) => m.classList.toggle('sel', k === i)); open(false); };
      const act = () => {
        open(false); mn.classList.add('hit'); ctx.timeout(() => mn.classList.remove('hit'), 180);
        stt.classList.remove('on'); stt.querySelector('span').textContent = msg[cur];
        ctx.timeout(() => stt.classList.add('on'), 60);
      };
      ctx.on(cv, 'click', () => open(!sp.classList.contains('open')));
      ctx.on(mn, 'click', act);
      mis.forEach((m, i) => ctx.on(m, 'click', () => pick(i)));
      ctx.on(sp, 'keydown', e => { if (e.key === 'Escape') open(false); });
      ac2Auto(ctx, el, cv, () => open(true), 700);
      ctx.timeout(() => { ac2Tap(ctx, el, mis[1]); mis[1].classList.add('hit'); }, 2350);
      ctx.timeout(() => { mis[1].classList.remove('hit'); pick(1); }, 2600);
      ac2Auto(ctx, el, mn, act, 3400);
    }
  },

  /* ───────── ac18 확장 FAB ───────── */
  {
    id: 'ac18', ko: '확장 FAB', en: 'Extended FAB', pair: 'ac14',
    desc: '플로팅 버튼과 달리 글자 라벨이 붙고, 스크롤하면 아이콘만 남게 접혀요.',
    prompt: '「확장 FAB(Extended FAB)」를 만들어 줘. 오른쪽 아래에 높이 48px 알약형 accent 버튼으로 연필 아이콘과 "글쓰기" 라벨을 함께 보여 줘. 목록을 아래로 스크롤하면 라벨이 250ms cubic-bezier(.2,.8,.2,1)로 접혀 48px 원형 아이콘만 남고, 위로 스크롤하면 다시 펼쳐져. 접혀도 aria-label="글쓰기"는 유지해 줘. 플로팅 버튼과 헷갈리지 않게 누를 때 여러 동작을 펼치지 마.',
    css: ac2Base('ac18') + `
.d-ac18 .ui-phone{display:flex;flex-direction:column}
.d-ac18 .top{height:32px;flex:none;display:flex;align-items:center;padding:0 12px;font-size:13px;font-weight:800;color:var(--text);border-bottom:1px solid var(--line)}
.d-ac18 .list{flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:none;padding:2px 12px 10px}
.d-ac18 .list::-webkit-scrollbar{display:none}
.d-ac18 .row{display:flex;align-items:center;gap:9px;padding:8px 0;border-bottom:1px solid var(--line)}
.d-ac18 .row:last-child{border-bottom:0}
.d-ac18 .row .ui-thumb{width:30px;height:30px;flex:none;border-radius:8px}
.d-ac18 .row div{min-width:0;flex:1;display:flex;flex-direction:column;gap:3px}
.d-ac18 .row b{font-size:12px;font-weight:700;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-ac18 .row span{font-size:11px;color:var(--muted);white-space:nowrap}
.d-ac18 .fab{position:absolute;right:12px;bottom:12px;height:48px;min-width:48px;padding:0 16px 0 14px;border:0;border-radius:24px;background:var(--accent);color:var(--accent-text);display:flex;align-items:center;justify-content:center;cursor:pointer;box-sizing:border-box;box-shadow:0 6px 16px color-mix(in srgb,var(--accent) 45%,transparent);z-index:4;transition:padding .25s cubic-bezier(.2,.8,.2,1),transform .12s ease-out,filter .15s}
.d-ac18 .fab svg{flex:none}
.d-ac18 .fab .lb{max-width:52px;margin-left:6px;overflow:hidden;white-space:nowrap;font-size:13px;font-weight:700;transition:max-width .25s cubic-bezier(.2,.8,.2,1),margin-left .25s cubic-bezier(.2,.8,.2,1),opacity .18s ease-out}
.d-ac18 .fab.mini{padding:0 14px}
.d-ac18 .fab.mini .lb{max-width:0;margin-left:0;opacity:0}
.d-ac18 .fab.hit{transform:scale(.94);filter:brightness(.9)}
.d-ac18 .msg{position:absolute;right:12px;bottom:68px;font-size:11.5px;font-weight:700;color:var(--surface);background:var(--text);padding:6px 10px;border-radius:9px;opacity:0;transform:translateY(8px);transition:opacity .25s,transform .25s cubic-bezier(.2,.8,.2,1);z-index:3;white-space:nowrap;pointer-events:none}
.d-ac18 .msg.on{opacity:1;transform:none}
`,
    html: `<div class="ui-phone"><div class="top">여행 이야기</div>
  <div class="list" tabindex="0" aria-label="게시글 목록">
    <div class="row"><i class="ui-thumb"></i><div><b>제주 3박 4일 후기</b><span>댓글 12 · 방금</span></div></div>
    <div class="row"><i class="ui-thumb"></i><div><b>캠핑 의자 추천해 주세요</b><span>댓글 8 · 10분 전</span></div></div>
    <div class="row"><i class="ui-thumb"></i><div><b>부산 당일치기 코스</b><span>댓글 5 · 32분 전</span></div></div>
    <div class="row"><i class="ui-thumb"></i><div><b>강릉 바다 보이는 숙소</b><span>댓글 21 · 1시간 전</span></div></div>
    <div class="row"><i class="ui-thumb"></i><div><b>첫 차박 준비물 정리</b><span>댓글 3 · 2시간 전</span></div></div>
    <div class="row"><i class="ui-thumb"></i><div><b>경주 야경 산책길</b><span>댓글 9 · 3시간 전</span></div></div>
    <div class="row"><i class="ui-thumb"></i><div><b>여수 2박 예산 공유</b><span>댓글 14 · 어제</span></div></div>
    <div class="row"><i class="ui-thumb"></i><div><b>비 오는 날 실내 여행지</b><span>댓글 6 · 어제</span></div></div>
  </div>
  <div class="msg" aria-live="polite"></div>
  <button class="fab" type="button" aria-label="글쓰기">${ac2Ic('pen', 20)}<span class="lb">글쓰기</span></button>
</div>`,
    run(el, ctx) {
      const list = el.querySelector('.list'), fab = el.querySelector('.fab'), msg = el.querySelector('.msg');
      let last = 0, auto = true;
      const ease = p => 1 - Math.pow(1 - p, 3);
      const stop = () => { auto = false; };
      ctx.on(list, 'scroll', () => {
        const y = list.scrollTop;
        if (y <= 4) fab.classList.remove('mini');
        else if (y > last + 1) fab.classList.add('mini');
        else if (y < last - 1) fab.classList.remove('mini');
        last = y;
      });
      ['pointerdown', 'wheel', 'touchstart', 'keydown'].forEach(n => ctx.on(list, n, stop));
      ctx.on(fab, 'click', () => {
        fab.classList.add('hit'); ctx.timeout(() => fab.classList.remove('hit'), 160);
        msg.textContent = '글쓰기 화면을 열었어요'; msg.classList.add('on');
        ctx.timeout(() => msg.classList.remove('on'), 1800);
      });
      ctx.loop(t => {
        if (!auto) return false;
        const max = Math.min(150, list.scrollHeight - list.clientHeight);
        if (t < 700) return;
        if (t < 1900) list.scrollTop = max * ease((t - 700) / 1200);
        else if (t < 2900) list.scrollTop = max;
        else if (t < 3900) list.scrollTop = max * (1 - ease((t - 2900) / 1000));
        else { list.scrollTop = 0; auto = false; return false; }
      });
      ctx.timeout(() => { if (list.scrollTop <= 4) { ac2Tap(ctx, el, fab); fab.click(); } }, 4700);
    }
  },

  /* ───────── ac19 길게 눌러 확인 ───────── */
  {
    id: 'ac19', ko: '길게 눌러 확인', en: 'Hold to confirm',
    desc: '누르고 있는 동안 버튼이 차오르고, 다 차야 실행돼요. 떼면 취소예요.',
    prompt: '「길게 눌러 확인(Hold to confirm)」 버튼을 만들어 줘. 누르고 있는 1.2초 동안 버튼 배경이 왼쪽에서 오른쪽으로 linear하게 차오르고, 다 차면 실행되며 체크 표시로 바뀌어. 중간에 손을 떼면 0.3초 만에 0으로 되돌아가 취소돼. 키보드는 Space를 누르고 있는 동안 똑같이 차오르게 하고, 진행 상태를 aria-live로 알려 줘.',
    css: ac2Base('ac19') + `
.d-ac19 .pn{gap:6px}
.d-ac19 .tt{font-size:13.5px;font-weight:800;color:var(--text)}
.d-ac19 .sub{font-size:12px;color:var(--muted);line-height:1.45}
.d-ac19 .hb{position:relative;margin-top:auto;height:44px;width:100%;padding:0;border:1.5px solid var(--danger);border-radius:12px;background:transparent;color:var(--danger);font-weight:700;font-size:13px;cursor:pointer;overflow:hidden;touch-action:none;user-select:none;-webkit-user-select:none;transition:transform .12s ease-out,background .2s,color .2s}
.d-ac19 .hb.dn{transform:scale(.98)}
.d-ac19 .hb .fl{position:absolute;inset:0;background:color-mix(in srgb,var(--danger) 28%,transparent);transform:scaleX(0);transform-origin:left center}
.d-ac19 .hb .lb{position:relative;display:inline-flex;align-items:center;gap:5px}
.d-ac19 .hb.done{background:var(--danger);color:var(--accent-text);cursor:default}
.d-ac19 .hb.done .fl{opacity:0}
.d-ac19 .hb.done .lb{animation:ac19-pop .35s cubic-bezier(.2,.8,.2,1)}
.d-ac19 .st{height:16px;font-size:11.5px;color:var(--muted);text-align:center}
@keyframes ac19-pop{0%{transform:scale(.8);opacity:0}100%{transform:none;opacity:1}}
`,
    html: `<div class="pn">
  <div class="tt">예약을 취소할까요?</div>
  <div class="sub">제주 3박 4일 · 5월 12일 출발<br>취소하면 되돌릴 수 없어요.</div>
  <button class="hb" type="button" aria-label="길게 눌러 예약 취소"><i class="fl"></i><span class="lb">길게 눌러 예약 취소</span></button>
  <div class="st" aria-live="polite">1.2초 동안 누르고 있어야 실행돼요</div>
</div>`,
    run(el, ctx) {
      const hb = el.querySelector('.hb'), fl = el.querySelector('.fl'), lb = el.querySelector('.lb'), st = el.querySelector('.st');
      let p = 0, hold = false, done = false, last = null;
      const press = v => {
        if (done || hold === v) return;
        hold = v; hb.classList.toggle('dn', v);
        st.textContent = v ? '누르는 중… 떼면 취소돼요' : (p > 0.02 ? '손을 떼서 실행되지 않았어요' : st.textContent);
      };
      ctx.loop(t => {
        const dt = last === null ? 0 : Math.min(60, t - last); last = t;
        if (done) return false;
        p = Math.max(0, Math.min(1, p + (hold ? dt / 1200 : -dt / 300)));
        fl.style.transform = `scaleX(${p})`;
        if (p >= 1) {
          done = true; hold = false; hb.classList.remove('dn'); hb.classList.add('done');
          lb.innerHTML = ac2Ic('check', 16, 2.6) + '예약을 취소했어요'; st.textContent = '실행 완료';
          return false;
        }
      });
      ctx.on(hb, 'pointerdown', () => press(true));
      ['pointerup', 'pointerleave', 'pointercancel'].forEach(n => ctx.on(hb, n, () => press(false)));
      ctx.on(hb, 'keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); press(true); } });
      ctx.on(hb, 'keyup', () => press(false));
      ctx.on(hb, 'contextmenu', e => e.preventDefault());
      const fg = ac2Fg(el);
      ctx.timeout(() => { fg.at(hb, .5, .55); fg.show(true); }, 250);
      ctx.timeout(() => { fg.press(true); press(true); }, 550);
      ctx.timeout(() => { fg.press(false); press(false); }, 950);
      ctx.timeout(() => { fg.press(true); press(true); }, 1400);
      ctx.timeout(() => { fg.press(false); fg.show(false); }, 2800);
    }
  },

  /* ───────── ac20 리플 ───────── */
  {
    id: 'ac20', ko: '리플', en: 'Ripple',
    desc: '누른 바로 그 지점에서 물결 원이 퍼져 눌렸다는 걸 알려 줘요.',
    prompt: '「리플(Ripple)」 효과를 버튼에 만들어 줘. 누른 좌표를 중심으로 반투명 원이 scale 0→1로 0.6초 ease-out 동안 버튼 전체를 덮을 만큼 퍼지며 opacity .35→0으로 사라져. 원은 버튼 밖으로 넘치지 않게 overflow:hidden으로 자르고, 연속으로 누르면 물결이 겹쳐 보이게 해. prefers-reduced-motion이면 배경색만 잠깐 바꿔 줘.',
    css: ac2Base('ac20') + `
.d-ac20 .cap{font-size:12px;color:var(--muted)}
.d-ac20 .rb{position:relative;overflow:hidden;flex:none;height:54px;width:100%;padding:0;border:0;border-radius:14px;background:var(--accent);color:var(--accent-text);font-weight:800;font-size:14px;cursor:pointer;touch-action:manipulation}
.d-ac20 .rc{position:relative;overflow:hidden;flex:1;min-height:0;display:flex;align-items:center;gap:10px;padding:0 12px;border:1px solid var(--line);border-radius:14px;background:var(--surface-2);color:var(--accent);cursor:pointer;text-align:left}
.d-ac20 .rc .ui-thumb{width:36px;height:36px;flex:none;display:grid;place-items:center}
.d-ac20 .rc b{display:block;font-size:12.5px;color:var(--text);line-height:1.3}
.d-ac20 .rc span{display:block;font-size:11.5px;color:var(--muted);font-weight:400;line-height:1.3}
.d-ac20 .rp{position:absolute;border-radius:50%;background:currentColor;opacity:.35;transform:scale(0);pointer-events:none;animation:ac20-rp .6s ease-out forwards}
.d-ac20 .rb>span,.d-ac20 .rc>div{position:relative}
@keyframes ac20-rp{0%{transform:scale(0);opacity:.35}100%{transform:scale(1);opacity:0}}
`,
    html: `<div class="pn">
  <div class="cap">누른 곳에서 물결이 퍼져요</div>
  <button class="rb" type="button"><span>39,000원 결제하기</span></button>
  <button class="rc" type="button"><div class="ui-thumb">${ac2Ic('cart', 18)}</div><div><b>캠핑 의자</b><span>장바구니 1개 · 눌러서 보기</span></div></button>
</div>`,
    run(el, ctx) {
      const rb = el.querySelector('.rb'), rc = el.querySelector('.rc');
      const ripple = (t, x, y) => {
        const w = t.clientWidth, h = t.clientHeight;
        const r = Math.hypot(Math.max(x, w - x), Math.max(y, h - y));
        const d = document.createElement('i'); d.className = 'rp';
        d.style.cssText = `left:${x - r}px;top:${y - r}px;width:${r * 2}px;height:${r * 2}px`;
        t.insertBefore(d, t.firstChild); ctx.timeout(() => d.remove(), 650);
      };
      [rb, rc].forEach(t => ctx.on(t, 'pointerdown', e => { const q = t.getBoundingClientRect(); ripple(t, e.clientX - q.left, e.clientY - q.top); }));
      [rb, rc].forEach(t => ctx.on(t, 'keydown', e => { if (e.key === 'Enter' || e.key === ' ') ripple(t, t.clientWidth / 2, t.clientHeight / 2); }));
      const fg = ac2Fg(el);
      const hit = (t, fx, fy, ms) => {
        ctx.timeout(() => { fg.at(t, fx, fy); fg.show(true); }, ms - 350);
        ctx.timeout(() => { fg.press(true); ripple(t, t.clientWidth * fx, t.clientHeight * fy); }, ms);
        ctx.timeout(() => fg.press(false), ms + 150);
      };
      hit(rb, .22, .5, 600); hit(rb, .8, .45, 1300); hit(rc, .55, .5, 2000);
      ctx.timeout(() => fg.show(false), 2700);
    }
  },

  /* ───────── ac21 버튼 그룹 ───────── */
  {
    id: 'ac21', ko: '버튼 그룹', en: 'Button group',
    desc: '관련 버튼을 한 덩어리로 붙여 놓고, 굵게·밑줄처럼 여러 개를 함께 켜요.',
    prompt: '「버튼 그룹(Button group)」을 글자 서식 도구 모음으로 만들어 줘. 굵게·기울임·밑줄·취소선 버튼 4개를 간격 없이 붙여 양끝만 10px 둥글게 하고, 누른 버튼은 0.15초 ease-out으로 옅은 파랑 배경이 되며 여러 개를 동시에 켤 수 있어. 켠 서식은 아래 미리보기 글자에 바로 적용해. role="group"과 버튼마다 aria-pressed를 넣어 줘.',
    css: ac2Base('ac21') + `
.d-ac21 .pn{align-items:center;gap:10px}
.d-ac21 .cap{align-self:flex-start;font-size:12px;color:var(--muted)}
.d-ac21 .bg{display:flex;flex:none}
.d-ac21 .gb{position:relative;width:46px;height:38px;padding:0;margin-left:-1px;border:1px solid var(--line);background:var(--surface);color:var(--text);font-size:15px;font-family:Georgia,'Times New Roman',serif;cursor:pointer;transition:background .15s ease-out,color .15s ease-out,border-color .15s ease-out}
.d-ac21 .gb:first-child{margin-left:0;border-radius:10px 0 0 10px}
.d-ac21 .gb:last-child{border-radius:0 10px 10px 0}
.d-ac21 .gb.on{background:var(--accent-soft);color:var(--accent);border-color:var(--accent);z-index:1}
.d-ac21 .gb:active{transform:translateY(1px)}
.d-ac21 .pv{flex:1;min-height:0;width:100%;display:grid;place-items:center;border-radius:12px;background:var(--surface-2);font-size:16px;color:var(--text);text-align:center;box-sizing:border-box;padding:0 8px}
.d-ac21 .pv span{transition:all .15s ease-out}
.d-ac21 .ls{height:15px;font-size:11.5px;color:var(--muted)}
`,
    html: `<div class="pn">
  <div class="cap">글자 서식</div>
  <div class="bg" role="group" aria-label="글자 서식">
    <button class="gb" type="button" aria-pressed="false" aria-label="굵게" data-k="굵게"><b>B</b></button>
    <button class="gb" type="button" aria-pressed="false" aria-label="기울임" data-k="기울임"><i>I</i></button>
    <button class="gb" type="button" aria-pressed="false" aria-label="밑줄" data-k="밑줄"><u>U</u></button>
    <button class="gb" type="button" aria-pressed="false" aria-label="취소선" data-k="취소선"><s>S</s></button>
  </div>
  <div class="pv"><span>제주 3박 4일 일정</span></div>
  <div class="ls" aria-live="polite">켜진 서식 없음</div>
</div>`,
    run(el, ctx) {
      const gbs = [...el.querySelectorAll('.gb')], tx = el.querySelector('.pv span'), ls = el.querySelector('.ls');
      const sync = () => {
        const on = gbs.map(b => b.classList.contains('on'));
        tx.style.fontWeight = on[0] ? '800' : '400';
        tx.style.fontStyle = on[1] ? 'italic' : 'normal';
        tx.style.textDecoration = [on[2] ? 'underline' : '', on[3] ? 'line-through' : ''].join(' ').trim() || 'none';
        const names = gbs.filter(b => b.classList.contains('on')).map(b => b.dataset.k);
        ls.textContent = names.length ? '켜짐: ' + names.join(' · ') : '켜진 서식 없음';
      };
      const tog = b => { const v = b.classList.toggle('on'); b.setAttribute('aria-pressed', v); sync(); };
      gbs.forEach(b => ctx.on(b, 'click', () => tog(b)));
      ac2Auto(ctx, el, gbs[0], () => tog(gbs[0]), 600);
      ac2Auto(ctx, el, gbs[2], () => tog(gbs[2]), 1300);
      ac2Auto(ctx, el, gbs[1], () => tog(gbs[1]), 2600);
    }
  },

  /* ───────── ac22 고스트 버튼 ───────── */
  {
    id: 'ac22', ko: '고스트 버튼', en: 'Ghost button',
    desc: '테두리만 있는 투명 버튼으로, 주 버튼 옆에서 덜 중요한 동작을 맡아요.',
    prompt: '「고스트 버튼(Ghost button)」을 주 버튼 왼쪽 보조 버튼으로 만들어 줘. 배경은 투명, 1.5px accent 테두리와 accent 글자만 두고, 호버하면 0.2초 ease-out으로 배경이 accent로 채워지며 글자가 흰색으로 바뀌어. 높이와 모서리는 주 버튼과 같게 맞추되 시선은 주 버튼이 먼저 받게 해. 키보드 포커스에는 2px 포커스 링을 보여 줘.',
    css: ac2Base('ac22') + `
.d-ac22 .top{display:flex;align-items:center;gap:10px}
.d-ac22 .ok{flex:none;width:34px;height:34px;border-radius:50%;background:var(--accent-soft);color:var(--accent);display:grid;place-items:center}
.d-ac22 .top div b{display:block;font-size:13.5px;color:var(--text);line-height:1.3}
.d-ac22 .top div span{display:block;font-size:12px;color:var(--muted);line-height:1.3}
.d-ac22 .bt{display:grid;grid-template-columns:1fr 1fr;gap:8px 8px;margin-top:auto}
.d-ac22 .gh,.d-ac22 .pm{height:40px;padding:0;border-radius:11px;font-weight:700;font-size:13px;cursor:pointer;box-sizing:border-box;white-space:nowrap}
.d-ac22 .gh{background:transparent;border:1.5px solid var(--accent);color:var(--accent);transition:background .2s ease-out,color .2s ease-out}
.d-ac22 .gh:hover,.d-ac22 .gh.hv{background:var(--accent);color:var(--accent-text)}
.d-ac22 .gh:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.d-ac22 .pm{border:0;background:var(--accent);color:var(--accent-text)}
.d-ac22 .tg{font-size:11px;color:var(--muted);text-align:center;line-height:1.2}
.d-ac22 .tg.gt{color:var(--accent);font-weight:700}
.d-ac22 .cur{position:absolute;left:86%;top:30%;width:18px;height:18px;z-index:10;pointer-events:none;color:var(--text);opacity:0;transition:left .5s cubic-bezier(.2,.8,.2,1),top .5s cubic-bezier(.2,.8,.2,1),opacity .2s}
.d-ac22 .cur svg{display:block;fill:var(--text);stroke:var(--surface);stroke-width:1.5}
`,
    html: `<div class="pn">
  <div class="top"><span class="ok">${ac2Ic('check', 18, 2.6)}</span><div><b>장바구니에 담았어요</b><span>캠핑 의자 1개 · 39,000원</span></div></div>
  <div class="bt">
    <button class="gh" type="button">계속 쇼핑</button><button class="pm" type="button">결제하기</button>
    <div class="tg gt">고스트 · 보조</div><div class="tg">주 버튼</div>
  </div>
</div>
<i class="cur"><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 8-6 1.6L10.5 19z"/></svg></i>`,
    run(el, ctx) {
      const gh = el.querySelector('.gh'), cur = el.querySelector('.cur');
      const to = (t, fx, fy) => { const [x, y] = ac2Pos(el, t, fx, fy); cur.style.left = x + 'px'; cur.style.top = y + 'px'; };
      ctx.timeout(() => { cur.style.opacity = '1'; }, 200);
      ctx.timeout(() => to(gh, .6, .55), 500);
      ctx.timeout(() => gh.classList.add('hv'), 850);
      ctx.timeout(() => { cur.style.left = '86%'; cur.style.top = '30%'; }, 2700);
      ctx.timeout(() => gh.classList.remove('hv'), 2900);
      ctx.timeout(() => { cur.style.opacity = '0'; }, 3300);
    }
  },

  /* ───────── ac23 더블탭 좋아요 ───────── */
  {
    id: 'ac23', ko: '더블탭 좋아요', en: 'Double-tap like', pair: 'ac01',
    desc: '좋아요 버튼과 달리 사진을 두 번 탭하면 가운데 큰 하트가 튀어나와요.',
    prompt: '「더블탭 좋아요(Double-tap like)」를 만들어 줘. 사진을 300ms 안에 두 번 탭하면 사진 가운데에 72px 하트가 scale .3→1.2→1로 튀어나와 0.9초 뒤 사라지고, 아래 하트 아이콘이 채워지며 숫자가 +1 돼. 좋아요와 헷갈리지 않게 한 번 탭으로는 켜지 마, 이미 켜진 상태의 더블탭은 취소하지 말고 하트만 다시 보여 줘. 키보드용 좋아요 버튼도 함께 둬.',
    css: ac2Base('ac23') + `
.d-ac23 .pic{position:relative;flex:1;min-height:0;display:grid;place-items:center;color:var(--accent);cursor:pointer;touch-action:manipulation;user-select:none;-webkit-user-select:none}
.d-ac23 .pic>svg{opacity:.5}
.d-ac23 .hint{position:absolute;left:8px;top:8px;font-size:11px;font-weight:700;color:var(--surface);background:var(--text);padding:3px 8px;border-radius:999px;opacity:.82}
.d-ac23 .big{position:absolute;left:50%;top:50%;width:72px;height:72px;margin:-36px 0 0 -36px;color:var(--danger);opacity:0;pointer-events:none}
.d-ac23 .big svg{width:72px;height:72px;fill:currentColor;filter:drop-shadow(0 4px 10px rgba(0,0,0,.22))}
.d-ac23 .big.go{animation:ac23-big .9s cubic-bezier(.2,.8,.2,1) forwards}
.d-ac23 .row{display:flex;align-items:center;gap:6px;height:26px;flex:none}
.d-ac23 .lk{width:30px;height:30px;margin-left:-4px;padding:0;border:0;background:none;color:var(--muted);display:grid;place-items:center;cursor:pointer}
.d-ac23 .lk svg{width:24px;height:24px;transition:color .2s}
.d-ac23 .lk.on{color:var(--danger)}
.d-ac23 .lk.on svg{fill:currentColor;animation:ac23-pop .4s cubic-bezier(.2,.8,.2,1)}
.d-ac23 .cnt{font-size:12.5px;color:var(--muted);white-space:nowrap}
.d-ac23 .cnt b{font-size:13.5px;color:var(--text);font-variant-numeric:tabular-nums}
@keyframes ac23-big{0%{opacity:0;transform:scale(.3)}22%{opacity:1;transform:scale(1.2)}38%{opacity:1;transform:scale(1)}78%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.15)}}
@keyframes ac23-pop{0%{transform:scale(1)}40%{transform:scale(1.3)}100%{transform:scale(1)}}
`,
    html: `<div class="pn">
  <div class="ui-thumb pic" aria-label="사진, 두 번 탭하면 좋아요">${ac2Ic('photo', 30, 1.8)}<span class="hint">두 번 탭</span><span class="big">${ac2Ic('heart')}</span></div>
  <div class="row"><button class="lk" type="button" aria-pressed="false" aria-label="좋아요">${ac2Ic('heart')}</button><span class="cnt"><b>128</b>명이 좋아해요</span></div>
</div>`,
    run(el, ctx) {
      const pic = el.querySelector('.pic'), big = el.querySelector('.big'), lk = el.querySelector('.lk'), n = el.querySelector('.cnt b');
      const set = v => { lk.classList.toggle('on', v); lk.setAttribute('aria-pressed', v); n.textContent = v ? '129' : '128'; };
      const like = () => { set(true); big.classList.remove('go'); void big.offsetWidth; big.classList.add('go'); };
      let lastT = 0;
      ctx.on(pic, 'pointerdown', e => {
        const q = el.getBoundingClientRect(), now = performance.now();
        const d = document.createElement('i'); d.className = 'tap';
        d.style.left = (e.clientX - q.left) + 'px'; d.style.top = (e.clientY - q.top) + 'px';
        el.appendChild(d); ctx.timeout(() => d.remove(), 600);
        if (now - lastT < 300) { lastT = 0; like(); } else lastT = now;
      });
      ctx.on(lk, 'click', () => set(!lk.classList.contains('on')));
      const fg = ac2Fg(el);
      const dbl = ms => {
        ctx.timeout(() => { fg.press(true); ac2Tap(ctx, el, pic, .62, .6); }, ms);
        ctx.timeout(() => fg.press(false), ms + 90);
        ctx.timeout(() => { fg.press(true); ac2Tap(ctx, el, pic, .62, .6); like(); }, ms + 200);
        ctx.timeout(() => fg.press(false), ms + 300);
      };
      ctx.timeout(() => { fg.at(pic, .62, .6); fg.show(true); }, 250);
      dbl(600); dbl(1800);
      ctx.timeout(() => fg.show(false), 2500);
    }
  },

  /* ───────── ac24 추천·비추천 ───────── */
  {
    id: 'ac24', ko: '추천·비추천', en: 'Upvote / Downvote',
    desc: '위·아래 화살표로 글을 올리거나 내리고, 가운데 점수가 굴러 바뀌어요.',
    prompt: '「추천·비추천(Upvote / Downvote)」을 글 왼쪽 세로 묶음으로 만들어 줘. 위 화살표·점수·아래 화살표 순서로 두고, 위를 누르면 화살표가 accent로 채워지며 점수가 128→129로 0.3초 ease-out 위로 굴러 바뀌고, 아래를 누르면 빨간색이 되며 아래로 굴러 내려가. 같은 화살표를 다시 누르면 취소돼. 버튼에 aria-pressed를, 점수에 aria-live를 넣어 줘.',
    css: ac2Base('ac24') + `
.d-ac24 .pn{gap:0;padding-top:8px;padding-bottom:8px}
.d-ac24 .post{flex:1;min-height:0;display:flex;align-items:center;gap:10px}
.d-ac24 .post+.post{border-top:1px solid var(--line)}
.d-ac24 .vt{flex:none;width:40px;display:flex;flex-direction:column;align-items:center}
.d-ac24 .vb{width:32px;height:24px;padding:0;border:0;border-radius:7px;background:none;color:var(--muted);display:grid;place-items:center;cursor:pointer;transition:color .15s,background .15s,transform .15s cubic-bezier(.2,.8,.2,1)}
.d-ac24 .vb:hover{background:var(--surface-2)}
.d-ac24 .vb.on svg{fill:currentColor}
.d-ac24 .up.on{color:var(--accent);transform:translateY(-2px)}
.d-ac24 .dn.on{color:var(--danger);transform:translateY(2px)}
.d-ac24 .nw{position:relative;width:40px;height:20px;overflow:hidden}
.d-ac24 .nw b{position:absolute;inset:0;text-align:center;font-size:14px;line-height:20px;font-weight:800;color:var(--text);font-variant-numeric:tabular-nums}
.d-ac24 .vt.u .nw b{color:var(--accent)}
.d-ac24 .vt.d .nw b{color:var(--danger)}
.d-ac24 .nw .ou{animation:ac24-ou .3s ease-out forwards}
.d-ac24 .nw .iu{animation:ac24-iu .3s ease-out}
.d-ac24 .nw .od{animation:ac24-od .3s ease-out forwards}
.d-ac24 .nw .id{animation:ac24-id .3s ease-out}
.d-ac24 .bd{flex:1;min-width:0}
.d-ac24 .bd b{display:block;font-size:13px;color:var(--text);line-height:1.35;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-ac24 .bd span{display:block;font-size:11.5px;color:var(--muted);margin-top:3px;white-space:nowrap}
.d-ac24 .bd .ui-line{width:70%;margin-top:6px;height:6px}
@keyframes ac24-ou{to{transform:translateY(-100%)}}
@keyframes ac24-iu{from{transform:translateY(100%)}}
@keyframes ac24-od{to{transform:translateY(100%)}}
@keyframes ac24-id{from{transform:translateY(-100%)}}
`,
    html: `<div class="pn">
  ${[['128', '접이식 캠핑 의자 추천해요', '댓글 24 · 3시간 전'], ['57', '제주 3박 4일 일정 공유', '댓글 9 · 어제']].map(p => `<div class="post">
    <div class="vt" data-base="${p[0]}">
      <button class="vb up" type="button" aria-pressed="false" aria-label="추천">${ac2Ic('triUp', 20, 2)}</button>
      <div class="nw" aria-live="polite"><b>${p[0]}</b></div>
      <button class="vb dn" type="button" aria-pressed="false" aria-label="비추천">${ac2Ic('triDown', 20, 2)}</button>
    </div>
    <div class="bd"><b>${p[1]}</b><div class="ui-line"></div><span>${p[2]}</span></div>
  </div>`).join('')}
</div>`,
    run(el, ctx) {
      const votes = [];
      el.querySelectorAll('.vt').forEach(vt => {
        const up = vt.querySelector('.up'), dn = vt.querySelector('.dn'), nw = vt.querySelector('.nw'), base = +vt.dataset.base;
        let v = 0;
        const vote = to => {
          const old = base + v; v = v === to ? 0 : to; const now = base + v, d = now > old ? 'u' : 'd';
          up.classList.toggle('on', v === 1); dn.classList.toggle('on', v === -1);
          up.setAttribute('aria-pressed', v === 1); dn.setAttribute('aria-pressed', v === -1);
          vt.classList.toggle('u', v === 1); vt.classList.toggle('d', v === -1);
          nw.innerHTML = `<b class="o${d}" aria-hidden="true">${old}</b><b class="i${d}">${now}</b>`;
        };
        ctx.on(up, 'click', () => vote(1)); ctx.on(dn, 'click', () => vote(-1));
        votes.push({ up, dn, vote });
      });
      const a = votes[0];
      ac2Auto(ctx, el, a.up, () => a.vote(1), 600);
      ac2Auto(ctx, el, a.dn, () => a.vote(-1), 1600);
    }
  },

  /* ───────── ac25 맨 위로 버튼 ───────── */
  {
    id: 'ac25', ko: '맨 위로 버튼', en: 'Back to top',
    desc: '스크롤을 내리면 구석에 나타나고, 누르면 맨 위로 부드럽게 올라가요.',
    prompt: '「맨 위로 버튼(Back to top)」을 만들어 줘. 스크롤이 화면 높이의 절반을 넘으면 오른쪽 아래 40px 원형 화살표 버튼이 0.25초 ease-out으로 아래에서 12px 올라오며 나타나고, 누르면 0.5초 동안 ease-out으로 맨 위까지 부드럽게 스크롤한 뒤 버튼이 다시 사라져. aria-label="맨 위로"를 넣고, prefers-reduced-motion이면 즉시 이동해 줘.',
    css: ac2Base('ac25') + `
.d-ac25 .sc{position:absolute;inset:0;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:none}
.d-ac25 .sc::-webkit-scrollbar{display:none}
.d-ac25 .top{position:sticky;top:0;z-index:2;height:32px;display:flex;align-items:center;justify-content:space-between;padding:0 12px;font-size:13px;font-weight:800;color:var(--text);background:var(--surface);border-bottom:1px solid var(--line)}
.d-ac25 .top em{font-style:normal;font-size:11px;font-weight:600;color:var(--muted);font-variant-numeric:tabular-nums}
.d-ac25 .hero{height:64px;margin:10px 12px 4px;display:grid;place-items:center;color:var(--accent);font-size:12px;font-weight:700}
.d-ac25 .row{display:flex;gap:9px;align-items:center;padding:8px 12px}
.d-ac25 .row .no{flex:none;width:30px;height:30px;border-radius:9px;background:var(--surface-2);color:var(--muted);display:grid;place-items:center;font-size:12px;font-weight:800}
.d-ac25 .row .ln{flex:1;display:flex;flex-direction:column;gap:6px}
.d-ac25 .row .ui-line:last-child{width:60%;height:6px}
.d-ac25 .tb{position:absolute;right:12px;bottom:12px;width:40px;height:40px;padding:0;border-radius:50%;border:0;background:var(--accent);color:var(--accent-text);display:grid;place-items:center;cursor:pointer;box-shadow:0 6px 16px color-mix(in srgb,var(--accent) 45%,transparent);z-index:3;opacity:0;transform:translateY(12px);pointer-events:none;transition:opacity .25s ease-out,transform .25s ease-out}
.d-ac25 .tb.on{opacity:1;transform:none;pointer-events:auto}
`,
    html: `<div class="ui-phone">
  <div class="sc" tabindex="0" aria-label="여행 후기 목록">
    <div class="top">여행 후기<em>맨 위</em></div>
    <div class="ui-thumb hero">제주 3박 4일 후기 모음</div>
    ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `<div class="row"><span class="no">${i}</span><div class="ln"><div class="ui-line"></div><div class="ui-line"></div></div></div>`).join('')}
  </div>
  <button class="tb" type="button" aria-label="맨 위로">${ac2Ic('up', 20, 2.4)}</button>
</div>`,
    run(el, ctx) {
      const sc = el.querySelector('.sc'), tb = el.querySelector('.tb'), em = el.querySelector('.top em');
      const upd = () => { const y = sc.scrollTop; tb.classList.toggle('on', y > 90); em.textContent = y < 4 ? '맨 위' : Math.round(y) + 'px 내려옴'; };
      let tok = 0;
      const go = (to, dur, ease) => {
        const my = ++tok, from = sc.scrollTop; let t0 = null;
        ctx.loop(t => {
          if (my !== tok) return false;
          if (t0 === null) t0 = t;
          const k = Math.min(1, (t - t0) / dur);
          sc.scrollTop = from + (to - from) * ease(k); upd();
          if (k >= 1) return false;
        });
      };
      const out = k => 1 - Math.pow(1 - k, 3), io = k => k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      ctx.on(sc, 'scroll', upd);
      ['wheel', 'touchstart', 'pointerdown'].forEach(n => ctx.on(sc, n, () => { tok++; }, { passive: true }));
      ctx.on(tb, 'click', () => go(0, 500, out));
      ctx.timeout(() => go(260, 1100, io), 300);
      ctx.timeout(() => { ac2Tap(ctx, el, tb); go(0, 500, out); }, 2700);
    }
  },

  /* ───────── ac26 컨텍스트 메뉴 ───────── */
  {
    id: 'ac26', ko: '컨텍스트 메뉴', en: 'Context menu', pair: 'ac16',
    desc: '케밥과 달리 버튼 없이, 항목을 우클릭·길게 누른 바로 그 자리에 떠요.',
    prompt: '「컨텍스트 메뉴(Context menu)」를 파일 목록에 만들어 줘. 항목을 우클릭하거나 0.45초 길게 누르면 누른 좌표에 열기·이름 바꾸기·삭제 메뉴가 0.15초 ease-out으로 scale .92→1 나타나고, 화면 끝에 닿으면 반대쪽으로 뒤집혀. 케밥 메뉴와 헷갈리지 않게 점 세 개 버튼은 두지 마. role="menu"와 방향키 이동, Esc 닫기를 넣어 줘.',
    css: ac2Base('ac26') + `
.d-ac26 .pn{padding:10px;gap:0;user-select:none;-webkit-user-select:none}
.d-ac26 .gr{flex:1;min-height:0;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:8px}
.d-ac26 .tl{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:6px;padding:0 12px;border-radius:12px;background:var(--surface-2);border:1.5px solid transparent;color:var(--accent);cursor:context-menu;touch-action:manipulation;-webkit-touch-callout:none;transition:transform .2s ease-out,border-color .15s,background .15s}
.d-ac26 .tl b{font-size:12.5px;color:var(--text);white-space:nowrap}
.d-ac26 .tl.hold{transform:scale(.96)}
.d-ac26 .tl.sel{border-color:var(--accent);background:var(--accent-soft)}
.d-ac26 .tl:focus-visible{outline:2px solid var(--accent);outline-offset:1px}
.d-ac26 .cm{position:absolute;left:0;top:0;width:118px;padding:4px;box-sizing:border-box;background:var(--surface);border:1px solid var(--line);border-radius:10px;box-shadow:var(--shadow),0 10px 24px rgba(0,0,0,.14);opacity:0;transform:scale(.92);pointer-events:none;visibility:hidden;transition:opacity .15s ease-out,transform .15s ease-out,visibility 0s .15s;z-index:6}
.d-ac26 .cm.on{opacity:1;transform:none;pointer-events:auto;visibility:visible;transition-delay:0s}
.d-ac26 .ci{display:flex;align-items:center;gap:7px;width:100%;height:28px;padding:0 8px;border:0;background:none;border-radius:7px;font-size:12.5px;color:var(--text);cursor:pointer;text-align:left;white-space:nowrap}
.d-ac26 .ci svg{color:var(--muted);flex:none}
.d-ac26 .ci:hover,.d-ac26 .ci:focus-visible{background:var(--surface-2);outline:0}
.d-ac26 .ci.del,.d-ac26 .ci.del svg{color:var(--danger)}
`,
    html: `<div class="pn">
  <div class="gr">
    <div class="tl" tabindex="0" role="button" aria-haspopup="menu">${ac2Ic('folder', 22, 1.8)}<b>제주 사진</b></div>
    <div class="tl" tabindex="0" role="button" aria-haspopup="menu">${ac2Ic('file', 22, 1.8)}<b>견적서</b></div>
    <div class="tl" tabindex="0" role="button" aria-haspopup="menu">${ac2Ic('note', 22, 1.8)}<b>준비물 메모</b></div>
    <div class="tl" tabindex="0" role="button" aria-haspopup="menu">${ac2Ic('folder', 22, 1.8)}<b>영수증</b></div>
  </div>
  <div class="cm" role="menu" aria-label="항목 메뉴">
    <button class="ci" type="button" role="menuitem">${ac2Ic('open', 14)}열기</button>
    <button class="ci" type="button" role="menuitem">${ac2Ic('pen', 14)}이름 바꾸기</button>
    <button class="ci del" type="button" role="menuitem">${ac2Ic('trash', 14)}삭제</button>
  </div>
</div>`,
    run(el, ctx) {
      const pn = el.querySelector('.pn'), cm = el.querySelector('.cm'), tls = [...el.querySelectorAll('.tl')], cis = [...el.querySelectorAll('.ci')];
      let tk = 0, from = null;
      const close = () => {
        if (from && cm.contains(document.activeElement)) from.focus({ preventScroll: true });
        from = null;
        cm.classList.remove('on'); tls.forEach(t => t.classList.remove('sel', 'hold'));
      };
      /* byUser=true(우클릭·길게 누르기·키보드)일 때만 첫 항목으로 포커스 이동 — 자동 시연은 포커스를 건드리지 않는다 */
      const open = (tl, cx, cy, byUser) => {
        const q = pn.getBoundingClientRect(), w = cm.offsetWidth, h = cm.offsetHeight;
        let x = cx - q.left, y = cy - q.top;
        const fx = x + w > q.width - 4, fy = y + h > q.height - 4;
        if (fx) x -= w; if (fy) y -= h;
        x = Math.max(4, Math.min(q.width - w - 4, x)); y = Math.max(4, Math.min(q.height - h - 4, y));
        tls.forEach(t => { t.classList.remove('hold'); t.classList.toggle('sel', t === tl); });
        cm.classList.remove('on');
        cm.style.transition = 'none'; cm.style.left = x + 'px'; cm.style.top = y + 'px';
        cm.style.transformOrigin = (fx ? 'right' : 'left') + ' ' + (fy ? 'bottom' : 'top');
        void cm.offsetWidth; cm.style.transition = ''; cm.classList.add('on');
        from = tl; if (byUser) cis[0].focus({ preventScroll: true });
      };
      const openKey = tl => { const q = tl.getBoundingClientRect(); open(tl, q.left + q.width / 2, q.top + q.height / 2, true); };
      ctx.on(pn, 'contextmenu', e => {
        e.preventDefault(); tk++;
        const tl = e.target.closest('.tl'); if (!tl) return;
        const q = tl.getBoundingClientRect();
        /* 키보드(메뉴 키)로 들어온 contextmenu는 좌표가 타일 밖일 수 있어 가운데로 연다 */
        if (e.clientX < q.left || e.clientX > q.right || e.clientY < q.top || e.clientY > q.bottom) openKey(tl);
        else open(tl, e.clientX, e.clientY, true);
      });
      tls.forEach(tl => ctx.on(tl, 'keydown', e => {
        if (e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10')) { e.preventDefault(); tk++; openKey(tl); }
      }));
      ctx.on(pn, 'pointerdown', e => {
        if (e.target.closest('.cm')) return;
        close();
        const tl = e.target.closest('.tl'); if (!tl || e.button !== 0) return;
        const my = ++tk, cx = e.clientX, cy = e.clientY; tl.classList.add('hold');
        ctx.timeout(() => { if (my === tk) open(tl, cx, cy, true); }, 450);
      });
      ['pointerup', 'pointerleave', 'pointercancel'].forEach(n => ctx.on(pn, n, () => { tk++; tls.forEach(t => t.classList.remove('hold')); }));
      cis.forEach((c, i) => {
        ctx.on(c, 'click', close);
        ctx.on(c, 'keydown', e => {
          if (e.key === 'ArrowDown') { e.preventDefault(); cis[(i + 1) % cis.length].focus(); }
          if (e.key === 'ArrowUp') { e.preventDefault(); cis[(i + cis.length - 1) % cis.length].focus(); }
          if (e.key === 'Escape' || e.key === 'Tab') { e.preventDefault(); e.stopPropagation(); close(); }
        });
      });
      const fg = ac2Fg(el);
      const demo = (tl, fx, fy, ms) => {
        ctx.timeout(() => { close(); fg.at(tl, fx, fy); fg.show(true); }, ms);
        ctx.timeout(() => { fg.press(true); tl.classList.add('hold'); }, ms + 350);
        ctx.timeout(() => { const q = tl.getBoundingClientRect(); open(tl, q.left + q.width * fx, q.top + q.height * fy); }, ms + 800);
        ctx.timeout(() => fg.press(false), ms + 950);
      };
      demo(tls[0], .6, .5, 150);
      demo(tls[3], .55, .55, 2700);
      ctx.timeout(() => fg.show(false), 4000);
    }
  },

  /* ───────── ac27 인라인 편집 ───────── */
  {
    id: 'ac27', ko: '인라인 편집', en: 'Inline edit',
    desc: '글자를 누르면 화면 이동 없이 그 자리에서 입력창으로 바뀌어요.',
    prompt: '「인라인 편집(Inline edit)」을 프로필 닉네임에 만들어 줘. 글자를 누르면 같은 위치·같은 글자 크기의 입력창으로 바뀌며 0.15초 ease-out으로 accent 테두리와 3px 포커스 링이 생기고 내용이 전체 선택돼. Enter나 바깥 클릭으로 저장하면 글자로 돌아오며 "저장됨"이 1.5초 떠. Esc는 원래 값으로 취소하고, 입력창에 aria-label을 넣어 줘.',
    css: ac2Base('ac27') + `
.d-ac27 .pn{gap:6px}
.d-ac27 .fld{display:flex;flex-direction:column;gap:2px}
.d-ac27 .fld>label{font-size:11px;color:var(--muted);padding-left:1px}
.d-ac27 .val{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;height:34px;padding:0 9px;box-sizing:border-box;border:1.5px solid transparent;border-radius:9px;background:none;color:var(--text);font-size:14px;font-weight:700;text-align:left;cursor:text;transition:background .15s ease-out}
.d-ac27 .val:hover{background:var(--surface-2)}
.d-ac27 .val svg{color:var(--muted);flex:none;opacity:.7}
.d-ac27 .val .tx{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-ac27 .val.flash{animation:ac27-flash .9s ease-out}
.d-ac27 .inp{display:block;width:100%;height:34px;padding:0 9px;box-sizing:border-box;border:1.5px solid var(--accent);border-radius:9px;background:var(--surface);color:var(--text);font:inherit;font-size:14px;font-weight:700;outline:0;box-shadow:0 0 0 3px var(--accent-soft);animation:ac27-in .15s ease-out}
.d-ac27 .ft{margin-top:auto;display:flex;align-items:center;justify-content:space-between;gap:6px;height:22px;font-size:11.5px;color:var(--muted);white-space:nowrap}
.d-ac27 .ft kbd{font:inherit;font-size:11px;font-weight:700;color:var(--text);background:var(--surface-2);border:1px solid var(--line);border-radius:5px;padding:1px 5px;margin-right:2px;transition:background .15s,color .15s,border-color .15s}
.d-ac27 .ft kbd.hit{background:var(--accent);border-color:var(--accent);color:var(--accent-text)}
.d-ac27 .sv{display:inline-flex;align-items:center;gap:3px;color:var(--success);font-weight:700;opacity:0;transform:translateY(4px);transition:opacity .2s,transform .2s}
.d-ac27 .sv.on{opacity:1;transform:none}
@keyframes ac27-in{from{box-shadow:0 0 0 0 var(--accent-soft)}}
@keyframes ac27-flash{0%{background:var(--accent-soft)}100%{background:transparent}}
`,
    html: `<div class="pn">
  <div class="fld"><label>닉네임</label><button class="val" type="button" data-l="닉네임" aria-label="닉네임 수정"><span class="tx">숲속캠핑</span>${ac2Ic('pen', 14)}</button></div>
  <div class="fld"><label>한 줄 소개</label><button class="val" type="button" data-l="한 줄 소개" aria-label="한 줄 소개 수정"><span class="tx">주말마다 떠나요</span>${ac2Ic('pen', 14)}</button></div>
  <div class="ft"><span><kbd class="ke">Enter</kbd>저장 <kbd>Esc</kbd>취소</span><span class="sv" aria-live="polite">${ac2Ic('check', 13, 2.8)}저장됨</span></div>
</div>`,
    run(el, ctx) {
      const vals = [...el.querySelectorAll('.val')], sv = el.querySelector('.sv'), ke = el.querySelector('.ke');
      let cur = null, svk = 0;
      const finish = save => {
        if (!cur) return;
        const c = cur; cur = null;
        const nv = c.inp.value.trim(), changed = save && nv && nv !== c.tx.textContent;
        if (changed) c.tx.textContent = nv;
        c.inp.remove(); c.v.style.display = '';
        if (save) {
          c.v.classList.remove('flash'); void c.v.offsetWidth; c.v.classList.add('flash');
          const my = ++svk; sv.classList.add('on'); ctx.timeout(() => { if (my === svk) sv.classList.remove('on'); }, 1500);
        }
      };
      const edit = (v, focus) => {
        finish(true);
        const tx = v.querySelector('.tx'), inp = document.createElement('input');
        inp.className = 'inp'; inp.type = 'text'; inp.value = tx.textContent; inp.maxLength = 12; inp.setAttribute('aria-label', v.dataset.l);
        v.style.display = 'none'; v.parentNode.appendChild(inp); cur = { v, tx, inp };
        ctx.on(inp, 'keydown', e => {
          if (e.isComposing) return;
          if (e.key === 'Enter') finish(true);
          if (e.key === 'Escape') finish(false);
        });
        ctx.on(inp, 'blur', () => { if (cur && cur.inp === inp) finish(true); });
        if (focus) { inp.focus(); inp.select(); }
        return inp;
      };
      vals.forEach(v => ctx.on(v, 'click', () => edit(v, true)));
      let demo = null;
      ctx.timeout(() => { ac2Tap(ctx, el, vals[0], .3, .5); demo = edit(vals[0], false); }, 600);
      ['', '바', '바다', '바다캠', '바다캠핑'].forEach((s, i) => ctx.timeout(() => { if (cur && cur.inp === demo) demo.value = s; }, 1000 + i * 170));
      ctx.timeout(() => { if (cur && cur.inp === demo) ke.classList.add('hit'); }, 2500);
      ctx.timeout(() => { ke.classList.remove('hit'); if (cur && cur.inp === demo) finish(true); }, 2750);
    }
  }
]);
