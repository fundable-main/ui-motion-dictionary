UIDEX.add('progress', [
  {
    id: 'pr01',
    ko: '단계 표시',
    en: 'Step indicator',
    desc: '주문→배송 중→도착처럼 지금 몇 번째 단계인지 한눈에 보여줘요.',
    prompt: '「단계 표시(Step indicator)」를 만들어 줘. 주문·배송 중·도착 3단계를 원과 연결선으로 보여 주고, 현재 단계가 바뀔 때 연결선이 0.4초 동안 ease-out으로 채워진 뒤 다음 원이 파란색으로 바뀌어. 완료 단계엔 체크 아이콘, 현재 단계엔 aria-current="step"을 넣어 줘.',
    css: `
.d-pr01 .steps{display:flex;align-items:flex-start;width:240px}
.d-pr01 .st{display:flex;flex-direction:column;align-items:center;gap:8px;width:56px;flex:none}
.d-pr01 .dot{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font-size:13px;font-weight:700;background:var(--surface);color:var(--muted);border:2px solid var(--line);transition:all .3s cubic-bezier(.2,.8,.2,1)}
.d-pr01 .st.on .dot{background:var(--accent);border-color:var(--accent);color:var(--accent-text);transform:scale(1.08)}
.d-pr01 .st.done .dot{background:var(--accent);border-color:var(--accent);color:var(--accent-text)}
.d-pr01 .lab{font-size:12px;color:var(--muted);transition:color .3s}
.d-pr01 .st.on .lab,.d-pr01 .st.done .lab{color:var(--text);font-weight:600}
.d-pr01 .bar{flex:1;height:3px;margin-top:14px;background:var(--line);border-radius:2px;overflow:hidden}
.d-pr01 .bar i{display:block;height:100%;width:0;background:var(--accent);transition:width .4s ease-out}
`,
    html: `<div class="steps">
  <div class="st on"><div class="dot">1</div><div class="lab">주문</div></div>
  <div class="bar"><i></i></div>
  <div class="st"><div class="dot">2</div><div class="lab">배송 중</div></div>
  <div class="bar"><i></i></div>
  <div class="st"><div class="dot">3</div><div class="lab">도착</div></div>
</div>`,
    run(el, ctx) {
      const st = el.querySelectorAll('.st'), bars = el.querySelectorAll('.bar i');
      const check = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>';
      const go = i => {
        st[i].classList.remove('on'); st[i].classList.add('done'); st[i].querySelector('.dot').innerHTML = check;
        bars[i].style.width = '100%';
        ctx.timeout(() => st[i + 1].classList.add('on'), 400);
      };
      ctx.timeout(() => go(0), 600);
      ctx.timeout(() => go(1), 1600);
    }
  }
]);
