import { Swiper, SwiperSlide } from 'swiper/react';

import Skeleton from '@/components/ui/Skeleton/Skeleton';
import * as productCardStyles from '@/components/product/card/index.css';
import * as styles from '@/components/section/products/section/index.css';
import { BREAKPOINTS } from '@/styles/media';

import 'swiper/css';

const ProductCardSkeleton = () => {
    return (
        <article className={productCardStyles.container} aria-hidden='true'>
            <div className={productCardStyles.thumbWrapper}>
                <Skeleton width='100%' height='100%' />
                <Skeleton
                    width={20}
                    height={20}
                    circle
                    style={{
                        position: 'absolute',
                        bottom: '5px',
                        right: '6px',
                    }}
                />
            </div>

            <div className={productCardStyles.productInfoContainer}>
                <div className={productCardStyles.brandInfoWrapper}>
                    <Skeleton
                        width={56}
                        height={12}
                        style={{ borderRadius: 6, marginBottom: 4 }}
                    />
                    <Skeleton
                        width='90%'
                        height={14}
                        style={{ borderRadius: 6 }}
                    />
                </div>

                <div className={productCardStyles.priceWrapper}>
                    <Skeleton
                        width={54}
                        height={14}
                        style={{ borderRadius: 6 }}
                    />
                    <Skeleton
                        width={72}
                        height={14}
                        style={{ borderRadius: 6 }}
                    />
                </div>

                <div style={{ marginTop: 2 }}>
                    <Skeleton
                        width={74}
                        height={16}
                        style={{ borderRadius: 8 }}
                    />
                </div>
            </div>
        </article>
    );
};

const ProductsSectionSkeleton = ({
    titleWidth = 140,
    descriptionWidth = 200,
}: {
    titleWidth?: number;
    descriptionWidth?: number;
}) => {
    const skeletonSlides = Array.from({ length: 12 });

    return (
        <section className={styles.section} aria-busy='true'>
            <div className={styles.titleContainer}>
                <Skeleton
                    width={titleWidth}
                    height={22}
                    style={{ borderRadius: 8 }}
                />
                <Skeleton
                    width={descriptionWidth}
                    height={18}
                    style={{ borderRadius: 8 }}
                />
            </div>

            <div className={styles.swiperArea} aria-hidden='true'>
                <Swiper
                    slidesPerView={2.5}
                    slidesPerGroup={1}
                    spaceBetween={16}
                    allowTouchMove={false}
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
                    style={{ width: '100%' }}
                >
                    {skeletonSlides.map((_, idx) => (
                        <SwiperSlide key={idx}>
                            <ProductCardSkeleton />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default ProductsSectionSkeleton;
