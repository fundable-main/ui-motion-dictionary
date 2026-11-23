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
.d-pr01 .lnk{flex:1;height:3px;margin-top:14px;background:var(--line);border-radius:2px;overflow:hidden}
.d-pr01 .lnk i{display:block;height:100%;width:0;background:var(--accent);transition:width .4s ease-out}
`,
    html: `<div class="steps">
  <div class="st on"><div class="dot">1</div><div class="lab">주문</div></div>
  <div class="lnk"><i></i></div>
  <div class="st"><div class="dot">2</div><div class="lab">배송 중</div></div>
  <div class="lnk"><i></i></div>
  <div class="st"><div class="dot">3</div><div class="lab">도착</div></div>
</div>`,
    run(el, ctx) {
      const st = el.querySelectorAll('.st'), bars = el.querySelectorAll('.lnk i');
      const check = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>';
      const go = i => {
        st[i].classList.remove('on'); st[i].classList.add('done'); st[i].querySelector('.dot').innerHTML = check;
        bars[i].style.width = '100%';
        ctx.timeout(() => st[i + 1].classList.add('on'), 400);
      };
      ctx.timeout(() => go(0), 600);
      ctx.timeout(() => go(1), 1600);
    }
  },
  {
    id: 'pr02',
    ko: '진행 바',
    en: 'Progress bar',
    desc: '가로 막대가 차오르며 작업이 얼마나 끝났는지 알려줘요.',
    prompt: '「진행 바(Progress bar)」를 만들어 줘. 파일 업로드 카드 아래 높이 6px 둥근 트랙이 있고, 파란 채움이 진행률에 맞춰 0.3초 ease-out으로 늘어나며 옆 퍼센트 숫자도 함께 바뀌어. 100%가 되면 초록으로 바뀌고 "업로드 완료"를 보여 줘. role="progressbar"와 aria-valuenow를 꼭 넣어 줘.',
    css: `
.d-pr02 .bx{width:244px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);padding:16px}
.d-pr02 .top{display:flex;align-items:center;gap:12px}
.d-pr02 .ic{width:38px;height:38px;border-radius:11px;background:var(--accent-soft);color:var(--accent);display:grid;place-items:center;flex:none;transition:all .3s}
.d-pr02 .meta{flex:1;min-width:0}
.d-pr02 .meta b{display:block;font-size:13.5px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-pr02 .meta small{display:block;font-size:12px;color:var(--muted);white-space:nowrap}
.d-pr02 .pct{font-size:15px;font-weight:800;font-variant-numeric:tabular-nums;color:var(--accent);transition:color .3s}
.d-pr02 .track{margin-top:14px;height:6px;border-radius:3px;background:var(--surface-2);overflow:hidden}
.d-pr02 .track i{display:block;height:100%;width:0;border-radius:3px;background:var(--accent);transition:width .3s ease-out,background .3s}
.d-pr02 .bx.done .track i{background:var(--success)}
.d-pr02 .bx.done .pct{color:var(--success)}
.d-pr02 .bx.done .ic{background:color-mix(in srgb,var(--success) 16%,transparent);color:var(--success)}
`,
    html: `<div class="bx" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
  <div class="top">
    <div class="ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4M6 10l6-6 6 6M4 20h16"/></svg></div>
    <div class="meta"><b>제주여행.zip</b><small class="sub">업로드 중 · 48MB</small></div>
    <span class="pct">0%</span>
  </div>
  <div class="track"><i></i></div>
</div>`,
    run(el, ctx) {
      const card = el.querySelector('.bx'), bar = el.querySelector('.track i'), pct = el.querySelector('.pct'), sub = el.querySelector('.sub');
      const steps = [12, 31, 47, 58, 74, 88, 100];
      steps.forEach((v, i) => ctx.timeout(() => {
        bar.style.width = v + '%'; pct.textContent = v + '%'; card.setAttribute('aria-valuenow', v);
        if (v === 100) { card.classList.add('done'); sub.textContent = '업로드 완료 · 48MB'; }
      }, 200 + i * 260));
    }
  },
  {
    id: 'pr03',
    ko: '원형 진행',
    en: 'Progress ring',
    desc: '원 둘레가 채워지며 목표까지 얼마나 왔는지 보여줘요.',
    prompt: '「원형 진행(Progress ring)」을 만들어 줘. 지름 96px SVG 원의 두께 10px 파란 호가 stroke-dashoffset으로 0에서 72%까지 1.2초 ease-out으로 그려지고, 가운데 숫자도 같이 0→72%로 올라가. 끝 모서리는 둥글게(round cap) 하고, 스크린리더용으로 "목표 72% 달성" aria-label을 달아 줘.',
    css: `
.d-pr03 .wr{display:flex;align-items:center;gap:18px;background:var(--surface);border-radius:18px;box-shadow:var(--shadow);padding:18px 20px}
.d-pr03 .ring{position:relative;width:96px;height:96px;flex:none}
.d-pr03 svg{transform:rotate(-90deg)}
.d-pr03 .bg{stroke:var(--surface-2)}
.d-pr03 .fg{stroke:var(--accent)}
.d-pr03 .pnum{position:absolute;inset:0;display:grid;place-items:center;font-size:22px;font-weight:800;font-variant-numeric:tabular-nums;letter-spacing:-.02em}
.d-pr03 .txt b{display:block;font-size:14px;font-weight:700}
.d-pr03 .txt small{display:block;font-size:12px;color:var(--muted);margin-top:3px}
.d-pr03 .txt em{font-style:normal;color:var(--accent);font-weight:700}
`,
    html: `<div class="wr" aria-label="목표 72% 달성">
  <div class="ring"><svg width="96" height="96" viewBox="0 0 96 96"><circle class="bg" cx="48" cy="48" r="40" fill="none" stroke-width="10"/><circle class="fg" cx="48" cy="48" r="40" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="251.3" stroke-dashoffset="251.3"/></svg><div class="pnum">0%</div></div>
  <div class="txt"><b>이번 달 걷기</b><small><em>7.2만</em> / 10만 보</small><small>목표까지 2.8만 보</small></div>
</div>`,
    run(el, ctx) {
      const fg = el.querySelector('.fg'), num = el.querySelector('.pnum'), C = 251.3, T = .72;
      ctx.loop(t => {
        const p = Math.min(1, Math.max(0, (t - 200) / 1200)), e = 1 - Math.pow(1 - p, 3);
        fg.setAttribute('stroke-dashoffset', (C * (1 - T * e)).toFixed(1));
        num.textContent = Math.round(72 * e) + '%';
        return p < 1;
      });
    }
  },
  {
    id: 'pr04',
    ko: '체크리스트',
    en: 'Checklist',
    desc: '할 일을 하나씩 체크하면 위쪽 진행 수치가 함께 올라가요.',
    prompt: '「체크리스트(Checklist)」를 만들어 줘. 항목을 누르면 체크박스가 0.25초 동안 살짝 커졌다 돌아오며 체크 표시가 그려지고, 글자는 회색 취소선으로 바뀌어. 상단 "3/4 완료" 수치와 얇은 진행 바도 즉시 갱신해 줘. 각 항목은 role="checkbox"와 aria-checked, Space 키 토글을 지원해 줘.',
    css: `
.d-pr04 .bx{width:236px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);padding:13px 14px}
.d-pr04 .hd{display:flex;justify-content:space-between;align-items:baseline;font-size:13.5px;font-weight:700}
.d-pr04 .hd span{font-size:12px;color:var(--accent);font-variant-numeric:tabular-nums}
.d-pr04 .mini{height:4px;border-radius:2px;background:var(--surface-2);margin:7px 0 6px;overflow:hidden}
.d-pr04 .mini i{display:block;height:100%;background:var(--accent);border-radius:2px;transition:width .35s cubic-bezier(.2,.8,.2,1)}
.d-pr04 .it{display:flex;align-items:center;gap:10px;padding:5px 2px;font-size:13px;cursor:pointer;user-select:none;border-radius:8px}
.d-pr04 .box{width:18px;height:18px;border-radius:6px;border:2px solid var(--line);display:grid;place-items:center;flex:none;color:var(--accent-text);transition:background .2s,border-color .2s}
.d-pr04 .box svg{stroke-dasharray:24;stroke-dashoffset:24;transition:stroke-dashoffset .25s ease-out .05s}
.d-pr04 .it .t{transition:color .25s;position:relative}
.d-pr04 .it .t::after{content:"";position:absolute;left:0;right:0;top:52%;height:1.5px;background:currentColor;transform:scaleX(0);transform-origin:left;transition:transform .3s ease-out}
.d-pr04 .it.on .box{background:var(--accent);border-color:var(--accent);animation:pr04-pop .25s ease-out}
.d-pr04 .it.on .box svg{stroke-dashoffset:0}
.d-pr04 .it.on .t{color:var(--muted)}
.d-pr04 .it.on .t::after{transform:scaleX(1)}
@keyframes pr04-pop{50%{transform:scale(1.18)}}
`,
    html: `<div class="bx">
  <div class="hd">여행 준비물<span class="cnt">1/4 완료</span></div>
  <div class="mini"><i style="width:25%"></i></div>
  <div class="it on" role="checkbox" aria-checked="true" tabindex="0"><span class="box"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg></span><span class="t">여권 챙기기</span></div>
  <div class="it" role="checkbox" aria-checked="false" tabindex="0"><span class="box"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg></span><span class="t">유심 구매하기</span></div>
  <div class="it" role="checkbox" aria-checked="false" tabindex="0"><span class="box"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg></span><span class="t">숙소 체크인 확인</span></div>
  <div class="it" role="checkbox" aria-checked="false" tabindex="0"><span class="box"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg></span><span class="t">환전 신청하기</span></div>
</div>`,
    run(el, ctx) {
      const its = [...el.querySelectorAll('.it')], cnt = el.querySelector('.cnt'), bar = el.querySelector('.mini i');
      const sync = () => { const n = its.filter(x => x.classList.contains('on')).length; cnt.textContent = n + '/4 완료'; bar.style.width = n * 25 + '%'; };
      const toggle = it => { const on = it.classList.toggle('on'); it.setAttribute('aria-checked', on); sync(); };
      its.forEach(it => {
        ctx.on(it, 'click', () => toggle(it));
        ctx.on(it, 'keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(it); } });
      });
      ctx.timeout(() => toggle(its[1]), 600);
      ctx.timeout(() => toggle(its[2]), 1300);
    }
  },
  {
    id: 'pr05',
    ko: '페이지 점',
    en: 'Page dots',
    pair: 'ly04',
    desc: '넘기는 화면 아래 점으로 지금 몇 번째 장인지 알려줘요.',
    prompt: '「페이지 점(Page dots)」을 만들어 줘. 가로로 넘기는 배너 아래 6px 점을 두고, 현재 장의 점은 너비 18px 알약 모양으로 0.3초 ease-out 늘어나며 파란색이 돼. 배너는 3초마다 넘어가고 점을 누르면 그 장으로 이동해. 캐러셀 본체가 아니라 점 표시만 다루고, 점마다 aria-label="3장 중 2번째"를 달아 줘.',
    css: `
.d-pr05 .wr{width:236px;display:flex;flex-direction:column;align-items:center;gap:12px}
.d-pr05 .vp{width:236px;height:118px;border-radius:16px;overflow:hidden;box-shadow:var(--shadow)}
.d-pr05 .tr{position:relative;height:100%}
.d-pr05 .sl{position:absolute;inset:0;padding:16px 18px;display:flex;flex-direction:column;justify-content:flex-end;color:#fff;opacity:0;transform:translateX(30px);transition:transform .45s cubic-bezier(.2,.8,.2,1),opacity .45s}
.d-pr05 .sl.on{opacity:1;transform:none;z-index:1}
.d-pr05 .sl.prev{transform:translateX(-30px)}
.d-pr05 .sl small{font-size:11.5px;opacity:.85}
.d-pr05 .sl b{font-size:17px;font-weight:800;letter-spacing:-.02em}
.d-pr05 .s1{background:linear-gradient(135deg,#3d7bff,#7aa5ff)}
.d-pr05 .s2{background:linear-gradient(135deg,#12a67a,#5fd3a8)}
.d-pr05 .s3{background:linear-gradient(135deg,#f2853c,#f9b56b)}
.d-pr05 .dots{display:flex;gap:6px}
.d-pr05 .dots button{width:6px;height:6px;padding:0;border:0;border-radius:3px;background:var(--line);cursor:pointer;transition:width .3s ease-out,background .3s}
.d-pr05 .dots button.on{width:18px;background:var(--accent)}
`,
    html: `<div class="wr">
  <div class="vp"><div class="tr">
    <div class="sl s1 on"><small>이번 주 특가</small><b>제주 3박 4일 29만원</b></div>
    <div class="sl s2"><small>주말 추천</small><b>강릉 당일치기 코스</b></div>
    <div class="sl s3"><small>얼리버드</small><b>부산 불꽃축제 숙소</b></div>
  </div></div>
  <div class="dots"><button class="on" aria-label="3장 중 1번째"></button><button aria-label="3장 중 2번째"></button><button aria-label="3장 중 3번째"></button></div>
</div>`,
    run(el, ctx) {
      const sl = [...el.querySelectorAll('.sl')], dots = [...el.querySelectorAll('.dots button')];
      let i = 0;
      const go = n => {
        if (n === i) return;
        sl.forEach((x, k) => { x.classList.toggle('on', k === n); x.classList.toggle('prev', k === i); });
        i = n; dots.forEach((d, k) => d.classList.toggle('on', k === i));
      };
      dots.forEach((d, k) => ctx.on(d, 'click', () => go(k)));
      ctx.timeout(() => go(1), 900);
      ctx.timeout(() => ctx.interval(() => go((i + 1) % 3), 3000), 900);
    }
  },
  {
    id: 'pr06',
    ko: '퍼센트 숫자',
    en: 'Percentage',
    pair: 'st01',
    desc: '진행 정도를 큰 % 숫자와 4칸 막대로 함께 보여줘요.',
    prompt: '「퍼센트 숫자(Percentage)」를 만들어 줘. 48px 굵은 숫자가 0%에서 86%까지 1초 동안 ease-out으로 올라가고, 자릿수가 흔들리지 않게 tabular-nums를 써 줘. 아래 4칸 세그먼트 바는 25% 단위로 차례로 파랗게 채워져. 카운트업 연출이 아니라 실제 진행률 값에 연동해 줘. aria-live="polite"는 최종값에서 한 번만 읽히게 해 줘.',
    css: `
.d-pr06 .bx{width:224px;background:var(--surface);border-radius:18px;box-shadow:var(--shadow);padding:16px 18px}
.d-pr06 small{font-size:12.5px;color:var(--muted);font-weight:600}
.d-pr06 .n{font-size:48px;line-height:1.05;font-weight:800;letter-spacing:-.04em;font-variant-numeric:tabular-nums;margin:4px 0 10px}
.d-pr06 .n span{font-size:24px;margin-left:2px;color:var(--muted)}
.d-pr06 .seg{display:flex;gap:4px}
.d-pr06 .seg i{flex:1;height:6px;border-radius:3px;background:var(--surface-2);transition:background .25s}
.d-pr06 .seg i.on{background:var(--accent)}
.d-pr06 .hint{display:block;margin-top:9px;font-size:12px;color:var(--muted)}
.d-pr06 .hint b{color:var(--accent)}
`,
    html: `<div class="bx"><small>프로필 완성도</small><div class="n"><b class="v">0</b><span>%</span></div><div class="seg"><i></i><i></i><i></i><i></i></div><span class="hint" aria-live="polite">사진만 추가하면 <b>100%</b>예요</span></div>`,
    run(el, ctx) {
      const v = el.querySelector('.v'), seg = el.querySelectorAll('.seg i');
      ctx.loop(t => {
        const p = Math.min(1, Math.max(0, (t - 150) / 1000)), n = Math.round(86 * (1 - Math.pow(1 - p, 3)));
        v.textContent = n; seg.forEach((s, k) => s.classList.toggle('on', n >= (k + 1) * 25));
        return p < 1;
      });
    }
  },
  {
    id: 'pr07',
    ko: '남은 시간',
    en: 'Time left',
    pair: 'cm03',
    desc: '"약 12초 남음"처럼 끝날 때까지 남은 시간을 함께 알려줘요.',
    prompt: '「남은 시간(Time left)」 표시를 만들어 줘. 다운로드 진행 바 오른쪽 위에 "약 12초 남음"을 두고 1초마다 숫자가 위로 밀려 올라가며 줄어들어(0.2초 ease-out). 속도가 바뀌어도 숫자가 튀지 않게 평균값으로 계산하고, 0이 되면 "다운로드 완료"로 바꿔 줘. 남은 시간 텍스트는 aria-live="off"로 둬서 매초 읽히지 않게 해 줘.',
    css: `
.d-pr07 .bx{width:244px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);padding:16px}
.d-pr07 .row{display:flex;justify-content:space-between;align-items:center;font-size:13.5px;font-weight:700}
.d-pr07 .left{display:inline-flex;align-items:center;gap:5px;font-size:12.5px;font-weight:700;color:var(--accent);background:var(--accent-soft);padding:4px 9px;border-radius:999px;overflow:hidden;height:24px}
.d-pr07 .left .s{display:inline-block;font-variant-numeric:tabular-nums}
.d-pr07 .left .s.tick{animation:pr07-up .2s ease-out}
.d-pr07 .sub{font-size:12px;color:var(--muted);margin-top:4px}
.d-pr07 .track{margin-top:12px;height:6px;border-radius:3px;background:var(--surface-2);overflow:hidden}
.d-pr07 .track i{display:block;height:100%;width:0;background:var(--accent);border-radius:3px}
.d-pr07 .bx.done .left{color:var(--success);background:color-mix(in srgb,var(--success) 15%,transparent)}
.d-pr07 .bx.done .track i{background:var(--success)}
@keyframes pr07-up{from{transform:translateY(70%);opacity:0}to{transform:none;opacity:1}}
`,
    html: `<div class="bx">
  <div class="row">강의 영상 3편<span class="left" aria-live="off"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg><span class="s">약 12초 남음</span></span></div>
  <div class="sub">8.4MB/s · 96MB 중 <span class="mb">0</span>MB</div>
  <div class="track"><i></i></div>
</div>`,
    run(el, ctx) {
      const card = el.querySelector('.bx'), s = el.querySelector('.s'), bar = el.querySelector('.track i'), mb = el.querySelector('.mb');
      let sec = 12;
      ctx.loop(t => { const p = Math.min(1, t / 12000); bar.style.width = p * 100 + '%'; mb.textContent = Math.round(96 * p); return p < 1; });
      ctx.interval(() => {
        if (sec <= 0) return;
        sec--; s.classList.remove('tick'); void s.offsetWidth; s.classList.add('tick');
        if (sec === 0) { s.textContent = '다운로드 완료'; card.classList.add('done'); }
        else s.textContent = `약 ${sec}초 남음`;
      }, 1000);
    }
  },
  {
    id: 'pr08',
    ko: '완료 표시',
    en: 'Success state',
    desc: '버튼이 로딩을 거쳐 체크 표시로 바뀌며 끝났다는 걸 확실히 알려줘요.',
    prompt: '「완료 표시(Success state)」를 만들어 줘. "결제하기" 버튼을 누르면 0.3초 동안 원형으로 줄어들며 스피너가 돌고, 처리 후 초록 원이 살짝 커지며 체크 선이 0.4초 동안 그려져. 아래에 "결제가 완료됐어요"가 페이드 업으로 나타나. 완료 메시지는 role="status"로 읽히게 해 줘.',
    css: `
.d-pr08 .wr{display:flex;flex-direction:column;align-items:center;gap:12px;height:120px;justify-content:center}
.d-pr08 .btn{height:44px;width:188px;border-radius:14px;border:0;background:var(--accent);color:var(--accent-text);font-weight:700;font-size:14px;cursor:pointer;display:grid;place-items:center;transition:width .3s cubic-bezier(.2,.8,.2,1),border-radius .3s,background .3s,transform .15s}
.d-pr08 .btn:active{transform:scale(.97)}
.d-pr08 .btn.load{width:44px;border-radius:22px;cursor:default}
.d-pr08 .btn .sp{width:18px;height:18px;border-radius:50%;border:2.5px solid rgba(255,255,255,.35);border-top-color:#fff;animation:pr08-spin .7s linear infinite}
.d-pr08 .btn.ok{width:56px;height:56px;border-radius:28px;background:var(--success);animation:pr08-pop .4s cubic-bezier(.2,.8,.2,1)}
.d-pr08 .btn.ok path{stroke-dasharray:24;stroke-dashoffset:24;animation:pr08-draw .4s ease-out .1s forwards}
.d-pr08 .msg{text-align:center;opacity:0;transform:translateY(8px);transition:all .4s cubic-bezier(.2,.8,.2,1)}
.d-pr08 .msg.show{opacity:1;transform:none}
.d-pr08 .msg b{display:block;font-size:15px}
.d-pr08 .msg small{font-size:12px;color:var(--muted)}
@keyframes pr08-spin{to{transform:rotate(360deg)}}
@keyframes pr08-pop{0%{transform:scale(.6)}60%{transform:scale(1.08)}100%{transform:scale(1)}}
@keyframes pr08-draw{to{stroke-dashoffset:0}}
`,
    html: `<div class="wr"><button class="btn" type="button">39,000원 결제하기</button><div class="msg" role="status"><b>결제가 완료됐어요</b><small>캠핑 의자 · 내일 도착 예정</small></div></div>`,
    run(el, ctx) {
      const btn = el.querySelector('.btn'), msg = el.querySelector('.msg');
      const label = btn.textContent;
      let busy = false;
      const pay = () => {
        if (busy) return; busy = true;
        btn.classList.add('load'); btn.innerHTML = '<span class="sp"></span>';
        ctx.timeout(() => {
          btn.classList.remove('load'); btn.classList.add('ok');
          btn.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>';
          msg.classList.add('show');
        }, 800);
      };
      ctx.on(btn, 'click', () => {
        if (btn.classList.contains('ok')) { btn.classList.remove('ok'); btn.textContent = label; msg.classList.remove('show'); busy = false; return; }
        pay();
      });
      ctx.timeout(pay, 450);
    }
  },
  {
    id: 'pr09',
    ko: '스켈레톤',
    en: 'Skeleton',
    desc: '내용이 오기 전 회색 뼈대를 먼저 보여줘 기다림을 덜 지루하게 해요.',
    prompt: '「스켈레톤(Skeleton)」 로딩을 만들어 줘. 실제 목록과 같은 크기의 회색 썸네일·두 줄 막대를 먼저 보여 주고, 왼쪽에서 오른쪽으로 1.4초 주기 shimmer 빛이 지나가. 데이터가 오면 0.3초 페이드로 실제 내용으로 교체해 줘. 로딩 중엔 aria-busy="true", prefers-reduced-motion이면 shimmer 없이 정지 상태로 보여 줘.',
    css: `
.d-pr09 .bx{width:244px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);padding:12px 14px;position:relative}
.d-pr09 .row{display:flex;align-items:center;gap:12px;padding:7px 0}
.d-pr09 .th{width:46px;height:46px;border-radius:12px;flex:none}
.d-pr09 .ln{flex:1;display:flex;flex-direction:column;gap:7px}
.d-pr09 .b{height:10px;border-radius:5px}
.d-pr09 .sk .th,.d-pr09 .sk .b{background:linear-gradient(90deg,var(--surface-2) 30%,var(--line) 50%,var(--surface-2) 70%);background-size:300% 100%;animation:pr09-sh 1.4s linear infinite}
.d-pr09 .real{position:absolute;inset:0;padding:12px 14px;opacity:0;transition:opacity .3s}
.d-pr09 .real .th{display:grid;place-items:center;color:#fff}
.d-pr09 .real b{font-size:13.5px;font-weight:700}
.d-pr09 .real small{font-size:12px;color:var(--muted)}
.d-pr09 .real small em{font-style:normal;color:var(--text);font-weight:700}
.d-pr09 .bx.loaded .sk{opacity:0;transition:opacity .3s}
.d-pr09 .bx.loaded .real{opacity:1}
@keyframes pr09-sh{from{background-position:100% 0}to{background-position:0 0}}
@media (prefers-reduced-motion: reduce){.d-pr09 .sk .th,.d-pr09 .sk .b{animation:none}}
`,
    html: `<div class="bx" aria-busy="true">
  <div class="sk">
    <div class="row"><div class="th"></div><div class="ln"><div class="b" style="width:80%"></div><div class="b" style="width:50%"></div></div></div>
    <div class="row"><div class="th"></div><div class="ln"><div class="b" style="width:70%"></div><div class="b" style="width:42%"></div></div></div>
  </div>
  <div class="real">
    <div class="row"><div class="th" style="background:linear-gradient(135deg,#ff9f43,#ffc56b)"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="13" r="7"/><path d="M12 6c0-2 1.5-3 3-3" stroke="currentColor" stroke-width="2" fill="none"/></svg></div><div class="ln"><b>제주 감귤 따기 체험</b><small>1인 <em>15,000원</em> · 리뷰 1,204</small></div></div>
    <div class="row"><div class="th" style="background:linear-gradient(135deg,#3d7bff,#7fb0ff)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 17c3-4 6-4 9 0s6 4 9 0M3 11c3-4 6-4 9 0s6 4 9 0"/></svg></div><div class="ln"><b>우도 전기 자전거</b><small>2시간 <em>18,000원</em> · 리뷰 862</small></div></div>
  </div>
</div>`,
    run(el, ctx) {
      const c = el.querySelector('.bx');
      ctx.timeout(() => { c.classList.add('loaded'); c.setAttribute('aria-busy', 'false'); }, 1500);
    }
  },
  {
    id: 'pr10',
    ko: '스피너',
    en: 'Spinner',
    desc: '끝을 알 수 없는 짧은 기다림 동안 빙글빙글 돌며 처리 중임을 알려줘요.',
    prompt: '「스피너(Spinner)」를 만들어 줘. 지름 32px 원형 트랙 위 파란 호가 0.8초에 한 바퀴 linear로 무한 회전하고, 필요하면 점 3개형·스포크형으로 바꿀 수 있게 해 줘. 1초 이상 걸릴 때만 노출해 깜빡임을 막고, role="status"에 "불러오는 중" 숨김 텍스트를 넣어 줘.',
    css: `
.d-pr10 .row{display:flex;gap:12px}
.d-pr10 .it{width:76px;height:96px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px}
.d-pr10 .it small{font-size:11.5px;color:var(--muted);font-weight:600}
.d-pr10 .ring{width:32px;height:32px;border-radius:50%;border:3.5px solid var(--surface-2);border-top-color:var(--accent);animation:pr10-spin .8s linear infinite}
.d-pr10 .dots{display:flex;gap:5px;height:32px;align-items:center}
.d-pr10 .dots i{width:8px;height:8px;border-radius:50%;background:var(--accent);animation:pr10-bounce 1s ease-in-out infinite}
.d-pr10 .dots i:nth-child(2){animation-delay:.15s}
.d-pr10 .dots i:nth-child(3){animation-delay:.3s}
.d-pr10 .spk{width:32px;height:32px;position:relative;animation:pr10-step 1s steps(8) infinite}
.d-pr10 .spk i{position:absolute;left:14.5px;top:0;width:3px;height:9px;border-radius:2px;background:var(--text);transform-origin:1.5px 16px}
.d-pr10 .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
@keyframes pr10-spin{to{transform:rotate(360deg)}}
@keyframes pr10-step{to{transform:rotate(360deg)}}
@keyframes pr10-bounce{0%,80%,100%{transform:translateY(0);opacity:.35}40%{transform:translateY(-8px);opacity:1}}
`,
    html: `<div class="row" role="status"><span class="sr">불러오는 중</span>
  <div class="it"><div class="ring"></div><small>원형</small></div>
  <div class="it"><div class="dots"><i></i><i></i><i></i></div><small>점 3개</small></div>
  <div class="it"><div class="spk"></div><small>스포크</small></div>
</div>`,
    run(el) {
      const s = el.querySelector('.spk');
      s.innerHTML = Array.from({ length: 8 }, (_, k) => `<i style="transform:rotate(${k * 45}deg);opacity:${(0.2 + k * 0.1).toFixed(2)}"></i>`).join('');
    }
  }
]);
