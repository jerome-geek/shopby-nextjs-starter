import { SuspenseQuery } from '@suspensive/react-query';
import { type UseSuspenseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import type { OrderDetailResponse } from '@/entities/order/model';

import {
    SHIPPING_ADDRESS_CHANGE_FORM_ID,
    ShippingAddressChangeContent,
} from '@/features/order/overlay/shipping-address-change/content';
import { DefaultModalLayoutProps, ModalLayout } from '@/shared/components/layout';
import { Button } from '@/shared/ui';
import {
    guestOrderDetailOptions,
    orderDetailOptions,
} from '@/entities/order/queries';
import { useAuth } from '@/hooks/useAuth';

interface ShippingAddressChangeModalProps extends DefaultModalLayoutProps {
    orderNo: string;
    memberNo: number;
}

export const ShippingAddressChangeModal = ({
    isOpen,
    close,
    memberNo,
    unmount,
    orderNo,
}: ShippingAddressChangeModalProps) => {
    const { t } = useTranslation();

    const isLogin = useAuth();

    const orderQueryOptions = (
        isLogin
            ? orderDetailOptions({ orderNo, memberNo })
            : guestOrderDetailOptions({
                  orderNo,
                  searchParams: { orderRequestType: 'ALL' },
              })
    ) as UseSuspenseQueryOptions<
        OrderDetailResponse,
        AxiosError<ShopByErrorResponse>,
        OrderDetailResponse,
        readonly unknown[]
    >;

    return (
        <ModalLayout
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            title={t('배송지 정보 변경')}
            size='medium'
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
            <SuspenseQuery {...orderQueryOptions}>
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
        </ModalLayout>
    );
};
