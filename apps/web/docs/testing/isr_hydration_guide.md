# ISR & React Query Hydration 테스트 가이드

이 문서는 `getStaticProps`와 `useSuspenseQuery`가 조합된 ISR(Incremental Static Regeneration) 패턴이 의도대로 동작하는지 검증하기 위한 테스트 절차를 안내합니다.

---

## 1. 정적 데이터 포함 여부 확인 (Hydration 체크)

서버에서 미리 구워온 데이터가 HTML에 포함되어 있는지 확인합니다.

1.  테스트 대상 페이지(예: `/signup/register-method`)에 접속합니다.
2.  브라우저에서 **페이지 소스 보기**(`Cmd + Option + U` 또는 우클릭 -> 페이지 소스 보기)를 실행합니다.
3.  **체크포인트:**
    *   `<ul>`, `<li>` 등 배너 리스트의 실제 텍스트 내용이 HTML 코드 안에 글자로 포함되어 있는가? (포함되어 있다면 SSR 성공)
    *   소스 하단의 `<script id="__NEXT_DATA__" type="application/json">` 태그 안에 배너 데이터 JSON이 포함되어 있는가? (포함되어 있다면 Hydration용 데이터 전달 성공)

## 2. API 중복 호출 여부 확인 (성능 체크)

서버에서 받은 데이터를 클라이언트가 재사용하여 불필요한 네트워크 요청을 방지하는지 확인합니다.

1.  개발자 도구(F12)의 **Network** 탭을 엽니다.
2.  페이지를 새로고침합니다.
3.  **체크포인트:**
    *   최초 로드 시 배너 API(`display/banners/...`) 호출이 **네트워크 탭에 나타나지 않아야 합니다.**
    *   만약 호출이 발생한다면 서버의 `queryKey`와 클라이언트의 `queryKey`가 일치하지 않아 데이터 재사용에 실패한 것입니다.

## 3. 서버 에러 복구 로직 확인 (안정성 체크)

서버에서 API 호출이 실패했을 때 페이지가 죽지 않고 클라이언트에서 자동으로 복구되는지 확인합니다.

1.  `getStaticProps`의 `fetchQuery` 내부에서 강제로 에러를 발생시킵니다.
    ```tsx
    // 임시 테스트 코드
    await queryClient.fetchQuery({
        queryKey: bannerKeys.list(BANNER_LIST),
        queryFn: async () => { throw new Error("서버 에러 테스트"); }
    });
    ```
2.  페이지를 새로고침합니다.
3.  **체크포인트:**
    *   **서버 터미널**: `ISR Prefetch Error` 로그가 찍히지만 서버 프로세스는 종료되지 않아야 합니다.
    *   **브라우저 화면**: "로딩중" 메시지가 아주 잠깐 보였다가 배너가 나타나야 합니다.
    *   **Network 탭**: 이번에는 서버가 준 데이터가 없으므로 브라우저가 직접 API를 호출하는 모습이 보여야 합니다.

## 4. ISR 갱신 주기 확인 (최신성 체크)

설정한 `revalidate` 주기(현재 60초)에 맞춰 데이터가 갱신되는지 확인합니다.

1.  관리자 페이지에서 배너 내용을 수정합니다.
2.  페이지를 새로고침합니다. (처음에는 이전 내용이 보일 수 있습니다 - ISR의 Stale-While-Revalidate 특성)
3.  **다시 한 번 새로고침**을 했을 때 수정된 내용이 반영되어 나오는지 확인합니다.

---

> [!IMPORTANT]
> 로컬 개발 환경(`pnpm dev`)에서는 `getStaticProps`가 매 요청마다 실행되므로 `revalidate` 주기를 기다릴 필요 없이 즉시 테스트가 가능합니다. 실제 운영 환경(Production Build)에서의 동작은 위 '4번' 항목의 절차를 따릅니다.
