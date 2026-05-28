import ShareContent from '@/components/layer-contents/share';
import type { DefaultModalLayoutProps } from '@/shared/components/layout';
import { ModalLayout } from '@/shared/components/layout';

type ShareModalProps = DefaultModalLayoutProps;

const ShareModal = ({ ...props }: ShareModalProps) => {
    return (
        <ModalLayout {...props} title='공유하기' width='384px'>
            <ShareContent />
        </ModalLayout>
    );
};

export default ShareModal;
