import { isEmpty } from '@fxts/core';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { overlay } from 'overlay-kit';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router';

import PageMeta from '@/components/common/PageMeta';
import AddCommentBlacklistModal from '@/components/modal/add-blacklist-user';
import ImagePreviewModal from '@/components/modal/image-preview';
import LoadingWrapper from '@/components/ui/loading-wrapper';
import TablePaginationFooter from '@/components/ui/table-pagination-footer';
import { PATHS } from '@/const/paths';
import { TABLE_MIN_WIDTH } from '@/const/table';
import useCommentMutation from '@/hooks/mutations/useCommentMutation';
import useCommentList from '@/hooks/query/comment/useCommentList';
import { commentKeys } from '@/hooks/queryKeys';
import useApiError from '@/hooks/useApiError';
import { useDialog, useToast } from '@/hooks/utils';

import { ReactComponent as LockIcon } from '@/icons/lock.svg?react';
import { ReactComponent as SearchIcon } from '@/icons/search.svg?react';
import { ReactComponent as TrashSimpleIcon } from '@/icons/trash-simple.svg?react';

const tableLayout = {
    minWidth: TABLE_MIN_WIDTH,
    column: {
        recipe: 'w-[220px]',
        comment: 'w-[auto]',
        member: 'w-[160px]',
        status: 'w-[110px]',
        regDt: 'w-[140px]',
        updateDt: 'w-[140px]',
        actions: 'w-[140px]',
    },
} as const;

const tableTh = {
    left: 'px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282]',
    right: 'px-6 py-3 text-right text-xs font-medium uppercase text-[#6a7282]',
} as const;

const PAGE_SEARCH_PARAM = 'page';
const PAGE_SIZE = 10;

const formatDate = (value?: string | null) => {
    return value ? dayjs(value).format('YYYY.MM.DD') : '-';
};

type FormValues = {
    keyword: string;
    recipeSno: string;
    memberNo: string;
};

const CommentList = () => {
    const { addToast } = useToast();
    const { openAsyncDialog } = useDialog();
    const { handleErrorToast } = useApiError();

    const [searchParams, setSearchParams] = useSearchParams();

    const keyword = searchParams.get('keyword') ?? '';
    const recipeSnoRaw = searchParams.get('recipeSno') ?? '';
    const memberNoRaw = searchParams.get('memberNo') ?? '';
    const page = Number(searchParams.get(PAGE_SEARCH_PARAM)) || 1;

    const { register, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            keyword,
            recipeSno: recipeSnoRaw,
            memberNo: memberNoRaw,
        },
    });

    const recipeSno = useMemo(() => {
        const n = Number(recipeSnoRaw);
        return Number.isFinite(n) && n > 0 ? n : undefined;
    }, [recipeSnoRaw]);

    const memberNo = useMemo(() => {
        const n = Number(memberNoRaw);
        return Number.isFinite(n) && n > 0 ? n : undefined;
    }, [memberNoRaw]);

    const params = useMemo(() => {
        return {
            keyword,
            recipeSno,
            memberNo,
            page,
            take: PAGE_SIZE,
        };
    }, [keyword, recipeSno, memberNo, page]);

    const { data: commentListData, isLoading: isCommentListLoading } =
        useCommentList({
            params,
        });

    const totalCount = commentListData?.count ?? 0;
    const lastPage = commentListData?.lastPage ?? 1;

    const commentList = useMemo(() => {
        return commentListData?.data ?? [];
    }, [commentListData]);

    const openImagePreviewModal = (src: string, alt?: string) => {
        overlay.open((props) => (
            <ImagePreviewModal {...props} src={src} alt={alt} />
        ));
    };

    const openAddBlacklistModal = (params: {
        memberNo: number;
        memberId: string;
        memberName: string;
    }) => {
        overlay.open((props) => (
            <AddCommentBlacklistModal
                {...props}
                memberNo={params.memberNo}
                memberId={params.memberId}
                memberName={params.memberName}
            />
        ));
    };

    const setQuery = handleSubmit((values) => {
        const nextKeyword = values.keyword?.trim() ?? '';
        const nextRecipeSno = values.recipeSno?.trim() ?? '';
        const nextMemberNo = values.memberNo?.trim() ?? '';

        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);

            const setOrDelete = (
                params: URLSearchParams,
                key: string,
                value: string,
            ) => {
                if (!value) {
                    params.delete(key);
                    return;
                }

                params.set(key, value);
            };

            setOrDelete(next, 'keyword', nextKeyword);
            setOrDelete(next, 'recipeSno', nextRecipeSno);
            setOrDelete(next, 'memberNo', nextMemberNo);

            next.delete(PAGE_SEARCH_PARAM);
            return next;
        });
    });

    const { deleteComment } = useCommentMutation();
    const queryClient = useQueryClient();

    const handleDeleteComment = async (sno: number) => {
        const isAgree = await openAsyncDialog({
            message: '댓글을 삭제하시겠습니까?',
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (!isAgree) {
            return;
        }

        deleteComment.mutate(sno, {
            onSuccess: async () => {
                await queryClient.invalidateQueries({
                    queryKey: commentKeys.lists(),
                    refetchType: 'all',
                });

                addToast({
                    message: '댓글이 삭제되었습니다.',
                    variant: 'success',
                });
            },
            onError: (error) => {
                handleErrorToast(error);
            },
        });
    };

    return (
        <>
            <PageMeta
                title='댓글 관리 | JollyPot 관리자'
                description='사용자가 작성한 댓글을 관리합니다'
            />
            <div className='flex flex-col gap-6 pt-6 px-6'>
                {/* 페이지 헤더 */}
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-2xl font-bold leading-8 tracking-[0.07px] text-[#101828]'>
                            댓글 관리
                        </h2>
                        <p className='text-base font-normal leading-6 tracking-[-0.31px] text-[#6a7282]'>
                            사용자가 작성한 댓글을 관리합니다
                        </p>
                    </div>
                </div>

                <div className='bg-white border border-[#e5e7eb] rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] overflow-hidden'>
                    <div className='px-4 py-4 border-b border-[#e5e7eb]'>
                        <form
                            onSubmit={setQuery}
                            className='relative flex gap-2'
                        >
                            <span className='absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#717182] flex items-center justify-center w-4 h-4'>
                                <SearchIcon className='w-full h-full' />
                            </span>
                            <input
                                type='text'
                                placeholder='댓글 내용으로 검색...'
                                {...register('keyword')}
                                className='w-full h-10 pl-10 pr-4 py-1 bg-[#f3f3f5] rounded-xl text-[14px] text-[#101828] placeholder:text-[#99a1af] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20 focus:bg-white transition-all'
                            />
                            <input
                                type='number'
                                inputMode='numeric'
                                placeholder='레시피번호'
                                {...register('recipeSno')}
                                className='w-[140px] h-10 px-3 py-1 bg-[#f3f3f5] rounded-xl text-[14px] text-[#101828] placeholder:text-[#99a1af] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20 focus:bg-white transition-all'
                            />
                            <input
                                type='number'
                                inputMode='numeric'
                                placeholder='회원번호'
                                {...register('memberNo')}
                                className='w-[140px] h-10 px-3 py-1 bg-[#f3f3f5] rounded-xl text-[14px] text-[#101828] placeholder:text-[#99a1af] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20 focus:bg-white transition-all'
                            />
                            <button
                                type='submit'
                                className='flex shrink-0 items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm font-medium text-[#364153] transition-colors hover:bg-gray-50'
                            >
                                <SearchIcon className='h-4 w-4 text-[#99a1af]' />
                                검색
                            </button>
                        </form>
                    </div>

                    <LoadingWrapper
                        isLoading={isCommentListLoading}
                        containerStyle={{
                            height: '50vh',
                        }}
                    >
                        {/* 테이블 */}
                        <div className='overflow-x-auto'>
                            <table
                                className={`w-full ${tableLayout.minWidth} table-fixed`}
                            >
                                <thead>
                                    <tr className='bg-[#f9fafb] border-b border-[#e5e7eb]'>
                                        <th
                                            className={`${tableLayout.column.recipe} ${tableTh.left}`}
                                        >
                                            레시피
                                        </th>
                                        <th
                                            className={[
                                                tableLayout.column.comment,
                                                tableTh.left,
                                            ]
                                                .filter(Boolean)
                                                .join(' ')}
                                        >
                                            댓글
                                        </th>
                                        <th
                                            className={`${tableLayout.column.member} ${tableTh.left}`}
                                        >
                                            작성자
                                        </th>
                                        <th
                                            className={`${tableLayout.column.status} ${tableTh.left}`}
                                        >
                                            상태
                                        </th>
                                        <th
                                            className={`${tableLayout.column.regDt} ${tableTh.left}`}
                                        >
                                            작성일
                                        </th>
                                        <th
                                            className={`${tableLayout.column.updateDt} ${tableTh.right}`}
                                        >
                                            수정일
                                        </th>
                                        <th
                                            className={`${tableLayout.column.actions} ${tableTh.right}`}
                                        >
                                            작업
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {isEmpty(commentList) ? (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className='px-6 py-12 text-center text-sm text-[#6a7282]'
                                            >
                                                검색 결과가 없습니다.
                                            </td>
                                        </tr>
                                    ) : (
                                        commentList.map((item) => {
                                            const handleOpenAttachmentPreview =
                                                () => {
                                                    if (!item.attachment) {
                                                        return;
                                                    }
                                                    openImagePreviewModal(
                                                        item.attachment,
                                                        '댓글 첨부 이미지',
                                                    );
                                                };

                                            const handleOpenAddBlacklistModal =
                                                () => {
                                                    openAddBlacklistModal({
                                                        memberNo: item.memberNo,
                                                        memberId: item.memberId,
                                                        memberName:
                                                            item.memberName,
                                                    });
                                                };

                                            return (
                                                <tr
                                                    key={item.sno}
                                                    className='border-b border-[#e5e7eb] last:border-b-0 hover:bg-[#fafafa] transition-colors group'
                                                >
                                                    <td className='px-6 py-6'>
                                                        <div className='flex flex-col gap-1'>
                                                            <Link
                                                                to={PATHS.APP.USER_RECIPE.DETAIL.replace(
                                                                    ':sno',
                                                                    item.recipeSno.toString(),
                                                                )}
                                                                className='text-[14px] font-bold text-[#ff6900] whitespace-nowrap overflow-hidden text-ellipsis'
                                                            >
                                                                {
                                                                    item.recipeTitle
                                                                }
                                                            </Link>
                                                            {item.recipeAuthorName ? (
                                                                <p className='text-[12px] text-[#6a7282] whitespace-nowrap overflow-hidden text-ellipsis'>
                                                                    {
                                                                        item.recipeAuthorName
                                                                    }
                                                                </p>
                                                            ) : null}
                                                        </div>
                                                    </td>
                                                    <td className='px-6 py-6'>
                                                        <div className='flex items-start gap-3'>
                                                            {item.attachment ? (
                                                                <button
                                                                    type='button'
                                                                    className='flex shrink-0'
                                                                    aria-label='첨부 이미지 확대 보기'
                                                                    onClick={
                                                                        handleOpenAttachmentPreview
                                                                    }
                                                                >
                                                                    <img
                                                                        src={
                                                                            item.attachment
                                                                        }
                                                                        alt='댓글 첨부 이미지'
                                                                        className='w-14 h-14 min-w-14 min-h-14 aspect-square rounded-md object-cover border border-[#e5e7eb] bg-[#f3f4f6]'
                                                                        style={{
                                                                            fontSize:
                                                                                '10px',
                                                                        }}
                                                                        loading='lazy'
                                                                    />
                                                                </button>
                                                            ) : null}
                                                            <p className='text-[14px] text-[#364153] line-clamp-2'>
                                                                {item.comment}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className='px-6 py-6'>
                                                        <div className='flex flex-col gap-1'>
                                                            <p className='text-[14px] font-medium text-[#364153] whitespace-nowrap overflow-hidden text-ellipsis'>
                                                                {
                                                                    item.memberName
                                                                }
                                                            </p>
                                                            <p className='text-[12px] text-[#6a7282] whitespace-nowrap overflow-hidden text-ellipsis'>
                                                                {item.memberId}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className='px-6 py-6'>
                                                        {item.isDeleted ? (
                                                            <span className='inline-flex items-center rounded-full bg-error-50 px-2.5 py-1 text-xs font-semibold text-error-600'>
                                                                삭제됨
                                                            </span>
                                                        ) : (
                                                            <span className='inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700'>
                                                                정상
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className='px-6 py-6 text-[14px] text-[#364153] whitespace-nowrap'>
                                                        {formatDate(item.regDt)}
                                                    </td>
                                                    <td className='px-6 py-6 text-right text-[14px] text-[#364153] whitespace-nowrap'>
                                                        {formatDate(
                                                            item.updateDt,
                                                        )}
                                                    </td>
                                                    <td className='px-6 py-6 text-right'>
                                                        <div className='flex items-center justify-end gap-2'>
                                                            <button
                                                                type='button'
                                                                onClick={
                                                                    handleOpenAddBlacklistModal
                                                                }
                                                                className='flex h-8 w-8 items-center justify-center rounded-lg text-[#364153] transition-colors hover:bg-gray-100'
                                                            >
                                                                <LockIcon className='h-4 w-4 text-[#6a7282]' />
                                                            </button>

                                                            <button
                                                                type='button'
                                                                onClick={() =>
                                                                    handleDeleteComment(
                                                                        item.sno,
                                                                    )
                                                                }
                                                            >
                                                                <TrashSimpleIcon className='h-4 w-4 text-error-500' />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </LoadingWrapper>
                </div>

                <TablePaginationFooter
                    totalCount={totalCount}
                    page={page}
                    pageSize={PAGE_SIZE}
                    lastPage={lastPage}
                    pageSearchParam={PAGE_SEARCH_PARAM}
                />
            </div>
        </>
    );
};

export default CommentList;
