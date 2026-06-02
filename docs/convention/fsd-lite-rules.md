# FSD-lite 규칙 참조

> 상세 근거·예시: `docs/convention/fsd-lite.md`

## 레이어 구조

- 의존성 방향: `shared → entities → features → pages`
- 같은 레이어 내 slice 간 import 금지
- `widgets` 레이어 미사용 (재사용 페이지 섹션이 많아지면 재검토)

## 전역 유지 레이어

| 경로 | 역할 |
|---|---|
| `api/` | 헤드리스 API 연동 |
| `models/` | DTO 타입 |
| `hooks/query*` | API 래퍼 훅 |
| `providers/` | 전역 Provider 트리 |
| `configs/`, `assets/`, `styles/`, `i18n/` | 설정·정적 자산 |

## 정리 대상 → 이동 목적지

| 정리 대상 | 단일 feature 소유 | 공용 |
|---|---|---|
| `components/` | `features/*/components` 또는 `entities/*/ui` | `shared/ui` |
| `context/` | `features/*/context` | `shared/context` |
| `store/` | `features/*/store` | `shared/store` |
| `schema/` | `features/*/schema` | `shared/schema` |
| `helpers/`, `utils/` | `features/*/utils` 또는 `entities/*/utils` | `shared/utils` |
| `const/` | `features/*/constants` 또는 `entities/*/constants` | `shared/constants` |

- `helpers`와 `utils`는 구분 없이 이동 시 `utils`로 통일
- 판단 기준: 소비자가 단일 feature → `features/*/`, 여러 feature → `entities/*/` 또는 `shared/`

## 신규 파일 배치 순서

1. 완전 공용 → `shared`
2. 도메인 개념 → `entities`
3. 사용자 행동·기능 흐름 → `features`
4. 라우트 진입·페이지 조립 → `pages`
5. 외부 API 연동 → `api`
6. DTO 타입 → `models`
7. 서버 상태 조회 래퍼 훅 → `hooks/query*`

## entities 승격 타이밍

- 처음엔 `features` 안에 둔다
- **두 번째 소비자가 생기는 시점에 `entities`로 올린다** (미리 올리지 않는다)

## api/ vs entities/*/api

- 원칙: 루트 `api/`에 둔다
- `entities/*/api` 허용 조건: slice 내부 전용 + adapter 성격 + 루트 `api/`에 넣으면 응집도가 낮아지는 경우

## Slice 내부 구조

```text
features/order/          entities/product/
  ├── components/          ├── ui/
  ├── hooks/               ├── utils/
  ├── schema/              ├── constants/
  ├── overlay/             ├── types/
  ├── utils/               └── index.ts
  ├── types/
  └── index.ts
```

- 존재하는 파일만 둔다

## Import 규칙

- 절대경로 `@/` 필수 — 상대경로 금지 (예외: 같은 폴더 내 얕은 참조)
- slice 외부 접근은 반드시 해당 slice의 `index.ts`를 통해
- 배럴(`index.ts`)은 마이그레이션 호환 목적으로만, 신규 코드는 직접 참조

## 테스트 파일

- 대상 파일과 같은 폴더에 배치 (`.test.ts` / `.test.tsx`)
- 루트 `__tests__/` 폴더 사용 금지

## 주석

- 파일 이동·리팩토링 시 기존 설명 주석(도메인·유틸·타입·예외처리) 보존

## 리팩토링 체크리스트

- [ ] 공용 vs 도메인 소유 판단했는가?
- [ ] api/models/query hooks 유지 규칙 따랐는가?
- [ ] 절대경로 alias 사용했는가?
- [ ] 설명 주석 보존했는가?
- [ ] 레거시 경로 참조 모두 새 경로로 바꿨는가?
- [ ] 같은 레이어 내 cross-import 없는가?
- [ ] slice 외부 접근이 index.ts를 통하는가?
- [ ] 테스트 파일이 대상 파일과 같은 폴더인가?
- [ ] `next build --webpack` 빌드 확인했는가?
