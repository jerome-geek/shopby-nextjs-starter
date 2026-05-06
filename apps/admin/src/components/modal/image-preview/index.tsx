import { DefaultModalLayoutProps, ModalLayout } from '@/layout/modal';

interface ImagePreviewModalProps extends DefaultModalLayoutProps {
    src: string;
    alt?: string;
}

const ImagePreviewModal = ({ src, alt, ...props }: ImagePreviewModalProps) => {
    return (
        <ModalLayout
            {...props}
            title='이미지 미리보기'
            className='w-[92vw] max-w-[900px]'
        >
            <div className='flex items-center justify-center'>
                <img
                    src={src}
                    alt={alt ?? '첨부 이미지'}
                    className='max-h-[70vh] w-auto max-w-full rounded-2xl object-contain bg-[#f3f4f6] border border-[#e5e7eb]'
                    loading='lazy'
                />
            </div>
        </ModalLayout>
    );
};

export default ImagePreviewModal;

