(function () {
  // 공통: 미니 화면 자동 스크롤(사용자가 손대면 즉시 멈춤)
  const ease = t => (t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  const autoScroll = (sc, ctx, steps) => {
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
          sc.scrollTop = from + (to - from) * ease(p);
          if (p >= 1) { next(); return false; }
        });
      }, s.wait || 0);
    };
    next();
  };

  UIDEX.add('motion', [
    {
      id: 'mo01',
      ko: '페이드 업',
      en: 'Fade up',
      desc: '스크롤해서 화면에 들어온 블록이 아래에서 살짝 떠오르며 나타나요.',
      prompt: '「페이드 업(Fade up)」 등장 효과를 만들어 줘. 콘텐츠 블록이 뷰포트에 20% 들어오면 opacity 0→1, translateY 20px→0으로 500ms 동안 cubic-bezier(.2,.8,.2,1)로 떠올라. IntersectionObserver로 한 번만 실행하고, prefers-reduced-motion이면 이동 없이 바로 보여 줘.',
      css: `
.d-mo01 .sc{position:relative;height:100%;overflow:auto;padding:14px 14px 20px;scrollbar-width:none}
.d-mo01 .sc::-webkit-scrollbar{display:none}
.d-mo01 .hd{font-size:13px;font-weight:700;margin:0 0 10px;color:var(--text)}
.d-mo01 .blk{display:flex;gap:10px;align-items:center;padding:10px;margin-bottom:8px;border-radius:12px;background:var(--surface-2);opacity:0;transform:translateY(20px);transition:opacity .5s ease-out,transform .5s cubic-bezier(.2,.8,.2,1)}
.d-mo01 .blk.in{opacity:1;transform:none}
.d-mo01 .ui-thumb{width:38px;height:38px;flex:none}
.d-mo01 .tx{flex:1;display:grid;gap:4px}
.d-mo01 .tx b{font-size:12px;font-weight:700;color:var(--text)}
.d-mo01 .tx span{font-size:11px;color:var(--muted)}
`,
      html: `<div class="ui-phone"><div class="sc">
  <div class="hd">제주 여행 가이드</div>
  <div class="blk"><div class="ui-thumb"></div><div class="tx"><b>1일차 · 협재 해변</b><span>에메랄드 바다 산책</span></div></div>
  <div class="blk"><div class="ui-thumb"></div><div class="tx"><b>2일차 · 오름 트레킹</b><span>일출 명소 코스</span></div></div>
  <div class="blk"><div class="ui-thumb"></div><div class="tx"><b>3일차 · 동문시장</b><span>먹거리 투어</span></div></div>
  <div class="blk"><div class="ui-thumb"></div><div class="tx"><b>4일차 · 카페 거리</b><span>오션뷰 브런치</span></div></div>
  <div class="blk"><div class="ui-thumb"></div><div class="tx"><b>추천 숙소</b><span>1박 89,000원부터</span></div></div>
</div></div>`,
      run(el, ctx) {
        const sc = el.querySelector('.sc'), blks = [...el.querySelectorAll('.blk')];
        const check = () => blks.forEach(b => { if (b.offsetTop < sc.scrollTop + sc.clientHeight - 24) b.classList.add('in'); });
        ctx.on(sc, 'scroll', check, { passive: true });
        ctx.timeout(check, 250);
        autoScroll(sc, ctx, [{ wait: 900, dur: 1400, to: 'max' }]);
      }
    },
    {
      id: 'mo02',
      ko: '패럴랙스',
      en: 'Parallax',
      desc: '스크롤할 때 배경은 느리게, 앞의 내용은 빠르게 움직여 깊이감이 생겨요.',
      prompt: '「패럴랙스(Parallax)」 히어로를 만들어 줘. 스크롤하면 화면에 보이는 속도가 먼 산 0.3배, 가까운 산 0.6배, 제목 1배가 되게 해. 각 산 레이어를 스크롤량의 0.7배·0.4배만큼 translate3d로 되밀고 requestAnimationFrame으로 갱신하며, prefers-reduced-motion이면 모든 레이어를 고정해 줘.',
      css: `
.d-mo02 .sc{height:100%;overflow:auto;scrollbar-width:none}
.d-mo02 .sc::-webkit-scrollbar{display:none}
.d-mo02 .hro{position:relative;height:150px;overflow:hidden;background:linear-gradient(180deg,var(--accent-soft),var(--surface))}
.d-mo02 .lay{position:absolute;left:0;right:0;will-change:transform}
.d-mo02 .sun{top:22px;left:auto;right:30px;width:26px;height:26px;border-radius:50%;background:var(--warn);opacity:.85}
.d-mo02 .far{bottom:0;height:90px}
.d-mo02 .near{bottom:-2px;height:70px}
.d-mo02 .far path{fill:var(--accent);opacity:.28}
.d-mo02 .near path{fill:var(--accent);opacity:.7}
.d-mo02 .ttl{top:30px;left:16px;right:auto;color:var(--text)}
.d-mo02 .ttl b{display:block;font-size:17px;font-weight:800;letter-spacing:-.02em}
.d-mo02 .ttl span{font-size:11px;color:var(--muted)}
.d-mo02 .body{padding:12px 14px 40px;background:var(--surface);display:grid;gap:8px}
.d-mo02 .row{display:flex;gap:8px;align-items:center}
.d-mo02 .row .ui-thumb{width:34px;height:34px;flex:none}
.d-mo02 .row .ui-line{flex:1}
.d-mo02 .tag{position:absolute;right:8px;bottom:8px;z-index:3;font-size:11px;font-weight:700;padding:4px 8px;border-radius:999px;background:var(--surface);color:var(--muted);box-shadow:var(--shadow)}
`,
      html: `<div class="ui-phone"><div class="sc">
  <div class="hro">
    <div class="lay sun"></div>
    <svg class="lay far" viewBox="0 0 220 90" preserveAspectRatio="none"><path d="M0 90V52l34-26 30 22 40-38 38 30 30-20 48 34v36z"/></svg>
    <div class="lay ttl"><b>한라산 트레킹</b><span>새벽 5시 출발 코스</span></div>
    <svg class="lay near" viewBox="0 0 220 70" preserveAspectRatio="none"><path d="M0 70V40l40-22 36 20 44-30 50 28 50-18v52z"/></svg>
  </div>
  <div class="body">
    <div class="row"><div class="ui-thumb"></div><div class="ui-line"></div></div>
    <div class="row"><div class="ui-thumb"></div><div class="ui-line" style="width:70%"></div></div>
    <div class="row"><div class="ui-thumb"></div><div class="ui-line"></div></div>
    <div class="row"><div class="ui-thumb"></div><div class="ui-line" style="width:60%"></div></div>
  </div>
</div><span class="tag">배경 0.3배속</span></div>`,
      run(el, ctx) {
        const sc = el.querySelector('.sc');
        const far = el.querySelector('.far'), near = el.querySelector('.near'), sun = el.querySelector('.sun');
        const upd = () => {
          const y = sc.scrollTop;
          far.style.transform = `translate3d(0,${y * .7}px,0)`;
          sun.style.transform = `translate3d(0,${y * .8}px,0)`;
          near.style.transform = `translate3d(0,${y * .4}px,0)`;
        };
        ctx.on(sc, 'scroll', upd, { passive: true });
        upd();
        autoScroll(sc, ctx, [{ wait: 400, dur: 1500, to: 85 }, { wait: 500, dur: 1200, to: 0 }]);
      }
    },
    {
      id: 'mo03',
      ko: '스티키 헤더',
      en: 'Sticky header',
      desc: '내용을 내려도 탭·검색 같은 헤더가 위에 딱 붙어 따라와요.',
      prompt: '「스티키 헤더(Sticky header)」를 만들어 줘. 배너를 지나 스크롤하면 카테고리 탭 바가 position: sticky; top: 0으로 상단에 고정되고, 붙는 순간 그림자와 하단 경계선이 200ms 동안 나타나. 높이는 36~48px로 두고, 탭은 role="tablist"로 키보드 좌우 이동이 되게 해 줘.',
      css: `
.d-mo03 .sc{height:100%;overflow:auto;scrollbar-width:none;position:relative}
.d-mo03 .sc::-webkit-scrollbar{display:none}
.d-mo03 .ban{margin:10px 12px 8px;height:62px;border-radius:12px;background:var(--accent);color:var(--accent-text);padding:12px 14px;display:flex;flex-direction:column;justify-content:center}
.d-mo03 .ban b{font-size:14px;font-weight:800}
.d-mo03 .ban span{font-size:11px;opacity:.85}
.d-mo03 .hd{position:sticky;top:0;z-index:2;display:flex;gap:14px;padding:0 14px;height:36px;align-items:center;background:var(--surface);border-bottom:1px solid transparent;transition:box-shadow .2s,border-color .2s}
.d-mo03 .hd.stuck{box-shadow:0 6px 14px -8px rgba(0,0,0,.35);border-color:var(--line)}
.d-mo03 .hd span{font-size:12px;color:var(--muted);font-weight:600;position:relative;padding:9px 0}
.d-mo03 .hd span.on{color:var(--text)}
.d-mo03 .hd span.on::after{content:"";position:absolute;left:0;right:0;bottom:2px;height:2px;border-radius:2px;background:var(--text)}
.d-mo03 .pin{margin-left:auto;font-size:11px!important;color:var(--accent)!important;opacity:0;transition:opacity .2s}
.d-mo03 .hd.stuck .pin{opacity:1}
.d-mo03 .it{display:flex;gap:10px;align-items:center;padding:8px 14px}
.d-mo03 .it .ui-thumb{width:40px;height:40px;flex:none}
.d-mo03 .it div:last-child{flex:1;display:grid;gap:3px}
.d-mo03 .it b{font-size:12px;color:var(--text)}
.d-mo03 .it small{font-size:11px;color:var(--muted)}
`,
      html: `<div class="ui-phone"><div class="sc">
  <div class="ban"><b>겨울 숙소 특가</b><span>최대 40% 할인 · 이번 주까지</span></div>
  <div class="hd"><span class="on">전체</span><span>호텔</span><span>펜션</span><span>캠핑</span><span class="pin">고정됨</span></div>
  <div class="it"><div class="ui-thumb"></div><div><b>애월 오션뷰 펜션</b><small>1박 129,000원</small></div></div>
  <div class="it"><div class="ui-thumb"></div><div><b>서귀포 스파 호텔</b><small>1박 189,000원</small></div></div>
  <div class="it"><div class="ui-thumb"></div><div><b>성산 글램핑</b><small>1박 99,000원</small></div></div>
  <div class="it"><div class="ui-thumb"></div><div><b>함덕 감성 숙소</b><small>1박 79,000원</small></div></div>
  <div class="it"><div class="ui-thumb"></div><div><b>중문 리조트</b><small>1박 219,000원</small></div></div>
</div></div>`,
      run(el, ctx) {
        const sc = el.querySelector('.sc'), hd = el.querySelector('.hd');
        const upd = () => hd.classList.toggle('stuck', hd.getBoundingClientRect().top - sc.getBoundingClientRect().top <= 0.5 && sc.scrollTop > 10);
        ctx.on(sc, 'scroll', upd, { passive: true });
        autoScroll(sc, ctx, [{ wait: 400, dur: 1500, to: 190 }]);
      }
    },
    {
      id: 'mo04',
      ko: '스케일 인',
      en: 'Scale in',
      desc: '카드·창이 살짝 작은 크기에서 커지며 또렷하게 나타나요.',
      prompt: '「스케일 인(Scale in)」 등장 효과를 만들어 줘. 버튼을 누르면 배경이 200ms 동안 어두워지고, 카드가 scale 0.85·opacity 0에서 1로 320ms 동안 cubic-bezier(.2,.8,.2,1)로 커지며 나타나. 닫을 땐 180ms로 빠르게 줄이고, 열리면 카드 안 첫 버튼으로 포커스를 옮겨 줘.',
      css: `
.d-mo04 .ui-phone{display:flex;flex-direction:column;padding:14px;gap:8px}
.d-mo04 .ttl{font-size:13px;font-weight:700;color:var(--text)}
.d-mo04 .ui-line.s{width:60%}
.d-mo04 .open{margin-top:auto;transition:transform .12s}
.d-mo04 .open.press{transform:scale(.95)}
.d-mo04 .dim{position:absolute;inset:0;background:rgba(10,14,20,.45);opacity:0;pointer-events:none;transition:opacity .2s ease-out;display:grid;place-items:center}
.d-mo04 .dim.on{opacity:1;pointer-events:auto;cursor:pointer}
.d-mo04 .cd{width:160px;padding:16px 14px 12px;border-radius:16px;background:var(--surface);box-shadow:var(--shadow);text-align:center;transform:scale(.85);opacity:0;transition:transform .18s ease-in,opacity .18s ease-in;cursor:default}
.d-mo04 .dim.on .cd{transform:scale(1);opacity:1;transition:transform .32s cubic-bezier(.2,.8,.2,1),opacity .32s ease-out}
.d-mo04 .ic{width:38px;height:38px;margin:0 auto 8px;border-radius:12px;background:var(--accent-soft);color:var(--accent);display:grid;place-items:center}
.d-mo04 .cd b{display:block;font-size:13px;color:var(--text)}
.d-mo04 .cd small{display:block;font-size:11px;color:var(--muted);margin:3px 0 10px}
.d-mo04 .cd .ui-btn{width:100%;height:30px}
`,
      html: `<div class="ui-phone">
  <div class="ttl">이번 주 혜택</div>
  <div class="ui-line"></div><div class="ui-line s"></div><div class="ui-line"></div>
  <button class="ui-btn open" type="button">쿠폰함 열기</button>
  <div class="dim"><div class="cd" role="dialog" aria-label="쿠폰 도착">
    <div class="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M12 8c-2-4-6-4-6-1s6 1 6 1zm0 0c2-4 6-4 6-1s-6 1-6 1z"/></svg></div>
    <b>쿠폰 3장 도착</b><small>최대 5,000원 할인</small>
    <button class="ui-btn get" type="button">받기</button>
  </div></div>
</div>`,
      run(el, ctx) {
        const btn = el.querySelector('.open'), dim = el.querySelector('.dim'), card = el.querySelector('.cd');
        const open = () => dim.classList.add('on');
        const close = () => dim.classList.remove('on');
        ctx.on(btn, 'click', open);
        ctx.on(dim, 'click', e => { if (!card.contains(e.target) || e.target.closest('.get')) close(); });
        ctx.timeout(() => btn.classList.add('press'), 500);
        ctx.timeout(() => { btn.classList.remove('press'); open(); }, 640);
      }
    },
    {
      id: 'mo05',
      ko: '텍스트 리빌',
      en: 'Text reveal',
      desc: '제목이 단어 단위로 아래에서 차례로 밀려 올라오며 드러나요.',
      prompt: '「텍스트 리빌(Text reveal)」 제목을 만들어 줘. 각 줄을 overflow: hidden으로 감싸고 단어마다 translateY 100%→0으로 600ms, 단어 간 70ms 지연을 두고 ease-out으로 올라오게 해. 화면 낭독기용으로 원문 전체는 aria-label에 넣고 쪼갠 span은 aria-hidden 처리해 줘.',
      css: `
.d-mo05 .wr{display:grid;gap:2px;width:240px;cursor:pointer}
.d-mo05 .ln{overflow:hidden;line-height:1.25;padding-bottom:2px}
.d-mo05 .w{display:inline-block;transform:translateY(105%);font-size:24px;font-weight:800;letter-spacing:-.03em;color:var(--text);margin-right:.24em}
.d-mo05 .ln.acc .w{color:var(--accent)}
.d-mo05 .on .w{transform:none;transition:transform .6s cubic-bezier(.2,.8,.2,1)}
.d-mo05 .sub{margin-top:10px;font-size:12px;color:var(--muted);opacity:0;transform:translateY(6px);transition:opacity .4s,transform .4s}
.d-mo05 .on .sub{opacity:1;transform:none;transition-delay:.9s}
`,
      html: `<div class="wr" aria-label="가볍게 떠나는 제주 3박 4일">
  <div class="ln" aria-hidden="true"><span class="w">가볍게</span><span class="w">떠나는</span></div>
  <div class="ln acc" aria-hidden="true"><span class="w">제주</span><span class="w">3박</span><span class="w">4일</span></div>
  <div class="sub">항공 + 숙소 묶음 329,000원부터</div>
</div>`,
      run(el, ctx) {
        const wrap = el.querySelector('.wr'), ws = [...el.querySelectorAll('.w')];
        const go = () => {
          wrap.classList.remove('on');
          ws.forEach((w, i) => { w.style.transitionDelay = (i * 70) + 'ms'; });
          void wrap.offsetWidth;
          wrap.classList.add('on');
        };
        ctx.timeout(go, 120);
        ctx.on(wrap, 'click', go);
      }
    },
    {
      id: 'mo06',
      ko: '스태거',
      en: 'Stagger',
      desc: '여러 요소가 한꺼번에가 아니라 짧은 간격을 두고 차례차례 등장해요.',
      prompt: '「스태거(Stagger)」 등장 효과를 만들어 줘. 카테고리 아이콘 8개가 각각 scale 0.6·opacity 0에서 1로 360ms 동안 나타나되, 인덱스마다 70ms씩 지연을 줘서 왼쪽 위부터 차례로 퍼지게 해. 전체 연출은 1초를 넘기지 말고, prefers-reduced-motion이면 지연 없이 한 번에 보여 줘.',
      css: `
.d-mo06 .gd{display:grid;grid-template-columns:repeat(4,52px);gap:12px 10px;cursor:pointer}
.d-mo06 .t{display:grid;justify-items:center;gap:5px;opacity:0;transform:scale(.6) translateY(8px)}
.d-mo06 .on .t{opacity:1;transform:none;transition:opacity .36s ease-out,transform .36s cubic-bezier(.2,.8,.2,1)}
.d-mo06 .ic{width:44px;height:44px;border-radius:14px;background:var(--surface);box-shadow:var(--shadow);display:grid;place-items:center;color:var(--accent)}
.d-mo06 .t span{font-size:11px;color:var(--text);font-weight:600}
.d-mo06 .cap{grid-column:1/-1;text-align:center;font-size:11px;color:var(--muted);margin-top:2px}
`,
      html: `<div class="gd"></div>`,
      run(el, ctx) {
        const grid = el.querySelector('.gd');
        const P = {
          '숙소': '<path d="M3 11l9-7 9 7v9H3z"/><path d="M9 20v-6h6v6"/>',
          '항공': '<path d="M2 14l20-8-6 14-3-6z"/>',
          '렌터카': '<path d="M4 16V11l2-5h12l2 5v5z"/><circle cx="8" cy="16" r="2"/><circle cx="16" cy="16" r="2"/>',
          '투어': '<circle cx="12" cy="10" r="3"/><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/>',
          '맛집': '<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M16 3c-2 2-2 6 0 8v10"/>',
          '캠핑': '<path d="M3 20L12 4l9 16zM12 4v16M9 20l3-5 3 5"/>',
          '티켓': '<path d="M3 8a2 2 0 0 0 0 4v4h18v-4a2 2 0 0 1 0-4V4H3z"/>',
          '쇼핑': '<path d="M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2"/>'
        };
        grid.innerHTML = Object.keys(P).map((k, i) =>
          `<div class="t"><div class="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${P[k]}</svg></div><span>${k}</span></div>`
        ).join('') + '<div class="cap">70ms 간격으로 차례대로 · 눌러서 다시</div>';
        const ts = [...grid.querySelectorAll('.t')];
        ts.forEach((t, i) => { t.style.transitionDelay = (i * 70) + 'ms'; });
        const go = () => { grid.classList.remove('on'); void grid.offsetWidth; grid.classList.add('on'); };
        ctx.timeout(go, 120);
        ctx.on(grid, 'click', go);
      }
    },
    {
      id: 'mo07',
      ko: '스크롤 진행 바',
      en: 'Scroll progress',
      desc: '글을 얼마나 읽었는지 상단 막대가 스크롤에 맞춰 채워져요.',
      prompt: '「스크롤 진행 바(Scroll progress)」를 만들어 줘. 화면 맨 위에 높이 3px 파란 막대를 두고, 스크롤 위치÷(전체 높이−화면 높이) 비율만큼 transform: scaleX로 실시간 채워. 오른쪽에 읽은 퍼센트 숫자도 표시하고, 막대엔 role="progressbar"와 aria-valuenow를 갱신해 줘.',
      css: `
.d-mo07 .ui-phone{display:flex;flex-direction:column}
.d-mo07 .top{position:relative;flex:none;height:34px;display:flex;align-items:center;justify-content:space-between;padding:0 12px;border-bottom:1px solid var(--line);background:var(--surface)}
.d-mo07 .top b{font-size:12px;color:var(--text)}
.d-mo07 .pct{font-size:11px;font-weight:700;color:var(--accent);font-variant-numeric:tabular-nums}
.d-mo07 .pbar{position:absolute;left:0;right:0;bottom:-2px;height:3px;background:var(--accent);transform-origin:left;transform:scaleX(0);border-radius:0 2px 2px 0}
.d-mo07 .sc{flex:1;overflow:auto;padding:12px 14px 16px;display:grid;gap:8px;align-content:start;scrollbar-width:none}
.d-mo07 .sc::-webkit-scrollbar{display:none}
.d-mo07 .h{font-size:14px;font-weight:800;color:var(--text);letter-spacing:-.02em}
.d-mo07 .ui-thumb{height:56px}
.d-mo07 .s{width:72%}
.d-mo07 .m{width:88%}
`,
      html: `<div class="ui-phone">
  <div class="top"><b>여행 매거진</b><span class="pct">0%</span><i class="pbar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></i></div>
  <div class="sc">
    <div class="h">겨울 강릉, 하루 코스 총정리</div>
    <div class="ui-line"></div><div class="ui-line m"></div><div class="ui-line s"></div>
    <div class="ui-thumb"></div>
    <div class="ui-line"></div><div class="ui-line m"></div><div class="ui-line"></div><div class="ui-line s"></div>
    <div class="ui-thumb"></div>
    <div class="ui-line"></div><div class="ui-line m"></div><div class="ui-line s"></div>
  </div>
</div>`,
      run(el, ctx) {
        const sc = el.querySelector('.sc'), bar = el.querySelector('.pbar'), pct = el.querySelector('.pct');
        const upd = () => {
          const max = sc.scrollHeight - sc.clientHeight;
          const p = max > 0 ? sc.scrollTop / max : 0;
          bar.style.transform = `scaleX(${p})`;
          const v = Math.round(p * 100);
          pct.textContent = v + '%';
          bar.setAttribute('aria-valuenow', v);
        };
        ctx.on(sc, 'scroll', upd, { passive: true });
        upd();
        autoScroll(sc, ctx, [{ wait: 350, dur: 1700, to: 'max' }]);
      }
    },
    {
      id: 'mo08',
      ko: '스프링',
      en: 'Spring',
      desc: '당겼다 놓으면 용수철처럼 출렁이다가 제자리에 멈춰요.',
      prompt: '「스프링(Spring)」 모션을 만들어 줘. 공을 끌어당겼다 놓으면 stiffness 180, damping 12, mass 1 물리값으로 2~3번 출렁인 뒤 원래 자리에 멈추게 해. 시간 고정 이징 대신 매 프레임 속도를 계산하고, 포인터 드래그와 키보드 화살표로도 움직일 수 있게 해 줘.',
      css: `
.d-mo08 .box{position:relative;width:250px;height:120px}
.d-mo08 .wall{position:absolute;left:0;top:30px;width:6px;height:60px;border-radius:3px;background:var(--line)}
.d-mo08 svg.spr{position:absolute;left:6px;top:40px;height:40px;overflow:visible}
.d-mo08 svg.spr polyline{fill:none;stroke:var(--muted);stroke-width:2;stroke-linejoin:round;stroke-linecap:round}
.d-mo08 .rest{position:absolute;top:24px;width:2px;height:72px;margin-left:-1px;background:repeating-linear-gradient(var(--line) 0 4px,transparent 4px 8px)}
.d-mo08 .ball{position:absolute;top:40px;width:40px;height:40px;margin-left:-20px;border-radius:50%;background:var(--accent);box-shadow:0 6px 16px -4px color-mix(in srgb,var(--accent) 60%,transparent);cursor:grab;touch-action:none}
.d-mo08 .ball:active{cursor:grabbing}
.d-mo08 .lab{position:absolute;left:0;right:0;bottom:0;text-align:center;font-size:11px;color:var(--muted)}
.d-mo08 .hint{position:absolute;left:0;right:0;top:0;text-align:center;font-size:11px;font-weight:700;color:var(--accent);transition:opacity .3s}
`,
      html: `<div class="box">
  <div class="hint">당기는 중…</div>
  <div class="wall"></div>
  <svg class="spr"><polyline/></svg>
  <div class="rest"></div>
  <div class="ball" role="slider" tabindex="0" aria-label="스프링 공" aria-valuenow="0"></div>
  <div class="lab">stiffness 180 · damping 12</div>
</div>`,
      run(el, ctx) {
        const box = el.querySelector('.box'), ball = el.querySelector('.ball'), svg = el.querySelector('.spr'), pl = svg.querySelector('polyline'), hint = el.querySelector('.hint');
        const REST = 140, MIN = 60, MAX = 228;
        el.querySelector('.rest').style.left = REST + 'px';
        let x = REST, v = 0, dragging = false, sim = false;
        const draw = () => {
          ball.style.left = x + 'px';
          const len = Math.max(10, x - 20 - 6), n = 10, pts = ['0,20'];
          for (let i = 1; i < n; i++) pts.push(`${(len * i / n).toFixed(1)},${i % 2 ? 6 : 34}`);
          pts.push(`${len.toFixed(1)},20`);
          svg.setAttribute('width', len); pl.setAttribute('points', pts.join(' '));
        };
        const start = () => {
          if (sim) return; sim = true;
          let last = null;
          ctx.loop(t => {
            if (dragging) { sim = false; return false; }
            const dt = last == null ? 1 / 60 : Math.min(.032, (t - last) / 1000); last = t;
            const steps = 4, h = dt / steps;
            for (let i = 0; i < steps; i++) { const a = -180 * (x - REST) - 12 * v; v += a * h; x += v * h; }
            draw();
            if (Math.abs(v) < 2 && Math.abs(x - REST) < .3) { x = REST; v = 0; draw(); sim = false; return false; }
          });
        };
        draw();
        // 자동 시연: 오른쪽으로 당겼다가 놓기
        ctx.loop(t => {
          if (dragging) return false;
          const p = Math.min(1, t / 450);
          x = REST + 78 * (1 - Math.pow(1 - p, 3)); draw();
          if (p >= 1) {
            ctx.timeout(() => { hint.textContent = '놓기!'; start(); }, 120);
            ctx.timeout(() => { hint.textContent = '공을 직접 당겨 보세요'; }, 1600);
            return false;
          }
        });
        let ox = 0, sx = 0, lx = 0, lt = 0;
        ctx.on(ball, 'pointerdown', e => {
          dragging = true; ball.setPointerCapture(e.pointerId);
          sx = e.clientX; ox = x; lx = e.clientX; lt = performance.now(); v = 0;
        });
        ctx.on(ball, 'pointermove', e => {
          if (!dragging) return;
          x = Math.max(MIN, Math.min(MAX, ox + e.clientX - sx));
          const now = performance.now(); v = (e.clientX - lx) / Math.max(1, now - lt) * 1000; lx = e.clientX; lt = now;
          draw();
        });
        const up = () => { if (!dragging) return; dragging = false; v = Math.max(-1500, Math.min(1500, v)); start(); };
        ctx.on(ball, 'pointerup', up);
        ctx.on(ball, 'pointercancel', up);
        ctx.on(ball, 'keydown', e => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); x = Math.max(MIN, Math.min(MAX, x + (e.key === 'ArrowRight' ? 50 : -50))); v = 0; draw(); start(); }
        });
      }
    },
    {
      id: 'mo09',
      ko: '이징',
      en: 'Easing',
      desc: '같은 시간이라도 출발·도착 속도 곡선에 따라 움직임 느낌이 달라져요.',
      prompt: '「이징(Easing)」 비교 데모를 만들어 줘. 같은 1.6초 동안 linear, ease-in, ease-out, ease-in-out 네 가지 곡선으로 점이 왼쪽에서 오른쪽으로 왕복하게 하고 각 줄에 이름을 붙여. 등장은 ease-out, 퇴장은 ease-in을 권장한다는 설명과 prefers-reduced-motion 정지 처리를 넣어 줘.',
      css: `
.d-mo09 .list{display:grid;gap:12px;width:250px}
.d-mo09 .r{display:grid;grid-template-columns:78px 1fr;align-items:center;gap:8px}
.d-mo09 .r span{font-size:11px;font-weight:700;color:var(--muted);font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.d-mo09 .r.hl span{color:var(--accent)}
.d-mo09 .tr{position:relative;height:16px;border-radius:999px;background:var(--surface-2);box-shadow:inset 0 0 0 1px var(--line)}
.d-mo09 .dot{position:absolute;top:2px;left:2px;width:12px;height:12px;border-radius:50%;background:var(--muted);animation:mo09-go 2.2s infinite alternate}
.d-mo09 .r.hl .dot{background:var(--accent)}
.d-mo09 .l .dot{animation-timing-function:linear}
.d-mo09 .i .dot{animation-timing-function:ease-in}
.d-mo09 .o .dot{animation-timing-function:ease-out}
.d-mo09 .io .dot{animation-timing-function:ease-in-out}
@keyframes mo09-go{0%,14%{left:2px}86%,100%{left:calc(100% - 14px)}}
`,
      html: `<div class="list">
  <div class="r l"><span>linear</span><div class="tr"><i class="dot"></i></div></div>
  <div class="r i"><span>ease-in</span><div class="tr"><i class="dot"></i></div></div>
  <div class="r o hl"><span>ease-out</span><div class="tr"><i class="dot"></i></div></div>
  <div class="r io"><span>ease-in-out</span><div class="tr"><i class="dot"></i></div></div>
</div>`
    },
    {
      id: 'mo10',
      ko: '확대 전환',
      en: 'Zoom transition',
      desc: '누른 카드가 그 자리에서 커지며 상세 화면으로 자연스럽게 이어져요.',
      prompt: '「확대 전환(Zoom transition)」을 만들어 줘. 목록 카드를 누르면 카드의 위치·크기에서 시작해 전체 화면 상세로 450ms 동안 cubic-bezier(.2,.8,.2,1)로 커지는 FLIP 방식으로 이어지게 해. 뒤로 가기는 같은 경로로 줄어들고, 전환 후 상세 제목으로 포커스를 옮겨 줘.',
      css: `
.d-mo10 .ui-phone{padding:10px 12px}
.d-mo10 .hd{font-size:13px;font-weight:700;color:var(--text);margin:2px 0 8px}
.d-mo10 .g{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.d-mo10 .c{height:62px;border-radius:12px;position:relative;overflow:hidden;cursor:pointer;transition:transform .15s}
.d-mo10 .c.press{transform:scale(.96)}
.d-mo10 .c b{position:absolute;left:8px;bottom:6px;font-size:11px;color:#fff;font-weight:700;text-shadow:0 1px 3px rgba(0,0,0,.3)}
.d-mo10 .k0{background:linear-gradient(135deg,#4f8cff,#7bd3ff)}
.d-mo10 .k1{background:linear-gradient(135deg,#ff8a5b,#ffc46b)}
.d-mo10 .k2{background:linear-gradient(135deg,#34c38f,#9be15d)}
.d-mo10 .k3{background:linear-gradient(135deg,#8b6cff,#e58bff)}
.d-mo10 .dt{position:absolute;z-index:3;overflow:hidden;background:var(--surface);transition:all .45s cubic-bezier(.2,.8,.2,1);border-radius:12px}
.d-mo10 .dt .im{position:absolute;left:0;right:0;top:0;height:100%;transition:height .45s cubic-bezier(.2,.8,.2,1)}
.d-mo10 .dt.full .im{height:96px}
.d-mo10 .dt .im b{position:absolute;left:12px;bottom:8px;font-size:15px;color:#fff;font-weight:800;text-shadow:0 1px 3px rgba(0,0,0,.3)}
.d-mo10 .dt .info{position:absolute;left:12px;right:12px;top:104px;display:flex;align-items:center;justify-content:space-between;opacity:0;transition:opacity .25s}
.d-mo10 .dt.full .info{opacity:1;transition-delay:.25s}
.d-mo10 .dt .info span{font-size:12px;color:var(--text);font-weight:700}
.d-mo10 .dt .info small{display:block;font-size:11px;color:var(--muted);font-weight:500}
.d-mo10 .dt .ui-btn{height:30px;padding:0 12px;font-size:12px}
.d-mo10 .back{position:absolute;left:8px;top:8px;width:26px;height:26px;border-radius:50%;border:0;background:rgba(0,0,0,.28);color:#fff;display:grid;place-items:center;cursor:pointer;opacity:0;transition:opacity .2s}
.d-mo10 .dt.full .back{opacity:1;transition-delay:.3s}
`,
      html: `<div class="ui-phone">
  <div class="hd">추천 여행지</div>
  <div class="g">
    <div class="c k0" data-n="제주" data-p="3박 4일 329,000원"><b>제주</b></div>
    <div class="c k1" data-n="부산" data-p="2박 3일 219,000원"><b>부산</b></div>
    <div class="c k2" data-n="강릉" data-p="1박 2일 149,000원"><b>강릉</b></div>
    <div class="c k3" data-n="여수" data-p="2박 3일 199,000원"><b>여수</b></div>
  </div>
</div>`,
      run(el, ctx) {
        const ph = el.querySelector('.ui-phone'), cards = [...el.querySelectorAll('.c')];
        let dt = null, src = null;
        const rectOf = c => {
          const a = c.getBoundingClientRect(), b = ph.getBoundingClientRect();
          return { left: a.left - b.left, top: a.top - b.top, width: a.width, height: a.height };
        };
        const place = r => Object.assign(dt.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px' });
        const open = c => {
          if (dt) return;
          src = c;
          dt = document.createElement('div');
          dt.className = 'dt';
          dt.innerHTML = `<div class="im ${[...c.classList].find(k => /^k\d/.test(k))}"><b>${c.dataset.n}</b></div>
            <button class="back" type="button" aria-label="목록으로"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button>
            <div class="info"><span>${c.dataset.n} 여행<small>${c.dataset.p}</small></span><button class="ui-btn" type="button">예약</button></div>`;
          place(rectOf(c));
          ph.appendChild(dt);
          void dt.offsetWidth;
          dt.classList.add('full');
          Object.assign(dt.style, { left: '0px', top: '0px', width: ph.clientWidth + 'px', height: ph.clientHeight + 'px', borderRadius: '0px' });
          ctx.on(dt.querySelector('.back'), 'click', close);
        };
        const close = () => {
          if (!dt) return;
          const d = dt;
          d.classList.remove('full');
          place(rectOf(src)); d.style.borderRadius = '12px';
          ctx.timeout(() => { d.remove(); if (dt === d) dt = null; }, 460);
        };
        cards.forEach(c => ctx.on(c, 'click', () => open(c)));
        ctx.timeout(() => cards[0].classList.add('press'), 450);
        ctx.timeout(() => { cards[0].classList.remove('press'); open(cards[0]); }, 600);
      }
    }
  ]);
})();
