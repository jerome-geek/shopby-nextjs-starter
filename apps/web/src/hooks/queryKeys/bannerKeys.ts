import type { GetBannerExtraInfosParams } from '@/models/display/banner';

const bannerKeys = {
    all: ['banners'] as const,

    /** 배너 목록 조회 */
    lists: () => [...bannerKeys.all, 'list'] as const,
    list: (bannerSectionCodes: string[]) => [
        ...bannerKeys.lists(),
        bannerSectionCodes,
    ],

    /** 배너 추가 */
    extraInfos: (params: GetBannerExtraInfosParams) =>
        [...bannerKeys.all, 'extraInfos', params] as const,
};

export default bannerKeys;
