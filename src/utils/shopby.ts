import type {
    Banner,
    BannerAccount,
    GetBannersResponse,
} from '@/models/display/banner';
import { find, keys, pipe, sort, toArray } from '@fxts/core';

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

    // pipe(
    //     bannerSection.accounts,
    //     sort(a => a.displayOrder),
    //     toArray
    // )

    // 원본 데이터 불변성 유지를 위해 복사 후 정렬 ([...array].sort())
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

const PATH_MAP = {
    '/': 'MAIN',
    '/products/:productNo': 'PRODUCT',
    '/order/cart': 'CART',
    '/signup/complete': 'MEMBER_JOIN_COMPLETE',
    '/mypage': 'MY_PAGE',
    '/categories/:categoryNo/products': 'PRODUCT_LIST',
    '/search': 'PRODUCT_SEARCH',
    '/order/complete': 'ORDER_COMPLETE',
    '/order/:orderSheetNo': 'ORDER',
    '/mypage/orders/:orderNo': 'ORDER_DETAIL',
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
        find((a) => (matchPath(a, pathname) ? PATH_MAP[a as keyof typeof PATH_MAP] : null)),
        (b) => (b ? PATH_MAP[b as keyof typeof PATH_MAP] : null),
    );
};
