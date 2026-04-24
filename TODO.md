# Project TODO

## 1. CSR 렌더링 최적화 및 인증 고도화

### 1.1 미들웨어 (`proxy.tsx`) 기반 파라미터 사전 검증
- [ ] **필수 파라미터 체크 이관**: 현재 페이지 내부 `useEffect`에서 수행하는 파라미터 검증(`orderNo`, `orderSheetNo` 등)을 미들웨어 단계로 이관하여 빈 페이지 노출(Flicker)을 원천 차단.
- [ ] **검증 범위 확대**: 인증이 필요한 모든 경로(`/mypage`, `/order`, `/recipes/scrap`)에 대해 URL 무결성 검증 로직 적용.

### 1.2 중복 인증 체크 로직 정리
- [ ] **가드 로직 통합**: `CSRLayout`이 적용된 페이지 하위 컴포넌트들에서 개별적으로 수행 중인 인증 체크(`if (!isLogin) return null;`) 중복 로직 제거.
- [ ] **Auth Hook 클린업**: 불필요한 `useAuth` 호출을 줄이고 `CSRLayout`의 컨텍스트를 활용하도록 개선.

### 1.3 타 경로 확산 및 CSR 표준화
- [ ] **대상 경로 조사**: 장바구니(`/cart`), 찜 목록(`/wishlist`) 등 SEO가 불필요하고 개인화된 데이터가 중심인 경로들에 대해 SSR 제거 및 `CSRLayout` 적용.
- [ ] **표준 레이아웃 적용**: 모든 사용자 중심 페이지가 동일한 CSR 렌더링 전략을 따르도록 가이드라인 수립 및 반영.

### 1.4 하이드레이션 및 모니터링
- [ ] **오류 지속 모니터링**: 최적화 작업 이후 발생하는 잠재적인 하이드레이션 불일치 이슈를 브라우저 콘솔 및 로그를 통해 모니터링.

---

## 2. 기타 작업 내역 및 히스토리
- **MypageLayout 표준화**: 모든 마이페이지 하위 경로에 `CSRLayout` 내장 완료.
- **MypageEdit 최적화**: Lazy initialization 및 Shallow routing을 적용하여 안티패턴 개선 완료.
- **주문/스크랩 페이지 최적화**: `/order`, `/recipes/scrap` 경로 SSR 제거 및 CSR 전환 완료.

---
---

## 3. 상품 리스트 아키텍처 및 할인 정보 통합

### 3.1 추가 할인 정보 병합 (useProductsWithAdditionalDiscounts 적용)
- [ ] **상세 페이지 관련 상품**: 상세 페이지 하단 '관련 상품' 섹션 리팩토링 및 할인 정보 연동.
- [ ] **레시피 검색 상품**: 검색 결과 '레시피 탭' 내 관련 상품 리스트 리팩토링.
- [ ] **장바구니 추천**: 장바구니 페이지 내 '추천 상품' 섹션 존재 시 공통 훅 적용.

### 3.2 아키텍처 및 타입 보완
- [ ] **타입 추론 개선**: `NewProductListContainer` 내 `productsWithDiscounts`의 `as any` 제거 및 정교한 타입 정의.
- [ ] **엔티티 매퍼 확장**: `entities/product/utils/mapper.ts`에 추가적인 도메인 모델(검색 결과 등) 매퍼 통합 검토.

### 3.3 UI/UX 디테일링 및 클린업
- [ ] **레이아웃 검증**: 스티커 줄바꿈 시 부모 컨테이너 높이 유동성 및 `ProductCardRow` 노출 위치 최종 확정.
- [ ] **코드 클린업**: `MypageRecentProducts`의 `console.log` 및 리팩토링 완료 파일들의 미사용 import 정리.
- [ ] **문서 업데이트**: `fsd-lite.md`에 이번에 적용된 엔티티 매퍼 패턴 사례 추가.
