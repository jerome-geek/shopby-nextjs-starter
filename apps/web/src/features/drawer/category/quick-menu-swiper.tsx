import Link from 'next/link';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import * as styles from '@/features/drawer/category/quick-menu-swiper.css';
import { BANNER_ID } from '@/entities/banner/constants';
import useBannerList from '@/hooks/suspenseQuery/display/banner/useBannerList';

import 'swiper/css';
import 'swiper/css/free-mode';

export const QuickMenuSwiper = ({ onNavigate }: { onNavigate: () => void }) => {
    const { data } = useBannerList({
        type: 'id',
        banners: [BANNER_ID.QUICK_MENU],
    });
    const banners = data[0]?.accounts[0]?.banners ?? [];

    return (
        <div className={styles.container}>
            <Swiper
                modules={[FreeMode]}
                slidesPerView='auto'
                spaceBetween={12}
                slidesOffsetBefore={20}
                slidesOffsetAfter={20}
            >
                {banners.map(
                    ({ name, imageUrl, landingUrl, bannerNo, nameColor }) => (
                        <SwiperSlide key={bannerNo} className={styles.slide}>
                            <Link
                                href={landingUrl}
                                className={styles.slide}
                                onClick={onNavigate}
                            >
                                <img
                                    src={imageUrl}
                                    alt={name}
                                    width={72}
                                    height={72}
                                    style={{ objectFit: 'contain' }}
                                />

                                <span
                                    className={styles.label}
                                    style={{ color: nameColor }}
                                >
                                    {name}
                                </span>
                            </Link>
                        </SwiperSlide>
                    ),
                )}
            </Swiper>
        </div>
    );
};
