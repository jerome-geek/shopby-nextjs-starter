import ShareContent from '@/components/layer-contents/share';
import type { DefaultModalLayoutProps } from '@/components/layout';
import { ModalLayout } from '@/components/layout';

type ShareModalProps = DefaultModalLayoutProps;

const ShareModal = ({ ...props }: ShareModalProps) => {
    return (
        <ModalLayout {...props} title='공유하기' width='384px'>
            <ShareContent />
        </ModalLayout>
    );
};

export default ShareModal;
