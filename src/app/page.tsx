import Image from 'next/image';
import { Suspense } from '@suspensive/react';

import { getTranslation } from '@/i18n/server';
import { css } from '@/styled-system/css';
import HeroBannerSection from '@/components/Banner/HeroBannerSection';
import HeroBannerSkeleton from '@/components/Banner/HeroBannerSkeleton';
import IconBannerSection from '@/components/Banner/IconBannerSection';
import IconBannerSkeleton from '@/components/Banner/IconBannerSkeleton';
import { isAuthenticated } from '@/utils/auth.server';

export default async function Home() {
    const { t } = await getTranslation();

    const authStatus = await isAuthenticated();
    console.log('🚀 ~ Home ~ isAuthenticated:', authStatus);

    return (
        <div
            className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: { base: '48px' },
            })}
        >
            {/* Banner Section */}
            <div
                className={
                    css({
                        display: 'flex',
                        flexDirection: 'column',
                        gap: { base: '18px', md: '12px' },
                        width: '100vw',
                        marginX: 'calc(50% - 50vw)',
                        overflow: 'hidden',
                    }) + ' banner-container'
                }
            >
                <Suspense
                    fallback={
                        <section
                            className={css({
                                paddingY: { base: '12px', md: '24px' },
                                overflow: 'hidden',
                            })}
                            aria-label="메인 배너 섹션"
                        >
                            <HeroBannerSkeleton />
                        </section>
                    }
                >
                    <HeroBannerSection />
                </Suspense>
                <Suspense
                    fallback={
                        <section
                            className={css({
                                margin: {
                                    base: '20px 0 0 0',
                                    md: '0 0 0 12px',
                                },
                            })}
                            aria-label="메인 아이콘 배너 섹션"
                        >
                            <IconBannerSkeleton />
                        </section>
                    }
                >
                    <IconBannerSection />
                </Suspense>
            </div>
        </div>
    );
}
