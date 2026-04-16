import { useTranslation } from 'react-i18next';

import { ProductSelect } from '@/components/layer-contents/product-select';
import {
    BottomSheetLayout,
    type DefaultBottomSheetProps,
} from '@/components/layout';
import { Button } from '@/components/ui/button';
import type { SearchProductItem } from '@/models/product/product';

interface ProductSelectBottomSheetProps extends DefaultBottomSheetProps {
    setProductInfo: (productInfo: SearchProductItem) => void;
}

export const ProductSelectBottomSheet = ({
    setProductInfo,
    ...props
}: ProductSelectBottomSheetProps) => {
    const { t } = useTranslation();

    return (
        <BottomSheetLayout
            {...props}
            title={t('상품 선택')}
            type='fullscreen'
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
        </BottomSheetLayout>
    );
};
