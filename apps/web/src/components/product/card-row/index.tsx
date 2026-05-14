import Link from 'next/link';

import {
    ProductAdditionalDiscount,
    ProductCardProps,
} from '@/components/product';
import * as styles from '@/components/product/card-row/index.css';
import { PATHS } from '@/const/paths';
import useProductLike from '@/hooks/useProductLike';
import { CURRENCY } from '@/utils/currency';
import { normalizeImageUrl } from '@/shared/utils/shopby';

import { BookmarkIcon } from '@/components/icons/BookmarkIcon';

const ProductCardRow = ({
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
    additionalDiscount,
    isHideLikeButton = false,
    rank,
    isTimeSaleEnabled = true,
}: ProductCardProps) => {
    const { onLikeButtonClick } = useProductLike();

    return (
        <article className={styles.container}>
            <Link
                href={`${PATHS.PRODUCTS.MAIN}/${productNo}`}
                className={styles.thumbWrapper}
                prefetch={false}
            >
                <img
                    src={normalizeImageUrl(imageUrlInfo?.[0]?.url)}
                    alt={`${productName} 상품 이미지`}
                    className={styles.thumb}
                />

                {!!rank && <span className={styles.rank}>{rank}</span>}
            </Link>

            {additionalDiscount && (
                <ProductAdditionalDiscount
                    type='thumbnail'
                    additionalDiscount={additionalDiscount}
                    isTimeSaleEnabled={isTimeSaleEnabled}
                />
            )}

            <div className={styles.productInfoContainer}>
                <Link
                    href={`${PATHS.PRODUCTS.MAIN}/${productNo}`}
                    prefetch={false}
                    className={styles.brandInfoWrapper}
                >
                    {!!brandName && <span>{brandName}</span>}

                    <h3 className={styles.productName}>{productName}</h3>
                </Link>

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

            {!isHideLikeButton && (
                <button
                    className={styles.likeButton}
                    onClick={onLikeButtonClick(productNo, liked)}
                >
                    <BookmarkIcon variant={liked ? 'filled' : 'outline'} />
                </button>
            )}
        </article>
    );
};

export default ProductCardRow;
