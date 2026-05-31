import ShareContent from '@/features/share/overlay/share/content';
import type { KakaoShareContent } from '@/features/share';
import type { DefaultModalLayoutProps } from '@/shared/components/layout';
import { ModalLayout } from '@/shared/components/layout';

interface ShareModalProps extends DefaultModalLayoutProps {
    kakao?: KakaoShareContent;
}

const ShareModal = ({ kakao, ...props }: ShareModalProps) => {
    return (
        <ModalLayout {...props} title='공유하기' width='384px'>
            <ShareContent kakao={kakao} />
        </ModalLayout>
    );
};

export default ShareModal;
