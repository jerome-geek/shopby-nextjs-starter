import { isEmpty } from '@fxts/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';

import ErrorMessage from '@/components/form/ErrorMessage';
import {
    Input,
    InputContainer,
    Label,
    TextArea,
} from '@/components/form/input';
import Select from '@/components/form/select/intdex';
import Toggle from '@/components/form/toggle';
import { COLLECTION_GROUP_ID_OPTIONS } from '@/const/collection';
import useCollectionMutation from '@/hooks/mutations/useCollectionMutation';
import {
    useCollectionExposureGroupDetail,
    useSearchCollectionList,
} from '@/hooks/query/collection';
import { collectionKeys } from '@/hooks/queryKeys';
import useApiError from '@/hooks/useApiError';
import { useToast } from '@/hooks/utils';
import { DefaultModalLayoutProps, ModalLayout } from '@/layout/modal';
import type {
    Collection,
    CollectionExposureGroupDetailResponse,
} from '@/model/collection';
import {
    createCollectionExposureGroupsSchema,
    CreateCollectionExposureGroupsSchemaType,
    updateCollectionExposureGroupsSchema,
    UpdateCollectionExposureGroupsSchemaType,
} from '@/schema/collection.schema';

import { ReactComponent as SearchIcon } from '@/icons/search.svg?react';

interface CreateCollectionGroupModalProps extends DefaultModalLayoutProps {
    groupSno?: number;
}

const detailToCollectionItem = (
    detail: CollectionExposureGroupDetailResponse,
): Collection => ({
    collectionSno: detail.collection.collectionSno,
    title: detail.collection.title,
    memberName: detail.collection.memberName,
    memberNo: detail.collection.memberNo,
    recipeCount: detail.collection.recipeCount,
    shareCode: detail.collection.shareCode,
});

const CreateCollectionGroupModal = ({
    groupSno = 0,
    ...props
}: CreateCollectionGroupModalProps) => {
    const queryClient = useQueryClient();

    const { addToast } = useToast();

    const isModify = !!groupSno;

    const { data: collectionExposureGroupDetailData } =
        useCollectionExposureGroupDetail({
            groupSno,
            options: {
                enabled: isModify,
            },
        });

    const methods = useForm<
        | CreateCollectionExposureGroupsSchemaType
        | UpdateCollectionExposureGroupsSchemaType
    >({
        resolver: zodResolver(
            isModify
                ? updateCollectionExposureGroupsSchema
                : createCollectionExposureGroupsSchema,
        ),
        defaultValues: {
            exposureLocation: '',
            groupName: '',
            description: '',
            isDisplay: true,
            collectionSno: 0,
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

    const { handleErrorToast } = useApiError();

    const {
        createCollectionExposureGroups: createCollectionExposureGroupsMutation,
        updateCollectionExposureGroups: updateCollectionExposureGroupsMutation,
    } = useCollectionMutation();

    const invalidate = async () => {
        await queryClient.invalidateQueries({
            queryKey: collectionKeys.all,
            refetchType: 'all',
        });
    };

    const isPending = isModify
        ? updateCollectionExposureGroupsMutation.isPending
        : createCollectionExposureGroupsMutation.isPending;

    const onSubmit = (
        data:
            | CreateCollectionExposureGroupsSchemaType
            | UpdateCollectionExposureGroupsSchemaType,
    ) => {
        if (isModify) {
            const parseData = updateCollectionExposureGroupsSchema.parse(data);

            updateCollectionExposureGroupsMutation.mutate(
                {
                    groupSno,
                    data: parseData,
                },
                {
                    onSuccess: async () => {
                        await invalidate();

                        addToast({
                            variant: 'success',
                            message: '컬렉션 그룹이 수정되었습니다.',
                        });

                        props.close();
                    },
                    onError: (error) => {
                        handleErrorToast(error);
                    },
                },
            );
            return;
        }

        const parseData = createCollectionExposureGroupsSchema.parse(data);

        createCollectionExposureGroupsMutation.mutate(parseData, {
            onSuccess: async () => {
                await invalidate();

                addToast({
                    variant: 'success',
                    message: '컬렉션 그룹이 생성되었습니다.',
                });

                props.close();
            },
            onError: (error) => {
                handleErrorToast(error);
            },
        });
    };

    const inputRef = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState('');

    const onSubmitKeyword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setKeyword(inputRef.current?.value ?? '');
    };

    const { data: collectionListData } = useSearchCollectionList({
        params: {
            keyword,
            take: 100,
            page: 1,
        },
        options: {
            enabled: !!keyword,
        },
    });

    const collectionList = useMemo(
        () => collectionListData?.data ?? [],
        [collectionListData],
    );

    const collectionSno = useWatch({
        control,
        name: 'collectionSno',
    });

    const [selectedCollection, setSelectedCollection] =
        useState<Collection | null>(null);

    const applyCollectionSnoToggle = (
        nextChecked: boolean,
        item: Collection,
        currentSno: number,
        setFieldSno: (sno: number) => void,
    ) => {
        if (nextChecked) {
            setFieldSno(item.collectionSno);
            setSelectedCollection(item);
            return;
        }

        if (currentSno === item.collectionSno) {
            setFieldSno(0);
            setSelectedCollection(null);
        }
    };

    const removeCollectionFromSelection = (
        item: Collection,
        currentSno: number,
    ) => {
        if (currentSno === item.collectionSno) {
            setValue('collectionSno', 0, { shouldDirty: true });
            setSelectedCollection(null);
        }
    };

    useEffect(() => {
        if (!isModify) {
            return;
        }

        if (!collectionExposureGroupDetailData) {
            return;
        }

        const d = collectionExposureGroupDetailData;

        reset(
            (prev) => ({
                ...prev,
                exposureLocation: d.exposureLocation,
                groupName: d.groupName,
                description: d.description ?? '',
                isDisplay: d.isDisplay,
                collectionSno: d.collection.collectionSno,
            }),
            {
                keepFieldsRef: true,
            },
        );

        setSelectedCollection(detailToCollectionItem(d));
    }, [collectionExposureGroupDetailData, isModify, reset]);

    return (
        <ModalLayout
            {...props}
            title={isModify ? '컬렉션 그룹 수정' : '새 컬렉션 그룹 생성'}
            subtitle='컬렉션 그룹을 생성하고 컬렉션을 선택하세요.'
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
                                    options={[...COLLECTION_GROUP_ID_OPTIONS]}
                                    placeholder='그룹 아이디 선택'
                                    value={
                                        COLLECTION_GROUP_ID_OPTIONS.find(
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
                        <Label isRequired>컬렉션 선택</Label>

                        <form onSubmit={onSubmitKeyword} className='relative'>
                            <span className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2'>
                                <SearchIcon className='h-[14px] w-[14px] text-[#99a1af]' />
                            </span>
                            <Input
                                type='text'
                                placeholder='컬렉션 검색...'
                                className='pl-8'
                                ref={inputRef}
                            />
                        </form>

                        <p className='mt-2 text-xs font-medium text-[#6a7282] dark:text-gray-400'>
                            검색 결과
                        </p>

                        <div className='mt-1.5 mb-1.5 flex flex-col overflow-hidden rounded-lg border border-[#e5e7eb] bg-white dark:border-gray-700 dark:bg-gray-900'>
                            {isEmpty(collectionList) ? (
                                <p className='px-3 py-4 text-center text-sm text-[#99a1af]'>
                                    검색 결과가 없습니다.
                                </p>
                            ) : (
                                <Controller
                                    name='collectionSno'
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <>
                                            {collectionList.map(
                                                (item, index) => {
                                                    const checked =
                                                        value ===
                                                        item.collectionSno;

                                                    return (
                                                        <label
                                                            key={
                                                                item.collectionSno
                                                            }
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
                                                                checked={
                                                                    checked
                                                                }
                                                                onChange={(e) =>
                                                                    applyCollectionSnoToggle(
                                                                        e.target
                                                                            .checked,
                                                                        item,
                                                                        value,
                                                                        onChange,
                                                                    )
                                                                }
                                                                className='h-4 w-4 shrink-0 cursor-pointer rounded border-[#d1d5db] text-[#ff6900] accent-[#ff6900] focus:ring-[#ff6900]'
                                                            />

                                                            <div className='min-w-0 flex-1'>
                                                                <p className='max-w-[300px] truncate text-sm font-medium leading-5 text-[#101828]'>
                                                                    {item.title}
                                                                </p>
                                                                <p className='text-xs leading-4 text-[#6a7282]'>
                                                                    {
                                                                        item.memberName
                                                                    }
                                                                    <span className='px-1 text-[#e5e7eb]'>
                                                                        |
                                                                    </span>
                                                                    레시피{' '}
                                                                    {item.recipeCount.toLocaleString()}
                                                                    개
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

                        {collectionSno > 0 && selectedCollection && (
                            <div className='flex flex-col overflow-hidden rounded-lg border border-[#ff6900]/25 bg-white shadow-[inset_3px_0_0_0_#ff6900] dark:border-orange-500/30 dark:bg-gray-900'>
                                <div className='flex items-center justify-between gap-2 border-b border-[#f3f4f6] bg-[#fff9f5] px-3 py-2 dark:border-gray-700 dark:bg-orange-950/25'>
                                    <span className='text-xs font-semibold text-[#364153] dark:text-gray-200'>
                                        선택된 컬렉션
                                    </span>
                                </div>

                                <label
                                    className={`flex cursor-pointer items-center gap-3 bg-[#fff7ed] px-3 py-2.5 transition-colors hover:bg-[#fafafa] dark:bg-orange-950/20 dark:hover:bg-gray-800/60`}
                                >
                                    <input
                                        type='checkbox'
                                        checked={true}
                                        onChange={() =>
                                            removeCollectionFromSelection(
                                                selectedCollection,
                                                collectionSno ?? 0,
                                            )
                                        }
                                        className='h-4 w-4 shrink-0 cursor-pointer rounded border-[#d1d5db] text-[#ff6900] accent-[#ff6900] focus:ring-[#ff6900]'
                                    />

                                    <div className='min-w-0 flex-1'>
                                        <p className='max-w-[300px] truncate text-sm font-medium leading-5 text-[#101828]'>
                                            {selectedCollection.title}
                                        </p>
                                        <p className='text-xs leading-4 text-[#6a7282]'>
                                            {selectedCollection.memberName}
                                            <span className='px-1 text-[#e5e7eb]'>
                                                |
                                            </span>
                                            레시피{' '}
                                            {selectedCollection.recipeCount.toLocaleString()}
                                            개
                                        </p>
                                    </div>
                                </label>
                            </div>
                        )}

                        <ErrorMessage name='collectionSno' control={control} />
                    </InputContainer>
                </div>
            </FormProvider>
        </ModalLayout>
    );
};

export default CreateCollectionGroupModal;
