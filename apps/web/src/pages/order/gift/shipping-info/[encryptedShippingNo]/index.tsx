import { useRouter } from 'next/router';

import LoadingWrapper from '@/shared/components/common/loading-wrapper';
import { GiftShippingAddressContent } from '@/features/order/components/gift-shipping-address-content';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';

const GiftShippingAddressPage = () => {
    const router = useRouter();
    const encryptedShippingNo = router.query?.encryptedShippingNo as string;

    if (!router.isReady) {
        return null;
    }

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
            <GiftShippingAddressContent
                encryptedShippingNo={encryptedShippingNo}
            />
        </ShopbyAsyncBoundary>
    );
};

export default GiftShippingAddressPage;
