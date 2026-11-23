/* action — 버튼·반응 (ac01~ac16, v2 분할: 카드 1장 = 패턴 1개) */
const A_P = {
  heart: '<path d="M12 20.3s-7.6-4.5-7.6-10.1A4.3 4.3 0 0 1 12 7.5a4.3 4.3 0 0 1 7.6 2.7c0 5.6-7.6 10.1-7.6 10.1z"/>',
  bookmark: '<path d="M6.5 3.5h11v17l-5.5-4-5.5 4z"/>',
  bell: '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.8h-15z"/><path d="M10 20.8a2.1 2.1 0 0 0 4 0"/>',
  share: '<path d="M12 3.5v11"/><path d="M7.8 7.6L12 3.5l4.2 4.1"/><path d="M5.5 11.5v8h13v-8"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  star: '<path d="M12 3.6l2.6 5.3 5.8.9-4.2 4.1 1 5.8L12 16.9l-5.2 2.8 1-5.8-4.2-4.1 5.8-.9z"/>',
  down: '<path d="M12 4v11"/><path d="M7.5 10.5L12 15l4.5-4.5"/><path d="M5 19.5h14"/>',
  cart: '<path d="M3.5 4.5h2.2l2 10.5h10l1.8-7.5H7"/><circle cx="9.5" cy="19.2" r="1.3"/><circle cx="17" cy="19.2" r="1.3"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  thumb: '<path d="M7.5 10.5v9h-3v-9z"/><path d="M7.5 10.5l3.4-6.8c1.5 0 2.6 1 2.6 2.6v2.9h4.9a1.8 1.8 0 0 1 1.8 2.1l-1.2 6.4a2 2 0 0 1-2 1.6H7.5"/>',
  folder: '<path d="M3.5 7a1.5 1.5 0 0 1 1.5-1.5h4l2 2h8A1.5 1.5 0 0 1 20.5 9v8.5A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5z"/>',
  folderPlus: '<path d="M3.5 7a1.5 1.5 0 0 1 1.5-1.5h4l2 2h8A1.5 1.5 0 0 1 20.5 9v8.5A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5z"/><path d="M12 10.5v5M9.5 13h5"/>',
  photo: '<circle cx="8.5" cy="9" r="1.8"/><path d="M3.5 17.5l5-5 4 4 3-3 5 5"/>',
  file: '<path d="M6.5 3.5h7l4 4v13h-11z"/><path d="M13.5 3.5v4h4"/>',
  msg: '<path d="M4.5 6.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-6l-4 3.5v-3.5h-1a2 2 0 0 1-2-2z"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4 7l8 6 8-6"/>',
  note: '<rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4"/>',
  more: '<circle cx="6" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="18" cy="12" r="1.2"/>',
  kebab: '<circle cx="12" cy="6" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="12" cy="18" r="1.2"/>',
  lock: '<rect x="5.5" y="10.5" width="13" height="9.5" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
  pen: '<path d="M4.5 19.5l1-4L15.8 5.2a2 2 0 0 1 2.9 2.9L8.5 18.5z"/>',
  cal: '<rect x="4" y="5.5" width="16" height="14" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>'
};
const aIc = (n, s = 20, w = 2) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${A_P[n]}</svg>`;
const aThumb = (cls = '') => `<div class="ui-thumb ph ${cls}">${aIc('photo', 24, 1.8)}</div>`;
/* 단독 카드 공통: 가운데 한 장(.pn)에 패턴 하나만 크게 */
const aBase = id => `
.d-${id} .pn{position:relative;width:calc(100% - 24px);max-width:300px;height:178px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);padding:12px;display:flex;flex-direction:column;gap:8px;overflow:hidden;box-sizing:border-box}
.d-${id} .ph{display:grid;place-items:center;color:var(--accent)}
.d-${id} .ph svg{opacity:.55}
.d-${id} button{font:inherit;-webkit-tap-highlight-color:transparent}
.d-${id} .tap{position:absolute;width:32px;height:32px;margin:-16px 0 0 -16px;border-radius:50%;background:var(--accent);pointer-events:none;z-index:9;opacity:0;animation:${id}-tap .55s ease-out forwards}
@keyframes ${id}-tap{0%{opacity:.4;transform:scale(.3)}100%{opacity:0;transform:scale(1.5)}}
.d-${id} .fly{position:absolute;z-index:8;pointer-events:none;transform:translate(-50%,-50%);transition:transform .6s cubic-bezier(.5,0,.2,1),opacity .6s ease-in}
.d-${id} .toast{position:absolute;left:10px;right:10px;bottom:10px;background:var(--text);color:var(--surface);font-size:12px;font-weight:600;text-align:center;padding:8px 6px;border-radius:10px;transform:translateY(160%);transition:transform .35s cubic-bezier(.2,.8,.2,1);z-index:6}
.d-${id} .toast.on{transform:none}
.d-${id} .av{flex:none;width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,var(--accent-soft),var(--accent));display:grid;place-items:center;color:var(--accent-text);font-size:12px;font-weight:800}
.d-${id} .who{display:flex;align-items:center;gap:8px;min-width:0}
.d-${id} .who>div>b{display:block;font-size:12.5px;color:var(--text);line-height:1.2}
.d-${id} .who>div>span{display:block;font-size:11px;color:var(--muted);line-height:1.2;white-space:nowrap}
.d-${id}{container-type:inline-size}
@container (max-width:300px){.d-${id} .pn{width:calc(100% - 16px);padding:10px}}
`;
function aTap(ctx, el, t) {
  const r = el.getBoundingClientRect(), q = t.getBoundingClientRect();
  const d = document.createElement('i'); d.className = 'tap';
  d.style.left = (q.left + q.width / 2 - r.left) + 'px'; d.style.top = (q.top + q.height / 2 - r.top) + 'px';
  el.appendChild(d); ctx.timeout(() => d.remove(), 600);
}
function aFly(ctx, host, from, to, inner) {
  const h = host.getBoundingClientRect(), a = from.getBoundingClientRect(), b = to.getBoundingClientRect();
  const f = document.createElement('div'); f.className = 'fly'; f.innerHTML = inner;
  const x = a.left + a.width / 2 - h.left, y = a.top + a.height / 2 - h.top;
  f.style.left = x + 'px'; f.style.top = y + 'px'; host.appendChild(f);
  const dx = b.left + b.width / 2 - h.left - x, dy = b.top + b.height / 2 - h.top - y;
  ctx.raf(() => ctx.raf(() => { f.style.transform = `translate(-50%,-50%) translate(${dx}px,${dy}px) scale(.3)`; f.style.opacity = '.3'; }));
  ctx.timeout(() => f.remove(), 620);
}
function aBump(n, cls = 'bump') { n.classList.remove(cls); void n.offsetWidth; n.classList.add(cls); }
const aAuto = (ctx, el, t, fn, ms) => ctx.timeout(() => { aTap(ctx, el, t); fn(); }, ms);

UIDEX.add('action', [
  /* ───────── ac01 좋아요 ───────── */
  {
    id: 'ac01', ko: '좋아요', en: 'Like', pair: 'ac02',
    desc: '찜과 달리 누른 사람 수를 공개해 공감을 표시해요.',
    prompt: '「좋아요(Like)」 버튼을 피드 글 아래에 만들어 줘. 누르면 하트가 빨갛게 채워지며 0.45초 동안 scale 1→1.3→1로 튀고 둘레에 퍼지는 링이 생기며, 옆 숫자가 128→129로 위로 밀려 바뀌어. 찜과 헷갈리지 않게 개인 목록 저장이나 토스트는 넣지 마. aria-pressed로 켜짐 상태를 알려 줘.',
    css: aBase('ac01') + `
.d-ac01 .pic{flex:1;min-height:0;position:relative;cursor:pointer}
.d-ac01 .big{position:absolute;left:50%;top:50%;width:46px;height:46px;margin:-23px 0 0 -23px;color:#fff;opacity:0;pointer-events:none}
.d-ac01 .big svg{width:46px;height:46px;fill:currentColor;opacity:1;filter:drop-shadow(0 2px 6px rgba(0,0,0,.25))}
.d-ac01 .big.go{animation:ac01-big .8s cubic-bezier(.2,.8,.2,1)}
.d-ac01 .row{display:flex;align-items:center;gap:8px;height:30px;flex:none}
.d-ac01 .lk{position:relative;width:34px;height:34px;margin-left:-4px;border:0;background:none;color:var(--muted);display:grid;place-items:center;cursor:pointer;padding:0}
.d-ac01 .lk svg{width:26px;height:26px;transition:color .2s}
.d-ac01 .lk.on{color:var(--danger)}
.d-ac01 .lk.on svg{fill:currentColor;animation:ac01-pop .45s cubic-bezier(.2,.8,.2,1)}
.d-ac01 .ring{position:absolute;left:4px;top:4px;width:26px;height:26px;border-radius:50%;border:2px solid var(--danger);opacity:0;pointer-events:none}
.d-ac01 .lk.on .ring{animation:ac01-ring .5s ease-out}
.d-ac01 .cnt{font-size:12.5px;color:var(--muted);display:flex;align-items:center;gap:3px;white-space:nowrap}
.d-ac01 .nw{display:inline-block;height:18px;overflow:hidden;vertical-align:middle}
.d-ac01 .n{display:block;font-size:14px;font-weight:800;color:var(--text);line-height:18px;font-variant-numeric:tabular-nums}
.d-ac01 .n.bump{animation:ac01-up .35s cubic-bezier(.2,.8,.2,1)}
@keyframes ac01-pop{0%{transform:scale(1)}40%{transform:scale(1.3)}100%{transform:scale(1)}}
@keyframes ac01-ring{0%{opacity:.7;transform:scale(.6)}100%{opacity:0;transform:scale(1.9)}}
@keyframes ac01-up{0%{transform:translateY(100%)}100%{transform:none}}
@keyframes ac01-big{0%{opacity:0;transform:scale(.4)}30%{opacity:.95;transform:scale(1.15)}60%{opacity:.95;transform:scale(1)}100%{opacity:0;transform:scale(1)}}
`,
    html: `<div class="pn">
  <div class="who"><span class="av">숲</span><div><b>숲속캠핑</b><span>제주 · 2시간 전</span></div></div>
  <div class="ui-thumb ph pic">${aIc('photo', 26, 1.8)}<span class="big">${aIc('heart')}</span></div>
  <div class="row"><button class="lk" type="button" aria-pressed="false" aria-label="좋아요">${aIc('heart')}<span class="ring"></span></button>
    <span class="cnt"><span class="nw"><b class="n">128</b></span>명이 좋아해요</span></div>
</div>`,
    run(el, ctx) {
      const lk = el.querySelector('.lk'), n = el.querySelector('.n'), big = el.querySelector('.big');
      const set = on => { lk.classList.toggle('on', on); lk.setAttribute('aria-pressed', on); n.textContent = on ? 129 : 128; aBump(n); if (on) aBump(big, 'go'); };
      ctx.on(lk, 'click', () => set(!lk.classList.contains('on')));
      ctx.on(el.querySelector('.pic'), 'dblclick', () => { if (!lk.classList.contains('on')) set(true); else aBump(big, 'go'); });
      aAuto(ctx, el, lk, () => set(true), 500);
    }
  },

  /* ───────── ac02 찜 ───────── */
  {
    id: 'ac02', ko: '찜', en: 'Wishlist', pair: 'ac01',
    desc: '좋아요와 달리 누른 사람 수를 공개하지 않고 나만 보는 목록에 모아요.',
    prompt: '「찜(Wishlist)」 버튼을 상품 사진 오른쪽 위에 만들어 줘. 누르면 하트가 채워지며 상단 찜 목록 아이콘으로 0.6초 날아가 배지 숫자가 +1 되고, "찜 목록에 담았어요" 토스트가 2초 떠. 좋아요와 헷갈리지 않게 누른 사람 수는 공개하지 마. aria-pressed와 aria-label="찜하기"를 넣어 줘.',
    css: aBase('ac02') + `
.d-ac02 .top{display:flex;align-items:center;justify-content:space-between;flex:none;height:24px}
.d-ac02 .top b{font-size:13px;color:var(--text)}
.d-ac02 .ico{position:relative;width:26px;height:24px;display:grid;place-items:center;color:var(--text)}
.d-ac02 .ico svg{width:20px;height:20px}
.d-ac02 .bd{position:absolute;right:-5px;top:-5px;min-width:16px;height:16px;padding:0 4px;border-radius:8px;background:var(--danger);color:#fff;font-size:10px;font-weight:800;display:grid;place-items:center}
.d-ac02 .bd.bump{animation:ac02-pop .4s cubic-bezier(.2,.8,.2,1)}
.d-ac02 .prod{flex:1;min-height:0;display:flex;gap:10px}
.d-ac02 .pic{position:relative;width:48%;flex:none;border-radius:12px}
.d-ac02 .wl{position:absolute;right:6px;top:6px;width:32px;height:32px;border-radius:50%;border:0;background:var(--surface);color:var(--muted);display:grid;place-items:center;cursor:pointer;box-shadow:var(--shadow);padding:0}
.d-ac02 .wl svg{width:18px;height:18px;opacity:1}
.d-ac02 .wl.on{color:var(--danger)}
.d-ac02 .wl.on svg{fill:currentColor;animation:ac02-pop .45s cubic-bezier(.2,.8,.2,1)}
.d-ac02 .info{display:flex;flex-direction:column;gap:4px;justify-content:center;min-width:0}
.d-ac02 .nm{font-size:13px;font-weight:600;color:var(--text);line-height:1.25}
.d-ac02 .pr{font-size:15px;font-weight:800;color:var(--text)}
.d-ac02 .me{display:inline-flex;align-items:center;gap:3px;font-size:11px;color:var(--muted)}
.d-ac02 .me svg{width:12px;height:12px}
.d-ac02 .fly svg{color:var(--danger);fill:var(--danger);width:22px;height:22px;display:block}
@keyframes ac02-pop{0%{transform:scale(1)}45%{transform:scale(1.4)}100%{transform:scale(1)}}
`,
    html: `<div class="pn">
  <div class="top"><b>캠핑 용품</b><span class="ico" aria-label="찜 목록">${aIc('heart')}<b class="bd" aria-live="polite">2</b></span></div>
  <div class="prod"><div class="ui-thumb ph pic">${aIc('photo', 26, 1.8)}<button class="wl" type="button" aria-pressed="false" aria-label="찜하기">${aIc('heart')}</button></div>
    <div class="info"><div class="nm">접이식 캠핑 의자</div><div class="pr">39,000원</div><div class="me">${aIc('lock', 12)}나만 보는 목록</div></div></div>
  <div class="toast" role="status">찜 목록에 담았어요</div>
</div>`,
    run(el, ctx) {
      const pn = el.querySelector('.pn'), wl = el.querySelector('.wl'), ico = el.querySelector('.ico'), bd = el.querySelector('.bd'), toast = el.querySelector('.toast');
      let tt;
      const wish = () => {
        const on = wl.classList.toggle('on'); wl.setAttribute('aria-pressed', on);
        if (on) { aFly(ctx, pn, wl, ico, aIc('heart')); ctx.timeout(() => { bd.textContent = 3; aBump(bd); }, 560); }
        else { bd.textContent = 2; aBump(bd); }
        toast.textContent = on ? '찜 목록에 담았어요' : '찜을 해제했어요'; toast.classList.add('on');
        clearTimeout(tt); tt = ctx.timeout(() => toast.classList.remove('on'), 2000);
      };
      ctx.on(wl, 'click', wish);
      aAuto(ctx, el, wl, wish, 500);
    }
  },

  /* ───────── ac03 장바구니 담기 ───────── */
  {
    id: 'ac03', ko: '장바구니 담기', en: 'Add to cart', pair: 'ac02',
    desc: '찜과 달리 수량을 정해 결제 바로 전 단계에 담아요.',
    prompt: '「장바구니 담기(Add to cart)」 버튼을 만들어 줘. 수량 스테퍼(−/+)로 개수를 고른 뒤 누르면 상품 썸네일이 작아지며 상단 카트 아이콘으로 0.6초 날아가고, 배지가 0→2로 튀며 버튼이 "담았어요"로 1.8초 바뀌어. 찜과 헷갈리지 않게 하트 아이콘은 쓰지 마. 배지 숫자 변화는 aria-live로 읽어 줘.',
    css: aBase('ac03') + `
.d-ac03 .top{display:flex;align-items:center;justify-content:space-between;flex:none;height:24px}
.d-ac03 .top b{font-size:13px;color:var(--text)}
.d-ac03 .ico{position:relative;width:26px;height:24px;display:grid;place-items:center;color:var(--text)}
.d-ac03 .ico svg{width:21px;height:21px}
.d-ac03 .bd{position:absolute;right:-5px;top:-5px;min-width:16px;height:16px;padding:0 4px;border-radius:8px;background:var(--danger);color:#fff;font-size:10px;font-weight:800;display:grid;place-items:center;transform:scale(0);transition:transform .3s cubic-bezier(.2,.8,.2,1)}
.d-ac03 .bd.on{transform:scale(1)}
.d-ac03 .bd.bump{animation:ac03-pop .4s cubic-bezier(.2,.8,.2,1)}
.d-ac03 .prod{flex:1;min-height:0;display:flex;align-items:center;gap:10px}
.d-ac03 .src{width:62px;height:62px;flex:none}
.d-ac03 .info{flex:1;min-width:0;display:flex;flex-direction:column;gap:6px}
.d-ac03 .nm{font-size:12.5px;font-weight:600;color:var(--text);line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-ac03 .pr{font-size:14px;font-weight:800;color:var(--text)}
.d-ac03 .qty{display:inline-flex;align-items:center;border:1px solid var(--line);border-radius:8px;height:26px;width:max-content}
.d-ac03 .qty button{width:26px;height:24px;border:0;background:none;color:var(--text);display:grid;place-items:center;cursor:pointer;padding:0}
.d-ac03 .qty button svg{width:13px;height:13px}
.d-ac03 .qty output{min-width:22px;text-align:center;font-size:12.5px;font-weight:700;color:var(--text);font-variant-numeric:tabular-nums}
.d-ac03 .go{flex:none;height:38px;border-radius:11px;border:0;background:var(--accent);color:var(--accent-text);font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;gap:6px;cursor:pointer;transition:background .25s}
.d-ac03 .go svg{width:17px;height:17px}
.d-ac03 .go.done{background:var(--success);color:#fff}
.d-ac03 .fly .ui-thumb{width:56px;height:56px;border-radius:10px;background:var(--accent-soft);border:2px solid var(--accent)}
@keyframes ac03-pop{0%{transform:scale(1)}45%{transform:scale(1.45)}100%{transform:scale(1)}}
`,
    html: `<div class="pn">
  <div class="top"><b>상품 상세</b><span class="ico" aria-label="장바구니">${aIc('cart')}<b class="bd" aria-live="polite">0</b></span></div>
  <div class="prod">${aThumb('src')}<div class="info"><div class="nm">여행용 파우치 3종</div><div class="pr">12,900원</div>
    <div class="qty"><button class="mi" type="button" aria-label="수량 빼기">${aIc('minus', 13, 2.4)}</button><output aria-live="polite">1</output><button class="pl" type="button" aria-label="수량 더하기">${aIc('plus', 13, 2.4)}</button></div></div></div>
  <button class="go" type="button">${aIc('cart', 17)}<span>장바구니 담기</span></button>
</div>`,
    run(el, ctx) {
      const pn = el.querySelector('.pn'), go = el.querySelector('.go'), bd = el.querySelector('.bd'), out = el.querySelector('output');
      let q = 1, total = 0, rt;
      ctx.on(el.querySelector('.pl'), 'click', () => { q = Math.min(9, q + 1); out.textContent = q; });
      ctx.on(el.querySelector('.mi'), 'click', () => { q = Math.max(1, q - 1); out.textContent = q; });
      const add = () => {
        aFly(ctx, pn, el.querySelector('.src'), el.querySelector('.ico'), '<div class="ui-thumb"></div>');
        ctx.timeout(() => { total += q; bd.textContent = total; bd.classList.add('on'); aBump(bd); }, 560);
        go.classList.add('done'); go.innerHTML = aIc('check', 17, 2.6) + '<span>담았어요</span>';
        clearTimeout(rt); rt = ctx.timeout(() => { go.classList.remove('done'); go.innerHTML = aIc('cart', 17) + '<span>장바구니 담기</span>'; }, 1800);
      };
      ctx.on(go, 'click', add);
      aAuto(ctx, el, el.querySelector('.pl'), () => { q = 2; out.textContent = q; }, 350);
      aAuto(ctx, el, go, add, 850);
    }
  },

  /* ───────── ac04 북마크 ───────── */
  {
    id: 'ac04', ko: '북마크', en: 'Bookmark', pair: 'ac01',
    desc: '좋아요와 달리 글 하나에 표시만 해 두고 나중에 다시 읽어요.',
    prompt: '「북마크(Bookmark)」 버튼을 글 카드 오른쪽 위에 만들어 줘. 누르면 리본 아이콘이 파랗게 채워지며 위에서 8px 떨어지듯 0.35초 ease-out으로 내려앉고, 아래에 "북마크됨 · 나만 보기" 문구가 페이드인 돼. 좋아요와 헷갈리지 않게 하트나 누른 사람 수는 쓰지 말고, 저장처럼 폴더로 날아가지도 마. 키보드 Enter·Space로 켜고 끌 수 있게 해 줘.',
    css: aBase('ac04') + `
.d-ac04 .art{flex:1;min-height:0;display:flex;flex-direction:column;gap:7px;position:relative}
.d-ac04 .pic{height:70px;flex:none;border-radius:12px}
.d-ac04 .t{font-size:13.5px;font-weight:700;color:var(--text);line-height:1.25;padding-right:36px}
.d-ac04 .ui-line{height:6px;width:78%}
.d-ac04 .bm{position:absolute;right:8px;top:-12px;width:34px;height:44px;border:0;border-radius:0 0 8px 8px;background:var(--surface);color:var(--muted);display:grid;place-items:end center;padding:0 0 6px;cursor:pointer;box-shadow:var(--shadow)}
.d-ac04 .bm svg{width:22px;height:22px}
.d-ac04 .bm.on{color:var(--accent)}
.d-ac04 .bm.on svg{fill:currentColor;animation:ac04-drop .35s ease-out}
.d-ac04 .st{display:flex;align-items:center;gap:4px;font-size:12px;font-weight:600;color:var(--accent);height:16px;flex:none;opacity:0;transform:translateY(4px);transition:all .3s cubic-bezier(.2,.8,.2,1)}
.d-ac04 .st svg{width:13px;height:13px}
.d-ac04 .st.on{opacity:1;transform:none}
@keyframes ac04-drop{0%{transform:translateY(-8px)}70%{transform:translateY(1px)}100%{transform:none}}
`,
    html: `<div class="pn">
  <div class="art">${aThumb('pic')}<div class="t">제주 현지인 맛집 12곳</div><div class="ui-line"></div>
    <button class="bm" type="button" aria-pressed="false" aria-label="북마크">${aIc('bookmark')}</button></div>
  <div class="st" aria-live="polite">${aIc('lock', 13)}북마크됨 · 나만 보기</div>
</div>`,
    run(el, ctx) {
      const bm = el.querySelector('.bm'), st = el.querySelector('.st');
      const t = () => { const on = bm.classList.toggle('on'); bm.setAttribute('aria-pressed', on); st.classList.toggle('on', on); };
      ctx.on(bm, 'click', t);
      aAuto(ctx, el, bm, t, 600);
    }
  },

  /* ───────── ac05 팔로우 ───────── */
  {
    id: 'ac05', ko: '팔로우', en: 'Follow', pair: 'ac06',
    desc: '알림 설정과 달리 내 피드에 글이 보이게 관계를 맺어요.',
    prompt: '「팔로우(Follow)」 버튼을 프로필 아래에 만들어 줘. 파란 채움 "팔로우" 버튼을 누르면 0.25초 만에 회색 테두리 "팔로잉 ✓"으로 바뀌고, 팔로워 수가 1,204→1,205로 바뀌며 "이제 피드에 새 글이 보여요"가 떠. 알림 설정과 헷갈리지 않게 벨 아이콘이나 푸시 허용은 넣지 마. aria-pressed로 상태를 알려 줘.',
    css: aBase('ac05') + `
.d-ac05 .pn{align-items:center;justify-content:center;gap:4px}
.d-ac05 .pn>*{flex:none}
.d-ac05 .av{width:38px;height:38px;font-size:15px}
.d-ac05 .nm{font-size:13.5px;font-weight:700;color:var(--text);line-height:1.2}
.d-ac05 .stats{display:flex;gap:14px;font-size:11px;color:var(--muted)}
.d-ac05 .stats b{display:block;text-align:center;font-size:13px;color:var(--text);font-variant-numeric:tabular-nums}
.d-ac05 .stats b.bump{animation:ac05-up .35s cubic-bezier(.2,.8,.2,1)}
.d-ac05 .fb{width:100%;max-width:200px;height:34px;border-radius:999px;border:1px solid var(--accent);background:var(--accent);color:var(--accent-text);font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px;transition:all .25s cubic-bezier(.2,.8,.2,1)}
.d-ac05 .fb svg{width:14px;height:14px;display:none}
.d-ac05 .fb.on{background:var(--surface);color:var(--text);border-color:var(--line)}
.d-ac05 .fb.on svg{display:block}
.d-ac05 .hint{font-size:11px;color:var(--accent);height:14px;opacity:0;transition:opacity .3s}
.d-ac05 .hint.on{opacity:1}
@keyframes ac05-up{0%{transform:translateY(6px);opacity:0}100%{transform:none;opacity:1}}
`,
    html: `<div class="pn">
  <span class="av">숲</span><div class="nm">숲속캠핑</div>
  <div class="stats"><span><b>86</b>게시물</span><span><b class="fc">1,204</b>팔로워</span><span><b>51</b>팔로잉</span></div>
  <button class="fb" type="button" aria-pressed="false">${aIc('check', 14, 2.6)}<span>팔로우</span></button>
  <div class="hint" aria-live="polite">이제 피드에 새 글이 보여요</div>
</div>`,
    run(el, ctx) {
      const fb = el.querySelector('.fb'), fc = el.querySelector('.fc'), hint = el.querySelector('.hint');
      const fol = () => { const on = fb.classList.toggle('on'); fb.setAttribute('aria-pressed', on); fb.querySelector('span').textContent = on ? '팔로잉' : '팔로우'; fc.textContent = on ? '1,205' : '1,204'; aBump(fc); hint.classList.toggle('on', on); };
      ctx.on(fb, 'click', fol);
      aAuto(ctx, el, fb, fol, 600);
    }
  },

  /* ───────── ac06 알림 설정 ───────── */
  {
    id: 'ac06', ko: '알림 설정', en: 'Notification bell', pair: 'ac05',
    desc: '팔로우와 달리 새 글이 올라올 때마다 푸시로 알려줘요.',
    prompt: '「알림 설정(Notification bell)」 벨 버튼을 만들어 줘. 누르면 벨의 사선이 사라지고 0.6초 동안 좌우로 흔들리며 "새 글 알림 켜짐"으로 바뀌고, 잠시 뒤 위에서 새 글 푸시 미리보기가 0.35초 슬라이드로 내려와. 팔로우와 헷갈리지 않게 팔로워 수나 팔로우 버튼은 바꾸지 마. 상태 문구는 aria-live="polite"로 읽어 줘.',
    css: aBase('ac06') + `
.d-ac06 .pn{justify-content:center;gap:12px}
.d-ac06 .head{display:flex;align-items:center;justify-content:space-between;gap:8px}
.d-ac06 .fw{flex:none;font-size:11px;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:4px 9px}
.d-ac06 .opt{display:flex;align-items:center;justify-content:space-between;gap:10px;background:var(--surface-2);border-radius:12px;padding:10px 12px}
.d-ac06 .opt b{display:block;font-size:13px;color:var(--text)}
.d-ac06 .opt span{display:block;font-size:11px;color:var(--muted);margin-top:2px;transition:color .2s}
.d-ac06 .opt span.on{color:var(--accent);font-weight:600}
.d-ac06 .bl{flex:none;width:44px;height:44px;border-radius:50%;border:1px solid var(--line);background:var(--surface);color:var(--muted);cursor:pointer;display:grid;place-items:center;transition:all .25s;padding:0}
.d-ac06 .bl svg{width:22px;height:22px;overflow:visible}
.d-ac06 .bl .sl{transition:opacity .2s}
.d-ac06 .bl.on{background:var(--accent);border-color:var(--accent);color:var(--accent-text)}
.d-ac06 .bl.on .sl{opacity:0}
.d-ac06 .bl.on svg{animation:ac06-ring .6s ease-out;transform-origin:50% 15%}
.d-ac06 .push{position:absolute;left:10px;right:10px;top:8px;display:flex;align-items:center;gap:8px;background:var(--surface);border:1px solid var(--line);box-shadow:0 6px 18px rgba(0,0,0,.16);border-radius:12px;padding:7px 9px;transform:translateY(-170%);transition:transform .35s cubic-bezier(.2,.8,.2,1);z-index:5}
.d-ac06 .push.on{transform:none}
.d-ac06 .push i{flex:none;width:24px;height:24px;border-radius:7px;background:var(--accent);color:var(--accent-text);display:grid;place-items:center}
.d-ac06 .push i svg{width:14px;height:14px}
.d-ac06 .push p{margin:0;font-size:11px;color:var(--muted);line-height:1.3;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-ac06 .push p b{color:var(--text)}
@keyframes ac06-ring{0%{transform:rotate(0)}20%{transform:rotate(16deg)}40%{transform:rotate(-14deg)}60%{transform:rotate(9deg)}80%{transform:rotate(-5deg)}100%{transform:rotate(0)}}
`,
    html: `<div class="pn">
  <div class="push" aria-hidden="true"><i>${aIc('bell', 14)}</i><p><b>숲속캠핑</b> 새 글 · 가을 캠핑장 5곳</p></div>
  <div class="head"><div class="who"><span class="av">숲</span><div><b>숲속캠핑</b><span>팔로워 1,204</span></div></div><span class="fw">팔로잉</span></div>
  <div class="opt"><div><b>새 글 알림</b><span class="stt" aria-live="polite">알림 꺼짐</span></div>
    <button class="bl" type="button" aria-pressed="false" aria-label="새 글 알림"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${A_P.bell}<path class="sl" d="M4 3.5l16 17"/></svg></button></div>
</div>`,
    run(el, ctx) {
      const bl = el.querySelector('.bl'), stt = el.querySelector('.stt'), push = el.querySelector('.push');
      let pt;
      const ntf = () => {
        const on = bl.classList.toggle('on'); bl.setAttribute('aria-pressed', on);
        stt.textContent = on ? '새 글 알림 켜짐' : '알림 꺼짐'; stt.classList.toggle('on', on);
        clearTimeout(pt); push.classList.remove('on');
        if (on) { pt = ctx.timeout(() => { push.classList.add('on'); pt = ctx.timeout(() => push.classList.remove('on'), 2200); }, 700); }
      };
      ctx.on(bl, 'click', ntf);
      aAuto(ctx, el, bl, ntf, 500);
    }
  },

  /* ───────── ac07 공유 ───────── */
  {
    id: 'ac07', ko: '공유', en: 'Share', pair: 'ac08',
    desc: '링크 복사와 달리 보낼 앱을 고르는 시트가 올라와요.',
    prompt: '「공유(Share)」 버튼을 만들어 줘. 누르면 아래에서 메시지·메일·메모·더보기 앱 시트가 0.3초 cubic-bezier(.2,.8,.2,1)로 올라오고 아이콘이 50ms 간격으로 떠오르며, 바깥을 누르면 닫혀. 링크 복사와 헷갈리지 않게 바로 클립보드에 복사하고 끝내지 마. 모바일은 navigator.share를 먼저 쓰고 시트엔 role="dialog"를 줘.',
    css: aBase('ac07') + `
.d-ac07 .pic{flex:1;min-height:0;border-radius:12px}
.d-ac07 .row{display:flex;align-items:center;justify-content:space-between;gap:8px;flex:none}
.d-ac07 .t{font-size:13.5px;font-weight:700;color:var(--text);line-height:1.25;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-ac07 .sh{flex:none;height:34px;padding:0 13px;border-radius:10px;border:1px solid var(--line);background:var(--surface);color:var(--text);font-size:12.5px;font-weight:700;display:inline-flex;align-items:center;gap:5px;cursor:pointer}
.d-ac07 .sh svg{width:16px;height:16px}
.d-ac07 .dim{position:absolute;inset:0;background:rgba(10,14,22,.35);opacity:0;pointer-events:none;transition:opacity .3s;z-index:5}
.d-ac07 .dim.on{opacity:1;pointer-events:auto}
.d-ac07 .sheet{position:absolute;left:0;right:0;bottom:0;background:var(--surface);border-radius:16px 16px 0 0;padding:7px 8px 12px;transform:translateY(105%);transition:transform .3s cubic-bezier(.2,.8,.2,1);z-index:6}
.d-ac07 .sheet.on{transform:none}
.d-ac07 .grab{width:30px;height:4px;border-radius:2px;background:var(--line);margin:0 auto 6px}
.d-ac07 .sheet h4{margin:0 0 8px;font-size:12px;color:var(--text);text-align:center}
.d-ac07 .apps{display:flex;justify-content:space-around}
.d-ac07 .app{border:0;background:none;padding:0;display:flex;flex-direction:column;align-items:center;gap:4px;font-size:11px;color:var(--text);cursor:pointer;opacity:0;transform:translateY(8px);transition:all .3s cubic-bezier(.2,.8,.2,1)}
.d-ac07 .sheet.on .app{opacity:1;transform:none}
.d-ac07 .sheet.on .app:nth-child(2){transition-delay:.05s} .d-ac07 .sheet.on .app:nth-child(3){transition-delay:.1s} .d-ac07 .sheet.on .app:nth-child(4){transition-delay:.15s}
.d-ac07 .app i{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:var(--accent-soft);color:var(--accent)}
.d-ac07 .app i svg{width:18px;height:18px}
@container (max-width:300px){.d-ac07 .app i{width:32px;height:32px}}
`,
    html: `<div class="pn">
  ${aThumb('pic')}
  <div class="row"><div class="t">제주 3박 4일 코스</div><button class="sh" type="button" aria-haspopup="dialog">${aIc('share')}공유</button></div>
  <div class="dim"></div>
  <div class="sheet" role="dialog" aria-label="공유하기"><div class="grab"></div><h4>공유하기</h4><div class="apps">
    <button class="app" type="button"><i>${aIc('msg')}</i>메시지</button><button class="app" type="button"><i>${aIc('mail')}</i>메일</button><button class="app" type="button"><i>${aIc('note')}</i>메모</button><button class="app" type="button"><i>${aIc('more')}</i>더보기</button></div></div>
</div>`,
    run(el, ctx) {
      const sh = el.querySelector('.sh'), sheet = el.querySelector('.sheet'), dim = el.querySelector('.dim');
      const set = v => { sheet.classList.toggle('on', v); dim.classList.toggle('on', v); };
      ctx.on(sh, 'click', () => set(true)); ctx.on(dim, 'click', () => set(false));
      el.querySelectorAll('.app').forEach(a => ctx.on(a, 'click', () => set(false)));
      aAuto(ctx, el, sh, () => set(true), 500);
    }
  },

  /* ───────── ac08 링크 복사 ───────── */
  {
    id: 'ac08', ko: '링크 복사', en: 'Copy link', pair: 'ac07',
    desc: '공유와 달리 시트 없이 주소만 조용히 복사돼요.',
    prompt: '「링크 복사(Copy link)」 버튼을 주소 입력칸 옆에 만들어 줘. 누르면 주소 글자가 0.3초 하이라이트되고 아이콘이 체크로 바뀌며 "복사됨"이 2초 표시된 뒤 원래대로 돌아오고, 아래에 작은 토스트가 떠. 공유와 헷갈리지 않게 앱 선택 시트는 띄우지 마. navigator.clipboard로 복사하고 결과는 role="status"로 알려 줘.',
    css: aBase('ac08') + `
.d-ac08 .pn{justify-content:center;gap:10px}
.d-ac08 .lab{font-size:13.5px;font-weight:700;color:var(--text)}
.d-ac08 .sub{font-size:11px;color:var(--muted);margin-top:-6px}
.d-ac08 .fld{display:flex;align-items:center;gap:6px;height:42px;border:1px solid var(--line);border-radius:12px;padding:0 4px 0 10px;background:var(--surface-2)}
.d-ac08 .fld>svg{flex:none;width:15px;height:15px;color:var(--muted)}
.d-ac08 .url{flex:1;min-width:0;font-size:12px;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-ac08 .url mark{background:transparent;color:inherit;border-radius:3px;transition:background .3s}
.d-ac08 .url mark.on{background:color-mix(in srgb,var(--accent) 30%,transparent)}
.d-ac08 .cp{flex:none;height:34px;padding:0 11px;border-radius:9px;border:0;background:var(--accent);color:var(--accent-text);font-size:12px;font-weight:700;display:inline-flex;align-items:center;gap:4px;cursor:pointer;transition:background .25s;white-space:nowrap}
.d-ac08 .cp svg{width:15px;height:15px}
.d-ac08 .cp.on{background:var(--success);color:#fff}
.d-ac08 .cp.on svg{animation:ac08-pop .35s cubic-bezier(.2,.8,.2,1)}
@container (max-width:300px){.d-ac08 .cp svg{display:none}}
@keyframes ac08-pop{0%{transform:scale(.4)}100%{transform:scale(1)}}
`,
    html: `<div class="pn">
  <div class="lab">친구 초대 링크</div><div class="sub">링크로 가입하면 둘 다 3,000원 적립</div>
  <div class="fld">${aIc('link', 15)}<span class="url"><mark>trip.example/invite/hj28</mark></span>
    <button class="cp" type="button">${aIc('link', 15)}<span>복사</span></button></div>
  <div class="toast" role="status">링크를 복사했어요</div>
</div>`,
    run(el, ctx) {
      const cp = el.querySelector('.cp'), mk = el.querySelector('mark'), toast = el.querySelector('.toast');
      let tm;
      const copy = () => {
        try { navigator.clipboard && navigator.clipboard.writeText('https://trip.example/invite/hj28').catch(() => {}); } catch (e) {}
        cp.classList.add('on'); cp.innerHTML = aIc('check', 15, 2.6) + '<span>복사됨</span>'; mk.classList.add('on'); toast.classList.add('on');
        ctx.timeout(() => mk.classList.remove('on'), 500);
        clearTimeout(tm); tm = ctx.timeout(() => { cp.classList.remove('on'); cp.innerHTML = aIc('link', 15) + '<span>복사</span>'; toast.classList.remove('on'); }, 2000);
      };
      ctx.on(cp, 'click', copy);
      aAuto(ctx, el, cp, copy, 600);
    }
  },

  /* ───────── ac09 별점 ───────── */
  {
    id: 'ac09', ko: '별점', en: 'Rating', pair: 'ac10',
    desc: '리뷰와 달리 글 없이 별만 눌러 1초 만에 점수를 남겨요.',
    prompt: '「별점(Rating)」 입력을 만들어 줘. 별 5개 중 하나를 누르면 왼쪽부터 그 별까지 80ms 간격으로 노랗게 채워지며 각 별이 scale 1.25로 튀고, 위 점수가 4.0으로 바뀌고 "좋아요" 같은 한 단어 평가가 떠. 리뷰와 헷갈리지 않게 글 입력칸은 붙이지 마. role="radiogroup"으로 만들어 방향키로 바꿀 수 있게 해 줘.',
    css: aBase('ac09') + `
.d-ac09 .pn{align-items:center;justify-content:center;gap:8px}
.d-ac09 .q{font-size:12.5px;color:var(--muted)}
.d-ac09 .sc{font-size:30px;font-weight:800;color:var(--text);line-height:1;font-variant-numeric:tabular-nums}
.d-ac09 .stars{display:flex;gap:4px}
.d-ac09 .s{border:0;background:none;padding:1px;color:var(--line);cursor:pointer;display:grid}
.d-ac09 .s svg{width:32px;height:32px;fill:currentColor;stroke:currentColor}
.d-ac09 .s.on{color:var(--warn)}
.d-ac09 .s.pop svg{animation:ac09-pop .32s cubic-bezier(.2,.8,.2,1)}
.d-ac09 .s:focus-visible{outline:2px solid var(--accent);border-radius:6px}
.d-ac09 .w{font-size:12.5px;font-weight:700;color:var(--text);height:16px}
@container (max-width:300px){.d-ac09 .s svg{width:28px;height:28px} .d-ac09 .stars{gap:2px}}
@keyframes ac09-pop{0%{transform:scale(1)}50%{transform:scale(1.25)}100%{transform:scale(1)}}
`,
    html: `<div class="pn">
  <div class="q">캠핑 의자는 어떠셨나요?</div>
  <div class="sc">0.0</div>
  <div class="stars" role="radiogroup" aria-label="별점">${[1, 2, 3, 4, 5].map(i => `<button class="s" type="button" role="radio" aria-checked="false" aria-label="${i}점" data-v="${i}" tabindex="${i === 1 ? 0 : -1}">${aIc('star')}</button>`).join('')}</div>
  <div class="w" aria-live="polite">별을 눌러 주세요</div>
</div>`,
    run(el, ctx) {
      const ss = [...el.querySelectorAll('.s')], sc = el.querySelector('.sc'), w = el.querySelector('.w');
      const words = ['별을 눌러 주세요', '별로예요', '그저 그래요', '보통이에요', '좋아요', '최고예요'];
      let cur = 0;
      const set = v => {
        cur = v;
        ss.forEach((s, i) => {
          const on = i < v; s.setAttribute('aria-checked', i === v - 1); s.tabIndex = i === v - 1 ? 0 : -1;
          if (on && !s.classList.contains('on')) ctx.timeout(() => { s.classList.add('on'); aBump(s, 'pop'); }, i * 80);
          else if (!on) s.classList.remove('on');
        });
        sc.textContent = v.toFixed(1); w.textContent = words[v];
      };
      ss.forEach(s => {
        ctx.on(s, 'click', () => set(+s.dataset.v));
        ctx.on(s, 'keydown', e => {
          const d = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -1 : 0;
          if (!d) return; e.preventDefault(); const v = Math.min(5, Math.max(1, (cur || 0) + d)); set(v); ss[v - 1].focus();
        });
      });
      aAuto(ctx, el, ss[3], () => set(4), 500);
    }
  },

  /* ───────── ac10 리뷰 작성 ───────── */
  {
    id: 'ac10', ko: '리뷰 작성', en: 'Write a review', pair: 'ac09',
    desc: '별점과 달리 구체적인 경험을 글로 풀어 남겨요.',
    prompt: '「리뷰 작성(Write a review)」 입력창을 만들어 줘. 글을 쓰면 글자 수 카운터(0/500)가 실시간으로 올라가고, 10자 이상이 되면 회색이던 "등록" 버튼이 0.25초 만에 파랗게 활성화돼. 별점과 헷갈리지 않게 별 선택은 이 카드에 넣지 마. textarea엔 보이는 라벨을 연결하고 카운터는 aria-live="polite"로 읽어 줘.',
    css: aBase('ac10') + `
.d-ac10 .top{display:flex;align-items:center;justify-content:space-between;flex:none}
.d-ac10 .top label{font-size:13px;font-weight:700;color:var(--text)}
.d-ac10 .top span{font-size:11px;color:var(--muted)}
.d-ac10 textarea{flex:1;min-height:0;resize:none;width:100%;box-sizing:border-box;border:1px solid var(--line);border-radius:10px;padding:8px 9px;font:inherit;font-size:12.5px;line-height:1.45;color:var(--text);background:var(--surface);outline:none;transition:border-color .2s}
.d-ac10 textarea::placeholder{color:var(--muted)}
.d-ac10 textarea:focus,.d-ac10 textarea.f{border-color:var(--accent)}
.d-ac10 .foot{display:flex;align-items:center;gap:8px;flex:none}
.d-ac10 .add{width:34px;height:34px;flex:none;border-radius:9px;border:1px dashed var(--line);background:none;color:var(--muted);display:grid;place-items:center;cursor:pointer;padding:0}
.d-ac10 .add svg{width:16px;height:16px}
.d-ac10 .cnt{flex:1;font-size:11.5px;color:var(--muted);font-variant-numeric:tabular-nums}
.d-ac10 .sub{flex:none;height:34px;padding:0 16px;border-radius:9px;border:0;background:var(--surface-2);color:var(--muted);font-size:12.5px;font-weight:700;cursor:not-allowed;transition:all .25s}
.d-ac10 .sub.on{background:var(--accent);color:var(--accent-text);cursor:pointer}
`,
    html: `<div class="pn">
  <div class="top"><label for="ac10-ta">리뷰 쓰기</label><span>접이식 캠핑 의자</span></div>
  <textarea id="ac10-ta" maxlength="500" placeholder="어떤 점이 좋았나요? 10자 이상 써 주세요"></textarea>
  <div class="foot"><button class="add" type="button" aria-label="사진 추가">${aIc('photo', 16)}</button><span class="cnt" aria-live="polite">0/500</span><button class="sub" type="button" aria-disabled="true">등록</button></div>
</div>`,
    run(el, ctx) {
      const ta = el.querySelector('textarea'), cnt = el.querySelector('.cnt'), sub = el.querySelector('.sub');
      const upd = () => { const n = ta.value.length; cnt.textContent = n + '/500'; const ok = n >= 10; sub.classList.toggle('on', ok); sub.setAttribute('aria-disabled', !ok); };
      ctx.on(ta, 'input', upd);
      ctx.on(sub, 'click', () => { if (sub.classList.contains('on')) { sub.textContent = '등록됨'; } });
      const msg = '튼튼하고 접기 쉬워요. 캠핑에 딱 좋아요!';
      ctx.timeout(() => {
        ta.classList.add('f'); let i = 0;
        ctx.interval(() => { if (i > msg.length) return; if (document.activeElement === ta) return; ta.value = msg.slice(0, i); upd(); i++; }, 55);
      }, 400);
    }
  },

  /* ───────── ac11 리액션 ───────── */
  {
    id: 'ac11', ko: '리액션', en: 'Reaction', pair: 'ac01',
    desc: '좋아요와 달리 길게 눌러 여러 감정 중 하나를 골라요.',
    prompt: '「리액션(Reaction)」 버튼을 만들어 줘. 0.4초 길게 누르면 버튼 위로 이모지 4개 바가 50ms 간격 stagger로 scale 0→1 등장하고, 고른 이모지가 커지며 버튼에 남고 리액션 집계가 +1 돼. 좋아요와 헷갈리지 않게 탭 한 번에 하트 하나만 켜고 끝내지 마. 키보드는 Enter로 바를 열고 방향키로 고르게 해 줘.',
    css: aBase('ac11') + `
.d-ac11 .pn{gap:8px}
.d-ac11 .ui-line{height:7px;flex:none}
.d-ac11 .ui-line.s{width:62%}
.d-ac11 .sum{display:flex;align-items:center;gap:4px;font-size:12px;color:var(--muted);margin-top:auto}
.d-ac11 .sum .e{font-size:14px;letter-spacing:-3px;margin-right:3px}
.d-ac11 .sum b{color:var(--text);font-variant-numeric:tabular-nums}
.d-ac11 .sum b.bump{animation:ac11-pop .35s cubic-bezier(.2,.8,.2,1);display:inline-block}
.d-ac11 .ft{border-top:1px solid var(--line);padding-top:8px;display:flex;justify-content:flex-start;flex:none}
.d-ac11 .rb{position:relative;height:34px;padding:0 13px;border-radius:999px;border:1px solid var(--line);background:var(--surface);color:var(--muted);font-size:12.5px;font-weight:700;display:inline-flex;align-items:center;gap:5px;cursor:pointer;user-select:none;-webkit-user-select:none;transition:all .2s}
.d-ac11 .rb svg{width:17px;height:17px}
.d-ac11 .rb.on{color:var(--accent);border-color:color-mix(in srgb,var(--accent) 45%,transparent);background:var(--accent-soft)}
.d-ac11 .rb .em{font-size:16px;line-height:1;display:inline-block;animation:ac11-pop .4s cubic-bezier(.2,.8,.2,1)}
.d-ac11 .hold{position:absolute;inset:-3px;border-radius:999px;border:2px solid var(--accent);clip-path:inset(0 100% 0 0);opacity:0;pointer-events:none}
.d-ac11 .rb.holding .hold{opacity:1;clip-path:inset(0 0 0 0);transition:clip-path .4s linear}
.d-ac11 .hint{align-self:center;margin-left:auto;font-size:11px;color:var(--muted)}
.d-ac11 .bar{position:absolute;left:12px;bottom:56px;display:flex;gap:4px;padding:5px 8px;background:var(--surface);border-radius:999px;box-shadow:0 6px 18px rgba(0,0,0,.18);border:1px solid var(--line);z-index:5;pointer-events:none;opacity:0;transition:opacity .2s}
.d-ac11 .bar.on{opacity:1;pointer-events:auto}
.d-ac11 .bar button{border:0;background:none;font-size:22px;line-height:1;width:32px;height:32px;padding:0;border-radius:50%;cursor:pointer;transform:scale(0);transition:transform .3s cubic-bezier(.2,.8,.2,1)}
.d-ac11 .bar.on button{transform:scale(1)}
.d-ac11 .bar.on button:nth-child(2){transition-delay:.05s} .d-ac11 .bar.on button:nth-child(3){transition-delay:.1s} .d-ac11 .bar.on button:nth-child(4){transition-delay:.15s}
.d-ac11 .bar button.pick,.d-ac11 .bar button:focus-visible{transform:scale(1.35) translateY(-4px);outline:none}
@keyframes ac11-pop{0%{transform:scale(1)}45%{transform:scale(1.35)}100%{transform:scale(1)}}
`,
    html: `<div class="pn">
  <div class="who"><span class="av">여</span><div><b>여행메이트</b><span>단풍 명소 사진 올려요</span></div></div>
  <div class="ui-line"></div><div class="ui-line s"></div>
  <div class="sum"><span class="e">👍❤️</span><b class="tot">24</b>명이 반응</div>
  <div class="ft"><button class="rb" type="button" aria-haspopup="menu" aria-expanded="false">${aIc('thumb', 17)}<span>리액션</span><i class="hold"></i></button><span class="hint">길게 누르기</span></div>
  <div class="bar" role="menu" aria-label="리액션 고르기"><button type="button" role="menuitem" aria-label="좋아요">👍</button><button type="button" role="menuitem" aria-label="최고예요">❤️</button><button type="button" role="menuitem" aria-label="웃겨요">😂</button><button type="button" role="menuitem" aria-label="놀라워요">😮</button></div>
</div>`,
    run(el, ctx) {
      const rc = el.querySelector('.rb'), bar = el.querySelector('.bar'), ems = [...bar.querySelectorAll('button')], tot = el.querySelector('.tot');
      const labels = ['좋아요', '최고예요', '웃겨요', '놀라워요'];
      let picked = false;
      const open = () => { rc.classList.remove('holding'); bar.classList.add('on'); rc.setAttribute('aria-expanded', 'true'); };
      const close = () => { bar.classList.remove('on'); rc.setAttribute('aria-expanded', 'false'); };
      const pick = i => {
        ems[i].classList.add('pick');
        ctx.timeout(() => {
          close(); ems[i].classList.remove('pick'); rc.classList.add('on');
          rc.innerHTML = `<span class="em">${ems[i].textContent}</span><span>${labels[i]}</span><i class="hold"></i>`;
          if (!picked) { picked = true; tot.textContent = 25; aBump(tot); }
        }, 260);
      };
      let ht, opened = false;
      ctx.on(rc, 'pointerdown', () => { opened = false; rc.classList.add('holding'); ht = ctx.timeout(() => { opened = true; open(); }, 400); });
      ctx.on(rc, 'pointerup', () => { clearTimeout(ht); rc.classList.remove('holding'); });
      ctx.on(rc, 'pointerleave', () => { clearTimeout(ht); rc.classList.remove('holding'); });
      ctx.on(rc, 'click', () => { if (!opened) { if (bar.classList.contains('on')) close(); else open(); } opened = false; });
      ctx.on(rc, 'keydown', e => { if (e.key === 'ArrowRight' && bar.classList.contains('on')) { e.preventDefault(); ems[0].focus(); } });
      ems.forEach((b, i) => {
        ctx.on(b, 'click', () => pick(i));
        ctx.on(b, 'keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); ems[(i + 1) % 4].focus(); } else if (e.key === 'ArrowLeft') { e.preventDefault(); ems[(i + 3) % 4].focus(); } else if (e.key === 'Escape') { close(); rc.focus(); } });
      });
      ctx.timeout(() => { aTap(ctx, el, rc); rc.classList.add('holding'); }, 300);
      ctx.timeout(open, 700);
      ctx.timeout(() => { aTap(ctx, el, ems[1]); pick(1); }, 1400);
    }
  },

  /* ───────── ac12 저장 ───────── */
  {
    id: 'ac12', ko: '저장', en: 'Save', pair: 'ac13',
    desc: '북마크·다운로드와 달리 앱 안 보관함(폴더)에 모아 둬요.',
    prompt: '「저장(Save)」 버튼을 사진 아래에 만들어 줘. 누르면 사진 썸네일이 0.6초 만에 위쪽 보관함 폴더 아이콘으로 날아가 배지가 12→13으로 튀고, 버튼이 "보관함에 저장됨"으로 바뀌어. 북마크·다운로드와 헷갈리지 않게 진행률 표시나 기기 파일 저장은 하지 마. aria-pressed로 저장 상태를 알려 줘.',
    css: aBase('ac12') + `
.d-ac12 .top{display:flex;align-items:center;justify-content:space-between;flex:none;height:24px}
.d-ac12 .top b{font-size:13px;color:var(--text)}
.d-ac12 .fd{position:relative;display:inline-flex;align-items:center;gap:9px;font-size:11px;color:var(--muted)}
.d-ac12 .fi{position:relative;display:grid}
.d-ac12 .fd svg{width:20px;height:20px;color:var(--text)}
.d-ac12 .bd{position:absolute;right:-9px;top:-7px;min-width:16px;height:16px;border-radius:8px;background:var(--accent);color:var(--accent-text);font-size:10px;font-weight:800;display:grid;place-items:center;padding:0 4px}
.d-ac12 .bd.bump{animation:ac12-pop .4s cubic-bezier(.2,.8,.2,1)}
.d-ac12 .src{flex:1;min-height:0;border-radius:12px}
.d-ac12 .sv{flex:none;height:36px;border-radius:10px;border:1px solid var(--line);background:var(--surface);color:var(--text);font-size:12.5px;font-weight:700;display:flex;align-items:center;justify-content:center;gap:6px;cursor:pointer;transition:all .25s}
.d-ac12 .sv svg{width:17px;height:17px}
.d-ac12 .sv.on{color:var(--accent);border-color:color-mix(in srgb,var(--accent) 45%,transparent);background:var(--accent-soft)}
.d-ac12 .fly .ui-thumb{width:70px;height:50px;border-radius:9px;background:var(--accent-soft);border:2px solid var(--accent)}
@keyframes ac12-pop{0%{transform:scale(1)}45%{transform:scale(1.45)}100%{transform:scale(1)}}
`,
    html: `<div class="pn">
  <div class="top"><b>단풍 사진 모음</b><span class="fd"><span class="fi">${aIc('folder')}<b class="bd" aria-live="polite">12</b></span><span class="fl">보관함</span></span></div>
  ${aThumb('src')}
  <button class="sv" type="button" aria-pressed="false">${aIc('folderPlus', 17)}<span>보관함에 저장</span></button>
</div>`,
    run(el, ctx) {
      const pn = el.querySelector('.pn'), sv = el.querySelector('.sv'), bd = el.querySelector('.bd');
      const save = () => {
        const on = sv.classList.toggle('on'); sv.setAttribute('aria-pressed', on);
        sv.innerHTML = on ? aIc('check', 17, 2.6) + '<span>보관함에 저장됨</span>' : aIc('folderPlus', 17) + '<span>보관함에 저장</span>';
        if (on) { aFly(ctx, pn, el.querySelector('.src'), el.querySelector('.fd svg'), '<div class="ui-thumb"></div>'); ctx.timeout(() => { bd.textContent = 13; aBump(bd); }, 560); }
        else { bd.textContent = 12; aBump(bd); }
      };
      ctx.on(sv, 'click', save);
      aAuto(ctx, el, sv, save, 500);
    }
  },

  /* ───────── ac13 다운로드 ───────── */
  {
    id: 'ac13', ko: '다운로드', en: 'Download', pair: 'ac12',
    desc: '저장과 달리 내 기기에 파일로 받고 진행률이 보여요.',
    prompt: '「다운로드(Download)」 버튼을 파일 줄 오른쪽에 만들어 줘. 누르면 화살표 버튼 둘레의 원형 진행이 1.2초 동안 0→100% 채워지며 "62% · 1.5MB"처럼 진행률이 보이고, 끝나면 초록 체크와 "기기에 저장됨"으로 바뀌어. 저장과 헷갈리지 않게 앱 보관함으로 날아가는 연출은 쓰지 마. 진행 원엔 role="progressbar"와 aria-valuenow를 넣어 줘.',
    css: aBase('ac13') + `
.d-ac13 .pn{justify-content:center;gap:10px}
.d-ac13 .lab{font-size:13px;font-weight:700;color:var(--text)}
.d-ac13 .fr{display:flex;align-items:center;gap:10px;padding:10px;border:1px solid var(--line);border-radius:12px}
.d-ac13 .fi{flex:none;width:36px;height:42px;border-radius:8px;background:color-mix(in srgb,var(--danger) 14%,transparent);color:var(--danger);display:grid;place-items:center}
.d-ac13 .fi svg{width:20px;height:20px}
.d-ac13 .fn{min-width:0;flex:1;display:flex;flex-direction:column;gap:3px}
.d-ac13 .fn b{font-size:12.5px;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-ac13 .ds{font-size:11px;color:var(--muted);font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-ac13 .ds.ok{color:var(--success);font-weight:700}
.d-ac13 .dl{position:relative;flex:none;width:44px;height:44px;border-radius:50%;border:0;background:var(--accent-soft);color:var(--accent);display:grid;place-items:center;cursor:pointer;padding:0;transition:background .25s,color .25s}
.d-ac13 .dl svg.ic{width:20px;height:20px}
.d-ac13 .dl .rg{position:absolute;inset:0;width:44px;height:44px;transform:rotate(-90deg)}
.d-ac13 .dl .rg circle{fill:none;stroke:var(--accent);stroke-width:3;stroke-linecap:round;stroke-dasharray:126;stroke-dashoffset:126}
.d-ac13 .dl.done{background:var(--success);color:#fff}
.d-ac13 .dl.done .rg{opacity:0}
.d-ac13 .dl.done svg.ic{animation:ac13-pop .35s cubic-bezier(.2,.8,.2,1)}
.d-ac13 .bar{height:4px;border-radius:2px;background:var(--surface-2);overflow:hidden}
.d-ac13 .bar i{display:block;height:100%;width:0;background:var(--accent)}
@keyframes ac13-pop{0%{transform:scale(.4)}100%{transform:scale(1)}}
`,
    html: `<div class="pn">
  <div class="lab">첨부 파일</div>
  <div class="fr"><span class="fi">${aIc('file')}</span><span class="fn"><b>제주_여행일정.pdf</b><span class="ds">2.4MB · PDF</span></span>
    <button class="dl" type="button" aria-label="다운로드"><svg class="rg" viewBox="0 0 44 44" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><circle cx="22" cy="22" r="20"/></svg><span class="ic-w">${aIc('down', 20).replace('<svg', '<svg class="ic"')}</span></button></div>
  <div class="bar" aria-hidden="true"><i></i></div>
</div>`,
    run(el, ctx) {
      const dl = el.querySelector('.dl'), rg = el.querySelector('.rg'), c = rg.querySelector('circle'), ds = el.querySelector('.ds'), w = el.querySelector('.ic-w'), bar = el.querySelector('.bar i');
      let busy = false;
      const down = () => {
        if (busy) return; busy = true; dl.classList.remove('done'); ds.classList.remove('ok'); w.innerHTML = aIc('down', 20).replace('<svg', '<svg class="ic"');
        ctx.loop(t => {
          const p = Math.min(1, t / 1200), e = 1 - Math.pow(1 - p, 2), pc = Math.round(e * 100);
          c.style.strokeDashoffset = 126 * (1 - e); rg.setAttribute('aria-valuenow', pc); bar.style.width = pc + '%';
          ds.textContent = pc + '% · ' + (e * 2.4).toFixed(1) + 'MB';
          if (p >= 1) { dl.classList.add('done'); w.innerHTML = aIc('check', 20, 2.6).replace('<svg', '<svg class="ic"'); ds.textContent = '기기에 저장됨'; ds.classList.add('ok'); busy = false; ctx.timeout(() => { c.style.strokeDashoffset = 126; }, 300); return false; }
        });
      };
      ctx.on(dl, 'click', down);
      aAuto(ctx, el, dl, down, 400);
    }
  },

  /* ───────── ac14 플로팅 버튼 ───────── */
  {
    id: 'ac14', ko: '플로팅 버튼', en: 'Floating action button',
    desc: '화면 위에 떠 있는 둥근 버튼으로, 가장 중요한 동작 하나를 바로 실행해요(펼치면 스피드 다이얼).',
    prompt: '「플로팅 버튼(Floating action button, FAB)」을 스피드 다이얼 형태로 만들어 줘. 오른쪽 아래 16px 띄운 56px(데모는 축소) 원형 accent 버튼이 그림자와 함께 떠 있고, 누르면 + 아이콘이 45° 회전해 ×가 되며 배경이 어두워지고 글쓰기·사진·일정 버튼이 60ms 간격으로 아래에서 올라와. 열림 상태는 aria-expanded로, Esc로 닫히게 해 줘.',
    css: `
.d-ac14 .ui-phone{display:flex;flex-direction:column}
.d-ac14 .top{height:34px;flex:none;display:flex;align-items:center;padding:0 12px;font-size:13px;font-weight:800;color:var(--text);border-bottom:1px solid var(--line)}
.d-ac14 .row{display:flex;gap:9px;align-items:center;padding:8px 12px}
.d-ac14 .row .ui-thumb{width:34px;height:34px;flex:none;border-radius:9px}
.d-ac14 .row .ln{flex:1;display:flex;flex-direction:column;gap:6px}
.d-ac14 .row .ui-line:last-child{width:60%;height:6px}
.d-ac14 .dim{position:absolute;inset:0;background:rgba(10,14,22,.45);opacity:0;pointer-events:none;transition:opacity .3s}
.d-ac14 .ui-phone.open .dim{opacity:1;pointer-events:auto}
.d-ac14 .fab{position:absolute;right:12px;bottom:12px;width:44px;height:44px;border-radius:50%;border:0;background:var(--accent);color:var(--accent-text);display:grid;place-items:center;cursor:pointer;box-shadow:0 6px 16px color-mix(in srgb,var(--accent) 45%,transparent);z-index:3;transform:scale(0);animation:ac14-in .4s .15s cubic-bezier(.2,.8,.2,1) forwards}
.d-ac14 .fab svg{width:22px;height:22px;transition:transform .3s cubic-bezier(.2,.8,.2,1)}
.d-ac14 .ui-phone.open .fab svg{transform:rotate(45deg)}
.d-ac14 .acts{position:absolute;right:18px;bottom:62px;display:flex;flex-direction:column-reverse;gap:6px;align-items:flex-end;z-index:3;pointer-events:none}
.d-ac14 .act{display:flex;align-items:center;gap:7px;opacity:0;transform:translateY(12px) scale(.8);transition:all .28s cubic-bezier(.2,.8,.2,1);cursor:pointer}
.d-ac14 .ui-phone.open .acts{pointer-events:auto}
.d-ac14 .ui-phone.open .act{opacity:1;transform:none}
.d-ac14 .ui-phone.open .act:nth-child(2){transition-delay:.06s} .d-ac14 .ui-phone.open .act:nth-child(3){transition-delay:.12s}
.d-ac14 .act span{font-size:11px;font-weight:700;color:#fff;background:rgba(20,23,28,.85);padding:3px 8px;border-radius:7px}
.d-ac14 .act i{width:32px;height:32px;border-radius:50%;background:var(--surface);color:var(--accent);display:grid;place-items:center;box-shadow:var(--shadow)}
.d-ac14 .act i svg{width:16px;height:16px}
.d-ac14 .tap{position:absolute;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;background:#fff;pointer-events:none;z-index:9;opacity:0;animation:ac14-tap .55s ease-out forwards}
@keyframes ac14-tap{0%{opacity:.6;transform:scale(.3)}100%{opacity:0;transform:scale(1.5)}}
@keyframes ac14-in{to{transform:scale(1)}}
`,
    html: `<div class="ui-phone"><div class="top">내 여행</div>
  ${['', '', ''].map(() => `<div class="row"><div class="ui-thumb"></div><div class="ln"><div class="ui-line"></div><div class="ui-line"></div></div></div>`).join('')}
  <div class="dim"></div>
  <div class="acts"><div class="act"><span>글쓰기</span><i>${aIc('pen')}</i></div><div class="act"><span>사진</span><i>${aIc('photo')}</i></div><div class="act"><span>일정</span><i>${aIc('cal')}</i></div></div>
  <button class="fab" type="button" aria-expanded="false" aria-label="만들기 메뉴">${aIc('plus', 22, 2.4)}</button>
</div>`,
    run(el, ctx) {
      const ph = el.querySelector('.ui-phone'), fab = el.querySelector('.fab');
      const set = v => { ph.classList.toggle('open', v); fab.setAttribute('aria-expanded', v); };
      ctx.on(fab, 'click', () => set(!ph.classList.contains('open')));
      ctx.on(el.querySelector('.dim'), 'click', () => set(false));
      el.querySelectorAll('.act').forEach(a => ctx.on(a, 'click', () => set(false)));
      ctx.on(fab, 'keydown', e => { if (e.key === 'Escape') set(false); });
      aAuto(ctx, el, fab, () => set(true), 800);
    }
  },

  /* ───────── ac15 미트볼 메뉴 ───────── */
  {
    id: 'ac15', ko: '미트볼 메뉴', en: 'Meatballs menu', pair: 'ac16',
    desc: '케밥과 달리 가로 점 세 개(⋯)로 카드·툴바 끝에 둬요.',
    prompt: '「미트볼 메뉴(Meatballs menu, ⋯)」를 게시글 카드 오른쪽 위에 만들어 줘. 가로 점 세 개 버튼을 누르면 수정·공유·삭제 메뉴가 버튼 오른쪽 위 모서리 기준으로 0.2초 scale .9→1·fade-in 되고, 삭제는 빨간 글자야. 케밥과 헷갈리지 않게 점은 세로(⋮)로 세우지 마. aria-haspopup="menu"와 aria-expanded를 넣어 줘.',
    css: aBase('ac15') + `
.d-ac15 .head{display:flex;align-items:center;justify-content:space-between;flex:none}
.d-ac15 .dots{flex:none;border:0;background:none;color:var(--text);width:34px;height:30px;border-radius:9px;display:grid;place-items:center;cursor:pointer;transition:background .2s;padding:0}
.d-ac15 .dots svg{width:24px;height:24px}
.d-ac15 .dots[aria-expanded="true"]{background:var(--surface-2)}
.d-ac15 .pic{flex:1;min-height:0;border-radius:12px}
.d-ac15 .t{font-size:12.5px;font-weight:700;color:var(--text);flex:none}
.d-ac15 .menu{position:absolute;right:12px;top:46px;z-index:6;min-width:108px;background:var(--surface);border:1px solid var(--line);border-radius:12px;box-shadow:0 8px 22px rgba(0,0,0,.18);padding:4px;opacity:0;transform:scale(.9);transform-origin:top right;pointer-events:none;transition:all .2s cubic-bezier(.2,.8,.2,1)}
.d-ac15 .menu.on{opacity:1;transform:none;pointer-events:auto}
.d-ac15 .menu div{font-size:12.5px;color:var(--text);padding:7px 10px;border-radius:7px;cursor:pointer}
.d-ac15 .menu div:hover{background:var(--surface-2)}
.d-ac15 .menu .del{color:var(--danger)}
`,
    html: `<div class="pn">
  <div class="head"><div class="who"><span class="av">캠</span><div><b>캠핑 준비물</b><span>체크리스트 · 12개</span></div></div>
    <button class="dots" type="button" aria-haspopup="menu" aria-expanded="false" aria-label="더보기">${aIc('more', 24, 2.8)}</button></div>
  ${aThumb('pic')}
  <div class="t">텐트·랜턴·버너 챙기기</div>
  <div class="menu" role="menu"><div role="menuitem">수정</div><div role="menuitem">공유</div><div class="del" role="menuitem">삭제</div></div>
</div>`,
    run(el, ctx) {
      const b = el.querySelector('.dots'), m = el.querySelector('.menu');
      const set = v => { m.classList.toggle('on', v); b.setAttribute('aria-expanded', v); };
      ctx.on(b, 'click', () => set(!m.classList.contains('on')));
      m.querySelectorAll('div').forEach(d => ctx.on(d, 'click', () => set(false)));
      ctx.on(b, 'keydown', e => { if (e.key === 'Escape') set(false); });
      aAuto(ctx, el, b, () => set(true), 600);
    }
  },

  /* ───────── ac16 케밥 메뉴 ───────── */
  {
    id: 'ac16', ko: '케밥 메뉴', en: 'Kebab menu', pair: 'ac15',
    desc: '미트볼과 달리 세로 점 세 개(⋮)로 목록 줄 끝·앱바에 둬요.',
    prompt: '「케밥 메뉴(Kebab menu, ⋮)」를 목록 각 줄 끝에 만들어 줘. 세로 점 세 개 버튼을 누르면 그 줄 버튼 왼쪽에 수정·공유·삭제 메뉴가 0.2초 scale .9→1·fade-in 되고, 다른 줄을 누르면 메뉴가 그 줄 높이로 옮겨 가. 미트볼과 헷갈리지 않게 점은 가로(⋯)로 눕히지 마. aria-haspopup="menu"와 aria-expanded를 넣어 줘.',
    css: aBase('ac16') + `
.d-ac16 .pn{gap:0;padding:0}
.d-ac16 .bar{display:flex;align-items:center;justify-content:space-between;height:37px;padding:0 6px 0 12px;border-bottom:1px solid var(--line);flex:none}
.d-ac16 .bar b{font-size:13px;color:var(--text)}
.d-ac16 .li{display:flex;align-items:center;gap:9px;height:46px;flex:none;box-sizing:border-box;padding:0 6px 0 12px;border-bottom:1px solid var(--line);transition:background .2s}
.d-ac16 .li:last-child{border-bottom:0}
.d-ac16 .li.act{background:var(--surface-2)}
.d-ac16 .li .ui-thumb{width:28px;height:28px;flex:none;border-radius:7px}
.d-ac16 .li .n{flex:1;min-width:0;font-size:12.5px;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-ac16 .li .n small{display:block;font-size:11px;color:var(--muted)}
.d-ac16 .dots{flex:none;border:0;background:none;color:var(--text);width:30px;height:34px;border-radius:8px;display:grid;place-items:center;cursor:pointer;padding:0;transition:background .2s}
.d-ac16 .dots svg{width:22px;height:22px}
.d-ac16 .dots[aria-expanded="true"]{background:var(--line)}
.d-ac16 .menu{position:absolute;right:8px;z-index:6;min-width:104px;background:var(--surface);border:1px solid var(--line);border-radius:12px;box-shadow:0 8px 22px rgba(0,0,0,.18);padding:4px;opacity:0;transform:scale(.9);transform-origin:top right;pointer-events:none;transition:opacity .2s cubic-bezier(.2,.8,.2,1),transform .2s cubic-bezier(.2,.8,.2,1)}
.d-ac16 .menu.on{opacity:1;transform:none;pointer-events:auto}
.d-ac16 .menu div{font-size:12.5px;color:var(--text);padding:6px 10px;border-radius:7px;cursor:pointer}
.d-ac16 .menu div:hover{background:var(--surface-2)}
.d-ac16 .menu .del{color:var(--danger)}
`,
    html: `<div class="pn">
  <div class="bar"><b>내 캠핑 장비</b><button class="dots" type="button" aria-haspopup="menu" aria-expanded="false" aria-label="목록 더보기">${aIc('kebab', 22, 2.8)}</button></div>
  ${[['텐트', '4인용 · 6.2kg'], ['랜턴', 'LED · 충전식'], ['버너', '가스 · 2구']].map(([a, s]) => `<div class="li"><div class="ui-thumb"></div><span class="n">${a}<small>${s}</small></span><button class="dots" type="button" aria-haspopup="menu" aria-expanded="false" aria-label="${a} 더보기">${aIc('kebab', 22, 2.8)}</button></div>`).join('')}
  <div class="menu" role="menu"><div role="menuitem">수정</div><div role="menuitem">공유</div><div class="del" role="menuitem">삭제</div></div>
</div>`,
    run(el, ctx) {
      const pn = el.querySelector('.pn'), m = el.querySelector('.menu'), bs = [...el.querySelectorAll('.dots')];
      let cur = null;
      const close = () => { m.classList.remove('on'); bs.forEach(x => x.setAttribute('aria-expanded', 'false')); el.querySelectorAll('.li').forEach(l => l.classList.remove('act')); cur = null; };
      const openAt = b => {
        if (cur === b) { close(); return; }
        close();
        const p = pn.getBoundingClientRect(), r = b.getBoundingClientRect();
        const h = m.offsetHeight || 96, top = r.top - p.top + 4;
        m.style.right = '44px'; m.style.top = Math.max(4, Math.min(top, p.height - h - 4)) + 'px';
        b.setAttribute('aria-expanded', 'true'); const li = b.closest('.li'); if (li) li.classList.add('act');
        m.classList.remove('on'); void m.offsetWidth; m.classList.add('on'); cur = b;
      };
      bs.forEach(b => { ctx.on(b, 'click', () => openAt(b)); ctx.on(b, 'keydown', e => { if (e.key === 'Escape') close(); }); });
      m.querySelectorAll('div').forEach(d => ctx.on(d, 'click', close));
      aAuto(ctx, el, bs[1], () => openAt(bs[1]), 600);
    }
  }
]);
