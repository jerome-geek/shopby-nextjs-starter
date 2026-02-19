'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/product/card';
import * as styles from './index.css';
import { useProductSectionProductList } from '@/hooks/query/display/productSection';
import { Button } from '@/components/ui/button';
import { useAdditionalDiscountByProductNos } from '@/hooks/query/product/additionalDiscount';

const calculateTimeLeft = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight.getTime() - now.getTime();

    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };

    return {
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
};

const formatNumber = (n: number) => n.toString().padStart(2, '0');

const CountdownTimer = () => {
    const [mounted, setMounted] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const initTimer = () => {
            setMounted(true);
            setTimeLeft(calculateTimeLeft());
        };

        const timerId = setTimeout(initTimer, 0);
        const intervalId = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => {
            clearTimeout(timerId);
            clearInterval(intervalId);
        };
    }, []);

    if (!mounted) return <div className={styles.timer}>-- : -- : --</div>;

    return (
        <div className={styles.timer}>
            {`${formatNumber(timeLeft.hours)} : ${formatNumber(timeLeft.minutes)} : ${formatNumber(timeLeft.seconds)}`}
        </div>
    );
};

export default function TimeSale() {
    const { data: productSectionProductListData } =
        useProductSectionProductList({
            sectionId: 'TIMESALE-LIFE',
            searchParams: {
                by: 'ADMIN_SETTING',
                direction: 'DESC',
                soldout: false,
                saleStatus: 'RESERVATION_AND_ONSALE',
                pageNumber: 1,
                pageSize: 15,
                hasOptionValues: false,
                includeStopProduct: false,
            },
        });
    console.log(
        '🚀 ~ TimeSale ~ productSectionProductListData:',
        productSectionProductListData,
    );

    const filteredProducts = useMemo(() => {
        return (
            productSectionProductListData?.products
                // ?.filter((product) => (product.additionDiscountAmt || 0) > 0)
                .map((product) => ({
                    ...product,
                    imageUrlInfo: product.imageUrlInfo?.map((img) => ({
                        url: img.url,
                        type: 'IMAGE_URL' as const,
                    })),
                    stickerInfos:
                        product.stickerInfos?.map((sticker) => ({
                            type: sticker.type,
                            label: sticker.label,
                            name: sticker.label,
                        })) || [],
                })) || []
        );
    }, [productSectionProductListData?.products]);

    // const { data: additionalDiscountData } = useAdditionalDiscountByProductNos({
    //     searchParams: {
    //         productNos: filteredProducts.map((product) => product.productNo),
    //     },
    // });
    // console.log(
    //     '🚀 ~ TimeSale ~ additionalDiscountData:',
    //     additionalDiscountData,
    // );

    if (filteredProducts.length === 0) {
        return null;
    }

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <div className={styles.titleWrapper}>
                    <div className={styles.titleRow}>
                        <h2 className={styles.title}>오늘만 특가</h2>
                        <CountdownTimer />
                    </div>
                    <p className={styles.subtitle}>
                        매일 오전 10시 새 업데이트
                    </p>
                </div>
                <Link
                    prefetch={false}
                    href="/products"
                    className={styles.viewAll}
                >
                    전체보기
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M9 18l6-6-6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Link>
            </div>

            <ul className={styles.productGrid}>
                {filteredProducts.map((product) => (
                    <li key={product.productNo} className={styles.productItem}>
                        <ProductCard
                            productNo={product.productNo}
                            productName={product.productName}
                            brandName={product.brandName}
                            brandNo={product.brandNo}
                            salePrice={product.salePrice}
                            immediateDiscountAmt={product.immediateDiscountAmt}
                            additionDiscountAmt={product.additionDiscountAmt}
                            imageUrlInfo={product.imageUrlInfo}
                            stickerInfos={product.stickerInfos}
                            likeCount={product.likeCount}
                            liked={product.liked}
                            reviewRating={product.reviewRating}
                            totalReviewCount={product.totalReviewCount}
                            isAdditionalDiscount
                        />
                    </li>
                ))}
            </ul>

            <Button type="button" frame="solid" variant="primary">
                <span>라이프 타임특가 더보기</span>
            </Button>
        </section>
    );
}
