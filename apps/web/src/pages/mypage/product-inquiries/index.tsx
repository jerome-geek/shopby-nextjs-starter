import { isEmpty } from '@fxts/core';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/shared/components/common/loading-wrapper';
import { NoResult } from '@/shared/components/common/no-result';
import Seo from '@/shared/components/common/seo';
import { MypageLayout } from '@/shared/components/layout';
import * as card from '@/features/mypage/common/mypage-list-card/index.css';
import { MypageKeywordSearchQueryFilter } from '@/features/mypage/filters/keyword-search-query-filter';
import { PeriodQueryFilter } from '@/features/mypage/filters/period-query-filter';
import { SegmentedToggle } from '@/features/mypage/filters/segmented-toggle';
import { ProductInquiryContent } from '@/components/mypage/product-inquiries/accordion-content';
import { ProductInquiryHeader } from '@/components/mypage/product-inquiries/accordion-header';
import { CustomAccordion } from '@/shared/ui/accordion';
import { Button } from '@/shared/ui/button';
import Paging from '@/shared/ui/paging';
import { PATHS } from '@/const/paths';
import { useMypageListQueryParams } from '@/entities/mypage/hooks/useMypageListQueryParams';
import {
    productInquiriesAnsweredTabSpec,
    productInquiriesSearchKeywordParser,
    productInquiriesSearchTypeParser,
} from '@/entities/mypage/utils/tabs';
import { useProductInquiryMutation } from '@/hooks/mutations';
import { useMall } from '@/hooks/query/admin/mall';
import { useMyProductInquiryList } from '@/hooks/query/display/productInquiry';
import { useProfile } from '@/hooks/query/member/profile';
import { useToast } from '@/hooks/ui';
import { useDialog, useResponsive } from '@/hooks/utils';
import * as styles from '@/pages/mypage/product-inquiries/index.css';
import { Only } from '@/shared/components/only';

const PAGE_SIZE = 10;

export default function MypageProductInquiriesPage() {
    const { t } = useTranslation();
    const router = useRouter();
    const { isMobile } = useResponsive();
    const { openAsyncDialog } = useDialog();
    const { addToast } = useToast();

    const { data: profileData } = useProfile();
    const { data: mallData } = useMall();

    const [
        { startYmd, endYmd, pageNumber, answered, searchType, searchKeyword },
        setQuery,
    ] = useMypageListQueryParams(
        {
            answered: productInquiriesAnsweredTabSpec.parser,
            searchType: productInquiriesSearchTypeParser,
            searchKeyword: productInquiriesSearchKeywordParser,
        },
        { history: 'push' },
    );

    const parsedAnswered = useMemo(
        () => productInquiriesAnsweredTabSpec.resolveAnsweredParam(answered),
        [answered],
    );
    const parsedSearchType = useMemo(
        () => (searchType === 'ALL' ? undefined : searchType),
        [searchType],
    );

    const tabOptions = useMemo(
        () => productInquiriesAnsweredTabSpec.options(t),
        [t],
    );

    const searchTypeOptions = useMemo(
        () => [
            { value: 'ALL' as const, label: t('전체') },
            { value: 'PRODUCT_NAME' as const, label: t('상품명') },
            { value: 'CONTENT' as const, label: t('내용') },
        ],
        [t],
    );

    const searchParams = useMemo(
        () => ({
            pageSize: PAGE_SIZE,
            hasTotalCount: true,
            startYmd,
            endYmd,
            answered: parsedAnswered,
            searchKeyword: searchKeyword || undefined,
            searchType: parsedSearchType,
            pageNumber,
        }),
        [
            startYmd,
            endYmd,
            parsedAnswered,
            searchKeyword,
            parsedSearchType,
            pageNumber,
        ],
    );

    const { data: myProductInquiryListData, isLoading } =
        useMyProductInquiryList({
            searchParams,
            memberNo: profileData?.memberNo || 0,
            options: {
                enabled: profileData?.memberNo !== 0,
            },
        });

    const inquiryList = myProductInquiryListData?.items ?? [];
    const totalCount = myProductInquiryListData?.totalCount ?? 0;

    const parseInquiryTypeName = useCallback(
        (type: string) =>
            mallData?.productInquiryType.find((row) => row.value === type)
                ?.label,
        [mallData?.productInquiryType],
    );

    const {
        remove: { mutate: removeProductInquiryMutate },
    } = useProductInquiryMutation();

    const onDeleteButtonClick = useCallback(
        async (inquiryNo: number) => {
            const isAgree = await openAsyncDialog({
                type: 'confirm',
                message: t('상품 문의를 삭제하시겠습니까?'),
                iconType: 'warning',
                onConfirmReturnValue: true,
                onCloseReturnValue: false,
            });

            if (!isAgree) {
                return;
            }

            removeProductInquiryMutate(inquiryNo, {
                onSuccess: () => {
                    addToast({ message: t('상품 문의가 삭제되었습니다.') });
                },
            });
        },
        [addToast, openAsyncDialog, removeProductInquiryMutate, t],
    );

    return (
        <>
            <Seo title={t('상품 문의')} noindex={true} />
            <div className={card.container}>
            <section className={card.section}>
                <div className={card.toolbar}>
                    <div className={card.toolbarTop}>
                        <SegmentedToggle
                            className={card.toggleGroup}
                            buttonClassName={card.toggleButton}
                            defaultValue='ALL'
                            value={answered}
                            options={tabOptions}
                            onChange={(nextValue) => {
                                setQuery(
                                    { answered: nextValue },
                                    { resetPage: true },
                                );
                            }}
                        />

                        <PeriodQueryFilter />
                    </div>

                    <MypageKeywordSearchQueryFilter
                        keywordKey='searchKeyword'
                        typeKey='searchType'
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
                                            PATHS.MYPAGE.PRODUCT_INQUIRIES
                                                .REGISTER,
                                        )
                                    }
                                >
                                    {t('상품 문의 등록')}
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
                                gridTemplateColumns:
                                    '0.85fr 1fr 1.4fr 1.4fr 0.75fr',
                            }}
                        >
                            <div className={card.headerCell}>
                                {t('답변 상태')}
                            </div>
                            <div className={card.headerCell}>
                                {t('문의 유형')}
                            </div>
                            <div className={card.headerCell}>{t('제목')}</div>
                            <div className={card.headerCell}>
                                {t('상품 정보')}
                            </div>
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
                                            : styles.desktopAccordionItem
                                    }
                                    items={inquiryList.map((inquiry) => ({
                                        value: String(inquiry.inquiryNo),
                                        header: (
                                            <ProductInquiryHeader
                                                variant={
                                                    isMobile
                                                        ? 'mobile'
                                                        : 'desktop'
                                                }
                                                replied={inquiry.replied}
                                                inquiryTitle={inquiry.title}
                                                registerYmdt={
                                                    inquiry.registerYmdt
                                                }
                                                inquiryTypeName={parseInquiryTypeName(
                                                    inquiry.type,
                                                )}
                                                secreted={inquiry.secreted}
                                                productName={
                                                    inquiry.productName
                                                }
                                                imageUrl={inquiry.imageUrl}
                                                productNo={inquiry.productNo}
                                            />
                                        ),
                                        content: (
                                            <ProductInquiryContent
                                                {...inquiry}
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

MypageProductInquiriesPage.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};
