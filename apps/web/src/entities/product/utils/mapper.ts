import type { ProductWishItem } from '@/models/product';
import { AdditionalDiscountWithProductNo } from '@/models/product/additionalDiscount';
import type { RecentViewProductsContents } from '@/models/product/profile';
import { isEmpty } from '@fxts/core';

/**
 * 위시 리스트의 이미지 추출 로직
 */
export const pickWishListImages = (product: ProductWishItem) => {
    if (!isEmpty(product.listImageInfo)) {
        return product.listImageInfo;
    }

    return product.imageInfo ?? [];
};

/**
 * 최근 본 상품 리스트의 이미지 추출 로직
 */
export const pickRecentListImages = (product: RecentViewProductsContents) => {
    if (!isEmpty(product.listImageUrlInfo)) {
        return [product.listImageUrlInfo];
    }

    return [product.imageUrlInfo];
};

/**
 * 최근 본 상품 모델을 ProductCard용 Props 모델로 변환하는 매퍼
 */
export const toRecentProductCardModel = (
    product: RecentViewProductsContents & {
        additionalDiscount?: Nullable<AdditionalDiscountWithProductNo>;
    },
) => {
    return {
        productNo: product.productNo,
        productName: product.productName,
        imageUrlInfo: pickRecentListImages(product),
        brandNo: product.brandNo,
        brandName:
            product.brandNameKo ||
            product.brandNameEn ||
            product.brandName ||
            '',
        stickerInfos: product.stickerInfos ?? [],
        likeCount: product.likeCount,
        liked: product.liked,
        reviewRating: product.reviewRating,
        totalReviewCount: product.totalReviewCount,
        salePrice: product.salePrice,
        immediateDiscountAmt: product.immediateDiscountAmt,
        additionDiscountAmt: product.additionDiscountAmt,
        couponDiscountAmt: product.couponDiscountAmt,
        additionalDiscount: product.additionalDiscount,
        deliveryConditionType: product.deliveryConditionType,
    };
};

/**
 * 찜한 상품 모델을 ProductCard용 Props 모델로 변환하는 매퍼
 */
export const toWishProductCardModel = (
    product: ProductWishItem & {
        additionalDiscount?: Nullable<AdditionalDiscountWithProductNo>;
    },
) => {
    return {
        productNo: product.productNo,
        productName: product.productName,
        imageUrlInfo: pickWishListImages(product),
        brandNo: product.brandNo,
        brandName:
            product.brandNameKo ||
            product.brandNameEn ||
            product.brandName ||
            '',
        stickerInfos: product.stickerInfos ?? [],
        likeCount: product.likeCount,
        liked: product.liked,
        reviewRating: product.reviewRating,
        totalReviewCount: product.totalReviewCount,
        salePrice: product.salePrice,
        immediateDiscountAmt: product.immediateDiscountAmt,
        additionDiscountAmt: product.additionDiscountAmt,
        additionalDiscount: product.additionalDiscount,
        isHideLikeButton: true,
    };
};
