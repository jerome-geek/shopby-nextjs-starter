import { flatMap, fromEntries, map, pipe, when } from '@fxts/core';

import { orderConfiguration } from '@/api/order';
import MyPageSidebar from '@/components/mypage/sidebar';
import MyPageTitle from '@/components/mypage/title';
import { PATHS } from '@/const/paths';
import { getTranslation } from '@/i18n/server';
import { css } from '@/styled-system/css';

export default async function MyPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { t } = await getTranslation();

    const [orderConfigurationResult] = await Promise.allSettled([
        orderConfiguration.getOrderConfigs().json(),
    ]);

    const orderConfigurationData =
        orderConfigurationResult.status === 'fulfilled'
            ? orderConfigurationResult.value
            : { includesPreviousOrder: false };

    const menuList = [
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
                    {
                        title: t('구매후기'),
                        url: PATHS.MYPAGE.REVIEWS.MAIN,
                    },
                ],
                when(
                    () => !!orderConfigurationData.includesPreviousOrder,
                    (a) => {
                        return [
                            ...a,
                            {
                                title: t('이전주문 내역'),
                                url: PATHS.MYPAGE.PREVIOUS_ORDERS.MAIN,
                            },
                        ];
                    },
                ),
            ),
        },
        {
            title: t('혜택정보'),
            children: [
                { title: t('적립금'), url: PATHS.MYPAGE.ACCUMULATIONS },
                {
                    title: t('쿠폰'),
                    url: PATHS.MYPAGE.COUPONS,
                },
            ],
        },
        {
            title: t('쇼핑활동'),
            children: [
                { title: t('나의 관심'), url: PATHS.MYPAGE.WISH },
                { title: t('최근 본 상품'), url: PATHS.MYPAGE.RECENT_PRODUCTS },
            ],
        },
        {
            title: t('계정설정'),
            children: [
                {
                    title: t('회원정보 변경'),
                    url: PATHS.MYPAGE.EDIT,
                },
                {
                    title: t('배송 주소록'),
                    url: PATHS.MYPAGE.ADDRESSES.MAIN,
                },
            ],
        },
        {
            title: t('고객센터'),
            children: [
                { title: t('1:1 문의'), url: PATHS.MYPAGE.INQUIRIES.MAIN },
                {
                    title: t('상품 문의 내역'),
                    url: PATHS.MYPAGE.PRODUCT_INQUIRIES.MAIN,
                },
                { title: t('공지사항'), url: PATHS.SUPPORT.NOTICE.LIST },
                { title: t('자주 묻는 질문'), url: PATHS.SUPPORT.FAQ },
            ],
        },
    ];

    const titleMap = pipe(
        menuList,
        flatMap((a) => a.children),
        map((a) => [a.url, a.title] as const),
        fromEntries,
    );

    return (
        <div
            className={css({
                margin: '0 auto',
                padding: { base: '40px 0', md: '100px 0' },
                display: 'flex',
                gap: { base: '0', lg: '60px' },
                alignItems: 'flex-start',
                maxWidth:
                    'min(1200px + clamp(20px, 8vw, 120px), -46px + 100vw)',
            })}
        >
            <MyPageSidebar menuList={menuList} />

            <section className={css({ flex: 1, minWidth: 0 })}>
                <MyPageTitle titleMap={titleMap} />
                {children}
            </section>
        </div>
    );
}
