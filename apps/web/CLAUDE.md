# apps/web

Shopby headless 커머스. API: https://docs.shopby.co.kr/
패키지 매니저: pnpm (workspace) / Path alias: `@/*` → `./src/*`

## 스택

- Next.js 16 Pages Router (`--webpack`), React Compiler
- 스타일: Vanilla Extract (`.css.ts`) — 테마: `styles/theme.css.ts`, 타이포: `styles/typography.css.ts`
- 상태: Zustand (`store/`) / React Query (`api/`)
- 폼: React Hook Form + Zod
- UI: Radix UI, Lucide, Swiper, Motion
- 모달: overlay-kit / 바텀시트: vaul / 토스트: Sonner
- HTTP: Axios (`shopbyRequest`, baseURL: `NEXT_PUBLIC_SHOPBY_BASE_URL`)
- 스크롤: Lenis
- admin은 Vite + React 19 + Tailwind CSS v4

## 디렉토리 (src/)

```
api/        components/   configs/   const/   context/
helpers/    hooks/        i18n/      models/  pages/
schema/     store/        styles/    types/   utils/
```

## 컴포넌트 구조

폴더당 `index.tsx` (로직) + `index.css.ts` (스타일) + `index.ts` (re-export, 필요 시)
외부에서는 폴더 경로(`@/components/...`)로만 접근 — 파일 직접 참조 금지

## 컨벤션

**Prettier**: `tabWidth: 4, singleQuote: true, trailingComma: 'all', semi: true, jsxSingleQuote: true, printWidth: 80`

- Named Export 필수 (`export const ...`) — Default Export 금지
- 절대 경로(`@/`) 필수 — 상대 경로 금지
- 컴포넌트는 화살표 함수로 선언
- 새 Barrel File(`index.ts`) 추가 시 `next.config.ts`의 `optimizePackageImports`에 경로 추가

## 패턴

- 페이지 레이아웃: `getLayout` 패턴 (`NextPageWithLayout`)
- 페이지 전환: `AnimatePresence` + `motion.div` (opacity/y)
- API 에러: `isAxiosError` 체크, 400은 retry 안 함
- Lenis: 모달·팝업·바텀시트 내부 스크롤 영역에 `data-lenis-prevent` 필수

## 금지

- web에서 Tailwind 사용 금지 / admin에서 Vanilla Extract 사용 금지
- CDN 이미지는 `<img>` 사용 — `next/image` 최적화는 CDN과 중복이므로 불필요 (ESLint `no-img-element` off)
- 페이지 확장자: `.tsx` / API 라우트: `.api.ts`
