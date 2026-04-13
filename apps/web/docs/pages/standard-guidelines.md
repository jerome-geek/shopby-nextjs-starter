# 프로젝트 PRD 및 개발 표준 가이드라인

## 1. 기본 원칙 (Core Principles)

- **샵바이(Shopby) API 최우선**: 모든 쇼핑몰 기능은 [샵바이 API 문서](https://docs.shopby.co.kr/)를 기준으로 설계하고 구현한다.
- **외부 서비스 지연 최소화**: 리뷰, 게시판 등 기본 기능은 외부 솔루션(크리마, 브이리뷰 등) 대신 샵바이 기본 기능을 최대한 활용한다.
- **고급스러운 미학(Aesthetics)**: 단순한 MVP 수준을 넘어 프리미엄한 디자인과 인터랙티브한 UX를 지향한다. (Glassmorphism, Gradient, Micro-animations 등)

## 2. 기술 스택 및 아키텍처 (Tech Stack)

- **Framework**: Next.js (Page Router)
- **Language**: TypeScript
- **Styling**: Vanilla Extract (CSS-in-JS). TailwindCSS는 명시적 요청 시에만 사용.
- **Data Fetching**: React Query (@tanstack/react-query)
    - **SSR**: `getServerSideProps`에서 `prefetchQuery`를 사용하여 초기 데이터 페칭.
    - **Graceful Fail**: 서버 사이드 페칭 실패가 페이지 전체 에러로 이어지지 않도록 처리 (특히 인증 필요 데이터).
- **Directory Structure**: FSD-lite 아키텍처 지향 (`api/`, `components/`, `hooks/`, `models/`, `pages/` 등).

## 3. SEO 및 성능 (SEO & Performance)

- **Semantic HTML**: `<h1>`, `<header>`, `<main>`, `<footer>` 등 적절한 시맨틱 태그 사용.
- **Metadata**: 페이지별 `title`, `meta description` 최적화.
- **Structured Data**: 상품 상세, 리뷰 등 핵심 데이터는 `JSON-LD` 스키마 적용.
- **Optimization**: 샵바이 이미지 서버 파라미터를 활용한 이미지 리사이징 및 레이지 로딩 적용.

## 4. 상세 기능 구현 규칙

- **상품 상세**:
    - 복잡한 옵션 로직(조합형, 분리형)은 전용 커스텀 훅(`useProductOption`)으로 분리.
    - 리뷰는 샵바이 기본 리뷰 API(V2 권장)를 사용하며, 요약 정보를 상단에 배치.
- **타임세일**:
    - 상품진열(Display Section) ID(예: `TIMESALE-LIFE`)를 활용하여 관리.
    - 프론트엔드에서 남은 시간을 실시간으로 계산하여 긴박감 조성.
- **인증 및 가드**:
    - 로그인 필수 기능(찜하기, 추천 등)은 클라이언트 사이드에서 체크하여 로그인 유도.

## 5. 커뮤니케이션 및 코드 스타일

- **Terse & Expert**: 장황한 설명보다는 핵심적인 코드와 논리를 우선한다.
- **Accuracy**: 부정확한 정보보다는 확인된 사실과 공식 문서 기반의 해결책을 제시한다.
- **Speculation**: 필요 시 논리적인 추측이나 제안을 하되, 반드시 명시한다.
- **Prettier**: 프로젝트의 Prettier 설정을 엄격히 준수한다.
