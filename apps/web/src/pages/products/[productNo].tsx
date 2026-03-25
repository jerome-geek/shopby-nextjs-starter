import { filter, join, map, pipe, sum } from '@fxts/core';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import { BookmarkIcon, Gift, Star, Truck } from 'lucide-react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { overlay, useOverlayData } from 'overlay-kit';
import { useMemo, useState } from 'react';

import { product } from '@/api/product';
// import OptionSelectBottomSheet from '@/components/bottom-sheet/OptionSelect';
// import { BookmarkIcon } from '@/components/icons/BookmarkIcon';
import ShopbyApiErrorBoundary from '@/components/ErrorBoundary/Shopby';
import ProductAdditionalDiscount from '@/components/product/additional-discount';
import ProductMainImage from '@/components/product/main-image';
import PhotoReview from '@/components/product/photo-review';
import RelatedProductList from '@/components/product/related-product-list';
import ProductTabs from '@/components/product/product-tabs';
import { Button } from '@/components/ui/button';
import { OVERLAY_ID } from '@/const/overlay';
import { useSb } from '@/hooks/libs/shopby';
import { useAdditionalDiscount } from '@/hooks/query/product/additionalDiscount';
import { productKeys } from '@/hooks/queryKeys';
import { useProductDetail } from '@/hooks/suspenseQuery/product/product';
import useProductLike from '@/hooks/useProductLike';
import { ChannelType } from '@/models';
import * as styles from '@/pages/products/[productNo].css';
import { vars } from '@/styles/theme.css';
import { CURRENCY, formatPrice, KRW } from '@/utils/currency';
import 'swiper/css';
import 'swiper/css/pagination';
import FlatProductOption from '@/components/product/option/flat';
import useProductOption from '@/hooks/product/useProductOption';
import {
    MultiProductOption,
    SelectedProductOption,
} from '@/components/product/option';
import useProductOptionChange from '@/hooks/product/useProductOptionChange';
import { useProductOptionStore } from '@/store/useProductOptionStore';
import { useToast } from '@/hooks/ui';
import { useResponsive } from '@/hooks/utils';

interface ProductDetailViewProps {
    productNo: number;
    searchParams: {
        channelType?: ChannelType;
        preview?: boolean;
    };
}

function ProductDetailView({
    productNo,
    searchParams,
}: ProductDetailViewProps) {
    const { isMobile } = useResponsive();

    const { data: productDetailData } = useProductDetail({
        productNo,
        searchParams,
    });

    const { baseInfo, price, counter, brand } = productDetailData;

    const liked = !!productDetailData.liked;

    const { isFlatOptionUsed, isMultiLevelOptionUsed } = useProductOption({
        productNo,
    });
    console.log(
        '🚀 ~ ProductDetailView ~ isMultiLevelOptionUsed:',
        isMultiLevelOptionUsed,
    );
    console.log('🚀 ~ ProductDetailView ~ isFlatOptionUsed:', isFlatOptionUsed);

    const { data: additionalDiscountData } = useAdditionalDiscount({
        searchParams: { productNo },
    });
    console.log('🚀 ~ ProductDetailView ~ data:', additionalDiscountData);

    const productContent = useMemo(() => {
        if (!productDetailData) {
            return '';
        }

        const {
            contentHeader = '',
            content = '',
            contentFooter = '',
        } = productDetailData.baseInfo;

        return pipe(
            [contentHeader, content, contentFooter],
            filter((a) => !!a),
            join(''),
        );
    }, [productDetailData]);

    const discountRate = Math.round(
        ((price.salePrice -
            (price.immediateDiscountAmt || 0) -
            (price.additionDiscountAmt || 0)) /
            price.salePrice) *
            100,
    );
    const finalPrice =
        price.salePrice -
        (price.immediateDiscountAmt || 0) -
        (price.additionDiscountAmt || 0);

    const { onLikeButtonClick } = useProductLike();

    const overlayData = useOverlayData();
    const isOptionBottomSheetOpen =
        overlayData[OVERLAY_ID.OPTION_BOTTOM_SHEET]?.isOpen;
    const openOptionBottomSheet = () => {
        overlay.open(
            (props) => (
                // <OptionSelectBottomSheet {...props} productNo={productNo} />
                <></>
            ),
            {
                overlayId: OVERLAY_ID.OPTION_BOTTOM_SHEET,
            },
        );
    };

    const { onFlatOptionChange, onMultiOptionChange } = useProductOptionChange({
        productNo,
    });

    const { selectedOptionList } = useProductOptionStore();

    const totalPrice = pipe(
        selectedOptionList,
        map((option) => option.buyPrice * option.orderCnt),
        sum,
    );

    // const { ensureAddToCart, ensureOrder } = useOrderActionValidation({
    //     productNo,
    // });

    // const {
    //     register: {
    //         mutate: registerCartMutate,
    //         mutateAsync: registerCartMutateAsync,
    //     },
    //     modify: { mutate: modifyCartMutate },
    //     delete: { mutateAsync: deleteCartMutateAsync },
    // } = useCartMutation();
    const { addToast } = useToast();

    const onGiftButtonClick = () => {
        addToast({
            message: '장바구니에 상품을 담았습니다',
            link: { label: '바로가기', href: '/cart' },
        });

        if (isMobile && !isOptionBottomSheetOpen) {
            openOptionBottomSheet();
            return;
        }
    };

    const onCartButtonClick = () => {
        if (isMobile && !isOptionBottomSheetOpen) {
            openOptionBottomSheet();
            return;
        }
    };

    const onOrderButtonClick = () => {
        if (isMobile && !isOptionBottomSheetOpen) {
            openOptionBottomSheet();
            return;
        }
    };

    useSb({
        product: productDetailData,
    });

    return (
        <div className={styles.container}>
            <div className={styles.mainSection}>
                <div className={styles.leftColumn}>
                    <div className={styles.thumbnailContainer}>
                        <ProductMainImage
                            productNo={productNo}
                            searchParams={searchParams}
                        />
                    </div>

                    <div style={{ marginTop: '40px' }}>
                        <ProductTabs
                            reviewCount={counter.reviewCnt || 0}
                            inquiryCount={counter.inquiryCnt || 0}
                            productContent={productContent}
                        />
                    </div>
                </div>

                <div className={styles.content}>
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
                                    size={14}
                                    fill='#E2808F'
                                    stroke='#E2808F'
                                />
                                <strong className={styles.reviewRate}>
                                    {productDetailData.reviewRate || 0}
                                </strong>
                                <span className={styles.reviewCount}>
                                    ({counter.reviewCnt || 0})
                                </span>
                            </div>
                        </div>

                        <button
                            className={styles.likeButton}
                            onClick={() => onLikeButtonClick(productNo, liked)}
                        >
                            <BookmarkIcon
                                width={36}
                                height={36}
                                fill={liked ? vars.color.green['100'] : 'none'}
                                stroke={
                                    liked
                                        ? vars.color.green['100']
                                        : 'currentColor'
                                }
                            />

                            <span className={styles.likeCount}>
                                {counter.likeCnt}
                            </span>
                        </button>
                    </header>

                    <div className={styles.priceSection}>
                        <div className={styles.priceInfo}>
                            {discountRate > 0 && (
                                <span className={styles.originalPrice}>
                                    {formatPrice(price.salePrice)}
                                </span>
                            )}
                            <div className={styles.priceContainer}>
                                {discountRate > 0 && (
                                    <span className={styles.discountRate}>
                                        {discountRate}%
                                    </span>
                                )}
                                <span className={styles.finalPrice}>
                                    {formatPrice(finalPrice)}
                                </span>
                            </div>
                        </div>
                        <button className={styles.couponButton}>
                            쿠폰 받기
                        </button>
                    </div>

                    <div className={styles.additionalInfoContainer}>
                        {additionalDiscountData && (
                            <ProductAdditionalDiscount
                                type='detail'
                                productNo={productNo}
                            />
                        )}

                        <div className={styles.deliveryBox}>
                            <div className={styles.deliveryTitle}>
                                <Truck size={18} />
                                지금 주문하면 내일 받을 수 있어요
                            </div>
                            <div className={styles.badgeList}>
                                <span
                                    className={`${styles.badge} ${styles.badgeActive}`}
                                >
                                    무료배송
                                </span>
                                <span
                                    className={`${styles.badge} ${styles.badgeActive}`}
                                >
                                    빠른배송
                                </span>
                            </div>
                        </div>
                    </div>

                    <PhotoReview images={baseInfo.imageUrlInfo} />

                    <hr className={styles.optionDivider} />

                    <div>
                        {isFlatOptionUsed && (
                            <FlatProductOption
                                productNo={productNo}
                                onChange={onFlatOptionChange}
                            />
                        )}
                        {isMultiLevelOptionUsed && (
                            <MultiProductOption
                                productNo={productNo}
                                onChange={onMultiOptionChange}
                            />
                        )}

                        <SelectedProductOption />

                        {/* <SelectedProductOption
                            selectedOptionList={filteredSelectedOptionList}
                            onOptionDeleteClick={onOptionDeleteClickV2}
                            onPlusClick={onPlusClick}
                            onMinusClick={onMinusClick}
                            onChangeProductCount={onChangeProductCount}
                            getSelectedOptionValue={getSelectedOptionValue}
                            textOptionList={textOptionInputs['OPTION'] ?? []}
                            onInputOptionChange={onInputOptionChange}
                        /> */}
                    </div>

                    <div className={styles.orderContainer}>
                        <hr className={styles.buttonDivider} />

                        <div className={styles.totalPriceContainer}>
                            <p className={styles.totalPriceTitle}>
                                총 상품금액
                            </p>
                            <p className={styles.totalPrice}>
                                {formatPrice(totalPrice)}
                            </p>
                        </div>

                        <div className={styles.actionButtons}>
                            <button
                                className={styles.giftButtonDesktop}
                                onClick={onGiftButtonClick}
                            >
                                <Gift size={24} />
                            </button>
                            <Button
                                frame='outlined'
                                onClick={onCartButtonClick}
                            >
                                장바구니
                            </Button>
                            <Button
                                frame='solid'
                                variant='primary'
                                onClick={onOrderButtonClick}
                            >
                                구매하기
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <button
                    className={styles.giftButton}
                    onClick={onGiftButtonClick}
                >
                    <Gift size={24} color='#333' />
                </button>
                <Button frame='outlined' onClick={onCartButtonClick}>
                    장바구니
                </Button>
                <Button
                    frame='solid'
                    variant='primary'
                    onClick={onOrderButtonClick}
                >
                    구매하기
                </Button>
            </div>
        </div>
    );
}

export default function ProductDetailPage({
    productNo,
    searchParams,
    errorStatusCode,
    errorMessage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    // 1단계 [비즈니스 에러]: API에서 받은 메시지를 그대로 사용자에게 노출
    if (errorStatusCode) {
        return (
            <div
                style={{
                    width: '60vw',
                    margin: '0 auto',
                    padding: '100px 20px',
                    textAlign: 'center',
                }}
            >
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    안내드립니다
                </h1>
                <p style={{ margin: '16px 0', color: '#666' }}>
                    {errorMessage}
                </p>
                <Button
                    frame='solid'
                    variant='primary'
                    onClick={() => router.push('/')}
                >
                    홈으로 돌아가기
                </Button>
            </div>
        );
    }

    return (
        <ShopbyApiErrorBoundary
            fallback={
                <div style={{ padding: '100px', textAlign: 'center' }}>
                    상품 정보를 불러오는 중입니다...
                </div>
            }
        >
            <ProductDetailView
                productNo={productNo}
                searchParams={searchParams}
            />
        </ShopbyApiErrorBoundary>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { res } = context;
    const queryClient = new QueryClient();

    const productNo = Number(context.params?.productNo) || 0;
    if (!productNo) {
        return { notFound: true };
    }

    const searchParams = {
        channelType: (context.query.channelType as ChannelType) || null,
        preview: context.query.preview === 'true',
    };

    try {
        await queryClient.fetchQuery({
            queryKey: productKeys.detail(productNo, searchParams),
            queryFn: async () => {
                const { data } = await product.getProductDetail(
                    productNo,
                    searchParams,
                );

                return data;
            },
        });
    } catch (error) {
        if (isAxiosError(error)) {
            const status =
                error.response?.status || HttpStatusCode.InternalServerError;

            // ⚠️ [비즈니스 에러]: 4xx 에러 (권한 없음, 존재하지 않음 등) 처리
            if (status >= 400 && status < 500) {
                res.statusCode = status; // SEO 대응

                return {
                    props: {
                        productNo,
                        searchParams,
                        errorStatusCode: status,
                        errorMessage:
                            error.response?.data?.message ||
                            '상품을 불러올 수 없습니다.',
                    },
                };
            }

            // [시스템 에러]: 5xx 에러는 그대로 두어 클라이언트 ErrorBoundary 유도
            console.warn('🚀 getServerSideProps fetch failure:', error);
        }
    }

    return {
        props: {
            productNo,
            searchParams,
            dehydratedState: dehydrate(queryClient),
        },
    };
};
