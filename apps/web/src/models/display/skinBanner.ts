import {
    BannerGroupType,
    ButtonBorderType,
    ButtonSizeType,
    DisplayPeriodType,
    OpenLocationType,
    PlatformType,
    SizeUnitType,
    SlideEffectType,
    SlideNavigationType,
    SlideSpeedType,
} from '@/models';

export interface GetSkinBannersParams {
    /** 배너 그룹 코드 리스트 (, 구분값) */
    bannerGroupCodes: string;
    /** 스킨 번호 (미리보기의 경우에만 입력) */
    skinNo?: number;
}

export interface GetSkinBannersResponse {
    /** 스킨 코드 */
    skinCode: string;
    /** 스킨 이름 */
    skinName: string;
    /** 배너 그룹 타입 */
    bannerGroupType: BannerGroupType;
    /** 스킨 번호 */
    skinNo: number;
    /** 배너 목록 */
    banners: SkinBanner[];
    /** 배너 그룹 이름 */
    bannerGroupName: string;
    /** 배너 그룹 코드 */
    bannerGroupCode: string;
}

export interface SkinBanner {
    /** 노출 여부 */
    visible: boolean;
    /** 배너 리사이즈 여부 */
    resizable: boolean;
    /** 배너 등록 날짜 */
    registerDateTime: string;
    slideBannerConfig: SlideBannerConfig;
    /** 플랫폼 유형 */
    platformType: PlatformType;
    /** 배너 번호 */
    bannerNo: number;
    displayValue: DisplayValue;
    /** 배너 제목 */
    bannerTitle: string;
    /** 배너 넓이 */
    width: number;
    /** 배너 수정 날짜 */
    updateDateTime: string;
    /** 배너 사이즈 단위 */
    sizeUnitType: SizeUnitType;
    bannerImages: BannerImage[];
    /** 배너 높이 */
    height: number;
}

export interface SlideBannerConfig {
    /** 슬라이드 배너 - 전환 속도 */
    slideSpeedType: SlideSpeedType;
    /** 슬라이드 배너 - 네비게이션 노출 정보 */
    slideNavigationInfo: SlideNavigationInfo;
    /** 슬라이드 배너 - 좌우 버튼 색상 */
    slideButtonColor: string;
    /** 슬라이드 배너 - 전환 시간 */
    slideTime: number;
    /** 슬라이드 배너 - 네비게이션 노출 유형 */
    slideNavigationType: SlideNavigationType;
    /** 슬라이드 배너 - 효과 종류 */
    slideEffectType: SlideEffectType;
    /** 슬라이드 배너 - 좌우 버튼 사용 여부 */
    usableSlideButton: boolean;
}

export interface SlideNavigationInfo {
    /** 슬라이드 배너 - 네비게이션 노출 버튼 디자인 */
    buttonSizeType: ButtonSizeType;
    /** 슬라이드 배너 - 네비게이션 노출 버튼 디자인 (비 활성화 버튼 배경 색상) */
    inactiveButtonColor: string;
    /** 슬라이드 배너 - 네비게이션 노출 버튼 디자인 (활성화 버튼 배경 색상) */
    activeButtonColor: string;
    /** 슬라이드 배너 - 네비게이션 노출 버튼 디자인 */
    buttonBorderType: ButtonBorderType;
}

export interface DisplayValue {
    /** 전시 시작 일자 */
    startDateTime: string;
    /** 전시 종료 일자 */
    endDateTime: string;
    /** 전시 기간 타입 */
    displayPeriodType: DisplayPeriodType;
}

export interface BannerImage {
    displayValue: DisplayValue;
    /** 배너 이미지 랜딩 타겟 */
    openLocationType: OpenLocationType;
    /** 배너 이미지 - 네비게이션 비활성 버튼 이미지 */
    inactiveNavigationImageUrl: string;
    /** 배너 이미지 URL */
    imageUrl: string;
    /** 배너 이미지 순서 */
    displayOrder: number;
    /** 배너 이미지 설명 */
    description: string;
    /** 배너 이미지 번호 */
    imageNo: number;
    /** 배너 이미지 - 네비게이션 활성 버튼 이미지 */
    activeNavigationImageUrl: string;
    /** 배너 이미지 랜딩 URL */
    landingUrl: string;
}

export interface GetSkinBannerGroupsBySkinParams {
    /** 미리보기 스킨 여부 (기본값 : false / false인 경우 사용중인 스킨의 배너 그룹 정보를 가져옴) */
    isPreview: boolean;
    /** 스킨 번호 (미리보기의 경우에 필수 입력) */
    skinNo: number;
}

export interface GetSkinBannerGroupsBySkinResponse {
    /** 스킨 꾸미기 설정 */
    decorationConfig: SkinDecorationConfig;
    /** 바로가기 아이콘 (현재 모바일만 설정) */
    appIcon: string;
    /** 작업중인 스킨 여부 */
    isWorkSkin: boolean;
    /** 사용중인 스킨 여부 */
    isLiveSkin: boolean;
    /** 스킨 번호 */
    skinCode: string;
    /** 플랫폼 유형 */
    platformType: PlatformType;
    /** 스킨명 */
    skinName: string;
    /** 스킨 수정 일자 */
    updateDateTime: string;
    /** 스킨 배너 그룹 리스트 */
    bannerGroups: SkinBannerGroup[];
}

export interface SkinDecorationConfig {
    /** 스킨 꾸미기 설정 > 배경 색상 코드 (html color code) */
    backgroundColor: string;
    /** 스킨 꾸미기 설정 > 대표 색상 코드 (html color code) */
    mainColor: string;
}

export interface SkinBannerGroup {
    /** 배너 그룹 유형 */
    groupType: BannerGroupType;
    /** 배너 그룹명 */
    groupName: string;
    /** 배너 그룹 코드 */
    groupCode: string;
}

export interface GetSkinBannersByBannerIdResponse {
    /** 스킨 코드 */
    skinCode: string;
    /** 스킨 이름 */
    skinName: string;
    /** 배너 그룹 타입 */
    bannerGroupType: BannerGroupType;
    /** 스킨 번호 */
    skinNo: number;
    /** 배너 목록 */
    banners: SkinBanner[];
    /** 배너 그룹 이름 */
    bannerGroupName: string;
    /** 배너 그룹 코드 */
    bannerGroupCode: string;
}
