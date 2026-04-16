import type { KakaoShareSettings } from '@/types/kakao';

/**
 * @param {string} copiedLink option 복사버튼 클릭시 공유 할 링크
 * @param {string} copySuccessMessage option 복사버튼 클릭 이후 띄울 메세지
 */
export interface CopyLinkParams {
    copiedLink?: string;
    copySuccessMessage?: string;
}

export const kakaoShare = (settings: KakaoShareSettings) => {
    const kakao = window.Kakao;

    if (!kakao.isInitialized()) {
        kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY!);
    }

    kakao.Share.sendDefault(settings);
};

export const facebookShare = (shareUrl: string) => {
    window.open(
        `//www.facebook.com/sharer.php?u=${shareUrl}`,
        '공유하기',
        'width=600,height=600,location=no,status=no,scrollbars=yes',
    );
};

export const twitterShare = (shareUrl: string) => {
    window.open(
        `https://twitter.com/intent/tweet?url=${shareUrl}`,
        '공유하기',
        'width=600,height=600,location=no,status=no,scrollbars=yes',
    );
};

export const copyLink = ({
    copiedLink = window.location.href,
    copySuccessMessage = '주소가 복사됐습니다.',
}: CopyLinkParams) =>
    navigator.clipboard
        .writeText(copiedLink)
        .then(() => alert(copySuccessMessage))
        .catch(() => alert('주소 복사에 실패했습니다.'));
