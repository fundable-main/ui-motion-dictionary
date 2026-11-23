(() => {
const ly2SCR = 'width:calc(100% - 28px);max-width:290px;background:var(--surface);border-radius:18px;box-shadow:var(--shadow);box-sizing:border-box;overflow:hidden;position:relative';
const ly2tint = (p, c) => `color-mix(in srgb,var(--${c || 'accent'}) ${p}%,var(--surface))`;
const ly2E = 'cubic-bezier(.2,.8,.2,1)';
const ly2svg = (d, s, w) => `<svg width="${s || 12}" height="${s || 12}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w || 2.4}" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const ly2IC = {
  chev: ly2svg('<path d="M9 6l6 6-6 6"/>', 11, 2.8),
  back: ly2svg('<path d="M15 6l-6 6 6 6"/>', 13, 2.8),
  down: ly2svg('<path d="M6 9l6 6 6-6"/>', 12, 2.8),
  x: ly2svg('<path d="M6 6l12 12M18 6L6 18"/>', 12, 2.8),
  check: ly2svg('<path d="M5 12l5 5 9-10"/>', 12, 3),
  arrows: ly2svg('<path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/>', 15, 2.6),
  flip: ly2svg('<path d="M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5"/>', 12, 2.4),
  folder: ly2svg('<path d="M3 7.5a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>', 14, 2.2),
  file: ly2svg('<path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v4h4"/>', 13, 2.2),
  plane: ly2svg('<path d="M2.5 13.5l19-8-5 15-4-6-6-1z"/><path d="M12.5 14.5l4-5"/>', 18, 2)
};
/* 터치 포인트(가짜 손가락) 공통 */
const ly2tpCss = id => `
.d-${id} .tp{position:absolute;left:0;top:0;width:26px;height:26px;margin:-13px 0 0 -13px;border-radius:50%;box-sizing:border-box;background:color-mix(in srgb,var(--accent) 28%,transparent);border:2px solid color-mix(in srgb,var(--accent) 75%,transparent);pointer-events:none;opacity:0;z-index:30;transition:opacity .2s,transform .15s}
.d-${id} .tp.on{opacity:1}
.d-${id} .tp.dn{transform:scale(.78)}
`;
const ly2at = (el, n, fx, fy) => { const a = el.getBoundingClientRect(), b = n.getBoundingClientRect(); return [b.left - a.left + b.width * (fx == null ? .5 : fx), b.top - a.top + b.height * (fy == null ? .5 : fy)]; };
const ly2put = (tp, x, y) => { tp.style.translate = `${x}px ${y}px`; };
const ly2ease = k => 1 - Math.pow(1 - k, 3);

UIDEX.add('layout', [
  /* ly11 스플릿 뷰 */
  {
    id: 'ly11', ko: '스플릿 뷰', en: 'Split view',
    desc: '왼쪽 목록에서 고르면 오른쪽 상세가 바로 바뀌어 한 화면에서 오가요.',
    prompt: '「스플릿 뷰(Split view)」를 만들어 줘. 왼쪽 35%는 숙소 목록, 오른쪽은 상세 영역으로 나누고, 목록 항목을 누르면 선택 배경이 옮겨 가며 상세 내용이 0.28초 ease-out으로 10px 밀려 들어오며 교체돼. 600px보다 좁으면 목록→상세 2단계 화면으로 바꾸고, 목록엔 role="listbox"·aria-selected와 위아래 화살표 키 이동을 넣어 줘.',
    css: `
.d-ly11 .sv{${ly2SCR};height:172px;display:grid;grid-template-columns:94px minmax(0,1fr)}
.d-ly11 .ls{background:var(--surface-2);border-right:1px solid var(--line);padding:8px 6px;display:flex;flex-direction:column;gap:3px}
.d-ly11 .ls h4{margin:0 0 3px 6px;font-size:11px;font-weight:700;color:var(--muted)}
.d-ly11 .ls button{display:flex;align-items:center;gap:6px;height:30px;padding:0 7px;border:0;border-radius:8px;background:none;font:inherit;font-size:11.5px;font-weight:600;color:var(--text);cursor:pointer;text-align:left;white-space:nowrap;transition:background .2s,color .2s,box-shadow .2s}
.d-ly11 .ls button i{width:8px;height:8px;border-radius:50%;flex:none}
.d-ly11 .ls button[aria-selected="true"]{background:var(--surface);color:var(--accent);box-shadow:0 1px 3px rgba(0,0,0,.12)}
.d-ly11 .dt{padding:10px 12px;min-width:0;overflow:hidden}
.d-ly11 .in{animation:ly11-sw .28s ease-out both}
.d-ly11 .ph{height:50px;border-radius:10px;position:relative;overflow:hidden}
.d-ly11 .ph::after{content:'';position:absolute;right:12px;top:10px;width:20px;height:20px;border-radius:50%;background:var(--surface);opacity:.7}
.d-ly11 .ph::before{content:'';position:absolute;left:-10%;right:-10%;bottom:-14px;height:30px;border-radius:50%;background:var(--surface);opacity:.35}
.d-ly11 .t{margin-top:8px;font-size:13.5px;font-weight:800;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-ly11 .m{font-size:11px;color:var(--muted);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-ly11 .bt{display:flex;align-items:center;justify-content:space-between;gap:6px;margin-top:10px}
.d-ly11 .bt b{font-size:13.5px;color:var(--text);white-space:nowrap}
.d-ly11 .bt span{flex:none;height:26px;padding:0 11px;border-radius:8px;background:var(--accent);color:var(--accent-text);font-size:11.5px;font-weight:700;display:grid;place-items:center}
@keyframes ly11-sw{from{opacity:0;transform:translateX(10px)}to{opacity:1;transform:none}}
`,
    html: `<div class="sv"><div class="ls" role="listbox" aria-label="숙소 목록"><h4>찜한 숙소 4</h4></div><div class="dt" aria-live="polite"></div></div>`,
    run(el, ctx) {
      const ls = el.querySelector('.ls'), dt = el.querySelector('.dt');
      const D = [['애월 스테이', '제주 애월 · ★4.9', '128,000원', 'accent'], ['성산 독채', '제주 성산 · ★4.7', '89,000원', 'success'], ['강릉 호텔', '강릉 안목 · ★4.8', '156,000원', 'warn'], ['여수 펜션', '여수 돌산 · ★4.6', '72,000원', 'danger']];
      ls.insertAdjacentHTML('beforeend', D.map((d, i) => `<button type="button" role="option" aria-selected="false" data-i="${i}"><i style="background:var(--${d[3]})"></i>${d[0]}</button>`).join(''));
      const bs = [...ls.querySelectorAll('button')];
      const sel = i => {
        const d = D[i];
        bs.forEach((b, k) => b.setAttribute('aria-selected', k === i));
        dt.innerHTML = `<div class="in"><div class="ph" style="background:linear-gradient(135deg,${ly2tint(70, d[3])},${ly2tint(30, d[3])})"></div><div class="t">${d[0]}</div><div class="m">${d[1]}</div><div class="bt"><b>${d[2]}</b><span>예약</span></div></div>`;
      };
      sel(0);
      ctx.timeout(() => sel(1), 800);
      ctx.timeout(() => sel(2), 1700);
      ctx.on(ls, 'click', e => { const b = e.target.closest('button'); if (b) sel(+b.dataset.i); });
      ctx.on(ls, 'keydown', e => {
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
        e.preventDefault();
        const c = bs.findIndex(b => b.getAttribute('aria-selected') === 'true'), n = Math.max(0, Math.min(bs.length - 1, c + (e.key === 'ArrowDown' ? 1 : -1)));
        sel(n); bs[n].focus({ preventScroll: true });
      });
    }
  },
  /* ly12 더 보기 버튼 */
  {
    id: 'ly12', ko: '더 보기 버튼', en: 'Load more', pair: 'ly09',
    desc: '무한 스크롤과 달리 버튼을 눌러야만 다음 항목을 이어 붙여요.',
    prompt: '「더 보기 버튼(Load more)」 목록을 만들어 줘. 처음엔 3개만 보여 주고 목록 끝의 "3개 더 보기" 버튼을 눌렀을 때만 버튼이 0.5초 스피너로 바뀐 뒤 다음 3개가 0.35초 ease-out 페이드 업으로 붙어. 본 개수를 "6 / 9"로 표시하고 다 보면 버튼을 없애. 무한 스크롤과 헷갈리지 않게 스크롤만으로 자동 로딩은 하지 마. 새로 붙은 첫 항목으로 포커스를 옮겨 줘.',
    css: `${ly2tpCss('ly12')}
.d-ly12 .scr{${ly2SCR};height:180px;display:flex;flex-direction:column}
.d-ly12 .hd{flex:none;display:flex;justify-content:space-between;align-items:center;padding:10px 14px 8px;font-size:13px;font-weight:800;color:var(--text);border-bottom:1px solid var(--line)}
.d-ly12 .hd small{font-size:11px;font-weight:700;color:var(--accent);font-variant-numeric:tabular-nums}
.d-ly12 .feed{flex:1;overflow-y:auto;padding:0 14px 8px;scrollbar-width:thin}
.d-ly12 .r{display:flex;align-items:center;gap:10px;height:35px;border-bottom:1px solid var(--line);font-size:12.5px;color:var(--text)}
.d-ly12 .r.nw{animation:ly12-in .35s ease-out both;animation-delay:calc(var(--i)*70ms)}
.d-ly12 .r i{width:24px;height:24px;border-radius:7px;flex:none}
.d-ly12 .r span{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-ly12 .r b{font-size:12px;white-space:nowrap}
.d-ly12 .more{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;height:30px;margin-top:8px;border:1px solid var(--line);border-radius:9px;background:var(--surface);font:inherit;font-size:12px;font-weight:700;color:var(--text);cursor:pointer;transition:background .2s,border-color .2s,transform .15s}
.d-ly12 .more:hover{border-color:var(--accent)}
.d-ly12 .more.pr{transform:scale(.97);background:var(--surface-2)}
.d-ly12 .more i{display:none;width:13px;height:13px;border-radius:50%;border:2px solid var(--line);border-top-color:var(--accent);box-sizing:border-box;animation:ly12-sp .7s linear infinite}
.d-ly12 .more.ld{color:var(--muted);cursor:default}
.d-ly12 .more.ld i{display:block}
.d-ly12 .more.ld svg{display:none}
.d-ly12 .end{margin-top:8px;height:30px;display:grid;place-items:center;font-size:11.5px;color:var(--muted)}
@keyframes ly12-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes ly12-sp{to{transform:rotate(360deg)}}
`,
    html: `<div class="scr"><div class="hd">겨울 캠핑 기획전<small aria-live="polite">3 / 9</small></div><div class="feed"><div class="list"></div><button class="more" type="button"><i></i><span>3개 더 보기</span>${ly2IC.down}</button></div></div><i class="tp"></i>`,
    run(el, ctx) {
      const feed = el.querySelector('.feed'), list = el.querySelector('.list'), btn = el.querySelector('.more'), cnt = el.querySelector('.hd small'), tp = el.querySelector('.tp');
      const D = [['캠핑 의자', '39,000'], ['LED 랜턴', '18,900'], ['접이식 테이블', '54,000'], ['보온 텀블러', '22,000'], ['캠핑 매트', '27,000'], ['코펠 세트', '45,000'], ['감성 타프', '89,000'], ['방수 백팩', '61,000'], ['트레킹 폴', '33,000']];
      let n = 0, loading = false;
      const add = (k, fresh) => {
        let h = '';
        for (let j = 0; j < k && n < D.length; j++, n++) h += `<div class="r${fresh ? ' nw' : ''}" style="--i:${j}" tabindex="-1"><i style="background:${ly2tint(18 + (n % 4) * 12)}"></i><span>${D[n][0]}</span><b>${D[n][1]}원</b></div>`;
        list.insertAdjacentHTML('beforeend', h); cnt.textContent = `${n} / ${D.length}`;
      };
      const more = () => {
        if (loading || n >= D.length) return;
        loading = true; btn.classList.add('ld'); btn.querySelector('span').textContent = '불러오는 중';
        ctx.timeout(() => {
          add(3, true); loading = false; btn.classList.remove('ld');
          if (n >= D.length) btn.outerHTML = '<div class="end">마지막 상품까지 다 봤어요</div>';
          else btn.querySelector('span').textContent = `${Math.min(3, D.length - n)}개 더 보기`;
          feed.scrollTo({ top: feed.scrollHeight, behavior: 'smooth' });
        }, 500);
      };
      add(3, false);
      ctx.on(btn, 'click', more);
      ctx.timeout(() => { const p = ly2at(el, btn); ly2put(tp, p[0], p[1]); tp.classList.add('on'); }, 500);
      ctx.timeout(() => { tp.classList.add('dn'); btn.classList.add('pr'); }, 800);
      ctx.timeout(() => { tp.classList.remove('dn'); btn.classList.remove('pr'); more(); }, 950);
      ctx.timeout(() => tp.classList.remove('on'), 1200);
    }
  },
  /* ly13 말줄임 더 보기 */
  {
    id: 'ly13', ko: '말줄임 더 보기', en: 'Read more',
    desc: '긴 글을 3줄에서 …로 자르고, 누르면 전체가 펼쳐졌다 다시 접혀요.',
    prompt: '「말줄임 더 보기(Read more)」를 만들어 줘. 긴 후기 글을 line-clamp로 3줄까지만 보여 주고 끝을 …로 자르며, 아래 "더 보기"를 누르면 높이가 0.3초 ease-out으로 늘어나 전체 글이 보이고 버튼은 "접기"로 바뀌어. 글이 3줄 이하면 버튼을 숨기고, 버튼에 aria-expanded와 aria-controls를 넣어 줘.',
    css: `
.d-ly13 .cd{${ly2SCR};padding:11px 14px 9px}
.d-ly13 .hd{display:flex;align-items:center;gap:8px;margin-bottom:7px}
.d-ly13 .hd i{width:26px;height:26px;border-radius:50%;background:${ly2tint(30)};flex:none;display:grid;place-items:center;font-style:normal;font-size:11.5px;font-weight:700;color:var(--accent)}
.d-ly13 .hd b{font-size:12.5px;color:var(--text);flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-ly13 .hd small{font-size:11px;color:var(--warn);font-weight:700;white-space:nowrap}
.d-ly13 .tx{margin:0;font-size:12px;line-height:1.55;color:var(--text);word-break:keep-all;overflow:hidden;max-height:112px;transition:height .3s ease-out}
.d-ly13 .tx.cl{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3}
.d-ly13 .mr{display:inline-flex;align-items:center;gap:3px;margin-top:5px;padding:2px 0;border:0;background:none;font:inherit;font-size:12px;font-weight:700;color:var(--accent);cursor:pointer}
.d-ly13 .mr svg{transition:transform .3s ease-out}
.d-ly13 .mr[aria-expanded="true"] svg{transform:rotate(180deg)}
`,
    html: `<div class="cd"><div class="hd"><i>민</i><b>제주 일주일 살기 후기</b><small>★ 4.8</small></div>
<p class="tx cl" id="ly13tx">애월 바다가 한눈에 보이는 숙소였어요. 아침마다 파도 소리에 눈을 떴고, 걸어서 5분 거리에 해녀 식당과 빵집이 있어 끼니 걱정이 없었어요. 주인분이 귤도 한 바구니 챙겨 주셔서 마지막 날까지 편하게 쉬다 왔어요.</p>
<button class="mr" type="button" aria-expanded="false" aria-controls="ly13tx"><span>더 보기</span>${ly2IC.down}</button></div>`,
    run(el, ctx) {
      const tx = el.querySelector('.tx'), bt = el.querySelector('.mr'), lab = bt.querySelector('span');
      let open = false, busy = false;
      const tg = () => {
        if (busy) return; busy = true; open = !open;
        bt.setAttribute('aria-expanded', open); lab.textContent = open ? '접기' : '더 보기';
        if (open) {
          const h0 = tx.offsetHeight; tx.classList.remove('cl');
          const h1 = Math.min(tx.scrollHeight, 112);
          tx.style.height = h0 + 'px'; tx.offsetWidth; tx.style.height = h1 + 'px';
          ctx.timeout(() => { busy = false; }, 320);
        } else {
          const h1 = tx.offsetHeight; tx.style.height = ''; tx.classList.add('cl');
          const h0 = tx.offsetHeight; tx.classList.remove('cl');
          tx.style.height = h1 + 'px'; tx.offsetWidth; tx.style.height = h0 + 'px';
          ctx.timeout(() => { tx.classList.add('cl'); tx.style.height = ''; busy = false; }, 320);
        }
      };
      ctx.timeout(tg, 900);
      ctx.on(bt, 'click', tg);
    }
  },
  /* ly14 칸반 보드 */
  {
    id: 'ly14', ko: '칸반 보드', en: 'Kanban board',
    desc: '할 일·진행 중·완료 열 사이로 카드를 끌어 옮겨 작업 상태를 바꿔요.',
    prompt: '「칸반 보드(Kanban board)」를 만들어 줘. 할 일·진행 중·완료 3열에 작업 카드를 쌓고, 카드를 끌면 3° 기울며 그림자가 짙어지고 올려 둔 열은 옅은 파란색으로 강조돼. 놓으면 0.3초 cubic-bezier(.2,.8,.2,1)로 새 자리에 안착하고 열 제목의 개수가 바뀌어. 키보드로도 옆 열로 옮길 수 있게 하고 aria-live로 이동 결과를 알려 줘.',
    css: `${ly2tpCss('ly14')}
.d-ly14 .bd{width:calc(100% - 20px);max-width:300px;height:172px;box-sizing:border-box;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
.d-ly14 .col{background:var(--surface);border-radius:12px;box-shadow:var(--shadow);padding:7px 5px;box-sizing:border-box;min-width:0;transition:background .2s,box-shadow .2s}
.d-ly14 .col.ov{background:var(--accent-soft);box-shadow:0 0 0 2px var(--accent)}
.d-ly14 .col h4{margin:0 2px 6px;display:flex;align-items:center;gap:4px;font-size:11px;font-weight:700;color:var(--muted);white-space:nowrap}
.d-ly14 .col h4 i{width:7px;height:7px;border-radius:50%;flex:none}
.d-ly14 .col h4 b{margin-left:auto;min-width:16px;height:16px;border-radius:8px;background:var(--surface-2);color:var(--text);font-size:11px;display:grid;place-items:center}
.d-ly14 .lst{display:flex;flex-direction:column;gap:5px;min-height:118px}
.d-ly14 .kc{position:relative;height:28px;padding:0 6px;border-radius:8px;border:1px solid var(--line);background:var(--surface);box-sizing:border-box;display:flex;align-items:center;font-size:11px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none}
.d-ly14 .kc.dg{z-index:10;cursor:grabbing;box-shadow:0 10px 22px rgba(16,24,40,.28);border-color:var(--accent)}
.d-ly14 .col.dn .kc{color:var(--muted);text-decoration:line-through}
`,
    html: `<div class="bd">${[['할 일', 'muted', ['배너 시안', '문자 문구', '후기 정리']], ['진행 중', 'accent', ['상세 수정']], ['완료', 'success', ['쿠폰 설정']]].map((c, i) => `<div class="col${i === 2 ? ' dn' : ''}" aria-label="${c[0]}"><h4><i style="background:var(--${c[1]})"></i>${c[0]}<b>${c[2].length}</b></h4><div class="lst">${c[2].map(t => `<div class="kc" tabindex="0">${t}</div>`).join('')}</div></div>`).join('')}</div><i class="tp"></i>`,
    run(el, ctx) {
      const cols = [...el.querySelectorAll('.col')], cards = [...el.querySelectorAll('.kc')], tp = el.querySelector('.tp');
      let user = false;
      const count = () => cols.forEach(c => { c.querySelector('h4 b').textContent = c.querySelectorAll('.kc').length; });
      const over = c => cols.forEach(x => x.classList.toggle('ov', x === c));
      const colAt = x => cols.find(c => { const r = c.getBoundingClientRect(); return x >= r.left - 3 && x <= r.right + 3; });
      const drop = (card, col) => {
        const a = card.getBoundingClientRect();
        col.querySelector('.lst').appendChild(card);
        card.style.transition = 'none'; card.style.transform = '';
        const b = card.getBoundingClientRect();
        card.style.transform = `translate(${a.left - b.left}px,${a.top - b.top}px)`;
        card.offsetWidth;
        card.style.transition = `transform .3s ${ly2E}`; card.style.transform = '';
        card.classList.remove('dg'); over(null); count();
      };
      const auto = (card, to, t0) => {
        ctx.timeout(() => { if (user) return; const p = ly2at(el, card); ly2put(tp, p[0], p[1]); tp.classList.add('on'); }, t0);
        ctx.timeout(() => {
          if (user) return;
          tp.classList.add('dn'); card.classList.add('dg'); card.style.transition = 'none';
          const p0 = ly2at(el, card), lst = to.querySelector('.lst'), q = ly2at(el, lst, .5, 0);
          const x1 = q[0], y1 = q[1] + lst.children.length * 33 + 14;
          ctx.loop(t => {
            if (user) return false;
            const k = Math.min(t / 650, 1), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
            const dx = (x1 - p0[0]) * e, dy = (y1 - p0[1]) * e - Math.sin(Math.PI * k) * 8;
            card.style.transform = `translate(${dx}px,${dy}px) rotate(3deg)`;
            ly2put(tp, p0[0] + dx, p0[1] + dy);
            over(k > .35 ? to : null);
            if (k >= 1) { drop(card, to); tp.classList.remove('dn', 'on'); return false; }
          });
        }, t0 + 280);
      };
      auto(cards[0], cols[1], 400);
      auto(cards[3], cols[2], 1650);
      const dr = { c: null, x: 0, y: 0 };
      cards.forEach(card => {
        ctx.on(card, 'pointerdown', e => {
          if (!user) { user = true; tp.classList.remove('on', 'dn'); over(null); cards.forEach(c => { c.classList.remove('dg'); c.style.transition = 'none'; c.style.transform = ''; }); }
          e.preventDefault(); dr.c = card; dr.x = e.clientX; dr.y = e.clientY;
          try { card.setPointerCapture(e.pointerId); } catch (_) {}
          card.style.transition = 'none'; card.classList.add('dg');
        });
        ctx.on(card, 'pointermove', e => {
          if (dr.c !== card) return;
          card.style.transform = `translate(${e.clientX - dr.x}px,${e.clientY - dr.y}px) rotate(3deg)`;
          over(colAt(e.clientX) || null);
        });
        const up = e => { if (dr.c !== card) return; dr.c = null; drop(card, colAt(e.clientX) || card.closest('.col')); };
        ctx.on(card, 'pointerup', up);
        ctx.on(card, 'pointercancel', up);
        ctx.on(card, 'keydown', e => {
          if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
          e.preventDefault(); user = true;
          const i = cols.indexOf(card.closest('.col')), n = i + (e.key === 'ArrowRight' ? 1 : -1);
          if (cols[n]) { drop(card, cols[n]); card.focus({ preventScroll: true }); }
        });
      });
    }
  },
  /* ly15 히어로 섹션 */
  {
    id: 'ly15', ko: '히어로 섹션', en: 'Hero section',
    desc: '페이지 첫 화면에서 큰 제목·부제·버튼·비주얼로 핵심을 한 번에 전해요.',
    prompt: '「히어로 섹션(Hero section)」을 만들어 줘. 페이지 첫 화면에 작은 머리말, 큰 제목 2줄, 부제 1줄, 주 버튼과 보조 링크를 왼쪽에, 비주얼을 오른쪽에 배치해. 글자는 90ms 간격으로 0.5초 ease-out 동안 12px 떠오르며 나타나고 비주얼은 3초 주기로 살짝 떠다녀. 제목은 h1 하나만 쓰고 강조 버튼도 하나만 두며 reduced-motion이면 모션을 꺼 줘.',
    css: `
.d-ly15 .pg{${ly2SCR};height:180px}
.d-ly15 .nav{display:flex;align-items:center;gap:10px;height:28px;padding:0 12px;border-bottom:1px solid var(--line);font-size:11px;color:var(--muted)}
.d-ly15 .nav b{display:flex;align-items:center;gap:5px;color:var(--text);font-size:11.5px;margin-right:auto}
.d-ly15 .nav b i{width:11px;height:11px;border-radius:4px;background:var(--accent)}
.d-ly15 .nav em{font-style:normal;font-weight:700;color:var(--text)}
.d-ly15 .hero{position:relative;height:151px;box-sizing:border-box;padding:11px 14px 0;background:linear-gradient(160deg,var(--accent-soft),var(--surface) 62%)}
.d-ly15 .up{animation:ly15-up .5s ${ly2E} both;animation-delay:calc(120ms + var(--i)*90ms)}
.d-ly15 .ey{display:inline-block;font-size:11px;font-weight:700;color:var(--accent);background:var(--surface);border:1px solid color-mix(in srgb,var(--accent) 30%,transparent);padding:2px 8px;border-radius:999px}
.d-ly15 h3{margin:7px 0 0;font-size:17px;line-height:1.28;font-weight:800;letter-spacing:-.03em;color:var(--text);white-space:nowrap}
.d-ly15 h3 em{font-style:normal;color:var(--accent)}
.d-ly15 p{margin:6px 0 0;font-size:11.5px;color:var(--muted);white-space:nowrap}
.d-ly15 .cta{display:flex;align-items:center;gap:10px;margin-top:10px}
.d-ly15 .b1{height:28px;padding:0 13px;border:0;border-radius:9px;background:var(--accent);color:var(--accent-text);font:inherit;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:transform .15s}
.d-ly15 .b1:active{transform:scale(.96)}
.d-ly15 .b1.pl{animation:ly15-ring .7s ease-out}
.d-ly15 .b2{display:inline-flex;align-items:center;gap:2px;font-size:11.5px;font-weight:700;color:var(--text);white-space:nowrap;cursor:pointer}
.d-ly15 .vis{position:absolute;right:12px;top:12px;width:66px;height:66px;animation:ly15-pop .6s ${ly2E} .25s both}
.d-ly15 .vis .o{position:absolute;inset:0;border-radius:50%;background:linear-gradient(140deg,${ly2tint(70)},var(--accent));animation:ly15-fl 3s ease-in-out infinite alternate}
.d-ly15 .vis .s{position:absolute;right:-4px;top:-2px;width:22px;height:22px;border-radius:50%;background:var(--warn);animation:ly15-fl 2.2s ease-in-out -1s infinite alternate}
.d-ly15 .vis .pl{position:absolute;left:18px;top:22px;color:var(--accent-text);animation:ly15-fl 3s ease-in-out infinite alternate}
.d-ly15 .vis .c{position:absolute;left:-10px;bottom:6px;width:34px;height:13px;border-radius:999px;background:var(--surface);box-shadow:var(--shadow);animation:ly15-dr 2.6s ease-in-out infinite alternate}
@keyframes ly15-up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes ly15-pop{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:none}}
@keyframes ly15-fl{from{transform:translateY(-3px)}to{transform:translateY(4px)}}
@keyframes ly15-dr{from{transform:translateX(-3px)}to{transform:translateX(7px)}}
@keyframes ly15-ring{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--accent) 55%,transparent)}100%{box-shadow:0 0 0 12px transparent}}
`,
    html: `<div class="pg"><div class="nav"><b><i></i>브랜드</b><span>숙소</span><span>항공</span><em>로그인</em></div>
<div class="hero"><div class="vis" aria-hidden="true"><i class="o"></i><i class="s"></i><i class="c"></i><span class="pl">${ly2IC.plane}</span></div>
<span class="ey up" style="--i:0">겨울 얼리버드</span>
<h3 class="up" style="--i:1">제주 한 달 살기,<br><em>오늘</em> 시작해요</h3>
<p class="up" style="--i:2">숙소·항공을 한 번에 예약해요.</p>
<div class="cta up" style="--i:3"><button class="b1" type="button">무료로 시작</button><span class="b2">둘러보기${ly2IC.chev}</span></div></div></div>`,
    run(el, ctx) {
      const b = el.querySelector('.b1');
      const pulse = () => { b.classList.remove('pl'); b.offsetWidth; b.classList.add('pl'); };
      ctx.timeout(pulse, 1500);
      ctx.timeout(pulse, 2500);
      ctx.on(b, 'click', pulse);
    }
  },
  /* ly16 카드 스택 */
  {
    id: 'ly16', ko: '카드 스택', en: 'Card stack', pair: 'gs07',
    desc: '겹쳐 쌓인 카드 중 맨 위 장이 뒤로 넘어가며 다음 장이 올라와요.',
    prompt: '「카드 스택(Card stack)」을 만들어 줘. 카드 4장을 겹쳐 쌓되 뒤 카드는 10px씩 위로 올리고 6%씩 작게 해 가장자리만 보이게 해. 누르면 맨 위 카드가 옆으로 빠졌다가 0.42초 ease-out으로 맨 뒤로 들어가고 나머지가 한 칸씩 앞으로 나와. 현재 순서를 "2 / 4"로 표시하고 스택은 button으로 만들어 Enter·Space로도 넘기게 해 줘.',
    css: `
.d-ly16 .wr{display:flex;flex-direction:column;align-items:center;gap:9px;padding-top:20px}
.d-ly16 .stk{position:relative;width:188px;height:108px;border:0;padding:0;background:none;font:inherit;cursor:pointer;text-align:left}
.d-ly16 .c{position:absolute;inset:0;border-radius:16px;background:var(--surface);border:1px solid var(--line);box-shadow:var(--shadow);box-sizing:border-box;padding:13px 14px;display:flex;flex-direction:column;transform-origin:50% 0;transition:transform .42s ${ly2E},opacity .3s}
.d-ly16 .c small{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:700;color:var(--muted)}
.d-ly16 .c small i{width:18px;height:18px;border-radius:6px}
.d-ly16 .c b{margin-top:9px;font-size:15px;font-weight:800;color:var(--text);letter-spacing:-.02em}
.d-ly16 .c span{margin-top:auto;font-size:12px;color:var(--muted)}
.d-ly16 .c span em{font-style:normal;font-weight:800;color:var(--accent)}
.d-ly16 .ft{font-size:11.5px;color:var(--muted)}
.d-ly16 .ft b{color:var(--text);font-variant-numeric:tabular-nums}
`,
    html: `<div class="wr"><button class="stk" type="button" aria-label="다음 카드 보기">${[['오늘의 추천', '제주 3박 4일', '29만원', 'accent'], ['주말 특가', '강릉 바다 앞 호텔', '9만원', 'success'], ['얼리버드', '오사카 료칸 2박', '34만원', 'warn'], ['마감 임박', '여수 밤바다 펜션', '7만원', 'danger']].map(d => `<span class="c"><small><i style="background:${ly2tint(45, d[3])}"></i>${d[0]}</small><b>${d[1]}</b><span><em>${d[2]}</em>부터</span></span>`).join('')}</button>
<div class="ft" aria-live="polite"><b>1 / 4</b> · 눌러서 다음 카드</div></div>`,
    run(el, ctx) {
      const stk = el.querySelector('.stk'), ft = el.querySelector('.ft b'), all = [...el.querySelectorAll('.c')];
      let ord = all.slice(), busy = false;
      const N = all.length;
      const put = (c, p) => { c.style.zIndex = N - p; c.style.transform = `translateY(${-p * 10}px) scale(${1 - p * .06})`; c.style.opacity = p > 2 ? 0 : 1; };
      const place = () => ord.forEach(put);
      const next = () => {
        if (busy) return; busy = true;
        const top = ord.shift(); ord.push(top);
        top.style.transform = 'translate(46%,-6px) rotate(8deg)';
        ord.forEach((c, p) => { if (c !== top) put(c, p); });
        ft.textContent = `${all.indexOf(ord[0]) + 1} / ${N}`;
        ctx.timeout(() => { put(top, N - 1); top.style.opacity = 0; }, 240);
        ctx.timeout(() => { place(); busy = false; }, 520);
      };
      all.forEach(c => { c.style.transition = 'none'; });
      place(); stk.offsetWidth;
      all.forEach(c => { c.style.transition = ''; });
      ctx.timeout(next, 700);
      ctx.timeout(next, 1500);
      ctx.on(stk, 'click', next);
    }
  },
  /* ly17 플립 카드 */
  {
    id: 'ly17', ko: '플립 카드', en: 'Flip card',
    desc: '카드를 누르면 3D로 뒤집혀 뒷면에 숨겨 둔 내용을 보여줘요.',
    prompt: '「플립 카드(Flip card)」를 만들어 줘. 앞면엔 쿠폰 금액, 뒷면엔 쿠폰 코드를 두고, 누르면 카드가 perspective 800px 안에서 rotateY 180°로 0.6초 ease-out 동안 뒤집혀. 양면에 backface-visibility: hidden을 주고, 카드는 button과 aria-pressed로 만들며 reduced-motion이면 페이드로 바꿔 줘.',
    css: `
.d-ly17 .wr{display:flex;flex-direction:column;align-items:center;gap:11px}
.d-ly17 .fc{width:196px;height:122px;padding:0;border:0;background:none;font:inherit;cursor:pointer;perspective:800px;text-align:left}
.d-ly17 .in{position:relative;display:block;width:100%;height:100%;transform-style:preserve-3d;transition:transform .6s ${ly2E}}
.d-ly17 .fc[aria-pressed="true"] .in{transform:rotateY(180deg)}
.d-ly17 .f,.d-ly17 .b{position:absolute;inset:0;border-radius:16px;box-sizing:border-box;padding:14px 16px;display:flex;flex-direction:column;backface-visibility:hidden;-webkit-backface-visibility:hidden;box-shadow:0 8px 20px rgba(16,24,40,.18)}
.d-ly17 .f{background:linear-gradient(135deg,var(--accent),color-mix(in srgb,var(--accent) 60%,#7a4ee0));color:var(--accent-text)}
.d-ly17 .f small{font-size:11.5px;font-weight:700;opacity:.9}
.d-ly17 .f b{font-size:28px;font-weight:800;letter-spacing:-.03em;margin-top:4px}
.d-ly17 .f em{margin-top:auto;display:inline-flex;align-items:center;gap:5px;font-style:normal;font-size:11px;font-weight:600;opacity:.9}
.d-ly17 .f::after{content:'';position:absolute;right:-22px;top:-22px;width:88px;height:88px;border-radius:50%;background:rgba(255,255,255,.16)}
.d-ly17 .b{background:var(--surface);border:1px solid var(--line);color:var(--text);transform:rotateY(180deg)}
.d-ly17 .b small{font-size:11px;font-weight:700;color:var(--muted)}
.d-ly17 .b b{font-size:19px;font-weight:800;letter-spacing:.06em;margin-top:3px;font-variant-numeric:tabular-nums}
.d-ly17 .b i{display:block;height:24px;margin-top:8px;border-radius:3px;background:repeating-linear-gradient(90deg,var(--text) 0 2px,transparent 2px 5px,var(--text) 5px 6px,transparent 6px 10px,var(--text) 10px 13px,transparent 13px 15px)}
.d-ly17 .b em{margin-top:auto;font-style:normal;font-size:11px;color:var(--muted)}
.d-ly17 .ht{font-size:11.5px;color:var(--muted)}
`,
    html: `<div class="wr"><button class="fc" type="button" aria-pressed="false" aria-label="쿠폰 카드 뒤집기"><span class="in">
<span class="f"><small>웰컴 쿠폰</small><b>5,000원</b><em>${ly2IC.flip}눌러서 코드 보기</em></span>
<span class="b"><small>쿠폰 코드</small><b>JEJU-5000</b><i></i><em>12월 31일까지 · 3만원 이상</em></span>
</span></button><div class="ht">카드를 누르면 앞뒤가 뒤집혀요</div></div>`,
    run(el, ctx) {
      const fc = el.querySelector('.fc');
      const tg = () => fc.setAttribute('aria-pressed', fc.getAttribute('aria-pressed') !== 'true');
      ctx.timeout(tg, 900);
      ctx.on(fc, 'click', tg);
    }
  },
  /* ly18 비교 슬라이더 */
  {
    id: 'ly18', ko: '비교 슬라이더', en: 'Before / after slider',
    desc: '가운데 손잡이를 좌우로 끌어 전·후 이미지를 한자리에서 비교해요.',
    prompt: '「비교 슬라이더(Before/after slider)」를 만들어 줘. 같은 크기의 전·후 이미지를 겹치고 위 이미지를 clip-path로 잘라, 가운데 2px 세로선과 30px 원형 손잡이를 좌우로 끄는 만큼 실시간으로 드러나게 해. 트랜지션 없이 포인터를 바로 따라오고 양 끝 4%에서 멈춰. 손잡이엔 role="slider"·aria-valuenow와 좌우 화살표 키 조작을 넣어 줘.',
    css: `${ly2tpCss('ly18')}
.d-ly18 .wr{width:calc(100% - 28px);max-width:290px;display:flex;flex-direction:column;align-items:center;gap:7px}
.d-ly18 .ba{position:relative;width:100%;height:148px;border-radius:14px;overflow:hidden;box-shadow:var(--shadow);cursor:ew-resize;touch-action:none;user-select:none;-webkit-user-select:none;--p:50%}
.d-ly18 .ly{position:absolute;inset:0;background:linear-gradient(180deg,#6fb4ff 0%,#cfe8ff 62%)}
.d-ly18 .ly.bf{filter:grayscale(1) contrast(.7) brightness(.9);clip-path:inset(0 calc(100% - var(--p)) 0 0)}
.d-ly18 .sun{position:absolute;right:20%;top:16px;width:30px;height:30px;border-radius:50%;background:#ffc83d;box-shadow:0 0 0 8px rgba(255,200,61,.3)}
.d-ly18 .h1{position:absolute;left:-12%;bottom:22px;width:72%;height:64px;border-radius:50% 50% 0 0;background:#3fae7a}
.d-ly18 .h2{position:absolute;right:-16%;bottom:22px;width:78%;height:44px;border-radius:50% 50% 0 0;background:#2c9467}
.d-ly18 .sea{position:absolute;left:0;right:0;bottom:0;height:30px;background:linear-gradient(180deg,#2f7fe0,#1f5fc0)}
.d-ly18 .lb{position:absolute;top:8px;font-size:11px;font-weight:700;color:#fff;background:rgba(0,0,0,.5);padding:2px 9px;border-radius:999px;white-space:nowrap}
.d-ly18 .lb.l{left:8px}
.d-ly18 .lb.r{right:8px}
.d-ly18 .bar{position:absolute;top:0;bottom:0;left:var(--p);width:2px;margin-left:-1px;background:#fff;box-shadow:0 0 6px rgba(0,0,0,.35)}
.d-ly18 .kn{position:absolute;top:50%;left:50%;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;background:#fff;color:#1f2937;display:grid;place-items:center;box-shadow:0 2px 8px rgba(0,0,0,.35);cursor:ew-resize}
.d-ly18 .kn:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.d-ly18 .cp{font-size:11.5px;color:var(--muted)}
.d-ly18 .cp b{color:var(--text);font-variant-numeric:tabular-nums}
`,
    html: `<div class="wr"><div class="ba">
<div class="ly"><i class="sun"></i><i class="h1"></i><i class="h2"></i><i class="sea"></i><span class="lb r">보정 후</span></div>
<div class="ly bf"><i class="sun"></i><i class="h1"></i><i class="h2"></i><i class="sea"></i><span class="lb l">보정 전</span></div>
<div class="bar"><div class="kn" role="slider" tabindex="0" aria-label="전후 비교 위치" aria-valuemin="4" aria-valuemax="96" aria-valuenow="50">${ly2IC.arrows}</div></div>
</div><div class="cp">손잡이를 좌우로 끌어 보세요 · <b>50%</b></div></div><i class="tp"></i>`,
    run(el, ctx) {
      const ba = el.querySelector('.ba'), kn = el.querySelector('.kn'), tp = el.querySelector('.tp'), out = el.querySelector('.cp b');
      let p = 50, user = false, down = false;
      const set = v => { p = Math.max(4, Math.min(96, v)); ba.style.setProperty('--p', p + '%'); kn.setAttribute('aria-valuenow', Math.round(p)); out.textContent = Math.round(p) + '%'; };
      const K = [[400, 50], [1050, 22], [2350, 80], [3000, 50]];
      ctx.timeout(() => { if (user) return; const q = ly2at(el, ba, .5, .5); ly2put(tp, q[0], q[1]); tp.classList.add('on'); }, 150);
      ctx.timeout(() => { if (!user) tp.classList.add('dn'); }, 350);
      ctx.loop(t => {
        if (user) return false;
        if (t < K[0][0]) return;
        let v = K[K.length - 1][1];
        for (let i = 1; i < K.length; i++) if (t <= K[i][0]) { const k = (t - K[i - 1][0]) / (K[i][0] - K[i - 1][0]), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; v = K[i - 1][1] + (K[i][1] - K[i - 1][1]) * e; break; }
        set(v);
        const q = ly2at(el, ba, p / 100, .5); ly2put(tp, q[0], q[1]);
        if (t > K[K.length - 1][0]) { tp.classList.remove('dn', 'on'); return false; }
      });
      const fromX = e => { const r = ba.getBoundingClientRect(); set((e.clientX - r.left) / r.width * 100); };
      ctx.on(ba, 'pointerdown', e => { user = true; down = true; tp.classList.remove('on', 'dn'); try { ba.setPointerCapture(e.pointerId); } catch (_) {} fromX(e); });
      ctx.on(ba, 'pointermove', e => { if (down) fromX(e); });
      ctx.on(ba, 'pointerup', () => { down = false; });
      ctx.on(ba, 'pointercancel', () => { down = false; });
      ctx.on(kn, 'keydown', e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); user = true; tp.classList.remove('on', 'dn'); set(p + (e.key === 'ArrowRight' ? 4 : -4)); } });
    }
  },
  /* ly19 라이트박스 */
  {
    id: 'ly19', ko: '라이트박스', en: 'Lightbox',
    desc: '썸네일을 누르면 어두운 배경 위에 크게 띄우고 좌우로 넘겨 봐요.',
    prompt: '「라이트박스(Lightbox)」를 만들어 줘. 썸네일을 누르면 85% 검은 배경이 0.25초 페이드 인되고 사진이 썸네일 자리에서 0.35초 ease-out으로 커지며 가운데에 떠. 좌우 화살표로 이전·다음 사진을 넘기며 "3 / 6"을 표시하고, 닫기 버튼·배경 클릭·Esc로 닫아. role="dialog"와 포커스 가두기, 닫은 뒤 원래 썸네일로 포커스 복귀를 넣어 줘.',
    css: `${ly2tpCss('ly19')}
.d-ly19 .scr{${ly2SCR};height:180px;padding:10px 12px;display:flex;flex-direction:column}
.d-ly19 .hd{flex:none;font-size:13px;font-weight:800;color:var(--text);margin-bottom:8px;display:flex;justify-content:space-between;align-items:baseline}
.d-ly19 .hd small{font-size:11px;font-weight:500;color:var(--muted)}
.d-ly19 .gr{flex:1;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:1fr 1fr;gap:6px;min-height:0}
.d-ly19 .th{position:relative;border:0;padding:0;border-radius:9px;overflow:hidden;cursor:zoom-in;transition:transform .2s}
.d-ly19 .th:hover{transform:scale(1.04)}
.d-ly19 .th.pr{transform:scale(.94)}
.d-ly19 .th::after,.d-ly19 .big::after{content:'';position:absolute;right:16%;top:18%;width:22%;aspect-ratio:1;border-radius:50%;background:rgba(255,255,255,.4)}
.d-ly19 .th::before,.d-ly19 .big::before{content:'';position:absolute;left:-10%;right:-10%;bottom:-30%;height:60%;border-radius:50%;background:rgba(255,255,255,.2)}
.d-ly19 .lb{position:absolute;inset:0;z-index:5;background:rgba(8,10,14,.85);display:grid;place-items:center;opacity:0;visibility:hidden;transition:opacity .25s ease-out,visibility 0s .25s;outline:0}
.d-ly19 .lb.on{opacity:1;visibility:visible;transition:opacity .25s ease-out}
.d-ly19 .big{position:relative;width:62%;height:112px;border-radius:12px;overflow:hidden;transform-origin:0 0;box-shadow:0 12px 32px rgba(0,0,0,.5)}
.d-ly19 .big b{position:absolute;left:10px;bottom:8px;z-index:1;font-size:12px;font-weight:700;color:#fff;text-shadow:0 1px 4px rgba(0,0,0,.4)}
.d-ly19 .big.sw{animation:ly19-sw .3s ${ly2E}}
.d-ly19 .lb button{position:absolute;width:26px;height:26px;border-radius:50%;border:0;padding:0;background:rgba(255,255,255,.18);color:#fff;display:grid;place-items:center;cursor:pointer;transition:background .2s,transform .15s}
.d-ly19 .lb button:hover{background:rgba(255,255,255,.32)}
.d-ly19 .lb button.pr{transform:scale(.86);background:rgba(255,255,255,.4)}
.d-ly19 .lb .cl{right:8px;top:8px}
.d-ly19 .lb .pv{left:8px;top:50%;margin-top:-13px}
.d-ly19 .lb .nx{right:8px;top:50%;margin-top:-13px}
.d-ly19 .lb .ct{position:absolute;left:0;right:0;bottom:7px;text-align:center;font-size:11px;font-weight:700;color:rgba(255,255,255,.85);font-variant-numeric:tabular-nums}
@keyframes ly19-sw{from{opacity:0;transform:translateX(calc(var(--d,1)*26px))}to{opacity:1;transform:none}}
`,
    html: `<div class="scr"><div class="hd">제주 여행 사진<small>6장</small></div><div class="gr"></div>
<div class="lb" role="dialog" aria-modal="true" aria-label="사진 크게 보기" aria-hidden="true" tabindex="-1"><div class="big"><b></b></div>
<button class="cl" type="button" aria-label="닫기">${ly2IC.x}</button><button class="pv" type="button" aria-label="이전 사진">${ly2IC.back}</button><button class="nx" type="button" aria-label="다음 사진">${ly2IC.chev}</button><span class="ct">1 / 6</span></div></div><i class="tp"></i>`,
    run(el, ctx) {
      const gr = el.querySelector('.gr'), lb = el.querySelector('.lb'), big = el.querySelector('.big'), cap = big.querySelector('b'), ct = el.querySelector('.ct'), tp = el.querySelector('.tp'), nx = el.querySelector('.nx');
      const D = [['애월 해변', '#2f6bff,#7fb0ff'], ['성산 일출', '#e2553b,#f7b08a'], ['한라산 숲길', '#13976a,#6ed3ab'], ['협재 노을', '#7a4ee0,#f08bb6'], ['우도 등대', '#0f8fb0,#8fe0e8'], ['귤밭 산책', '#d9831f,#f6d365']];
      gr.innerHTML = D.map((d, i) => `<button class="th" type="button" data-i="${i}" aria-label="${d[0]} 크게 보기" style="background:linear-gradient(135deg,${d[1]})"></button>`).join('');
      const ths = [...gr.children];
      let cur = 0, user = false;
      const show = i => { cur = (i + D.length) % D.length; big.style.background = `linear-gradient(135deg,${D[cur][1]})`; cap.textContent = D[cur][0]; ct.textContent = `${cur + 1} / ${D.length}`; };
      const open = i => {
        show(i); big.classList.remove('sw');
        big.style.transition = 'none'; big.style.transform = '';
        const a = ths[cur].getBoundingClientRect(), b = big.getBoundingClientRect();
        big.style.transform = `translate(${a.left - b.left}px,${a.top - b.top}px) scale(${a.width / b.width},${a.height / b.height})`;
        big.offsetWidth;
        big.style.transition = `transform .35s ${ly2E}`; big.style.transform = '';
        lb.classList.add('on'); lb.setAttribute('aria-hidden', 'false');
      };
      const close = () => { lb.classList.remove('on'); lb.setAttribute('aria-hidden', 'true'); };
      const go = d => { show(cur + d); big.style.setProperty('--d', d); big.classList.remove('sw'); big.offsetWidth; big.classList.add('sw'); };
      ctx.on(gr, 'click', e => { const t = e.target.closest('.th'); if (!t) return; user = true; tp.classList.remove('on', 'dn'); open(+t.dataset.i); lb.focus({ preventScroll: true }); });
      ctx.on(lb, 'click', e => {
        user = true; tp.classList.remove('on', 'dn');
        if (e.target === lb || e.target.closest('.cl')) close();
        else if (e.target.closest('.pv')) go(-1);
        else if (e.target.closest('.nx')) go(1);
      });
      ctx.on(lb, 'keydown', e => { if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight') go(1); else if (e.key === 'ArrowLeft') go(-1); });
      const at = (n, ms) => ctx.timeout(() => { if (!user) n(); }, ms);
      at(() => { const q = ly2at(el, ths[1]); ly2put(tp, q[0], q[1]); tp.classList.add('on'); }, 450);
      at(() => { tp.classList.add('dn'); ths[1].classList.add('pr'); }, 700);
      at(() => { tp.classList.remove('dn', 'on'); ths[1].classList.remove('pr'); open(1); const f = document.activeElement; if (!f || f === document.body || el.contains(f)) lb.focus({ preventScroll: true }); }, 850);
      at(() => { const q = ly2at(el, nx); ly2put(tp, q[0], q[1]); tp.classList.add('on'); }, 1450);
      at(() => { tp.classList.add('dn'); nx.classList.add('pr'); }, 1700);
      at(() => { tp.classList.remove('dn'); nx.classList.remove('pr'); go(1); }, 1850);
      at(() => tp.classList.remove('on'), 2050);
    }
  },
  /* ly20 아바타 그룹 */
  {
    id: 'ly20', ko: '아바타 그룹', en: 'Avatar group',
    desc: '프로필 원을 겹쳐 나열하고, 넘치는 인원은 +3처럼 숫자로 묶어요.',
    prompt: '「아바타 그룹(Avatar group)」을 만들어 줘. 36px 원형 프로필을 10px씩 겹쳐 최대 4명까지 나열하고 넘치는 인원은 마지막에 "+3" 원으로 묶어. 새 참여자는 맨 앞에서 0.3초 ease-out으로 커지며 끼어들고 나머지가 옆으로 밀리며 숫자가 올라가. 원마다 배경색 2px 테두리로 경계를 나누고 그룹에 aria-label="8명 참여 중"처럼 전체 인원을 알려 줘.',
    css: `
.d-ly20 .cd{${ly2SCR};max-width:250px;padding:14px 16px}
.d-ly20 .t{font-size:13.5px;font-weight:800;color:var(--text)}
.d-ly20 .m{font-size:11.5px;color:var(--muted);margin-top:2px}
.d-ly20 .m b{color:var(--accent);font-variant-numeric:tabular-nums}
.d-ly20 .grp{display:flex;align-items:center;height:44px;margin-top:8px}
.d-ly20 .av{position:relative;flex:none;width:36px;height:36px;margin-left:-10px;border-radius:50%;border:2px solid var(--surface);box-sizing:border-box;display:grid;place-items:center;font-size:12.5px;font-weight:700;color:var(--text);overflow:hidden;white-space:nowrap;cursor:pointer;transition:transform .2s ${ly2E},width .3s ease-out,margin .3s ease-out,opacity .25s,border-width .3s;animation:ly20-pop .4s ${ly2E} backwards;animation-delay:calc(var(--i,0)*80ms)}
.d-ly20 .av:first-child{margin-left:0}
.d-ly20 .av:hover{transform:translateY(-4px);z-index:2}
.d-ly20 .av.jn{animation:ly20-jn .3s ease-out backwards}
.d-ly20 .av.out{width:0;margin-left:0;border-width:0;opacity:0;transform:scale(.3)}
.d-ly20 .av.me{background:var(--accent);color:var(--accent-text)}
.d-ly20 .av.mo{background:var(--surface-2);color:var(--muted);font-size:12px;cursor:default}
.d-ly20 .av.mo.bp{animation:ly20-bp .35s ${ly2E}}
.d-ly20 .jb{display:flex;align-items:center;justify-content:center;gap:5px;width:100%;height:32px;margin-top:10px;border:0;border-radius:10px;background:var(--accent);color:var(--accent-text);font:inherit;font-size:12.5px;font-weight:700;cursor:pointer;transition:background .2s,color .2s,transform .15s}
.d-ly20 .jb:active{transform:scale(.97)}
.d-ly20 .jb[aria-pressed="true"]{background:var(--accent-soft);color:var(--accent);cursor:default}
@keyframes ly20-pop{from{opacity:0;transform:translateX(-10px) scale(.5)}to{opacity:1;transform:none}}
@keyframes ly20-jn{from{width:0;opacity:0;transform:scale(.3)}to{width:36px;opacity:1;transform:none}}
@keyframes ly20-bp{0%{transform:scale(1)}45%{transform:scale(1.22)}100%{transform:scale(1)}}
`,
    html: `<div class="cd"><div class="t">제주 올레길 걷기 모임</div><div class="m">토요일 오전 9시 · <b>7명</b> 참여 중</div>
<div class="grp" role="group" aria-label="7명 참여 중">${[['김', 'accent'], ['이', 'success'], ['박', 'warn'], ['최', 'danger']].map((d, i) => `<span class="av" style="--i:${i};background:${ly2tint(28, d[1])}">${d[0]}</span>`).join('')}<span class="av mo" style="--i:4">+3</span></div>
<button class="jb" type="button" aria-pressed="false"><span>나도 참여하기</span></button></div>`,
    run(el, ctx) {
      const grp = el.querySelector('.grp'), mo = el.querySelector('.mo'), tot = el.querySelector('.m b'), jb = el.querySelector('.jb');
      let total = 7, hidden = 3;
      const join = (name, color, me) => {
        const vis = [...grp.querySelectorAll('.av:not(.mo):not(.out)')], last = vis[vis.length - 1];
        grp.insertAdjacentHTML('afterbegin', `<span class="av jn${me ? ' me' : ''}"${me ? '' : ` style="background:${ly2tint(28, color)}"`}>${name}</span>`);
        if (last) { last.classList.add('out'); ctx.timeout(() => last.remove(), 320); }
        total++; hidden++;
        tot.textContent = total + '명'; grp.setAttribute('aria-label', total + '명 참여 중');
        mo.textContent = '+' + hidden; mo.classList.remove('bp'); mo.offsetWidth; mo.classList.add('bp');
      };
      ctx.timeout(() => join('정', 'success'), 1300);
      ctx.on(jb, 'click', () => {
        if (jb.getAttribute('aria-pressed') === 'true') return;
        jb.setAttribute('aria-pressed', 'true'); jb.innerHTML = `${ly2IC.check}<span>참여 완료</span>`;
        join('나', 'accent', true);
      });
    }
  },
  /* ly21 트리 뷰 */
  {
    id: 'ly21', ko: '트리 뷰', en: 'Tree view', pair: 'ly07',
    desc: '아코디언과 달리 폴더 속 폴더까지 여러 단계로 들여 펼치고 접어요.',
    prompt: '「트리 뷰(Tree view)」를 만들어 줘. 폴더 속 폴더가 3단계 이상인 목록을 단계마다 14px씩 들여쓰고 세로 안내선을 그려. 폴더를 누르면 화살표가 90° 돌며 하위 항목이 0.25초 ease-out으로 펼쳐지고 다른 폴더는 그대로 둬. 아코디언과 헷갈리지 않게 1단 목록이나 하나만 열리는 방식은 하지 마. role="tree"·aria-expanded와 화살표 키 이동을 넣어 줘.',
    css: `
.d-ly21 .tr{${ly2SCR};height:180px;padding:7px 6px;overflow-y:auto;scrollbar-width:thin}
.d-ly21 .rw{display:flex;align-items:center;gap:5px;width:100%;height:21px;padding:0 6px 0 calc(4px + var(--lv)*14px);box-sizing:border-box;border:0;border-radius:6px;background:none;font:inherit;font-size:12px;color:var(--text);cursor:pointer;text-align:left;white-space:nowrap;transition:background .15s}
.d-ly21 .rw:hover{background:var(--surface-2)}
.d-ly21 .rw.sel{background:var(--accent-soft);color:var(--accent)}
.d-ly21 .rw span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis}
.d-ly21 .rw small{font-size:11px;color:var(--muted)}
.d-ly21 .cv{flex:none;width:11px;height:11px;display:grid;place-items:center;color:var(--muted);transition:transform .25s ease-out}
.d-ly21 .ic{flex:none;display:grid;place-items:center;color:var(--muted);transition:color .2s}
.d-ly21 .nd>.rw{font-weight:600}
.d-ly21 .nd[aria-expanded="true"]>.rw .cv{transform:rotate(90deg)}
.d-ly21 .nd[aria-expanded="true"]>.rw .ic{color:var(--accent)}
.d-ly21 .ch{display:grid;grid-template-rows:0fr;visibility:hidden;transition:grid-template-rows .25s ease-out,visibility 0s .25s}
.d-ly21 .nd[aria-expanded="true"]>.ch{grid-template-rows:1fr;visibility:inherit;transition:grid-template-rows .25s ease-out,visibility 0s}
.d-ly21 .ch>div{position:relative;overflow:hidden;min-height:0}
.d-ly21 .ch>div::before{content:'';position:absolute;left:calc(9px + var(--lv)*14px);top:1px;bottom:3px;width:1px;background:var(--line)}
`,
    html: `<div class="tr" role="tree" aria-label="내 파일"></div>`,
    run(el, ctx) {
      const tr = el.querySelector('.tr');
      const T = [{ t: '여행 계획', ch: [{ t: '제주', ch: [{ t: '숙소', ch: [{ t: '예약 확인서.pdf' }] }, { t: '일정표.xlsx' }] }, { t: '오사카', ch: [{ t: '항공권.pdf' }] }] }, { t: '영수증', ch: [{ t: '11월 숙박.pdf' }] }, { t: '메모.txt' }];
      const node = (n, lv) => n.ch
        ? `<div class="nd" role="treeitem" aria-expanded="false" aria-level="${lv}"><button class="rw" type="button" style="--lv:${lv - 1}"><i class="cv">${ly2IC.chev}</i><i class="ic">${ly2IC.folder}</i><span>${n.t}</span><small>${n.ch.length}</small></button><div class="ch" role="group" style="--lv:${lv - 1}"><div>${n.ch.map(c => node(c, lv + 1)).join('')}</div></div></div>`
        : `<button class="rw lf" type="button" role="treeitem" aria-level="${lv}" style="--lv:${lv - 1}"><i class="cv"></i><i class="ic">${ly2IC.file}</i><span>${n.t}</span></button>`;
      tr.innerHTML = T.map(n => node(n, 1)).join('');
      const nds = [...tr.querySelectorAll('.nd')];
      const rws = [...tr.querySelectorAll('.rw')];
      const rove = rw => rws.forEach(r => { r.tabIndex = r === rw ? 0 : -1; });
      rove(rws[0]);
      const tg = (nd, on) => {
        nd.setAttribute('aria-expanded', on == null ? nd.getAttribute('aria-expanded') !== 'true' : on);
        const c = tr.querySelector('.rw[tabindex="0"]');
        if (nd.getAttribute('aria-expanded') !== 'true' && c && nd.querySelector('.ch').contains(c)) rove(nd.firstElementChild);
      };
      ctx.on(tr, 'focusin', e => { const rw = e.target.closest('.rw'); if (rw) rove(rw); });
      ctx.timeout(() => tg(nds[0], true), 500);
      ctx.timeout(() => tg(nds[1], true), 1150);
      ctx.timeout(() => tg(nds[2], true), 1800);
      ctx.on(tr, 'click', e => {
        const rw = e.target.closest('.rw'); if (!rw) return;
        if (rw.classList.contains('lf')) { tr.querySelectorAll('.sel').forEach(x => x.classList.remove('sel')); rw.classList.add('sel'); }
        else tg(rw.parentNode);
      });
      ctx.on(tr, 'keydown', e => {
        const rw = e.target.closest('.rw'); if (!rw) return;
        const rows = [...tr.querySelectorAll('.rw')].filter(r => r.offsetParent && r.getBoundingClientRect().height > 0 && !r.closest('.nd[aria-expanded="false"] .ch'));
        const i = rows.indexOf(rw), nd = rw.classList.contains('lf') ? null : rw.parentNode;
        if (e.key === 'ArrowDown' && rows[i + 1]) { e.preventDefault(); rows[i + 1].focus({ preventScroll: true }); }
        else if (e.key === 'ArrowUp' && rows[i - 1]) { e.preventDefault(); rows[i - 1].focus({ preventScroll: true }); }
        else if (e.key === 'ArrowRight' && nd) { e.preventDefault(); tg(nd, true); }
        else if (e.key === 'ArrowLeft' && nd) { e.preventDefault(); tg(nd, false); }
      });
    }
  }
]);
})();
