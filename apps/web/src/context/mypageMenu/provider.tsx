import { pipe, when } from '@fxts/core';
import { useMemo, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { MypageMenuContext } from '@/context/mypageMenu';
import { PATHS } from '@/const/paths';
import { useOrderConfiguration } from '@/hooks/query/order/orderConfiguration';
import type { MypageMenuList } from '@/components/mypage/side-navigation';

const MypageMenuProvider = ({ children }: { children: ReactNode }) => {
    const { t } = useTranslation();
    const { data: orderConfigurationData } = useOrderConfiguration();

    const menuList = useMemo<MypageMenuList>(
        () => [
            {
                title: t('쇼핑정보'),
                children: pipe(
                    [
                        {
                            title: t('주문/배송 내역'),
                            url: PATHS.MYPAGE.ORDERS.MAIN,
                        },
                        {
                            title: t('취소/교환/반품 내역'),
                            url: PATHS.MYPAGE.CLAIMS.MAIN,
                        },
                    ],
                    when(
                        () => !!orderConfigurationData?.includesPreviousOrder,
                        (a) => [
                            ...a,
                            {
                                title: t('이전주문 내역'),
                                url: PATHS.MYPAGE.PREVIOUS_ORDERS.MAIN,
                            },
                        ],
                    ),
                ),
            },
            {
                title: t('혜택정보'),
                children: [
                    { title: t('쿠폰'), url: PATHS.MYPAGE.COUPONS },
                    {
                        title: t('적립금'),
                        url: PATHS.MYPAGE.ACCUMULATIONS,
                    },
                ],
            },
            {
                title: t('쇼핑활동'),
                children: [
                    { title: t('찜한 상품'), url: PATHS.MYPAGE.WISH },
                    {
                        title: t('최근 본 상품'),
                        url: PATHS.MYPAGE.RECENT_PRODUCTS,
                    },
                    {
                        title: t('나의 상품리뷰'),
                        url: PATHS.MYPAGE.REVIEWS.MAIN,
                    },
                    {
                        title: t('나의 레시피'),
                        url: PATHS.MYPAGE.RECIPES,
                    },
                ],
            },
            {
                title: t('회원정보'),
                children: [
                    {
                        title: t('회원정보 변경'),
                        url: PATHS.MYPAGE.EDIT,
                    },
                    {
                        title: t('배송지 관리'),
                        url: PATHS.MYPAGE.ADDRESSES.MAIN,
                    },
                ],
            },
            {
                title: t('고객센터'),
                children: [
                    {
                        title: t('1:1 문의'),
                        url: PATHS.MYPAGE.INQUIRIES.MAIN,
                    },
                    {
                        title: t('상품 문의 내역'),
                        url: PATHS.MYPAGE.PRODUCT_INQUIRIES.MAIN,
                    },
                ],
            },
        ],
        [t, orderConfigurationData?.includesPreviousOrder],
    );

    return (
        <MypageMenuContext.Provider value={menuList}>
            {children}
        </MypageMenuContext.Provider>
    );
};

export default MypageMenuProvider;
