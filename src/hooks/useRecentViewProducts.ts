import { includes } from '@fxts/core';
import { useEffect, useRef } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { useProductProfileMutation } from '@/hooks/mutations';
import { checkLogin } from '@/utils/users';

const useRecentViewProduct = (productNo?: number) => {
    const [mallProductNos, setMallProductNos] = useLocalStorage<number[]>(
        'GUEST_RECENT_VIEW_PRODUCT',
        []
    );

    const {
        recentView: { mutate: recentViewMutate },
    } = useProductProfileMutation();

    const isInitialRef = useRef<boolean>(false);

    useEffect(() => {
        if (!productNo) {
            return;
        }

        if (isInitialRef.current) {
            return;
        }

        isInitialRef.current = true;

        if (checkLogin()) {
            recentViewMutate({
                data: {
                    productNo,
                },
            });
        } else {
            if (!includes(productNo, mallProductNos)) {
                setMallProductNos((prev) => [...prev, productNo]);
            }
        }
    }, []);

    return { mallProductNos };
};

export default useRecentViewProduct;
