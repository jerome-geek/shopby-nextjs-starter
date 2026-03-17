import type {
    Banner,
    BannerAccount,
    GetBannersResponse,
} from '@/models/display/banner';
import { pipe, sort, toArray } from '@fxts/core';

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
