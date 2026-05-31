import { useTranslation } from 'react-i18next';

import { ProductSelect } from '@/features/mypage/overlay/product-select/content';
import { ModalLayout, type DefaultModalLayoutProps } from '@/shared/components/layout';
import { Button } from '@/shared/ui/button';
import type { SearchProductItem } from '@/entities/product/model/product';

interface ProductSelectModalProps extends DefaultModalLayoutProps {
    setProductInfo: (productInfo: SearchProductItem) => void;
}

export const ProductSelectModal = ({
    setProductInfo,
    ...props
}: ProductSelectModalProps) => {
    const { t } = useTranslation();

    return (
        <ModalLayout
            {...props}
            title={t('상품 선택')}
            size='medium'
            footerButtonList={[
                <Button
                    key='product-select-submit-button'
                    frame='solid'
                    variant='primary'
                    type='submit'
                    form='product-select-form'
                    id='product-select-submit-button'
                ></Button>,
            ]}
        >
            <ProductSelect {...props} setProductInfo={setProductInfo} />
        </ModalLayout>
    );
};
