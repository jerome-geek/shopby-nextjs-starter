'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Price, ProductPrice } from '@/components/product/Card/index.styled';
import {
    HeartLikeFilledSmallIcon,
    HeartLikeSmallIcon,
    HeartMiniIcon,
    SmallCaretIcon,
    StarMiniIcon,
} from '@/components/icons';
import { PATHS } from '@/const/paths';
import { StickerInfo } from '@/models/display';
import { ImageUrlType } from '@/models/product';
import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';
import { CURRENCY, getDiscountRate } from '@/utils/currency';

interface ProductCardProps {
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
}

const ProductCard = ({
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
}: ProductCardProps) => {
    const onLikeButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        // TODO: 상품 좋아요 기능 구현 예정
        console.log('🚀 ~ onLikeButtonClick ~ e:', e);
    };

    return (
        <div
            className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: { base: '12px' },
            })}
        >
            <Link
                href={`${PATHS.PRODUCTS.MAIN}/${productNo}`}
                className={css({
                    display: 'block',
                    width: '100%',
                    position: 'relative',
                })}
            >
                <Image
                    src={`https:${imageUrlInfo[0].url}`}
                    alt={`${productName} 상품 이미지`}
                    width={180}
                    height={225}
                    className={css({
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '4/5', // 0.8 비율 강제
                        objectFit: 'cover',
                        borderRadius: '4px',
                    })}
                />

                <button
                    className={css({
                        position: 'absolute',
                        top: '11px',
                        right: '11px',
                        border: 'none',
                        cursor: 'pointer',
                    })}
                    onClick={onLikeButtonClick}
                >
                    {!liked ? (
                        <HeartLikeFilledSmallIcon />
                    ) : (
                        <HeartLikeSmallIcon />
                    )}
                </button>
            </Link>

            <div>
                <div
                    className={css({
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                    })}
                >
                    {brandName && (
                        <Link
                            href={`${PATHS.BRANDS.MAIN}/${brandNo}`}
                            className={css({
                                display: 'flex',
                                alignItems: 'center',
                            })}
                        >
                            <span
                                className={css({
                                    fontSize: '1.4rem',
                                    lineHeight: '1.4',
                                    letterSpacing: '-2%',
                                })}
                            >
                                {brandName}
                            </span>
                            <SmallCaretIcon direction="right" />
                        </Link>
                    )}

                    <p
                        className={css({
                            display: '-webkit-box',
                            lineClamp: 2,
                            boxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontWeight: { base: '400' },
                            fontSize: '1.4rem',
                            lineHeight: '1.4',
                            letterSpacing: '-2%',
                            color: token('colors.gray90'),
                        })}
                    >
                        {productName}
                        {productName}
                    </p>
                </div>
                <div
                    className={css({
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                    })}
                >
                    <div
                        className={css({
                            display: 'flex',
                            gap: { base: '4px' },
                        })}
                    >
                        {/* {getDiscountRate(
                            salePrice,
                            immediateDiscountAmt,
                            additionDiscountAmt
                        ).intValue !== 0 && (
                            <Price>
                                {getDiscountRate(
                                    salePrice,
                                    immediateDiscountAmt,
                                    additionDiscountAmt
                                ).format()}
                            </Price>
                        )} */}

                        <span className={ProductPrice}>
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
                                gap: '2px',
                                alignItems: 'center',
                            })}
                        >
                            {stickerInfos.map((sticker) => {
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
                                                className={css({
                                                    paddingX: '0.6rem',
                                                    backgroundColor:
                                                        token('colors.gray90'),
                                                    color: token(
                                                        'colors.white'
                                                    ),
                                                    fontSize: '1rem',
                                                    fontWeight: '600',
                                                    lineHeight: '1.5',
                                                    letterSpacing: '-2%',
                                                    borderRadius: '9999px', // pill shape
                                                    height: '20px',
                                                    display: 'flex',
                                                    alignItems: 'center',
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

                    <ul
                        className={css({
                            display: 'flex',
                            gap: '8px',
                            color: token('colors.gray70'),
                            fontSize: '1rem',
                            fontWeight: '500',
                            lineHeight: '1.4',
                            letterSpacing: '-2%',
                        })}
                    >
                        <li
                            className={css({
                                display: 'flex',
                                alignItems: 'center',
                                gap: '3px',
                            })}
                        >
                            <StarMiniIcon />
                            <span>{`${reviewRating} (${totalReviewCount})`}</span>
                        </li>
                        <li
                            className={css({
                                display: 'flex',
                                alignItems: 'center',
                                gap: '3px',
                            })}
                        >
                            <HeartMiniIcon />
                            <span>{likeCount}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
