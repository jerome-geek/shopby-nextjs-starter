import { filter, pipe, sortBy } from '@fxts/core';
import dayjs from 'dayjs';

import type { Banner, BannerAccount } from '@/models/display/banner';

/**
 * 배너가 현재 전시 기간 내에 있는지 확인
 */
const isBannerVisible = (
    displayPeriodType: string,
    displayStartYmdt: Date,
    displayEndYmdt: Date,
): boolean => {
    return displayPeriodType === 'PERIOD'
        ? dayjs().isAfter(displayStartYmdt) && dayjs().isBefore(displayEndYmdt)
        : true;
};

/**
 * 배너 목록을 필터링하고 정렬
 * - 전시 기간 내 배너만 필터링
 * - displayOrder로 정렬
 */
const sortBanners = (banners: Banner[]): Banner[] =>
    pipe(
        banners,
        filter((banner) =>
            isBannerVisible(
                banner.displayPeriodType,
                banner.displayStartYmdt,
                banner.displayEndYmdt,
            ),
        ),
        sortBy((banner) => banner.displayOrder),
    );

/**
 * Account 목록을 displayOrder로 정렬
 */
const sortAccounts = (accounts: BannerAccount[]): BannerAccount[] =>
    pipe(
        accounts,
        sortBy((account) => account.displayOrder),
    );

/**
 * Account의 배너 목록을 필터링하고 정렬
 * - displayType이 'SEQUENTIAL'인 경우 displayOrder로 정렬
 * - displayType이 'RANDOM'인 경우 정렬하지 않음 (랜덤)
 */
const getBannerContentList = (account: BannerAccount | null): Banner[] => {
    if (!account) {
        return [];
    }

    const filteredBanners = pipe(
        account.banners,
        filter((banner) =>
            isBannerVisible(
                banner.displayPeriodType,
                banner.displayStartYmdt,
                banner.displayEndYmdt,
            ),
        ),
    );

    if (account.displayType === 'SEQUENTIAL') {
        return pipe(
            filteredBanners,
            sortBy((banner) => banner.displayOrder),
        );
    }

    return Array.from(filteredBanners);
};

export { getBannerContentList, isBannerVisible, sortAccounts, sortBanners };
