(() => {
  const st2xCur = '<svg class="cur" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 8-6 1.6L10.4 19z" fill="var(--text)" stroke="var(--surface)" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  const st2xCol = () => '<span class="c"><span class="s">' + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => '<b>' + n + '</b>').join('') + '</span></span>';
  const st2xLetters = s => [...s].map((ch, i) => ch === ' ' ? '<i class="sp"></i>' : '<i style="animation-delay:' + (i * 90) + 'ms">' + ch + '</i>').join('');

  UIDEX.add('style', [
    {
      id: 'st11',
      ko: '숫자 롤링',
      en: 'Odometer',
      pair: 'st01',
      desc: '카운트업과 달리 자릿수마다 숫자 띠가 세로로 굴러 값이 바뀌어요.',
      prompt: '「숫자 롤링(Odometer)」 카운터를 만들어 줘. 자릿수마다 0~9 숫자 띠를 세로로 쌓고 overflow로 가린 뒤, 값이 바뀌면 각 띠가 translateY로 900ms cubic-bezier(.2,.8,.2,1) 동안 굴러가게 하고 자리마다 60ms 시차를 줘. 카운트업과 헷갈리지 않게 숫자를 제자리에서 바꿔 쓰지는 마. 실제 값은 aria-label로 읽히게 해 줘.',
      css: `
.d-st11 .box{text-align:center;cursor:pointer;user-select:none;border-radius:12px;padding:6px 10px}
.d-st11 .box:focus-visible{outline:2px solid var(--accent);outline-offset:4px}
.d-st11 .lab{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;color:var(--muted);margin-bottom:10px}
.d-st11 .lab::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--success);animation:st11-live 1.4s ease-in-out infinite}
.d-st11 .odo{display:flex;align-items:flex-end;justify-content:center;gap:5px}
.d-st11 .c{display:block;width:38px;height:54px;overflow:hidden;border-radius:10px;background:var(--surface);box-shadow:var(--shadow)}
.d-st11 .s{display:block;transition:transform .9s cubic-bezier(.2,.8,.2,1)}
.d-st11 .s b{display:block;height:54px;line-height:54px;font-size:34px;font-weight:800;color:var(--text);font-variant-numeric:tabular-nums}
.d-st11 .cm{font-size:26px;font-weight:800;color:var(--muted);line-height:1;padding-bottom:4px}
.d-st11 .hint{margin-top:12px;font-size:11px;color:var(--muted)}
@keyframes st11-live{50%{opacity:.3}}
`,
      html: `<div class="box" role="button" tabindex="0" aria-label="지금 보고 있는 사람 0명, 누르면 숫자 올리기">
  <div class="lab">지금 보고 있는 사람</div>
  <div class="odo" role="img" aria-label="0명">${st2xCol()}<span class="cm">,</span>${st2xCol()}${st2xCol()}${st2xCol()}</div>
  <div class="hint">누르면 숫자가 굴러 올라가요</div>
</div>`,
      run(el, ctx) {
        const box = el.querySelector('.box'), odo = el.querySelector('.odo'), strips = [...el.querySelectorAll('.s')];
        let v = 0;
        const set = n => {
          v = n % 10000;
          const ds = String(v).padStart(4, '0');
          strips.forEach((s, i) => {
            s.style.transitionDelay = ((3 - i) * 60) + 'ms';
            s.style.transform = 'translateY(-' + (+ds[i] * 10) + '%)';
          });
          const txt = v.toLocaleString('ko-KR') + '명';
          odo.setAttribute('aria-label', txt);
          box.setAttribute('aria-label', '지금 보고 있는 사람 ' + txt + ', 누르면 숫자 올리기');
        };
        ctx.timeout(() => set(2847), 200);
        ctx.timeout(() => set(2853), 1700);
        ctx.timeout(() => ctx.interval(() => set(v + 1 + Math.floor(Math.random() * 14)), 1800), 1700);
        ctx.on(box, 'click', () => set(v + 111));
        ctx.on(box, 'keydown', e => {
          if (e.key !== 'Enter' && e.key !== ' ') return;
          e.preventDefault();
          if (!e.repeat) set(v + 111);
        });
      }
    },
    {
      id: 'st12',
      ko: '텍스트 스크램블',
      en: 'Text scramble',
      pair: 'st06',
      desc: '글리치와 달리 무작위 글자가 뒤섞이다 한 자씩 정답으로 맞춰져요.',
      prompt: '「텍스트 스크램블(Text scramble)」 헤드라인을 만들어 줘. 모든 자리에 무작위 글자를 50ms마다 바꿔 보여 주다가 왼쪽부터 150ms 간격으로 한 글자씩 정답으로 고정하고, 1.8초 머문 뒤 다음 문구로 넘어가. 글리치와 헷갈리지 않게 색 어긋남이나 화면 조각 효과는 넣지 마. 낭독기에는 aria-label로 완성 문구만 읽히게 해 줘.',
      css: `
.d-st12 .box{width:244px;padding:18px 10px 16px;border-radius:16px;background:var(--surface);box-shadow:var(--shadow);text-align:center}
.d-st12 .lab{font-size:11px;font-weight:700;letter-spacing:.14em;color:var(--muted)}
.d-st12 .tx{margin-top:8px;height:36px;font-size:26px;font-weight:800;letter-spacing:-.02em;line-height:36px;white-space:nowrap;color:var(--text)}
.d-st12 .tx i{font-style:normal;display:inline-block}
.d-st12 .tx i.r{color:var(--accent);opacity:.65}
.d-st12 .bar{margin:12px auto 0;width:120px;height:3px;border-radius:2px;background:var(--line);overflow:hidden}
.d-st12 .bar u{display:block;height:100%;width:0;background:var(--accent)}
`,
      html: `<div class="box">
  <div class="lab">TODAY</div>
  <div class="tx" role="img" aria-label="신상품 도착"></div>
  <div class="bar"><u></u></div>
</div>`,
      run(el, ctx) {
        const tx = el.querySelector('.tx'), bar = el.querySelector('.bar u');
        const L = ['신상품 도착', '오늘만 무료배송', '여름 세일 시작'];
        const P = '가나다라마바사아자차카타파하고노도로모보소오조초코토포호구누두루무부수우주추';
        let k = 0;
        const play = () => {
          const s = [...L[k]];
          let f = 0;
          tx.setAttribute('aria-label', L[k]);
          const tick = () => {
            const done = Math.max(0, Math.floor((f - 5) / 3));
            tx.innerHTML = s.map((ch, i) => ch === ' ' ? '<i>&nbsp;</i>' : i < done ? '<i>' + ch + '</i>' : '<i class="r" aria-hidden="true">' + P[Math.floor(Math.random() * P.length)] + '</i>').join('');
            bar.style.width = Math.min(100, done / s.length * 100) + '%';
            f++;
            if (done < s.length) ctx.timeout(tick, 50);
            else ctx.timeout(() => { k = (k + 1) % L.length; play(); }, 1800);
          };
          tick();
        };
        play();
      }
    },
    {
      id: 'st13',
      ko: '단어 교체',
      en: 'Rotating words',
      desc: '문장은 그대로 두고 단어 하나만 위로 밀려 나가며 계속 바뀌어요.',
      prompt: '「단어 교체(Rotating words)」 헤드라인을 만들어 줘. 문장 중 한 단어 자리만 overflow로 가리고, 1.7초마다 지금 단어는 위로 밀려 나가고 다음 단어가 아래에서 450ms cubic-bezier(.2,.8,.2,1)로 올라오게 해. 단어 길이에 맞춰 자리 폭도 부드럽게 바꾸고, 낭독기에는 단어 목록 전체를 한 번만 읽히게 해 줘.',
      css: `
.d-st13 .h{text-align:center;font-size:26px;font-weight:800;letter-spacing:-.03em;line-height:1.35;color:var(--text);white-space:nowrap}
.d-st13 .slot{display:inline-block;position:relative;height:1.35em;overflow:hidden;vertical-align:bottom;transition:width .4s cubic-bezier(.2,.8,.2,1)}
.d-st13 .w{position:absolute;left:0;top:0;white-space:nowrap;color:var(--accent);transform:translateY(100%);opacity:0;transition:transform .45s cubic-bezier(.2,.8,.2,1),opacity .45s}
.d-st13 .w.on{transform:none;opacity:1}
.d-st13 .w.out{transform:translateY(-100%);opacity:0}
.d-st13 .sub{margin-top:10px;text-align:center;font-size:12px;color:var(--muted)}
`,
      html: `<div>
  <div class="h" role="img" aria-label="숙소 예약을 빠르게, 저렴하게, 간편하게, 안전하게 끝내요"><span aria-hidden="true">숙소 예약을<br><span class="slot"><span class="w on">빠르게</span></span> 끝내요</span></div>
  <div class="sub">전국 2,400개 숙소를 한곳에서</div>
</div>`,
      run(el, ctx) {
        const slot = el.querySelector('.slot');
        const W = ['빠르게', '저렴하게', '간편하게', '안전하게'];
        let k = 0;
        slot.style.width = slot.querySelector('.w').offsetWidth + 'px';
        const swap = () => {
          const old = slot.querySelector('.w.on');
          k = (k + 1) % W.length;
          const nw = document.createElement('span');
          nw.className = 'w'; nw.textContent = W[k];
          slot.appendChild(nw);
          slot.style.width = nw.offsetWidth + 'px';
          ctx.raf(() => ctx.raf(() => nw.classList.add('on')));
          if (old) { old.classList.remove('on'); old.classList.add('out'); ctx.timeout(() => old.remove(), 500); }
        };
        ctx.timeout(() => { swap(); ctx.interval(swap, 1700); }, 1100);
      }
    },
    {
      id: 'st14',
      ko: '형광펜',
      en: 'Highlighter',
      desc: '글자 뒤로 형광펜 줄이 왼쪽에서 오른쪽으로 그어져 핵심을 강조해요.',
      prompt: '「형광펜(Highlighter)」 강조를 만들어 줘. 문장 속 핵심 구절 뒤에 글자 높이 55%짜리 반투명 노란 배경을 깔고, 화면에 들어오면 background-size를 0%에서 100%로 600ms ease-out 동안 왼쪽에서 오른쪽으로 그어지게 해. 구절이 여럿이면 800ms 간격으로 차례로 긋고, mark 태그를 써서 낭독기에도 강조로 전달되게 해 줘.',
      css: `
.d-st14 .box{width:236px;cursor:pointer}
.d-st14 .q{font-size:11px;font-weight:700;color:var(--muted);letter-spacing:.08em;margin-bottom:8px}
.d-st14 p{margin:0;font-size:18px;font-weight:700;line-height:1.75;letter-spacing:-.02em;color:var(--text);word-break:keep-all}
.d-st14 mark{color:inherit;padding:0 2px;margin:0 -2px;background:linear-gradient(color-mix(in srgb,var(--warn) 55%,transparent),color-mix(in srgb,var(--warn) 55%,transparent)) no-repeat 0 78%/0% 55%;transition:background-size .6s ease-out}
.d-st14 mark.on{background-size:100% 55%}
.d-st14 mark.off{transition:none}
`,
      html: `<div class="box">
  <div class="q">구매자 한 줄 요약</div>
  <p>별점 4.9점에 <mark>재구매율 68%</mark>인 캠핑 의자를 <mark>오늘만 39,000원</mark>에 만나 보세요.</p>
</div>`,
      run(el, ctx) {
        const ms = [...el.querySelectorAll('mark')];
        const go = d => ms.forEach((m, i) => ctx.timeout(() => { m.classList.remove('off'); m.classList.add('on'); }, d + i * 800));
        go(450);
        ctx.on(el.querySelector('.box'), 'click', () => {
          ms.forEach(m => { m.classList.add('off'); m.classList.remove('on'); });
          go(120);
        });
      }
    },
    {
      id: 'st15',
      ko: '밑줄 애니메이션',
      en: 'Animated underline',
      desc: '링크에 올리면 밑줄이 왼쪽에서 자라고, 떼면 오른쪽으로 빠져나가요.',
      prompt: '「밑줄 애니메이션(Animated underline)」 링크를 만들어 줘. 링크 아래 2px 밑줄을 ::after로 두고 평소엔 scaleX(0), 호버하면 transform-origin을 왼쪽으로 두어 300ms ease-out으로 자라나고, 떼면 origin을 오른쪽으로 바꿔 오른쪽으로 사라지게 해. 키보드 포커스(:focus-visible)에서도 같은 밑줄이 나타나게 해 줘.',
      css: `
.d-st15 .box{position:absolute;inset:0;display:grid;place-content:center;justify-items:center}
.d-st15 nav{display:flex;gap:20px;padding:16px 18px;border-radius:14px;background:var(--surface);box-shadow:var(--shadow)}
.d-st15 a{position:relative;font-size:16px;font-weight:700;color:var(--text);text-decoration:none;cursor:pointer;white-space:nowrap;outline:none;transition:color .3s}
.d-st15 a::after{content:"";position:absolute;left:0;right:0;bottom:-6px;height:2px;border-radius:1px;background:var(--accent);transform:scaleX(0);transform-origin:right center;transition:transform .3s ease-out}
.d-st15 a:hover,.d-st15 a.hv,.d-st15 a:focus-visible{color:var(--accent)}
.d-st15 a:hover::after,.d-st15 a.hv::after,.d-st15 a:focus-visible::after{transform:scaleX(1);transform-origin:left center}
.d-st15 .hint{margin-top:16px;font-size:11px;color:var(--muted)}
.d-st15 .cur{position:absolute;left:0;top:0;opacity:0;pointer-events:none;transition:transform .5s cubic-bezier(.2,.8,.2,1),opacity .3s;filter:drop-shadow(0 1px 2px rgba(0,0,0,.3))}
`,
      html: `<div class="box">
  <nav aria-label="쇼핑 메뉴"><a href="#">홈</a><a href="#">신상품</a><a href="#">베스트</a><a href="#">이벤트</a></nav>
  <div class="hint">링크에 올리면 밑줄이 자라나요</div>
  ${st2xCur}
</div>`,
      run(el, ctx) {
        const as = [...el.querySelectorAll('a')], cur = el.querySelector('.cur');
        ctx.on(el.querySelector('nav'), 'click', e => e.preventDefault());
        const at = i => {
          const r = el.getBoundingClientRect(), q = as[i].getBoundingClientRect();
          cur.style.transform = 'translate(' + (q.left - r.left + q.width / 2) + 'px,' + (q.top - r.top + q.height / 2 + 2) + 'px)';
          ctx.timeout(() => as.forEach((a, j) => a.classList.toggle('hv', j === i)), 260);
        };
        cur.style.transform = 'translate(20px,150px)';
        ctx.timeout(() => { cur.style.opacity = 1; at(1); }, 60);
        ctx.timeout(() => at(2), 950);
        ctx.timeout(() => at(3), 1800);
        ctx.timeout(() => { cur.style.opacity = 0; as.forEach(a => a.classList.remove('hv')); }, 3000);
      }
    },
    {
      id: 'st16',
      ko: '물결 글자',
      en: 'Wavy text',
      desc: '글자 하나하나가 시차를 두고 위아래로 출렁여 물결처럼 보여요.',
      prompt: '「물결 글자(Wavy text)」 문구를 만들어 줘. 글자를 한 자씩 inline-block span으로 나누고, 각 글자가 1.5초 주기 ease-in-out으로 위로 12px 올랐다 내려오게 하되 글자마다 90ms씩 지연을 줘서 파도가 왼쪽에서 오른쪽으로 지나가게 해. 낭독기에는 aria-label로 온전한 문장을 읽히고, prefers-reduced-motion이면 멈춰 줘.',
      css: `
.d-st16 .box{text-align:center}
.d-st16 .wv{font-size:32px;font-weight:900;letter-spacing:-.01em;color:var(--text);line-height:1.2;white-space:nowrap;padding-top:14px}
.d-st16 .wv i{display:inline-block;font-style:normal;animation:st16-wave 1.5s ease-in-out infinite}
.d-st16 .wv i.sp{width:.3em;animation:none}
.d-st16 .wv i:nth-child(n+6){color:var(--accent)}
.d-st16 .sub{margin-top:12px;font-size:12px;color:var(--muted)}
@keyframes st16-wave{0%,45%,100%{transform:translateY(0)}22%{transform:translateY(-12px)}}
`,
      html: `<div class="box">
  <div class="wv" role="img" aria-label="두근두근 오픈 임박!">${st2xLetters('두근두근 오픈 임박!')}</div>
  <div class="sub">8월 1일 정오, 예약이 열려요</div>
</div>`
    },
    {
      id: 'st17',
      ko: '샤인 글자',
      en: 'Shine text',
      pair: 'st04',
      desc: '그라데이션 글자와 달리 단색 글자 위로 빛줄기가 주기적으로 스쳐요.',
      prompt: '「샤인 글자(Shine text)」 헤드라인을 만들어 줘. 단색 글자에 폭 40%짜리 밝은 사선 띠(105deg)를 background-clip: text로 입히고, 2.5초 주기 중 처음 1초 동안 왼쪽에서 오른쪽으로 스쳐 지나간 뒤 쉬게 해. 그라데이션 글자와 헷갈리지 않게 여러 색을 섞어 채우지는 마. prefers-reduced-motion이면 빛줄기를 꺼 줘.',
      css: `
.d-st17 .box{text-align:center;width:244px}
.d-st17 .eye{font-size:11px;font-weight:700;letter-spacing:.16em;color:var(--muted)}
.d-st17 .sh{margin:6px 0 10px;font-size:31px;font-weight:900;letter-spacing:-.03em;line-height:1.2;white-space:nowrap;color:var(--accent);background:linear-gradient(105deg,var(--accent) 42%,color-mix(in srgb,var(--accent) 12%,#fff) 50%,var(--accent) 58%) no-repeat 100% 0/250% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:st17-sweep 2.5s ease-in-out infinite}
.d-st17 .cap{display:inline-block;padding:6px 12px;border-radius:999px;font-size:12px;font-weight:600;color:var(--muted);background:var(--surface);box-shadow:var(--shadow)}
@keyframes st17-sweep{0%{background-position:100% 0}40%,100%{background-position:0% 0}}
`,
      html: `<div class="box">
  <div class="eye">MEMBERS ONLY</div>
  <div class="sh">프리미엄 멤버십</div>
  <span class="cap">지금 가입하면 첫 달 무료</span>
</div>`
    },
    {
      id: 'st18',
      ko: '오로라 배경',
      en: 'Aurora background',
      desc: '흐릿한 색 덩어리 여러 개가 천천히 섞이며 움직이는 배경이에요.',
      prompt: '「오로라 배경(Aurora background)」을 만들어 줘. 짙은 남색 바탕 위에 민트·파랑·보라·하늘색 원 4개를 blur(28px)와 mix-blend-mode: screen으로 겹치고, 각각 5~8초 주기 ease-in-out alternate로 위치와 크기를 천천히 바꿔 색이 섞이게 해. 위 글자는 흰색으로 대비 4.5:1을 지키고, prefers-reduced-motion이면 멈춰 줘.',
      css: `
.d-st18 .bg{position:absolute;inset:0;background:#080c22;overflow:hidden}
.d-st18 .bl{position:absolute;width:170px;height:170px;border-radius:50%;filter:blur(28px);mix-blend-mode:screen;opacity:.58}
.d-st18 .bg::after{content:"";position:absolute;inset:0;background:radial-gradient(170px 74px at 50% 52%,rgba(6,9,30,.78),rgba(6,9,30,.7) 50%,rgba(6,9,30,0) 100%)}
.d-st18 .b1{left:-4%;top:-30%;background:#2ff0b8;animation:st18-a 5s ease-in-out -1s infinite alternate}
.d-st18 .b2{right:-4%;top:-10%;background:#4b5dff;animation:st18-b 6s ease-in-out -2s infinite alternate}
.d-st18 .b3{left:8%;bottom:-45%;background:#c044ff;animation:st18-c 7s ease-in-out -3s infinite alternate}
.d-st18 .b4{right:8%;bottom:-50%;background:#16b4ff;animation:st18-d 8s ease-in-out -2.5s infinite alternate}
.d-st18 .tx{position:relative;z-index:1;text-align:center;color:#fff;text-shadow:0 1px 12px rgba(4,8,30,.55)}
.d-st18 .tx b{display:block;font-size:22px;font-weight:800;letter-spacing:-.02em}
.d-st18 .tx span{display:block;margin-top:6px;font-size:12px;color:#eef1ff}
@keyframes st18-a{from{transform:translate(0,0) scale(1)}to{transform:translate(90px,70px) scale(1.2)}}
@keyframes st18-b{from{transform:translate(0,0) scale(1.1)}to{transform:translate(-130px,60px) scale(.85)}}
@keyframes st18-c{from{transform:translate(0,0) scale(.9)}to{transform:translate(60px,-80px) scale(1.15)}}
@keyframes st18-d{from{transform:translate(0,0) scale(1.1)}to{transform:translate(-110px,-70px) scale(.9)}}
`,
      html: `<div class="bg" aria-hidden="true"><i class="bl b1"></i><i class="bl b2"></i><i class="bl b3"></i><i class="bl b4"></i></div>
<div class="tx"><b>새벽 감성 플레이리스트</b><span>잠들기 전 듣기 좋은 24곡</span></div>`
    },
    {
      id: 'st19',
      ko: '뉴모피즘',
      en: 'Neumorphism',
      pair: 'st09',
      desc: '글래스모피즘과 달리 배경과 같은 색 면이 이중 그림자로 볼록·오목해요.',
      prompt: '「뉴모피즘(Neumorphism)」 토글 버튼을 만들어 줘. 배경과 같은 색 면에 오른쪽 아래 어두운 그림자와 왼쪽 위 밝은 그림자(각 6px 오프셋·14px 블러)를 함께 줘서 볼록하게 하고, 누르면 200ms 동안 inset 그림자로 바뀌어 오목하게 눌리게 해. 글래스모피즘과 헷갈리지 않게 반투명·배경 흐림은 쓰지 마. aria-pressed로 상태를 알려 줘.',
      css: `
.d-st19 .pn{--hi:color-mix(in srgb,#fff 10%,var(--surface));--lo:color-mix(in srgb,#000 30%,var(--stage));width:224px;padding:16px 18px;border-radius:22px;background:var(--stage);box-shadow:7px 7px 16px var(--lo),-7px -7px 16px var(--hi)}
.d-st19 .top{display:flex;align-items:center;justify-content:space-between}
.d-st19 .t b{display:block;font-size:16px;font-weight:800;color:var(--text)}
.d-st19 .t span{display:block;margin-top:3px;font-size:12px;color:var(--muted)}
.d-st19 .bt{width:58px;height:58px;flex:none;border:0;padding:0;border-radius:50%;background:var(--stage);color:var(--muted);display:grid;place-items:center;cursor:pointer;box-shadow:6px 6px 14px var(--lo),-6px -6px 14px var(--hi);transition:box-shadow .2s ease-out,color .2s,transform .2s}
.d-st19 .bt.on{color:var(--accent);box-shadow:inset 5px 5px 10px var(--lo),inset -5px -5px 10px var(--hi);transform:scale(.97)}
.d-st19 .tr{margin-top:16px;height:12px;border-radius:6px;background:var(--stage);box-shadow:inset 3px 3px 6px var(--lo),inset -3px -3px 6px var(--hi);overflow:hidden}
.d-st19 .tr i{display:block;height:100%;width:0;border-radius:6px;background:var(--accent);transition:width .5s cubic-bezier(.2,.8,.2,1)}
.d-st19 .pn.on .tr i{width:72%}
`,
      html: `<div class="pn">
  <div class="top">
    <div class="t"><b>거실 조명</b><span class="s">꺼짐</span></div>
    <button class="bt" type="button" aria-pressed="false" aria-label="거실 조명 켜기"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 3v8"/><path d="M6.3 6.8a8 8 0 1 0 11.4 0"/></svg></button>
  </div>
  <div class="tr"><i></i></div>
</div>`,
      run(el, ctx) {
        const pn = el.querySelector('.pn'), bt = el.querySelector('.bt'), s = el.querySelector('.s');
        const tog = () => {
          const on = !bt.classList.contains('on');
          bt.classList.toggle('on', on); pn.classList.toggle('on', on);
          bt.setAttribute('aria-pressed', on);
          s.textContent = on ? '켜짐 · 밝기 72%' : '꺼짐';
        };
        ctx.timeout(tog, 1000);
        ctx.on(bt, 'click', tog);
      }
    },
    {
      id: 'st20',
      ko: '네오 브루탈리즘',
      en: 'Neo-brutalism',
      desc: '굵은 검정 테두리와 딱딱한 그림자, 원색으로 거칠게 눈길을 끌어요.',
      prompt: '「네오 브루탈리즘(Neo-brutalism)」 상품 카드를 만들어 줘. 3px 검정 테두리, 블러 없는 6px 6px 0 검정 오프셋 그림자, 노랑·핑크·민트 원색 면을 쓰고 모서리는 6px 이하로 둬. 버튼을 누르면 80ms 동안 그림자만큼 translate(4px,4px) 이동하며 그림자가 사라져 눌린 느낌을 주고, 글자는 검정으로 대비 7:1 이상을 지켜 줘.',
      css: `
.d-st20 .bg{position:absolute;inset:0;background:#f3ecdc;display:grid;place-items:center}
.d-st20 .cd{position:relative;width:206px;padding:14px 14px 16px;background:#fff;border:3px solid #111;border-radius:6px;box-shadow:6px 6px 0 #111;color:#111}
.d-st20 .tag{position:absolute;right:-12px;top:-13px;padding:3px 9px;font-size:12px;font-weight:900;background:#ff6fa5;border:3px solid #111;border-radius:4px;transform:rotate(6deg);box-shadow:3px 3px 0 #111}
.d-st20 .nm{font-size:19px;font-weight:900;letter-spacing:-.02em}
.d-st20 .pr{margin-top:2px;font-size:14px;font-weight:700}
.d-st20 .pr s{margin-left:6px;font-weight:500;opacity:.55}
.d-st20 .bt{display:block;width:100%;margin-top:12px;padding:9px 0;font:inherit;font-size:15px;font-weight:900;color:#111;background:#ffd23f;border:3px solid #111;border-radius:6px;box-shadow:4px 4px 0 #111;cursor:pointer;transition:transform .08s linear,box-shadow .08s linear,background .08s linear}
.d-st20 .bt:active,.d-st20 .bt.dn{transform:translate(4px,4px);box-shadow:0 0 0 #111}
.d-st20 .bt.ok{background:#5df2b4}
`,
      html: `<div class="bg"><div class="cd">
  <span class="tag">NEW</span>
  <div class="nm">접이식 캠핑 의자</div>
  <div class="pr">39,000원<s>52,000원</s></div>
  <button class="bt" type="button">장바구니 담기</button>
</div></div>`,
      run(el, ctx) {
        const bt = el.querySelector('.bt');
        const tog = () => {
          const ok = !bt.classList.contains('ok');
          bt.classList.toggle('ok', ok);
          bt.textContent = ok ? '담았어요!' : '장바구니 담기';
        };
        ctx.timeout(() => bt.classList.add('dn'), 1000);
        ctx.timeout(() => { bt.classList.remove('dn'); tog(); }, 1260);
        ctx.on(bt, 'click', tog);
      }
    },
    {
      id: 'st21',
      ko: '글로우 테두리',
      en: 'Glowing border',
      desc: '카드 테두리를 따라 그라데이션 빛이 빙글빙글 돌며 주목을 끌어요.',
      prompt: '「글로우 테두리(Glowing border)」 카드를 만들어 줘. 카드보다 큰 conic-gradient(파랑→보라→핑크, 나머지 투명) 레이어를 카드 뒤에서 3초 주기 linear로 무한 회전시키고, 안쪽을 2px 작게 덮어 테두리로만 빛이 보이게 해. 같은 레이어를 blur(12px)로 한 겹 더 깔아 번지는 빛을 만들고, prefers-reduced-motion이면 회전을 멈춰 줘.',
      css: `
.d-st21 .box{position:relative;width:214px;height:124px}
.d-st21 .ring{position:absolute;inset:0;border-radius:18px;overflow:hidden;background:var(--line)}
.d-st21 .ring::before{content:"";position:absolute;left:50%;top:50%;width:320px;height:320px;margin:-160px 0 0 -160px;background:conic-gradient(from 0deg,transparent 0 50%,#4f8cff 66%,#b44dff 82%,#ff5fa2 94%,transparent 100%);animation:st21-spin 3s linear infinite}
.d-st21 .ring.gl{background:none;filter:blur(12px);opacity:.75}
.d-st21 .in{position:absolute;inset:2px;border-radius:16px;background:var(--surface);padding:14px 16px;display:flex;flex-direction:column;justify-content:space-between}
.d-st21 .tp{display:flex;align-items:center;justify-content:space-between}
.d-st21 .tp b{font-size:15px;font-weight:800;color:var(--text)}
.d-st21 .tp span{padding:3px 8px;border-radius:999px;font-size:11px;font-weight:700;color:var(--accent);background:var(--accent-soft)}
.d-st21 .pz{font-size:24px;font-weight:800;letter-spacing:-.03em;color:var(--text)}
.d-st21 .pz small{font-size:12px;font-weight:600;color:var(--muted);margin-left:4px}
.d-st21 .ds{font-size:12px;color:var(--muted)}
@keyframes st21-spin{to{transform:rotate(360deg)}}
`,
      html: `<div class="box">
  <i class="ring gl" aria-hidden="true"></i><i class="ring" aria-hidden="true"></i>
  <div class="in">
    <div class="tp"><b>프로 요금제</b><span>추천</span></div>
    <div class="pz">9,900원<small>/ 월</small></div>
    <div class="ds">팀원 10명까지 무제한 사용</div>
  </div>
</div>`
    },
    {
      id: 'st22',
      ko: '스포트라이트 호버',
      en: 'Spotlight hover',
      desc: '포인터가 있는 자리에 둥근 빛이 따라다니며 카드 면과 테두리를 밝혀요.',
      prompt: '「스포트라이트 호버(Spotlight hover)」 카드 묶음을 만들어 줘. pointermove로 포인터 좌표를 CSS 변수 --x, --y에 넣고, 각 카드 면에는 반지름 110px의 옅은 radial-gradient를, 1.5px 테두리에는 반지름 90px의 강조색 빛을 그 좌표에 그려. 포인터가 떠나면 300ms 동안 서서히 꺼지게 하고, 키보드 포커스 때는 카드 중앙에 빛을 켜 줘.',
      css: `
.d-st22 .wrap{position:absolute;inset:0;display:grid;place-items:center}
.d-st22 .grid{display:flex;gap:10px;--o:0}
.d-st22 .cd{position:relative;width:116px;height:124px;padding:1.5px;border-radius:16px;background:var(--line);--x:-200px;--y:-200px;outline:none}
.d-st22 .cd::before{content:"";position:absolute;inset:0;border-radius:inherit;background:radial-gradient(90px circle at var(--x) var(--y),var(--accent),transparent 72%);opacity:var(--o);transition:opacity .3s}
.d-st22 .in{position:relative;height:100%;border-radius:14.5px;background:var(--surface);padding:13px 12px;overflow:hidden}
.d-st22 .in::after{content:"";position:absolute;inset:0;background:radial-gradient(110px circle at var(--x) var(--y),color-mix(in srgb,var(--accent) 26%,transparent),transparent 72%);opacity:var(--o);transition:opacity .3s;pointer-events:none}
.d-st22 .cd:focus-visible{--x:58px;--y:62px;--o:1}
.d-st22 .ic{width:30px;height:30px;border-radius:9px;display:grid;place-items:center;color:var(--accent);background:var(--accent-soft)}
.d-st22 .in b{display:block;margin-top:10px;font-size:14px;font-weight:800;color:var(--text)}
.d-st22 .in span{display:block;margin-top:4px;font-size:11px;line-height:1.45;color:var(--muted);word-break:keep-all}
.d-st22 .cur{position:absolute;left:0;top:0;z-index:2;opacity:0;pointer-events:none;transition:opacity .3s;filter:drop-shadow(0 1px 2px rgba(0,0,0,.3))}
`,
      html: `<div class="wrap">
  <div class="grid">
    <div class="cd" tabindex="0"><div class="in"><div class="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M13 3 5 13h6l-1 8 8-10h-6z"/></svg></div><b>빠른 예약</b><span>세 번 탭으로 결제까지 끝나요</span></div></div>
    <div class="cd" tabindex="0"><div class="in"><div class="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6z"/></svg></div><b>안심 환불</b><span>출발 하루 전까지 전액 환불</span></div></div>
  </div>
  ${st2xCur}
</div>`,
      run(el, ctx) {
        const grid = el.querySelector('.grid'), cds = [...el.querySelectorAll('.cd')], cur = el.querySelector('.cur');
        let auto = true;
        const set = (x, y) => {
          const r = el.getBoundingClientRect();
          cds.forEach(c => {
            const q = c.getBoundingClientRect();
            c.style.setProperty('--x', (x - (q.left - r.left)) + 'px');
            c.style.setProperty('--y', (y - (q.top - r.top)) + 'px');
          });
          grid.style.setProperty('--o', 1);
        };
        const mid = c => { c.style.setProperty('--x', (c.offsetWidth / 2) + 'px'); c.style.setProperty('--y', (c.offsetHeight / 2) + 'px'); };
        const off = () => {
          grid.style.setProperty('--o', 0);
          cds.forEach(c => { if (c.matches(':focus-visible')) mid(c); });
        };
        cds.forEach(c => ctx.on(c, 'focus', () => {
          if (!c.matches(':focus-visible')) return;
          if (auto) { auto = false; cur.style.opacity = 0; grid.style.setProperty('--o', 0); }
          mid(c);
        }));
        cur.style.opacity = 1;
        ctx.loop(t => {
          if (!auto) return false;
          const p = Math.min(1, t / 2800), W = el.clientWidth, H = el.clientHeight;
          const e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
          const x = W / 2 + (e - .5) * 210, y = H / 2 + Math.sin(p * Math.PI * 2) * 38;
          set(x, y);
          cur.style.transform = 'translate(' + x + 'px,' + y + 'px)';
          if (p >= 1) { auto = false; cur.style.opacity = 0; off(); return false; }
        });
        ctx.on(el, 'pointermove', e => {
          if (auto) { auto = false; cur.style.opacity = 0; }
          const r = el.getBoundingClientRect();
          set(e.clientX - r.left, e.clientY - r.top);
        });
        ctx.on(el, 'pointerleave', off);
      }
    }
  ]);
})();
