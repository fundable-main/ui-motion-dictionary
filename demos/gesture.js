/* gesture — 제스처 (gs01~gs09) */
const GS_I = {
  arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>',
  trash: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5"/></svg>',
  right: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  check: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>',
  file: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/></svg>',
  folder: '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
  grip: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 8h14M5 12h14M5 16h14"/></svg>',
  heart: '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.5s-8-4.9-8-10.6A4.4 4.4 0 0 1 12 7a4.4 4.4 0 0 1 8 2.9c0 5.7-8 10.6-8 10.6z"/></svg>',
  x: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  peak: '<svg width="34" height="26" viewBox="0 0 34 26" fill="currentColor"><path d="M0 26 11 8l6 9 5-7 12 16z"/><circle cx="26" cy="5" r="3.5"/></svg>'
};
const gsOut = p => 1 - Math.pow(1 - p, 3);
const gsIO = p => (p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
const gsMix = (a, b, p) => a + (b - a) * p;
const gsClamp = (v, a, b) => Math.max(a, Math.min(b, v));
/* 트윈: fn(0..1). 마지막 프레임을 놓쳐도 타이머가 최종값을 보장한다 */
const gsTw = (ctx, dur, fn, ease) => {
  const o = { on: true };
  ctx.loop(t => {
    if (!o.on) return false;
    const p = Math.min(1, t / dur);
    fn((ease || gsOut)(p));
    if (p >= 1) { o.on = false; return false; }
  });
  ctx.timeout(() => { if (o.on) { o.on = false; fn(1); } }, dur + 34);
  return o;
};
/* 자동 시연용 타임라인 */
const gsTl = ctx => {
  let t = 0;
  const tl = {
    wait(ms) { t += ms; return tl; },
    call(fn) { ctx.timeout(fn, t); return tl; },
    tw(dur, fn, ease) { ctx.timeout(() => gsTw(ctx, dur, fn, ease), t); t += dur + 40; return tl; }
  };
  return tl;
};
/* 손가락(터치 포인트) */
const gsFg = host => {
  const f = document.createElement('i');
  f.className = 'gsf';
  f.setAttribute('aria-hidden', 'true');
  host.appendChild(f);
  const o = {
    at(x, y) { f.style.transform = `translate(${x - 15}px,${y - 15}px)`; return o; },
    down() { f.classList.add('on', 'dn'); return o; },
    up() { f.classList.remove('on', 'dn'); return o; }
  };
  return o;
};
/* 드래그: 누름은 스테이지에서 위임, 이동·놓기도 스테이지(el) 안에서만 듣는다 */
const gsDrag = (el, ctx, o) => {
  let st = null, id = null, sx = 0, sy = 0;
  ctx.on(el, 'pointerdown', e => {
    if (st || e.button > 0) return;
    const s = o.start(e);
    if (!s) return;
    st = s; id = e.pointerId; sx = e.clientX; sy = e.clientY;
    e.preventDefault();
  });
  ctx.on(el, 'pointermove', e => { if (st && e.pointerId === id) o.move(e.clientX - sx, e.clientY - sy, st); });
  const fin = e => { if (!st || e.pointerId !== id) return; const s = st; st = null; o.end(s); };
  ctx.on(el, 'pointerup', fin);
  ctx.on(el, 'pointercancel', fin);
  ctx.on(el, 'pointerleave', fin);
};
const gsFc = id => `
.d-${id} .gsf{position:absolute;left:0;top:0;width:30px;height:30px;border-radius:50%;box-sizing:border-box;background:color-mix(in srgb,var(--text) 20%,transparent);border:2px solid color-mix(in srgb,var(--text) 50%,transparent);box-shadow:0 0 0 0 color-mix(in srgb,var(--text) 14%,transparent);opacity:0;pointer-events:none;z-index:40;transition:opacity .18s,box-shadow .18s}
.d-${id} .gsf.on{opacity:1}
.d-${id} .gsf.dn{box-shadow:0 0 0 5px color-mix(in srgb,var(--text) 14%,transparent)}
`;
const gsSc = id => `
.d-${id} .sc{position:relative;width:236px;height:176px;border-radius:18px;background:var(--surface);box-shadow:var(--shadow);overflow:hidden;box-sizing:border-box;word-break:keep-all;user-select:none;-webkit-user-select:none}
.d-${id} .hd{position:absolute;left:0;right:0;top:0;height:36px;display:flex;align-items:center;justify-content:space-between;padding:0 12px;box-sizing:border-box;z-index:3;background:var(--surface)}
.d-${id} .hd b{font-size:13px;color:var(--text)}
.d-${id} .hd span{font-size:11px;font-weight:600;color:var(--muted)}
` + gsFc(id);
const gsRow01 = (t, nw) => `<div class="rw${nw ? ' nw' : ''}"><i></i><span><em>${t}</em><b class="ui-line" style="width:${nw ? 64 : 48}%"></b></span></div>`;

UIDEX.add('gesture', [
  /* gs01 당겨서 새로고침 */
  {
    id: 'gs01', ko: '당겨서 새로고침', en: 'Pull to refresh',
    desc: '목록을 아래로 당겼다 놓으면 스피너가 돌고 새 글이 맨 위에 들어와요.',
    prompt: '「당겨서 새로고침(Pull to refresh)」을 만들어 줘. 목록 맨 위에서 아래로 끌면 목록이 손가락의 55%만큼 따라 내려오며 화살표가 회전하고, 46px를 넘겨 놓으면 스피너가 0.7초 돈 뒤 새 항목이 맨 위에 추가돼. 못 넘기면 200ms ease-out으로 되돌아가. 새로고침 버튼도 함께 두고 결과는 aria-live로 알려 줘.',
    css: gsSc('gs01') + `
.d-gs01 .vp{position:absolute;left:0;right:0;top:36px;bottom:0;overflow:hidden;cursor:grab;touch-action:pan-x}
.d-gs01 .ind{position:absolute;left:0;right:0;top:0;height:46px;display:flex;align-items:center;justify-content:center;gap:7px;font-size:11px;font-weight:600;color:var(--muted);opacity:0}
.d-gs01 .ar{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:var(--surface-2);color:var(--muted);transform:rotate(var(--r,0deg))}
.d-gs01 .ind.rdy .ar{background:var(--accent);color:var(--accent-text)}
.d-gs01 .sp{display:none;width:16px;height:16px;border-radius:50%;border:2.5px solid var(--accent);border-top-color:transparent;box-sizing:border-box;animation:gs01-spin .7s linear infinite}
.d-gs01 .ind.ld .ar{display:none}
.d-gs01 .ind.ld .sp{display:block}
.d-gs01 .ls{position:relative;background:var(--surface)}
.d-gs01 .rw{display:flex;align-items:center;gap:9px;height:44px;padding:0 12px;box-sizing:border-box;border-top:1px solid var(--line)}
.d-gs01 .rw i{width:28px;height:28px;border-radius:8px;background:var(--accent-soft);flex:none}
.d-gs01 .rw span{flex:1;min-width:0;display:flex;flex-direction:column;gap:5px}
.d-gs01 .rw em{font-style:normal;font-size:12px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-gs01 .rw.nw{background:var(--accent-soft);animation:gs01-in .45s cubic-bezier(.2,.8,.2,1)}
.d-gs01 .rw.nw i{background:var(--accent)}
@keyframes gs01-spin{to{transform:rotate(360deg)}}
@keyframes gs01-in{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}
`,
    html: `<div class="sc"><div class="hd"><b>오늘의 소식</b><span class="cnt" aria-live="polite">4개</span></div>
  <div class="vp"><div class="ind"><i class="ar">${GS_I.arrow}</i><i class="sp"></i><span>당겨서 새로고침</span></div>
  <div class="ls">${['강릉 바다 열차 운행 재개', '제주 감귤 축제 일정 공개', '가을 캠핑장 예약 오픈', '경주 야간 개장 연장'].map(t => gsRow01(t)).join('')}</div></div></div>`,
    run(el, ctx) {
      const sc = el.querySelector('.sc'), ls = el.querySelector('.ls'), ind = el.querySelector('.ind');
      const tx = ind.querySelector('span'), cnt = el.querySelector('.cnt');
      const TH = 46, pool = ['부산 불꽃 축제 날짜 확정', '속초 해변 버스 증편', '남해 독일마을 맥주 축제'];
      let p = 0, busy = true, n = 4, k = 0;
      const set = v => {
        p = v;
        ls.style.transform = `translateY(${v}px)`;
        ind.style.opacity = Math.min(1, v / 26);
        ind.style.setProperty('--r', Math.min(180, v / TH * 180) + 'deg');
        ind.classList.toggle('rdy', v >= TH);
        tx.textContent = v >= TH ? '놓으면 새로고침' : '당겨서 새로고침';
      };
      const glide = to => { const from = p; gsTw(ctx, 200, q => set(gsMix(from, to, q))); };
      const refresh = () => {
        busy = true;
        glide(TH);
        ctx.timeout(() => { ind.classList.add('ld'); tx.textContent = '새로고침 중…'; }, 240);
        ctx.timeout(() => {
          ls.insertAdjacentHTML('afterbegin', gsRow01(pool[k++ % pool.length], true));
          if (ls.children.length > 6) ls.lastElementChild.remove();
          ind.classList.remove('ld');
          set(0);
          cnt.textContent = (++n) + '개';
          busy = false;
        }, 940);
      };
      const f = gsFg(sc);
      gsTl(ctx).wait(250).call(() => f.at(118, 62).down())
        .tw(600, q => { const d = 104 * q; f.at(118, 62 + d); set(d * .55); }, gsIO)
        .wait(150).call(() => { f.up(); refresh(); });
      gsDrag(el, ctx, {
        start: e => (!busy && e.target.closest('.vp') ? {} : null),
        move: (dx, dy) => set(gsClamp(dy * .55, 0, 84)),
        end: () => { if (p >= TH) refresh(); else glide(0); }
      });
    }
  },

  /* gs02 밀어서 삭제 */
  {
    id: 'gs02', ko: '밀어서 삭제', en: 'Swipe to delete',
    desc: '행을 왼쪽으로 밀면 빨간 삭제 영역이 드러나고 끝까지 밀면 지워져요.',
    prompt: '「밀어서 삭제(Swipe to delete)」 목록을 만들어 줘. 행을 왼쪽으로 끌면 행이 손가락을 따라가며 뒤에 빨간 삭제 영역과 휴지통 아이콘이 드러나고, 너비의 절반을 넘겨 놓으면 200ms 동안 밀려 나간 뒤 높이가 280ms ease-out으로 접혀 사라져. 못 넘기면 제자리로 돌아와. 키보드 사용자를 위해 삭제 버튼도 따로 제공해 줘.',
    css: gsSc('gs02') + `
.d-gs02 .ls{position:absolute;left:10px;right:10px;top:38px}
.d-gs02 .rw{position:relative;height:38px;margin-bottom:6px;transition:height .28s cubic-bezier(.2,.8,.2,1),margin .28s,opacity .2s}
.d-gs02 .rw.gone{height:0;margin-bottom:0;opacity:0}
.d-gs02 .dl{position:absolute;inset:1px;border-radius:10px;background:var(--danger);color:var(--accent-text);display:flex;align-items:center;justify-content:flex-end;gap:4px;padding-right:12px;font-size:12px;font-weight:700}
.d-gs02 .dl svg{transition:transform .18s cubic-bezier(.2,.8,.2,1)}
.d-gs02 .rw.arm .dl svg{transform:scale(1.3)}
.d-gs02 .fg{position:absolute;inset:0;border-radius:10px;background:var(--surface-2);display:flex;align-items:center;gap:9px;padding:0 10px;box-sizing:border-box;cursor:grab;touch-action:pan-y}
.d-gs02 .fg i{width:24px;height:24px;border-radius:50%;background:var(--accent-soft);flex:none}
.d-gs02 .fg span{display:flex;flex-direction:column;gap:1px;min-width:0}
.d-gs02 .fg em{font-style:normal;font-size:12px;font-weight:600;color:var(--text);line-height:1.25}
.d-gs02 .fg small{font-size:11px;color:var(--muted);line-height:1.25}
.d-gs02 .em{position:absolute;left:0;right:0;top:92px;text-align:center;font-size:12px;color:var(--muted);opacity:0;transition:opacity .3s}
.d-gs02 .em.on{opacity:1}
`,
    html: `<div class="sc"><div class="hd"><b>받은 알림</b><span><span class="cnt" aria-live="polite">3</span>개</span></div>
  <div class="ls">${[['배송이 시작됐어요', '캠핑 의자 · 오늘 도착'], ['쿠폰이 곧 만료돼요', '3,000원 · 내일까지'], ['리뷰를 남겨 주세요', 'LED 랜턴 · 적립 500원']].map(r => `<div class="rw"><div class="dl">${GS_I.trash}삭제</div><div class="fg"><i></i><span><em>${r[0]}</em><small>${r[1]}</small></span></div></div>`).join('')}</div>
  <div class="em">알림을 모두 지웠어요</div></div>`,
    run(el, ctx) {
      const sc = el.querySelector('.sc'), cnt = el.querySelector('.cnt'), em = el.querySelector('.em');
      const W = 216, TH = -108;
      let busy = true, n = 3;
      const set = (rw, x) => {
        x = gsClamp(x, -W, 0);
        rw._x = x;
        const fg = rw.querySelector('.fg');
        fg.style.transition = 'none';
        fg.style.transform = `translateX(${x}px)`;
        rw.classList.toggle('arm', x <= TH);
      };
      const fin = rw => {
        const fg = rw.querySelector('.fg');
        fg.style.transition = 'transform .2s cubic-bezier(.2,.8,.2,1)';
        if ((rw._x || 0) <= TH) {
          rw._gone = true;
          fg.style.transform = 'translateX(-104%)';
          ctx.timeout(() => { rw.classList.add('gone'); cnt.textContent = --n; if (!n) em.classList.add('on'); }, 200);
          ctx.timeout(() => rw.remove(), 520);
        } else {
          fg.style.transform = 'translateX(0)';
          rw.classList.remove('arm');
          rw._x = 0;
        }
      };
      const f = gsFg(sc), r1 = el.querySelectorAll('.rw')[1];
      gsTl(ctx).wait(300).call(() => f.at(196, 101).down())
        .tw(700, q => { f.at(196 - 150 * q, 101); set(r1, -150 * q); }, gsIO)
        .wait(150).call(() => { f.up(); fin(r1); })
        .wait(400).call(() => { busy = false; });
      gsDrag(el, ctx, {
        start: e => { const rw = e.target.closest('.rw'); return busy || !rw || rw._gone ? null : rw; },
        move: (dx, dy, rw) => set(rw, dx),
        end: rw => fin(rw)
      });
    }
  },

  /* gs03 밀어서 확인 */
  {
    id: 'gs03', ko: '밀어서 확인', en: 'Slide to confirm', pair: 'ac19',
    desc: '길게 누르기와 달리 손잡이를 트랙 끝까지 밀어야 실행돼요.',
    prompt: '「밀어서 확인(Slide to confirm)」을 만들어 줘. 48px 높이 알약형 트랙의 40px 손잡이를 오른쪽 끝까지 끌면 지나간 자리가 채워지다가 끝에서 체크로 바뀌고, 중간에 놓으면 300ms ease-out으로 되돌아가. role="slider"로 화살표 키도 지원해 줘. 길게 눌러 확인(Hold to confirm)과 헷갈리지 않게 누르고만 있어도 채워지게 하지 마.',
    css: gsSc('gs03') + `
.d-gs03 .sm{position:absolute;left:14px;right:14px;top:16px}
.d-gs03 .sm small{display:block;font-size:11px;color:var(--muted)}
.d-gs03 .sm b{display:block;font-size:22px;color:var(--text);margin:2px 0 4px;letter-spacing:-.3px}
.d-gs03 .sm em{display:block;font-style:normal;font-size:11px;color:var(--muted)}
.d-gs03 .tr{position:absolute;left:12px;right:12px;bottom:14px;height:48px;border-radius:24px;background:var(--surface-2);overflow:hidden;transition:background .25s}
.d-gs03 .fl{position:absolute;left:0;top:0;bottom:0;width:48px;border-radius:24px;background:var(--accent-soft)}
.d-gs03 .lb{position:absolute;left:44px;right:8px;top:0;bottom:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:var(--muted);pointer-events:none}
.d-gs03 .kn{position:absolute;left:4px;top:4px;width:40px;height:40px;border:0;padding:0;border-radius:50%;background:var(--accent);color:var(--accent-text);display:grid;place-items:center;cursor:grab;touch-action:none;box-shadow:var(--shadow)}
.d-gs03 .kn:focus-visible{outline:2px solid var(--text);outline-offset:2px}
.d-gs03 .tr.ok{background:var(--success)}
.d-gs03 .tr.ok .fl{opacity:0}
.d-gs03 .tr.ok .lb{left:8px;right:44px;color:var(--accent-text)}
.d-gs03 .tr.ok .kn{background:var(--surface);color:var(--success);cursor:default;animation:gs03-pop .35s cubic-bezier(.2,.8,.2,1)}
@keyframes gs03-pop{from{scale:.7}to{scale:1}}
`,
    html: `<div class="sc"><div class="sm"><small>결제 금액</small><b>39,000원</b><em>캠핑 의자 1개 · 무료배송</em></div>
  <div class="tr"><div class="fl"></div><div class="lb" aria-live="polite">밀어서 결제하기</div>
  <button class="kn" type="button" role="slider" aria-label="밀어서 결제하기" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">${GS_I.right}</button></div></div>`,
    run(el, ctx) {
      const sc = el.querySelector('.sc'), tr = el.querySelector('.tr'), fl = el.querySelector('.fl');
      const lb = el.querySelector('.lb'), kn = el.querySelector('.kn');
      const MAX = 164;
      let x = 0, busy = true, ok = false;
      const set = v => {
        x = gsClamp(v, 0, MAX);
        kn.style.transform = `translateX(${x}px)`;
        fl.style.width = (x + 48) + 'px';
        lb.style.opacity = Math.max(0, 1 - x / 90);
        kn.setAttribute('aria-valuenow', Math.round(x / MAX * 100));
      };
      const done = () => {
        ok = true;
        set(MAX);
        tr.classList.add('ok');
        lb.style.opacity = 1;
        lb.textContent = '결제 완료';
        kn.innerHTML = GS_I.check;
      };
      const rel = () => { if (x >= MAX - 2) done(); else { const from = x; gsTw(ctx, 300, q => set(gsMix(from, 0, q))); } };
      const f = gsFg(sc), fy = 138;
      gsTl(ctx).wait(300).call(() => f.at(36, fy).down())
        .tw(420, q => { set(72 * q); f.at(36 + 72 * q, fy); }, gsIO)
        .wait(80).call(() => { f.up(); rel(); })
        .wait(520).call(() => f.at(36, fy).down())
        .tw(600, q => { set(MAX * q); f.at(36 + MAX * q, fy); }, gsIO)
        .wait(60).call(() => { f.up(); rel(); busy = false; });
      gsDrag(el, ctx, {
        start: e => (!busy && !ok && e.target.closest('.kn') ? { x0: x } : null),
        move: (dx, dy, s) => set(s.x0 + dx),
        end: rel
      });
      ctx.on(kn, 'keydown', e => {
        if (busy || ok) return;
        if (e.key === 'ArrowRight') { set(x + 41); if (x >= MAX - 2) done(); e.preventDefault(); }
        else if (e.key === 'ArrowLeft') { set(x - 41); e.preventDefault(); }
      });
    }
  },

  /* gs04 핀치 줌 */
  {
    id: 'gs04', ko: '핀치 줌', en: 'Pinch to zoom',
    desc: '두 손가락을 벌리면 그 사이를 중심으로 사진이 확대되고 오므리면 줄어요.',
    prompt: '「핀치 줌(Pinch to zoom)」 사진 뷰어를 만들어 줘. 터치 점 두 개의 거리 변화 비율만큼 사진 배율을 1~3배 사이에서 실시간으로 바꾸고, 확대된 상태에선 한 손가락으로 끌어 위치를 옮길 수 있게 해. 더블 탭은 300ms cubic-bezier(.2,.8,.2,1)로 2.2배와 원래 크기를 오가. 마우스·키보드용 +/− 버튼과 현재 배율 표시도 함께 넣어 줘.',
    css: gsSc('gs04') + `
.d-gs04 .ph{position:absolute;inset:0;overflow:hidden;touch-action:none;cursor:zoom-in}
.d-gs04 .ph canvas{display:block;width:236px;height:176px}
.d-gs04 .zm{position:absolute;left:10px;top:10px;z-index:5;padding:4px 9px;border-radius:999px;background:var(--surface);color:var(--text);font-size:12px;font-weight:700;box-shadow:var(--shadow);font-variant-numeric:tabular-nums;pointer-events:none}
.d-gs04 .hn{position:absolute;right:10px;top:10px;z-index:5;padding:4px 9px;border-radius:999px;background:var(--surface);color:var(--muted);font-size:11px;font-weight:600;box-shadow:var(--shadow);pointer-events:none}
.d-gs04 .bt{position:absolute;right:10px;bottom:10px;z-index:5;display:flex;border-radius:10px;background:var(--surface);box-shadow:var(--shadow);overflow:hidden}
.d-gs04 .bt button{width:30px;height:28px;border:0;padding:0;background:none;color:var(--text);font:inherit;font-size:16px;font-weight:700;line-height:1;cursor:pointer}
.d-gs04 .bt button+button{border-left:1px solid var(--line)}
.d-gs04 .bt button:disabled{color:var(--muted);opacity:.45;cursor:default}
.d-gs04 .bt button:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}
`,
    html: `<div class="sc"><div class="ph"><canvas role="img" aria-label="산과 텐트가 있는 캠핑장 사진"></canvas></div><span class="zm" aria-live="polite">×1.0</span><span class="hn">벌리기 · 더블클릭</span><div class="bt"><button type="button" class="zo" aria-label="축소" disabled>−</button><button type="button" class="zi" aria-label="확대">+</button></div></div>`,
    run(el, ctx) {
      const sc = el.querySelector('.sc'), ph = el.querySelector('.ph'), cv = el.querySelector('canvas'), zm = el.querySelector('.zm'), zo = el.querySelector('.zo'), zi = el.querySelector('.zi');
      const g = cv.getContext('2d'), R = Math.min(2, window.devicePixelRatio || 1);
      cv.width = 236 * R; cv.height = 176 * R;
      const far = new Path2D('M0 122 52 66l34 34 40-42 54 50 56-38v106H0z'), near = new Path2D('M0 136 40 104l30 22 48-34 46 30 72-20v70H0z');
      const hill = new Path2D('M0 150q60-26 118-12t118-8v46H0z'), tent = new Path2D('M104 138 118 112l14 26z'), pole = new Path2D('M118 138v-13M86 140v-12M150 139v-12');
      const pts = new Map();
      let s = 1, tx = 0, ty = 0, busy = true, d0 = 1, s0 = 1, ax = 0, ay = 0;
      /* 요소 크기는 그대로 두고 캔버스 안에서만 확대해 그린다(색은 CSS 변수에서 읽음) */
      const draw = () => {
        const cs = getComputedStyle(sc), v = k => cs.getPropertyValue(k).trim();
        g.setTransform(R * s, 0, 0, R * s, R * (118 + tx - 118 * s), R * (88 + ty - 88 * s));
        g.globalAlpha = 1; g.fillStyle = v('--accent-soft'); g.fillRect(0, 0, 236, 176);
        g.fillStyle = v('--warn'); g.beginPath(); g.arc(158, 62, 13, 0, 7); g.fill();
        g.fillStyle = v('--accent'); g.globalAlpha = .42; g.fill(far); g.globalAlpha = .7; g.fill(near);
        g.globalAlpha = 1; g.fillStyle = v('--success'); g.fill(hill);
        g.beginPath(); g.arc(86, 124, 6, 0, 7); g.arc(150, 123, 6, 0, 7); g.fill();
        g.fillStyle = v('--danger'); g.fill(tent);
        g.strokeStyle = v('--surface'); g.lineWidth = 1.6; g.lineCap = 'round'; g.stroke(pole);
      };
      const set = ns => {
        s = gsClamp(ns, 1, 3);
        const mx = (s - 1) * 118, my = (s - 1) * 88;
        tx = gsClamp(tx, -mx, mx); ty = gsClamp(ty, -my, my);
        draw();
        zm.textContent = '×' + s.toFixed(1);
        ph.style.cursor = s > 1.05 ? 'grab' : 'zoom-in';
        zo.disabled = s <= 1.001; zi.disabled = s >= 2.999;
      };
      const glide = to => { const a = s, x = tx, y = ty; if (to === a) return; busy = true; gsTw(ctx, 300, q => { if (to === 1) { tx = x * (1 - q); ty = y * (1 - q); } set(gsMix(a, to, q)); if (q >= 1) busy = false; }); };
      draw();
      ctx.interval(draw, 600);
      const dist = () => { const [a, b] = [...pts.values()]; return Math.hypot(a[0] - b[0], a[1] - b[1]) || 1; };
      /* 두 터치 점의 중간(스테이지 중심 기준 좌표) */
      const mid = () => { const [a, b] = [...pts.values()], r = ph.getBoundingClientRect(); return [(a[0] + b[0]) / 2 - r.left - 118, (a[1] + b[1]) / 2 - r.top - 88]; };
      const f1 = gsFg(sc), f2 = gsFg(sc);
      const pose = q => { f1.at(gsMix(130, 184, q), gsMix(100, 62, q)); f2.at(gsMix(106, 52, q), gsMix(118, 156, q)); };
      gsTl(ctx).wait(350).call(() => { pose(0); f1.down(); f2.down(); })
        .wait(200).tw(900, q => { pose(q); ty = -21 * 1.2 * q; set(1 + 1.2 * q); }, gsIO)
        .wait(250).call(() => { f1.up(); f2.up(); busy = false; });
      ctx.on(ph, 'pointerdown', e => {
        if (busy || pts.size >= 2) return;
        pts.set(e.pointerId, [e.clientX, e.clientY]);
        if (pts.size === 2) { d0 = dist(); s0 = s; const m = mid(); ax = (m[0] - tx) / s; ay = (m[1] - ty) / s; }
      });
      ctx.on(el, 'pointermove', e => {
        const prev = pts.get(e.pointerId);
        if (!prev) return;
        pts.set(e.pointerId, [e.clientX, e.clientY]);
        if (pts.size === 2) { const ns = gsClamp(s0 * dist() / d0, 1, 3), m = mid(); tx = m[0] - ax * ns; ty = m[1] - ay * ns; set(ns); }
        else if (s > 1) { tx += e.clientX - prev[0]; ty += e.clientY - prev[1]; set(s); }
      });
      const up = e => pts.delete(e.pointerId);
      ctx.on(el, 'pointerup', up);
      ctx.on(el, 'pointercancel', up);
      ctx.on(el, 'pointerleave', up);
      ctx.on(ph, 'dblclick', () => {
        if (busy) return;
        glide(s > 1.05 ? 1 : 2.2);
      });
      ctx.on(zi, 'click', () => { if (!busy) glide(gsClamp(Math.round((s + .5) * 2) / 2, 1, 3)); });
      ctx.on(zo, 'click', () => { if (!busy) glide(gsClamp(Math.round((s - .5) * 2) / 2, 1, 3)); });
    }
  },

  /* gs05 드래그 앤 드롭 */
  {
    id: 'gs05', ko: '드래그 앤 드롭', en: 'Drag and drop', pair: 'gs06',
    desc: '드래그 정렬과 달리 항목을 집어 다른 영역으로 옮기고, 놓을 곳이 강조돼요.',
    prompt: '「드래그 앤 드롭(Drag and drop)」을 만들어 줘. 파일을 누르면 1.05배로 떠올라 포인터를 따르고, 폴더 위에선 점선 테두리가 파래지며 1.04배 커져. 놓으면 250ms 동안 폴더로 빨려 들어가 개수가 오르고, 밖에 놓으면 280ms ease-out으로 돌아와. 키보드용 "폴더로 이동" 메뉴도 넣어. 드래그 정렬(Drag to reorder)과 헷갈리지 않게 목록 안 순서 바꾸기는 넣지 마.',
    css: gsSc('gs05') + `
.d-gs05 .cp{position:absolute;left:12px;top:10px;font-size:11px;font-weight:700;color:var(--muted)}
.d-gs05 .tl{position:absolute;left:12px;width:92px;height:36px;border-radius:10px;background:var(--surface-2);border:1px solid var(--line);box-sizing:border-box;display:flex;align-items:center;gap:6px;padding:0 9px;font-size:12px;font-weight:600;color:var(--text);cursor:grab;touch-action:none;z-index:2}
.d-gs05 .tl svg{color:var(--accent);flex:none}
.d-gs05 .tl.drg{z-index:6;cursor:grabbing;background:var(--surface);border-color:var(--accent);box-shadow:0 8px 20px rgba(0,0,0,.22)}
.d-gs05 .zn{position:absolute;left:124px;top:30px;width:100px;height:126px;border-radius:14px;border:2px dashed var(--line);box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;color:var(--muted);transition:transform .2s cubic-bezier(.2,.8,.2,1),border-color .2s,background .2s,color .2s}
.d-gs05 .zn b{font-size:12px;color:var(--text)}
.d-gs05 .zn small{font-size:11px;color:var(--muted)}
.d-gs05 .zn.ov{border-color:var(--accent);background:var(--accent-soft);color:var(--accent);transform:scale(1.04)}
.d-gs05 .zn.got svg{animation:gs05-pop .35s cubic-bezier(.2,.8,.2,1)}
.d-gs05 .em{position:absolute;left:12px;top:78px;width:92px;text-align:center;font-size:11px;color:var(--muted);opacity:0;transition:opacity .3s}
.d-gs05 .em.on{opacity:1}
@keyframes gs05-pop{0%{transform:scale(1)}45%{transform:scale(1.25)}100%{transform:scale(1)}}
`,
    html: `<div class="sc"><span class="cp">내 파일</span>
  ${['해변.jpg', '일몰.jpg', '지도.pdf'].map((t, i) => `<div class="tl" style="top:${32 + i * 44}px">${GS_I.file}${t}</div>`).join('')}
  <div class="em">모두 옮겼어요</div>
  <div class="zn">${GS_I.folder}<b>제주 여행</b><small class="ct" aria-live="polite">0개</small></div></div>`,
    run(el, ctx) {
      const sc = el.querySelector('.sc'), tiles = [...el.querySelectorAll('.tl')];
      const zn = el.querySelector('.zn'), ct = el.querySelector('.ct'), em = el.querySelector('.em');
      const Z = { x: 124, y: 30, w: 100, h: 126 };
      let busy = true, n = 0;
      tiles.forEach((t, i) => { t._cx = 58; t._cy = 50 + i * 44; t._d = [0, 0]; });
      const over = t => { const cx = t._cx + t._d[0], cy = t._cy + t._d[1]; return cx > Z.x && cx < Z.x + Z.w && cy > Z.y && cy < Z.y + Z.h; };
      const mv = (t, dx, dy) => {
        t._d = [dx, dy];
        t.classList.add('drg');
        t.style.transition = 'box-shadow .15s';
        t.style.transform = `translate(${dx}px,${dy}px) scale(1.05)`;
        zn.classList.toggle('ov', over(t));
      };
      const drop = t => {
        const hit = over(t);
        zn.classList.remove('ov');
        t.classList.remove('drg');
        t.style.transition = 'transform .28s cubic-bezier(.2,.8,.2,1),opacity .25s';
        if (hit) {
          t._in = true;
          t.style.transform = `translate(${Z.x + Z.w / 2 - t._cx}px,${Z.y + 50 - t._cy}px) scale(.2)`;
          t.style.opacity = 0;
          ctx.timeout(() => {
            t.remove();
            ct.textContent = (++n) + '개';
            zn.classList.remove('got'); void zn.offsetWidth; zn.classList.add('got');
            if (n === tiles.length) em.classList.add('on');
          }, 250);
        } else { t.style.transform = 'none'; t._d = [0, 0]; }
      };
      const f = gsFg(sc), t0 = tiles[0];
      gsTl(ctx).wait(300).call(() => { f.at(58, 50).down(); mv(t0, 0, 0); })
        .wait(160).tw(800, q => { mv(t0, 116 * q, 43 * q); f.at(58 + 116 * q, 50 + 43 * q); }, gsIO)
        .wait(180).call(() => { f.up(); drop(t0); })
        .wait(300).call(() => { busy = false; });
      gsDrag(el, ctx, {
        start: e => { const t = e.target.closest('.tl'); if (busy || !t || t._in) return null; mv(t, 0, 0); return t; },
        move: (dx, dy, t) => mv(t, dx, dy),
        end: t => drop(t)
      });
    }
  },

  /* gs06 드래그 정렬 */
  {
    id: 'gs06', ko: '드래그 정렬', en: 'Drag to reorder', pair: 'gs05',
    desc: '드래그 앤 드롭과 달리 같은 목록 안에서 순서만 바꾸고 다른 행이 비켜나요.',
    prompt: '「드래그 정렬(Drag to reorder)」 목록을 만들어 줘. 행 오른쪽 손잡이(≡)를 잡으면 행이 1.03배로 떠올라 세로로만 움직이고, 행 높이의 절반을 지날 때마다 다른 행이 200ms ease-out으로 비켜나며 번호가 바뀌어. 손잡이는 버튼으로 만들어 위·아래 화살표 키로도 옮기게 해. 드래그 앤 드롭(Drag and drop)과 헷갈리지 않게 목록 밖 다른 영역에 놓는 동작은 넣지 마.',
    css: gsSc('gs06') + `
.d-gs06 .ls{position:absolute;left:10px;right:10px;top:37px;height:136px}
.d-gs06 .rw{position:absolute;left:0;right:0;top:0;height:30px;border-radius:9px;background:var(--surface-2);border:1px solid transparent;box-sizing:border-box;display:flex;align-items:center;gap:8px;padding-left:8px;transition:transform .2s cubic-bezier(.2,.8,.2,1),box-shadow .2s}
.d-gs06 .no{width:18px;height:18px;border-radius:50%;background:var(--surface);color:var(--muted);font-size:11px;font-weight:700;display:grid;place-items:center;flex:none;font-style:normal}
.d-gs06 .rw em{flex:1;font-style:normal;font-size:12px;font-weight:600;color:var(--text)}
.d-gs06 .hl{width:32px;height:28px;border:0;padding:0;background:none;color:var(--muted);display:grid;place-items:center;cursor:grab;touch-action:none;border-radius:8px}
.d-gs06 .hl:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}
.d-gs06 .rw.drg{z-index:5;transition:box-shadow .2s;background:var(--surface);border-color:var(--accent);box-shadow:0 8px 18px rgba(0,0,0,.2)}
.d-gs06 .rw.drg .no{background:var(--accent);color:var(--accent-text)}
.d-gs06 .rw.drg .hl{color:var(--accent);cursor:grabbing}
`,
    html: `<div class="sc"><div class="hd"><b>캠핑 준비 순서</b><span>≡ 잡고 이동</span></div>
  <div class="ls">${['장보기', '텐트 챙기기', '차량 점검', '캠핑장 예약'].map((t, i) => `<div class="rw" style="transform:translateY(${i * 34}px)"><i class="no">${i + 1}</i><em>${t}</em><button class="hl" type="button" aria-label="${t} 순서 바꾸기">${GS_I.grip}</button></div>`).join('')}</div></div>`,
    run(el, ctx) {
      const sc = el.querySelector('.sc'), order = [...el.querySelectorAll('.rw')];
      const S = 34, LAST = (order.length - 1) * S;
      let busy = true;
      const lay = skip => order.forEach((r, i) => {
        r.querySelector('.no').textContent = i + 1;
        if (r !== skip) r.style.transform = `translateY(${i * S}px)`;
      });
      const grab = r => { r.classList.add('drg'); r._y0 = order.indexOf(r) * S; };
      const mv = (r, dy) => {
        const y = gsClamp(r._y0 + dy, 0, LAST);
        r.style.transform = `translateY(${y}px) scale(1.03)`;
        const ni = Math.round(y / S), ci = order.indexOf(r);
        if (ni !== ci) { order.splice(ci, 1); order.splice(ni, 0, r); lay(r); }
      };
      const rel = r => { r.classList.remove('drg'); lay(); };
      const f = gsFg(sc), r3 = order[3];
      gsTl(ctx).wait(300).call(() => { f.at(210, 154).down(); grab(r3); mv(r3, 0); })
        .wait(180).tw(950, q => { mv(r3, -102 * q); f.at(210, 154 - 102 * q); }, gsIO)
        .wait(180).call(() => { f.up(); rel(r3); busy = false; });
      gsDrag(el, ctx, {
        start: e => { const h = e.target.closest('.hl'); if (busy || !h) return null; const r = h.closest('.rw'); grab(r); mv(r, 0); return r; },
        move: (dx, dy, r) => mv(r, dy),
        end: rel
      });
      ctx.on(el, 'keydown', e => {
        const h = e.target.closest && e.target.closest('.hl');
        if (busy || !h || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return;
        const r = h.closest('.rw'), ci = order.indexOf(r), ni = gsClamp(ci + (e.key === 'ArrowUp' ? -1 : 1), 0, order.length - 1);
        e.preventDefault();
        if (ni !== ci) { order.splice(ci, 1); order.splice(ni, 0, r); lay(); }
      });
    }
  },

  /* gs07 스와이프 카드 */
  {
    id: 'gs07', ko: '스와이프 카드', en: 'Swipe cards', pair: 'ly16',
    desc: '카드를 좌우로 던지면 기울며 날아가고 좋아요·패스가 정해져요.',
    prompt: '「스와이프 카드(Swipe cards)」 덱을 만들어 줘. 맨 위 카드를 좌우로 끌면 이동 거리 12px당 1도씩 기울고, 오른쪽이면 "좋아요" 왼쪽이면 "패스" 도장이 점점 진해져. 70px 넘겨 놓으면 360ms ease-in으로 화면 밖으로 날아가고 뒤 카드가 300ms 동안 앞으로 올라와. 못 넘기면 제자리로 돌아오고, 같은 동작을 하는 패스·좋아요 버튼도 아래에 둬.',
    css: gsFc('gs07') + `
.d-gs07 .wr{position:relative;width:236px;height:176px;user-select:none;-webkit-user-select:none;word-break:keep-all}
.d-gs07 .cd{position:absolute;left:43px;top:4px;width:150px;height:122px;border-radius:16px;background:var(--surface);box-shadow:var(--shadow);overflow:hidden;transform-origin:50% 100%;touch-action:pan-y}
.d-gs07 .cd.top{cursor:grab}
.d-gs07 .th{height:62px;display:grid;place-items:center;background:color-mix(in srgb,var(--c) 20%,var(--surface));color:var(--c)}
.d-gs07 .bd{padding:8px 11px}
.d-gs07 .bd b{display:block;font-size:13px;color:var(--text)}
.d-gs07 .bd small{display:block;font-size:11px;color:var(--muted);margin-top:2px}
.d-gs07 .sp{position:absolute;top:10px;padding:2px 7px;border-radius:7px;border:2px solid currentColor;background:var(--surface);font-size:12px;font-weight:800;opacity:0}
.d-gs07 .yes{left:9px;color:var(--success);transform:rotate(-10deg)}
.d-gs07 .no{right:9px;color:var(--danger);transform:rotate(10deg)}
.d-gs07 .bt{position:absolute;left:0;right:0;top:146px;display:flex;justify-content:center;gap:10px}
.d-gs07 .bt button{height:28px;padding:0 12px;border-radius:999px;border:1px solid var(--line);background:var(--surface);font:inherit;font-size:12px;font-weight:700;display:flex;align-items:center;gap:5px;cursor:pointer;font-variant-numeric:tabular-nums}
.d-gs07 .bt .bn{color:var(--danger)}
.d-gs07 .bt .by{color:var(--success)}
.d-gs07 .bt button:active{transform:scale(.95)}
`,
    html: `<div class="wr">${[['제주 올레길 걷기', '3박 4일 · 도보 여행', '--accent'], ['강릉 바다 열차', '당일 · 기차 여행', '--success'], ['경주 야경 투어', '1박 2일 · 역사 여행', '--warn']].map(c => `<div class="cd" style="--c:var(${c[2]})"><div class="th">${GS_I.peak}</div><div class="bd"><b>${c[0]}</b><small>${c[1]}</small></div><span class="sp yes">좋아요</span><span class="sp no">패스</span></div>`).join('')}
  <div class="bt"><button class="bn" type="button">${GS_I.x}패스 <span>0</span></button><button class="by" type="button">${GS_I.heart}좋아요 <span>0</span></button></div></div>`,
    run(el, ctx) {
      const wr = el.querySelector('.wr'), deck = [...el.querySelectorAll('.cd')];
      const bn = el.querySelector('.bn'), by = el.querySelector('.by');
      let busy = true, like = 0, pass = 0;
      const FLY = gsClamp((el.clientWidth - 236) / 2 + 52, 64, 130);
      const stamp = (c, x) => {
        c.querySelector('.yes').style.opacity = gsClamp(x / 60, 0, 1);
        c.querySelector('.no').style.opacity = gsClamp(-x / 60, 0, 1);
      };
      const lay = anim => deck.forEach((c, i) => {
        if (c._fly) return;
        c.style.transition = anim === false ? 'none' : 'transform .3s cubic-bezier(.2,.8,.2,1),opacity .3s';
        c.style.zIndex = 3 - i;
        c.style.opacity = 1;
        c.style.transform = `translateY(${i * 8}px) scale(${1 - i * .07})`;
        c.classList.toggle('top', i === 0);
      });
      const mv = (c, x, y) => {
        c._x = x;
        c.style.transition = 'none';
        c.style.transform = `translate(${x}px,${y * .25}px) rotate(${x / 12}deg)`;
        stamp(c, x);
      };
      const fly = dir => {
        const c = deck[0];
        if (c._fly) return;
        c._fly = true;
        stamp(c, dir * 60);
        c.style.zIndex = 9;
        c.style.transition = 'transform .36s ease-in,opacity .36s ease-in';
        c.style.transform = `translate(${dir * FLY}px,22px) rotate(${dir * 18}deg) scale(.9)`;
        c.style.opacity = 0;
        if (dir > 0) by.querySelector('span').textContent = ++like; else bn.querySelector('span').textContent = ++pass;
        deck.push(deck.shift());
        lay();
        ctx.timeout(() => {
          stamp(c, 0);
          c.style.transition = 'none';
          c.style.zIndex = 0;
          c.style.transform = 'translateY(22px) scale(.76)';
          void c.offsetWidth;
          c._fly = false; c._x = 0;
          lay();
        }, 380);
      };
      const rel = c => {
        if (Math.abs(c._x || 0) > 70) fly(c._x > 0 ? 1 : -1);
        else { c._x = 0; stamp(c, 0); lay(); }
      };
      lay(false);
      const f = gsFg(wr);
      gsTl(ctx).wait(300).call(() => f.at(118, 70).down())
        .tw(520, q => { mv(deck[0], 92 * q, 12 * q); f.at(118 + 92 * q, 70 + 3 * q); }, gsIO)
        .wait(140).call(() => { f.up(); rel(deck[0]); })
        .wait(520).call(() => f.at(118, 70).down())
        .tw(520, q => { mv(deck[0], -92 * q, 12 * q); f.at(118 - 92 * q, 70 + 3 * q); }, gsIO)
        .wait(140).call(() => { f.up(); rel(deck[0]); })
        .wait(420).call(() => { busy = false; });
      gsDrag(el, ctx, {
        start: e => { const c = e.target.closest('.cd'); return busy || !c || c !== deck[0] || c._fly ? null : c; },
        move: (dx, dy, c) => mv(c, dx, dy),
        end: rel
      });
      ctx.on(bn, 'click', () => { if (!busy) fly(-1); });
      ctx.on(by, 'click', () => { if (!busy) fly(1); });
    }
  },

  /* gs08 끌어서 닫기 */
  {
    id: 'gs08', ko: '끌어서 닫기', en: 'Drag to dismiss',
    desc: '열린 사진을 아래로 끌면 작아지며 배경이 걷히고, 놓으면 닫혀요.',
    prompt: '「끌어서 닫기(Drag to dismiss)」 사진 뷰어를 만들어 줘. 열린 사진을 아래로 끌면 손가락을 따라 내려오며 최대 0.7배까지 작아지고, 검은 배경은 130px 지점에서 완전히 투명해져 뒤 화면이 비쳐. 60px 넘겨 놓으면 300ms cubic-bezier(.2,.8,.2,1)로 썸네일 자리로 줄어들며 닫히고, 못 넘기면 되돌아와. 닫기 버튼과 Esc 키도 지원해 줘.',
    css: gsSc('gs08') + `
.d-gs08 .gr{position:absolute;left:12px;right:12px;top:40px;display:grid;grid-template-columns:repeat(3,64px);gap:10px}
.d-gs08 .tb{height:56px;border:0;padding:0;border-radius:10px;background:color-mix(in srgb,var(--c) 24%,var(--surface));color:var(--c);display:grid;place-items:center;cursor:pointer}
.d-gs08 .tb svg{width:26px;height:20px}
.d-gs08 .vw{position:absolute;inset:0;z-index:6;pointer-events:none}
.d-gs08 .vw.on{pointer-events:auto}
.d-gs08 .dm{position:absolute;inset:0;background:#000;opacity:0}
.d-gs08 .tp{position:absolute;left:0;right:0;top:9px;text-align:center;font-size:11px;font-weight:600;color:var(--accent-text);opacity:0}
.d-gs08 .ph{position:absolute;left:18px;top:30px;width:200px;height:120px;border-radius:12px;background:color-mix(in srgb,var(--c) 30%,var(--surface));color:var(--c);display:grid;place-items:center;cursor:grab;touch-action:none;opacity:0}
.d-gs08 .ph svg{width:84px;height:64px}
`,
    html: `<div class="sc"><div class="hd"><b>여행 앨범</b><span>6장</span></div>
  <div class="gr">${['--accent', '--success', '--warn', '--danger', '--accent', '--success'].map((c, i) => `<button class="tb" type="button" style="--c:var(${c})" aria-label="사진 ${i + 1} 크게 보기">${GS_I.peak}</button>`).join('')}</div>
  <div class="vw on"><div class="dm" style="opacity:.9"></div><div class="tp" style="opacity:1">아래로 끌어 닫기</div><div class="ph" style="--c:var(--accent);opacity:1">${GS_I.peak}</div></div></div>`,
    run(el, ctx) {
      const sc = el.querySelector('.sc'), vw = el.querySelector('.vw'), dm = el.querySelector('.dm');
      const tp = el.querySelector('.tp'), ph = el.querySelector('.ph'), tbs = [...el.querySelectorAll('.tb')];
      const EASE = 'transform .3s cubic-bezier(.2,.8,.2,1),opacity .3s';
      let busy = true, open = true, cur = 0, dy = 0;
      /* 사진(중심 118,90)을 썸네일 자리로 옮기는 변환 */
      const toThumb = i => `translate(${12 + (i % 3) * 74 + 32 - 118}px,${40 + Math.floor(i / 3) * 66 + 28 - 90}px) scale(.32)`;
      const fade = (v, anim) => {
        dm.style.transition = tp.style.transition = anim ? 'opacity .3s' : 'none';
        dm.style.opacity = .9 * v; tp.style.opacity = v;
      };
      const set = (x, y) => {
        dy = Math.max(0, y);
        ph.style.transition = 'none';
        ph.style.transform = `translate(${x * .5}px,${dy}px) scale(${1 - Math.min(dy, 120) / 400})`;
        fade(1 - Math.min(1, dy / 130), false);
      };
      const close = () => {
        open = false;
        vw.classList.remove('on');
        ph.style.transition = EASE;
        ph.style.transform = toThumb(cur);
        ph.style.opacity = 0;
        fade(0, true);
      };
      const show = i => {
        cur = i; open = true; dy = 0;
        ph.style.setProperty('--c', tbs[i].style.getPropertyValue('--c'));
        ph.style.transition = 'none';
        ph.style.transform = toThumb(i);
        ph.style.opacity = 0;
        void ph.offsetWidth;
        vw.classList.add('on');
        ph.style.transition = EASE;
        ph.style.transform = 'none';
        ph.style.opacity = 1;
        fade(1, true);
      };
      const rel = () => {
        if (dy > 60) close();
        else { ph.style.transition = EASE; ph.style.transform = 'none'; fade(1, true); dy = 0; }
      };
      const f = gsFg(sc);
      gsTl(ctx).wait(350).call(() => f.at(118, 84).down())
        .tw(850, q => { set(16 * q, 88 * q); f.at(118 + 8 * q, 84 + 88 * q); }, gsIO)
        .wait(160).call(() => { f.up(); rel(); })
        .wait(350).call(() => { busy = false; });
      gsDrag(el, ctx, {
        start: e => (!busy && open && e.target.closest('.ph') ? {} : null),
        move: (dx, y) => set(dx, y),
        end: rel
      });
      tbs.forEach((b, i) => ctx.on(b, 'click', () => { if (!busy && !open) show(i); }));
    }
  },

  /* gs09 크기 조절 핸들 */
  {
    id: 'gs09', ko: '크기 조절 핸들', en: 'Resize handle',
    desc: '두 패널 사이 경계선을 좌우로 끌어 너비 비율을 바꿔요.',
    prompt: '「크기 조절 핸들(Resize handle)」이 있는 2단 패널을 만들어 줘. 목록과 미리보기 사이 경계선(잡는 영역 14px)에 올리면 커서가 col-resize로 바뀌고 선이 파란색이 되며, 끄는 동안 왼쪽 패널 너비가 포인터를 따라 24~76% 범위에서 지연 없이 바뀌어. 경계선에 role="separator"를 달고 좌우 화살표 키로 5%씩 조절되게 해 줘.',
    css: gsSc('gs09') + `
.d-gs09 .sc{display:flex}
.d-gs09 .pl{flex:none;width:84px;background:var(--surface-2);padding:12px 10px;box-sizing:border-box;display:flex;flex-direction:column;gap:8px;overflow:hidden}
.d-gs09 .pr{flex:1;min-width:0;padding:12px 12px;box-sizing:border-box;display:flex;flex-direction:column;gap:8px;overflow:hidden}
.d-gs09 .pl b,.d-gs09 .pr b{font-size:12px;color:var(--text);white-space:nowrap}
.d-gs09 .it{display:flex;align-items:center;gap:6px;flex:none}
.d-gs09 .it i{width:14px;height:14px;border-radius:4px;background:var(--accent-soft);flex:none}
.d-gs09 .it .ui-line{flex:1}
.d-gs09 .pr .ui-thumb{height:66px;flex:none}
.d-gs09 .pc{margin-top:auto;font-size:11px;font-weight:700;color:var(--muted);font-variant-numeric:tabular-nums;white-space:nowrap}
.d-gs09 .dv{position:absolute;top:0;bottom:0;left:77px;width:14px;cursor:col-resize;touch-action:none;z-index:4;outline:none}
.d-gs09 .dv::before{content:"";position:absolute;left:6px;top:0;bottom:0;width:2px;background:var(--line);transition:background .15s}
.d-gs09 .dv::after{content:"";position:absolute;left:3px;top:50%;width:8px;height:34px;margin-top:-17px;border-radius:4px;background:var(--surface);border:1.5px solid var(--line);box-sizing:border-box;transition:border-color .15s,background .15s}
.d-gs09 .dv:hover::before,.d-gs09 .dv.on::before,.d-gs09 .dv:focus-visible::before{background:var(--accent)}
.d-gs09 .dv:hover::after,.d-gs09 .dv.on::after,.d-gs09 .dv:focus-visible::after{border-color:var(--accent);background:var(--accent)}
`,
    html: `<div class="sc"><div class="pl"><b>목록</b>
  <div class="it"><i></i><span class="ui-line"></span></div><div class="it"><i></i><span class="ui-line"></span></div><div class="it"><i></i><span class="ui-line"></span></div>
  <span class="pc">36%</span></div>
  <div class="pr"><b>미리보기</b><div class="ui-thumb"></div><div class="ui-line" style="width:80%"></div><span class="pc">64%</span></div>
  <div class="dv" role="separator" tabindex="0" aria-orientation="vertical" aria-label="패널 너비 조절" aria-valuemin="24" aria-valuemax="76" aria-valuenow="36"></div></div>`,
    run(el, ctx) {
      const sc = el.querySelector('.sc'), pl = el.querySelector('.pl'), dv = el.querySelector('.dv');
      const pcs = el.querySelectorAll('.pc'), T = 236, MIN = 57, MAX = 179;
      let w = 84, busy = true;
      const set = v => {
        w = gsClamp(v, MIN, MAX);
        const pc = Math.round(w / T * 100);
        pl.style.width = w + 'px';
        dv.style.left = (w - 7) + 'px';
        pcs[0].textContent = pc + '%'; pcs[1].textContent = (100 - pc) + '%';
        dv.setAttribute('aria-valuenow', pc);
      };
      const f = gsFg(sc);
      gsTl(ctx).wait(300).call(() => { f.at(84, 88).down(); dv.classList.add('on'); })
        .wait(120).tw(700, q => { set(gsMix(84, 166, q)); f.at(w, 88); }, gsIO)
        .wait(160).tw(560, q => { set(gsMix(166, 118, q)); f.at(w, 88); }, gsIO)
        .wait(140).call(() => { f.up(); dv.classList.remove('on'); busy = false; });
      gsDrag(el, ctx, {
        start: e => { if (busy || !e.target.closest('.dv')) return null; dv.classList.add('on'); return { w0: w }; },
        move: (dx, dy, s) => set(s.w0 + dx),
        end: () => dv.classList.remove('on')
      });
      ctx.on(dv, 'keydown', e => {
        if (busy || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return;
        e.preventDefault();
        set(w + (e.key === 'ArrowLeft' ? -12 : 12));
      });
    }
  }
]);
