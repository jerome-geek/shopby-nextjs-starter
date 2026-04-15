import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

import useBannerList from '@/hooks/suspenseQuery/display/banner/useBannerList';

import * as styles from './quick-menu-swiper.css';

import 'swiper/css';

export const QuickMenuSwiper = ({ onNavigate }: { onNavigate: () => void }) => {
    const { data } = useBannerList({ type: 'code', banners: ['QUICK_MENU'] });
    const banners = data[0]?.accounts[0]?.banners ?? [];

    return (
        <div className={styles.container}>
            <Swiper
                slidesPerView='auto'
                spaceBetween={16}
                slidesOffsetBefore={20}
                slidesOffsetAfter={20}
            >
                {banners.map(({ name, imageUrl, landingUrl, bannerNo }) => (
                    <SwiperSlide key={bannerNo} className={styles.slide}>
                        <Link
                            href={landingUrl}
                            className={styles.slide}
                            onClick={onNavigate}
                        >
                            <div className={styles.iconCircle}>
                                <Image
                                    src={imageUrl}
                                    alt={name}
                                    width={40}
                                    height={40}
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            <span className={styles.label}>{name}</span>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
