/* media — 미디어 (md01~md08) */
const mdI = {
  play: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
  pause: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4.2" height="14" rx="1.2"/><rect x="13.8" y="5" width="4.2" height="14" rx="1.2"/></svg>',
  rw: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M12 5.5a7.5 7.5 0 1 0 7.5 7.5"/><path d="M12 2.4v6.2L7.8 5.5z" fill="currentColor" stroke="none"/><text x="12" y="15.6" font-size="6.6" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">10</text></svg>',
  fw: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><g transform="translate(24 0) scale(-1 1)"><path d="M12 5.5a7.5 7.5 0 1 0 7.5 7.5"/><path d="M12 2.4v6.2L7.8 5.5z" fill="currentColor" stroke="none"/></g><text x="12" y="15.6" font-size="6.6" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">10</text></svg>',
  heart: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z"/></svg>',
  chat: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 5.5h16a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H10l-4.6 3.4V17H4a1 1 0 0 1-1-1V6.500a1 1 0 0 1 1-1z"/></svg>',
  share: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 4.5 21 11.6l-7.500 7.100v-4.300c-4.600-.200-7.800 1.200-10 4.600.500-5.600 3.700-9.400 10-10.100z"/></svg>',
  cursor: '<svg width="16" height="18" viewBox="0 0 16 18" aria-hidden="true"><path d="M2 1.500v13l3.600-3.200 2.300 5.200 2.300-1-2.300-5.100H13z" fill="#14171c" stroke="#fff" stroke-width="1.300" stroke-linejoin="round"/></svg>'
};
/* 터치 포인트(손가락) — 스테이지 좌표 기준 */
const mdDot = stage => {
  const d = document.createElement('span');
  d.style.cssText = 'position:absolute;left:0;top:0;width:26px;height:26px;margin:-13px 0 0 -13px;border-radius:50%;background:rgba(255,255,255,.5);border:1.500px solid rgba(20,23,28,.42);box-shadow:0 2px 6px rgba(0,0,0,.25);pointer-events:none;z-index:40;opacity:0;transition:opacity .2s';
  stage.appendChild(d);
  return {
    at(x, y, s) { d.style.transform = `translate(${x}px,${y}px) scale(${s || 1})`; },
    show() { d.style.opacity = 1; },
    hide() { d.style.opacity = 0; }
  };
};
const mdC = (stage, t) => {
  const s = stage.getBoundingClientRect(), r = t.getBoundingClientRect();
  return [r.left - s.left + r.width / 2, r.top - s.top + r.height / 2];
};
const mdTap = (stage, t) => {
  if (!t) return;
  const [x, y] = mdC(stage, t);
  const d = document.createElement('span');
  d.style.cssText = `position:absolute;left:${x - 14}px;top:${y - 14}px;width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,.6);border:1.500px solid rgba(20,23,28,.4);pointer-events:none;z-index:40;opacity:0`;
  stage.appendChild(d);
  const a = d.animate([{ transform: 'scale(.5)', opacity: .7 }, { transform: 'scale(1.5)', opacity: 0 }], { duration: 520, easing: 'ease-out' });
  a.onfinish = () => d.remove();
};
const mdEase = p => 1 - Math.pow(1 - Math.min(1, Math.max(0, p)), 3);
const mdClamp = (v, a, b) => Math.min(b, Math.max(a, v));
const mdFmt = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
/* 영상 화면(어두운 풍경) — id별 스코프 */
const mdVid = id => `
.d-${id} .vid{position:relative;overflow:hidden;border-radius:14px;background:linear-gradient(165deg,color-mix(in srgb,var(--accent) 62%,#0d1220),#0d1220 82%);color:#fff;box-shadow:var(--shadow)}
.d-${id} .sun{position:absolute;left:62%;top:20%;width:30px;height:30px;border-radius:50%;background:var(--warn);opacity:.92}
.d-${id} .hill{position:absolute;left:-12%;right:-12%;bottom:-46%;height:78%;border-radius:50%;background:color-mix(in srgb,var(--success) 46%,#0d1220)}
`;
const mdScene = '<i class="sun"></i><i class="hill"></i>';
const mdBag = `<svg viewBox="0 0 116 116" aria-hidden="true">
<path d="M43 30V20a15 15 0 0 1 30 0v10" fill="none" style="stroke:var(--text)" stroke-width="4" stroke-linecap="round"/>
<rect x="24" y="28" width="68" height="76" rx="16" style="fill:var(--accent)"/>
<path d="M24 50h68" style="stroke:color-mix(in srgb,var(--accent) 60%,#0d1220)" stroke-width="2"/>
<path d="M30 44h56" fill="none" style="stroke:var(--accent-text)" stroke-width="1.200" stroke-dasharray="3 2.500" opacity=".8"/>
<rect x="34" y="62" width="48" height="32" rx="8" style="fill:color-mix(in srgb,var(--accent) 68%,#0d1220)"/>
<rect x="37.500" y="65.500" width="41" height="25" rx="5.500" fill="none" style="stroke:var(--accent-text)" stroke-width="1" stroke-dasharray="2.500 2" opacity=".75"/>
<path d="M40 73h36" style="stroke:var(--warn)" stroke-width="2.400" stroke-linecap="round"/>
<circle cx="76" cy="73" r="3.200" style="fill:var(--warn)"/>
<rect x="52" y="32" width="12" height="9" rx="2" style="fill:var(--surface)"/>
<rect x="68" y="80" width="11" height="7" rx="1.500" style="fill:var(--surface)"/>
<text x="73.500" y="85.500" font-size="4.600" font-weight="700" text-anchor="middle" style="fill:var(--text)">30L</text>
<rect x="18" y="58" width="8" height="30" rx="4" style="fill:color-mix(in srgb,var(--accent) 60%,#0d1220)"/>
<rect x="90" y="58" width="8" height="30" rx="4" style="fill:color-mix(in srgb,var(--accent) 60%,#0d1220)"/>
</svg>`;

UIDEX.add('media', [
  /* md01 플레이어 컨트롤 */
  {
    id: 'md01', ko: '플레이어 컨트롤', en: 'Player controls',
    desc: '영상 위 재생·10초 이동 버튼이 잠시 뒤 숨고, 탭하면 다시 나와요.',
    prompt: '「플레이어 컨트롤(Player controls)」을 만들어 줘. 영상 위에 35% 딤과 함께 10초 뒤로·재생/일시정지·10초 앞으로 버튼을 겹쳐 띄우고, 3초간 조작이 없으면 250ms 페이드로 숨겼다가 영상을 탭하면 다시 보여 줘. 일시정지 중에는 숨기지 말고, 버튼은 44px 이상에 aria-label을 붙이고 스페이스·좌우 화살표 키로도 조작되게 해 줘.',
    css: mdVid('md01') + `
.d-md01 .wrap{display:flex;flex-direction:column;align-items:center;gap:8px;width:236px}
.d-md01 .vid{width:236px;height:136px;cursor:pointer;user-select:none}
.d-md01 .ctl{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:16px;background:rgba(6,9,16,.35);transition:opacity .25s ease-out}
.d-md01 .b{width:40px;height:40px;border-radius:50%;border:0;padding:0;display:grid;place-items:center;background:rgba(255,255,255,.16);color:#fff;cursor:pointer;transition:transform .15s,background .15s}
.d-md01 .b:active,.d-md01 .b.hit{transform:scale(.88);background:rgba(255,255,255,.34)}
.d-md01 .b.pp{width:48px;height:48px;background:rgba(255,255,255,.92);color:#14171c}
.d-md01 .b.pp svg{width:22px;height:22px}
.d-md01 .tm{position:absolute;left:12px;bottom:14px;font-size:11px;font-weight:600;font-variant-numeric:tabular-nums;transition:opacity .25s}
.d-md01 .vid.hide .ctl,.d-md01 .vid.hide .tm{opacity:0;pointer-events:none}
.d-md01 .skip{position:absolute;top:50%;right:18px;margin-top:-44px;padding:3px 8px;border-radius:999px;background:rgba(6,9,16,.6);font-size:11px;font-weight:700;opacity:0;pointer-events:none}
.d-md01 .skip.l{right:auto;left:18px}
.d-md01 .skip.on{animation:md01-skip .7s ease-out}
@keyframes md01-skip{0%{opacity:0;transform:translateY(4px)}25%{opacity:1;transform:none}70%{opacity:1}100%{opacity:0}}
.d-md01 .pg{position:absolute;left:0;right:0;bottom:0;height:3px;background:rgba(255,255,255,.28)}
.d-md01 .pg i{display:block;height:100%;width:21%;background:var(--accent);transition:width .25s linear}
.d-md01 .cap{margin:0;font-size:11px;color:var(--muted);text-align:center;white-space:nowrap}
`,
    html: `<div class="wrap"><div class="vid" role="group" aria-label="영상 플레이어">${mdScene}
  <div class="ctl">
    <button class="b rw" type="button" aria-label="10초 뒤로">${mdI.rw}</button>
    <button class="b pp" type="button" aria-label="일시정지">${mdI.pause}</button>
    <button class="b fw" type="button" aria-label="10초 앞으로">${mdI.fw}</button>
  </div>
  <span class="skip">+10초</span>
  <span class="tm">0:42 / 3:20</span>
  <div class="pg"><i></i></div>
</div><p class="cap" role="status">컨트롤 표시 중</p></div>`,
    run(el, ctx) {
      const vid = el.querySelector('.vid'), pp = el.querySelector('.pp'), fw = el.querySelector('.fw'), rw = el.querySelector('.rw');
      const tm = el.querySelector('.tm'), bar = el.querySelector('.pg i'), skip = el.querySelector('.skip'), cap = el.querySelector('.cap'), sun = el.querySelector('.sun');
      const DUR = 200;
      let t = 42, playing = true, ht = null;
      const paint = () => {
        tm.textContent = `${mdFmt(t)} / ${mdFmt(DUR)}`; bar.style.width = (t / DUR * 100) + '%';
        sun.style.left = (20 + t / DUR * 60) + '%';
      };
      const hide = () => { if (!playing) return; vid.classList.add('hide'); cap.textContent = '숨김 — 영상을 탭하면 다시 나와요'; };
      const show = ms => {
        vid.classList.remove('hide'); clearTimeout(ht);
        cap.textContent = playing ? '컨트롤 표시 중 · 잠시 뒤 자동 숨김' : '일시정지 — 컨트롤 계속 표시';
        if (playing) ht = ctx.timeout(hide, ms || 3000);
      };
      const jump = d => {
        t = mdClamp(t + d, 0, DUR); paint();
        skip.textContent = (d > 0 ? '+' : '−') + '10초'; skip.classList.toggle('l', d < 0);
        skip.classList.remove('on'); void skip.offsetWidth; skip.classList.add('on');
      };
      const toggle = () => {
        playing = !playing; pp.innerHTML = playing ? mdI.pause : mdI.play;
        pp.setAttribute('aria-label', playing ? '일시정지' : '재생');
      };
      paint(); show(1900);
      ctx.interval(() => { if (playing) { t = t >= DUR ? 0 : t + .25; paint(); } }, 250);
      /* 자동 시연: +10초 탭 → 자동 숨김 → 영상 탭으로 다시 표시 */
      ctx.timeout(() => { mdTap(el, fw); fw.classList.add('hit'); jump(10); show(1000); }, 800);
      ctx.timeout(() => fw.classList.remove('hit'), 1000);
      ctx.timeout(() => { if (vid.classList.contains('hide')) { mdTap(el, vid); show(3000); } }, 3400);
      ctx.on(vid, 'click', () => { if (vid.classList.contains('hide')) show(); else { clearTimeout(ht); hide(); } });
      ctx.on(pp, 'click', e => { e.stopPropagation(); toggle(); show(); });
      ctx.on(fw, 'click', e => { e.stopPropagation(); jump(10); show(); });
      ctx.on(rw, 'click', e => { e.stopPropagation(); jump(-10); show(); });
    }
  },

  /* md02 시크 바 */
  {
    id: 'md02', ko: '시크 바', en: 'Seek bar', pair: 'pr02',
    desc: '진행 바와 달리 손잡이를 끌어 원하는 장면으로 바로 옮겨요.',
    prompt: '「시크 바(Seek bar)」를 만들어 줘. 4px 트랙에 재생된 구간을 채우고, 14px 손잡이를 끌면 트랙이 6px로 굵어지며 손잡이 위에 시간 말풍선과 미리보기 썸네일이 따라오고 놓으면 그 위치로 이동해. role="slider"와 aria-valuetext를 넣고 좌우 화살표로 5초씩 움직이게 해. 진행 바와 헷갈리지 않게 조작할 수 없는 표시 전용 막대로 만들지 마.',
    css: mdVid('md02') + `
.d-md02 .wrap{display:flex;flex-direction:column;width:236px}
.d-md02 .vid{width:236px;height:112px}
.d-md02 .sun{transition:left .3s ease-out,top .3s ease-out}
.d-md02 .pv{position:absolute;left:0;bottom:8px;width:66px;margin-left:-33px;display:flex;flex-direction:column;align-items:center;gap:3px;opacity:0;transform:translateY(6px) scale(.92);transform-origin:50% 100%;transition:opacity .15s,transform .2s cubic-bezier(.2,.8,.2,1);pointer-events:none}
.d-md02 .pv.on{opacity:1;transform:none}
.d-md02 .th{position:relative;overflow:hidden;width:66px;height:38px;border-radius:7px;border:2px solid #fff;box-sizing:border-box;background:linear-gradient(165deg,color-mix(in srgb,var(--accent) 62%,#0d1220),#0d1220 82%);box-shadow:0 4px 10px rgba(0,0,0,.4)}
.d-md02 .th .sun{width:11px;height:11px;transition:none}
.d-md02 .pv b{padding:2px 7px;border-radius:999px;background:rgba(6,9,16,.72);font-size:11px;font-weight:700;font-variant-numeric:tabular-nums}
.d-md02 .bar{position:relative;height:24px;margin-top:2px;cursor:pointer;touch-action:none;outline:none}
.d-md02 .trk{position:absolute;left:0;right:0;top:50%;height:4px;margin-top:-2px;border-radius:3px;background:var(--line);overflow:hidden;transition:height .15s,margin .15s}
.d-md02 .buf{position:absolute;left:0;top:0;bottom:0;width:78%;background:color-mix(in srgb,var(--muted) 38%,transparent)}
.d-md02 .fill{position:absolute;left:0;top:0;bottom:0;width:20%;background:var(--accent)}
.d-md02 .knob{position:absolute;left:20%;top:50%;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 0 color-mix(in srgb,var(--accent) 26%,transparent);transition:transform .15s,box-shadow .15s}
.d-md02 .bar.drag .trk{height:6px;margin-top:-3px}
.d-md02 .bar.drag .knob{transform:scale(1.2);box-shadow:0 0 0 7px color-mix(in srgb,var(--accent) 26%,transparent)}
.d-md02 .bar:focus-visible .knob{box-shadow:0 0 0 4px color-mix(in srgb,var(--accent) 40%,transparent)}
.d-md02 .tms{display:flex;justify-content:space-between;font-size:11px;color:var(--muted);font-variant-numeric:tabular-nums}
.d-md02 .tms .cur{color:var(--text);font-weight:700}
`,
    html: `<div class="wrap"><div class="vid">${mdScene}
  <div class="pv"><div class="th">${mdScene}</div><b>0:40</b></div>
</div>
<div class="bar" role="slider" tabindex="0" aria-label="재생 위치" aria-valuemin="0" aria-valuemax="200" aria-valuenow="40" aria-valuetext="0분 40초">
  <div class="trk"><i class="buf"></i><i class="fill"></i></div><span class="knob"></span>
</div>
<div class="tms"><span class="cur">0:40</span><span>3:20</span></div></div>`,
    run(el, ctx) {
      const bar = el.querySelector('.bar'), fill = el.querySelector('.fill'), knob = el.querySelector('.knob');
      const pv = el.querySelector('.pv'), pvT = pv.querySelector('b'), pvSun = pv.querySelector('.sun');
      const sun = el.querySelector('.vid > .sun'), cur = el.querySelector('.cur');
      const DUR = 200, W = 236;
      let p = .2, drag = false, auto = true;
      const sunAt = (s, q) => { s.style.left = (8 + q * 74) + '%'; s.style.top = (58 - Math.sin(q * Math.PI) * 44) + '%'; };
      const paint = commit => {
        fill.style.width = knob.style.left = (p * 100) + '%';
        pv.style.left = mdClamp(p * W, 37, W - 37) + 'px';
        pvT.textContent = mdFmt(p * DUR); sunAt(pvSun, p);
        bar.setAttribute('aria-valuenow', Math.round(p * DUR));
        bar.setAttribute('aria-valuetext', `${Math.floor(p * DUR / 60)}분 ${Math.floor(p * DUR % 60)}초`);
        if (commit) { cur.textContent = mdFmt(p * DUR); sunAt(sun, p); }
      };
      const grab = () => { drag = true; bar.classList.add('drag'); pv.classList.add('on'); };
      const drop = () => { if (!drag) return; drag = false; bar.classList.remove('drag'); pv.classList.remove('on'); paint(true); };
      const fromEv = e => { const r = bar.getBoundingClientRect(); p = mdClamp((e.clientX - r.left) / r.width, 0, 1); paint(false); };
      paint(true);
      /* 자동 시연: 손가락이 손잡이를 잡아 앞으로 끌었다가 살짝 되돌려 놓음 */
      const dot = mdDot(el);
      const place = () => { const [x, y] = mdC(el, knob); dot.at(x, y + 4, drag ? .9 : 1); };
      ctx.timeout(() => { if (!auto) return; place(); dot.show(); }, 350);
      ctx.timeout(() => {
        if (!auto) return; grab();
        ctx.loop(t => {
          if (!auto) return false;
          if (t < 900) p = .2 + .52 * mdEase(t / 900);
          else if (t < 1200) p = .72;
          else if (t < 1800) p = .72 - .14 * mdEase((t - 1200) / 600);
          else if (t < 2100) p = .58;
          else { drop(); dot.hide(); auto = false; return false; }
          paint(false); place();
        });
      }, 650);
      const stopAuto = () => { if (auto) { auto = false; dot.hide(); } };
      ctx.on(bar, 'pointerdown', e => { stopAuto(); grab(); fromEv(e); try { bar.setPointerCapture(e.pointerId); } catch (_) {} });
      ctx.on(el, 'pointermove', e => { if (drag && !auto) fromEv(e); });
      ctx.on(el, 'pointerup', () => { if (!auto) drop(); });
      ctx.on(el, 'pointercancel', () => { if (!auto) drop(); });
      ctx.on(el, 'pointerleave', () => { if (!auto) drop(); });
      ctx.on(bar, 'keydown', e => {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        e.preventDefault(); stopAuto(); drop();
        p = mdClamp(p + (e.key === 'ArrowRight' ? 5 : -5) / DUR, 0, 1); paint(true);
      });
    }
  },

  /* md03 미니 플레이어 */
  {
    id: 'md03', ko: '미니 플레이어', en: 'Mini player',
    desc: '영상을 아래로 내리면 구석 작은 창으로 줄어 계속 재생돼요.',
    prompt: '「미니 플레이어(Mini player)」를 만들어 줘. 재생 중인 영상을 아래로 끌어내리면 손가락을 따라 줄어들다가 35% 이상 내리면 300ms cubic-bezier(.2,.8,.2,1)로 화면 오른쪽 아래 16:9 작은 창에 붙고, 재생은 끊기지 않아. 작은 창을 탭하면 원래 크기로 돌아오게 하고, prefers-reduced-motion이면 크기 변화 없이 바로 전환해 줘.',
    css: mdVid('md03') + `
.d-md03 .ph{position:relative;width:220px;height:180px;border-radius:18px;background:var(--surface);box-shadow:var(--shadow);overflow:hidden;user-select:none}
.d-md03 .fd{position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:9px;box-sizing:border-box}
.d-md03 .fd b{font-size:13px;color:var(--text)}
.d-md03 .r{display:flex;gap:9px;align-items:center}
.d-md03 .r i{width:58px;height:34px;border-radius:7px;background:var(--accent-soft);flex:none}
.d-md03 .r span{flex:1;display:flex;flex-direction:column;gap:6px}
.d-md03 .dt{position:absolute;left:0;right:0;top:124px;bottom:0;background:var(--surface);padding:10px 12px;display:flex;flex-direction:column;gap:7px;box-sizing:border-box}
.d-md03 .dt b{font-size:13px;color:var(--text)}
.d-md03 .dt small{font-size:11px;color:var(--muted)}
.d-md03 .vid{position:absolute;left:0;top:0;width:220px;height:124px;border-radius:0;cursor:grab;touch-action:none;box-shadow:0 6px 16px rgba(0,0,0,.3)}
.d-md03 .sn .vid,.d-md03 .sn .dt{transition:all .3s cubic-bezier(.2,.8,.2,1)}
.d-md03 .sun{animation:md03-sun 6s ease-in-out infinite alternate}
@keyframes md03-sun{from{left:16%;top:34%}to{left:76%;top:12%}}
.d-md03 .eq{position:absolute;left:8px;top:8px;display:flex;align-items:flex-end;gap:2px;height:12px}
.d-md03 .eq i{width:3px;height:100%;border-radius:1px;background:#fff;transform-origin:50% 100%;animation:md03-eq .7s ease-in-out infinite alternate}
.d-md03 .eq i:nth-child(2){animation-delay:-.3s}
.d-md03 .eq i:nth-child(3){animation-delay:-.5s}
@keyframes md03-eq{from{transform:scaleY(.25)}to{transform:scaleY(1)}}
.d-md03 .pg{position:absolute;left:0;right:0;bottom:0;height:3px;background:rgba(255,255,255,.28)}
.d-md03 .pg i{display:block;height:100%;width:30%;background:var(--accent)}
`,
    html: `<div class="ph sn">
  <div class="fd"><b>추천 영상</b>
    <div class="r"><i></i><span><em class="ui-line" style="width:88%"></em><em class="ui-line" style="width:56%"></em></span></div>
    <div class="r"><i></i><span><em class="ui-line" style="width:74%"></em><em class="ui-line" style="width:48%"></em></span></div>
    <div class="r"><i></i><span><em class="ui-line" style="width:60%"></em></span></div>
  </div>
  <div class="dt"><b>제주 동쪽 해안 걷기</b><small>조회 1.2만 · 3일 전</small></div>
  <div class="vid" role="button" tabindex="0" aria-label="영상 — 아래로 내리면 작은 창으로 재생">${mdScene}<span class="eq"><i></i><i></i><i></i></span><div class="pg"><i></i></div></div>
</div>`,
    run(el, ctx) {
      const ph = el.querySelector('.ph'), vid = el.querySelector('.vid'), dt = el.querySelector('.dt'), bar = el.querySelector('.pg i');
      const lerp = (a, b, q) => a + (b - a) * q;
      let p = 0, auto = true, dn = null;
      const apply = q => {
        p = mdClamp(q, 0, 1);
        vid.style.width = lerp(220, 104, p) + 'px'; vid.style.height = lerp(124, 58.500, p) + 'px';
        vid.style.left = lerp(0, 108, p) + 'px'; vid.style.top = lerp(0, 113.500, p) + 'px';
        vid.style.borderRadius = lerp(0, 10, p) + 'px';
        dt.style.opacity = 1 - p; dt.style.transform = `translateY(${p * 46}px)`;
        dt.style.pointerEvents = p > .5 ? 'none' : '';
        vid.setAttribute('aria-label', p > .5 ? '작은 창으로 재생 중 — 누르면 크게 보기' : '영상 — 아래로 내리면 작은 창으로 재생');
      };
      const snap = q => { ph.classList.add('sn'); apply(q); };
      apply(0);
      ctx.loop(t => { bar.style.width = (30 + (t / 400) % 70) + '%'; });
      /* 자동 시연: 손가락이 영상을 아래로 끌어내림 */
      const dot = mdDot(el);
      const [cx, cy] = mdC(el, vid);
      ctx.timeout(() => { if (auto) { dot.at(cx, cy - 10); dot.show(); } }, 450);
      ctx.timeout(() => {
        if (!auto) return; ph.classList.remove('sn');
        ctx.loop(t => {
          if (!auto) return false;
          if (t < 750) { const d = 72 * mdEase(t / 750); dot.at(cx + d * .3, cy - 10 + d, .9); apply(d / 110); }
          else { snap(1); dot.hide(); auto = false; return false; }
        });
      }, 750);
      ctx.on(vid, 'pointerdown', e => {
        if (auto) { auto = false; dot.hide(); }
        dn = { y: e.clientY, p0: p > .5 ? 1 : 0, mv: 0 }; ph.classList.remove('sn');
        try { vid.setPointerCapture(e.pointerId); } catch (_) {}
      });
      ctx.on(el, 'pointermove', e => {
        if (!dn) return;
        const dy = e.clientY - dn.y; dn.mv = Math.max(dn.mv, Math.abs(dy));
        apply(dn.p0 + dy / 110);
      });
      const up = () => {
        if (!dn) return;
        const tap = dn.mv < 5, was = dn.p0; dn = null;
        if (tap) snap(was ? 0 : was); else snap(was ? (p < .65 ? 0 : 1) : (p > .35 ? 1 : 0));
      };
      ctx.on(el, 'pointerup', up); ctx.on(el, 'pointercancel', up); ctx.on(el, 'pointerleave', up);
      ctx.on(vid, 'keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); auto = false; dot.hide(); snap(p > .5 ? 0 : 1); } });
    }
  },

  /* md04 스토리 링 */
  {
    id: 'md04', ko: '스토리 링', en: 'Story ring', pair: 'pr13',
    desc: '스토리 진행 바와 달리 프로필 둘레 링 색으로 새 소식 여부만 알려요.',
    prompt: '「스토리 링(Story ring)」을 만들어 줘. 프로필 원 둘레에 3px 그라데이션 링을 둘러 새 소식이 있음을 알리고, 누르면 링이 0.7초 동안 한 바퀴 돈 뒤 회색 링으로 바뀌어 본 상태가 돼. 안 본 프로필을 앞쪽에 두고 aria-label에 "새 소식 있음"을 넣어 줘. 스토리 진행 바와 헷갈리지 않게 링에 재생 진행률을 채우지 마.',
    css: `
.d-md04 .sc{width:236px;height:176px;border-radius:18px;background:var(--surface);box-shadow:var(--shadow);padding:13px 14px;box-sizing:border-box;display:flex;flex-direction:column;gap:10px;overflow:hidden}
.d-md04 .hd{display:flex;justify-content:space-between;align-items:center}
.d-md04 .hd b{font-size:13px;color:var(--text)}
.d-md04 .hd span{font-size:11px;font-weight:700;color:var(--accent);font-variant-numeric:tabular-nums}
.d-md04 .row{display:flex;justify-content:space-between}
.d-md04 .s{width:50px;border:0;padding:0;background:none;font:inherit;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:5px}
.d-md04 .rg{position:relative;width:48px;height:48px;border-radius:50%;background:var(--line);display:grid;place-items:center;transition:transform .15s}
.d-md04 .rg::before{content:"";position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 210deg,var(--warn),var(--danger),var(--accent),var(--warn));transition:opacity .35s ease-out}
.d-md04 .av{position:relative;width:42px;height:42px;border-radius:50%;box-sizing:border-box;border:2px solid var(--surface);background:var(--accent-soft);color:var(--accent);display:grid;place-items:center;font-size:14px;font-weight:800}
.d-md04 .s em{font-style:normal;font-size:11px;font-weight:700;color:var(--text);white-space:nowrap;transition:color .3s}
.d-md04 .s.open .rg{transform:scale(.92)}
.d-md04 .s.open .rg::before{animation:md04-spin .7s cubic-bezier(.4,0,.2,1)}
@keyframes md04-spin{to{transform:rotate(360deg)}}
.d-md04 .s.seen .rg::before{opacity:0}
.d-md04 .s.seen em{color:var(--muted);font-weight:500}
.d-md04 .post{display:flex;gap:9px;align-items:center;margin-top:auto;padding-top:10px;border-top:1px solid var(--line)}
.d-md04 .post i{width:44px;height:44px;border-radius:9px;background:var(--surface-2);flex:none}
.d-md04 .post span{flex:1;display:flex;flex-direction:column;gap:7px}
`,
    html: `<div class="sc"><div class="hd"><b>스토리</b><span role="status">새 소식 3</span></div>
  <div class="row">
    <button class="s" type="button"><span class="rg"><span class="av">여</span></span><em>여행메이트</em></button>
    <button class="s" type="button"><span class="rg"><span class="av">캠</span></span><em>캠핑러</em></button>
    <button class="s" type="button"><span class="rg"><span class="av">브</span></span><em>브런치</em></button>
    <button class="s seen" type="button"><span class="rg"><span class="av">러</span></span><em>러닝크루</em></button>
  </div>
  <div class="post"><i></i><span><em class="ui-line" style="width:82%"></em><em class="ui-line" style="width:54%"></em></span></div></div>`,
    run(el, ctx) {
      const ss = [...el.querySelectorAll('.s')], cnt = el.querySelector('.hd span');
      const label = () => {
        const n = ss.filter(s => !s.classList.contains('seen')).length;
        cnt.textContent = n ? `새 소식 ${n}` : '모두 봤어요';
        ss.forEach(s => s.setAttribute('aria-label', `${s.querySelector('em').textContent} 스토리, ${s.classList.contains('seen') ? '확인함' : '새 소식 있음'}`));
      };
      const open = s => {
        if (s.classList.contains('open')) return;
        s.classList.add('open');
        ctx.timeout(() => { s.classList.remove('open'); s.classList.add('seen'); label(); }, 700);
      };
      label();
      ctx.timeout(() => { mdTap(el, ss[0].querySelector('.rg')); open(ss[0]); }, 500);
      ctx.timeout(() => { mdTap(el, ss[1].querySelector('.rg')); open(ss[1]); }, 1500);
      ss.forEach(s => ctx.on(s, 'click', () => open(s)));
    }
  },

  /* md05 세로 피드 */
  {
    id: 'md05', ko: '세로 피드', en: 'Vertical feed', pair: 'mo13',
    desc: '화면 꽉 찬 세로 영상을 위로 넘기면 다음 영상이 한 장씩 딱 올라와요.',
    prompt: '「세로 피드(Vertical feed)」를 만들어 줘. 화면을 꽉 채운 세로 영상을 위로 넘기면 scroll-snap(mandatory)으로 다음 영상이 한 장씩 딱 맞게 올라오고, 오른쪽에 좋아요·댓글·공유 버튼을 세로로 쌓아. 화면에 보이는 영상만 재생하고 버튼마다 aria-label을 붙여 줘. 스크롤 스냅과 헷갈리지 않게 한 화면에 카드 여러 장이 걸쳐 보이게 하지 마.',
    css: `
.d-md05 .ph{position:relative;width:140px;height:184px;border-radius:16px;overflow:hidden;box-shadow:var(--shadow);background:#0d1220}
.d-md05 .sc{position:absolute;inset:0;overflow-y:auto;scroll-snap-type:y mandatory;scrollbar-width:none;overscroll-behavior:contain}
.d-md05 .sc::-webkit-scrollbar{display:none}
.d-md05 .sc.auto{scroll-snap-type:none}
.d-md05 .v{position:relative;height:184px;scroll-snap-align:start;scroll-snap-stop:always;overflow:hidden;color:#fff;background:linear-gradient(170deg,color-mix(in srgb,var(--c) 70%,#0d1220),#0d1220 88%)}
.d-md05 .v::before{content:"";position:absolute;left:14px;top:26px;width:54px;height:54px;border-radius:50%;background:color-mix(in srgb,var(--c) 80%,#fff);opacity:.5}
.d-md05 .v::after{content:"";position:absolute;left:-20%;right:-20%;bottom:-52px;height:110px;border-radius:50%;background:color-mix(in srgb,var(--c) 34%,#0d1220)}
.d-md05 .no{position:absolute;left:10px;top:9px;z-index:1;font-size:11px;font-weight:700;padding:2px 7px;border-radius:999px;background:rgba(6,9,16,.45);font-variant-numeric:tabular-nums}
.d-md05 .tx{position:absolute;left:10px;right:44px;bottom:12px;z-index:1;font-size:12px;font-weight:700;line-height:1.35;word-break:keep-all;text-shadow:0 1px 3px rgba(0,0,0,.5)}
.d-md05 .tx small{display:block;font-size:11px;font-weight:500;opacity:.85}
.d-md05 .rail{position:absolute;right:5px;bottom:10px;z-index:1;display:flex;flex-direction:column;gap:5px}
.d-md05 .rail button{width:34px;border:0;padding:0;background:none;color:#fff;font:inherit;font-size:11px;font-weight:600;display:flex;flex-direction:column;align-items:center;gap:1px;cursor:pointer;text-shadow:0 1px 3px rgba(0,0,0,.5)}
.d-md05 .rail svg{filter:drop-shadow(0 1px 2px rgba(0,0,0,.45));transition:transform .2s cubic-bezier(.2,.8,.2,1)}
.d-md05 .rail .lk.on{color:var(--danger)}
.d-md05 .rail .lk.on svg{transform:scale(1.18)}
.d-md05 .pl{position:absolute;left:0;right:0;bottom:0;height:2px;z-index:1;background:rgba(255,255,255,.3)}
.d-md05 .pl i{display:block;width:0;height:100%;background:#fff}
.d-md05 .v.cur .pl i{animation:md05-play 5s linear infinite}
@keyframes md05-play{from{width:0}to{width:100%}}
`,
    html: `<div class="ph"><div class="sc auto" tabindex="0" aria-label="세로 영상 피드">${[
      ['var(--accent)', '제주 해안 산책', '바람 소리 그대로', '1.2만', '86'],
      ['var(--danger)', '캠핑 불멍 10초', '장작 타는 소리', '8,410', '132'],
      ['var(--success)', '숲길 아침 러닝', '5km 숲길 코스', '3,902', '41'],
      ['var(--warn)', '오늘의 브런치', '10분 완성 레시피', '2.7만', '310']
    ].map((v, i) => `<section class="v" style="--c:${v[0]}"><span class="no">${i + 1} / 4</span>
      <div class="tx">${v[1]}<small>${v[2]}</small></div>
      <div class="rail"><button class="lk" type="button" aria-label="좋아요" aria-pressed="false">${mdI.heart}<span>${v[3]}</span></button><button type="button" aria-label="댓글 ${v[4]}개">${mdI.chat}<span>${v[4]}</span></button><button type="button" aria-label="공유">${mdI.share}<span>공유</span></button></div>
      <div class="pl"><i></i></div></section>`).join('')}</div></div>`,
    run(el, ctx) {
      const sc = el.querySelector('.sc'), H = 184;
      let auto = true;
      const dot = mdDot(el);
      const [cx, cy] = mdC(el, sc);
      const endAuto = () => { if (!auto) return; auto = false; dot.hide(); sc.scrollTop = Math.round(sc.scrollTop / H) * H; sc.classList.remove('auto'); };
      /* 자동 시연: 손가락이 위로 쓸어 올리면 다음 영상이 딱 맞춰 올라옴 (2회) */
      const swipe = (from, done) => {
        dot.at(cx - 14, cy + 44); dot.show();
        ctx.timeout(() => ctx.loop(t => {
          if (!auto) return false;
          if (t < 380) { const d = 96 * (t / 380); dot.at(cx - 14, cy + 44 - d, .9); sc.scrollTop = from + d; }
          else if (t < 700) { dot.hide(); sc.scrollTop = from + 96 + (H - 96) * mdEase((t - 380) / 320); }
          else { sc.scrollTop = from + H; if (done) done(); return false; }
        }), 220);
      };
      /* 화면에 보이는 영상 한 장만 재생(진행 바가 그 장에서만 돌고, 넘기면 처음부터) */
      const vs = el.querySelectorAll('.v');
      let curI = -1;
      const mark = () => { const i = mdClamp(Math.round(sc.scrollTop / H), 0, vs.length - 1); if (i === curI) return; curI = i; vs.forEach((v, k) => v.classList.toggle('cur', k === i)); };
      mark();
      ctx.on(sc, 'scroll', mark, { passive: true });
      ctx.timeout(() => { if (auto) swipe(0); }, 550);
      ctx.timeout(() => { if (auto) swipe(H, endAuto); }, 1750);
      ['pointerdown', 'wheel', 'touchstart', 'keydown'].forEach(ev => ctx.on(sc, ev, endAuto, { passive: true }));
      el.querySelectorAll('.lk').forEach(b => ctx.on(b, 'click', () => {
        const on = b.classList.toggle('on'); b.setAttribute('aria-pressed', on);
      }));
    }
  },

  /* md06 오디오 파형 */
  {
    id: 'md06', ko: '오디오 파형', en: 'Waveform',
    desc: '음성 메시지의 세로 막대 파형이 재생한 곳까지 색으로 차올라요.',
    prompt: '「오디오 파형(Waveform)」 음성 메시지를 만들어 줘. 재생 버튼 옆에 폭 3px 세로 막대 28개로 소리 크기를 그리고, 재생하면 지난 구간의 막대가 왼쪽부터 강조색으로 차며 남은 시간이 줄어들어. 파형을 누르면 그 위치로 이동하고 끝나면 처음으로 돌아가. 버튼의 aria-label을 재생/일시정지 상태에 맞춰 바꿔 줘.',
    css: `
.d-md06 .sc{width:236px;display:flex;flex-direction:column;gap:8px}
.d-md06 .in{align-self:flex-end;max-width:180px;padding:8px 12px;border-radius:14px 14px 4px 14px;background:var(--accent);color:var(--accent-text);font-size:12px;font-weight:600;word-break:keep-all}
.d-md06 .vm{align-self:flex-start;display:flex;align-items:center;gap:10px;padding:10px 14px 10px 10px;border-radius:14px 14px 14px 4px;background:var(--surface);box-shadow:var(--shadow)}
.d-md06 .pp{width:36px;height:36px;border-radius:50%;border:0;padding:0;flex:none;display:grid;place-items:center;background:var(--accent);color:var(--accent-text);cursor:pointer;transition:transform .15s}
.d-md06 .pp:active{transform:scale(.92)}
.d-md06 .col{display:flex;flex-direction:column;gap:4px}
.d-md06 .wv{display:flex;align-items:center;gap:2px;height:30px;cursor:pointer;touch-action:none}
.d-md06 .wv i{width:3px;border-radius:2px;background:color-mix(in srgb,var(--muted) 42%,transparent);transition:background .12s,transform .12s}
.d-md06 .wv i.on{background:var(--accent)}
.d-md06 .wv i.now{transform:scaleY(1.25)}
.d-md06 .ft{display:flex;justify-content:space-between;font-size:11px;color:var(--muted);font-variant-numeric:tabular-nums}
.d-md06 .ft b{color:var(--text);font-weight:700}
.d-md06 .nt{font-size:11px;color:var(--muted);padding-left:4px}
`,
    html: `<div class="sc"><div class="in">어디쯤이에요? 음성으로 알려 주세요</div>
  <div class="vm"><button class="pp" type="button" aria-label="음성 메시지 재생">${mdI.play}</button>
    <div class="col"><div class="wv" role="slider" tabindex="0" aria-label="재생 위치" aria-valuemin="0" aria-valuemax="8" aria-valuenow="0">${
      [8, 14, 22, 12, 18, 28, 20, 10, 16, 26, 30, 18, 9, 13, 24, 28, 15, 8, 12, 21, 27, 17, 11, 19, 25, 14, 9, 6].map(h => `<i style="height:${h}px"></i>`).join('')
    }</div><div class="ft"><b>0:00</b><span>남은 시간 0:08</span></div></div>
  </div>
  <span class="nt">오전 10:24 · 음성 메시지</span></div>`,
    run(el, ctx) {
      const pp = el.querySelector('.pp'), wv = el.querySelector('.wv'), bars = [...wv.children];
      const cur = el.querySelector('.ft b'), left = el.querySelector('.ft span');
      const DUR = 8, N = bars.length;
      let p = 0, playing = false, last = null;
      const paint = () => {
        const k = Math.min(N - 1, Math.floor(p * N));
        bars.forEach((b, i) => { b.classList.toggle('on', i < p * N); b.classList.toggle('now', playing && i === k); });
        cur.textContent = mdFmt(p * DUR); left.textContent = '남은 시간 ' + mdFmt(Math.ceil(DUR - p * DUR));
        wv.setAttribute('aria-valuenow', (p * DUR).toFixed(1));
      };
      const set = on => {
        playing = on; last = null; pp.innerHTML = on ? mdI.pause : mdI.play;
        pp.setAttribute('aria-label', on ? '음성 메시지 일시정지' : '음성 메시지 재생'); paint();
      };
      ctx.loop(t => {
        if (playing) {
          if (last != null) p += (t - last) / (DUR * 1000);
          last = t;
          if (p >= 1) { p = 0; set(false); } else paint();
        }
      });
      paint();
      ctx.timeout(() => { mdTap(el, pp); set(true); }, 350);
      ctx.on(pp, 'click', () => set(!playing));
      ctx.on(wv, 'pointerdown', e => { const r = wv.getBoundingClientRect(); p = mdClamp((e.clientX - r.left) / r.width, 0, .999); paint(); });
      ctx.on(wv, 'keydown', e => {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        e.preventDefault(); p = mdClamp(p + (e.key === 'ArrowRight' ? 1 : -1) / DUR, 0, .999); paint();
      });
    }
  },

  /* md07 자막 */
  {
    id: 'md07', ko: '자막', en: 'Captions',
    desc: '영상 아래 자막이 말에 맞춰 바뀌고, CC 버튼으로 켜고 꺼요.',
    prompt: '「자막(Captions)」을 만들어 줘. 영상 아래쪽 가운데에 반투명 검정 배경의 흰 글자 자막이 말하는 시점에 맞춰 150ms 페이드로 바뀌고, 한 번에 두 줄을 넘기지 않아. CC 버튼으로 켜고 끌 수 있게 하고 aria-pressed로 상태를 알려 줘. 자막 글자는 최소 12px, 배경과의 대비는 4.5:1 이상으로 지켜 줘.',
    css: mdVid('md07') + `
.d-md07 .wrap{display:flex;flex-direction:column;align-items:center;gap:8px;width:236px}
.d-md07 .vid{width:236px;height:138px}
.d-md07 .sun{animation:md07-sun 9s ease-in-out infinite alternate}
@keyframes md07-sun{from{left:18%}to{left:74%}}
.d-md07 .cp{position:absolute;left:10px;right:10px;bottom:40px;display:flex;justify-content:center;transition:opacity .2s,transform .2s}
.d-md07 .cp span{max-width:100%;padding:4px 9px;border-radius:5px;background:rgba(0,0,0,.78);color:#fff;font-size:12.500px;font-weight:600;line-height:1.4;text-align:center;word-break:keep-all;transition:opacity .15s}
.d-md07 .cp span.sw{opacity:0}
.d-md07 .vid.off .cp{opacity:0;transform:translateY(4px)}
.d-md07 .bt{position:absolute;left:0;right:0;bottom:0;height:32px;display:flex;align-items:center;gap:8px;padding:0 9px 0 11px;box-sizing:border-box;background:linear-gradient(transparent,rgba(6,9,16,.6))}
.d-md07 .bt .ic{display:grid;place-items:center;opacity:.95}
.d-md07 .bt .ic svg{width:14px;height:14px}
.d-md07 .ln{flex:1;height:3px;border-radius:2px;background:rgba(255,255,255,.3);overflow:hidden}
.d-md07 .ln i{display:block;height:100%;width:0;background:#fff;animation:md07-ln 14s linear infinite}
@keyframes md07-ln{to{width:100%}}
.d-md07 .cc{height:20px;padding:0 6px;border-radius:5px;border:1.500px solid #fff;background:transparent;color:#fff;font:inherit;font-size:11px;font-weight:800;letter-spacing:.02em;cursor:pointer;transition:background .15s,color .15s,transform .15s}
.d-md07 .cc[aria-pressed="true"]{background:#fff;color:#14171c}
.d-md07 .cc:active{transform:scale(.92)}
.d-md07 .st{margin:0;font-size:11px;color:var(--muted)}
.d-md07 .st b{color:var(--text)}
`,
    html: `<div class="wrap"><div class="vid">${mdScene}
  <div class="cp" aria-live="off"><span>오늘은 제주 동쪽 해안을 걸어요</span></div>
  <div class="bt"><span class="ic">${mdI.pause}</span><div class="ln"><i></i></div><button class="cc" type="button" aria-pressed="true" aria-label="자막">CC</button></div>
</div><p class="st" role="status">자막 <b>켜짐</b> · CC 버튼으로 켜고 꺼요</p></div>`,
    run(el, ctx) {
      const vid = el.querySelector('.vid'), sp = el.querySelector('.cp span'), cc = el.querySelector('.cc'), st = el.querySelector('.st b');
      const L = ['오늘은 제주 동쪽 해안을 걸어요', '바람은 조금 불지만 하늘이 맑네요', '첫 목적지는 언덕 위 작은 등대예요', '천천히 걸어서 20분쯤 걸려요'];
      let i = 0, user = false;
      const set = on => { cc.setAttribute('aria-pressed', on); vid.classList.toggle('off', !on); st.textContent = on ? '켜짐' : '꺼짐'; };
      ctx.interval(() => {
        i = (i + 1) % L.length; sp.classList.add('sw');
        ctx.timeout(() => { sp.textContent = L[i]; sp.classList.remove('sw'); }, 150);
      }, 1300);
      /* 자동 시연: 자막이 바뀌다가 CC를 눌러 끄고 다시 켬 */
      ctx.timeout(() => { if (!user) { mdTap(el, cc); set(false); } }, 3300);
      ctx.timeout(() => { if (!user) { mdTap(el, cc); set(true); } }, 4700);
      ctx.on(cc, 'click', () => { user = true; set(cc.getAttribute('aria-pressed') !== 'true'); });
    }
  },

  /* md08 돋보기 줌 */
  {
    id: 'md08', ko: '돋보기 줌', en: 'Image zoom',
    desc: '상품 사진 위에 올린 자리가 옆 패널에 크게 확대돼 보여요.',
    prompt: '「돋보기 줌(Image zoom)」을 만들어 줘. 상품 사진 위에 마우스를 올리면 커서를 따라다니는 사각 렌즈가 나타나고, 그 영역이 옆 패널에 2.5배로 확대돼 실시간으로 따라와. 렌즈는 사진 가장자리에서 멈추게 막고 120ms 페이드로 나타났다가 포인터가 사진을 벗어나면 사라지게 해. 터치 기기에서는 손가락으로 누른 채 끌면 렌즈가 따라오게 하고, 사진에는 alt 텍스트를 넣어 줘.',
    css: `
.d-md08 .wrap{display:flex;flex-direction:column;align-items:center;gap:8px}
.d-md08 .row{display:flex;gap:8px}
.d-md08 .img,.d-md08 .zm{position:relative;width:114px;height:114px;border-radius:12px;background:var(--surface);box-shadow:var(--shadow);overflow:hidden;flex:none}
.d-md08 .img{cursor:crosshair;touch-action:none}
.d-md08 .img svg{display:block;width:114px;height:114px}
.d-md08 .lens{position:absolute;left:0;top:0;width:45.600px;height:45.600px;box-sizing:border-box;border:1.500px solid #fff;border-radius:4px;background:rgba(255,255,255,.3);box-shadow:0 0 0 1.500px var(--accent),0 2px 8px rgba(0,0,0,.25);pointer-events:none;opacity:0;transition:opacity .12s}
.d-md08 .lens.on{opacity:1}
.d-md08 .zm{border:1.500px solid var(--accent);box-sizing:border-box}
.d-md08 .zi{position:absolute;inset:0}
.d-md08 .zi svg{display:block;width:100%;height:100%}
.d-md08 .tg{position:absolute;right:5px;bottom:5px;padding:1px 6px;border-radius:999px;background:var(--accent);color:var(--accent-text);font-size:11px;font-weight:700}
.d-md08 .cur{position:absolute;left:0;top:0;pointer-events:none;z-index:40;opacity:0;transition:opacity .2s}
.d-md08 .cap{margin:0;font-size:11px;color:var(--muted);white-space:nowrap}
`,
    html: `<div class="wrap"><div class="row">
  <div class="img" role="img" aria-label="하늘색 30리터 등산 배낭 상품 사진">${mdBag}<span class="lens"></span></div>
  <div class="zm" aria-hidden="true"><div class="zi">${mdBag}</div><span class="tg">×2.5</span></div>
</div><p class="cap">사진 위에 올리면 그 자리가 옆에 확대돼요</p><span class="cur">${mdI.cursor}</span></div>`,
    run(el, ctx) {
      const img = el.querySelector('.img'), lens = el.querySelector('.lens'), zi = el.querySelector('.zi svg'), cur = el.querySelector('.cur');
      const S = 114, Z = 2.5, LS = S / Z, U = 116 / S;
      let auto = true, hov = false;
      const at = (x, y) => {
        const lx = mdClamp(x - LS / 2, 0, S - LS), ly = mdClamp(y - LS / 2, 0, S - LS);
        lens.style.transform = `translate(${lx}px,${ly}px)`;
        zi.setAttribute('viewBox', `${(lx * U).toFixed(2)} ${(ly * U).toFixed(2)} ${(LS * U).toFixed(2)} ${(LS * U).toFixed(2)}`);
      };
      at(30, 34);
      /* 자동 시연: 가짜 커서가 사진 위를 훑으면 확대 패널이 따라옴 */
      const K = [[30, 34], [84, 40], [76, 82], [42, 78], [58, 38]];
      const s0 = el.getBoundingClientRect(), r0 = img.getBoundingClientRect();
      const ox = r0.left - s0.left, oy = r0.top - s0.top;
      const SEG = 620;
      ctx.timeout(() => {
        if (!auto) return; lens.classList.add('on'); cur.style.opacity = 1;
        ctx.loop(t => {
          if (!auto) return false;
          const n = Math.min(K.length - 2, Math.floor(t / SEG)), q = t >= SEG * (K.length - 1) ? 1 : mdEase((t - n * SEG) / (SEG * .85));
          const x = K[n][0] + (K[n + 1][0] - K[n][0]) * q, y = K[n][1] + (K[n + 1][1] - K[n][1]) * q;
          at(x, y); cur.style.transform = `translate(${ox + x - 2}px,${oy + y - 1}px)`;
          if (t >= SEG * (K.length - 1)) { cur.style.opacity = 0; auto = false; return false; }
        });
      }, 250);
      ctx.on(el, 'pointermove', e => {
        const r = img.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        if (x < 0 || y < 0 || x > r.width || y > r.height) { if (hov) { hov = false; lens.classList.remove('on'); } return; }
        if (auto) { auto = false; cur.style.opacity = 0; }
        hov = true; lens.classList.add('on'); at(x, y);
      });
      /* 사진(또는 스테이지)을 벗어나거나 손가락을 떼면 렌즈를 숨김 — 확대 패널은 마지막 자리 유지 */
      const out = () => { if (!hov) return; hov = false; lens.classList.remove('on'); };
      ctx.on(img, 'pointerleave', out);
      ctx.on(el, 'pointerleave', out);
      ctx.on(img, 'pointercancel', out);
    }
  }
]);
