import type {
    InputMatchingType,
    OptionSelectType,
    optionType,
    SaleType,
} from '@/models';

export interface GetProductOptionsParams {
    productNos: number[];
}

export interface GetProductOptionsResponse {
    optionInfos: OptionInfo[];
}

export interface OptionInfo {
    options: ProductOption[];
    /** 재고 노출 여부 (false:재고 미노출 / true:재고 노출)
     * false로 재고를 숨김처리 한 경우,
     * 재고 관련 필드는(실제 재고가 있더라도) -999로 고정으로 리턴하며 실재고 값은 따로 내려주지 않아 조회 불가합니다.
     * 실재고가 0인 경우에만 0으로 응답합니다.
     * 만약 재고 숨김처리 시, front에서 [-999]로 표시되도록 처리되고 있는게 있다면 재고노출여부(displayableStock)를 기준으로 수정 작업이 필요합니다.
     * 만약 재고 숨김처리 시, front에서 [품절]로 표시되도록 처리되고 있는게 있다면 재고/예약재고값을 기준이 아닌, 품절상태(isSoldOut)값을 기준으로 처리되도록 수정 작업이 필요합니다.
     */
    displayableStock: boolean;
    /** 상품번호 */
    mallProductNo: number;
}

export interface ProductOption {
    /** 할인 적용가 */
    buyPrice: number;
    /** 필수 옵션 여부 */
    isRequiredOption: boolean;
    images: {
        /** 메인이미지 여부 (true: 메인이미지, false: 메인이미지 아님) */
        main: boolean;
        /** 이미지 URL */
        url: string;
    }[];
    /** 판매 상태 유형 */
    saleType: 'AVAILABLE' | 'SOLD_OUT' | 'UNAVAILABLE';
    /** 추가 관리 코드 */
    extraManagementCd: string;
    /** 대표옵션 여부, true: 대표옵션, false: 대표옵션 아님 */
    main: boolean;
    /** 추가금액 */
    addPrice: number;
    /** 옵션명 */
    label: string;
    /** 판매수량 */
    saleCnt: number;
    /** 예약재고수량 */
    reservationStockCnt: number;
    /** 자식 옵션 목록 */
    children: ProductOption[];
    /** 재고수량 */
    stockCnt: number;
    /** 옵션 관리 코드 */
    optionManagementCd: string;
    /** 옵션번호 */
    optionNo: number;
    /** 옵션값 */
    value: string;
    /** 임시품절여부 true: 임시 품절, false: 임시 품절 아님 */
    forcedSoldOut: boolean;
}

export interface GetProductOptionParams {
    /* (관리자전용) 미리보기 전용 플래그 값 추가 */
    preview?: boolean;
}

export interface ProductOptionResponse {
    /** 필수 옵션 여부 */
    isRequiredOption?: boolean;
    /** 상품 판매가 */
    productSalePrice: number;
    /** 즉시 할인가 */
    immediateDiscountAmt: number;
    /** 일체형 옵션 */
    flatOptions: FlatOption[];
    /** 구매자 작성형 정보(텍스트 옵션 내 기입문장) */
    inputs: TextOptionInput[];
    /** 분리형 옵션 */
    multiLevelOptions: MultiLevelOption[];
    /** 옵션 선택 타입 */
    selectType: OptionSelectType;
    /**
     * 재고 노출 여부 (false:재고 미노출 / true:재고 노출)
     *  - false로 재고를 숨김처리 한 경우,
     *      - 1. 재고 관련 필드는(실제 재고가 있더라도) -999로 고정으로 리턴하며 실재고 값은 따로 내려주지 않아 조회 불가합니다.
     *      - 2. 실재고가 0인 경우에만 0으로 응답합니다.
     *          - 만약 재고 숨김처리 시, front에서 [-999]로 표시되도록 처리되고 있는게 있다면 재고노출여부(displayableStock)를 기준으로 수정 작업이 필요합니다.
     *          - 만약 재고 숨김처리 시, front에서 [품절]로 표시되도록 처리되고 있는게 있다면 재고/예약재고값을 기준이 아닌, 품절상태(saleType>SOLD_OUT)값을 기준으로 처리되도록 수정 작업이 필요합니다.
     */
    displayableStock: boolean;
    /** 옵션 타입 */
    type: optionType;
    /** 옵션명 목록 */
    labels: string[];
}

/** 분리형 옵션 */
export type MultiLevelOption = MultiLevelBranch | FlatOptionWithChildren;
export interface MultiLevelBranch {
    /** 필수 옵션 여부 */
    isRequiredOption: boolean;
    /** 자식 옵션 목록 */
    children: MultiLevelOption[];
    /** 옵션명 */
    label: string;
    /** 옵션값 */
    value: string;
}

/** 일체형 옵션 */
export interface FlatOption {
    /** 필수 옵션 여부 */
    isRequiredOption: boolean;
    /** 할인적용가 */
    buyPrice: number;
    /** (옵션) 이미지 정보 */
    images: {
        /** 메인이미지 여부 (true: 메인이미지, false: 메인이미지 아님) */
        main: boolean;
        /** 이미지 URL */
        url: string;
    }[];
    /** 판매타입 */
    saleType: SaleType;
    /** extraManagementCode */
    extraManagementCd: string;
    /** 대표 옵션 여부 (true: 대표 옵션, false:대표 옵션 아님) */
    main: boolean;
    /** 추가금액 */
    addPrice: number;
    /** 옵션명 */
    label: string;
    /** 렌탈료 정보 */
    rentalInfo: RentalInfo[];
    /** 판매수량 */
    saleCnt: number;
    /** 예약재고수량 */
    reservationStockCnt: number;
    /** 재고수량 */
    stockCnt: number;
    /** 옵션 판매자 관리 코드 */
    optionManagementCd: string;
    /** 옵션번호 */
    optionNo: number;
    /** 옵션값 */
    value: string;
    /** 임시 품절 여부 (true: 임시품절, false:임시품절 아님) */
    forcedSoldOut: boolean;
    /** 자식 옵션 목록 */
    children?: Nullable<FlatOptionWithChildren[]>;
}

/** 자식 옵션 목록 */
export interface FlatOptionWithChildren extends FlatOption {
    /** 자식 옵션 목록 */
    children: Nullable<FlatOptionWithChildren[]>;
}

/** 구매자 작성형 정보(텍스트 옵션 내 기입문장) */
export interface TextOptionInput {
    /** 매칭타입 */
    inputMatchingType: InputMatchingType;
    /** 텍스트 옵션 입력 문구 */
    inputLabel: string;
    /** 필수 여부 (true: 필수, false: 필수 아님) */
    required: boolean;
    /** 텍스트 옵션 번호 */
    inputNo: number;
    inputValue: string;
}

/** 렌탈 정보 (옵션이 없는 상품의 경우 조회, 옵션이 있는 상품의 경우 옵션 조회 API(/products/{productNo}/options) 에서 렌탈 정보 조회 가능) */
export interface RentalInfo {
    /**  월 렌탈 금액 */
    monthlyRentalAmount?: number;
    /** 렌탈 기간 */
    rentalPeriod?: number;
    /** 서비스 가능 최저 신용 등급 */
    creditRating?: number;
}

export interface OptionImageInfo {
    /** 옵션이미지 URL */
    imageUrl: string;
    /** 메인이미지 여부 (true: 메인이미지, false: 일반이미지) */
    main: boolean;
    /** 옵션 번호 */
    optionNo: number;
    /** 매진 여부 (true: 매진, false:재고 있음) */
    soldout: boolean;
}

export type GetProductOptionImagesResponse = OptionImageInfo[];

export type GetOptionImagesResponse = OptionImageInfo[];
