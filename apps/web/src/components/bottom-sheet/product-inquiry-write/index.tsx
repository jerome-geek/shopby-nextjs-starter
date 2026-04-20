import { useTranslation } from 'react-i18next';

import { ProductInquiryWrite } from '@/components/layer-contents/product-inquiry-write';
import {
    BottomSheetLayout,
    type DefaultBottomSheetProps,
} from '@/components/layout';
import { Button } from '@/components/ui/button';

interface ProductInquiryWriteBottomSheetProps extends DefaultBottomSheetProps {
    productNo: number;
    inquiryNo?: number;
}

export const ProductInquiryWriteBottomSheet = (
    props: ProductInquiryWriteBottomSheetProps,
) => {
    const { t } = useTranslation();
    const { productNo, inquiryNo, ...layoutProps } = props;
    const isModify = (inquiryNo ?? 0) > 0;

    return (
        <BottomSheetLayout
            {...layoutProps}
            title={t('상품 문의')}
            type='fullscreen'
            footerButtonList={[
                <Button
                    key='product-inquiry-write-cancel-button'
                    frame='outlined'
                    variant='secondary'
                    type='button'
                    onClick={layoutProps.close}
                >
                    {t('취소')}
                </Button>,
                <Button
                    key='product-inquiry-write-submit-button'
                    frame='solid'
                    variant='primary'
                    type='submit'
                    form='product-inquiry-write-form'
                    id='product-inquiry-write-submit-button'
                >
                    {t(isModify ? '수정하기' : '등록하기')}
                </Button>,
            ]}
        >
            <ProductInquiryWrite
                {...layoutProps}
                productNo={productNo}
                inquiryNo={inquiryNo}
            />
        </BottomSheetLayout>
    );
};
