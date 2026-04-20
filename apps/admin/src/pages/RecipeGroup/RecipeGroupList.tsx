import { useQueryClient } from '@tanstack/react-query';
import { overlay } from 'overlay-kit';
import { useCallback, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router';

import PageMeta from '@/components/common/PageMeta';
import Select from '@/components/form/select/intdex';
import CreateRecipeGroupModal from '@/components/modal/create-recipe-group';
import RecipeOrderManagementModal from '@/components/modal/recipe-order-management';
import { DisplayVisibilityBadge } from '@/components/ui/badge/display-visibility';
import LoadingWrapper from '@/components/ui/loading-wrapper';
import TablePaginationFooter from '@/components/ui/table-pagination-footer';
import { PATHS } from '@/const/paths';
import { RECIPE_GROUP_ID_OPTIONS } from '@/const/recipe';
import useRecipeMutation from '@/hooks/mutations/useRecipeMutation';
import { useRecipeExposureGroupList } from '@/hooks/query/recipe';
import { recipeKeys } from '@/hooks/queryKeys';
import useApiError from '@/hooks/useApiError';
import { useDialog, useToast } from '@/hooks/utils';

import { ReactComponent as GridDotsIcon } from '@/icons/grid-dots.svg?react';
import { ReactComponent as PencilSimpleIcon } from '@/icons/pencil-simple.svg?react';
import { ReactComponent as PlusSimpleIcon } from '@/icons/plus-simple.svg?react';
import { ReactComponent as TrashSimpleIcon } from '@/icons/trash-simple.svg?react';

const tableLayout = {
    minWidth: 'min-w-[860px]',
    column: {
        exposureLocation: 'w-[100px]',
        sortOrder: 'w-[100px]',
        groupName: 'w-[180px]',
        recipeCount: 'w-[100px]',
        display: 'w-[100px]',
        actions: 'w-[100px]',
    },
} as const;

const tableTh = {
    left: 'px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282]',
    right: 'px-6 py-3 text-right text-xs font-medium uppercase text-[#6a7282]',
} as const;

const RECIPE_GROUP_EXPOSURE_FILTER_OPTIONS = [
    { value: 'all', label: '전체 보기' },
    ...RECIPE_GROUP_ID_OPTIONS,
];

const EXPOSURE_LOCATION_SEARCH_PARAM = 'exposureLocation';
const PAGE_SEARCH_PARAM = 'page';
const PAGE_SIZE = 10;

const RecipeGroupList = () => {
    const { addToast } = useToast();

    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get(PAGE_SEARCH_PARAM)) || 1;

    const exposureLocationFilter = useMemo(() => {
        const raw = searchParams.get(EXPOSURE_LOCATION_SEARCH_PARAM);

        if (!raw) {
            return 'all';
        }

        if (RECIPE_GROUP_ID_OPTIONS.some((option) => option.value === raw)) {
            return raw;
        }

        return 'all';
    }, [searchParams]);

    const setExposureLocationFilter = useCallback(
        (value: string) => {
            setSearchParams(
                (prev) => {
                    const next = new URLSearchParams(prev);

                    if (value === 'all') {
                        next.delete(EXPOSURE_LOCATION_SEARCH_PARAM);
                    } else {
                        next.set(EXPOSURE_LOCATION_SEARCH_PARAM, value);
                    }

                    next.delete(PAGE_SEARCH_PARAM);

                    return next;
                },
                { replace: true },
            );
        },
        [setSearchParams],
    );

    const listParams = useMemo(
        () => ({
            page,
            take: PAGE_SIZE,
            isDisplay: true,
            ...(exposureLocationFilter !== 'all' && {
                exposureLocation: exposureLocationFilter,
            }),
        }),
        [exposureLocationFilter, page],
    );

    const {
        data: recipeExposureGroupListData,
        isLoading: isRecipeExposureGroupListLoading,
    } = useRecipeExposureGroupList({
        params: listParams,
    });

    const listTotalCount = recipeExposureGroupListData?.count ?? 0;
    const listLastPage = recipeExposureGroupListData?.lastPage ?? 1;

    const recipeExposureGroupList = useMemo(
        () => recipeExposureGroupListData?.data ?? [],
        [recipeExposureGroupListData],
    );

    const openRecipeOrderOverlay = () => {
        overlay.open((props) => <RecipeOrderManagementModal {...props} />);
    };

    const openCreateRecipeGroupOverlay = (groupSno?: number) => {
        overlay.open((props) => (
            <CreateRecipeGroupModal {...props} groupSno={groupSno} />
        ));
    };

    const queryClient = useQueryClient();

    const { openAsyncDialog } = useDialog();
    const { handleErrorToast } = useApiError();

    const { deleteRecipeExposureGroups: deleteRecipeExposureGroupsMutation } =
        useRecipeMutation();

    const handleDeleteRecipeExposureGroups = async (groupSno: number) => {
        const isAgree = await openAsyncDialog({
            message: '레시피 그룹을 삭제하시겠습니까?',
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (!isAgree) {
            return;
        }

        deleteRecipeExposureGroupsMutation.mutate(groupSno, {
            onSuccess: async () => {
                await queryClient.invalidateQueries({
                    queryKey: recipeKeys.all,
                    refetchType: 'all',
                });

                addToast({
                    message: '레시피 그룹이 삭제되었습니다.',
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
                title='레시피 그룹 관리 | JollyPot 관리자'
                description='레시피 그룹을 관리합니다'
            />
            <div className='flex flex-col gap-6 pt-6 px-6'>
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-2xl font-bold leading-8 tracking-[0.07px] text-[#101828]'>
                            레시피 그룹 관리
                        </h2>
                        <p className='text-base font-normal leading-6 tracking-[-0.31px] text-[#6a7282]'>
                            레시피 그룹을 관리합니다
                        </p>
                    </div>

                    <div className='flex items-center gap-3'>
                        <button
                            type='button'
                            onClick={openRecipeOrderOverlay}
                            className='flex h-9 items-center gap-2 rounded-lg border border-brand-500 bg-white px-3 text-sm font-medium text-brand-500 transition-colors hover:bg-brand-50'
                        >
                            <GridDotsIcon className='h-4 w-4 text-brand-500' />
                            순서 관리
                        </button>

                        <button
                            type='button'
                            onClick={() => openCreateRecipeGroupOverlay()}
                            className='flex h-9 items-center gap-2 rounded-lg bg-brand-500 px-3 text-sm font-medium text-white transition-colors hover:bg-brand-600'
                        >
                            <PlusSimpleIcon className='w-4 h-4 text-white' />
                            그룹 생성
                        </button>
                    </div>
                </div>

                <div className='bg-white border border-[#e5e7eb] rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] overflow-hidden'>
                    <div className='border-b border-[#e5e7eb] px-4 py-4'>
                        <div className='flex flex-wrap items-center gap-3'>
                            <label
                                htmlFor='recipe-group-exposure-filter'
                                className='shrink-0 text-sm font-medium text-[#364153]'
                            >
                                그룹 아이디
                            </label>
                            <div className='min-w-[220px] max-w-sm flex-1'>
                                <Select
                                    inputId='recipe-group-exposure-filter'
                                    options={
                                        RECIPE_GROUP_EXPOSURE_FILTER_OPTIONS
                                    }
                                    value={
                                        RECIPE_GROUP_EXPOSURE_FILTER_OPTIONS.find(
                                            (opt) =>
                                                opt.value ===
                                                exposureLocationFilter,
                                        ) ?? null
                                    }
                                    onChange={(option) => {
                                        if (option) {
                                            setExposureLocationFilter(
                                                option.value,
                                            );
                                        }
                                    }}
                                    isSearchable={false}
                                    placeholder='그룹 아이디를 선택하세요'
                                />
                            </div>
                        </div>
                    </div>

                    <LoadingWrapper
                        isLoading={isRecipeExposureGroupListLoading}
                        containerStyle={{ minHeight: '50vh' }}
                    >
                        <div className='overflow-x-auto'>
                            <table
                                className={`w-full ${tableLayout.minWidth} table-fixed`}
                            >
                                <thead>
                                    <tr className='bg-[#f9fafb] border-b border-[#e5e7eb]'>
                                        <th
                                            className={`${tableLayout.column.exposureLocation} ${tableTh.left}`}
                                        >
                                            그룹 아이디
                                        </th>
                                        <th
                                            className={`${tableLayout.column.sortOrder} ${tableTh.left}`}
                                        >
                                            정렬 순서
                                        </th>
                                        <th
                                            className={`${tableLayout.column.groupName} ${tableTh.left}`}
                                        >
                                            그룹명
                                        </th>
                                        <th
                                            className={`${tableLayout.column.recipeCount} ${tableTh.left}`}
                                        >
                                            레시피 수
                                        </th>
                                        <th
                                            className={`${tableLayout.column.display} ${tableTh.left}`}
                                        >
                                            노출여부
                                        </th>
                                        <th
                                            className={`${tableLayout.column.actions} ${tableTh.right}`}
                                        >
                                            작업
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recipeExposureGroupList.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className='px-6 py-12 text-center text-sm text-[#6a7282]'
                                            >
                                                등록된 레시피 그룹이 없습니다.
                                            </td>
                                        </tr>
                                    ) : (
                                        recipeExposureGroupList.map((item) => (
                                            <tr
                                                key={item.sno}
                                                className='border-b border-[#e5e7eb] last:border-b-0 hover:bg-[#fafafa] transition-colors'
                                            >
                                                <td className='px-6 py-5'>
                                                    <span className='inline-block rounded-lg bg-[#f3f4f6] px-2.5 py-1 font-mono text-xs text-[#364153]'>
                                                        {item.exposureLocation}
                                                    </span>
                                                </td>
                                                <td className='px-6 py-5'>
                                                    <span
                                                        className={`font-mono text-sm tabular-nums ${
                                                            item.sortOrder === 1
                                                                ? 'font-semibold text-black'
                                                                : 'font-medium text-[#6a7282]'
                                                        }`}
                                                    >
                                                        {item.sortOrder}
                                                    </span>
                                                </td>

                                                <td className='max-w-0 px-6 py-5'>
                                                    <div className='flex min-w-0 flex-col gap-1'>
                                                        <Link
                                                            to={PATHS.APP.RECIPE_GROUP.DETAIL.replace(
                                                                ':sno',
                                                                item.sno.toString(),
                                                            )}
                                                            title={
                                                                item.groupName
                                                            }
                                                            className='truncate text-[15px] font-semibold text-brand-500 hover:text-brand-600 hover:underline'
                                                        >
                                                            {item.groupName}
                                                        </Link>
                                                        <span
                                                            title={
                                                                item.description
                                                            }
                                                            className='truncate text-xs font-normal text-[#6a7282]'
                                                        >
                                                            {item.description}
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

                                                <td className='px-6 py-5 text-right'>
                                                    <div className='flex items-center justify-end gap-2'>
                                                        <button
                                                            type='button'
                                                            className='flex h-8 w-8 items-center justify-center rounded-lg text-[#364153] transition-colors hover:bg-gray-100'
                                                            aria-label='수정'
                                                            onClick={() =>
                                                                openCreateRecipeGroupOverlay(
                                                                    item.sno,
                                                                )
                                                            }
                                                        >
                                                            <PencilSimpleIcon className='h-4 w-4 text-[#364153]' />
                                                        </button>

                                                        <button
                                                            type='button'
                                                            className='flex h-8 w-8 items-center justify-center rounded-lg text-error-500 transition-colors hover:bg-error-50'
                                                            aria-label='삭제'
                                                            onClick={() =>
                                                                handleDeleteRecipeExposureGroups(
                                                                    item.sno,
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
                    totalCount={listTotalCount}
                    page={page}
                    pageSize={PAGE_SIZE}
                    lastPage={listLastPage}
                    pageSearchParam={PAGE_SEARCH_PARAM}
                />
            </div>
        </>
    );
};

export default RecipeGroupList;
