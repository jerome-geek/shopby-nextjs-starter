import { isEmpty } from '@fxts/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/shared/components/common/loading-wrapper';
import { NoResult } from '@/shared/components/common/no-result';
import * as card from '@/features/mypage/common/mypage-list-card/index.css';
import OptionText from '@/features/mypage/common/option-text';
import * as styles from '@/features/mypage/review/reviewable-list/index.css';
import { Button } from '@/shared/ui';
import Paging from '@/shared/ui/paging';
import { ORDER_STATUS_MAP } from '@/const/label';
import { PATHS } from '@/const/paths';
import { useMypageListQueryParams } from '@/entities/mypage/hooks/useMypageListQueryParams';
import { useReviewableProductList } from '@/hooks/query/display/review';
import { useResponsive } from '@/hooks/utils';
import { Only } from '@/shared/components/only';

const PAGE_SIZE = 12;

export const ReviewableListView = () => {
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
            startDate: startYmd,
            endDate: endYmd,
        }),
        [pageNumber, startYmd, endYmd],
    );

    const {
        data: isReviewableProductListData,
        isLoading: isReviewableProductListLoading,
    } = useReviewableProductList({
        searchParams,
    });

    const reviewableProductList = useMemo(() => {
        return isReviewableProductListData?.items ?? [];
    }, [isReviewableProductListData]);

    const totalCount = isReviewableProductListData?.totalCount ?? 0;

    return (
        <>
            <Only.Desktop>
                <div
                    className={card.headerRow}
                    style={{ gridTemplateColumns: '1.6fr 0.8fr 0.8fr' }}
                >
                    <div className={card.headerCell}>{t('상품정보')}</div>
                    <div className={card.headerCell}>{t('주문상태')}</div>
                    <div className={card.headerCell}>{t('선택')}</div>
                </div>
            </Only.Desktop>

            <LoadingWrapper isLoading={isReviewableProductListLoading}>
                {isEmpty(reviewableProductList) ? (
                    <NoResult text={t('작성 가능한 리뷰가 없습니다.')} />
                ) : (
                    <ul>
                        {reviewableProductList.map((item) => (
                            <li
                                key={`${item.orderNo}-${item.productNo}-${item.orderOptionNo}`}
                                className={card.listItem}
                                style={{
                                    gridTemplateColumns: isMobile
                                        ? '1fr'
                                        : '1.6fr 0.8fr 0.8fr',
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

                                            <Only.Mobile>
                                                <div className={card.cell}>
                                                    <span
                                                        className={
                                                            item.orderStatusType ===
                                                            'BUY_CONFIRM'
                                                                ? styles.primaryStatus
                                                                : styles.status
                                                        }
                                                    >
                                                        {t(
                                                            ORDER_STATUS_MAP[
                                                                item.orderStatusType as keyof typeof ORDER_STATUS_MAP
                                                            ] ??
                                                                item.orderStatusType,
                                                        )}
                                                    </span>
                                                </div>
                                            </Only.Mobile>

                                            <p className={styles.productName}>
                                                {item.productName}
                                            </p>

                                            <OptionText
                                                optionName={item.optionName}
                                                optionValue={item.optionValue}
                                                productName={item.productName}
                                                inputs={item.inputs}
                                                orderCnt={item.orderCnt}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Only.Desktop>
                                    <div className={card.cell}>
                                        <span
                                            className={
                                                item.orderStatusType ===
                                                'BUY_CONFIRM'
                                                    ? styles.primaryStatus
                                                    : styles.status
                                            }
                                        >
                                            {t(
                                                ORDER_STATUS_MAP[
                                                    item.orderStatusType as keyof typeof ORDER_STATUS_MAP
                                                ] ?? item.orderStatusType,
                                            )}
                                        </span>
                                    </div>
                                </Only.Desktop>

                                <div className={card.cell}>
                                    <div className={styles.actionRow}>
                                        <Button
                                            frame='outlined'
                                            variant='secondary'
                                            type='button'
                                            className={styles.writeButton}
                                            onClick={() => {
                                                router.push({
                                                    pathname:
                                                        PATHS.MYPAGE.REVIEWS.WRITE.replace(
                                                            '[productNo]',
                                                            String(
                                                                item.productNo,
                                                            ),
                                                        ),
                                                    query: {
                                                        optionNo: String(
                                                            item.optionNo,
                                                        ),
                                                        orderOptionNo: String(
                                                            item.orderOptionNo,
                                                        ),
                                                        orderNo: String(
                                                            item.orderNo,
                                                        ),
                                                    },
                                                });
                                            }}
                                        >
                                            {t('리뷰 작성')}
                                        </Button>
                                    </div>
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
