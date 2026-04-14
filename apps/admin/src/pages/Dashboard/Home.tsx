import { useMemo, type ReactNode } from 'react';
import { Link } from 'react-router';

import PageMeta from '@/components/common/PageMeta';
import { RecentRow, StatIcon, SwipeSection } from '@/components/home';
import { PATHS } from '@/const/paths';
import {
    useCollectionExposureGroupList,
    useSearchCollectionList,
} from '@/hooks/query/collection';
import {
    useRecipeExposureGroupList,
    useRecipeList,
} from '@/hooks/query/recipe';
import {
    chunkBy,
    DASHBOARD_RECENT_PER_PAGE,
    DASHBOARD_RECENT_TAKE,
    formatStatValue,
} from '@/utils/home';

interface StatCardProps {
    label: string;
    value: string;
    icon: ReactNode;
    to: string;
}

const Home = () => {
    const listParams = useMemo(
        () => ({
            keyword: '',
            page: 1,
            take: DASHBOARD_RECENT_TAKE,
            order: 'DESC' as const,
        }),
        [],
    );

    const countOnlyParams = useMemo(
        () => ({
            page: 1,
            take: 1,
        }),
        [],
    );

    const {
        data: recipeListData,
        isLoading: isRecipeListLoading,
        isError: isRecipeListError,
    } = useRecipeList({
        params: listParams,
    });

    const {
        data: collectionListData,
        isLoading: isCollectionListLoading,
        isError: isCollectionListError,
    } = useSearchCollectionList({
        params: listParams,
    });

    const {
        data: recipeGroupData,
        isLoading: isRecipeGroupLoading,
        isError: isRecipeGroupError,
    } = useRecipeExposureGroupList({
        params: countOnlyParams,
    });

    const {
        data: collectionGroupData,
        isLoading: isCollectionGroupLoading,
        isError: isCollectionGroupError,
    } = useCollectionExposureGroupList({
        params: countOnlyParams,
    });

    const stats: StatCardProps[] = useMemo(
        () => [
            {
                label: '레시피 노출 그룹',
                value: formatStatValue(
                    recipeGroupData?.count,
                    isRecipeGroupLoading,
                    isRecipeGroupError,
                ),
                icon: <StatIcon iconType='recipeGroup' />,
                to: PATHS.APP.RECIPE_GROUP.LIST,
            },
            {
                label: '컬렉션 노출 그룹',
                value: formatStatValue(
                    collectionGroupData?.count,
                    isCollectionGroupLoading,
                    isCollectionGroupError,
                ),
                icon: <StatIcon iconType='collectionGroup' />,
                to: PATHS.APP.COLLECTION_GROUP.LIST,
            },
            {
                label: '총 레시피',
                value: formatStatValue(
                    recipeListData?.count,
                    isRecipeListLoading,
                    isRecipeListError,
                ),
                icon: <StatIcon iconType='recipe' />,
                to: PATHS.APP.USER_RECIPE.LIST,
            },
            {
                label: '총 컬렉션',
                value: formatStatValue(
                    collectionListData?.count,
                    isCollectionListLoading,
                    isCollectionListError,
                ),
                icon: <StatIcon iconType='collection' />,
                to: PATHS.APP.USER_COLLECTION.LIST,
            },
        ],
        [
            recipeListData?.count,
            isRecipeListLoading,
            isRecipeListError,
            collectionListData?.count,
            isCollectionListLoading,
            isCollectionListError,
            recipeGroupData?.count,
            isRecipeGroupLoading,
            isRecipeGroupError,
            collectionGroupData?.count,
            isCollectionGroupLoading,
            isCollectionGroupError,
        ],
    );

    const recentRecipes = useMemo(
        () => recipeListData?.data ?? [],
        [recipeListData],
    );
    const recentCollections = useMemo(
        () => collectionListData?.data ?? [],
        [collectionListData],
    );

    const recipePages = useMemo(
        () => chunkBy(recentRecipes, DASHBOARD_RECENT_PER_PAGE),
        [recentRecipes],
    );
    const collectionPages = useMemo(
        () => chunkBy(recentCollections, DASHBOARD_RECENT_PER_PAGE),
        [recentCollections],
    );

    return (
        <>
            <PageMeta
                title='대시보드 | JollyPot 관리자'
                description='JollyPot 관리자 대시보드'
            />
            <div className='flex flex-col gap-6 px-6 pb-10 pt-6'>
                <div className='flex flex-col gap-1'>
                    <h2 className='text-2xl font-bold leading-8 tracking-[0.07px] text-[#101828]'>
                        대시보드
                    </h2>
                    <p className='text-base font-normal leading-6 tracking-[-0.31px] text-[#6a7282]'>
                        JollyPot 관리자 페이지에 오신 것을 환영합니다
                    </p>
                </div>

                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4'>
                    {stats.map((stat) => (
                        <Link
                            key={stat.label}
                            to={stat.to}
                            className='group flex items-start justify-between rounded-[14px] border border-[#e5e7eb] bg-white px-6 py-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] transition-all duration-200 ease-out hover:border-brand-400 hover:bg-brand-50 hover:shadow-[0px_4px_14px_0px_rgba(255,105,0,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-brand-500 dark:hover:bg-brand-500/10'
                        >
                            <div className='flex flex-col gap-1'>
                                <span className='text-sm font-normal leading-5 text-[#4a5565] transition-colors group-hover:text-[#364153] dark:text-gray-400'>
                                    {stat.label}
                                </span>
                                <span className='text-[30px] font-bold leading-9 tracking-[0.4px] text-[#101828] transition-colors duration-200 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400'>
                                    {stat.value}
                                </span>
                            </div>
                            {stat.icon}
                        </Link>
                    ))}
                </div>

                <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                    <SwipeSection
                        title='최근 레시피'
                        description={`검색 API · 최신순 상위 ${DASHBOARD_RECENT_TAKE}건`}
                        isLoading={isRecipeListLoading}
                        isError={isRecipeListError}
                        emptyText='등록된 레시피가 없습니다.'
                        pageCount={recipePages.length}
                    >
                        {recipePages.length > 0
                            ? recipePages.map((page, pageIdx) => (
                                  <div
                                      key={pageIdx}
                                      className='w-full shrink-0 snap-start'
                                  >
                                      {page.map((item, idx) => (
                                          <RecentRow
                                              key={item.sno}
                                              title={item.title}
                                              subtitle={item.authorName}
                                              to={PATHS.APP.USER_RECIPE.DETAIL.replace(
                                                  ':sno',
                                                  String(item.sno),
                                              )}
                                              isLast={idx === page.length - 1}
                                          />
                                      ))}
                                  </div>
                              ))
                            : null}
                    </SwipeSection>

                    <SwipeSection
                        title='최근 컬렉션'
                        description={`검색 API · 최신순 상위 ${DASHBOARD_RECENT_TAKE}건`}
                        isLoading={isCollectionListLoading}
                        isError={isCollectionListError}
                        emptyText='등록된 컬렉션이 없습니다.'
                        pageCount={collectionPages.length}
                    >
                        {collectionPages.length > 0
                            ? collectionPages.map((page, pageIdx) => (
                                  <div
                                      key={pageIdx}
                                      className='w-full shrink-0 snap-start'
                                  >
                                      {page.map((item, idx) => (
                                          <RecentRow
                                              key={item.collectionSno}
                                              title={item.title}
                                              subtitle={`${item.memberName} · 레시피 ${item.recipeCount}개`}
                                              to={PATHS.APP.USER_COLLECTION.DETAIL.replace(
                                                  ':sno',
                                                  String(item.collectionSno),
                                              )}
                                              isLast={idx === page.length - 1}
                                          />
                                      ))}
                                  </div>
                              ))
                            : null}
                    </SwipeSection>
                </div>
            </div>
        </>
    );
};

export default Home;
