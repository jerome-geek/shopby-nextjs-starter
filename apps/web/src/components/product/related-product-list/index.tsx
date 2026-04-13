import { BookmarkIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';

import * as styles from './index.css';
import useRelatedProductList from '@/hooks/query/product/product/useRelatedProductList';
import { vars } from '@/styles/theme.css';
import { PATHS } from '@/const/paths';

interface RelatedProductListProps {
    productNo?: number;
}

export default function RelatedProductList({
    productNo: productNoProps,
}: RelatedProductListProps) {
    const router = useRouter();

    const productNo = productNoProps ?? (Number(router.query.productNo) || 0);

    const { data: relatedProducts, isLoading } = useRelatedProductList({
        productNo,
        options: {
            enabled: !!productNo && productNo !== 0,
        },
    });

    if (isLoading || !relatedProducts || relatedProducts.length === 0) {
        return null;
    }

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>다른 고객이 함께 구매한 상품</h2>

            <div className={styles.swiperContainer}>
                <Swiper
                    slidesPerView={2.2}
                    spaceBetween={12}
                    breakpoints={{
                        768: {
                            slidesPerView: 3.2,
                            spaceBetween: 16,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {relatedProducts.map((product) => (
                        <SwiperSlide key={product.productNo}>
                            <div className={styles.productItem}>
                                <div className={styles.imageWrapper}>
                                    <Link
                                        href={`${PATHS.PRODUCTS.MAIN}/${product.productNo}`}
                                        prefetch={false}
                                    >
                                        <img
                                            src={product.imageUrl}
                                            alt={product.productName}
                                            className={styles.thumbnail}
                                        />
                                    </Link>
                                    <button className={styles.likeButton}>
                                        <BookmarkIcon
                                            size={20}
                                            stroke={vars.color.white}
                                            fill="none"
                                        />
                                    </button>
                                </div>
                                <Link
                                    href={`/products/${product.productNo}`}
                                    className={styles.infoLink}
                                >
                                    {/* RelatedProductInfo에 브랜드 정보가 존재할 경우 아래에 노출 */}
                                    <span className={styles.brand}>
                                        {/* TODO: 브랜드 데이터 확인 필요 (현재 mock 기반 처리 혹은 비워둠) */}
                                        브랜드명
                                    </span>
                                    <p className={styles.productName}>
                                        {product.productName}
                                    </p>
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
