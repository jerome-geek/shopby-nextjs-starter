import { isEmpty } from '@fxts/core';
import { clsx } from 'clsx';
import dayjs from 'dayjs';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import { useMemo } from 'react';

import { ProductInquiryWriteBottomSheet } from '@/components/bottom-sheet/product-inquiry-write';
import { NoResult } from '@/shared/components/common/no-result';
import { LockIcon } from '@/shared/ui/icons/LockIcon';
import { ProductInquiryWriteModal } from '@/components/modal/product-inquiry-write';
import * as styles from '@/components/product/product-tabs/inquiries/index.css';
import { useCustomDialog } from '@/features/dialog';
import { useInfiniteProductInquiryList } from '@/hooks/infiniteQuery/display/productInquiry';
import { useProductInquiryMutation } from '@/hooks/mutations';
import { useToast } from '@/hooks/ui';
import { useAuth } from '@/hooks/useAuth';
import { useDialog, useResponsive } from '@/hooks/utils';
import { vars } from '@/styles/theme.css';

const PAGE_SIZE = 2;
export const PHOTO_PAGE_SIZE = 12;

const Inquiries = () => {
    const router = useRouter();
    const productNoQuery = router.query.productNo as string;

    const productNo = Number(productNoQuery) || 0;

    const isLogin = useAuth();

    const { addToast } = useToast();
    const { openLoginDialog } = useCustomDialog();
    const { openAsyncDialog } = useDialog();

    const { isMobile } = useResponsive();

    const {
        data: infiniteProductInquiryListData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteProductInquiryList({
        productNo,
        searchParams: {
            pageNumber: 1,
            pageSize: PAGE_SIZE,
            hasTotalCount: true,
            isMyInquiries: false,
        },
    });

    const inquiries = useMemo(
        () =>
            infiniteProductInquiryListData?.pages.flatMap(
                (page) => page.items,
            ) ?? [],
        [infiniteProductInquiryListData],
    );
    const totalCount =
        Number(infiniteProductInquiryListData?.pages[0]?.totalCount) || 0;

    const openProductInquiryOverlay = (inquiryNo?: number) => {
        if (!isLogin) {
            openLoginDialog();
            return;
        }

        overlay.open((props) =>
            isMobile ? (
                <ProductInquiryWriteBottomSheet
                    {...props}
                    productNo={productNo}
                    inquiryNo={inquiryNo}
                />
            ) : (
                <ProductInquiryWriteModal
                    {...props}
                    productNo={productNo}
                    inquiryNo={inquiryNo}
                />
            ),
        );
    };

    const { remove } = useProductInquiryMutation();

    const handleDeleteInquiry = async (inquiryNo: number) => {
        const isAgree = await openAsyncDialog({
            type: 'confirm',
            message: '상품 문의를 삭제하시겠습니까?',
            iconType: 'warning',
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (!isAgree) {
            return;
        }

        remove.mutate(inquiryNo, {
            onSuccess: () => {
                addToast({ message: '상품 문의가 삭제되었습니다.' });
            },
        });
    };

    return (
        <section className={styles.container}>
            <div className={styles.headerContainer}>
                <div className={styles.header}>
                    <span className={styles.title}>
                        상품 문의 ({totalCount || 0})
                    </span>

                    <button
                        type='button'
                        className={styles.createInquiryButton}
                        onClick={() => openProductInquiryOverlay()}
                    >
                        문의하기
                        <ChevronRight
                            size={16}
                            strokeWidth={1.5}
                            stroke={vars.color.gray['60']}
                        />
                    </button>
                </div>
            </div>

            {isEmpty(inquiries) ? (
                <NoResult
                    text='등록된 상품 문의가 없습니다.'
                    style={{
                        height: '150px',
                    }}
                />
            ) : (
                <>
                    <ul className={styles.list}>
                        {inquiries.map((item) => {
                            const isSecreted = !item.myInquiry && item.secreted;
                            const isReplied =
                                item.replied && !isEmpty(item.answers);

                            return (
                                <li
                                    key={item.inquiryNo}
                                    className={styles.item}
                                >
                                    <div className={styles.itemHeader}>
                                        <div
                                            className={styles.contentContainer}
                                        >
                                            <div className={styles.titleRow}>
                                                {item.secreted ? (
                                                    <LockIcon
                                                        width={15}
                                                        height={16}
                                                        currentColor={
                                                            vars.color.black
                                                        }
                                                    />
                                                ) : null}
                                                <span
                                                    className={styles.titleText}
                                                >
                                                    {isSecreted
                                                        ? '비밀글입니다.'
                                                        : item.title}
                                                </span>
                                            </div>

                                            {!isSecreted && (
                                                <p
                                                    className={
                                                        styles.contentText
                                                    }
                                                >
                                                    {item.content}
                                                </p>
                                            )}

                                            <div className={styles.metaText}>
                                                <span>
                                                    {dayjs(
                                                        item.registerYmdt,
                                                    ).format('YYYY.MM.DD')}
                                                </span>
                                                <span>·</span>
                                                <span>{item.registerName}</span>
                                            </div>
                                        </div>

                                        <div className={styles.metaRight}>
                                            {item.myInquiry && !isReplied && (
                                                <>
                                                    <button
                                                        type='button'
                                                        className={
                                                            styles.metaRightButton
                                                        }
                                                        onClick={() =>
                                                            openProductInquiryOverlay(
                                                                item.inquiryNo,
                                                            )
                                                        }
                                                    >
                                                        수정
                                                    </button>
                                                    <span>·</span>
                                                    <button
                                                        type='button'
                                                        className={
                                                            styles.metaRightButton
                                                        }
                                                        onClick={() =>
                                                            handleDeleteInquiry(
                                                                item.inquiryNo,
                                                            )
                                                        }
                                                    >
                                                        삭제
                                                    </button>
                                                </>
                                            )}
                                            <span
                                                className={clsx(
                                                    styles.statusBadge,
                                                    item.replied &&
                                                        styles.statusBadgeDone,
                                                )}
                                            >
                                                {isReplied
                                                    ? '답변완료'
                                                    : '답변대기'}
                                            </span>
                                        </div>
                                    </div>

                                    {!isSecreted && isReplied ? (
                                        <div className={styles.contentBox}>
                                            {item.answers
                                                .filter((a) => a?.content)
                                                .map((answer) => (
                                                    <p
                                                        key={`${answer.inquiryNo}-${answer.registerYmdt}`}
                                                        className={
                                                            styles.contentPreview
                                                        }
                                                    >
                                                        {answer.content}
                                                    </p>
                                                ))}
                                        </div>
                                    ) : null}
                                </li>
                            );
                        })}
                    </ul>

                    {hasNextPage ? (
                        <button
                            type='button'
                            className={styles.loadMoreButton}
                            disabled={isFetchingNextPage}
                            onClick={() => fetchNextPage()}
                        >
                            <ChevronDown
                                size={20}
                                strokeWidth={1.5}
                                color={vars.color.black}
                            />
                            상품 문의 더보기
                        </button>
                    ) : null}
                </>
            )}
        </section>
    );
};

export default Inquiries;
