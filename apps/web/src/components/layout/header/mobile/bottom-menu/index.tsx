import Link from 'next/link';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';

import { MENU_LIST } from '@/components/layout/header/menu';
import * as styles from '@/components/layout/header/mobile/bottom-menu/index.css';
import { usePage } from '@/hooks/utils';

import 'swiper/css';

const MobileBottomMenu = () => {
    const router = useRouter();

    const { isShopMainPage } = usePage();

    if (!isShopMainPage) {
        return null;
    }

    const pathname = router.asPath.split('?')[0];

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
                            data-selected={item.href === pathname}
                        >
                            {item.label}
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MobileBottomMenu;
