# packages/shopby-core 분리 설계

**날짜:** 2026-05-21  
**목적:** 이 레포를 Shopby 헤드리스 커머스 템플릿으로 사용할 수 있도록 API 호출 레이어를 공통 패키지로 분리한다. 스킨 개발자는 `apps/web`을 fork해 UI만 작성하고, 데이터 레이어는 `@geek/shopby-core`를 그대로 사용한다.

---

## 1. 패키지 구조

```
packages/shopby-core/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts              (모든 public export 재노출)
    ├── api/                  ← apps/web/src/api/ 전체 이동
    │   ├── core/
    │   ├── auth/
    │   ├── display/
    │   ├── manage/
    │   ├── marketing/
    │   ├── member/
    │   ├── order/
    │   ├── product/
    │   ├── promotion/
    │   ├── claim/
    │   ├── storage/
    │   ├── shop/
    │   ├── admin/
    │   └── workspace/
    ├── models/               ← apps/web/src/models/ 전체 이동
    │   ├── api/
    │   ├── auth/
    │   ├── display/
    │   ├── manage/
    │   ├── marketing/
    │   ├── member/
    │   ├── order/
    │   ├── product/
    │   ├── promotion/
    │   ├── claim/
    │   ├── storage/
    │   ├── shop/
    │   └── admin/
    ├── configs/
    │   └── env.ts            ← apps/web/src/configs/env.ts 이동
    ├── const/
    │   └── cookieKeys.ts     ← apps/web/src/const/cookieKeys.ts 이동
    └── utils/
        ├── cookie.ts         ← apps/web/src/utils/cookie.ts 이동
        ├── auth.ts           ← apps/web/src/utils/auth.ts 이동
        └── auth.client.ts    ← apps/web/src/utils/auth.client.ts 이동
    └── hooks/                ← 순수 API 호출 hooks만 이동
        ├── mutations/        ← apps/web/src/hooks/mutations/ 전체
        ├── query/            ← apps/web/src/hooks/query/ 전체
        ├── suspenseQuery/    ← apps/web/src/hooks/suspenseQuery/ 전체
        ├── infiniteQuery/    ← apps/web/src/hooks/infiniteQuery/ 전체
        └── queryKeys/        ← apps/web/src/hooks/queryKeys/ 전체
```

---

## 2. 패키지 설정

### package.json

```json
{
  "name": "@geek/shopby-core",
  "version": "0.0.1",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "peerDependencies": {
    "react": ">=18",
    "@tanstack/react-query": ">=5",
    "axios": ">=1",
    "next": ">=14",
    "cookies-next": ">=4"
  }
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "baseUrl": ".",
    "composite": true,
    "paths": {
      "@/*": ["src/*"]
    },
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "esModuleInterop": true,
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

---

## 3. 이동 후 내부 import 처리

패키지 내 모든 파일의 `@/` alias는 패키지 `tsconfig.json`의 `@/* → src/*`로 해결된다.
이동 시 import 경로 수정은 불필요. 파일을 그대로 옮기면 된다.

**예외 (수정 필요):**
- `utils/cookie.ts` 안의 `from '@/const/cookieKeys'` → 패키지 내 경로이므로 그대로 유지 (OK)
- `utils/auth.ts` 안의 `from '@/utils/cookie'` → 패키지 내 경로이므로 그대로 유지 (OK)

---

## 4. apps/web 변경사항

### 4-1. package.json 의존성 추가

```json
{
  "dependencies": {
    "@geek/shopby-core": "workspace:*"
  }
}
```

### 4-2. tsconfig.json에 project reference 추가

```json
{
  "references": [
    { "path": "../../packages/shopby-core" }
  ]
}
```

### 4-3. import 경로 전수 교체

| 기존 (apps/web) | 변경 후 |
|---|---|
| `from '@/api/*'` | `from '@geek/shopby-core'` |
| `from '@/models/*'` | `from '@geek/shopby-core'` |
| `from '@/hooks/mutations/*'` | `from '@geek/shopby-core'` |
| `from '@/hooks/query/*'` | `from '@geek/shopby-core'` |
| `from '@/hooks/suspenseQuery/*'` | `from '@geek/shopby-core'` |
| `from '@/hooks/infiniteQuery/*'` | `from '@geek/shopby-core'` |
| `from '@/hooks/queryKeys/*'` | `from '@geek/shopby-core'` |
| `from '@/configs/env'` | `from '@geek/shopby-core'` |
| `from '@/utils/cookie'` | `from '@geek/shopby-core'` |
| `from '@/utils/auth'` | `from '@geek/shopby-core'` |
| `from '@/utils/auth.client'` | `from '@geek/shopby-core'` |

> **주의:** `@/const/cookieKeys`는 apps/web에 잔류하는 파일들이 참조할 수 있으므로  
> apps/web의 `const/cookieKeys.ts`는 `@geek/shopby-core`에서 re-export하는 형태로 교체한다.
>
> ```ts
> // apps/web/src/const/cookieKeys.ts (변경 후)
> export { COOKIE_KEYS } from '@geek/shopby-core';
> ```

### 4-4. 삭제할 파일/디렉토리 (이동 완료 후)

- `apps/web/src/api/` (전체)
- `apps/web/src/models/` (전체)
- `apps/web/src/configs/env.ts`
- `apps/web/src/utils/cookie.ts`
- `apps/web/src/utils/auth.ts`
- `apps/web/src/utils/auth.client.ts`
- `apps/web/src/hooks/mutations/` (전체)
- `apps/web/src/hooks/query/` (전체)
- `apps/web/src/hooks/suspenseQuery/` (전체)
- `apps/web/src/hooks/infiniteQuery/` (전체)
- `apps/web/src/hooks/queryKeys/` (전체)

---

## 5. next.config.ts 처리

`optimizePackageImports`에 `@geek/shopby-core` 추가:

```ts
experimental: {
  optimizePackageImports: [
    '@geek/shopby-core',
    // ...기존 항목
  ]
}
```

---

## 6. turbo.json 처리

`packages/shopby-core`는 빌드 없는 소스 패키지이므로 turbo pipeline 추가 불필요.

---

## 7. 남아있는 리스크

| 항목 | 내용 | 대응 |
|---|---|---|
| `cookieKeys.ts`의 하드코딩된 `MALL_ID` | 템플릿 사용자가 변경해야 함 | README에 필수 변경 항목으로 명시 |
| `apps/web/src/hooks/` 잔류 항목의 import | 이동 후 `@/utils/cookie` 등이 앱에서 삭제되면 잔류 hooks 깨짐 | 잔류 hooks는 `@geek/shopby-core`에서 import하도록 수정 |
| 타입 누락 | 일부 타입이 `index.ts`에 re-export되지 않으면 타입 에러 발생 | `src/index.ts`에서 모든 public API를 명시적으로 export |

---

## 8. 구현 순서 (Codex용)

1. `packages/shopby-core` 디렉토리 및 설정 파일 생성 (`package.json`, `tsconfig.json`)
2. `api/`, `models/` 파일 복사 (삭제는 나중에)
3. `configs/env.ts`, `const/cookieKeys.ts`, `utils/cookie.ts`, `utils/auth.ts`, `utils/auth.client.ts` 복사
4. `hooks/mutations/`, `hooks/query/`, `hooks/suspenseQuery/`, `hooks/infiniteQuery/`, `hooks/queryKeys/` 복사
5. `src/index.ts` 작성 (모든 api, models, hooks 도메인 re-export)
6. `apps/web/package.json`에 `@geek/shopby-core: workspace:*` 추가
7. `apps/web/tsconfig.json`에 project reference 추가
8. `apps/web/src` 전체에서 import 경로 일괄 교체 (sed 또는 AST 도구)
9. `apps/web/src/const/cookieKeys.ts`를 re-export 파일로 교체
10. 이전 파일/디렉토리 삭제
11. `apps/web/next.config.ts`의 `optimizePackageImports` 업데이트
12. `pnpm install` 후 타입 체크 (`pnpm --filter web tsc --noEmit`)
13. `pnpm dev:web` 실행해서 런타임 확인
