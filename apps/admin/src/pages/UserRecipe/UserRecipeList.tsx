import { isEmpty } from '@fxts/core';
import { overlay } from 'overlay-kit';
import { useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router';

import PageMeta from '@/components/common/PageMeta';
import CreateUserRecipeModal from '@/components/modal/create-user-recipe';
import { RecipeSourceBadge } from '@/components/ui/badge/recipe-source';
import LoadingWrapper from '@/components/ui/loading-wrapper';
import TablePaginationFooter from '@/components/ui/table-pagination-footer';
import { PATHS } from '@/const/paths';
import { useRecipeList } from '@/hooks/query/recipe';
import { isProcessingRecipe } from '@/utils/recipe';

import { ReactComponent as BookmarkIcon } from '@/icons/bookmark.svg?react';
import { ReactComponent as HeartIcon } from '@/icons/heart.svg?react';
import { ReactComponent as PlusSimpleIcon } from '@/icons/plus-simple.svg?react';
import { ReactComponent as SearchIcon } from '@/icons/search.svg?react';

const tableLayout = {
    minWidth: 'min-w-[860px]',
    column: {
        recipe: '',
        author: 'w-[150px]',
        source: 'w-[120px]',
        bookmark: 'w-[90px]',
        like: 'w-[90px]',
    },
} as const;

const tableTh = {
    left: 'px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282]',
    right: 'px-6 py-3 text-right text-xs font-medium uppercase text-[#6a7282]',
} as const;

const PAGE_SEARCH_PARAM = 'page';
const PAGE_SIZE = 10;

const UserRecipeList = () => {
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

    const { data: recipeListData, isLoading: isRecipeListLoading } =
        useRecipeList({
            params,
        });

    const totalCount = recipeListData?.count ?? 0;
    const lastPage = recipeListData?.lastPage ?? 1;

    const searchRecipeList = useMemo(() => {
        return recipeListData?.data ?? [];
    }, [recipeListData]);

    const setQuery = (e: React.FormEvent<HTMLFormElement>) => {
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
                        className='flex h-9 items-center gap-2 rounded-lg bg-brand-500 px-3 text-sm font-medium text-white transition-colors hover:bg-brand-600'
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
                                placeholder='레시피명으로 검색...'
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
                        isLoading={isRecipeListLoading}
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
                                    </tr>
                                </thead>

                                <tbody>
                                    {isEmpty(searchRecipeList) ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className='px-6 py-12 text-center text-sm text-[#6a7282]'
                                            >
                                                검색 결과가 없습니다.
                                            </td>
                                        </tr>
                                    ) : (
                                        searchRecipeList.map((item) => {
                                            const isProcessing =
                                                isProcessingRecipe(
                                                    item.title,
                                                    item.authorName,
                                                );

                                            return (
                                                <tr
                                                    key={item.sno}
                                                    className='border-b border-[#e5e7eb] last:border-b-0 hover:bg-[#fafafa] transition-colors group'
                                                >
                                                    <td className='px-6 py-6'>
                                                        <div className='flex items-center gap-2'>
                                                            {isProcessing ? (
                                                                <div className='flex items-center gap-2'>
                                                                    <div className='h-4 w-4 rounded-full border-2 border-[#ff6900] border-t-[#dbdbdb] animate-spin' />
                                                                    <span className='text-[15px] text-[#6a7282] whitespace-nowrap overflow-hidden text-ellipsis'>
                                                                        {
                                                                            item.title
                                                                        }
                                                                    </span>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <span className='text-lg'>
                                                                        <img
                                                                            src={
                                                                                item.thumbnailUrl
                                                                            }
                                                                            alt={
                                                                                item.title
                                                                            }
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
                                                                        {
                                                                            item.title
                                                                        }
                                                                    </Link>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className='px-6 py-6 text-[14px] text-[#364153]'>
                                                        {isProcessing ? (
                                                            <div className='flex items-center gap-2'>
                                                                <span className='text-[#6a7282]'>
                                                                    -
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            item.authorName
                                                        )}
                                                    </td>
                                                    <td className='px-6 py-6'>
                                                        <RecipeSourceBadge
                                                            source={
                                                                item.sourceType
                                                            }
                                                        />
                                                    </td>
                                                    <td className='px-6 py-6'>
                                                        <div className='flex items-center gap-1.5 text-[14px] font-medium text-[#364153]'>
                                                            <BookmarkIcon className='w-4 h-4 text-[#6a7282]' />
                                                            {(
                                                                item.bookmarkCount ??
                                                                0
                                                            ).toLocaleString()}
                                                        </div>
                                                    </td>
                                                    <td className='px-6 py-6'>
                                                        <div className='flex items-center gap-1.5 text-[14px] font-medium text-[#364153]'>
                                                            <HeartIcon className='w-4 h-4 text-[#6a7282]' />
                                                            {(
                                                                item.likeCount ??
                                                                0
                                                            ).toLocaleString()}
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

export default UserRecipeList;
