import { isEmpty } from '@fxts/core';
import { useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router';

import PageMeta from '@/components/common/PageMeta';
import LoadingWrapper from '@/components/ui/loading-wrapper';
import TablePaginationFooter from '@/components/ui/table-pagination-footer';
import { PATHS } from '@/const/paths';
import useSearchCollectionList from '@/hooks/query/collection/useSearchCollectionList';

import { ReactComponent as SearchIcon } from '@/icons/search.svg?react';

const tableLayout = {
    minWidth: 'min-w-[860px]',
    column: {
        title: '',
        user: 'w-[220px]',
        recipeCount: 'w-[120px]',
        shareCode: 'w-[180px]',
    },
} as const;

const tableTh = {
    left: 'px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282]',
    right: 'px-6 py-3 text-right text-xs font-medium uppercase text-[#6a7282]',
} as const;

const PAGE_SEARCH_PARAM = 'page';
const PAGE_SIZE = 10;

const UserCollections = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const keyword = searchParams.get('keyword') ?? '';
    const page = Number(searchParams.get(PAGE_SEARCH_PARAM)) || 1;

    const inputRef = useRef<HTMLInputElement>(null);

    const params = useMemo(() => {
        return {
            keyword,
            page,
            take: PAGE_SIZE,
        };
    }, [keyword, page]);

    const { data: collectionListData, isLoading: isCollectionListLoading } =
        useSearchCollectionList({
            params,
        });

    const totalCount = collectionListData?.count ?? 0;
    const lastPage = collectionListData?.lastPage ?? 1;

    const collectionList = useMemo(() => {
        return collectionListData?.data ?? [];
    }, [collectionListData]);

    const setQuery = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nextKeyword = inputRef.current?.value ?? '';

        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);

            if (nextKeyword.trim() === '') {
                next.delete('keyword');
            } else {
                next.set('keyword', nextKeyword);
            }

            next.delete(PAGE_SEARCH_PARAM);
            return next;
        });
    };

    // TODO: 컬렉션 생성 모달 임시 주석 처리
    // const openCreateUserCollectionModal = () => {
    //     overlay.open((props) => <CreateUserCollectionModal {...props} />);
    // };

    return (
        <>
            <PageMeta
                title='사용자 컬렉션 관리 | JollyPot 관리자'
                description='사용자가 생성한 컬렉션을 관리합니다'
            />
            <div className='flex flex-col gap-6 pt-6 px-6'>
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-2xl font-bold leading-8 tracking-[0.07px] text-[#101828]'>
                            사용자 컬렉션 관리
                        </h2>
                        <p className='text-base font-normal leading-6 tracking-[-0.31px] text-[#6a7282]'>
                            사용자가 생성한 컬렉션을 관리합니다
                        </p>
                    </div>

                    {/* 액션 버튼 */}
                    {/* TODO: 컬렉션 생성 버튼 임시 주석 처리 */}
                    {/* <button
                        onClick={openCreateUserCollectionModal}
                        className='flex h-9 items-center gap-2 rounded-lg bg-brand-500 px-3 text-sm font-medium text-white transition-colors hover:bg-brand-600'
                    >
                        <PlusSimpleIcon className='w-4 h-4 text-white' />
                        컬렉션 생성
                    </button> */}
                </div>

                {/* 테이블 카드 */}
                <div className='bg-white border border-[#e5e7eb] rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] overflow-hidden'>
                    {/* 검색 영역 */}
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
                                placeholder='컬렉션명 또는 사용자명으로 검색...'
                                defaultValue={keyword}
                                ref={inputRef}
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
                        isLoading={isCollectionListLoading}
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
                                            className={[
                                                tableLayout.column.title,
                                                tableTh.left,
                                            ]
                                                .filter(Boolean)
                                                .join(' ')}
                                        >
                                            컬렉션명
                                        </th>
                                        <th
                                            className={`${tableLayout.column.user} ${tableTh.left}`}
                                        >
                                            사용자
                                        </th>
                                        <th
                                            className={`${tableLayout.column.recipeCount} ${tableTh.left}`}
                                        >
                                            레시피 수
                                        </th>
                                        <th
                                            className={`${tableLayout.column.shareCode} ${tableTh.left}`}
                                        >
                                            공유 코드
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isEmpty(collectionList) ? (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className='px-6 py-12 text-center text-sm text-[#6a7282]'
                                            >
                                                검색 결과가 없습니다.
                                            </td>
                                        </tr>
                                    ) : (
                                        collectionList.map((item) => (
                                            <tr
                                                key={item.collectionSno}
                                                className='border-b border-[#e5e7eb] last:border-b-0 hover:bg-[#fafafa] transition-colors group'
                                            >
                                                <td className='px-6 py-6'>
                                                    <Link
                                                        to={PATHS.APP.USER_COLLECTION.DETAIL.replace(
                                                            ':sno',
                                                            item.collectionSno.toString(),
                                                        )}
                                                        className='text-[15px] font-bold text-[#ff6900] hover:underline whitespace-nowrap overflow-hidden text-ellipsis'
                                                    >
                                                        {item.title}
                                                    </Link>
                                                    {item.description && (
                                                        <p className='mt-1 text-[12px] text-[#6a7282] line-clamp-1'>
                                                            {item.description}
                                                        </p>
                                                    )}
                                                </td>
                                                <td className='px-6 py-6'>
                                                    <div className='flex flex-col gap-0.5 text-[14px]'>
                                                        <span className='font-medium text-[#101828]'>
                                                            {item.memberName}
                                                        </span>
                                                        <span className='text-[12px] text-[#6a7282]'>
                                                            회원 번호:{' '}
                                                            {item.memberNo}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className='px-6 py-6'>
                                                    <span className='text-[14px] font-medium text-[#364153]'>
                                                        {item.recipeCount.toLocaleString()}
                                                    </span>
                                                </td>
                                                <td className='px-6 py-6 text-[14px] text-[#6a7282]'>
                                                    {item.shareCode}
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

export default UserCollections;
