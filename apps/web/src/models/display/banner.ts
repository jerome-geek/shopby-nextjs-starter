import type { BannerDisplayType, BrowserTargetType } from '@/models';

export type DisplayType = 'SEQUENTIAL' | 'RANDOM';

export type LandingUrlType = 'GENERAL' | 'IMAGE_MAP' | 'EVENT';

export interface GetBannerExtraInfosParams {
    /** 배너 섹션 번호 */
    bannerSectionNo?: number;
    /** 배너 번호 리스트(쉼표로 구분하여 입력) */
    bannerNos?: number[];
}

export interface BannerExtraInfo {
    /** 배너 추가 정보 */
    extraInfo: string;
    /** 배너 번호 */
    bannerNo: number;
}

export type GetBannerExtraInfosResponse = BannerExtraInfo[];

export type GetBannersResponse = BannersResponse[];

export type GetBannersByIdsResponse = BannersResponse[];

export interface BannersResponse {
    /** 배너 코드 */
    code: string;
    accounts: BannerAccount[];
    /** 배너 ID */
    id: string;
    /** 배너 라벨명 */
    label: string;
    /** 배너 섹션 번호 */
    bannerSectionNo: number;
}

export interface BannerAccount {
    /** 구좌 노출 방식 SEQUENTIAL: 순차, RANDOM: 랜덤 */
    displayType: DisplayType;
    /** 구좌 노출 순서 */
    displayOrder: number;
    /** 배너 구좌명 */
    accountName: string;
    /** 배너 구좌 번호 */
    accountNo: number;
    /** 구좌 넓이 */
    width: number;
    banners: Banner[];
    /** 구좌 높이 */
    height: number;
}

export interface Banner {
    /** 배너 이미지 - 왼쪽 여백 색상 */
    leftSpaceColor: string;
    /** 배너 전시 시작일  */
    displayStartYmdt: Date;
    /** 배너명 색상 */
    nameColor: string;
    /** 배너 랜딩 URL 타입 GENERAL: 일반, IMAGE_MAP: 이미지맵, EVENT: 기획전 */
    landingUrlType: LandingUrlType;
    /** 배너 전시 순서 */
    displayOrder: number;
    /** 배너 설명 */
    description: string;
    /** 배너 설명 색상 */
    descriptionColor: string;
    /** 배너 전시 기간 타입 (REGULAR: 상시, PERIOD: 기간설정) */
    displayPeriodType: BannerDisplayType;
    /** 배너 번호 */
    bannerNo: number;
    /** 배너 랜딩 페이지 브라우저 타겟 (CURRENT: 현재창, NEW: 새창, REF_URL: 새창) */
    browerTargetType: BrowserTargetType;
    /** 배너 이미지 - 오른쪽 여백 색상 */
    rightSpaceColor: string;
    /** 동영상 URL */
    videoUrl: string;
    /** 마우스 오버 이미지 URL */
    mouseOverImageUrl: string;
    /** 배너 이미지 URL */
    imageUrl: string;
    /** 배너명 */
    name: string;
    /** 배너 랜딩 URL */
    landingUrl: string;
    /** 배너 전시 종료일 */
    displayEndYmdt: Date;
}
