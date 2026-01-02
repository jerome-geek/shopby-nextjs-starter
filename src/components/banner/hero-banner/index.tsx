'use client';

import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';

import HeroBannerItem from '@/components/banner/hero-banner/Item';
import HeroBannerSkeleton from '@/components/banner/hero-banner/Skeleton';
import { BigCaretIcon, ControlIcon } from '@/components/icons';
import { useHeroBannerSwiper } from '@/hooks/main/useHeroBannerSwiper';
import { Banner } from '@/models/display/banner';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

type HeroBannerProps = {
    banners: Banner[];
};

const HeroBanner = ({ banners }: HeroBannerProps) => {
    const { t } = useTranslation();

    const {
        swiperKey,
        swiperOptions,
        currentSlide,
        isAutoplayPaused,
        handleToggleAutoplay,
        handleNavigationClick,
        showDesktopControls,
        isMediaQueryReady,
    } = useHeroBannerSwiper({ banners: banners });

    // 미디어 쿼리가 준비되지 않았으면 스켈레톤 표시 (깜빡임 방지)
    if (!isMediaQueryReady) {
        return <HeroBannerSkeleton />;
    }

    // 배너가 없으면 null 반환
    if (banners.length === 0) {
        return null;
    }

    const borderRadius = swiperKey === 'mobile' ? '12px' : '24px';

    return (
        <div className={css({ width: '100%', position: 'relative' })}>
            <Swiper key={swiperKey} {...swiperOptions}>
                {banners.map((banner, index) => (
                    <SwiperSlide key={banner.imageUrl || index}>
                        <HeroBannerItem
                            banner={banner}
                            index={index}
                            borderRadius={borderRadius}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* 데스크탑 컨트롤 */}
            {showDesktopControls && (
                <div
                    className={css({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: token('spacing.3'),
                        marginTop: token('spacing.6'),
                    })}
                >
                    <button
                        className={`swiper-button-prev-custom ${css({
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                        })}`}
                        onClick={() => handleNavigationClick('prev')}
                        aria-label={t('이전 배너')}
                        type='button'
                    >
                        <BigCaretIcon className='left-icon' direction='left' />
                    </button>

                    <span
                        className={css({
                            fontSize: '13px',
                            fontWeight: '500',
                            lineHeight: '130%',
                            letterSpacing: '-0.013em',
                            color: token('colors.gray80'),
                            minWidth: token('spacing.12'),
                            textAlign: 'center',
                        })}
                    >
                        {currentSlide} / {banners.length}
                    </span>

                    <button
                        className={`swiper-button-next-custom ${css({
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                        })}`}
                        onClick={() => handleNavigationClick('next')}
                        aria-label={t('다음 배너')}
                        type='button'
                    >
                        <BigCaretIcon
                            className='right-icon'
                            direction='right'
                        />
                    </button>

                    <button
                        onClick={handleToggleAutoplay}
                        aria-label={
                            isAutoplayPaused
                                ? t('자동재생 시작')
                                : t('자동재생 일시정지')
                        }
                        type='button'
                        className={css({
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                        })}
                    >
                        <ControlIcon
                            className='control-icon'
                            isPaused={!isAutoplayPaused}
                        />
                    </button>
                </div>
            )}
        </div>
    );
};

export default HeroBanner;
