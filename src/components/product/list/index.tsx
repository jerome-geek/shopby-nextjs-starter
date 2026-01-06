'use client';

import { css, cx } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';
import Image from 'next/image';
import Link from 'next/link';

import { HeartIcon } from '@/components/icons';
import { HeartFilledIcon } from '@/components/icons/HeartFilledIcon';
import { PATHS } from '@/const/paths';
import { StickerInfo } from '@/models/display';
import { ImageUrlType } from '@/models/product';
import { badge, text } from '@/styled-system/recipes';
import { CURRENCY, discountRate } from '@/utils/currency';

interface ProductListProps {
    productNo: number;
    productName: string;
    imageUrlInfo: ImageUrlType[];
    brandNo: number;
    brandName: string;
    stickerInfos: StickerInfo[];
    likeCount: number;
    liked: boolean;
    reviewRating: number;
    totalReviewCount: number;
    salePrice: number;
    immediateDiscountAmt?: number;
    additionDiscountAmt?: number;
    productDescription?: string;
}

const ProductList = ({
    productNo,
    productName,
    imageUrlInfo,
    brandNo,
    brandName,
    stickerInfos,
    likeCount,
    liked,
    reviewRating,
    totalReviewCount,
    salePrice,
    immediateDiscountAmt = 0,
    additionDiscountAmt = 0,
    productDescription,
}: ProductListProps) => {
    const handleLikeButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        // TODO: 상품 좋아요 기능 구현 예정
        console.log('🚀 ~ handleLikeButtonClick ~ e:', e);
    };

    return (
        <Link
            href={`${PATHS.PRODUCTS.MAIN}/${productNo}`}
            className={css({
                display: 'flex',
                gap: { base: '16px' },
                width: '100%',
            })}
        >
            <div
                className={css({
                    display: 'block',
                    position: 'relative',
                    flexShrink: 0,
                    width: { base: '80px', md: '120px' },
                    borderRadius: '4px',
                    overflow: 'hidden',
                })}
            >
                <Image
                    src={`https:${imageUrlInfo[0].url}`}
                    alt={`${productName} 상품 이미지`}
                    width={120}
                    height={150}
                    className={css({
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '4/5',
                        objectFit: 'cover',
                    })}
                />
            </div>
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    gap: '4px',
                    position: 'relative',
                })}
            >
                <button
                    className={css({
                        position: 'absolute',
                        top: '3px',
                        right: '0',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                    })}
                    onClick={handleLikeButtonClick}
                    aria-label={liked ? '좋아요 취소' : '좋아요'}
                    tabIndex={0}
                >
                    {liked ? <HeartFilledIcon /> : <HeartIcon />}
                    <span
                        className={text({
                            size: 'caption',
                            weight: 'medium',
                            color: liked ? 'black' : 'gray70',
                        })}
                    >
                        {likeCount}
                    </span>
                </button>

                <div
                    className={css({
                        display: 'flex',
                        flexDirection: 'column',
                        paddingTop: { base: '4px', md: '8px' },
                        paddingRight: '40px',
                    })}
                >
                    {brandName && (
                        <span
                            className={css({
                                fontSize: '1.3rem',
                                lineHeight: '1.3',
                                letterSpacing: '-1.3%',
                                fontWeight: '600',
                                color: token('colors.black'),
                            })}
                        >
                            {brandName}
                        </span>
                    )}

                    <h3
                        className={css({
                            fontSize: '1.3rem',
                            lineHeight: '1.3',
                            letterSpacing: '-1.3%',
                            color: token('colors.gray90'),
                            display: '-webkit-box',
                            lineClamp: 1,
                            boxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        })}
                    >
                        {productName}
                    </h3>

                    {productDescription && (
                        <p
                            className={css({
                                display: '-webkit-box',
                                lineClamp: 2,
                                boxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                fontSize: '1.4rem',
                                lineHeight: '1.4',
                                letterSpacing: '-2%',
                                color: token('colors.gray70'),
                                fontWeight: '400',
                            })}
                        >
                            {productDescription}
                        </p>
                    )}
                </div>

                <div
                    className={css({
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                    })}
                >
                    <div
                        className={css({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        })}
                    >
                        {discountRate(
                            salePrice,
                            immediateDiscountAmt,
                            additionDiscountAmt,
                        ).intValue !== 0 && (
                            <span
                                // font-weight 700이 자동으로 포함됨
                                className={text({
                                    size: 'body1',
                                    weight: 'bold',
                                    color: 'red',
                                })}
                            >
                                {discountRate(
                                    salePrice,
                                    immediateDiscountAmt,
                                    additionDiscountAmt,
                                ).format()}
                            </span>
                        )}

                        <span
                            className={text({
                                size: 'body1',
                                weight: 'bold',
                                color: 'black',
                            })}
                        >
                            {CURRENCY(salePrice, { precision: 0 })
                                .subtract(immediateDiscountAmt)
                                .subtract(additionDiscountAmt)
                                .format()}
                        </span>
                    </div>

                    {stickerInfos && stickerInfos.length > 0 && (
                        <ul
                            className={css({
                                display: 'flex',
                                gap: '6px',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            })}
                        >
                            {stickerInfos.map((sticker) => {
                                const isFreeShipping =
                                    sticker.label === '무료배송';
                                return (
                                    <li key={`product-sticker-${sticker.no}`}>
                                        {sticker.type === 'IMAGE' && (
                                            <Image
                                                src={`https:${sticker.label}`}
                                                alt={sticker.label}
                                                width={20}
                                                height={20}
                                            />
                                        )}
                                        {sticker.type === 'TEXT' && (
                                            <span
                                                className={badge({
                                                    variant: isFreeShipping
                                                        ? 'light'
                                                        : 'default',
                                                })}
                                            >
                                                {sticker.label}
                                            </span>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductList;
