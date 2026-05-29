import { useRouter } from 'next/router';
import React from 'react';

import Seo from '@/shared/components/common/seo';
import { MypageLayout } from '@/shared/components/layout';
import { PATHS } from '@/const/paths';
import { OrderDetailView } from '@/features/order/components/order-detail-view';
import useOrderDetail from '@/hooks/suspenseQuery/order/myOrder/useOrderDetail';
import useOrderConfiguration from '@/hooks/suspenseQuery/order/orderConfiguration/useOrderConfiguration';
import type { NextPageWithLayout } from '@/pages/_app';

const MypageOrderDetailPageContent = ({ orderNo }: { orderNo: string }) => {
    const { data: orderConfigurationData } = useOrderConfiguration();
    const { data: orderDetailData } = useOrderDetail({ orderNo });

    return (
        <>
            <Seo title='주문 상세' noindex={true} />
            <OrderDetailView
                orderDetailData={orderDetailData}
                orderConfigurationData={orderConfigurationData}
                backPath={PATHS.MYPAGE.ORDERS.MAIN}
            />
        </>
    );
};

const MypageOrderDetailPage: NextPageWithLayout = () => {
    const router = useRouter();
    const orderNo = String(router.query.orderNo ?? '');

    return (
        <>
            <Seo title='주문 상세' noindex={true} />
            {router.isReady && orderNo ? (
                <MypageOrderDetailPageContent orderNo={orderNo} />
            ) : null}
        </>
    );
};

MypageOrderDetailPage.getLayout = (page: React.ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};

export default MypageOrderDetailPage;
