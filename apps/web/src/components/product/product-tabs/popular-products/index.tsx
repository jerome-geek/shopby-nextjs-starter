import { isEmpty } from '@fxts/core';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ProductCard } from '@/components/product';
import * as styles from '@/components/product/product-tabs/popular-products/index.css';
import { CATEGORY_CODE } from '@/const/category';
import { useCategoryAll } from '@/hooks/query/display/category';
import { useProductList } from '@/hooks/query/product/product';
import { BREAKPOINTS } from '@/styles/media';

const PopularProducts = () => {
    const { data: categoryAllData } = useCategoryAll();

    const mainCategoryNo =
        categoryAllData?.multiLevelCategories?.find(
            (category) => category.managementCode === CATEGORY_CODE.MAIN,
        )?.categoryNo ?? 0;

    const { data: productListData } = useProductList({
        searchParams: {
            pageSize: 8,
            pageNumber: 1,
            order: {
                by: 'POPULAR',
                direction: 'DESC',
            },
            // categoryNos: [mainCategoryNo],
            filter: {
                soldout: false,
                saleStatus: 'RESERVATION_AND_ONSALE',
            },
        },
        // options: {
        //     enabled: !!mainCategoryNo,
        // },
    });

    if (isEmpty(productListData?.items ?? [])) {
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
                {productListData?.items?.map((item) => (
                    <SwiperSlide key={item.productNo}>
                        <ProductCard {...item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PopularProducts;
