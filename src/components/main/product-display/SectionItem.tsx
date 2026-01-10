// 'use client';

// import { css } from '@/styled-system/css';
// import { token } from '@/styled-system/tokens';
// import { isEmpty } from '@fxts/core';
// import { useRouter } from 'next/navigation';
// import { Swiper, SwiperSlide } from 'swiper/react';

// import { BigCaretIcon, SmallCaretIcon } from '@/components/icons';
// import SectionSkeleton from '@/components/main/product-display/Skeleton';
// import ProductCard from '@/components/product/Card';
// import { PATHS } from '@/const/paths';
// import { useProductDisplaySwiper } from '@/hooks/main/useProductDisplaySwiper';
// import {
//     GetProductSectionByIdResponse,
//     ProductSectionProduct,
// } from '@/models/display/productSection';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// interface ProductSectionItemProps {
//     sectionData: GetProductSectionByIdResponse;
//     sectionId: string;
//     products: ProductSectionProduct[];
// }

// const SECTION_TYPE_MAP = {
//     BEST: {
//         label: '베스트',
//         path: PATHS.PRODUCTS.BEST,
//     },
//     NEW: {
//         label: '신상',
//         path: PATHS.PRODUCTS.NEW,
//     },
//     SALE: {
//         label: '세일',
//         path: PATHS.PRODUCTS.SALE,
//     },
// } as const;

// const ProductSectionItem = ({
//     sectionData,
//     sectionId,
//     products,
// }: ProductSectionItemProps) => {
//     const router = useRouter();

//     // 섹션 타입 판별
//     const sectionType = Object.keys(SECTION_TYPE_MAP).find((type) =>
//         sectionId.includes(type),
//     ) as keyof typeof SECTION_TYPE_MAP | undefined;

//     const isShowMore = !!sectionType;
//     const moreText = sectionType
//         ? `${SECTION_TYPE_MAP[sectionType].label} 더보기`
//         : '더보기';

//     const handleMoreClick = () => {
//         if (sectionType) {
//             router.push(SECTION_TYPE_MAP[sectionType].path);
//         }
//     };

//     const {
//         swiperKey,
//         swiperOptions,
//         limitedProducts,
//         productsWithEmptySlides,
//         desktopTotalPages,
//         currentPage,
//         handleNavigationClick,
//         showDesktopControls,
//         isMediaQueryReady,
//     } = useProductDisplaySwiper({ products });

//     // 미디어 쿼리가 준비되지 않았으면 스켈레톤 반환 (깜빡임 방지)
//     if (!isMediaQueryReady) {
//         return <SectionSkeleton />;
//     }

//     if (isEmpty(limitedProducts)) {
//         return (
//             <div
//                 className={css({
//                     width: '100%',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     paddingY: token('spacing.10'),
//                 })}
//             >
//                 <p>전시중인 상품이 없습니다.</p>
//             </div>
//         );
//     }

//     return (
//         <section
//             className={css({
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: { base: token('spacing.3'), md: token('spacing.5') },
//                 width: '100%',
//             })}
//         >
//             <div
//                 className={css({
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     paddingX: { base: token('spacing.5'), md: '0' },
//                 })}
//             >
//                 <h2
//                     className={css({
//                         fontSize: {
//                             base: token('fontSizes.xl'),
//                             md: 'clamp(2rem, 2vw, 3.4rem)',
//                         },
//                         fontWeight: '600',
//                         whiteSpace: 'nowrap',
//                         md: {
//                             width: '100%',
//                             height: '55px',
//                             display: 'flex',
//                             alignItems: 'center',
//                         },
//                     })}
//                 >
//                     {sectionData.label}
//                 </h2>
//                 {isShowMore && (
//                     <button
//                         type='button'
//                         aria-label='더보기'
//                         className={css({
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: { base: '1px', md: '2px' },
//                             flexShrink: 0,
//                         })}
//                         onClick={handleMoreClick}
//                     >
//                         <span
//                             className={css({
//                                 display: 'inline-block',
//                                 fontSize: {
//                                     base: token('fontSizes.xs'),
//                                     md: token('fontSizes.sm'),
//                                 },
//                                 color: token('colors.gray80'),
//                             })}
//                         >
//                             {moreText}
//                         </span>
//                         <SmallCaretIcon direction='right' />
//                     </button>
//                 )}
//             </div>

//             <div
//                 className={css({
//                     position: 'relative',
//                     width: '100%',
//                 })}
//             >
//                 <Swiper
//                     key={`${swiperKey}-${productsWithEmptySlides.length}`}
//                     {...swiperOptions}
//                 >
//                     {productsWithEmptySlides.map((product, index) => (
//                         <SwiperSlide
//                             key={product ? product.productNo : `empty-${index}`}
//                             style={
//                                 swiperKey === 'desktop'
//                                     ? {
//                                           width: `calc((100% - ${token('spacing.5')} * 5) / 6)`,
//                                       }
//                                     : undefined
//                             }
//                         >
//                             {product ? (
//                                 <ProductCard
//                                     productNo={product.productNo}
//                                     productName={product.productName}
//                                     imageUrlInfo={product.imageUrlInfo.map(
//                                         (
//                                             img: ProductSectionProduct['imageUrlInfo'][number],
//                                         ) => {
//                                             const urlType =
//                                                 img.imageUrlType as any;
//                                             return {
//                                                 imageUrlType:
//                                                     urlType.imageUrlType ||
//                                                     urlType.type ||
//                                                     'IMAGE_URL',
//                                                 type:
//                                                     urlType.imageUrlType ||
//                                                     urlType.type ||
//                                                     'IMAGE_URL',
//                                                 url: img.url,
//                                             };
//                                         },
//                                     )}
//                                     brandNo={product.brandNo}
//                                     brandName={product.brandName}
//                                     stickerInfos={product.stickerInfos.map(
//                                         (
//                                             sticker: ProductSectionProduct['stickerInfos'][number],
//                                             stickerIndex: number,
//                                         ) => ({
//                                             no: stickerIndex + 1,
//                                             name: sticker.label,
//                                             label: sticker.label,
//                                             type: sticker.type,
//                                         }),
//                                     )}
//                                     likeCount={product.likeCount}
//                                     liked={product.liked}
//                                     reviewRating={product.reviewRating}
//                                     totalReviewCount={product.totalReviewCount}
//                                     salePrice={product.salePrice}
//                                     immediateDiscountAmt={
//                                         product.immediateDiscountAmt
//                                     }
//                                     additionDiscountAmt={
//                                         product.additionDiscountAmt
//                                     }
//                                 />
//                             ) : (
//                                 // 빈 슬라이드 (데스크탑 전용)
//                                 <div
//                                     className={css({
//                                         width: '100%',
//                                         minHeight: '100%',
//                                         pointerEvents: 'auto',
//                                     })}
//                                 />
//                             )}
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>

//                 {/* 데스크탑 컨트롤 */}
//                 {showDesktopControls && (
//                     <div
//                         className={css({
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             gap: token('spacing.3'),
//                             marginTop: { base: '0', md: token('spacing.6') },
//                         })}
//                     >
//                         <button
//                             className={`product-swiper-button-prev ${css({
//                                 width: token('spacing.6'),
//                                 height: token('spacing.6'),
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 cursor: 'pointer',
//                             })}`}
//                             onClick={() => handleNavigationClick('prev')}
//                             aria-label='이전 페이지'
//                             type='button'
//                         >
//                             <BigCaretIcon
//                                 className='left-icon'
//                                 direction='left'
//                             />
//                         </button>

//                         <span
//                             className={css({
//                                 fontSize: '13px',
//                                 fontWeight: '500',
//                                 minWidth: token('spacing.12'),
//                                 textAlign: 'center',
//                                 color: token('colors.gray80'),
//                             })}
//                         >
//                             {currentPage} / {desktopTotalPages}
//                         </span>

//                         <button
//                             className={`product-swiper-button-next ${css({
//                                 width: token('spacing.6'),
//                                 height: token('spacing.6'),
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 cursor: 'pointer',
//                             })}`}
//                             onClick={() => handleNavigationClick('next')}
//                             aria-label='다음 페이지'
//                             type='button'
//                         >
//                             <BigCaretIcon
//                                 className='right-icon'
//                                 direction='right'
//                             />
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// };

// export default ProductSectionItem;

'use client';

import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';
import { isEmpty } from '@fxts/core';
import { useRouter } from 'next/navigation';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { BigCaretIcon, SmallCaretIcon } from '@/components/icons';
import SectionSkeleton from '@/components/main/product-display/Skeleton';
import ProductCard from '@/components/product/card';
import { PATHS } from '@/const/paths';
import { useProductDisplaySwiper } from '@/hooks/main/useProductDisplaySwiper';
import {
    GetProductSectionByIdResponse,
    ProductSectionProduct,
} from '@/models/display/productSection';

interface ProductSectionItemProps {
    sectionData: GetProductSectionByIdResponse;
    products: ProductSectionProduct[];
    sectionType?: string;
}

const SECTION_TYPE_MAP = {
    BEST: {
        label: '베스트',
        path: PATHS.PRODUCTS.BEST,
    },
    NEW: {
        label: '신상',
        path: PATHS.PRODUCTS.NEW,
    },
    SALE: {
        label: '세일',
        path: PATHS.PRODUCTS.SALE,
    },
} as const;

const ProductSectionItem = ({
    sectionData,
    products,
    sectionType,
}: ProductSectionItemProps) => {
    const router = useRouter();
    // 섹션 타입 판별
    const isShowMore = !!sectionType;
    const moreText = sectionType
        ? `${SECTION_TYPE_MAP[sectionType as keyof typeof SECTION_TYPE_MAP]?.label} 더보기`
        : '더보기';

    const handleMoreClick = () => {
        if (sectionType) {
            router.push(
                SECTION_TYPE_MAP[sectionType as keyof typeof SECTION_TYPE_MAP]
                    .path,
            );
        }
    };

    const {
        swiperKey,
        swiperOptions,
        limitedProducts,
        productsWithEmptySlides,
        desktopTotalPages,
        currentPage,
        handleNavigationClick,
        showDesktopControls,
        isMediaQueryReady,
    } = useProductDisplaySwiper({ products });

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
                gap: { base: token('spacing.3'), md: token('spacing.5') },
                width: '100%',
            })}
        >
            <div
                className={css({
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingX: { base: token('spacing.5'), md: '0' },
                })}
            >
                <h2
                    className={css({
                        fontSize: {
                            base: token('fontSizes.xl'),
                            md: 'clamp(2rem, 2vw, 3.4rem)',
                        },
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                        md: {
                            width: '100%',
                            height: '55px',
                            display: 'flex',
                            alignItems: 'center',
                        },
                    })}
                >
                    {sectionData.label}
                </h2>
                {isShowMore && (
                    <button
                        type='button'
                        aria-label='더보기'
                        className={css({
                            display: 'flex',
                            alignItems: 'center',
                            gap: { base: '1px', md: '2px' },
                            flexShrink: 0,
                        })}
                        onClick={handleMoreClick}
                    >
                        <span
                            className={css({
                                display: 'inline-block',
                                fontSize: {
                                    base: token('fontSizes.xs'),
                                    md: token('fontSizes.sm'),
                                },
                                color: token('colors.gray80'),
                            })}
                        >
                            {moreText}
                        </span>
                        <SmallCaretIcon direction='right' />
                    </button>
                )}
            </div>

            <div
                className={css({
                    position: 'relative',
                    width: '100%',
                })}
            >
                <Swiper
                    key={`${swiperKey}-${productsWithEmptySlides.length}`}
                    {...swiperOptions}
                >
                    {productsWithEmptySlides.map((product, index) => (
                        <SwiperSlide
                            key={product ? product.productNo : `empty-${index}`}
                            style={
                                swiperKey === 'desktop'
                                    ? {
                                          width: `calc((100% - ${token('spacing.5')} * 5) / 6)`,
                                      }
                                    : undefined
                            }
                        >
                            {product ? (
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
                            ) : (
                                // 빈 슬라이드 (데스크탑 전용)
                                <div
                                    className={css({
                                        width: '100%',
                                        minHeight: '100%',
                                        pointerEvents: 'auto',
                                    })}
                                />
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* 데스크탑 컨트롤 */}
                {showDesktopControls && (
                    <div
                        className={css({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: token('spacing.3'),
                            marginTop: { base: '0', md: token('spacing.6') },
                        })}
                    >
                        <button
                            className={`product-swiper-button-prev ${css({
                                width: token('spacing.6'),
                                height: token('spacing.6'),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                            })}`}
                            onClick={() => handleNavigationClick('prev')}
                            aria-label='이전 페이지'
                            type='button'
                        >
                            <BigCaretIcon
                                className='left-icon'
                                direction='left'
                            />
                        </button>

                        <span
                            className={css({
                                fontSize: '13px',
                                fontWeight: '500',
                                minWidth: token('spacing.12'),
                                textAlign: 'center',
                                color: token('colors.gray80'),
                            })}
                        >
                            {currentPage} / {desktopTotalPages}
                        </span>

                        <button
                            className={`product-swiper-button-next ${css({
                                width: token('spacing.6'),
                                height: token('spacing.6'),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                            })}`}
                            onClick={() => handleNavigationClick('next')}
                            aria-label='다음 페이지'
                            type='button'
                        >
                            <BigCaretIcon
                                className='right-icon'
                                direction='right'
                            />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductSectionItem;
