import dayjs from 'dayjs';
import Seo from '@/components/common/seo';
import { ArrowUpDown, LockKeyhole, Paperclip } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import type { ParsedUrlQuery } from 'querystring';
import { useMemo, type MouseEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import {
    BoardSearchForm,
    type SearchFormValues,
} from '@/components/board/search-form';
import { SortBottomSheet } from '@/components/bottom-sheet/sort';
import { Error } from '@/components/common/error';
import FetchBoundary from '@/components/common/FetchBoundary';
import LoadingWrapper from '@/components/common/loading-wrapper';
import { NoResult } from '@/components/common/no-result';
import { ObserverTarget } from '@/shared/components/observer-target';
import { Column, Row } from '@/components/ui/layout/flex';
import Paging from '@/components/ui/paging';
import {
    BOARD_DEFAULT_START_YMD,
    BOARD_PAGINATION,
    BOARD_SEARCH_TYPE,
    BOARD_SORT,
} from '@/const/board';
import {
    useBoardCategoryList,
    useBoardPostList,
    useInfiniteBoardPostList,
} from '@/hooks/query/manage/board';
import { useProfile } from '@/hooks/query/member/profile';
import useBoardConfig from '@/hooks/suspenseQuery/manage/board/useBoardConfig';
import { useToast } from '@/hooks/ui';
import { useResponsive } from '@/hooks/utils';
import { PostDirection } from '@/models/manage';
import type { GetPostListParams, PostItem } from '@/models/manage/board';
import * as styles from '@/pages/boards/[boardId]/index.css';
import { BREAKPOINTS } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { checkBoardWritePermission } from '@/utils/boards';

const BoardsContent = () => {
    const { t } = useTranslation();

    const { isMobile } = useResponsive();
    const router = useRouter();

    const { addToast } = useToast();

    const { data: profileData } = useProfile();

    const boardId = router.query.boardId as string;

    const parsedSearchParams = useMemo(() => {
        const searchType = router.query.searchType as string;
        const keyword = (router.query.keyword as string) ?? '';
        const direction = (router.query.direction as string) ?? 'DESC';
        const selectedCategoryNo = Number(router.query.categoryNo);

        const page =
            Number(
                (router.query.page as string) ??
                    BOARD_PAGINATION.DEFAULT.DEFAULT_PAGE_NUMBER,
            ) || Number(BOARD_PAGINATION.DEFAULT.DEFAULT_PAGE_NUMBER);
        const pageSize =
            Number(
                (router.query.pageSize as string) ??
                    BOARD_PAGINATION.DEFAULT.DEFAULT_PAGE_SIZE,
            ) || Number(BOARD_PAGINATION.DEFAULT.DEFAULT_PAGE_SIZE);

        return {
            page,
            pageSize,
            searchType,
            keyword,
            direction,
            selectedCategoryNo,
            categoryNo: Number.isNaN(selectedCategoryNo)
                ? undefined
                : selectedCategoryNo,
        };
    }, [
        router.query.page,
        router.query.pageSize,
        router.query.searchType,
        router.query.keyword,
        router.query.direction,
        router.query.categoryNo,
    ]);

    const { register, handleSubmit, control } = useForm<SearchFormValues>({
        defaultValues: {
            searchType:
                parsedSearchParams.searchType ?? BOARD_SEARCH_TYPE[0].value,
            keyword: parsedSearchParams.keyword ?? '',
        },
    });

    const { data: boardConfigData } = useBoardConfig();

    const currentBoardConfig = useMemo(() => {
        if (!boardId) {
            return null;
        }

        return (
            boardConfigData.boardConfigs.find(
                (config) => config.boardId === boardId,
            ) ?? null
        );
    }, [boardConfigData, boardId]);

    // config에 따라 관리
    const config = {
        categoryUsed: currentBoardConfig?.categoryUsed,
        memberPostingUsed: currentBoardConfig?.memberPostingUsed,
    };

    const hasWritePermission = useMemo(() => {
        return checkBoardWritePermission(
            currentBoardConfig ?? null,
            profileData,
        );
    }, [currentBoardConfig, profileData]);

    const boardPostListBodyData = useMemo(() => {
        return {
            boardNoOrId: boardId,
            startYmdt: dayjs(BOARD_DEFAULT_START_YMD).format(
                'YYYY-MM-DD 00:00:00',
            ),
            endYmdt: dayjs().format('YYYY-MM-DD 23:59:59'),
            skipBlinded: true,
            searchType: parsedSearchParams.searchType,
            keyword: parsedSearchParams.keyword || undefined,
            categoryNo: parsedSearchParams.categoryNo,
            direction: parsedSearchParams.direction as PostDirection,
        };
    }, [boardId, parsedSearchParams]);

    const boardPostListSearchParams: GetPostListParams = useMemo(
        () => ({
            page: parsedSearchParams.page,
            pageSize: parsedSearchParams.pageSize,
        }),
        [parsedSearchParams.page, parsedSearchParams.pageSize],
    );

    const infiniteBoardPostSearchParams: GetPostListParams = useMemo(
        () => ({
            page: 1,
            pageSize: parsedSearchParams.pageSize,
        }),
        [parsedSearchParams.pageSize],
    );

    const { data: boardListData, isLoading: isBoardPostListLoading } =
        useBoardPostList({
            searchParams: boardPostListSearchParams,
            data: boardPostListBodyData,
            options: {
                enabled: !!boardConfigData && !!boardId && !isMobile,
            },
        });

    const {
        data: infiniteBoardListData,
        isLoading: isInfiniteBoardPostListLoading,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteBoardPostList({
        searchParams: infiniteBoardPostSearchParams,
        data: boardPostListBodyData,
        options: {
            enabled: !!boardConfigData && !!boardId && isMobile,
        },
    });

    const boardPostList = useMemo(() => {
        if (isMobile) {
            return infiniteBoardListData?.pages?.flatMap((p) => p.items) ?? [];
        }
        return boardListData?.items ?? [];
    }, [isMobile, infiniteBoardListData, boardListData]);

    const totalCount = useMemo(() => {
        if (isMobile) {
            return infiniteBoardListData?.pages?.[0]?.totalCount ?? 0;
        }
        return boardListData?.totalCount ?? 0;
    }, [isMobile, infiniteBoardListData, boardListData]);

    const isBoardListLoading = isMobile
        ? isInfiniteBoardPostListLoading
        : isBoardPostListLoading;

    const { data: categoryData } = useBoardCategoryList({
        boardNo: boardId || '0',
        options: {
            enabled: !!boardId,
        },
    });

    const categorySettings: SwiperProps = {
        slidesPerView: 'auto',
        spaceBetween: 4,
        watchOverflow: true,
        breakpoints: {
            [BREAKPOINTS.SM]: {
                spaceBetween: 6,
            },
        },
    };

    const handleSortClick = (sortValue: string) => {
        const nextQuery = { ...router.query, direction: sortValue, page: '1' };

        router.push(
            {
                pathname: router.pathname,
                query: nextQuery,
            },
            undefined,
            { shallow: true },
        );
    };

    const handleSecretPostClick = (item: PostItem) => {
        // 비회원 비밀글: 상세에서 비밀번호 확인
        if (item?.registerType === 'GUEST') {
            router.push(`/boards/${boardId}/${item.postNo}`);

            return;
        }

        // 회원 본인의 글이면 이동
        if (
            item?.registerType === 'MEMBER' &&
            item?.registerNo === profileData?.memberNo
        ) {
            router.push(`/boards/${boardId}/${item.postNo}`);

            return;
        }

        addToast({
            message: t('조회할 권한이 없습니다.'),
        });
    };

    const handleBoardPostLinkClick = (
        e: MouseEvent<HTMLAnchorElement>,
        item: PostItem,
    ) => {
        e.preventDefault();

        if (item.secreted) {
            handleSecretPostClick(item);

            return;
        }

        router.push(`/boards/${boardId}/${item.postNo}`);
    };

    const currentSortLabel = useMemo(() => {
        return (
            BOARD_SORT.find(
                (option) => option.id === parsedSearchParams.direction,
            )?.name ?? BOARD_SORT[0].name
        );
    }, [parsedSearchParams.direction]);

    const openSortBottomSheet = () => {
        overlay.open((props) => (
            <SortBottomSheet
                {...props}
                queryOptions={BOARD_SORT}
                selectedQueryOption={BOARD_SORT.find(
                    (option) => option.id === parsedSearchParams.direction,
                )}
                onQueryChange={(option) => handleSortClick(option.id)}
            />
        ));
    };

    const getCategoryHref = (categoryNo?: number) => {
        const nextQuery: ParsedUrlQuery = { ...router.query, page: '1' };

        if (categoryNo === undefined) {
            delete nextQuery.categoryNo;
        } else {
            nextQuery.categoryNo = String(categoryNo);
        }

        return {
            pathname: router.pathname,
            query: nextQuery,
        };
    };

    const onSubmit = handleSubmit((data: SearchFormValues) => {
        const keyword = data.keyword;
        const nextQuery = { ...router.query };

        if (!keyword) {
            delete nextQuery.keyword;
            delete nextQuery.searchType;
        } else {
            nextQuery.keyword = keyword;
            nextQuery.searchType = data.searchType;
        }

        nextQuery.page = '1';

        router.push(
            {
                pathname: router.pathname,
                query: nextQuery,
            },
            undefined,
            { shallow: true },
        );
    });

    return (
        <>
            <Seo title={currentBoardConfig?.name ?? '게시판'} />
            {!currentBoardConfig ? (
                <Error errorMessage='존재하지 않는 게시판입니다.' />
            ) : (
        <Column gap={isMobile ? 'lg' : 'xl'} className={styles.boardPageMobile}>
            {!isMobile && (
                <h1 className={styles.title}>
                    {currentBoardConfig?.name ?? '게시판'}
                </h1>
            )}

            {isMobile && (
                <BoardSearchForm
                    onSubmit={onSubmit}
                    control={control}
                    register={register}
                />
            )}

            <Column gap={isMobile ? 'md' : 'lg'}>
                <Column gap='md'>
                    {config.categoryUsed && (
                        <div className={styles.categorySwiperWrapper}>
                            <Swiper
                                className={styles.categorySwiper}
                                {...categorySettings}
                            >
                                <SwiperSlide
                                    className={styles.categorySwiperSlide}
                                >
                                    <Link
                                        href={getCategoryHref(undefined)}
                                        shallow
                                        className={styles.categoryLink}
                                        data-selected={Number.isNaN(
                                            parsedSearchParams.selectedCategoryNo,
                                        )}
                                    >
                                        {t('전체')}
                                    </Link>
                                </SwiperSlide>

                                {categoryData?.map((category) => (
                                    <SwiperSlide
                                        key={category.categoryNo}
                                        className={styles.categorySwiperSlide}
                                    >
                                        <Link
                                            href={getCategoryHref(
                                                category.categoryNo,
                                            )}
                                            shallow
                                            className={styles.categoryLink}
                                            data-selected={
                                                parsedSearchParams.selectedCategoryNo ===
                                                category.categoryNo
                                            }
                                        >
                                            {category.label}
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}

                    <LoadingWrapper isLoading={isBoardListLoading}>
                        {totalCount < 1 ? (
                            <NoResult text='게시글이 없습니다.' />
                        ) : (
                            <Column gap='md'>
                                <div className={styles.toolBarContainer}>
                                    <div className={styles.totalCount}>
                                        총{' '}
                                        <span
                                            className={styles.totalCountValue}
                                        >
                                            {totalCount}
                                        </span>
                                        개
                                    </div>

                                    <div
                                        className={styles.toolBarRightContainer}
                                    >
                                        {isMobile ? (
                                            <button
                                                type='button'
                                                className={styles.sortButton}
                                                onClick={() =>
                                                    openSortBottomSheet()
                                                }
                                            >
                                                <ArrowUpDown size={16} />
                                                {currentSortLabel}
                                            </button>
                                        ) : (
                                            <>
                                                {BOARD_SORT.map((sort) => (
                                                    <button
                                                        key={sort.id}
                                                        className={
                                                            styles.sortButton
                                                        }
                                                        type='button'
                                                        aria-pressed={
                                                            parsedSearchParams.direction ===
                                                            sort.id
                                                        }
                                                        onClick={() =>
                                                            handleSortClick(
                                                                sort.id,
                                                            )
                                                        }
                                                    >
                                                        {sort.name}
                                                    </button>
                                                ))}
                                            </>
                                        )}

                                        {isMobile && hasWritePermission && (
                                            <Link
                                                href={`/boards/${boardId}/write`}
                                                className={styles.writeLink}
                                            >
                                                글쓰기
                                            </Link>
                                        )}
                                    </div>
                                </div>

                                {isMobile ? (
                                    <ul className={styles.boardMobileList}>
                                        {boardPostList.map((item) => (
                                            <li
                                                key={item.postNo}
                                                className={
                                                    styles.boardMobileItem
                                                }
                                            >
                                                <Link
                                                    href={`/boards/${boardId}/${item.postNo}`}
                                                    className={
                                                        styles.boardMobileItemLink
                                                    }
                                                    onClick={(e) =>
                                                        handleBoardPostLinkClick(
                                                            e,
                                                            item,
                                                        )
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.boardTableCellTitle
                                                        }
                                                    >
                                                        {item.noticed && (
                                                            <span
                                                                className={
                                                                    styles.noticeBadge
                                                                }
                                                            >
                                                                공지
                                                            </span>
                                                        )}
                                                        {item.secreted && (
                                                            <LockKeyhole
                                                                className={
                                                                    styles.boardTableTitleIconLock
                                                                }
                                                                aria-hidden
                                                                color={
                                                                    vars.color
                                                                        .gray[
                                                                        '60'
                                                                    ]
                                                                }
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                size={15}
                                                            />
                                                        )}
                                                        <span
                                                            className={
                                                                styles.boardTableTitleLabel
                                                            }
                                                        >
                                                            <span
                                                                className={
                                                                    styles.boardTableTitleText
                                                                }
                                                            >
                                                                {item.title ??
                                                                    '-'}
                                                            </span>
                                                            {item.attached && (
                                                                <Paperclip
                                                                    className={
                                                                        styles.boardTableTitleAttachIcon
                                                                    }
                                                                    aria-hidden
                                                                    color={
                                                                        vars
                                                                            .color
                                                                            .gray[
                                                                            '60'
                                                                        ]
                                                                    }
                                                                    strokeWidth={
                                                                        1.5
                                                                    }
                                                                    size={15}
                                                                />
                                                            )}
                                                        </span>
                                                    </div>

                                                    <div
                                                        className={
                                                            styles.boardMobileMetaRow
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                styles.boardTableMetaWriter
                                                            }
                                                        >
                                                            {item.registerName ??
                                                                '-'}
                                                        </span>
                                                        <span
                                                            className={
                                                                styles.boardTableMetaDate
                                                            }
                                                        >
                                                            {item.registerYmdt
                                                                ? dayjs(
                                                                      item.registerYmdt,
                                                                  ).format(
                                                                      'YYYY.MM.DD',
                                                                  )
                                                                : '-'}
                                                        </span>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <table className={styles.boardTable}>
                                        <thead
                                            className={styles.boardTableHead}
                                        >
                                            <tr>
                                                <th
                                                    className={
                                                        styles.boardTableColNo
                                                    }
                                                >
                                                    번호
                                                </th>
                                                <th
                                                    className={
                                                        styles.boardTableColTitle
                                                    }
                                                >
                                                    제목
                                                </th>
                                                <th
                                                    className={
                                                        styles.boardTableColView
                                                    }
                                                >
                                                    조회수
                                                </th>
                                                <th
                                                    className={
                                                        styles.boardTableColWriter
                                                    }
                                                >
                                                    작성자
                                                </th>
                                                <th
                                                    className={
                                                        styles.boardTableColDate
                                                    }
                                                >
                                                    작성일
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody
                                            className={styles.boardTableBody}
                                        >
                                            {boardPostList.map(
                                                (item, index) => (
                                                    <tr
                                                        key={item.postNo}
                                                        className={
                                                            styles.boardTableRow
                                                        }
                                                    >
                                                        <td
                                                            className={
                                                                styles.boardTableCellNo
                                                            }
                                                        >
                                                            <span
                                                                className={
                                                                    styles.boardTableCellInner
                                                                }
                                                            >
                                                                {item.noticed ? (
                                                                    <span
                                                                        className={
                                                                            styles.noticeBadge
                                                                        }
                                                                    >
                                                                        공지
                                                                    </span>
                                                                ) : (
                                                                    totalCount -
                                                                    index -
                                                                    parsedSearchParams.pageSize *
                                                                        (parsedSearchParams.page -
                                                                            1)
                                                                )}
                                                            </span>
                                                        </td>

                                                        <td
                                                            className={
                                                                styles.boardTableCellTitle
                                                            }
                                                        >
                                                            <Link
                                                                href={`/boards/${boardId}/${item.postNo}`}
                                                                className={
                                                                    styles.boardTableTitleLink
                                                                }
                                                                onClick={(e) =>
                                                                    handleBoardPostLinkClick(
                                                                        e,
                                                                        item,
                                                                    )
                                                                }
                                                            >
                                                                {item.secreted && (
                                                                    <LockKeyhole
                                                                        className={
                                                                            styles.boardTableTitleIconLock
                                                                        }
                                                                        aria-hidden
                                                                        color={
                                                                            vars
                                                                                .color
                                                                                .gray[
                                                                                '60'
                                                                            ]
                                                                        }
                                                                        strokeWidth={
                                                                            1.5
                                                                        }
                                                                        size={
                                                                            15
                                                                        }
                                                                    />
                                                                )}
                                                                <span
                                                                    className={
                                                                        styles.boardTableTitleLabel
                                                                    }
                                                                >
                                                                    <span
                                                                        className={
                                                                            styles.boardTableTitleText
                                                                        }
                                                                    >
                                                                        {item.title ??
                                                                            '-'}
                                                                    </span>
                                                                    {item.attached && (
                                                                        <Paperclip
                                                                            className={
                                                                                styles.boardTableTitleAttachIcon
                                                                            }
                                                                            aria-hidden
                                                                            color={
                                                                                vars
                                                                                    .color
                                                                                    .gray[
                                                                                    '60'
                                                                                ]
                                                                            }
                                                                            strokeWidth={
                                                                                1.5
                                                                            }
                                                                            size={
                                                                                15
                                                                            }
                                                                        />
                                                                    )}
                                                                </span>
                                                            </Link>
                                                        </td>

                                                        <td
                                                            className={
                                                                styles.boardTableCellView
                                                            }
                                                        >
                                                            <span
                                                                className={
                                                                    styles.boardTableCellInner
                                                                }
                                                            >
                                                                {item.viewCnt}
                                                            </span>
                                                        </td>

                                                        <td
                                                            className={
                                                                styles.boardTableCellWriterDate
                                                            }
                                                            colSpan={2}
                                                        >
                                                            <div
                                                                className={
                                                                    styles.boardTableMetaRow
                                                                }
                                                            >
                                                                <span
                                                                    className={
                                                                        styles.boardTableMetaWriter
                                                                    }
                                                                >
                                                                    {item.registerName ??
                                                                        '-'}
                                                                </span>
                                                                <span
                                                                    className={
                                                                        styles.boardTableMetaDate
                                                                    }
                                                                >
                                                                    {item.registerYmdt
                                                                        ? dayjs(
                                                                              item.registerYmdt,
                                                                          ).format(
                                                                              'YYYY.MM.DD',
                                                                          )
                                                                        : '-'}
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ),
                                            )}
                                        </tbody>
                                    </table>
                                )}

                                {isMobile ? (
                                    <ObserverTarget
                                        hasNextPage={hasNextPage}
                                        onIntersect={() => {
                                            if (hasNextPage) {
                                                fetchNextPage();
                                            }
                                        }}
                                    />
                                ) : (
                                    <div>
                                        <Paging
                                            currentPage={
                                                parsedSearchParams.page
                                            }
                                            totalCount={totalCount}
                                            pageSize={
                                                parsedSearchParams.pageSize
                                            }
                                            onPageClick={(nextPage: number) => {
                                                router.push(
                                                    {
                                                        pathname:
                                                            router.pathname,
                                                        query: {
                                                            ...router.query,
                                                            page: String(
                                                                nextPage,
                                                            ),
                                                        },
                                                    },
                                                    undefined,
                                                    { shallow: true },
                                                );
                                            }}
                                        />
                                    </div>
                                )}
                            </Column>
                        )}
                    </LoadingWrapper>
                </Column>

                {!isMobile && (
                    <Row gap={'8px'} justify='between' align='center'>
                        <BoardSearchForm
                            onSubmit={onSubmit}
                            control={control}
                            register={register}
                        />

                        {hasWritePermission && (
                            <Link
                                href={`/boards/${boardId}/write`}
                                className={styles.writeLink}
                            >
                                글쓰기
                            </Link>
                        )}
                    </Row>
                )}
            </Column>
        </Column>
            )}
        </>
    );
};

const Boards = () => {
    return (
        <FetchBoundary
            fallback={
                <LoadingWrapper isLoading={true}>
                    <span />
                </LoadingWrapper>
            }
        >
            <BoardsContent />
        </FetchBoundary>
    );
};

export default Boards;
