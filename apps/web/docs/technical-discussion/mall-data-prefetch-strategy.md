# Mall Data 프리페칭 및 최용화 전략 논의

`mallData`와 같이 모든 페이지에서 공통으로 사용되지만 데이터가 방대한 경우, 효율적인 ISR 적용을 위한 기술적 대안을 정리합니다.

## 1. 배경 및 문제점

- **Payload 크기**: Next.js는 페이지당 Props 크기가 **128kB**를 넘으면 경고를 띄우며, 이는 LCP 및 Hydration 성능 저하로 이어집니다.
- **데이터 중복 호출**: ISR/SSG 빌드 시 각 페이지마다 `mallData` API를 개별적으로 호출하게 되어 서버 부하가 발생합니다.

## 2. 해결 방안 (Technical Options)

### Option A: 서버 사이드 싱글톤 (Promise Caching) - **추천**

서버 메모리(Node.js 환경)에 요청 Promise를 캐싱하여 병렬 빌드 시 API 호출을 1회로 제한합니다.

- **방법**: `getMallInfoServerSide()` 유틸리티를 만들어 'Data Picking' 후 캐싱된 Promise 반환.
- **장점**: 개발 생산성 높음, ISR 지원, API 부하 획기적 감소.

### Option B: 빌드 타임 JSON 저장 (Static File)

빌드 직전 API를 호출하여 결과를 `.json` 파일로 저장하고 각 페이지에서 `import`.

- **방법**: `prebuild` 스크립트 활용.
- **장점**: 빌드 중 API 호출 0회, 가장 빠른 성능.
- **단점**: 실시간 갱신(ISR) 불가. 데이터 변경 시 전체 재빌드 필요.

### Option C: Next.js Native Fetch 캐시

Next.js 13+의 확장된 `fetch` API를 사용하여 서버 전역 캐시 활용.

- **방법**: `fetch(URL, { next: { revalidate: 3600 } })`.
- **장점**: Next.js 인프라(Vercel 등) 수준의 캐싱 가능.
- **단점**: 현재 사용 중인 `ky` 라이브러리와의 패턴 불일치.

### Option D: Data Picking 전략 (필수 공통)

어떤 방식을 선택하든, 클라이언트로 보내는 데이터는 **필요한 필드만 선별**하여 전송.

- **예**: `fullMallData` -> `{ serviceBasicInfo, mallName }`.
- **효과**: Payload를 수백 kB에서 수 kB로 줄여 Hydration 성능 극대화.

---

## 3. 향후 계획

- [ ] 서버 사이드 캐싱 레이어 도입 여부 결정
- [ ] `mallData` 중에서 SEO/Footer에 필수적인 필드 리스트 정의
- [ ] `ky` 인스턴스를 유지할지, 네이티브 `fetch`로 전환할지 검토
