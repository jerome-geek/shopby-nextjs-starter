'use client';

import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';
import { isEmpty } from '@fxts/core';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import ProductCard from '@/components/product/Card';
import ProductList from '@/components/product/list';
import { PATHS } from '@/const/paths';
import useMediaQuery from '@/hooks/useMediaQuery';
import { EventProduct, GetEventResponse } from '@/models/display/event';

interface EventSectionItemProps {
    eventData: GetEventResponse;
    products: EventProduct[];
}

const EventSectionItem = ({ eventData, products }: EventSectionItemProps) => {
    const { t } = useTranslation();
    const mediaQueryResult = useMediaQuery('(max-width: 767px)');
    const isMobile = mediaQueryResult === true;
    const isMediaQueryReady = mediaQueryResult !== null;

    const displayedProducts = useMemo(() => {
        return isMobile ? products.slice(0, 2) : products.slice(0, 4);
    }, [products, isMobile]);

    if (!products || isEmpty(products)) {
        return (
            <div
                className={css({
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                })}
            >
                <p>전시중인 상품이 없습니다.</p>
            </div>
        );
    }

    const eventDetailPath = PATHS.EVENTS.DETAIL.replace(
        ':eventKey',
        String(eventData.eventNo),
    );

    return (
        <section
            className={css({
                display: 'flex',
                flexDirection: { base: 'column', md: 'row' },
                justifyContent: { base: 'center', md: 'space-between' },
                gap: { base: '16px', md: '36px' },
                width: '100%',
                paddingX: { base: '20px', md: '0' },
            })}
        >
            {/* 메인 썸네일 */}
            <Link
                href={eventDetailPath}
                className={css({
                    flex: '1',
                    minWidth: '30%',
                    maxWidth: { base: '100%', md: '372px' },
                })}
            >
                <div
                    className={css({
                        width: '100%',
                        height: '100%',
                        aspectRatio: '1/1',
                        overflow: 'hidden',
                        borderRadius: { base: '12px', md: '16px' },
                    })}
                >
                    <Image
                        src={`https:${eventData.pcImageUrl || ''}`}
                        alt={eventData.label}
                        width={372}
                        height={372}
                        className={css({
                            width: '100%',
                            objectFit: 'cover',
                        })}
                    />
                </div>
            </Link>

            <div
                className={css({
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: { base: '16px', md: '24px' },
                    maxWidth: '792px',
                })}
            >
                {/* 기획전명 + 홍보문구 */}
                <Link
                    href={eventDetailPath}
                    className={css({
                        flex: '1',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: { base: '8px', md: '12px' },
                        width: '100%',
                        maxWidth: '792px',
                    })}
                >
                    <h2
                        className={css({
                            fontSize: {
                                base: '2.2rem',
                                md: 'clamp(2rem, 2vw, 3rem)',
                            },
                            fontWeight: '700',
                            whiteSpace: 'nowrap',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        })}
                    >
                        <span
                            className={css({
                                paddingX: '10px',
                                paddingY: '4px',
                                backgroundColor: token('colors.black'),
                                borderRadius: { base: '24px', md: '16px' },
                                color: token('colors.white'),
                                textAlign: 'center',
                                fontSize: '1.3rem',
                                fontWeight: '600',
                            })}
                        >
                            {t('기획전')}
                        </span>
                        {t(`${eventData.label}`)}
                    </h2>
                    <p
                        className={css({
                            width: '100%',
                            fontSize: '1.5rem',
                            color: token('colors.gray90'),
                            textAlign: 'left',
                        })}
                    >
                        {eventData.promotionText}
                    </p>
                </Link>

                {/* 상품 레이아웃 */}
                {isMediaQueryReady && (
                    <ul
                        className={css({
                            display: { base: 'flex', md: 'grid' },
                            flexDirection: { base: 'column', md: 'row' },
                            gridTemplateColumns: {
                                md: 'repeat(4, 1fr)',
                            },
                            gap: { base: '8px', md: '24px' },
                            width: '100%',
                        })}
                    >
                        {displayedProducts.map((product) => (
                            <li key={product.productNo}>
                                {isMobile ? (
                                    <ProductList
                                        productNo={product.productNo}
                                        productName={product.productName}
                                        imageUrlInfo={product.imageUrlInfo.map(
                                            (img) => ({
                                                imageUrlType:
                                                    img.imageUrlType ||
                                                    'IMAGE_URL',
                                                type:
                                                    img.imageUrlType ||
                                                    'IMAGE_URL',
                                                url: img.url,
                                            }),
                                        )}
                                        brandNo={product.brandNo}
                                        brandName={product.brandName}
                                        stickerInfos={product.stickerInfos.map(
                                            (sticker, stickerIndex) => ({
                                                no: stickerIndex + 1,
                                                name: sticker.label,
                                                label: sticker.label,
                                                type: sticker.type,
                                            }),
                                        )}
                                        likeCount={product.likeCount}
                                        liked={product.liked}
                                        reviewRating={product.reviewRating}
                                        totalReviewCount={
                                            product.totalReviewCount
                                        }
                                        salePrice={product.salePrice}
                                        immediateDiscountAmt={
                                            product.immediateDiscountAmt
                                        }
                                        additionDiscountAmt={
                                            product.additionDiscountAmt
                                        }
                                    />
                                ) : (
                                    <ProductCard
                                        productNo={product.productNo}
                                        productName={product.productName}
                                        imageUrlInfo={product.imageUrlInfo.map(
                                            (img) => ({
                                                imageUrlType:
                                                    img.imageUrlType ||
                                                    'IMAGE_URL',
                                                type:
                                                    img.imageUrlType ||
                                                    'IMAGE_URL',
                                                url: img.url,
                                            }),
                                        )}
                                        brandNo={product.brandNo}
                                        brandName={product.brandName}
                                        stickerInfos={product.stickerInfos.map(
                                            (sticker, stickerIndex) => ({
                                                no: stickerIndex + 1,
                                                name: sticker.label,
                                                label: sticker.label,
                                                type: sticker.type,
                                            }),
                                        )}
                                        likeCount={product.likeCount}
                                        liked={product.liked}
                                        reviewRating={product.reviewRating}
                                        totalReviewCount={
                                            product.totalReviewCount
                                        }
                                        salePrice={product.salePrice}
                                        immediateDiscountAmt={
                                            product.immediateDiscountAmt
                                        }
                                        additionDiscountAmt={
                                            product.additionDiscountAmt
                                        }
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
};

export default EventSectionItem;
