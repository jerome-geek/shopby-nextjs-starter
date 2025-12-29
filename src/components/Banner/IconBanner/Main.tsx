'use client';

import { css } from '@/styled-system/css';
import { useMemo } from 'react';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import IconBannerItem from '@/components/Banner/IconBanner/Item';
import IconBannerSkeleton from '@/components/Banner/IconBannerSkeleton';
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
interface MainIconBannerProps {
    banners: Banner[];
}

const MainIconBanner = ({ banners }: MainIconBannerProps) => {
    const mediaQueryResult = useMediaQuery('(max-width: 767px)');
    const isMobile = mediaQueryResult === true;
    const isMediaQueryReady = mediaQueryResult !== null;

    const { firstRow, secondRow } = useMemo(() => {
        return splitBannersIntoTwoRows(banners);
    }, [banners]);

    const rows = [firstRow, secondRow].filter((row) => row.length > 0);

    // 미디어 쿼리가 준비되지 않았으면 스켈레톤 반환 (깜빡임 방지)
    if (!isMediaQueryReady) {
        return <IconBannerSkeleton />;
    }

    // 모바일: Swiper 2줄 자유 모드 레이아웃
    if (isMobile) {
        return (
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                })}
            >
                {rows.map((row, rowIndex) => (
                    <Swiper
                        key={`row-${rowIndex}`}
                        modules={SWIPER_CONFIG.mobile.modules}
                        slidesPerView={SWIPER_CONFIG.mobile.slidesPerView}
                        spaceBetween={SWIPER_CONFIG.mobile.spaceBetween}
                        freeMode={SWIPER_CONFIG.mobile.freeMode}
                        style={SWIPER_CONFIG.padding}
                    >
                        {row.map((banner, index) => (
                            <SwiperSlide
                                key={`banner-${rowIndex}-${index}`}
                                style={{ width: 'auto' }}
                            >
                                <IconBannerItem
                                    banner={banner}
                                    type='main'
                                    index={index}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ))}
            </div>
        );
    }

    // 데스크탑: 2줄 고정 레이아웃
    return (
        <div
            className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
            })}
        >
            {rows.map((row, rowIndex) => (
                <ul
                    key={rowIndex}
                    className={css({
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '8px',
                        flexWrap: 'nowrap',
                    })}
                >
                    {row.map((banner, index) => (
                        <li key={index} className={css({ flexShrink: 0 })}>
                            <IconBannerItem
                                banner={banner}
                                type='main'
                                index={
                                    rowIndex === 0
                                        ? index
                                        : index + firstRow.length
                                }
                            />
                        </li>
                    ))}
                </ul>
            ))}
        </div>
    );
};

export default MainIconBanner;
