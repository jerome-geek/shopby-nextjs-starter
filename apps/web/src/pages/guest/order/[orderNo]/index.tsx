import { useRouter } from 'next/router';

import { GuestLayout } from '@/shared/components/layout';
import Seo from '@/shared/components/common/seo';
import { PATHS } from '@/const/paths';
import { OrderDetailView } from '@/features/order/components/order-detail-view';
import useGuestOrderDetail from '@/hooks/suspenseQuery/order/guestOrder/useGuestOrderDetail';
import useOrderConfiguration from '@/hooks/suspenseQuery/order/orderConfiguration/useOrderConfiguration';
import { NextPageWithLayout } from '@/pages/_app';

const GuestOrderPageContent = ({ orderNo }: { orderNo: string }) => {
    const { data: orderConfigurationData } = useOrderConfiguration();
    const { data: orderDetailData } = useGuestOrderDetail({
        orderNo,
    });

    return (
        <>
            <Seo title='비회원 주문조회' noindex />
            <OrderDetailView
                orderDetailData={orderDetailData}
                orderConfigurationData={orderConfigurationData}
                backPath={PATHS.GUEST.LOGIN}
            />
        </>
    );
};

const GuestOrderPage: NextPageWithLayout = () => {
    const router = useRouter();
    const orderNo = String(router.query.orderNo ?? '');

    return (
        <>
            <Seo title='비회원 주문조회' noindex />
            {router.isReady && orderNo ? (
                <GuestOrderPageContent orderNo={orderNo} />
            ) : null}
        </>
    );
};

GuestOrderPage.getLayout = (page) => (
    <GuestLayout title='비회원 주문조회'>{page}</GuestLayout>
);

export default GuestOrderPage;
