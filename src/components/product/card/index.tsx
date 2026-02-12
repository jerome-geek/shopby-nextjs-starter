'use client';

import Link from 'next/link';

import {
    HeartLikeFilledSmallIcon,
    HeartLikeSmallIcon,
    HeartMiniIcon,
    SmallCaretIcon,
    StarMiniIcon,
} from '@/components/icons';
import { PATHS } from '@/const/paths';
import { useProductProfileMutation } from '@/hooks/mutations';
import { useAuth } from '@/hooks/useAuth';
import useDialog from '@/hooks/useDialog';
import { StickerInfo } from '@/models/display';
import { ImageUrlType } from '@/models/product';
import { CURRENCY } from '@/utils/currency';
import { normalizeImageUrl } from '@/utils/shopby';

import * as styles from './index.css';

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
        <article className={styles.container}>
            <Link
                href={`${PATHS.PRODUCTS.MAIN}/${productNo}`}
                className={styles.thumbWrapper}
            >
                <img
                    src={normalizeImageUrl(imageUrlInfo[0].url)}
                    alt={`${productName} 상품 이미지`}
                    className={styles.thumb}
                />

                <button
                    className={styles.likeButton}
                    onClick={onLikeButtonClick}
                >
                    {liked ? (
                        <HeartLikeFilledSmallIcon />
                    ) : (
                        <HeartLikeSmallIcon />
                    )}
                </button>
            </Link>

            <div className={styles.content}>
                <div className={styles.brandInfoWrapper}>
                    {brandName && (
                        <Link
                            prefetch={false}
                            href={`${PATHS.BRANDS.MAIN}/${brandNo}`}
                            className={styles.brand}
                        >
                            <span>{brandName}</span>
                            <SmallCaretIcon direction="right" />
                        </Link>
                    )}

                    <h3 className={styles.name}>{productName}</h3>
                </div>

                <div className={styles.priceArea}>
                    <div className={styles.priceWrapper}>
                        <span className={styles.productPrice}>
                            {CURRENCY(salePrice, { precision: 0 })
                                .subtract(immediateDiscountAmt)
                                .subtract(additionDiscountAmt)
                                .format()}
                        </span>
                    </div>

                    {stickerInfos && stickerInfos.length > 0 && (
                        <ul className={styles.stickerList}>
                            {stickerInfos.map((sticker) => {
                                return (
                                    <li key={`product-sticker-${sticker.name}`}>
                                        {sticker.type === 'IMAGE' && (
                                            <img
                                                src={normalizeImageUrl(
                                                    sticker.label,
                                                )}
                                                alt={sticker.label}
                                                width={20}
                                                height={20}
                                            />
                                        )}
                                        {sticker.type === 'TEXT' && (
                                            <span
                                                className={styles.textSticker}
                                            >
                                                {sticker.label}
                                            </span>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    <ul className={styles.statsList}>
                        <li className={styles.statItem}>
                            <StarMiniIcon />
                            <span>{`${reviewRating} (${totalReviewCount})`}</span>
                        </li>
                        <li className={styles.statItem}>
                            <HeartMiniIcon />
                            <span>{likeCount}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
