import { GetServerSideProps } from 'next';

import LoadingWrapper from '@/components/common/loading-wrapper';
import { CSRLayout } from '@/components/layout';
import { PATHS } from '@/const/paths';
import { OrderSheetContent } from '@/features/order/components/order-sheet-content';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';

const GiftOrderSheetPage = ({ orderSheetNo }: { orderSheetNo: string }) => {
    return (
        <ShopbyAsyncBoundary
            fallback={
                <LoadingWrapper
                    isLoading
                    containerStyle={{
                        height: '80vh',
                    }}
                >
                    <span />
                </LoadingWrapper>
            }
        >
            <CSRLayout>
                <OrderSheetContent orderSheetNo={orderSheetNo} isGift />
            </CSRLayout>
        </ShopbyAsyncBoundary>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const orderSheetNo = params?.orderSheetNo as string;

    if (!orderSheetNo) {
        return {
            redirect: {
                destination: PATHS.MAIN,
                permanent: false,
            },
        };
    }

    return {
        props: {
            orderSheetNo,
        },
    };
};

export default GiftOrderSheetPage;
