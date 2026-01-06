import {
    AccumulationUnitType,
    BrandNameType,
    DeliveryConditionType,
    DiscountUnitType,
    ImageUrlType,
    OrderDirectionType,
    ProductOrderType,
    ProductSectionDisplayType,
    ProductSectionSaleStatusType,
    SalePeriodType,
    SaleStatusType,
    StickerInfoType,
} from '@/models';
import {
    CustomProperties,
    HasCoupons,
    ProductItem,
    ReservationData,
} from '@/models/product';

export interface ProductSection {
    /** 진열 이미지 - 오른쪽 여백 색상 */
    rightSpaceColor: string;
    /** 진열 이미지 - 왼쪽 여백 색상 */
    leftSpaceColor: string;
    /** 진열명 */
    sectionName: string;
    /** 상품 진열 설명 */
    sectionExplain: string;
    /** 진열 이미지 URL */
    imageUrl: string;
    /** 진열id */
    sectionId: string;
    /** 진열번호 */
    sectionNo: number;
    /** 홍보문구 */
    promotionText: string;
}

export interface GetProductSectionsResponse {
    /** 진열 정보 */
    sections: ProductSection[];
}

export interface GetProductSectionResponse {
    /** 진열 이미지 - 오른쪽 여백 색상 */
    rightSpaceColor: string;
    /** 진열 이미지 - 왼쪽 여백 색상 */
    leftSpaceColor: string;
    /** 상품 진열 설명 */
    sectionExplain: string;
    /** 진열 이미지 URL */
    imageUrl: string;
    /** 진열명 */
    label: string;
    /** 진열번호 */
    sectionNo: number;
    /** 홍보문구 */
    promotionText: string;
}

export interface GetProductSectionByIdResponse {
    /** 진열 이미지 - 왼쪽 여백 색상 */
    leftSpaceColor: string;
    /** 전체 상품 수 */
    productTotalCount: number;
    /** 진열 이미지 - 오른쪽 여백 색상 */
    rightSpaceColor: string;
    /** 진열명 */
    label: string;
    /** 진열 ID */
    sectionId: string;
    /** 진열번호 */
    sectionNo: number;
    /** 추천 상품목록 */
    recommendProducts: ProductItem[];
    /** 상품 목록 */
    products: ProductSectionProduct[];
    /** 홍보문구 */
    promotionText: string;
    /** 섹션 상품 전시 설정 */
    displayConfig: {
        /** 상품 노출 개수 - 세로 */
        displayHeight: number;
        /** 디스플레이 유형 */
        displayType: ProductSectionDisplayType;
        /** 상품 노출 개수 - 가로 */
        displayWidth: number;
    };
    /** 상품 진열 설명 */
    sectionExplain: string;
    /** 진열 이미지 URL */
    imageUrl: string;
    /**
     * 재고 노출 여부 (false:재고 미노출 / true:재고 노출)
     *  - false로 재고를 숨김처리 한 경우, 재고 관련 필드는(실제 재고가 있더라도) -999로 고정으로 리턴하며 실재고 값은 따로 내려주지 않아 조회 불가합니다.
     *  - 실재고가 0인 경우에만 0으로 응답합니다.
     *  - 만약 재고 숨김처리 시, front에서 [-999]로 표시되도록 처리되고 있는게 있다면 재고노출여부(displayableStock)를 기준으로 수정 작업이 필요합니다.
     *  - 만약 재고 숨김처리 시, front에서 [품절]로 표시되도록 처리되고 있는게 있다면 재고/예약재고값을 기준이 아닌, 품절상태(isSoldOut)값을 기준으로 처리되도록 수정 작업이 필요합니다.
     */
    displayableStock: boolean;
}

export interface ProductSectionProduct {
    /** 그룹관리코드 노출명 */
    groupManagementCodeName: string;
    /** 추가할인 최소 기준금액 */
    minSalePrice: number;
    /** 그룹관리코드 */
    groupManagementCode: string;
    /** 좋아요 카운트 */
    likeCount: number;
    /** 장바구니 사용 여부 */
    canAddToCart: boolean;
    /** 총 상품평 수 */
    totalReviewCount: number;
    /** 상품평 평균점수 */
    reviewRating: number;
    /** 좋아요 여부 */
    liked: boolean;
    /** 상품명 */
    productName: string;
    /** 적립금 사용 정보 */
    accumulationUseInfo: {
        /** 적립금 사용 가능 여부 - true(가능), false(불가능) */
        usable: boolean;
        /** 적립금 사용 한도율 */
        accumulationInfo: {
            /** 적립금 사용 금액 단위, (AMOUNT, PERCENT) */
            unitType: AccumulationUnitType;
            /** 적립금 사용 양 */
            limitValue: number;
        };
    };
    /** 상품 기본옵션 가격기준으로 적용 가능한 최대 쿠폰 할인가 */
    couponDiscountAmt: number;
    /** 추가상품할인가 */
    additionDiscountAmt: number;
    /** 상품 이미지 URL 정보 */
    imageUrlInfo: {
        /** 상품 이미지 메인 여부 */
        isMain: boolean;
        /** 상품 이미지 URL 타입 */
        imageUrlType: ImageUrlType;
        /** 상품 이미지 URL */
        url: string;
    }[];
    /** 브랜드 번호 */
    brandNo: number;
    /** 브랜드 명 */
    brandName: string;
    /** 리스트 이미지 URL */
    listImageUrls: string[];
    /** 즉시할인가 */
    immediateDiscountAmt: number;
    /** 스티커 라벨(배열) */
    stickerLabels: string[];
    hasCoupons: HasCoupons;
    /** 즉시할인 타입 */
    immediateDiscountUnitType: DiscountUnitType;
    /** 추가상품할인 타입 */
    additionDiscountUnitType: DiscountUnitType;
    /** 화면 노출 여부 */
    frontDisplayYn: boolean;
    /** 구매 수량(재고 미노출의 경우 - 999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
    saleCnt: number;
    /** 상품 항목 추가 정보 */
    customProperties: CustomProperties[];
    /** 판매시작일시 */
    saleStartYmdt: string;
    /** 브랜드 한글 명 */
    brandNameKo: string;
    /** 상품진열에서 설정한 종료일 */
    sectionProductEndYmdt: string;
    /** 품절여부(true - 품절, false - 미품절) */
    isSoldOut: boolean;
    /** 성인 상품 여부(true: 성인 상품, false: 비성인 상품) */
    adult: boolean;
    /** 전시 카테고리 번호 */
    displayCategoryNos: string;
    /** 상품 조합형 옵션정보 */
    optionValues: {
        /** 옵션명 ( | 라인으로 구분 ) */
        optionValue: string;
        /** 재고 (재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
        stockCnt: number;
        /** 상품번호 */
        mallProductNo: number;
        /** 재고 번호 */
        stockNo: number;
    }[];
    /** 렌탈 정보 */
    rentalInfos: {
        /** 월 렌탈 금액 */
        monthlyRentalAmount: number;
        /** 선납금 */
        prePayment: number;
        /** 렌탈 기간 */
        rentalPeriod: number;
        /** 서비스 가능 최저 신용 등급 */
        creditRating: number;
    }[];
    /** 판매자 관리코드 */
    productManagementCd: string;
    reservationData: ReservationData;
    /** 배송비 타입 */
    deliveryConditionType: DeliveryConditionType;
    /** 상품진열에서 설정한 시작일 */
    sectionProductStartYmdt: string;
    /** 수동진열 전시 순서 */
    displayOrder: number;
    /** 브랜드명 타입 */
    brandNameType: BrandNameType;
    /** 파트너 번호 */
    partnerNo: number;
    /** 상품진열 상품 노출 타입 */
    productSalePeriodType: SalePeriodType;
    /** 최대 쿠폰 적용 가격(default: 0) */
    maxCouponAmt: number;
    /** 쿠폰 태그 */
    couponTag: string;
    /** 적립금 정보 */
    accumulateCalculateModel: {
        /** 회원등급적립률 */
        rewardRateOfMemberBenefit: number;
        /** 적립금 */
        amount: number;
        /** 상품개별적립률 */
        rewardRateOfProduct: number;
    };
    /** 추가할인 정률 최대 할인 금액 */
    maxDiscountAmount: number;
    /** 상품번호 */
    productNo: number;
    /** 상품 등록일 */
    registerYmdt: string;
    /** 파트너명 */
    partnerName: string;
    /** 상품판매가 */
    salePrice: number;
    /** 즉시할인 시작일자 */
    immediateDiscountStartYmdt: string;
    /** 상품 url 접근 가능 여부 */
    urlDirectDisplayYn: boolean;
    /** 판매중지 시 가격대체문구 */
    contentsIfPausing: string;
    /** 판매종료일시 */
    saleEndYmdt: string;
    /** 상품의 상품 노출 타입 */
    salePeriodType: SalePeriodType;
    /** 추가할인 최대 기준금액 */
    maxSalePrice: number;
    /** 홍보문구 */
    promotionText: string;
    stickerInfos: {
        /** 스티커 라벨 */
        label: string;
        /** 스티커 타입 */
        type: StickerInfoType;
    }[];
    listImageUrlInfo: {
        /** 상품 이미지 URL 타입 */
        imageUrlType: ImageUrlType;
        /** 상품 이미지 URL */
        url: string;
    }[];
    /** hsCode */
    hsCode: string;
    /** 즉시할인 종료일자 */
    immediateDiscountEndYmdt: string;
    unitPriceInfo: {
        /** 단위가격 */
        price: number;
        /** 단위명 */
        name: string;
        /** 단위유형 */
        type: string;
    };
    /** 상품 이미지 URL */
    imageUrls: string[];
    /** 브랜드 영문 명 */
    brandNameEn: string;
    /** 대표 옵션 재고 (재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
    mainStockCnt: number;
    /** 영문 상품명 */
    productNameEn: string;
    /** NHNEnt Search ID(상품검색 API응답에만 존재함) */
    searchProductId: string;
    /** 재고 (재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
    stockCnt: number;
    /** 판매상태 */
    saleStatusType: ProductSectionSaleStatusType;
}

export interface GetProductSectionProductsParams extends Paging {
    /** 정렬 기준 */
    by: ProductOrderType;
    /** 정렬 순서 ( DESC: 내림차순 (DEFAULT), ASC: 오름차순 ) */
    direction: OrderDirectionType;
    /** 품절 상품 포함 여부(default: false) */
    soldout: boolean;
    /** 상품 상태 */
    saleStatus: SaleStatusType;
    /** 옵션리스트 포함여부(default: false) */
    hasOptionValues: boolean;
    /** 판매중지 상품 포함 여부(default: false) */
    includeStopProduct: boolean;
}

export interface GetProductSectionProductsResponse {
    /** 전체 상품 수 */
    productTotalCount: number;
    /** 재고 노출 여부 (false:재고 미노출 / true:재고 노출) */
    displayableStock: boolean;
    /** 상품 목록 */
    products: Omit<ProductSectionProduct, 'enableCoupons'>[];
}
