import { Link, useParams } from 'react-router';

import PageMeta from '@/components/common/PageMeta';
import { DisplayVisibilityBadge } from '@/components/ui/badge/display-visibility';
import { RecipeSourceBadge } from '@/components/ui/badge/recipe-source';
import { ExternalLinkIconButton } from '@/components/ui/button/ExternalLinkIconButton';
import { PATHS } from '@/const/paths';
import { useRecipeExposureGroupDetail } from '@/hooks/suspenseQuery/recipe';
import type { RecipeExposureGroupDetailResponse } from '@/model/recipe';

import { ReactComponent as ChevronLeftSmallIcon } from '@/icons/chevron-left-small.svg?react';

const tableLayout = {
    minWidth: 'min-w-[860px]',
    column: {
        thumbnail: 'w-[90px]',
        title: '',
        author: 'w-[140px]',
        source: 'w-[140px]',
        actions: 'w-[80px]',
    },
} as const;

const tableTh = {
    left: 'px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282]',
    right: 'px-6 py-3 text-right text-xs font-medium uppercase text-[#6a7282]',
} as const;

const RecipeGroupDetail = () => {
    const { sno } = useParams<{ sno: string }>();

    const groupSno = Number(sno) || 0;

    const { data: recipeExposureGroupDetailData } =
        useRecipeExposureGroupDetail({
            groupSno,
        });

    const sortedRecipes = [...recipeExposureGroupDetailData.recipes].sort(
        (a, b) => a.sortOrder - b.sortOrder,
    );
    const groupInfoItems = buildGroupInfoItems(recipeExposureGroupDetailData);

    return (
        <>
            <PageMeta
                title={`${recipeExposureGroupDetailData.groupName} | 레시피 그룹 상세`}
                description={
                    recipeExposureGroupDetailData.description ||
                    recipeExposureGroupDetailData.groupName
                }
            />

            <div className='flex flex-1 flex-col gap-6 px-6 pt-6 pb-10'>
                <div className='flex flex-col gap-3'>
                    <Link
                        to={PATHS.APP.RECIPE_GROUP.LIST}
                        className='inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[#0a0a0a] transition-colors hover:text-[#ff6900]'
                    >
                        <ChevronLeftSmallIcon className='h-4 w-4' />
                        목록으로
                    </Link>
                    <h1 className='text-2xl font-bold tracking-tight text-[#101828]'>
                        레시피 그룹 상세
                    </h1>
                </div>

                <div className='rounded-2xl border border-[#e5e7eb] bg-white px-6 pt-6 pb-5 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]'>
                    <div className='grid grid-cols-2 gap-x-6 gap-y-6'>
                        {groupInfoItems.map(({ key, fullWidth, node }) => (
                            <div
                                key={key}
                                className={fullWidth ? 'col-span-2' : undefined}
                            >
                                {node}
                            </div>
                        ))}
                    </div>
                </div>

                <div className='overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]'>
                    <div className='border-b border-[#e5e7eb] px-6 py-4'>
                        <h2 className='text-sm font-semibold text-[#101828]'>
                            레시피 목록 ({sortedRecipes.length}개)
                        </h2>
                    </div>

                    <div className='overflow-x-auto'>
                        <table
                            className={`w-full ${tableLayout.minWidth} table-fixed`}
                        >
                            <thead>
                                <tr className='border-b border-[#e5e7eb] bg-[#f9fafb]'>
                                    <th
                                        className={`${tableLayout.column.thumbnail} ${tableTh.left}`}
                                    >
                                        썸네일
                                    </th>
                                    <th
                                        className={[
                                            tableLayout.column.title,
                                            tableTh.left,
                                        ]
                                            .filter(Boolean)
                                            .join(' ')}
                                    >
                                        제목
                                    </th>
                                    <th
                                        className={`${tableLayout.column.author} ${tableTh.left}`}
                                    >
                                        작성자
                                    </th>
                                    <th
                                        className={`${tableLayout.column.source} ${tableTh.left}`}
                                    >
                                        소스
                                    </th>
                                    <th
                                        className={`${tableLayout.column.actions} ${tableTh.right}`}
                                    >
                                        작업
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedRecipes.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className='px-6 py-12 text-center text-sm text-[#6a7282]'
                                        >
                                            등록된 레시피가 없습니다.
                                        </td>
                                    </tr>
                                ) : (
                                    sortedRecipes.map((recipe) => (
                                        <tr
                                            key={recipe.sno}
                                            className='border-b border-[#e5e7eb] transition-colors last:border-b-0 hover:bg-[#fafafa]'
                                        >
                                            <td className='px-6 py-4'>
                                                <div className='flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-[#f3f4f6] shadow-sm'>
                                                    <img
                                                        src={
                                                            recipe.thumbnailUrl
                                                        }
                                                        alt={recipe.title}
                                                        className='h-full w-full object-cover'
                                                    />
                                                </div>
                                            </td>
                                            <td className='px-6 py-4'>
                                                <span className='text-[14px] font-medium text-[#101828]'>
                                                    {recipe.title}
                                                </span>
                                            </td>
                                            <td className='px-6 py-4'>
                                                <span className='text-[14px] font-normal text-[#6a7282]'>
                                                    {recipe.authorName}
                                                </span>
                                            </td>
                                            <td className='px-6 py-4'>
                                                <RecipeSourceBadge
                                                    source={recipe.sourceType}
                                                    showIcon
                                                />
                                            </td>
                                            <td className='px-6 py-4 text-right'>
                                                <ExternalLinkIconButton />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecipeGroupDetail;

const infoLabelClass = 'text-xs font-normal text-[#6a7282]';

const buildGroupInfoItems = (detail: RecipeExposureGroupDetailResponse) => [
    {
        key: 'exposureLocation',
        node: (
            <div className='flex flex-col gap-1.5'>
                <span className={infoLabelClass}>그룹 아이디</span>
                <span className='inline-block w-fit rounded-lg bg-[#f3f4f6] px-2.5 py-1 font-mono text-xs text-[#364153]'>
                    {detail.exposureLocation}
                </span>
            </div>
        ),
    },
    {
        key: 'sno',
        node: (
            <div className='flex flex-col gap-1.5'>
                <span className={infoLabelClass}>그룹 번호</span>
                <span className='text-sm font-medium text-[#101828]'>
                    {detail.sno}
                </span>
            </div>
        ),
    },
    {
        key: 'groupName',
        node: (
            <div className='flex flex-col gap-1.5'>
                <span className={infoLabelClass}>그룹명</span>
                <span className='text-sm font-medium text-[#101828]'>
                    {detail.groupName}
                </span>
            </div>
        ),
    },
    {
        key: 'sortOrder',
        node: (
            <div className='flex flex-col gap-1.5'>
                <span className={infoLabelClass}>정렬 순서</span>
                <span className='text-sm font-medium tabular-nums text-[#101828]'>
                    {detail.sortOrder}
                </span>
            </div>
        ),
    },
    {
        key: 'description',
        fullWidth: true,
        node: (
            <div className='flex flex-col gap-1.5'>
                <span className={infoLabelClass}>설명</span>
                <span className='text-sm font-normal text-[#364153]'>
                    {detail.description?.trim() ? detail.description : '—'}
                </span>
            </div>
        ),
    },
    {
        key: 'displayAndCreated',
        fullWidth: true,
        node: (
            <div className='flex items-start gap-6'>
                <div className='flex flex-col gap-1.5'>
                    <span className={infoLabelClass}>노출 상태</span>
                    <DisplayVisibilityBadge isVisible={detail.isDisplay} />
                </div>
                <div className='flex flex-col gap-1.5'>
                    <span className={infoLabelClass}>생성일</span>
                    <span className='text-sm font-normal text-[#364153]'>
                        —
                    </span>
                </div>
            </div>
        ),
    },
];
