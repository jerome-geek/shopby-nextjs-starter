# packages/shopby-core 분리 구현 플랜

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `apps/web`의 API 호출 레이어(api/, models/, 순수 React Query hooks)를 `packages/shopby-core`로 분리해 Shopby 헤드리스 커머스 템플릿 재사용성을 확보한다.

**Architecture:** `packages/utils`와 동일한 빌드-없는 소스 패키지 방식. `main: ./src/index.ts`로 설정해 Next.js가 직접 컴파일. `apps/web`에서 `@/api/*`, `@/models/*` 등 경로를 `@geek/shopby-core`로 교체.

**Tech Stack:** pnpm workspaces, Turborepo, TypeScript project references, Next.js 16 (Pages Router), @tanstack/react-query v5, axios, cookies-next

**스펙 문서:** `docs/superpowers/specs/2026-05-21-shopby-core-package-design.md`

---

## 진행 상태 체크리스트 (세션 간 재개용)

> 다른 세션에서 재개 시 이 체크리스트를 먼저 확인하고, 완료된 태스크는 건너뛴다.

- [ ] Task 1: 패키지 스캐폴드 생성
- [ ] Task 2: api/ + models/ 복사
- [ ] Task 3: 지원 파일 복사 (configs, const, utils)
- [ ] Task 4: 순수 API hooks 복사
- [ ] Task 5: src/index.ts 작성
- [ ] Task 6: apps/web 설정 파일 업데이트
- [ ] Task 7: apps/web import 경로 일괄 교체
- [ ] Task 8: apps/web 잔류 파일 re-export 처리
- [ ] Task 9: apps/web 원본 파일 삭제
- [ ] Task 10: 설치 및 타입 검증
- [ ] Task 11: 런타임 검증

---

## Task 1: 패키지 스캐폴드 생성

**Files:**
- Create: `packages/shopby-core/package.json`
- Create: `packages/shopby-core/tsconfig.json`
- Create: `packages/shopby-core/src/index.ts` (빈 파일)

- [ ] **Step 1: 디렉토리 생성**

```bash
mkdir -p packages/shopby-core/src
```

- [ ] **Step 2: package.json 작성**

`packages/shopby-core/package.json`:
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
        "cookies-next": ">=4",
        "typescript": ">=5.0.0"
    }
}
```

- [ ] **Step 3: tsconfig.json 작성**

`packages/shopby-core/tsconfig.json`:
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
        "jsx": "react-jsx",
        "resolveJsonModule": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules"]
}
```

- [ ] **Step 4: 빈 index.ts 생성**

```bash
echo "// re-exports will be added in Task 5" > packages/shopby-core/src/index.ts
```

- [ ] **Step 5: 커밋**

```bash
git add packages/shopby-core/
git commit -m "🔧 chore: packages/shopby-core 스캐폴드 생성"
```

---

## Task 2: api/ + models/ 복사

**Files:**
- Copy: `apps/web/src/api/` → `packages/shopby-core/src/api/`
- Copy: `apps/web/src/models/` → `packages/shopby-core/src/models/`

> ⚠️ 이 단계는 복사이며 삭제가 아님. 원본은 Task 9에서 삭제.

- [ ] **Step 1: api/ 복사**

```bash
cp -r apps/web/src/api packages/shopby-core/src/api
```

- [ ] **Step 2: models/ 복사**

```bash
cp -r apps/web/src/models packages/shopby-core/src/models
```

- [ ] **Step 3: 파일 수 검증**

```bash
echo "api files:" && find packages/shopby-core/src/api -name "*.ts" | wc -l
echo "models files:" && find packages/shopby-core/src/models -name "*.ts" | wc -l
```

예상 출력:
```
api files: 80 (이상)
models files: 72 (이상)
```

- [ ] **Step 4: 커밋**

```bash
git add packages/shopby-core/src/api packages/shopby-core/src/models
git commit -m "🔧 chore: api, models를 shopby-core 패키지로 복사"
```

---

## Task 3: 지원 파일 복사 (configs, const, utils)

api/core가 의존하는 파일들. 이 파일들 없이는 api/core가 동작 안 함.

**Files:**
- Copy: `apps/web/src/configs/env.ts` → `packages/shopby-core/src/configs/env.ts`
- Copy: `apps/web/src/const/cookieKeys.ts` → `packages/shopby-core/src/const/cookieKeys.ts`
- Copy: `apps/web/src/utils/cookie.ts` → `packages/shopby-core/src/utils/cookie.ts`
- Copy: `apps/web/src/utils/auth.ts` → `packages/shopby-core/src/utils/auth.ts`
- Copy: `apps/web/src/utils/auth.client.ts` → `packages/shopby-core/src/utils/auth.client.ts`

- [ ] **Step 1: 디렉토리 생성 및 파일 복사**

```bash
mkdir -p packages/shopby-core/src/configs
mkdir -p packages/shopby-core/src/const
mkdir -p packages/shopby-core/src/utils

cp apps/web/src/configs/env.ts packages/shopby-core/src/configs/env.ts
cp apps/web/src/const/cookieKeys.ts packages/shopby-core/src/const/cookieKeys.ts
cp apps/web/src/utils/cookie.ts packages/shopby-core/src/utils/cookie.ts
cp apps/web/src/utils/auth.ts packages/shopby-core/src/utils/auth.ts
cp apps/web/src/utils/auth.client.ts packages/shopby-core/src/utils/auth.client.ts
```

- [ ] **Step 2: 복사된 파일 내 import 경로 확인**

`packages/shopby-core/src/utils/cookie.ts`에 `from '@/const/cookieKeys'`가 있는지 확인:
```bash
grep "from '@/" packages/shopby-core/src/utils/cookie.ts
grep "from '@/" packages/shopby-core/src/utils/auth.ts
```

패키지의 `@/` → `src/`로 매핑되므로 경로 수정 불필요. 내용 그대로 유지.

- [ ] **Step 3: 커밋**

```bash
git add packages/shopby-core/src/configs packages/shopby-core/src/const packages/shopby-core/src/utils
git commit -m "🔧 chore: 지원 파일(configs, const, utils)을 shopby-core로 복사"
```

---

## Task 4: 순수 API hooks 복사

순수 React Query 호출 hooks만 복사. 라우팅·스토어·UI 의존 hooks는 제외.

**복사 대상:**
- `apps/web/src/hooks/mutations/` → `packages/shopby-core/src/hooks/mutations/`
- `apps/web/src/hooks/query/` → `packages/shopby-core/src/hooks/query/`
- `apps/web/src/hooks/suspenseQuery/` → `packages/shopby-core/src/hooks/suspenseQuery/`
- `apps/web/src/hooks/infiniteQuery/` → `packages/shopby-core/src/hooks/infiniteQuery/`
- `apps/web/src/hooks/queryKeys/` → `packages/shopby-core/src/hooks/queryKeys/`

- [ ] **Step 1: hooks 폴더 복사**

```bash
mkdir -p packages/shopby-core/src/hooks

cp -r apps/web/src/hooks/mutations packages/shopby-core/src/hooks/mutations
cp -r apps/web/src/hooks/query packages/shopby-core/src/hooks/query
cp -r apps/web/src/hooks/suspenseQuery packages/shopby-core/src/hooks/suspenseQuery
cp -r apps/web/src/hooks/infiniteQuery packages/shopby-core/src/hooks/infiniteQuery
cp -r apps/web/src/hooks/queryKeys packages/shopby-core/src/hooks/queryKeys
```

- [ ] **Step 2: 외부 의존성 없음 확인**

복사된 hooks에 `@/const`, `@/store`, `@/context`, `@/components`, `@/entities`, `@/schema` 참조가 없어야 함:
```bash
grep -rn "from '@/const\|from '@/store\|from '@/context\|from '@/components\|from '@/entities\|from '@/schema" \
  packages/shopby-core/src/hooks/
```

출력이 없으면 OK. 출력이 있으면 해당 파일은 패키지에서 제거하고 apps/web에 잔류시킨다.

- [ ] **Step 3: 커밋**

```bash
git add packages/shopby-core/src/hooks
git commit -m "🔧 chore: 순수 API hooks를 shopby-core 패키지로 복사"
```

---

## Task 5: src/index.ts 작성

패키지 외부에서 사용할 모든 심볼을 re-export. 이 파일이 패키지의 public API.

**Files:**
- Modify: `packages/shopby-core/src/index.ts`

- [ ] **Step 1: index.ts 생성 스크립트 실행**

아래 스크립트로 src/ 하위 모든 index.ts를 찾아 re-export 구문을 자동 생성:
```bash
find packages/shopby-core/src -name "index.ts" \
  | grep -v "^packages/shopby-core/src/index.ts$" \
  | sort \
  | sed "s|packages/shopby-core/src/||" \
  | sed "s|/index.ts||" \
  | sed "s|^|export * from './|" \
  | sed "s|$|';|"
```

출력된 내용을 검토 후 `packages/shopby-core/src/index.ts`에 붙여넣는다.

- [ ] **Step 2: index.ts 없는 핵심 파일 수동 추가**

`packages/shopby-core/src/index.ts` 하단에 아래 항목 추가 (index.ts가 없는 파일들):
```ts
// configs
export * from './configs/env';

// const
export * from './const/cookieKeys';

// utils
export * from './utils/cookie';
export * from './utils/auth';
export * from './utils/auth.client';

// api core (index.ts 없는 경우)
export * from './api/core/request';
export * from './api/core/authInterceptor';
export * from './api/core/utils';
export * from './api/core/cookie';
export * from './api/core/controller';
export * from './api/core/geekRequest';
```

- [ ] **Step 3: 커밋**

```bash
git add packages/shopby-core/src/index.ts
git commit -m "🔧 chore: shopby-core 패키지 public index 작성"
```

---

## Task 6: apps/web 설정 파일 업데이트

**Files:**
- Modify: `apps/web/package.json`
- Modify: `apps/web/tsconfig.json`
- Modify: `apps/web/next.config.ts`

- [ ] **Step 1: apps/web/package.json에 의존성 추가**

`apps/web/package.json`의 `"dependencies"` 블록에 추가:
```json
"@geek/shopby-core": "workspace:*"
```

- [ ] **Step 2: apps/web/tsconfig.json 업데이트**

`apps/web/tsconfig.json`의 `"paths"` 블록에 추가:
```json
"@geek/shopby-core": ["../../packages/shopby-core/src/index.ts"],
"@geek/shopby-core/*": ["../../packages/shopby-core/src/*"]
```

`"include"` 배열에 추가:
```json
"../../packages/shopby-core/src/**/*"
```

`"references"` 배열에 추가:
```json
{ "path": "../../packages/shopby-core" }
```

- [ ] **Step 3: apps/web/next.config.ts의 optimizePackageImports 업데이트**

기존:
```ts
optimizePackageImports: ['@/components/modal', '@/components/layout'],
```

변경 후:
```ts
optimizePackageImports: ['@/components/modal', '@/components/layout', '@geek/shopby-core'],
```

- [ ] **Step 4: pnpm install**

```bash
pnpm install
```

- [ ] **Step 5: 커밋**

```bash
git add apps/web/package.json apps/web/tsconfig.json apps/web/next.config.ts pnpm-lock.yaml
git commit -m "📦 package: apps/web에 @geek/shopby-core 의존성 추가"
```

---

## Task 7: apps/web import 경로 일괄 교체

`apps/web/src` 전체에서 이동된 모듈의 import 경로를 `@geek/shopby-core`로 교체.

> ⚠️ 이 단계에서 원본 파일은 아직 삭제하지 않음. 타입 에러가 없음을 확인한 후 Task 9에서 삭제.

**Files:**
- Modify: `apps/web/src/**/*.ts`, `apps/web/src/**/*.tsx` (일괄 교체)

- [ ] **Step 1: import 경로 일괄 교체 실행**

```bash
# api/
find apps/web/src -name "*.ts" -o -name "*.tsx" | xargs perl -pi -e "s|from '@/api/[^']*'|from '@geek/shopby-core'|g"

# models/
find apps/web/src -name "*.ts" -o -name "*.tsx" | xargs perl -pi -e "s|from '@/models/[^']*'|from '@geek/shopby-core'|g"

# hooks/mutations, query, suspenseQuery, infiniteQuery, queryKeys (정규식 안정성을 위해 개별 실행)
find apps/web/src -name "*.ts" -o -name "*.tsx" | xargs perl -pi -e "s|from '@/hooks/mutations/[^']*'|from '@geek/shopby-core'|g"
find apps/web/src -name "*.ts" -o -name "*.tsx" | xargs perl -pi -e "s|from '@/hooks/query/[^']*'|from '@geek/shopby-core'|g"
find apps/web/src -name "*.ts" -o -name "*.tsx" | xargs perl -pi -e "s|from '@/hooks/suspenseQuery/[^']*'|from '@geek/shopby-core'|g"
find apps/web/src -name "*.ts" -o -name "*.tsx" | xargs perl -pi -e "s|from '@/hooks/infiniteQuery/[^']*'|from '@geek/shopby-core'|g"
find apps/web/src -name "*.ts" -o -name "*.tsx" | xargs perl -pi -e "s|from '@/hooks/queryKeys/[^']*'|from '@geek/shopby-core'|g"

# configs/env
find apps/web/src -name "*.ts" -o -name "*.tsx" | xargs perl -pi -e "s|from '@/configs/env'|from '@geek/shopby-core'|g"

# utils/cookie, auth, auth.client
find apps/web/src -name "*.ts" -o -name "*.tsx" | xargs perl -pi -e "s|from '@/utils/cookie'|from '@geek/shopby-core'|g"
find apps/web/src -name "*.ts" -o -name "*.tsx" | xargs perl -pi -e "s|from '@/utils/auth'|from '@geek/shopby-core'|g"
find apps/web/src -name "*.ts" -o -name "*.tsx" | xargs perl -pi -e "s|from '@/utils/auth\.client'|from '@geek/shopby-core'|g"
```

- [ ] **Step 2: 교체 결과 확인**

교체 후 `@/api`, `@/models` 등의 참조가 남아있는지 확인:
```bash
grep -rn "from '@/api/" apps/web/src | grep -v "node_modules" | wc -l
grep -rn "from '@/models/" apps/web/src | grep -v "node_modules" | wc -l
```

두 명령 모두 `0` 출력되면 OK.

- [ ] **Step 3: 타입 체크**

```bash
pnpm --filter web tsc --noEmit
```

에러 없으면 OK. 에러 있으면 에러 메시지를 분석해 누락된 export를 `packages/shopby-core/src/index.ts`에 추가.

- [ ] **Step 4: 커밋**

```bash
git add apps/web/src
git commit -m "🔨 refactor: apps/web import 경로를 @geek/shopby-core로 이전"
```

---

## Task 8: apps/web 잔류 파일 re-export 처리

apps/web에 남아있는 파일 중 삭제 예정인 파일을 참조하는 곳이 있으면 re-export 파일로 교체.

**Files:**
- Modify: `apps/web/src/const/cookieKeys.ts`

- [ ] **Step 1: cookieKeys re-export로 교체**

`apps/web/src/const/cookieKeys.ts` 내용을 아래로 교체:
```ts
export { COOKIE_KEYS } from '@geek/shopby-core';
```

> 이유: apps/web 내에 `from '@/const/cookieKeys'` 참조가 남아있을 수 있음. re-export로 하위 호환 유지.

- [ ] **Step 2: 잔류 참조 재확인**

```bash
grep -rn "from '@/const/cookieKeys'" apps/web/src | grep -v "node_modules"
```

출력된 파일들은 이미 위 re-export로 처리됨. 별도 수정 불필요.

- [ ] **Step 3: 타입 체크**

```bash
pnpm --filter web tsc --noEmit
```

- [ ] **Step 4: 커밋**

```bash
git add apps/web/src/const/cookieKeys.ts
git commit -m "🔨 refactor: cookieKeys를 shopby-core re-export로 교체"
```

---

## Task 9: apps/web 원본 파일 삭제

타입 체크가 통과된 이후에만 실행. 이 단계는 되돌리기 어려우므로 신중히 진행.

**Files:**
- Delete: `apps/web/src/api/` (전체)
- Delete: `apps/web/src/models/` (전체)
- Delete: `apps/web/src/configs/env.ts`
- Delete: `apps/web/src/utils/cookie.ts`
- Delete: `apps/web/src/utils/auth.ts`
- Delete: `apps/web/src/utils/auth.client.ts`
- Delete: `apps/web/src/hooks/mutations/`
- Delete: `apps/web/src/hooks/query/`
- Delete: `apps/web/src/hooks/suspenseQuery/`
- Delete: `apps/web/src/hooks/infiniteQuery/`
- Delete: `apps/web/src/hooks/queryKeys/`

- [ ] **Step 1: 삭제 전 최종 타입 체크 확인**

```bash
pnpm --filter web tsc --noEmit
```

반드시 에러 0개 확인 후 진행.

- [ ] **Step 2: 파일 삭제**

```bash
rm -rf apps/web/src/api
rm -rf apps/web/src/models
rm -f apps/web/src/configs/env.ts
rm -f apps/web/src/utils/cookie.ts
rm -f apps/web/src/utils/auth.ts
rm -f apps/web/src/utils/auth.client.ts
rm -rf apps/web/src/hooks/mutations
rm -rf apps/web/src/hooks/query
rm -rf apps/web/src/hooks/suspenseQuery
rm -rf apps/web/src/hooks/infiniteQuery
rm -rf apps/web/src/hooks/queryKeys
```

- [ ] **Step 3: 삭제 후 타입 체크**

```bash
pnpm --filter web tsc --noEmit
```

에러 없으면 OK.

- [ ] **Step 4: 커밋**

```bash
git add -A
git commit -m "🔧 chore: 이전 완료된 파일 apps/web에서 삭제"
```

---

## Task 10: 설치 및 타입 검증

- [ ] **Step 1: 전체 의존성 재설치**

```bash
pnpm install
```

- [ ] **Step 2: 전체 타입 체크**

```bash
pnpm --filter web tsc --noEmit
```

에러 없으면 OK.

- [ ] **Step 3: 패키지 내부 타입 체크 (선택)**

```bash
cd packages/shopby-core && npx tsc --noEmit
```

> 패키지는 독립 컴파일하지 않아도 되지만, 에러가 있다면 `src/index.ts` 누락 export 가능성.

- [ ] **Step 4: 커밋**

```bash
git add -A
git commit -m "🔧 chore: @geek/shopby-core 연동 검증"
```

---

## Task 11: 런타임 검증

- [ ] **Step 1: 개발 서버 실행**

```bash
pnpm dev:web
```

- [ ] **Step 2: 핵심 페이지 동작 확인**

브라우저에서 아래 경로 접근 후 API 호출이 정상 동작하는지 확인:
- `/` (홈 - display API)
- `/products` (상품 목록 - product API)
- `/mypage` (마이페이지 - member API, auth)

네트워크 탭에서 API 응답 200 확인.

- [ ] **Step 3: 빌드 확인**

```bash
pnpm --filter web build
```

빌드 에러 없으면 마이그레이션 완료.

- [ ] **Step 4: 최종 커밋**

```bash
git add -A
git commit -m "✨ feat: 템플릿 스킨화를 위한 @geek/shopby-core 패키지 분리"
```

---

## 트러블슈팅 가이드

### 타입 에러: "Module not found '@geek/shopby-core'"
→ `apps/web/tsconfig.json`의 `paths`에 `@geek/shopby-core` 매핑이 없는 것. Task 6 Step 2 재확인.

### 타입 에러: "has no exported member 'X'"
→ `packages/shopby-core/src/index.ts`에 해당 심볼이 re-export 안 된 것. 누락된 파일 경로를 index.ts에 추가.

### 런타임 에러: "NEXT_PUBLIC_SHOPBY_BASE_URL is undefined"
→ `apps/web/.env`에 환경변수가 없는 것. `.env.example`을 참고해 설정.

### hooks 내부에서 `@/api/*` 경로 에러
→ Task 7의 perl 교체가 hooks 파일에도 적용됐는지 확인. 패키지 내 hooks는 `@/api/*`를 그대로 사용해야 함(패키지 내부의 `@/`는 `src/`로 매핑됨).

> ⚠️ **중요:** Task 7의 perl 명령은 `apps/web/src` 경로만 대상으로 함. `packages/shopby-core/src` 내 파일은 건드리지 않음.
