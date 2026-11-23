const cm2Xfmt = n => Math.round(n).toLocaleString('ko-KR');
const cm2Xcount = (ctx, node, from, to, ms) => {
  ctx.loop(t => {
    const p = Math.min(1, t / ms), e = 1 - Math.pow(1 - p, 3);
    node.textContent = cm2Xfmt(from + (to - from) * e);
    return p < 1;
  });
};
const cm2Xcheck = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>';

UIDEX.add('commerce', [
  {
    id: 'cm11',
    ko: '컬러 스와치',
    en: 'Color swatch',
    desc: '색 동그라미를 누르면 고른 색에 링이 생기고 상품 색도 따라 바뀌어요.',
    prompt: '「컬러 스와치(Color swatch)」를 만들어 줘. 지름 26px 색 동그라미 4개를 나란히 두고, 누르면 선택한 색 둘레에 2px 링이 0.2초 ease-out으로 생기며 상품 이미지 색과 "색상: 네이비" 글자가 함께 바뀌어. 색 이름을 aria-label로 넣고 role="radiogroup"으로 방향키 이동이 되게 해 줘.',
    css: `
.d-cm11 .bx{display:flex;gap:14px;align-items:center;width:248px;background:var(--surface);border-radius:18px;box-shadow:var(--shadow);padding:14px}
.d-cm11 .th{width:76px;height:76px;border-radius:14px;background:var(--surface-2);display:grid;place-items:center;flex:none}
.d-cm11 .th path{fill:#2b3a67;stroke:var(--muted);stroke-width:.4;transition:fill .3s ease-out}
.d-cm11 .nm{font-size:13.5px;font-weight:700}
.d-cm11 .cl{font-size:12px;color:var(--muted);margin-top:3px}
.d-cm11 .cl b{color:var(--text);font-weight:600}
.d-cm11 .sw{display:flex;gap:7px;margin-top:12px;padding-left:3px}
.d-cm11 .sw button{width:26px;height:26px;border-radius:50%;border:1px solid var(--line);padding:0;cursor:pointer;box-shadow:0 0 0 0 var(--surface),0 0 0 0 var(--text);transition:box-shadow .2s ease-out,transform .2s ease-out}
.d-cm11 .sw button.on{box-shadow:0 0 0 2px var(--surface),0 0 0 4px var(--text);transform:scale(.92)}
`,
    html: `<div class="bx">
  <div class="th"><svg width="54" height="54" viewBox="0 0 24 24"><path d="M8.5 3.5L3 6.5l2 4 2.2-1V20.5h9.6V9.5l2.2 1 2-4-5.5-3c-.6 1.4-1.8 2.2-3.5 2.2S9.1 4.9 8.5 3.5z"/></svg></div>
  <div><div class="nm">코튼 반팔 티셔츠</div><div class="cl">색상: <b>네이비</b></div>
  <div class="sw" role="radiogroup" aria-label="색상 선택">
    <button class="on" role="radio" aria-checked="true" aria-label="네이비" data-c="#2b3a67" style="background:#2b3a67"></button>
    <button role="radio" aria-checked="false" aria-label="올리브" data-c="#6f7f3c" style="background:#6f7f3c"></button>
    <button role="radio" aria-checked="false" aria-label="테라코타" data-c="#c8643c" style="background:#c8643c"></button>
    <button role="radio" aria-checked="false" aria-label="크림" data-c="#efe6d2" style="background:#efe6d2"></button>
  </div></div>
</div>`,
    run(el, ctx) {
      const bs = [...el.querySelectorAll('.sw button')], path = el.querySelector('.th path'), lab = el.querySelector('.cl b');
      const pick = b => {
        bs.forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-checked', x === b ? 'true' : 'false'); });
        path.style.fill = b.dataset.c; lab.textContent = b.getAttribute('aria-label');
      };
      bs.forEach(b => ctx.on(b, 'click', () => pick(b)));
      ctx.timeout(() => pick(bs[2]), 800);
      ctx.timeout(() => pick(bs[1]), 1700);
    }
  },
  {
    id: 'cm12',
    ko: '사이즈 선택',
    en: 'Size selector',
    desc: 'S·M·L 버튼 중 하나를 고르고, 품절 사이즈는 사선으로 막아 둬요.',
    prompt: '「사이즈 선택(Size selector)」을 만들어 줘. S·M·L·XL·2XL을 40×38px 버튼으로 나란히 두고, 고르면 테두리와 글자가 0.2초 ease-out으로 진해지며 아래에 실측 치수가 바뀌어. 품절 사이즈는 회색 글자에 대각선을 긋고 눌러도 선택되지 않게 aria-disabled를 넣어 줘.',
    css: `
.d-cm12 .bx{width:248px;background:var(--surface);border-radius:18px;box-shadow:var(--shadow);padding:14px 12px}
.d-cm12 .hd{display:flex;justify-content:space-between;align-items:baseline;font-size:13.5px;font-weight:700}
.d-cm12 .hd span{font-size:11.5px;font-weight:500;color:var(--muted);text-decoration:underline}
.d-cm12 .sz{display:flex;gap:6px;margin-top:10px}
.d-cm12 .sz button{flex:1;height:38px;border-radius:10px;border:1.5px solid var(--line);background:var(--surface);color:var(--text);font:inherit;font-size:13px;font-weight:600;padding:0;cursor:pointer;transition:border-color .2s ease-out,background .2s ease-out,color .2s ease-out,transform .2s ease-out}
.d-cm12 .sz button.on{border-color:var(--text);background:var(--text);color:var(--surface);transform:translateY(-2px)}
.d-cm12 .sz button.out{color:var(--muted);cursor:not-allowed;background:linear-gradient(to top right,transparent calc(50% - 1px),var(--line) calc(50% - 1px),var(--line) calc(50% + 1px),transparent calc(50% + 1px)),var(--surface-2)}
.d-cm12 .sz button.no{animation:cm12-no .3s ease-out}
.d-cm12 .info{margin-top:12px;font-size:12px;color:var(--muted);min-height:18px}
.d-cm12 .info b{color:var(--text)}
.d-cm12 .info.warn{color:var(--danger)}
@keyframes cm12-no{0%,100%{transform:none}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}
`,
    html: `<div class="bx">
  <div class="hd">사이즈<span>사이즈 가이드</span></div>
  <div class="sz" role="radiogroup" aria-label="사이즈 선택">
    <button role="radio" aria-checked="false" data-m="가슴 50 · 총장 66cm">S</button>
    <button role="radio" aria-checked="false" data-m="가슴 53 · 총장 68cm">M</button>
    <button role="radio" aria-checked="false" aria-disabled="true" class="out">L</button>
    <button role="radio" aria-checked="false" data-m="가슴 59 · 총장 72cm">XL</button>
    <button role="radio" aria-checked="false" data-m="가슴 62 · 총장 74cm">2XL</button>
  </div>
  <div class="info" aria-live="polite">사이즈를 골라 주세요</div>
</div>`,
    run(el, ctx) {
      const bs = [...el.querySelectorAll('.sz button')], info = el.querySelector('.info');
      const pick = b => {
        if (b.classList.contains('out')) {
          b.classList.remove('no'); void b.offsetWidth; b.classList.add('no');
          info.classList.add('warn'); info.textContent = b.textContent + ' 사이즈는 품절이에요';
          return;
        }
        bs.forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-checked', x === b ? 'true' : 'false'); });
        info.classList.remove('warn'); info.innerHTML = '<b>' + b.textContent + '</b> · ' + b.dataset.m;
      };
      bs.forEach(b => ctx.on(b, 'click', () => pick(b)));
      ctx.timeout(() => pick(bs[1]), 700);
      ctx.timeout(() => pick(bs[2]), 1500);
      ctx.timeout(() => pick(bs[3]), 2500);
    }
  },
  {
    id: 'cm13',
    ko: '요금제 표',
    en: 'Pricing table',
    pair: 'cm10',
    desc: '앵커링과 달리 요금제별로 되는 기능을 체크 표로 나란히 비교해요.',
    prompt: '「요금제 표(Pricing table)」를 만들어 줘. 베이직·프로·팀 3개 요금제를 열로, 저장 공간·팀 공유·우선 지원을 행으로 둔 비교 표에서 행이 0.1초 간격으로 8px 떠오르고 포함 기능에 체크가 톡 찍히게 해. 추천 열은 파란 2px 테두리와 "추천" 배지로 0.35초 ease-out 강조해 줘. 앵커링과 헷갈리지 않게 비싼 가격을 먼저 보여 주거나 나머지를 흐리게 하지는 마. table과 th scope로 만들고 미포함 칸도 글자로 읽히게 해 줘.',
    css: `
.d-cm13 .bx{position:relative;width:252px;margin-top:10px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow)}
.d-cm13 .fr{position:absolute;left:127px;top:-5px;bottom:-5px;width:64px;border:2px solid var(--accent);border-radius:13px;background:var(--accent-soft);opacity:0;transform:scale(.94);pointer-events:none;transition:opacity .35s ease-out,transform .35s ease-out}
.d-cm13 .bx.rec .fr{opacity:1;transform:none}
.d-cm13 .bdg{position:absolute;left:50%;top:-11px;padding:2px 9px;border-radius:999px;background:var(--accent);color:var(--accent-text);font-size:11px;font-weight:700;white-space:nowrap;transform:translateX(-50%) scale(0);transition:transform .3s cubic-bezier(.2,.8,.2,1) .1s}
.d-cm13 .bx.rec .bdg{transform:translateX(-50%) scale(1)}
.d-cm13 table{position:relative;width:100%;border-collapse:collapse;table-layout:fixed}
.d-cm13 col.lb{width:66px}
.d-cm13 th,.d-cm13 td{padding:0;text-align:center;font-size:11.5px;font-weight:600;color:var(--text)}
.d-cm13 thead th{height:46px;padding-top:5px;line-height:1.25}
.d-cm13 thead th span{display:block;font-size:11.5px;font-weight:700;color:var(--muted)}
.d-cm13 thead th b{display:block;font-size:13.5px;font-weight:800;letter-spacing:-.03em}
.d-cm13 thead th small{font-size:11px;font-weight:500;letter-spacing:0;color:var(--muted)}
.d-cm13 tbody tr{opacity:0;transform:translateY(8px);animation:cm13-up .4s cubic-bezier(.2,.8,.2,1) forwards}
.d-cm13 tbody tr:nth-child(2){animation-delay:.1s}
.d-cm13 tbody tr:nth-child(3){animation-delay:.2s}
.d-cm13 tbody th,.d-cm13 tbody td{height:26px;border-top:1px solid var(--line)}
.d-cm13 tbody th{padding-left:12px;text-align:left;font-weight:500;color:var(--muted);white-space:nowrap}
.d-cm13 .ok{display:inline-grid;vertical-align:middle;color:var(--accent);transform:scale(0);animation:cm13-pop .3s cubic-bezier(.2,.8,.2,1) .5s forwards}
.d-cm13 tbody tr:nth-child(2) .ok{animation-delay:.6s}
.d-cm13 tbody tr:nth-child(3) .ok{animation-delay:.7s}
.d-cm13 .no{color:var(--muted)}
.d-cm13 tfoot td{height:38px}
.d-cm13 .go{width:52px;height:26px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--text);font:inherit;font-size:11.5px;font-weight:700;padding:0;cursor:pointer;transition:background .2s ease-out,color .2s ease-out,border-color .2s ease-out}
.d-cm13 .go.on{background:var(--accent);border-color:var(--accent);color:var(--accent-text)}
@keyframes cm13-up{to{opacity:1;transform:none}}
@keyframes cm13-pop{to{transform:scale(1)}}
`,
    html: `<div class="bx">
  <div class="fr" aria-hidden="true"><span class="bdg">추천</span></div>
  <table>
    <colgroup><col class="lb"><col><col><col></colgroup>
    <thead><tr><td></td>
      <th scope="col"><span>베이직</span><b>9,900<small>원</small></b></th>
      <th scope="col"><span>프로 <span style="position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)">추천</span></span><b>19,900<small>원</small></b></th>
      <th scope="col"><span>팀</span><b>39,000<small>원</small></b></th>
    </tr></thead>
    <tbody>
      <tr><th scope="row">저장 공간</th><td>5GB</td><td>100GB</td><td>1TB</td></tr>
      <tr><th scope="row">팀 공유</th><td><span class="no" role="img" aria-label="미포함">–</span></td><td>CMOK</td><td>CMOK</td></tr>
      <tr><th scope="row">우선 지원</th><td><span class="no" role="img" aria-label="미포함">–</span></td><td><span class="no" role="img" aria-label="미포함">–</span></td><td>CMOK</td></tr>
    </tbody>
    <tfoot><tr><td></td>
      <td><button class="go" aria-pressed="false" aria-label="베이직 선택">선택</button></td>
      <td><button class="go" aria-pressed="false" aria-label="프로 선택">선택</button></td>
      <td><button class="go" aria-pressed="false" aria-label="팀 선택">선택</button></td>
    </tr></tfoot>
  </table>
</div>`.split('CMOK').join('<span class="ok" role="img" aria-label="포함">' + cm2Xcheck + '</span>'),
    run(el, ctx) {
      const bx = el.querySelector('.bx'), gos = [...el.querySelectorAll('.go')];
      const pick = g => gos.forEach(x => { const on = x === g; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); x.textContent = on ? '선택됨' : '선택'; });
      gos.forEach(g => ctx.on(g, 'click', () => pick(g)));
      ctx.timeout(() => bx.classList.add('rec'), 1100);
      ctx.timeout(() => pick(gos[1]), 1500);
    }
  },
  {
    id: 'cm14',
    ko: '결제 주기 토글',
    en: 'Billing toggle',
    desc: '월간·연간을 바꾸면 가격 숫자가 바뀌고 연간 혜택이 함께 보여요.',
    prompt: '「결제 주기 토글(Billing toggle)」을 만들어 줘. 월간/연간 두 칸짜리 알약 스위치를 누르면 흰 선택 판이 0.25초 ease-out으로 옆 칸에 미끄러지고, 가격이 월 12,900원에서 10,750원으로 0.4초 동안 카운트되며 "2개월 무료" 배지가 톡 나타나. 스위치는 role="radiogroup"으로 만들고 가격 변화는 aria-live로 읽히게 해 줘.',
    css: `
.d-cm14 .wr{display:flex;flex-direction:column;align-items:center;width:236px;background:var(--surface);border-radius:18px;box-shadow:var(--shadow);padding:14px 14px 16px}
.d-cm14 .sg{position:relative;display:flex;width:168px;height:34px;padding:3px;border-radius:999px;background:var(--surface-2)}
.d-cm14 .sg i{position:absolute;left:3px;top:3px;width:81px;height:28px;border-radius:999px;background:var(--surface);box-shadow:var(--shadow);transition:transform .25s ease-out}
.d-cm14 .sg.yr i{transform:translateX(81px)}
.d-cm14 .sg button{position:relative;flex:1;border:0;background:none;font:inherit;font-size:13px;font-weight:600;color:var(--muted);cursor:pointer;padding:0;transition:color .25s}
.d-cm14 .sg button.on{color:var(--text)}
.d-cm14 .nm{margin-top:14px;font-size:12px;color:var(--muted)}
.d-cm14 .pr{margin-top:2px;font-size:28px;font-weight:800;letter-spacing:-.03em;font-variant-numeric:tabular-nums}
.d-cm14 .pr small{font-size:13px;font-weight:500;color:var(--muted);letter-spacing:0}
.d-cm14 .sub{display:flex;align-items:center;gap:6px;margin-top:6px;height:22px;font-size:12px;color:var(--muted)}
.d-cm14 .fr{padding:3px 8px;border-radius:999px;background:var(--accent-soft);color:var(--accent);font-size:11.5px;font-weight:700;transform:scale(0);transition:transform .3s cubic-bezier(.2,.8,.2,1)}
.d-cm14 .wr.yr .fr{transform:scale(1)}
`,
    html: `<div class="wr">
  <div class="sg" role="radiogroup" aria-label="결제 주기"><i></i><button class="on" role="radio" aria-checked="true">월간</button><button role="radio" aria-checked="false">연간</button></div>
  <div class="nm">프로 요금제</div>
  <div class="pr" aria-live="polite"><span class="n">12,900</span><small>원/월</small></div>
  <div class="sub"><span class="t">매달 결제</span><span class="fr">2개월 무료</span></div>
</div>`,
    run(el, ctx) {
      const wr = el.querySelector('.wr'), sg = el.querySelector('.sg'), bs = [...sg.querySelectorAll('button')];
      const n = el.querySelector('.n'), t = el.querySelector('.t');
      let yr = false, cur = 12900;
      const set = y => {
        if (y === yr) return; yr = y;
        sg.classList.toggle('yr', y); wr.classList.toggle('yr', y);
        bs.forEach((b, i) => { const on = (i === 1) === y; b.classList.toggle('on', on); b.setAttribute('aria-checked', on ? 'true' : 'false'); });
        const to = y ? 10750 : 12900, from = cur; cur = to;
        cm2Xcount(ctx, n, from, to, 400);
        t.textContent = y ? '연 129,000원 결제' : '매달 결제';
      };
      ctx.on(bs[0], 'click', () => set(false));
      ctx.on(bs[1], 'click', () => set(true));
      ctx.timeout(() => set(true), 1000);
    }
  },
  {
    id: 'cm15',
    ko: '타임 세일',
    en: 'Flash sale',
    pair: 'cm03',
    desc: '마감 타이머와 달리 한정 수량이 얼마나 팔렸는지 진행률 바로 보여줘요.',
    prompt: '「타임 세일(Flash sale)」 카드를 만들어 줘. 한정 200개 중 판매량을 10px 빨간 진행률 바로 보여 주고, 0%에서 78%까지 0.9초 ease-out으로 차오르며 "78% 판매" 숫자가 같이 올라가. 남은 시간은 옆에 작게만 둬. 마감 타이머와 헷갈리지 않게 시:분:초 타일을 주인공으로 크게 만들지는 마. 바에는 role="progressbar"를 넣어 줘.',
    css: `
.d-cm15 .bx{width:248px;background:var(--surface);border-radius:18px;box-shadow:var(--shadow);padding:14px}
.d-cm15 .top{display:flex;justify-content:space-between;align-items:center}
.d-cm15 .tag{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:7px;background:var(--danger);color:#fff;font-size:11.5px;font-weight:800}
.d-cm15 .tm{font-size:11.5px;color:var(--muted);font-variant-numeric:tabular-nums}
.d-cm15 .nm{margin-top:10px;font-size:13px;color:var(--muted)}
.d-cm15 .pr{font-size:19px;font-weight:800;letter-spacing:-.02em}
.d-cm15 .pr em{font-style:normal;font-size:13px;font-weight:700;letter-spacing:0;color:var(--danger);margin-right:6px}
.d-cm15 .bar{margin-top:12px;height:10px;border-radius:5px;background:var(--surface-2);overflow:hidden}
.d-cm15 .bar i{display:block;height:100%;width:0;border-radius:5px;background:var(--danger);transition:width .9s cubic-bezier(.2,.8,.2,1)}
.d-cm15 .ft{display:flex;justify-content:space-between;margin-top:7px;font-size:12px;color:var(--muted)}
.d-cm15 .ft b{color:var(--danger);font-weight:800}
.d-cm15 .ft b.bump{animation:cm15-bump .35s ease-out}
@keyframes cm15-bump{0%{transform:none}40%{transform:translateY(-3px)}100%{transform:none}}
`,
    html: `<div class="bx">
  <div class="top"><span class="tag"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4 14h6l-1 8 9-12h-6z"/></svg>타임 세일</span><span class="tm">남은 시간 <span class="clk">02:14:09</span></span></div>
  <div class="nm">무선 핸디 청소기</div>
  <div class="pr"><em>42% 할인</em>69,000원</div>
  <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="판매 진행률"><i></i></div>
  <div class="ft"><span><b style="display:inline-block"><span class="pc">0</span>% 판매</b></span><span>한정 200개 중 <span class="sold">0</span>개</span></div>
</div>`,
    run(el, ctx) {
      const bar = el.querySelector('.bar'), fill = bar.querySelector('i'), pc = el.querySelector('.pc'), sold = el.querySelector('.sold');
      const b = el.querySelector('.ft b'), clk = el.querySelector('.clk');
      const s = 156; let left = 2 * 3600 + 14 * 60 + 9;
      const show = () => { fill.style.width = (s / 2) + '%'; bar.setAttribute('aria-valuenow', Math.round(s / 2)); };
      ctx.timeout(() => {
        show();
        ctx.loop(t => {
          const p = Math.min(1, t / 900), e = 1 - Math.pow(1 - p, 3);
          pc.textContent = Math.round(78 * e); sold.textContent = Math.round(156 * e);
          return p < 1;
        });
      }, 400);
      ctx.timeout(() => b.classList.add('bump'), 1320);
      ctx.interval(() => {
        left = left > 0 ? left - 1 : 0;
        clk.textContent = [Math.floor(left / 3600), Math.floor(left / 60) % 60, left % 60].map(v => String(v).padStart(2, '0')).join(':');
      }, 1000);
    }
  },
  {
    id: 'cm16',
    ko: '품절 표시',
    en: 'Sold out',
    pair: 'cm06',
    desc: '재고 표시와 달리 다 팔린 뒤 사진을 흐리고 버튼을 막아 살 수 없음을 알려요.',
    prompt: '「품절 표시(Sold out)」 상태를 만들어 줘. 재고가 0이 되면 상품 썸네일이 0.4초 ease-out으로 흑백·투명도 45%로 흐려지고 가운데에 "품절" 라벨이 scale 0.8→1로 찍히며, 구매 버튼은 회색 "품절"로 바뀌어 눌리지 않아. 재고 표시와 헷갈리지 않게 "3개 남음" 같은 재촉 문구나 수량 막대는 넣지 마. 버튼엔 disabled와 aria-disabled를 넣어 줘.',
    css: `
.d-cm16 .bx{display:flex;gap:14px;align-items:center;width:248px;background:var(--surface);border-radius:18px;box-shadow:var(--shadow);padding:14px}
.d-cm16 .th{position:relative;width:88px;height:88px;border-radius:14px;background:var(--accent-soft);color:var(--accent);display:grid;place-items:center;flex:none;overflow:hidden}
.d-cm16 .th svg{transition:opacity .4s ease-out,filter .4s ease-out}
.d-cm16 .lb{position:absolute;left:50%;top:50%;padding:4px 12px;border-radius:999px;background:var(--text);color:var(--surface);font-size:12.5px;font-weight:800;white-space:nowrap;opacity:0;transform:translate(-50%,-50%) scale(.8);transition:opacity .3s ease-out,transform .3s cubic-bezier(.2,.8,.2,1)}
.d-cm16 .inf{flex:1;min-width:0}
.d-cm16 .nm{font-size:13px;color:var(--muted);transition:color .4s}
.d-cm16 .pr{font-size:18px;font-weight:800;letter-spacing:-.02em;margin-top:2px;transition:color .4s}
.d-cm16 .buy{width:100%;height:34px;margin-top:10px;border-radius:10px;border:0;background:var(--accent);color:var(--accent-text);font:inherit;font-size:13px;font-weight:700;cursor:pointer;transition:background .3s,color .3s}
.d-cm16 .bx.so .th{background:var(--surface-2)}
.d-cm16 .bx.so .th svg{opacity:.45;filter:grayscale(1)}
.d-cm16 .bx.so .lb{opacity:1;transform:translate(-50%,-50%) scale(1)}
.d-cm16 .bx.so .pr{color:var(--muted)}
.d-cm16 .bx.so .buy{background:var(--surface-2);color:var(--muted);cursor:not-allowed}
.d-cm16 .buy.no{animation:cm16-no .3s ease-out}
@keyframes cm16-no{0%,100%{transform:none}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}
`,
    html: `<div class="bx">
  <div class="th"><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15c0-1 .8-2 2-2l5-5 3 2 2 4 4 1c1.3.3 2 1.2 2 2.5V19H3z"/><path d="M3 19h18M9.5 9.5l1.5 1.5"/></svg><span class="lb">품절</span></div>
  <div class="inf"><div class="nm">데일리 러닝화</div><div class="pr">79,000원</div><button class="buy">구매하기</button></div>
</div>`,
    run(el, ctx) {
      const bx = el.querySelector('.bx'), buy = el.querySelector('.buy');
      ctx.timeout(() => {
        bx.classList.add('so'); buy.textContent = '품절'; buy.setAttribute('aria-disabled', 'true');
      }, 1000);
      ctx.on(buy, 'click', () => {
        if (!bx.classList.contains('so')) return;
        buy.classList.remove('no'); void buy.offsetWidth; buy.classList.add('no');
      });
    }
  },
  {
    id: 'cm17',
    ko: '재입고 알림',
    en: 'Restock alert',
    desc: '품절된 상품에서 알림을 신청해 두면 다시 들어왔을 때 알려줘요.',
    prompt: '「재입고 알림(Restock alert)」 버튼을 만들어 줘. 품절 상품 아래 테두리형 "재입고 알림 받기" 버튼을 누르면 0.25초 ease-out으로 옅은 파란 배경의 "알림 신청 완료"로 바뀌고, 종 아이콘이 좌우 15도로 0.5초 흔들린 뒤 체크로 바뀌어. 아래엔 "입고되면 바로 알려드려요" 안내가 6px 떠오르고, 다시 누르면 취소되게 aria-pressed를 넣어 줘.',
    css: `
.d-cm17 .bx{width:244px;background:var(--surface);border-radius:18px;box-shadow:var(--shadow);padding:14px}
.d-cm17 .top{display:flex;gap:12px;align-items:center}
.d-cm17 .th{width:52px;height:52px;border-radius:12px;background:var(--surface-2);color:var(--muted);display:grid;place-items:center;flex:none}
.d-cm17 .nm{font-size:13.5px;font-weight:700}
.d-cm17 .so{display:inline-block;margin-top:4px;padding:2px 7px;border-radius:6px;background:var(--surface-2);color:var(--muted);font-size:11.5px;font-weight:700}
.d-cm17 .btn{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;height:38px;margin-top:12px;border-radius:11px;border:1.5px solid var(--accent);background:var(--surface);color:var(--accent);font:inherit;font-size:13.5px;font-weight:700;cursor:pointer;transition:background .25s ease-out,border-color .25s ease-out,transform .15s ease-out}
.d-cm17 .btn.press{transform:scale(.96)}
.d-cm17 .btn.on{background:var(--accent-soft);border-color:var(--accent-soft)}
.d-cm17 .btn .ic{display:grid;place-items:center;transform-origin:50% 10%}
.d-cm17 .btn .ic.ring{animation:cm17-ring .5s ease-in-out}
.d-cm17 .tip{margin-top:8px;text-align:center;font-size:12px;color:var(--muted);opacity:0;transform:translateY(6px);transition:opacity .3s ease-out,transform .3s ease-out}
.d-cm17 .tip.show{opacity:1;transform:none}
@keyframes cm17-ring{0%,100%{transform:rotate(0)}20%{transform:rotate(15deg)}40%{transform:rotate(-15deg)}60%{transform:rotate(10deg)}80%{transform:rotate(-6deg)}}
`,
    html: `<div class="bx">
  <div class="top"><div class="th"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 8V6a5 5 0 0 1 10 0v2"/><path d="M5 8h14l-1 12H6z"/></svg></div><div><div class="nm">캔버스 에코백 · 베이지</div><span class="so">일시 품절</span></div></div>
  <button class="btn" aria-pressed="false"><span class="ic"></span><span class="tx">재입고 알림 받기</span></button>
  <div class="tip" aria-live="polite">입고되면 바로 알려드려요 · 128명 신청</div>
</div>`,
    run(el, ctx) {
      const btn = el.querySelector('.btn'), ic = el.querySelector('.ic'), tx = el.querySelector('.tx'), tip = el.querySelector('.tip');
      const bell = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/></svg>';
      let on = false, seq = 0;
      ic.innerHTML = bell;
      const set = v => {
        on = v; const my = ++seq;
        btn.setAttribute('aria-pressed', v ? 'true' : 'false');
        btn.classList.toggle('on', v); tip.classList.toggle('show', v);
        ic.classList.remove('ring'); ic.innerHTML = bell;
        tx.textContent = v ? '알림 신청 완료' : '재입고 알림 받기';
        if (v) {
          void ic.offsetWidth; ic.classList.add('ring');
          ctx.timeout(() => { if (my === seq) { ic.classList.remove('ring'); ic.innerHTML = cm2Xcheck; } }, 520);
        }
      };
      ctx.on(btn, 'click', () => set(!on));
      ctx.timeout(() => btn.classList.add('press'), 900);
      ctx.timeout(() => { btn.classList.remove('press'); set(true); }, 1080);
    }
  },
  {
    id: 'cm18',
    ko: '구매 알림 팝업',
    en: 'Social proof notification',
    desc: '화면 구석에 최근 누가 샀는지 잠깐 떴다 사라져 인기 있다는 느낌을 줘요.',
    prompt: '「구매 알림 팝업(Social proof notification)」을 만들어 줘. 화면 왼쪽 아래에 "김** 님이 구매했어요 · 1분 전" 카드가 아래에서 16px 올라오며 0.35초 ease-out으로 나타나 2초 머문 뒤 사라지고, 잠시 뒤 다른 구매 건으로 반복돼. 이름은 김**처럼 가리고 본문을 덮지 않는 크기로 두며, role="status"로 읽히고 닫기 버튼으로 끌 수 있게 해 줘.',
    css: `
.d-cm18 .ph{padding:12px}
.d-cm18 .hd{display:flex;gap:8px;align-items:center}
.d-cm18 .hd .ui-line{width:70px}
.d-cm18 .hd .ui-line:last-child{width:26px;margin-left:auto}
.d-cm18 .gr{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}
.d-cm18 .gr .ui-thumb{height:58px}
.d-cm18 .gr .ui-line{margin-top:6px;width:70%}
.d-cm18 .pop{position:absolute;left:8px;bottom:8px;display:flex;align-items:center;gap:8px;max-width:204px;padding:8px 10px 8px 8px;border-radius:12px;background:var(--surface);border:1px solid var(--line);box-shadow:var(--shadow);opacity:0;transform:translateY(16px);transition:opacity .35s ease-out,transform .35s cubic-bezier(.2,.8,.2,1)}
.d-cm18 .pop.show{opacity:1;transform:none}
.d-cm18 .av{width:30px;height:30px;border-radius:9px;background:var(--accent-soft);color:var(--accent);display:grid;place-items:center;flex:none}
.d-cm18 .tx{min-width:0;font-size:11.5px;line-height:1.35;color:var(--muted)}
.d-cm18 .tx b{display:block;color:var(--text);font-size:12px;font-weight:700;white-space:nowrap}
.d-cm18 .tx span{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-cm18 .x{border:0;background:none;color:var(--muted);padding:2px;cursor:pointer;display:grid;place-items:center;flex:none}
`,
    html: `<div class="ui-phone ph">
  <div class="hd"><div class="ui-line"></div><div class="ui-line"></div></div>
  <div class="gr"><div><div class="ui-thumb"></div><div class="ui-line"></div></div><div><div class="ui-thumb"></div><div class="ui-line"></div></div><div><div class="ui-thumb"></div></div><div><div class="ui-thumb"></div></div></div>
  <div class="pop" role="status">
    <div class="av"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 8V6a5 5 0 0 1 10 0v2"/><path d="M5 8h14l-1 12H6z"/></svg></div>
    <div class="tx"><b class="who">김** 님이 구매했어요</b><span class="what">캠핑 의자 · 1분 전</span></div>
    <button class="x" aria-label="구매 알림 닫기"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
  </div>
</div>`,
    run(el, ctx) {
      const pop = el.querySelector('.pop'), who = el.querySelector('.who'), what = el.querySelector('.what');
      const list = [['김**', '캠핑 의자 · 1분 전'], ['이**', '원터치 텐트 · 방금'], ['박**', '보냉 텀블러 · 3분 전'], ['최**', '감성 랜턴 · 방금']];
      let i = 0, off = false;
      const cycle = () => {
        if (off) return;
        who.textContent = list[i % list.length][0] + ' 님이 구매했어요'; what.textContent = list[i % list.length][1]; i++;
        pop.classList.add('show');
        ctx.timeout(() => pop.classList.remove('show'), 2000);
      };
      ctx.on(el.querySelector('.x'), 'click', () => { off = true; pop.classList.remove('show'); });
      ctx.timeout(() => { cycle(); ctx.interval(cycle, 3000); }, 700);
    }
  },
  {
    id: 'cm19',
    ko: '스티키 구매 바',
    en: 'Sticky CTA bar',
    desc: '본문의 구매 버튼이 화면 밖으로 밀려나면 아래에 구매 바가 따라 올라와요.',
    prompt: '「스티키 구매 바(Sticky CTA bar)」를 만들어 줘. 상세 페이지를 스크롤해 본문의 구매 버튼이 화면 밖으로 나가면 하단에 가격과 구매 버튼이 든 높이 50px 바가 아래에서 0.3초 ease-out으로 올라오고, 버튼이 다시 보이면 내려가. 버튼이 보이는지는 스크롤 위치(또는 IntersectionObserver)로 감지하고, 숨겨진 동안엔 바에 inert를 넣어 키보드 포커스가 가지 않게 해 줘.',
    css: `
.d-cm19 .sc{position:absolute;inset:0;overflow:auto;padding:12px 12px 60px;scrollbar-width:none}
.d-cm19 .sc::-webkit-scrollbar{display:none}
.d-cm19 .hero{height:50px}
.d-cm19 .nm{margin-top:8px;font-size:12.5px;color:var(--muted)}
.d-cm19 .pr{font-size:16px;font-weight:800;letter-spacing:-.02em}
.d-cm19 .sc .ui-btn{width:100%;margin-top:8px}
.d-cm19 .sc .ui-line{margin-top:10px}
.d-cm19 .sc .blk{height:64px;margin-top:12px}
.d-cm19 .bar{position:absolute;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:space-between;gap:8px;height:50px;padding:0 12px;background:var(--surface);border-top:1px solid var(--line);box-shadow:var(--shadow);transform:translateY(105%);transition:transform .3s cubic-bezier(.2,.8,.2,1)}
.d-cm19 .bar.show{transform:none}
.d-cm19 .bar small{display:block;font-size:11px;color:var(--muted)}
.d-cm19 .bar b{font-size:14px;font-weight:800}
.d-cm19 .bar .ui-btn{height:32px;flex:none}
`,
    html: `<div class="ui-phone">
  <div class="sc" tabindex="0" aria-label="상품 상세">
    <div class="ui-thumb hero"></div>
    <div class="nm">경량 등산 배낭 28L</div><div class="pr">64,000원</div>
    <button class="ui-btn main">구매하기</button>
    <div class="ui-line" style="width:88%"></div><div class="ui-line" style="width:70%"></div>
    <div class="ui-thumb blk"></div>
    <div class="ui-line" style="width:92%"></div><div class="ui-line" style="width:60%"></div>
    <div class="ui-thumb blk"></div>
    <div class="ui-line" style="width:80%"></div><div class="ui-line" style="width:66%"></div>
  </div>
  <div class="bar"><div><small>경량 등산 배낭</small><b>64,000원</b></div><button class="ui-btn">구매하기</button></div>
</div>`,
    run(el, ctx) {
      const sc = el.querySelector('.sc'), main = el.querySelector('.main'), bar = el.querySelector('.bar');
      const sync = () => {
        const out = sc.scrollTop > main.offsetTop + main.offsetHeight - 6;
        bar.classList.toggle('show', out);
        if (out) bar.removeAttribute('inert'); else bar.setAttribute('inert', '');
      };
      ctx.on(sc, 'scroll', sync); sync();
      const ease = p => p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      let user = false;
      ['pointerdown', 'wheel', 'touchstart'].forEach(ev => ctx.on(sc, ev, () => { user = true; }));
      ctx.timeout(() => {
        const max = Math.min(190, sc.scrollHeight - sc.clientHeight);
        ctx.loop(t => {
          if (user) return false;
          const p = Math.min(1, t / 1100);
          sc.scrollTop = max * ease(p);
          return p < 1;
        });
      }, 600);
    }
  },
  {
    id: 'cm20',
    ko: '미니 장바구니',
    en: 'Mini cart',
    desc: '장바구니 아이콘을 누르면 페이지 이동 없이 담은 상품과 합계가 작게 펼쳐져요.',
    prompt: '「미니 장바구니(Mini cart)」를 만들어 줘. 헤더의 장바구니 아이콘을 누르면 그 아래로 너비 190px 패널이 scale 0.95→1, 0.25초 ease-out으로 펼쳐져 담은 상품 2개(이름·수량·가격), 합계, 결제 버튼을 보여 줘. 아이콘엔 수량 배지를 달고, 버튼엔 aria-expanded를 넣어 Esc나 바깥 클릭으로 닫히게 해 줘.',
    css: `
.d-cm20 .pg{position:relative;width:240px;height:188px;background:var(--surface);border-radius:18px;box-shadow:var(--shadow);overflow:hidden}
.d-cm20 .hd{display:flex;align-items:center;gap:8px;height:40px;padding:0 10px 0 14px;border-bottom:1px solid var(--line)}
.d-cm20 .hd .ui-line{width:64px}
.d-cm20 .ct{position:relative;margin-left:auto;width:32px;height:32px;border-radius:10px;border:0;background:none;color:var(--text);display:grid;place-items:center;cursor:pointer;padding:0;transition:background .2s}
.d-cm20 .ct.open{background:var(--accent-soft);color:var(--accent)}
.d-cm20 .ct em{position:absolute;right:1px;top:1px;min-width:15px;height:15px;padding:0 3px;border-radius:8px;background:var(--danger);color:#fff;font-size:10.5px;font-weight:800;font-style:normal;line-height:15px;text-align:center}
.d-cm20 .bg{padding:12px 14px;display:grid;grid-template-columns:1fr 1fr;gap:8px}
.d-cm20 .bg .ui-thumb{height:56px}
.d-cm20 .pn{position:absolute;right:8px;top:42px;width:190px;padding:8px 10px;border-radius:14px;background:var(--surface);border:1px solid var(--line);box-shadow:var(--shadow);opacity:0;transform:translateY(-6px) scale(.95);transform-origin:calc(100% - 16px) 0;pointer-events:none;visibility:hidden;transition:opacity .25s ease-out,transform .25s cubic-bezier(.2,.8,.2,1),visibility 0s .25s}
.d-cm20 .pn.open{opacity:1;transform:none;pointer-events:auto;visibility:visible;transition:opacity .25s ease-out,transform .25s cubic-bezier(.2,.8,.2,1),visibility 0s}
.d-cm20 .it{display:flex;align-items:center;gap:8px;font-size:12px}
.d-cm20 .it + .it{margin-top:6px}
.d-cm20 .it .ui-thumb{width:24px;height:24px;border-radius:7px;flex:none}
.d-cm20 .it span{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-cm20 .it span small{color:var(--muted);font-size:11px}
.d-cm20 .it b{font-weight:700;white-space:nowrap}
.d-cm20 .sum{display:flex;justify-content:space-between;margin-top:6px;padding-top:6px;border-top:1px solid var(--line);font-size:12px;color:var(--muted)}
.d-cm20 .sum b{color:var(--text);font-size:13.5px;font-weight:800}
.d-cm20 .pn .ui-btn{width:100%;height:30px;margin-top:6px}
`,
    html: `<div class="pg">
  <div class="hd"><div class="ui-line"></div>
    <button class="ct" aria-label="장바구니, 상품 2개" aria-expanded="false"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2.5l2.2 11h10.3l2-8H7"/><circle cx="9.5" cy="19.5" r="1.3"/><circle cx="17" cy="19.5" r="1.3"/></svg><em>2</em></button>
  </div>
  <div class="bg"><div class="ui-thumb"></div><div class="ui-thumb"></div><div class="ui-thumb"></div><div class="ui-thumb"></div></div>
  <div class="pn" role="dialog" aria-label="미니 장바구니">
    <div class="it"><div class="ui-thumb"></div><span>캠핑 의자 <small>× 1</small></span><b>39,000원</b></div>
    <div class="it"><div class="ui-thumb"></div><span>보냉 텀블러 <small>× 2</small></span><b>36,000원</b></div>
    <div class="sum"><span>합계</span><b>75,000원</b></div>
    <button class="ui-btn">결제하기</button>
  </div>
</div>`,
    run(el, ctx) {
      const ct = el.querySelector('.ct'), pn = el.querySelector('.pn'), pg = el.querySelector('.pg');
      const set = v => { pn.classList.toggle('open', v); ct.classList.toggle('open', v); ct.setAttribute('aria-expanded', v ? 'true' : 'false'); };
      ctx.on(ct, 'click', e => { e.stopPropagation(); set(!pn.classList.contains('open')); });
      ctx.on(pn, 'click', e => e.stopPropagation());
      ctx.on(pg, 'click', () => set(false));
      ctx.on(pg, 'keydown', e => { if (e.key === 'Escape') set(false); });
      ctx.timeout(() => set(true), 900);
    }
  },
  {
    id: 'cm21',
    ko: '프로모 코드',
    en: 'Promo code',
    pair: 'cm04',
    desc: '쿠폰 받기와 달리 코드를 직접 입력해 적용하면 할인 줄이 생기고 합계가 줄어요.',
    prompt: '「프로모 코드(Promo code)」 입력란을 만들어 줘. 결제 요약 위 입력창에 코드를 쓰고 "적용"을 누르면 "코드 할인 −3,900원" 줄이 0.3초 ease-out으로 펼쳐지고 합계가 39,000원에서 35,100원으로 0.4초 동안 카운트돼. 쿠폰 받기와 헷갈리지 않게 티켓 모양 카드나 받기 버튼은 넣지 마. 틀린 코드는 빨간 안내를 aria-live로 읽어 줘.',
    css: `
.d-cm21 .bx{width:244px;background:var(--surface);border-radius:18px;box-shadow:var(--shadow);padding:12px 14px}
.d-cm21 .in{display:flex;gap:6px}
.d-cm21 .in input{flex:1;min-width:0;height:34px;padding:0 10px;border-radius:10px;border:1.5px solid var(--line);background:var(--surface);color:var(--text);font:inherit;font-size:13px;font-weight:600;letter-spacing:.04em;outline:none;transition:border-color .2s}
.d-cm21 .in input::placeholder{color:var(--muted);font-weight:400;letter-spacing:0}
.d-cm21 .in input:focus,.d-cm21 .in input.ty{border-color:var(--accent)}
.d-cm21 .in input.ok{border-color:var(--success)}
.d-cm21 .in input.bad{border-color:var(--danger)}
.d-cm21 .in button{height:34px;padding:0 13px;border-radius:10px;border:0;background:var(--text);color:var(--surface);font:inherit;font-size:13px;font-weight:700;cursor:pointer;flex:none;transition:transform .15s ease-out}
.d-cm21 .in button.press{transform:scale(.94)}
.d-cm21 .msg{height:17px;margin-top:4px;font-size:11.5px;color:var(--muted)}
.d-cm21 .msg.ok{color:var(--success)}
.d-cm21 .msg.bad{color:var(--danger)}
.d-cm21 .rw{display:flex;justify-content:space-between;font-size:12.5px;color:var(--muted);line-height:22px}
.d-cm21 .rw.dc{height:0;opacity:0;overflow:hidden;color:var(--danger);font-weight:700;transition:height .3s ease-out,opacity .3s ease-out}
.d-cm21 .rw.dc.show{height:22px;opacity:1}
.d-cm21 .rw.tt{margin-top:6px;padding-top:6px;border-top:1px solid var(--line);color:var(--text);font-weight:700}
.d-cm21 .rw.tt b{font-size:17px;font-weight:800;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
`,
    html: `<div class="bx">
  <div class="in"><input type="text" placeholder="프로모 코드 입력" aria-label="프로모 코드" autocomplete="off" spellcheck="false"><button>적용</button></div>
  <div class="msg" aria-live="polite">예: WELCOME10</div>
  <div class="rw"><span>상품 금액</span><span>39,000원</span></div>
  <div class="rw dc"><span>코드 할인 (10%)</span><span>−3,900원</span></div>
  <div class="rw tt"><span>합계</span><b><span class="n">39,000</span>원</b></div>
</div>`,
    run(el, ctx) {
      const inp = el.querySelector('input'), btn = el.querySelector('.in button'), msg = el.querySelector('.msg');
      const dc = el.querySelector('.dc'), n = el.querySelector('.n');
      let cur = 39000;
      const total = to => { if (to === cur) return; const from = cur; cur = to; cm2Xcount(ctx, n, from, to, 400); };
      const apply = () => {
        const code = inp.value.trim().toUpperCase();
        inp.classList.remove('ty', 'ok', 'bad'); msg.classList.remove('ok', 'bad');
        if (code === 'WELCOME10') {
          inp.value = code; inp.classList.add('ok'); msg.classList.add('ok'); msg.textContent = '코드가 적용됐어요';
          dc.classList.add('show'); total(35100);
        } else {
          inp.classList.add('bad'); msg.classList.add('bad'); msg.textContent = code ? '사용할 수 없는 코드예요' : '코드를 입력해 주세요';
          dc.classList.remove('show'); total(39000);
        }
      };
      ctx.on(btn, 'click', apply);
      ctx.on(inp, 'keydown', e => { if (e.key === 'Enter') apply(); });
      let user = false;
      ctx.on(inp, 'pointerdown', () => { user = true; });
      const word = 'WELCOME10';
      word.split('').forEach((c, k) => ctx.timeout(() => {
        if (user) return;
        inp.classList.add('ty'); inp.value = word.slice(0, k + 1);
      }, 450 + k * 90));
      ctx.timeout(() => { if (!user) btn.classList.add('press'); }, 1450);
      ctx.timeout(() => { btn.classList.remove('press'); if (!user) apply(); }, 1600);
    }
  },
  {
    id: 'cm22',
    ko: '띠 배너',
    en: 'Announcement bar',
    desc: '화면 맨 위 한 줄 띠에 공지를 번갈아 보여 주고 X로 닫을 수 있어요.',
    prompt: '「띠 배너(Announcement bar)」를 만들어 줘. 화면 최상단에 높이 32px 파란 띠를 두고 공지 3개를 2초마다 아래에서 위로 0.35초 ease-out 롤링해. 오른쪽 X를 누르면 띠 높이가 0.25초 동안 0으로 접히며 본문이 따라 올라와. 닫기 버튼에 aria-label을 달고, 마우스를 올리거나 prefers-reduced-motion이면 롤링을 멈춰 줘.',
    css: `
.d-cm22 .ph{display:flex;flex-direction:column}
.d-cm22 .bn{position:relative;height:32px;flex:none;background:var(--accent);color:var(--accent-text);overflow:hidden;transition:height .25s ease-out}
.d-cm22 .bn.off{height:0;visibility:hidden;transition:height .25s ease-out,visibility 0s .25s}
.d-cm22 .tx{position:absolute;left:10px;right:30px;top:0;height:32px;line-height:32px;text-align:center;font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-cm22 .tx.in{animation:cm22-in .35s cubic-bezier(.2,.8,.2,1)}
.d-cm22 .tx.out{animation:cm22-out .35s cubic-bezier(.2,.8,.2,1) forwards}
.d-cm22 .x{position:absolute;right:4px;top:4px;width:24px;height:24px;border:0;border-radius:6px;background:none;color:inherit;display:grid;place-items:center;cursor:pointer;padding:0;opacity:.85}
.d-cm22 .nv{display:flex;align-items:center;gap:8px;height:36px;padding:0 12px;border-bottom:1px solid var(--line);flex:none}
.d-cm22 .nv .ui-line{width:60px}
.d-cm22 .nv .ui-line + .ui-line{width:22px;margin-left:auto}
.d-cm22 .bd{padding:10px 12px;display:grid;grid-template-columns:1fr 1fr;gap:8px}
.d-cm22 .bd .ui-thumb{height:62px}
.d-cm22 .bd .ui-thumb.w{grid-column:1 / 3;height:46px}
@keyframes cm22-in{from{transform:translateY(100%);opacity:0}to{transform:none;opacity:1}}
@keyframes cm22-out{to{transform:translateY(-100%);opacity:0}}
`,
    html: `<div class="ui-phone ph">
  <div class="bn" role="region" aria-label="공지"><div class="tx">첫 구매 10% 할인 쿠폰 드려요</div>
    <button class="x" aria-label="공지 닫기"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
  </div>
  <div class="nv"><div class="ui-line"></div><div class="ui-line"></div></div>
  <div class="bd"><div class="ui-thumb w"></div><div class="ui-thumb"></div><div class="ui-thumb"></div></div>
</div>`,
    run(el, ctx) {
      const bn = el.querySelector('.bn'), x = el.querySelector('.x');
      const list = ['첫 구매 10% 할인 쿠폰 드려요', '3만 원 이상 무료배송', '오늘 밤 12시까지 여름 세일'];
      let i = 0, hold = false, cur = el.querySelector('.tx');
      const roll = () => {
        if (hold || bn.classList.contains('off')) return;
        i = (i + 1) % list.length;
        const old = cur; old.classList.remove('in'); old.classList.add('out');
        ctx.timeout(() => old.remove(), 360);
        cur = document.createElement('div'); cur.className = 'tx in'; cur.textContent = list[i];
        bn.insertBefore(cur, x);
      };
      ctx.on(bn, 'pointerenter', () => { hold = true; });
      ctx.on(bn, 'pointerleave', () => { hold = false; });
      ctx.on(x, 'click', () => bn.classList.add('off'));
      ctx.timeout(() => { roll(); ctx.interval(roll, 2000); }, 1300);
    }
  }
]);
