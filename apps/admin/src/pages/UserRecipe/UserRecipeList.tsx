import { isEmpty } from '@fxts/core';
import { overlay } from 'overlay-kit';
import { useRef } from 'react';
import { Link, useSearchParams } from 'react-router';

import PageMeta from '@/components/common/PageMeta';
import CreateUserRecipeModal from '@/components/modal/create-user-recipe';
import { RecipeSourceBadge } from '@/components/ui/badge/recipe-source';
import LoadingWrapper from '@/components/ui/loading-wrapper';
import { PATHS } from '@/const/paths';
import { useSearchRecipeList } from '@/hooks/query/recipe';

import { ReactComponent as BookmarkIcon } from '@/icons/bookmark.svg?react';
import { ReactComponent as ChevronLeftSmallIcon } from '@/icons/chevron-left-small.svg?react';
import { ReactComponent as ChevronRightSmallIcon } from '@/icons/chevron-right-small.svg?react';
import { ReactComponent as HeartIcon } from '@/icons/heart.svg?react';
import { ReactComponent as PlusSimpleIcon } from '@/icons/plus-simple.svg?react';
import { ReactComponent as SearchIcon } from '@/icons/search.svg?react';

const tableLayout = {
    minWidth: 'min-w-[900px]',
    column: {
        recipe: '',
        author: 'w-[150px]',
        source: 'w-[150px]',
        bookmark: 'w-[120px]',
        like: 'w-[120px]',
        createdAt: 'w-[130px]',
    },
} as const;

const tableTh = {
    left: 'px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282]',
    right: 'px-6 py-3 text-right text-xs font-medium uppercase text-[#6a7282]',
} as const;

const UserRecipeList = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const keyword = searchParams.get('keyword') ?? '';

    const inputRef = useRef<HTMLInputElement>(null);

    const {
        data: searchRecipeListData = [],
        isLoading: isSearchRecipeListLoading,
    } = useSearchRecipeList({
        params: {
            keyword,
        },
    });

    const setQuery = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const keyword = inputRef.current?.value ?? '';

        setSearchParams({
            keyword,
        });
    };

    const openCreateUserRecipeOverlay = () => {
        overlay.open((props) => {
            return <CreateUserRecipeModal {...props} />;
        });
    };

    return (
        <>
            <PageMeta
                title='사용자 레시피 관리 | JollyPot 관리자'
                description='사용자가 등록한 레시피를 관리합니다'
            />
            <div className='flex flex-col gap-6 pt-6 px-6'>
                {/* 페이지 헤더 */}
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-2xl font-bold leading-8 tracking-[0.07px] text-[#101828]'>
                            사용자 레시피 관리
                        </h2>
                        <p className='text-base font-normal leading-6 tracking-[-0.31px] text-[#6a7282]'>
                            사용자가 등록한 레시피를 관리합니다
                        </p>
                    </div>

                    {/* 액션 버튼 */}
                    <button
                        onClick={openCreateUserRecipeOverlay}
                        className='flex items-center gap-2 h-10 px-4 rounded-xl bg-[#ff6900] text-white text-sm font-semibold transition-all hover:bg-orange-600 shadow-sm'
                    >
                        <PlusSimpleIcon className='w-4 h-4 text-white' />
                        레시피 생성
                    </button>
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
                                placeholder='레시피 키워드를 입력하세요.'
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
                        isLoading={isSearchRecipeListLoading}
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
                                                tableLayout.column.recipe,
                                                tableTh.left,
                                            ]
                                                .filter(Boolean)
                                                .join(' ')}
                                        >
                                            레시피
                                        </th>
                                        <th
                                            className={`${tableLayout.column.author} ${tableTh.left}`}
                                        >
                                            사용자
                                        </th>
                                        <th
                                            className={`${tableLayout.column.source} ${tableTh.left}`}
                                        >
                                            소스
                                        </th>
                                        <th
                                            className={`${tableLayout.column.bookmark} ${tableTh.left}`}
                                        >
                                            북마크
                                        </th>
                                        <th
                                            className={`${tableLayout.column.like} ${tableTh.left}`}
                                        >
                                            좋아요
                                        </th>
                                        <th
                                            className={`${tableLayout.column.createdAt} ${tableTh.right}`}
                                        >
                                            생성일
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {isEmpty(searchRecipeListData) ? (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className='px-6 py-12 text-center text-sm text-[#6a7282]'
                                            >
                                                검색 결과가 없습니다.
                                            </td>
                                        </tr>
                                    ) : (
                                        searchRecipeListData?.map((item) => (
                                            <tr
                                                key={item.sno}
                                                className='border-b border-[#e5e7eb] last:border-b-0 hover:bg-[#fafafa] transition-colors group'
                                            >
                                                <td className='px-6 py-6'>
                                                    <div className='flex items-center gap-2'>
                                                        <span className='text-lg'>
                                                            <img
                                                                src={
                                                                    item.thumbnailUrl
                                                                }
                                                                alt={item.title}
                                                                className='w-10 h-10 min-w-10 min-h-10 aspect-square rounded-xl object-cover'
                                                                style={{
                                                                    fontSize:
                                                                        '10px',
                                                                }}
                                                            />
                                                        </span>
                                                        <Link
                                                            to={PATHS.APP.USER_RECIPE.DETAIL.replace(
                                                                ':sno',
                                                                item.sno.toString(),
                                                            )}
                                                            className='text-[15px] font-bold text-[#ff6900] hover:underline whitespace-nowrap overflow-hidden text-ellipsis'
                                                        >
                                                            {item.title}
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td className='px-6 py-6 text-[14px] text-[#364153]'>
                                                    {item.authorName}
                                                </td>
                                                <td className='px-6 py-6'>
                                                    <RecipeSourceBadge
                                                        source={item.sourceType}
                                                    />
                                                </td>
                                                <td className='px-6 py-6'>
                                                    <div className='flex items-center gap-1.5 text-[14px] font-medium text-[#364153]'>
                                                        <BookmarkIcon className='w-4 h-4 text-[#6a7282]' />
                                                        {/* {item.bookmarks.toLocaleString()} */}
                                                        1
                                                    </div>
                                                </td>
                                                <td className='px-6 py-6'>
                                                    <div className='flex items-center gap-1.5 text-[14px] font-medium text-[#364153]'>
                                                        <HeartIcon className='w-4 h-4 text-[#6a7282]' />
                                                        {/* {item.likes.toLocaleString()} */}
                                                        1
                                                    </div>
                                                </td>
                                                <td className='px-6 py-6 text-[14px] text-[#6a7282] text-right'>
                                                    {/* {item.createdAt} */}
                                                    2026-03-21
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </LoadingWrapper>
                </div>

                {/* 하단 푸터 (총 개수 + 페이지네이션) */}
                <div className='flex items-center justify-between pb-10'>
                    <p className='text-sm text-[#6a7282]'>
                        총 12개 중 1-10개 표시
                    </p>
                    <div className='flex items-center gap-2'>
                        <button className='w-8 h-8 flex items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#6a7282] hover:bg-gray-50 disabled:opacity-50'>
                            <ChevronLeftSmallIcon className='w-4 h-4' />
                        </button>
                        <button className='w-8 h-8 flex items-center justify-center rounded-lg bg-[#ff6900] text-white text-sm font-semibold'>
                            1
                        </button>
                        <button className='w-8 h-8 flex items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-sm font-medium text-[#6a7282] hover:bg-gray-50'>
                            2
                        </button>
                        <button className='w-8 h-8 flex items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#6a7282] hover:bg-gray-50'>
                            <ChevronRightSmallIcon className='w-4 h-4' />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserRecipeList;
