'use client';

import { css } from '@/styled-system/css';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

import BannerTextOverlay from '@/components/Banner/BannerTextOverlay';
import HeroBannerSkeleton from '@/components/Banner/HeroBannerSkeleton';
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

    // 배너가 없으면 스켈레톤 표시
    if (banners.length === 0) {
        return <HeroBannerSkeleton />;
    }

    return (
        <div className={css({ width: '100%', position: 'relative' })}>
            <Swiper key={swiperKey} {...swiperOptions}>
                {banners.map((banner, index) => {
                    const target =
                        banner.browerTargetType === 'CURRENT'
                            ? '_self'
                            : '_blank';
                    const rel =
                        target === '_blank' ? 'noopener noreferrer' : undefined;

                    return (
                        <SwiperSlide
                            key={banner.imageUrl || index}
                            className={css({
                                aspectRatio: '4/5',
                                overflow: 'hidden',
                                borderRadius:
                                    swiperKey === 'mobile' ? '12px' : '24px',
                            })}
                        >
                            <Link
                                href={banner.landingUrl}
                                target={target}
                                rel={rel}
                                aria-label={
                                    banner.name || `배너 ${index + 1}로 이동`
                                }
                                className={css({
                                    position: 'relative',
                                    display: 'block',
                                    width: '100%',
                                    height: '100%',
                                    overflow: 'hidden',
                                })}
                            >
                                <img
                                    src={banner.imageUrl}
                                    alt={
                                        banner.name || `메인 배너 ${index + 1}`
                                    }
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                    decoding="async"
                                    className={css({
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        display: 'block',
                                    })}
                                />
                                <BannerTextOverlay
                                    title={banner.name}
                                    description={banner.description}
                                    titleColor={banner.nameColor}
                                    descriptionColor={banner.descriptionColor}
                                />
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            {/* 데스크탑 컨트롤 */}
            {showDesktopControls && (
                <div
                    className={css({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        marginTop: '24px',
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
                        aria-label="이전 배너"
                        type="button"
                    >
                        <BigCaretIcon className="left-icon" direction="left" />
                    </button>

                    <span
                        className={css({
                            fontSize: '13px',
                            fontWeight: '500',
                            lineHeight: '130%',
                            letterSpacing: '-0.013em',
                            color: '#6b7280',
                            minWidth: '48px',
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
                        aria-label="다음 배너"
                        type="button"
                    >
                        <BigCaretIcon
                            className="right-icon"
                            direction="right"
                        />
                    </button>

                    <button
                        onClick={handleToggleAutoplay}
                        aria-label={
                            isAutoplayPaused
                                ? '자동재생 시작'
                                : '자동재생 일시정지'
                        }
                        type="button"
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
                            className="control-icon"
                            isPaused={!isAutoplayPaused}
                        />
                    </button>
                </div>
            )}
        </div>
    );
};

export default HeroBanner;
