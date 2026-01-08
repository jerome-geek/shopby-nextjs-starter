'use client';

import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';
import { isEmpty, pipe, take, toArray } from '@fxts/core';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import SectionSkeleton from '@/components/main/product-display/Skeleton';
import ProductCard from '@/components/product/Card';
import { useProductDisplaySwiper } from '@/hooks/main/useProductDisplaySwiper';
import useMediaQuery from '@/hooks/useMediaQuery';
import {
    GetProductSectionByIdResponse,
    ProductSectionProduct,
} from '@/models/display/productSection';

interface BrandSectionItemProps {
    sectionData: GetProductSectionByIdResponse;
    products: ProductSectionProduct[];
}

const BrandSectionItem = ({ sectionData, products }: BrandSectionItemProps) => {
    const { swiperKey, swiperOptions, limitedProducts, isMediaQueryReady } =
        useProductDisplaySwiper({ products });

    const mediaQueryResult = useMediaQuery('(max-width: 768px)');
    const isMobile = mediaQueryResult === true;

    const desktopProducts = pipe(limitedProducts, take(2), toArray);

    const brandNo = products[0].brandNo;

    // 미디어 쿼리가 준비되지 않았으면 스켈레톤 반환 (깜빡임 방지)
    if (!isMediaQueryReady) {
        return <SectionSkeleton />;
    }

    if (isEmpty(limitedProducts)) {
        return (
            <div
                className={css({
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingY: token('spacing.10'),
                })}
            >
                <p>전시중인 상품이 없습니다.</p>
            </div>
        );
    }

    return (
        <section
            className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: { base: token('spacing.4'), md: token('spacing.5') },
                width: '100%',
            })}
        >
            <Link
                href={`/brand/${brandNo}`}
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { base: token('spacing.4'), md: token('spacing.5') },
                    paddingX: { base: token('spacing.5'), md: '0' },
                })}
            >
                <Image
                    src={`https:${sectionData.imageUrl}`}
                    alt={sectionData.label}
                    width={384}
                    height={384}
                    className={css({
                        width: '100%',
                        objectFit: 'cover',
                        borderRadius: {
                            base: token('spacing.3'),
                            md: token('spacing.4'),
                        },
                        overflow: 'hidden',
                    })}
                />
                <div
                    className={css({
                        display: 'flex',
                        flexDirection: 'column',
                        gap: token('spacing.2'),
                    })}
                >
                    <h2
                        className={css({
                            textStyle: 'title1.semibold',
                            color: 'black',
                        })}
                    >
                        {sectionData.label}
                    </h2>
                    <p
                        className={css({
                            textStyle: 'headline1.regular',
                            color: 'gray90',
                        })}
                    >
                        {sectionData.sectionExplain}
                    </p>
                </div>
            </Link>

            <div
                className={css({
                    position: 'relative',
                    width: '100%',
                })}
            >
                {isMobile ? (
                    <Swiper key={`${swiperKey}`} {...swiperOptions}>
                        {limitedProducts.map((product, index) => (
                            <SwiperSlide
                                key={
                                    product
                                        ? product.productNo
                                        : `empty-${index}`
                                }
                            >
                                <ProductCard
                                    productNo={product.productNo}
                                    productName={product.productName}
                                    imageUrlInfo={product.imageUrlInfo.map(
                                        (
                                            img: ProductSectionProduct['imageUrlInfo'][number],
                                        ) => {
                                            const urlType =
                                                img.imageUrlType as any;
                                            return {
                                                imageUrlType:
                                                    urlType.imageUrlType ||
                                                    urlType.type ||
                                                    'IMAGE_URL',
                                                type:
                                                    urlType.imageUrlType ||
                                                    urlType.type ||
                                                    'IMAGE_URL',
                                                url: img.url,
                                            };
                                        },
                                    )}
                                    brandNo={product.brandNo}
                                    brandName={product.brandName}
                                    stickerInfos={product.stickerInfos.map(
                                        (
                                            sticker: ProductSectionProduct['stickerInfos'][number],
                                            stickerIndex: number,
                                        ) => ({
                                            no: stickerIndex + 1,
                                            name: sticker.label,
                                            label: sticker.label,
                                            type: sticker.type,
                                        }),
                                    )}
                                    likeCount={product.likeCount}
                                    liked={product.liked}
                                    reviewRating={product.reviewRating}
                                    totalReviewCount={product.totalReviewCount}
                                    salePrice={product.salePrice}
                                    immediateDiscountAmt={
                                        product.immediateDiscountAmt
                                    }
                                    additionDiscountAmt={
                                        product.additionDiscountAmt
                                    }
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    desktopProducts.map((product, index) => (
                        <div
                            key={product ? product.productNo : `empty-${index}`}
                            className={css({
                                display: 'flex',
                                flexDirection: 'column',
                                gap: token('spacing.2'),
                            })}
                        >
                            {/* TODO: 추후 리스트형으로 변경 예정 */}
                            <ProductCard
                                productNo={product.productNo}
                                productName={product.productName}
                                imageUrlInfo={product.imageUrlInfo.map(
                                    (
                                        img: ProductSectionProduct['imageUrlInfo'][number],
                                    ) => {
                                        const urlType = img.imageUrlType as any;
                                        return {
                                            imageUrlType:
                                                urlType.imageUrlType ||
                                                urlType.type ||
                                                'IMAGE_URL',
                                            type:
                                                urlType.imageUrlType ||
                                                urlType.type ||
                                                'IMAGE_URL',
                                            url: img.url,
                                        };
                                    },
                                )}
                                brandNo={product.brandNo}
                                brandName={product.brandName}
                                stickerInfos={product.stickerInfos.map(
                                    (
                                        sticker: ProductSectionProduct['stickerInfos'][number],
                                        stickerIndex: number,
                                    ) => ({
                                        no: stickerIndex + 1,
                                        name: sticker.label,
                                        label: sticker.label,
                                        type: sticker.type,
                                    }),
                                )}
                                likeCount={product.likeCount}
                                liked={product.liked}
                                reviewRating={product.reviewRating}
                                totalReviewCount={product.totalReviewCount}
                                salePrice={product.salePrice}
                                immediateDiscountAmt={
                                    product.immediateDiscountAmt
                                }
                                additionDiscountAmt={
                                    product.additionDiscountAmt
                                }
                            />
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default BrandSectionItem;
