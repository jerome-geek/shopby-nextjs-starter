import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '@fxts/core';

import { CustomAccordion } from '@/components/ui/accordion';
import LoadingWrapper from '@/components/common/loading-wrapper';
import { NoResult } from '@/components/common/no-result';
import { MypageLayout } from '@/components/layout';
import { PeriodQueryFilter } from '@/components/mypage/filters/period-query-filter';
import { SegmentedToggle } from '@/components/mypage/filters/segmented-toggle';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import Paging from '@/components/ui/paging';
import useAccumulationList from '@/hooks/query/manage/accumulation/useAccumulationList';
import useAccumulationSummary from '@/hooks/query/manage/accumulation/useAccumulationSummary';
import useWaitingAccumulation from '@/hooks/query/manage/accumulation/useWaitingAccumulation';
import { useResponsive } from '@/hooks/utils';
import type { AccumulationReasonType } from '@/models';
import * as styles from '@/pages/mypage/accumulations/index.css';
import { POINT } from '@/utils/currency';

const PAGE_SIZE = 10;

const toAccumulationReason = (reason?: string) => {
    switch (reason) {
        case 'ADD':
            return 'ADD';
        case 'SUB':
            return 'SUB';
        default:
            return undefined;
    }
};

export const MypageAccumulation = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { isMobile } = useResponsive();

    const accumulationReasonQuery = router.query.accumulationReason as string;

    const tabOptions = useMemo(
        () => [
            { value: 'ALL', label: t('전체') },
            { value: 'ADD', label: t('적립') },
            { value: 'SUB', label: t('사용') },
        ],
        [t],
    );

    const accumulationReason = toAccumulationReason(accumulationReasonQuery);

    const startYmd = String(router.query.startYmd ?? '') || undefined;
    const endYmd = String(router.query.endYmd ?? '') || undefined;
    const pageNumber = Number(router.query.pageNumber) || 1;

    const searchParams = useMemo(
        () => ({
            pageNumber,
            pageSize: PAGE_SIZE,
            accumulationReason: accumulationReason as AccumulationReasonType,
            hasTotalCount: true,
            startYmd,
            endYmd,
        }),
        [pageNumber, accumulationReason, startYmd, endYmd],
    );

    const setQuery = (next: Record<string, string | number | undefined>) => {
        router.replace(
            {
                pathname: router.pathname,
                query: {
                    ...router.query,
                    ...next,
                    ...(next.pageNumber ? {} : { pageNumber: 1 }),
                },
            },
            undefined,
            { shallow: true },
        );
    };

    const { data: accumulationSummaryData } = useAccumulationSummary();
    const { data: waitingAccumulationData } = useWaitingAccumulation();
    const { data: accumulationListData, isLoading: isAccumulationListLoading } =
        useAccumulationList({
            searchParams,
        });

    const accumulationSummary = useMemo(
        () => [
            {
                title: t('사용 가능한 적립금'),
                content: POINT(
                    accumulationSummaryData?.totalAvailableAmt || 0,
                ).format(),
            },
            {
                title: t('구매 확정 시 예상 적립금'),
                content: POINT(
                    waitingAccumulationData?.waitingAccumulation || 0,
                ).format(),
            },
        ],
        [t, accumulationSummaryData, waitingAccumulationData],
    );

    const accumulationList = useMemo(() => {
        return accumulationListData?.items ?? [];
    }, [accumulationListData]);

    const totalCount = useMemo(() => {
        return accumulationListData?.totalCount ?? 0;
    }, [accumulationListData]);

    const isLoading = isAccumulationListLoading;

    const getExpireYmdt = ({
        registerYmdt,
        expireYmdt,
    }: {
        registerYmdt: string;
        expireYmdt: string;
    }) => {
        if (!expireYmdt) {
            return '-';
        }

        if (dayjs(expireYmdt).format('YYYY') === '9999') {
            return t('제한없음');
        }

        return isMobile
            ? `${dayjs(registerYmdt).format('YYYY-MM-DD HH:mm:ss')} ~ ${dayjs(
                  expireYmdt,
              ).format('YYYY-MM-DD HH:mm:ss')}`
            : `${dayjs(registerYmdt).format('YYYY-MM-DD HH:mm:ss')}
            <br/>
            ~
            <br/>
            ${dayjs(expireYmdt).format('YYYY-MM-DD HH:mm:ss')}`;
    };

    return (
        <div className={card.container}>
            <section className={card.section}>
                <div className={styles.summaryCard}>
                    <ul className={styles.summaryList}>
                        {accumulationSummary.map((summary) => (
                            <li
                                key={summary.title}
                                className={styles.summaryListItem}
                            >
                                <span className={styles.summaryTitle}>
                                    {summary.title}
                                </span>
                                <span className={styles.summaryValue}>
                                    {summary.content}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={card.toolbar}>
                    <div className={card.toolbarTop}>
                        <SegmentedToggle
                            className={card.toggleGroup}
                            buttonClassName={card.toggleButton}
                            defaultValue='ALL'
                            value={accumulationReason ?? 'ALL'}
                            options={tabOptions}
                            onChange={(nextValue) => {
                                setQuery({
                                    accumulationReason:
                                        nextValue === 'ALL'
                                            ? undefined
                                            : nextValue,
                                });
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
                    {!isMobile && (
                        <div className={card.headerRow}>
                            <div className={card.headerCell}>{t('일시')}</div>
                            <div className={card.headerCell}>{t('내용')}</div>
                            <div className={card.headerCell}>{t('지급')}</div>
                            <div className={card.headerCell}>{t('차감')}</div>
                            <div className={card.headerCell}>
                                {t('유효기간')}
                            </div>
                        </div>
                    )}

                    <LoadingWrapper isLoading={isLoading}>
                        {isEmpty(accumulationList) ? (
                            <NoResult text={t('적립금 내역이 없습니다.')} />
                        ) : isMobile ? (
                            <div className={styles.accordionContainer}>
                                <CustomAccordion
                                    items={accumulationList.map(
                                        (accumulation) => ({
                                            value: String(
                                                accumulation.accumulationNo,
                                            ),
                                            header: (
                                                <div
                                                    className={
                                                        styles.accordionHeader
                                                    }
                                                >
                                                    <div>
                                                        <p
                                                            className={
                                                                styles.accordionTitle
                                                            }
                                                        >
                                                            {
                                                                accumulation.accumulationReserveReasonDisplay
                                                            }
                                                        </p>
                                                        <p
                                                            className={
                                                                card.listCaption
                                                            }
                                                        >
                                                            {dayjs(
                                                                accumulation.registerYmdt,
                                                            ).format(
                                                                'YYYY-MM-DD',
                                                            )}{' '}
                                                            {dayjs(
                                                                accumulation.registerYmdt,
                                                            ).format(
                                                                'HH:mm:ss',
                                                            )}
                                                        </p>
                                                    </div>

                                                    <p
                                                        className={
                                                            accumulation.accumulationStatusGroupType ===
                                                            'PAYMENT'
                                                                ? styles.positive
                                                                : styles.muted
                                                        }
                                                    >
                                                        {accumulation.accumulationStatusGroupType ===
                                                        'PAYMENT'
                                                            ? `${POINT(
                                                                  accumulation.accumulationAmt,
                                                              ).format({
                                                                  pattern: `+#! (${t(
                                                                      '지급',
                                                                  )})`,
                                                              })}`
                                                            : POINT(
                                                                  accumulation.accumulationAmt,
                                                              )
                                                                  .multiply(-1)
                                                                  .format({
                                                                      negativePattern: `-#! (${t(
                                                                          '차감',
                                                                      )})`,
                                                                  })}
                                                    </p>
                                                </div>
                                            ),
                                            content: (
                                                <div
                                                    className={
                                                        styles.accordionContent
                                                    }
                                                >
                                                    <p>
                                                        {
                                                            accumulation.reasonDetail
                                                        }
                                                    </p>
                                                    {accumulation.accumulationStatusGroupType ===
                                                        'PAYMENT' && (
                                                        <p
                                                            className={
                                                                card.listCaption
                                                            }
                                                        >
                                                            {t(
                                                                '유효기간 : {{date}}',
                                                                {
                                                                    date: getExpireYmdt(
                                                                        {
                                                                            registerYmdt:
                                                                                accumulation.registerYmdt,
                                                                            expireYmdt:
                                                                                accumulation.expireYmdt,
                                                                        },
                                                                    ),
                                                                },
                                                            )}
                                                        </p>
                                                    )}
                                                </div>
                                            ),
                                        }),
                                    )}
                                />
                            </div>
                        ) : (
                            <ul>
                                {accumulationList.map((accumulation) => (
                                    <li
                                        key={accumulation.accumulationNo}
                                        className={card.listItem}
                                    >
                                        <div className={card.cell}>
                                            <p className={card.listCaption}>
                                                {dayjs(
                                                    accumulation.registerYmdt,
                                                ).format('YYYY-MM-DD')}
                                            </p>
                                            <p className={card.listCaption}>
                                                {dayjs(
                                                    accumulation.registerYmdt,
                                                ).format('HH:mm:ss')}
                                            </p>
                                        </div>

                                        <div className={card.cellAlignStart}>
                                            <span className={styles.reasonLine}>
                                                {
                                                    accumulation.accumulationReserveReasonDisplay
                                                }
                                            </span>
                                            <span className={styles.content}>
                                                {accumulation.reasonDetail}
                                            </span>
                                        </div>

                                        <div className={card.cell}>
                                            <span className={styles.positive}>
                                                {accumulation.accumulationStatusGroupType ===
                                                'PAYMENT'
                                                    ? POINT(
                                                          accumulation.accumulationAmt,
                                                      ).format({
                                                          pattern: `+#! (${t(
                                                              '지급',
                                                          )})`,
                                                      })
                                                    : '-'}
                                            </span>
                                        </div>

                                        <div className={card.cell}>
                                            <span className={styles.muted}>
                                                {accumulation.accumulationStatusGroupType ===
                                                'DEDUCTION'
                                                    ? POINT(
                                                          accumulation.accumulationAmt,
                                                      )
                                                          .multiply(-1)
                                                          .format({
                                                              negativePattern: `-#! (${t(
                                                                  '차감',
                                                              )})`,
                                                          })
                                                    : '-'}
                                            </span>
                                        </div>

                                        <div className={card.cell}>
                                            <span
                                                className={card.listCaption}
                                                dangerouslySetInnerHTML={{
                                                    __html: getExpireYmdt({
                                                        registerYmdt:
                                                            accumulation.registerYmdt,
                                                        expireYmdt:
                                                            accumulation.expireYmdt,
                                                    }),
                                                }}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </LoadingWrapper>
                </div>

                <div className={card.paging}>
                    <Paging
                        currentPage={pageNumber}
                        totalCount={totalCount}
                        pageSize={PAGE_SIZE}
                        onPageClick={(nextPage) => {
                            setQuery({ pageNumber: nextPage });
                        }}
                    />
                </div>
            </section>
        </div>
    );
};

MypageAccumulation.getLayout = (page: React.ReactNode) => (
    <MypageLayout>{page}</MypageLayout>
);

export default MypageAccumulation;
