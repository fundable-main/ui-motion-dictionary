/* data — 데이터·차트 (dt01~dt09) */
const dtSc = id => `
.d-${id} .sc{position:relative;width:236px;height:176px;border-radius:18px;background:var(--surface);box-shadow:var(--shadow);overflow:hidden;padding:12px;display:flex;flex-direction:column;gap:8px;word-break:keep-all;box-sizing:border-box}
.d-${id} .tp{display:flex;justify-content:space-between;align-items:center;flex:none;height:16px}
.d-${id} .tp b{font-size:13px;color:var(--text);white-space:nowrap}
.d-${id} .tp span{font-size:11px;color:var(--muted);white-space:nowrap}
`;
const dtEase = u => 1 - Math.pow(1 - Math.min(1, Math.max(0, u)), 3);
const dtFmt = n => Math.round(n).toLocaleString('ko-KR');
const dtPath = pts => pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');

/* dt01 데이터 */
const dtBars = [['월', 64], ['화', 82], ['수', 71], ['목', 96], ['금', 128], ['토', 110], ['일', 58]];
/* dt02 데이터 */
const dtLnV = [32, 45, 41, 60, 72, 86];
const dtLnP = dtLnV.map((v, i) => [32 + i * 33.6, 90 - v * 0.76]);
const dtLnF = (() => {
  const d = [0];
  for (let i = 1; i < dtLnP.length; i++) d.push(d[i - 1] + Math.hypot(dtLnP[i][0] - dtLnP[i - 1][0], dtLnP[i][1] - dtLnP[i - 1][1]));
  return d.map(x => x / d[d.length - 1]);
})();
/* dt03 데이터 */
const dtDon = [['식비', 45, 54, 'var(--accent)'], ['교통', 25, 30, 'var(--success)'], ['쇼핑', 20, 24, 'var(--warn)'], ['기타', 10, 12, 'color-mix(in srgb,var(--muted) 60%,var(--surface))']];
/* dt04 데이터 */
const dtSpk = [
  ['방문자', '12,480', [4, 5, 4, 6, 7, 6, 8, 9, 8, 10, 11, 13], '최근 12일 상승 추세'],
  ['주문 수', '842', [6, 7, 5, 6, 8, 7, 6, 8, 9, 8, 9, 10], '최근 12일 완만한 상승'],
  ['환불', '31', [9, 8, 9, 7, 8, 6, 7, 5, 6, 4, 4, 3], '최근 12일 하락 추세']
];
const dtSpkSvg = v => {
  const lo = Math.min(...v), hi = Math.max(...v);
  const p = v.map((y, i) => [3 + i * 5, 19 - (y - lo) / (hi - lo) * 16]);
  const e = p[p.length - 1];
  return `<svg width="64" height="22" viewBox="0 0 64 22" fill="none" aria-hidden="true"><path class="ln" pathLength="1" d="${dtPath(p)}"/><circle class="en" cx="${e[0]}" cy="${e[1].toFixed(1)}" r="2.4"/></svg>`;
};
/* dt06 데이터 */
const dtFun = [['방문', 1000], ['가입', 620], ['장바구니', 400], ['결제', 240]];
/* dt09 데이터 */
const dtTipV = [38, 44, 41, 52, 60, 55, 68, 74, 66, 82, 78, 90];
const dtTipP = dtTipV.map((v, i) => [8 + i * 17.8, 104 - (v - 30) * 1.3]);

UIDEX.add('data', [
  /* dt01 막대 차트 */
  {
    id: 'dt01', ko: '막대 차트', en: 'Bar chart',
    desc: '막대가 아래에서 차례로 자라고, 올리면 값이 떠요.',
    prompt: '「막대 차트(Bar chart)」를 만들어 줘. 요일별 주문 수 7개 막대가 바닥에서 위로 0.5초 ease-out으로 자라고, 왼쪽부터 70ms 간격으로 차례로 올라와. 막대에 마우스를 올리거나 키보드로 포커스하면 그 막대만 진한 파란색이 되고 위에 값이 떠. 각 막대에 "금요일 128건" 같은 aria-label을 넣어 줘.',
    css: dtSc('dt01') + `
.d-dt01 .bars{display:flex;align-items:flex-end;gap:8px;height:104px;flex:none;border-bottom:1px solid var(--line)}
.d-dt01 .col{flex:1;height:100%;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;cursor:pointer;outline:none}
.d-dt01 .col em{font-style:normal;font-size:11px;font-weight:700;color:var(--text);margin-bottom:3px;opacity:0;transform:translateY(4px);transition:opacity .18s,transform .2s ease-out;font-variant-numeric:tabular-nums}
.d-dt01 .col i{display:block;width:100%;height:0;border-radius:5px 5px 0 0;background:color-mix(in srgb,var(--accent) 36%,var(--surface));transition:height .5s cubic-bezier(.2,.8,.2,1),background .2s}
.d-dt01 .col.on em{opacity:1;transform:none}
.d-dt01 .col.on i{background:var(--accent)}
.d-dt01 .xs{display:flex;gap:8px;flex:none;margin-top:-3px}
.d-dt01 .xs span{flex:1;text-align:center;font-size:11px;color:var(--muted);line-height:13px}
.d-dt01 .xs span.on{color:var(--text);font-weight:700}
`,
    html: `<div class="sc"><div class="tp"><b>요일별 주문</b><span>단위: 건</span></div>
  <div class="bars">${dtBars.map(b => `<div class="col" tabindex="0" role="img" aria-label="${b[0]}요일 ${b[1]}건"><em>${b[1]}</em><i></i></div>`).join('')}</div>
  <div class="xs">${dtBars.map(b => `<span>${b[0]}</span>`).join('')}</div></div>`,
    run(el, ctx) {
      const cols = [...el.querySelectorAll('.col')], xs = [...el.querySelectorAll('.xs span')];
      const pick = k => cols.forEach((c, i) => { c.classList.toggle('on', i === k); xs[i].classList.toggle('on', i === k); });
      void el.offsetWidth;
      cols.forEach((c, i) => {
        const bar = c.querySelector('i');
        bar.style.transitionDelay = (i * 70) + 'ms,0ms';
        bar.style.height = Math.round(dtBars[i][1] / 128 * 84) + 'px';
        ctx.on(c, 'pointerenter', () => pick(i));
        ctx.on(c, 'focus', () => pick(i));
        ctx.on(c, 'click', () => pick(i));
      });
      ctx.timeout(() => pick(4), 1250);
    }
  },

  /* dt02 선 차트 */
  {
    id: 'dt02', ko: '선 차트', en: 'Line chart',
    desc: '선이 왼쪽에서 오른쪽으로 그려지며 변화 흐름을 보여줘요.',
    prompt: '「선 차트(Line chart)」를 만들어 줘. 1~6월 매출을 잇는 2px 선이 왼쪽에서 오른쪽으로 1.1초 동안 그려지고, 선이 지나가는 순서대로 지점마다 점이 톡 나타나. 가로·세로 축 눈금과 옅은 격자선을 함께 보여 주고, 점에 올리면 값 라벨이 떠. 스크린리더용으로 같은 수치를 표로도 제공해 줘.',
    css: dtSc('dt02') + `
.d-dt02 .plot{position:relative;width:212px;height:112px;flex:none}
.d-dt02 svg{display:block;overflow:visible}
.d-dt02 .gr{stroke:var(--line);stroke-width:1}
.d-dt02 text{font-size:11px;fill:var(--muted)}
.d-dt02 .ln{stroke:var(--accent);stroke-width:2;fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;stroke-dashoffset:1;animation:dt02-draw 1.1s linear .2s forwards}
.d-dt02 .pt{fill:var(--surface);stroke:var(--accent);stroke-width:2;opacity:0;transform-box:fill-box;transform-origin:center;animation:dt02-pop .3s cubic-bezier(.2,.8,.2,1) forwards;transition:fill .15s}
.d-dt02 .pt.hi{fill:var(--accent)}
.d-dt02 .hit{fill:transparent;cursor:pointer}
.d-dt02 .val{position:absolute;left:0;top:0;padding:2px 6px;border-radius:6px;background:var(--text);color:var(--surface);font-size:11px;font-weight:700;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .15s}
.d-dt02 .val.on{opacity:1}
@keyframes dt02-draw{to{stroke-dashoffset:0}}
@keyframes dt02-pop{from{opacity:0;transform:scale(0)}to{opacity:1;transform:scale(1)}}
`,
    html: `<div class="sc"><div class="tp"><b>월별 매출</b><span>단위: 만원</span></div>
  <div class="plot"><svg width="212" height="112" viewBox="0 0 212 112" role="img" aria-label="1월 32만원에서 6월 86만원으로 오른 월별 매출 선 차트">
    ${[[0, 90], [50, 52], [100, 14]].map(g => `<line class="gr" x1="28" x2="208" y1="${g[1]}" y2="${g[1]}"/><text x="23" y="${g[1] + 4}" text-anchor="end">${g[0]}</text>`).join('')}
    ${dtLnP.map((p, i) => `<text x="${p[0]}" y="108" text-anchor="middle">${i + 1}월</text>`).join('')}
    <path class="ln" pathLength="1" d="${dtPath(dtLnP)}"/>
    ${dtLnP.map((p, i) => `<circle class="pt" cx="${p[0]}" cy="${p[1].toFixed(1)}" r="3.5" style="animation-delay:${Math.round(200 + dtLnF[i] * 1100)}ms"/>`).join('')}
    ${dtLnP.map((p, i) => `<circle class="hit" data-i="${i}" cx="${p[0]}" cy="${p[1].toFixed(1)}" r="12"/>`).join('')}
  </svg><span class="val"></span></div></div>`,
    run(el, ctx) {
      const pts = [...el.querySelectorAll('.pt')], val = el.querySelector('.val');
      const show = i => {
        pts.forEach((p, k) => p.classList.toggle('hi', k === i));
        val.textContent = dtLnV[i] + '만';
        const x = Math.min(190, Math.max(18, dtLnP[i][0]));
        val.style.transform = `translate(${x}px,${dtLnP[i][1] - 26}px) translateX(-50%)`;
        val.classList.add('on');
      };
      el.querySelectorAll('.hit').forEach(h => {
        ctx.on(h, 'pointerenter', () => show(+h.dataset.i));
        ctx.on(h, 'click', () => show(+h.dataset.i));
      });
      ctx.timeout(() => show(5), 1500);
    }
  },

  /* dt03 도넛 차트 */
  {
    id: 'dt03', ko: '도넛 차트', en: 'Donut chart',
    desc: '조각이 시계 방향으로 채워지고 가운데에 합계가 떠요.',
    prompt: '「도넛 차트(Donut chart)」를 만들어 줘. 12시 방향에서 시작해 식비·교통·쇼핑·기타 조각이 시계 방향으로 1.2초 ease-out 동안 이어서 채워지고, 가운데 구멍에는 합계 120만 원이 함께 올라가며 표시돼. 범례 항목에 올리면 해당 조각만 두꺼워지고 가운데 값이 그 항목으로 바뀌어. 색만으로 구분하지 않게 범례에 이름과 비율을 적어 줘.',
    css: dtSc('dt03') + `
.d-dt03 .bd{display:flex;align-items:center;gap:12px;flex:1;min-height:0}
.d-dt03 .dn{position:relative;width:108px;height:108px;flex:none}
.d-dt03 svg{display:block}
.d-dt03 .tr{stroke:var(--surface-2)}
.d-dt03 .sg{transition:stroke-width .2s ease-out,opacity .2s}
.d-dt03 .dn.dim .sg{opacity:.28}
.d-dt03 .dn.dim .sg.hi{opacity:1;stroke-width:8}
.d-dt03 .ct{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none}
.d-dt03 .ct small{font-size:11px;color:var(--muted);line-height:14px}
.d-dt03 .ct b{font-size:15px;color:var(--text);letter-spacing:-.02em;font-variant-numeric:tabular-nums;line-height:19px}
.d-dt03 .lg{flex:1;display:flex;flex-direction:column;gap:2px;min-width:0}
.d-dt03 .li{display:flex;align-items:center;gap:6px;padding:4px 6px;border-radius:7px;font-size:12px;color:var(--text);cursor:pointer;outline:none;transition:background .15s}
.d-dt03 .li.hi{background:var(--surface-2)}
.d-dt03 .li i{width:8px;height:8px;border-radius:3px;flex:none}
.d-dt03 .li span{flex:1;white-space:nowrap}
.d-dt03 .li em{font-style:normal;font-size:11px;color:var(--muted);font-variant-numeric:tabular-nums}
`,
    html: `<div class="sc"><div class="tp"><b>11월 지출</b></div>
  <div class="bd"><div class="dn"><svg width="108" height="108" viewBox="0 0 42 42" fill="none" role="img" aria-label="11월 지출 합계 120만원 도넛 차트">
      <circle class="tr" cx="21" cy="21" r="15.9155" stroke-width="6"/>
      <g transform="rotate(-90 21 21)">${dtDon.map(d => `<circle class="sg" cx="21" cy="21" r="15.9155" stroke-width="6" stroke="${d[3]}" stroke-dasharray="0 100"/>`).join('')}</g>
    </svg><div class="ct"><small>합계</small><b>0만원</b></div></div>
    <div class="lg">${dtDon.map(d => `<div class="li" tabindex="0"><i style="background:${d[3]}"></i><span>${d[0]}</span><em>${d[1]}%</em></div>`).join('')}</div></div></div>`,
    run(el, ctx) {
      const dn = el.querySelector('.dn'), sg = [...el.querySelectorAll('.sg')], li = [...el.querySelectorAll('.li')];
      const lab = el.querySelector('.ct small'), num = el.querySelector('.ct b');
      let acc = 0, done = false;
      const st = dtDon.map(d => { const s = acc; acc += d[1]; return s; });
      sg.forEach((c, i) => c.setAttribute('stroke-dashoffset', -st[i]));
      ctx.loop(t => {
        const p = dtEase(t / 1200) * 100;
        sg.forEach((c, i) => {
          const v = Math.min(dtDon[i][1], Math.max(0, p - st[i]));
          c.setAttribute('stroke-dasharray', Math.max(0, v - 0.9).toFixed(2) + ' 100');
        });
        if (!dn.classList.contains('dim')) num.textContent = Math.round(p * 1.2) + '만원';
        if (t >= 1200) { done = true; return false; }
      });
      const hi = k => {
        dn.classList.add('dim');
        sg.forEach((c, i) => c.classList.toggle('hi', i === k));
        li.forEach((c, i) => c.classList.toggle('hi', i === k));
        lab.textContent = dtDon[k][0]; num.textContent = dtDon[k][2] + '만원';
      };
      const off = () => {
        dn.classList.remove('dim');
        sg.forEach(c => c.classList.remove('hi')); li.forEach(c => c.classList.remove('hi'));
        lab.textContent = '합계'; if (done) num.textContent = '120만원';
      };
      li.forEach((c, i) => {
        ctx.on(c, 'pointerenter', () => hi(i)); ctx.on(c, 'focus', () => hi(i));
        ctx.on(c, 'pointerleave', off); ctx.on(c, 'blur', off);
      });
      ctx.timeout(() => hi(0), 1600);
      ctx.timeout(off, 3000);
    }
  },

  /* dt04 스파크라인 */
  {
    id: 'dt04', ko: '스파크라인', en: 'Sparkline', pair: 'dt02',
    desc: '선 차트와 달리 축·라벨 없이 숫자 옆에 추세만 작게 그려요.',
    prompt: '「스파크라인(Sparkline)」을 만들어 줘. 지표 숫자 바로 옆에 너비 64px·높이 22px짜리 아주 작은 추세선을 넣고, 선은 0.7초 동안 왼쪽에서 오른쪽으로 그려진 뒤 마지막 지점에만 점을 찍어. aria-label로 "최근 12일 상승 추세"처럼 요약을 읽어 줘. 선 차트와 헷갈리지 않게 축·눈금·격자·값 라벨은 넣지 마.',
    css: dtSc('dt04') + `
.d-dt04 .sc{gap:4px}
.d-dt04 .rw{display:flex;align-items:center;gap:8px;flex:1;min-height:0;cursor:pointer;transition:opacity .15s}
.d-dt04 .rw + .rw{border-top:1px solid var(--line)}
.d-dt04 .rw:hover{opacity:.72}
.d-dt04 .rw span{flex:1;font-size:12px;color:var(--muted);white-space:nowrap}
.d-dt04 .rw b{font-size:15px;color:var(--text);letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.d-dt04 svg{flex:none;display:block;overflow:visible}
.d-dt04 .ln{stroke:var(--accent);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;stroke-dashoffset:1}
.d-dt04 .en{fill:var(--accent);opacity:0;transform-box:fill-box;transform-origin:center}
.d-dt04 .rw.go .ln{animation:dt04-draw .7s cubic-bezier(.4,0,.2,1) forwards}
.d-dt04 .rw.go .en{animation:dt04-dot .25s ease-out .62s forwards}
@keyframes dt04-draw{to{stroke-dashoffset:0}}
@keyframes dt04-dot{from{opacity:0;transform:scale(0)}to{opacity:1;transform:scale(1)}}
`,
    html: `<div class="sc"><div class="tp"><b>오늘 지표</b><span>최근 12일</span></div>
  ${dtSpk.map(s => `<div class="rw" role="group" aria-label="${s[0]} ${s[1]}, ${s[3]}"><span>${s[0]}</span><b>${s[1]}</b>${dtSpkSvg(s[2])}</div>`).join('')}</div>`,
    run(el, ctx) {
      const rows = [...el.querySelectorAll('.rw')];
      const draw = r => { r.classList.remove('go'); void r.offsetWidth; r.classList.add('go'); };
      rows.forEach((r, i) => {
        ctx.timeout(() => draw(r), 250 + i * 450);
        ctx.on(r, 'click', () => draw(r));
      });
    }
  },

  /* dt05 히트맵 */
  {
    id: 'dt05', ko: '히트맵', en: 'Heatmap',
    desc: '요일×주 격자 칸의 색 농도로 활동량을 보여줘요.',
    prompt: '「히트맵(Heatmap)」을 만들어 줘. 가로 12주 × 세로 7요일 격자에 11px 칸을 깔고, 활동량이 많을수록 파란색을 5단계로 진하게 칠해. 칸은 왼쪽 주부터 55ms 간격으로 0.3초 페이드인해. 칸에 올리면 테두리가 생기고 아래에 "8주차 수요일 · 6회"처럼 값이 표시돼. 색 단계 범례(적음~많음)와 칸별 aria-label을 넣어 줘.',
    css: dtSc('dt05') + `
.d-dt05 .bd{display:flex;gap:6px;flex:none;justify-content:center}
.d-dt05 .dy{display:grid;grid-template-rows:repeat(7,11px);gap:3px;font-size:11px;line-height:11px;color:var(--muted);flex:none}
.d-dt05 .gd{display:grid;grid-auto-flow:column;grid-template-rows:repeat(7,11px);grid-auto-columns:11px;gap:3px}
.d-dt05 .c{border-radius:3px;background:var(--surface-2);opacity:0;animation:dt05-in .3s ease-out forwards;cursor:pointer}
.d-dt05 .c.sel{outline:2px solid var(--text);outline-offset:1px}
.d-dt05 .ft{display:flex;justify-content:space-between;align-items:center;flex:none;height:14px;margin-top:auto}
.d-dt05 .cap{font-size:11px;color:var(--text);font-weight:600;white-space:nowrap}
.d-dt05 .lg{display:flex;align-items:center;gap:2px;font-size:11px;color:var(--muted);white-space:nowrap}
.d-dt05 .lg i{width:9px;height:9px;border-radius:2px;background:var(--surface-2)}
.d-dt05 .lg i:first-of-type{margin-left:2px}
.d-dt05 .lg i:last-of-type{margin-right:2px}
.d-dt05 .c.l1,.d-dt05 .lg i.l1{background:color-mix(in srgb,var(--accent) 26%,var(--surface-2))}
.d-dt05 .c.l2,.d-dt05 .lg i.l2{background:color-mix(in srgb,var(--accent) 50%,var(--surface-2))}
.d-dt05 .c.l3,.d-dt05 .lg i.l3{background:color-mix(in srgb,var(--accent) 75%,var(--surface-2))}
.d-dt05 .c.l4,.d-dt05 .lg i.l4{background:var(--accent)}
@keyframes dt05-in{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:scale(1)}}
`,
    html: `<div class="sc"><div class="tp"><b>운동 기록</b><span>최근 12주</span></div>
  <div class="bd"><div class="dy" aria-hidden="true"><span>월</span><span></span><span>수</span><span></span><span>금</span><span></span><span>일</span></div><div class="gd" role="group" aria-label="최근 12주 요일별 운동 횟수"></div></div>
  <div class="ft"><span class="cap">칸에 올려 보세요</span><span class="lg" aria-hidden="true">적음<i></i><i class="l1"></i><i class="l2"></i><i class="l3"></i><i class="l4"></i>많음</span></div></div>`,
    run(el, ctx) {
      const gd = el.querySelector('.gd'), cap = el.querySelector('.cap'), days = '월화수목금토일';
      let seed = 7, h = '';
      const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
      for (let w = 0; w < 12; w++) for (let d = 0; d < 7; d++) {
        let n = Math.floor(rnd() * (d > 4 ? 5 : 8) + w * 0.25);
        if (rnd() < 0.2) n = 0;
        if (w === 7 && d === 2) n = 6;
        n = Math.min(9, n);
        const lv = n === 0 ? 0 : n < 3 ? 1 : n < 5 ? 2 : n < 7 ? 3 : 4;
        const t = `${w + 1}주차 ${days[d]}요일 · ${n}회`;
        h += `<div class="c l${lv}" role="img" aria-label="${t}" data-t="${t}" style="animation-delay:${w * 55}ms"></div>`;
      }
      gd.innerHTML = h;
      let cur = null;
      const sel = c => { if (cur) cur.classList.remove('sel'); cur = c; c.classList.add('sel'); cap.textContent = c.dataset.t; };
      const hit = e => { const c = e.target.closest('.c'); if (c) sel(c); };
      ctx.on(gd, 'pointerover', hit);
      ctx.on(gd, 'click', hit);
      ctx.timeout(() => sel(gd.children[7 * 7 + 2]), 1300);
    }
  },

  /* dt06 퍼널 차트 */
  {
    id: 'dt06', ko: '퍼널 차트', en: 'Funnel chart',
    desc: '단계마다 좁아지는 막대로 어디서 이탈하는지 보여줘요.',
    prompt: '「퍼널 차트(Funnel chart)」를 만들어 줘. 방문→가입→장바구니→결제 4단계를 인원수에 비례해 아래로 갈수록 좁아지는 사다리꼴 막대로 쌓고, 위에서부터 0.3초 간격으로 0.35초 ease-out으로 펼쳐져. 각 단계 옆에 이전 단계 대비 전환율(62% 등)을 적고, 단계에 올리면 방문 대비 비율을 보여 줘. 수치는 텍스트로도 읽히게 해.',
    css: dtSc('dt06') + `
.d-dt06 .fn{display:flex;flex-direction:column;gap:3px;flex:1;min-height:0}
.d-dt06 .rw{display:grid;grid-template-columns:74px 1fr 40px;align-items:center;gap:4px;flex:1;min-height:0;cursor:pointer;outline:none;transition:opacity .2s}
.d-dt06 .fn.dim .rw{opacity:.4}
.d-dt06 .fn.dim .rw.hi{opacity:1}
.d-dt06 .nm{display:flex;align-items:baseline;gap:4px;white-space:nowrap;opacity:0;transition:opacity .3s}
.d-dt06 .nm b{font-size:12px;color:var(--text)}
.d-dt06 .nm em{font-style:normal;font-size:11px;color:var(--muted);font-variant-numeric:tabular-nums}
.d-dt06 .fz{height:100%;transform-origin:50% 0;transform:scaleY(0);opacity:0;transition:transform .35s cubic-bezier(.2,.8,.2,1),opacity .25s}
.d-dt06 .rt{display:flex;align-items:center;justify-content:flex-end;gap:2px;font-size:11px;font-weight:700;color:var(--muted);font-variant-numeric:tabular-nums;opacity:0;transform:translateY(-4px);transition:opacity .25s .2s,transform .3s ease-out .2s}
.d-dt06 .rw.in .nm,.d-dt06 .rw.in .fz{opacity:1}
.d-dt06 .rw.in .fz{transform:none}
.d-dt06 .rw.in .rt{opacity:1;transform:none}
.d-dt06 .tot{font-weight:700;transition:color .2s}
.d-dt06 .tot.on{color:var(--accent)}
`,
    html: `<div class="sc"><div class="tp"><b>구매 전환</b><span class="tot">전환율</span></div>
  <div class="fn">${dtFun.map((f, i) => {
      const w = f[1] / 10, n = i < 3 ? dtFun[i + 1][1] / 10 : w * 0.8;
      const mix = [100, 76, 56, 40][i];
      return `<div class="rw" tabindex="0" role="group" aria-label="${f[0]} ${dtFmt(f[1])}명${i ? ', 이전 단계 대비 ' + Math.round(f[1] / dtFun[i - 1][1] * 100) + '%' : ''}"><span class="nm"><b>${f[0]}</b><em>${dtFmt(f[1])}</em></span><div class="fz" style="background:color-mix(in srgb,var(--accent) ${mix}%,var(--surface));clip-path:polygon(${50 - w / 2}% 0,${50 + w / 2}% 0,${50 + n / 2}% 100%,${50 - n / 2}% 100%)"></div><span class="rt">${i ? '<svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 1v8M2 6l3 3 3-3"/></svg>' + Math.round(f[1] / dtFun[i - 1][1] * 100) + '%' : ''}</span></div>`;
    }).join('')}</div></div>`,
    run(el, ctx) {
      const fn = el.querySelector('.fn'), rows = [...el.querySelectorAll('.rw')], tot = el.querySelector('.tot');
      rows.forEach((r, i) => ctx.timeout(() => r.classList.add('in'), 200 + i * 300));
      const hi = k => {
        fn.classList.add('dim'); rows.forEach((r, i) => r.classList.toggle('hi', i === k));
        tot.textContent = k ? `방문 대비 ${Math.round(dtFun[k][1] / 10)}%` : '방문 1,000명';
        tot.classList.add('on');
      };
      const off = () => { fn.classList.remove('dim'); rows.forEach(r => r.classList.remove('hi')); tot.textContent = '최종 전환 24%'; };
      rows.forEach((r, i) => {
        ctx.on(r, 'pointerenter', () => hi(i)); ctx.on(r, 'focus', () => hi(i));
        ctx.on(r, 'pointerleave', off); ctx.on(r, 'blur', off);
      });
      ctx.timeout(() => { tot.textContent = '최종 전환 24%'; tot.classList.add('on'); }, 1500);
    }
  },

  /* dt07 증감 표시 */
  {
    id: 'dt07', ko: '증감 표시', en: 'Delta indicator',
    desc: '수치 옆 ▲초록·▼빨강 배지로 늘었는지 줄었는지 알려줘요.',
    prompt: '「증감 표시(Delta indicator)」를 만들어 줘. 매출·방문자 수치 옆에 비교 기간 대비 변화를 알약 모양 배지로 붙여. 늘면 초록 ▲12.4%, 줄면 빨강 ▼3.1%로 보이고, 기간을 바꾸면 배지가 0.6배에서 0.28초 동안 톡 커지며 바뀌어. 색에만 의존하지 않게 화살표 방향과 "지난주보다 12.4% 증가" aria-label을 함께 넣어 줘.',
    css: dtSc('dt07') + `
.d-dt07 .sc{gap:0}
.d-dt07 .seg{display:inline-flex;align-self:flex-start;padding:2px;border-radius:9px;background:var(--surface-2);flex:none}
.d-dt07 .seg button{height:22px;padding:0 9px;border:0;border-radius:7px;background:none;font:inherit;font-size:11px;font-weight:600;color:var(--muted);cursor:pointer;white-space:nowrap;transition:background .2s,color .2s}
.d-dt07 .seg button.on{background:var(--surface);color:var(--text);box-shadow:0 1px 2px rgba(0,0,0,.14)}
.d-dt07 .kp{flex:1;display:flex;flex-direction:column;justify-content:center;gap:1px;min-height:0}
.d-dt07 .kp + .kp{border-top:1px solid var(--line)}
.d-dt07 .lb{font-size:11px;color:var(--muted)}
.d-dt07 .rw{display:flex;align-items:center;justify-content:space-between;gap:6px}
.d-dt07 .rw b{font-size:20px;letter-spacing:-.03em;color:var(--text);font-variant-numeric:tabular-nums;white-space:nowrap}
.d-dt07 .dl{display:inline-flex;align-items:center;gap:3px;padding:3px 8px 3px 7px;border-radius:999px;font-size:12px;font-weight:700;font-variant-numeric:tabular-nums;white-space:nowrap;visibility:hidden}
.d-dt07 .dl.up{visibility:visible;color:color-mix(in srgb,var(--success) 82%,var(--text));background:color-mix(in srgb,var(--success) 15%,var(--surface));animation:dt07-pop .28s cubic-bezier(.2,.8,.2,1)}
.d-dt07 .dl.dn{visibility:visible;color:color-mix(in srgb,var(--danger) 86%,var(--text));background:color-mix(in srgb,var(--danger) 13%,var(--surface));animation:dt07-pop2 .28s cubic-bezier(.2,.8,.2,1)}
.d-dt07 .dl svg{flex:none}
.d-dt07 .dl.up svg{animation:dt07-up .4s cubic-bezier(.2,.8,.2,1)}
.d-dt07 .dl.dn svg{animation:dt07-dn .4s cubic-bezier(.2,.8,.2,1)}
@keyframes dt07-pop{from{transform:scale(.6);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes dt07-pop2{from{transform:scale(.6);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes dt07-up{from{transform:translateY(6px);opacity:0}to{transform:none;opacity:1}}
@keyframes dt07-dn{from{transform:translateY(-6px);opacity:0}to{transform:none;opacity:1}}
`,
    html: `<div class="sc"><div class="seg" role="group" aria-label="비교 기간"><button type="button" class="on" aria-pressed="true">지난주 대비</button><button type="button" aria-pressed="false">지난달 대비</button></div>
  <div class="kp"><span class="lb">이번 주 매출</span><div class="rw"><b data-v="1284" data-u="만원">0만원</b><span class="dl"></span></div></div>
  <div class="kp"><span class="lb">방문자</span><div class="rw"><b data-v="8420" data-u="명">0명</b><span class="dl"></span></div></div></div>`,
    run(el, ctx) {
      const UP = '<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M5 1.5 9.2 8.5H.8z"/></svg>';
      const DN = '<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M.8 1.5h8.4L5 8.5z"/></svg>';
      const sets = [[12.4, -3.1], [-4.8, 21.0]], names = ['지난주', '지난달'];
      const btn = [...el.querySelectorAll('.seg button')], dl = [...el.querySelectorAll('.dl')], num = [...el.querySelectorAll('.rw b')];
      const apply = k => {
        btn.forEach((b, i) => { b.classList.toggle('on', i === k); b.setAttribute('aria-pressed', i === k); });
        dl.forEach((d, i) => {
          const v = sets[k][i], up = v >= 0;
          d.className = 'dl'; void d.offsetWidth;
          d.innerHTML = (up ? UP : DN) + Math.abs(v).toFixed(1) + '%';
          d.setAttribute('aria-label', `${names[k]}보다 ${Math.abs(v).toFixed(1)}% ${up ? '증가' : '감소'}`);
          d.className = 'dl ' + (up ? 'up' : 'dn');
        });
      };
      ctx.loop(t => {
        const p = dtEase(t / 600);
        num.forEach(n => n.textContent = dtFmt(+n.dataset.v * p) + n.dataset.u);
        return t < 600;
      });
      ctx.timeout(() => apply(0), 500);
      ctx.timeout(() => apply(1), 1700);
      btn.forEach((b, i) => ctx.on(b, 'click', () => apply(i)));
    }
  },

  /* dt08 리더보드 */
  {
    id: 'dt08', ko: '리더보드', en: 'Leaderboard',
    desc: '점수가 바뀌면 행이 위아래로 자리를 바꿔 순위를 보여줘요.',
    prompt: '「리더보드(Leaderboard)」를 만들어 줘. 닉네임과 점수를 순위대로 4줄 쌓고, 점수가 오르면 숫자가 0.4초 동안 올라간 뒤 해당 행이 0.45초 cubic-bezier(.2,.8,.2,1)로 위아래 자리를 바꿔. 올라간 행은 잠깐 옅은 파란 배경으로 강조하고 순위 숫자도 갱신해. 순위 변동은 aria-live="polite"로 알려 줘.',
    css: dtSc('dt08') + `
.d-dt08 .ls{position:relative;height:124px;flex:none}
.d-dt08 .rw{position:absolute;left:0;right:0;top:0;height:28px;display:flex;align-items:center;gap:7px;padding:0 8px 0 4px;border-radius:9px;background:var(--surface-2);cursor:pointer;box-sizing:border-box;transition:transform .45s cubic-bezier(.2,.8,.2,1),background .3s,box-shadow .3s}
.d-dt08 .rw.up{background:var(--accent-soft);box-shadow:var(--shadow);z-index:2}
.d-dt08 .rk{width:18px;text-align:center;font-size:12px;font-weight:800;color:var(--muted);font-variant-numeric:tabular-nums;flex:none}
.d-dt08 .rw.top .rk{color:var(--accent)}
.d-dt08 .av{width:18px;height:18px;border-radius:50%;background:var(--accent-soft);color:var(--accent);display:grid;place-items:center;font-size:11px;font-weight:800;flex:none;line-height:1}
.d-dt08 .rw.up .av{background:var(--surface)}
.d-dt08 .nm{flex:1;font-size:12px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-dt08 .pl{font-style:normal;font-size:11px;font-weight:700;color:color-mix(in srgb,var(--success) 82%,var(--text));opacity:0;transform:translateY(4px);transition:opacity .2s,transform .25s ease-out}
.d-dt08 .rw.up .pl{opacity:1;transform:none}
.d-dt08 .sr{font-size:12px;font-weight:700;color:var(--text);font-variant-numeric:tabular-nums;min-width:34px;text-align:right}
`,
    html: `<div class="sc"><div class="tp"><b>주간 걸음 랭킹</b><span>눌러서 +점수</span></div>
  <div class="ls" role="list" aria-live="polite"></div></div>`,
    run(el, ctx) {
      const ls = el.querySelector('.ls');
      const data = [['제주바람', 980], ['캠핑곰', 940], ['새벽별', 910], ['느린여행', 870]].map((d, i) => ({ n: d[0], s: d[1], i }));
      ls.innerHTML = data.map(d => `<div class="rw" role="listitem"><span class="rk"></span><span class="av">${d.n[0]}</span><span class="nm">${d.n}</span><i class="pl"></i><span class="sr">${dtFmt(d.s)}</span></div>`).join('');
      const rows = [...ls.children];
      const layout = () => {
        [...data].sort((a, b) => b.s - a.s || a.i - b.i).forEach((d, r) => {
          const row = rows[d.i];
          row.style.transform = `translateY(${r * 32}px)`;
          row.querySelector('.rk').textContent = r + 1;
          row.classList.toggle('top', r === 0);
          row.setAttribute('aria-label', `${r + 1}위 ${d.n} ${dtFmt(d.s)}점`);
        });
      };
      const tm = {};
      const bump = (k, add) => {
        const d = data[k], row = rows[k], from = d.s, sr = row.querySelector('.sr');
        d.s += add;
        const to = d.s;
        row.querySelector('.pl').textContent = '+' + add;
        row.classList.add('up');
        ctx.loop(t => { sr.textContent = dtFmt(from + (to - from) * dtEase(t / 400)); return t < 400 && data[k].s === to; });
        ctx.timeout(() => { sr.textContent = dtFmt(data[k].s); layout(); }, 400);
        clearTimeout(tm[k]); tm[k] = ctx.timeout(() => row.classList.remove('up'), 1300);
      };
      rows.forEach(r => { r.style.transition = 'none'; });
      layout(); void ls.offsetWidth;
      rows.forEach((r, k) => { r.style.transition = ''; ctx.on(r, 'click', () => bump(k, 60)); });
      ctx.timeout(() => bump(3, 90), 600);
      ctx.timeout(() => bump(2, 120), 1500);
    }
  },

  /* dt09 차트 툴팁 */
  {
    id: 'dt09', ko: '차트 툴팁', en: 'Chart tooltip', pair: 'fb05',
    desc: '툴팁과 달리 차트를 훑는 포인터를 따라 안내선과 값 상자가 움직여요.',
    prompt: '「차트 툴팁(Chart tooltip)」을 만들어 줘. 선 차트 위에서 포인터를 움직이면 가장 가까운 지점에 세로 안내선과 점이 90ms로 따라붙고, 그 옆 상자에 날짜와 값이 표시돼. 상자는 오른쪽 끝에서 왼쪽으로 뒤집히고, 좌우 방향키로도 지점을 옮길 수 있어. 툴팁과 헷갈리지 않게 아이콘 위 고정 위치에 뜨는 한 줄 설명으로 만들지 마.',
    css: dtSc('dt09') + `
.d-dt09 .plot{position:relative;width:212px;height:124px;flex:none;cursor:crosshair;outline:none;touch-action:none}
.d-dt09 svg{display:block}
.d-dt09 .gr{stroke:var(--line);stroke-width:1}
.d-dt09 .ar{fill:color-mix(in srgb,var(--accent) 14%,transparent)}
.d-dt09 .ln{stroke:var(--accent);stroke-width:2;fill:none;stroke-linecap:round;stroke-linejoin:round}
.d-dt09 .gl{position:absolute;left:0;top:4px;bottom:16px;width:0;border-left:1px dashed var(--muted);pointer-events:none}
.d-dt09 .dot{position:absolute;left:-5px;top:-5px;width:10px;height:10px;border-radius:50%;background:var(--accent);border:2px solid var(--surface);box-sizing:border-box;box-shadow:0 0 0 1px var(--accent);pointer-events:none}
.d-dt09 .tip{position:absolute;left:0;top:0;width:74px;padding:5px 8px;border-radius:8px;background:var(--text);color:var(--surface);box-sizing:border-box;pointer-events:none;white-space:nowrap;box-shadow:0 6px 14px -4px rgba(0,0,0,.35)}
.d-dt09 .tip small{display:block;font-size:11px;opacity:.72;line-height:14px}
.d-dt09 .tip b{display:block;font-size:13px;line-height:17px;font-variant-numeric:tabular-nums}
.d-dt09 .gl,.d-dt09 .dot,.d-dt09 .tip{opacity:0;transition:transform .09s ease-out,opacity .15s}
.d-dt09 .plot.on .gl,.d-dt09 .plot.on .dot,.d-dt09 .plot.on .tip{opacity:1}
.d-dt09 .xl{position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:space-between;font-size:11px;line-height:13px;color:var(--muted);padding:0 2px;pointer-events:none}
.d-dt09 .fp{position:absolute;left:-10px;top:-10px;width:20px;height:20px;border-radius:50%;background:color-mix(in srgb,var(--text) 26%,transparent);border:1.5px solid color-mix(in srgb,var(--text) 45%,transparent);box-sizing:border-box;pointer-events:none;opacity:0;transition:opacity .25s;z-index:3}
.d-dt09 .fp.on{opacity:1}
`,
    html: `<div class="sc"><div class="tp"><b>일별 예약</b><span>훑어 보세요</span></div>
  <div class="plot" tabindex="0" role="group" aria-label="11월 1일부터 12일까지 일별 예약 수 선 차트. 좌우 방향키로 지점을 옮길 수 있어요.">
    <svg width="212" height="124" viewBox="0 0 212 124" aria-hidden="true">
      <line class="gr" x1="0" x2="212" y1="108" y2="108"/><line class="gr" x1="0" x2="212" y1="66" y2="66"/><line class="gr" x1="0" x2="212" y1="24" y2="24"/>
      <path class="ar" d="${dtPath(dtTipP)} L${dtTipP[11][0].toFixed(1)} 108 L${dtTipP[0][0]} 108Z"/>
      <path class="ln" d="${dtPath(dtTipP)}"/>
    </svg>
    <div class="xl"><span>1일</span><span>6일</span><span>12일</span></div>
    <div class="gl"></div><div class="dot"></div>
    <div class="tip" role="status" aria-live="polite"><small></small><b></b></div>
    <div class="fp"></div>
  </div></div>`,
    run(el, ctx) {
      const plot = el.querySelector('.plot'), gl = el.querySelector('.gl'), dot = el.querySelector('.dot');
      const tip = el.querySelector('.tip'), fp = el.querySelector('.fp');
      const d = tip.querySelector('small'), b = tip.querySelector('b');
      let cur = -1, user = false;
      const show = i => {
        i = Math.max(0, Math.min(11, i));
        plot.classList.add('on');
        if (i === cur) return;
        cur = i;
        const x = dtTipP[i][0], y = dtTipP[i][1];
        gl.style.transform = `translateX(${x}px)`;
        dot.style.transform = `translate(${x}px,${y}px)`;
        const tx = x > 124 ? x - 82 : x + 8, ty = Math.max(0, Math.min(62, y - 48));
        tip.style.transform = `translate(${tx}px,${ty}px)`;
        d.textContent = `11월 ${i + 1}일`; b.textContent = `예약 ${dtTipV[i]}건`;
      };
      const idx = px => Math.round((px - 8) / 17.8);
      /* 자동 시연: 가짜 포인터가 왼쪽→오른쪽으로 훑고 살짝 되돌아옴 */
      ctx.loop(t => {
        if (user) return false;
        if (t < 400) return;
        const u = Math.min(1, (t - 400) / 2300);
        const k = u < 0.72 ? dtEase(u / 0.72) * 0.94 : 0.94 - Math.sin((u - 0.72) / 0.28 * Math.PI / 2) * 0.2;
        const px = 10 + k * 196, py = 84 - Math.sin(u * 5) * 8;
        fp.classList.add('on');
        fp.style.transform = `translate(${px}px,${py}px)`;
        show(idx(px));
        if (u >= 1) { ctx.timeout(() => fp.classList.remove('on'), 400); return false; }
      });
      ctx.on(el, 'pointermove', e => {
        const r = plot.getBoundingClientRect();
        if (!user) { user = true; fp.classList.remove('on'); }
        show(idx(e.clientX - r.left));
      });
      ctx.on(el, 'pointerleave', () => { if (user) { plot.classList.remove('on'); cur = -1; } });
      ctx.on(plot, 'keydown', e => {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        e.preventDefault(); user = true; fp.classList.remove('on');
        show((cur < 0 ? 0 : cur) + (e.key === 'ArrowRight' ? 1 : -1));
      });
    }
  }
]);
