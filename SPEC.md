# UI 모션 사전 — 데모 제작 규격 (모든 에이전트 필독)

목적: 마케터·디자이너·개발자가 UI 패턴 "이름"으로 소통할 수 있게, 100개 UI 패턴을 실제로 움직이는 데모 + 클로드에게 붙여 넣을 복붙 프롬프트로 보여주는 단일 HTML 사전.

## 파일 구조
- `shell.html` — 공통 화면(헤더·검색·필터·카드·복사·재생). **수정 금지**(메인 에이전트만 수정).
- `demos/<category>.js` — 카테고리별 데모 10개. 에이전트는 자기 담당 파일만 쓴다.
- `build.py` — shell + demos를 합쳐 `../최종버전/UI_모션사전.html` 생성. `python3 build.py`
- `test.py` — Playwright로 열어 콘솔 에러·빈 데모 검사 + 카드 스크린샷. `python3 test.py --cat progress` (스크린샷: `작업파일/shots/<cat>/<id>_a.png`(재생 직후 0.3초), `_b.png`(2.2초 후))

## 데모 등록 형식 (demos/<category>.js)
```js
UIDEX.add('progress', [
  {
    id: 'pr01',                 // 표 아래 ID 그대로
    ko: '단계 표시',
    en: 'Step indicator',
    desc: '주문→배송중→도착처럼 지금 몇 번째 단계인지 보여줘요.',   // 한 줄, 해요체, 40자 안팎
    prompt: '...',              // 아래 프롬프트 규칙
    css: `.d-pr01 .row{...}`,   // 반드시 모든 선택자를 .d-<id> 로 시작. @keyframes 이름은 <id>- 접두사
    html: `<div class="row">...</div>`,
    run(el, ctx) { ... }        // 선택. 재생될 때마다 호출됨
  },
  ...
]);
```
- 재생 시 shell이 `el.innerHTML = html`로 초기화한 뒤 `run(el, ctx)`를 호출한다. 그러니 run은 항상 "처음 상태부터" 시작하면 된다.
- 타이머·이벤트는 반드시 ctx로: `ctx.timeout(fn,ms)`, `ctx.interval(fn,ms)`, `ctx.raf(fn)`(1회), `ctx.loop(fn(t))`(매 프레임, t=시작 후 ms, false 반환 시 중지), `ctx.on(target, 'click', fn)`. 화면 밖으로 나가거나 다시 재생하면 shell이 전부 정리한다. `setTimeout`/`addEventListener` 직접 사용 금지(window/document 리스너는 특히 금지).
- 순수 CSS 애니메이션만으로 되면 run 생략 가능(innerHTML 재주입 때마다 애니메이션이 처음부터 다시 돈다).
- 자동 재생 후 사용자가 직접 눌러볼 수 있는 패턴(토글·탭·좋아요 등)은 **자동 시연 1회 + 클릭 가능**으로 만든다. 클릭 가능한 요소는 `cursor:pointer`.
- 반복이 자연스러운 것(스피너·마퀴·인기검색어 롤링)은 무한 반복, 나머지는 1회 재생 후 최종 상태 유지(재생 버튼으로 다시 봄).
- 스크롤 패턴(패럴랙스·스티키·무한스크롤 등)은 스테이지 안에 `overflow:auto` 미니 화면을 만들고, run에서 ctx.loop로 자동 스크롤 시연 → 이후 사용자가 직접 스크롤 가능.

## 스테이지(데모 영역) 환경
- 요소 `el`: 너비 = 카드 너비(약 280~380px, 반응형), 높이 **200px 고정**, `position:relative; overflow:hidden; display:grid; place-items:center;` 배경 `var(--stage)`.
- 내용은 너비 260px에서도 깨지지 않게. 글자 최소 11px.
- 색은 **반드시 CSS 변수**로(다크 모드 자동 대응): `--stage`(스테이지 배경) `--surface`(카드·폰 화면 흰 면) `--surface-2`(옅은 회색 면) `--text` `--muted` `--line` `--accent`(파랑) `--accent-soft`(옅은 파랑) `--accent-text`(accent 위 글자, 흰색) `--danger` `--success` `--warn` `--shadow`(box-shadow 값). 예외: 네온·그라데이션·3D 글자처럼 고유 색이 핵심인 스타일 데모는 고정 색 허용(다크·라이트 둘 다에서 보이게).
- 폰트는 상속(Pretendard → 시스템). 아이콘은 인라인 SVG(외부 리소스·이미지·CDN 금지). 이모지는 최소한으로.
- "폰 화면" 느낌이 필요하면 `<div class="ui-phone">`(공통 클래스: 220×180, 둥근 모서리, --surface 배경, 그림자)을 쓸 수 있다. 공통 유틸: `.ui-btn`(accent 버튼), `.ui-chip`, `.ui-line`(회색 막대, 높이 8px), `.ui-thumb`(옅은 파랑 사각형).
- 예시 텍스트는 자연스러운 한국어 쇼핑·여행·서비스 맥락(예: "제주 3박 4일", "캠핑 의자 39,000원"). 실존 브랜드명·인물·출처 계정명 금지.

## 프롬프트 규칙 (복사 버튼으로 클로드에게 그대로 붙여 넣는 문장)
- 2~4문장, 120~220자. 해요체 아닌 **요청형 평서문**("~만들어 줘.").
- 반드시 포함: 패턴 이름(한글+영문), 동작(무엇이 어떻게 움직이는지), 핵심 수치(시간 ms/s, 이징, 크기·색 역할), 상호작용/접근성 포인트 1개(예: prefers-reduced-motion, aria, 키보드).
- 예: `「카운트업(Count-up)」 숫자를 만들어 줘. 화면에 들어오면 0에서 목표값 12,480까지 1.2초 동안 ease-out으로 올라가고 천 단위 쉼표를 유지해. 한 번만 재생하고, prefers-reduced-motion이면 바로 최종값을 보여 줘.`
- 'vs' 항목(예: 토글 vs 체크박스)은 데모에서 두 개를 나란히 보여주고, desc에 차이를 한 줄로, 프롬프트는 "언제 무엇을 쓰는지" + 둘 다 구현 요청.

## 품질 기준
- 실제로 움직여야 한다(정지 그림 금지). 재생 직후와 2초 후 화면이 달라야 함(무한 반복형 포함).
- 콘솔 에러 0, 스테이지 밖으로 넘침 없음, 다크 모드에서 글자 대비 확보.
- 캡처 원작의 레이아웃·문구를 베끼지 말고 개념만 차용.
- 애니메이션 기본: 200~600ms, ease-out / cubic-bezier(.2,.8,.2,1). 과한 바운스 금지(스프링 데모 제외).

## 100개 목록 (ID · 한글 · 영문)
### progress — 진행·상태
pr01 단계 표시 Step indicator · pr02 진행 바 Progress bar · pr03 원형 진행 Progress ring · pr04 체크리스트 Checklist · pr05 페이지 점 Page dots · pr06 퍼센트 숫자 Percentage · pr07 남은 시간 Time left · pr08 완료 표시 Success state · pr09 스켈레톤 Skeleton · pr10 스피너 Spinner
### commerce — 가격·혜택
cm01 취소선 가격 Strikethrough price · cm02 할인율 뱃지 Discount badge · cm03 마감 타이머 Countdown · cm04 쿠폰 받기 Coupon · cm05 묶음 할인 Bundle deal · cm06 재고 표시 Low stock · cm07 최저가 표시 Lowest price · cm08 적립금 Reward points · cm09 무료배송 바 Free shipping bar · cm10 앵커링 Anchoring
### action — 버튼·반응
ac01 좋아요 vs 찜 Like vs Wishlist · ac02 찜 vs 장바구니 Wishlist vs Cart · ac03 북마크 vs 좋아요 Bookmark vs Like · ac04 팔로우 vs 알림 설정 Follow vs Notify · ac05 공유 vs 링크 복사 Share vs Copy link · ac06 별점 vs 리뷰 Rating vs Review · ac07 좋아요 vs 리액션 Like vs Reaction · ac08 저장 vs 다운로드 Save vs Download · ac09 플로팅 버튼 Floating action button · ac10 미트볼 vs 케밥 Meatballs vs Kebab
### input — 입력·선택
in01 토글 vs 체크박스 Toggle vs Checkbox · in02 라디오 vs 체크박스 Radio vs Checkbox · in03 드롭다운 vs 피커 Dropdown vs Picker · in04 캘린더 Calendar · in05 기간 선택 Date range · in06 휠 피커 Wheel picker · in07 슬라이더 Range slider · in08 칩 vs 배지 Chip vs Badge · in09 플레이스홀더 vs 라벨 Placeholder vs Label · in10 약관 동의 Terms agreement
### search — 검색
se01 검색창 Search bar · se02 자동완성 Autocomplete · se03 최근 검색어 Recent searches · se04 인기 검색어 Trending · se05 필터 Filter · se06 정렬 Sort · se07 검색어 강조 Highlight · se08 결과 없음 No results · se09 검색 범위 탭 Scope tabs · se10 빠른 선택 칩 Quick chips
### layout — 목록·레이아웃
ly01 리스트 List · ly02 그리드 Grid · ly03 카드 Card · ly04 캐러셀 Carousel · ly05 테이블 Table · ly06 타임라인 Timeline · ly07 아코디언 Accordion · ly08 메이슨리 Masonry · ly09 무한 스크롤 Infinite scroll · ly10 벤토 그리드 Bento grid
### nav — 내비게이션
nv01 햄버거 메뉴 Hamburger menu · nv02 베지 버거 Veggie burger · nv03 하단 탭바 Tab bar · nv04 상단 탭 Top tabs · nv05 드로어 Navigation drawer · nv06 바텀시트 Bottom sheet · nv07 브레드크럼 Breadcrumb · nv08 페이지네이션 Pagination · nv09 세그먼트 컨트롤 Segmented control · nv10 온보딩 Onboarding
### feedback — 피드백·알림
fb01 토스트 vs 스낵바 Toast vs Snackbar · fb02 팝업 vs 모달 Popup vs Modal · fb03 툴팁 vs 팝오버 Tooltip vs Popover · fb04 알림 배지 Notification badge · fb05 푸시 알림 Push notification · fb06 권한 요청 Permission request · fb07 코치마크 Coach mark · fb08 빈 화면 Empty state · fb09 에러 흔들림 Shake error · fb10 스플래시 Splash screen
### motion — 모션·스크롤
mo01 페이드 업 Fade up · mo02 패럴랙스 Parallax · mo03 스티키 헤더 Sticky header · mo04 스케일 인 Scale in · mo05 텍스트 리빌 Text reveal · mo06 스태거 Stagger · mo07 스크롤 진행 바 Scroll progress · mo08 스프링 Spring · mo09 이즈인·이즈아웃 Easing · mo10 확대 전환 Zoom transition
### style — 글자·효과
st01 카운트업 Count-up · st02 타이핑 Typewriter · st03 네온 사인 Neon sign · st04 그라데이션 글자 Gradient text · st05 3D 입체 3D extrude · st06 글리치 Glitch · st07 마스크 리빌 Mask reveal · st08 마퀴 Marquee · st09 글래스모피즘 Glassmorphism · st10 다크 모드 Dark mode

---
## 분할 개정 (v2) — 'A vs B' 항목을 각각 단독 카드로 분리
사용자 피드백: vs 카드의 프롬프트가 "둘 다 만들어 줘"라서 실제로는 하나만 고르는 사용에 맞지 않음 → **모든 vs 항목을 개별 패턴으로 분리**한다. 100개를 넘어도 된다.

### 분할 규칙
- 카드 1장 = 패턴 1개. 데모·desc·프롬프트 모두 그 패턴 하나만 다룬다. 프롬프트는 "이 패턴 하나만 만들어 줘" 형태(다른 쪽 구현 요청 금지).
- 헷갈리는 짝은 새 필드 `pair: '<상대 id>'` 로 연결한다(카드에 "헷갈리는 짝 ○○ →" 링크가 자동 표시됨). 짝이 여럿이면 가장 헷갈리는 하나만.
- desc는 "~해요" 한 줄로, 짝과의 차이가 드러나게(예: "찜과 달리 숫자를 공개해 공감을 표시해요.").
- 프롬프트 안에 "△△(짝)과 헷갈리지 않게 ~는 하지 마." 같은 경계 한 구절을 넣어 클로드가 혼동하지 않게 한다.
- 기존 vs 데모의 좋은 모션은 살려서 단독 데모로 재구성하되, 단독 카드답게 한 패턴을 크게·명확하게 보여준다(좌우 분할 레이아웃 제거).
- 짝 카드는 목록에서 바로 붙여 배치. ID는 카테고리 안에서 01부터 다시 순번.
- vs가 아닌 기존 항목(ac09 FAB, in04 캘린더 등)은 내용을 그대로 두고 ID만 새 순번으로 바꾼다.

### 새 목록
#### action — 버튼·반응 (16)
ac01 좋아요 Like (pair ac02) · ac02 찜 Wishlist (pair ac01) · ac03 장바구니 담기 Add to cart (pair ac02) · ac04 북마크 Bookmark (pair ac01) · ac05 팔로우 Follow (pair ac06) · ac06 알림 설정 Notify (pair ac05) · ac07 공유 Share (pair ac08) · ac08 링크 복사 Copy link (pair ac07) · ac09 별점 Rating (pair ac10) · ac10 리뷰 작성 Review (pair ac09) · ac11 리액션 Reaction (pair ac01) · ac12 저장 Save (pair ac13) · ac13 다운로드 Download (pair ac12) · ac14 플로팅 버튼 Floating action button (기존 ac09) · ac15 미트볼 메뉴 Meatballs menu (pair ac16) · ac16 케밥 메뉴 Kebab menu (pair ac15)
#### input — 입력·선택 (14)
in01 토글 Toggle (pair in02) · in02 체크박스 Checkbox (pair in01) · in03 라디오 버튼 Radio button (pair in02) · in04 드롭다운 Dropdown (pair in05) · in05 액션시트 피커 Action sheet picker (pair in04; 아래에서 올라오는 선택지 목록 — 휠 피커 in08과 다르게 목록형으로) · in06 캘린더 Calendar · in07 기간 선택 Date range · in08 휠 피커 Wheel picker · in09 슬라이더 Range slider · in10 칩 Chip (pair in11) · in11 상태 배지 Status badge (pair in10; NEW·BEST처럼 상태만 표시, 누를 수 없음) · in12 플레이스홀더 Placeholder (pair in13) · in13 플로팅 라벨 Floating label (pair in12) · in14 약관 동의 Terms agreement
#### feedback — 피드백·알림 (13)
fb01 토스트 Toast (pair fb02) · fb02 스낵바 Snackbar (pair fb01) · fb03 팝업 Popup (pair fb04) · fb04 모달 Modal (pair fb03) · fb05 툴팁 Tooltip (pair fb06) · fb06 팝오버 Popover (pair fb05) · fb07 알림 배지 Notification badge · fb08 푸시 알림 Push notification · fb09 권한 요청 Permission request · fb10 코치마크 Coach mark · fb11 빈 화면 Empty state · fb12 에러 흔들림 Shake error · fb13 스플래시 Splash screen
(나머지 7개 카테고리는 원래 vs 항목이 없어 그대로 유지)
