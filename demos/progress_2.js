const pr2Ck = (s, w) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w || 3}" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>`;
const pr2X = s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`;
const pr2Scene = () => `<svg viewBox="0 0 220 124" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="220" height="124" fill="#8ec5f4"/><rect y="52" width="220" height="72" fill="#f6c48a" opacity=".55"/><circle cx="164" cy="40" r="17" fill="#fff3c4"/><path d="M0 84l38-34 30 24 34-40 44 44 30-22 44 30v38H0z" fill="#3f7f6b"/><path d="M0 100l52-26 46 20 50-24 72 30v24H0z" fill="#2a5a4e"/><path d="M102 34l10 12-8-3-6 5z" fill="#fff" opacity=".9"/><rect x="60" y="88" width="16" height="14" fill="#fbe9d0"/><path d="M57 89l11-9 11 9z" fill="#d9603f"/><rect x="66" y="94" width="4" height="8" fill="#7a4a36"/><path d="M24 30h22M32 24h20M150 74h18" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/></svg>`;

UIDEX.add('progress', [
  {
    id: 'pr11',
    ko: '불확정 진행 바',
    en: 'Indeterminate progress',
    pair: 'pr02',
    desc: '진행 바와 달리 끝을 모를 때 퍼센트 없이 막대만 흘러가요.',
    prompt: '「불확정 진행 바(Indeterminate progress)」를 만들어 줘. 높이 6px 둥근 트랙 안에서 너비 40%짜리 파란 막대가 왼쪽 밖에서 오른쪽 밖으로 1.4초마다 ease-in-out으로 계속 흘러가. 진행 바와 헷갈리지 않게 퍼센트 숫자나 채워지는 연출은 하지 마. role="progressbar"에 aria-valuenow는 빼고 aria-busy="true"를 넣어 줘.',
    css: `
.d-pr11 .bx{width:244px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);padding:16px}
.d-pr11 .top{display:flex;align-items:center;gap:12px}
.d-pr11 .ic{width:38px;height:38px;border-radius:11px;background:var(--accent-soft);color:var(--accent);display:grid;place-items:center;flex:none}
.d-pr11 .meta b{display:block;font-size:13.5px;font-weight:700;white-space:nowrap}
.d-pr11 .meta small{display:block;font-size:12px;color:var(--muted);white-space:nowrap}
.d-pr11 .track{position:relative;margin-top:14px;height:6px;border-radius:3px;background:var(--surface-2);overflow:hidden}
.d-pr11 .track i{position:absolute;top:0;bottom:0;left:0;width:40%;border-radius:3px;background:var(--accent);animation:pr11-flow 1.4s ease-in-out infinite}
.d-pr11 .note{margin-top:10px;font-size:11.5px;color:var(--muted);text-align:center}
@keyframes pr11-flow{0%{transform:translateX(-105%) scaleX(.6)}50%{transform:translateX(75%) scaleX(1.2)}100%{transform:translateX(260%) scaleX(.6)}}
`,
    html: `<div class="bx">
  <div class="top">
    <div class="ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10.5h18"/></svg></div>
    <div class="meta"><b>결제 승인 요청 중</b><small class="sub">카드사 응답을 기다리고 있어요</small></div>
  </div>
  <div class="track" role="progressbar" aria-busy="true" aria-label="결제 승인 대기 중"><i></i></div>
  <div class="note">남은 시간을 알 수 없어요</div>
</div>`,
    run(el, ctx) {
      const sub = el.querySelector('.sub');
      const msgs = ['카드사 응답을 기다리고 있어요', '조금만 더 기다려 주세요', '창을 닫지 말아 주세요'];
      let i = 0;
      ctx.interval(() => { i = (i + 1) % msgs.length; sub.textContent = msgs[i]; }, 1800);
    }
  },
  {
    id: 'pr12',
    ko: '상단 로딩 바',
    en: 'Top loading bar',
    desc: '페이지가 바뀌는 동안 화면 맨 위 얇은 선이 달려갔다 사라져요.',
    prompt: '「상단 로딩 바(Top loading bar)」를 만들어 줘. 페이지 전환을 시작하면 화면 맨 위 높이 3px 파란 선이 0.3초 만에 60%까지 빠르게 찬 뒤 90% 근처까지 점점 느려지고, 로딩이 끝나면 0.2초에 100%가 된 다음 0.3초 페이드아웃으로 사라져. 본문 위에 겹쳐 띄워 레이아웃을 밀지 않게 하고 aria-hidden 처리해 줘.',
    css: `
.d-pr12 .ui-phone{display:flex;flex-direction:column}
.d-pr12 .bar{position:absolute;left:0;top:0;height:3px;width:0;background:var(--accent);border-radius:0 2px 2px 0;z-index:3;box-shadow:0 0 8px var(--accent)}
.d-pr12 .tabs{display:flex;gap:4px;padding:11px 10px 8px;border-bottom:1px solid var(--line)}
.d-pr12 .tabs button{flex:1;height:28px;border:0;border-radius:8px;background:transparent;color:var(--muted);font:inherit;font-size:12.5px;font-weight:600;cursor:pointer;transition:background .2s,color .2s}
.d-pr12 .tabs button.on{background:var(--accent-soft);color:var(--accent)}
.d-pr12 .pg{flex:1;padding:10px 14px;transition:opacity .25s}
.d-pr12 .pg.wait{opacity:.35}
.d-pr12 .pg b{display:block;font-size:14px;font-weight:800;margin-bottom:3px}
.d-pr12 .pg small{display:block;font-size:12px;color:var(--muted);margin-bottom:8px}
.d-pr12 .pg .rw{display:flex;gap:8px;align-items:center;margin-bottom:8px}
.d-pr12 .pg .ui-thumb{width:24px;height:24px;border-radius:7px;flex:none}
.d-pr12 .pg .ui-line{flex:1}
`,
    html: `<div class="ui-phone">
  <div class="bar" aria-hidden="true"></div>
  <div class="tabs"><button class="on">홈</button><button>특가</button><button>내 여행</button></div>
  <div class="pg"><b class="ttl">홈</b><small class="sb">오늘의 추천 여행지</small>
    <div class="rw"><div class="ui-thumb"></div><div class="ui-line"></div></div>
    <div class="rw"><div class="ui-thumb"></div><div class="ui-line" style="max-width:70%"></div></div>
  </div>
</div>`,
    run(el, ctx) {
      const bar = el.querySelector('.bar'), tabs = [...el.querySelectorAll('.tabs button')], pg = el.querySelector('.pg');
      const ttl = el.querySelector('.ttl'), sb = el.querySelector('.sb');
      const data = [['홈', '오늘의 추천 여행지'], ['특가', '제주 3박 4일 29만원부터'], ['내 여행', '예약 2건 · 찜 5곳']];
      let seq = 0;
      const go = n => {
        const my = ++seq;
        tabs.forEach((b, k) => b.classList.toggle('on', k === n));
        pg.classList.add('wait');
        bar.style.transition = 'none'; bar.style.opacity = '1'; bar.style.width = '0';
        ctx.raf(() => ctx.raf(() => {
          if (my !== seq) return;
          bar.style.transition = 'width .3s ease-out'; bar.style.width = '60%';
          ctx.timeout(() => { if (my !== seq) return; bar.style.transition = 'width 2.5s cubic-bezier(.1,.6,.2,1)'; bar.style.width = '90%'; }, 300);
          ctx.timeout(() => {
            if (my !== seq) return;
            bar.style.transition = 'width .2s ease-out'; bar.style.width = '100%';
            ttl.textContent = data[n][0]; sb.textContent = data[n][1]; pg.classList.remove('wait');
            ctx.timeout(() => { if (my !== seq) return; bar.style.transition = 'opacity .3s'; bar.style.opacity = '0'; }, 220);
          }, 1300);
        }));
      };
      tabs.forEach((b, k) => ctx.on(b, 'click', () => go(k)));
      ctx.timeout(() => go(1), 450);
    }
  },
  {
    id: 'pr13',
    ko: '스토리 진행 바',
    en: 'Story progress bar',
    desc: '화면 위 여러 칸 막대가 한 칸씩 차면 다음 장으로 넘어가요.',
    prompt: '「스토리 진행 바(Story progress bar)」를 만들어 줘. 전체 화면 카드 상단에 높이 3px 막대를 장 수만큼 4px 간격으로 나란히 두고, 현재 칸이 1.5초 동안 linear로 차오르면 자동으로 다음 장으로 넘어가. 지난 칸은 꽉 찬 상태, 남은 칸은 반투명이야. 화면 오른쪽을 누르면 다음, 왼쪽은 이전 장으로 가고, 길게 누르는 동안은 일시정지해 줘.',
    css: `
.d-pr13 .ui-phone{width:150px;height:184px;cursor:pointer;user-select:none;touch-action:none}
.d-pr13 .sl{position:absolute;inset:0;padding:14px 13px;display:flex;flex-direction:column;justify-content:flex-end;color:#fff;opacity:0;transition:opacity .25s}
.d-pr13 .sl.on{opacity:1}
.d-pr13 .sl small{font-size:11px;opacity:.9}
.d-pr13 .sl b{font-size:15px;font-weight:800;letter-spacing:-.02em;line-height:1.3}
.d-pr13 .s1{background:linear-gradient(160deg,#3d7bff,#8a6bff)}
.d-pr13 .s2{background:linear-gradient(160deg,#12a67a,#3d9bd6)}
.d-pr13 .s3{background:linear-gradient(160deg,#f2853c,#e2557a)}
.d-pr13 .segs{position:absolute;left:8px;right:8px;top:8px;display:flex;gap:4px;z-index:2}
.d-pr13 .segs span{flex:1;height:3px;border-radius:2px;background:rgba(255,255,255,.38);overflow:hidden}
.d-pr13 .segs i{display:block;height:100%;width:0;background:#fff;border-radius:2px}
.d-pr13 .who{position:absolute;left:10px;top:18px;z-index:2;display:flex;align-items:center;gap:6px;color:#fff;font-size:11px;font-weight:600}
.d-pr13 .who::before{content:"";width:18px;height:18px;border-radius:50%;background:rgba(255,255,255,.85)}
.d-pr13 .pz{position:absolute;right:10px;top:20px;z-index:2;color:#fff;font-size:11px;font-weight:700;opacity:0;transition:opacity .15s}
.d-pr13 .ui-phone.hold .pz{opacity:1}
`,
    html: `<div class="ui-phone" role="group" aria-label="스토리 3장">
  <div class="segs" aria-hidden="true"><span><i></i></span><span><i></i></span><span><i></i></span></div>
  <div class="who">여행 에디터</div><div class="pz">일시정지</div>
  <div class="sl s1 on"><small>1 / 3</small><b>이번 주말<br>강릉 바다 코스</b></div>
  <div class="sl s2"><small>2 / 3</small><b>오전엔 숲길<br>산책 40분</b></div>
  <div class="sl s3"><small>3 / 3</small><b>저녁은 시장<br>먹거리 투어</b></div>
</div>`,
    run(el, ctx) {
      const ph = el.querySelector('.ui-phone'), fills = [...el.querySelectorAll('.segs i')], sl = [...el.querySelectorAll('.sl')];
      const DUR = 1500;
      let i = 0, acc = 0, last = 0, hold = false, downAt = 0;
      const show = () => {
        sl.forEach((x, k) => x.classList.toggle('on', k === i));
        fills.forEach((f, k) => { f.style.width = k < i ? '100%' : k > i ? '0' : (acc / DUR * 100) + '%'; });
      };
      const jump = n => { i = (n + 3) % 3; acc = 0; show(); };
      ctx.loop(t => {
        const dt = t - last; last = t;
        if (!hold) acc += dt;
        if (acc >= DUR) jump(i + 1); else fills[i].style.width = (acc / DUR * 100) + '%';
      });
      ctx.on(ph, 'pointerdown', e => { hold = true; downAt = e.timeStamp; ph.classList.add('hold'); });
      const up = e => {
        if (!hold) return;
        hold = false; ph.classList.remove('hold');
        if (e.type === 'pointerup' && e.timeStamp - downAt < 250) {
          const r = ph.getBoundingClientRect();
          jump(e.clientX - r.left < r.width * .35 ? i - 1 : i + 1);
        }
      };
      ctx.on(ph, 'pointerup', up); ctx.on(ph, 'pointerleave', up); ctx.on(ph, 'pointercancel', up);
    }
  },
  {
    id: 'pr14',
    ko: '업로드 진행',
    en: 'Upload progress',
    desc: '파일마다 막대·용량·취소 버튼을 보여 주고 끝나면 체크로 바뀌어요.',
    prompt: '「업로드 진행(Upload progress)」 목록을 만들어 줘. 파일 행마다 이름, "3.1 / 8.4MB" 용량 글자, 높이 4px 진행 막대, 오른쪽 X 취소 버튼을 두고 막대는 0.2초 ease-out으로 늘어나. 다 올라가면 X가 초록 체크로 0.25초 동안 바뀌고, 취소하면 그 행은 흐려지며 "취소됨"으로 표시해. 취소 버튼엔 aria-label="파일명 업로드 취소"를 달아 줘.',
    css: `
.d-pr14 .bx{width:244px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);padding:6px 12px}
.d-pr14 .rw{display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--line);transition:opacity .3s}
.d-pr14 .rw:last-child{border-bottom:0}
.d-pr14 .mid{flex:1;min-width:0}
.d-pr14 .ln{display:flex;justify-content:space-between;gap:8px;align-items:baseline}
.d-pr14 .ln b{font-size:12.5px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-pr14 .ln small{font-size:11px;color:var(--muted);white-space:nowrap;font-variant-numeric:tabular-nums}
.d-pr14 .tk{margin-top:6px;height:4px;border-radius:2px;background:var(--surface-2);overflow:hidden}
.d-pr14 .tk i{display:block;height:100%;width:0;border-radius:2px;background:var(--accent);transition:width .2s ease-out,background .25s}
.d-pr14 .x{width:24px;height:24px;flex:none;border:0;border-radius:50%;background:var(--surface-2);color:var(--muted);display:grid;place-items:center;cursor:pointer;padding:0;transition:background .25s,color .25s,transform .25s}
.d-pr14 .rw.done .x{background:var(--success);color:var(--accent-text);cursor:default;animation:pr14-pop .25s ease-out}
.d-pr14 .rw.done .tk i{background:var(--success)}
.d-pr14 .rw.done .ln small{color:var(--success)}
.d-pr14 .rw.cut{opacity:.5}
.d-pr14 .rw.cut .tk i{background:var(--muted)}
.d-pr14 .rw.cut .x{visibility:hidden}
@keyframes pr14-pop{50%{transform:scale(1.2)}}
`,
    html: `<div class="bx">
  <div class="rw" data-mb="2.4" data-sp="2.2"><div class="mid"><div class="ln"><b>바다사진.jpg</b><small></small></div><div class="tk"><i></i></div></div><button class="x" aria-label="바다사진.jpg 업로드 취소"></button></div>
  <div class="rw" data-mb="8.4" data-sp="3.3"><div class="mid"><div class="ln"><b>여행일정표.pdf</b><small></small></div><div class="tk"><i></i></div></div><button class="x" aria-label="여행일정표.pdf 업로드 취소"></button></div>
  <div class="rw" data-mb="36" data-sp="5.5"><div class="mid"><div class="ln"><b>일출영상.mp4</b><small></small></div><div class="tk"><i></i></div></div><button class="x" aria-label="일출영상.mp4 업로드 취소"></button></div>
</div>`,
    run(el, ctx) {
      const rows = [...el.querySelectorAll('.rw')].map(r => ({ r, mb: +r.dataset.mb, sp: +r.dataset.sp, v: 0, st: 0, sm: r.querySelector('small'), bar: r.querySelector('.tk i'), x: r.querySelector('.x') }));
      const fmt = n => n >= 10 ? Math.round(n) : n.toFixed(1);
      rows.forEach(o => {
        o.x.innerHTML = pr2X(12); o.sm.textContent = '0 / ' + fmt(o.mb) + 'MB';
        ctx.on(o.x, 'click', () => {
          if (o.st) return;
          o.st = 2; o.r.classList.add('cut'); o.sm.textContent = '취소됨';
        });
      });
      ctx.timeout(() => ctx.interval(() => {
        rows.forEach(o => {
          if (o.st) return;
          o.v = Math.min(o.mb, o.v + o.mb / o.sp * .15 * (.6 + Math.random() * .8));
          o.bar.style.width = (o.v / o.mb * 100) + '%';
          if (o.v >= o.mb) {
            o.st = 1; o.r.classList.add('done'); o.sm.textContent = fmt(o.mb) + 'MB · 완료';
            o.x.innerHTML = pr2Ck(13, 3.2); o.x.setAttribute('aria-label', '업로드 완료'); o.x.disabled = true;
          } else o.sm.textContent = fmt(o.v) + ' / ' + fmt(o.mb) + 'MB';
        });
      }, 150), 250);
    }
  },
  {
    id: 'pr15',
    ko: '로딩 점',
    en: 'Loading dots',
    pair: 'pr10',
    desc: '스피너처럼 돌지 않고 점 3개가 차례로 튀며 기다림을 알려요.',
    prompt: '「로딩 점(Loading dots)」을 만들어 줘. 지름 7px 점 3개를 5px 간격으로 놓고, 각 점이 0.16초씩 시차를 두고 위로 5px 튀었다 내려오는 동작을 1.2초 주기로 반복해. 채팅 말풍선 안에 넣어 상대가 입력 중임을 보여 줘. 스피너와 헷갈리지 않게 회전하는 원은 쓰지 마. role="status"와 "입력 중" 숨김 텍스트를 넣어 줘.',
    css: `
.d-pr15 .chat{width:236px;display:flex;flex-direction:column;gap:8px}
.d-pr15 .bb{max-width:178px;padding:9px 13px;border-radius:16px;font-size:13px;line-height:1.4}
.d-pr15 .me{align-self:flex-end;background:var(--accent);color:var(--accent-text);border-bottom-right-radius:5px}
.d-pr15 .ot{align-self:flex-start;background:var(--surface);color:var(--text);box-shadow:var(--shadow);border-bottom-left-radius:5px;animation:pr15-in .3s cubic-bezier(.2,.8,.2,1)}
.d-pr15 .typ{display:flex;align-items:center;gap:5px;height:38px;padding:0 15px}
.d-pr15 .typ i{width:7px;height:7px;border-radius:50%;background:var(--muted);animation:pr15-hop 1.2s ease-in-out infinite}
.d-pr15 .typ i:nth-child(2){animation-delay:.16s}
.d-pr15 .typ i:nth-child(3){animation-delay:.32s}
.d-pr15 .cap{font-size:11px;color:var(--muted);padding-left:4px;min-height:16px}
.d-pr15 .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
@keyframes pr15-hop{0%,55%,100%{transform:translateY(0);opacity:.45}28%{transform:translateY(-5px);opacity:1}}
@keyframes pr15-in{from{opacity:0;transform:translateY(6px)}}
`,
    html: `<div class="chat">
  <div class="bb me">체크인 시간 변경되나요?</div>
  <div class="slot"></div>
  <div class="cap"></div>
</div>`,
    run(el, ctx) {
      const slot = el.querySelector('.slot'), cap = el.querySelector('.cap');
      slot.style.display = 'flex';
      const typing = () => {
        slot.innerHTML = '<div class="bb ot typ" role="status"><i></i><i></i><i></i><span class="sr">입력 중</span></div>';
        cap.textContent = '상담원이 입력 중…';
        ctx.timeout(reply, 3000);
      };
      const reply = () => {
        slot.innerHTML = '<div class="bb ot">네, 오후 2시로 바꿔 드렸어요.</div>';
        cap.textContent = '방금 읽음';
        ctx.timeout(typing, 1800);
      };
      typing();
    }
  },
  {
    id: 'pr16',
    ko: '버튼 로딩',
    en: 'Loading button',
    desc: '누른 버튼 안에서 스피너가 돌다 체크로 바뀌고 중복 클릭을 막아요.',
    prompt: '「버튼 로딩(Loading button)」을 만들어 줘. 버튼을 누르면 너비는 그대로 둔 채 글자가 0.2초 페이드로 16px 스피너와 "처리 중"으로 바뀌고, 응답이 오면 초록 배경에 체크와 "완료"가 0.3초 ease-out으로 나타났다가 1.5초 뒤 원래대로 돌아와. 로딩 중에는 disabled와 aria-busy="true"로 중복 클릭을 막아 줘.',
    css: `
.d-pr16 .bx{width:236px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);padding:15px 16px}
.d-pr16 .sum{display:flex;justify-content:space-between;align-items:baseline;font-size:13px;color:var(--muted)}
.d-pr16 .sum b{font-size:17px;font-weight:800;color:var(--text)}
.d-pr16 .btn{position:relative;width:100%;height:44px;margin-top:12px;border:0;border-radius:12px;background:var(--accent);color:var(--accent-text);font:inherit;font-size:14.5px;font-weight:700;cursor:pointer;overflow:hidden;transition:background .3s ease-out,transform .12s}
.d-pr16 .btn:active{transform:scale(.98)}
.d-pr16 .btn span{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:8px;opacity:0;transform:translateY(8px);transition:opacity .2s,transform .3s ease-out}
.d-pr16 .btn[data-s="idle"] .s0,.d-pr16 .btn[data-s="load"] .s1,.d-pr16 .btn[data-s="done"] .s2{opacity:1;transform:none}
.d-pr16 .btn[data-s="load"]{cursor:progress;background:color-mix(in srgb,var(--accent) 72%,var(--surface))}
.d-pr16 .btn[data-s="done"]{background:var(--success);cursor:default}
.d-pr16 .sp{width:16px;height:16px;border-radius:50%;border:2.5px solid color-mix(in srgb,var(--accent-text) 35%,transparent);border-top-color:var(--accent-text);animation:pr16-spin .7s linear infinite}
.d-pr16 .log{margin-top:9px;font-size:11.5px;color:var(--muted);text-align:center;min-height:17px;font-variant-numeric:tabular-nums}
@keyframes pr16-spin{to{transform:rotate(360deg)}}
`,
    html: `<div class="bx">
  <div class="sum">캠핑 의자 1개<b>39,000원</b></div>
  <button class="btn" data-s="idle"><span class="s0">결제하기</span><span class="s1"><i class="sp"></i>처리 중</span><span class="s2"></span></button>
  <div class="log" aria-live="polite">버튼을 눌러 보세요</div>
</div>`,
    run(el, ctx) {
      const btn = el.querySelector('.btn'), log = el.querySelector('.log');
      el.querySelector('.s2').innerHTML = pr2Ck(17, 3) + '완료';
      let sent = 0, blocked = 0;
      const say = () => { log.textContent = '요청 ' + sent + '회 전송' + (blocked ? ' · 중복 클릭 ' + blocked + '회 막음' : ''); };
      const press = () => {
        if (btn.dataset.s !== 'idle') { if (btn.dataset.s === 'load') { blocked++; say(); } return; }
        sent++; say();
        btn.dataset.s = 'load'; btn.setAttribute('aria-busy', 'true'); btn.setAttribute('aria-disabled', 'true');
        ctx.timeout(() => {
          btn.dataset.s = 'done'; btn.removeAttribute('aria-busy');
          ctx.timeout(() => { btn.dataset.s = 'idle'; btn.removeAttribute('aria-disabled'); }, 1500);
        }, 1400);
      };
      ctx.on(btn, 'click', press);
      ctx.timeout(press, 600);
      ctx.timeout(press, 1000);
    }
  },
  {
    id: 'pr17',
    ko: '게이지',
    en: 'Gauge',
    pair: 'pr03',
    desc: '원형 진행과 달리 작업 진척이 아닌 지금 수치를 반원 계기판으로 보여줘요.',
    prompt: '「게이지(Gauge)」를 만들어 줘. 반지름 70px 반원 호(두께 12px) 위에서 바늘과 파란 호가 0에서 현재 값 78까지 1.2초 동안 cubic-bezier(.2,.8,.2,1)로 올라가고, 아래 큰 숫자와 양 끝 최솟값·최댓값 눈금을 보여 줘. 원형 진행과 헷갈리지 않게 닫힌 원이나 완료율 표현은 하지 마. role="meter"와 aria-valuenow를 넣어 줘.',
    css: `
.d-pr17 .bx{width:220px;background:var(--surface);border-radius:18px;box-shadow:var(--shadow);padding:12px 14px 11px;cursor:pointer;user-select:none}
.d-pr17 .hd{font-size:12.5px;font-weight:700;color:var(--muted);text-align:center}
.d-pr17 .g{width:176px;height:94px;margin:6px auto 0}
.d-pr17 svg{display:block;overflow:visible}
.d-pr17 .bg{stroke:var(--surface-2)}
.d-pr17 .fg{stroke:var(--accent)}
.d-pr17 .nd{fill:var(--text)}
.d-pr17 .hub{fill:var(--surface);stroke:var(--text)}
.d-pr17 .ft{display:flex;justify-content:space-between;align-items:flex-end;width:188px;margin:6px auto 0;font-size:11px;color:var(--muted)}
.d-pr17 .ft>span{width:24px;text-align:center;padding-bottom:2px}
.d-pr17 .val{text-align:center;font-size:12px;color:var(--muted);line-height:1.1}
.d-pr17 .val b{font-size:24px;font-weight:800;color:var(--text);font-variant-numeric:tabular-nums;letter-spacing:-.02em;margin-right:3px}
.d-pr17 .val em{font-style:normal;color:var(--accent);font-weight:700}
`,
    html: `<div class="bx" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="인터넷 속도">
  <div class="hd">지금 인터넷 속도</div>
  <div class="g"><svg width="176" height="94" viewBox="0 0 176 94">
    <path class="bg" d="M18 88a70 70 0 0 1 140 0" fill="none" stroke-width="12" stroke-linecap="round"/>
    <path class="fg" d="M18 88a70 70 0 0 1 140 0" fill="none" stroke-width="12" stroke-linecap="round" stroke-dasharray="219.9" stroke-dashoffset="219.9"/>
    <g class="ndl" transform="rotate(-90 88 88)"><path class="nd" d="M85 88L88 38l3 50z"/></g>
    <circle class="hub" cx="88" cy="88" r="5" stroke-width="3"/>
  </svg></div>
  <div class="ft"><span>0</span><div class="val"><b class="num">0</b>Mbps · <em class="st">측정 중</em></div><span>100</span></div>
</div>`,
    run(el, ctx) {
      const bx = el.querySelector('.bx'), fg = el.querySelector('.fg'), ndl = el.querySelector('.ndl'), st = el.querySelector('.st');
      const num = el.querySelector('.num'), L = 219.9;
      let cur = 0, from = 0, to = 0, t0 = -1, now = 0;
      const draw = v => {
        fg.setAttribute('stroke-dashoffset', (L * (1 - v / 100)).toFixed(1));
        ndl.setAttribute('transform', 'rotate(' + (-90 + v * 1.8).toFixed(1) + ' 88 88)');
        num.textContent = Math.round(v);
      };
      const setTo = v => { from = cur; to = v; t0 = now; st.textContent = '측정 중'; bx.setAttribute('aria-valuenow', v); };
      ctx.loop(t => {
        now = t;
        if (t0 < 0) return;
        const p = Math.min(1, (t - t0) / 1200), e = 1 - Math.pow(1 - p, 4);
        cur = from + (to - from) * e; draw(cur);
        if (p >= 1) { t0 = -1; st.textContent = to >= 60 ? '빠름' : to >= 30 ? '보통' : '느림'; }
      });
      ctx.timeout(() => setTo(78), 350);
      ctx.on(bx, 'click', () => setTo(8 + Math.round(Math.random() * 88)));
    }
  },
  {
    id: 'pr18',
    ko: '블러 업',
    en: 'Blur-up placeholder',
    pair: 'pr09',
    desc: '스켈레톤의 회색 뼈대 대신 흐릿한 미리보기가 선명한 사진으로 바뀌어요.',
    prompt: '「블러 업(Blur-up placeholder)」 이미지 로딩을 만들어 줘. 먼저 20px 폭 저화질 미리보기를 blur(16px)와 scale(1.1)로 꽉 채워 보여 주고, 원본이 다 로드되면 0.5초 ease-out으로 원본을 페이드인하면서 흐림을 걷어 내. 스켈레톤과 헷갈리지 않게 회색 뼈대나 반짝임은 쓰지 마. aspect-ratio를 고정하고 alt 텍스트를 넣어 줘.',
    css: `
.d-pr18 .bx{width:236px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);overflow:hidden;cursor:pointer}
.d-pr18 .ph{position:relative;height:124px;overflow:hidden;background:var(--surface-2)}
.d-pr18 .ph svg{position:absolute;inset:0;width:100%;height:100%;display:block}
.d-pr18 .lo{position:absolute;inset:0;filter:blur(16px);transform:scale(1.1);transition:opacity .5s ease-out,filter .5s ease-out,transform .5s ease-out}
.d-pr18 .hi{position:absolute;inset:0;opacity:0;transition:opacity .5s ease-out}
.d-pr18 .bx.rdy .hi{opacity:1}
.d-pr18 .bx.rdy .lo{opacity:0;filter:blur(0);transform:none}
.d-pr18 .tag{position:absolute;right:8px;bottom:8px;padding:3px 8px;border-radius:999px;background:rgba(0,0,0,.55);color:#fff;font-size:11px;font-weight:600;font-variant-numeric:tabular-nums}
.d-pr18 .ft{display:flex;justify-content:space-between;align-items:center;padding:9px 13px;font-size:13px;font-weight:700}
.d-pr18 .ft small{font-size:11.5px;font-weight:500;color:var(--muted)}
`,
    html: `<div class="bx" title="눌러서 다시 불러오기">
  <div class="ph" role="img" aria-label="산과 오두막이 있는 풍경 사진"><div class="lo"></div><div class="hi"></div><span class="tag">미리보기 1KB</span></div>
  <div class="ft">평창 숲속 오두막<small class="st">불러오는 중</small></div>
</div>`,
    run(el, ctx) {
      const bx = el.querySelector('.bx'), tag = el.querySelector('.tag'), st = el.querySelector('.st');
      el.querySelector('.lo').innerHTML = pr2Scene(); el.querySelector('.hi').innerHTML = pr2Scene();
      let seq = 0;
      const load = () => {
        const my = ++seq, T = 1300;
        bx.classList.remove('rdy'); st.textContent = '불러오는 중';
        let last = -1, t0 = -1;
        ctx.loop(t => {
          if (my !== seq) return false;
          if (t0 < 0) t0 = t;
          const p = Math.min(1, (t - t0) / T), kb = Math.round(1 + p * 419);
          if (kb !== last) { last = kb; tag.textContent = p < 1 ? '원본 ' + kb + ' / 420KB' : '원본 420KB'; }
          if (p >= 1) { bx.classList.add('rdy'); st.textContent = '선명하게 표시됨'; return false; }
        });
      };
      ctx.timeout(load, 400);
      ctx.on(bx, 'click', load);
    }
  },
  {
    id: 'pr19',
    ko: '세로 스테퍼',
    en: 'Vertical stepper',
    pair: 'pr01',
    desc: '단계 표시와 달리 세로로 쌓고 지금 단계만 내용을 펼쳐 보여줘요.',
    prompt: '「세로 스테퍼(Vertical stepper)」를 만들어 줘. 번호 원과 세로 연결선으로 3단계를 위아래로 쌓고, 현재 단계만 아래로 0.3초 ease-out으로 펼쳐져 입력 내용과 "다음" 버튼을 보여 줘. 다음을 누르면 지금 단계는 접히며 체크로 바뀌고 아래 단계가 열려. 단계 표시와 헷갈리지 않게 가로 한 줄 배치는 하지 마. 현재 단계에 aria-current="step"을 넣고, 접힌 단계의 버튼에는 Tab 포커스가 가지 않게 해 줘.',
    css: `
.d-pr19 .bx{width:236px;background:var(--surface);border-radius:16px;box-shadow:var(--shadow);padding:11px 14px 9px}
.d-pr19 .st{position:relative;padding-left:32px;padding-bottom:7px}
.d-pr19 .st::before{content:"";position:absolute;left:10px;top:24px;bottom:-1px;width:2px;border-radius:1px;background:var(--line);transition:background .3s}
.d-pr19 .st:last-child{padding-bottom:0}
.d-pr19 .st:last-child::before{display:none}
.d-pr19 .st.done::before{background:var(--accent)}
.d-pr19 .dot{position:absolute;left:0;top:0;width:22px;height:22px;border-radius:50%;display:grid;place-items:center;font-size:11.5px;font-weight:700;background:var(--surface);color:var(--muted);border:2px solid var(--line);box-sizing:border-box;transition:background .3s,border-color .3s,color .3s}
.d-pr19 .st.on .dot,.d-pr19 .st.done .dot{background:var(--accent);border-color:var(--accent);color:var(--accent-text)}
.d-pr19 .hd{display:flex;justify-content:space-between;align-items:center;width:100%;height:22px;margin:0;padding:0;border:0;border-radius:6px;background:none;font:inherit;font-size:13px;font-weight:600;color:var(--muted);text-align:left;cursor:pointer;transition:color .3s}
.d-pr19 .hd:disabled{cursor:default}
.d-pr19 .hd:focus-visible,.d-pr19 .nx:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.d-pr19 .st.on .hd,.d-pr19 .st.done .hd{color:var(--text)}
.d-pr19 .st.on .hd{font-weight:700}
.d-pr19 .hd small{font-size:11px;font-weight:500;color:var(--muted);opacity:0;transition:opacity .3s}
.d-pr19 .st.done .hd small{opacity:1}
.d-pr19 .bd{display:grid;grid-template-rows:0fr;visibility:hidden;transition:grid-template-rows .3s ease-out,visibility 0s .3s}
.d-pr19 .st.on .bd{grid-template-rows:1fr;visibility:visible;transition-delay:0s}
.d-pr19 .in{overflow:hidden;min-height:0}
.d-pr19 .fld{margin-top:6px;height:28px;border-radius:8px;background:var(--surface-2);display:flex;align-items:center;padding:0 10px;font-size:12px;color:var(--text);white-space:nowrap}
.d-pr19 .nx{margin:6px 0 3px;height:26px;padding:0 12px;border:0;border-radius:8px;background:var(--accent);color:var(--accent-text);font:inherit;font-size:12px;font-weight:700;cursor:pointer}
`,
    html: `<div class="bx">
  <div class="st on" aria-current="step"><div class="dot">1</div><button type="button" class="hd" aria-expanded="true">배송지 입력<small>서울 마포구</small></button><div class="bd"><div class="in"><div class="fld">서울 마포구 성미산로 12</div><button class="nx">다음</button></div></div></div>
  <div class="st"><div class="dot">2</div><button type="button" class="hd" aria-expanded="false">결제 수단<small>간편결제</small></button><div class="bd"><div class="in"><div class="fld">간편결제 · 일시불</div><button class="nx">다음</button></div></div></div>
  <div class="st"><div class="dot">3</div><button type="button" class="hd" aria-expanded="false">주문 확인<small>완료</small></button><div class="bd"><div class="in"><div class="fld">캠핑 의자 1개 · 39,000원</div><button class="nx">주문하기</button></div></div></div>
</div>`,
    run(el, ctx) {
      const st = [...el.querySelectorAll('.st')];
      let cur = 0;
      const go = n => {
        cur = Math.max(0, Math.min(st.length, n));
        st.forEach((s, k) => {
          s.classList.toggle('done', k < cur); s.classList.toggle('on', k === cur);
          s.querySelector('.dot').innerHTML = k < cur ? pr2Ck(11, 3.5) : k + 1;
          if (k === cur) s.setAttribute('aria-current', 'step'); else s.removeAttribute('aria-current');
          const hd = s.querySelector('.hd');
          hd.setAttribute('aria-expanded', k === cur ? 'true' : 'false');
          hd.disabled = k > cur && cur !== st.length;
        });
      };
      st.forEach((s, k) => {
        ctx.on(s.querySelector('.nx'), 'click', e => { e.stopPropagation(); go(k + 1); });
        ctx.on(s.querySelector('.hd'), 'click', () => { if (k <= cur || cur === st.length) go(k); });
      });
      go(0);
      ctx.timeout(() => go(1), 900);
      ctx.timeout(() => go(2), 1900);
    }
  }
]);
