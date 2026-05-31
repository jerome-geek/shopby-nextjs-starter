import { indexBy, isEmpty, map, pipe, prop, toArray } from '@fxts/core';
import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ProductCard } from '@/features/product/components';
import * as styles from '@/features/product/components/product-tabs/popular-products/index.css';
import { useAdditionalDiscountByProductNos } from '@/hooks/query/product/additionalDiscount';
import { useProductList } from '@/hooks/query/product/product';
import { useMainCategory } from '@/hooks/useMainCategory';
import { BREAKPOINTS } from '@/styles/media';

export const PopularProducts = () => {
    const { mainCategoryNo } = useMainCategory();

    const { data: productListData } = useProductList({
        searchParams: {
            pageSize: 8,
            pageNumber: 1,
            order: {
                by: 'POPULAR',
                direction: 'DESC',
            },
            categoryNos: [mainCategoryNo ?? 0],
            filter: {
                soldout: false,
                saleStatus: 'RESERVATION_AND_ONSALE',
            },
        },
        options: {
            enabled: !!mainCategoryNo,
        },
    });

    const productNos = useMemo(() => {
        if (!productListData) {
            return [];
        }

        return pipe(
            productListData,
            prop('items'),
            map((a) => a.productNo),
            toArray,
        );
    }, [productListData]);

    const { data: additionalDiscountsData } = useAdditionalDiscountByProductNos(
        {
            searchParams: {
                productNos,
            },
            options: {
                enabled: productNos.length > 0,
            },
        },
    );

    const productsWithDiscounts = useMemo(() => {
        if (!productListData) {
            return [];
        }

        const discountMap = pipe(
            additionalDiscountsData?.data ?? [],
            indexBy(prop('productNo')),
        );

        return pipe(
            productListData,
            prop('items'),
            map((product) => ({
                ...product,
                additionalDiscount: discountMap[product.productNo] ?? null,
            })),
            toArray,
        );
    }, [productListData, additionalDiscountsData]);

    if (isEmpty(productsWithDiscounts)) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>오늘의 인기 상품</h4>

            <Swiper
                slidesPerView={3}
                spaceBetween={4}
                breakpoints={{
                    [BREAKPOINTS.SM]: {
                        slidesPerView: 4,
                        spaceBetween: 15,
                    },
                }}
            >
                {productsWithDiscounts.map((item) => {
                    return (
                        <SwiperSlide key={`popular-product-${item.productNo}`}>
                            <ProductCard {...item} isTimeSaleEnabled={false} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};
