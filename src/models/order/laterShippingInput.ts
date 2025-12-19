import { CountryCdType, OrderRequestType } from '@/models';
// import { RawAxiosRequestHeaders } from 'axios';

export interface GetAreaFeesParams {
    /** 배송비 템플릿 번호 */
    templateNo?: string;
    /** 암호화된 배송 번호 리스트 */
    encryptedShippingNo?: string;
}

export interface GetAreaFee {
    /** 주소 */
    address: string;
    /** 추가배송비 */
    extraDeliveryAmt: number;
}

export type GetAreaFeesResponse = GetAreaFee[];

// export interface GetLaterOrderDetailHeaders extends RawAxiosRequestHeaders {
//     encryptedShippingNo: string;
// }

export interface GetLaterOrderDetailParams {
    /** 주문옵션타입 (ALL: 전체, CLAIM: 클레임진행, NORMAL: 클레임미진행) */
    orderRequestType?: OrderRequestType;
}

export interface GetShippingsParams {
    /** 암호화된 배송 번호 리스트 */
    encryptedShippingNo: string;
}

export interface GetShippingsResponse {
    /** 배송지 주소 */
    receiverAddress: string;
    /** 배송지 지번(지역 추가 배송비 계산시 사용) */
    receiverJibunAddress: string;
    /** 수령자 명 */
    receiverName: string;
    /** 배송지 우편 번호 */
    receiverZipCd: string;
    /** 파트너 번호 리스트 */
    partnerNos: (boolean | string | number)[];
    /** 배송지 입력 완료 여부 */
    laterInputCompleted: boolean;
    /** 배송지 상세 주소 */
    receiverDetailAddress: string;
    /** 배송 메모 */
    deliveryMemo: string;
    /** 몰 번호 */
    mallNo: number;
    /** 연락처1 (nullable) */
    receiverContact1?: Nullable<string>;
    /** 배송 번호 리스트 */
    deliveryNos: (boolean | string | number)[];
}

export interface UpdateShippingData {
    /** (해외배송 시 필수) 수령인 lastName (nullable) */
    receiverLastName?: Nullable<string>;
    /** 수령자지번주소 (nullable) */
    receiverJibunAddress?: Nullable<string>;
    /** 수령자명 */
    receiverName: string;
    /** 국가코드 (nullable) */
    countryCd?: Nullable<CountryCdType>;
    /** 수령자우편번호 */
    receiverZipCd: string;
    /** 수령자상세주소 */
    receiverDetailAddress: string;
    /** 배송메모 (nullable)  */
    deliveryMemo?: Nullable<string>;
    /** (해외) 도시 (nullable) */
    receiverCity?: Nullable<string>;
    /** [개발중] 연락처 국가코드 (nullable) */
    receiverMobileCountryCd?: Nullable<string>;
    /** 수령자주소 */
    receiverAddress: string;
    /** (해외) 주 (nullable) */
    receiverState?: Nullable<string>;
    /** (해외배송 시 필수) 수령인 firstName (nullable) */
    receiverFirstName?: Nullable<string>;
    /** 수령자연락처1 */
    receiverContact1: string;
}
