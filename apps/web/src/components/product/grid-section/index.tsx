import { useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { ProductCard } from '@/components/product/card';
import * as styles from '@/components/product/grid-section/index.css';
import { ViewAllLink } from '@/shared/ui';
import PagingV2 from '@/shared/ui/paging-v2';
import { PATHS } from '@/const/paths';
import { useProfile } from '@/hooks/query/member/profile';
import { useLikeProductList } from '@/hooks/suspenseQuery/product/profile';
import { useResponsive } from '@/hooks/utils';

export const ProductGridSection = () => {
    const { t } = useTranslation();
    const { isMobile } = useResponsive();
    const [isPending, startTransition] = useTransition();

    const { data: profileData } = useProfile();
    const memberNo = profileData?.memberNo ?? 0;

    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = isMobile ? 10 : 5;
    const currentPage = isMobile ? 1 : pageNumber;

    const { data: likeProductListData } = useLikeProductList({
        searchParams: {
            pageNumber: currentPage,
            pageSize,
            hasTotalCount: true,
        },
        memberNo,
    });

    const productList = likeProductListData?.items ?? [];
    const isProductListVisible = productList.length > 0;

    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{t('상품')}</h2>
                {isProductListVisible && (
                    <ViewAllLink href={PATHS.MYPAGE.WISH}>
                        {t('전체보기')}
                    </ViewAllLink>
                )}
            </div>

            <div
                style={{
                    opacity: isPending ? 0.5 : 1,
                    transition: 'opacity 0.2s',
                }}
            >
                {isProductListVisible ? (
                    isMobile ? (
                        <Swiper
                            className={styles.swiperContainer}
                            slidesPerView='auto'
                            spaceBetween={16}
                            slidesOffsetAfter={20}
                        >
                            {productList.map((p) => (
                                <SwiperSlide
                                    key={p.productNo}
                                    className={styles.swiperSlide}
                                >
                                    <ProductCard
                                        {...p}
                                        imageUrlInfo={p.imageInfo}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className={styles.productGrid}>
                            {productList.map((p) => (
                                <ProductCard
                                    key={p.productNo}
                                    {...p}
                                    imageUrlInfo={p.imageInfo}
                                />
                            ))}
                        </div>
                    )
                ) : (
                    <div className={styles.emptyState}>
                        {t('좋아요한 상품이 없습니다.')}
                    </div>
                )}
            </div>

            {!isMobile && isProductListVisible && (
                <PagingV2
                    currentPage={pageNumber}
                    totalCount={likeProductListData?.totalCount ?? 0}
                    pageSize={pageSize}
                    onPageClick={(nextPage) => {
                        startTransition(() => {
                            setPageNumber(nextPage);
                        });
                    }}
                />
            )}
        </section>
    );
};
