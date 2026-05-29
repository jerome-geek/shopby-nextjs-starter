import { each, map, pipe, prop, take } from '@fxts/core';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import { Gift, Share2, Star } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
    type GetStaticPaths,
    type GetStaticProps,
    InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';
import { overlay, useOverlayData } from 'overlay-kit';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { product } from '@/api/product';
import { OptionSelectBottomSheet } from '@/components/bottom-sheet/option-select';
import ShopbyApiErrorBoundary from '@/components/error-boundary/shopby';
import {
    ExtraProductList,
    PhotoReview,
    ProductAdditionalDiscount,
    ProductErrorState,
    ProductMainImage,
    ProductOrderAction,
    ProductTabs,
} from '@/components/product';
import {
    FlatProductOption,
    MultiProductOption,
    SelectedProductOption,
} from '@/components/product-option';
import { RequiredProductOption } from '@/components/product-option/required';
import { OVERLAY_ID } from '@/const/overlay';
import { ONE_HOUR_IN_SECONDS } from '@/const/time';
import { useProductInfo, useProductPrice } from '@/entities/product/hooks';
import { useCustomDialog } from '@/features/dialog';
import { toSelectedOption } from '@/helpers/product';
import { useSb } from '@/hooks/libs/shopby';
import { useProductOption, useProductOptionChange } from '@/hooks/product';
import { useProductOrderAction } from '@/hooks/product/useProductOrderAction';
import { useTrackRecentViewProduct } from '@/hooks/product/useRecentViewProduct';
import { useAdditionalDiscountByProductNos } from '@/hooks/query/product/additionalDiscount';
import { productKeys } from '@/hooks/queryKeys';
import { useProductDetail } from '@/hooks/suspenseQuery/product/product';
import useProductLike from '@/hooks/useProductLike';
import { useResponsive } from '@/hooks/utils';
import * as styles from '@/pages/products/[productNo]/index.css';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';
import LoadingWrapper from '@/shared/components/common/loading-wrapper';
import Seo from '@/shared/components/common/seo';
import { Button } from '@/shared/ui/button';
import { BookmarkIcon } from '@/shared/ui/icons';
import { useProductOptionStore } from '@/store/useProductOptionStore';
import { vars } from '@/styles/theme.css';
import { CURRENCY, RATE } from '@/utils/currency';

import 'swiper/css';
import 'swiper/css/pagination';

interface ProductDetailViewProps {
    productNo: number;
}

function ProductDetailView({ productNo }: ProductDetailViewProps) {
    const router = useRouter();

    const { t } = useTranslation();

    const { isMobile, isTablet } = useResponsive();

    const { data: productDetailData } = useProductDetail({
        productNo,
    });

    const { baseInfo, counter, brand, liked, deliveryFee } = productDetailData;

    const { isSaleEnd, productContent } = useProductInfo(productNo);

    const { discountRate, buyPrice, salePrice, couponDiscountAmt } =
        useProductPrice({
            productNo,
        });
    const {
        isDefaultOptionUsed,
        isFlatOptionUsed,
        isRequiredOptionUsed,
        isMultiLevelOptionUsed,
        productOptionListData,
    } = useProductOption({
        productNo,
    });

    const { data: additionalDiscountByProductNosData } =
        useAdditionalDiscountByProductNos({
            searchParams: { productNos: [productNo] },
        });

    const isCouponDownloadable = couponDiscountAmt > 0;

    const { onLikeButtonClick } = useProductLike();
    const { openShareDialog, openCouponDownloadDialog } = useCustomDialog();

    const onShareButtonClick = () =>
        openShareDialog({
            template: 'commerce',
            title: brand?.name
                ? `[${brand.name}] ${baseInfo.productName}`
                : baseInfo.productName,
            description: baseInfo.promotionText || undefined,
            imageUrl:
                baseInfo.imageUrls?.[0] || baseInfo.imageUrlInfo?.[0]?.url,
            regularPrice: salePrice,
            ...(discountRate > 0 && { discountRate, discountPrice: buyPrice }),
        });
    const onCouponDownloadClick = () => openCouponDownloadDialog(productNo);

    const overlayData = useOverlayData();
    const isOptionBottomSheetOpen =
        overlayData[OVERLAY_ID.OPTION_BOTTOM_SHEET]?.isOpen;

    const openOptionBottomSheet = () => {
        overlay.open(
            (props) => (
                <OptionSelectBottomSheet {...props} productNo={productNo} />
            ),
            { overlayId: OVERLAY_ID.OPTION_BOTTOM_SHEET },
        );
    };

    const { onGiftButtonClick, onOrderButtonClick } = useProductOrderAction(
        productNo,
        { openOptionBottomSheet, isOptionBottomSheetOpen },
    );

    const { onFlatOptionChange, onMultiOptionChange } = useProductOptionChange({
        productNo,
    });

    const { addOption, clearOptions } = useProductOptionStore();

    useEffect(() => {
        return () => {
            clearOptions();
        };
    }, [productNo, clearOptions]);

    useEffect(() => {
        if (!productDetailData) {
            return;
        }
        if (!productOptionListData) {
            return;
        }

        if (isDefaultOptionUsed) {
            const minBuyCnt = productDetailData.limitations?.minBuyCnt || 1;
            pipe(
                productOptionListData,
                prop('flatOptions'),
                map((option) =>
                    toSelectedOption(
                        option,
                        productNo,
                        undefined,
                        [],
                        minBuyCnt,
                    ),
                ),
                take(1),
                each((option) => addOption(option)),
            );
        }
    }, [
        productDetailData,
        productOptionListData,
        isDefaultOptionUsed,
        productNo,
        addOption,
    ]);

    useTrackRecentViewProduct(productNo);
    useSb({
        product: productDetailData,
    });

    return (
        <div className={styles.container}>
            <div className={styles.mainSection}>
                <div className={styles.leftColumn}>
                    <div className={styles.thumbnailContainer}>
                        <ProductMainImage productNo={productNo} />

                        {isTablet &&
                            additionalDiscountByProductNosData &&
                            additionalDiscountByProductNosData.data.length >
                                0 && (
                                <div className={styles.timeSaleContainer}>
                                    <ProductAdditionalDiscount
                                        type='detail-mobile'
                                        additionalDiscount={
                                            additionalDiscountByProductNosData
                                                .data[0]
                                        }
                                    />
                                </div>
                            )}
                    </div>

                    {!isTablet && (
                        <ProductTabs
                            reviewCount={counter.reviewCnt || 0}
                            inquiryCount={counter.inquiryCnt || 0}
                            productContent={productContent}
                            productDetailData={productDetailData}
                        />
                    )}
                </div>

                <div
                    className={styles.content}
                    {...(isTablet ? {} : { 'data-lenis-prevent': true })}
                >
                    <header className={styles.header}>
                        <div className={styles.titleInfo}>
                            {brand && (
                                <span className={styles.brand}>
                                    {brand.name}
                                </span>
                            )}

                            <h1 className={styles.productName}>
                                {baseInfo.productName}
                            </h1>
                            {baseInfo.promotionText && (
                                <p className={styles.promotionText}>
                                    {baseInfo.promotionText}
                                </p>
                            )}

                            <div className={styles.ratingContainer}>
                                <Star
                                    size={isMobile ? 16 : 20}
                                    fill={vars.color.pink['80']}
                                    stroke={vars.color.pink['80']}
                                />
                                <strong className={styles.reviewRate}>
                                    {productDetailData.reviewRate || 0}
                                </strong>
                                <span className={styles.reviewCount}>
                                    ({counter.reviewCnt || 0})
                                </span>
                            </div>
                        </div>

                        <div className={styles.topButtonContainer}>
                            <button
                                type='button'
                                onClick={onShareButtonClick}
                                aria-label='공유하기'
                            >
                                <Share2 size={26} strokeWidth={1.5} />
                            </button>

                            {!isTablet && (
                                <button
                                    className={styles.likeButton}
                                    onClick={onLikeButtonClick(
                                        productNo,
                                        liked,
                                    )}
                                >
                                    <BookmarkIcon
                                        width={20}
                                        height={28}
                                        variant={liked ? 'filled' : 'outline'}
                                    />

                                    <span className={styles.likeCount}>
                                        {counter.likeCnt}
                                    </span>
                                </button>
                            )}
                        </div>
                    </header>

                    <div className={styles.priceSection}>
                        <div className={styles.priceInfo}>
                            {discountRate > 0 && (
                                <span className={styles.salePrice}>
                                    {CURRENCY(salePrice).format()}
                                </span>
                            )}
                            <div className={styles.priceContainer}>
                                {discountRate > 0 && (
                                    <span className={styles.discountRate}>
                                        {RATE(discountRate).format()}
                                    </span>
                                )}
                                <span className={styles.finalPrice}>
                                    {CURRENCY(buyPrice).format()}
                                </span>
                            </div>
                        </div>
                        {isCouponDownloadable && (
                            <button
                                className={styles.couponButton}
                                onClick={onCouponDownloadClick}
                            >
                                {t('쿠폰 받기')}
                            </button>
                        )}
                    </div>

                    <div className={styles.additionalInfoContainer}>
                        {additionalDiscountByProductNosData && (
                            <ProductAdditionalDiscount
                                type='detail'
                                additionalDiscount={
                                    additionalDiscountByProductNosData.data[0]
                                }
                            />
                        )}
                    </div>

                    <dl className={styles.deliveryBox}>
                        {deliveryFee.deliveryCompanyTypeLabel && (
                            <div className={styles.deliveryRow}>
                                <dt className={styles.deliveryLabel}>택배사</dt>
                                <dd className={styles.deliveryValue}>
                                    {deliveryFee.deliveryCompanyTypeLabel}
                                </dd>
                            </div>
                        )}

                        {deliveryFee.defaultDeliveryConditionLabel && (
                            <div className={styles.deliveryRow}>
                                <dt className={styles.deliveryLabel}>배송비</dt>
                                <dd className={styles.deliveryValue}>
                                    {deliveryFee.defaultDeliveryConditionLabel}
                                </dd>
                            </div>
                        )}
                    </dl>

                    <PhotoReview />

                    {!isTablet && (
                        <>
                            <div className={styles.optionContainer}>
                                {isRequiredOptionUsed && (
                                    <RequiredProductOption
                                        productNo={productNo}
                                        onChange={onMultiOptionChange}
                                        menuPortalTarget={null}
                                    />
                                )}

                                {isFlatOptionUsed && (
                                    <FlatProductOption
                                        productNo={productNo}
                                        onChange={onFlatOptionChange}
                                        menuPortalTarget={null}
                                    />
                                )}

                                {isMultiLevelOptionUsed && (
                                    <MultiProductOption
                                        productNo={productNo}
                                        onChange={onMultiOptionChange}
                                        menuPortalTarget={null}
                                    />
                                )}

                                <SelectedProductOption
                                    productNo={productNo}
                                    isRemovable={!isDefaultOptionUsed}
                                />

                                <ShopbyAsyncBoundary>
                                    <ExtraProductList productNo={productNo} />
                                </ShopbyAsyncBoundary>
                            </div>

                            <ProductOrderAction productNo={productNo} />
                        </>
                    )}
                </div>

                {isTablet && (
                    <div style={{ marginTop: '4px' }}>
                        <ProductTabs
                            reviewCount={counter.reviewCnt || 0}
                            inquiryCount={counter.inquiryCnt || 0}
                            productContent={productContent}
                            productDetailData={productDetailData}
                        />
                    </div>
                )}
            </div>

            <AnimatePresence>
                <motion.div
                    key={`${router.pathname}-bottom-sticky`}
                    className={styles.bottomSticky}
                    initial={{ transform: 'translateY(0)' }}
                    exit={{ transform: 'translateY(0)' }}
                >
                    {isSaleEnd ? (
                        <Button frame='solid' variant='secondary' disabled>
                            {t('판매가 종료된 상품입니다.')}
                        </Button>
                    ) : (
                        <>
                            <button
                                className={styles.giftButton}
                                onClick={onLikeButtonClick(productNo, liked)}
                            >
                                <BookmarkIcon
                                    width={20}
                                    height={20}
                                    variant={liked ? 'filled' : 'outline'}
                                />
                            </button>
                            <button
                                className={styles.giftButton}
                                onClick={onGiftButtonClick}
                            >
                                <Gift size={24} color='#333' />
                            </button>
                            <Button
                                frame='solid'
                                variant='brick'
                                onClick={onOrderButtonClick}
                            >
                                {t('구매하기')}
                            </Button>
                        </>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default function ProductDetailPage({
    productNo,
    errorStatusCode,
    errorMessage,
    seoData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    // 1단계 [비즈니스 에러]: API에서 받은 메시지를 그대로 사용자에게 노출
    if (errorStatusCode) {
        return (
            <ProductErrorState
                errorStatusCode={errorStatusCode}
                errorMessage={errorMessage}
            />
        );
    }

    return (
        <>
            {seoData && <Seo type='product' {...seoData} />}
            <ShopbyApiErrorBoundary
                fallback={
                    // 로딩 상태도 애니메이션을 넣고 싶다면 motion.div로 감쌉니다.
                    <motion.div
                        key='product-loading'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <LoadingWrapper
                            isLoading
                            containerStyle={{ height: '80vh' }}
                        >
                            <span />
                        </LoadingWrapper>
                    </motion.div>
                }
            >
                {/* 데이터 로드 후 나타날 컨텐츠 */}
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={`product-detail-${productNo}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                        <ProductDetailView productNo={productNo} />
                    </motion.div>
                </AnimatePresence>
            </ShopbyApiErrorBoundary>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const queryClient = new QueryClient();

    const productNo = Number(params?.productNo) || 0;
    if (!productNo) {
        return { notFound: true };
    }

    const searchParams = {
        preview: false,
    };

    let seoData = null;

    try {
        const productData = await queryClient.fetchQuery({
            queryKey: productKeys.detail(productNo, searchParams),
            queryFn: async () => {
                const { data } = await product.getProductDetail(
                    productNo,
                    searchParams,
                );

                return data;
            },
        });

        // ── SEO 데이터 추출 ──
        if (productData?.baseInfo) {
            const { baseInfo, brand, price, reviewRate, counter } = productData;

            const title = brand?.name
                ? `[${brand.name}] ${baseInfo.productName}`
                : baseInfo.productName;

            const description =
                baseInfo.promotionText ||
                `${brand?.name ? `[${brand.name}] ` : ''}${
                    baseInfo.productName
                } 상품을 만나보세요.`;

            const image =
                baseInfo.imageUrls?.[0] ||
                baseInfo.imageUrlInfo?.[0]?.url ||
                '';

            const finalPrice =
                price.salePrice -
                (price.immediateDiscountAmt || 0) -
                (price.additionDiscountAmt || 0);

            const url = `${
                process.env.NEXT_PUBLIC_BASE_URL || ''
            }/products/${productNo}`;

            seoData = {
                title,
                description,
                image,
                url,
                priceAmount: finalPrice,
                brandName: brand?.name || '',
                noindex: baseInfo.urlDirectDisplayYn === 'Y',
                jsonLd: {
                    '@context': 'https://schema.org',
                    '@type': 'Product',
                    name: baseInfo.productName,
                    image,
                    description,
                    ...(brand?.name && {
                        brand: {
                            '@type': 'Brand',
                            name: brand.name,
                        },
                    }),
                    ...(reviewRate && {
                        aggregateRating: {
                            '@type': 'AggregateRating',
                            ratingValue: reviewRate,
                            reviewCount: counter?.reviewCnt || 0,
                        },
                    }),
                    offers: {
                        '@type': 'Offer',
                        price: finalPrice,
                        priceCurrency: 'KRW',
                        availability: 'https://schema.org/InStock',
                        url,
                    },
                },
            };
        }
    } catch (error) {
        if (isAxiosError(error)) {
            const status =
                error.response?.status || HttpStatusCode.InternalServerError;

            if (status >= 400 && status < 500) {
                return {
                    props: {
                        productNo,
                        errorStatusCode: status,
                        errorMessage:
                            error.response?.data?.message ||
                            '상품을 불러올 수 없습니다.',
                    },
                    revalidate: ONE_HOUR_IN_SECONDS,
                };
            }
        }
        return { notFound: true };
    }

    return {
        props: {
            productNo,
            seoData,
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: ONE_HOUR_IN_SECONDS,
    };
};
