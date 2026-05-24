# 🛍️ Shopby Headless Monorepo

NHN SHOPBY 솔루션을 기반으로 한 **헤드리스(Headless) 쇼핑몰** 구축 프로젝트입니다. 
`Turborepo`와 `pnpm`을 사용하여 사용자용 웹과 관리자 도구를 효율적으로 관리합니다.

---

## ✨ Key Features

- **Headless Architecture**: Shopby API를 활용한 자유로운 UI/UX 구현
- **Monorepo Management**: `web`과 `admin` 프로젝트의 의존성 및 빌드 최적화
- **Type-safe Development**: TypeScript 및 Vanilla Extract를 통한 타입 안전성 확보
- **Modern Tech Stack**: React Query v5, Zustand, Motion 등 최신 라이브러리 활용

---

## 🛠 Tech Stack

### 📱 Frontend (Web)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vanilla Extract](https://img.shields.io/badge/Vanilla_Extract-FFCC00?style=for-the-badge&logo=vanillaextract&logoColor=black)

- **State & Data**: `React Query (v5)`, `Zustand`, `Axios`
- **Forms**: `React Hook Form`, `Zod`
- **UI & UX**: `Motion`, `Radix UI`, `Lenis`, `Swiper`, `Sonner`
- **Logic**: `Suspensive`, `Overlay Kit`, `Fxts`

### ⚙️ Monorepo & Infra
![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turbo&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

---

## 📁 Project Structure

```bash
shopby-monorepo/
├── apps/
│   ├── web/             # 차세대 쇼핑몰 프론트엔드 (Next.js Pages Router)
│   │   ├── src/
│   │   │   ├── components/ # 공통 UI 컴포넌트
│   │   │   ├── hooks/      # 커스텀 React 훅
│   │   │   ├── pages/      # Next.js 라우트 및 페이지 뷰
│   │   │   ├── store/      # Zustand 전역 상태 관리
│   │   │   ├── styles/     # Vanilla Extract 스타일 정의
│   │   │   └── utils/      # 유틸리티 함수
│   │   └── package.json
│   └── admin/           # 운영 백오피스 (UI 템플릿 기반)
│       └── package.json
├── packages/            # (추후) 공통 패키지 수용 공간
├── .env.example         # 환경 변수 템플릿
├── pnpm-workspace.yaml  # pnpm 워크스페이스 설정
├── turbo.json           # Turborepo 파이프라인 설정
└── package.json         # 루트 프로젝트 설정 및 스크립트
```

---

## 🚀 Getting Started

### 📋 요구사항 (Prerequisites)
- **Node.js**: `v20.x` 이상
- **pnpm**: `v10.x` 이상 (`pnpm install -g pnpm`)

### ⚙️ 환경 변수 설정 (Environment Setup)
루트 디렉토리에 `.env` 파일을 생성하고 다음 항목을 설정하세요:

```bash
cp .env.example .env
```

`.env` 파일을 열어 다음 정보를 입력합니다:

```bash
# ============================================
# 샵바이 API 설정 (필수)
# ============================================
# 샵바이 파트너 센터에서 발급받은 클라이언트 ID
NEXT_PUBLIC_CLIENT_ID=여기에_클라이언트_ID_입력

# 샵바이 API 베이스 URL (기본값: https://shop-api.e-ncp.com)
NEXT_PUBLIC_SHOPBY_BASE_URL=https://shop-api.e-ncp.com

# ============================================
# 앱 설정
# ============================================
# 앱 이름 (브라우저 타이틀 등에 사용)
NEXT_PUBLIC_APP_NAME=jollypot

# 기본 언어 설정 (ko, en 등)
NEXT_PUBLIC_LOCALE=ko

# ============================================
# 외부 서비스 설정 (선택)
# ============================================
# 카카오 공유하기/로그인 등을 위한 JavaScript 키
NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY=
```

---

### 🛠 실행 및 빌드 (Development & Build)
```bash
# 의존성 설치
pnpm install

# 전체 프로젝트 실행 (Web & Admin)
pnpm dev

# 특정 서비스만 실행 (Filter)
pnpm dev:web
pnpm dev:admin

# 전체 프로젝트 빌드
pnpm build
```

### 🧠 CodeGraph (AI 코드 인텔리전스)

이 프로젝트는 **Claude Code**와 함께 [CodeGraph](https://codegraph.dev) MCP 서버를 활용합니다.
CodeGraph는 코드베이스를 AST로 파싱해 심볼 검색·호출 관계·영향 분석 등을 제공합니다.

처음 클론 후 또는 대규모 변경 시 인덱스를 초기화하세요:

```bash
codegraph init -i
```

> `.codegraph/` 디렉토리는 머신별 로컬 파일이므로 git에 포함되지 않습니다.

---

## 💡 Guidelines
- **CSS-in-JS**: 모든 스타일은 `.css.ts` 확장자를 사용하는 `Vanilla Extract`로 작성합니다.
- **State**: 서버 상태는 `React Query`, 클라이언트 전역 상태는 `Zustand`를 우선적으로 고려합니다.
- **Turbo Cache**: 빌드 속도 최적화를 위해 캐시를 활용하므로, 예상치 못한 동작 시 `.turbo` 폴더를 삭제해 보세요.
