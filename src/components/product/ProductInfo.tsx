import { join, pipe, split } from '@fxts/core';
import Link from 'next/link';

import { productOption } from '@/api/product';
import { getCachedProductDetail } from '@/api/product/product.server';
import { StarIcon } from '@/components/icons';
import ProductActionButtons from '@/components/product/detail/ProductActionButtons';
import LikeButton from '@/components/product/LikeButton';
import {
    FlatProductOption,
    MultiProductOption,
} from '@/components/product/option';
import SelectedOptionList from '@/components/product/SelectedOptionList';
import { getTranslation } from '@/i18n/server';
import { FlatOption } from '@/models/product/productOption';
import { css } from '@/styled-system/css';
import { flex, vstack } from '@/styled-system/patterns';
import { token } from '@/styled-system/tokens';
import { getDiscountRate, KRW } from '@/utils/currency';

type ProductDetailPageProps = AppPageProps<'/products/[productNo]'>;

export default async function ProductInfo(props: ProductDetailPageProps) {
    const { t } = await getTranslation();

    const params = await props.params;
    const productNo = Number(params.productNo);

    const searchParams = await props.searchParams;
    const channelType = searchParams.channelType;
    const preview = searchParams.preview || false;

    const productDetailData = await getCachedProductDetail(productNo, {
        preview,
        channelType,
    });

    const productOptionData = await productOption
        .getProductOption(productNo, {
            preview,
            // channelType,
        })
        .json();

    const isFlatOptionUsed =
        !!productOptionData &&
        productOptionData.selectType === 'FLAT' &&
        productOptionData.type === 'COMBINATION' &&
        productOptionData.flatOptions.length > 0;

    const isMultiLevelOptionUsed =
        !!productOptionData &&
        productOptionData.selectType === 'MULTI' &&
        productOptionData.type === 'COMBINATION' &&
        productOptionData.multiLevelOptions.length > 0;

    const brand = productDetailData.brand;
    const productName = productDetailData.baseInfo.productName;
    const liked = productDetailData.liked;
    const likeCnt = productDetailData.counter.likeCnt || 0;
    const reviewRate = productDetailData.reviewRate;
    const reviewCnt = productDetailData.counter.reviewCnt || 0;
    const { salePrice, immediateDiscountAmt, additionDiscountAmt } =
        productDetailData.price;

    const discountRate = getDiscountRate(salePrice, immediateDiscountAmt);
    const discountPrice = KRW(salePrice)
        .subtract(immediateDiscountAmt)
        .format();

    const maxDiscountRate = getDiscountRate(
        salePrice,
        immediateDiscountAmt,
        additionDiscountAmt, // 없으면 undefined가 넘어가도 0으로 처리됨
    );
    const maxDiscountPrice = KRW(salePrice)
        .subtract(immediateDiscountAmt)
        .subtract(additionDiscountAmt)
        .format();

    const getFlatOptionLabel = (option: FlatOption) => {
        const value = pipe(option.value, split('|'), join(' / '));

        if (option.saleType === 'SOLDOUT') {
            return `${value} - ${t('품절')}`;
        }

        if (option.addPrice > 0) {
            // return `${value} ${addPriceString(option.addPrice)}`;
            return value;
        }

        return value;
    };

    return (
        <div
            className={vstack({
                alignItems: 'stretch',
                gap: { base: '16px', md: '24px' },
            })}
        >
            <div
                className={flex({
                    flexDirection: 'column',
                    gap: '12px',
                })}
            >
                <div
                    className={flex({
                        flexDirection: 'column',
                        gap: { base: '4px', md: '8px' },
                    })}
                >
                    <div
                        className={flex({
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        })}
                    >
                        {brand && (
                            // TODO: base 체크
                            <Link
                                href={`/brands/${brand.brandNo}`}
                                className={css({
                                    textStyle: 'heading.semibold',
                                    color: 'gray80',
                                })}
                            >
                                <span>{brand.name}</span>
                            </Link>
                        )}

                        <LikeButton
                            productNo={productNo}
                            liked={liked}
                            likeCnt={likeCnt}
                        />
                    </div>
                    <h1
                        className={css({
                            textStyle: {
                                base: 'headline2.bold',
                                md: 'title2.semibold',
                            },
                        })}
                        dangerouslySetInnerHTML={{ __html: productName }}
                    />
                </div>

                <div
                    className={flex({ alignItems: 'center', gap: '4px' })}
                    role='img'
                    aria-label={`평점 ${reviewRate}점`}
                >
                    <div
                        className={flex({
                            gap: '1px',
                            transform: 'translateY(1px)', // 시각적 중앙을 맞추기 위한 미세 조정
                        })}
                        aria-hidden='true'
                    >
                        {[1, 2, 3, 4, 5].map((num) => {
                            const displayRate = reviewRate;
                            const fill =
                                displayRate >= num
                                    ? 100
                                    : displayRate > num - 1
                                      ? (displayRate % 1) * 100
                                      : 0;
                            return <StarIcon key={num} fillPercentage={fill} />;
                        })}
                    </div>
                    <span
                        className={css({
                            textStyle: 'caption.regular',
                            color: 'gray80',
                        })}
                    >{`${reviewRate}(${reviewCnt})`}</span>
                </div>
            </div>

            <div>
                <div>
                    <p
                        className={css({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            textStyle: {
                                base: 'heading.bold',
                                md: 'title1.bold',
                            },
                        })}
                    >
                        {discountRate && (
                            <b className={css({ color: token('colors.red') })}>
                                {discountRate}
                            </b>
                        )}

                        {discountPrice}
                    </p>
                    <p
                        className={css({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            textStyle: {
                                base: 'heading.bold',
                                md: 'title1.bold',
                            },
                        })}
                    >
                        {maxDiscountRate && (
                            <b className={css({ color: token('colors.red') })}>
                                {maxDiscountRate}
                            </b>
                        )}
                        {maxDiscountPrice}
                    </p>
                </div>
            </div>

            <hr
                className={css({
                    border: `1px solid ${token('colors.gray20')}`,
                })}
            />

            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    fontSize: '1.4rem',
                    lineHeight: '1.6',
                })}
            >
                {/* 
                   TODO: 배송/혜택 데이터 매핑 가이드
                   - 배송비: productDetailData.deliveryFee.deliveryAmt (0이면 무료)
                   - 무료배송조건: productDetailData.deliveryFee.defaultDeliveryConditionLabel
                   - 추가배송비: productDetailData.deliveryFee.remoteDeliveryAreaFees (존재할 경우)
                   - 배송 정보: productDetailData.shippingInfo.shippingConfig.shippingAreaType (PARTNER: 업체배송, M_MALL: 자체배송)
                   - 배송 시작 안내: productDetailData.baseInfo.deliveryCustomerInfo
                   - 포인트 적립: productDetailData.price.accumulationAmtWhenBuyConfirm
                */}

                {/* 배송비 */}
                <dl className={flex({ gap: '20px' })}>
                    <dt className={css({ width: '80px', color: 'gray70' })}>
                        배송비
                    </dt>
                    <dd className={css({ color: 'gray90' })}>
                        <p className={css({ fontWeight: '600' })}>3,000원</p>
                        <p
                            className={css({
                                fontSize: '1.3rem',
                                color: 'gray60',
                            })}
                        >
                            50,000원 이상 구매시 무료배송
                        </p>
                        <p
                            className={css({
                                fontSize: '1.3rem',
                                color: 'gray60',
                            })}
                        >
                            제주도 포함 도서/산간 추가 배송비 3,000원
                        </p>
                    </dd>
                </dl>
                {/* 배송 정보 */}
                <dl className={flex({ gap: '20px' })}>
                    <dt className={css({ width: '80px', color: 'gray70' })}>
                        배송 정보
                    </dt>
                    <dd className={css({ color: 'gray90' })}>
                        <p>업체배송</p>
                        <p
                            className={css({
                                fontSize: '1.3rem',
                                color: 'gray60',
                            })}
                        >
                            결제 완료 후 2일 이내 배송 시작
                        </p>
                    </dd>
                </dl>
                {/* 추가 혜택 */}
                <dl className={flex({ gap: '20px' })}>
                    <dt className={css({ width: '80px', color: 'gray70' })}>
                        {t('추가 혜택')}
                    </dt>
                    <dd className={css({ color: 'gray90' })}>
                        {/* <p>135포인트 적립</p> */}
                        <p>
                            {t('{{accumulationAmtWhenBuyConfirm}}포인트 적립', {
                                accumulationAmtWhenBuyConfirm:
                                    productDetailData.price
                                        .accumulationAmtWhenBuyConfirm,
                            })}
                        </p>
                    </dd>
                </dl>
            </div>

            <div>{/* TODO: 브랜드영역 */}</div>

            <hr
                className={css({
                    border: `1px solid ${token('colors.gray20')}`,
                })}
            />

            <div
                className={vstack({
                    gap: '8px',
                    width: '100%',
                })}
            >
                {isFlatOptionUsed && (
                    <FlatProductOption
                        productOptionListData={productOptionData}
                        isOptionDisabled={(option) =>
                            option.value === 'disabled'
                        }
                        getFlatOptionLabel={getFlatOptionLabel}
                        // onChange={(e) => console.log(e)}
                        // onChange={onFlatOptionChange}
                        // checkOptionDisabled={(option) =>
                        //     pipe(option, isOptionDisabled, not)
                        // }
                    />
                )}

                {isMultiLevelOptionUsed && (
                    <MultiProductOption
                        productOptionListData={productOptionData}
                        // onChange={onMultiOptionChange}
                        // onChange={(e) => console.log(e)}
                    />
                )}
            </div>

            <SelectedOptionList />

            <ProductActionButtons
                productNo={productNo}
                liked={liked}
                likeCnt={likeCnt}
            />
        </div>
    );
}
