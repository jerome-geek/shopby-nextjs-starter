export interface SearchAddressParams extends Omit<Paging, 'hasTotalCount'> {
    /** 검색 키워드 */
    keyword: string;
}

export interface SearchAddressResponse extends ItemList<AddressItem> {
    groupByStates: GroupByState[];
}

/** 시도 검색 결과 배열 */
export interface GroupByState {
    state: string;
    count: number;
}

/** 주소 검색 결과 배열 */
export interface AddressItem {
    /** 새 우편번호 */
    zipCode: string;
    /** 구 우편번호 */
    oldZipCode: string;
    /** 도로명 주소의 참고 항목 */
    roadAddressExtra: string;
    /** 기본 반환 도로명 주소^|서울특별시 구로구 디지털로26길 72 (NHN KCP) */
    address: string;
    /** 관련 지번 */
    relatedJibun: string;
    /** 기본 도로명 주소 */
    roadAddress: string;
    /** 지번 주소 */
    jibunAddress: string;
    /** 기본 반환 도로명 주소의 참고항목 */
    detailAddress: string;
    /** 영문명 주소 */
    engAddress: string;
}

export interface SearchJpAddressParams {
    /** 우편번호 */
    zipCode: string;
}

export interface SearchJpAddressResponse {
    /** 도도부현 코드 (2자리) */
    prefCode: string;
    /** 우편번호 */
    zipCode: string;
    /** 전체 주소 */
    address: string;
    /** 상세 주소 */
    streetAddress: string;
    /** 시/구/읍/면 이름 */
    city: string;
    // TODO: 실제 응답값 체크 필요
    /** 입력된 우편번호에 해당하는 복수의 주소 리스트 */
    addressList: string[];
    /** JIS 코드 */
    jisCode: string;
    /** 도도부현 이름 */
    state: string;
    /** 전체 주소 (영문) */
    addressEnglish: string;
}
