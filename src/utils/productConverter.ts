import { GetProductSectionByIdResponse, ProductSectionProduct } from "@/models/display/productSection";
import { BestSellerProductItem, SearchProductItem } from "@/models/product/product";

export const transformProductData = (
    item: BestSellerProductItem | SearchProductItem
): ProductSectionProduct => {
    // ProductCard에서 실제로 사용하는 필드 변환
    const base = {
        ...item,
        imageUrlInfo: (item.imageUrlInfo || []).map((img, index) => ({
            isMain: index === 0,
            imageUrlType: img.imageUrlType || img.type || 'IMAGE_URL',
            url: img.url,
        })),
        stickerInfos: (item.stickerInfos || []).map((sticker) => ({
            label: sticker.label,
            type: sticker.type,
        })),
        customProperties: (item.customProperties || []).map((prop) => ({
            isMultipleSelection: prop.isMultipleSelection ?? false,
            propValueNo: prop.propValueNo,
            propertyType: (prop.propType || 'STRING') as any,
            propValue: prop.propValue,
            propName: prop.propName,
            propNo: prop.propNo,
        })),
        optionValues: (item.optionValues || []).map((opt) => ({
            optionValue: opt.optionValue,
            stockCnt: opt.stockCnt,
            mallProductNo: opt.mallProductNo,
            stockNo: 0,
        })),
        rentalInfos: (item.rentalInfos || []).map((rental) => ({
            monthlyRentalAmount: rental.monthlyRentalAmount,
            prePayment: 0,
            rentalPeriod: rental.rentalPeriod,
            creditRating: rental.creditRating,
        })),
        listImageUrlInfo: Array.isArray(item.listImageUrlInfo)
            ? item.listImageUrlInfo.map((img) => ({
                  imageUrlType: img.imageUrlType || img.type || 'IMAGE_URL',
                  url: img.url,
              }))
            : item.listImageUrlInfo
              ? [
                    {
                        imageUrlType:
                            item.listImageUrlInfo.imageUrlType ||
                            item.listImageUrlInfo.type ||
                            'IMAGE_URL',
                        url: item.listImageUrlInfo.url,
                    },
                ]
              : [],
        unitPriceInfo: item.unitPrice || {
            price: 0,
            name: '',
            type: '',
        },
        accumulationUseInfo: {
            usable: item.accumulationUseInfo.useable ?? false,
            accumulationInfo: item.accumulationUseInfo.accumulationInfo,
        },
        productSalePeriodType: item.productSalePeriodType as any,
        salePeriodType: item.productSalePeriodType as any,
        immediateDiscountUnitType: item.immediateDiscountUnitType as any,
        additionDiscountUnitType: item.additionDiscountUnitType as any,
    };

    return {
        ...base,
        sectionProductEndYmdt: '',
        sectionProductStartYmdt: '',
        displayOrder: 0,
        couponTag: '',
        accumulateCalculateModel: {
            rewardRateOfMemberBenefit: 0,
            amount: item.accumulationAmtWhenBuyConfirm || 0,
            rewardRateOfProduct: 0,
        },
        searchProductId: '',
    } as ProductSectionProduct;
};

// 섹션 정보 생성
export const createSectionData = (
    label: string,
    sectionId: string,
    displayableStock: boolean,
    totalCount: number
): GetProductSectionByIdResponse => ({
    label,
    sectionNo: 0,
    sectionId,
    displayableStock,
    leftSpaceColor: '',
    productTotalCount: totalCount,
    rightSpaceColor: '',
    recommendProducts: [],
    products: [],
    promotionText: '',
    displayConfig: {
        displayHeight: 1,
        displayType: 'LIST' as const,
        displayWidth: 6,
    },
    sectionExplain: '',
    imageUrl: '',
});