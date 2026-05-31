import type { AddressType, CountryCdType, OptionYnType } from '@/models';

export interface Address {
    /** 성 (nullable) */
    lastName?: Nullable<string>;
    /** 기본 배송지 여부 */
    defaultYn: OptionYnType;
    /** 도시 (nullable) */
    city?: Nullable<string>;
    /** 국가코드 (nullable) */
    countryCd?: Nullable<CountryCdType>;
    /** 배송지 우편 번호 */
    receiverZipCd: string;
    /** [개발중] 연락처 국가코드 */
    receiverMobileCountryCd?: Nullable<string>;
    /** 주/지역 (nullable) */
    state?: Nullable<string>;
    /** 연락처1 */
    receiverContact1: string;
    /** 연락처2 (nullable) */
    receiverContact2?: Nullable<string>;
    /** 배송지 등록일 (nullable) */
    registerYmdt?: Nullable<string>;
    /** 배송지 지번 (nullable) */
    receiverJibunAddress?: Nullable<string>;
    /** 수령자 명 */
    receiverName: string;
    /** 배송지타입 */
    addressType: AddressType;
    /** 개인고유통관부호(nullable) */
    customsIdNumber?: Nullable<string>;
    /** 배송지 마지막 사용일 (nullable) */
    lastUseYmdt?: Nullable<string>;
    /** 외부회원 번호 (nullable) */
    externalMemberNo?: Nullable<string>;
    /** 배송지 메모 */
    addressMemo?: Nullable<string>;
    /** 배송지 상세 주소 (nullable) */
    receiverDetailAddress?: Nullable<string>;
    /** 배송지 주소 */
    receiverAddress: string;
    /** 해외배송지 기타정보 (nullable) */
    shippingEtcInfo?: {
        /** 해외배송지 수령인 lastName (nullable) */
        receiverLastName?: Nullable<string>;
        /** 주문 추가항목 (nullable) */
        orderAdditionalInfo?: Nullable<string>;
        /** 해외배송지 수령인 firstName (nullable) */
        receiverFirstName?: Nullable<string>;
    };
    /** 이름 (nullable) */
    firstName?: Nullable<string>;
    /** 회원 번호 */
    memberNo: number;
    /** 배송지 번호 */
    addressNo: number;
    /** 주소록명 */
    addressName: string;
    /** 쇼핑몰 번호 */
    mallNo: number;
}

export interface GetShippingAddressListResponse {
    /** 최근 배송지 */
    recentAddresses: Address[];
    /** 정기결제배송지(샵바이프리미엄 전용) */
    recurringPaymentAddresses: Address[];
    /** 저장된 배송지 */
    bookedAddresses: Address[];
    /** 기본 배송지 */
    defaultAddress: Address;
}

export interface RegisterShippingAddressData {
    /** (해외배송 / 글로벌결제 시 필수) 수령인 LastName (nullable) */
    receiverLastName?: Nullable<string>;
    /** 배송지 지번 */
    receiverJibunAddress: string;
    /** 기본배송지 여부  */
    defaultYn: OptionYnType;
    /** 수령자 명 */
    receiverName: string;
    /** 배송지타입 */
    addressType: AddressType;
    /** 개인고유통관부호 */
    customsIdNumber?: Nullable<string>;
    /** 국가코드 */
    countryCd?: Nullable<CountryCdType>;
    /** 배송지 우편 번호 */
    receiverZipCd: string;
    /** 배송지 메모 (nullable) */
    addressMemo?: Nullable<string>;
    /** 배송지 상세 주소 */
    receiverDetailAddress: string;
    /** (해외) 도시 (nullable) */
    receiverCity?: Nullable<string>;
    /** 연락처 국가코드 (nullable) */
    receiverMobileCountryCd?: Nullable<string>;
    /** 배송지 주소 */
    receiverAddress: string;
    /** (해외) 주 (nullable) */
    receiverState?: Nullable<string>;
    /** 주소록명 */
    addressName?: Nullable<string>;
    /** (해외배송 / 글로벌결제 시 필수) 수령인 FirstName (nullable) */
    receiverFirstName?: Nullable<string>;
    /** 연락처1 */
    receiverContact1: string;
    /** 연락처2 */
    receiverContact2?: Nullable<string>;
}

export interface GetPagedShippingAddressListResponse {
    /** 배송지 내역 */
    contents: Address[];
    /** 총 수량 */
    totalCount: number;
}

export interface GetPagedShippingAddressParams {
    /** 페이지 번호 (1 이상) */
    page: number;
    /** 페이지당 노출 개수 */
    size: number;
}

export type UpdateDefaultShippingAddressResponse = Address;

export type GetShippingAddressResponse = Address;

export type RegisterShippingAddressResponse = Address;

export type GetRecentShippingAddressResponse = Address;

export interface GetShippingEnumInfoResponse {
    /** 일본 주(state) 코드 */
    jpStateCd: {
        name: string;
        label: string;
    }[];
    /** 미국 주(state) 코드 */
    usStateCd: {
        name: string;
        label: string;
    }[];
    /** 국가 코드 */
    countryCd: {
        name: string;
        label: string;
    }[];
    /** 캐나다 주(state) 코드 */
    caStateCd: {
        name: string;
        label: string;
    }[];
}
