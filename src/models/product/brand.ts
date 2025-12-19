import { BrandNameType } from '@/models';

export interface GetBrandsParams extends Paging {
    filter?: {
        /** 검색할 브랜드명 */
        name?: string;
        /** 검색할 카테고리 번호 */
        categoryNo?: number;
        /** 품절 상품 포함 여부(default: false) */
        soldOutIncluded?: boolean;
        /** DB검색 사용 (default: false , 검색엔진 사용) */
        fromDB?: boolean;
        sort?: {
            /** 정렬 필드 (null 또는 값 없음(default) - 브랜드명 가나다순 / PRODUCT_COUNT - 브랜드 상품 매핑 수로 정렬 후, 브랜드 가나다순 / REGISTER_DATE - 등록일순) */
            criterion?: 'PRODUCT_COUNT' | 'REGISTER_DATE';
            /** 정렬 방식 (ASC - 오름차순, DESC - 내림차순 / 정렬 필드가 있는 경우에만 적용됩니다.) */
            direction?: 'ASC' | 'DESC';
        };
    };
}

export interface GetBrandsResponse {
    /** 전체 브랜드 수 */
    totalCount?: number;
    items: {
        /** 브랜드명 노출타입 */
        nameType: 'NAME_KO' | 'NAME_EN' | 'NONE';
        /** 서브 브랜드명 */
        subBrandName: string;
        /** 전시 브랜드 번호 */
        displayBrandNo: number;
        /** 브랜드 설명 */
        description: string;
        /** 브랜드 이미지 또는 브랜드 관련 동영상 url */
        displayAreaContentUrl: string;
        /** 브랜드 번호(전시 브랜드 번호와 동일합니다) */
        brandNo: number;
        /** 메인 브랜드명 */
        mainBrandName: string;
    }[];
}

export interface GetBrandsExtraInfoParams {
    /** 전시 브랜드 번호 */
    displayBrandNos: number[];
}

export interface BrandExtraInfo {
    /** 전시 브랜드 번호 */
    displayBrandNo: number;
    /** 추가 정보 */
    extraInfo: string;
}

export type GetBrandsExtraInfoResponse = BrandExtraInfo[];

export interface SearchBrandsParams extends Omit<Paging, 'hasTotalCount'> {
    /** 검색할 브랜드명(없는 경우, 전체 브랜드 조회) */
    brandName?: string;
    /** 정렬 필드(default: BRAND_NAME), (BRAND_NAME:브랜드명, LIKE_COUNT:브랜드 좋아요 수) */
    sortCriterion?: 'BRAND_NAME' | 'LIKE_COUNT';
    /** 정렬 방식(default: DESC), (ASC:오름차순, DESC:내림차순) */
    sortDirection?: 'ASC' | 'DESC';
}

export interface SearchBrand {
    /** 브랜드 번호 */
    brandNo: number;
    /** 브랜드명 */
    mainBrandName: string;
}

export type SearchBrandResponse = SearchBrand[];

export interface GetBrandInfoByBrandNoParams {
    /** 브랜드번호 */
    displayBrandNos?: string[];
}

export interface GetBrandInfoByBrandNoResponse {
    brands: {
        /** 부모 브랜드 번호 */
        parentNo: number;
        /** 서브브랜드명 */
        subBrandName: string;
        /** 뎁스 */
        depth: number;
        /** 브랜드번호 */
        displayBrandNo: number;
        /** 브랜드 이미지 또는 브랜드 관련 동영상 url */
        displayAreaContentUrl?: string;
        /** 메인브랜드명 */
        mainBrandName: string;
        /** 브랜드 추가항목 */
        extraInfo: string;
    }[];
}

export interface BrandTree {
    /** 브랜드 번호 */
    no: number;
    /** 브랜드 depth */
    depth: number;
    /** 하위 브랜드 */
    children: BrandTree[];
    /** 메인 브랜드명 */
    name: string;
}

export type GetBrandTreeResponse = BrandTree[];

export interface GetBrandDetailResponse {
    /** 브랜드명 노출타입 */
    nameType: BrandNameType;
    /** 서브 브랜드명 */
    subBrandName: string;
    /** 브랜드 설명 */
    description: string;
    /** 브랜드 이미지 또는 브랜드 관련 동영상 url */
    displayAreaContentUrl: string;
    /** 브랜드번호 */
    brandNo: number;
    /** 메인 브랜드명 */
    mainBrandName: string;
    /** 브랜드 추가 설명 */
    extraInfo: string;
}

export interface BrandChildren {
    /** 서브 브랜드명 */
    subBrandName: string;
    /** 브랜드 depth */
    depth: number;
    /** 전시브랜드 번호 */
    displayBrandNo: number;
    /** 브랜드 이미지 또는 브랜드 관련 동영상 url */
    displayAreaContentUrl: string;
    /** 메인 브랜드명 */
    mainBrandName: string;
}

export type GetBrandChildrenResponse = BrandChildren[];
