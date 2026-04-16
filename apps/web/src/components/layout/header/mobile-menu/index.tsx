import { useRouter } from 'next/router';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

import * as styles from '@/components/layout/header/mobile-menu/index.css';
import { MENU_LIST } from '@/components/layout/header/Menu';
import { usePage } from '@/hooks/utils';

import 'swiper/css';

const MobileMenu = () => {
    const { isShopMainPage } = usePage();
    const router = useRouter();

    if (!isShopMainPage) {
        return null;
    }

    return (
        <div className={styles.mobileMenu}>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={6}
                style={{
                    padding: '0 20px',
                }}
            >
                {MENU_LIST.map((item, index) => (
                    <SwiperSlide
                        key={`${item.href}-${index}`}
                        style={{
                            width: 'auto',
                        }}
                    >
                        <Link
                            href={item.href}
                            className={styles.mobileMenuItem}
                            data-selected={item.href === router.asPath}
                        >
                            {item.label}
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MobileMenu;
