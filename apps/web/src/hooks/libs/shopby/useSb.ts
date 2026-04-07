import { some } from '@fxts/core';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { PATHS } from '@/const/paths';
import { useMall } from '@/hooks/query/admin/mall';
import { GetCategoryResponse } from '@/models/display/category';
import { CartList, OrderDetailResponse } from '@/models/order';
import { GetOrderSheetResponse } from '@/models/order/orderSheet';
import {
    ProductDetailResponse,
    ProductsSearchResponse,
} from '@/models/product/product';

interface UseSbProps {
    product?: ProductDetailResponse;
    searchedProduct?: ProductsSearchResponse;
    cart?: CartList;
    orderSheet?: GetOrderSheetResponse;
    order?: OrderDetailResponse;
    currentCategory?: GetCategoryResponse;
    keyword?: string;
}

const useSb = ({
    product,
    searchedProduct,
    cart,
    orderSheet,
    order,
    currentCategory,
    keyword,
}: UseSbProps = {}) => {
    const { data: mallData } = useMall();
    const isExternalScriptUsable = !!mallData?.externalServiceConfig.useScript;

    const router = useRouter();

    useEffect(() => {
        if (!isExternalScriptUsable) {
            return;
        }

        const isProductDetailPage = router.pathname === PATHS.PRODUCTS.DETAIL;
        if (isProductDetailPage && product) {
            window.ShopbyExternalScript.setGlobalObjectSb({
                product,
            });
            return;
        }

        const isSearchPage = router.pathname === PATHS.SEARCH;
        if (isSearchPage && searchedProduct) {
            window.ShopbyExternalScript.setGlobalObjectSb({
                searchedProduct,
            });
            return;
        }

        const isProductListPage = router.pathname === PATHS.PRODUCTS.LIST;
        if (isProductListPage && searchedProduct && currentCategory) {
            window.ShopbyExternalScript.setGlobalObjectSb({
                searchedProduct,
                currentCategory,
            });
            return;
        }

        const isCartPage = router.pathname === PATHS.CART;
        if (isCartPage && cart) {
            window.ShopbyExternalScript.setGlobalObjectSb({
                cart,
            });
            return;
        }

        const isOrderPage = some(
            (a) => router.pathname === a,
            [
                PATHS.ORDER.SHEET,
                PATHS.MYPAGE.ORDERS.DETAIL,
                PATHS.GUEST.ORDER.DETAIL,
            ],
        );
        if (isOrderPage && orderSheet) {
            window.ShopbyExternalScript.setGlobalObjectSb({
                orderSheet,
            });
            return;
        }

        const isOrderCompletePage = router.pathname === PATHS.ORDER.COMPLETE;
        if (isOrderCompletePage && order) {
            window.ShopbyExternalScript.setGlobalObjectSb({
                order,
            });
            return;
        }

        const isSignupCompletePage = router.pathname === PATHS.SIGNUP.COMPLETE;
        if (isSignupCompletePage) {
            return;
        }
    }, [
        isExternalScriptUsable,
        router.pathname,
        product,
        currentCategory,
        searchedProduct,
        cart,
        orderSheet,
        order,
        keyword,
    ]);
};

export default useSb;
