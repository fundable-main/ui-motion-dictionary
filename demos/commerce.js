UIDEX.add('commerce', [
  {
    id: 'cm01',
    ko: '취소선 가격',
    en: 'Strikethrough price',
    desc: '원래 가격에 줄을 긋고 할인가를 크게 보여줘 싸졌다는 걸 강조해요.',
    prompt: '「취소선 가격(Strikethrough price)」을 만들어 줘. 회색 정가 52,000원 위로 1.5px 선이 왼쪽에서 오른쪽으로 0.4초 ease-out으로 그어지고, 이어서 빨간 할인율 25%와 굵은 할인가 39,000원이 아래에서 8px 떠오르며 나타나. 스크린리더엔 "정가 52,000원, 할인가 39,000원"으로 읽히게 <del>·<ins>를 써 줘.',
    css: `
.d-cm01 .bx{display:flex;gap:14px;align-items:center;width:248px;background:var(--surface);border-radius:18px;box-shadow:var(--shadow);padding:14px}
.d-cm01 .th{width:72px;height:72px;border-radius:14px;background:var(--accent-soft);color:var(--accent);display:grid;place-items:center;flex:none}
.d-cm01 .nm{font-size:13px;color:var(--muted)}
.d-cm01 del{position:relative;display:inline-block;text-decoration:none;font-size:14px;color:var(--muted);margin-top:4px}
.d-cm01 del::after{content:"";position:absolute;left:-2px;right:-2px;top:52%;height:1.5px;background:var(--muted);transform:scaleX(0);transform-origin:left;animation:cm01-line .4s ease-out .45s forwards}
.d-cm01 .now{display:flex;align-items:baseline;gap:6px;margin-top:2px;opacity:0;transform:translateY(8px);animation:cm01-up .4s cubic-bezier(.2,.8,.2,1) .95s forwards}
.d-cm01 .now b{color:var(--danger);font-size:19px;font-weight:800}
.d-cm01 .now ins{text-decoration:none;font-size:19px;font-weight:800;letter-spacing:-.02em}
@keyframes cm01-line{to{transform:scaleX(1)}}
@keyframes cm01-up{to{opacity:1;transform:none}}
`,
    html: `<div class="bx">
  <div class="th"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h12l-2 8H8z"/><path d="M8 12l-3 8M16 12l3 8M7 16h10"/></svg></div>
  <div><div class="nm">접이식 캠핑 의자</div><del aria-label="정가 52,000원">52,000원</del><div class="now"><b>25%</b><ins aria-label="할인가 39,000원">39,000원</ins></div></div>
</div>`
  },
  {
    id: 'cm02',
    ko: '할인율 배지',
    en: 'Discount badge',
    desc: '상품 사진 모서리에 할인율 딱지를 붙여 목록에서 눈에 띄게 해요.',
    prompt: '「할인율 배지(Discount badge)」를 만들어 줘. 상품 썸네일 왼쪽 위에 빨간 둥근 사각 배지 "25%"가 scale 0.4→1로 0.35초 동안 톡 튀어나오고, 3초마다 흰 빛줄기가 대각선으로 한 번 훑고 지나가. 글자는 흰색 12px 굵게, 반짝임은 prefers-reduced-motion에서 꺼 줘.',
    css: `
.d-cm02 .row{display:flex;gap:12px}
.d-cm02 .p{width:116px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);overflow:hidden}
.d-cm02 .th{position:relative;height:88px;display:grid;place-items:center}
.d-cm02 .p:nth-child(1) .th{background:linear-gradient(135deg,#e7efff,#cddcff)}
.d-cm02 .p:nth-child(2) .th{background:linear-gradient(135deg,#fff1e2,#ffdcb8)}
.d-cm02 .bd{position:absolute;left:8px;top:8px;overflow:hidden;padding:4px 8px;border-radius:8px;background:var(--danger);color:#fff;font-size:12px;font-weight:800;transform:scale(0);animation:cm02-pop .35s cubic-bezier(.2,.8,.2,1) .3s forwards}
.d-cm02 .p:nth-child(2) .bd{background:#111;animation-delay:.55s}
.d-cm02 .bd::after{content:"";position:absolute;top:-10px;bottom:-10px;left:-30px;width:14px;background:rgba(255,255,255,.65);transform:rotate(20deg);animation:cm02-shine 3s ease-in-out 1s infinite}
.d-cm02 .info{padding:8px 10px 10px}
.d-cm02 .info small{display:block;font-size:11.5px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-cm02 .info b{font-size:13.5px;font-weight:800;white-space:nowrap}
.d-cm02 .info b em{font-style:normal;color:var(--danger);margin-right:3px}
@keyframes cm02-pop{0%{transform:scale(.4)}70%{transform:scale(1.1)}100%{transform:scale(1)}}
@keyframes cm02-shine{0%{left:-30px}30%,100%{left:120%}}
@media (prefers-reduced-motion: reduce){.d-cm02 .bd::after{animation:none;display:none}}
`,
    html: `<div class="row">
  <div class="p"><div class="th"><svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#3d6fe0" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20L12 4l9 16z"/><path d="M12 4v16M9 20l3-5 3 5"/></svg><span class="bd">25%</span></div><div class="info"><small>2인용 원터치 텐트</small><b><em>25%</em>96,000원</b></div></div>
  <div class="p"><div class="th"><svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#e0782a" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9h12v8a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z"/><path d="M18 11h1.5a2 2 0 0 1 0 4H18M9 3v3M12 3v3M15 3v3"/></svg><span class="bd">1+1</span></div><div class="info"><small>스테인리스 머그컵</small><b>12,900원</b></div></div>
</div>`
  },
  {
    id: 'cm03',
    ko: '마감 타이머',
    en: 'Countdown',
    pair: 'pr07',
    desc: '끝나는 시각까지 초 단위로 줄어들며 지금 사야 할 이유를 만들어요.',
    prompt: '「마감 타이머(Countdown)」를 만들어 줘. "타임딜 종료까지" 아래 시:분:초를 어두운 둥근 타일에 나눠 보여 주고, 1초마다 바뀌는 숫자만 위에서 아래로 0.3초 ease-out 롤링돼. 작업 예상 시간이 아니라 판매 마감까지의 고정 카운트다운이며 서버 기준이고, 1시간 미만이면 빨간색으로 바꿔 줘. 타이머 전체는 aria-live를 끄고 분이 바뀔 때만 읽히게 해 줘.',
    css: `
.d-cm03 .wr{display:flex;flex-direction:column;align-items:center;gap:12px}
.d-cm03 .lb{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--danger)}
.d-cm03 .tm{display:flex;align-items:center;gap:6px}
.d-cm03 .grp{display:flex;gap:3px}
.d-cm03 .d{width:30px;height:44px;border-radius:9px;background:var(--text);color:var(--surface);display:grid;place-items:center;font-size:24px;font-weight:800;font-variant-numeric:tabular-nums;overflow:hidden}
.d-cm03 .d span{display:block}
.d-cm03 .d span.roll{animation:cm03-roll .3s ease-out}
.d-cm03 .col{font-size:22px;font-weight:800;color:var(--muted);margin-top:-3px}
.d-cm03 .sub{font-size:12px;color:var(--muted)}
.d-cm03 .sub b{color:var(--text)}
@keyframes cm03-roll{from{transform:translateY(-100%);opacity:0}to{transform:none;opacity:1}}
`,
    html: `<div class="wr">
  <div class="lb"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9 2h6"/></svg>타임딜 종료까지</div>
  <div class="tm" aria-live="off"><div class="grp"><div class="d"><span>0</span></div><div class="d"><span>2</span></div></div><span class="col">:</span><div class="grp"><div class="d"><span>1</span></div><div class="d"><span>4</span></div></div><span class="col">:</span><div class="grp"><div class="d"><span>0</span></div><div class="d"><span>9</span></div></div></div>
  <div class="sub">제주 왕복 항공권 <b>59,000원</b></div>
</div>`,
    run(el, ctx) {
      const ds = [...el.querySelectorAll('.d span')];
      let left = 2 * 3600 + 14 * 60 + 9;
      const fmt = s => [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60].map(n => String(n).padStart(2, '0')).join('');
      const tick = () => {
        left = left > 0 ? left - 1 : 2 * 3600 + 14 * 60 + 9;
        fmt(left).split('').forEach((c, k) => {
          if (ds[k].textContent !== c) { ds[k].textContent = c; ds[k].classList.remove('roll'); void ds[k].offsetWidth; ds[k].classList.add('roll'); }
        });
      };
      ctx.timeout(() => { tick(); ctx.interval(tick, 1000); }, 600);
    }
  },
  {
    id: 'cm04',
    ko: '쿠폰 받기',
    en: 'Coupon',
    desc: '티켓 모양 쿠폰의 받기 버튼을 누르면 바로 내 쿠폰함에 담겨요.',
    prompt: '「쿠폰 받기(Coupon)」를 만들어 줘. 양옆이 반원으로 파인 티켓 카드 왼쪽엔 "3,000원 할인", 오른쪽엔 다운로드 버튼을 두고, 누르면 버튼이 0.3초 회전하며 체크로 바뀌고 금액이 회색으로 바뀌어 받은 상태임을 보여 줘. 아래로 "쿠폰함에 담았어요" 안내가 떠올라. 버튼에는 aria-pressed를 달아 줘.',
    css: `
.d-cm04 .wr{display:flex;flex-direction:column;align-items:center;gap:12px}
.d-cm04 .tk{position:relative;display:flex;width:244px;height:92px;background:var(--surface);border-radius:14px;box-shadow:var(--shadow);cursor:pointer;transition:opacity .3s}
.d-cm04 .tk::before,.d-cm04 .tk::after{content:"";position:absolute;left:176px;width:16px;height:16px;border-radius:50%;background:var(--stage)}
.d-cm04 .tk::before{top:-8px}
.d-cm04 .tk::after{bottom:-8px}
.d-cm04 .l{flex:1;padding:14px 16px;border-right:1.5px dashed var(--line)}
.d-cm04 .l small{font-size:11.5px;color:var(--accent);font-weight:700}
.d-cm04 .l b{display:block;font-size:21px;font-weight:800;letter-spacing:-.02em;margin:1px 0;transition:color .3s}
.d-cm04 .l span{font-size:11.5px;color:var(--muted)}
.d-cm04 .r{width:60px;display:grid;place-items:center}
.d-cm04 .btn{width:38px;height:38px;border-radius:50%;border:0;background:var(--accent);color:var(--accent-text);display:grid;place-items:center;cursor:pointer;transition:background .3s,transform .3s cubic-bezier(.2,.8,.2,1)}
.d-cm04 .tk.got .btn{background:var(--surface-2);color:var(--success);transform:rotate(360deg)}
.d-cm04 .tk.got .l b{color:var(--muted)}
.d-cm04 .toast{font-size:12.5px;font-weight:600;background:var(--text);color:var(--surface);padding:7px 13px;border-radius:999px;opacity:0;transform:translateY(8px);transition:all .35s cubic-bezier(.2,.8,.2,1)}
.d-cm04 .toast.show{opacity:1;transform:none}
`,
    html: `<div class="wr">
  <div class="tk"><div class="l"><small>신규 회원 쿠폰</small><b>3,000원 할인</b><span>3만원 이상 · 7일 남음</span></div><div class="r"><button class="btn" type="button" aria-pressed="false" aria-label="쿠폰 받기"></button></div></div>
  <div class="toast">쿠폰함에 담았어요</div>
</div>`,
    run(el, ctx) {
      const tk = el.querySelector('.tk'), btn = el.querySelector('.btn'), toast = el.querySelector('.toast');
      const DL = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>';
      const OK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>';
      btn.innerHTML = DL;
      const set = on => {
        tk.classList.toggle('got', on); btn.setAttribute('aria-pressed', on); btn.innerHTML = on ? OK : DL;
        toast.classList.toggle('show', on);
      };
      ctx.on(tk, 'click', () => set(!tk.classList.contains('got')));
      ctx.timeout(() => set(true), 700);
    }
  },
  {
    id: 'cm05',
    ko: '묶음 할인',
    en: 'Bundle deal',
    desc: '함께 사면 더 싸지는 상품 조합을 하나로 묶어 합계 할인을 보여줘요.',
    prompt: '「묶음 할인(Bundle deal)」 영역을 만들어 줘. 텐트와 타프 카드가 양옆에서 0.4초 ease-out으로 모이며 가운데 "+" 원이 톡 나타나고, 아래 합계 178,000원에 취소선이 그어진 뒤 세트가 156,000원으로 바뀌고 "세트 12% 할인" 배지가 떠올라. 합계 영역엔 포함 상품을 aria-label로 읽어 줘.',
    css: `
.d-cm05 .wr{width:248px;display:flex;flex-direction:column;gap:9px}
.d-cm05 .items{display:flex;align-items:center;justify-content:space-between}
.d-cm05 .it{width:104px;background:var(--surface);border-radius:14px;box-shadow:var(--shadow);padding:8px;text-align:center;opacity:0}
.d-cm05 .it .ic{height:32px;border-radius:10px;background:var(--accent-soft);color:var(--accent);display:grid;place-items:center;margin-bottom:5px}
.d-cm05 .it small{display:block;font-size:11.5px;color:var(--muted)}
.d-cm05 .it b{font-size:13px;font-weight:700}
.d-cm05 .a{animation:cm05-inL .45s cubic-bezier(.2,.8,.2,1) .2s forwards}
.d-cm05 .b{animation:cm05-inR .45s cubic-bezier(.2,.8,.2,1) .2s forwards}
.d-cm05 .plus{width:26px;height:26px;border-radius:50%;background:var(--accent);color:var(--accent-text);display:grid;place-items:center;transform:scale(0);animation:cm05-pop .3s cubic-bezier(.2,.8,.2,1) .6s forwards}
.d-cm05 .sum{display:flex;align-items:center;justify-content:space-between;background:var(--surface);border-radius:14px;box-shadow:var(--shadow);padding:9px 12px}
.d-cm05 .sum del{position:relative;text-decoration:none;font-size:12px;color:var(--muted);display:block}
.d-cm05 .sum del::after{content:"";position:absolute;left:0;right:0;top:52%;height:1.5px;background:var(--muted);transform:scaleX(0);transform-origin:left;animation:cm05-line .35s ease-out .9s forwards}
.d-cm05 .sum b{white-space:nowrap;font-size:16px;font-weight:800;letter-spacing:-.02em;display:block;opacity:0;animation:cm05-fade .4s ease-out 1.2s forwards}
.d-cm05 .tag{white-space:nowrap;font-size:11.5px;font-weight:800;color:var(--danger);background:color-mix(in srgb,var(--danger) 12%,transparent);padding:5px 9px;border-radius:8px;opacity:0;transform:translateY(6px);animation:cm05-fade .4s cubic-bezier(.2,.8,.2,1) 1.35s forwards}
@keyframes cm05-inL{from{opacity:0;transform:translateX(-36px)}to{opacity:1;transform:none}}
@keyframes cm05-inR{from{opacity:0;transform:translateX(36px)}to{opacity:1;transform:none}}
@keyframes cm05-pop{70%{transform:scale(1.15)}to{transform:scale(1)}}
@keyframes cm05-line{to{transform:scaleX(1)}}
@keyframes cm05-fade{to{opacity:1;transform:none}}
`,
    html: `<div class="wr">
  <div class="items">
    <div class="it a"><div class="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M3 20L12 4l9 16zM12 4v16"/></svg></div><small>4인 텐트</small><b>129,000원</b></div>
    <div class="plus"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></div>
    <div class="it b"><div class="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9l10-4 10 4-10 3z"/><path d="M5 11v9M19 11v9"/></svg></div><small>헥사 타프</small><b>49,000원</b></div>
  </div>
  <div class="sum"><div><del>따로 사면 178,000원</del><b>156,000원</b></div><span class="tag">세트 12% 할인</span></div>
</div>`
  },
  {
    id: 'cm06',
    ko: '재고 표시',
    en: 'Low stock',
    desc: '"3개 남음"처럼 남은 수량이 줄어드는 걸 보여줘 구매를 서두르게 해요.',
    prompt: '「재고 표시(Low stock)」를 만들어 줘. 상품 옵션 아래 "남은 수량 5개"를 빨간 글씨로 두고, 재고가 줄면 숫자가 위로 밀려 바뀌며(0.25초) 막대도 함께 짧아져. 5개 이하일 땐 "품절 임박" 칩이 1.6초 주기로 은은하게 깜빡여. 깜빡임은 prefers-reduced-motion에서 멈추고, 수량은 텍스트로도 읽히게 해 줘.',
    css: `
.d-cm06 .bx{width:244px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);padding:14px 16px}
.d-cm06 .top{display:flex;justify-content:space-between;align-items:center}
.d-cm06 .top b{font-size:13.5px;font-weight:700}
.d-cm06 .stk{font-size:11.5px;font-weight:800;color:var(--danger);background:color-mix(in srgb,var(--danger) 12%,transparent);padding:4px 8px;border-radius:7px;animation:cm06-pulse 1.6s ease-in-out infinite}
.d-cm06 .opt{font-size:12px;color:var(--muted);margin-top:2px}
.d-cm06 .left{margin-top:12px;font-size:13px;color:var(--danger);font-weight:700;display:flex;align-items:center;gap:0}
.d-cm06 .n{display:inline-block;margin-left:5px;font-size:17px;font-weight:800;font-variant-numeric:tabular-nums;overflow:hidden;height:24px;line-height:24px}
.d-cm06 .n span{display:block}
.d-cm06 .n span.roll{animation:cm06-roll .25s ease-out}
.d-cm06 .track{margin-top:7px;height:6px;border-radius:3px;background:var(--surface-2);overflow:hidden}
.d-cm06 .track i{display:block;height:100%;width:25%;background:var(--danger);border-radius:3px;transition:width .4s cubic-bezier(.2,.8,.2,1)}
.d-cm06 .eye{display:flex;align-items:center;gap:5px;margin-top:10px;font-size:12px;color:var(--muted)}
@keyframes cm06-pulse{50%{opacity:.45}}
@keyframes cm06-roll{from{transform:translateY(100%)}to{transform:none}}
@media (prefers-reduced-motion: reduce){.d-cm06 .stk{animation:none}}
`,
    html: `<div class="bx">
  <div class="top"><b>캠핑 의자</b><span class="stk">품절 임박</span></div>
  <div class="opt">베이지 · 39,000원</div>
  <div class="left">남은 수량 <span class="n"><span>5</span></span>개</div>
  <div class="track"><i></i></div>
  <div class="eye"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>지금 18명이 보고 있어요</div>
</div>`,
    run(el, ctx) {
      const n = el.querySelector('.n span'), bar = el.querySelector('.track i');
      const set = v => { n.textContent = v; n.classList.remove('roll'); void n.offsetWidth; n.classList.add('roll'); bar.style.width = v * 5 + '%'; };
      ctx.timeout(() => set(4), 700);
      ctx.timeout(() => set(3), 1500);
    }
  },
  {
    id: 'cm07',
    ko: '최저가 표시',
    en: 'Lowest price',
    desc: '가격 그래프에서 지금이 가장 싸다는 걸 점과 배지로 짚어줘요.',
    prompt: '「최저가 표시(Lowest price)」를 만들어 줘. 최근 30일 가격 꺾은선이 왼쪽에서 오른쪽으로 0.9초 동안 그려지고, 마지막 오늘 지점에 초록 점이 커지며 "최근 30일 최저가" 배지가 위로 떠올라. 그래프 대신 읽을 수 있게 "30일 중 최저 39,000원" 텍스트 요약을 aria-label로 넣어 줘.',
    css: `
.d-cm07 .bx{width:248px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);padding:13px 14px 10px}
.d-cm07 .hd{display:flex;justify-content:space-between;align-items:center}
.d-cm07 .hd small{font-size:12px;color:var(--muted)}
.d-cm07 .hd b{display:block;font-size:18px;font-weight:800;letter-spacing:-.02em}
.d-cm07 .bd{font-size:11.5px;font-weight:800;color:var(--success);background:color-mix(in srgb,var(--success) 14%,transparent);padding:5px 9px;border-radius:8px;opacity:0;transform:translateY(8px);animation:cm07-up .4s cubic-bezier(.2,.8,.2,1) 1.2s forwards}
.d-cm07 svg{display:block;margin-top:6px;overflow:visible}
.d-cm07 .ln{fill:none;stroke:var(--accent);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:400;stroke-dashoffset:400;animation:cm07-draw .9s ease-out .15s forwards}
.d-cm07 .area{fill:var(--accent-soft);opacity:0;animation:cm07-fade .5s ease-out .8s forwards}
.d-cm07 .base{stroke:var(--line);stroke-dasharray:3 3}
.d-cm07 .pt{fill:var(--success);stroke:var(--surface);stroke-width:2.5;transform-origin:212px 50px;transform:scale(0);animation:cm07-pop .35s cubic-bezier(.2,.8,.2,1) 1.05s forwards}
.d-cm07 .ax{display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-top:3px}
@keyframes cm07-draw{to{stroke-dashoffset:0}}
@keyframes cm07-fade{to{opacity:.7}}
@keyframes cm07-pop{70%{transform:scale(1.3)}to{transform:scale(1)}}
@keyframes cm07-up{to{opacity:1;transform:none}}
`,
    html: `<div class="bx" aria-label="30일 중 최저 39,000원">
  <div class="hd"><div><small>오늘 가격</small><b>39,000원</b></div><span class="bd">최근 30일 최저가</span></div>
  <svg width="220" height="58" viewBox="0 0 220 58"><line class="base" x1="0" y1="50" x2="220" y2="50"/><path class="area" d="M4 22 L30 16 L56 26 L82 12 L108 20 L134 14 L160 30 L186 24 L212 50 L212 58 L4 58Z"/><path class="ln" d="M4 22 L30 16 L56 26 L82 12 L108 20 L134 14 L160 30 L186 24 L212 50"/><circle class="pt" cx="212" cy="50" r="6"/></svg>
  <div class="ax"><span>30일 전</span><span>오늘</span></div>
</div>`
  },
  {
    id: 'cm08',
    ko: '적립금',
    en: 'Reward points',
    desc: '결제하면 쌓일 포인트가 내 잔액으로 날아가 더해지는 걸 보여줘요.',
    prompt: '「적립금(Reward points)」 표시를 만들어 줘. 결제 요약의 "+1,950P 적립 예정"에서 작은 코인이 위쪽 내 포인트 알약으로 0.6초 곡선을 그리며 날아가고, 도착하면 잔액이 12,300P→14,250P로 0.8초 카운트업되며 알약이 살짝 튀어. 적립률 5%는 툴팁으로 설명하고, 최종 잔액은 aria-live로 알려 줘.',
    css: `
.d-cm08 .bx{position:relative;width:244px;background:var(--surface);border-radius:18px;box-shadow:var(--shadow);padding:12px 16px 14px}
.d-cm08 .pill{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:700;background:var(--surface-2);padding:6px 11px;border-radius:999px;font-variant-numeric:tabular-nums}
.d-cm08 .pill.bump{animation:cm08-bump .35s cubic-bezier(.2,.8,.2,1)}
.d-cm08 .pill .v{color:var(--accent)}
.d-cm08 .coin{width:18px;height:18px;border-radius:50%;background:linear-gradient(135deg,#ffd45c,#f5a524);color:#7a4a00;font-size:10px;font-weight:900;display:grid;place-items:center;flex:none}
.d-cm08 .rows{margin-top:12px;display:flex;flex-direction:column;gap:7px}
.d-cm08 .r{display:flex;justify-content:space-between;font-size:13px;color:var(--muted)}
.d-cm08 .r b{color:var(--text)}
.d-cm08 .r.pt b{color:var(--accent);display:inline-flex;align-items:center;gap:5px}
.d-cm08 .fly{position:absolute;left:0;top:0;pointer-events:none;opacity:0}
@keyframes cm08-bump{50%{transform:scale(1.12)}}
`,
    html: `<div class="bx">
  <span class="pill"><span class="coin">P</span>내 포인트 <span class="v" aria-live="polite">12,300P</span></span>
  <div class="rows">
    <div class="r"><span>결제 금액</span><b>39,000원</b></div>
    <div class="r pt" title="결제 금액의 5%가 적립돼요"><span>적립 예정 (5%)</span><b><span class="coin src">P</span>+1,950P</b></div>
  </div>
  <span class="coin fly">P</span>
</div>`,
    run(el, ctx) {
      const card = el.querySelector('.bx'), fly = el.querySelector('.fly'), src = el.querySelector('.src'), pill = el.querySelector('.pill'), dst = pill.querySelector('.coin'), v = el.querySelector('.v');
      ctx.timeout(() => {
        const cr = card.getBoundingClientRect(), a = src.getBoundingClientRect(), b = dst.getBoundingClientRect();
        const x0 = a.left - cr.left, y0 = a.top - cr.top, x1 = b.left - cr.left, y1 = b.top - cr.top;
        ctx.loop(t => {
          const p = Math.min(1, t / 600), e = 1 - Math.pow(1 - p, 2);
          const x = x0 + (x1 - x0) * e, y = y0 + (y1 - y0) * e - Math.sin(p * Math.PI) * 26;
          fly.style.opacity = p < 1 ? 1 : 0; fly.style.transform = `translate(${x}px,${y}px) scale(${1 + Math.sin(p * Math.PI) * .25})`;
          if (p >= 1) {
            pill.classList.add('bump');
            ctx.loop(t2 => { const q = Math.min(1, t2 / 800), n = Math.round(12300 + 1950 * (1 - Math.pow(1 - q, 3))); v.textContent = n.toLocaleString('ko-KR') + 'P'; return q < 1; });
          }
          return p < 1;
        });
      }, 500);
    }
  },
  {
    id: 'cm09',
    ko: '무료배송 바',
    en: 'Free shipping bar',
    desc: '무료배송까지 얼마 남았는지 막대로 보여줘 하나 더 담게 만들어요.',
    prompt: '「무료배송 바(Free shipping bar)」를 만들어 줘. 장바구니 위에 "12,000원 더 담으면 무료배송" 문구와 트럭 아이콘이 끝에 달린 진행 바를 두고, 상품을 담으면 바가 0.5초 ease-out으로 차오르며 100%에서 초록으로 바뀌고 "무료배송 조건을 채웠어요"로 문구가 바뀌어. 남은 금액 변화는 aria-live="polite"로 읽어 줘.',
    css: `
.d-cm09 .bx{width:248px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);padding:14px 16px}
.d-cm09 .msg{font-size:13px;font-weight:600;min-height:20px}
.d-cm09 .msg b{color:var(--accent)}
.d-cm09 .bx.ok .msg b{color:var(--success)}
.d-cm09 .track{position:relative;margin:14px 6px 0 0;height:8px;border-radius:4px;background:var(--surface-2)}
.d-cm09 .fill{position:absolute;left:0;top:0;bottom:0;width:70%;border-radius:4px;background:var(--accent);transition:width .5s ease-out,background .3s}
.d-cm09 .truck{position:absolute;right:-12px;top:50%;width:24px;height:24px;margin-top:-12px;border-radius:50%;background:var(--surface);border:2px solid var(--accent);color:var(--accent);display:grid;place-items:center;transition:border-color .3s,color .3s}
.d-cm09 .bx.ok .fill{background:var(--success)}
.d-cm09 .bx.ok .truck{border-color:var(--success);color:var(--success);animation:cm09-go .5s ease-out}
.d-cm09 .ax{display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-top:6px}
.d-cm09 .add{margin-top:10px;width:100%;height:36px;border-radius:10px;border:1px solid var(--line);background:var(--surface);color:var(--text);font-size:12.5px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;transition:background .2s}
.d-cm09 .add:active{transform:scale(.98)}
.d-cm09 .bx.ok .add{background:var(--surface-2);color:var(--muted)}
@keyframes cm09-go{50%{transform:translateX(4px) rotate(-8deg)}}
`,
    html: `<div class="bx">
  <div class="msg" aria-live="polite"><b>12,000원</b> 더 담으면 무료배송</div>
  <div class="track"><div class="fill"><span class="truck"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><path d="M2 6h11v10H2zM13 10h5l3 3v3h-8z"/><circle cx="6" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/></svg></span></div></div>
  <div class="ax"><span>28,000원 담음</span><span>40,000원</span></div>
  <button class="add" type="button">+ 등산 양말 12,000원 담기</button>
</div>`,
    run(el, ctx) {
      const card = el.querySelector('.bx'), fill = el.querySelector('.fill'), msg = el.querySelector('.msg'), ax = el.querySelector('.ax span'), add = el.querySelector('.add');
      const set = on => {
        card.classList.toggle('ok', on); fill.style.width = on ? '100%' : '70%';
        msg.innerHTML = on ? '<b>무료배송</b> 조건을 채웠어요' : '<b>12,000원</b> 더 담으면 무료배송';
        ax.textContent = on ? '40,000원 담음' : '28,000원 담음';
        add.textContent = on ? '✓ 등산 양말 담음' : '+ 등산 양말 12,000원 담기';
      };
      ctx.on(add, 'click', () => set(!card.classList.contains('ok')));
      ctx.timeout(() => set(true), 900);
    }
  },
  {
    id: 'cm10',
    ko: '앵커링',
    en: 'Anchoring',
    desc: '비싼 선택지를 먼저 보여줘 가운데 추천 가격이 합리적으로 느껴지게 해요.',
    prompt: '「앵커링(Anchoring)」 가격표를 만들어 줘. 가장 비싼 프리미엄 99,000원 카드가 먼저 나타나 기준점이 되고, 이어 베이직, 가운데 스탠다드 49,000원이 1.06배 커지며 파란 테두리와 "가장 많이 선택" 배지로 돋보여. 프리미엄 0.5초 뒤 베이직, 0.15초 뒤 스탠다드 순이며 나머지는 55%로 흐려져. 추천 카드엔 aria-describedby로 추천 이유를 연결해 줘.',
    css: `
.d-cm10 .row{display:flex;gap:7px;align-items:flex-end}
.d-cm10 .pl{position:relative;width:78px;padding:17px 8px 10px;background:var(--surface);border-radius:14px;box-shadow:var(--shadow);border:2px solid transparent;text-align:center;opacity:0;transform:translateY(10px);transition:transform .35s cubic-bezier(.2,.8,.2,1),border-color .3s,opacity .3s}
.d-cm10 .pl small{display:block;font-size:11.5px;color:var(--muted);font-weight:600}
.d-cm10 .pl b{display:block;font-size:15px;font-weight:800;letter-spacing:-.02em;margin-top:4px}
.d-cm10 .pl span{display:block;font-size:11px;color:var(--muted);margin-top:2px}
.d-cm10 .pl.in{animation:cm10-in .4s cubic-bezier(.2,.8,.2,1) forwards}
.d-cm10 .pl.hi{border-color:var(--accent);transform:scale(1.06);opacity:1;z-index:1}
.d-cm10 .pl.hi b{color:var(--accent)}
.d-cm10 .pl.dim{opacity:.55;transform:none}
.d-cm10 .pl .tag{margin:0;position:absolute;left:50%;top:-11px;transform:translateX(-50%) scale(0);white-space:nowrap;font-size:11px;font-weight:800;background:var(--accent);color:var(--accent-text);padding:3px 8px;border-radius:999px;transition:transform .3s cubic-bezier(.2,.8,.2,1)}
.d-cm10 .pl.hi .tag{transform:translateX(-50%) scale(1)}
@keyframes cm10-in{to{opacity:1;transform:none}}
`,
    html: `<div class="row">
  <div class="pl b1"><small>베이직</small><b>29,000</b><span>월 1회</span></div>
  <div class="pl b2"><span class="tag">가장 많이 선택</span><small>스탠다드</small><b>49,000</b><span id="cm10-why">월 4회</span></div>
  <div class="pl b3"><small>프리미엄</small><b>99,000</b><span>무제한</span></div>
</div>`,
    run(el, ctx) {
      const b1 = el.querySelector('.b1'), b2 = el.querySelector('.b2'), b3 = el.querySelector('.b3');
      b2.setAttribute('aria-describedby', 'cm10-why');
      ctx.timeout(() => b3.classList.add('in'), 150);
      ctx.timeout(() => b1.classList.add('in'), 650);
      ctx.timeout(() => b2.classList.add('in'), 800);
      ctx.timeout(() => { b2.classList.remove('in'); b2.classList.add('hi'); [b1, b3].forEach(x => { x.classList.remove('in'); x.classList.add('dim'); }); }, 1400);
    }
  }
]);
