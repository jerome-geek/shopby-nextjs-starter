import { useCallback } from 'react';

import { useToast } from '@/hooks/ui/useToast';

/**
 * 공유하기 비즈니스 로직을 담당하는 커스텀 훅
 * - Kakao, Facebook, X(Twitter) 등 SNS 공유
 * - 링크 복사 (Clipboard API)
 */
export const useShare = () => {
    const { addToast } = useToast();

    // TODO: 페이지별로 처리 필요 (상품 상세, 컬렉션 상세, 레시피 상세 페이지)
    const shareToKakao = useCallback(() => {
        const kakao = window.Kakao;
        if (!kakao) return;

        if (!kakao.isInitialized()) {
            kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
        }

        kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: document.title,
                description: '상품 및 레시피 정보를 확인해보세요.',
                imageUrl:
                    'https://shopby-skin.cdn-nhncommerce.com/shopby-external-script.js', // 기본 이미지 또는 현재 페이지 대표 이미지
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                },
            },
            buttons: [
                {
                    title: '자세히 보기',
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href,
                    },
                },
            ],
        });
    }, []);

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
            console.log('Sharing via:', type);

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
