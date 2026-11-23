const se2I = {
  search: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  x: '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  check: '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>',
  enter: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v8H6M10 9l-4 4 4 4"/></svg>',
  refresh: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12a8 8 0 1 1-2.6-5.9M20 4v4h-4"/></svg>'
};
const se2Type = (ctx, set, text, start, gap, done) => {
  for (let i = 1; i <= text.length; i++) ctx.timeout(() => set(text.slice(0, i)), start + gap * (i - 1));
  if (done) ctx.timeout(done, start + gap * text.length);
};
const se2Esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const se2SCR = 'width:calc(100% - 28px);max-width:290px;background:var(--surface);border-radius:18px;box-shadow:var(--shadow);box-sizing:border-box;overflow:hidden;position:relative';
// 숫자 카운트(0.3초)
const se2Count = (ctx, node, to, ms) => {
  const from = +node.textContent || 0;
  if (from === to) return;
  ctx.loop(t => {
    const p = Math.min(1, t / (ms || 300));
    node.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
    return p < 1;
  });
};

UIDEX.add('search', [
  /* se11 커맨드 팔레트 */
  {
    id: 'se11', ko: '커맨드 팔레트', en: 'Command palette',
    desc: '단축키로 화면 가운데 명령 검색창을 띄워 키보드만으로 실행해요.',
    prompt: '「커맨드 팔레트(Command palette)」를 만들어 줘. ⌘K(Ctrl+K)를 누르면 화면 가운데에 명령 검색창이 180ms 동안 0.96배에서 커지며 뜨고, 입력할 때마다 명령 목록이 걸러져. 위·아래 방향키로 이동해 Enter로 실행, Esc로 닫고, role="dialog"와 포커스 트랩을 넣어 줘.',
    css: `
.d-se11 .app{${se2SCR};height:178px}
.d-se11 .top{display:flex;align-items:center;justify-content:space-between;height:42px;padding:0 12px 0 14px;border-bottom:1px solid var(--line)}
.d-se11 .ttl{font-size:13.5px;font-weight:700;color:var(--text)}
.d-se11 kbd{font:inherit;font-size:11px;font-weight:700;min-width:18px;height:18px;padding:0 4px;box-sizing:border-box;display:inline-grid;place-items:center;border-radius:5px;background:var(--surface-2);border:1px solid var(--line);color:var(--muted)}
.d-se11 .kb{display:flex;align-items:center;gap:3px;border:0;background:none;padding:4px;border-radius:8px;cursor:pointer;transition:transform .12s,background .12s}
.d-se11 .kb.press{transform:scale(.88);background:var(--accent-soft)}
.d-se11 .kb.press kbd{border-color:var(--accent);color:var(--accent)}
.d-se11 .body{padding:14px;display:grid;gap:10px}
.d-se11 .body .ui-line:nth-child(2){width:70%}
.d-se11 .body .ui-line:nth-child(3){width:85%}
.d-se11 .body .ui-line:nth-child(4){width:50%}
.d-se11 .toast{position:absolute;left:50%;bottom:12px;transform:translate(-50%,10px);max-width:calc(100% - 24px);box-sizing:border-box;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:7px 12px;border-radius:999px;background:var(--text);color:var(--surface);font-size:12px;font-weight:600;opacity:0;transition:opacity .2s,transform .25s cubic-bezier(.2,.8,.2,1)}
.d-se11 .toast.show{opacity:1;transform:translate(-50%,0)}
.d-se11 .dim{position:absolute;inset:0;background:var(--stage);opacity:0;pointer-events:none;transition:opacity .18s}
.d-se11 .open .dim{opacity:.72;pointer-events:auto}
.d-se11 .pal{position:absolute;left:12px;right:12px;top:10px;border-radius:12px;background:var(--surface);border:1px solid var(--line);box-shadow:var(--shadow);opacity:0;transform:scale(.96) translateY(-6px);pointer-events:none;visibility:hidden;transition:opacity .18s ease-out,transform .18s cubic-bezier(.2,.8,.2,1),visibility 0s .18s}
.d-se11 .open .pal{opacity:1;transform:none;pointer-events:auto;visibility:visible;transition:opacity .18s ease-out,transform .18s cubic-bezier(.2,.8,.2,1),visibility 0s}
.d-se11 .in{display:flex;align-items:center;gap:7px;height:36px;padding:0 10px;border-bottom:1px solid var(--line);color:var(--muted)}
.d-se11 .in input{flex:1;min-width:0;border:0;background:none;outline:none;font:inherit;font-size:13px;color:var(--text);padding:0}
.d-se11 .in input::placeholder{color:var(--muted)}
.d-se11 ul{list-style:none;margin:0;padding:4px;height:84px;box-sizing:content-box}
.d-se11 li{display:flex;align-items:center;gap:8px;height:28px;padding:0 8px;border-radius:7px;font-size:12.5px;color:var(--text);cursor:pointer;white-space:nowrap}
.d-se11 li span{flex:1;overflow:hidden;text-overflow:ellipsis}
.d-se11 li .ent{display:none;color:var(--accent)}
.d-se11 li.act{background:var(--accent-soft);color:var(--accent);font-weight:700}
.d-se11 li.act .ent{display:grid}
.d-se11 li.act kbd{display:none}
.d-se11 li.no{color:var(--muted);cursor:default;justify-content:center;height:84px}
.d-se11 .ft{height:24px;display:flex;align-items:center;gap:8px;padding:0 10px;border-top:1px solid var(--line);font-size:11px;color:var(--muted);white-space:nowrap;overflow:hidden}
`,
    html: `<div class="app">
<div class="top"><span class="ttl">내 작업 공간</span><button class="kb" type="button" aria-label="명령 팔레트 열기"><kbd>⌘</kbd><kbd>K</kbd></button></div>
<div class="body"><div class="ui-line"></div><div class="ui-line"></div><div class="ui-line"></div><div class="ui-line"></div></div>
<div class="toast" role="status"></div>
<div class="dim"></div>
<div class="pal" role="dialog" aria-label="명령 팔레트">
<label class="in">${se2I.search}<input placeholder="명령 검색" aria-label="명령 검색" role="combobox" aria-expanded="true" autocomplete="off"><kbd>esc</kbd></label>
<ul role="listbox"></ul>
<div class="ft"><span>↑↓ 이동</span><span>↵ 실행</span><span>esc 닫기</span></div>
</div></div>`,
    run(el, ctx) {
      const CMDS = [['새 주문 만들기', 'N'], ['다크 모드 전환', 'D'], ['알림 설정 열기', 'A'], ['결제 설정 열기', 'P'], ['팀원 초대하기', 'I'], ['주문 내역 내보내기', 'E']];
      const app = el.querySelector('.app'), inp = el.querySelector('input'), ul = el.querySelector('ul'), kb = el.querySelector('.kb'), toast = el.querySelector('.toast');
      let list = [], act = 0, user = false;
      const auto = (fn, ms) => ctx.timeout(() => { if (!user) fn(); }, ms);
      const render = () => {
        const q = inp.value.trim();
        list = CMDS.filter(c => c[0].includes(q)).slice(0, 3);
        act = Math.max(0, Math.min(act, list.length - 1));
        ul.innerHTML = list.length ? list.map((c, i) => `<li role="option" aria-selected="${i === act}" class="${i === act ? 'act' : ''}" data-i="${i}"><span>${c[0]}</span><kbd>${c[1]}</kbd><i class="ent">${se2I.enter}</i></li>`).join('') : '<li class="no">일치하는 명령이 없어요</li>';
      };
      const show = focus => { app.classList.add('open'); toast.classList.remove('show'); inp.value = ''; act = 0; render(); if (focus) inp.focus({ preventScroll: true }); };
      const hide = () => { app.classList.remove('open'); inp.blur(); };
      const exec = i => {
        if (!list[i]) return;
        toast.textContent = `'${list[i][0]}' 실행`;
        hide(); toast.classList.add('show');
      };
      auto(() => kb.classList.add('press'), 350);
      auto(() => { kb.classList.remove('press'); show(false); }, 560);
      auto(() => { inp.value = '설'; act = 0; render(); }, 1000);
      auto(() => { inp.value = '설정'; act = 0; render(); }, 1250);
      auto(() => { act = 1; render(); }, 1750);
      auto(() => exec(1), 3000);
      ctx.on(el, 'pointerdown', () => { user = true; kb.classList.remove('press'); });
      ctx.on(kb, 'click', () => show(true));
      ctx.on(inp, 'input', () => { act = 0; render(); });
      ctx.on(inp, 'keydown', e => {
        user = true;
        if (e.key === 'ArrowDown') { act = Math.min(act + 1, list.length - 1); render(); e.preventDefault(); }
        else if (e.key === 'ArrowUp') { act = Math.max(act - 1, 0); render(); e.preventDefault(); }
        else if (e.key === 'Enter') { exec(act); e.preventDefault(); }
        else if (e.key === 'Escape') hide();
      });
      ctx.on(ul, 'click', e => { const li = e.target.closest('li[data-i]'); if (li) exec(+li.dataset.i); });
      ctx.on(el.querySelector('.dim'), 'click', hide);
    }
  },
  /* se12 오타 교정 제안 */
  {
    id: 'se12', ko: '오타 교정 제안', en: 'Did you mean',
    desc: '오타를 고친 검색어로 결과를 보여주고 원래 검색어도 남겨둬요.',
    prompt: '「오타 교정 제안(Did you mean)」을 만들어 줘. "캠핑 의지"처럼 오타로 검색하면 고친 검색어 "캠핑 의자"의 결과를 바로 보여 주고, 결과 위에 "캠핑 의자로 검색한 결과예요" 안내와 "원래 검색어로 보기" 링크를 250ms 페이드 업으로 띄워. 바뀐 글자는 굵게 강조하고 안내 영역엔 role="status"를 달아 줘.',
    css: `
.d-se12 .scr{${se2SCR};height:180px;padding:12px 14px}
.d-se12 .bar{display:flex;align-items:center;gap:7px;height:36px;padding:0 10px;border-radius:11px;background:var(--surface-2);color:var(--muted);border:1.5px solid transparent;transition:border-color .2s}
.d-se12 .bar.busy{border-color:var(--accent);color:var(--accent)}
.d-se12 input{flex:1;min-width:0;border:0;background:none;outline:none;font:inherit;font-size:13.5px;color:var(--text);padding:0}
.d-se12 input::placeholder{color:var(--muted)}
.d-se12 input::-webkit-search-cancel-button{display:none}
.d-se12 .msg{margin-top:10px;min-height:38px;font-size:12.5px;line-height:19px;color:var(--text)}
.d-se12 .msg>*{animation:se12-up .25s cubic-bezier(.2,.8,.2,1) backwards}
.d-se12 .msg>*:nth-child(2){animation-delay:.12s}
.d-se12 .msg p{margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-se12 .msg b{color:var(--accent);font-weight:700}
.d-se12 .msg b u{text-decoration:none;font-weight:800;background:var(--accent-soft);border-radius:3px;padding:0 1px}
.d-se12 .msg s{text-decoration:none;color:var(--danger);font-weight:700}
.d-se12 .msg button{display:block;border:0;background:none;padding:0;font:inherit;font-size:12px;color:var(--muted);text-decoration:underline;text-underline-offset:2px;cursor:pointer;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-se12 .msg button:hover{color:var(--accent)}
.d-se12 .res{margin-top:8px}
.d-se12 .row{display:flex;align-items:center;gap:9px;height:30px;font-size:12.5px;color:var(--text);animation:se12-up .3s cubic-bezier(.2,.8,.2,1) backwards;animation-delay:calc(.2s + var(--i)*70ms)}
.d-se12 .row i{flex:none;width:24px;height:24px;border-radius:7px;background:var(--accent-soft)}
.d-se12 .row span{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-se12 .row em{flex:none;font-style:normal;font-weight:700;font-size:12px}
.d-se12 .zero{height:60px;display:grid;place-items:center;border-radius:10px;border:1.5px dashed var(--line);color:var(--muted);font-size:12px;animation:se12-up .3s ease-out backwards}
@keyframes se12-up{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
`,
    html: `<div class="scr"><label class="bar">${se2I.search}<input type="search" placeholder="상품 검색 후 Enter" aria-label="상품 검색" autocomplete="off"></label>
<div class="msg" role="status"></div><div class="res"></div></div>`,
    run(el, ctx) {
      const TERMS = ['캠핑 의자', '캠핑 테이블', '여행 가방', '등산 스틱'];
      const bar = el.querySelector('.bar'), inp = el.querySelector('input'), msg = el.querySelector('.msg'), res = el.querySelector('.res');
      let user = false;
      const dist = (a, b) => {
        const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
        for (let j = 1; j <= b.length; j++) d[0][j] = j;
        for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        return d[a.length][b.length];
      };
      const mark = (fix, orig) => fix.length === orig.length ? [...fix].map((c, i) => c === orig[i] ? se2Esc(c) : `<u>${se2Esc(c)}</u>`).join('') : se2Esc(fix);
      const rows = t => [[t + ' 경량형', '39,000원'], [t + ' 2개 세트', '64,000원']].map((r, i) => `<div class="row" style="--i:${i}"><i></i><span>${se2Esc(r[0])}</span><em>${r[1]}</em></div>`).join('');
      const search = (raw, keep) => {
        const q = raw.trim();
        bar.classList.remove('busy');
        if (!q) { msg.innerHTML = ''; res.innerHTML = ''; return; }
        const best = TERMS.map(t => [dist(q, t), t]).sort((a, b) => a[0] - b[0])[0];
        if (best[0] === 0) { msg.innerHTML = `<p><b>‘${se2Esc(q)}’</b> 검색 결과 2개</p>`; res.innerHTML = rows(q); }
        else if (best[0] <= 2 && !keep) {
          msg.innerHTML = `<p><b>‘${mark(best[1], q)}’</b>로 검색한 결과예요</p><button type="button" data-orig="${se2Esc(q)}">원래 검색어 ‘${se2Esc(q)}’로 보기</button>`;
          res.innerHTML = rows(best[1]);
        } else {
          msg.innerHTML = `<p><s>‘${se2Esc(q)}’</s> 검색 결과가 없어요</p>` + (best[0] <= 2 ? `<button type="button" data-fix="${se2Esc(best[1])}">‘${se2Esc(best[1])}’로 다시 검색</button>` : '');
          res.innerHTML = '<div class="zero">다른 검색어로 찾아보세요</div>';
        }
      };
      se2Type(ctx, v => { if (!user) inp.value = v; }, '캠핑 의지', 250, 130);
      ctx.timeout(() => { if (!user) bar.classList.add('busy'); }, 1000);
      ctx.timeout(() => { if (!user) search(inp.value); }, 1300);
      ctx.on(el, 'pointerdown', () => { user = true; });
      ctx.on(inp, 'keydown', e => { user = true; if (e.key === 'Enter') { search(inp.value); e.preventDefault(); } });
      ctx.on(msg, 'click', e => {
        const b = e.target.closest('button'); if (!b) return;
        if (b.dataset.orig) search(b.dataset.orig, true);
        else { inp.value = b.dataset.fix; search(b.dataset.fix); }
      });
    }
  },
  /* se13 적용된 필터 칩 */
  {
    id: 'se13', ko: '적용된 필터 칩', en: 'Active filters', pair: 'se10',
    desc: '빠른 필터 칩과 달리 이미 건 조건만 보여주고 ×로 하나씩 풀어요.',
    prompt: '「적용된 필터 칩(Active filters)」을 만들어 줘. 이미 적용한 조건을 결과 목록 위에 × 버튼이 달린 칩으로 나열하고, ×를 누르면 그 칩이 250ms 동안 접히며 결과 수가 갱신돼. 오른쪽엔 "전체 해제"를 둬. 빠른 필터 칩과 헷갈리지 않게 아직 고르지 않은 조건은 칩으로 보여 주지 마. × 버튼엔 "무료배송 필터 해제" 같은 aria-label을 달아 줘.',
    css: `
.d-se13 .scr{${se2SCR};height:180px;padding:12px 14px;display:flex;flex-direction:column}
.d-se13 .hd{flex:none;display:flex;align-items:center;justify-content:space-between;height:20px;font-size:12.5px;color:var(--text)}
.d-se13 .hd b{font-weight:800;color:var(--accent);font-variant-numeric:tabular-nums}
.d-se13 .all{border:0;background:none;padding:0;font:inherit;font-size:12px;font-weight:600;color:var(--muted);text-decoration:underline;text-underline-offset:2px;cursor:pointer;transition:opacity .2s}
.d-se13 .all:disabled{opacity:.35;cursor:default}
.d-se13 .chips{flex:none;display:flex;flex-wrap:wrap;margin:9px 0 3px;min-height:32px}
.d-se13 .chip{display:inline-flex;align-items:center;gap:5px;height:26px;margin:0 6px 6px 0;padding:0 5px 0 10px;box-sizing:border-box;max-width:130px;overflow:hidden;white-space:nowrap;border-radius:999px;background:var(--accent-soft);color:var(--accent);font-size:12px;font-weight:700;animation:se13-pop .3s cubic-bezier(.2,.8,.2,1) backwards;animation-delay:calc(var(--i)*90ms);transition:max-width .25s cubic-bezier(.2,.8,.2,1),padding .25s,margin .25s,opacity .18s}
.d-se13 .chip button{flex:none;width:17px;height:17px;border-radius:50%;border:0;padding:0;background:none;color:var(--accent);display:grid;place-items:center;cursor:pointer;transition:background .15s,color .15s,transform .15s}
.d-se13 .chip button:hover,.d-se13 .chip button.hot{background:var(--accent);color:var(--accent-text)}
.d-se13 .chip button.hot{transform:scale(1.15)}
.d-se13 .chip.out{max-width:0;padding:0;margin-right:0;opacity:0}
.d-se13 .none{display:flex;align-items:center;gap:8px;height:26px;font-size:12px;color:var(--muted);animation:se13-pop .3s ease-out backwards}
.d-se13 .none button{border:1px solid var(--line);background:var(--surface);border-radius:999px;height:24px;padding:0 9px;font:inherit;font-size:11.5px;font-weight:600;color:var(--text);cursor:pointer}
.d-se13 .grid{flex:1;min-height:0;display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:1fr 1fr;gap:6px}
.d-se13 .grid i{border-radius:8px;background:var(--surface-2);display:grid;align-content:end;padding:5px;box-sizing:border-box;opacity:0;transform:scale(.8);transition:opacity .25s,transform .3s cubic-bezier(.2,.8,.2,1)}
.d-se13 .grid i::after{content:"";height:4px;width:70%;border-radius:2px;background:var(--line)}
.d-se13 .grid i.on{opacity:1;transform:none}
@keyframes se13-pop{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:none}}
`,
    html: `<div class="scr"><div class="hd"><span aria-live="polite">결과 <b>24</b>개</span><button class="all" type="button">전체 해제</button></div>
<div class="chips" aria-label="적용된 필터"></div>
<div class="grid">${'<i></i>'.repeat(8)}</div></div>`,
    run(el, ctx) {
      const NAMES = ['무료배송', '3만원 이하', '별점 4+'], CNT = [128, 96, 58, 24], VIS = [8, 7, 5, 3];
      const chips = el.querySelector('.chips'), num = el.querySelector('.hd b'), all = el.querySelector('.all'), tiles = el.querySelectorAll('.grid i');
      let user = false;
      const live = () => chips.querySelectorAll('.chip:not(.out)');
      const sync = () => {
        const n = live().length;
        se2Count(ctx, num, CNT[n]);
        tiles.forEach((t, i) => t.classList.toggle('on', i < VIS[n]));
        all.disabled = n === 0;
        if (n === 0) ctx.timeout(() => { if (!live().length) chips.innerHTML = '<div class="none">적용된 필터가 없어요<button type="button" data-re>다시 적용</button></div>'; }, 270);
      };
      const fill = () => { chips.innerHTML = NAMES.map((n, i) => `<span class="chip" style="--i:${i}">${n}<button type="button" aria-label="${n} 필터 해제">${se2I.x}</button></span>`).join(''); sync(); };
      const drop = c => { if (c.classList.contains('out')) return; c.classList.add('out'); ctx.timeout(() => c.remove(), 260); sync(); };
      fill();
      ctx.timeout(() => { if (!user) chips.children[1].querySelector('button').classList.add('hot'); }, 1000);
      ctx.timeout(() => { if (!user) drop(chips.children[1]); }, 1400);
      ctx.on(el, 'pointerdown', () => { user = true; const h = el.querySelector('.hot'); if (h) h.classList.remove('hot'); });
      ctx.on(chips, 'click', e => {
        const b = e.target.closest('button'); if (!b) return;
        if ('re' in b.dataset) fill(); else drop(b.closest('.chip'));
      });
      ctx.on(all, 'click', () => [...live()].forEach(drop));
    }
  },
  /* se14 패싯 필터 */
  {
    id: 'se14', ko: '패싯 필터', en: 'Faceted filter', pair: 'se05',
    desc: '필터와 달리 속성마다 결과 개수가 붙고 고를 때마다 다시 계산돼요.',
    prompt: '「패싯 필터(Faceted filter)」를 만들어 줘. 색상·소재 같은 속성별 체크박스 옆에 해당 결과 개수를 "(24)"로 붙이고, 하나를 체크하면 다른 속성의 개수가 200ms 안에 다시 계산돼 바뀌어. 0개가 된 항목은 흐리게 비활성화해. 일반 필터와 헷갈리지 않게 개수 없는 칩만 나열하지는 마. 그룹은 fieldset과 legend로 묶어 줘.',
    css: `
.d-se14 .scr{${se2SCR};height:180px;padding:12px 12px 12px}
.d-se14 .cols{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.d-se14 fieldset{border:0;margin:0;padding:0;min-width:0}
.d-se14 legend{padding:0 4px;height:20px;font-size:11.5px;font-weight:800;color:var(--muted)}
.d-se14 .opt{position:relative;display:flex;align-items:center;gap:6px;height:28px;padding:0 4px;border-radius:8px;font-size:12.5px;color:var(--text);cursor:pointer;white-space:nowrap;transition:background .2s,opacity .2s}
.d-se14 .opt:hover,.d-se14 .opt.hot{background:var(--surface-2)}
.d-se14 .opt input{position:absolute;opacity:0;width:0;height:0;margin:0}
.d-se14 .bx{flex:none;width:15px;height:15px;border-radius:4px;border:1.5px solid var(--line);background:var(--surface);color:var(--accent-text);display:grid;place-items:center;box-sizing:border-box;transition:background .15s,border-color .15s,transform .2s cubic-bezier(.2,.8,.2,1)}
.d-se14 .bx svg{opacity:0;transform:scale(.4);transition:opacity .15s,transform .2s cubic-bezier(.2,.8,.2,1)}
.d-se14 .opt input:checked+.bx{background:var(--accent);border-color:var(--accent)}
.d-se14 .opt input:checked+.bx svg{opacity:1;transform:none}
.d-se14 .opt input:focus-visible+.bx{box-shadow:0 0 0 3px var(--accent-soft)}
.d-se14 .opt span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis}
.d-se14 .opt input:checked~span{font-weight:700}
.d-se14 .opt em{flex:none;font-style:normal;font-size:11.5px;color:var(--muted);font-variant-numeric:tabular-nums}
.d-se14 .opt em.tick{animation:se14-tick .4s cubic-bezier(.2,.8,.2,1)}
.d-se14 .opt.zero{opacity:.4;cursor:default}
.d-se14 .opt.zero:hover{background:none}
.d-se14 .go{width:100%;margin-top:10px;height:34px;font-size:12.5px}
.d-se14 .go b{font-variant-numeric:tabular-nums}
@keyframes se14-tick{0%{transform:translateY(-7px);opacity:0;color:var(--accent)}60%{color:var(--accent)}100%{transform:none;opacity:1}}
`,
    html: (() => {
      const g = (name, key, opts) => `<fieldset data-g="${key}"><legend>${name}</legend>${opts.map((o, i) => `<label class="opt"><input type="checkbox" data-i="${i}"><i class="bx">${se2I.check}</i><span>${o}</span><em></em></label>`).join('')}</fieldset>`;
      return `<div class="scr"><div class="cols">${g('색상', 'c', ['블랙', '베이지', '카키'])}${g('소재', 'm', ['경량', '스틸', '원목'])}</div>
<button class="ui-btn go" type="button" aria-live="polite"><span>상품 <b>51</b>개 보기</span></button></div>`;
    })(),
    run(el, ctx) {
      // M[색상][소재] = 상품 수
      const M = [[12, 8, 4], [9, 3, 6], [6, 3, 0]];
      const box = k => [...el.querySelectorAll(`[data-g="${k}"] input`)];
      const C = box('c'), T = box('m'), total = el.querySelector('.go b');
      let user = false, first = true;
      const sel = arr => { const s = arr.map(b => b.checked); return s.some(Boolean) ? s : s.map(() => true); };
      const put = (inp, n) => {
        const lab = inp.closest('.opt'), em = lab.querySelector('em'), txt = `(${n})`;
        if (em.textContent !== txt) { em.textContent = txt; if (!first) { em.classList.remove('tick'); em.offsetWidth; em.classList.add('tick'); } }
        const zero = n === 0 && !inp.checked;
        lab.classList.toggle('zero', zero); inp.disabled = zero;
      };
      const sync = () => {
        const sc = sel(C), sm = sel(T);
        C.forEach((b, i) => put(b, M[i].reduce((a, v, j) => a + (sm[j] ? v : 0), 0)));
        T.forEach((b, j) => put(b, M.reduce((a, r, i) => a + (sc[i] ? r[j] : 0), 0)));
        let n = 0; M.forEach((r, i) => r.forEach((v, j) => { if (sc[i] && sm[j]) n += v; }));
        if (first) total.textContent = n; else se2Count(ctx, total, n, 250);
        first = false;
      };
      sync();
      const demo = (inp, t) => {
        ctx.timeout(() => { if (!user) inp.closest('.opt').classList.add('hot'); }, t - 300);
        ctx.timeout(() => { inp.closest('.opt').classList.remove('hot'); if (!user) { inp.checked = true; sync(); } }, t);
      };
      demo(C[2], 800);
      demo(T[0], 1700);
      ctx.on(el, 'pointerdown', () => { user = true; });
      ctx.on(el.querySelector('.cols'), 'change', () => { user = true; sync(); });
    }
  },
  /* se15 확장 검색창 */
  {
    id: 'se15', ko: '확장 검색창', en: 'Expandable search', pair: 'se01',
    desc: '검색창과 달리 돋보기 아이콘만 있다가 누르면 입력창으로 넓어져요.',
    prompt: '「확장 검색창(Expandable search)」을 만들어 줘. 평소엔 헤더 오른쪽에 돋보기 아이콘만 두고, 누르면 350ms 동안 cubic-bezier(.2,.8,.2,1)로 왼쪽으로 넓어져 입력창이 되며 제목은 사라져. ×나 Esc로 다시 접혀. 검색창과 헷갈리지 않게 입력창을 처음부터 펼쳐 두지는 마. 버튼엔 aria-expanded를 달아 줘.',
    css: `
.d-se15 .scr{${se2SCR};height:178px}
.d-se15 .hd{position:relative;height:48px;border-bottom:1px solid var(--line)}
.d-se15 .ttl{position:absolute;left:14px;top:0;line-height:48px;font-size:15px;font-weight:800;letter-spacing:-.02em;color:var(--text);white-space:nowrap;transition:opacity .2s,transform .35s cubic-bezier(.2,.8,.2,1)}
.d-se15 .open .ttl{opacity:0;transform:translateX(-10px)}
.d-se15 .sx{position:absolute;right:8px;top:6px;width:36px;height:36px;box-sizing:border-box;display:flex;align-items:center;overflow:hidden;border-radius:18px;border:1.5px solid transparent;background:transparent;transition:width .35s cubic-bezier(.2,.8,.2,1),background .25s,border-color .25s,box-shadow .25s}
.d-se15 .open .sx{width:calc(100% - 16px);background:var(--surface-2);border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}
.d-se15 .tg{flex:none;width:33px;height:33px;border-radius:50%;border:0;padding:0;background:none;color:var(--text);display:grid;place-items:center;cursor:pointer;transition:transform .15s,background .15s,color .2s}
.d-se15 .tg svg{width:17px;height:17px}
.d-se15 .tg:hover,.d-se15 .tg.press{background:var(--surface-2)}
.d-se15 .tg.press{transform:scale(.86)}
.d-se15 .open .tg{color:var(--accent);background:none;cursor:default}
.d-se15 input{flex:1;min-width:0;border:0;background:none;outline:none;font:inherit;font-size:13.5px;color:var(--text);padding:0;opacity:0;transition:opacity .2s}
.d-se15 .open input{opacity:1;transition-delay:.15s}
.d-se15 input::placeholder{color:var(--muted)}
.d-se15 input::-webkit-search-cancel-button{display:none}
.d-se15 .cl{flex:none;width:18px;height:18px;margin:0 8px 0 4px;border-radius:50%;border:0;padding:0;background:var(--muted);color:var(--surface);display:grid;place-items:center;cursor:pointer;opacity:0;transform:scale(.4);transition:opacity .2s,transform .25s cubic-bezier(.2,.8,.2,1)}
.d-se15 .open .cl{opacity:1;transform:none;transition-delay:.18s}
.d-se15 .list{padding:6px 14px}
.d-se15 .row{display:flex;align-items:center;gap:10px;height:38px;font-size:12.5px;color:var(--text)}
.d-se15 .row+.row{border-top:1px solid var(--line)}
.d-se15 .row i{flex:none;width:26px;height:26px;border-radius:8px;background:var(--accent-soft)}
.d-se15 .row span{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-se15 .row em{flex:none;font-style:normal;font-size:11.5px;color:var(--muted)}
`,
    html: `<div class="scr"><div class="hd"><span class="ttl">주문 내역</span>
<div class="sx" role="search"><button class="tg" type="button" aria-label="검색 열기" aria-expanded="false">${se2I.search}</button><input type="search" placeholder="주문 상품 검색" aria-label="주문 상품 검색" tabindex="-1" autocomplete="off"><button class="cl" type="button" aria-label="검색 닫기" tabindex="-1">${se2I.x}</button></div></div>
<div class="list">${[['러닝 운동화 260', '배송 중'], ['캠핑 의자 2개', '도착'], ['여행용 파우치', '도착']].map(r => `<div class="row"><i></i><span>${r[0]}</span><em>${r[1]}</em></div>`).join('')}</div></div>`,
    run(el, ctx) {
      const scr = el.querySelector('.scr'), tg = el.querySelector('.tg'), inp = el.querySelector('input'), cl = el.querySelector('.cl');
      let user = false;
      const set = (on, focus) => {
        scr.classList.toggle('open', on);
        tg.setAttribute('aria-expanded', on);
        inp.tabIndex = cl.tabIndex = on ? 0 : -1;
        if (!on) { inp.value = ''; inp.blur(); }
        else if (focus) ctx.timeout(() => inp.focus({ preventScroll: true }), 200);
      };
      ctx.timeout(() => { if (!user) tg.classList.add('press'); }, 550);
      ctx.timeout(() => { tg.classList.remove('press'); if (!user) set(true); }, 750);
      se2Type(ctx, v => { if (!user) inp.value = v; }, '운동화', 1250, 200);
      ctx.on(el, 'pointerdown', () => { user = true; });
      ctx.on(tg, 'click', () => { if (!scr.classList.contains('open')) set(true, true); else inp.focus({ preventScroll: true }); });
      ctx.on(cl, 'click', () => set(false));
      ctx.on(inp, 'keydown', e => { user = true; if (e.key === 'Escape') { set(false); tg.focus({ preventScroll: true }); } });
    }
  },
  /* se16 즉시 검색 */
  {
    id: 'se16', ko: '즉시 검색', en: 'Instant search', pair: 'se02',
    desc: '자동완성과 달리 검색어 후보가 아니라 결과 목록 자체가 바로 바뀌어요.',
    prompt: '「즉시 검색(Instant search)」을 만들어 줘. Enter 없이 한 글자 칠 때마다 150ms 디바운스 후 아래 상품 결과 목록 자체가 걸러지고, 빠지는 줄은 200ms 동안 접혀. 결과 수도 함께 갱신해. 자동완성과 헷갈리지 않게 검색어 후보 드롭다운은 띄우지 마. 결과 수 영역엔 aria-live="polite"를 넣어 줘.',
    css: `
.d-se16 .scr{${se2SCR};height:180px;padding:12px 14px;display:flex;flex-direction:column}
.d-se16 .bar{flex:none;display:flex;align-items:center;gap:7px;height:34px;padding:0 10px;border-radius:11px;background:var(--surface);border:1.5px solid var(--accent);box-shadow:0 0 0 3px var(--accent-soft);color:var(--accent)}
.d-se16 input{flex:1;min-width:0;border:0;background:none;outline:none;font:inherit;font-size:13.5px;color:var(--text);padding:0}
.d-se16 input::placeholder{color:var(--muted)}
.d-se16 input::-webkit-search-cancel-button{display:none}
.d-se16 .meta{flex:none;display:flex;justify-content:space-between;align-items:center;height:18px;margin:8px 0 2px;font-size:11.5px;color:var(--muted)}
.d-se16 .meta b{color:var(--accent);font-weight:800}
.d-se16 .meta span.tick{animation:se16-tick .3s cubic-bezier(.2,.8,.2,1)}
.d-se16 .meta small{font-size:11px;display:flex;align-items:center;gap:4px}
.d-se16 .meta small i{width:6px;height:6px;border-radius:50%;background:var(--success)}
.d-se16 .meta small.tick i{animation:se16-blink .3s ease-out}
.d-se16 .list{flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;scrollbar-width:none}
.d-se16 .list::-webkit-scrollbar{display:none}
.d-se16 .row{display:flex;align-items:center;gap:9px;height:32px;overflow:hidden;font-size:12.5px;color:var(--text);transition:height .2s cubic-bezier(.2,.8,.2,1),opacity .15s,transform .2s,visibility 0s}
.d-se16 .row.hide{height:0;opacity:0;transform:translateX(-10px);visibility:hidden;transition:height .2s cubic-bezier(.2,.8,.2,1),opacity .15s,transform .2s,visibility 0s .2s}
.d-se16 .row i{flex:none;width:24px;height:24px;border-radius:7px;background:var(--accent-soft)}
.d-se16 .row span{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-se16 .row em{flex:none;font-style:normal;font-weight:700;font-size:12px}
.d-se16 .none{display:none;height:60px;place-items:center;font-size:12px;color:var(--muted)}
.d-se16 .none.show{display:grid}
@keyframes se16-tick{from{transform:translateY(-5px);opacity:0}to{transform:none;opacity:1}}
@keyframes se16-blink{from{transform:scale(2.2);opacity:.3}to{transform:none;opacity:1}}
`,
    html: `<div class="scr"><label class="bar">${se2I.search}<input type="search" placeholder="입력하면 바로 찾아요" aria-label="상품 검색" autocomplete="off"></label>
<div class="meta"><span aria-live="polite">전체 <b>6</b>개</span><small><i></i>입력 즉시 반영</small></div>
<div class="list">${[['캠핑 의자 경량', '39,000원'], ['캠핑 테이블', '52,000원'], ['캠핑 랜턴', '18,000원'], ['캠핑 의자 2인용', '64,000원'], ['여행 캐리어 20인치', '89,000원'], ['등산 스틱 2개', '27,000원']].map(r => `<div class="row" data-n="${r[0]}"><i></i><span>${r[0]}</span><em>${r[1]}</em></div>`).join('')}<div class="none">맞는 상품이 없어요</div></div></div>`,
    run(el, ctx) {
      const inp = el.querySelector('input'), rows = [...el.querySelectorAll('.row')], cnt = el.querySelector('.meta span'), dot = el.querySelector('.meta small'), none = el.querySelector('.none'), list = el.querySelector('.list');
      let user = false, last = 6;
      const filter = () => {
        const q = inp.value.trim().replace(/\s+/g, ' ');
        let n = 0;
        rows.forEach(r => { const ok = r.dataset.n.includes(q); r.classList.toggle('hide', !ok); n += ok; });
        none.classList.toggle('show', n === 0);
        list.scrollTop = 0;
        cnt.innerHTML = `${q ? '결과' : '전체'} <b>${n}</b>개`;
        dot.classList.remove('tick'); dot.offsetWidth; dot.classList.add('tick');
        if (n !== last) { cnt.classList.remove('tick'); cnt.offsetWidth; cnt.classList.add('tick'); last = n; }
      };
      se2Type(ctx, v => { if (!user) { inp.value = v; filter(); } }, '캠핑 의자', 550, 270);
      ctx.on(el, 'pointerdown', () => { user = true; });
      ctx.on(inp, 'input', () => { user = true; filter(); });
    }
  },
  /* se17 이 지역 재검색 */
  {
    id: 'se17', ko: '이 지역 재검색', en: 'Search this area',
    desc: '지도를 옮기면 버튼이 뜨고, 눌러야 그 범위로 다시 검색해요.',
    prompt: '「이 지역 재검색(Search this area)」 버튼을 만들어 줘. 지도를 드래그해 처음 검색 위치에서 벗어나면 상단 가운데에 "이 지역에서 다시 검색" 알약 버튼이 250ms 동안 위에서 내려오고, 누르면 로딩 스피너 뒤 현재 화면 범위의 핀으로 바뀌며 버튼은 사라져. 지도를 움직일 때마다 자동으로 재검색하지는 말고, 버튼은 키보드 포커스가 가능하게 해 줘.',
    css: `
.d-se17 .vp{width:calc(100% - 28px);max-width:290px;height:176px;border-radius:18px;box-shadow:var(--shadow);overflow:hidden;position:relative;background:var(--surface-2);cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none}
.d-se17 .vp.drag{cursor:grabbing}
.d-se17 .vp:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.d-se17 .map{position:absolute;left:0;top:0;width:100%;height:100%;display:block}
.d-se17 .map .g{fill:var(--surface-2)}
.d-se17 .map .rd{fill:var(--surface)}
.d-se17 .map .pk{fill:var(--success);opacity:.2}
.d-se17 .map .wt{fill:var(--accent);opacity:.16}
.d-se17 .map .bd{fill:var(--line);opacity:.7}
.d-se17 .pins{position:absolute;inset:0;pointer-events:none}
.d-se17 .pin{position:absolute;transform:translate(-50%,-100%);padding-bottom:6px;animation:se17-drop .35s cubic-bezier(.2,.8,.2,1) backwards;animation-delay:calc(var(--i)*70ms);transition:opacity .25s,transform .25s}
.d-se17 .pin b{display:block;padding:0 8px;height:22px;line-height:22px;border-radius:999px;background:var(--accent);color:var(--accent-text);font-size:11.5px;font-weight:800;white-space:nowrap;box-shadow:var(--shadow)}
.d-se17 .pin::after{content:"";position:absolute;left:50%;bottom:2px;width:8px;height:8px;margin-left:-4px;background:var(--accent);transform:rotate(45deg);border-radius:1px}
.d-se17 .pin.old{opacity:0;transform:translate(-50%,-100%) scale(.6)}
.d-se17 .pill{position:absolute;left:50%;top:10px;transform:translate(-50%,-18px);display:flex;align-items:center;gap:6px;height:30px;padding:0 12px;border-radius:999px;border:1px solid var(--line);background:var(--surface);color:var(--accent);font:inherit;font-size:12px;font-weight:700;white-space:nowrap;box-shadow:var(--shadow);cursor:pointer;opacity:0;pointer-events:none;visibility:hidden;transition:opacity .2s,transform .25s cubic-bezier(.2,.8,.2,1),visibility 0s .25s}
.d-se17 .pill.show{opacity:1;transform:translate(-50%,0);pointer-events:auto;visibility:visible;transition:opacity .2s,transform .25s cubic-bezier(.2,.8,.2,1),visibility 0s}
.d-se17 .pill.press{transform:translate(-50%,0) scale(.94)}
.d-se17 .pill svg{flex:none}
.d-se17 .pill.load svg{animation:se17-spin .6s linear infinite}
.d-se17 .tp{position:absolute;left:0;top:0;width:28px;height:28px;margin:-14px 0 0 -14px;border-radius:50%;background:var(--accent);border:2px solid var(--surface);box-sizing:border-box;opacity:0;pointer-events:none;transition:opacity .2s}
.d-se17 .tp.on{opacity:.45}
.d-se17 .tp.tap{opacity:.7}
.d-se17 .cnt{position:absolute;left:10px;bottom:10px;padding:0 9px;height:22px;line-height:22px;border-radius:999px;background:var(--surface);color:var(--text);font-size:11px;font-weight:700;box-shadow:var(--shadow);pointer-events:none}
@keyframes se17-drop{from{opacity:0;transform:translate(-50%,-100%) translateY(-14px)}to{opacity:1;transform:translate(-50%,-100%)}}
@keyframes se17-spin{to{transform:rotate(360deg)}}
`,
    html: `<div class="vp" tabindex="0" role="group" aria-label="숙소 지도, 방향키로 이동"><svg class="map" aria-hidden="true"><defs><pattern id="se17-tile" width="240" height="200" patternUnits="userSpaceOnUse">
<rect class="g" width="240" height="200"/>
<rect class="pk" x="20" y="22" width="98" height="70" rx="10"/><rect class="bd" x="20" y="104" width="44" height="84" rx="4"/><rect class="bd" x="74" y="104" width="44" height="40" rx="4"/><rect class="bd" x="74" y="154" width="44" height="34" rx="4"/>
<rect class="bd" x="152" y="22" width="76" height="34" rx="4"/><rect class="wt" x="152" y="68" width="76" height="62" rx="14"/><rect class="bd" x="152" y="142" width="34" height="46" rx="4"/><rect class="bd" x="196" y="142" width="32" height="46" rx="4"/>
<rect class="rd" width="240" height="9"/><rect class="rd" width="9" height="200"/><rect class="rd" x="130" width="9" height="200"/>
</pattern></defs><rect width="100%" height="100%" fill="url(#se17-tile)"/></svg><div class="pins"></div>
<button class="pill" type="button">${se2I.refresh}<span>이 지역에서 다시 검색</span></button>
<div class="cnt" aria-live="polite">숙소 4곳</div><i class="tp"></i></div>`,
    run(el, ctx) {
      const vp = el.querySelector('.vp'), pins = el.querySelector('.pins'), pill = el.querySelector('.pill'), label = pill.querySelector('span'), tp = el.querySelector('.tp'), cnt = el.querySelector('.cnt');
      const H = 176, PRICE = ['8만', '12만', '9만', '15만', '7만', '11만', '6만'];
      const SETS = [[[.2, .52], [.5, .8], [.8, .5], [.62, .95]], [[.16, .5], [.45, .7], [.78, .48], [.34, .95], [.68, .9]], [[.24, .6], [.55, .46], [.82, .78]]];
      const pat = el.querySelector('pattern');
      let x = -60, y = -40, user = false, round = 0, busy = false, drag = null;
      const vw = () => vp.clientWidth || 260;
      // 지도는 타일 패턴이라 끝이 없다. 핀은 지도 좌표(data-wx/wy)에 고정돼 함께 움직인다.
      const place = () => {
        pat.setAttribute('patternTransform', `translate(${Math.round(x)} ${Math.round(y)})`);
        const w = vw();
        pins.querySelectorAll('.pin').forEach(p => {
          const px = +p.dataset.wx + x, py = +p.dataset.wy + y;
          p.style.left = px + 'px'; p.style.top = py + 'px';
          p.style.display = px < -18 || px > w + 18 || py < 0 || py > H + 30 ? 'none' : '';
        });
      };
      const drop = () => {
        const set = SETS[round % SETS.length], w = vw();
        pins.innerHTML = set.map((f, i) => `<div class="pin" data-wx="${Math.round(-x + f[0] * w)}" data-wy="${Math.round(-y + f[1] * H)}" style="--i:${i}"><b>${PRICE[(i + round * 2) % PRICE.length]}</b></div>`).join('');
        cnt.textContent = `숙소 ${set.length}곳`;
        round++; place();
      };
      const offer = () => { if (busy || pill.classList.contains('show')) return; label.textContent = '이 지역에서 다시 검색'; pill.classList.add('show'); };
      const research = () => {
        if (busy) return;
        busy = true; pill.classList.add('load'); label.textContent = '검색 중';
        pins.querySelectorAll('.pin').forEach(p => p.classList.add('old'));
        ctx.timeout(() => { drop(); if (document.activeElement === pill) vp.focus({ preventScroll: true }); pill.classList.remove('show', 'load', 'press'); busy = false; }, 550);
      };
      const touch = (px, py) => { tp.style.transform = `translate(${px}px,${py}px)`; };
      place(); drop();
      // 자동 시연: 손가락이 지도를 끌고 → 알약 버튼을 누른다
      const sx = vw() * .66, sy = 122, x0 = x, y0 = y;
      touch(sx, sy);
      ctx.timeout(() => { if (!user) tp.classList.add('on'); }, 400);
      ctx.timeout(() => {
        if (user) return;
        vp.classList.add('drag');
        ctx.loop(t => {
          if (user) { vp.classList.remove('drag'); return false; }
          const p = Math.min(1, t / 650), e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
          x = x0 - 96 * e; y = y0 - 44 * e; place();
          touch(sx - 96 * e, sy - 44 * e);
          if (e > .15) offer();
          if (p >= 1) { vp.classList.remove('drag'); tp.classList.remove('on'); return false; }
        });
      }, 650);
      ctx.timeout(() => { if (user) return; tp.style.transition = 'opacity .2s,transform .3s cubic-bezier(.2,.8,.2,1)'; touch(vw() / 2, 25); tp.classList.add('on'); }, 1450);
      ctx.timeout(() => { if (user) return; tp.classList.add('tap'); pill.classList.add('press'); }, 1850);
      ctx.timeout(() => { if (user) return; research(); }, 1980);
      ctx.timeout(() => tp.classList.remove('on', 'tap'), 2150);
      // 직접 조작
      ctx.on(vp, 'pointerdown', e => {
        user = true; tp.classList.remove('on', 'tap');
        if (e.target.closest('.pill')) return;
        drag = { px: e.clientX, py: e.clientY, x, y, moved: false };
        vp.classList.add('drag');
        try { vp.setPointerCapture(e.pointerId); } catch (err) {}
      });
      ctx.on(vp, 'pointermove', e => {
        if (!drag) return;
        const dx = e.clientX - drag.px, dy = e.clientY - drag.py;
        x = drag.x + dx; y = drag.y + dy; place();
        if (Math.abs(dx) + Math.abs(dy) > 10) { drag.moved = true; offer(); }
      });
      const end = () => { drag = null; vp.classList.remove('drag'); };
      ctx.on(vp, 'pointerup', end);
      ctx.on(vp, 'pointercancel', end);
      // 키보드: 방향키로 지도를 옮기면 버튼이 뜨고, Tab으로 버튼에 갈 수 있다
      ctx.on(vp, 'keydown', e => {
        const d = { ArrowLeft: [24, 0], ArrowRight: [-24, 0], ArrowUp: [0, 24], ArrowDown: [0, -24] }[e.key];
        if (!d) return;
        e.preventDefault(); user = true; tp.classList.remove('on', 'tap'); vp.classList.remove('drag');
        x += d[0]; y += d[1]; place(); offer();
      });
      ctx.on(pill, 'click', research);
    }
  }
]);
