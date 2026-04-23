# SEO 타겟 페이지 및 데이터 정의 가이드

본 문서는 생성형 AI 검색(GEO) 및 일반 검색 엔진 최적화(SEO)를 위해 메타 데이터 정의가 필요한 주요 페이지 리스트입니다.
주문, 결제, 회원가입 및 마이페이지와 같은 개인정보 기반의 기능 페이지는 보안 및 인덱싱 제외를 위해 리스트에서 제외되었습니다.

## 1. 핵심 서비스 페이지 (High Priority)

검색 결과에서 브랜드의 첫인상을 결정하며, 가장 높은 트래픽을 유도하는 페이지입니다.

| 페이지명 | 경로 | 주요 SEO 요소 | 비고 |
| :--- | :--- | :--- | :--- |
| **홈 (메인)** | `/` | Title, Description, JSON-LD (WebSite) | 브랜드 키워드 중심 |
| **상품 상세** | `/products/[productNo]` | Title, Description, JSON-LD (Product), OG Image | 상품명, 가격, 브랜드 포함 |
| **카테고리 목록** | `/categories/[categoryNo]` | Title, Description | 카테고리별 핵심 키워드 |
| **레시피 상세** | `/recipes/[sno]` | Title, Description, JSON-LD (Recipe) | 요리명, 소요시간, 재료 포함 |

## 2. 마케팅 및 기획 페이지 (Medium Priority)

특정 목적을 가진 유입을 생성하고 전환을 유도하는 페이지입니다.

| 페이지명 | 경로 | 주요 SEO 요소 | 비고 |
| :--- | :--- | :--- | :--- |
| **베스트 상품** | `/products/best` | Title, Description | 인기 상품 키워드 |
| **신상품** | `/products/new` | Title, Description | 트렌드 키워드 |
| **타임특가** | `/time-sale` | Title, Description | 할인, 특가 키워드 |
| **이벤트 목록** | `/events` | Title, Description | 진행 중인 혜택 강조 |
| **이벤트 상세** | `/events/[eventNo]` | Title, Description, OG Image | 개별 이벤트 정보 |
| **레시피 목록** | `/recipes` | Title, Description | 커뮤니티 및 콘텐츠 키워드 |

## 3. 정보 및 고객 지원 페이지 (Low Priority)

브랜드 신뢰도를 높이고 정보를 제공하는 페이지입니다.

| 페이지명 | 경로 | 주요 SEO 요소 | 비고 |
| :--- | :--- | :--- | :--- |
| **브랜드/숍 안내** | `/shop`, `/shop/[slug]` | Title, Description | 브랜드 아이덴티티 |
| **공지사항/게시판** | `/boards/[boardId]` | Title, Description | 공지 및 안내 사항 |
| **게시글 상세** | `/boards/[boardId]/[articleNo]` | Title, Description | 개별 게시글 제목 |
| **이용약관/정책** | `/terms/[termsType]` | Title, Description | 법적 신뢰성 확보 |

## 4. 제외 대상 (Excluded)

아래 페이지들은 검색 엔진에 노출되지 않도록 설정(noindex)하거나, SEO 데이터 정의가 불필요한 페이지입니다.

*   **로그인/회원가입**: `/login`, `/signup/**`
*   **주문/결제**: `/cart`, `/order/**`
*   **마이페이지**: `/mypage/**`
*   **검색 결과**: `/search` (동적 쿼리에 따른 인덱싱 방지)
*   **글쓰기/수정**: 레시피 작성, 게시판 작성 등

---
*본 리스트는 프로젝트 구성에 따라 조정될 수 있습니다.*
