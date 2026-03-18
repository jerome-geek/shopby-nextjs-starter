import { some } from '@fxts/core';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { PATHS } from '@/const/paths';
import { isMatchPathListIncludeProductDetail } from '@/const/route';
import { GetCategoryResponse } from '@/models/display/category';
import { CartList, OrderDetailResponse } from '@/models/order';
import { GetOrderSheetResponse } from '@/models/order/orderSheet';
import {
    ProductDetailResponse,
    ProductsSearchResponse,
} from '@/models/product/product';
import { matchPath } from '@/utils/shopby';

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
    const router = useRouter();
    const pathname = router.asPath.split('?')[0];

    useEffect(() => {
        const isProductDetailPage = !!router.query.productNo;

        if (isProductDetailPage && product) {
            window.ShopbyExternalScript.setGlobalObjectSb({
                product,
            });
            return;
        }

        const isSearchPage = matchPath(PATHS.SEARCH, pathname);
        if (isSearchPage && searchedProduct) {
            window.ShopbyExternalScript.setGlobalObjectSb({
                searchedProduct,
            });

            return;
        }
        const isProductListPage = matchPath(PATHS.PRODUCTS.LIST, pathname);
        if (isProductListPage && searchedProduct && currentCategory) {
            window.ShopbyExternalScript.setGlobalObjectSb({
                searchedProduct,
                currentCategory,
            });
            return;
        }

        const isCartPage = matchPath(PATHS.ORDER.CART, pathname);
        if (isCartPage && cart) {
            window.ShopbyExternalScript.setGlobalObjectSb({
                cart,
            });
            return;
        }

        const isOrderPage = some(
            (a) => matchPath(a, pathname),
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

        const isOrderCompletePage = matchPath(PATHS.ORDER.COMPLETE, pathname);
        if (isOrderCompletePage && order) {
            window.ShopbyExternalScript.setGlobalObjectSb({
                order,
            });
            return;
        }

        const isSignupCompletePage = matchPath(PATHS.SIGNUP.COMPLETE, pathname);
        if (isSignupCompletePage) {
            return;
        }
    }, [
        pathname,
        product,
        currentCategory,
        searchedProduct,
        cart,
        orderSheet,
        order,
        keyword,
        router.query,
    ]);
};

export default useSb;
