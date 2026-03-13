import { memo, useMemo } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/product/card';
import * as styles from './index.css';
import { useProductSectionProductList } from '@/hooks/query/display/productSection';
import { Button } from '@/components/ui/button';
import { ImageUrlType } from '@/models/product';
import { CountdownTimer } from '@/components/product/countdown-timer';

interface TimeSaleProps {
    sectionId?: string;
    title?: string;
    subtitle?: string;
    buttonLabel?: string;
}

export const TimeSale = memo(
    ({
        sectionId = 'TIMESALE-LIFE',
        title = '오늘만 특가',
        subtitle = '매일 오전 10시 새 업데이트',
        buttonLabel = '라이프 타임특가 더보기',
    }: TimeSaleProps) => {
        const { data: productSectionProductListData } =
            useProductSectionProductList({
                sectionId,
                searchParams: {
                    by: 'ADMIN_SETTING',
                    direction: 'DESC',
                    soldout: false,
                    saleStatus: 'RESERVATION_AND_ONSALE',
                    pageNumber: 1,
                    pageSize: 12,
                    hasOptionValues: false,
                    includeStopProduct: false,
                },
            });

        const filteredProducts = useMemo(() => {
            return productSectionProductListData
                ? productSectionProductListData.products
                      // ?.filter((product) => (product.additionDiscountAmt || 0) > 0)
                      .map((product) => ({
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
                      }))
                : [];
        }, [productSectionProductListData]);

        // const { data: additionalDiscountData } = useAdditionalDiscountByProductNos({
        //     searchParams: {
        //         productNos: filteredProducts.map((product) => product.productNo),
        //     },
        // });
        // console.log(
        //     '🚀 ~ TimeSale ~ additionalDiscountData:',
        //     additionalDiscountData,
        // );

        if (filteredProducts.length === 0) {
            return null;
        }

        return (
            <section className={styles.section}>
                <div className={styles.header}>
                    <div className={styles.titleWrapper}>
                        <div className={styles.titleRow}>
                            <h2 className={styles.title}>{title}</h2>
                            <CountdownTimer />
                        </div>
                        <p className={styles.subtitle}>{subtitle}</p>
                    </div>
                    <Link
                        prefetch={false}
                        href="/products"
                        className={styles.viewAll}
                    >
                        전체보기
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M9 18l6-6-6-6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>
                </div>

                <ul className={styles.productGrid}>
                    {filteredProducts.map((product) => (
                        <li
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
                                totalReviewCount={product.totalReviewCount}
                                isAdditionalDiscount
                            />
                        </li>
                    ))}
                </ul>

                <Button type="button" frame="solid" variant="primary">
                    <span>{buttonLabel}</span>
                </Button>
            </section>
        );
    },
);

TimeSale.displayName = 'TimeSale';

export default TimeSale;
