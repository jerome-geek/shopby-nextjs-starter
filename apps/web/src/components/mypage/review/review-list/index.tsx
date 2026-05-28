import { isEmpty } from '@fxts/core';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/shared/components/common/loading-wrapper';
import { NoResult } from '@/shared/components/common/no-result';
import ReviewStartIcon from '@/shared/ui/icons/ReviewStartIcon';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import OptionText from '@/components/mypage/common/option-text';
import * as styles from '@/components/mypage/review/review-list/index.css';
import { Button } from '@/shared/ui/button';
import Paging from '@/shared/ui/paging';
import { useMypageListQueryParams } from '@/entities/mypage/hooks/useMypageListQueryParams';
import { useMyReviewList } from '@/hooks/query/display/review';
import { useResponsive } from '@/hooks/utils';
import { Only } from '@/shared/components/only';

const PAGE_SIZE = 12;

export const MyReviewListView = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const { isMobile } = useResponsive();

    const [{ startYmd, endYmd, pageNumber }, setQuery] =
        useMypageListQueryParams();

    const searchParams = useMemo(
        () => ({
            pageNumber,
            pageSize: PAGE_SIZE,
            hasTotalCount: true,
            startYmd,
            endYmd,
        }),
        [pageNumber, startYmd, endYmd],
    );

    const { data: myReviewListData, isLoading: isMyReviewListLoading } =
        useMyReviewList({
            searchParams,
        });

    const myReviewList = useMemo(() => {
        return myReviewListData?.items ?? [];
    }, [myReviewListData]);

    const totalCount = myReviewListData?.totalCount ?? 0;

    return (
        <>
            <Only.Desktop>
                <div
                    className={card.headerRow}
                    style={{ gridTemplateColumns: '1.6fr 0.6fr 0.8fr 0.7fr' }}
                >
                    <div className={card.headerCell}>{t('상품정보')}</div>
                    <div className={card.headerCell}>{t('평점')}</div>
                    <div className={card.headerCell}>{t('등록일')}</div>
                    <div className={card.headerCell}>{t('선택')}</div>
                </div>
            </Only.Desktop>

            <LoadingWrapper isLoading={isMyReviewListLoading}>
                {isEmpty(myReviewList) ? (
                    <NoResult text={t('작성한 리뷰가 없습니다.')} />
                ) : (
                    <ul>
                        {myReviewList.map((item) => (
                            <li
                                key={`${item.reviewNo}-${item.productNo}`}
                                className={card.listItem}
                                style={{
                                    gridTemplateColumns: isMobile
                                        ? '1fr'
                                        : '1.6fr 0.6fr 0.8fr 0.7fr',
                                }}
                            >
                                <div className={card.cellAlignStart}>
                                    <div className={styles.productCell}>
                                        <Link
                                            href={`/products/${item.productNo}`}
                                            prefetch={false}
                                        >
                                            <img
                                                src={item.imageUrl}
                                                alt={item.productName}
                                                className={styles.image}
                                                loading='lazy'
                                            />
                                        </Link>

                                        <div className={styles.productText}>
                                            <p className={styles.orderNo}>
                                                {`${t('주문번호')} ${
                                                    item.orderNo
                                                }`}
                                            </p>
                                            <p className={styles.productName}>
                                                {item.productName}
                                            </p>
                                            <OptionText
                                                optionName={
                                                    item.orderedOption
                                                        ?.optionName
                                                }
                                                optionValue={
                                                    item.orderedOption
                                                        ?.optionValue
                                                }
                                                productName={item.productName}
                                                inputs={
                                                    item.orderedOption?.inputs
                                                }
                                                orderCnt={
                                                    item.orderedOption?.orderCnt
                                                }
                                            />

                                            <Only.Mobile>
                                                <div
                                                    className={
                                                        styles.mobileMeta
                                                    }
                                                >
                                                    <span
                                                        className={
                                                            styles.mobileDate
                                                        }
                                                    >
                                                        {`${t(
                                                            '등록일',
                                                        )} ${dayjs(
                                                            item.registerYmdt,
                                                        ).format(
                                                            'YYYY-MM-DD',
                                                        )}`}
                                                    </span>
                                                    <span
                                                        className={
                                                            styles.mobileRate
                                                        }
                                                    >
                                                        {`${t(
                                                            '평점',
                                                        )} ${item.rate.toFixed(
                                                            1,
                                                        )} / 5.0`}
                                                    </span>
                                                </div>
                                            </Only.Mobile>
                                        </div>
                                    </div>
                                </div>

                                <Only.Desktop>
                                    <div className={card.cell}>
                                        <div className={styles.starRow}>
                                            {[1, 2, 3, 4, 5].map((n) => {
                                                const filled = item.rate >= n;
                                                return (
                                                    <ReviewStartIcon
                                                        key={n}
                                                        filled={filled}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className={card.cell}>
                                        <span className={card.listCaption}>
                                            {dayjs(item.registerYmdt).format(
                                                'YYYY-MM-DD',
                                            )}
                                        </span>
                                    </div>
                                </Only.Desktop>

                                <div className={card.cell}>
                                    <Button
                                        type='button'
                                        frame='outlined'
                                        variant='secondary'
                                        className={styles.detailButton}
                                        onClick={() => {
                                            router.push({
                                                pathname: `/mypage/reviews/${item.reviewNo}`,
                                                query: {
                                                    productNo: String(
                                                        item.productNo,
                                                    ),
                                                },
                                            });
                                        }}
                                    >
                                        {t('상세보기')}
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                <div className={card.paging}>
                    <Paging
                        currentPage={pageNumber}
                        totalCount={totalCount}
                        pageSize={PAGE_SIZE}
                        onPageClick={(page) => setQuery({ pageNumber: page })}
                    />
                </div>
            </LoadingWrapper>
        </>
    );
};
