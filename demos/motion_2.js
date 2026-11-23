// motion 추가분 (mo11~mo22). 이 파일 전용 헬퍼는 mo2 접두사.
const mo2Ease = t => (t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const mo2Out = t => 1 - Math.pow(1 - t, 3);
// 미니 화면 자동 세로 스크롤(사용자가 손대면 즉시 멈춤)
const mo2Scroll = (sc, ctx, steps) => {
  let user = false;
  ['pointerdown', 'wheel', 'touchstart'].forEach(ev => ctx.on(sc, ev, () => { user = true; }, { passive: true }));
  let i = 0;
  const next = () => {
    if (user || i >= steps.length) return;
    const s = steps[i++];
    ctx.timeout(() => {
      if (user) return;
      const from = sc.scrollTop;
      const max = sc.scrollHeight - sc.clientHeight;
      const to = Math.max(0, Math.min(max, s.to === 'max' ? max : s.to));
      ctx.loop(t => {
        if (user) return false;
        const p = Math.min(1, t / s.dur);
        sc.scrollTop = from + (to - from) * mo2Ease(p);
        if (p >= 1) { next(); return false; }
      });
    }, s.wait || 0);
  };
  next();
};

UIDEX.add('motion', [
  {
    id: 'mo11',
    ko: '슬라이드 인',
    en: 'Slide in',
    pair: 'mo01',
    desc: '페이드 업과 달리 화면 밖 옆에서 수평으로 쭉 밀려 들어와요.',
    prompt: '「슬라이드 인(Slide in)」 등장 효과를 만들어 줘. 알림 카드가 화면 오른쪽 밖(translateX 115%)에서 제자리로 420ms 동안 cubic-bezier(.2,.8,.2,1)로 수평으로 밀려 들어와. 페이드 업과 헷갈리지 않게 투명도 변화나 세로 이동은 하지 마. prefers-reduced-motion이면 이동 없이 바로 보여 줘.',
    css: `
.d-mo11 .scr{height:100%;padding:10px 12px;overflow:hidden}
.d-mo11 .hd{display:flex;justify-content:space-between;align-items:center;font-size:13px;font-weight:700;color:var(--text);margin-bottom:5px;line-height:18px}
.d-mo11 .hd span{font-size:11px;font-weight:600;color:var(--muted)}
.d-mo11 .row{display:flex;gap:9px;align-items:center;padding:5px 9px;margin-bottom:5px;border-radius:12px;background:var(--surface-2);transform:translateX(115%);transition:transform .42s cubic-bezier(.2,.8,.2,1);cursor:pointer}
.d-mo11 .row.in{transform:none}
.d-mo11 .row.jump{transition:none}
.d-mo11 .ic{width:30px;height:30px;flex:none;border-radius:9px;background:var(--accent-soft);color:var(--accent);display:grid;place-items:center}
.d-mo11 .tx{flex:1;min-width:0;display:grid;gap:1px}
.d-mo11 .tx b{line-height:16px;font-size:12px;font-weight:700;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-mo11 .tx span{line-height:14px;font-size:11px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
`,
    html: `<div class="ui-phone"><div class="scr">
  <div class="hd">새 알림<span>옆에서 들어옴 →</span></div>
  <div class="row"><div class="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg></div><div class="tx"><b>배송이 시작됐어요</b><span>캠핑 의자 · 내일 도착</span></div></div>
  <div class="row"><div class="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9a2 2 0 000 6v3h16v-3a2 2 0 000-6V6H4z"/><path d="M10 6v12" stroke-dasharray="2 3"/></svg></div><div class="tx"><b>쿠폰이 도착했어요</b><span>3,000원 할인 · 오늘까지</span></div></div>
  <div class="row"><div class="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.500-7 10-7 10z"/></svg></div><div class="tx"><b>찜한 상품 가격 인하</b><span>제주 3박 4일 · 12% 할인</span></div></div>
</div></div>`,
    run(el, ctx) {
      const rows = [...el.querySelectorAll('.row')];
      rows.forEach((r, i) => {
        ctx.timeout(() => r.classList.add('in'), 500 + i * 380);
        ctx.on(r, 'click', () => {
          r.classList.add('jump'); r.classList.remove('in');
          void r.offsetWidth;
          r.classList.remove('jump'); r.classList.add('in');
        });
      });
    }
  },
  {
    id: 'mo12',
    ko: '블러 인',
    en: 'Blur in',
    desc: '흐릿하던 내용이 초점이 맞듯 선명해지며 나타나요.',
    prompt: '「블러 인(Blur in)」 등장 효과를 만들어 줘. 제목·설명·버튼이 filter: blur(12px)·opacity 0 상태에서 700ms 동안 ease-out으로 초점이 맞듯 선명해지고, 요소마다 200ms씩 늦게 시작해. 위치 이동은 넣지 말고, prefers-reduced-motion이면 블러 없이 바로 보여 줘.',
    css: `
.d-mo12 .hero{width:220px;display:grid;justify-items:center;gap:8px;text-align:center;cursor:pointer}
.d-mo12 .b{opacity:0;filter:blur(12px)}
.d-mo12 .b.in{opacity:1;filter:blur(0);transition:opacity .7s ease-out,filter .7s ease-out}
.d-mo12 .lens{width:52px;height:52px;border-radius:50%;background:var(--accent-soft);color:var(--accent);display:grid;place-items:center}
.d-mo12 h4{margin:0;font-size:19px;font-weight:800;letter-spacing:-.02em;color:var(--text)}
.d-mo12 p{margin:0;font-size:12px;color:var(--muted)}
.d-mo12 .ui-btn{margin-top:4px;pointer-events:none}
.d-mo12 .hero:focus-visible{outline:2px solid var(--accent);outline-offset:6px;border-radius:12px}
`,
    html: `<div class="hero" role="button" tabindex="0" aria-label="블러 인 다시 보기">
  <div class="b lens"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg></div>
  <h4 class="b">가을 여행 사진전</h4>
  <p class="b">초점이 맞듯 선명해지며 등장해요</p>
  <span class="b ui-btn">작품 보러 가기</span>
</div>`,
    run(el, ctx) {
      const bs = [...el.querySelectorAll('.b')];
      let gen = 0;
      const play = first => {
        const g = ++gen;
        bs.forEach(b => b.classList.remove('in'));
        void el.offsetWidth;
        bs.forEach((b, i) => ctx.timeout(() => { if (g === gen) b.classList.add('in'); }, (first ? 120 : 60) + i * 200));
      };
      play(true);
      const hero = el.querySelector('.hero');
      ctx.on(hero, 'click', () => play(false));
      ctx.on(hero, 'keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(false); }
      });
    }
  },
  {
    id: 'mo13',
    ko: '스크롤 스냅',
    en: 'Scroll snap',
    desc: '스크롤을 놓으면 가장 가까운 카드에 딱 맞춰 멈춰요.',
    prompt: '「스크롤 스냅(Scroll snap)」 피드를 만들어 줘. 세로 스크롤 컨테이너에 scroll-snap-type: y mandatory, 각 카드에 scroll-snap-align: start를 줘서 손을 놓으면 어중간한 위치에 서지 않고 가장 가까운 카드에 약 300ms 만에 딱 맞춰 멈추게 해. 현재 위치를 점으로 표시하고, 키보드 위아래 화살표로도 한 장씩 넘어가게 해 줘.',
    css: `
.d-mo13 .sc{height:100%;overflow-y:auto;padding:10px 26px 30px 12px;scroll-snap-type:y mandatory;scroll-padding-top:10px;scrollbar-width:none;cursor:grab;outline:none}
.d-mo13 .sc::-webkit-scrollbar{display:none}
.d-mo13 .sc.free{scroll-snap-type:none}
.d-mo13 .c{height:140px;margin-bottom:10px;border-radius:14px;scroll-snap-align:start;background:var(--accent-soft);padding:12px;display:flex;flex-direction:column;justify-content:space-between;user-select:none}
.d-mo13 .c:last-child{margin-bottom:0}
.d-mo13 .c.k2{background:var(--surface-2)}
.d-mo13 .c i{font-style:normal;font-size:26px;font-weight:800;color:var(--accent);line-height:1}
.d-mo13 .c b{display:block;font-size:14px;font-weight:800;color:var(--text)}
.d-mo13 .c span{font-size:11px;color:var(--muted)}
.d-mo13 .dots{position:absolute;right:10px;top:50%;transform:translateY(-50%);display:grid;gap:5px;pointer-events:none}
.d-mo13 .dots i{width:6px;height:6px;border-radius:3px;background:var(--line);transition:height .2s,background .2s}
.d-mo13 .dots i.on{height:16px;background:var(--accent)}
.d-mo13 .msg{position:absolute;left:50%;bottom:8px;transform:translateX(-50%);white-space:nowrap;z-index:3;font-size:11px;font-weight:700;padding:4px 9px;border-radius:999px;background:var(--surface);color:var(--muted);box-shadow:var(--shadow);pointer-events:none}
.d-mo13 .msg.hit{color:var(--accent)}
.d-mo13 .tp{position:absolute;left:150px;top:0;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;background:var(--accent);opacity:0;pointer-events:none;transition:opacity .18s;box-shadow:0 0 0 6px var(--accent-soft);z-index:2}
.d-mo13 .tp.on{opacity:.45}
`,
    html: `<div class="ui-phone">
  <div class="sc free" tabindex="0" role="group" aria-label="추천 숙소 피드">
    <div class="c"><i>1</i><div><b>제주 오션뷰 호텔</b><span>1박 89,000원 · 조식 포함</span></div></div>
    <div class="c k2"><i>2</i><div><b>강릉 솔숲 펜션</b><span>1박 72,000원 · 바비큐</span></div></div>
    <div class="c"><i>3</i><div><b>여수 밤바다 호텔</b><span>1박 110,000원 · 오션뷰</span></div></div>
    <div class="c k2"><i>4</i><div><b>경주 한옥 스테이</b><span>1박 95,000원 · 온돌방</span></div></div>
  </div>
  <div class="dots"><i class="on"></i><i></i><i></i><i></i></div>
  <div class="msg">밀다가 놓으면…</div>
  <div class="tp"></div>
</div>`,
    run(el, ctx) {
      const sc = el.querySelector('.sc'), cards = [...el.querySelectorAll('.c')];
      const dots = [...el.querySelectorAll('.dots i')], msg = el.querySelector('.msg'), tp = el.querySelector('.tp');
      const step = cards[1].offsetTop - cards[0].offsetTop;
      let gen = 0, user = false, drag = null;
      const say = (t, hit) => { msg.textContent = t; msg.classList.toggle('hit', !!hit); };
      const near = () => Math.max(0, Math.min(cards.length - 1, Math.round(sc.scrollTop / step)));
      const upd = () => { const n = near(); dots.forEach((d, k) => d.classList.toggle('on', k === n)); };
      ctx.on(sc, 'scroll', upd, { passive: true });
      const anim = (to, dur, fn, done, tpy) => {
        const g = ++gen, from = sc.scrollTop;
        ctx.loop(t => {
          if (g !== gen) return false;
          const p = Math.min(1, t / dur);
          sc.scrollTop = from + (to - from) * fn(p);
          if (tpy) tp.style.transform = `translateY(${tpy - (to - from) * fn(p)}px)`;
          if (p >= 1) { if (done) done(); return false; }
        });
      };
      // 놓는 순간: 가장 가까운 카드로 붙인 뒤 CSS 스냅을 켠다
      const settle = () => {
        const i = near();
        say(`놓음 → ${i + 1}번 카드에 딱 맞춤`, true);
        anim(i * step, 300, mo2Out, () => sc.classList.remove('free'));
      };
      // 자동 시연: 손가락(반투명 원)이 위로 밀다가 놓는다
      const demoDrag = (dist, dur, text) => {
        if (user) return;
        tp.style.transform = 'translateY(140px)';
        tp.classList.add('on');
        say(text);
        anim(sc.scrollTop + dist, dur, mo2Ease, () => {
          ctx.timeout(() => { if (user) return; tp.classList.remove('on'); settle(); }, 140);
        }, 140);
      };
      ctx.timeout(() => demoDrag(step * .62, 620, '절반 넘게 밀고…'), 450);
      ctx.timeout(() => demoDrag(step * .3, 480, '조금만 밀고…'), 1950);
      // 직접 조작: 휠·터치·화살표 키는 CSS 스냅 그대로, 마우스는 끌다가 놓기
      const stopDemo = () => { if (!user) { user = true; tp.classList.remove('on'); } gen++; };
      const native = () => { stopDemo(); sc.classList.remove('free'); say('밀다가 놓아 보세요'); };
      ctx.on(sc, 'wheel', native, { passive: true });
      ctx.on(sc, 'touchstart', native, { passive: true });
      ctx.on(sc, 'keydown', native);
      ctx.on(sc, 'pointerdown', e => {
        if (e.pointerType !== 'mouse') return;
        stopDemo();
        sc.classList.add('free');
        drag = { y: e.clientY, s: sc.scrollTop };
        say('끄는 중…');
      });
      ctx.on(el, 'pointermove', e => { if (drag) sc.scrollTop = drag.s - (e.clientY - drag.y); });
      const end = () => { if (!drag) return; drag = null; settle(); };
      ctx.on(el, 'pointerup', end);
      ctx.on(el, 'pointerleave', end);
      ctx.on(el, 'pointercancel', end);
    }
  },
  {
    id: 'mo14',
    ko: '스크롤 고정',
    en: 'Scroll pinning',
    pair: 'mo03',
    desc: '스티키 헤더와 달리 섹션 전체가 붙들린 채 안의 단계가 바뀌어요.',
    prompt: '「스크롤 고정(Scroll pinning)」 섹션을 만들어 줘. 높이 300vh 구간 안에서 100vh 패널이 position: sticky로 화면에 붙들리고, 스크롤 진행률에 따라 1·2·3단계 내용이 250ms 페이드로 바뀐 뒤 구간이 끝나면 풀려. 스티키 헤더와 헷갈리지 않게 얇은 바만 계속 고정하지는 마. prefers-reduced-motion이면 단계를 세로로 나열해 줘.',
    css: `
.d-mo14 .sc{height:100%;overflow:auto;scrollbar-width:none}
.d-mo14 .sc::-webkit-scrollbar{display:none}
.d-mo14 .intro{height:64px;padding:12px 14px;display:grid;align-content:center;gap:6px}
.d-mo14 .intro b{font-size:13px;font-weight:700;color:var(--text)}
.d-mo14 .pinw{height:420px}
.d-mo14 .pin{position:sticky;top:0;height:180px;padding:14px;background:var(--accent-soft);display:flex;flex-direction:column}
.d-mo14 .cap{font-size:11px;font-weight:700;color:var(--accent)}
.d-mo14 .stps{position:relative;flex:1}
.d-mo14 .stp{position:absolute;left:0;right:0;top:12px;display:flex;gap:12px;align-items:center;opacity:0;transform:translateY(10px);transition:opacity .12s ease-out,transform .12s ease-out}
.d-mo14 .stp.on{opacity:1;transform:none;transition:opacity .25s ease-out .1s,transform .25s ease-out .1s}
.d-mo14 .num{width:46px;height:46px;flex:none;border-radius:14px;background:var(--accent);color:var(--accent-text);display:grid;place-items:center;font-size:22px;font-weight:800}
.d-mo14 .stp b{display:block;font-size:15px;font-weight:800;color:var(--text)}
.d-mo14 .stp span{font-size:11px;color:var(--muted)}
.d-mo14 .bars{display:flex;gap:5px}
.d-mo14 .bars i{flex:1;height:4px;border-radius:2px;background:var(--surface);overflow:hidden}
.d-mo14 .bars u{display:block;height:100%;width:0;background:var(--accent)}
.d-mo14 .next{height:110px;padding:14px;display:grid;align-content:start;gap:8px}
.d-mo14 .next b{font-size:13px;font-weight:700;color:var(--text)}
.d-mo14 .tag{position:absolute;right:8px;top:8px;z-index:3;font-size:11px;font-weight:700;padding:4px 8px;border-radius:999px;background:var(--surface);color:var(--muted);box-shadow:var(--shadow);transition:color .2s}
.d-mo14 .tag.on{color:var(--accent)}
`,
    html: `<div class="ui-phone"><div class="sc">
  <div class="intro"><b>숙소 예약 방법</b><div class="ui-line" style="width:70%"></div></div>
  <div class="pinw"><div class="pin">
    <div class="cap">예약은 3단계면 끝</div>
    <div class="stps">
      <div class="stp on"><div class="num">1</div><div><b>날짜 고르기</b><span>체크인·체크아웃 선택</span></div></div>
      <div class="stp"><div class="num">2</div><div><b>객실 고르기</b><span>오션뷰 · 2인 · 조식 포함</span></div></div>
      <div class="stp"><div class="num">3</div><div><b>결제하기</b><span>간편결제로 10초 만에</span></div></div>
    </div>
    <div class="bars"><i><u></u></i><i><u></u></i><i><u></u></i></div>
  </div></div>
  <div class="next"><b>자주 묻는 질문</b><div class="ui-line"></div><div class="ui-line" style="width:80%"></div><div class="ui-line" style="width:55%"></div></div>
</div><span class="tag">스크롤 중</span></div>`,
    run(el, ctx) {
      const sc = el.querySelector('.sc'), pinw = el.querySelector('.pinw'), tag = el.querySelector('.tag');
      const stps = [...el.querySelectorAll('.stp')], fills = [...el.querySelectorAll('.bars u')];
      const upd = () => {
        const start = pinw.offsetTop, len = pinw.offsetHeight - sc.clientHeight;
        const y = sc.scrollTop - start, p = Math.max(0, Math.min(1, y / len));
        const cur = Math.min(2, Math.floor(p * 3));
        stps.forEach((s, i) => s.classList.toggle('on', i === cur));
        fills.forEach((f, i) => { f.style.width = Math.max(0, Math.min(1, p * 3 - i)) * 100 + '%'; });
        const pinned = y >= 0 && y < len;
        tag.textContent = y < 0 ? '스크롤 중' : pinned ? `화면에 고정 · ${cur + 1}/3` : '고정 풀림';
        tag.classList.toggle('on', pinned);
      };
      ctx.on(sc, 'scroll', upd, { passive: true });
      upd();
      const s0 = pinw.offsetTop;
      mo2Scroll(sc, ctx, [{ wait: 400, dur: 900, to: s0 + 110 }, { wait: 1000, dur: 800, to: s0 + 200 }, { wait: 600, dur: 900, to: 'max' }]);
    }
  },
  {
    id: 'mo15',
    ko: '가로 스크롤 섹션',
    en: 'Horizontal scroll section',
    pair: 'mo14',
    desc: '스크롤 고정과 달리 단계가 바뀌지 않고 내용이 옆으로 흘러가요.',
    prompt: '「가로 스크롤 섹션(Horizontal scroll section)」을 만들어 줘. 300vh 구간에서 100vh 패널을 sticky로 고정하고, 세로 스크롤 진행률 0~1을 트랙 translateX(0 → -(트랙 너비-화면 너비))에 연결해. 스크롤 고정과 헷갈리지 않게 단계 전환 말고 트랙이 옆으로 흐르게 해. prefers-reduced-motion이면 일반 가로 목록으로 바꿔 줘.',
    css: `
.d-mo15 .sc{height:100%;overflow:auto;scrollbar-width:none}
.d-mo15 .sc::-webkit-scrollbar{display:none}
.d-mo15 .intro{height:56px;padding:12px 14px;display:grid;align-content:center;gap:6px}
.d-mo15 .intro b{font-size:13px;font-weight:700;color:var(--text)}
.d-mo15 .pinw{height:480px}
.d-mo15 .pin{position:sticky;top:0;height:180px;overflow:hidden;background:var(--surface-2);padding-top:12px}
.d-mo15 .ttl{padding:0 14px;font-size:13px;font-weight:800;color:var(--text);line-height:18px}
.d-mo15 .hint{padding:2px 14px 8px;font-size:11px;font-weight:600;color:var(--accent);line-height:16px}
.d-mo15 .trk{position:relative;height:96px}
.d-mo15 .c{position:absolute;left:0;top:0;will-change:transform;width:72px;height:96px;border-radius:14px;background:var(--surface);box-shadow:var(--shadow);padding:9px;display:flex;flex-direction:column;justify-content:space-between}
.d-mo15 .c i{font-style:normal;font-size:11px;font-weight:800;color:var(--accent)}
.d-mo15 .c b{display:block;font-size:13px;font-weight:800;color:var(--text)}
.d-mo15 .c span{font-size:11px;color:var(--muted)}
.d-mo15 .next{height:100px;padding:14px;display:grid;align-content:start;gap:8px}
.d-mo15 .next b{font-size:13px;font-weight:700;color:var(--text)}
.d-mo15 .vb{position:absolute;right:3px;top:10px;bottom:10px;width:3px;border-radius:2px;background:var(--line);z-index:3}
.d-mo15 .vb u{position:absolute;left:0;right:0;top:0;height:30%;border-radius:2px;background:var(--muted)}
`,
    html: `<div class="ui-phone"><div class="sc">
  <div class="intro"><b>가을 여행 기획전</b><div class="ui-line" style="width:60%"></div></div>
  <div class="pinw"><div class="pin">
    <div class="ttl">인기 여행지 TOP 6</div>
    <div class="hint">↓ 세로로 내리면 → 옆으로 이동</div>
    <div class="trk">
      <div class="c"><i>01</i><div><b>제주</b><span>3박 4일</span></div></div>
      <div class="c"><i>02</i><div><b>강릉</b><span>1박 2일</span></div></div>
      <div class="c"><i>03</i><div><b>여수</b><span>2박 3일</span></div></div>
      <div class="c"><i>04</i><div><b>경주</b><span>1박 2일</span></div></div>
      <div class="c"><i>05</i><div><b>속초</b><span>2박 3일</span></div></div>
      <div class="c"><i>06</i><div><b>부산</b><span>1박 2일</span></div></div>
    </div>
  </div></div>
  <div class="next"><b>여행 후기</b><div class="ui-line"></div><div class="ui-line" style="width:75%"></div></div>
</div><div class="vb" aria-hidden="true"><u></u></div></div>`,
    run(el, ctx) {
      const sc = el.querySelector('.sc'), pinw = el.querySelector('.pinw'), trk = el.querySelector('.trk');
      const thumb = el.querySelector('.vb u'), cards = [...trk.children];
      const CW = 72, GAP = 10, PAD = 14, W = sc.clientWidth;
      const trackW = PAD * 2 + cards.length * CW + (cards.length - 1) * GAP;
      const upd = () => {
        const len = pinw.offsetHeight - sc.clientHeight;
        const p = Math.max(0, Math.min(1, (sc.scrollTop - pinw.offsetTop) / len));
        // 세로 진행률 → 가로 이동(화면 밖 카드는 그리지 않는다)
        cards.forEach((c, i) => {
          const x = PAD + i * (CW + GAP) - p * (trackW - W), off = x > W || x < -CW;
          c.style.display = off ? 'none' : '';
          c.style.transform = `translate3d(${x}px,0,0)`;
        });
        const max = sc.scrollHeight - sc.clientHeight;
        thumb.style.top = (max ? sc.scrollTop / max : 0) * 70 + '%';
      };
      ctx.on(sc, 'scroll', upd, { passive: true });
      upd();
      const s0 = pinw.offsetTop;
      mo2Scroll(sc, ctx, [{ wait: 400, dur: 500, to: s0 }, { wait: 100, dur: 2300, to: s0 + 300 }, { wait: 400, dur: 700, to: 'max' }]);
    }
  },
  {
    id: 'mo16',
    ko: '아이콘 모핑',
    en: 'Icon morph',
    desc: '햄버거가 X로, 재생이 일시정지로 선이 이어지며 변해요.',
    prompt: '「아이콘 모핑(Icon morph)」 버튼을 만들어 줘. 햄버거 세 줄이 300ms cubic-bezier(.2,.8,.2,1)로 위·아래 줄은 ±45도 돌고 가운데 줄은 사라져 X가 되고, 재생 삼각형도 같은 방식으로 일시정지 두 막대로 변해. 햄버거 메뉴와 헷갈리지 않게 메뉴 패널은 만들지 말고 아이콘 모양만 바꿔. aria-label은 상태에 맞춰 바꿔 줘.',
    css: `
.d-mo16 .row{display:flex;gap:28px}
.d-mo16 .col{display:grid;justify-items:center;gap:10px}
.d-mo16 .bt{position:relative;width:68px;height:68px;border:0;border-radius:20px;background:var(--surface);color:var(--text);box-shadow:var(--shadow);cursor:pointer;padding:0;transition:background .3s,color .3s}
.d-mo16 .bt.on{background:var(--accent);color:var(--accent-text)}
.d-mo16 .bt:active{transform:scale(.95)}
.d-mo16 .ln{position:absolute;left:50%;top:50%;width:28px;height:3px;margin:-1.5px 0 0 -14px;border-radius:2px;background:currentColor;transition:transform .3s cubic-bezier(.2,.8,.2,1),opacity .2s}
.d-mo16 .ln.a{transform:translateY(-9px)}
.d-mo16 .ln.c{transform:translateY(9px)}
.d-mo16 .bt.on .ln.a{transform:rotate(45deg)}
.d-mo16 .bt.on .ln.b{transform:scaleX(0);opacity:0}
.d-mo16 .bt.on .ln.c{transform:rotate(-45deg)}
.d-mo16 .pp{position:absolute;left:50%;top:50%;width:28px;height:28px;margin:-14px 0 0 -14px}
.d-mo16 .pp i{position:absolute;inset:0;background:currentColor;transition:clip-path .3s cubic-bezier(.2,.8,.2,1)}
.d-mo16 .pp .l{clip-path:polygon(12% 0%,58% 25%,58% 75%,12% 100%)}
.d-mo16 .pp .r{clip-path:polygon(56% 25%,100% 50%,100% 50%,56% 75%)}
.d-mo16 .bt.on .pp .l{clip-path:polygon(12% 4%,40% 4%,40% 96%,12% 96%)}
.d-mo16 .bt.on .pp .r{clip-path:polygon(60% 4%,88% 4%,88% 96%,60% 96%)}
.d-mo16 .lab{font-size:12px;font-weight:600;color:var(--muted);min-width:70px;text-align:center}
`,
    html: `<div class="row">
  <div class="col"><button class="bt m" type="button" aria-label="메뉴 열기"><span class="ln a"></span><span class="ln b"></span><span class="ln c"></span></button><div class="lab">메뉴</div></div>
  <div class="col"><button class="bt p" type="button" aria-label="재생"><span class="pp"><i class="l"></i><i class="r"></i></span></button><div class="lab">재생</div></div>
</div>`,
    run(el, ctx) {
      const m = el.querySelector('.bt.m'), p = el.querySelector('.bt.p');
      const labs = el.querySelectorAll('.lab');
      const tgM = () => {
        const on = m.classList.toggle('on');
        m.setAttribute('aria-label', on ? '메뉴 닫기' : '메뉴 열기');
        labs[0].textContent = on ? '닫기' : '메뉴';
      };
      const tgP = () => {
        const on = p.classList.toggle('on');
        p.setAttribute('aria-label', on ? '일시정지' : '재생');
        labs[1].textContent = on ? '일시정지' : '재생';
      };
      ctx.on(m, 'click', tgM);
      ctx.on(p, 'click', tgP);
      ctx.timeout(tgM, 650);
      ctx.timeout(tgP, 1250);
    }
  },
  {
    id: 'mo17',
    ko: '호버 리프트',
    en: 'Hover lift',
    desc: '카드에 포인터를 올리면 살짝 떠오르고 그림자가 깊어져요.',
    prompt: '「호버 리프트(Hover lift)」 카드를 만들어 줘. 포인터를 올리면 카드가 translateY(-7px)로 떠오르고 그림자가 0 1px 3px에서 0 16px 24px -8px로 220ms ease-out 동안 깊어져. 떼면 같은 속도로 내려오고, 키보드 :focus-visible에도 같은 효과를 주며 터치 기기에서는 눌렀을 때만 반응하게 해 줘.',
    css: `
.d-mo17 .row{display:flex;gap:8px}
.d-mo17 .c{width:76px;padding:7px 7px 9px;border-radius:14px;background:var(--surface);box-shadow:0 1px 3px rgba(0,0,0,.14);cursor:pointer;transition:transform .22s ease-out,box-shadow .22s ease-out}
.d-mo17 .c.up,.d-mo17 .c:active,.d-mo17 .c:focus-visible{transform:translateY(-7px);box-shadow:0 16px 24px -8px rgba(0,0,0,.38);outline:none}
@media (hover:hover){.d-mo17 .c:hover{transform:translateY(-7px);box-shadow:0 16px 24px -8px rgba(0,0,0,.38)}}
.d-mo17 .im{height:50px;border-radius:9px;background:var(--accent-soft);color:var(--accent);display:grid;place-items:center;margin-bottom:7px}
.d-mo17 .c b{display:block;font-size:11px;font-weight:600;color:var(--text);white-space:nowrap}
.d-mo17 .c span{font-size:12px;font-weight:800;color:var(--text);white-space:nowrap;letter-spacing:-.02em}
.d-mo17 .cur{position:absolute;left:0;top:0;z-index:3;width:20px;height:20px;pointer-events:none;opacity:0;transition:transform .5s cubic-bezier(.2,.8,.2,1),opacity .25s}
.d-mo17 .cur.on{opacity:1}
.d-mo17 .cur path{fill:var(--text);stroke:var(--surface);stroke-width:1.5}
`,
    html: `<div class="row">
  <div class="c" tabindex="0"><div class="im"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4l2 9h8l2-9M8 13l-3 7M16 13l3 7M7 9h10"/></svg></div><b>캠핑 의자</b><span>39,000원</span></div>
  <div class="c" tabindex="0"><div class="im"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4L3 20h18zM12 12l-3 8M12 12l3 8"/></svg></div><b>2인 텐트</b><span>128,000원</span></div>
  <div class="c" tabindex="0"><div class="im"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 9h6l2 4v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5zM10 9V6h4v3M12 3v3"/></svg></div><b>감성 랜턴</b><span>24,000원</span></div>
</div>
<svg class="cur" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 8-6.500 1.800L10 19z"/></svg>`,
    run(el, ctx) {
      const cards = [...el.querySelectorAll('.c')], cur = el.querySelector('.cur');
      let user = false;
      const at = i => {
        const a = cards[i].getBoundingClientRect(), b = el.getBoundingClientRect();
        return [a.left - b.left + a.width / 2 - 2, a.top - b.top + a.height * .32];
      };
      const move = (x, y) => { cur.style.transform = `translate(${x}px,${y}px)`; };
      const lift = i => cards.forEach((c, k) => c.classList.toggle('up', k === i));
      const [x0, y0] = at(0);
      move(x0 - 40, y0 + 70);
      const hover = (i, t) => {
        ctx.timeout(() => { if (user) return; const [x, y] = at(i); cur.classList.add('on'); move(x, y); }, t);
        ctx.timeout(() => { if (!user) lift(i); }, t + 380);
      };
      hover(1, 350);
      hover(2, 1500);
      ctx.timeout(() => { if (user) return; cur.classList.remove('on'); lift(-1); }, 3200);
      ctx.on(el, 'pointermove', () => { if (!user) { user = true; cur.classList.remove('on'); lift(-1); } });
    }
  },
  {
    id: 'mo18',
    ko: '3D 틸트',
    en: '3D tilt',
    pair: 'mo17',
    desc: '호버 리프트와 달리 포인터를 따라 카드가 입체로 기울어요.',
    prompt: '「3D 틸트(3D tilt)」 카드를 만들어 줘. perspective 600px 안에서 포인터 위치에 따라 카드가 rotateX·rotateY 최대 ±14도로 기울고, 흰색 광택(radial-gradient)이 포인터를 따라 움직여. 나가면 500ms 동안 원위치해. 호버 리프트와 헷갈리지 않게 위로 띄우기만 하지는 마. prefers-reduced-motion이면 기울임을 꺼 줘.',
    css: `
.d-mo18 .scene{perspective:600px;width:100%;height:100%;display:grid;place-items:center}
.d-mo18 .card{position:relative;width:176px;height:108px;border-radius:16px;background:var(--accent);color:var(--accent-text);padding:14px;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;transform-style:preserve-3d;transition:transform .14s ease-out,box-shadow .14s ease-out;box-shadow:0 14px 24px -12px rgba(0,0,0,.45);will-change:transform}
.d-mo18 .card.rest{transition:transform .5s cubic-bezier(.2,.8,.2,1),box-shadow .5s}
.d-mo18 .top{display:flex;justify-content:space-between;align-items:center;font-size:12px;font-weight:700}
.d-mo18 .chip{width:26px;height:19px;border-radius:5px;background:var(--warn);opacity:.9}
.d-mo18 .pt{font-size:20px;font-weight:800;letter-spacing:-.02em}
.d-mo18 .pt small{display:block;font-size:11px;font-weight:600;opacity:.8;letter-spacing:0}
.d-mo18 .glare{position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .3s;background:radial-gradient(circle at var(--gx,50%) var(--gy,50%),rgba(255,255,255,.55),rgba(255,255,255,0) 58%)}
.d-mo18 .card.live .glare{opacity:1}
.d-mo18 .fp{position:absolute;left:0;top:0;width:26px;height:26px;margin:-13px 0 0 -13px;border-radius:50%;background:var(--text);opacity:0;pointer-events:none;transition:opacity .25s;z-index:3}
.d-mo18 .fp.on{opacity:.3}
`,
    html: `<div class="scene"><div class="card rest">
  <div class="top"><span>멤버십 카드</span><span class="chip"></span></div>
  <div class="pt">12,480P<small>골드 등급 · 적립 3%</small></div>
  <div class="glare"></div>
</div></div><div class="fp"></div>`,
    run(el, ctx) {
      const card = el.querySelector('.card'), fp = el.querySelector('.fp');
      let user = false;
      const tilt = (nx, ny) => {
        nx = Math.max(-1, Math.min(1, nx)); ny = Math.max(-1, Math.min(1, ny));
        card.classList.remove('rest'); card.classList.add('live');
        card.style.transform = `rotateX(${(-ny * 14).toFixed(2)}deg) rotateY(${(nx * 14).toFixed(2)}deg)`;
        card.style.boxShadow = `${(-nx * 12).toFixed(1)}px ${(14 - ny * 10).toFixed(1)}px 24px -12px rgba(0,0,0,.45)`;
        card.style.setProperty('--gx', (50 + nx * 45) + '%');
        card.style.setProperty('--gy', (50 + ny * 45) + '%');
      };
      const rest = () => {
        card.classList.add('rest'); card.classList.remove('live');
        card.style.transform = ''; card.style.boxShadow = '';
      };
      // 자동 시연: 가짜 포인터가 카드 위를 한 바퀴 반 돈다
      ctx.timeout(() => {
        if (user) return;
        fp.classList.add('on');
        ctx.loop(t => {
          if (user) return false;
          const p = Math.min(1, t / 3000), a = -2.4 + p * Math.PI * 3;
          const nx = Math.cos(a) * .85, ny = Math.sin(a) * .8;
          const w = el.clientWidth, h = el.clientHeight;
          fp.style.transform = `translate(${w / 2 + nx * 80}px,${h / 2 + ny * 50}px)`;
          tilt(nx, ny);
          if (p >= 1) { fp.classList.remove('on'); rest(); return false; }
        });
      }, 150);
      ctx.on(el, 'pointermove', e => {
        if (!user) { user = true; fp.classList.remove('on'); }
        const r = card.getBoundingClientRect();
        tilt((e.clientX - (r.left + r.width / 2)) / (r.width / 2), (e.clientY - (r.top + r.height / 2)) / (r.height / 2));
      });
      ctx.on(el, 'pointerleave', () => { if (user) rest(); });
    }
  },
  {
    id: 'mo19',
    ko: '펄스',
    en: 'Pulse',
    desc: '원이 반복해 퍼져 나가며 라이브·녹화 중임을 알려요.',
    prompt: '「펄스(Pulse)」 표시를 만들어 줘. 지름 16px 빨간 점 뒤에서 같은 색 원이 scale 1→3.2, opacity .5→0으로 1.6초마다 ease-out으로 퍼져 나가고, 두 번째 원은 0.8초 늦게 시작해 끊김 없이 반복돼. "라이브" 같은 글자 라벨을 함께 두고, prefers-reduced-motion이면 퍼짐 없이 점만 보여 줘.',
    css: `
.d-mo19 .box{display:grid;justify-items:center;gap:14px}
.d-mo19 .live{display:grid;justify-items:center;gap:4px;padding-top:26px}
.d-mo19 .dot{position:relative;width:16px;height:16px;border-radius:50%;background:var(--danger);margin-bottom:24px}
.d-mo19 .dot::before,.d-mo19 .dot::after{content:"";position:absolute;inset:0;border-radius:50%;background:var(--danger);animation:mo19-ring 1.6s ease-out infinite}
.d-mo19 .dot::after{animation-delay:.8s}
.d-mo19 .live b{font-size:14px;font-weight:800;color:var(--text)}
.d-mo19 .live span{font-size:11px;color:var(--muted)}
.d-mo19 .rec{display:inline-flex;align-items:center;gap:8px;height:30px;padding:0 13px;border-radius:999px;border:1px solid var(--line);background:var(--surface);font-size:12px;font-weight:700;color:var(--text);cursor:pointer;font-family:inherit;font-variant-numeric:tabular-nums}
.d-mo19 .rec i{position:relative;width:8px;height:8px;border-radius:50%;background:var(--danger)}
.d-mo19 .rec i::after{content:"";position:absolute;inset:0;border-radius:50%;background:var(--danger);animation:mo19-ring 1.6s ease-out infinite}
.d-mo19 .rec.off i{background:var(--muted)}
.d-mo19 .rec.off i::after{animation:none;opacity:0}
@keyframes mo19-ring{0%{transform:scale(1);opacity:.5}100%{transform:scale(3.2);opacity:0}}
`,
    html: `<div class="box">
  <div class="live"><div class="dot"></div><b>라이브 방송 중</b><span>지금 1,284명이 보고 있어요</span></div>
  <button class="rec" type="button" aria-pressed="true"><i></i><span class="t">녹화 중 00:00</span></button>
</div>`,
    run(el, ctx) {
      const rec = el.querySelector('.rec'), t = el.querySelector('.rec .t');
      let s = 0, on = true;
      const show = () => { t.textContent = (on ? '녹화 중 ' : '녹화 멈춤 ') + '00:' + String(s % 60).padStart(2, '0'); };
      ctx.interval(() => { if (on) { s++; show(); } }, 1000);
      ctx.on(rec, 'click', () => { on = !on; rec.classList.toggle('off', !on); rec.setAttribute('aria-pressed', on); show(); });
    }
  },
  {
    id: 'mo20',
    ko: '크로스페이드',
    en: 'Crossfade',
    desc: '두 화면이 겹친 채 하나는 흐려지고 다른 하나가 나타나요.',
    prompt: '「크로스페이드(Crossfade)」 이미지 전환을 만들어 줘. 같은 자리에 겹쳐 둔 두 장 중 현재 장은 opacity 1→0, 다음 장은 0→1로 900ms 동안 ease-in-out으로 동시에 바뀌어 중간에 두 장이 겹쳐 보여. 위치 이동은 넣지 말고, 숨은 장에는 aria-hidden을 주고 prefers-reduced-motion이면 즉시 교체해 줘.',
    css: `
.d-mo20 .box{display:grid;justify-items:center;gap:9px}
.d-mo20 .fr{position:relative;width:220px;height:124px;border-radius:14px;overflow:hidden;box-shadow:var(--shadow);background:var(--surface)}
.d-mo20 .sl{position:absolute;inset:0;opacity:0;transition:opacity .9s ease-in-out}
.d-mo20 .sl.on{opacity:1}
.d-mo20 .sl svg{position:absolute;inset:0;width:100%;height:100%}
.d-mo20 .s1{background:linear-gradient(180deg,var(--accent-soft),var(--surface))}
.d-mo20 .s2{background:linear-gradient(180deg,var(--warn),var(--danger))}
.d-mo20 .s3{background:linear-gradient(180deg,var(--accent),var(--success))}
.d-mo20 .s1 .sun{fill:var(--warn)}
.d-mo20 .s1 .hill{fill:var(--accent);opacity:.55}
.d-mo20 .s1 .sea{fill:var(--accent);opacity:.3}
.d-mo20 .s2 .sun{fill:rgba(255,255,255,.9)}
.d-mo20 .s2 .hill{fill:rgba(20,24,40,.55)}
.d-mo20 .s3 .sun{fill:rgba(255,255,255,.95)}
.d-mo20 .s3 .hill{fill:rgba(20,24,40,.6)}
.d-mo20 .s3 .star{fill:rgba(255,255,255,.95)}
.d-mo20 .nav{display:flex;gap:6px}
.d-mo20 .nav button{height:26px;padding:0 12px;border-radius:999px;border:1px solid var(--line);background:var(--surface);color:var(--muted);font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;transition:background .3s,color .3s,border-color .3s}
.d-mo20 .nav button.on{background:var(--accent);border-color:var(--accent);color:var(--accent-text)}
`,
    html: `<div class="box">
  <div class="fr">
    <div class="sl s1 on"><svg viewBox="0 0 220 124" preserveAspectRatio="none"><circle class="sun" cx="168" cy="34" r="15"/><path class="hill" d="M0 124V84l46-34 40 30 34-22 100 50v16z"/><path class="sea" d="M0 124v-22h220v22z"/></svg></div>
    <div class="sl s2" aria-hidden="true"><svg viewBox="0 0 220 124" preserveAspectRatio="none"><circle class="sun" cx="76" cy="78" r="24"/><path class="hill" d="M0 124V92l60-18 50 14 50-26 60 24v38z"/></svg></div>
    <div class="sl s3" aria-hidden="true"><svg viewBox="0 0 220 124" preserveAspectRatio="none"><circle class="sun" cx="46" cy="30" r="11"/><circle class="star" cx="110" cy="22" r="1.800"/><circle class="star" cx="150" cy="40" r="1.400"/><circle class="star" cx="190" cy="20" r="1.800"/><circle class="star" cx="86" cy="50" r="1.300"/><path class="hill" d="M0 124V96h24V70h22v26h18V58h26v38h20V78h24v18h22V64h24v32h40v28z"/></svg></div>
  </div>
  <div class="nav" role="tablist" aria-label="장면 선택"><button class="on" type="button" role="tab">아침 바다</button><button type="button" role="tab">노을</button><button type="button" role="tab">밤 도시</button></div>
</div>`,
    run(el, ctx) {
      const sl = [...el.querySelectorAll('.sl')], bt = [...el.querySelectorAll('.nav button')];
      let user = false;
      const go = i => {
        sl.forEach((s, k) => { s.classList.toggle('on', k === i); s.setAttribute('aria-hidden', k !== i); });
        bt.forEach((b, k) => { b.classList.toggle('on', k === i); b.setAttribute('aria-selected', k === i); });
      };
      bt.forEach((b, i) => ctx.on(b, 'click', () => { user = true; go(i); }));
      ctx.timeout(() => { if (!user) go(1); }, 800);
      ctx.timeout(() => { if (!user) go(2); }, 3000);
    }
  },
  {
    id: 'mo21',
    ko: '켄 번즈',
    en: 'Ken Burns effect',
    pair: 'mo02',
    desc: '패럴랙스와 달리 스크롤 없이 사진이 시간에 따라 천천히 확대돼요.',
    prompt: '「켄 번즈(Ken Burns effect)」 효과를 만들어 줘. 정지 사진을 overflow: hidden 틀 안에서 scale 1→1.25, translate(-5%, -4%)로 7초 동안 ease-in-out으로 아주 천천히 확대·이동하고 왕복 반복해. 패럴랙스와 헷갈리지 않게 스크롤에 연결하지는 마. 일시정지 버튼을 두고 prefers-reduced-motion이면 멈춰 줘.',
    css: `
.d-mo21 .box{display:grid;justify-items:center;gap:8px}
.d-mo21 .fr{position:relative;width:220px;height:140px;border-radius:14px;overflow:hidden;box-shadow:var(--shadow);background:var(--surface)}
.d-mo21 .ph{position:absolute;inset:0;transform-origin:70% 40%;background:linear-gradient(180deg,var(--accent-soft),var(--surface));animation:mo21-kb 7s ease-in-out infinite alternate;will-change:transform}
.d-mo21 .fr.paused .ph{animation-play-state:paused}
.d-mo21 .ph svg{position:absolute;inset:0;width:100%;height:100%}
.d-mo21 .sun{fill:var(--warn)}
.d-mo21 .far{fill:var(--accent);opacity:.3}
.d-mo21 .near{fill:var(--accent);opacity:.65}
.d-mo21 .lake{fill:var(--accent);opacity:.2}
.d-mo21 .tree{fill:var(--success)}
.d-mo21 .hut{fill:var(--surface);stroke:var(--text);stroke-width:1.2}
.d-mo21 .bird{fill:none;stroke:var(--text);stroke-width:1.3;stroke-linecap:round;opacity:.7}
.d-mo21 .pz{position:absolute;right:8px;bottom:8px;width:28px;height:28px;border-radius:50%;border:0;background:var(--surface);color:var(--text);box-shadow:var(--shadow);display:grid;place-items:center;cursor:pointer;padding:0}
.d-mo21 .cap{font-size:11px;font-weight:600;color:var(--muted);line-height:16px}
@keyframes mo21-kb{from{transform:scale(1) translate(0,0)}to{transform:scale(1.25) translate(-5%,-4%)}}
`,
    html: `<div class="box">
  <div class="fr">
    <div class="ph"><svg viewBox="0 0 220 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <circle class="sun" cx="170" cy="36" r="13"/>
      <path class="bird" d="M112 34q4-4 8 0q4-4 8 0M136 24q3-3 6 0q3-3 6 0"/>
      <path class="far" d="M0 140V78l36-26 30 20 42-40 40 34 30-18 42 30v62z"/>
      <path class="near" d="M0 140V98l44-24 38 22 46-30 48 28 44-16v62z"/>
      <path class="lake" d="M0 140v-20h220v20z"/>
      <path class="tree" d="M30 118l8-20 8 20zM44 120l7-17 7 17zM104 118l7-18 7 18z"/>
      <path class="hut" d="M144 116v-12l10-8 10 8v12z"/>
    </svg></div>
    <button class="pz" type="button" aria-label="움직임 일시정지" aria-pressed="false"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path class="i" d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg></button>
  </div>
  <div class="cap">멈춘 사진 · 7초 동안 천천히 다가가요</div>
</div>`,
    run(el, ctx) {
      const fr = el.querySelector('.fr'), pz = el.querySelector('.pz'), ic = el.querySelector('.pz .i');
      ctx.on(pz, 'click', () => {
        const p = fr.classList.toggle('paused');
        ic.setAttribute('d', p ? 'M7 4l13 8-13 8z' : 'M6 4h4v16H6zM14 4h4v16h-4z');
        pz.setAttribute('aria-pressed', p); pz.setAttribute('aria-label', p ? '움직임 재생' : '움직임 일시정지');
      });
    }
  },
  {
    id: 'mo22',
    ko: '선 그리기',
    en: 'Line drawing',
    desc: '선이 펜으로 그리듯 처음부터 끝까지 이어 그려져요.',
    prompt: '「선 그리기(Line drawing)」 애니메이션을 만들어 줘. SVG path의 stroke-dasharray와 stroke-dashoffset을 선 길이로 맞춘 뒤 offset을 0까지 1.6초 동안 ease-in-out으로 줄여, 펜으로 그리듯 처음부터 끝까지 이어 그려. 선 굵기 2.5px·둥근 끝으로 하고, prefers-reduced-motion이면 완성된 그림을 바로 보여 줘.',
    css: `
.d-mo22 .pad{width:228px;padding:10px 10px 9px;border-radius:16px;background:var(--surface);box-shadow:var(--shadow);display:grid;gap:4px;cursor:pointer;border:0;font-family:inherit;text-align:left}
.d-mo22 svg{display:block;width:100%;height:116px}
.d-mo22 .ln{fill:none;stroke:var(--accent);stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}
.d-mo22 .ln.s{stroke:var(--warn)}
.d-mo22 .pen{fill:var(--text);opacity:0;transition:opacity .2s}
.d-mo22 .pen.on{opacity:1}
.d-mo22 .cap{display:flex;justify-content:space-between;align-items:center;font-size:12px;font-weight:700;color:var(--text);padding:0 2px}
.d-mo22 .cap span{font-size:11px;font-weight:600;color:var(--muted)}
`,
    html: `<button class="pad" type="button" aria-label="선 그리기 다시 보기">
  <svg viewBox="0 0 220 116" aria-hidden="true">
    <path class="ln" d="M12 92H56L88 42l18 28 26-42 44 64h32"/>
    <path class="ln s" d="M190 34a12 12 0 1 1-24 0a12 12 0 1 1 24 0"/>
    <path class="ln" d="M30 106q10-8 20 0t20 0t20 0t20 0t20 0t20 0t20 0"/>
    <circle class="pen" r="4"/>
  </svg>
  <span class="cap">한라산 일출 코스<span class="st">그리는 중…</span></span>
</button>`,
    run(el, ctx) {
      const paths = [...el.querySelectorAll('.ln')], pen = el.querySelector('.pen'), st = el.querySelector('.st');
      const lens = paths.map(p => p.getTotalLength());
      const total = lens.reduce((a, b) => a + b, 0);
      let gen = 0;
      const set = d => {
        let acc = 0;
        paths.forEach((p, i) => {
          const part = Math.max(0, Math.min(lens[i], d - acc));
          p.style.strokeDasharray = lens[i];
          p.style.strokeDashoffset = lens[i] - part;
          p.style.visibility = part > 0 ? 'visible' : 'hidden';
          if (d >= acc && d <= acc + lens[i]) {
            const pt = p.getPointAtLength(part);
            pen.setAttribute('cx', pt.x); pen.setAttribute('cy', pt.y);
          }
          acc += lens[i];
        });
      };
      const draw = delay => {
        const g = ++gen;
        set(0); pen.classList.remove('on'); st.textContent = '그리는 중…';
        ctx.timeout(() => {
          if (g !== gen) return;
          pen.classList.add('on');
          ctx.loop(t => {
            if (g !== gen) return false;
            const p = Math.min(1, t / 1600);
            set(total * mo2Ease(p));
            if (p >= 1) { pen.classList.remove('on'); st.textContent = '완성 · 눌러서 다시'; return false; }
          });
        }, delay);
      };
      draw(150);
      ctx.on(el.querySelector('.pad'), 'click', () => draw(60));
    }
  }
]);
