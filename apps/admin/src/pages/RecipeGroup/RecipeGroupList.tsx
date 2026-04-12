import { isEmpty } from '@fxts/core';
import { overlay } from 'overlay-kit';
import { Fragment, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router';

import PageMeta from '@/components/common/PageMeta';
import CreateRecipeGroupModal from '@/components/modal/create-recipe-group';
import RecipeOrderManagementModal from '@/components/modal/recipe-order-management';
import { DisplayVisibilityBadge } from '@/components/ui/badge/display-visibility';
import LoadingWrapper from '@/components/ui/loading-wrapper';
import { PATHS } from '@/const/paths';
import { useGetRecipeExposureGroups } from '@/hooks/query/recipe';
import {
    groupByExposureLocation,
    exposureLocationLabel,
} from '@/utils/receipe';

import { ReactComponent as GridDotsIcon } from '@/icons/grid-dots.svg?react';
import { ReactComponent as PencilSimpleIcon } from '@/icons/pencil-simple.svg?react';
import { ReactComponent as PlusSimpleIcon } from '@/icons/plus-simple.svg?react';
import { ReactComponent as SearchIcon } from '@/icons/search.svg?react';
import { ReactComponent as TrashSimpleIcon } from '@/icons/trash-simple.svg?react';

const RecipeGroupList = () => {
    const {
        data: recipeExposureGroupsData = [],
        isLoading: isRecipeExposureGroupsLoading,
    } = useGetRecipeExposureGroups();

    const inputRef = useRef<HTMLInputElement>(null);
    const [groupNameKeyword, setGroupNameKeyword] = useState('');

    const openRecipeOrderOverlay = () => {
        overlay.open((props) => <RecipeOrderManagementModal {...props} />);
    };

    const openCreateRecipeGroupOverlay = () => {
        overlay.open((props) => <CreateRecipeGroupModal {...props} />);
    };

    const applySearchFilter = () => {
        const keyword = inputRef.current?.value.trim() ?? '';
        setGroupNameKeyword(keyword);
    };

    const recipeExposureGroupList = useMemo(() => {
        if (groupNameKeyword === '') {
            return recipeExposureGroupsData;
        }

        return recipeExposureGroupsData.filter(
            (item) =>
                item.groupName.includes(groupNameKeyword) ||
                item.description.includes(groupNameKeyword),
        );
    }, [recipeExposureGroupsData, groupNameKeyword]);

    const groupedRecipeExposureGroups = useMemo(
        () => groupByExposureLocation(recipeExposureGroupList),
        [recipeExposureGroupList],
    );

    return (
        <>
            <PageMeta
                title='레시피 그룹 관리 | JollyPot 관리자'
                description='레시피 그룹을 관리합니다'
            />
            <div className='flex flex-col gap-6 pt-6 px-6'>
                {/* 페이지 헤더 */}
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-2xl font-bold leading-8 tracking-[0.07px] text-[#101828]'>
                            레시피 그룹 관리
                        </h2>
                        <p className='text-base font-normal leading-6 tracking-[-0.31px] text-[#6a7282]'>
                            레시피 그룹을 관리합니다
                        </p>
                    </div>

                    {/* 액션 버튼 영역 */}
                    <div className='flex items-center gap-3'>
                        {/* 순서 관리 버튼 */}
                        <button
                            type='button'
                            onClick={openRecipeOrderOverlay}
                            className='flex items-center gap-2 h-9 px-3 rounded-lg border border-[#ff6900] bg-white text-[#ff6900] text-sm font-medium transition-colors hover:bg-orange-50'
                        >
                            <GridDotsIcon className='w-4 h-4 text-[#ff6900]' />
                            순서 관리
                        </button>

                        {/* 그룹 생성 버튼 */}
                        <button
                            type='button'
                            onClick={openCreateRecipeGroupOverlay}
                            className='flex items-center gap-2 h-9 px-3 rounded-lg bg-[#ff6900] text-white text-sm font-medium transition-colors hover:bg-orange-600'
                        >
                            <PlusSimpleIcon className='w-4 h-4 text-white' />
                            그룹 생성
                        </button>
                    </div>
                </div>

                <div className='bg-white border border-[#e5e7eb] rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] overflow-hidden'>
                    <div className='border-b border-[#e5e7eb] px-4 py-4'>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                applySearchFilter();
                            }}
                            className='flex gap-2'
                        >
                            <div className='relative min-w-0 flex-1'>
                                <span className='pointer-events-none absolute left-3 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center text-[#717182]'>
                                    <SearchIcon className='h-full w-full' />
                                </span>
                                <input
                                    ref={inputRef}
                                    type='search'
                                    placeholder='그룹명으로 검색...'
                                    className='w-full h-10 pl-10 pr-4 py-1 bg-[#f3f3f5] rounded-xl text-[14px] text-[#101828] placeholder:text-[#99a1af] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20 focus:bg-white transition-all'
                                />
                            </div>
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
                        isLoading={isRecipeExposureGroupsLoading}
                        containerStyle={{ minHeight: '50vh' }}
                    >
                        <div className='overflow-x-auto'>
                            <table className='w-full min-w-[960px] table-fixed'>
                                <thead>
                                    <tr className='bg-[#f9fafb] border-b border-[#e5e7eb]'>
                                        <th className='w-[130px] px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282]'>
                                            그룹 아이디 (정렬 순서)
                                        </th>
                                        <th className='w-[180px] max-w-[280px] px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282]'>
                                            그룹명
                                        </th>
                                        <th className='w-[100px] px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282]'>
                                            레시피 수
                                        </th>
                                        <th className='w-[100px] px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282]'>
                                            노출여부
                                        </th>
                                        <th className='w-[100px] px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282]'>
                                            생성일
                                        </th>
                                        <th className='w-[100px] px-6 py-3 text-right text-xs font-medium uppercase text-[#6a7282]'>
                                            작업
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isEmpty(recipeExposureGroupList) ? (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className='px-6 py-12 text-center text-sm text-[#6a7282]'
                                            >
                                                {groupNameKeyword !== ''
                                                    ? '검색 결과가 없습니다.'
                                                    : '등록된 레시피 그룹이 없습니다.'}
                                            </td>
                                        </tr>
                                    ) : (
                                        groupedRecipeExposureGroups.map(
                                            ([location, rows]) => (
                                                <Fragment key={location}>
                                                    <tr className='border-b border-[#e5e7eb] bg-[#f3f4f6]'>
                                                        <td
                                                            colSpan={6}
                                                            className='px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-[#364153]'
                                                        >
                                                            {exposureLocationLabel(
                                                                location,
                                                            )}
                                                        </td>
                                                    </tr>
                                                    {rows.map((item) => (
                                                        <tr
                                                            key={item.sno}
                                                            className='border-b border-[#e5e7eb] last:border-b-0 hover:bg-[#fafafa] transition-colors'
                                                        >
                                                            <td className='px-6 py-5'>
                                                                <div className='flex flex-col gap-0.5'>
                                                                    <span className='inline-block font-mono text-sm font-medium text-[#6a7282]'>
                                                                        {
                                                                            item.sortOrder
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </td>

                                                            <td className='max-w-0 px-6 py-5'>
                                                                <div className='flex min-w-0 max-w-[280px] flex-col gap-1'>
                                                                    <Link
                                                                        to={PATHS.APP.RECIPE_GROUP.DETAIL.replace(
                                                                            ':sno',
                                                                            item.sno.toString(),
                                                                        )}
                                                                        title={
                                                                            item.groupName
                                                                        }
                                                                        className='truncate text-[15px] font-semibold text-[#ff6900] hover:underline'
                                                                    >
                                                                        {
                                                                            item.groupName
                                                                        }
                                                                    </Link>
                                                                    <span
                                                                        title={
                                                                            item.description
                                                                        }
                                                                        className='truncate text-xs font-normal text-[#6a7282]'
                                                                    >
                                                                        {
                                                                            item.description
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </td>

                                                            <td className='px-6 py-5'>
                                                                <span className='text-sm font-medium text-[#364153]'>
                                                                    {item.recipeCount.toLocaleString()}
                                                                    개
                                                                </span>
                                                            </td>

                                                            <td className='px-6 py-5'>
                                                                <DisplayVisibilityBadge
                                                                    isVisible={
                                                                        item.isDisplay
                                                                    }
                                                                />
                                                            </td>

                                                            <td className='px-6 py-5'>
                                                                <span className='text-sm font-normal text-[#6a7282]'>
                                                                    —
                                                                </span>
                                                            </td>

                                                            <td className='px-6 py-5 text-right'>
                                                                <div className='flex items-center justify-end gap-2'>
                                                                    <button
                                                                        type='button'
                                                                        className='flex h-8 w-8 items-center justify-center rounded-lg text-[#364153] transition-colors hover:bg-gray-100'
                                                                        aria-label='수정'
                                                                    >
                                                                        <PencilSimpleIcon className='h-4 w-4 text-[#364153]' />
                                                                    </button>

                                                                    <button
                                                                        type='button'
                                                                        className='flex h-8 w-8 items-center justify-center rounded-lg text-[#f54900] transition-colors hover:bg-red-50'
                                                                        aria-label='삭제'
                                                                    >
                                                                        <TrashSimpleIcon className='h-4 w-4 text-[#f54900]' />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </Fragment>
                                            ),
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </LoadingWrapper>
                </div>
            </div>
        </>
    );
};

export default RecipeGroupList;
