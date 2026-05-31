import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { memo, useMemo } from 'react';
import { Grid } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import LoadingWrapper from '@/shared/components/common/loading-wrapper';
import { CountdownTimer, ProductCard } from '@/features/product/components';
import * as styles from '@/features/section/components/time-sale/index.css';
import { PATHS } from '@/const/paths';
import { SORTING_TYPE_BY_STATUS } from '@/const/timeSale';
import { useProductsWithAdditionalDiscounts } from '@/entities/product/hooks/useProductsWithAdditionalDiscounts';
import { useProductSectionById } from '@/hooks/query/display/productSection';
import { useTimeSaleSectionProducts } from '@/hooks/query/shop/timeSale';
import type { ImageUrlType } from '@/entities/product/model';
import { TIME_SALE_LIST_BASE_PARAMS } from '@/pages/time-sale';
import { BREAKPOINTS } from '@/styles/media';
import { vars } from '@/styles/theme.css';

interface TimeSaleSectionProps {
    sectionId: string;
    title?: string;
    subtitle?: string;
    type?: 'KIDS' | 'LIFE';
}

export const TimeSaleSection = memo(
    ({
        sectionId,
        title = '오늘만 특가',
        subtitle = '매일 오전 10시 새 업데이트',
        type = 'KIDS',
    }: TimeSaleSectionProps) => {
        const buttonLabel =
            type === 'KIDS' ? '키즈 타임특가 더보기' : '라이프 타임특가 더보기';

        const hrefLink = `${PATHS.TIME_SALE.MAIN}?tab=${
            type === 'KIDS' ? 'kids' : 'life'
        }`;

        const {
            data: productSectionByIdData,
            isLoading: isProductSectionByIdLoading,
        } = useProductSectionById({
            sectionId,
        });

        const sectionNo = productSectionByIdData?.sectionNo ?? 0;

        const {
            data: todayOpenData,
            isLoading: isTimeSaleSectionProductsLoading,
        } = useTimeSaleSectionProducts({
            sectionNo,
            searchParams: {
                ...TIME_SALE_LIST_BASE_PARAMS,
                sortingType: SORTING_TYPE_BY_STATUS['today-open'],
            },
            options: { enabled: sectionNo > 0 },
        });

        const isLoading =
            isProductSectionByIdLoading || isTimeSaleSectionProductsLoading;

        const products = todayOpenData?.products ?? [];

        const { productsWithDiscounts } =
            useProductsWithAdditionalDiscounts(products);

        const filteredProducts = useMemo(() => {
            return productsWithDiscounts.map((product) => ({
                ...product,
                imageUrlInfo: product.imageUrlInfo?.map((img) => ({
                    url: img.url,
                    type: 'IMAGE_URL',
                })),
                stickerInfos:
                    product.stickerInfos?.map((sticker) => ({
                        type: sticker.type,
                        label: sticker.label,
                        name: sticker.label,
                    })) || [],
            }));
        }, [productsWithDiscounts]);

        const isEmptyProducts = filteredProducts.length === 0;

        return (
            <section className={styles.section}>
                <div className={styles.header}>
                    <div className={styles.titleWrapper}>
                        <div className={styles.titleRow}>
                            <h2 className={styles.title}>{title}</h2>
                            {!isEmptyProducts && <CountdownTimer />}
                        </div>
                        <p className={styles.subtitle}>{subtitle}</p>
                    </div>
                    <Link href={hrefLink} className={styles.viewAll}>
                        <span>전체보기</span>
                        <ChevronRight
                            color={vars.color.gray['60']}
                            width='16'
                            height='16'
                        />
                    </Link>
                </div>

                <LoadingWrapper
                    isLoading={isLoading}
                    containerStyle={{
                        height: '98px',
                    }}
                >
                    {isEmptyProducts ? (
                        <div className={styles.emptyMessage}>
                            <p>오늘 시작한 타임특가 상품이 없습니다.</p>
                        </div>
                    ) : (
                        <div className={styles.swiperContainer}>
                            <Swiper
                                modules={[Grid]}
                                grid={{
                                    rows: 2,
                                    fill: 'row',
                                }}
                                slidesPerView={3}
                                spaceBetween={4}
                                breakpoints={{
                                    [BREAKPOINTS.SM]: {
                                        slidesPerView: 4.2,
                                        spaceBetween: 16,
                                        grid: {
                                            rows: 2,
                                            fill: 'row',
                                        },
                                    },
                                    [BREAKPOINTS.MD]: {
                                        slidesPerView: 6,
                                        spaceBetween: 16,
                                        grid: {
                                            rows: 2,
                                            fill: 'row',
                                        },
                                    },
                                }}
                            >
                                {filteredProducts.map((product) => (
                                    <SwiperSlide
                                        key={product.productNo}
                                        className={styles.productItem}
                                    >
                                        <ProductCard
                                            productNo={product.productNo}
                                            productName={product.productName}
                                            brandName={product.brandName}
                                            brandNo={product.brandNo}
                                            salePrice={product.salePrice}
                                            immediateDiscountAmt={
                                                product.immediateDiscountAmt
                                            }
                                            additionDiscountAmt={
                                                product.additionDiscountAmt
                                            }
                                            imageUrlInfo={
                                                product.imageUrlInfo as ImageUrlType[]
                                            }
                                            stickerInfos={product.stickerInfos}
                                            likeCount={product.likeCount}
                                            liked={product.liked}
                                            reviewRating={product.reviewRating}
                                            totalReviewCount={
                                                product.totalReviewCount
                                            }
                                            additionalDiscount={
                                                product.additionalDiscount
                                            }
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}
                </LoadingWrapper>

                <Link
                    href={hrefLink}
                    className={styles.moreLink}
                    prefetch={false}
                >
                    <span>{buttonLabel}</span> <ArrowRight />
                </Link>
            </section>
        );
    },
);

TimeSaleSection.displayName = 'TimeSaleSection';

export default TimeSaleSection;
