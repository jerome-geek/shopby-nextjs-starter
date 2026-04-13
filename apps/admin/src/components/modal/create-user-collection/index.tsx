import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { filter, isEmpty, pipe, toArray } from '@fxts/core';
import dayjs from 'dayjs';
import { useMemo, useRef, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useDebounceValue } from 'usehooks-ts';

import ErrorMessage from '@/components/form/ErrorMessage';
import { Input, InputContainer, Label } from '@/components/form/input';
import Select from '@/components/form/select/intdex';
import LoadingWrapper from '@/components/ui/loading-wrapper';
import { MEMBER_SEARCH_TYPE_OPTIONS } from '@/const/recipe';
import { useCollectionMutation } from '@/hooks/mutations';
import { useRecipeList } from '@/hooks/query/recipe';
import { useServerApiByPass } from '@/hooks/query/shopby';
import { collectionKeys } from '@/hooks/queryKeys';
import useApiError from '@/hooks/useApiError';
import useDialog from '@/hooks/utils/useDialog';
import { DefaultModalLayoutProps, ModalLayout } from '@/layout/modal';
import type { Recipe } from '@/model/recipe';
import { MemberListResponse } from '@/model/shopby';
import {
    createUserCollectionSchema,
    CreateUserCollectionSchemaType,
} from '@/schema/collection.schema';
import { isProcessingRecipe } from '@/utils/recipe';

import { ReactComponent as SearchIcon } from '@/icons/search.svg?react';

const CreateUserCollectionModal = ({ ...props }: DefaultModalLayoutProps) => {
    const { openAsyncDialog } = useDialog();
    const { handleErrorDialog } = useApiError();

    const queryClient = useQueryClient();

    const methods = useForm<CreateUserCollectionSchemaType>({
        resolver: zodResolver(createUserCollectionSchema),
        defaultValues: {
            memberNo: 0,
            memberName: '',
            memberId: '',
            collectionName: '',
            recipeSnos: [],
        },
    });

    const {
        control,
        formState: { isSubmitting, isDirty },
        register,
        handleSubmit,
        setValue,
        watch,
    } = methods;

    const selectedMemberNo = watch('memberNo');

    const recipeSnos = useWatch({
        control,
        name: 'recipeSnos',
    });

    const [memberSearchType, setMemberSearchType] = useState('USER_ID');
    const [keywordInput, setKeywordInput] = useState('');
    const [debouncedKeyword] = useDebounceValue(keywordInput.trim(), 300);

    const inputRef = useRef<HTMLInputElement>(null);
    const [recipeKeyword, setRecipeKeyword] = useState('');
    const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);

    const searchParams = useMemo(
        () => ({
            searchType: memberSearchType,
            keywords: debouncedKeyword,
            startSignUpDate: '2000-01-01',
            endSignUpDate: dayjs().format('YYYY-MM-DD'),
        }),
        [debouncedKeyword, memberSearchType],
    );

    const { data: memberListData, isLoading: isMemberListLoading } =
        useServerApiByPass<MemberListResponse>({
            url: '/members',
            param: searchParams,
            version: '1.2',
            options: {
                enabled: debouncedKeyword.length > 0,
                staleTime: 30_000,
            },
        });

    const memberOptions = useMemo(() => {
        const rows = memberListData?.contents ?? [];
        return rows.map((m) => ({
            value: String(m.memberNo),
            label: `${m.memberId} (${m.memberName})`,
            memberNo: m.memberNo,
            memberId: m.memberId,
            memberName: m.memberName,
        }));
    }, [memberListData]);

    const onSubmitRecipeKeyword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setRecipeKeyword(inputRef.current?.value ?? '');
    };

    const { data: recipeListData } = useRecipeList({
        params: {
            keyword: recipeKeyword,
            take: 100,
            page: 1,
        },
        options: {
            enabled: !!recipeKeyword,
        },
    });

    const recipeList = useMemo(
        () =>
            pipe(
                recipeListData?.data ?? [],
                filter(
                    (recipe) =>
                        !isProcessingRecipe(recipe.title, recipe.authorName),
                ),
                toArray,
            ),
        [recipeListData],
    );

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
        const list = currentSnos.filter((sno) => sno !== recipe.sno);
        setValue('recipeSnos', list, { shouldDirty: true });
        setSelectedRecipes((prev) => prev.filter((r) => r.sno !== recipe.sno));
    };

    const { createUserCollection: createUserCollectionMutation } =
        useCollectionMutation();

    const onSubmit = (data: CreateUserCollectionSchemaType) => {
        createUserCollectionMutation.mutate(data, {
            onSuccess: async () => {
                queryClient.invalidateQueries({
                    queryKey: collectionKeys.lists(),
                });

                await openAsyncDialog({
                    message: '컬렉션 생성이 완료되었습니다.',
                });

                props.close();
            },
            onError: (error) => {
                handleErrorDialog(error);
            },
        });
    };

    return (
        <ModalLayout
            {...props}
            title='새 컬렉션 생성'
            subtitle='새로운 컬렉션을 생성하고 정보를 입력하세요.'
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
                        type='button'
                        onClick={handleSubmit(onSubmit)}
                        className='h-9 rounded-lg bg-[#ff6900] px-4 text-sm font-medium text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50'
                        disabled={isSubmitting || !isDirty}
                    >
                        생성
                    </button>
                </>
            }
        >
            <div className='flex flex-col gap-4 pb-1'>
                <InputContainer>
                    <Label isRequired>사용자</Label>

                    <div className='flex flex-col gap-2 sm:flex-row'>
                        <div className='sm:w-[120px]'>
                            <Select
                                options={MEMBER_SEARCH_TYPE_OPTIONS}
                                value={
                                    MEMBER_SEARCH_TYPE_OPTIONS.find(
                                        (o) => o.value === memberSearchType,
                                    ) ?? null
                                }
                                onChange={(option) => {
                                    if (!option) {
                                        return;
                                    }
                                    setMemberSearchType(option.value);
                                    setKeywordInput('');
                                }}
                                isSearchable={false}
                                placeholder='검색 유형'
                            />
                        </div>
                        <div className='min-w-0 flex-1'>
                            <Controller
                                name='memberNo'
                                control={control}
                                render={() => (
                                    <Select
                                        options={memberOptions}
                                        value={
                                            memberOptions.find(
                                                (o) =>
                                                    o.memberNo ===
                                                    selectedMemberNo,
                                            ) ?? null
                                        }
                                        onChange={(option) => {
                                            if (!option) {
                                                return;
                                            }

                                            const o = option;
                                            setValue('memberNo', o.memberNo, {
                                                shouldDirty: true,
                                                shouldValidate: true,
                                            });
                                            setValue(
                                                'memberName',
                                                o.memberName,
                                                {
                                                    shouldDirty: true,
                                                    shouldValidate: true,
                                                },
                                            );
                                            setValue('memberId', o.memberId, {
                                                shouldDirty: true,
                                                shouldValidate: true,
                                            });
                                        }}
                                        onInputChange={(newValue, meta) => {
                                            if (
                                                meta.action === 'input-change'
                                            ) {
                                                setKeywordInput(newValue);
                                                setValue('memberNo', 0, {
                                                    shouldDirty: true,
                                                });
                                                setValue('memberName', '', {
                                                    shouldDirty: true,
                                                });
                                                setValue('memberId', '', {
                                                    shouldDirty: true,
                                                });
                                            }
                                            return newValue;
                                        }}
                                        isLoading={isMemberListLoading}
                                        isSearchable
                                        placeholder='검색어를 입력하세요'
                                        noOptionsMessage={() =>
                                            debouncedKeyword
                                                ? '검색 결과가 없습니다.'
                                                : '검색어를 입력하세요.'
                                        }
                                        loadingMessage={() => (
                                            <LoadingWrapper
                                                isLoading
                                                containerStyle={{
                                                    height: '50px',
                                                }}
                                                loadingSpinnerStyle={{
                                                    width: '20px',
                                                    height: '20px',
                                                    borderWidth: '3px',
                                                }}
                                            >
                                                <span />
                                            </LoadingWrapper>
                                        )}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <ErrorMessage name='memberNo' control={control} />
                </InputContainer>

                <InputContainer>
                    <Label isRequired>컬렉션명</Label>

                    <Input
                        type='text'
                        placeholder='컬렉션명을 입력하세요'
                        {...register('collectionName')}
                    />

                    <ErrorMessage name='collectionName' control={control} />
                </InputContainer>

                <InputContainer>
                    <Label isRequired>레시피 선택</Label>

                    <form onSubmit={onSubmitRecipeKeyword} className='relative'>
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
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        {recipeList.map((recipe, index) => {
                                            const checked = value?.includes(
                                                recipe.sno,
                                            );

                                            return (
                                                <label
                                                    key={recipe.sno}
                                                    className={`flex cursor-pointer items-center gap-3 px-3 py-2.5 transition-colors hover:bg-[#fafafa] ${
                                                        index !== 0
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
                                                        checked={checked}
                                                        onChange={(e) =>
                                                            applyRecipeSnosToggle(
                                                                e.target
                                                                    .checked,
                                                                recipe,
                                                                value ?? [],
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
                                    </>
                                )}
                            />
                        )}
                    </div>

                    {!isEmpty(selectedRecipes) && (
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
        </ModalLayout>
    );
};

export default CreateUserCollectionModal;
