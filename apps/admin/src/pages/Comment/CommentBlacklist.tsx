import { isEmpty } from '@fxts/core';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { overlay } from 'overlay-kit';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router';

import PageMeta from '@/components/common/PageMeta';
import LoadingWrapper from '@/components/ui/loading-wrapper';
import TablePaginationFooter from '@/components/ui/table-pagination-footer';
import { TABLE_MIN_WIDTH } from '@/const/table';
import useCommentMutation from '@/hooks/mutations/useCommentMutation';
import useCommentBlackList from '@/hooks/query/comment/useCommentBlackList';
import { commentKeys } from '@/hooks/queryKeys';
import useApiError from '@/hooks/useApiError';
import { useDialog, useToast } from '@/hooks/utils';

import AddCommentBlacklistModal from '@/components/modal/add-blacklist-user';
import { ReactComponent as PlusSimpleIcon } from '@/icons/plus-simple.svg?react';
import { ReactComponent as SearchIcon } from '@/icons/search.svg?react';
import { ReactComponent as TrashSimpleIcon } from '@/icons/trash-simple.svg?react';

const tableLayout = {
    minWidth: TABLE_MIN_WIDTH,
    column: {
        member: 'w-[220px]',
        memberNo: 'w-[120px]',
        memo: '',
        regDt: 'w-[140px]',
        updateDt: 'w-[140px]',
        actions: 'w-[100px]',
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
};

const CommentBlacklist = () => {
    const { addToast } = useToast();

    const [searchParams, setSearchParams] = useSearchParams();

    const keyword = searchParams.get('keyword') ?? '';
    const page = Number(searchParams.get(PAGE_SEARCH_PARAM)) || 1;

    const { register, handleSubmit } = useForm<FormValues>({
        defaultValues: { keyword },
    });

    const params = useMemo(() => {
        return {
            keyword,
            page,
            take: PAGE_SIZE,
        };
    }, [keyword, page]);

    const { data: blackListData, isLoading: isBlackListLoading } =
        useCommentBlackList({
            params,
        });

    const totalCount = blackListData?.count ?? 0;
    const lastPage = blackListData?.lastPage ?? 1;

    const list = useMemo(() => {
        return blackListData?.data ?? [];
    }, [blackListData]);

    const queryClient = useQueryClient();
    const { openAsyncDialog } = useDialog();
    const { handleErrorToast } = useApiError();

    const { deleteCommentBlacklist: deleteCommentBlacklistMutation } =
        useCommentMutation();

    const setQuery = handleSubmit((values) => {
        const nextKeyword = values.keyword?.trim() ?? '';

        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);

            if (!nextKeyword) {
                next.delete('keyword');
            } else {
                next.set('keyword', nextKeyword);
            }

            next.delete(PAGE_SEARCH_PARAM);
            return next;
        });
    });

    const handleDeleteBlacklistMember = async (memberNo: number) => {
        const isAgree = await openAsyncDialog({
            message: '블랙리스트에서 삭제하시겠습니까?',
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (!isAgree) {
            return;
        }

        deleteCommentBlacklistMutation.mutate(memberNo, {
            onSuccess: async () => {
                await queryClient.invalidateQueries({
                    queryKey: commentKeys.blackLists(),
                    refetchType: 'all',
                });

                addToast({
                    message: '블랙리스트에서 삭제되었습니다.',
                    variant: 'success',
                });
            },
            onError: (error) => {
                handleErrorToast(error);
            },
        });
    };

    const openAddBlacklistUserModal = () => {
        overlay.open((props) => <AddCommentBlacklistModal {...props} />);
    };

    return (
        <>
            <PageMeta
                title='댓글 블랙리스트 관리 | JollyPot 관리자'
                description='댓글 블랙리스트 대상자를 관리합니다'
            />
            <div className='flex flex-col gap-6 pt-6 px-6'>
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-2xl font-bold leading-8 tracking-[0.07px] text-[#101828]'>
                            댓글 블랙리스트 관리
                        </h2>
                        <p className='text-base font-normal leading-6 tracking-[-0.31px] text-[#6a7282]'>
                            댓글 블랙리스트 대상자를 관리합니다
                        </p>
                    </div>

                    <div className='flex items-center gap-3'>
                        <button
                            type='button'
                            onClick={openAddBlacklistUserModal}
                            className='flex h-9 items-center gap-2 rounded-lg bg-brand-500 px-3 text-sm font-medium text-white transition-colors hover:bg-brand-600'
                        >
                            <PlusSimpleIcon className='w-4 h-4 text-white' />
                            블랙리스트 추가
                        </button>
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
                                placeholder='회원명/아이디/메모로 검색...'
                                {...register('keyword')}
                                className='w-full h-10 pl-10 pr-4 py-1 bg-[#f3f3f5] rounded-xl text-[14px] text-[#101828] placeholder:text-[#99a1af] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20 focus:bg-white transition-all'
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
                        isLoading={isBlackListLoading}
                        containerStyle={{
                            height: '50vh',
                        }}
                    >
                        <div className='overflow-x-auto'>
                            <table
                                className={`w-full ${tableLayout.minWidth} table-fixed`}
                            >
                                <thead>
                                    <tr className='bg-[#f9fafb] border-b border-[#e5e7eb]'>
                                        <th
                                            className={`${tableLayout.column.member} ${tableTh.left}`}
                                        >
                                            회원
                                        </th>
                                        <th
                                            className={`${tableLayout.column.memberNo} ${tableTh.left}`}
                                        >
                                            회원번호
                                        </th>
                                        <th
                                            className={[
                                                tableLayout.column.memo,
                                                tableTh.left,
                                            ]
                                                .filter(Boolean)
                                                .join(' ')}
                                        >
                                            메모
                                        </th>
                                        <th
                                            className={`${tableLayout.column.regDt} ${tableTh.left}`}
                                        >
                                            등록일
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
                                    {isEmpty(list) ? (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className='px-6 py-12 text-center text-sm text-[#6a7282]'
                                            >
                                                검색 결과가 없습니다.
                                            </td>
                                        </tr>
                                    ) : (
                                        list.map((item) => (
                                            <tr
                                                key={item.memberNo}
                                                className='border-b border-[#e5e7eb] last:border-b-0 hover:bg-[#fafafa] transition-colors'
                                            >
                                                <td className='px-6 py-6'>
                                                    <div className='flex flex-col gap-1'>
                                                        <p className='text-[14px] font-medium text-[#364153] whitespace-nowrap overflow-hidden text-ellipsis'>
                                                            {item.memberName}
                                                        </p>
                                                        <p className='text-[12px] text-[#6a7282] whitespace-nowrap overflow-hidden text-ellipsis'>
                                                            {item.memberId}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className='px-6 py-6 text-[14px] text-[#364153] whitespace-nowrap'>
                                                    {item.memberNo.toLocaleString()}
                                                </td>
                                                <td className='px-6 py-6'>
                                                    <p className='text-[14px] text-[#364153] line-clamp-2'>
                                                        {item.memo || '-'}
                                                    </p>
                                                </td>
                                                <td className='px-6 py-6 text-[14px] text-[#364153] whitespace-nowrap'>
                                                    {formatDate(item.regDt)}
                                                </td>
                                                <td className='px-6 py-6 text-right text-[14px] text-[#364153] whitespace-nowrap'>
                                                    {formatDate(item.updateDt)}
                                                </td>
                                                <td className='px-6 py-6 text-right'>
                                                    <div className='flex items-center justify-end gap-2'>
                                                        <button
                                                            type='button'
                                                            className='flex h-8 w-8 items-center justify-center rounded-lg text-error-500 transition-colors hover:bg-error-50'
                                                            aria-label='삭제'
                                                            onClick={() =>
                                                                handleDeleteBlacklistMember(
                                                                    item.memberNo,
                                                                )
                                                            }
                                                        >
                                                            <TrashSimpleIcon className='h-4 w-4 text-error-500' />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
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

export default CommentBlacklist;
