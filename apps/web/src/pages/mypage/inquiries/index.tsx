import { isEmpty } from '@fxts/core';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/shared/components/common/loading-wrapper';
import { NoResult } from '@/shared/components/common/no-result';
import Seo from '@/shared/components/common/seo';
import { MypageLayout } from '@/shared/components/layout';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import { MypageKeywordSearchQueryFilter } from '@/components/mypage/filters/keyword-search-query-filter';
import { PeriodQueryFilter } from '@/components/mypage/filters/period-query-filter';
import { SegmentedToggle } from '@/components/mypage/filters/segmented-toggle';
import { InquiryContent } from '@/components/mypage/inquiries/accordion-content';
import { InquiryHeader } from '@/components/mypage/inquiries/accordion-header';
import { CustomAccordion } from '@/shared/ui/accordion';
import { Button } from '@/shared/ui/button';
import Paging from '@/shared/ui/paging';
import { PATHS } from '@/const/paths';
import { useMypageListQueryParams } from '@/entities/mypage/hooks/useMypageListQueryParams';
import {
    inquiriesKeywordParser,
    inquiriesSearchTypeParser,
    inquiriesStatusTabSpec,
} from '@/entities/mypage/utils/tabs';
import { useInquiryMutation } from '@/hooks/mutations';
import { useInquiryList } from '@/hooks/query/manage/inquiry';
import { useToast } from '@/hooks/ui';
import { useDialog, useResponsive } from '@/hooks/utils';
import * as styles from '@/pages/mypage/inquiries/index.css';
import { Only } from '@/shared/components/only';

const PAGE_SIZE = 10;

type SearchTypeTab = 'ALL' | 'TITLE' | 'CONTENT';

export default function MypageInquiriesPage() {
    const { t } = useTranslation();
    const router = useRouter();
    const { isMobile } = useResponsive();
    const { openAsyncDialog } = useDialog();
    const { addToast } = useToast();
    const [
        { startYmd, endYmd, pageNumber, inquiryStatus, searchType, keyword },
        setQuery,
    ] = useMypageListQueryParams(
        {
            inquiryStatus: inquiriesStatusTabSpec.parser,
            searchType: inquiriesSearchTypeParser,
            keyword: inquiriesKeywordParser,
        },
        { history: 'push' },
    );

    const tabOptions = useMemo(() => inquiriesStatusTabSpec.options(t), [t]);

    const searchTypeOptions = useMemo(
        () => [
            { value: 'ALL' as SearchTypeTab, label: t('전체') },
            { value: 'TITLE' as SearchTypeTab, label: t('제목') },
            { value: 'CONTENT' as SearchTypeTab, label: t('내용') },
        ],
        [t],
    );

    const searchParams = useMemo(
        () => ({
            pageSize: PAGE_SIZE,
            hasTotalCount: true,
            inquiryStatus: inquiryStatus === 'ALL' ? undefined : inquiryStatus,
            startYmd,
            endYmd,
            keyword: keyword || undefined,
            searchType: searchType === 'ALL' ? undefined : searchType,
            pageNumber,
        }),
        [inquiryStatus, startYmd, endYmd, keyword, searchType, pageNumber],
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
        <>
            <Seo title={t('1:1 문의')} noindex={true} />
            <div className={card.container}>
            <section className={card.section}>
                <div className={card.toolbar}>
                    <div className={card.toolbarTop}>
                        <SegmentedToggle
                            className={card.toggleGroup}
                            buttonClassName={card.toggleButton}
                            defaultValue='ALL'
                            value={inquiryStatus}
                            options={tabOptions}
                            onChange={(nextValue) => {
                                setQuery(
                                    {
                                        inquiryStatus: nextValue,
                                    },
                                    { resetPage: true },
                                );
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
                    <Only.Desktop>
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
                    </Only.Desktop>

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
        </>
    );
}

MypageInquiriesPage.getLayout = (page: React.ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};
