import { ShopbyTermHistoryTypes, ShopbyTermsTypes } from '@/models';

export interface GetTermListParams {
    termsTypes: ShopbyTermsTypes[];
    /** 사용 중인 약관만 조회 여부 (Default : false) */
    usedOnly?: boolean;
}

export interface GetTermListByPostData extends GetTermListParams {
    replacementPhrase: {
        [key: string]: string;
    };
}

export type GetTermListResponse = {
    [K in ShopbyTermsTypes as Lowercase<K>]: {
        contents: string;
        enforcementDate: string;
        used: boolean;
    };
};

// TODO
/**  샵바이 가이드에 schema가 안나와있어서 customCategoryType를 임시로 string으로 지정함
 * https://docs.shopby.co.kr/?url.primaryName=manage/#/Terms/get-custom-terms
 */
export interface GetAdditionalTermsData {
    customCategoryType: string;
    replacementPhrase?: string;
}

export interface GetTermDetailByPostData {
    termsNo: number;
    replacementPhrase: {
        [key: string]: string;
    };
}

export interface GetTermDetailByPostResponse {
    /** 약관 사용 여부 (false: 미사용, true: 사용) */
    used: boolean;
    /** 약관 내용 */
    contents: string;
    /** 시행일 */
    enforcementDate: string;
}

export interface AdditionalTermsResponse {
    /** 약관 번호 */
    no: number;
    /** 약관 내용 */
    contents: string;
    /** 사용 여부 */
    used: boolean;
    /** 약관명 */
    termsName: string;
    /** 필수 여부 */
    required: boolean;
    /** 약관 영문명 (nullable) */
    termsNameEng?: string;
}

export interface GetTermHistoryParams {
    /** 조회할 약관 타입 리스트 */
    termsType: ShopbyTermHistoryTypes;
    /** 조회할 현재부터 미래 날짜 */
    futureDaysToShow?: string;
}

export type GetTermsHistoryResponse = {
    /** 약관 시행일 상태 */
    termsEnforcementStatusLabel: string;
    /** 약관 시행일 */
    enforcementDate: string;
    /** 약관 번호 */
    termsNo: number;
}[];

export interface GetUsedTermsParams {
    /** 조회할 약관 타입 리스트 */
    termsTypes: ShopbyTermsTypes[];
}

export interface GetUsedTermsResponse {
    /** 사용중인 약관 타입 */
    termsList: ShopbyTermsTypes[];
}
