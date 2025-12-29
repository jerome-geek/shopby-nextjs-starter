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

/**
 * 배너 목록을 2줄로 나누는 함수
 * - 홀수 개인 경우 위쪽 줄이 1개 더 많도록 처리
 * - 전체 아이콘 개수를 기준으로 반으로 나누기
 *   위 / 아래 줄의 아이콘 개수가 동일하게 유지되도록
 *
 * @param banners - 배너 목록
 * @returns 첫 번째 줄과 두 번째 줄로 나뉜 배너 목록
 */
const splitBannersIntoTwoRows = (
    banners: Banner[],
): { firstRow: Banner[]; secondRow: Banner[] } => {
    if (banners.length === 0) {
        return { firstRow: [], secondRow: [] };
    }

    const midPoint = Math.ceil(banners.length / 2);
    const firstRow = banners.slice(0, midPoint);
    const secondRow = banners.slice(midPoint);

    return {
        firstRow,
        secondRow,
    };
};

/**
 * 배너 링크 속성을 생성하는 함수
 */
const toBannerLinkAttributes = (banner: Banner) => {
    const target = banner.browerTargetType === 'CURRENT' ? '_self' : '_blank';
    return {
        href: banner.landingUrl,
        target,
        rel: target === '_blank' ? 'noopener noreferrer' : undefined,
    };
};

export {
    getBannerContentList,
    isBannerVisible,
    sortAccounts,
    sortBanners,
    splitBannersIntoTwoRows,
    toBannerLinkAttributes,
};
