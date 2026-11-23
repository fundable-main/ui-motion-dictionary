(function () {
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const fmt = n => Math.round(n).toLocaleString('ko-KR');

  UIDEX.add('style', [
    {
      id: 'st01',
      ko: '카운트업',
      en: 'Count-up',
      pair: 'pr06',
      desc: '숫자가 0부터 목표값까지 빠르게 올라가며 성과를 강조해요.',
      prompt: '「카운트업(Count-up)」 숫자를 만들어 줘. 화면에 들어오면 0에서 목표값 12,480까지 1.2초 동안 ease-out으로 올라가고 천 단위 쉼표를 유지해. 숫자 폭이 흔들리지 않게 tabular-nums를 쓰고, prefers-reduced-motion이면 바로 최종값을 보여 줘.',
      css: `
.d-st01 .box{width:240px;text-align:center;cursor:pointer}
.d-st01 .lab{font-size:12px;color:var(--muted);font-weight:600}
.d-st01 .big{margin:4px 0 14px;font-size:40px;font-weight:800;letter-spacing:-.03em;color:var(--text);font-variant-numeric:tabular-nums;line-height:1.1}
.d-st01 .big small{font-size:18px;font-weight:700;margin-left:3px;color:var(--muted)}
.d-st01 .row{display:flex;gap:8px}
.d-st01 .s{flex:1;padding:9px 6px;border-radius:12px;background:var(--surface);box-shadow:var(--shadow)}
.d-st01 .s b{display:block;font-size:16px;font-weight:800;color:var(--accent);font-variant-numeric:tabular-nums}
.d-st01 .s > span{font-size:11px;color:var(--muted)}
`,
      html: `<div class="box" aria-live="off">
  <div class="lab">이번 달 누적 예약</div>
  <div class="big"><span class="n" data-to="12480" data-d="0">0</span><small>건</small></div>
  <div class="row">
    <div class="s"><b><span class="n" data-to="4.9" data-d="1">0.0</span></b><span>평균 별점</span></div>
    <div class="s"><b><span class="n" data-to="68" data-d="0">0</span>%</b><span>재구매율</span></div>
  </div>
</div>`,
      run(el, ctx) {
        const ns = [...el.querySelectorAll('.n')];
        const go = () => {
          ctx.loop(t => {
            const p = Math.min(1, Math.max(0, (t - 200) / 1200)), e = easeOut(p);
            ns.forEach(n => {
              const to = +n.dataset.to, d = +n.dataset.d;
              n.textContent = d ? (to * e).toFixed(d) : fmt(to * e);
            });
            if (p >= 1) return false;
          });
        };
        go();
        ctx.on(el.querySelector('.box'), 'click', go);
      }
    },
    {
      id: 'st02',
      ko: '타이핑',
      en: 'Typewriter',
      desc: '글자가 한 자씩 찍히고 지워지며 여러 문구를 번갈아 보여줘요.',
      prompt: '「타이핑(Typewriter)」 문구를 만들어 줘. 추천 검색어 3개를 글자당 70ms로 한 자씩 입력하고 1.2초 머문 뒤 35ms 간격으로 지우고 다음 문구로 넘어가게 해. 끝에 0.9초 주기로 깜빡이는 커서를 두고, 화면 낭독기에는 aria-live 없이 전체 문구 목록을 한 번만 읽히게 해 줘.',
      css: `
.d-st02 .box{width:244px}
.d-st02 .q{font-size:12px;color:var(--muted);font-weight:600;margin:0 0 8px 4px}
.d-st02 .pbar{display:flex;align-items:center;gap:10px;height:52px;padding:0 16px;border-radius:16px;background:var(--surface);box-shadow:var(--shadow)}
.d-st02 .pbar svg{flex:none;color:var(--accent)}
.d-st02 .tx{font-size:17px;font-weight:700;color:var(--text);white-space:nowrap;overflow:hidden;letter-spacing:-.02em}
.d-st02 .cur{flex:none;width:2px;height:20px;margin-left:-8px;border-radius:1px;background:var(--accent);animation:st02-blink .9s steps(1) infinite}
.d-st02 .dots{display:flex;gap:5px;justify-content:center;margin-top:12px}
.d-st02 .dots i{width:6px;height:6px;border-radius:50%;background:var(--line);transition:background .2s,width .2s}
.d-st02 .dots i.on{width:16px;border-radius:3px;background:var(--accent)}
@keyframes st02-blink{50%{opacity:0}}
`,
      html: `<div class="box">
  <div class="q">어디로 떠나볼까요?</div>
  <div class="pbar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><span class="tx" aria-label="제주 3박 4일 가족여행, 부산 오션뷰 숙소, 강릉 당일치기 코스"></span><i class="cur" aria-hidden="true"></i></div>
  <div class="dots"><i class="on"></i><i></i><i></i></div>
</div>`,
      run(el, ctx) {
        const tx = el.querySelector('.tx'), dots = [...el.querySelectorAll('.dots i')];
        const L = ['제주 3박 4일 가족여행', '부산 오션뷰 숙소', '강릉 당일치기 코스'];
        let k = 0;
        const type = (s, i) => {
          tx.textContent = s.slice(0, i);
          if (i < s.length) ctx.timeout(() => type(s, i + 1), 70);
          else ctx.timeout(() => del(s, s.length), 1200);
        };
        const del = (s, i) => {
          tx.textContent = s.slice(0, i);
          if (i > 0) ctx.timeout(() => del(s, i - 1), 35);
          else { k = (k + 1) % L.length; dots.forEach((d, j) => d.classList.toggle('on', j === k)); ctx.timeout(() => type(L[k], 1), 250); }
        };
        ctx.timeout(() => type(L[0], 1), 150);
      }
    },
    {
      id: 'st03',
      ko: '네온 사인',
      en: 'Neon sign',
      desc: '어두운 배경에서 글자가 깜빡이며 켜진 뒤 은은하게 빛나요.',
      prompt: '「네온 사인(Neon sign)」 글자를 만들어 줘. 어두운 배경 위 핑크·민트 글자에 text-shadow를 4겹(2·8·20·40px) 겹쳐 발광하게 하고, 처음 1초 동안 불규칙하게 깜빡이며 켜진 뒤 3초 주기로 은은하게 숨쉬게 해. prefers-reduced-motion이면 깜빡임 없이 켜진 상태로 보여 줘.',
      css: `
.d-st03 .sign{position:relative;width:236px;height:150px;border-radius:18px;background:radial-gradient(120% 90% at 50% 40%,#1c1433,#09070f);display:grid;place-content:center;text-align:center;box-shadow:0 10px 30px -10px rgba(0,0,0,.6)}
.d-st03 .frame{position:absolute;inset:12px;border-radius:12px;border:2px solid #4ff3e0;box-shadow:0 0 6px #4ff3e0,0 0 18px rgba(79,243,224,.6),inset 0 0 12px rgba(79,243,224,.4);opacity:.18;animation:st03-on 1.1s linear .45s forwards,st03-breath 3s ease-in-out 1.6s infinite}
.d-st03 .a{font-size:40px;font-weight:900;letter-spacing:.08em;color:#ffe6fb;line-height:1;text-shadow:0 0 2px #fff,0 0 8px #ff4fd8,0 0 20px #ff4fd8,0 0 40px #ff2bc2;opacity:.15;animation:st03-on 1.2s linear .25s forwards,st03-breath 3s ease-in-out 1.5s infinite}
.d-st03 .b{margin-top:8px;font-size:15px;font-weight:800;letter-spacing:.3em;color:#e2fffb;text-shadow:0 0 2px #fff,0 0 8px #4ff3e0,0 0 20px #4ff3e0,0 0 40px #19d3c0;opacity:.15;animation:st03-on 1s linear .7s forwards,st03-breath 3s ease-in-out 1.7s infinite}
@keyframes st03-on{0%{opacity:.15}8%{opacity:1}12%{opacity:.2}22%{opacity:1}26%{opacity:.3}34%{opacity:.25}40%{opacity:1}70%{opacity:.6}74%{opacity:1}100%{opacity:1}}
@keyframes st03-breath{0%,100%{opacity:1;filter:brightness(1)}50%{opacity:.82;filter:brightness(.85)}}
`,
      html: `<div class="sign"><div class="frame"></div><div class="a">OPEN</div><div class="b">심야 포차</div></div>`
    },
    {
      id: 'st04',
      ko: '그라데이션 글자',
      en: 'Gradient text',
      desc: '글자 안에 여러 색이 섞여 흐르듯 움직여 시선을 끌어요.',
      prompt: '「그라데이션 글자(Gradient text)」 헤드라인을 만들어 줘. 코랄→오렌지→핑크→보라 4색 선형 그라데이션을 background-clip: text로 글자에 입히고, background-size 300%로 4초 주기 linear 무한 흐르게 해. 그라데이션 미지원 브라우저용 단색 color를 먼저 지정하고 큰 제목이라 명도 대비 3:1 이상을 지켜 줘.',
      css: `
.d-st04 .box{text-align:center;width:244px}
.d-st04 .eye{display:inline-block;font-size:11px;font-weight:700;color:var(--muted);letter-spacing:.12em;margin-bottom:6px}
.d-st04 .g{display:block;font-size:44px;font-weight:900;letter-spacing:-.04em;line-height:1.08;color:#ff5f6d;background:linear-gradient(90deg,#ff5f6d,#ff9a3c,#ff4fa8,#8a5cff,#ff5f6d);background-size:300% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:st04-flow 4s linear infinite}
.d-st04 .g.s{font-size:22px;letter-spacing:-.02em;animation-delay:-.6s}
@keyframes st04-flow{from{background-position:0% 50%}to{background-position:300% 50%}}
`,
      html: `<div class="box"><span class="eye">SUMMER SALE</span><span class="g">여름 세일</span><span class="g s">최대 70% 할인</span></div>`
    },
    {
      id: 'st05',
      ko: '3D 입체',
      en: '3D extrude',
      desc: '글자 뒤로 그림자를 겹겹이 쌓아 튀어나온 입체 글자처럼 보여요.',
      prompt: '「3D 입체(3D extrude)」 글자를 만들어 줘. 1px씩 어긋난 text-shadow를 10겹 쌓아 두께를 만들고, 등장 시 0겹에서 10겹까지 0.7초 동안 ease-out으로 솟아오르게 해. 이후 포인터 위치에 따라 그림자 방향이 바뀌게 하고, 글자 자체는 실제 텍스트로 두어 검색·낭독이 되게 해 줘.',
      css: `
.d-st05 .box{text-align:center;cursor:crosshair;padding:10px 20px}
.d-st05 .t{font-size:66px;font-weight:900;letter-spacing:-.02em;line-height:1;color:#ffd23f;transform:translate(0,0)}
.d-st05 .sub{margin-top:14px;font-size:12px;font-weight:700;color:var(--muted)}
`,
      html: `<div class="box"><div class="t">특가</div><div class="sub">오늘만 50% · 마우스를 움직여 보세요</div></div>`,
      run(el, ctx) {
        const t = el.querySelector('.t');
        const C = ['#f2a516', '#e8901a', '#dd7c1c', '#d0691d', '#c2571d', '#b3471c', '#a33a1a', '#923018', '#822716', '#721f13'];
        let ax = 1, ay = 1, tx = 1, ty = 1, depth = 0;
        const paint = () => {
          const n = Math.round(depth), sh = [];
          for (let i = 1; i <= n; i++) sh.push(`${(ax * i).toFixed(2)}px ${(ay * i).toFixed(2)}px 0 ${C[i - 1]}`);
          sh.push(`${(ax * n * 1.4).toFixed(1)}px ${(ay * n * 1.4 + 4).toFixed(1)}px 14px rgba(0,0,0,.28)`);
          t.style.textShadow = sh.join(',');
          t.style.transform = `translate(${(-ax * n / 2).toFixed(1)}px,${(-ay * n / 2).toFixed(1)}px)`;
        };
        let user = false;
        ctx.on(el, 'pointermove', e => {
          const r = el.getBoundingClientRect();
          const dx = (e.clientX - r.left) / r.width - .5, dy = (e.clientY - r.top) / r.height - .5;
          const m = Math.hypot(dx, dy) || 1;
          tx = -dx / m * 1.1; ty = -dy / m * 1.1; user = true;
        });
        ctx.loop(time => {
          const p = Math.min(1, Math.max(0, (time - 250) / 700));
          depth = 10 * easeOut(p);
          if (!user && time > 1000) { const a = (time - 1000) / 1400; tx = Math.cos(Math.PI / 4 + Math.sin(a) * .9) * 1.1; ty = Math.sin(Math.PI / 4 + Math.sin(a) * .9) * 1.1; }
          ax += (tx - ax) * .12; ay += (ty - ay) * .12;
          paint();
        });
      }
    },
    {
      id: 'st06',
      ko: '글리치',
      en: 'Glitch',
      desc: '글자가 지직거리며 색이 어긋나고 조각나는 디지털 오류 느낌을 줘요.',
      prompt: '「글리치(Glitch)」 텍스트를 만들어 줘. 같은 글자를 ::before(시안)·::after(마젠타)로 겹치고 clip-path 가로 조각과 ±3px 이동을 steps()로 0.4초간 튀게 한 뒤 1.6초 쉬는 주기를 반복하되 중간에 짧은 잔떨림을 1회 넣어. 깜빡임이 초당 3회를 넘지 않게 하고, prefers-reduced-motion이면 효과를 꺼 줘.',
      css: `
.d-st06 .scr{width:236px;height:150px;border-radius:16px;background:#0e1014;display:grid;place-content:center;text-align:center;position:relative;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(255,255,255,.07)}
.d-st06 .scr::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(255,255,255,.035) 0 1px,transparent 1px 3px);pointer-events:none}
.d-st06 .scr::before{content:"";position:absolute;left:0;right:0;top:-30%;height:30%;background:linear-gradient(180deg,transparent,rgba(120,255,240,.07),transparent);animation:st06-scan 2.6s linear infinite;pointer-events:none}
@keyframes st06-scan{to{top:100%}}
.d-st06 .gl{position:relative;font-size:38px;font-weight:900;letter-spacing:-.02em;color:#f4f6fb;line-height:1.1;animation:st06-main 2s steps(1) infinite}
.d-st06 .gl::before,.d-st06 .gl::after{content:attr(data-t);position:absolute;inset:0;opacity:0}
.d-st06 .gl::before{color:#00e5ff;mix-blend-mode:screen;animation:st06-a 2s steps(1) infinite}
.d-st06 .gl::after{color:#ff2bd6;mix-blend-mode:screen;animation:st06-b 2s steps(1) infinite}
.d-st06 .sub{margin-top:8px;font-size:11px;font-weight:700;letter-spacing:.2em;color:#8a93a6}
@keyframes st06-main{0%{transform:translate(-2px,1px) skewX(-6deg)}4%{transform:translate(2px,-1px)}8%{transform:translate(-1px,0) skewX(4deg)}12%{transform:translate(2px,1px)}16%{transform:translate(-2px,0) skewX(-3deg)}20%{transform:none}52%{transform:translate(1px,0) skewX(4deg)}55%{transform:none}}
@keyframes st06-a{0%{opacity:.9;transform:translate(-3px,0);clip-path:inset(10% 0 60% 0)}4%{clip-path:inset(55% 0 20% 0);transform:translate(3px,0)}8%{clip-path:inset(30% 0 45% 0);transform:translate(-2px,0)}12%{clip-path:inset(65% 0 10% 0);transform:translate(3px,0)}16%{clip-path:inset(20% 0 55% 0);transform:translate(-3px,0)}20%{opacity:0}50%{opacity:.9;clip-path:inset(70% 0 5% 0);transform:translate(-3px,0)}55%{opacity:0}100%{opacity:0}}
@keyframes st06-b{0%{opacity:.9;transform:translate(3px,0);clip-path:inset(60% 0 10% 0)}4%{clip-path:inset(15% 0 65% 0);transform:translate(-3px,0)}8%{clip-path:inset(40% 0 35% 0);transform:translate(2px,0)}12%{clip-path:inset(5% 0 70% 0);transform:translate(-3px,0)}16%{clip-path:inset(50% 0 25% 0);transform:translate(3px,0)}20%{opacity:0}50%{opacity:.9;clip-path:inset(5% 0 70% 0);transform:translate(3px,0)}55%{opacity:0}100%{opacity:0}}
`,
      html: `<div class="scr"><div><div class="gl" data-t="타임세일">타임세일</div><div class="sub">SYSTEM ERROR · 00:59</div></div></div>`
    },
    {
      id: 'st07',
      ko: '마스크 리빌',
      en: 'Mask reveal',
      desc: '색 블록이 쓱 지나가면서 그 뒤에 가려져 있던 글자가 드러나요.',
      prompt: '「마스크 리빌(Mask reveal)」 제목을 만들어 줘. 첫 줄은 파란 블록, 강조 줄은 진한 블록이 scaleX 0→1로 왼쪽에서 덮고(350ms), 그 순간 글자를 보이게 한 뒤 블록이 오른쪽으로 걷히게(350ms) 해. 줄마다 150ms 지연, 이징은 cubic-bezier(.7,0,.3,1)로 하고 블록은 aria-hidden 처리해 줘.',
      css: `
.d-st07 .box{width:236px;cursor:pointer}
.d-st07 .ln{position:relative;display:table;margin-bottom:4px}
.d-st07 .tx{font-size:28px;font-weight:800;letter-spacing:-.03em;line-height:1.2;color:var(--text);opacity:0;padding:0 2px}
.d-st07 .ln.acc .tx{color:var(--accent)}
.d-st07 .bk{position:absolute;inset:0;background:var(--accent);transform:scaleX(0);transform-origin:left}
.d-st07 .ln.acc .bk{background:var(--text)}
.d-st07 .on .bk{animation:st07-wipe .7s cubic-bezier(.7,0,.3,1) forwards}
.d-st07 .on .tx{animation:st07-show 0s linear forwards}
.d-st07 .sub{margin-top:10px;font-size:12px;color:var(--muted);opacity:0;transition:opacity .4s}
.d-st07 .on .sub{opacity:1;transition-delay:1.1s}
@keyframes st07-wipe{0%{transform:scaleX(0);transform-origin:left}50%{transform:scaleX(1);transform-origin:left}50.1%{transform:scaleX(1);transform-origin:right}100%{transform:scaleX(0);transform-origin:right}}
@keyframes st07-show{to{opacity:1}}
`,
      html: `<div class="box">
  <div class="ln"><span class="tx">새로운 계절,</span><i class="bk" aria-hidden="true"></i></div>
  <div class="ln acc"><span class="tx">새로운 여행지</span><i class="bk" aria-hidden="true"></i></div>
  <div class="sub">12월 얼리버드 예약 오픈</div>
</div>`,
      run(el, ctx) {
        const box = el.querySelector('.box'), lns = [...el.querySelectorAll('.ln')];
        lns.forEach((l, i) => {
          l.querySelector('.bk').style.animationDelay = (i * 150) + 'ms';
          l.querySelector('.tx').style.animationDelay = (i * 150 + 350) + 'ms';
        });
        const go = () => { box.classList.remove('on'); void box.offsetWidth; box.classList.add('on'); };
        ctx.timeout(go, 100);
        ctx.on(box, 'click', go);
      }
    },
    {
      id: 'st08',
      ko: '마퀴',
      en: 'Marquee',
      desc: '문구나 로고 띠가 끊김 없이 옆으로 계속 흘러가요.',
      prompt: '「마퀴(Marquee)」 띠를 만들어 줘. 큰 문구 줄은 왼쪽, 파란 혜택 띠는 오른쪽으로 각각 초당 40px·30px 속도로 linear 무한 흐르게 하고, 같은 내용을 두 번 이어 붙여 한 바퀴 지점에서 끊김 없이 이어지게 해. 양 끝은 mask-image로 흐리게, 마우스를 올리거나 포커스되면 일시정지해 줘.',
      css: `
.d-st08 .wr{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;gap:14px;-webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
.d-st08 .mq{width:100%;overflow:hidden;white-space:nowrap}
.d-st08 .big{font-size:30px;font-weight:900;letter-spacing:-.03em;color:var(--text);line-height:1.15}
.d-st08 .band{width:calc(100% + 24px);margin-left:-12px;transform:rotate(-3deg);background:var(--accent);color:var(--accent-text);font-size:14px;font-weight:700;line-height:38px}
.d-st08 .small{font-size:13px;font-weight:600;color:var(--muted);letter-spacing:.02em}
.d-st08 .hint{position:absolute;left:0;right:0;bottom:10px;text-align:center;font-size:11px;color:var(--muted);opacity:0;transition:opacity .2s}
.d-st08 .wr.pause + .hint{opacity:1}
`,
      html: `<div class="wr" tabindex="0" aria-label="겨울 특가, 오늘 출발, 무료 배송, 최대 30% 할인">
  <div class="mq big" aria-hidden="true"></div>
  <div class="mq band" aria-hidden="true"></div>
  <div class="mq small" aria-hidden="true"></div>
</div><div class="hint">일시정지됨</div>`,
      run(el, ctx) {
        const wrap = el.querySelector('.wr');
        const rows = [
          { n: el.querySelector('.big'), s: '겨울 특가 ✦ WINTER DEAL ✦ ', v: -40 },
          { n: el.querySelector('.band'), s: '오늘 출발 · 무료 배송 · 최대 30% 할인 · 리뷰 4.9 · 당일 환불 · ', v: 30 },
          { n: el.querySelector('.small'), s: '제주   부산   강릉   여수   경주   속초   통영   ', v: -24 }
        ];
        rows.forEach(r => {
          r.n.textContent = r.s;
          r.w = r.n.scrollWidth;
          const k = Math.ceil((r.n.clientWidth * 2) / r.w) + 1;
          r.n.textContent = r.s.repeat(k);
          r.x = 0;
        });
        let paused = false, last = 0;
        const setP = v => { paused = v; wrap.classList.toggle('pause', v); };
        ctx.on(wrap, 'pointerenter', () => setP(true));
        ctx.on(wrap, 'pointerleave', () => setP(false));
        ctx.on(wrap, 'focus', () => setP(true));
        ctx.on(wrap, 'blur', () => setP(false));
        ctx.loop(t => {
          const dt = Math.min(50, t - last); last = t;
          if (paused) return;
          rows.forEach(r => {
            r.x = (r.x + r.v * dt / 1000) % r.w;
            const off = r.x > 0 ? r.x - r.w : r.x;
            r.n.style.textIndent = off.toFixed(1) + 'px';
          });
        });
      }
    },
    {
      id: 'st09',
      ko: '글래스모피즘',
      en: 'Glassmorphism',
      desc: '반투명 유리판 뒤로 배경 색이 흐릿하게 비치는 효과예요.',
      prompt: '「글래스모피즘(Glassmorphism)」 카드를 만들어 줘. 천천히 떠다니는 컬러 블롭 3개 위에 흰색 18% 배경, backdrop-filter: blur(16px) saturate(160%), 1px 반투명 흰 테두리, 18px 라운드 카드를 올려. 블롭은 8초 주기로 움직이고, 글자 대비가 4.5:1 미만이면 카드 불투명도를 높여 줘.',
      css: `
.d-st09 .bg{position:absolute;inset:0;background:linear-gradient(135deg,#1d1b4b,#2a1e5c 50%,#123a5a);overflow:hidden}
.d-st09 .bl{position:absolute;border-radius:50%;filter:blur(2px)}
.d-st09 .b1{width:120px;height:120px;left:14%;top:6%;background:radial-gradient(circle at 30% 30%,#ff8fc8,#ff3d8b);animation:st09-a 8s ease-in-out infinite}
.d-st09 .b2{width:100px;height:100px;right:12%;top:38%;background:radial-gradient(circle at 30% 30%,#7fe3ff,#2f8bff);animation:st09-b 8s ease-in-out infinite}
.d-st09 .b3{width:80px;height:80px;left:36%;bottom:-10%;background:radial-gradient(circle at 30% 30%,#ffe08a,#ff9a3c);animation:st09-c 8s ease-in-out infinite}
.d-st09 .cd{position:relative;z-index:1;width:210px;height:128px;padding:14px 16px;border-radius:18px;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.45);-webkit-backdrop-filter:blur(16px) saturate(160%);backdrop-filter:blur(16px) saturate(160%);box-shadow:0 10px 30px -10px rgba(0,0,0,.45);color:#fff;display:flex;flex-direction:column;justify-content:space-between}
.d-st09 .top{display:flex;justify-content:space-between;align-items:center}
.d-st09 .top b{font-size:11px;letter-spacing:.16em;font-weight:800;opacity:.9}
.d-st09 .cp{width:28px;height:20px;border-radius:5px;background:linear-gradient(135deg,rgba(255,255,255,.85),rgba(255,255,255,.4))}
.d-st09 .pt{font-size:22px;font-weight:800;letter-spacing:-.02em;text-shadow:0 1px 6px rgba(0,0,0,.2)}
.d-st09 .pt small{font-size:12px;font-weight:600;opacity:.85;margin-left:4px}
.d-st09 .bt{display:flex;justify-content:space-between;font-size:11px;font-weight:600;opacity:.9}
@keyframes st09-a{0%,100%{transform:translate(0,0)}50%{transform:translate(60px,40px)}}
@keyframes st09-b{0%,100%{transform:translate(0,0)}50%{transform:translate(-70px,-30px)}}
@keyframes st09-c{0%,100%{transform:translate(0,0)}50%{transform:translate(40px,-50px)}}
`,
      html: `<div class="bg"><i class="bl b1"></i><i class="bl b2"></i><i class="bl b3"></i></div>
<div class="cd"><div class="top"><b>MEMBERSHIP</b><i class="cp"></i></div><div class="pt">12,480<small>P 적립</small></div><div class="bt"><span>골드 등급</span><span>•••• 2048</span></div></div>`,
      run(el, ctx) {
        // 블롭 위상을 살짝 앞당겨 첫 화면부터 움직임이 보이게
        el.querySelectorAll('.bl').forEach((b, i) => { b.style.animationDelay = (-1 - i * 1.3) + 's'; });
      }
    },
    {
      id: 'st10',
      ko: '다크 모드',
      en: 'Dark mode',
      desc: '토글 한 번에 밝은 화면이 눈이 편한 어두운 색 테마로 부드럽게 바뀌어요.',
      prompt: '「다크 모드(Dark mode)」 전환을 만들어 줘. 해·달 토글을 누르면 배경·카드·글자 색 변수가 400ms 동안 ease-out으로 바뀌고 아이콘이 180도 돌며 해에서 달로 변해. 처음엔 prefers-color-scheme을 따르고, 선택값은 저장하며 토글엔 role="switch"와 aria-checked를 넣어 줘.',
      css: `
.d-st10 .app{--b:#f4f6fa;--c:#ffffff;--t:#14171c;--m:#7a8291;--l:#e6e9ef;--k:#2f6bff;width:224px;height:172px;border-radius:20px;background:var(--b);padding:14px;box-shadow:0 8px 24px -10px rgba(0,0,0,.35);transition:background .4s ease-out;color:var(--t);display:flex;flex-direction:column;gap:10px}
.d-st10 .app.dk{box-shadow:0 8px 24px -10px rgba(0,0,0,.35),inset 0 0 0 1px rgba(255,255,255,.08);--b:#0f1115;--c:#1c2027;--t:#eef0f3;--m:#8d96a4;--l:#2c323b;--k:#6b98ff}
.d-st10 .hd{display:flex;justify-content:space-between;align-items:center}
.d-st10 .hd b{font-size:14px;font-weight:800;transition:color .4s}
.d-st10 .sw{position:relative;width:52px;height:28px;border-radius:999px;border:0;padding:0;background:#dfe5ee;cursor:pointer;transition:background .4s ease-out}
.d-st10 .dk .sw{background:#343b47}
.d-st10 .kn{position:absolute;left:3px;top:3px;width:22px;height:22px;border-radius:50%;background:#fff;display:grid;place-items:center;color:#f5a50b;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:transform .4s cubic-bezier(.2,.8,.2,1),background .4s,color .4s}
.d-st10 .dk .kn{transform:translateX(24px) rotate(180deg);background:#11151b;color:#ffd84d}
.d-st10 .kn svg{position:absolute;transition:opacity .25s}
.d-st10 .kn .moon{opacity:0}
.d-st10 .dk .kn .moon{opacity:1}
.d-st10 .dk .kn .sun{opacity:0}
.d-st10 .cd{display:flex;gap:10px;align-items:center;padding:10px;border-radius:14px;background:var(--c);transition:background .4s ease-out}
.d-st10 .av{width:34px;height:34px;border-radius:50%;background:var(--k);opacity:.85;flex:none;transition:background .4s}
.d-st10 .cd b{display:block;font-size:12px;transition:color .4s}
.d-st10 .cd span{font-size:11px;color:var(--m);transition:color .4s}
.d-st10 .row{display:flex;justify-content:space-between;align-items:center;padding:0 2px;font-size:12px;font-weight:600}
.d-st10 .row span:last-child{color:var(--k);transition:color .4s}
.d-st10 .ln{height:6px;border-radius:3px;background:var(--l);transition:background .4s}
`,
      html: `<div class="app">
  <div class="hd"><b>설정</b><button class="sw" type="button" role="switch" aria-checked="false" aria-label="다크 모드">
    <span class="kn"><svg class="sun" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg><svg class="moon" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></span>
  </button></div>
  <div class="cd"><i class="av"></i><div><b>여행 좋아하는 민트곰</b><span>골드 멤버 · 리뷰 24개</span></div></div>
  <div class="row"><span>화면 테마</span><span class="mode">라이트</span></div>
  <div class="ln"></div>
</div>`,
      run(el, ctx) {
        const app = el.querySelector('.app'), sw = el.querySelector('.sw'), mode = el.querySelector('.mode');
        const set = on => { app.classList.toggle('dk', on); sw.setAttribute('aria-checked', on); mode.textContent = on ? '다크' : '라이트'; };
        ctx.on(sw, 'click', () => set(!app.classList.contains('dk')));
        ctx.timeout(() => set(true), 700);
      }
    }
  ]);
})();
