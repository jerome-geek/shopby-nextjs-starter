# 🧱 Web FSD-lite Convention

이 문서는 `apps/web`에서 사용하는 **실무형 FSD-lite 구조 규칙**을 정의합니다.

> [!IMPORTANT]
> 이 프로젝트의 FSD-lite는 일반적인 FSD를 그대로 복사한 형태가 아닙니다.
> 현재 코드베이스 운영 방식과 헤드리스 연동 구조를 반영하여, **유지할 전역 레이어**와
> **도메인 소유 레이어**를 함께 정의합니다.

---

## 1. 목표

이 구조의 목표는 아래 4가지입니다.

- **도메인 소유권을 명확하게 만든다**
- **UI / 기능 / 도메인 / 공용 코드의 경계를 분리한다**
- **페이지가 직접 레거시 전역 버킷에 의존하지 않도록 줄인다**
- **헤드리스 API 연동 구조는 유지하면서도 화면 구조는 FSD-lite로 정리한다**

---

## 2. 기본 레이어

`apps/web/src`의 기본 레이어는 아래처럼 본다.

```text
pages
features
entities
shared
```

각 레이어의 책임은 다음과 같다.

### 2-1. `pages`

- 라우트 엔트리
- SSR / SSG / ISR 연결
- 페이지 레벨 SEO
- 최종 화면 조립

`pages`는 가급적 **기능 조립**만 하고, 상세 UI/로직은 직접 들고 있지 않는다.

### 2-2. `features`

- 사용자 행동 단위 기능
- 화면 플로우
- 폼/오버레이/필터/정렬/입력 흐름
- 특정 유스케이스를 완성하는 컴포넌트/훅/유틸

예시:

- `features/order`
- `features/mypage`
- `features/search`
- `features/recipe`

### 2-3. `entities`

- 도메인 개념 자체
- 재사용 가능한 도메인 UI/훅/스키마/유틸
- 여러 feature에서 공통으로 소비되는 도메인 조각

예시:

- `entities/product`
- `entities/order`
- `entities/banner`
- `entities/productInquiry`

### 2-4. `shared`

- 도메인 비의존 공용 UI
- 공용 레이아웃
- 공용 유틸
- 공용 오버레이 셸

예시:

- `shared/ui`
- `shared/components`
- `shared/overlay`
- `shared/utils`

---

## 3. 이 프로젝트의 예외 규칙

일반적인 FSD-lite와 다르게, 이 프로젝트는 아래 레이어를 **전역 유지**한다.

### 3-1. `api/*`는 유지

`apps/web/src/api/*`는 헤드리스 연동 계층으로 유지한다.

이유:

- 외부 API 계약을 한곳에서 본다
- 백엔드 연동 구조를 기능 구조와 분리한다
- API 변경 대응 비용을 줄인다

즉, 도메인 API 구현을 무조건 `entities/*/api`로 내리지 않는다.

허용:

- `api/product`
- `api/order`
- `api/display`
- `api/core`

**`entities/*/api`는 아래 조건을 모두 만족할 때만 허용한다:**

- 해당 entities slice 내부에서만 사용되는 API 호출이다
- 외부 API 계약이 아닌 slice 전용 얇은 adapter 성격이다
- 루트 `api/`에 추가하면 오히려 응집도가 떨어지는 경우다

그 외에는 루트 `api/`에 둔다.

### 3-2. `models/*`는 유지

`apps/web/src/models/*`는 헤드리스 타입 계층으로 유지한다.

이유:

- API 응답/요청 타입을 한곳에서 관리한다
- DTO 성격의 타입을 기능 구조와 분리한다

즉, 모든 타입 파일을 `entities/*/model`로 무조건 이동하지 않는다.

### 3-3. 루트 query hooks는 유지

아래 트리는 기본적으로 유지한다.

- `hooks/query/*`
- `hooks/suspenseQuery/*`
- `hooks/infiniteQuery/*`

이유:

- API 래퍼 훅 계층으로 이미 팀 규칙이 잡혀 있음
- 연동성 높은 query 훅을 무리하게 slice 내부로 넣으면 복잡도가 증가함

> [!CAUTION]
> 훅이라고 해서 무조건 옮기지 않는다.
> **API 조회 래퍼**, **얇은 adapter**, **비즈니스 로직이 거의 없는 훅**은 기존 위치 유지가 우선이다.

### 3-4. `widgets` 레이어는 사용하지 않는다

일반 FSD의 `widgets`(여러 features를 조합한 재사용 가능한 페이지 섹션 레이어)는 이 프로젝트에서 도입하지 않는다.

이유:

- `pages`가 직접 `features`를 조합해도 현재 규모에서 충분하다
- 중간 레이어가 늘어날수록 파일 추적 비용이 높아진다
- 재사용 페이지 섹션이 많아지는 시점에 도입을 재검토한다

즉, **"여러 pages에서 반복되는 복합 UI 블록"** 이 많아지면 `widgets` 도입을 고려할 수 있다.

---

## 4. 폴더 배치 규칙

### 4-1. 공용 UI는 `shared`

도메인에 종속되지 않으면 `shared`에 둔다.

예시:

- `shared/ui/button`
- `shared/ui/input`
- `shared/ui/form`
- `shared/ui/icons`
- `shared/components/layout`

### 4-2. 사용자 행동 단위는 `features`

유저 액션/플로우/폼/오버레이는 `features`가 기본 위치다.

예시:

- `features/order/utils/payment.ts`
- `features/search/constants.ts`
- `features/member/schema/login.ts`
- `features/recipe/schema/form.ts`

### 4-3. 재사용 도메인 조각은 `entities`

두 개 이상의 feature나 page에서 재사용되는 도메인 단위 조각이면 `entities`를 우선 검토한다.

예시:

- `entities/product/constants.ts`
- `entities/product/utils/selection.ts`
- `entities/order/schema/payment.ts`
- `entities/banner/utils.ts`

**entities 승격 타이밍**: 처음에는 `features` 안에 두고, **두 번째 소비자가 생기는 시점에 `entities`로 올린다.** 미래를 예측해서 미리 올리지 않는다.

### 4-5. slice 내부 폴더 구조 (segments)

slice 내부는 아래 segments를 기준으로 구성한다.

```text
features/order/
  ├── components/   ← UI 컴포넌트
  ├── hooks/        ← 로컬 훅
  ├── schema/       ← form/validation 스키마
  ├── overlay/      ← 오버레이 컨텐츠
  ├── utils/        ← 유틸 함수
  ├── types/        ← 로컬 타입 (DTO 아닌 것)
  └── index.ts      ← public API (외부 노출 진입점)
```

모든 segments가 항상 필요한 건 아니다. 실제로 존재하는 파일만 둔다.

`entities` slice도 동일한 구조를 따른다.

```text
entities/product/
  ├── ui/           ← 재사용 도메인 UI
  ├── utils/        ← 도메인 유틸
  ├── constants/    ← 도메인 상수
  ├── types/        ← 도메인 로컬 타입
  └── index.ts      ← public API
```

### 4-4. 오버레이는 “기능”과 “셸”을 분리

오버레이 구조는 아래처럼 본다.

- 기능 로직/컨텐츠: `features/*/overlay`
- 완전 공용 셸/공용 컨텐츠: `shared/overlay`

예시:

- `features/order/overlay`
- `features/mypage/overlay`
- `shared/overlay/address-search`
- `shared/overlay/image-detail`

---

## 5. 남겨도 되는 루트 버킷

다음은 무조건 제거 대상이 아니다.

### 유지 대상

| 경로 | 유지 이유 |
|---|---|
| `api` | 헤드리스 연동 계층 — 섹션 3-1 참고 |
| `models` | DTO 타입 계층 — 섹션 3-2 참고 |
| `hooks/query`, `hooks/suspenseQuery`, `hooks/infiniteQuery` | API 래퍼 훅 계층 — 섹션 3-3 참고 |
| `shared` | FSD 공용 레이어 |
| `pages` | Next.js 라우트 엔트리 |
| `providers` | React Context Provider 조합 레이어. `_app.tsx`에 주입되는 전역 Provider 트리를 한곳에서 관리한다 |
| `configs` | 환경별 설정값 |
| `assets` | 정적 자산 |
| `styles` | 전역 CSS / 테마 토큰 |
| `i18n` | 다국어 리소스 |

### 정리 대상

아래는 “코드 종류별 전역 버킷”이므로 우선적으로 줄인다.

| 정리 대상 | 이동 판단 기준 |
|---|---|
| `components/*` | 도메인 소유 → `features/*/components` 또는 `entities/*/ui` / 공용 → `shared/ui` |
| `context/*` | 특정 기능 소유 → `features/*/context` / 전역 공용 → `shared/context` |
| `store/*` | 특정 기능 소유 → `features/*/store` / 전역 공용 → `shared/store` |
| `schema/*` | form 스키마 → `features/*/schema` / 공용 → `shared/schema` |
| `helpers/*` | 도메인 소유 → `features/*/utils` 또는 `entities/*/utils` / 공용 → `shared/utils` |
| `const/*` | 도메인 소유 → `features/*/constants` 또는 `entities/*/constants` / 공용 → `shared/constants` |
| `utils/*` | 도메인 소유 → `features/*/utils` 또는 `entities/*/utils` / 공용 → `shared/utils` |

> [!TIP]
> 이동 전 “이 코드의 소비자가 단일 feature인가, 여러 feature인가?”를 먼저 판단한다.
> 단일 feature → `features/*/`, 여러 feature → `entities/*/` 또는 `shared/`

> [!NOTE]
> `helpers`와 `utils`는 구분하지 않는다. 이동 시 명칭을 `utils`로 통일한다.

---

## 6. Import 규칙

### 6-1. 절대경로 import 사용

`apps/web/src` 내부 import는 기본적으로 절대경로 alias를 사용한다.

```ts
// ❌ BAD
import { toSelectedOption } from '../selection';

// ✅ GOOD
import { toSelectedOption } from '@/entities/product/utils/selection';
```

### 6-2. 상대경로는 예외적으로만 허용

아래 경우만 상대경로를 허용한다.

- 같은 폴더의 `index.css.ts`
- 같은 폴더의 아주 얕은 UI 구현 파일
- 테스트 파일에서 동일 폴더 fixture를 짧게 참조하는 경우

그 외에는 기본적으로 절대경로를 사용한다.

### 6-4. slice 내부 파일은 index.ts를 통해서만 외부에 노출

slice 외부에서는 반드시 해당 slice의 `index.ts`(public API)를 통해 접근한다.
slice 내부 파일 경로를 직접 참조하지 않는다.

```ts
// ❌ BAD
import { payment } from '@/features/order/utils/payment';

// ✅ GOOD
import { payment } from '@/features/order';
```

단, **동일 slice 내부**에서는 파일 간 직접 참조가 허용된다.

### 6-3. 배럴은 호환 목적일 때만 유지

레거시 경로를 완전히 제거하기 전, 일시적으로 `index.ts` 배럴을 둘 수 있다.

원칙:

- 신규 코드는 새 경로를 직접 바라본다
- 배럴은 마이그레이션 종료 후 제거한다

---

## 7. 주석 규칙

파일 이동/리팩토링 시 **기존 설명 주석은 보존**한다.

특히 아래는 삭제하지 않는다.

- 도메인 설명 주석
- 유틸 함수 설명 주석
- 타입/스키마 의도 설명 주석
- 예외 처리 이유를 설명하는 주석

> [!CAUTION]
> 리팩토링은 파일 위치를 바꾸는 작업이지, 문맥을 지우는 작업이 아니다.
> 코드 의미를 설명하는 주석은 가능한 한 유지한다.

---

## 8. 테스트 파일 위치

테스트 파일은 **테스트 대상 파일과 같은 폴더**에 배치한다.

```text
features/order/utils/payment.ts
features/order/utils/payment.test.ts   ← 같은 폴더

entities/product/utils/selection.ts
entities/product/utils/selection.test.ts
```

이유:

- 대상 파일과 테스트 파일을 동시에 찾기 쉽다
- 파일 이동 시 테스트도 함께 이동된다

**별도 루트 `__tests__/` 폴더는 사용하지 않는다.**

테스트 파일 확장자는 `.test.ts` / `.test.tsx`를 사용한다.

---

## 9. 레이어별 의존성 방향

의존성은 기본적으로 아래 방향을 따른다.

```text
shared -> entities -> features -> pages
```

추가 규칙:

- `shared`는 상위 레이어를 import 하지 않는다
- `entities`는 가능하면 `features`를 import 하지 않는다
- `features`는 여러 `entities`를 조합할 수 있다
- `pages`는 최종 조립만 담당한다
- **같은 레이어 내 slice 간 의존성은 금지한다**

```ts
// ❌ BAD — entities 내 slice 간 cross-import
import { something } from '@/entities/order'; // from entities/product 내부

// ❌ BAD — features 내 slice 간 cross-import
import { something } from '@/features/search'; // from features/order 내부
```

같은 레이어에서 공통으로 필요한 코드는 하위 레이어(`shared` 또는 `entities`)로 내린다.

예외:

- `api/models/query hooks`는 현재 프로젝트 규칙상 전역 계층으로 유지한다

---

## 10. 신규 코드 작성 기준

새 파일을 만들 때는 아래 순서대로 위치를 판단한다.

1. 이 코드가 완전 공용인가?
   - `shared`
2. 특정 도메인 개념인가?
   - `entities`
3. 특정 사용자 행동/기능 흐름인가?
   - `features`
4. 라우트 진입/페이지 조립인가?
   - `pages`
5. 외부 API 연동인가?
   - `api`
6. DTO 타입인가?
   - `models`
7. 서버 상태 조회 래퍼 훅인가?
   - `hooks/query`, `hooks/suspenseQuery`, `hooks/infiniteQuery`

---

## 11. 실제 예시

### 예시 A: 상품 옵션 선택 데이터 변환

- 위치: `entities/product/utils/selection.ts`
- 이유: 상품 도메인에 속하고 여러 소비처에서 재사용 가능

### 예시 B: 주문 결제 SDK 유틸

- 위치: `features/order/utils/payment.ts`
- 이유: 주문 기능 흐름에 강하게 결합됨

### 예시 C: 검색 탭 상수

- 위치: `features/search/constants.ts`
- 이유: 검색 기능 화면과 흐름에 직접 종속됨

### 예시 D: 공용 버튼

- 위치: `shared/ui/button`
- 이유: 도메인 비의존 공용 UI

### 예시 E: 회원가입 스키마

- 위치: `features/member/schema/signup.ts`
- 이유: 회원가입 플로우 소유

---

## 12. 리팩토링 체크리스트

구조 리팩토링 시 아래를 확인한다.

```text
[ ] 이 파일이 공용인지, 도메인 소유인지 먼저 판단했는가?
[ ] api / models / root query hooks는 유지 규칙을 따랐는가?
[ ] 새 파일의 import는 절대경로 alias를 사용했는가?
[ ] 이동 전 설명 주석을 보존했는가?
[ ] 레거시 경로 참조를 모두 새 경로로 바꿨는가?
[ ] 같은 레이어 내 slice 간 cross-import가 없는가?
[ ] slice 외부에서 참조할 때 index.ts를 통하는가?
[ ] 테스트 파일이 대상 파일과 같은 폴더에 있는가?
[ ] next build --webpack 기준으로 빌드 확인을 했는가?
```

---

## 13. 한 줄 요약

이 프로젝트의 FSD-lite는 아래처럼 이해하면 된다.

- **화면과 기능은 `features`로**
- **도메인 조각은 `entities`로**
- **공용 UI는 `shared`로**
- **헤드리스 연동 계층인 `api`, `models`, root query hooks는 유지**
- **새 import는 기본적으로 절대경로**
- **리팩토링 시 주석은 보존**
