import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import { useEffect, useMemo, useRef, useState } from 'react';
import { isEmpty } from '@fxts/core';
import { useQueryClient } from '@tanstack/react-query';

import ErrorMessage from '@/components/form/ErrorMessage';
import Select from '@/components/form/select/intdex';
import Toggle from '@/components/form/toggle';
import {
    Input,
    InputContainer,
    Label,
    TextArea,
} from '@/components/form/input';
import { DefaultModalLayoutProps, ModalLayout } from '@/layout/modal';
import {
    createRecipeExposureGroupsSchema,
    CreateRecipeExposureGroupsSchemaType,
    UpdateRecipeExposureGroupsSchemaType,
    updateRecipeExposureGroupsSchema,
} from '@/schema/recipe.schema';
import { RECIPE_GROUP_ID_OPTIONS } from '@/const/recipe';
import {
    useRecipeExposureGroupDetail,
    useSearchRecipeList,
} from '@/hooks/query/recipe';
import type { Recipe } from '@/model/recipe';
import useRecipeMutation from '@/hooks/mutations/useRecipeMutation';
import { useDialog } from '@/hooks/utils';
import useApiError from '@/hooks/useApiError';
import { recipeKeys } from '@/hooks/queryKeys';

import { ReactComponent as SearchIcon } from '@/icons/search.svg?react';

interface CreateRecipeGroupModalProps extends DefaultModalLayoutProps {
    groupSno?: number;
}

const CreateRecipeGroupModal = ({
    groupSno = 0,
    ...props
}: CreateRecipeGroupModalProps) => {
    const queryClient = useQueryClient();

    const isModify = !!groupSno;

    const { data: recipeExposureGroupDetailData } =
        useRecipeExposureGroupDetail({
            groupSno,
            options: {
                enabled: isModify,
            },
        });

    const methods = useForm<
        | CreateRecipeExposureGroupsSchemaType
        | UpdateRecipeExposureGroupsSchemaType
    >({
        resolver: zodResolver(
            isModify
                ? updateRecipeExposureGroupsSchema
                : createRecipeExposureGroupsSchema,
        ),
        defaultValues: {
            exposureLocation: '',
            groupName: '',
            description: '',
            isDisplay: true,
            recipeSnos: [],
        },
    });

    const {
        control,
        formState: { isSubmitting, isDirty },
        register,
        handleSubmit,
        setValue,
        reset,
    } = methods;

    const { openAsyncDialog } = useDialog();
    const { handleErrorDialog } = useApiError();

    const {
        createRecipeExposureGroups: createRecipeExposureGroupsMutation,
        updateRecipeExposureGroups: updateRecipeExposureGroupsMutation,
    } = useRecipeMutation();

    const invalidate = () => {
        queryClient.invalidateQueries({
            queryKey: recipeKeys.all,
            refetchType: 'all',
        });
    };

    const isPending = isModify
        ? updateRecipeExposureGroupsMutation.isPending
        : createRecipeExposureGroupsMutation.isPending;

    const onSubmit = (
        data:
            | CreateRecipeExposureGroupsSchemaType
            | UpdateRecipeExposureGroupsSchemaType,
    ) => {
        if (isModify) {
            const parseData = updateRecipeExposureGroupsSchema.parse(data);

            updateRecipeExposureGroupsMutation.mutate(
                {
                    groupSno,
                    data: parseData,
                },
                {
                    onSuccess: async () => {
                        invalidate();

                        await openAsyncDialog({
                            message: '레시피 그룹이 수정되었습니다.',
                        });

                        props.close();
                    },
                    onError: (error) => {
                        handleErrorDialog(error);
                    },
                },
            );
            return;
        }

        const parseData = createRecipeExposureGroupsSchema.parse(data);

        createRecipeExposureGroupsMutation.mutate(parseData, {
            onSuccess: async () => {
                invalidate();

                await openAsyncDialog({
                    message: '레시피 그룹이 생성되었습니다.',
                });

                props.close();
            },
            onError: (error) => {
                handleErrorDialog(error);
            },
        });
    };

    const inputRef = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState('');

    const onSubmitKeyword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setKeyword(inputRef.current?.value ?? '');
    };

    const { data: recipeListData } = useSearchRecipeList({
        params: {
            keyword,
            take: 100,
            page: 1,
        },
        options: {
            enabled: !!keyword,
        },
    });

    const recipeList = useMemo(
        () => recipeListData?.data ?? [],
        [recipeListData],
    );

    const recipeSnos = useWatch({
        control,
        name: 'recipeSnos',
    });

    const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);

    const applyRecipeSnosToggle = (
        nextChecked: boolean,
        recipe: Recipe,
        currentSnos: number[],
        setFieldSnos: (snos: number[]) => void,
    ) => {
        const list = nextChecked
            ? [...currentSnos, recipe.sno]
            : currentSnos.filter((sno) => sno !== recipe.sno);

        setFieldSnos(list);
        setSelectedRecipes((prev) => {
            if (nextChecked) {
                if (prev.some((r) => r.sno === recipe.sno)) {
                    return prev;
                }
                return [...prev, recipe];
            }
            return prev.filter((r) => r.sno !== recipe.sno);
        });
    };

    const removeRecipeFromSelection = (
        recipe: Recipe,
        currentSnos: number[],
    ) => {
        if (isModify) {
            return;
        }

        const list = currentSnos.filter((sno) => sno !== recipe.sno);
        setValue('recipeSnos', list, { shouldDirty: true });
        setSelectedRecipes((prev) => prev.filter((r) => r.sno !== recipe.sno));
    };

    useEffect(() => {
        if (!isModify) {
            return;
        }

        if (!recipeExposureGroupDetailData) {
            return;
        }

        reset(
            (prev) => ({
                ...prev,
                ...recipeExposureGroupDetailData,
                recipeSnos: recipeExposureGroupDetailData.recipes.map(
                    (recipe) => recipe.sno,
                ),
            }),
            {
                keepFieldsRef: true,
            },
        );

        setSelectedRecipes(recipeExposureGroupDetailData.recipes);
    }, [recipeExposureGroupDetailData, isModify, reset]);

    return (
        <ModalLayout
            {...props}
            title='새 레시피 그룹 생성'
            subtitle='레시피 그룹을 생성하고 레시피를 선택하세요.'
            footer={
                <>
                    <button
                        type='button'
                        onClick={props.close}
                        className='h-9 rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm font-medium text-[#364153] transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                    >
                        취소
                    </button>
                    <button
                        type='submit'
                        onClick={handleSubmit(onSubmit)}
                        className='h-9 rounded-lg bg-[#ff6900] px-4 text-sm font-medium text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50'
                        disabled={isSubmitting || isPending || !isDirty}
                    >
                        {isModify ? '수정' : '생성'}
                    </button>
                </>
            }
        >
            <FormProvider {...methods}>
                <div className='flex flex-col gap-4'>
                    <InputContainer>
                        <Label isRequired>그룹 아이디</Label>
                        <Controller
                            name='exposureLocation'
                            control={control}
                            render={({
                                field: { onChange, value, ...rest },
                            }) => (
                                <Select
                                    {...rest}
                                    options={RECIPE_GROUP_ID_OPTIONS}
                                    placeholder='그룹 아이디 선택'
                                    value={
                                        RECIPE_GROUP_ID_OPTIONS.find(
                                            (o) => o.value === value,
                                        ) ?? null
                                    }
                                    onChange={(opt) =>
                                        onChange(opt?.value ?? '')
                                    }
                                    isDisabled={isModify}
                                />
                            )}
                        />
                        <ErrorMessage
                            name='exposureLocation'
                            control={control}
                        />
                    </InputContainer>

                    <InputContainer>
                        <Label isRequired>그룹명</Label>

                        <Input
                            {...register('groupName')}
                            type='text'
                            placeholder='그룹명을 입력하세요'
                        />

                        <ErrorMessage name='groupName' control={control} />
                    </InputContainer>

                    <div className='flex items-center justify-between'>
                        <Label isRequired>노출 여부</Label>
                        <Controller
                            name='isDisplay'
                            control={control}
                            render={({
                                field: { onChange, value, ...rest },
                            }) => (
                                <Toggle
                                    {...rest}
                                    checked={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                    </div>

                    <InputContainer>
                        <Label>설명</Label>
                        <TextArea
                            placeholder='그룹 명을 입력하세요'
                            {...register('description')}
                            rows={3}
                        />
                    </InputContainer>

                    <InputContainer>
                        <Label isRequired>레시피 선택</Label>

                        {!isModify && (
                            <>
                                <form
                                    onSubmit={onSubmitKeyword}
                                    className='relative'
                                >
                                    <span className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2'>
                                        <SearchIcon className='h-[14px] w-[14px] text-[#99a1af]' />
                                    </span>
                                    <Input
                                        type='text'
                                        placeholder='레시피 검색...'
                                        className='pl-8'
                                        ref={inputRef}
                                    />
                                </form>

                                <p className='mt-2 text-xs font-medium text-[#6a7282] dark:text-gray-400'>
                                    검색 결과
                                </p>

                                <div className='mt-1.5 mb-1.5 flex flex-col overflow-hidden rounded-lg border border-[#e5e7eb] bg-white dark:border-gray-700 dark:bg-gray-900'>
                                    {isEmpty(recipeList) ? (
                                        <p className='px-3 py-4 text-center text-sm text-[#99a1af]'>
                                            검색 결과가 없습니다.
                                        </p>
                                    ) : (
                                        <Controller
                                            name='recipeSnos'
                                            control={control}
                                            render={({
                                                field: { onChange, value },
                                            }) => (
                                                <>
                                                    {recipeList.map(
                                                        (recipe, index) => {
                                                            const checked =
                                                                value?.includes(
                                                                    recipe.sno,
                                                                );

                                                            return (
                                                                <label
                                                                    key={
                                                                        recipe.sno
                                                                    }
                                                                    className={`flex cursor-pointer items-center gap-3 px-3 py-2.5 transition-colors hover:bg-[#fafafa] ${
                                                                        index !==
                                                                        0
                                                                            ? 'border-t border-[#f3f4f6]'
                                                                            : ''
                                                                    } ${
                                                                        checked
                                                                            ? 'bg-[#fff7ed]'
                                                                            : ''
                                                                    }`}
                                                                >
                                                                    <input
                                                                        type='checkbox'
                                                                        checked={
                                                                            checked
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            applyRecipeSnosToggle(
                                                                                e
                                                                                    .target
                                                                                    .checked,
                                                                                recipe,
                                                                                value ??
                                                                                    [],
                                                                                onChange,
                                                                            )
                                                                        }
                                                                        className='h-4 w-4 shrink-0 cursor-pointer rounded border-[#d1d5db] text-[#ff6900] accent-[#ff6900] focus:ring-[#ff6900]'
                                                                    />

                                                                    <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] text-sm shadow-sm'>
                                                                        <img
                                                                            src={
                                                                                recipe.thumbnailUrl
                                                                            }
                                                                            alt={
                                                                                recipe.title
                                                                            }
                                                                            className='w-full h-full object-cover'
                                                                        />
                                                                    </div>

                                                                    <div className='min-w-0 flex-1'>
                                                                        <p className='max-w-[300px] truncate text-sm font-medium leading-5 text-[#101828]'>
                                                                            {
                                                                                recipe.title
                                                                            }
                                                                        </p>
                                                                        <p className='text-xs leading-4 text-[#6a7282]'>
                                                                            {
                                                                                recipe.authorName
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </label>
                                                            );
                                                        },
                                                    )}
                                                </>
                                            )}
                                        />
                                    )}
                                </div>
                            </>
                        )}

                        {!isEmpty(recipeSnos) && (
                            <div className='flex flex-col overflow-hidden rounded-lg border border-[#ff6900]/25 bg-white shadow-[inset_3px_0_0_0_#ff6900] dark:border-orange-500/30 dark:bg-gray-900'>
                                <div className='flex items-center justify-between gap-2 border-b border-[#f3f4f6] bg-[#fff9f5] px-3 py-2 dark:border-gray-700 dark:bg-orange-950/25'>
                                    <span className='text-xs font-semibold text-[#364153] dark:text-gray-200'>
                                        선택된 레시피
                                    </span>
                                    <span className='shrink-0 rounded-full bg-[#ff6900]/12 px-2 py-0.5 text-xs font-medium tabular-nums text-[#cc5400] dark:bg-orange-500/20 dark:text-orange-300'>
                                        {selectedRecipes.length}개
                                    </span>
                                </div>

                                {selectedRecipes.map((recipe, index) => {
                                    return (
                                        <label
                                            key={recipe.sno}
                                            className={`flex cursor-pointer items-center gap-3 px-3 py-2.5 transition-colors hover:bg-[#fafafa] dark:hover:bg-gray-800/60 ${
                                                index !== 0
                                                    ? 'border-t border-[#f3f4f6] dark:border-gray-700'
                                                    : ''
                                            } bg-[#fff7ed] dark:bg-orange-950/20`}
                                        >
                                            <input
                                                type='checkbox'
                                                checked={true}
                                                disabled={isModify}
                                                onChange={() =>
                                                    removeRecipeFromSelection(
                                                        recipe,
                                                        recipeSnos ?? [],
                                                    )
                                                }
                                                className='h-4 w-4 shrink-0 cursor-pointer rounded border-[#d1d5db] text-[#ff6900] accent-[#ff6900] focus:ring-[#ff6900]'
                                            />

                                            <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] text-sm shadow-sm'>
                                                <img
                                                    src={recipe.thumbnailUrl}
                                                    alt={recipe.title}
                                                    className='w-full h-full object-cover'
                                                />
                                            </div>

                                            <div className='min-w-0 flex-1'>
                                                <p className='max-w-[300px] truncate text-sm font-medium leading-5 text-[#101828]'>
                                                    {recipe.title}
                                                </p>
                                                <p className='text-xs leading-4 text-[#6a7282]'>
                                                    {recipe.authorName}
                                                </p>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        )}

                        <ErrorMessage name='recipeSnos' control={control} />
                    </InputContainer>
                </div>
            </FormProvider>
        </ModalLayout>
    );
};

export default CreateRecipeGroupModal;
