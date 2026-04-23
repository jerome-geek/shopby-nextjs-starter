# 프로젝트 문서 가이드 (Documentation)

이 디렉토리는 프로젝트의 아키텍처, 기술적 의사결정, 그리고 기능 기획 문서를 포함하고 있습니다.

## 📂 문서 구조

### 🚀 기능 기획 (Specifications)
향후 개발 예정이거나 현재 구현된 주요 기능의 기획 내용입니다.
- [어드민 모바일 앱 관리](specs/admin-mobile-app.md): 어드민 내 앱 통계 및 푸시 관리 기능 기획.

### 🏗️ 아키텍처 및 기술 전략 (Technical Decisions)
프로젝트 전반에 적용된 기술적 설계와 아키텍처 결정 사항입니다.
- [Axios Interceptor 전략](axios-interceptor.md): API 통신 및 에러 핸들링 전략.
- [캐싱 전략 분석](caching-strategy-analysis.md): 데이터 캐싱 및 최적화 방안.
- [React 추상화 전략](react-abstraction-strategy-analysis.md): 컴포넌트 및 로직 분리 원칙.
- [React Query 데이터 페칭](react-query-fetching-strategy.md): 데이터 동기화 및 페칭 컨벤션.
- [React Query 뮤테이션](react-query-mutation-and-synchronization.md): 상태 업데이트 및 동기화 전략.
- [모달 vs 토스트](modal-vs-toast.md): UI 피드백 컴포넌트 사용 가이드라인.

### 🌐 배포 및 인프라 (DevOps)
- [Vercel 배포 제안](vercel-deployment-proposal.md): 프로젝트 배포 및 인프라 구성 계획.

### 📝 기타
- [SEO 페이지 리스트](seo-page-list.md): 검색 엔진 최적화 대상 페이지 목록.
- [지오펜싱 설정](geo.md): 위치 기반 서비스 설정 관련.

---
**Tip**: 새로운 문서를 작성할 때는 관련 카테고리에 맞춰 추가하고, 이 README에도 링크를 업데이트해 주세요.
