import { SuspenseQuery } from '@suspensive/react-query';
import Script from 'next/script';

import ShopbyApiErrorBoundary from '@/components/error-boundary/shopby';
import * as styles from '@/components/layer-contents/share/index.css';
import ShareSkeleton from '@/components/layer-contents/share/skeleton';
import { useShare } from '@/features/share';
import { bannerListOptions } from '@/hooks/suspenseQuery/display/banner';
import { extractBannerContentsByAccountIndex } from '@/utils/shopby';

const ShareContent = () => {
    const { handleShare } = useShare();

    return (
        <ShopbyApiErrorBoundary fallback={<ShareSkeleton />}>
            <Script
                src='https://t1.kakaocdn.net/kakao_js_sdk/2.8.1/kakao.min.js'
                integrity='sha384-OL+ylM/iuPLtW5U3XcvLSGhE8JzReKDank5InqlHGWPhb4140/yrBw0bg0y7+C9J'
                crossOrigin='anonymous'
                strategy='lazyOnload'
                onLoad={() => {
                    if (window.Kakao && !window.Kakao.isInitialized()) {
                        window.Kakao.init(
                            process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY,
                        );
                    }
                }}
            />
            <SuspenseQuery
                {...bannerListOptions({
                    type: 'id',
                    banners: ['SHARE-ICON'],
                    options: {
                        select: (data) =>
                            extractBannerContentsByAccountIndex(data, 0),
                    },
                })}
            >
                {({ data: bannerListData }) => (
                    <ul className={styles.list}>
                        {bannerListData.map((banner) => (
                            <li key={banner.bannerNo}>
                                <button
                                    type='button'
                                    className={styles.listButton}
                                    onClick={() =>
                                        handleShare(banner.landingUrl)
                                    }
                                >
                                    <img
                                        src={banner.imageUrl}
                                        className={styles.listImage}
                                        alt={banner.name}
                                    />
                                    <span
                                        className={styles.listName}
                                        style={{ color: banner.nameColor }}
                                    >
                                        {banner.name}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </SuspenseQuery>
        </ShopbyApiErrorBoundary>
    );
};

export default ShareContent;
