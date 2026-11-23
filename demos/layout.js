(function () {
const SCR = 'width:calc(100% - 28px);max-width:290px;background:var(--surface);border-radius:18px;box-shadow:var(--shadow);box-sizing:border-box;overflow:hidden;position:relative';
const IC = {
  chev: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
  down: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
  list: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  grid: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/></svg>',
  heart: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M12 20s-7-4.4-9.2-8.6C1.2 8.2 3 4.5 6.6 4.5c2.2 0 3.6 1.3 5.4 3.3 1.8-2 3.2-3.3 5.4-3.3 3.6 0 5.4 3.7 3.8 6.9C19 15.6 12 20 12 20z"/></svg>',
  plane: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 13.5l19-8-5 15-4-6-6-1z"/><path d="M12.5 14.5l4-5"/></svg>'
};
const tint = p => `color-mix(in srgb,var(--accent) ${p}%,var(--surface))`;

UIDEX.add('layout', [
  /* ly01 리스트 */
  {
    id: 'ly01', ko: '리스트', en: 'List',
    desc: '항목을 한 줄에 하나씩 세로로 쌓아 훑어보기 쉽게 해요.',
    prompt: '「리스트(List)」 화면을 만들어 줘. 썸네일·제목·부제·가격·화살표가 한 줄인 행을 구분선으로 쌓고, 처음엔 행들이 60ms 간격으로 아래에서 떠오르며, 새 항목은 맨 위에 0.35초 동안 높이가 열리며 옅은 파란 배경으로 깜박여. 행 전체를 하나의 링크로 만들고 키보드 포커스 링을 보여 줘.',
    css: `
.d-ly01 .scr{${SCR};height:180px;padding:12px 14px}
.d-ly01 .hd{font-size:13px;font-weight:800;color:var(--text);margin-bottom:4px;display:flex;justify-content:space-between}
.d-ly01 .hd small{font-size:11px;font-weight:500;color:var(--muted)}
.d-ly01 .row{display:flex;align-items:center;gap:10px;height:38px;border-bottom:1px solid var(--line);cursor:pointer;color:var(--text);border-radius:6px;animation:ly01-in .4s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i)*60ms);transition:background .2s}
.d-ly01 .row:active{background:var(--surface-2)}
.d-ly01 .row i{width:28px;height:28px;border-radius:8px;flex:none}
.d-ly01 .row span{flex:1;min-width:0;font-size:12.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-ly01 .row small{display:block;font-size:10.5px;font-weight:400;color:var(--muted)}
.d-ly01 .row b{font-size:12px}
.d-ly01 .row svg{color:var(--muted);flex:none}
.d-ly01 .row.new{animation:ly01-open .35s cubic-bezier(.2,.8,.2,1) both,ly01-flash 1.2s ease-out .2s;overflow:hidden}
@keyframes ly01-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes ly01-open{from{height:0;opacity:0}to{height:38px;opacity:1}}
@keyframes ly01-flash{0%,30%{background:var(--accent-soft)}100%{background:transparent}}
`,
    html: `<div class="scr"><div class="hd">찜한 숙소<small>최근 담은 순</small></div><div class="list"></div></div>`,
    run(el, ctx) {
      const list = el.querySelector('.list');
      const row = (d, i, cls) => `<div class="row ${cls || ''}" style="--i:${i}" tabindex="0"><i style="background:${tint(d[3])}"></i><span>${d[0]}<small>${d[1]}</small></span><b>${d[2]}</b>${IC.chev}</div>`;
      const D = [['애월 오션뷰 스테이', '제주 · ★4.9', '128,000원', 22], ['성산 감성 독채', '제주 · ★4.7', '89,000원', 34], ['강릉 바다 앞 호텔', '강릉 · ★4.8', '156,000원', 46], ['협재 게스트하우스', '제주 · ★4.5', '39,000원', 18]];
      list.innerHTML = D.map((d, i) => row(d, i)).join('');
      ctx.timeout(() => list.insertAdjacentHTML('afterbegin', row(['여수 밤바다 펜션', '여수 · 방금 담음', '72,000원', 60], 0, 'new')), 1200);
      ctx.on(list, 'click', e => { const r = e.target.closest('.row'); if (r) { r.style.background = 'var(--accent-soft)'; ctx.timeout(() => r.style.background = '', 250); } });
    }
  },
  /* ly02 그리드 */
  {
    id: 'ly02', ko: '그리드', en: 'Grid',
    desc: '같은 크기 칸을 가로세로로 맞춰 여러 상품을 한눈에 비교해요.',
    prompt: '「그리드(Grid)」 보기를 만들어 줘. 상단 보기 전환 버튼으로 리스트↔3열 그리드를 바꾸고, 각 아이템은 FLIP 방식으로 0.45초 cubic-bezier(.2,.8,.2,1) 동안 새 칸으로 이동하며 썸네일이 칸 너비에 맞게 커져. 칸 간격은 8px, 전환 버튼엔 aria-pressed를 넣고 reduced-motion이면 즉시 바꿔 줘.',
    css: `
.d-ly02 .scr{${SCR};height:180px;padding:10px 12px}
.d-ly02 .hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:12px;color:var(--muted)}
.d-ly02 .hd b{color:var(--text)}
.d-ly02 .seg{display:flex;padding:2px;border-radius:8px;background:var(--surface-2)}
.d-ly02 .seg button{width:28px;height:22px;border:0;border-radius:6px;background:none;color:var(--muted);display:grid;place-items:center;cursor:pointer;padding:0;transition:all .2s}
.d-ly02 .seg button[aria-pressed="true"]{background:var(--surface);color:var(--text);box-shadow:0 1px 3px rgba(0,0,0,.12)}
.d-ly02 .items{display:flex;flex-direction:column;gap:6px}
.d-ly02 .it{display:flex;align-items:center;gap:8px;min-width:0}
.d-ly02 .it i{width:22px;height:22px;border-radius:6px;flex:none;transition:width .45s cubic-bezier(.2,.8,.2,1),height .45s cubic-bezier(.2,.8,.2,1),border-radius .45s}
.d-ly02 .it span{font-size:11.5px;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.d-ly02 .it span b{font-weight:700;margin-left:4px}
.d-ly02 .g .items{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.d-ly02 .g .it{flex-direction:column;align-items:stretch;gap:4px}
.d-ly02 .g .it i{width:100%;height:46px;border-radius:9px}
.d-ly02 .g .it span b{display:block;margin:0}
`,
    html: `<div class="scr"><div class="hd"><span>캠핑 용품 <b>6</b></span><div class="seg"><button type="button" aria-pressed="true" aria-label="리스트 보기">${IC.list}</button><button type="button" aria-pressed="false" aria-label="그리드 보기">${IC.grid}</button></div></div>
<div class="items">${[['캠핑 의자', '39,000', 20], ['접이식 테이블', '54,000', 32], ['LED 랜턴', '18,900', 44], ['캠핑 매트', '27,000', 26], ['코펠 세트', '45,000', 38], ['감성 타프', '89,000', 50]].map(d => `<div class="it"><i style="background:${tint(d[2])}"></i><span>${d[0]}<b>${d[1]}원</b></span></div>`).join('')}</div></div>`,
    run(el, ctx) {
      const scr = el.querySelector('.scr'), its = [...el.querySelectorAll('.it')], bs = el.querySelectorAll('.seg button');
      const set = g => {
        if (scr.classList.contains('g') === g) return;
        const r0 = its.map(n => n.getBoundingClientRect());
        scr.classList.toggle('g', g);
        bs[0].setAttribute('aria-pressed', !g); bs[1].setAttribute('aria-pressed', g);
        its.forEach((n, k) => { const r = n.getBoundingClientRect(); n.style.transition = 'none'; n.style.transform = `translate(${r0[k].left - r.left}px,${r0[k].top - r.top}px)`; });
        scr.offsetWidth;
        its.forEach(n => { n.style.transition = 'transform .45s cubic-bezier(.2,.8,.2,1)'; n.style.transform = ''; });
      };
      ctx.timeout(() => set(true), 800);
      ctx.on(bs[0], 'click', () => set(false));
      ctx.on(bs[1], 'click', () => set(true));
    }
  },
  /* ly03 카드 */
  {
    id: 'ly03', ko: '카드', en: 'Card',
    desc: '사진·제목·가격을 한 덩어리 상자에 담아 하나의 상품처럼 보여줘요.',
    prompt: '「카드(Card)」 컴포넌트를 만들어 줘. 위는 가로로 긴 이미지, 아래는 제목·평점·가격을 담고 모서리 16px·옅은 그림자를 줘. 등장할 땐 0.45초 동안 12px 떠오르고, 호버하면 4px 들리며 그림자가 짙어지고 이미지가 1.04배 확대돼. 카드 전체가 클릭되되 찜 버튼은 별도 button과 aria-label로 분리해 줘.',
    css: `
.d-ly03 .card{width:200px;border-radius:16px;background:var(--surface);box-shadow:var(--shadow);overflow:hidden;cursor:pointer;animation:ly03-in .45s cubic-bezier(.2,.8,.2,1) backwards;transition:transform .3s cubic-bezier(.2,.8,.2,1),box-shadow .3s}
.d-ly03 .card.lift,.d-ly03 .card:hover{transform:translateY(-4px);box-shadow:0 14px 30px rgba(16,24,40,.18)}
.d-ly03 .card:active{transform:scale(.98)}
.d-ly03 .img{position:relative;height:88px;overflow:hidden}
.d-ly03 .art{position:absolute;inset:0;background:linear-gradient(180deg,${tint(30)} 0%,${tint(55)} 58%,var(--accent) 58%,${tint(80)} 100%);transition:transform .5s cubic-bezier(.2,.8,.2,1)}
.d-ly03 .art::before{content:'';position:absolute;width:30px;height:30px;border-radius:50%;background:var(--warn);left:62%;top:22%}
.d-ly03 .art::after{content:'';position:absolute;left:-10%;right:-10%;bottom:0;height:24%;background:var(--accent);opacity:.6;border-radius:50% 50% 0 0}
.d-ly03 .card.lift .art,.d-ly03 .card:hover .art{transform:scale(1.04)}
.d-ly03 .tag{position:absolute;left:8px;top:8px;font-size:10.5px;font-weight:700;color:var(--accent-text);background:var(--danger);padding:3px 7px;border-radius:6px}
.d-ly03 .hrt{position:absolute;right:6px;top:6px;width:28px;height:28px;border-radius:50%;border:0;padding:0;background:rgba(255,255,255,.85);color:#4b5563;display:grid;place-items:center;cursor:pointer}
.d-ly03 .hrt.on{color:var(--danger)}
.d-ly03 .hrt.on svg{fill:currentColor;animation:ly03-pop .35s cubic-bezier(.2,.8,.2,1)}
.d-ly03 .bd{padding:9px 12px 11px}
.d-ly03 .t{font-size:13px;font-weight:700;color:var(--text)}
.d-ly03 .m{font-size:11px;color:var(--muted);margin-top:2px}
.d-ly03 .p{display:flex;align-items:baseline;gap:5px;margin-top:5px;font-size:14px;font-weight:800;color:var(--text)}
.d-ly03 .p em{font-style:normal;color:var(--danger);font-size:13px}
@keyframes ly03-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes ly03-pop{0%{transform:scale(1)}50%{transform:scale(1.3)}100%{transform:scale(1)}}
`,
    html: `<div class="card" tabindex="0"><div class="img"><div class="art"></div><span class="tag">오늘 특가</span><button class="hrt" type="button" aria-label="찜하기" aria-pressed="false">${IC.heart}</button></div>
<div class="bd"><div class="t">애월 오션뷰 스테이</div><div class="m">제주 애월 · ★4.9 (812)</div><div class="p"><em>18%</em>128,000원</div></div></div>`,
    run(el, ctx) {
      const card = el.querySelector('.card'), h = el.querySelector('.hrt');
      const tg = () => { const on = !h.classList.contains('on'); h.classList.toggle('on', on); h.setAttribute('aria-pressed', on); };
      ctx.timeout(() => card.classList.add('lift'), 800);
      ctx.timeout(tg, 1500);
      ctx.timeout(() => card.classList.remove('lift'), 2600);
      ctx.on(h, 'click', e => { e.stopPropagation(); tg(); });
    }
  },
  /* ly04 캐러셀 */
  {
    id: 'ly04', ko: '캐러셀', en: 'Carousel', pair: 'pr05',
    desc: '배너를 옆으로 넘기며 여러 장을 같은 자리에서 차례로 보여줘요.',
    prompt: '「캐러셀(Carousel)」 배너를 만들어 줘. 2초마다 다음 장이 오른쪽에서 0.45초 cubic-bezier(.2,.8,.2,1)로 밀려 들어오고 마지막 다음엔 첫 장으로 돌아가. 손가락으로 40px 이상 끌면 넘어가고, 현재 점은 넓은 알약 모양으로 바뀌어. 페이지 점이 아닌 배너 전체이며, 만지면 자동 넘김을 멈추고 aria-roledescription="carousel"을 넣어 줘.',
    css: `
.d-ly04 .box{width:calc(100% - 28px);max-width:290px}
.d-ly04 .vp{position:relative;height:132px;border-radius:16px;overflow:hidden;touch-action:pan-y;cursor:grab;user-select:none}
.d-ly04 .sl{position:absolute;inset:0;padding:16px;box-sizing:border-box;display:none;flex-direction:column;justify-content:flex-end;color:#fff;border-radius:16px}
.d-ly04 .sl.vis{display:flex}
.d-ly04 .sl small{font-size:11px;font-weight:600;opacity:.85}
.d-ly04 .sl b{font-size:17px;font-weight:800;letter-spacing:-.02em;margin-top:2px;padding-right:44px;line-height:1.3;word-break:keep-all}
.d-ly04 .sl i{position:absolute;right:-14px;top:-14px;width:84px;height:84px;border-radius:50%;background:rgba(255,255,255,.18)}
.d-ly04 .sl i::after{content:'';position:absolute;left:18px;bottom:-26px;width:46px;height:46px;border-radius:50%;background:rgba(255,255,255,.14)}
.d-ly04 .pg{position:absolute;right:10px;bottom:10px;font-size:10.5px;font-weight:700;color:#fff;background:rgba(0,0,0,.28);padding:3px 8px;border-radius:999px;z-index:2}
.d-ly04 .dots{display:flex;justify-content:center;gap:5px;margin-top:10px}
.d-ly04 .dots i{width:6px;height:6px;border-radius:3px;background:var(--line);transition:width .3s cubic-bezier(.2,.8,.2,1),background .3s}
.d-ly04 .dots i.on{width:18px;background:var(--accent)}
`,
    html: `<div class="box" aria-roledescription="carousel"><div class="vp">${[['겨울 특가', '제주 3박 4일 29만원부터', '#2f6bff,#6aa0ff'], ['얼리버드', '오사카 료칸 2박 30% 할인', '#e2553b,#f59e7a'], ['주말 추천', '강릉 바다 앞 호텔 9만원대', '#13976a,#4cc79a'], ['단독 혜택', '캠핑 의자 39,000원', '#7a4ee0,#a98bf0']].map((d, i) => `<div class="sl${i ? '' : ' vis'}" style="background:linear-gradient(135deg,${d[2]})" aria-label="${i + 1} / 4"><i></i><small>${d[0]}</small><b>${d[1]}</b></div>`).join('')}<span class="pg">1 / 4</span></div>
<div class="dots"><i class="on"></i><i></i><i></i><i></i></div></div>`,
    run(el, ctx) {
      const vp = el.querySelector('.vp'), sl = [...el.querySelectorAll('.sl')], dots = el.querySelectorAll('.dots i'), pg = el.querySelector('.pg');
      const N = sl.length, E = 'transform .45s cubic-bezier(.2,.8,.2,1)';
      let cur = 0, busy = false, idleUntil = 0;
      const W = () => vp.offsetWidth + 10;
      const go = (dir) => {
        if (busy) return; busy = true;
        const nx = (cur + dir + N) % N, a = sl[cur], b = sl[nx];
        b.classList.add('vis'); b.style.transition = 'none'; b.style.transform = `translateX(${dir * W() + (drag.dx || 0)}px)`;
        b.offsetWidth;
        a.style.transition = b.style.transition = E;
        a.style.transform = `translateX(${-dir * W()}px)`; b.style.transform = 'translateX(0)';
        cur = nx; dots.forEach((d, k) => d.classList.toggle('on', k === cur)); pg.textContent = `${cur + 1} / ${N}`;
        ctx.timeout(() => { a.classList.remove('vis'); a.style.transform = ''; busy = false; }, 470);
      };
      ctx.timeout(() => { go(1); ctx.interval(() => { if (performance.now() > idleUntil && !drag.on) go(1); }, 2000); }, 900);
      const drag = { on: false, x: 0, dx: 0 };
      ctx.on(vp, 'pointerdown', e => { if (busy) return; drag.on = true; drag.x = e.clientX; drag.dx = 0; idleUntil = performance.now() + 5000; vp.setPointerCapture(e.pointerId); sl[cur].style.transition = 'none'; });
      ctx.on(vp, 'pointermove', e => { if (!drag.on) return; drag.dx = e.clientX - drag.x; sl[cur].style.transform = `translateX(${drag.dx}px)`; });
      ctx.on(vp, 'pointerup', () => {
        if (!drag.on) return; drag.on = false;
        if (Math.abs(drag.dx) > 40) go(drag.dx < 0 ? 1 : -1);
        else { sl[cur].style.transition = E; sl[cur].style.transform = ''; }
        drag.dx = 0;
      });
    }
  },
  /* ly05 테이블 */
  {
    id: 'ly05', ko: '테이블', en: 'Table',
    desc: '행과 열로 숫자를 정리하고, 머리글을 눌러 기준별로 정렬해요.',
    prompt: '「테이블(Table)」을 만들어 줘. 상품·판매량·가격 3열에 머리글을 고정하고, 숫자 열은 오른쪽 정렬해. 머리글을 누르면 화살표가 180° 돌며 오름·내림차순이 바뀌고 행이 0.45초 FLIP으로 자리를 옮기며, 정렬 중인 열엔 옅은 파란 배경을 깔아. th에 aria-sort를 꼭 넣어 줘.',
    css: `
.d-ly05 .tb{width:calc(100% - 28px);max-width:290px;background:var(--surface);border-radius:14px;box-shadow:var(--shadow);overflow:hidden;font-size:12px;color:var(--text)}
.d-ly05 .tr{display:grid;grid-template-columns:1fr 64px 80px;align-items:center;height:26px;background:var(--surface)}
.d-ly05 .tr>*{padding:0 10px;height:100%;display:flex;align-items:center;white-space:nowrap;overflow:hidden;transition:background .3s}
.d-ly05 .tr>*:nth-child(n+2){justify-content:flex-end;font-variant-numeric:tabular-nums}
.d-ly05 .body .tr+.tr{border-top:1px solid var(--line)}
.d-ly05 .th{height:30px;background:var(--surface-2)}
.d-ly05 .th button{border:0;background:none;font:inherit;font-size:11px;font-weight:700;color:var(--muted);cursor:pointer;gap:2px;padding:0 10px}
.d-ly05 .th button svg{opacity:0;transition:transform .3s,opacity .2s}
.d-ly05 .th button[aria-sort="ascending"],.d-ly05 .th button[aria-sort="descending"]{color:var(--accent)}
.d-ly05 .th button[aria-sort="ascending"] svg{opacity:1;transform:rotate(180deg)}
.d-ly05 .th button[aria-sort="descending"] svg{opacity:1}
.d-ly05 .body .tr>.hl{background:color-mix(in srgb,var(--accent-soft) 70%,transparent);font-weight:700}
`,
    html: `<div class="tb" role="table"><div class="tr th" role="row"><button type="button" role="columnheader" aria-sort="none" data-k="0">상품${IC.down}</button><button type="button" role="columnheader" aria-sort="none" data-k="1">판매량${IC.down}</button><button type="button" role="columnheader" aria-sort="none" data-k="2">가격${IC.down}</button></div>
<div class="body">${[['캠핑 의자', 1240, 39000], ['LED 랜턴', 2310, 18900], ['감성 타프', 480, 89000], ['코펠 세트', 860, 45000], ['캠핑 매트', 1620, 27000]].map(r => `<div class="tr" role="row" data-0="${r[0]}" data-1="${r[1]}" data-2="${r[2]}"><span>${r[0]}</span><span>${r[1].toLocaleString()}</span><span>${r[2].toLocaleString()}원</span></div>`).join('')}</div></div>`,
    run(el, ctx) {
      const body = el.querySelector('.body'), ths = [...el.querySelectorAll('.th button')];
      const sort = (k, dir) => {
        ths.forEach((t, i) => t.setAttribute('aria-sort', i === k ? (dir > 0 ? 'ascending' : 'descending') : 'none'));
        const rows = [...body.children], r0 = new Map(rows.map(r => [r, r.getBoundingClientRect().top]));
        rows.sort((a, b) => { const x = a.dataset[k], y = b.dataset[k]; return (k ? x - y : x.localeCompare(y, 'ko')) * dir; }).forEach(r => body.appendChild(r));
        rows.forEach(r => { [...r.children].forEach((c, i) => c.classList.toggle('hl', i === k)); r.style.transition = 'none'; r.style.transform = `translateY(${r0.get(r) - r.getBoundingClientRect().top}px)`; });
        body.offsetWidth;
        rows.forEach(r => { r.style.transition = 'transform .45s cubic-bezier(.2,.8,.2,1)'; r.style.transform = ''; });
      };
      ctx.timeout(() => sort(2, 1), 700);
      ctx.timeout(() => sort(1, -1), 1600);
      ths.forEach((t, k) => ctx.on(t, 'click', () => sort(k, t.getAttribute('aria-sort') === 'ascending' ? -1 : 1)));
    }
  },
  /* ly06 타임라인 */
  {
    id: 'ly06', ko: '타임라인', en: 'Timeline',
    desc: '시간 순서대로 일어난 일을 세로 선 위에 점으로 이어 보여줘요.',
    prompt: '「타임라인(Timeline)」을 만들어 줘. 왼쪽에 시각, 가운데 세로선과 점, 오른쪽에 내용을 두고, 세로선이 위에서 아래로 0.3초씩 그려지며 각 항목이 차례로 나타나. 지난 단계는 파란 점, 현재 단계는 점 주위로 1.6초 주기 파동이 퍼지고, 목록은 ol로 만들어 현재 항목에 aria-current를 달아 줘.',
    css: `
.d-ly06 .scr{${SCR};height:180px;padding:12px 14px}
.d-ly06 .hd{font-size:13px;font-weight:800;color:var(--text);margin-bottom:8px}
.d-ly06 ol{list-style:none;margin:0;padding:0}
.d-ly06 li{display:grid;grid-template-columns:38px 16px 1fr;column-gap:8px;height:34px;opacity:0;transform:translateY(6px);transition:opacity .3s,transform .3s cubic-bezier(.2,.8,.2,1)}
.d-ly06 li.in{opacity:1;transform:none}
.d-ly06 time{font-size:11px;color:var(--muted);font-variant-numeric:tabular-nums;padding-top:1px;text-align:right}
.d-ly06 .ax{position:relative;display:flex;justify-content:center}
.d-ly06 .ax::before{content:'';position:absolute;top:14px;bottom:-2px;width:2px;background:var(--line)}
.d-ly06 .ax i{position:absolute;top:14px;width:2px;height:0;background:var(--accent);transition:height .3s linear}
.d-ly06 li.done .ax i{height:calc(100% - 12px)}
.d-ly06 li:last-child .ax::before,.d-ly06 li:last-child .ax i{display:none}
.d-ly06 .ax b{position:relative;z-index:1;width:10px;height:10px;margin-top:3px;border-radius:50%;background:var(--surface);border:2px solid var(--line);box-sizing:border-box;transition:all .25s}
.d-ly06 li.in .ax b{background:var(--accent);border-color:var(--accent)}
.d-ly06 li.now .ax b::after{content:'';position:absolute;inset:-2px;border-radius:50%;background:var(--accent);animation:ly06-ring 1.6s ease-out infinite}
.d-ly06 .tx{font-size:12.5px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-ly06 .tx small{display:block;font-size:10.5px;font-weight:400;color:var(--muted)}
.d-ly06 li.now .tx{color:var(--accent)}
@keyframes ly06-ring{from{transform:scale(1);opacity:.5}to{transform:scale(2.8);opacity:0}}
`,
    html: `<div class="scr"><div class="hd">배송 현황</div><ol>${[['11:20', '주문 완료', '결제가 확인됐어요'], ['13:05', '상품 준비', '포장을 마쳤어요'], ['16:30', '배송 출발', '서울 허브에서 출발'], ['지금', '배송 중', '오늘 저녁 도착 예정']].map(d => `<li><time>${d[0]}</time><span class="ax"><i></i><b></b></span><span class="tx">${d[1]}<small>${d[2]}</small></span></li>`).join('')}</ol></div>`,
    run(el, ctx) {
      const li = el.querySelectorAll('li');
      li.forEach((l, i) => {
        ctx.timeout(() => {
          l.classList.add('in');
          if (i === li.length - 1) { l.classList.add('now'); l.setAttribute('aria-current', 'step'); }
          else ctx.timeout(() => l.classList.add('done'), 120);
        }, 200 + i * 380);
      });
    }
  },
  /* ly07 아코디언 */
  {
    id: 'ly07', ko: '아코디언', en: 'Accordion',
    desc: '제목만 보이다가 누르면 아래로 내용이 펼쳐지고 다시 접혀요.',
    prompt: '「아코디언(Accordion)」 FAQ를 만들어 줘. 질문 줄을 누르면 답변 영역이 grid-template-rows 0fr→1fr로 0.3초 ease-out 펼쳐지고, 오른쪽 화살표가 180° 돌아. 하나를 열면 나머지는 접히게 하고, 질문은 button에 aria-expanded·aria-controls를 연결해 Enter·Space로도 열리게 해 줘.',
    css: `
.d-ly07 .acc{width:calc(100% - 28px);max-width:290px;background:var(--surface);border-radius:14px;box-shadow:var(--shadow);overflow:hidden}
.d-ly07 .it+.it{border-top:1px solid var(--line)}
.d-ly07 .q{display:flex;align-items:center;gap:8px;width:100%;height:40px;padding:0 14px;border:0;background:none;font:inherit;font-size:12.5px;font-weight:600;color:var(--text);cursor:pointer;text-align:left}
.d-ly07 .q span{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-ly07 .q b{color:var(--accent);font-weight:800}
.d-ly07 .q svg{color:var(--muted);flex:none;transition:transform .3s ease-out}
.d-ly07 .open .q svg{transform:rotate(180deg);color:var(--accent)}
.d-ly07 .a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s ease-out}
.d-ly07 .open .a{grid-template-rows:1fr}
.d-ly07 .a>div{overflow:hidden}
.d-ly07 .a p{margin:0 14px 10px;padding:8px 10px;border-radius:9px;background:var(--surface-2);font-size:11.5px;line-height:1.5;color:var(--muted)}
`,
    html: `<div class="acc">${[['환불은 언제 되나요?', '취소 후 영업일 기준 3~5일 안에 결제 수단으로 돌려드려요.'], ['예약 날짜를 바꿀 수 있나요?', '체크인 3일 전까지는 수수료 없이 변경할 수 있어요.'], ['반려견과 함께 묵을 수 있나요?', '‘반려견 동반’ 표시가 있는 숙소에서 가능해요.']].map((d, i) => `<div class="it"><button class="q" type="button" aria-expanded="false" aria-controls="ly07a${i}"><b>Q</b><span>${d[0]}</span>${IC.down}</button><div class="a" id="ly07a${i}" role="region"><div><p>${d[1]}</p></div></div></div>`).join('')}</div>`,
    run(el, ctx) {
      const its = [...el.querySelectorAll('.it')];
      const open = k => its.forEach((it, i) => { const on = i === k && !it.classList.contains('open'); it.classList.toggle('open', on); it.querySelector('.q').setAttribute('aria-expanded', on); });
      ctx.timeout(() => open(0), 500);
      ctx.timeout(() => open(1), 1500);
      its.forEach((it, i) => ctx.on(it.querySelector('.q'), 'click', () => open(i)));
    }
  },
  /* ly08 메이슨리 */
  {
    id: 'ly08', ko: '메이슨리', en: 'Masonry',
    desc: '높이가 다른 사진을 가장 짧은 열부터 채워 벽돌처럼 빈틈없이 쌓아요.',
    prompt: '「메이슨리(Masonry)」 레이아웃을 만들어 줘. 3열에 높이가 제각각인 사진 카드를 하나씩 놓되, 매번 가장 짧은 열에 넣어 빈틈 없이 쌓아. 카드는 110ms 간격으로 8px 위에서 0.35초 동안 내려앉으며, 간격 8px·모서리 10px. 읽기 순서가 화면 순서와 어긋나지 않도록 DOM 순서를 유지해 줘.',
    css: `
.d-ly08 .wall{position:relative;width:calc(100% - 28px);max-width:290px;height:178px;overflow:hidden;cursor:pointer}
.d-ly08 .col{position:absolute;top:0;bottom:0;border-radius:10px;background:var(--accent-soft);opacity:0;transition:opacity .15s}
.d-ly08 .col.hot{opacity:.55}
.d-ly08 .tile{position:absolute;border-radius:10px;box-sizing:border-box;padding:7px;display:flex;align-items:flex-end;animation:ly08-in .35s cubic-bezier(.2,.8,.2,1) both;box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--text) 6%,transparent)}
.d-ly08 .tile i{display:block;height:5px;width:55%;border-radius:3px;background:var(--surface);opacity:.85}
@keyframes ly08-in{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
`,
    html: `<div class="wall" title="눌러서 다시 쌓기"><div class="col"></div><div class="col"></div><div class="col"></div></div>`,
    run(el, ctx) {
      const wall = el.querySelector('.wall'), cols = [...el.querySelectorAll('.col')];
      const G = 8, W = (wall.offsetWidth - G * 2) / 3;
      cols.forEach((c, i) => { c.style.left = i * (W + G) + 'px'; c.style.width = W + 'px'; });
      const build = (Hs) => {
        wall.querySelectorAll('.tile').forEach(t => t.remove());
        const h = [0, 0, 0];
        Hs.forEach((H, k) => ctx.timeout(() => {
          const c = h.indexOf(Math.min(...h));
          cols.forEach((x, i) => x.classList.toggle('hot', i === c));
          const t = document.createElement('div'); t.className = 'tile';
          t.style.cssText = `left:${c * (W + G)}px;top:${h[c]}px;width:${W}px;height:${H}px;background:${tint([18, 30, 44, 24, 56, 36][k % 6])}`;
          t.innerHTML = '<i></i>'; wall.appendChild(t); h[c] += H + G;
          if (k === Hs.length - 1) ctx.timeout(() => cols.forEach(x => x.classList.remove('hot')), 300);
        }, 200 + k * 110));
      };
      build([70, 44, 56, 38, 62, 48, 34, 52, 40]);
      ctx.on(wall, 'click', () => build(Array.from({ length: 9 }, () => 32 + Math.round(Math.random() * 44))));
    }
  },
  /* ly09 무한 스크롤 */
  {
    id: 'ly09', ko: '무한 스크롤', en: 'Infinite scroll',
    desc: '끝까지 내리면 로딩 표시 뒤에 다음 항목이 자동으로 이어 붙어요.',
    prompt: '「무한 스크롤(Infinite scroll)」 목록을 만들어 줘. 바닥 200px 전에 IntersectionObserver로 감지해 스피너와 "불러오는 중"을 0.6초 보여 준 뒤 다음 6개를 페이드 인으로 붙여. 중복 요청은 막고 마지막 페이지면 "모두 봤어요"를 표시하며, 새 항목이 붙으면 aria-live로 개수를 알려 줘.',
    css: `
.d-ly09 .scr{${SCR};height:180px;display:flex;flex-direction:column}
.d-ly09 .hd{flex:none;display:flex;justify-content:space-between;align-items:center;padding:10px 14px 8px;font-size:13px;font-weight:800;color:var(--text);border-bottom:1px solid var(--line)}
.d-ly09 .hd small{font-size:11px;font-weight:600;color:var(--accent);transition:transform .3s}
.d-ly09 .feed{flex:1;overflow-y:auto;padding:0 14px;scrollbar-width:thin}
.d-ly09 .r{display:flex;align-items:center;gap:10px;height:40px;border-bottom:1px solid var(--line);font-size:12.5px;color:var(--text);animation:ly09-in .35s ease-out both;animation-delay:calc(var(--i)*50ms)}
.d-ly09 .r i{width:28px;height:28px;border-radius:8px;flex:none}
.d-ly09 .r span{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-ly09 .r small{display:block;font-size:10.5px;color:var(--muted)}
.d-ly09 .ld{display:flex;align-items:center;justify-content:center;gap:7px;height:38px;font-size:11.5px;color:var(--muted)}
.d-ly09 .ld i{width:14px;height:14px;border-radius:50%;border:2px solid var(--line);border-top-color:var(--accent);animation:ly09-sp .7s linear infinite}
.d-ly09 .ld.idle i{visibility:hidden}
@keyframes ly09-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes ly09-sp{to{transform:rotate(360deg)}}
`,
    html: `<div class="scr"><div class="hd">오늘의 추천<small aria-live="polite">6개</small></div><div class="feed"><div class="list"></div><div class="ld idle"><i></i><span>아래로 내려 보세요</span></div></div></div>`,
    run(el, ctx) {
      const feed = el.querySelector('.feed'), list = el.querySelector('.list'), ld = el.querySelector('.ld'), cnt = el.querySelector('.hd small');
      const N = ['캠핑 의자', '여행용 파우치', 'LED 랜턴', '경량 패딩', '보온 텀블러', '접이식 테이블', '방수 백팩', '감성 타프', '휴대용 선풍기', '캠핑 매트', '코펠 세트', '트레킹 폴'];
      let n = 0, loading = false, auto = true;
      const add = k => {
        let h = '';
        for (let j = 0; j < k; j++, n++) h += `<div class="r" style="--i:${j}"><i style="background:${tint(18 + (n % 4) * 12)}"></i><span>${N[n % N.length]}<small>${(((n * 7919) % 50 + 12) * 1000).toLocaleString()}원 · 무료배송</small></span></div>`;
        list.insertAdjacentHTML('beforeend', h); cnt.textContent = n + '개';
      };
      const more = () => {
        if (loading) return;
        if (n >= 30) { ld.classList.add('idle'); ld.querySelector('span').textContent = '모두 봤어요'; return; }
        loading = true; ld.classList.remove('idle'); ld.querySelector('span').textContent = '불러오는 중';
        ctx.timeout(() => { add(6); loading = false; ld.classList.add('idle'); ld.querySelector('span').textContent = '아래로 내려 보세요'; }, 600);
      };
      add(6);
      ctx.on(feed, 'scroll', () => { if (feed.scrollTop + feed.clientHeight > feed.scrollHeight - 24) more(); }, { passive: true });
      const stop = () => auto = false;
      ctx.on(feed, 'wheel', stop, { passive: true }); ctx.on(feed, 'pointerdown', stop); ctx.on(feed, 'touchstart', stop, { passive: true });
      let last = 0;
      ctx.loop(t => {
        if (!auto || t > 6000) return false;
        if (!loading && t > 250) feed.scrollTop += (t - last) * 0.16;
        last = t;
      });
    }
  },
  /* ly10 벤토 그리드 */
  {
    id: 'ly10', ko: '벤토 그리드', en: 'Bento grid',
    desc: '크기가 다른 칸을 도시락처럼 맞춰 정보의 중요도를 구분해요.',
    prompt: '「벤토 그리드(Bento grid)」를 만들어 줘. 4열 그리드에 2×2 큰 칸(핵심 숫자), 2×1 차트 칸, 1×1 작은 칸들을 간격 6px·모서리 14px로 배치하고, 칸들이 70ms 간격으로 0.94→1 스케일 인 하며 숫자는 카운트업, 막대는 아래서 자라. 모바일에선 2열로 접고, 각 칸 제목은 h3로 마크업해 줘.',
    css: `
.d-ly10 .bento{width:calc(100% - 28px);max-width:290px;height:176px;display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:1fr 1fr .8fr;gap:6px}
.d-ly10 .c{border-radius:14px;background:var(--surface);box-shadow:var(--shadow);padding:9px 10px;box-sizing:border-box;position:relative;overflow:hidden;color:var(--text);cursor:pointer;animation:ly10-in .45s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i)*70ms);transition:transform .2s}
.d-ly10 .c:active{transform:scale(.97)}
.d-ly10 h3{margin:0;font-size:10.5px;font-weight:600;color:var(--muted)}
.d-ly10 .a{grid-column:span 2;grid-row:span 2;background:var(--accent);color:var(--accent-text);display:flex;flex-direction:column;justify-content:space-between}
.d-ly10 .a h3{color:inherit;opacity:.8}
.d-ly10 .a b{display:block;font-size:30px;font-weight:800;letter-spacing:-.03em;line-height:1}
.d-ly10 .a b small{font-size:14px;font-weight:700;margin-left:2px}
.d-ly10 .a em{display:block;margin-top:4px;font-style:normal;font-size:10.5px;opacity:.85}
.d-ly10 .b{grid-column:span 2;display:flex;flex-direction:column}
.d-ly10 .bars{flex:1;display:flex;align-items:flex-end;gap:4px;margin-top:4px}
.d-ly10 .bars i{flex:1;border-radius:3px 3px 1px 1px;background:var(--accent-soft);height:0;transition:height .5s cubic-bezier(.2,.8,.2,1)}
.d-ly10 .bars i:last-child{background:var(--accent)}
.d-ly10 .s{display:flex;flex-direction:column;justify-content:space-between}
.d-ly10 .s svg{color:var(--accent)}
.d-ly10 .s b{font-size:15px;font-weight:800}
.d-ly10 .s .st{color:var(--warn)}
.d-ly10 .e{grid-column:span 4;display:flex;align-items:center;gap:10px}
.d-ly10 .e b{font-size:12.5px;white-space:nowrap}
.d-ly10 .e .tr{flex:1;height:6px;border-radius:3px;background:var(--surface-2);overflow:hidden}
.d-ly10 .e .tr i{display:block;height:100%;width:0;border-radius:3px;background:var(--success);transition:width .8s cubic-bezier(.2,.8,.2,1)}
.d-ly10 .e span{font-size:11px;color:var(--muted);white-space:nowrap}
@keyframes ly10-in{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:none}}
`,
    html: `<div class="bento">
<div class="c a" style="--i:0"><h3>올해 떠난 여행</h3><div><b><span>0</span><small>회</small></b><em>작년보다 4회 더</em></div></div>
<div class="c b" style="--i:1"><h3>월별 지출</h3><div class="bars"><i data-h="40"></i><i data-h="65"></i><i data-h="30"></i><i data-h="80"></i><i data-h="55"></i><i data-h="100"></i></div></div>
<div class="c s" style="--i:2"><h3>항공</h3>${IC.plane}</div>
<div class="c s" style="--i:3"><h3>평점</h3><b><span class="st">★</span>4.9</b></div>
<div class="c e" style="--i:4"><b>다음 여행 D-12</b><div class="tr"><i></i></div><span>제주</span></div>
</div>`,
    run(el, ctx) {
      const num = el.querySelector('.a span');
      ctx.timeout(() => {
        const t0 = performance.now();
        ctx.loop(() => { const p = Math.min(1, (performance.now() - t0) / 900); num.textContent = Math.round(12 * (1 - Math.pow(1 - p, 3))); return p < 1; });
      }, 250);
      el.querySelectorAll('.bars i').forEach((b, i) => ctx.timeout(() => b.style.height = b.dataset.h + '%', 400 + i * 60));
      ctx.timeout(() => el.querySelector('.e .tr i').style.width = '72%', 600);
    }
  }
]);
})();
