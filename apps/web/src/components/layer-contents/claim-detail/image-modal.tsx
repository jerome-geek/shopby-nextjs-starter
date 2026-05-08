import { ModalLayout, type DefaultModalLayoutProps } from '@/components/layout';

interface ImageModalProps extends DefaultModalLayoutProps {
    imageUrl: string;
}

export const ImageModal = ({ imageUrl, ...props }: ImageModalProps) => {
    return (
        <ModalLayout {...props} size="auto">
            <img 
                src={imageUrl} 
                alt="상세 이미지" 
                style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }}
            />
        </ModalLayout>
    );
};
