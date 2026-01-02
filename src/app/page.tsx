import { getTranslation } from '@/i18n/server';
import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';
import { Suspense } from '@suspensive/react';

import HeroBannerSection from '@/components/banner/hero-banner/Section';
import HeroBannerSkeleton from '@/components/banner/hero-banner/Skeleton';
import IconBannerSection from '@/components/banner/icon-banner/Section';
import IconBannerSkeleton from '@/components/banner/icon-banner/Skeleton';
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
                gap: { base: token('spacing.12') },
            })}
        >
            {/* Banner Section */}
            <div
                className={
                    css({
                        display: 'flex',
                        flexDirection: 'column',
                        gap: { base: '18px', md: token('spacing.3') },
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
                                paddingY: { base: token('spacing.3'), md: token('spacing.6') },
                                overflow: 'hidden',
                            })}
                            aria-label={t('메인 배너 섹션')}
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
                            aria-label={t('메인 아이콘 배너 섹션')}
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
