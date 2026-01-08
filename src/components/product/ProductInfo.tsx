'use client';

import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { token } from '@/styled-system/tokens';
import Link from 'next/link';

import { HeartIcon, StarIcon } from '@/components/icons';
import { Price } from '@/models/product';
import { Brand } from '@/models/product/product';
import { getDiscountRate, KRW } from '@/utils/currency';

interface ProductInfoProps {
    productName: string;
    brand?: Brand;
    likeCnt: number;
    reviewCnt: number;
    reviewRate: number;
    price: Price;
}

export default function ProductInfo({
    productName,
    brand,
    likeCnt,
    reviewCnt,
    reviewRate,
    price,
}: ProductInfoProps) {
    const { salePrice, immediateDiscountAmt, additionDiscountAmt } = price;

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

    const onLikeButtonClick = () => {
        console.log('like button clicked');
    };

    return (
        <div
            className={flex({
                flexDirection: 'column',
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

                        <button
                            className={css({ marginLeft: 'auto' })}
                            onClick={onLikeButtonClick}
                        >
                            <HeartIcon />
                            <span
                                className={css({
                                    fontSize: '1rem',
                                    lineHeight: '1.4',
                                    letterSpacing: '-2%',
                                    fontWeight: '500',
                                    color: token('colors.gray70'),
                                })}
                            >
                                {likeCnt}
                            </span>
                        </button>
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
                            const displayRate = 4.5;
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
                        <b className={css({ color: token('colors.red') })}>
                            {discountRate}
                        </b>
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
                        <b className={css({ color: token('colors.red') })}>
                            {maxDiscountRate}
                        </b>
                        {maxDiscountPrice}
                    </p>
                </div>
            </div>

            <hr
                className={css({
                    border: `1px solid ${token('colors.gray20')}`,
                })}
            />

            <div>11</div>

            <div>{/* TODO: 브랜드영역 */}</div>

            <hr
                className={css({
                    border: `1px solid ${token('colors.gray20')}`,
                })}
            />

            <div>옵션영역</div>

            <div>예상결제금액</div>

            <div>버튼영역</div>
        </div>
    );
}
