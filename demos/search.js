(function () {
const I = {
  search: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  x: '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  clock: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  arrow: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M17 17L7 7M7 15V7h8"/></svg>',
  filter: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 6h16M7 12h10M10 18h4"/></svg>',
  chev: '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
  check: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>',
  star: '<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z"/></svg>'
};
// 한 글자씩 입력 시연
function typeInto(ctx, set, text, start, gap, done) {
  for (let i = 1; i <= text.length; i++) ctx.timeout(() => set(text.slice(0, i)), start + gap * (i - 1));
  if (done) ctx.timeout(done, start + gap * text.length);
}
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// FLIP 재정렬
function flip(items, mutate, ms) {
  const before = new Map(items.map(n => [n, n.getBoundingClientRect().top]));
  mutate();
  items.forEach(n => {
    const d = before.get(n) - n.getBoundingClientRect().top;
    n.style.transition = 'none'; n.style.transform = `translateY(${d}px)`;
  });
  items[0] && items[0].offsetWidth;
  items.forEach(n => { n.style.transition = `transform ${ms}ms cubic-bezier(.2,.8,.2,1)`; n.style.transform = ''; });
}
const SCR = 'width:calc(100% - 28px);max-width:290px;background:var(--surface);border-radius:18px;box-shadow:var(--shadow);box-sizing:border-box;overflow:hidden;position:relative';

UIDEX.add('search', [
  /* se01 검색창 */
  {
    id: 'se01', ko: '검색창', en: 'Search bar',
    desc: '탭하면 제목이 접히고 입력창이 강조되며 취소 버튼이 나타나요.',
    prompt: '「검색창(Search bar)」을 만들어 줘. 탭하면 위쪽 큰 제목이 0.3초 동안 접히고, 입력창 테두리가 파란색으로 바뀌며 4px 포커스 링과 오른쪽 "취소" 버튼이 슬라이드로 나타나. 글자가 있으면 지우기(×) 버튼을 보여 주고, input에 type="search"와 aria-label을 달아 줘.',
    css: `
.d-se01 .scr{${SCR};height:178px;padding:14px}
.d-se01 .ttl{font-size:21px;font-weight:800;letter-spacing:-.03em;height:32px;line-height:26px;overflow:hidden;transition:height .3s cubic-bezier(.2,.8,.2,1),opacity .2s}
.d-se01 .on .ttl{height:0;opacity:0}
.d-se01 .row{display:flex;align-items:center}
.d-se01 .bar{flex:1;min-width:0;display:flex;align-items:center;gap:7px;height:38px;padding:0 10px;border-radius:12px;background:var(--surface-2);color:var(--muted);border:1.5px solid transparent;cursor:text;transition:border-color .25s,box-shadow .25s,background .25s}
.d-se01 .on .bar{border-color:var(--accent);background:var(--surface);box-shadow:0 0 0 4px var(--accent-soft);color:var(--accent)}
.d-se01 input{flex:1;min-width:0;border:0;background:none;outline:none;font:inherit;font-size:13.5px;color:var(--text);padding:0}
.d-se01 input::placeholder{color:var(--muted)}
.d-se01 input::-webkit-search-cancel-button{display:none}
.d-se01 .clr{flex:none;width:18px;height:18px;border-radius:50%;border:0;padding:0;background:var(--muted);color:var(--surface);display:grid;place-items:center;cursor:pointer;opacity:0;transform:scale(.4);transition:all .2s cubic-bezier(.2,.8,.2,1)}
.d-se01 .has .clr{opacity:1;transform:none}
.d-se01 .cancel{flex:none;border:0;background:none;font:inherit;font-size:13.5px;font-weight:600;color:var(--accent);max-width:0;padding:0;overflow:hidden;white-space:nowrap;opacity:0;cursor:pointer;transition:max-width .3s cubic-bezier(.2,.8,.2,1),padding .3s cubic-bezier(.2,.8,.2,1),opacity .2s}
.d-se01 .on .cancel{max-width:48px;padding-left:10px;opacity:1}
.d-se01 .sub{margin-top:14px;font-size:11.5px;font-weight:700;color:var(--muted);transition:opacity .3s}
.d-se01 .tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.d-se01 .tags span{font-size:12px;padding:5px 10px;border-radius:999px;background:var(--surface-2);color:var(--text)}
.d-se01 .on .tags span{background:var(--accent-soft);color:var(--accent)}
`,
    html: `<div class="scr"><div class="ttl">여행</div>
<div class="row"><label class="bar">${I.search}<input type="search" placeholder="어디로 떠나세요?" aria-label="여행지 검색"><button class="clr" type="button" aria-label="검색어 지우기">${I.x}</button></label><button class="cancel" type="button">취소</button></div>
<div class="sub">추천 여행지</div><div class="tags"><span>제주</span><span>강릉</span><span>오사카</span><span>부산</span></div></div>`,
    run(el, ctx) {
      const scr = el.querySelector('.scr'), inp = el.querySelector('input'), sub = el.querySelector('.sub');
      const sync = () => { scr.classList.toggle('has', !!inp.value); sub.textContent = scr.classList.contains('on') ? (inp.value ? '연관 검색어' : '최근 검색') : '추천 여행지'; };
      const open = () => { scr.classList.add('on'); sync(); };
      ctx.timeout(open, 500);
      typeInto(ctx, v => { inp.value = v; sync(); }, '제주 숙소', 850, 110);
      ctx.on(inp, 'focus', open);
      ctx.on(inp, 'input', sync);
      ctx.on(el.querySelector('.clr'), 'click', e => { e.preventDefault(); inp.value = ''; sync(); });
      ctx.on(el.querySelector('.cancel'), 'click', () => { inp.value = ''; inp.blur(); scr.classList.remove('on'); sync(); });
    }
  },
  /* se02 자동완성 */
  {
    id: 'se02', ko: '자동완성', en: 'Autocomplete',
    desc: '한 글자씩 칠 때마다 일치하는 검색어를 아래에 바로 추천해요.',
    prompt: '「자동완성(Autocomplete)」 검색을 만들어 줘. 입력할 때마다 최대 4개 추천어를 드롭다운으로 띄우고, 입력한 부분은 굵은 파란 글자로 강조해. 위·아래 방향키로 항목을 이동하고 Enter로 선택하며, role="combobox"와 aria-activedescendant를 연결해 줘.',
    css: `
.d-se02 .box{width:calc(100% - 28px);max-width:290px;height:180px;position:relative}
.d-se02 .bar{display:flex;align-items:center;gap:7px;height:40px;padding:0 12px;border-radius:12px;background:var(--surface);border:1.5px solid var(--accent);box-shadow:0 0 0 4px var(--accent-soft);color:var(--accent)}
.d-se02 input{flex:1;min-width:0;border:0;background:none;outline:none;font:inherit;font-size:13.5px;color:var(--text);padding:0}
.d-se02 input::placeholder{color:var(--muted)}
.d-se02 ul{list-style:none;margin:8px 0 0;padding:5px;border-radius:12px;background:var(--surface);box-shadow:var(--shadow);opacity:0;transform:translateY(-6px);transition:opacity .2s,transform .25s cubic-bezier(.2,.8,.2,1)}
.d-se02 ul.show{opacity:1;transform:none}
.d-se02 li{display:flex;align-items:center;gap:8px;height:28px;padding:0 8px;border-radius:8px;font-size:12.5px;color:var(--text);cursor:pointer;white-space:nowrap;overflow:hidden}
.d-se02 li>svg:first-child{color:var(--muted);flex:none}
.d-se02 li span{flex:1;overflow:hidden;text-overflow:ellipsis}
.d-se02 li b{color:var(--accent);font-weight:700}
.d-se02 li .go{color:var(--muted);flex:none;display:grid}
.d-se02 li.act{background:var(--accent-soft)}
.d-se02 li.act .go{color:var(--accent)}
`,
    html: `<div class="box"><label class="bar">${I.search}<input placeholder="상품 검색" aria-label="상품 검색" role="combobox" aria-expanded="false" autocomplete="off"></label><ul role="listbox"></ul></div>`,
    run(el, ctx) {
      const DATA = ['캠핑 의자', '캠핑 의자 경량', '캠핑 테이블', '캠핑 랜턴', '캠핑장 예약', '캠핑카 렌트', '캠핑 매트', '제주 캠핑장', '캐리어 20인치', '카라반 숙소', '여행용 파우치', '여행 가방'];
      const inp = el.querySelector('input'), ul = el.querySelector('ul');
      let list = [], act = -1;
      const render = () => {
        const q = inp.value.trim();
        list = q ? DATA.filter(s => s.includes(q)).sort((a, b) => (b.startsWith(q) - a.startsWith(q))).slice(0, 4) : [];
        if (act >= list.length) act = list.length - 1;
        ul.innerHTML = list.map((s, i) => `<li role="option" id="se02-o${i}" aria-selected="${i === act}" class="${i === act ? 'act' : ''}" data-i="${i}">${I.search}<span>${esc(s).replace(new RegExp(reEsc(esc(q))), m => `<b>${m}</b>`)}</span><i class="go">${I.arrow}</i></li>`).join('');
        ul.classList.toggle('show', list.length > 0);
        inp.setAttribute('aria-expanded', list.length > 0);
        if (act >= 0 && list[act]) inp.setAttribute('aria-activedescendant', 'se02-o' + act); else inp.removeAttribute('aria-activedescendant');
      };
      const pick = i => { if (!list[i]) return; inp.value = list[i]; act = -1; list = []; ul.classList.remove('show'); };
      typeInto(ctx, v => { inp.value = v; act = -1; render(); }, '캠핑 의', 300, 220);
      ctx.timeout(() => { act = 0; render(); }, 1450);
      ctx.timeout(() => { act = 1; render(); }, 1850);
      ctx.timeout(() => pick(1), 2600);
      ctx.on(inp, 'input', () => { act = -1; render(); });
      ctx.on(inp, 'keydown', e => {
        if (e.key === 'ArrowDown') { act = Math.min(act + 1, list.length - 1); render(); e.preventDefault(); }
        else if (e.key === 'ArrowUp') { act = Math.max(act - 1, 0); render(); e.preventDefault(); }
        else if (e.key === 'Enter') pick(act);
      });
      ctx.on(ul, 'click', e => { const li = e.target.closest('li'); if (li) pick(+li.dataset.i); });
    }
  },
  /* se03 최근 검색어 */
  {
    id: 'se03', ko: '최근 검색어', en: 'Recent searches',
    desc: '내가 찾았던 검색어를 다시 보여주고 하나씩 지울 수 있어요.',
    prompt: '「최근 검색어(Recent searches)」 목록을 만들어 줘. 검색창 아래에 최근 4개가 시계 아이콘과 날짜와 함께 60ms 간격으로 나타나고, × 버튼을 누르면 해당 줄이 왼쪽으로 밀리며 0.3초 동안 높이가 접혀. "전체 삭제"도 넣고, 각 × 버튼엔 "제주 숙소 삭제"처럼 aria-label을 달아 줘.',
    css: `
.d-se03 .scr{${SCR};height:180px;padding:12px 14px}
.d-se03 .bar{display:flex;align-items:center;gap:7px;height:32px;padding:0 10px;border-radius:10px;background:var(--surface-2);color:var(--muted);font-size:12.5px}
.d-se03 .hd{display:flex;justify-content:space-between;align-items:center;margin:10px 0 2px;font-size:12px;font-weight:700;color:var(--text)}
.d-se03 .hd button{border:0;background:none;padding:0;font:inherit;font-size:11.5px;font-weight:500;color:var(--muted);cursor:pointer}
.d-se03 .row{display:flex;align-items:center;gap:8px;height:26px;overflow:hidden;font-size:12.5px;color:var(--text);animation:se03-in .35s cubic-bezier(.2,.8,.2,1) backwards;animation-delay:calc(var(--i)*60ms);transition:height .3s cubic-bezier(.2,.8,.2,1),opacity .2s,transform .3s cubic-bezier(.2,.8,.2,1)}
.d-se03 .row>svg{color:var(--muted);flex:none}
.d-se03 .row span{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-se03 .row small{font-size:11px;color:var(--muted)}
.d-se03 .row button{flex:none;width:20px;height:20px;border-radius:50%;border:0;padding:0;background:none;color:var(--muted);display:grid;place-items:center;cursor:pointer;transition:background .2s,color .2s}
.d-se03 .row button.hot,.d-se03 .row button:hover{background:var(--surface-2);color:var(--text)}
.d-se03 .row.out{height:0;opacity:0;transform:translateX(-24px)}
.d-se03 .none{display:none;text-align:center;color:var(--muted);font-size:12px;padding-top:26px;animation:se03-in .35s ease-out}
.d-se03 .none.show{display:block}
@keyframes se03-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
`,
    html: `<div class="scr"><div class="bar">${I.search}검색어를 입력하세요</div>
<div class="hd">최근 검색어<button type="button">전체 삭제</button></div>
<div class="list">${[['제주 숙소', '11.21'], ['캠핑 의자', '11.20'], ['강릉 카페', '11.18'], ['오사카 료칸', '11.15']].map((r, i) => `<div class="row" style="--i:${i}">${I.clock}<span>${r[0]}</span><small>${r[1]}</small><button type="button" aria-label="${r[0]} 삭제">${I.x}</button></div>`).join('')}</div>
<div class="none">최근 검색어가 없어요</div></div>`,
    run(el, ctx) {
      const none = el.querySelector('.none');
      const check = () => { if (!el.querySelector('.row:not(.out)')) none.classList.add('show'); };
      const del = row => { row.classList.add('out'); ctx.timeout(() => { row.remove(); check(); }, 320); };
      const second = el.querySelectorAll('.row')[1];
      ctx.timeout(() => second.querySelector('button').classList.add('hot'), 900);
      ctx.timeout(() => del(second), 1250);
      ctx.on(el.querySelector('.list'), 'click', e => { const b = e.target.closest('button'); if (b) del(b.closest('.row')); });
      ctx.on(el.querySelector('.hd button'), 'click', () => el.querySelectorAll('.row').forEach((r, i) => ctx.timeout(() => del(r), i * 50)));
    }
  },
  /* se04 인기 검색어 */
  {
    id: 'se04', ko: '인기 검색어', en: 'Trending searches',
    desc: '지금 많이 찾는 검색어가 순위와 오르내림 표시와 함께 돌아가요.',
    prompt: '「인기 검색어(Trending searches)」를 만들어 줘. 상단 한 줄 티커가 1.5초마다 다음 순위로 0.5초 동안 위로 롤링되고, 아래 1~5위 목록에서 같은 줄이 옅은 파란 배경으로 강조돼. 순위 변동은 ▲빨강·▼파랑·NEW로 표시하고, 마우스를 올리면 롤링을 멈추며 티커엔 aria-live="off"를 넣어 줘.',
    css: `
.d-se04 .box{width:calc(100% - 28px);max-width:290px}
.d-se04 .tk{display:flex;align-items:center;gap:8px;height:36px;padding:0 12px;border-radius:12px;background:var(--surface);box-shadow:var(--shadow)}
.d-se04 .lab{flex:none;font-size:11px;font-weight:800;color:var(--danger);display:flex;align-items:center;gap:5px}
.d-se04 .lab i{width:6px;height:6px;border-radius:50%;background:var(--danger);animation:se04-p 1.4s ease-in-out infinite}
.d-se04 .win{flex:1;height:22px;overflow:hidden}
.d-se04 .rail{transition:transform .5s cubic-bezier(.2,.8,.2,1)}
.d-se04 .it{height:22px;display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:var(--text);white-space:nowrap}
.d-se04 .it b,.d-se04 .ln b{width:14px;color:var(--accent);font-weight:800;text-align:center;flex:none}
.d-se04 .list{margin-top:10px;padding:6px;border-radius:12px;background:var(--surface);box-shadow:var(--shadow)}
.d-se04 .ln{display:flex;align-items:center;gap:8px;height:22px;padding:0 6px;border-radius:7px;font-size:12px;color:var(--text);transition:background .3s}
.d-se04 .ln span{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-se04 .ln.on{background:var(--accent-soft)}
.d-se04 .ln.on span{font-weight:700}
.d-se04 em{font-style:normal;font-size:10.5px;font-weight:700;flex:none}
.d-se04 .up{color:var(--danger)} .d-se04 .dn{color:var(--accent)} .d-se04 .nw{color:var(--success)} .d-se04 .eq{color:var(--muted)}
@keyframes se04-p{0%,100%{opacity:1}50%{opacity:.25}}
`,
    html: (() => {
      const D = [['제주 항공권', 'up', '▲2'], ['캠핑 의자', 'nw', 'NEW'], ['오사카 료칸', 'dn', '▼1'], ['단풍 명소', 'up', '▲5'], ['패딩 조끼', 'eq', '–']];
      const it = (d, i) => `<div class="it"><b>${i + 1}</b>${d[0]}<em class="${d[1]}">${d[2]}</em></div>`;
      return `<div class="box"><div class="tk"><span class="lab"><i></i>실시간</span><div class="win" aria-live="off"><div class="rail">${D.map(it).join('')}${it(D[0], 0)}</div></div></div>
<div class="list">${D.map((d, i) => `<div class="ln${i ? '' : ' on'}"><b>${i + 1}</b><span>${d[0]}</span><em class="${d[1]}">${d[2]}</em></div>`).join('')}</div></div>`;
    })(),
    run(el, ctx) {
      const rail = el.querySelector('.rail'), lns = el.querySelectorAll('.ln');
      let i = 0, paused = false;
      const step = () => {
        if (paused) return;
        i++;
        rail.style.transition = ''; rail.style.transform = `translateY(${-22 * i}px)`;
        lns.forEach((l, k) => l.classList.toggle('on', k === i % 5));
        if (i === 5) ctx.timeout(() => { rail.style.transition = 'none'; rail.style.transform = 'translateY(0)'; i = 0; }, 520);
      };
      ctx.timeout(() => { step(); ctx.interval(step, 1500); }, 1100);
      const box = el.querySelector('.box');
      ctx.on(box, 'mouseenter', () => paused = true);
      ctx.on(box, 'mouseleave', () => paused = false);
    }
  },
  /* se05 필터 */
  {
    id: 'se05', ko: '필터', en: 'Filter',
    desc: '조건을 고를 때마다 결과 개수가 바로 줄어드는 걸 보여줘요.',
    prompt: '「필터(Filter)」 바텀시트를 만들어 줘. 필터 버튼을 누르면 시트가 0.35초 동안 아래에서 올라오고, 가격·옵션 칩을 고를 때마다 하단 버튼의 결과 수가 0.3초 카운트로 바뀌어("23개 숙소 보기"). 적용하면 시트가 닫히고 필터 버튼에 선택 개수 배지를 띄우며, 칩은 aria-pressed로 상태를 알려 줘.',
    css: `
.d-se05 .scr{${SCR};height:180px;padding:12px}
.d-se05 .hd{display:flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--text)}
.d-se05 .hd small{flex:1;font-size:11.5px;font-weight:500;color:var(--muted)}
.d-se05 .fbtn{display:flex;align-items:center;gap:4px;height:28px;padding:0 10px;border-radius:999px;border:1px solid var(--line);background:var(--surface);font:inherit;font-size:12px;font-weight:600;color:var(--text);cursor:pointer;transition:all .2s}
.d-se05 .fbtn.has{border-color:var(--accent);color:var(--accent);background:var(--accent-soft)}
.d-se05 .fbtn em{display:none;font-style:normal;min-width:16px;height:16px;border-radius:8px;background:var(--accent);color:var(--accent-text);font-size:10.5px;line-height:16px;text-align:center}
.d-se05 .fbtn.has em{display:inline-block;animation:se05-pop .3s cubic-bezier(.2,.8,.2,1)}
.d-se05 .gr{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}
.d-se05 .gr div{height:56px;border-radius:10px;background:var(--surface-2);padding:8px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:flex-end;gap:5px}
.d-se05 .gr i{display:block;height:6px;border-radius:3px;background:var(--line)}
.d-se05 .gr i+i{width:60%}
.d-se05 .dim{position:absolute;inset:0;background:rgba(10,14,20,.38);opacity:0;pointer-events:none;transition:opacity .3s}
.d-se05 .sh{position:absolute;left:0;right:0;bottom:0;padding:8px 12px 12px;background:var(--surface);border-radius:16px 16px 0 0;transform:translateY(105%);transition:transform .35s cubic-bezier(.2,.8,.2,1)}
.d-se05 .open .dim{opacity:1;pointer-events:auto}
.d-se05 .open .sh{transform:none}
.d-se05 .hdl{width:30px;height:4px;border-radius:2px;background:var(--line);margin:0 auto 8px}
.d-se05 .lb{font-size:11px;font-weight:700;color:var(--muted);margin:0 0 5px}
.d-se05 .cs{display:flex;gap:5px;margin-bottom:8px}
.d-se05 .c{flex:1;height:26px;border-radius:8px;border:1px solid var(--line);background:var(--surface);font:inherit;font-size:11.5px;color:var(--text);cursor:pointer;padding:0;white-space:nowrap;transition:all .2s}
.d-se05 .c[aria-pressed="true"]{border-color:var(--accent);background:var(--accent-soft);color:var(--accent);font-weight:700}
.d-se05 .cta{width:100%;height:32px;font-size:12.5px;gap:0}
@keyframes se05-pop{from{transform:scale(0)}to{transform:scale(1)}}
`,
    html: `<div class="scr"><div class="hd">제주 숙소<small>128개</small><button class="fbtn" type="button">${I.filter}필터<em>0</em></button></div>
<div class="gr"><div><i></i><i></i></div><div><i></i><i></i></div><div><i></i><i></i></div><div><i></i><i></i></div></div>
<div class="dim"></div><div class="sh" role="dialog" aria-label="필터"><div class="hdl"></div>
<div class="lb">1박 가격</div><div class="cs"><button class="c" type="button" aria-pressed="false" data-f=".42">~5만원</button><button class="c" type="button" aria-pressed="false" data-f=".36">5~10만원</button><button class="c" type="button" aria-pressed="false" data-f=".22">10만원+</button></div>
<div class="lb">옵션</div><div class="cs"><button class="c" type="button" aria-pressed="false" data-f=".55">무료 취소</button><button class="c" type="button" aria-pressed="false" data-f=".5">조식 포함</button><button class="c" type="button" aria-pressed="false" data-f=".3">수영장</button></div>
<button class="ui-btn cta" type="button"><span>128</span>개 숙소 보기</button></div></div>`,
    run(el, ctx) {
      const scr = el.querySelector('.scr'), cs = [...el.querySelectorAll('.c')], num = el.querySelector('.cta span');
      const fbtn = el.querySelector('.fbtn'), small = el.querySelector('.hd small');
      let shown = 128, target = 128;
      const calc = () => Math.max(1, Math.round(cs.filter(c => c.getAttribute('aria-pressed') === 'true').reduce((n, c) => n * +c.dataset.f, 128)));
      const tween = () => {
        const from = shown; target = calc(); const t0 = performance.now();
        ctx.loop(() => { const p = Math.min(1, (performance.now() - t0) / 300); shown = Math.round(from + (target - from) * (1 - Math.pow(1 - p, 3))); num.textContent = shown; return p < 1; });
      };
      const toggle = c => { c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') !== 'true'); tween(); };
      const apply = () => {
        scr.classList.remove('open');
        const n = cs.filter(c => c.getAttribute('aria-pressed') === 'true').length;
        fbtn.classList.toggle('has', n > 0); fbtn.querySelector('em').textContent = n;
        small.textContent = target + '개';
      };
      ctx.timeout(() => scr.classList.add('open'), 350);
      ctx.timeout(() => toggle(cs[1]), 850);
      ctx.timeout(() => toggle(cs[4]), 1350);
      ctx.timeout(apply, 2700);
      ctx.on(fbtn, 'click', () => scr.classList.add('open'));
      ctx.on(el.querySelector('.dim'), 'click', apply);
      ctx.on(el.querySelector('.cta'), 'click', apply);
      cs.forEach(c => ctx.on(c, 'click', () => toggle(c)));
    }
  },
  /* se06 정렬 */
  {
    id: 'se06', ko: '정렬', en: 'Sort',
    desc: '추천순·낮은 가격순처럼 순서 기준을 바꾸면 목록이 자리를 옮겨요.',
    prompt: '「정렬(Sort)」 드롭다운을 만들어 줘. "추천순 ▾"을 누르면 메뉴가 0.2초 동안 펼쳐지고, 선택한 항목엔 체크가 붙어. 기준을 바꾸면 목록 행들이 FLIP 방식으로 0.5초 cubic-bezier(.2,.8,.2,1)로 새 자리로 미끄러져 이동하고, 메뉴는 role="listbox"·aria-selected로 만들어 줘.',
    css: `
.d-se06 .scr{${SCR};height:180px;padding:12px 14px}
.d-se06 .hd{display:flex;align-items:center;justify-content:space-between;font-size:12px;color:var(--muted);margin-bottom:6px}
.d-se06 .hd b{color:var(--text)}
.d-se06 .sb{display:flex;align-items:center;gap:3px;border:0;background:none;padding:4px 0;font:inherit;font-size:12px;font-weight:700;color:var(--text);cursor:pointer}
.d-se06 .sb svg{transition:transform .2s}
.d-se06 .open .sb svg{transform:rotate(180deg)}
.d-se06 .row{display:flex;align-items:center;gap:9px;height:33px;border-top:1px solid var(--line);font-size:12.5px;color:var(--text);background:var(--surface)}
.d-se06 .row i{width:24px;height:24px;border-radius:7px;background:var(--accent-soft);flex:none}
.d-se06 .row span{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-se06 .row small{display:block;font-size:10.5px;color:var(--muted)}
.d-se06 .row b{font-size:12.5px}
.d-se06 .menu{position:absolute;right:10px;top:36px;z-index:2;width:118px;padding:5px;border-radius:12px;background:var(--surface);box-shadow:0 8px 24px rgba(0,0,0,.18);border:1px solid var(--line);opacity:0;transform:translateY(-6px) scale(.97);transform-origin:top right;pointer-events:none;transition:opacity .2s,transform .2s cubic-bezier(.2,.8,.2,1)}
.d-se06 .open .menu{opacity:1;transform:none;pointer-events:auto}
.d-se06 .menu div{display:flex;align-items:center;justify-content:space-between;height:27px;padding:0 8px;border-radius:7px;font-size:12px;color:var(--text);cursor:pointer}
.d-se06 .menu div svg{color:var(--accent);opacity:0}
.d-se06 .menu div[aria-selected="true"]{font-weight:700;color:var(--accent)}
.d-se06 .menu div[aria-selected="true"] svg{opacity:1}
.d-se06 .menu div.hv,.d-se06 .menu div:hover{background:var(--surface-2)}
`,
    html: `<div class="scr"><div class="hd"><span>숙소 <b>4</b>개</span><button class="sb" type="button" aria-haspopup="listbox"><span>추천순</span>${I.chev}</button></div>
<div class="list">${[['애월 오션뷰 스테이', '★4.9 · 후기 812', 128000, 4.9, 812], ['성산 감성 독채', '★4.7 · 후기 203', 89000, 4.7, 203], ['중문 리조트 디럭스', '★4.8 · 후기 1,540', 214000, 4.8, 1540], ['협재 게스트하우스', '★4.5 · 후기 96', 39000, 4.5, 96]].map((r, i) => `<div class="row" data-p="${r[2]}" data-r="${r[4]}" data-i="${i}"><i></i><span>${r[0]}<small>${r[1]}</small></span><b>${r[2].toLocaleString()}원</b></div>`).join('')}</div>
<div class="menu" role="listbox">${['추천순', '낮은 가격순', '높은 가격순', '후기 많은순'].map((t, i) => `<div role="option" aria-selected="${i === 0}" data-k="${i}">${t}${I.check}</div>`).join('')}</div></div>`,
    run(el, ctx) {
      const scr = el.querySelector('.scr'), list = el.querySelector('.list'), opts = [...el.querySelectorAll('.menu div')], lab = el.querySelector('.sb span');
      const keys = [r => +r.dataset.i, r => +r.dataset.p, r => -r.dataset.p, r => -r.dataset.r];
      const choose = k => {
        opts.forEach((o, i) => { o.setAttribute('aria-selected', i === k); o.classList.remove('hv'); });
        lab.textContent = opts[k].textContent; scr.classList.remove('open');
        const rows = [...list.children];
        flip(rows, () => rows.slice().sort((a, b) => keys[k](a) - keys[k](b)).forEach(r => list.appendChild(r)), 500);
      };
      ctx.timeout(() => scr.classList.add('open'), 400);
      ctx.timeout(() => opts[1].classList.add('hv'), 850);
      ctx.timeout(() => choose(1), 1150);
      ctx.on(el.querySelector('.sb'), 'click', () => scr.classList.toggle('open'));
      opts.forEach((o, i) => ctx.on(o, 'click', () => choose(i)));
    }
  },
  /* se07 검색어 강조 */
  {
    id: 'se07', ko: '검색어 강조', en: 'Search highlight',
    desc: '결과 속에서 내가 친 단어만 형광펜처럼 칠해 바로 눈에 띄게 해요.',
    prompt: '「검색어 강조(Search highlight)」를 만들어 줘. 추천어 목록이 아니라 결과 목록 본문에서 입력한 단어와 일치하는 부분을 <mark>로 감싸고, 옅은 파란 형광펜 배경이 왼쪽에서 오른쪽으로 0.45초 동안 칠해지듯 나타나게 해. 줄마다 60ms씩 늦게 시작하고, 정규식 특수문자는 이스케이프하며 mark 글자는 4.5:1 대비를 지켜 줘.',
    css: `
.d-se07 .box{width:calc(100% - 28px);max-width:290px}
.d-se07 .bar{display:flex;align-items:center;gap:7px;height:38px;padding:0 12px;border-radius:12px;background:var(--surface);box-shadow:var(--shadow);color:var(--muted)}
.d-se07 input{flex:1;min-width:0;border:0;background:none;outline:none;font:inherit;font-size:13.5px;font-weight:600;color:var(--text);padding:0}
.d-se07 .res{margin-top:8px;padding:4px 12px;border-radius:12px;background:var(--surface);box-shadow:var(--shadow);height:118px;box-sizing:border-box;overflow:hidden}
.d-se07 .r{display:flex;align-items:center;gap:8px;height:27px;font-size:12.5px;color:var(--text);white-space:nowrap;overflow:hidden}
.d-se07 .r+.r{border-top:1px solid var(--line)}
.d-se07 .r>svg{color:var(--muted);flex:none}
.d-se07 .r span{overflow:hidden;text-overflow:ellipsis}
.d-se07 mark{color:var(--accent);font-weight:800;border-radius:3px;padding:0 1px;background:linear-gradient(var(--accent-soft),var(--accent-soft)) no-repeat 0 0/0% 100%;animation:se07-sw .45s cubic-bezier(.2,.8,.2,1) forwards;animation-delay:calc(var(--i)*60ms + 80ms)}
.d-se07 .empty{font-size:12px;color:var(--muted);padding-top:40px;text-align:center}
@keyframes se07-sw{to{background-size:100% 100%}}
`,
    html: `<div class="box"><label class="bar">${I.search}<input aria-label="검색어" placeholder="검색어 입력"></label><div class="res"></div></div>`,
    run(el, ctx) {
      const DATA = ['제주 3박 4일 항공+숙소', '서귀포 오션뷰 숙소 · 제주', '제주 렌터카 24시간 할인', '부산 해운대 1박 숙소', '강릉 바다 앞 카페 투어', '제주 감귤 따기 체험'];
      const inp = el.querySelector('input'), res = el.querySelector('.res');
      const render = () => {
        const q = inp.value.trim();
        const rows = q ? DATA.filter(s => s.includes(q)) : DATA;
        if (!rows.length) { res.innerHTML = '<div class="empty">일치하는 결과가 없어요</div>'; return; }
        res.innerHTML = rows.slice(0, 4).map((s, i) => `<div class="r">${I.search}<span>${q ? esc(s).replace(new RegExp(reEsc(esc(q)), 'g'), m => `<mark style="--i:${i}">${m}</mark>`) : esc(s)}</span></div>`).join('');
      };
      render();
      typeInto(ctx, v => { inp.value = v; }, '제주', 350, 200, render);
      ctx.on(inp, 'input', render);
    }
  },
  /* se08 결과 없음 */
  {
    id: 'se08', ko: '결과 없음', en: 'No results', pair: 'fb11',
    desc: '찾는 게 없을 때 막다른 길 대신 다른 검색어를 제안해요.',
    prompt: '「결과 없음(No results)」 화면을 만들어 줘. 검색 후 결과가 0개면 돋보기 아이콘이 0.9→1로 0.35초 커지며 나타나고, "‘제주 우주여행’ 결과가 없어요" 문구와 추천 검색어 칩 2개가 80ms 간격으로 떠올라. 빈 화면처럼 일반 안내만 두지 말고 입력어를 보여 주며, 칩은 누르면 재검색하고 결과 영역엔 role="status"를 넣어 줘.',
    css: `
.d-se08 .scr{${SCR};height:180px;padding:12px 14px}
.d-se08 .bar{display:flex;align-items:center;gap:7px;height:34px;padding:0 10px;border-radius:10px;background:var(--surface-2);color:var(--muted);font-size:13px}
.d-se08 .bar span{color:var(--text);font-weight:600}
.d-se08 .bar span::after{content:'';display:inline-block;width:1.5px;height:14px;margin-left:1px;vertical-align:-2px;background:var(--accent);animation:se08-c 1s steps(1) infinite}
.d-se08 .bar.done span::after{display:none}
.d-se08 .out{text-align:center;padding-top:8px}
.d-se08 .dots{display:flex;justify-content:center;gap:5px;padding-top:44px}
.d-se08 .dots i{width:6px;height:6px;border-radius:50%;background:var(--muted);animation:se08-d .8s ease-in-out infinite}
.d-se08 .dots i:nth-child(2){animation-delay:.12s}.d-se08 .dots i:nth-child(3){animation-delay:.24s}
.d-se08 .ic{width:36px;height:36px;margin:0 auto;border-radius:50%;background:var(--surface-2);color:var(--muted);display:grid;place-items:center;animation:se08-pop .35s cubic-bezier(.2,.8,.2,1) both}
.d-se08 .t{margin-top:8px;font-size:13px;font-weight:700;color:var(--text);animation:se08-up .35s cubic-bezier(.2,.8,.2,1) .08s both}
.d-se08 .s{margin-top:3px;font-size:11px;color:var(--muted);animation:se08-up .35s cubic-bezier(.2,.8,.2,1) .14s both}
.d-se08 .cs{display:flex;justify-content:center;gap:6px;margin-top:8px}
.d-se08 .cs button{height:26px;padding:0 11px;border-radius:999px;border:1px solid var(--accent);background:var(--accent-soft);color:var(--accent);font:inherit;font-size:11.5px;font-weight:700;cursor:pointer;animation:se08-up .35s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(.22s + var(--i)*80ms)}
.d-se08 .r{display:flex;align-items:center;gap:9px;height:36px;border-bottom:1px solid var(--line);text-align:left;font-size:12.5px;color:var(--text);animation:se08-up .3s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i)*60ms)}
.d-se08 .r i{width:26px;height:26px;border-radius:8px;background:var(--accent-soft);flex:none}
.d-se08 .r small{display:block;font-size:10.5px;color:var(--muted)}
@keyframes se08-pop{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:none}}
@keyframes se08-up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes se08-d{0%,100%{opacity:.25;transform:translateY(0)}50%{opacity:1;transform:translateY(-3px)}}
@keyframes se08-c{50%{opacity:0}}
`,
    html: `<div class="scr"><div class="bar">${I.search}<span></span></div><div class="out" role="status"></div></div>`,
    run(el, ctx) {
      const bar = el.querySelector('.bar'), sp = bar.querySelector('span'), out = el.querySelector('.out');
      const big = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5M8.5 8.5l5 5M13.5 8.5l-5 5"/></svg>';
      const empty = () => {
        bar.classList.add('done');
        out.innerHTML = `<div class="ic">${big}</div><div class="t">‘제주 우주여행’ 결과가 없어요</div><div class="s">이런 검색어는 어때요?</div><div class="cs"><button type="button" style="--i:0">제주 여행</button><button type="button" style="--i:1">제주 투어</button></div>`;
      };
      const results = q => {
        sp.textContent = q;
        out.innerHTML = [['애월 해안도로 드라이브', '★4.8 · 반나절'], ['우도 자전거 투어', '★4.7 · 3시간'], ['한라산 영실 코스', '★4.9 · 5시간']].map((r, i) => `<div class="r" style="--i:${i}"><i></i><span>${q} · ${r[0]}<small>${r[1]}</small></span></div>`).join('');
      };
      typeInto(ctx, v => sp.textContent = v, '제주 우주여행', 150, 80, () => { out.innerHTML = '<div class="dots"><i></i><i></i><i></i></div>'; ctx.timeout(empty, 500); });
      ctx.on(out, 'click', e => { const b = e.target.closest('button'); if (b) results(b.textContent); });
    }
  },
  /* se09 검색 범위 탭 */
  {
    id: 'se09', ko: '검색 범위 탭', en: 'Scope tabs', pair: 'nv04',
    desc: '화면 이동 탭과 달리 같은 검색어의 결과를 범위별로 나눠 봐요.',
    prompt: '「검색 범위 탭(Scope tabs)」을 만들어 줘. 검색 결과 위에 전체·숙소·투어·후기 탭과 개수를 두고, 탭을 바꾸면 밑줄 인디케이터가 0.3초 ease-out으로 너비·위치를 따라 이동하며 내용이 슬라이드로 바뀌어. 상단 탭처럼 화면을 옮기지 말고 검색어는 그대로 둬. role="tablist"·aria-selected로 좌우 방향키를 지원해 줘.',
    css: `
.d-se09 .scr{${SCR};height:180px;padding:10px 12px 0}
.d-se09 .q{display:flex;align-items:center;gap:7px;height:28px;padding:0 10px;border-radius:9px;background:var(--surface-2);color:var(--muted);font-size:12.5px}
.d-se09 .q b{color:var(--text)}
.d-se09 .tabs{position:relative;display:flex;margin-top:6px;border-bottom:1px solid var(--line)}
.d-se09 .tab{flex:1;height:30px;border:0;background:none;padding:0;font:inherit;font-size:12.5px;color:var(--muted);cursor:pointer;white-space:nowrap;transition:color .2s}
.d-se09 .tab small{font-size:10.5px;margin-left:2px}
.d-se09 .tab[aria-selected="true"]{color:var(--text);font-weight:700}
.d-se09 .ind{position:absolute;bottom:-1px;left:0;height:2px;border-radius:2px;background:var(--text);transition:transform .3s ease-out,width .3s ease-out}
.d-se09 .pane{padding-top:5px;animation:se09-in .32s cubic-bezier(.2,.8,.2,1)}
.d-se09 .pane.l{animation-name:se09-inl}
.d-se09 .r{display:flex;align-items:center;gap:9px;height:30px;font-size:12px;color:var(--text)}
.d-se09 .r i{width:26px;height:26px;border-radius:8px;background:var(--accent-soft);flex:none;display:grid;place-items:center;color:var(--accent);font-style:normal;font-size:10px;font-weight:800}
.d-se09 .r span{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-se09 .r small{display:block;font-size:10.5px;color:var(--muted)}
.d-se09 .tg{font-size:10px;font-weight:700;color:var(--accent);background:var(--accent-soft);padding:2px 6px;border-radius:5px;flex:none}
.d-se09 .cards{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.d-se09 .cards div{border-radius:10px;background:var(--surface-2);padding:6px;font-size:11px;color:var(--text)}
.d-se09 .cards div i{display:block;height:40px;border-radius:7px;background:var(--accent-soft);margin-bottom:5px}
.d-se09 .cards b{display:block;font-size:11px;margin-top:1px}
.d-se09 .st{color:var(--warn);display:inline-flex;gap:1px;vertical-align:-1px}
@keyframes se09-in{from{opacity:0;transform:translateX(18px)}to{opacity:1;transform:none}}
@keyframes se09-inl{from{opacity:0;transform:translateX(-18px)}to{opacity:1;transform:none}}
`,
    html: `<div class="scr"><div class="q">${I.search}<b>제주</b></div>
<div class="tabs" role="tablist">${[['전체', 24], ['숙소', 12], ['투어', 8], ['후기', 4]].map((t, i) => `<button class="tab" role="tab" type="button" aria-selected="${i === 0}" tabindex="${i ? -1 : 0}">${t[0]}<small>${t[1]}</small></button>`).join('')}<span class="ind"></span></div>
<div class="pane"></div></div>`,
    run(el, ctx) {
      const st = `<span class="st">${I.star.repeat(5)}</span>`;
      const P = [
        `<div class="r"><i>숙</i><span>애월 오션뷰 스테이<small>1박 128,000원</small></span><em class="tg">숙소</em></div><div class="r"><i>투</i><span>우도 자전거 투어<small>3시간 · 25,000원</small></span><em class="tg">투어</em></div><div class="r"><i>후</i><span>“노을이 정말 예뻐요”<small>애월 스테이 후기</small></span><em class="tg">후기</em></div>`,
        `<div class="cards"><div><i></i>애월 오션뷰<b>128,000원</b></div><div><i></i>성산 감성 독채<b>89,000원</b></div></div>`,
        `<div class="r"><i>1</i><span>우도 자전거 투어<small>3시간 · 25,000원</small></span></div><div class="r"><i>2</i><span>한라산 영실 코스<small>5시간 · 39,000원</small></span></div><div class="r"><i>3</i><span>감귤 따기 체험<small>1시간 · 12,000원</small></span></div>`,
        `<div class="r"><span>${st} “노을이 정말 예뻐요”<small>애월 오션뷰 스테이</small></span></div><div class="r"><span>${st} “가이드 설명이 친절해요”<small>우도 자전거 투어</small></span></div><div class="r"><span>${st} “아이와 가기 좋아요”<small>감귤 따기 체험</small></span></div>`
      ];
      const tabs = [...el.querySelectorAll('.tab')], ind = el.querySelector('.ind'), pane = el.querySelector('.pane');
      let cur = 0;
      const place = () => { const t = tabs[cur], w = t.offsetWidth * .56; ind.style.width = w + 'px'; ind.style.transform = `translateX(${t.offsetLeft + (t.offsetWidth - w) / 2}px)`; };
      const go = (i, focus) => {
        const dir = i < cur ? 'l' : '';
        cur = i;
        tabs.forEach((t, k) => { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; });
        place(); if (focus) tabs[i].focus();
        const n = paneRef.cloneNode(false); n.className = 'pane ' + dir; n.innerHTML = P[i]; paneRef.replaceWith(n);
        paneRef = n;
      };
      let paneRef = pane; pane.innerHTML = P[0];
      ind.style.transition = 'none'; place(); ind.offsetWidth; ind.style.transition = '';
      ctx.timeout(() => go(1), 650);
      ctx.timeout(() => go(3), 1450);
      tabs.forEach((t, i) => ctx.on(t, 'click', () => go(i)));
      ctx.on(el.querySelector('.tabs'), 'keydown', e => {
        if (e.key === 'ArrowRight') go((cur + 1) % 4, true);
        if (e.key === 'ArrowLeft') go((cur + 3) % 4, true);
      });
    }
  },
  /* se10 빠른 선택 칩 */
  {
    id: 'se10', ko: '빠른 필터 칩', en: 'Quick filters', pair: 'in10',
    desc: '칩 단품과 달리 검색창 아래서 조건을 눌러 결과를 바로 좁혀요.',
    prompt: '「빠른 필터 칩(Quick filters)」을 만들어 줘. 검색창 아래 칩 줄이 40ms 간격으로 들어오고, 탭하면 0.94배로 눌렸다가 파란 채움+체크로 바뀌며 스켈레톤 0.4초 뒤 결과가 갱신돼. 칩 컴포넌트 자체가 아닌 결과 좁히기 용도이고, button에 aria-pressed를 달아 줘.',
    css: `
.d-se10 .scr{${SCR};height:180px;padding:12px 0}
.d-se10 .bar{display:flex;align-items:center;gap:7px;height:34px;margin:0 12px;padding:0 10px;border-radius:10px;background:var(--surface-2);color:var(--muted);font-size:12.5px;white-space:nowrap;overflow:hidden}
.d-se10 .bar b{color:var(--text);font-weight:600;overflow:hidden;text-overflow:ellipsis}
.d-se10 .chips{display:flex;gap:5px;padding:10px 12px 2px;overflow-x:auto;scrollbar-width:none;-webkit-mask-image:linear-gradient(90deg,#000 85%,transparent)}
.d-se10 .chips::-webkit-scrollbar{display:none}
.d-se10 .chips button{flex:none;display:inline-flex;align-items:center;gap:2px;height:28px;padding:0 9px;border-radius:999px;border:1px solid var(--line);background:var(--surface);font:inherit;font-size:12px;color:var(--text);cursor:pointer;animation:se10-in .4s cubic-bezier(.2,.8,.2,1) backwards;animation-delay:calc(var(--i)*40ms);transition:background .2s,color .2s,border-color .2s,transform .15s}
.d-se10 .chips button svg{display:none}
.d-se10 .chips button[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:var(--accent-text);font-weight:700}
.d-se10 .chips button[aria-pressed="true"] svg{display:block}
.d-se10 .chips button.press{transform:scale(.94)}
.d-se10 .lab{margin:8px 14px 2px;font-size:11.5px;font-weight:700;color:var(--muted)}
.d-se10 .lab b{color:var(--accent)}
.d-se10 .res{padding:0 14px}
.d-se10 .r{display:flex;align-items:center;gap:9px;height:32px;font-size:12.5px;color:var(--text);animation:se10-in .3s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i)*50ms)}
.d-se10 .r i{width:28px;height:28px;border-radius:8px;background:var(--accent-soft);flex:none}
.d-se10 .r small{display:block;font-size:10.5px;color:var(--muted)}
.d-se10 .sk i,.d-se10 .sk em{background:linear-gradient(90deg,var(--surface-2) 25%,var(--line) 50%,var(--surface-2) 75%) 0 0/200% 100%;animation:se10-sh 1s linear infinite}
.d-se10 .sk em{display:block;height:8px;width:110px;border-radius:4px}
@keyframes se10-in{from{opacity:0;transform:translateX(14px)}to{opacity:1;transform:none}}
@keyframes se10-sh{to{background-position:-200% 0}}
`,
    html: `<div class="scr"><div class="bar">${I.search}<b>제주 숙소</b></div>
<div class="chips">${['반려견 동반', '수영장', '조식 포함', '오션뷰'].map((t, i) => `<button type="button" aria-pressed="false" style="--i:${i}">${I.check}${t}</button>`).join('')}</div>
<div class="lab">추천 숙소 <b>128</b>곳</div><div class="res"></div></div>`,
    run(el, ctx) {
      const chips = [...el.querySelectorAll('.chips button')], res = el.querySelector('.res'), lab = el.querySelector('.lab'), q = el.querySelector('.bar b');
      const F = [.14, .3, .5, .4];
      const ROWS = [['서귀포 수영장 풀빌라', '1박 186,000원', [1, 3]], ['함덕 조식 맛집 호텔', '1박 112,000원', [2]], ['애월 펫 프렌들리 하우스', '1박 98,000원', [0, 3]], ['한림 돌담 독채', '1박 79,000원', [0]]];
      let ver = 0;
      const show = (sel) => {
        let m = ROWS.filter(r => sel.every(k => r[2].includes(k)));
        if (!m.length) m = ROWS.filter(r => sel.some(k => r[2].includes(k)));
        res.innerHTML = m.slice(0, 2).map((r, i) => `<div class="r" style="--i:${i}"><i></i><span>${r[0]}<small>${r[1]}</small></span></div>`).join('');
      };
      const refresh = () => {
        const on = chips.filter(c => c.getAttribute('aria-pressed') === 'true');
        const n = Math.max(1, Math.round(on.reduce((s, c) => s * F[chips.indexOf(c)], 128)));
        q.textContent = ['제주 숙소', ...on.map(c => c.textContent)].join(' · ');
        lab.innerHTML = (on.length ? '조건에 맞는 숙소 ' : '추천 숙소 ') + `<b>${n}</b>곳`;
        const v = ++ver;
        res.innerHTML = [0, 1].map(() => '<div class="r sk"><i></i><span><em></em></span></div>').join('');
        ctx.timeout(() => { if (v === ver) show(on.map(c => chips.indexOf(c))); }, 400);
      };
      const tap = c => { c.classList.add('press'); ctx.timeout(() => { c.classList.remove('press'); c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') !== 'true'); refresh(); }, 140); };
      show([]);
      ctx.timeout(() => tap(chips[0]), 900);
      chips.forEach(c => ctx.on(c, 'click', () => tap(c)));
    }
  }
]);
})();
