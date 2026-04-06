import { dehydrate, QueryClient } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import dayjs from 'dayjs';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { board } from '@/api/manage';
import Comments from '@/components/board/comments';
import { PasswordCheckBottomSheet } from '@/components/bottom-sheet/password-check';
import { ReportBottomSheet } from '@/components/bottom-sheet/report';
import ShopbyApiErrorBoundary from '@/components/error-boundary/shopby';
import { PasswordCheckModal } from '@/components/modal/password-check';
import { ReportModal } from '@/components/modal/report';
import { Button } from '@/components/ui/button';
import { Row } from '@/components/ui/layout/flex';
import { BOARD_GUEST_SECRET_PASSWORD_ERROR_CODE } from '@/const/board';
import useBoardMutation from '@/hooks/mutations/useBoardMutation';
import { useBoardConfig, useBoardPost } from '@/hooks/query/manage/board';
import { useProfile } from '@/hooks/query/member/profile';
import { boardKeys } from '@/hooks/queryKeys';
import { useAuth } from '@/hooks/useAuth';
import { useDialog, useResponsive } from '@/hooks/utils';
import { GetArticleV2Params } from '@/models/manage/board';
import * as styles from '@/pages/boards/[boardNo]/[articleNo]/index.css';
import { accessTokenCookie } from '@/utils/cookie';

export default function BoardArticle({
    boardNo,
    articleNo,
    searchParams,
    // seoData,
    errorStatusCode,
    errorMessage,
    errorCode,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { t } = useTranslation();

    const router = useRouter();

    const { isMobile } = useResponsive();

    const { openDialog, openAsyncDialog, openLoginDialog } = useDialog();

    const isLogin = useAuth();

    const { data: boardConfigData } = useBoardConfig();
    const [guestSecretPassword, setGuestSecretPassword] = useState<
        string | undefined
    >(searchParams?.password);

    const currentBoardConfig = useMemo(() => {
        if (!boardConfigData?.boardConfigs) {
            return null;
        }
        if (!boardNo) {
            return null;
        }

        return boardConfigData.boardConfigs.find(
            (config) => config.boardId === boardNo,
        );
    }, [boardConfigData, boardNo]);

    const boardArticleSearchParams = useMemo(
        () => ({
            ...searchParams,
            ...(guestSecretPassword ? { password: guestSecretPassword } : {}),
        }),
        [guestSecretPassword, searchParams],
    );

    const { data: boardArticleData } = useBoardPost({
        boardNo,
        postNo: articleNo,
        searchParams: boardArticleSearchParams,
        options: {
            enabled:
                Boolean(boardNo && articleNo) &&
                (!errorStatusCode || Boolean(guestSecretPassword)),
        },
    });

    const isReported = boardArticleData?.reported ?? false;

    const { data: profileData } = useProfile();

    const isGuestArticle =
        boardArticleData?.registerType?.toString().toUpperCase() === 'GUEST';

    const isOwner = useMemo(() => {
        if (
            boardArticleData?.registerType?.toString().toUpperCase() === 'GUEST'
        ) {
            return false;
        }

        if (!profileData?.memberNo || !boardArticleData?.registerNo) {
            return false;
        }

        return profileData.memberNo === boardArticleData.registerNo;
    }, [
        profileData?.memberNo,
        boardArticleData?.registerNo,
        boardArticleData?.registerType,
    ]);

    const isVisible = {
        modifyButton: isOwner || (isGuestArticle && !isLogin),
        reply: currentBoardConfig?.replyUsed,
    };

    const {
        delete: deleteBoardMutate,
        recommend: recommendMutate,
        cancelRecommend: cancelRecommendMutate,
        cancelReport: cancelReportMutate,
        checkEditable,
    } = useBoardMutation();
    const hasOpenedGuestSecretPasswordOverlay = useRef(false);

    const openGuestSecretPasswordOverlay = useCallback(() => {
        const onConfirmGuestSecretPassword = async (password: string) => {
            try {
                const editable = await checkEditable.mutateAsync({
                    boardNo: boardNo!,
                    articleNo: Number(articleNo!),
                    data: { password },
                });

                if (!editable) {
                    openDialog({
                        message: t('비밀번호가 일치하지 않습니다.'),
                    });
                    return false;
                }

                setGuestSecretPassword(password);

                return true;
            } catch {
                return false;
            }
        };

        overlay.open((props) =>
            isMobile ? (
                <PasswordCheckBottomSheet
                    {...props}
                    onConfirm={onConfirmGuestSecretPassword}
                />
            ) : (
                <PasswordCheckModal
                    {...props}
                    onConfirm={onConfirmGuestSecretPassword}
                />
            ),
        );
    }, [articleNo, boardNo, checkEditable, isMobile, openDialog, t]);

    const handleGuestPassword = (
        action: 'edit' | 'delete',
        targetArticleNo: number,
    ) => {
        const onConfirmGuestPassword = async (password: string) => {
            if (
                boardArticleData?.registerType?.toString().toUpperCase() !==
                'GUEST'
            ) {
                openDialog({
                    message: t(
                        '회원이 작성한 게시글은 비밀번호로 수정/삭제할 수 없습니다.',
                    ),
                });
                return false;
            }

            try {
                const editable = await checkEditable.mutateAsync({
                    boardNo: boardNo!,
                    articleNo: targetArticleNo,
                    data: { password },
                });

                if (!editable) {
                    openDialog({
                        message: t('비밀번호가 일치하지 않습니다.'),
                    });
                    return false;
                }

                if (action === 'edit') {
                    await router.push({
                        pathname: `/boards/${boardNo}/write`,
                        query: { articleNo: String(targetArticleNo) },
                    });
                    return true;
                }

                await deleteBoardMutate.mutateAsync({
                    boardNo: boardNo!,
                    articleNo: targetArticleNo,
                    data: { password },
                });

                await openAsyncDialog({
                    message: t('게시글이 삭제되었습니다.'),
                });

                router.replace(`/boards/${boardNo}`);
                return true;
            } catch {
                return false;
            }
        };

        overlay.open((props) =>
            isMobile ? (
                <PasswordCheckBottomSheet
                    {...props}
                    onConfirm={onConfirmGuestPassword}
                />
            ) : (
                <PasswordCheckModal
                    {...props}
                    onConfirm={onConfirmGuestPassword}
                />
            ),
        );
    };

    useEffect(() => {
        if (
            errorCode !== BOARD_GUEST_SECRET_PASSWORD_ERROR_CODE ||
            !errorStatusCode ||
            boardArticleData ||
            hasOpenedGuestSecretPasswordOverlay.current
        ) {
            return;
        }

        hasOpenedGuestSecretPasswordOverlay.current = true;
        openGuestSecretPasswordOverlay();
    }, [
        boardArticleData,
        errorCode,
        errorStatusCode,
        openGuestSecretPasswordOverlay,
    ]);

    const handleModifyClick = () => {
        const currentRegisterType =
            boardArticleData?.registerType?.toString().toUpperCase() ?? '';

        const isOwnerNow =
            currentRegisterType !== 'GUEST' &&
            !!profileData?.memberNo &&
            !!boardArticleData?.registerNo &&
            profileData.memberNo === boardArticleData.registerNo;

        if (isOwnerNow) {
            router.push({
                pathname: `/boards/${boardNo}/write`,
                query: { articleNo: String(articleNo) },
            });

            return;
        }

        if (currentRegisterType === 'GUEST') {
            handleGuestPassword('edit', Number(articleNo!));

            return;
        }

        openDialog({ message: t('수정 권한이 없습니다.') });
    };

    const handleDeleteClick = async () => {
        const isAgree = await openAsyncDialog({
            message: t('게시글을 삭제하시겠습니까?'),
            iconType: 'warning',
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (!isAgree) {
            return;
        }

        if (isOwner) {
            deleteBoardMutate.mutate(
                {
                    boardNo: boardNo!,
                    articleNo: Number(articleNo!),
                },
                {
                    onSuccess: async () => {
                        await openAsyncDialog({
                            message: t('게시글이 삭제되었습니다.'),
                        });

                        router.replace(`/boards/${boardNo}`);
                    },
                },
            );

            return;
        }

        if (boardArticleData?.registerType === 'GUEST') {
            handleGuestPassword('delete', Number(articleNo!));

            return;
        }

        openDialog({ message: t('삭제 권한이 없습니다.') });
    };

    const handleRecommendClick = () => {
        if (!isLogin) {
            openLoginDialog();

            return;
        }

        const canRecommend = Boolean(boardArticleData?.recommended) === false;

        if (!canRecommend) {
            cancelRecommendMutate.mutate(
                {
                    boardNo: boardNo!,
                    articleNo: Number(articleNo!),
                },
                {
                    onSuccess: () => {
                        openDialog({ message: t('추천이 취소되었습니다.') });
                    },
                    onError: () => {
                        openDialog({ message: t('추천 취소에 실패했습니다.') });
                    },
                },
            );
        } else {
            recommendMutate.mutate(
                {
                    boardNo: boardNo!,
                    articleNo: Number(articleNo!),
                },
                {
                    onSuccess: () => {
                        openDialog({ message: t('추천되었습니다.') });
                    },
                    onError: () => {
                        openDialog({ message: t('추천에 실패했습니다.') });
                    },
                },
            );
        }
    };

    const handleReportClick = async () => {
        if (!isLogin) {
            openLoginDialog();

            return;
        }

        if (isReported) {
            const isAgree = await openAsyncDialog({
                message: t('신고를 취소하시겠습니까?'),
                iconType: 'warning',
                onConfirmReturnValue: true,
                onCloseReturnValue: false,
            });

            if (!isAgree) {
                return;
            }

            cancelReportMutate.mutate(
                {
                    boardNo: boardNo!,
                    articleNo: Number(articleNo!),
                },
                {
                    onSuccess: () =>
                        openDialog({
                            message: t('신고가 취소되었습니다.'),
                        }),
                },
            );
        } else {
            overlay.open((props) =>
                isMobile ? (
                    <ReportBottomSheet
                        {...props}
                        boardNo={boardNo}
                        articleNo={Number(articleNo)}
                    />
                ) : (
                    <ReportModal
                        {...props}
                        boardNo={boardNo}
                        articleNo={Number(articleNo)}
                    />
                ),
            );
        }
    };

    if (errorStatusCode && !boardArticleData) {
        if (errorCode === BOARD_GUEST_SECRET_PASSWORD_ERROR_CODE) {
            return (
                <div
                    style={{
                        width: '60vw',
                        margin: '0 auto',
                        padding: '100px 20px',
                        textAlign: 'center',
                    }}
                >
                    <p style={{ margin: '0 0 24px', color: '#666' }}>
                        {t('비밀번호로 접근 가능한 게시글입니다.')}
                    </p>
                    <Row justify='center' gap='sm'>
                        <Button
                            frame='solid'
                            variant='primary'
                            onClick={openGuestSecretPasswordOverlay}
                        >
                            {t('비밀번호 입력')}
                        </Button>
                        <Button
                            frame='outlined'
                            onClick={() => router.push(`/boards/${boardNo}`)}
                        >
                            {t('목록으로 돌아가기')}
                        </Button>
                    </Row>
                </div>
            );
        }

        return (
            <div
                style={{
                    width: '60vw',
                    margin: '0 auto',
                    padding: '100px 20px',
                    textAlign: 'center',
                }}
            >
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    안내드립니다
                </h1>
                <p style={{ margin: '16px 0', color: '#666' }}>
                    {errorMessage}
                </p>
                {errorCode && (
                    <p
                        style={{
                            margin: '0 0 16px',
                            color: '#999',
                            fontSize: '13px',
                        }}
                    >
                        ({errorCode})
                    </p>
                )}
                <Row gap='sm'>
                    <Button
                        frame='solid'
                        variant='primary'
                        onClick={() => router.push('/')}
                    >
                        홈으로 돌아가기
                    </Button>
                    <Button
                        frame='outlined'
                        onClick={() => router.push(`/boards/${boardNo}`)}
                    >
                        목록으로 돌아가기
                    </Button>
                </Row>
            </div>
        );
    }

    return (
        <ShopbyApiErrorBoundary
            fallback={
                <div style={{ padding: '100px', textAlign: 'center' }}>
                    게시글 정보를 불러오는 중입니다...
                </div>
            }
        >
            <div className={styles.container}>
                {!isMobile && (
                    <h1 className={styles.title}>
                        {currentBoardConfig?.name ?? '게시판'}
                    </h1>
                )}

                <div className={styles.articleContainer}>
                    <div className={styles.articleHeader}>
                        <h1 className={styles.articleTitle}>
                            {boardArticleData?.title}
                        </h1>
                        <div className={styles.articleHeaderInfo}>
                            <span className={styles.articleWriter}>
                                {boardArticleData?.registerName}
                            </span>
                            <div className={styles.articleHeaderInfoRight}>
                                <span className={styles.articleRegisterYmdt}>
                                    {dayjs(
                                        boardArticleData?.registerYmdt,
                                    ).format('YYYY.MM.DD HH:mm')}
                                </span>
                                <span className={styles.viewCount}>
                                    조회 {boardArticleData?.viewCnt}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.articleContent}>
                        {boardArticleData?.content}
                    </div>
                    <ul className={styles.articleAttachmentList}>
                        {boardArticleData?.attachments.map((attachment) => (
                            <li
                                key={attachment.fileName}
                                className={styles.articleAttachmentListItem}
                            >
                                <img
                                    className={styles.attachmentImage}
                                    src={attachment.downloadFileUrl}
                                    alt={attachment.fileName}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <Row justify='end' gap='sm'>
                    {isVisible.modifyButton ? (
                        <>
                            <button
                                onClick={handleModifyClick}
                                className={styles.bottomButton}
                            >
                                수정
                            </button>
                            <button
                                onClick={handleDeleteClick}
                                className={styles.bottomButton}
                            >
                                삭제
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleRecommendClick}
                                className={styles.bottomButton}
                                aria-pressed={boardArticleData?.recommended}
                            >
                                추천 {boardArticleData?.recommendedCnt}
                            </button>
                            <button
                                onClick={handleReportClick}
                                className={styles.bottomButton}
                            >
                                {isReported ? '신고 취소' : '신고'}
                            </button>
                        </>
                    )}
                </Row>

                {isVisible.reply && (
                    <Comments
                        key={`${boardNo}-${articleNo}`}
                        boardNo={boardNo}
                        articleNo={articleNo}
                        categoryNo={boardArticleData?.categoryNo ?? undefined}
                    />
                )}

                <Link href={`/boards/${boardNo}`} className={styles.listLink}>
                    목록으로
                </Link>
            </div>
        </ShopbyApiErrorBoundary>
    );
}

export const getServerSideProps: GetServerSideProps = async ({
    res,
    req,
    params,
}) => {
    const queryClient = new QueryClient();

    const cookieCtx = { req, res };
    const accessToken = accessTokenCookie.get(cookieCtx);
    const shopbyAuthHeaders = accessToken
        ? { 'Shop-By-Authorization': `Bearer ${accessToken}` }
        : undefined;

    // boardNo는 숫자 ID가 아니라 게시판 식별자 문자열(예: "free")일 수 있음
    const boardNoParam = params?.boardNo;
    const boardNo =
        typeof boardNoParam === 'string'
            ? boardNoParam
            : Array.isArray(boardNoParam)
            ? boardNoParam[0]
            : '';
    if (!boardNo) {
        return { notFound: true };
    }

    const articleNo = Number(params?.articleNo) || 0;
    if (!articleNo) {
        return { notFound: true };
    }

    const searchParams: GetArticleV2Params = {};

    // let seoData = null;

    try {
        await queryClient.fetchQuery({
            queryKey: boardKeys.postDetail(
                String(boardNo),
                articleNo,
                searchParams,
            ),
            queryFn: async () => {
                const { data } = await board.getArticleV2(
                    String(boardNo),
                    articleNo,
                    searchParams,
                    shopbyAuthHeaders
                        ? { headers: shopbyAuthHeaders }
                        : undefined,
                );

                return data;
            },
        });

        // // ── SEO 데이터 추출 ──
        // if (productData?.baseInfo) {
        //     const { baseInfo, brand, price, reviewRate, counter } = productData;

        //     const title = brand?.name
        //         ? `[${brand.name}] ${baseInfo.productName}`
        //         : baseInfo.productName;

        //     const description =
        //         baseInfo.promotionText || baseInfo.productName || '';

        //     const image =
        //         baseInfo.imageUrls?.[0] ||
        //         baseInfo.imageUrlInfo?.[0]?.url ||
        //         '';

        //     const finalPrice =
        //         price.salePrice -
        //         (price.immediateDiscountAmt || 0) -
        //         (price.additionDiscountAmt || 0);

        //     const url = `${process.env.NEXT_PUBLIC_BASE_URL || ''}/products/${productNo}`;

        //     seoData = {
        //         title,
        //         description,
        //         image,
        //         url,
        //         priceAmount: finalPrice,
        //         brandName: brand?.name || '',
        //         jsonLd: {
        //             '@context': 'https://schema.org',
        //             '@type': 'Product',
        //             name: baseInfo.productName,
        //             image,
        //             description,
        //             ...(brand?.name && {
        //                 brand: {
        //                     '@type': 'Brand',
        //                     name: brand.name,
        //                 },
        //             }),
        //             ...(reviewRate && {
        //                 aggregateRating: {
        //                     '@type': 'AggregateRating',
        //                     ratingValue: reviewRate,
        //                     reviewCount: counter?.reviewCnt || 0,
        //                 },
        //             }),
        //             offers: {
        //                 '@type': 'Offer',
        //                 price: finalPrice,
        //                 priceCurrency: 'KRW',
        //                 availability: 'https://schema.org/InStock',
        //                 url,
        //             },
        //         },
        //     };
        // }
    } catch (error) {
        if (isAxiosError(error)) {
            const status =
                error.response?.status || HttpStatusCode.InternalServerError;

            // ⚠️ [비즈니스 에러]: 4xx 에러 (권한 없음, 존재하지 않음 등) 처리
            if (status >= 400 && status < 500) {
                res.statusCode = status; // SEO 대응

                return {
                    props: {
                        boardNo: String(boardNo),
                        articleNo,
                        searchParams,
                        errorStatusCode: status,
                        errorMessage:
                            error.response?.data?.message ||
                            '게시글을 불러올 수 없습니다.',
                        errorCode: error.response?.data?.code || '',
                    },
                };
            }

            // [시스템 에러]: 5xx 에러는 그대로 두어 클라이언트 ErrorBoundary 유도
            console.warn('🚀 getServerSideProps fetch failure:', error);
        }
    }

    return {
        props: {
            boardNo: String(boardNo),
            articleNo,
            searchParams,
            // seoData,
            dehydratedState: dehydrate(queryClient),
        },
    };
};
