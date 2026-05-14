# 🌐 apps/web 정밀 진단 및 Vercel 배포 가이드

## 📊 종합 부채 및 배포 지표
- **배포 환경**: Vercel (icn1 지역 고정)
- **인라인 스타일(`style={{`) 사용**: **439건** (디자인 시스템 관리 부채 상)
- **빌드 상태**: 2건의 모노레포 관련 타입 경고 존재 (해결 가능)
- **필수 환경 변수**: 11개 항목 탐지

---

## 🚀 1. Vercel 배포 핵심 체크리스트 (처음 배포 시 필수)

### 🔑 필수 환경 변수 (Environment Variables)
Vercel 대시보드 Settings -> Environment Variables에 아래 항목을 반드시 입력해야 합니다.
- `NEXT_PUBLIC_SHOPBY_BASE_URL`: 샵바이 API 엔드포인트
- `NEXT_PUBLIC_CLIENT_ID`: 샵바이 클라이언트 아이디
- `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY`: 카카오 공유하기용 키
- `REVALIDATE_SECRET`: On-demand ISR 갱신용 비밀키
- `NEXT_PUBLIC_BASE_URL`: 배포될 서비스의 실제 도메인 주소
- (그 외 `LOCALE`, `CURRENCY`, `GEEK_BASE_URL` 등 6개 항목)

### 🏗️ 빌드 설정 (Build Settings)
Vercel 프로젝트 설정에서 다음 명령어를 확인하세요.
- **Build Command**: `npx turbo build` (루트의 `turbo.json` 파이프라인 활용)
- **Output Directory**: `apps/web/.next`
- **Root Directory**: `./` (모노레포 전체를 루트로 지정)

### 🖼️ 이미지 최적화 (Next/Image)
- **현재 허용 도메인**: `*.cdn-nhncommerce.com`
- **주의**: 외부 이미지(블로그, 타 CDN 등)를 `next/image`로 렌더링할 경우, `next.config.ts`의 `remotePatterns`에 추가하지 않으면 400 에러가 발생합니다.

---

## 🏗️ 2. 아키텍처 및 코드 품질 (FSD-lite)

### [CRITICAL] 주문 상세 페이지 재건축 필요
- **위치**: `src/pages/mypage/orders/[orderNo]/index.tsx` (1,021 lines)
- **진단**: 
  - 페이지 레이어에 46개의 인라인 스타일과 7개의 비대한 하위 컴포넌트가 몰려 있음.
  - Vercel 배포 시 해당 페이지의 번들 사이즈가 커져서 LCP(Largest Contentful Paint) 성능 저하 우려.
- **해결**: `entities/order`로 컴포넌트들을 잘게 쪼개어 이동시키고 인라인 스타일을 `vanilla-extract`로 전환해야 함.

### [HIGH] 디자인 시스템 우회 (Style Debt)
- **현상**: `#111`, `#666` 등 하드코딩된 색상값이 439곳의 인라인 스타일로 산재.
- **위험**: Vercel 배포 후 스타일 수정 요청 시 모든 파일을 일일이 찾아야 하는 운영 지옥(Maintenance Hell) 발생.
- **해결**: 모든 인라인 스타일의 `vars.color` 토큰화 및 CSS-in-JS 클래스 이관.

---

## 🛡️ 3. TypeScript 및 빌드 안정성

### [MEDIUM] 모노레포 패키지 참조 경고
- **내용**: `apps/web`이 `packages/utils`의 소스를 직접 참조하면서 발생하는 `TS6305` 에러.
- **대응**: Vercel 빌드 시 `turbo`가 `packages/utils`를 먼저 빌드하도록 설정되어 있으나(Pipeline 완료), 안정성을 위해 `tsconfig.json`의 `paths` 설정을 `dist` 참조 방식으로 전환하는 것이 장기적으로 유리함.

---

## 💡 종합 제언
Vercel 배포는 현재 설정으로도 가능하지만, **운영 단계에서의 유지보수 효율은 매우 낮은 상태**입니다. 특히 **주문 상세 페이지**와 **인라인 스타일**은 배포 직후 최우선 리팩토링 대상으로 관리하시길 권장합니다.
