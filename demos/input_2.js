/* input — 입력·선택 추가분 (in15~in29) */
const in2P = {
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  x: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
  chev: '<path d="M6 9l6 6 6-6"/>',
  minus: '<path d="M5.5 12h13"/>',
  plus: '<path d="M12 5.5v13M5.5 12h13"/>',
  eye: '<path d="M2.5 12s3.5-6.2 9.5-6.2 9.5 6.2 9.5 6.2-3.5 6.2-9.5 6.2S2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.7"/>',
  eyeOff: '<path d="M4 4l16 16"/><path d="M9.6 6.1A9.8 9.8 0 0 1 12 5.8c6 0 9.5 6.2 9.5 6.2a16 16 0 0 1-2.9 3.6M6.4 7.4A15.6 15.6 0 0 0 2.5 12s3.5 6.2 9.5 6.200a9.6 9.6 0 0 0 3.9-.8"/><path d="M10 10a2.7 2.7 0 0 0 3.9 3.9"/>',
  alert: '<circle cx="12" cy="12" r="8.8"/><path d="M12 7.6v5.2M12 16.2v.2"/>',
  ok: '<circle cx="12" cy="12" r="8.8"/><path d="M8 12.300l2.8 2.800L16 9.5"/>',
  upload: '<path d="M12 15.500V5M7.5 9.300L12 4.800l4.5 4.5"/><path d="M4.5 15.500v3a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-3"/>',
  file: '<path d="M7 3.500h6.500l4 4V20a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5z"/><path d="M13.5 3.500v4h4"/>',
  send: '<path d="M12 18.500V6M6.5 11.300L12 5.800l5.5 5.5"/>'
};
const in2Ic = (n, s = 16, w = 2) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${in2P[n]}</svg>`;
/* 공통: 흰 카드 · 제목줄 · 입력칸 · 탭 표시 */
const in2Base = id => `
.d-${id} .card{position:relative;width:calc(100% - 24px);max-width:280px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);padding:12px 14px;box-sizing:border-box}
.d-${id} .ttl{display:flex;justify-content:space-between;align-items:center;font-size:12.5px;font-weight:800;color:var(--text);margin-bottom:8px;gap:8px;white-space:nowrap}
.d-${id} .ttl small{font-size:11px;font-weight:700;color:var(--muted);white-space:nowrap}
.d-${id} button,.d-${id} input,.d-${id} textarea{font:inherit;-webkit-tap-highlight-color:transparent}
.d-${id} .lb{display:block;font-size:11px;font-weight:700;color:var(--muted);margin-bottom:4px}
.d-${id} .fld{display:block;width:100%;height:38px;border-radius:10px;border:1.5px solid var(--line);background:var(--surface);color:var(--text);font-size:13px;font-weight:600;padding:0 12px;box-sizing:border-box;outline:none;transition:border-color .2s}
.d-${id} .fld::placeholder{color:var(--muted);font-weight:500}
.d-${id} .fld:focus,.d-${id} .fld.act{border-color:var(--accent)}
.d-${id} .tap{position:absolute;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;background:var(--accent);pointer-events:none;z-index:9;opacity:0;animation:${id}-tap .55s ease-out forwards}
@keyframes ${id}-tap{0%{opacity:.4;transform:scale(.3)}100%{opacity:0;transform:scale(1.5)}}
`;
/* 사용자가 직접 만지기 시작하면 자동 시연을 멈춘다 */
const in2User = (ctx, el) => {
  const u = { v: false };
  ctx.on(el, 'pointerdown', () => { u.v = true; });
  ctx.on(el, 'keydown', () => { u.v = true; });
  return u;
};
const in2Tap = (ctx, el, t) => {
  const r = el.getBoundingClientRect(), q = t.getBoundingClientRect();
  const d = document.createElement('i'); d.className = 'tap';
  d.style.left = (q.left + q.width / 2 - r.left) + 'px'; d.style.top = (q.top + q.height / 2 - r.top) + 'px';
  el.appendChild(d); ctx.timeout(() => d.remove(), 600);
};
const in2Auto = (ctx, el, u, t, fn, ms) => ctx.timeout(() => { if (u.v) return; in2Tap(ctx, el, typeof t === 'function' ? t() : t); fn(); }, ms);
const in2Type = (ctx, u, inp, txt, start, gap, fn) => {
  const cs = [...txt];
  cs.forEach((c, i) => ctx.timeout(() => { if (u.v) return; inp.value += c; if (fn) fn(c); }, start + i * gap));
  return start + cs.length * gap;
};
const in2Ease = p => 1 - Math.pow(1 - Math.max(0, Math.min(1, p)), 3);
const in2Won = n => n.toLocaleString('ko-KR') + '원';

UIDEX.add('input', [
  /* ───────── in15 수량 스테퍼 ───────── */
  {
    id: 'in15', ko: '수량 스테퍼', en: 'Quantity stepper',
    desc: '−/+ 버튼으로 숫자를 하나씩 올리고 내려요. 한도에선 버튼이 잠겨요.',
    prompt: '「수량 스테퍼(Quantity stepper)」를 만들어 줘. − 와 + 버튼(각 28px) 사이에 숫자를 두고, 누를 때마다 숫자가 0.2초 ease-out으로 위아래로 밀리며 바뀌고 합계 금액도 함께 갱신돼. 최소 1·최대 5에 닿으면 해당 버튼을 disabled로 흐리게 하고, 현재 수량은 aria-live로 읽어 줘.',
    css: in2Base('in15') + `
.d-in15 .item{display:flex;align-items:center;gap:8px;padding:8px 0 10px;border-bottom:1px solid var(--line)}
.d-in15 .th{flex:none;width:34px;height:34px}
.d-in15 .nm{flex:1;min-width:0;font-size:12.5px;font-weight:700;color:var(--text);white-space:nowrap}
.d-in15 .nm small{display:block;font-size:11px;font-weight:500;color:var(--muted)}
.d-in15 .stp{flex:none;display:flex;align-items:center;height:30px;border:1.5px solid var(--line);border-radius:10px;overflow:hidden;background:var(--surface)}
.d-in15 .b{width:28px;height:30px;border:0;padding:0;background:transparent;color:var(--text);display:grid;place-items:center;cursor:pointer;transition:background .15s,opacity .2s,color .2s}
.d-in15 .b:active{background:var(--accent-soft)}
.d-in15 .b.hit{background:var(--accent-soft);color:var(--accent)}
.d-in15 .b:disabled{opacity:.3;cursor:not-allowed;background:var(--surface-2)}
.d-in15 .q{width:28px;height:30px;overflow:hidden;display:grid;place-items:center;border-left:1.5px solid var(--line);border-right:1.5px solid var(--line);font-size:13.5px;font-weight:800;color:var(--text);font-variant-numeric:tabular-nums}
.d-in15 .q b{display:block}
.d-in15 .q b.up{animation:in15-up .2s ease-out}
.d-in15 .q b.dn{animation:in15-dn .2s ease-out}
@keyframes in15-up{0%{transform:translateY(12px);opacity:0}100%{transform:none;opacity:1}}
@keyframes in15-dn{0%{transform:translateY(-12px);opacity:0}100%{transform:none;opacity:1}}
.d-in15 .sum{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:10px;font-size:11.5px;color:var(--muted);white-space:nowrap}
.d-in15 .sum .hint{transition:color .2s}
.d-in15 .sum .hint.lim{color:var(--warn);font-weight:700}
.d-in15 .sum b{font-size:14px;color:var(--text);font-variant-numeric:tabular-nums}
`,
    html: `<div class="card"><div class="ttl">수량 선택<small>1~5개</small></div>
  <div class="item"><span class="ui-thumb th"></span><span class="nm">캠핑 의자<small>39,000원</small></span>
    <div class="stp" role="group" aria-label="수량"><button class="b m" type="button" aria-label="수량 줄이기" disabled>${in2Ic('minus', 14, 2.6)}</button><span class="q" aria-live="polite"><b>1</b></span><button class="b p" type="button" aria-label="수량 늘리기">${in2Ic('plus', 14, 2.6)}</button></div></div>
  <div class="sum"><span class="hint">최소 1개</span><b class="tot">39,000원</b></div></div>`,
    run(el, ctx) {
      const u = in2User(ctx, el), m = el.querySelector('.m'), p = el.querySelector('.p'), qb = el.querySelector('.q b'), hint = el.querySelector('.hint'), tot = el.querySelector('.tot');
      let q = 1;
      const set = (n, btn) => {
        if (n < 1 || n > 5) return;
        const up = n > q; q = n;
        qb.textContent = q; qb.className = ''; void qb.offsetWidth; qb.className = up ? 'up' : 'dn';
        m.disabled = q === 1; p.disabled = q === 5;
        hint.textContent = q === 5 ? '최대 5개까지 담을 수 있어요' : q === 1 ? '최소 1개' : '합계';
        hint.classList.toggle('lim', q === 5);
        tot.textContent = in2Won(39000 * q);
        btn.classList.add('hit'); ctx.timeout(() => btn.classList.remove('hit'), 180);
      };
      ctx.on(m, 'click', () => set(q - 1, m));
      ctx.on(p, 'click', () => set(q + 1, p));
      [500, 850, 1200, 1550].forEach(t => in2Auto(ctx, el, u, p, () => set(q + 1, p), t));
      in2Auto(ctx, el, u, m, () => set(q - 1, m), 2900);
    }
  },

  /* ───────── in16 인증번호 입력 ───────── */
  {
    id: 'in16', ko: '인증번호 입력', en: 'OTP input',
    desc: '6칸에 한 글자씩, 숫자를 치면 다음 칸으로 알아서 넘어가요.',
    prompt: '「인증번호 입력(OTP input)」을 만들어 줘. 6칸이 각각 숫자 한 글자만 받고, 치는 즉시 0.15초 만에 파란 테두리가 다음 칸으로 옮겨 가. 백스페이스는 이전 칸으로 돌아가고 6자리 붙여넣기는 한 번에 채워. 다 채우면 초록 테두리와 "인증 완료"를 보여 주고 autocomplete="one-time-code"를 넣어 줘.',
    css: in2Base('in16') + `
.d-in16 .card{min-width:0}
.d-in16 .sub{font-size:11.5px;line-height:1.4;color:var(--muted);margin:-2px 0 10px}
.d-in16 .boxes{display:flex;gap:6px;justify-content:space-between}
.d-in16 .bx{flex:1;min-width:0;max-width:38px;height:44px;border-radius:10px;border:1.5px solid var(--line);background:var(--surface);color:var(--text);font-size:19px;font-weight:800;text-align:center;padding:0;outline:none;box-sizing:border-box;transition:border-color .15s,box-shadow .15s,background .2s,transform .15s;font-variant-numeric:tabular-nums}
.d-in16 .bx.fill{border-color:var(--muted);animation:in16-pop .18s ease-out}
.d-in16 .bx.act,.d-in16 .bx:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}
.d-in16 .boxes.ok .bx{border-color:var(--success);background:color-mix(in srgb,var(--success) 10%,var(--surface));box-shadow:none}
@keyframes in16-pop{0%{transform:scale(.88)}100%{transform:none}}
.d-in16 .msg{display:flex;align-items:center;gap:5px;height:18px;margin-top:10px;font-size:11.5px;font-weight:600;color:var(--muted);white-space:nowrap}
.d-in16 .msg.ok{color:var(--success);font-weight:700;animation:in16-in .25s ease-out}
@keyframes in16-in{0%{opacity:0;transform:translateY(4px)}100%{opacity:1;transform:none}}
`,
    html: `<div class="card"><div class="ttl">인증번호 입력<small class="tm">2:59</small></div>
  <div class="sub">문자로 받은 6자리를 입력해요</div>
  <div class="boxes" role="group" aria-label="인증번호 6자리">${[1, 2, 3, 4, 5, 6].map(n => `<input class="bx" type="text" inputmode="numeric" autocomplete="${n === 1 ? 'one-time-code' : 'off'}" aria-label="인증번호 ${n}번째 자리">`).join('')}</div>
  <div class="msg" aria-live="polite">한 칸씩 자동으로 넘어가요</div></div>`,
    run(el, ctx) {
      const u = in2User(ctx, el), wrap = el.querySelector('.boxes'), bx = [...el.querySelectorAll('.bx')], msg = el.querySelector('.msg'), tm = el.querySelector('.tm');
      const act = i => bx.forEach((b, k) => b.classList.toggle('act', k === i));
      const sync = () => {
        bx.forEach(b => b.classList.toggle('fill', !!b.value));
        const done = bx.every(b => b.value);
        wrap.classList.toggle('ok', done); msg.classList.toggle('ok', done);
        msg.innerHTML = done ? `${in2Ic('check', 13, 3)}인증이 완료됐어요` : '한 칸씩 자동으로 넘어가요';
        if (done) act(-1);
      };
      bx.forEach((b, i) => {
        ctx.on(b, 'focus', () => act(-1));
        ctx.on(b, 'input', () => { b.value = b.value.replace(/\D/g, '').slice(-1); if (b.value && i < 5) bx[i + 1].focus(); sync(); });
        ctx.on(b, 'keydown', e => { if (e.key === 'Backspace' && !b.value && i > 0) { e.preventDefault(); bx[i - 1].value = ''; bx[i - 1].focus(); sync(); } });
        ctx.on(b, 'paste', e => {
          const d = ((e.clipboardData && e.clipboardData.getData('text')) || '').replace(/\D/g, '').slice(0, 6);
          if (!d) return; e.preventDefault(); [...d].forEach((c, k) => { bx[k].value = c; }); sync();
        });
      });
      let s = 179; ctx.interval(() => { if (s > 0) s--; tm.textContent = Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }, 1000);
      ctx.timeout(() => { if (!u.v) act(0); }, 250);
      [...'482915'].forEach((c, i) => ctx.timeout(() => { if (u.v) { act(-1); return; } bx[i].value = c; act(i + 1); sync(); }, 500 + i * 230));
    }
  },

  /* ───────── in17 비밀번호 보기 ───────── */
  {
    id: 'in17', ko: '비밀번호 보기', en: 'Password reveal',
    desc: '눈 아이콘을 누르면 ●●●로 가려진 글자가 그대로 보여요.',
    prompt: '「비밀번호 보기(Password reveal)」 버튼을 만들어 줘. 입력칸 오른쪽 눈 아이콘을 누르면 ●●●가 실제 글자로 바뀌고 아이콘이 0.2초 만에 사선 그어진 눈으로 전환돼. 다시 누르면 가려져. 전환해도 입력값과 커서 위치는 유지하고, 버튼엔 aria-pressed와 "비밀번호 표시" aria-label을 넣어 줘.',
    css: in2Base('in17') + `
.d-in17 .ro{display:flex;align-items:center;color:var(--muted);background:var(--surface-2);border-color:transparent;margin-bottom:8px;white-space:nowrap;overflow:hidden}
.d-in17 .wrap{position:relative}
.d-in17 .wrap .fld{padding-right:42px;letter-spacing:.02em}
.d-in17 .wrap .fld[type="password"]{letter-spacing:.14em}
.d-in17 .eye{position:absolute;right:4px;top:4px;width:30px;height:30px;border:0;padding:0;border-radius:8px;background:transparent;color:var(--muted);display:grid;place-items:center;cursor:pointer;transition:background .2s,color .2s}
.d-in17 .eye[aria-pressed="true"]{background:var(--accent-soft);color:var(--accent)}
.d-in17 .eye svg{animation:in17-sw .2s ease-out}
@keyframes in17-sw{0%{opacity:0;transform:scale(.7)}100%{opacity:1;transform:none}}
.d-in17 .st{display:flex;align-items:center;gap:6px;margin-top:8px;font-size:11.5px;color:var(--muted);white-space:nowrap}
.d-in17 .st i{flex:none;width:6px;height:6px;border-radius:50%;background:var(--muted);transition:background .2s}
.d-in17 .st.on{color:var(--accent);font-weight:700}
.d-in17 .st.on i{background:var(--accent)}
`,
    html: `<div class="card"><div class="ttl">로그인</div>
  <div class="fld ro">camp@example.com</div>
  <div class="wrap"><input class="fld pw" type="password" placeholder="비밀번호" aria-label="비밀번호" autocomplete="off" spellcheck="false">
    <button class="eye" type="button" aria-pressed="false" aria-label="비밀번호 표시">${in2Ic('eye', 18)}</button></div>
  <div class="st" aria-live="polite"><i></i><span>가려진 상태예요</span></div></div>`,
    run(el, ctx) {
      const u = in2User(ctx, el), pw = el.querySelector('.pw'), eye = el.querySelector('.eye'), st = el.querySelector('.st');
      let show = false;
      const tog = () => {
        show = !show;
        const a = pw.selectionStart, b = pw.selectionEnd, foc = document.activeElement === pw;
        pw.type = show ? 'text' : 'password';
        if (foc) { try { pw.setSelectionRange(a, b); } catch (e) {} }
        eye.setAttribute('aria-pressed', show); eye.innerHTML = in2Ic(show ? 'eyeOff' : 'eye', 18);
        st.classList.toggle('on', show); st.querySelector('span').textContent = show ? '글자가 보이는 상태예요' : '가려진 상태예요';
      };
      ctx.on(eye, 'click', tog);
      ctx.timeout(() => { if (!u.v) pw.classList.add('act'); }, 250);
      in2Type(ctx, u, pw, 'jeju2026!', 400, 90);
      in2Auto(ctx, el, u, eye, tog, 1600);
      in2Auto(ctx, el, u, eye, tog, 3400);
      ctx.timeout(() => pw.classList.remove('act'), 3500);
    }
  },

  /* ───────── in18 비밀번호 강도 ───────── */
  {
    id: 'in18', ko: '비밀번호 강도', en: 'Password strength meter',
    desc: '입력할수록 막대가 약함→보통→강함으로 차고 조건이 체크돼요.',
    prompt: '「비밀번호 강도(Password strength meter)」를 만들어 줘. 입력할 때마다 3칸 막대가 약함(빨강)→보통(주황)→강함(초록)으로 0.25초 ease-out으로 채워지고, 아래 "8자 이상·숫자·특수문자" 조건이 충족되는 즉시 체크로 바뀌어. 색만으로 구분하지 않게 강도 글자를 함께 쓰고 aria-live로 알려 줘.',
    css: in2Base('in18') + `
.d-in18 .ttl small{transition:color .25s}
.d-in18 .bars{display:flex;gap:4px;margin:8px 0 9px}
.d-in18 .bars i{flex:1;height:5px;border-radius:3px;background:var(--line);overflow:hidden;position:relative}
.d-in18 .bars i::after{content:"";position:absolute;inset:0;border-radius:3px;background:var(--lv,var(--line));transform:scaleX(0);transform-origin:left;transition:transform .25s ease-out,background .25s}
.d-in18 .bars i.on::after{transform:none}
.d-in18 .rule{display:flex;align-items:center;gap:7px;height:20px;font-size:11.5px;color:var(--muted);white-space:nowrap;transition:color .2s}
.d-in18 .rule .ck{flex:none;width:14px;height:14px;border-radius:50%;border:1.5px solid var(--line);display:grid;place-items:center;color:var(--accent-text);box-sizing:border-box;transition:background .2s,border-color .2s,transform .2s cubic-bezier(.2,.8,.2,1)}
.d-in18 .rule .ck svg{opacity:0;transition:opacity .2s}
.d-in18 .rule.on{color:var(--text);font-weight:600}
.d-in18 .rule.on .ck{background:var(--success);border-color:var(--success);transform:scale(1.1)}
.d-in18 .rule.on .ck svg{opacity:1}
`,
    html: `<div class="card"><div class="ttl">새 비밀번호<small class="lv" aria-live="polite">입력 전</small></div>
  <input class="fld pw" type="text" placeholder="비밀번호를 입력하세요" aria-label="새 비밀번호" autocomplete="off" spellcheck="false">
  <div class="bars" aria-hidden="true"><i></i><i></i><i></i></div>
  ${['8자 이상', '숫자 포함', '특수문자 포함'].map(t => `<div class="rule"><span class="ck">${in2Ic('check', 9, 4)}</span>${t}</div>`).join('')}</div>`,
    run(el, ctx) {
      const u = in2User(ctx, el), pw = el.querySelector('.pw'), bars = [...el.querySelectorAll('.bars i')], rules = [...el.querySelectorAll('.rule')], lv = el.querySelector('.lv'), box = el.querySelector('.bars');
      const sync = () => {
        const v = pw.value, ok = [[...v].length >= 8, /\d/.test(v), /[^A-Za-z0-9가-힣\s]/.test(v)];
        const met = ok.filter(Boolean).length, n = v ? Math.max(1, met) : 0;
        rules.forEach((r, i) => r.classList.toggle('on', ok[i]));
        bars.forEach((b, i) => b.classList.toggle('on', i < n));
        const c = ['', 'var(--danger)', 'var(--warn)', 'var(--success)'][n];
        box.style.setProperty('--lv', c || 'var(--line)');
        lv.textContent = ['입력 전', '약함', '보통', '강함'][n]; lv.style.color = c;
      };
      ctx.on(pw, 'input', sync);
      ctx.timeout(() => { if (!u.v) pw.classList.add('act'); }, 250);
      const end = in2Type(ctx, u, pw, 'jeju2026!', 400, 140, sync);
      ctx.timeout(() => pw.classList.remove('act'), end + 600);
    }
  },

  /* ───────── in19 글자 수 카운터 ───────── */
  {
    id: 'in19', ko: '글자 수 카운터', en: 'Character counter',
    desc: "입력하는 동안 '42/100'처럼 남은 분량을 알려 주고 넘치면 빨개져요.",
    prompt: '「글자 수 카운터(Character counter)」를 만들어 줘. 입력창 오른쪽 아래에 "42/100"처럼 현재/최대 글자 수를 실시간으로 보여 주고, 80%를 넘으면 주황, 한도를 넘으면 0.2초 만에 숫자와 테두리가 빨갛게 바뀌며 "3자 초과"를 알려 줘. 카운터는 aria-live="polite"로 연결하고 초과 중엔 등록 버튼을 막아 줘.',
    css: in2Base('in19') + `
.d-in19 .ta{display:block;width:100%;height:70px;resize:none;border-radius:10px;border:1.5px solid var(--line);background:var(--surface);color:var(--text);font-size:12.5px;line-height:1.5;padding:8px 10px;box-sizing:border-box;outline:none;transition:border-color .2s,box-shadow .2s}
.d-in19 .ta::placeholder{color:var(--muted)}
.d-in19 .ta:focus,.d-in19 .ta.act{border-color:var(--accent)}
.d-in19 .card.warn .ta{border-color:var(--warn)}
.d-in19 .card.over .ta{border-color:var(--danger);box-shadow:0 0 0 3px color-mix(in srgb,var(--danger) 15%,transparent)}
.d-in19 .ft{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:6px;font-size:11.5px;color:var(--muted);white-space:nowrap}
.d-in19 .cnt{font-weight:700;font-variant-numeric:tabular-nums;transition:color .2s}
.d-in19 .cnt b{font-size:13px;color:var(--text);transition:color .2s}
.d-in19 .msg{transition:color .2s}
.d-in19 .card.warn .cnt b,.d-in19 .card.warn .msg{color:var(--warn)}
.d-in19 .card.over .cnt b,.d-in19 .card.over .msg{color:var(--danger)}
.d-in19 .card.warn .msg,.d-in19 .card.over .msg{font-weight:700}
.d-in19 .card.over .cnt{animation:in19-nud .3s ease-out}
@keyframes in19-nud{0%{transform:translateX(0)}30%{transform:translateX(-3px)}65%{transform:translateX(2px)}100%{transform:none}}
.d-in19 .go{margin-top:8px;width:100%;height:30px;border-radius:9px;border:0;font-size:12px;font-weight:700;background:var(--accent);color:var(--accent-text);cursor:pointer;transition:background .2s,color .2s}
.d-in19 .go:disabled{background:var(--surface-2);color:var(--muted);cursor:not-allowed}
`,
    html: `<div class="card"><div class="ttl">한 줄 리뷰<small>최대 40자</small></div>
  <textarea class="ta" placeholder="써 보신 느낌을 적어 주세요" aria-label="한 줄 리뷰" aria-describedby="in19-cnt"></textarea>
  <div class="ft"><span class="msg">40자까지 쓸 수 있어요</span><span class="cnt" id="in19-cnt" aria-live="polite"><b>0</b>/40</span></div>
  <button class="go" type="button" disabled>리뷰 등록</button></div>`,
    run(el, ctx) {
      const u = in2User(ctx, el), MAX = 40, card = el.querySelector('.card'), ta = el.querySelector('.ta'), b = el.querySelector('.cnt b'), msg = el.querySelector('.msg'), go = el.querySelector('.go');
      const sync = () => {
        const n = [...ta.value].length, over = n > MAX, warn = !over && n >= MAX * .8;
        b.textContent = n;
        card.classList.toggle('warn', warn); card.classList.toggle('over', over);
        msg.textContent = over ? `${n - MAX}자 초과했어요` : warn ? `${MAX - n}자 남았어요` : '40자까지 쓸 수 있어요';
        go.disabled = over || !n;
      };
      ctx.on(ta, 'input', sync);
      ctx.timeout(() => { if (!u.v) ta.classList.add('act'); }, 200);
      const end = in2Type(ctx, u, ta, '가볍고 튼튼해서 캠핑 갈 때마다 챙겨요. 색도 사진과 똑같고 배송도 빨랐어요!', 300, 55, sync);
      ctx.timeout(() => ta.classList.remove('act'), end + 600);
    }
  },

  /* ───────── in20 자동 높이 입력창 ───────── */
  {
    id: 'in20', ko: '자동 높이 입력창', en: 'Autosize textarea',
    desc: '글이 길어져 줄이 늘면 입력창 높이도 따라 늘어나요.',
    prompt: '「자동 높이 입력창(Autosize textarea)」을 만들어 줘. 처음엔 한 줄(28px)이고 줄이 늘 때마다 scrollHeight에 맞춰 높이가 0.15초 ease-out으로 따라 늘어나며, 최대 4줄을 넘으면 더 커지지 않고 안에서 스크롤돼. 지우면 다시 줄어들어. 크기 조절 손잡이는 없애고 Shift+Enter 줄바꿈을 지원해 줘.',
    css: in2Base('in20') + `
.d-in20 .card{height:178px;display:flex;flex-direction:column}
.d-in20 .ttl{flex:none;margin-bottom:6px}
.d-in20 .ttl small{color:var(--accent);background:var(--accent-soft);padding:2px 8px;border-radius:999px;font-variant-numeric:tabular-nums}
.d-in20 .log{flex:1;min-height:0;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;gap:5px;padding-bottom:6px}
.d-in20 .bb{flex:none;align-self:flex-start;max-width:85%;font-size:12px;line-height:1.4;color:var(--text);background:var(--surface-2);border-radius:12px 12px 12px 4px;padding:6px 10px;white-space:pre-wrap;word-break:break-all}
.d-in20 .bb.me{align-self:flex-end;background:var(--accent);color:var(--accent-text);border-radius:12px 12px 4px 12px;animation:in20-in .25s ease-out}
@keyframes in20-in{0%{opacity:0;transform:translateY(8px)}100%{opacity:1;transform:none}}
.d-in20 .box{flex:none;display:flex;align-items:flex-end;gap:6px;border:1.5px solid var(--line);border-radius:14px;padding:3px 3px 3px 4px;background:var(--surface);transition:border-color .2s}
.d-in20 .box.act,.d-in20 .box:focus-within{border-color:var(--accent)}
.d-in20 .ta{flex:1;min-width:0;display:block;height:28px;resize:none;border:0;background:transparent;color:var(--text);font-size:12.5px;line-height:18px;padding:5px 6px;box-sizing:border-box;outline:none;overflow-y:hidden;transition:height .15s ease-out}
.d-in20 .ta::placeholder{color:var(--muted)}
.d-in20 .snd{flex:none;width:28px;height:28px;border-radius:50%;border:0;padding:0;background:var(--accent);color:var(--accent-text);display:grid;place-items:center;cursor:pointer;transition:opacity .2s}
.d-in20 .snd:disabled{opacity:.35;cursor:default}
`,
    html: `<div class="card"><div class="ttl">1:1 문의<small class="ln" aria-live="polite">입력창 1줄</small></div>
  <div class="log"><div class="bb">무엇을 도와드릴까요?</div></div>
  <div class="box"><textarea class="ta" rows="1" placeholder="메시지 입력" aria-label="메시지"></textarea><button class="snd" type="button" aria-label="보내기" disabled>${in2Ic('send', 15, 2.6)}</button></div></div>`,
    run(el, ctx) {
      const u = in2User(ctx, el), ta = el.querySelector('.ta'), ln = el.querySelector('.ln'), box = el.querySelector('.box'), snd = el.querySelector('.snd'), log = el.querySelector('.log');
      const MAXH = 82;
      const fit = () => {
        const old = ta.offsetHeight;
        ta.style.transition = 'none'; ta.style.height = 'auto';
        const sh = ta.scrollHeight, h = Math.max(28, Math.min(sh, MAXH));
        ta.style.height = old + 'px'; void ta.offsetHeight; ta.style.transition = ''; ta.style.height = h + 'px';
        ta.style.overflowY = sh > MAXH ? 'auto' : 'hidden';
        const n = Math.round((h - 10) / 18);
        ln.textContent = sh > MAXH ? '최대 4줄 · 스크롤' : `입력창 ${n}줄`;
        snd.disabled = !ta.value.trim();
        if (sh > MAXH) ta.scrollTop = ta.scrollHeight;
      };
      const send = () => {
        if (!ta.value.trim()) return;
        const b = document.createElement('div'); b.className = 'bb me'; b.textContent = ta.value.trim();
        log.appendChild(b); ta.value = ''; fit();
      };
      ctx.on(ta, 'input', fit);
      ctx.on(ta, 'keydown', e => { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); send(); } });
      ctx.on(snd, 'click', send);
      ctx.timeout(() => { if (!u.v) box.classList.add('act'); }, 200);
      const end = in2Type(ctx, u, ta, '안녕하세요.\n주문한 캠핑 의자\n배송일을 주말로\n바꾸고 싶어요.', 350, 50, fit);
      ctx.timeout(() => box.classList.remove('act'), end + 800);
    }
  },

  /* ───────── in21 태그 입력 ───────── */
  {
    id: 'in21', ko: '태그 입력', en: 'Tag input', pair: 'in10',
    desc: '칩과 달리 직접 친 글자가 입력창 안에서 태그로 쌓여요.',
    prompt: '「태그 입력(Tag input)」을 만들어 줘. 글자를 치고 Enter나 쉼표를 누르면 그 글자가 입력창 안에서 26px 태그로 0.2초 scale .6→1로 생기고, X 버튼이나 빈 칸에서 백스페이스로 마지막 태그가 지워져. 칩과 헷갈리지 않게 미리 정해 둔 칩을 눌러 켜고 끄는 방식으로 만들지 마. 중복은 막고 삭제 버튼마다 aria-label을 넣어 줘.',
    css: in2Base('in21') + `
.d-in21 .box{display:flex;flex-wrap:wrap;align-items:center;gap:4px;min-height:66px;align-content:flex-start;border:1.5px solid var(--line);border-radius:10px;padding:5px;background:var(--surface);box-sizing:border-box;cursor:text;transition:border-color .2s}
.d-in21 .box.act,.d-in21 .box:focus-within{border-color:var(--accent)}
.d-in21 .tg{flex:none;display:inline-flex;align-items:center;gap:2px;height:26px;padding:0 3px 0 9px;border-radius:7px;background:var(--accent-soft);color:var(--accent);font-size:12px;font-weight:700;white-space:nowrap;animation:in21-pop .2s cubic-bezier(.2,.8,.2,1)}
.d-in21 .tg.out{transition:transform .18s ease-in,opacity .18s ease-in;transform:scale(.6);opacity:0}
@keyframes in21-pop{0%{transform:scale(.6);opacity:0}100%{transform:none;opacity:1}}
.d-in21 .tg button{width:18px;height:18px;border:0;padding:0;border-radius:5px;background:transparent;color:inherit;display:grid;place-items:center;cursor:pointer;opacity:.7}
.d-in21 .tg button:hover{opacity:1;background:color-mix(in srgb,var(--accent) 18%,transparent)}
.d-in21 .in{flex:1;min-width:64px;height:26px;border:0;outline:none;background:transparent;color:var(--text);font-size:12.5px;font-weight:600;padding:0 4px}
.d-in21 .in::placeholder{color:var(--muted);font-weight:500}
.d-in21 .hint{display:flex;align-items:center;gap:4px;margin-top:8px;font-size:11px;color:var(--muted);white-space:nowrap}
.d-in21 .hint kbd{font:inherit;font-size:11px;font-weight:700;min-width:18px;height:18px;padding:0 5px;border-radius:5px;border:1px solid var(--line);background:var(--surface-2);color:var(--text);display:inline-grid;place-items:center;box-sizing:border-box;transition:background .15s,color .15s,border-color .15s,transform .15s}
.d-in21 .hint kbd.hit{background:var(--accent);border-color:var(--accent);color:var(--accent-text);transform:translateY(1px)}
.d-in21 .hint span{margin-right:5px}
`,
    html: `<div class="card"><div class="ttl">관심 태그<small class="cnt">0/5</small></div>
  <div class="box"><input class="in" type="text" placeholder="태그 입력" aria-label="태그 입력" autocomplete="off"></div>
  <div class="hint"><kbd class="k-e">Enter</kbd><kbd class="k-c">,</kbd><span>추가</span><kbd class="k-b">←</kbd><span>삭제</span></div></div>`,
    run(el, ctx) {
      const u = in2User(ctx, el), box = el.querySelector('.box'), inp = el.querySelector('.in'), cnt = el.querySelector('.cnt');
      const key = c => { const k = el.querySelector('.k-' + c); k.classList.add('hit'); ctx.timeout(() => k.classList.remove('hit'), 260); };
      const tags = () => [...box.querySelectorAll('.tg:not(.out)')];
      const sync = () => { const n = tags().length; cnt.textContent = n + '/5'; inp.placeholder = n ? (n >= 5 ? '최대 5개' : '') : '태그 입력'; };
      const del = t => { if (!t) return; t.classList.add('out'); sync(); ctx.timeout(() => t.remove(), 190); };
      const add = () => {
        const v = inp.value.replace(/,/g, '').trim(); inp.value = '';
        if (!v || tags().length >= 5 || tags().some(t => t.dataset.v === v)) return;
        const t = document.createElement('span'); t.className = 'tg'; t.dataset.v = v;
        const s = document.createElement('span'); s.textContent = v.slice(0, 10);
        const x = document.createElement('button'); x.type = 'button'; x.setAttribute('aria-label', v + ' 태그 삭제'); x.innerHTML = in2Ic('x', 11, 2.8);
        ctx.on(x, 'click', e => { e.stopPropagation(); del(t); });
        t.append(s, x); box.insertBefore(t, inp); sync();
      };
      ctx.on(box, 'click', e => { if (e.target === box) inp.focus(); });
      ctx.on(inp, 'keydown', e => {
        if (e.isComposing) return;
        if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); key(e.key === ',' ? 'c' : 'e'); add(); }
        else if (e.key === 'Backspace' && !inp.value) { key('b'); del(tags().pop()); }
      });
      ctx.timeout(() => { if (!u.v) box.classList.add('act'); }, 200);
      const step = (txt, t0, k) => { const end = in2Type(ctx, u, inp, txt, t0, 110); ctx.timeout(() => { if (u.v) return; key(k); add(); }, end + 90); };
      step('캠핑', 350, 'e'); step('제주', 900, 'c'); step('감성숙소', 1400, 'e');
      ctx.timeout(() => { if (u.v) return; key('b'); del(tags().pop()); }, 3000);
      ctx.timeout(() => box.classList.remove('act'), 3400);
    }
  },

  /* ───────── in22 멀티 셀렉트 ───────── */
  {
    id: 'in22', ko: '멀티 셀렉트', en: 'Multi-select', pair: 'in04',
    desc: '드롭다운과 달리 목록이 닫히지 않고 여러 개를 체크해요.',
    prompt: '「멀티 셀렉트(Multi-select)」로 여행 지역 선택칸을 만들어 줘. 칸을 누르면 체크박스 달린 목록이 0.2초 만에 펼쳐지고, 항목을 눌러도 닫히지 않은 채 체크가 쌓이며 칸에는 고른 항목이 칩 2개와 "+1"로 표시돼. 드롭다운과 헷갈리지 않게 하나 고르자마자 닫지 마. aria-multiselectable="true"와 Esc 닫기를 넣어 줘.',
    css: in2Base('in22') + `
.d-in22 .card{height:178px}
.d-in22 .lbr{display:flex;justify-content:space-between;align-items:center}
.d-in22 .lbr .n{font-size:11px;font-weight:700;color:var(--accent);margin-bottom:4px;white-space:nowrap}
.d-in22 .wrap{position:relative}
.d-in22 .sel{width:100%;height:38px;border-radius:10px;border:1.5px solid var(--line);background:var(--surface);color:var(--text);display:flex;align-items:center;justify-content:space-between;gap:6px;padding:0 9px 0 6px;cursor:pointer;box-sizing:border-box;transition:border-color .2s}
.d-in22 .sel.on{border-color:var(--accent)}
.d-in22 .sel > svg{flex:none;color:var(--muted);transition:transform .2s cubic-bezier(.2,.8,.2,1)}
.d-in22 .sel.on > svg{transform:rotate(180deg);color:var(--accent)}
.d-in22 .vals{flex:1;min-width:0;display:flex;align-items:center;gap:4px;overflow:hidden}
.d-in22 .ph{font-size:12.5px;font-weight:500;color:var(--muted);padding-left:6px;white-space:nowrap}
.d-in22 .c{flex:none;height:24px;padding:0 8px;border-radius:6px;background:var(--accent-soft);color:var(--accent);font-size:11.5px;font-weight:700;display:inline-flex;align-items:center;white-space:nowrap;animation:in22-pop .2s cubic-bezier(.2,.8,.2,1)}
.d-in22 .more{flex:none;height:24px;padding:0 7px;border-radius:6px;background:var(--surface-2);color:var(--text);font-size:11.5px;font-weight:800;display:inline-flex;align-items:center;animation:in22-pop .2s cubic-bezier(.2,.8,.2,1)}
@keyframes in22-pop{0%{transform:scale(.6);opacity:0}100%{transform:none;opacity:1}}
.d-in22 .lst{position:absolute;left:0;right:0;top:42px;z-index:3;border:1px solid var(--line);border-radius:10px;background:var(--surface);box-shadow:0 8px 20px rgba(0,0,0,.16);padding:4px;transform-origin:top;transform:scaleY(.6);opacity:0;pointer-events:none;transition:transform .2s cubic-bezier(.2,.8,.2,1),opacity .2s}
.d-in22 .lst.on{transform:none;opacity:1;pointer-events:auto}
.d-in22 .op{display:flex;align-items:center;gap:8px;height:24px;padding:0 7px;border-radius:6px;font-size:12.5px;color:var(--text);cursor:pointer;white-space:nowrap;transition:background .15s}
.d-in22 .op:hover{background:var(--surface-2)}
.d-in22 .op.on{font-weight:700;color:var(--accent)}
.d-in22 .cb{flex:none;width:16px;height:16px;border-radius:5px;border:2px solid var(--line);background:var(--surface);display:grid;place-items:center;color:var(--accent-text);box-sizing:border-box;transition:background .2s,border-color .2s}
.d-in22 .cb svg{stroke-dasharray:24;stroke-dashoffset:24;transition:stroke-dashoffset .22s ease-out}
.d-in22 .op.on .cb{background:var(--accent);border-color:var(--accent)}
.d-in22 .op.on .cb svg{stroke-dashoffset:0}
`,
    html: `<div class="card"><div class="lbr"><span class="lb">여행 지역</span><span class="n" aria-live="polite">여러 개 선택</span></div>
  <div class="wrap"><button class="sel" type="button" aria-haspopup="listbox" aria-expanded="false"><span class="vals"><span class="ph">지역을 골라 주세요</span></span>${in2Ic('chev')}</button>
    <div class="lst" role="listbox" aria-multiselectable="true" aria-label="여행 지역">${['제주', '부산', '강릉', '여수'].map(t => `<div class="op" role="option" aria-selected="false" tabindex="-1"><span class="cb">${in2Ic('check', 10, 3.5)}</span>${t}</div>`).join('')}</div></div></div>`,
    run(el, ctx) {
      const u = in2User(ctx, el), names = ['제주', '부산', '강릉', '여수'], sel = el.querySelector('.sel'), lst = el.querySelector('.lst'), ops = [...lst.children], vals = el.querySelector('.vals'), nEl = el.querySelector('.n');
      const picked = [];
      const open = v => { lst.classList.toggle('on', v); sel.classList.toggle('on', v); sel.setAttribute('aria-expanded', v); };
      const render = () => {
        vals.innerHTML = picked.length ? picked.slice(0, 2).map(i => `<span class="c">${names[i]}</span>`).join('') + (picked.length > 2 ? `<span class="more">+${picked.length - 2}</span>` : '') : '<span class="ph">지역을 골라 주세요</span>';
        nEl.textContent = picked.length ? `${picked.length}곳 선택됨` : '여러 개 선택';
      };
      const tog = i => {
        const k = picked.indexOf(i); if (k < 0) picked.push(i); else picked.splice(k, 1);
        ops[i].classList.toggle('on', k < 0); ops[i].setAttribute('aria-selected', k < 0); render();
      };
      ctx.on(sel, 'click', () => open(!lst.classList.contains('on')));
      ops.forEach((o, i) => {
        ctx.on(o, 'click', () => tog(i));
        ctx.on(o, 'keydown', e => {
          if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); tog(i); }
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); ops[(i + (e.key === 'ArrowDown' ? 1 : 3)) % 4].focus(); }
        });
      });
      ctx.on(el, 'keydown', e => { if (e.key === 'Escape') open(false); });
      ctx.on(sel, 'keydown', e => { if (e.key === 'ArrowDown') { e.preventDefault(); open(true); ops[0].focus(); } });
      in2Auto(ctx, el, u, sel, () => open(true), 400);
      in2Auto(ctx, el, u, () => ops[0].querySelector('.cb'), () => tog(0), 850);
      in2Auto(ctx, el, u, () => ops[1].querySelector('.cb'), () => tog(1), 1250);
      in2Auto(ctx, el, u, () => ops[3].querySelector('.cb'), () => tog(3), 1650);
      in2Auto(ctx, el, u, sel, () => open(false), 3200);
    }
  },

  /* ───────── in23 서명 패드 ───────── */
  {
    id: 'in23', ko: '서명 패드', en: 'Signature pad',
    desc: '기준선 위에 손가락이나 마우스로 서명을 직접 그리고 지울 수 있어요.',
    prompt: '「서명 패드(Signature pad)」를 만들어 줘. 높이 92px 칸에 점선 기준선과 "여기에 서명" 안내를 두고, 포인터로 그으면 굵기 2.5px의 끝이 둥근 선이 따라 그려지며 안내가 사라져. 서명이 비어 있으면 완료 버튼은 disabled로 두고 지우기 버튼에는 aria-label을 달아 줘. 칸에는 touch-action:none을 줘서 그리는 동안 화면이 스크롤되지 않게 해 줘.',
    css: in2Base('in23') + `
.d-in23 .ttl small.ok{color:var(--success)}
.d-in23 .pad{position:relative;height:92px;border-radius:12px;border:1.5px solid var(--line);background:var(--surface-2);overflow:hidden;cursor:crosshair;touch-action:none;user-select:none;-webkit-user-select:none;transition:border-color .2s}
.d-in23 .pad.on{border-color:var(--accent)}
.d-in23 .pad svg{position:absolute;inset:0;width:100%;height:100%;display:block}
.d-in23 .pad path{fill:none;stroke:var(--text);stroke-width:2.5px;stroke-linecap:round;stroke-linejoin:round}
.d-in23 .base{position:absolute;left:12px;right:12px;bottom:22px;border-top:1.5px dashed var(--muted);opacity:.55;pointer-events:none}
.d-in23 .hint{position:absolute;left:0;right:0;bottom:30px;text-align:center;font-size:12px;font-weight:600;color:var(--muted);pointer-events:none;transition:opacity .2s ease-out}
.d-in23 .pad.has .hint{opacity:0}
.d-in23 .dot{position:absolute;left:0;top:0;width:24px;height:24px;margin:-12px 0 0 -12px;border-radius:50%;background:color-mix(in srgb,var(--accent) 30%,transparent);border:1.5px solid color-mix(in srgb,var(--accent) 60%,transparent);box-sizing:border-box;pointer-events:none;opacity:0}
.d-in23 .dot.show{opacity:1;animation:in23-dot .2s ease-out}
@keyframes in23-dot{0%{scale:.4;opacity:0}100%{scale:1;opacity:1}}
.d-in23 .btns{display:flex;gap:8px;margin-top:8px}
.d-in23 .btns button{height:30px;border-radius:9px;font-size:12px;font-weight:700;cursor:pointer;box-sizing:border-box;transition:opacity .2s,background .2s,color .2s}
.d-in23 .clr{flex:none;padding:0 12px;border:1.5px solid var(--line);background:var(--surface);color:var(--text)}
.d-in23 .done{flex:1;min-width:0;border:0;background:var(--accent);color:var(--accent-text);display:flex;align-items:center;justify-content:center;gap:4px;white-space:nowrap}
.d-in23 .btns button:disabled{opacity:.4;cursor:default}
.d-in23 .btns button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
`,
    html: `<div class="card"><div class="ttl">수령 확인 서명<small class="st" aria-live="polite">서명 전</small></div>
  <div class="pad" role="img" aria-label="서명 칸"><div class="base"></div><span class="hint">여기에 서명</span>
    <svg aria-hidden="true"><g class="ink"><path class="demo" style="visibility:hidden" d="M20 56C27 30 41 20 44 38C47 58 33 70 28 60C23 47 49 39 60 50C66 57 59 66 65 58C71 48 77 39 81 51C84 62 90 60 94 49C98 39 104 44 104 54C104 64 112 60 116 49C122 32 128 20 130 35C132 52 123 67 132 60C146 49 158 60 182 38"/></g></svg><i class="dot"></i></div>
  <div class="btns"><button class="clr" type="button" aria-label="서명 지우기" disabled>지우기</button><button class="done" type="button" disabled>서명 완료</button></div></div>`,
    run(el, ctx) {
      const u = in2User(ctx, el), pad = el.querySelector('.pad'), svg = pad.querySelector('svg'), ink = el.querySelector('.ink'), demo = el.querySelector('.demo'), dot = el.querySelector('.dot');
      const clr = el.querySelector('.clr'), done = el.querySelector('.done'), st = el.querySelector('.st');
      const ox = Math.max(0, (svg.clientWidth - 202) / 2), len = demo.getTotalLength();
      let cur = null, d = '', sent = false;
      ink.setAttribute('transform', `translate(${ox},2)`);
      demo.style.strokeDasharray = len; demo.style.strokeDashoffset = len;
      const setHas = h => {
        pad.classList.toggle('has', h); clr.disabled = !h; done.disabled = !h || sent;
        st.textContent = sent ? '제출 완료' : h ? '서명됨' : '서명 전'; st.classList.toggle('ok', sent);
        done.innerHTML = sent ? in2Ic('check', 13, 2.8) + '완료됨' : '서명 완료';
      };
      const pos = e => { const r = svg.getBoundingClientRect(); return (e.clientX - r.left).toFixed(1) + ' ' + (e.clientY - r.top).toFixed(1); };
      ctx.on(pad, 'pointerdown', e => {
        if (sent) return;
        e.preventDefault(); try { pad.setPointerCapture(e.pointerId); } catch (err) {}
        dot.classList.remove('show'); pad.classList.add('on');
        cur = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        d = 'M' + pos(e) + 'L' + pos(e); cur.setAttribute('d', d); svg.appendChild(cur); setHas(true);
      });
      ctx.on(pad, 'pointermove', e => { if (!cur) return; d += 'L' + pos(e); cur.setAttribute('d', d); });
      const end = () => { cur = null; pad.classList.remove('on'); };
      ctx.on(pad, 'pointerup', end); ctx.on(pad, 'pointercancel', end);
      ctx.on(clr, 'click', () => {
        svg.querySelectorAll('path:not(.demo)').forEach(p => p.remove());
        demo.style.visibility = 'hidden'; dot.classList.remove('show'); sent = false; setHas(false);
      });
      ctx.on(done, 'click', () => { sent = true; setHas(true); });
      /* 자동 시연: 터치 포인트가 필기체 곡선을 따라가며 서명을 그린다 */
      let on = false;
      ctx.loop(t => {
        if (u.v) { dot.classList.remove('show'); pad.classList.remove('on'); return false; }
        if (t < 350) return;
        if (!on) { on = true; demo.style.visibility = ''; dot.classList.add('show'); pad.classList.add('on'); setHas(true); }
        const p = Math.min(1, (t - 350) / 1500), q = demo.getPointAtLength(len * p);
        demo.style.strokeDashoffset = len * (1 - p);
        dot.style.transform = `translate(${q.x + ox}px,${q.y + 2}px)`;
        if (p >= 1) { demo.style.strokeDasharray = 'none'; dot.classList.remove('show'); pad.classList.remove('on'); return false; }
      });
    }
  },

  /* ───────── in24 컬러 피커 ───────── */
  {
    id: 'in24', ko: '컬러 피커', en: 'Color picker',
    desc: '색상 영역과 색조 바를 끌어 색을 고르면 HEX 값이 바로 바뀌어요.',
    prompt: '「컬러 피커(Color picker)」를 만들어 줘. 채도·명도 사각 영역과 그 아래 12px 무지개 색조 바를 두고, 14px 손잡이를 끄는 동안 미리보기 견본과 HEX 값(#2F6BFF 형식)이 지연 없이 바뀌어. 손잡이는 흰 테두리 2px와 그림자로 어떤 색 위에서도 보이게 하고, 두 영역 모두 role="slider"와 방향키(색조 5°, 채도·명도 5%)로 조절되게 해 줘.',
    css: in2Base('in24') + `
.d-in24 .card{padding:12px}
.d-in24 .sv{position:relative;height:82px;border-radius:10px;cursor:crosshair;touch-action:none;outline:none;background-image:linear-gradient(to top,#000,rgba(0,0,0,0)),linear-gradient(to right,#fff,rgba(255,255,255,0))}
.d-in24 .kn{position:absolute;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.35),0 1px 4px rgba(0,0,0,.4);box-sizing:border-box;pointer-events:none}
.d-in24 .auto::after{content:"";position:absolute;inset:-10px;border-radius:50%;background:rgba(255,255,255,.4);border:1.5px solid rgba(255,255,255,.85);box-shadow:0 0 0 1px rgba(0,0,0,.18);animation:in24-tp .2s ease-out}
@keyframes in24-tp{0%{transform:scale(.4);opacity:0}100%{transform:none;opacity:1}}
.d-in24 .hue{position:relative;height:12px;margin:10px 7px 0;border-radius:6px;cursor:pointer;touch-action:none;outline:none;background:linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)}
.d-in24 .hue::before{content:"";position:absolute;inset:-8px -7px}
.d-in24 .sv:focus-visible{box-shadow:0 0 0 2px var(--surface),0 0 0 4px var(--accent)}
.d-in24 .hue:focus-visible{box-shadow:0 0 0 2px var(--surface),0 0 0 4px var(--accent)}
.d-in24 .hue .kn{top:50%}
.d-in24 .out{display:flex;align-items:center;gap:9px;margin-top:11px}
.d-in24 .sw{flex:none;width:32px;height:32px;border-radius:9px;border:1px solid var(--line);box-sizing:border-box}
.d-in24 .hx{flex:1;min-width:0}
.d-in24 .hx small{display:block;font-size:11px;line-height:13px;font-weight:700;color:var(--muted)}
.d-in24 .hx b{display:block;font-size:14px;line-height:18px;color:var(--text);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.02em}
.d-in24 .pv{flex:none;height:30px;padding:0 12px;border-radius:9px;font-size:12px;font-weight:700;display:grid;place-items:center;white-space:nowrap}
`,
    html: `<div class="card">
  <div class="sv" role="slider" tabindex="0" aria-label="채도와 명도" aria-valuemin="0" aria-valuemax="100"><i class="kn k1"></i></div>
  <div class="hue" role="slider" tabindex="0" aria-label="색조" aria-valuemin="0" aria-valuemax="360"><i class="kn k2"></i></div>
  <div class="out"><span class="sw"></span><span class="hx"><small>HEX</small><b aria-live="polite"></b></span><span class="pv">버튼 미리보기</span></div></div>`,
    run(el, ctx) {
      const sv = el.querySelector('.sv'), hue = el.querySelector('.hue'), k1 = el.querySelector('.k1'), k2 = el.querySelector('.k2'), sw = el.querySelector('.sw'), hx = el.querySelector('.hx b'), pv = el.querySelector('.pv');
      let h = 222, s = .82, v = 1, drag = '', user = false;
      const rgb = (H, S, V) => [5, 3, 1].map(n => { const k = (n + H / 60) % 6; return Math.round(255 * (V - V * S * Math.max(0, Math.min(k, 4 - k, 1)))); });
      const hex = c => '#' + c.map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
      const render = () => {
        const c = rgb(h % 360, s, v), code = hex(c);
        sv.style.backgroundColor = hex(rgb(h % 360, 1, 1));
        k1.style.left = (s * 100) + '%'; k1.style.top = ((1 - v) * 100) + '%'; k1.style.background = code;
        k2.style.left = (h / 360 * 100) + '%'; k2.style.background = hex(rgb(h % 360, 1, 1));
        sw.style.background = code; hx.textContent = code;
        pv.style.background = code; pv.style.color = (c[0] * .299 + c[1] * .587 + c[2] * .114) > 150 ? '#111' : '#fff';
        hue.setAttribute('aria-valuenow', Math.round(h)); hue.setAttribute('aria-valuetext', Math.round(h) + '도');
        sv.setAttribute('aria-valuenow', Math.round(s * 100)); sv.setAttribute('aria-valuetext', `채도 ${Math.round(s * 100)}%, 명도 ${Math.round(v * 100)}%`);
      };
      const cl = x => Math.max(0, Math.min(1, x));
      const move = e => {
        if (drag === 'sv') { const r = sv.getBoundingClientRect(); s = cl((e.clientX - r.left) / r.width); v = 1 - cl((e.clientY - r.top) / r.height); }
        else if (drag === 'hue') { const r = hue.getBoundingClientRect(); h = cl((e.clientX - r.left) / r.width) * 360; }
        else return;
        render();
      };
      const down = (x, name) => ctx.on(x, 'pointerdown', e => { user = true; drag = name; k1.classList.remove('auto'); k2.classList.remove('auto'); try { x.setPointerCapture(e.pointerId); } catch (err) {} e.preventDefault(); move(e); });
      down(sv, 'sv'); down(hue, 'hue');
      ctx.on(el, 'pointermove', move);
      ctx.on(el, 'pointerup', () => { drag = ''; }); ctx.on(el, 'pointercancel', () => { drag = ''; });
      ctx.on(hue, 'keydown', e => { const d = { ArrowRight: 5, ArrowUp: 5, ArrowLeft: -5, ArrowDown: -5 }[e.key]; if (d) { e.preventDefault(); user = true; h = Math.max(0, Math.min(360, h + d)); render(); } });
      ctx.on(sv, 'keydown', e => { const d = { ArrowRight: [.05, 0], ArrowLeft: [-.05, 0], ArrowUp: [0, .05], ArrowDown: [0, -.05] }[e.key]; if (d) { e.preventDefault(); user = true; k1.classList.remove('auto'); k2.classList.remove('auto'); s = cl(Math.round((s + d[0]) * 100) / 100); v = cl(Math.round((v + d[1]) * 100) / 100); render(); } });
      render();
      /* 자동 시연: 터치 포인트가 색상 영역 → 색조 바를 차례로 끈다 */
      let ph = 0;
      ctx.loop(t => {
        if (user) return false;
        if (t >= 350 && t < 1150) { if (ph !== 1) { ph = 1; k1.classList.add('auto'); } const p = in2Ease((t - 350) / 750); s = .82 - .3 * p; v = 1 - .22 * p; render(); }
        else if (t >= 1150 && t < 1300) { if (ph !== 2) { ph = 2; k1.classList.remove('auto'); } }
        else if (t >= 1300 && t < 2100) { if (ph !== 3) { ph = 3; k2.classList.add('auto'); } h = 222 + 112 * in2Ease((t - 1300) / 750); render(); }
        else if (t >= 2100) { k2.classList.remove('auto'); return false; }
      });
    }
  },

  /* ───────── in25 시간 선택 ───────── */
  {
    id: 'in25', ko: '시간 선택', en: 'Time picker',
    desc: '시계판에서 시와 분을 차례로 누르고 오전·오후를 골라요.',
    prompt: '「시간 선택(Time picker)」을 시계판으로 만들어 줘. 124px 원판의 숫자를 누르면 시곗바늘이 0.3초 cubic-bezier(.2,.8,.2,1)로 그 숫자까지 돌고, 시를 고르면 자동으로 5분 단위 분 판으로 넘어가. 옆의 "10:30" 표시에서 시·분을 다시 고르고 오전/오후를 전환할 수 있게 하고, 숫자는 button으로 만들어 키보드로도 고르게 해 줘.',
    css: in2Base('in25') + `
.d-in25 .card{display:flex;align-items:center;gap:8px;padding:12px 10px 12px 12px}
.d-in25 .left{flex:1;min-width:0}
.d-in25 .cap{font-size:11px;font-weight:700;color:var(--muted);white-space:nowrap}
.d-in25 .disp{display:flex;align-items:baseline;margin:3px 0 2px -4px;color:var(--muted);font-size:22px;font-weight:800;font-variant-numeric:tabular-nums}
.d-in25 .disp button{border:0;background:transparent;padding:1px 4px;border-radius:7px;color:var(--muted);font-size:22px;font-weight:800;line-height:1.2;cursor:pointer;transition:background .2s,color .2s}
.d-in25 .disp button.on{background:var(--accent-soft);color:var(--accent)}
.d-in25 .mode{font-size:11px;color:var(--accent);font-weight:700;height:15px;white-space:nowrap}
.d-in25 .ap{display:flex;margin-top:8px;border:1.5px solid var(--line);border-radius:9px;overflow:hidden;width:68px}
.d-in25 .ap button{flex:1;height:26px;border:0;padding:0;background:transparent;color:var(--muted);font-size:11.5px;font-weight:700;cursor:pointer;transition:background .2s,color .2s}
.d-in25 .ap button.on{background:var(--accent);color:var(--accent-text)}
.d-in25 .dial{flex:none;position:relative;width:124px;height:124px;border-radius:50%;background:var(--surface-2)}
.d-in25 .hand{position:absolute;left:61px;top:15px;width:2px;height:47px;background:var(--accent);transform-origin:50% 100%;transition:transform .3s cubic-bezier(.2,.8,.2,1)}
.d-in25 .hand::before{content:"";position:absolute;left:-12px;top:-13px;width:26px;height:26px;border-radius:50%;background:var(--accent)}
.d-in25 .hand::after{content:"";position:absolute;left:-2.5px;bottom:-3.5px;width:7px;height:7px;border-radius:50%;background:var(--accent)}
.d-in25 .n{position:absolute;width:24px;height:24px;margin:-12px 0 0 -12px;border:0;padding:0;border-radius:50%;background:transparent;color:var(--text);font-size:11.5px;font-weight:600;cursor:pointer;z-index:1;font-variant-numeric:tabular-nums;transition:color .2s}
.d-in25 .n.on{color:var(--accent-text);font-weight:800}
.d-in25 .dial.sw .n{animation:in25-sw .28s ease-out}
@keyframes in25-sw{0%{opacity:0;transform:scale(.7)}100%{opacity:1;transform:none}}
`,
    html: `<div class="card"><div class="left"><div class="cap">픽업 시간</div>
    <div class="disp" aria-live="polite"><button class="dh on" type="button" aria-label="시 고르기">10</button>:<button class="dm" type="button" aria-label="분 고르기">00</button></div>
    <div class="mode">시를 골라 주세요</div>
    <div class="ap" role="group" aria-label="오전 오후"><button class="am on" type="button" aria-pressed="true">오전</button><button class="pm" type="button" aria-pressed="false">오후</button></div></div>
  <div class="dial"><div class="hand"></div>${Array.from({ length: 12 }, (_, i) => { const a = i * 30 * Math.PI / 180; return `<button class="n" type="button" style="left:${(62 + 47 * Math.sin(a)).toFixed(1)}px;top:${(62 - 47 * Math.cos(a)).toFixed(1)}px"></button>`; }).join('')}</div></div>`,
    run(el, ctx) {
      const u = in2User(ctx, el), dial = el.querySelector('.dial'), hand = el.querySelector('.hand'), ns = [...el.querySelectorAll('.n')], dh = el.querySelector('.dh'), dm = el.querySelector('.dm'), mode = el.querySelector('.mode'), am = el.querySelector('.am'), pm = el.querySelector('.pm');
      let H = 10, M = 0, isPm = false, md = 'h', ang = 300;
      const render = () => {
        const idx = md === 'h' ? H % 12 : M / 5;
        ns.forEach((n, i) => {
          n.textContent = md === 'h' ? (i || 12) : String(i * 5).padStart(2, '0');
          n.setAttribute('aria-label', md === 'h' ? `${i || 12}시` : `${i * 5}분`);
          n.classList.toggle('on', i === idx);
        });
        const d = ((idx * 30 - ang) % 360 + 540) % 360 - 180; ang += d;
        hand.style.transform = `rotate(${ang}deg)`;
        dh.textContent = H; dm.textContent = String(M).padStart(2, '0');
        dh.classList.toggle('on', md === 'h'); dm.classList.toggle('on', md === 'm');
        mode.textContent = md === 'h' ? '시를 골라 주세요' : '분을 골라 주세요';
        am.classList.toggle('on', !isPm); pm.classList.toggle('on', isPm);
        am.setAttribute('aria-pressed', !isPm); pm.setAttribute('aria-pressed', isPm);
      };
      const sw = m => { if (md === m) return; md = m; dial.classList.remove('sw'); void dial.offsetWidth; dial.classList.add('sw'); render(); };
      const pick = i => { if (md === 'h') { H = i || 12; render(); ctx.timeout(() => sw('m'), 380); } else { M = i * 5; render(); } };
      ns.forEach((n, i) => ctx.on(n, 'click', () => pick(i)));
      ctx.on(dh, 'click', () => sw('h')); ctx.on(dm, 'click', () => sw('m'));
      ctx.on(am, 'click', () => { isPm = false; render(); }); ctx.on(pm, 'click', () => { isPm = true; render(); });
      render();
      in2Auto(ctx, el, u, ns[3], () => pick(3), 500);
      in2Auto(ctx, el, u, ns[6], () => { if (md === 'm') pick(6); }, 1350);
      in2Auto(ctx, el, u, pm, () => { isPm = true; render(); }, 1900);
    }
  },

  /* ───────── in26 드롭존 ───────── */
  {
    id: 'in26', ko: '드롭존', en: 'Dropzone',
    desc: '점선 영역에 파일을 끌어다 놓으면 강조됐다가 목록에 추가돼요.',
    prompt: '「드롭존(Dropzone)」 업로드 영역을 만들어 줘. 점선 테두리 상자 위로 파일을 끌어 올리면 0.2초 만에 테두리가 파란 실선, 배경이 옅은 파랑으로 바뀌며 문구가 "여기에 놓으세요"로 바뀌고, 놓으면 아래 목록에 파일 이름과 진행 막대가 추가돼. 끌기 어려운 사용자를 위해 눌러서 파일을 고를 수도 있게 하고 키보드 포커스를 지원해 줘.',
    css: in2Base('in26') + `
.d-in26 .zone{height:76px;border-radius:12px;border:1.5px dashed var(--muted);background:var(--surface);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;color:var(--muted);cursor:pointer;outline:none;box-sizing:border-box;transition:border-color .2s,background .2s,color .2s,transform .2s cubic-bezier(.2,.8,.2,1)}
.d-in26 .zone:focus-visible{border-color:var(--accent)}
.d-in26 .zone b{font-size:12.500px;color:var(--text);white-space:nowrap;transition:color .2s}
.d-in26 .zone small{font-size:11px;white-space:nowrap}
.d-in26 .zone svg{transition:transform .2s cubic-bezier(.2,.8,.2,1)}
.d-in26 .zone.over{border-style:solid;border-color:var(--accent);background:var(--accent-soft);color:var(--accent);transform:scale(1.02)}
.d-in26 .zone.over b{color:var(--accent)}
.d-in26 .zone.over svg{transform:translateY(-3px)}
.d-in26 .list{height:62px;margin-top:8px;overflow:hidden}
.d-in26 .row{position:relative;display:flex;align-items:center;gap:7px;height:28px;margin-bottom:5px;padding:0 9px;border-radius:8px;background:var(--surface-2);font-size:11.5px;color:var(--text);overflow:hidden}
.d-in26 .row.new{animation:in26-in .25s ease-out}
@keyframes in26-in{0%{opacity:0;transform:translateY(-8px)}100%{opacity:1;transform:none}}
.d-in26 .row > svg{flex:none;color:var(--muted)}
.d-in26 .row .nm{flex:1;min-width:0;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.d-in26 .row .stt{flex:none;font-size:11px;font-weight:700;color:var(--muted);display:flex;align-items:center;font-variant-numeric:tabular-nums}
.d-in26 .row.done .stt{color:var(--success)}
.d-in26 .row .pg{position:absolute;left:0;bottom:0;height:2.5px;width:0;background:var(--accent);transition:width .7s linear,opacity .3s}
.d-in26 .row.done .pg{opacity:0}
.d-in26 .gh{position:absolute;left:0;top:0;z-index:5;display:flex;align-items:center;gap:5px;height:28px;padding:0 10px 0 8px;border-radius:8px;background:var(--surface);border:1px solid var(--line);box-shadow:0 8px 18px rgba(0,0,0,.22);font-size:11.5px;font-weight:700;color:var(--text);white-space:nowrap;pointer-events:none;opacity:0;transition:transform .8s cubic-bezier(.3,.7,.2,1),opacity .2s}
.d-in26 .gh svg{color:var(--accent)}
.d-in26 .gh::after{content:"";position:absolute;left:-8px;bottom:-12px;width:26px;height:26px;border-radius:50%;background:color-mix(in srgb,var(--accent) 28%,transparent);border:1.5px solid color-mix(in srgb,var(--accent) 55%,transparent)}
`,
    html: `<div class="card">
  <div class="zone" role="button" tabindex="0" aria-label="파일 올리기. 끌어다 놓거나 눌러서 선택">${in2Ic('upload', 20)}<b>파일을 끌어다 놓으세요</b><small>또는 눌러서 선택 · 최대 10MB</small></div>
  <div class="list" aria-live="polite"><div class="row done">${in2Ic('file', 14)}<span class="nm">예약확인서.pdf</span><span class="stt">${in2Ic('check', 13, 3)}</span></div></div>
  <div class="gh" aria-hidden="true">${in2Ic('file', 14)}견적서.pdf</div></div>`,
    run(el, ctx) {
      const u = in2User(ctx, el), card = el.querySelector('.card'), zone = el.querySelector('.zone'), list = el.querySelector('.list'), gh = el.querySelector('.gh'), zb = zone.querySelector('b');
      let n = 0;
      const over = v => { zone.classList.toggle('over', v); zb.textContent = v ? '여기에 놓으세요' : '파일을 끌어다 놓으세요'; };
      const add = name => {
        while (list.children.length >= 2) list.firstElementChild.remove();
        const r = document.createElement('div'); r.className = 'row new';
        r.innerHTML = `${in2Ic('file', 14)}<span class="nm"></span><span class="stt">올리는 중</span><i class="pg"></i>`;
        r.querySelector('.nm').textContent = name;
        list.appendChild(r);
        ctx.timeout(() => { r.querySelector('.pg').style.width = '100%'; }, 30);
        ctx.timeout(() => { r.classList.add('done'); r.querySelector('.stt').innerHTML = in2Ic('check', 13, 3); }, 780);
      };
      const sample = () => add(['영수증.png', '여권사본.jpg', '일정표.xlsx'][n++ % 3]);
      ctx.on(zone, 'dragenter', e => { e.preventDefault(); over(true); });
      ctx.on(zone, 'dragover', e => { e.preventDefault(); over(true); });
      ctx.on(zone, 'dragleave', () => over(false));
      ctx.on(zone, 'drop', e => { e.preventDefault(); over(false); const f = e.dataTransfer && e.dataTransfer.files; if (f && f.length) add(f[0].name); else sample(); });
      ctx.on(zone, 'click', sample);
      ctx.on(zone, 'keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sample(); } });
      /* 자동 시연: 터치 포인트가 파일을 집어 점선 영역으로 끌어다 놓는다 */
      const W = card.offsetWidth, zx = W / 2 - 44, zy = 36;
      gh.style.transition = 'none'; gh.style.transform = `translate(${W - 70}px,150px) rotate(-5deg)`;
      ctx.timeout(() => { if (u.v) return; gh.style.transition = ''; gh.style.opacity = '1'; gh.style.transform = `translate(${zx}px,${zy}px) rotate(-5deg)`; }, 380);
      ctx.timeout(() => { if (!u.v) over(true); }, 800);
      ctx.timeout(() => {
        gh.style.opacity = '0';
        if (u.v) return;
        gh.style.transform = `translate(${zx}px,${zy + 6}px) rotate(0deg) scale(.85)`;
        over(false); add('견적서.pdf');
      }, 1350);
    }
  },

  /* ───────── in27 인라인 검증 ───────── */
  {
    id: 'in27', ko: '인라인 검증', en: 'Inline validation',
    desc: '입력하는 도중에 필드 바로 아래에서 오류·통과를 알려 줘요.',
    prompt: '「인라인 검증(Inline validation)」 이메일 입력칸을 만들어 줘. 글자를 칠 때마다 형식을 검사해 필드 바로 아래에 오류(빨강·느낌표)나 통과(초록·체크) 메시지를 0.2초 페이드로 바꿔 보여 주고 테두리 색도 맞춰. 제출 전에 미리 알려 주는 게 핵심이니 팝업은 쓰지 말고, aria-invalid와 aria-describedby로 메시지를 연결해 줘.',
    css: in2Base('in27') + `
.d-in27 .wrap{position:relative}
.d-in27 .wrap .fld{padding-right:36px}
.d-in27 .ic{position:absolute;right:10px;top:10px;width:18px;height:18px;display:grid;place-items:center;pointer-events:none}
.d-in27 .ic svg{animation:in27-pop .2s cubic-bezier(.2,.8,.2,1)}
@keyframes in27-pop{0%{transform:scale(.5);opacity:0}100%{transform:none;opacity:1}}
.d-in27 .card.bad .fld{border-color:var(--danger)}
.d-in27 .card.good .fld{border-color:var(--success)}
.d-in27 .card.bad .ic,.d-in27 .card.bad .msg{color:var(--danger)}
.d-in27 .card.good .ic,.d-in27 .card.good .msg{color:var(--success)}
.d-in27 .msg{display:flex;align-items:center;height:18px;margin-top:5px;font-size:11.5px;font-weight:600;color:var(--muted);white-space:nowrap}
.d-in27 .msg span{animation:in27-in .2s ease-out}
@keyframes in27-in{0%{opacity:0;transform:translateY(-3px)}100%{opacity:1;transform:none}}
.d-in27 .go{margin-top:9px;width:100%;height:32px;border-radius:9px;border:0;font-size:12.5px;font-weight:700;background:var(--accent);color:var(--accent-text);cursor:pointer;transition:background .2s,color .2s}
.d-in27 .go:disabled{background:var(--surface-2);color:var(--muted);cursor:not-allowed}
`,
    html: `<div class="card"><div class="ttl">회원가입<small>1/3</small></div>
  <label class="lb" for="in27-em">이메일</label>
  <div class="wrap"><input class="fld em" id="in27-em" type="text" inputmode="email" placeholder="name@example.com" autocomplete="off" spellcheck="false" aria-describedby="in27-msg"><span class="ic" aria-hidden="true"></span></div>
  <div class="msg" id="in27-msg" role="status" aria-live="polite"><span>입력하는 동안 바로 확인해 드려요</span></div>
  <button class="go" type="button" disabled>다음</button></div>`,
    run(el, ctx) {
      const u = in2User(ctx, el), card = el.querySelector('.card'), em = el.querySelector('.em'), ic = el.querySelector('.ic'), msg = el.querySelector('.msg'), go = el.querySelector('.go');
      let last = '';
      const sync = () => {
        const v = em.value.trim();
        let st = '', t = '입력하는 동안 바로 확인해 드려요';
        if (v) {
          if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { st = 'good'; t = '사용할 수 있는 이메일 형식이에요'; }
          else { st = 'bad'; t = !v.includes('@') ? '@를 포함해 주세요' : /@.+\./.test(v) ? '주소 끝을 확인해 주세요' : '도메인까지 입력해 주세요 (예: .com)'; }
        }
        if (st + t === last) return; last = st + t;
        if (!card.classList.contains(st || 'x') || !st) ic.innerHTML = st ? in2Ic(st === 'good' ? 'ok' : 'alert', 18) : '';
        card.classList.toggle('bad', st === 'bad'); card.classList.toggle('good', st === 'good');
        em.setAttribute('aria-invalid', st === 'bad');
        const s = document.createElement('span'); s.textContent = t; msg.replaceChildren(s);
        go.disabled = st !== 'good';
      };
      ctx.on(em, 'input', sync);
      ctx.timeout(() => { if (!u.v) em.classList.add('act'); }, 200);
      const end = in2Type(ctx, u, em, 'camp@example.com', 350, 95, sync);
      ctx.timeout(() => em.classList.remove('act'), end + 500);
    }
  },

  /* ───────── in28 입력 마스크 ───────── */
  {
    id: 'in28', ko: '입력 마스크', en: 'Input mask',
    desc: '숫자만 쳐도 하이픈·공백이 정해진 자리에 알아서 들어가요.',
    prompt: '「입력 마스크(Input mask)」를 만들어 줘. 휴대폰 번호 칸에 숫자만 치면 010-1234-5678처럼 하이픈이, 카드 번호 칸엔 4자리마다 공백이 자동으로 들어가고 숫자가 아닌 글자는 무시해. 지울 때 구분 기호에서 커서가 걸리지 않게 하고, inputmode="numeric"과 형식을 미리 보여 주는 placeholder를 넣어 줘.',
    css: in2Base('in28') + `
.d-in28 .card{padding:10px 14px}
.d-in28 .ttl{margin-bottom:5px}
.d-in28 .lb{margin-bottom:3px}
.d-in28 .fld{height:32px;font-size:13.5px;font-variant-numeric:tabular-nums;letter-spacing:.03em;margin-bottom:6px}
.d-in28 .raw{display:flex;align-items:center;gap:6px;height:22px;padding:0 8px;border-radius:7px;background:var(--surface-2);font-size:11px;color:var(--muted);white-space:nowrap;overflow:hidden}
.d-in28 .raw b{flex:1;min-width:0;overflow:hidden;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-weight:600;color:var(--text);text-align:right;direction:rtl}
.d-in28 .raw i{flex:none;font-style:normal;font-weight:700;color:var(--accent);opacity:0;transition:opacity .15s}
.d-in28 .raw i.on{opacity:1}
`,
    html: `<div class="card"><div class="ttl">결제 정보<small>숫자만 입력</small></div>
  <label class="lb" for="in28-ph">휴대폰 번호</label><input class="fld ph" id="in28-ph" type="text" inputmode="numeric" placeholder="010-0000-0000" autocomplete="off">
  <label class="lb" for="in28-cd">카드 번호</label><input class="fld cd" id="in28-cd" type="text" inputmode="numeric" placeholder="0000 0000 0000 0000" autocomplete="off">
  <div class="raw"><span>누른 키</span><b>–</b><i>구분 기호 자동</i></div></div>`,
    run(el, ctx) {
      const u = in2User(ctx, el), ph = el.querySelector('.ph'), cd = el.querySelector('.cd'), raw = el.querySelector('.raw b'), tag = el.querySelector('.raw i');
      const mPh = s => { const d = s.replace(/\D/g, '').slice(0, 11); return d.length < 4 ? d : d.length < 8 ? d.slice(0, 3) + '-' + d.slice(3) : d.slice(0, 3) + '-' + d.slice(3, 7) + '-' + d.slice(7); };
      const mCd = s => (s.replace(/\D/g, '').slice(0, 16).match(/.{1,4}/g) || []).join(' ');
      const show = inp => { const d = inp.value.replace(/\D/g, ''); raw.textContent = d || '–'; tag.classList.toggle('on', /[- ]/.test(inp.value)); };
      const bind = (inp, m) => {
        ctx.on(inp, 'input', () => {
          const atEnd = inp.selectionStart === inp.value.length, before = inp.value.slice(0, inp.selectionStart).replace(/\D/g, '').length;
          inp.value = m(inp.value);
          if (!atEnd) { let p = 0, c = 0; while (p < inp.value.length && c < before) { if (/\d/.test(inp.value[p])) c++; p++; } try { inp.setSelectionRange(p, p); } catch (e) {} }
          show(inp);
        });
        ctx.on(inp, 'focus', () => show(inp));
      };
      bind(ph, mPh); bind(cd, mCd);
      const type = (inp, m, digits, t0, gap) => {
        let acc = '';
        ctx.timeout(() => { if (u.v) return; ph.classList.remove('act'); cd.classList.remove('act'); inp.classList.add('act'); }, t0 - 100);
        [...digits].forEach((c, i) => ctx.timeout(() => { if (u.v) return; acc += c; inp.value = m(acc); show(inp); }, t0 + i * gap));
        return t0 + digits.length * gap;
      };
      type(ph, mPh, '01012345678', 350, 80);
      const end = type(cd, mCd, '1234567812345678', 1400, 60);
      ctx.timeout(() => cd.classList.remove('act'), end + 500);
    }
  },

  /* ───────── in29 선택 카드 ───────── */
  {
    id: 'in29', ko: '선택 카드', en: 'Selection card', pair: 'in03',
    desc: '라디오 버튼과 달리 카드 전체가 선택지라 내용을 보며 골라요.',
    prompt: '「선택 카드(Selection card)」로 요금제 3종을 고르게 만들어 줘. 카드 어디를 눌러도 선택되고, 선택된 카드는 0.2초 ease-out으로 2px 파란 테두리와 옅은 파란 배경이 되며 오른쪽 위에 체크 배지가 scale 0→1로 나타나. 라디오 버튼과 헷갈리지 않게 작은 동그라미 라디오는 그리지 마. role="radiogroup"과 방향키 이동은 지원해 줘.',
    css: in2Base('in29') + `
.d-in29 .grid{display:flex;gap:6px}
.d-in29 .pc{position:relative;flex:1;min-width:0;height:88px;border-radius:12px;border:2px solid var(--line);background:var(--surface);padding:11px 2px 0;box-sizing:border-box;text-align:center;cursor:pointer;outline:none;transition:border-color .2s ease-out,background .2s ease-out,transform .2s cubic-bezier(.2,.8,.2,1),box-shadow .2s}
.d-in29 .pc:focus-visible{box-shadow:0 0 0 3px var(--accent-soft)}
.d-in29 .pc.on{border-color:var(--accent);background:var(--accent-soft);transform:translateY(-3px)}
.d-in29 .pc .nm{display:block;font-size:11.5px;font-weight:700;color:var(--muted);white-space:nowrap;transition:color .2s}
.d-in29 .pc.on .nm{color:var(--accent)}
.d-in29 .pc .pr{display:block;margin-top:5px;font-size:13.500px;font-weight:800;color:var(--text);white-space:nowrap;font-variant-numeric:tabular-nums;letter-spacing:-.02em}
.d-in29 .pc .ft{display:block;margin-top:5px;font-size:11px;color:var(--muted);white-space:nowrap}
.d-in29 .bd{position:absolute;right:-7px;top:-7px;width:20px;height:20px;border-radius:50%;background:var(--accent);color:var(--accent-text);border:2px solid var(--surface);display:grid;place-items:center;transform:scale(0);transition:transform .22s cubic-bezier(.2,.8,.2,1)}
.d-in29 .pc.on .bd{transform:scale(1)}
.d-in29 .go{margin-top:10px;width:100%;height:32px;border-radius:9px;border:0;background:var(--accent);color:var(--accent-text);font-size:12.5px;font-weight:700;cursor:pointer;white-space:nowrap}
.d-in29 .go span{display:inline-block}
.d-in29 .go span.ch{animation:in29-ch .22s ease-out}
@keyframes in29-ch{0%{opacity:0;transform:translateY(5px)}100%{opacity:1;transform:none}}
`,
    html: `<div class="card"><div class="ttl">요금제 선택<small>월 결제</small></div>
  <div class="grid" role="radiogroup" aria-label="요금제">${[['라이트', '4,900원', '1명'], ['스탠다드', '9,900원', '최대 3명'], ['프리미엄', '14,900원', '최대 6명']].map(([n, p, f], i) => `<div class="pc${i === 0 ? ' on' : ''}" role="radio" aria-checked="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-n="${n}"><span class="bd">${in2Ic('check', 11, 3.5)}</span><span class="nm">${n}</span><span class="pr">${p}</span><span class="ft">${f}</span></div>`).join('')}</div>
  <button class="go" type="button"><span>라이트로 시작하기</span></button></div>`,
    run(el, ctx) {
      const u = in2User(ctx, el), pcs = [...el.querySelectorAll('.pc')], lab = el.querySelector('.go span');
      const pick = i => {
        pcs.forEach((p, k) => { p.classList.toggle('on', k === i); p.setAttribute('aria-checked', k === i); p.tabIndex = k === i ? 0 : -1; });
        lab.textContent = pcs[i].dataset.n + (i === 0 ? '로' : i === 1 ? '로' : '으로') + ' 시작하기';
        lab.classList.remove('ch'); void lab.offsetWidth; lab.classList.add('ch');
      };
      pcs.forEach((p, i) => {
        ctx.on(p, 'click', () => pick(i));
        ctx.on(p, 'keydown', e => {
          if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); pick(i); return; }
          const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
          if (d) { e.preventDefault(); const n = (i + d + 3) % 3; pick(n); pcs[n].focus(); }
        });
      });
      in2Auto(ctx, el, u, pcs[2], () => pick(2), 600);
      in2Auto(ctx, el, u, pcs[1], () => pick(1), 1450);
    }
  }
]);
