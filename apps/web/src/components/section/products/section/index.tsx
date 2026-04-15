import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import { ProductsSearchResponse } from '@/models/product/product';
import * as styles from '@/components/section/products/section/index.css';
import { BREAKPOINTS } from '@/styles/media';
import { ProductCard } from '@/components/product';

import 'swiper/css';

const Products = ({
    title,
    description,
    products,
}: {
    title: string;
    description: string;
    products: ProductsSearchResponse;
}) => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(
        null,
    );
    const [navState, setNavState] = useState({
        isBeginning: true,
        isEnd: false,
    });

    return (
        <section className={styles.section}>
            <div className={styles.titleContainer}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>
            </div>

            <div className={styles.swiperArea}>
                <Swiper
                    slidesPerView={2.5}
                    slidesPerGroup={1}
                    spaceBetween={16}
                    onSwiper={(swiper) => {
                        setSwiperInstance(swiper);
                        setNavState({
                            isBeginning: swiper.isBeginning,
                            isEnd: swiper.isEnd,
                        });
                    }}
                    onSlideChange={(swiper) => {
                        setNavState({
                            isBeginning: swiper.isBeginning,
                            isEnd: swiper.isEnd,
                        });
                    }}
                    breakpoints={{
                        [BREAKPOINTS.SM]: {
                            slidesPerView: 4,
                            slidesPerGroup: 4,
                            spaceBetween: 24,
                        },
                        [BREAKPOINTS.MD]: {
                            slidesPerView: 6,
                            slidesPerGroup: 6,
                            spaceBetween: 24,
                        },
                    }}
                    style={{
                        width: '100%',
                    }}
                >
                    {products.items.map((product) => (
                        <SwiperSlide key={product.productNo}>
                            <ProductCard {...product} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button
                    type='button'
                    className={styles.navPrev}
                    onClick={() => swiperInstance?.slidePrev()}
                    aria-label='이전 상품'
                    disabled={navState.isBeginning}
                >
                    <ChevronLeft width={48} height={48} strokeWidth={1} />
                </button>
                <button
                    type='button'
                    className={styles.navNext}
                    onClick={() => swiperInstance?.slideNext()}
                    aria-label='다음 상품'
                    disabled={navState.isEnd}
                >
                    <ChevronRight width={48} height={48} strokeWidth={1} />
                </button>
            </div>
        </section>
    );
};

export default Products;
