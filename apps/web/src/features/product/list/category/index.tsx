import Link from 'next/link';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import * as styles from '@/features/product/list/category/index.css';
import { useCategoryMenu } from '@/hooks/utils/useCategoryMenu';

export const ProductListCategory = () => {
    const {
        depth3CategoryNo,
        depth4CategoryNo,
        depth3CategoryList,
        depth4CategoryList,
    } = useCategoryMenu();

    return (
        <div className={styles.swiperContainer}>
            <Swiper
                className={styles.depth3CategorySwiper}
                spaceBetween={12}
                slidesPerView={'auto'}
                slidesOffsetBefore={20}
                slidesOffsetAfter={20}
            >
                {depth3CategoryList.map((depth3Category) => (
                    <SwiperSlide
                        key={`depth3category-${depth3Category.categoryNo}`}
                        style={{ width: 'auto' }}
                    >
                        <Link
                            href={`/categories/${depth3Category.categoryNo}`}
                            className={styles.depth3CategoryLink}
                            data-selected={
                                depth3CategoryNo === depth3Category.categoryNo
                                    ? 'true'
                                    : undefined
                            }
                        >
                            {depth3Category.label}
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

            {depth4CategoryList.length > 0 && (
                <Swiper
                    className={styles.depth4CategorySwiper}
                    spaceBetween={12}
                    slidesPerView={'auto'}
                    slidesOffsetBefore={20}
                    slidesOffsetAfter={20}
                >
                    <SwiperSlide style={{ width: 'auto' }}>
                        <Link
                            href={`/categories/${depth3CategoryNo}`}
                            className={styles.depth4CategoryLink}
                            data-selected={
                                !depth4CategoryNo ? 'true' : undefined
                            }
                        >
                            전체
                        </Link>
                    </SwiperSlide>
                    {depth4CategoryList.map((depth4Category) => (
                        <SwiperSlide
                            key={`depth4category-${depth4Category.categoryNo}`}
                            style={{ width: 'auto' }}
                        >
                            <Link
                                href={`/categories/${depth4Category.categoryNo}`}
                                className={styles.depth4CategoryLink}
                                data-selected={
                                    depth4CategoryNo ===
                                    depth4Category.categoryNo
                                        ? 'true'
                                        : undefined
                                }
                            >
                                {depth4Category.label}
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};
