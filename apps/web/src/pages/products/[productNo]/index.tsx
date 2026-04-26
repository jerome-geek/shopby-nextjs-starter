import { OptionSelectBottomSheet } from '@/components/bottom-sheet/option-select';
import {
    PhotoReview,
    ProductAdditionalDiscount,
    ProductErrorState,
    ProductMainImage,
    ProductTabs,
} from '@/components/product';
import {
    FlatProductOption,
    MultiProductOption,
    SelectedProductOption,
} from '@/components/product-option';
import { Button } from '@/components/ui/button';
import {
    each,
    filter,
    includes,
    join,
    map,
    pipe,
    prop,
    sum,
    take,
    toArray,
} from '@fxts/core';
import { dehydrate, QueryClient, useQueryClient } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import { BookmarkIcon, Gift, Star, Truck } from 'lucide-react';
import {
    type GetStaticPaths,
    type GetStaticProps,
    InferGetStaticPropsType,
} from 'next';
import { parseAsStringLiteral, useQueryStates } from 'nuqs';
import { overlay, useOverlayData } from 'overlay-kit';
import { useEffect, useMemo } from 'react';

import { product } from '@/api/product';
import { ProductCouponBottomSheet } from '@/components/bottom-sheet/product-coupon';
import Seo from '@/components/common/seo';
import ShopbyApiErrorBoundary from '@/components/error-boundary/shopby';
import { ProductCouponModal } from '@/components/modal/product-coupon';
import { OVERLAY_ID } from '@/const/overlay';
import { CHANNEL_TYPES } from '@/const/product';
import { toOrderSheetOption, toSelectedOption } from '@/helpers/product';
import { useSb } from '@/hooks/libs/shopby';
import { useCartMutation, useOrderSheetMutation } from '@/hooks/mutations';
import { useProductOption, useProductOptionChange } from '@/hooks/product';
import { useRecentViewProducts } from '@/hooks/product/useRecentViewProduct';
import { useAdditionalDiscountByProductNos } from '@/hooks/query/product/additionalDiscount';
import { cartKeys, productKeys } from '@/hooks/queryKeys';
import { useProductDetail } from '@/hooks/suspenseQuery/product/product';
import { useCustomDialog, useToast } from '@/hooks/ui';
import { useAuth } from '@/hooks/useAuth';
import useProductLike from '@/hooks/useProductLike';
import { useResponsive } from '@/hooks/utils';
import * as styles from '@/pages/products/[productNo]/index.css';
import { useCartStore } from '@/store/useCartStore';
import { useProductOptionStore } from '@/store/useProductOptionStore';
import { vars } from '@/styles/theme.css';
import { CURRENCY } from '@/utils/currency';

import 'swiper/css';
import 'swiper/css/pagination';

interface ProductDetailViewProps {
    productNo: number;
}

const productSearchParamsSchema = {
    channelType: parseAsStringLiteral(CHANNEL_TYPES),
};

function ProductDetailView({ productNo }: ProductDetailViewProps) {
    const [{ channelType }] = useQueryStates(productSearchParamsSchema);

    const isLogin = useAuth();

    const { isMobile, isTablet } = useResponsive();

    const { openAddCartDialog } = useCustomDialog();

    const queryClient = useQueryClient();

    const { data: productDetailData } = useProductDetail({
        productNo,
    });
    console.log(
        '🚀 ~ ProductDetailView ~ productDetailData:',
        productDetailData,
    );

    const { baseInfo, price, counter, brand } = productDetailData;

    const liked = !!productDetailData.liked;

    const {
        isDefaultOptionUsed,
        isFlatOptionUsed,
        isMultiLevelOptionUsed,
        productOptionListData,
    } = useProductOption({
        productNo,
    });

    const { data: additionalDiscountByProductNosData } =
        useAdditionalDiscountByProductNos({
            searchParams: { productNos: [productNo] },
        });

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

    const onCouponDownloadClick = () => {
        overlay.open((props) => {
            return isMobile ? (
                <ProductCouponBottomSheet productNo={productNo} {...props} />
            ) : (
                <ProductCouponModal productNo={productNo} {...props} />
            );
        });
    };

    const overlayData = useOverlayData();
    const isOptionBottomSheetOpen =
        overlayData[OVERLAY_ID.OPTION_BOTTOM_SHEET]?.isOpen;
    const openOptionBottomSheet = () => {
        overlay.open(
            (props) => (
                <OptionSelectBottomSheet {...props} productNo={productNo} />
            ),
            {
                overlayId: OVERLAY_ID.OPTION_BOTTOM_SHEET,
            },
        );
    };

    const { onFlatOptionChange, onMultiOptionChange } = useProductOptionChange({
        productNo,
    });

    const addGuestCartItem = useCartStore((state) => state.addItem);
    const { selectedOptionList, addOption, clearOptions } =
        useProductOptionStore();

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

    const totalPrice = pipe(
        selectedOptionList,
        map((option) => option.buyPrice * option.orderCnt),
        sum,
    );

    const {
        register: { mutate: registerCartMutate },
    } = useCartMutation();
    const { addToast } = useToast();

    const onGiftButtonClick = () => {
        if (isTablet && !isOptionBottomSheetOpen) {
            openOptionBottomSheet();
            return;
        }

        if (selectedOptionList.length === 0) {
            addToast({ message: '옵션을 선택해 주세요.' });
            return;
        }

        writeOrderSheetMutate({
            data: {
                products: pipe(
                    selectedOptionList,
                    map((a) => toOrderSheetOption(a, channelType)),
                    toArray,
                ),
                productCoupons: [],
            },
            type: 'gift',
        });
    };

    const onCartButtonClick = () => {
        if (isTablet && !isOptionBottomSheetOpen) {
            openOptionBottomSheet();
            return;
        }

        if (isLogin) {
            registerCartMutate(
                {
                    data: pipe(
                        selectedOptionList,
                        map((a) => toOrderSheetOption(a, channelType)),
                        toArray,
                    ),
                },
                {
                    onSuccess: () => {
                        openAddCartDialog();

                        queryClient.invalidateQueries({
                            predicate: (query) => {
                                return includes(query.queryKey[0], [
                                    ...cartKeys.all,
                                ]);
                            },
                        });

                        if (!isDefaultOptionUsed) {
                            clearOptions();
                        }
                    },
                },
            );
        } else {
            selectedOptionList.forEach((option) => {
                addGuestCartItem({
                    productNo: option.productNo,
                    optionNo: option.optionNo,
                    orderCnt: option.orderCnt,
                });
            });

            openAddCartDialog();

            if (!isDefaultOptionUsed) {
                clearOptions();
            }
        }
    };

    const {
        write: { mutate: writeOrderSheetMutate },
    } = useOrderSheetMutation();

    const onOrderButtonClick = () => {
        if (isTablet && !isOptionBottomSheetOpen) {
            openOptionBottomSheet();
            return;
        }

        writeOrderSheetMutate({
            data: {
                products: pipe(
                    selectedOptionList,
                    map((a) => toOrderSheetOption(a, channelType)),
                    toArray,
                ),
                productCoupons: [],
            },
        });
    };

    const { addRecentProduct } = useRecentViewProducts();

    useEffect(() => {
        addRecentProduct(productNo);
    }, []);

    useSb({
        product: productDetailData,
    });

    return (
        <div className={styles.container}>
            <div className={styles.mainSection}>
                <div className={styles.leftColumn}>
                    <div className={styles.thumbnailContainer}>
                        <ProductMainImage productNo={productNo} />
                    </div>

                    {!isTablet && (
                        <div style={{ marginTop: '40px' }}>
                            <ProductTabs
                                reviewCount={counter.reviewCnt || 0}
                                inquiryCount={counter.inquiryCnt || 0}
                                productContent={productContent}
                                productDetailData={productDetailData}
                            />
                        </div>
                    )}
                </div>

                <div className={styles.content} data-lenis-prevent>
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
                                    size={20}
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

                        <button
                            className={styles.likeButton}
                            onClick={onLikeButtonClick(productNo, liked)}
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
                                    {CURRENCY(price.salePrice).format()}
                                </span>
                            )}
                            <div className={styles.priceContainer}>
                                {discountRate > 0 && (
                                    <span className={styles.discountRate}>
                                        {discountRate}%
                                    </span>
                                )}
                                <span className={styles.finalPrice}>
                                    {CURRENCY(finalPrice).format()}
                                </span>
                            </div>
                        </div>
                        <button
                            className={styles.couponButton}
                            onClick={onCouponDownloadClick}
                        >
                            쿠폰 받기
                        </button>
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

                    <PhotoReview />

                    {!isTablet && (
                        <>
                            <hr className={styles.optionDivider} />

                            <div className={styles.optionContainer}>
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

                                <SelectedProductOption
                                    isRemovable={!isDefaultOptionUsed}
                                />
                            </div>

                            <div className={styles.orderContainer}>
                                <hr className={styles.buttonDivider} />

                                <div className={styles.totalPriceContainer}>
                                    <p className={styles.totalPriceTitle}>
                                        총 상품금액
                                    </p>
                                    <p className={styles.totalPrice}>
                                        {CURRENCY(totalPrice).format()}
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

            <div className={styles.bottomSticky}>
                <button
                    className={styles.giftButton}
                    onClick={onGiftButtonClick}
                >
                    <Gift size={24} color='#333' />
                </button>
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
                    <div style={{ padding: '100px', textAlign: 'center' }}>
                        상품 정보를 불러오는 중입니다...
                    </div>
                }
            >
                <ProductDetailView productNo={productNo} />
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
                `${brand?.name ? `[${brand.name}] ` : ''}${baseInfo.productName} 상품을 만나보세요.`;

            const image =
                baseInfo.imageUrls?.[0] ||
                baseInfo.imageUrlInfo?.[0]?.url ||
                '';

            const finalPrice =
                price.salePrice -
                (price.immediateDiscountAmt || 0) -
                (price.additionDiscountAmt || 0);

            const url = `${process.env.NEXT_PUBLIC_BASE_URL || ''}/products/${productNo}`;

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
                    revalidate: 10,
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
        revalidate: 60 * 60, // 1시간
    };
};
