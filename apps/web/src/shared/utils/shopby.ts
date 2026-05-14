import { find, keys, pipe } from '@fxts/core';

import { PATHS } from '@/const/paths';
import type {
    Banner,
    BannerAccount,
    GetBannersResponse,
} from '@/models/display/banner';

/** protocol-relative URL (//)을 https://로 변환 */
export function normalizeImageUrl(url: string | undefined): string | undefined {
    if (!url) return undefined;
    if (url.startsWith('//')) {
        return `https:${url}`;
    }
    return url;
}

/** 배너 > 구좌 > 콘텐츠 3계층에서 콘텐츠(Banner[]) 추출 */
export function extractBannerContents(data: GetBannersResponse): Banner[] {
    if (!data || data.length === 0) {
        return [];
    }

    const bannerSection = data[0];
    if (!bannerSection?.accounts) {
        return [];
    }

    return [...bannerSection.accounts]
        .sort(
            (a: BannerAccount, b: BannerAccount) =>
                a.displayOrder - b.displayOrder,
        )
        .flatMap((account: BannerAccount) =>
            [...account.banners].sort(
                (a: Banner, b: Banner) => a.displayOrder - b.displayOrder,
            ),
        );
}

/** 배너 > 구좌(accountIndex) > 콘텐츠 3계층에서 콘텐츠(Banner[]) 추출 */
export function extractBannerContentsByAccountIndex(
    data: GetBannersResponse,
    accountIndex: number,
): Banner[] {
    if (!data || data.length === 0) {
        return [];
    }

    const bannerSection = data[0];
    if (!bannerSection?.accounts) {
        return [];
    }

    const account = bannerSection.accounts?.[accountIndex];

    if (!account) {
        return [];
    }

    return [account]
        .sort(
            (a: BannerAccount, b: BannerAccount) =>
                a.displayOrder - b.displayOrder,
        )
        .flatMap((account: BannerAccount) =>
            [...account.banners].sort(
                (a: Banner, b: Banner) => a.displayOrder - b.displayOrder,
            ),
        );
}

const PATH_MAP = {
    [PATHS.MAIN]: 'MAIN',
    [PATHS.SHOP.DISCOVERY]: 'MAIN',
    [PATHS.SHOP.KIDS]: 'MAIN',
    [PATHS.SHOP.LIFE]: 'MAIN',
    [PATHS.PRODUCTS.DETAIL]: 'PRODUCT',
    [PATHS.CART]: 'CART',
    [PATHS.SIGNUP.COMPLETE]: 'MEMBER_JOIN_COMPLETE',
    [PATHS.MYPAGE.MAIN]: 'MY_PAGE',
    [PATHS.PRODUCTS.LIST]: 'PRODUCT_LIST',
    [PATHS.SEARCH]: 'PRODUCT_SEARCH',
    [PATHS.ORDER.COMPLETE]: 'ORDER_COMPLETE',
    [PATHS.ORDER.SHEET]: 'ORDER',
    [PATHS.MYPAGE.ORDERS.DETAIL]: 'ORDER_DETAIL',
};

export function matchPath(pattern: string, pathname: string) {
    const patternSegments = pattern.split('/');
    const pathnameSegments = pathname.split('/');
    if (patternSegments.length !== pathnameSegments.length) return false;
    return patternSegments.every((seg, idx) => {
        if (seg.startsWith(':') || (seg.startsWith('[') && seg.endsWith(']')))
            return true;
        return seg === pathnameSegments[idx];
    });
}

/**
 * 외부 스크립트 관련 페이지 타입 추출
 * - 참고: https://nhnent.dooray.com/share/pages/ZFGBGIwoTfaI2aCYB0ih2g/3935512453649843119
 */
export const determinePageScriptType = (pathname: string) => {
    return pipe(
        PATH_MAP,
        keys,
        find((a) =>
            a === pathname ? PATH_MAP[a as keyof typeof PATH_MAP] : null,
        ),
        (b) => (b ? PATH_MAP[b as keyof typeof PATH_MAP] : null),
    );
};

/**
 * 샵바이 CDN 이미지 리사이징 URL 생성
 * - 형식: {url}?{width}x{height}
 *
 * @param url 원본 이미지 URL
 * @param width 가로 크기 (px)
 * @param height 세로 크기 (px, 생략 시 width와 동일하게 설정)
 * @returns 리사이징 파라미터가 포함된 URL
 */
export const getShopbyResizeImageUrl = (
    url: string | undefined,
    width: number,
    height?: number,
): string => {
    const normalizedUrl = normalizeImageUrl(url);

    if (!normalizedUrl) return '';

    const targetHeight = height ?? width;

    // 이미 쿼리 파라미터가 있는 경우 처리 (일반적으로 샵바이 CDN은 ? 형식을 사용)
    const separator = normalizedUrl.includes('?') ? '&' : '?';

    return `${normalizedUrl}${separator}${width}x${targetHeight}`;
};
