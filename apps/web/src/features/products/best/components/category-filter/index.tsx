import { Swiper, SwiperSlide } from 'swiper/react';
import { useCategoryMenu } from '@/hooks/utils/useCategoryMenu';
import * as styles from './index.css';

interface BestCategoryFilterProps {
    selectedCategory: number;
    mainCategoryNo: number;
    onSelect: (categoryNo: number | null) => void;
}

export const BestCategoryFilter = ({
    selectedCategory,
    mainCategoryNo,
    onSelect,
}: BestCategoryFilterProps) => {
    const { depth2CategoryList } = useCategoryMenu(mainCategoryNo);

    return (
        <div className={styles.categorySwiperContainer}>
            <Swiper
                slidesPerView='auto'
                spaceBetween={4}
                watchOverflow
                breakpoints={{
                    768: {
                        spaceBetween: 6,
                    },
                }}
                className={styles.categorySwiper}
            >
                <SwiperSlide style={{ width: 'auto' }}>
                    <button
                        className={styles.categoryLink}
                        onClick={() => onSelect(null)}
                        data-selected={
                            selectedCategory === mainCategoryNo
                                ? 'true'
                                : undefined
                        }
                    >
                        전체
                    </button>
                </SwiperSlide>

                {depth2CategoryList.map((category) => (
                    <SwiperSlide
                        key={category.categoryNo}
                        style={{ width: 'auto' }}
                    >
                        <button
                            className={styles.categoryLink}
                            onClick={() => onSelect(category.categoryNo)}
                            data-selected={
                                selectedCategory === category.categoryNo
                                    ? 'true'
                                    : undefined
                            }
                        >
                            {category.label}
                        </button>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
