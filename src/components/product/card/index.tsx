'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
    HeartLikeFilledSmallIcon,
    HeartLikeSmallIcon,
    HeartMiniIcon,
    SmallCaretIcon,
    StarMiniIcon,
} from '@/components/icons';
import { ProductPrice } from '@/components/product/card/index.styled';
import { PATHS } from '@/const/paths';
import { useProductProfileMutation } from '@/hooks/mutations';
import { useAuth } from '@/hooks/useAuth';
import useDialog from '@/hooks/useDialog';
import { StickerInfo } from '@/models/display';
import { ImageUrlType } from '@/models/product';
import { css } from '@/styled-system/css';
import { VStack } from '@/styled-system/jsx';
import { vstack } from '@/styled-system/patterns';
import { token } from '@/styled-system/tokens';
import { CURRENCY } from '@/utils/currency';

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
    const { openDialog, openLoginDialog } = useDialog();

    const {
        like: { mutate: likeMutate },
    } = useProductProfileMutation();

    const { isAuthenticated } = useAuth();

    const onLikeButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) {
            openLoginDialog();
            return;
        }

        likeMutate(
            {
                data: {
                    items: [
                        {
                            productNo,
                            like: liked ? 'N' : 'Y',
                        },
                    ],
                },
            },
            {
                onSuccess: () => {
                    // router.refresh();
                    openDialog({
                        message: liked
                            ? '좋아하는 상품에서 제거하였습니다.'
                            : '좋아하는 상품에 추가하였습니다.',
                    });
                },
            },
        );
    };

    return (
        <article
            className={vstack({
                alignItems: 'stretch',
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
                    {liked ? (
                        <HeartLikeFilledSmallIcon />
                    ) : (
                        <HeartLikeSmallIcon />
                    )}
                </button>
            </Link>

            <VStack alignItems='stretch' gap={{ base: 0, md: '6px' }}>
                <VStack alignItems='stretch' gap={{ base: 0, md: '4px' }}>
                    {brandName && (
                        <Link
                            prefetch={false}
                            href={`${PATHS.BRANDS.MAIN}/${brandNo}`}
                            className={css({
                                textStyle: {
                                    base: 'body2/semibold',
                                    md: 'headline1.medium',
                                },
                                display: 'flex',
                                alignItems: 'center',
                            })}
                        >
                            <span>{brandName}</span>
                            <SmallCaretIcon direction='right' />
                        </Link>
                    )}

                    <h3
                        className={css({
                            display: '-webkit-box',
                            lineClamp: { base: 1, md: 2 },
                            boxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            textStyle: {
                                base: 'body2.regular',
                                md: 'body1.regular',
                            },
                            color: token('colors.gray90'),
                        })}
                    >
                        {productName}
                    </h3>
                </VStack>

                <VStack alignItems='stretch' gap='6px'>
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
                                                        'colors.white',
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
                            textStyle: 'label/heart',
                            color: token('colors.gray70'),
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
                </VStack>
            </VStack>
        </article>
    );
};

export default ProductCard;
