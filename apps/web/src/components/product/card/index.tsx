import Link from 'next/link';

import { ThumbnailBookmarkIcon } from '@/components/icons/ThumbnailBookmarkIcon';
import ProductAdditionalDiscount from '@/components/product/additional-discount';
import * as styles from '@/components/product/card/index.css';
import { PATHS } from '@/const/paths';
import useProductLike from '@/hooks/useProductLike';
import type { StickerInfo } from '@/models/display';
import type { ImageUrlType } from '@/models/product';
import { AdditionalDiscountWithProductNo } from '@/models/product/additionalDiscount';
import { CURRENCY } from '@/utils/currency';
import { normalizeImageUrl } from '@/utils/shopby';

export interface ProductCardProps {
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
    isHideLikeButton?: boolean;
    rank?: number;
    isTimeSaleEnabled?: boolean;
    additionalDiscount?: Nullable<AdditionalDiscountWithProductNo>;
}

const ProductCard = ({
    productNo,
    productName,
    imageUrlInfo,
    brandNo,
    brandName,
    stickerInfos,
    liked,
    salePrice,
    immediateDiscountAmt = 0,
    additionDiscountAmt = 0,
    isHideLikeButton = false,
    rank,
    isTimeSaleEnabled = true,
    additionalDiscount,
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

                {!isHideLikeButton && (
                    <button
                        className={styles.likeButton}
                        onClick={onLikeButtonClick(productNo, liked)}
                    >
                        <ThumbnailBookmarkIcon isActive={liked} />
                    </button>
                )}

                {rank && <span className={styles.rank}>{rank}</span>}
            </Link>

            {additionalDiscount && (
                <ProductAdditionalDiscount
                    type='thumbnail'
                    isTimeSaleEnabled={isTimeSaleEnabled}
                    additionalDiscount={additionalDiscount}
                />
            )}

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
