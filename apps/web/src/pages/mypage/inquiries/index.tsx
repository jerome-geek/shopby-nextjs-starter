import { isEmpty } from '@fxts/core';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/components/common/loading-wrapper';
import { NoResult } from '@/components/common/no-result';
import { MypageLayout } from '@/components/layout';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import { MypageKeywordSearchQueryFilter } from '@/components/mypage/filters/keyword-search-query-filter';
import { PeriodQueryFilter } from '@/components/mypage/filters/period-query-filter';
import { SegmentedToggle } from '@/components/mypage/filters/segmented-toggle';
import { InquiryContent } from '@/components/mypage/inquiries/accordion-content';
import { InquiryHeader } from '@/components/mypage/inquiries/accordion-header';
import { CustomAccordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Paging from '@/components/ui/paging';
import { PATHS } from '@/const/paths';
import { useInquiryMutation } from '@/hooks/mutations';
import { useInquiryList } from '@/hooks/query/manage/inquiry';
import { useToast } from '@/hooks/ui';
import { useDialog, useResponsive } from '@/hooks/utils';
import type { InquirySearchType, InquiryStatusType } from '@/models';
import * as styles from '@/pages/mypage/inquiries/index.css';

const PAGE_SIZE = 10;

type SearchTypeTab = 'ALL' | 'TITLE' | 'CONTENT';

const toInquiryStatus = (value?: string): InquiryStatusType | undefined => {
    switch (value) {
        case 'ISSUED':
        case 'ANSWERED':
            return value;
        default:
            return undefined;
    }
};

const toSearchType = (value?: string): InquirySearchType | undefined => {
    switch (value) {
        case 'ALL':
        case 'TITLE':
        case 'CONTENT':
            return value;
        default:
            return undefined;
    }
};

export const MypageInquiries = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { isMobile } = useResponsive();
    const { openAsyncDialog } = useDialog();
    const { addToast } = useToast();

    const inquiryStatusQuery = router.query.inquiryStatus as string | undefined;
    const searchTypeQuery =
        (router.query.searchType as string | undefined) ?? 'ALL';
    const keywordQuery = router.query.keyword as string | undefined;

    const startYmd = String(router.query.startYmd ?? '') || undefined;
    const endYmd = String(router.query.endYmd ?? '') || undefined;
    const pageNumber = Number(router.query.pageNumber) || 1;

    const parseInquiryStatus = useMemo(
        () => toInquiryStatus(inquiryStatusQuery),
        [inquiryStatusQuery],
    );

    const parseSearchType = useMemo(
        () => toSearchType(searchTypeQuery),
        [searchTypeQuery],
    );

    const tabOptions = useMemo(
        () => [
            { value: 'ALL' as const, label: t('전체') },
            { value: 'ISSUED' as const, label: t('답변 대기') },
            { value: 'ANSWERED' as const, label: t('답변 완료') },
        ],
        [t],
    );

    const searchTypeOptions = useMemo(
        () => [
            { value: 'ALL' as SearchTypeTab, label: t('전체') },
            { value: 'TITLE' as SearchTypeTab, label: t('제목') },
            { value: 'CONTENT' as SearchTypeTab, label: t('내용') },
        ],
        [t],
    );

    const setQuery = useCallback(
        (next: Record<string, string | number | undefined>) => {
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
        },
        [router],
    );

    const searchParams = useMemo(
        () => ({
            pageSize: PAGE_SIZE,
            hasTotalCount: true,
            inquiryStatus: parseInquiryStatus,
            startYmd,
            endYmd,
            keyword: keywordQuery || undefined,
            searchType: parseSearchType,
            pageNumber,
        }),
        [
            parseInquiryStatus,
            startYmd,
            endYmd,
            keywordQuery,
            parseSearchType,
            pageNumber,
        ],
    );

    const { data: inquiryListData, isLoading: isInquiryListLoading } =
        useInquiryList({
            searchParams,
        });

    const inquiryList = inquiryListData?.items ?? [];
    const totalCount = inquiryListData?.totalCount ?? 0;
    const isLoading = isInquiryListLoading;

    const {
        delete: { mutate: deleteInquiryMutate },
    } = useInquiryMutation();

    const onDeleteButtonClick = useCallback(
        async (inquiryNo: number) => {
            const isAgree = await openAsyncDialog({
                type: 'confirm',
                message: t('1:1 문의를 삭제하시겠습니까?'),
                iconType: 'warning',
                onConfirmReturnValue: true,
                onCloseReturnValue: false,
            });

            if (!isAgree) {
                return;
            }

            deleteInquiryMutate(
                { inquiryNo },
                {
                    onSuccess: () => {
                        addToast({
                            message: t('1:1 문의가 삭제되었습니다.'),
                        });
                    },
                },
            );
        },
        [addToast, deleteInquiryMutate, openAsyncDialog, t],
    );

    return (
        <div className={card.container}>
            <section className={card.section}>
                <div className={card.toolbar}>
                    <div className={card.toolbarTop}>
                        <SegmentedToggle
                            className={card.toggleGroup}
                            buttonClassName={card.toggleButton}
                            defaultValue='ALL'
                            value={parseInquiryStatus ?? 'ALL'}
                            options={tabOptions}
                            onChange={(nextValue) => {
                                setQuery({
                                    inquiryStatus:
                                        nextValue === 'ALL'
                                            ? undefined
                                            : nextValue,
                                });
                            }}
                        />

                        <PeriodQueryFilter />
                    </div>

                    <MypageKeywordSearchQueryFilter
                        typeOptions={searchTypeOptions}
                        typeDefault='ALL'
                        typeOmitValue='ALL'
                    />

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

                            <div className={card.metaRowRight}>
                                <Button
                                    type='button'
                                    frame='solid'
                                    variant='primary'
                                    className={card.registerButton}
                                    onClick={() =>
                                        router.push(
                                            PATHS.MYPAGE.INQUIRIES.REGISTER,
                                        )
                                    }
                                >
                                    {t('문의 등록')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={card.list}>
                    {!isMobile && (
                        <div
                            className={card.headerRow}
                            style={{
                                gridTemplateColumns: '0.85fr 1fr 1.4fr 0.75fr',
                            }}
                        >
                            <div className={card.headerCell}>
                                {t('답변 상태')}
                            </div>
                            <div className={card.headerCell}>
                                {t('문의 유형')}
                            </div>
                            <div className={card.headerCell}>{t('제목')}</div>
                            <div className={card.headerCell}>{t('등록일')}</div>
                        </div>
                    )}

                    <LoadingWrapper isLoading={isLoading}>
                        {isEmpty(inquiryList) ? (
                            <NoResult text={t('등록된 내역이 없습니다.')} />
                        ) : (
                            <div className={styles.accordionContainer}>
                                <CustomAccordion
                                    iconPlacement={
                                        isMobile ? 'inline' : 'overlay'
                                    }
                                    itemClassName={
                                        isMobile
                                            ? undefined
                                            : styles.inquiryDesktopAccordionItem
                                    }
                                    items={inquiryList.map((item) => ({
                                        value: String(item.inquiryNo),
                                        header: (
                                            <InquiryHeader
                                                variant={
                                                    isMobile
                                                        ? 'mobile'
                                                        : 'desktop'
                                                }
                                                answer={item.answer}
                                                inquiryTitle={item.inquiryTitle}
                                                registerYmdt={item.registerYmdt}
                                                inquiryTypeName={
                                                    item.inquiryType
                                                        .inquiryTypeName
                                                }
                                            />
                                        ),
                                        content: (
                                            <InquiryContent
                                                {...item}
                                                onDeleteButtonClick={
                                                    onDeleteButtonClick
                                                }
                                            />
                                        ),
                                    }))}
                                />
                            </div>
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

MypageInquiries.getLayout = (page: React.ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};

export default MypageInquiries;
