import Link from 'next/link';
import { Bookmark } from 'lucide-react';

import ProductAdditionalDiscount from '@/components/product/additional-discount';
import { ProductCardProps } from '@/components/product/card';
import * as styles from '@/components/product/card-row/index.css';
import { PATHS } from '@/const/paths';
import useProductLike from '@/hooks/useProductLike';
import { CURRENCY } from '@/utils/currency';
import { normalizeImageUrl } from '@/utils/shopby';
import { vars } from '@/styles/theme.css';

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

            <ProductAdditionalDiscount
                type='thumbnail'
                productNo={productNo}
                isTimeSaleEnabled={isTimeSaleEnabled}
            />

            <div className={styles.productInfoContainer}>
                <div className={styles.brandInfoWrapper}>
                    {!!brandName && (
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

            {!isHideLikeButton && (
                <button
                    className={styles.likeButton}
                    onClick={onLikeButtonClick(productNo, liked)}
                >
                    <Bookmark
                        size={20}
                        fill={liked ? vars.color.green['100'] : 'none'}
                    />
                </button>
            )}
        </article>
    );
};

export default ProductCardRow;
