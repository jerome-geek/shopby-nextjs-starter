import {
    ClaimReasonType,
    ClaimType,
    ClaimValidationType,
    ResponsibleObjectType,
    ReturnWayType,
} from '@/models';
import { CancelOptionsData } from '@/models/claim';

export interface UpdateReturnAccountData {
    /** 계좌소유자명 (nullable) */
    depositorName?: Nullable<string>;
    /** 은행코드 (nullable) */
    bank?: Nullable<string>;
    /** 계좌번호 (nullable) */
    account?: Nullable<string>;
}

export interface CheckWithdrawResponse {
    /** 클레임 번호 */
    claimNo: number;
    /** 이후 클레임 번호 */
    afterClaimNos: number[];
    /** 철회 시 유효성 검증 타입*/
    validationType: ClaimValidationType;
    /** 배송 번호 */
    shippingNos: number[];
}

export interface CancelClaimOptionData
    extends Omit<CancelOptionsData, 'claimedProductOptions'> {
    /** 취소 제품 수량 */
    productCnt: number;
}

export interface GetClaimOptionPriceParams {
    /** 클레임사유 */
    claimReasonType: ClaimReasonType;
    /** 클레임타입 */
    claimType: ClaimType;
    /**  교환할수량(claimType이 EXCHANGE인 경우) */
    exchangeCnt?: string;
    /** 교환할옵션번호(claimType이 EXCHANGE인 경우) */
    exchangeOptionNo?: string;
    /**  교환할상품번호(claimType이 EXCHANGE인 경우) */
    exchangeProductNo?: string;
    /** 취소/반품할 제품수량 */
    productCnt: string;
    /** 귀책 - responsibleObjectType이 null이면 ClaimReasonType에 매핑되는 귀책 적용 (CHANGE_MIND, CANCEL_BEFORE_PAY, OTHERS_BUYER -> BUYER / DEFECTIVE_PRODUCT, WRONG_DELIVERY, OUT_OF_STOCK_SYSTEM, WRONG_PRODUCT_DETAIL, DELAY_DELIVERY, OUT_OF_STOCK, OTHERS_SELLER -> SELLER) */
    responsibleObjectType?: ResponsibleObjectType;
    /** 반품상품 수거방법 (nullable) */
    returnWayType?: ReturnWayType;
}

export interface CancelClaimData
    extends Omit<CancelOptionsData, 'claimedProductOptions'> {}

export interface CancelLaterInputShippingOrderParams {
    /** 암호화된 배송 번호 */
    encryptedShippingNo: string;
}
