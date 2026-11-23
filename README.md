# UI 모션 라이브러리

UI 패턴을 **움직이는 데모 + 클로드에게 붙여 넣는 프롬프트**로 모아 둔 사내 레퍼런스입니다.
디자이너·개발자·AI와 화면을 "이름"으로 소통하기 위해 만들었습니다.

- 배포 주소: https://fundable-main.github.io/ui-motion-dictionary/
- `main` 브랜치에 push 하면 **자동으로 빌드·배포**됩니다(1~2분, Actions 탭에서 진행 확인).

## 폴더 구조

| 경로 | 내용 |
|---|---|
| `demos/<카테고리>.js` | 카드 데이터와 데모 코드. **대부분의 수정은 여기서** 합니다 |
| `demos/<카테고리>_2.js` | 같은 카테고리의 추가분(2026-11-23, 113→250개 확장). 화면에서는 `<카테고리>.js` 뒤에 이어 붙습니다. 파일마다 따로 감싸지므로 **다른 파일의 헬퍼 함수는 쓸 수 없습니다** |
| `shell.html` | 공통 화면(헤더·로고·검색·필터·카드·복사 기능) |
| `SPEC.md` | 카드 작성 규격(필드, 프롬프트 규칙, 색 변수, 품질 기준) — 수정 전에 꼭 읽어 주세요 |
| `build.py` | `shell.html` + `demos/*.js` → `dist/index.html` 한 파일로 합침 |
| `test.py` | 자동 점검(콘솔 에러·빈 데모·넘침·프롬프트 길이) + 스크린샷 |

## 수정하는 법

1. `demos/` 의 해당 카테고리 파일에서 카드를 찾습니다(id로 검색, 예: `id: 'ac01'`).
2. `ko`(한글 이름)·`en`(영문)·`desc`(한 줄 설명)·`prompt`(복사용 프롬프트)·`pair`(헷갈리는 짝)·`css`/`html`/`run`(데모)을 고칩니다.
3. 로컬 확인: `python3 build.py` 후 `dist/index.html` 을 브라우저로 엽니다.
4. (권장) 자동 점검: `pip install playwright && playwright install chromium` 한 번 한 뒤 `python3 test.py --cat action` → `0 flagged` 확인.
5. 커밋하고 `main` 에 push 하면 자동 배포됩니다.

클로드 코드로 수정할 때는 "SPEC.md 읽고 demos/action.js 의 ac03 프롬프트를 ~로 바꿔 줘, test.py 로 확인하고 push" 처럼 요청하면 됩니다.

### 새 카드 추가
- 해당 카테고리의 마지막 파일(`_2.js` 가 있으면 그 파일) 배열에 객체를 하나 더 넣습니다. id는 카테고리 접두사 + 다음 번호(예: `ac28`). 카드는 `grep -n "id: 'ac18'" demos/*.js` 로 찾습니다.
- 카테고리 13개: progress·commerce·action·input·search·layout·nav·feedback·motion·style·gesture·data·media. 새 카테고리를 만들려면 `shell.html` 의 `CATS` 와 `build.py` 의 `ORDER` 에 추가합니다.
- CSS 선택자는 전부 `.d-<id>` 로 시작, `@keyframes` 이름은 `<id>-` 접두사.
- 타이머·이벤트는 `ctx.timeout / ctx.interval / ctx.loop / ctx.on` 만 사용(화면 밖으로 나가면 자동 정리).

## 주의
- 이 페이지는 검색엔진 비노출(noindex)입니다. 외부 공개 홍보용이 아닙니다.
- 로고 이미지는 `shell.html` 안에 base64로 들어 있습니다.
