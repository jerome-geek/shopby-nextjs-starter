import { SuspenseQuery } from '@suspensive/react-query';
import { useTranslation } from 'react-i18next';

import {
    SHIPPING_ADDRESS_CHANGE_FORM_ID,
    ShippingAddressChangeContent,
} from '@/components/layer-contents/shipping-address-change';
import {
    BottomSheetLayout,
    DefaultModalLayoutProps,
} from '@/components/layout';
import { Button } from '@/components/ui';
import { orderDetailOptions } from '@/entities/order/queries';

interface ShippingAddressChangeBottomSheetProps extends DefaultModalLayoutProps {
    orderNo: string;
    memberNo: number;
}

export const ShippingAddressChangeBottomSheet = ({
    isOpen,
    close,
    unmount,
    orderNo,
    memberNo,
}: ShippingAddressChangeBottomSheetProps) => {
    const { t } = useTranslation();

    return (
        <BottomSheetLayout
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            title={t('배송지 정보 변경')}
            type='fullscreen'
            footerButtonList={[
                <Button
                    key='cancel'
                    frame='outlined'
                    variant='secondary'
                    onClick={close}
                >
                    {t('취소')}
                </Button>,
                <Button
                    key='submit'
                    type='submit'
                    form={SHIPPING_ADDRESS_CHANGE_FORM_ID}
                    frame='solid'
                    variant='primary'
                >
                    {t('변경')}
                </Button>,
            ]}
        >
            <SuspenseQuery
                {...orderDetailOptions({
                    orderNo,
                    memberNo,
                })}
            >
                {({ data }) => (
                    <ShippingAddressChangeContent
                        orderNo={orderNo}
                        data={{
                            ...data.shippingAddress,
                            deliveryMemo: data.deliveryMemo,
                        }}
                    />
                )}
            </SuspenseQuery>
        </BottomSheetLayout>
    );
};
