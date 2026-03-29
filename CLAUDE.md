# CLAUDE.md

Shopby 기반 headless 커머스 모노레포. API 문서: https://docs.shopby.co.kr/

## 구조

- `apps/web`: Next.js 16 (Pages Router) — 고객 쇼핑몰
- `apps/admin`: Vite + React 19 — 관리자 대시보드
- `@/*` → `./src/*` (path alias)
- 패키지 매니저: **pnpm** (workspace)

## 기술 스택

### web (apps/web)

- Next.js 16 Pages Router (`--webpack`), React Compiler 활성화
- 스타일: **Vanilla Extract** (`.css.ts` 파일)
- 상태: Zustand (store/), React Query (api/)
- 폼: React Hook Form + Zod
- UI: Radix UI, Lucide Icons, Swiper, Motion (framer-motion)
- SEO: next-seo, 다국어: i18next
- 토스트: Sonner, 모달: overlay-kit, 바텀시트: vaul
- HTTP: Axios (`shopbyRequest` 인스턴스, baseURL은 env NEXT_PUBLIC_SHOPBY_BASE_URL)
- 스무스 스크롤: Lenis

### admin (apps/admin)

- Vite + React 19 + React Router 7
- 스타일: **Tailwind CSS v4**
- 차트: ApexCharts, 캘린더: FullCalendar

## 코드 컨벤션

### Prettier

```
tabWidth: 4, singleQuote: true, trailingComma: 'all', semi: true
jsxSingleQuote: true, printWidth: 80
```

### 디렉토리 구조 (web)

```
src/
  api/          # API 모듈 (도메인별 하위 폴더) — core/request.ts에 axios 인스턴스
  components/   # UI 컴포넌트 (도메인별 하위 폴더 + ui/ 공통)
  configs/      # 환경설정
  const/        # 상수
  context/      # React Context
  helpers/      # 유틸리티 함수
  hooks/        # 커스텀 훅
  i18n/         # 다국어 설정
  models/       # 데이터 모델/타입
  pages/        # Next.js 페이지 라우트
  schema/       # Zod 스키마
  store/        # Zustand 스토어
  styles/       # Vanilla Extract 테마/글로벌 스타일
  types/        # TypeScript 타입
  utils/        # 유틸리티
```

### 스타일링 규칙

- **web**: Vanilla Extract만 사용. **폴더명 = 컴포넌트명** 구조이며, 반드시 `index.tsx`와 `index.css.ts` 파일을 생성하여 참조
- **admin**: Tailwind CSS v4 사용
- web 테마 토큰은 `styles/theme.css.ts`의 `vars` 객체 참조
- 타이포그래피는 `styles/typography.css.ts` 참조

### 패턴

- 모든 import 경로는 `@/`를 포함한 절대 경로(Path Alias)를 사용함.
- 페이지별 레이아웃: `getLayout` 패턴 사용 (`NextPageWithLayout` 타입)
- 페이지 전환 애니메이션: AnimatePresence + motion.div (opacity/y)
- API 에러 핸들링: Axios isAxiosError로 체크, 400은 retry 안함
- env 변수: `NEXT_PUBLIC_` 접두사 필수 (클라이언트)
- **Lenis (스무스 스크롤)**: 모달, 팝업, 바텀시트 등 내부에서 별도 스크롤이 필요한 영역에는 반드시 **`data-lenis-prevent`** 속성을 추가하여 메인 스크롤과의 간섭을 방지

### 절대 하지 말 것

- web 앱에서 Tailwind 사용 금지
- admin 앱에서 Vanilla Extract 사용 금지
- `next/image` 대신 `<img>` 사용 (CDN 이미지, ESLint에서 no-img-element off)
- pageExtensions: `['tsx', 'api.ts']` — 페이지는 .tsx, API 라우트는 .api.ts

## 한국어로 응답
