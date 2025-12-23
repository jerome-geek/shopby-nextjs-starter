'use client';

import { css } from '@/styled-system/css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { BANNER_STYLES } from '@/const/banner/bannerStyles';

const HeroBannerSkeleton = () => {
    return (
        <>
            {/* 데스크탑 */}
            <div
                className={css({
                    display: { base: 'none', md: 'block' },
                })}
            >
                <div className={css({ overflow: 'hidden' })}>
                    <div
                        className={css({
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '18px',
                        })}
                    >
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={index}
                                className={css({
                                    width: 'calc(140vw / 5)',
                                    aspectRatio: '4/5',
                                    overflow: 'hidden',
                                    flexShrink: 0,
                                })}
                            >
                                <Skeleton height='100%' borderRadius={'24px'} />
                            </div>
                        ))}
                    </div>
                </div>
                {/* 컨트롤 영역*/}
                <div
                    className={css({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        marginTop: '24px',
                    })}
                >
                    <Skeleton width='24px' height='24px' borderRadius='50%' />
                    <Skeleton width='48px' height='20px' borderRadius='4px' />
                    <Skeleton width='24px' height='24px' borderRadius='50%' />
                    <Skeleton width='24px' height='24px' borderRadius='50%' />
                </div>
            </div>

            {/* 모바일 */}
            <div
                className={css({
                    display: { base: 'block', md: 'none' },
                })}
            >
                <div className={css({ overflow: 'hidden' })}>
                    <div
                        className={css({
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '12px',
                        })}
                    >
                        {Array.from({ length: 3 }).map((_, index) => {
                            const isCenter = index === 1;

                            return (
                                <div
                                    key={index}
                                    className={css({
                                        width: isCenter
                                            ? '84vw'
                                            : 'calc(84vw * 0.95)',
                                        aspectRatio:
                                            BANNER_STYLES.MAIN.COMMON
                                                .aspectRatio,
                                        overflow: 'hidden',
                                        flexShrink: 0,
                                        borderRadius: '12px',
                                        transform: isCenter
                                            ? 'scale(1)'
                                            : `scale(0.95)`,
                                    })}
                                >
                                    <Skeleton
                                        width='100%'
                                        height='100%'
                                        style={{
                                            borderRadius: '12px',
                                            display: 'block',
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroBannerSkeleton;
