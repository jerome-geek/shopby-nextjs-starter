import { dehydrate, QueryClient } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import dayjs from 'dayjs';
import { type GetStaticPaths, type GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { board } from '@/api/manage';
import Comments from '@/components/board/comments';
import { PasswordCheckBottomSheet } from '@/components/bottom-sheet/password-check';
import { ReportBottomSheet } from '@/components/bottom-sheet/report';
import { Error } from '@/components/common/error';
import Seo from '@/components/common/seo';
import ShopbyApiErrorBoundary from '@/components/error-boundary/shopby';
import { PasswordCheckModal } from '@/components/modal/password-check';
import { ReportModal } from '@/components/modal/report';
import { Column, Row } from '@/components/ui/layout/flex';
import useBoardMutation from '@/hooks/mutations/useBoardMutation';
import { useBoardPost } from '@/hooks/query/manage/board';
import { useProfile } from '@/hooks/query/member/profile';
import { boardKeys } from '@/hooks/queryKeys';
import useBoardConfig from '@/hooks/suspenseQuery/manage/board/useBoardConfig';
import { useToast } from '@/hooks/ui';
import { useAuth } from '@/hooks/useAuth';
import { useDialog, useResponsive } from '@/hooks/utils';
import { GetArticleV2Params } from '@/models/manage/board';
import * as styles from '@/pages/boards/[boardId]/[articleNo]/index.css';
import { accessTokenCookie } from '@/utils/cookie';

export default function BoardArticle({
    boardNo,
    articleNo,
    searchParams,
    seoData,
    errorStatusCode,
    errorMessage,
    errorCode,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const { t } = useTranslation();

    const router = useRouter();

    const { isMobile } = useResponsive();

    const { openAsyncDialog, openLoginDialog } = useDialog();

    const { addToast } = useToast();

    const isLogin = useAuth();

    const { data: boardConfigData } = useBoardConfig();
    const [guestSecretPassword, setGuestSecretPassword] = useState<
        string | undefined
    >(searchParams?.password);

    const currentBoardConfig = useMemo(() => {
        if (!boardNo) {
            return null;
        }

        return (
            boardConfigData.boardConfigs.find(
                (config) => config.boardId === boardNo,
            ) ?? null
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

    const visibility = {
        isVisibleModifyButton: isOwner || (isGuestArticle && !isLogin),
        isVisibleReply: currentBoardConfig?.replyUsed,
    };

    const {
        delete: deleteBoardMutate,
        recommend: recommendMutate,
        cancelRecommend: cancelRecommendMutate,
        cancelReport: cancelReportMutate,
        checkEditable,
    } = useBoardMutation();

    const submitGuestSecretPassword = useCallback(
        async (password: string) => {
            try {
                const editable = await checkEditable.mutateAsync({
                    boardNo: boardNo!,
                    articleNo: Number(articleNo!),
                    data: { password },
                });

                if (!editable) {
                    addToast({
                        message: t('비밀번호가 일치하지 않습니다.'),
                    });
                    return false;
                }

                setGuestSecretPassword(password);
                return true;
            } catch {
                return false;
            }
        },
        [addToast, articleNo, boardNo, checkEditable, t],
    );

    const handleGuestPassword = (
        action: 'edit' | 'delete',
        targetArticleNo: number,
    ) => {
        const onConfirmGuestPassword = async (password: string) => {
            if (
                boardArticleData?.registerType?.toString().toUpperCase() !==
                'GUEST'
            ) {
                addToast({
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
                    addToast({
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

                addToast({
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

        addToast({ message: t('수정 권한이 없습니다.') });
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
                        addToast({
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

        addToast({ message: t('삭제 권한이 없습니다.') });
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
                        addToast({
                            message: t('추천이 취소되었습니다.'),
                        });
                    },
                    onError: () => {
                        addToast({ message: t('추천 취소에 실패했습니다.') });
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
                        addToast({
                            message: t('추천되었습니다.'),
                        });
                    },
                    onError: () => {
                        addToast({ message: t('추천에 실패했습니다.') });
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
                        addToast({
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

    // 비회원 비밀번호 인증 성공 시에는 상세 조회를 다시 시도한다.
    if (errorStatusCode && !guestSecretPassword) {
        return (
            <Error
                errorCode={errorCode}
                errorMessage={errorMessage}
                onSubmitGuestPassword={submitGuestSecretPassword}
            />
        );
    }

    return (
        <>
            {seoData && <Seo type='article' {...seoData} />}

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

                    <Column gap='sm'>
                        <div className={styles.articleContainer}>
                            <div className={styles.articleHeader}>
                                <h1 className={styles.articleTitle}>
                                    {boardArticleData?.title}
                                </h1>
                                <div className={styles.articleHeaderInfo}>
                                    <span className={styles.articleWriter}>
                                        {boardArticleData?.registerName}
                                    </span>
                                    <div
                                        className={
                                            styles.articleHeaderInfoRight
                                        }
                                    >
                                        <span
                                            className={
                                                styles.articleRegisterYmdt
                                            }
                                        >
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
                                {boardArticleData?.attachments.map(
                                    (attachment) => (
                                        <li
                                            key={attachment.fileName}
                                            className={
                                                styles.articleAttachmentListItem
                                            }
                                        >
                                            <img
                                                className={
                                                    styles.attachmentImage
                                                }
                                                src={attachment.downloadFileUrl}
                                                alt={attachment.fileName}
                                            />
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>
                        <Row justify='end' gap='sm'>
                            {visibility.isVisibleModifyButton ? (
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
                                        aria-pressed={
                                            boardArticleData?.recommended
                                        }
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
                    </Column>

                    {visibility.isVisibleReply && (
                        <Comments
                            key={`${boardNo}-${articleNo}`}
                            boardNo={boardNo}
                            articleNo={articleNo}
                            categoryNo={
                                boardArticleData?.categoryNo ?? undefined
                            }
                        />
                    )}

                    <Link
                        href={`/boards/${boardNo}`}
                        className={styles.listLink}
                    >
                        목록으로
                    </Link>
                </div>
            </ShopbyApiErrorBoundary>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const queryClient = new QueryClient();

    // boardId는 숫자 ID가 아니라 게시판 식별자 문자열(예: "free")일 수 있음
    const boardNoParam = params?.boardId;
    const boardNo = typeof boardNoParam === 'string' ? boardNoParam : Array.isArray(boardNoParam) ? boardNoParam[0] : '';
    if (!boardNo) {
        return { notFound: true };
    }

    const articleNo = Number(params?.articleNo) || 0;
    if (!articleNo) {
        return { notFound: true };
    }

    const searchParams: GetArticleV2Params = {};

    let seoData = null;

    try {
        const postData = await queryClient.fetchQuery({
            queryKey: boardKeys.postDetail(String(boardNo), articleNo, searchParams),
            queryFn: async () => {
                const { data } = await board.getArticleV2(String(boardNo), articleNo, searchParams);

                return data;
            },
        });

        // ── SEO 데이터 추출 ──
        if (postData) {
            const title = postData.title;
            const description = postData?.content?.slice(0, 120);
            const url = `${process.env.NEXT_PUBLIC_BASE_URL || ''}/boards/${boardNo}/${articleNo}`;

            seoData = {
                title,
                description,
                url,
            };
        }
    } catch (error) {
        if (isAxiosError(error)) {
            const status = error.response?.status || HttpStatusCode.InternalServerError;

            if (status >= 400 && status < 500) {
                return {
                    props: {
                        boardNo: String(boardNo),
                        articleNo,
                        searchParams,
                        errorStatusCode: status,
                        errorMessage: error.response?.data?.message || '게시글을 불러올 수 없습니다.',
                        errorCode: error.response?.data?.code || '',
                    },
                    revalidate: 10,
                };
            }
        }
    }

    return {
        props: {
            boardNo: String(boardNo),
            articleNo,
            searchParams,
            seoData,
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 60 * 60, // 1시간
    };
};
