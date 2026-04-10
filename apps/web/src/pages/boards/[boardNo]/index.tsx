import dayjs from 'dayjs';
import { ArrowUpDown, LockKeyhole, Paperclip, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import { useMemo, type MouseEvent } from 'react';
import { Control, Controller, UseFormRegister, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import { SortBottomSheet } from '@/components/bottom-sheet/sort';
import { NoResult } from '@/components/common/no-result';
import { Button } from '@/components/ui/button';
import { InputFieldContainer, InputField } from '@/components/ui/input';
import { Column, Row } from '@/components/ui/layout/flex';
import Paging from '@/components/ui/paging';
import Select from '@/components/ui/select';
import {
    BOARD_DEFAULT_START_YMD,
    BOARD_PAGINATION,
    BOARD_SEARCH_TYPE,
    BOARD_SORT,
} from '@/const/board';
import {
    useBoardCategoryList,
    useBoardConfig,
    useBoardPostList,
} from '@/hooks/query/manage/board';
import { useProfile } from '@/hooks/query/member/profile';
import { useDialog, useResponsive } from '@/hooks/utils';
import { PostDirection } from '@/models/manage';
import type { PostItem } from '@/models/manage/board';
import * as styles from '@/pages/boards/[boardNo]/index.css';
import { BREAKPOINTS } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { checkBoardWritePermission } from '@/utils/boards';

import 'swiper/css';
import 'swiper/css/pagination';

type SearchFormValues = {
    searchType: string;
    keyword: string;
};

type BoardSearchFormProps = {
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    control: Control<SearchFormValues>;
    register: UseFormRegister<SearchFormValues>;
};

const BoardSearchForm = ({
    onSubmit,
    control,
    register,
}: BoardSearchFormProps) => (
    <form className={styles.searchForm} onSubmit={onSubmit}>
        <Controller
            control={control}
            name='searchType'
            render={({ field }) => (
                <Select
                    {...field}
                    classNames={{
                        container: () => styles.searchTypeSelect,
                        control: () => styles.searchSelectControl,
                    }}
                    options={BOARD_SEARCH_TYPE}
                    value={
                        BOARD_SEARCH_TYPE.find(
                            (option) => option.value === field.value,
                        ) ?? BOARD_SEARCH_TYPE[0]
                    }
                    onChange={(option) => field.onChange(option?.value)}
                />
            )}
        />

        <InputFieldContainer className={styles.searchInputWrapper}>
            <InputField {...register('keyword')} />
        </InputFieldContainer>

        <Button
            frame='outlined'
            type='submit'
            className={styles.searchSubmitButton}
        >
            <Search color='#656966' strokeWidth={1.5} size={20} />
        </Button>
    </form>
);

const Boards = () => {
    const { t } = useTranslation();

    const { isMobile } = useResponsive();
    const router = useRouter();
    const { openDialog } = useDialog();

    const { data: profileData } = useProfile();

    const boardNo = router.query.boardNo as string;

    const selectedCategoryNo = Number(router.query.categoryNo);
    const page =
        (router.query.page as string) ??
        BOARD_PAGINATION.DEFAULT.DEFAULT_PAGE_NUMBER;
    const pageSize =
        (router.query.pageSize as string) ??
        BOARD_PAGINATION.DEFAULT.DEFAULT_PAGE_SIZE;
    const searchType = router.query.searchType as string;
    const keyword = (router.query.keyword as string) ?? '';
    const direction = (router.query.direction as string) ?? 'DESC';

    const { register, handleSubmit, control } = useForm<SearchFormValues>({
        defaultValues: {
            searchType: searchType ?? BOARD_SEARCH_TYPE[0].value,
            keyword: keyword ?? '',
        },
    });

    const { data: boardConfigData } = useBoardConfig();

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
            boardNoOrId: boardNo,
            startYmdt: dayjs(BOARD_DEFAULT_START_YMD).format(
                'YYYY-MM-DD 00:00:00',
            ),
            endYmdt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            skipBlinded: true,
            searchType,
            keyword: keyword || undefined,
            categoryNo: Number.isNaN(selectedCategoryNo)
                ? undefined
                : selectedCategoryNo,
            direction: direction as PostDirection,
        };
    }, [boardNo, searchType, keyword, direction, selectedCategoryNo]);

    const { data: boardListData } = useBoardPostList({
        searchParams: { page: Number(page), pageSize: Number(pageSize) },
        data: boardPostListBodyData,
        options: {
            enabled: !!boardConfigData && !!boardNo,
        },
    });

    const { data: categoryData } = useBoardCategoryList({
        boardNo: boardNo || '0',
        options: {
            enabled: !!boardNo,
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
            router.push(`/boards/${boardNo}/${item.postNo}`);

            return;
        }

        // 회원 본인의 글이면 이동
        if (
            item?.registerType === 'MEMBER' &&
            item?.registerNo === profileData?.memberNo
        ) {
            router.push(`/boards/${boardNo}/${item.postNo}`);

            return;
        }

        openDialog({
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

        router.push(`/boards/${boardNo}/${item.postNo}`);
    };

    const currentSortLabel = useMemo(() => {
        return (
            BOARD_SORT.find((option) => option.id === direction)?.name ??
            BOARD_SORT[0].name
        );
    }, [direction]);

    const openSortBottomSheet = () => {
        overlay.open((props) => (
            <SortBottomSheet
                {...props}
                queryOptions={BOARD_SORT}
                selectedQueryOption={BOARD_SORT.find(
                    (option) => option.id === direction,
                )}
                onQueryChange={(option) => handleSortClick(option.id)}
            />
        ));
    };

    const handleCategoryClick = (categoryNo?: number) => {
        const nextQuery = { ...router.query };

        if (categoryNo === undefined) {
            delete nextQuery.categoryNo;
        } else {
            nextQuery.categoryNo = String(categoryNo);
        }

        router.push(
            {
                pathname: router.pathname,
                query: nextQuery,
            },
            undefined,
            { shallow: true },
        );
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
                {config.categoryUsed && (
                    <div className={styles.categorySwiperWrapper}>
                        <Swiper
                            className={styles.categorySwiper}
                            {...categorySettings}
                        >
                            <SwiperSlide className={styles.categorySwiperSlide}>
                                <button
                                    className={styles.categoryButton}
                                    type='button'
                                    aria-pressed={Number.isNaN(
                                        selectedCategoryNo,
                                    )}
                                    onClick={() =>
                                        handleCategoryClick(undefined)
                                    }
                                >
                                    {t('전체')}
                                </button>
                            </SwiperSlide>

                            {categoryData?.map((category) => (
                                <SwiperSlide
                                    key={category.categoryNo}
                                    className={styles.categorySwiperSlide}
                                >
                                    <button
                                        className={styles.categoryButton}
                                        type='button'
                                        aria-pressed={
                                            selectedCategoryNo ===
                                            category.categoryNo
                                        }
                                        onClick={() =>
                                            handleCategoryClick(
                                                category.categoryNo,
                                            )
                                        }
                                    >
                                        {category.label}
                                    </button>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}

                {boardListData && boardListData.totalCount < 1 ? (
                    <NoResult text='게시글이 없습니다.' />
                ) : (
                    <Column gap='md'>
                        <div className={styles.toolBarContainer}>
                            <div className={styles.totalCount}>
                                총{' '}
                                <span className={styles.totalCountValue}>
                                    {boardListData?.totalCount}
                                </span>
                                개
                            </div>

                            <div className={styles.toolBarRightContainer}>
                                {isMobile ? (
                                    <button
                                        type='button'
                                        className={styles.sortButton}
                                        onClick={() => openSortBottomSheet()}
                                    >
                                        <ArrowUpDown size={16} />
                                        {currentSortLabel}
                                    </button>
                                ) : (
                                    <>
                                        {BOARD_SORT.map((sort) => (
                                            <button
                                                key={sort.id}
                                                className={styles.sortButton}
                                                type='button'
                                                aria-pressed={
                                                    direction === sort.id
                                                }
                                                onClick={() =>
                                                    handleSortClick(sort.id)
                                                }
                                            >
                                                {sort.name}
                                            </button>
                                        ))}
                                    </>
                                )}

                                {isMobile && hasWritePermission && (
                                    <Link
                                        href={`/boards/${boardNo}/write`}
                                        className={styles.writeLink}
                                    >
                                        글쓰기
                                    </Link>
                                )}
                            </div>
                        </div>

                        {isMobile ? (
                            <ul className={styles.boardMobileList}>
                                {boardListData?.items.map((item) => (
                                    <li
                                        key={item.postNo}
                                        className={styles.boardMobileItem}
                                    >
                                        <Link
                                            href={`/boards/${boardNo}/${item.postNo}`}
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
                                                            vars.color.gray[
                                                                '60'
                                                            ]
                                                        }
                                                        strokeWidth={1.5}
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
                                                        {item.title ?? '-'}
                                                    </span>
                                                    {item.attached && (
                                                        <Paperclip
                                                            className={
                                                                styles.boardTableTitleAttachIcon
                                                            }
                                                            aria-hidden
                                                            color={
                                                                vars.color.gray[
                                                                    '60'
                                                                ]
                                                            }
                                                            strokeWidth={1.5}
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
                                                    {item.registerName ?? '-'}
                                                </span>
                                                <span
                                                    className={
                                                        styles.boardTableMetaDate
                                                    }
                                                >
                                                    {item.registerYmdt
                                                        ? dayjs(
                                                              item.registerYmdt,
                                                          ).format('YYYY.MM.DD')
                                                        : '-'}
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <table className={styles.boardTable}>
                                <thead className={styles.boardTableHead}>
                                    <tr>
                                        <th className={styles.boardTableColNo}>
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
                                            className={styles.boardTableColView}
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
                                            className={styles.boardTableColDate}
                                        >
                                            작성일
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className={styles.boardTableBody}>
                                    {boardListData?.items.map((item, index) => (
                                        <tr
                                            key={item.postNo}
                                            className={styles.boardTableRow}
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
                                                        boardListData?.totalCount -
                                                        index -
                                                        Number(pageSize) *
                                                            (Number(page) - 1)
                                                    )}
                                                </span>
                                            </td>

                                            <td
                                                className={
                                                    styles.boardTableCellTitle
                                                }
                                            >
                                                <Link
                                                    href={`/boards/${boardNo}/${item.postNo}`}
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
                                                                vars.color.gray[
                                                                    '60'
                                                                ]
                                                            }
                                                            strokeWidth={1.5}
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
                                                            {item.title ?? '-'}
                                                        </span>
                                                        {item.attached && (
                                                            <Paperclip
                                                                className={
                                                                    styles.boardTableTitleAttachIcon
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
                                    ))}
                                </tbody>
                            </table>
                        )}

                        <div>
                            <Paging
                                currentPage={Number(page)}
                                totalCount={boardListData?.totalCount ?? 0}
                                pageSize={Number(pageSize)}
                                onPageClick={(nextPage: number) => {
                                    router.push(
                                        {
                                            pathname: router.pathname,
                                            query: {
                                                ...router.query,
                                                page: String(nextPage),
                                            },
                                        },
                                        undefined,
                                        { shallow: true },
                                    );
                                }}
                            />
                        </div>
                    </Column>
                )}

                {!isMobile && (
                    <Row gap={'8px'} justify='between' align='center'>
                        <BoardSearchForm
                            onSubmit={onSubmit}
                            control={control}
                            register={register}
                        />

                        {hasWritePermission && (
                            <Link
                                href={`/boards/${boardNo}/write`}
                                className={styles.writeLink}
                            >
                                글쓰기
                            </Link>
                        )}
                    </Row>
                )}
            </Column>
        </Column>
    );
};

export default Boards;
