# 🔗 서비스 URL 시스템 설계 (SEO 최적화 모델)

이 문서는 레시피 플랫폼과 커머스를 유기적으로 결합하면서도, 검색 엔진 최적화(SEO) 수치를 극대화하기 위한 URL 구조를 정의합니다.

## 1. 핵심 전략

- **Index Page (`/`)**: 서비스의 정체성인 **'레시피 메인'**으로 사용. 텍스트 중심의 고품질 콘텐츠를 전면에 배치하여 도메인 권위 상승.
- **Separation of Concerns**: 정보성(레시피)과 상거래성(쇼핑몰) 영역을 경로로 구분하되, 상품 상세 및 트랜잭션 페이지는 접근성을 위해 뎁스를 최소화.

---

## 2. 경로별 세부 설계

### 🥗 레시피 영역 (Information Hub)

| 경로                 | 설명                              | 비고                          |
| :------------------- | :-------------------------------- | :---------------------------- |
| `/`                  | **서비스 메인 (레시피 큐레이션)** | 핵심 키워드 유입 지점         |
| `/recipes`           | 레시피 전체 목록 / 탐색           |                               |
| `/recipes/:slug`     | **레시피 상세**                   | 가독성 좋은 Slug(문자열) 권장 |
| `/recipes/tags/:tag` | 태그/테마별 레시피 목록           |                               |

### 🛒 쇼핑몰 영역 (Commerce Hub)

쇼핑몰 내비게이션 및 메인 진입점입니다. 각 브랜드 홈 성격의 페이지로 구성됩니다.

| 경로          | 설명                 | 비고                           |
| :------------ | :------------------- | :----------------------------- |
| `/shop`       | **쇼핑몰 홈 (발견)** | 기본 쇼핑 메인 (큐레이션 중심) |
| `/shop/life`  | **라이프 홈**        | 라이프스타일 테마 특화 메인    |
| `/shop/kids`  | **키즈 홈**          | 키즈/영유아 테마 특화 메인     |
| `/events`     | 기획전 리스트        | 진행 중인 모든 이벤트          |
| `/events/:id` | 기획전 상세          | 특정 기획전 상품 리스트        |

### 📦 상품 및 리스트 (Product & Selection)

상품 탐색 및 상세 정보는 `/products`와 `/categories` 경로를 사용하여 접근성을 높입니다.

| 경로                | 설명                      | 비고                     |
| :------------------ | :------------------------ | :----------------------- |
| **`/products/:id`** | **상품 상세 페이지**      | **최우선 SEO 관리 대상** |
| `/products/best`    | 베스트 상품 랭킹          | 판매량/인기순 리스트     |
| `/products/new`     | 신상품 목록               | 최신 등록순 리스트       |
| `/products/sale`    | 세일 상품 목록            | 할인 중인 상품 리스트    |
| `/categories/:id`   | 카테고리별 상품 목록      |                          |
| `/brands/:id`       | 브랜드 상세 페이지        |                          |
| `/search`           | 통합 검색 (레시피 + 상품) |                          |

### � 주문 및 공통 영역 (Transaction & User)

| 경로           | 설명            | 비고 |
| :------------- | :-------------- | :--- |
| `/order/cart`  | 장바구니        |      |
| `/order/sheet` | 주문서 작성     |      |
| `/login`       | 로그인          |      |
| `/signup`      | 회원가입        |      |
| `/mypage/*`    | 마이페이지 전체 |      |
| `/support/*`   | 고객센터        |      |

---

## 3. 구현 전략: Catch-all Routes (`[[...slug]].tsx`)

동일한 레이아웃을 공유하는 쇼핑몰 메인 페이지들(`/shop`, `/shop/life`, `/shop/kids`)은 Next.js의 **Optional Catch-all Routes**를 사용하여 코드 중복 없이 효율적으로 관리합니다.

### 🛠️ 구현 예시 (`pages/shop/[[...slug]].tsx`)

```tsx
import { GetServerSideProps } from 'next';

const SHOP_TYPES = {
    DEFAULT: 'discovery',
    LIFE: 'life',
    KIDS: 'kids',
} as const;

export default function ShopMainPage({ type }) {
    // 1. 공통 레이아웃 내에서 type에 따라 다른 데이터/섹션 렌더링
    return <ShopLayout type={type} />;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const slug = params?.slug as string[] | undefined;
    const path = slug?.[0]; // /shop/life 에서 'life' 추출

    // 2. 허용되지 않은 경로는 404 처리
    const validPaths = [undefined, SHOP_TYPES.LIFE, SHOP_TYPES.KIDS];
    if (path && !validPaths.includes(path)) {
        return { notFound: true };
    }

    // 3. 타입 결정 및 해당 데이터 프리페칭
    const type = path || SHOP_TYPES.DEFAULT;

    return {
        props: { type },
    };
};
```

---

## 4. SEO 관점의 기대 효과

1.  **Index 권위 분산 방지**: 메인 페이지에 레시피 콘텐츠를 배치함으로써 '레시피', '요리' 같은 대중적인 키워드로 검색 엔진 지수를 확보합니다.
2.  **Breadcrumb 최적화**: `/products/best`와 같은 구조는 검색 엔진이 사이트 위계를 쉽게 파악하게 하며, 사용자가 상세 페이지에서 상위 리스트로 이동하는 흐름을 직관적으로 만듭니다.
3.  **Short URL for Products**: 상품 권위 분산을 위해 상세 URL을 `/products/:id`로 짧게 유지하여 클릭률(CTR)과 가중치를 확보합니다.
4.  **세그먼트 메인 운영**: `/shop/life`, `/shop/kids` 등 카테고리 홈을 독립적인 URL로 운영하여 타겟 키워드(예: '아이방 인테리어', '주방 소품')에 대한 랜딩 페이지 경쟁력을 갖춥니다.
5.  **Clean Routing**: 중복 레이아웃을 단일 파일로 관리하면서도 각 경로별로 고유한 Meta 태그를 주입할 수 있어 SEO 관리가 매우 용이합니다.
