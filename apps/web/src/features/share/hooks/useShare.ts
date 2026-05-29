import { useCallback } from 'react';

import { useToast } from '@/hooks/ui/useToast';
import { normalizeImageUrl } from '@/shared/utils/shopby';

// TODO: 브랜드 대표 OG 이미지 확정 후 교체
const DEFAULT_SHARE_IMAGE = `${process.env.NEXT_PUBLIC_BASE_URL}/web-app-manifest-512x512.png`;
const DEFAULT_SHARE_DESCRIPTION = '상품 및 레시피 정보를 확인해보세요.';

/** 피드형 공유 콘텐츠 */
export interface KakaoFeedContent {
    template?: 'feed';
    url?: string;
    title?: string;
    description?: string;
    imageUrl?: string;
    social?: {
        likeCount?: number;
        commentCount?: number;
        sharedCount?: number;
        viewCount?: number;
        subscriberCount?: number;
    };
}

/** 커머스형 공유 콘텐츠 */
export interface KakaoCommerceContent {
    template: 'commerce';
    url?: string;
    title?: string;
    description?: string;
    imageUrl?: string;
    /** 정가 */
    regularPrice: number;
    /** 할인율 (없으면 생략) */
    discountRate?: number;
    /** 할인가 (없으면 생략) */
    discountPrice?: number;
}

export type KakaoShareContent = KakaoFeedContent | KakaoCommerceContent;

export interface ShareOptions {
    kakao?: KakaoShareContent;
}

export const useShare = (options?: ShareOptions) => {
    const { addToast } = useToast();

    const shareToKakao = useCallback(() => {
        const kakao = window.Kakao;
        if (!kakao) return;

        if (!kakao.isInitialized()) {
            kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
        }

        const content = options?.kakao;
        const url = content?.url ?? window.location.href;
        const link = { mobileWebUrl: url, webUrl: url };

        if (content?.template === 'commerce') {
            kakao.Share.sendDefault({
                objectType: 'commerce',
                content: {
                    title: content.title ?? document.title,
                    description: content.description ?? DEFAULT_SHARE_DESCRIPTION,
                    imageUrl: normalizeImageUrl(content.imageUrl) ?? DEFAULT_SHARE_IMAGE,
                    link,
                },
                commerce: {
                    regularPrice: content.regularPrice,
                    ...(content.discountRate && {
                        discountRate: content.discountRate,
                    }),
                    ...(content.discountPrice && {
                        discountPrice: content.discountPrice,
                    }),
                    currencyUnit: '원',
                    currencyUnitPosition: 0,
                },
                buttons: [{ title: '상품 보기', link }],
            });
        } else {
            kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: content?.title ?? document.title,
                    description:
                        content?.description ?? DEFAULT_SHARE_DESCRIPTION,
                    imageUrl: normalizeImageUrl(content?.imageUrl) ?? DEFAULT_SHARE_IMAGE,
                    link,
                },
                ...(content?.social && { social: content.social }),
                buttons: [{ title: '자세히 보기', link }],
            });
        }
    }, [options]);

    const shareToFacebook = useCallback((url: string) => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                url,
            )}`,
            '_blank',
            'width=600,height=400',
        );
    }, []);

    const shareToX = useCallback((url: string) => {
        window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
            '_blank',
            'width=600,height=400',
        );
    }, []);

    const copyLink = useCallback(
        (url: string) => {
            navigator.clipboard
                .writeText(url)
                .then(() =>
                    addToast({
                        message: '주소가 복사되었습니다.',
                        variant: 'success',
                    }),
                )
                .catch(() =>
                    addToast({
                        message: '주소 복사에 실패했습니다.',
                        variant: 'error',
                    }),
                );
        },
        [addToast],
    );

    const handleShare = useCallback(
        (type: string) => {
            const currentUrl = window.location.href;

            switch (type) {
                case 'kakao':
                    shareToKakao();
                    break;
                case 'facebook':
                    shareToFacebook(currentUrl);
                    break;
                case 'x':
                    shareToX(currentUrl);
                    break;
                case 'link':
                    copyLink(currentUrl);
                    break;
                default:
                    break;
            }
        },
        [shareToKakao, shareToFacebook, shareToX, copyLink],
    );

    return {
        handleShare,
        shareToKakao,
        shareToFacebook,
        shareToX,
        copyLink,
    };
};
