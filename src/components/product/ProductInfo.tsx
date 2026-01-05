'use client';

import Link from 'next/link';

import { HeartIcon, StarIcon } from '@/components/icons';
import { Brand } from '@/models/product/product';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { text } from '@/styled-system/recipes';
import { token } from '@/styled-system/tokens';

interface ProductInfoProps {
    productName: string;
    brand?: Brand;
    likeCnt: number;
    reviewCnt: number;
    reviewRate: number;
}

export default function ProductInfo({
    productName,
    brand,
    likeCnt,
    reviewCnt,
    reviewRate,
}: ProductInfoProps) {
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
                                className={text({
                                    size: { base: 'heading', md: 'heading' },
                                    weight: {
                                        base: 'semibold',
                                        md: 'semibold',
                                    },
                                    color: 'gray80',
                                })}
                            >
                                <span>{brand.name}</span>
                            </Link>
                        )}

                        <button onClick={onLikeButtonClick}>
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
                        className={text({
                            size: { base: 'headline2', md: 'title2' },
                            weight: { base: 'bold', md: 'semibold' },
                        })}
                        dangerouslySetInnerHTML={{ __html: productName }}
                    />
                </div>

                <div
                    className={flex({ alignItems: 'center', gap: '4px' })}
                    role="img"
                    aria-label={`평점 ${reviewRate}점`}
                >
                    <div
                        className={flex({
                            gap: '1px',
                            transform: 'translateY(1px)', // 시각적 중앙을 맞추기 위한 미세 조정
                        })}
                        aria-hidden="true"
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
                        className={text({
                            size: 'caption',
                            weight: 'regular',
                            color: 'gray80',
                        })}
                    >{`${reviewRate}(${reviewCnt})`}</span>
                </div>
            </div>

            <div>
                <div>가격</div>
                <div>쿠폰받기 </div>
            </div>
        </div>
    );
}
