'use client';

import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import IconBannerItem from '@/components/banner/icon-banner/Item';
import IconBannerSkeleton from '@/components/banner/icon-banner/Skeleton';
import useMediaQuery from '@/hooks/useMediaQuery';
import { Banner } from '@/models/display/banner';
import { splitBannersIntoTwoRows } from '@/utils/banners';

const SWIPER_CONFIG = {
    mobile: {
        modules: [FreeMode],
        slidesPerView: 'auto' as const,
        spaceBetween: 8,
        freeMode: true,
    },
    padding: {
        paddingLeft: '20px',
        paddingRight: '20px',
    } as const,
};

type SubIconBannerProps = {
    banners: Banner[];
};

const SubIconBanner = ({ banners }: SubIconBannerProps) => {
    const mediaQueryResult = useMediaQuery('(max-width: 767px)');
    const isMobile = mediaQueryResult === true;
    const isMediaQueryReady = mediaQueryResult !== null;

    // 미디어 쿼리가 준비되지 않았으면 스켈레톤 반환 (깜빡임 방지)
    if (!isMediaQueryReady) {
        return <IconBannerSkeleton type='sub' />;
    }

    // 모바일
    if (isMobile) {
        // 8개 이하 → Grid 레이아웃
        if (banners.length <= 8) {
            return (
                <ul
                    className={css({
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: `${token('spacing.3')} ${token('spacing.4')}`,
                        paddingX: token('spacing.5'),
                    })}
                >
                    {banners.map((banner, index) => (
                        <li key={index}>
                            <IconBannerItem
                                banner={banner}
                                type='sub'
                                index={index}
                            />
                        </li>
                    ))}
                </ul>
            );
        }

        // 9개 이상 → Swiper 2줄 레이아웃
        const { firstRow: topRow, secondRow: bottomRow } =
            splitBannersIntoTwoRows(banners);

        return (
            <Swiper
                modules={SWIPER_CONFIG.mobile.modules}
                slidesPerView={SWIPER_CONFIG.mobile.slidesPerView}
                spaceBetween={SWIPER_CONFIG.mobile.spaceBetween}
                freeMode={SWIPER_CONFIG.mobile.freeMode}
                style={SWIPER_CONFIG.padding}
            >
                <SwiperSlide style={{ width: 'auto' }}>
                    <div
                        className={css({
                            display: 'flex',
                            flexDirection: 'column',
                            gap: { base: token('spacing.3'), md: token('spacing.4') },
                        })}
                    >
                        <ul
                            className={css({
                                display: 'flex',
                                gap: { base: '10px', md: token('spacing.4') },
                            })}
                        >
                            {topRow.map((banner, index) => (
                                <li
                                    key={`top-${index}`}
                                    className={css({ flexShrink: 0 })}
                                >
                                    <IconBannerItem
                                        banner={banner}
                                        type='sub'
                                    />
                                </li>
                            ))}
                        </ul>
                        <ul
                            className={css({
                                display: 'flex',
                                gap: { base: '10px', md: token('spacing.4') },
                            })}
                        >
                            {bottomRow.map((banner, index) => (
                                <li
                                    key={`bottom-${index}`}
                                    className={css({ flexShrink: 0 })}
                                >
                                    <IconBannerItem
                                        banner={banner}
                                        type='sub'
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </SwiperSlide>
            </Swiper>
        );
    }

    // 데스크탑: 자연 줄바꿈 레이아웃
    return (
        <ul
            className={css({
                display: 'flex',
                justifyContent: 'center',
                gap: `${token('spacing.3')} ${token('spacing.10')}`,
                flexWrap: 'wrap',
            })}
        >
            {banners.map((banner, index) => (
                <li key={index} className={css({ flexShrink: 0 })}>
                    <IconBannerItem banner={banner} type='sub' index={index} />
                </li>
            ))}
        </ul>
    );
};

export default SubIconBanner;
