import { OptionType } from '@/models';
import { OptionInputs } from '@/models/order';

export interface GetWishListResponse {
    /** 가격 정보 */
    price: {
        /** 구매금액 합 */
        buyAmt: number;
        /** 구매확정 시 적립금 합 */
        accumulationAmtWhenBuyConfirm: number;
    };
    /** 주문 상품 옵션 */
    orderProductOptions: {
        /** 예약주문 상품 배송시작예정일 */
        reservationDeliveryYmdt: string;
        /** 옵션권장출력값 */
        optionTitle: string;
        /** 주문 상품 */
        product: {
            /** 브랜드 명 */
            brandName: string;
            /** 상품 url */
            imageUrl: string;
            /** 상품 영문명 */
            productNameEn?: Nullable<number>;
            /** 브랜드 번호 (nullable) */
            brandNo?: Nullable<number>;
            /** 상품 명 */
            productName: string;
            /** 상품 번호 */
            productNo: number;
        };
        /** 구매확정 시 적립금 합 */
        accumulationAmtWhenBuyConfirm: number;
        /** 유효성 정보 */
        validInfo: {
            /** 유효 여부(true: 유효, false: 유효하지 않음) */
            valid: boolean;
            /** deprecated(더 이상 제공하지 않는 개체항목입니다) */
            validYn: string;
            /** (nullable) */
            errorCode?: Nullable<string>;
            /** 유효성 실패 사유 메세지 (nullable) */
            message?: Nullable<string>;
            /** 주문수량변경 가능 여부(true:변경가능, false:변경불가능) */
            orderCntChangeable: boolean;
        };
        /** 위시리스트 번호 */
        wishNo: number;
        /** 옵션값 */
        optionValue: string;
        /** 주문수량 */
        orderCnt: number;
        /** 소비자 입력형 옵션 */
        optionInputs: OptionInputs;
        /** 품절여부 (true:품절 false:구매가능) */
        soldOut: boolean;
        /** 옵션형태 */
        optionType: OptionType;
        /** 옵션 가격 정보 */
        price: {
            /** 구매금액(구매가 * 주문수량) */
            buyAmt: number;
            /** 추가할인금액 */
            additionalDiscountAmt: number;
            /** 즉시할인금액 */
            immediateDiscountAmt: number;
            /** 상품판매가 */
            salePrice: number;
            /** 정상금액(상품판매가 + 옵션추가금액) * 주문수량 */
            standardAmt: number;
            /** 옵션가격(추가금액) */
            addPrice: number;
        };
        /** 옵션 이미지 URL */
        imageUrl: string;
        /** 예약주문여부 (true: 예약주문상품, false: 일반상품) */
        reservation: boolean;
        /** 재고 개수 */
        stockCnt: number;
        /** 옵션번호 */
        optionNo: number;
        /** 옵션명 */
        optionName: string;
        /** 판매자 관리코드 */
        optionManagementCd: string;
        /** 상품번호 */
        productNo: number;
    }[];
}

/** 위시 수정 리스트 */
export interface UpdateWishListData {
    /** 위시번호 */
    wishNo: number;
    /** 구매개수 */
    orderCnt: number;
    /** 구매자 입력형 옵션 */
    optionInputs: {
        /** 구매자 작성형 입력 값 */
        inputValue: string;
        /** 구매자 작성형 입력 이름 */
        inputLabel: string;
        /** 구매자 입력형 옵션 번호 (nullable) */
        inputNo?: Nullable<number>;
    }[];
}

/** 위시 등록리스트 */
export interface RegisterWishListData {
    /** 구매개수 (nullable) */
    orderCnt?: Nullable<number>;
    /** 구매자 입력형 옵션 */
    optionInputs?: {
        /** 구매자 작성형 입력 값 */
        inputValue: string;
        /** 구매자 작성형 입력 이름 */
        inputLabel: string;
        /** 구매자 입력형 옵션 번호 (nullable) */
        inputNo?: Nullable<number>;
    }[];
    /** 옵션번호 */
    optionNo: number;
    /** 상품번호 */
    productNo: number;
    /** 추가상품번호 (nullable) */
    additionalProductNo?: Nullable<number>;
}

export interface RegisterWishListResponse {
    /** 회원의 총 Wish 상품수 (최대 100개 가능) */
    count: number;
}

export interface DeleteWishListParams {
    /** TODO: API 문서상 number로 되어 있어 확인 필요 */
    /** 위 번호 */
    wishNos: string[];
}
