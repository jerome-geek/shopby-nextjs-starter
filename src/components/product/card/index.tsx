'use client';

import Link from 'next/link';

import { PATHS } from '@/const/paths';
import { useProductProfileMutation } from '@/hooks/mutations';
import { useAuth } from '@/hooks/useAuth';
import useDialog from '@/hooks/useDialog';
import { StickerInfo } from '@/models/display';
import { ImageUrlType } from '@/models/product';
import { CURRENCY } from '@/utils/currency';
import { normalizeImageUrl } from '@/utils/shopby';
import ProductAdditionalDiscount from '@/components/product/additionalDiscount';
import * as styles from './index.css';
import { ThumbnailBookmarkIcon } from '@/components/icons/ThumbnailBookmarkIcon';
import { BookmarkIcon } from '@/components/icons/BookmarkIcon';

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
    isAdditionalDiscount?: boolean;
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
    isAdditionalDiscount,
}: ProductCardProps) => {
    const { openDialog, openLoginDialog } = useDialog();

    const {
        like: { mutate: likeMutate },
    } = useProductProfileMutation();
    const isAuthenticated = useAuth();

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
                    src={normalizeImageUrl(imageUrlInfo?.[0]?.url)}
                    alt={`${productName} 상품 이미지`}
                    className={styles.thumb}
                />

                <button
                    className={styles.likeButton}
                    onClick={onLikeButtonClick}
                >
                    <ThumbnailBookmarkIcon isActive={liked} />
                </button>
            </Link>

            <ProductAdditionalDiscount type="thumbnail" productNo={productNo} />

            <div className={styles.productInfoContainer}>
                <div className={styles.brandInfoWrapper}>
                    {brandName && (
                        <Link
                            prefetch={false}
                            href={`${PATHS.BRANDS.MAIN}/${brandNo}`}
                            className={styles.brand}
                        >
                            <span>{brandName}</span>
                        </Link>
                    )}

                    <h3 className={styles.productName}>{productName}</h3>
                </div>

                <div className={styles.priceWrapper}>
                    {(immediateDiscountAmt > 0 || additionDiscountAmt > 0) && (
                        <span className={styles.discountPrice}>
                            {Math.floor(
                                ((immediateDiscountAmt + additionDiscountAmt) /
                                    salePrice) *
                                    100,
                            )}
                            %
                        </span>
                    )}
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
                                        <span className={styles.textSticker}>
                                            {sticker.label}
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </article>
    );
};

export default ProductCard;
