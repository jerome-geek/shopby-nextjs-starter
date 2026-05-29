import { isEmpty } from '@fxts/core';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/shared/components/common/loading-wrapper';
import { NoResult } from '@/shared/components/common/no-result';
import Seo from '@/shared/components/common/seo';
import { MypageLayout } from '@/shared/components/layout';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import { PeriodQueryFilter } from '@/components/mypage/filters/period-query-filter';
import { SegmentedToggle } from '@/components/mypage/filters/segmented-toggle';
import { OrderOptions } from '@/components/mypage/orders/order-options';
import { ORDER_OPTIONS_DESKTOP_GRID_TEMPLATE } from '@/components/mypage/orders/order-options-item.css';
import Paging from '@/shared/ui/paging';
import { useMypageListQueryParams } from '@/entities/mypage/hooks/useMypageListQueryParams';
import { ObserverTarget } from '@/shared/components/observer-target';

import { claimsTabSpec } from '@/entities/mypage/utils/tabs';
import {
    useInfiniteMemberClaimList,
    useMemberClaimList,
} from '@/hooks/query/claim/member';
import useProfile from '@/hooks/query/member/profile/useProfile';
import { useResponsive } from '@/hooks/utils';
import * as styles from '@/pages/mypage/claims/index.css';
import { Only } from '@/shared/components/only';

export default function MypageClaimsPage() {
    const { isMobile } = useResponsive();
    const { t } = useTranslation();

    const claimTabList = useMemo(() => claimsTabSpec.options(t), [t]);

    const [{ startYmd, endYmd, pageNumber, claimType }, setQuery] =
        useMypageListQueryParams(
            {
                claimType: claimsTabSpec.parser,
            },
            { history: 'push' },
        );

    const parseSearchParams = {
        pageNumber,
        pageSize: 10,
        hasTotalCount: true,
        startYmd,
        endYmd,
        claimTypes: claimsTabSpec.resolveClaimTypes(claimType),
    };

    const { data: profileData } = useProfile();

    const { data: memberClaimListData, isLoading: isMemberClaimListLoading } =
        useMemberClaimList({
            memberNo: profileData?.memberNo || 0,
            searchParams: parseSearchParams,
            options: {
                enabled: !isMobile,
            },
        });

    const {
        data: infiniteMemberClaimListData,
        isLoading: isInfiniteMemberClaimListLoading,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteMemberClaimList({
        memberNo: profileData?.memberNo || 0,
        searchParams: parseSearchParams,
        options: {
            enabled: isMobile,
        },
    });

    const myClaimList = useMemo(() => {
        if (isMobile) {
            return (
                infiniteMemberClaimListData?.pages?.flatMap(
                    (page) => page?.items || [],
                ) ?? []
            );
        }

        return memberClaimListData?.items ?? [];
    }, [isMobile, infiniteMemberClaimListData, memberClaimListData]);

    const totalCount = useMemo(() => {
        if (isMobile) {
            return infiniteMemberClaimListData?.pages[0]?.totalCount ?? 0;
        }

        return memberClaimListData?.totalCount ?? 0;
    }, [isMobile, infiniteMemberClaimListData, memberClaimListData]);

    const isLoading = isMobile
        ? isInfiniteMemberClaimListLoading
        : isMemberClaimListLoading;

    return (
        <>
            <Seo title={t('취소/교환/반품')} noindex={true} />
            <div className={card.container}>
            <section className={card.section}>
                <div className={card.toolbar}>
                    <div className={card.toolbarTop}>
                        <SegmentedToggle
                            className={card.toggleGroup}
                            buttonClassName={card.toggleButton}
                            defaultValue='ALL'
                            value={claimType}
                            options={claimTabList}
                            onChange={(value) => {
                                setQuery(
                                    { claimType: value },
                                    { resetPage: true },
                                );
                            }}
                        />

                        <PeriodQueryFilter />
                    </div>

                    <div className={card.toolbarBottom}>
                        <div className={card.metaRow}>
                            <div className={card.metaRowLeft}>
                                {startYmd && endYmd ? (
                                    <span className={card.selectedRangeText}>
                                        {startYmd} ~ {endYmd}
                                    </span>
                                ) : (
                                    <span className={card.selectedRangeText}>
                                        {t('최근 3개월')}
                                    </span>
                                )}

                                <span className={card.count}>
                                    {t('총 {{count}}개', {
                                        count: totalCount,
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={card.list}>
                    <Only.Desktop>
                        <div
                            className={card.headerRow}
                            style={{
                                gridTemplateColumns:
                                    ORDER_OPTIONS_DESKTOP_GRID_TEMPLATE,
                                gap: 0,
                            }}
                        >
                            <div className={styles.headerCellMain}>
                                <span>{t('주문번호/주문일자/상품정보')}</span>
                            </div>
                            <div className={styles.headerCellCenter}>
                                <span>{t('주문상태')}</span>
                            </div>
                            <div className={styles.headerCellCenter}>
                                <span>{t('선택')}</span>
                            </div>
                        </div>
                    </Only.Desktop>

                    <LoadingWrapper isLoading={isLoading}>
                        {!isEmpty(myClaimList) ? (
                            <OrderOptions optionItems={myClaimList} />
                        ) : (
                            <NoResult
                                text={t('취소/교환/반품 내역이 없습니다.')}
                            />
                        )}

                        <Only.Mobile>
                            <ObserverTarget
                                onIntersect={() => {
                                    if (hasNextPage) {
                                        fetchNextPage();
                                    }
                                }}
                                hasNextPage={hasNextPage || false}
                            />
                        </Only.Mobile>

                        <Only.Desktop>
                            <div className={card.paging}>
                                <Paging
                                    totalCount={totalCount}
                                    currentPage={parseSearchParams.pageNumber}
                                    pageSize={parseSearchParams.pageSize}
                                    onPageClick={(page) => {
                                        setQuery({ pageNumber: page });
                                    }}
                                />
                            </div>
                        </Only.Desktop>
                    </LoadingWrapper>
                </div>
            </section>
        </div>
        </>
    );
}

MypageClaimsPage.getLayout = (page: React.ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};
