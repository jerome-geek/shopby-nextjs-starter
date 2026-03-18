import { some } from '@fxts/core';
import { useEffect } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

import { PATHS } from '@/const/paths';
import { isMatchPathListIncludeProductDetail } from '@/const/route';
import { GetCategoryResponse } from '@/models/display/category';
import { CartList, OrderDetailResponse } from '@/models/order';
import { GetOrderSheetResponse } from '@/models/order/orderSheet';
import {
    ProductDetailResponse,
    ProductsSearchResponse,
} from '@/models/product';

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
    const location = useLocation();

    useEffect(() => {
        const isProductDetailPage = isMatchPathListIncludeProductDetail([]);

        if (isProductDetailPage && product) {
            window.ShopbyExternalScript.setGlobalObjectSb({
                product,
            });
            return;
        }

        const isSearchPage = matchPath(PATHS.SEARCH, location.pathname);
        if (isSearchPage && searchedProduct) {
            window.ShopbyExternalScript.setGlobalObjectSb({
                searchedProduct,
            });

            return;
        }
        const isProductListPage = matchPath(
            PATHS.PRODUCTS.LIST,
            location.pathname,
        );
        if (isProductListPage && searchedProduct && currentCategory) {
            window.ShopbyExternalScript.setGlobalObjectSb({
                searchedProduct,
                currentCategory,
            });
            return;
        }

        const isCartPage = matchPath(PATHS.ORDER.CART, location.pathname);
        if (isCartPage && cart) {
            window.ShopbyExternalScript.setGlobalObjectSb({
                cart,
            });
            return;
        }

        const isOrderPage = some(
            (a) => matchPath(a, location.pathname),
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

        const isOrderCompletePage = matchPath(
            PATHS.ORDER.COMPLETE,
            location.pathname,
        );
        if (isOrderCompletePage && order) {
            window.ShopbyExternalScript.setGlobalObjectSb({
                order,
            });
            return;
        }

        const isSignupCompletePage = matchPath(
            PATHS.SIGNUP.COMPLETE,
            location.pathname,
        );
        if (isSignupCompletePage) {
            return;
        }
    }, [
        location.pathname,
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
