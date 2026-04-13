import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDebounceValue } from 'usehooks-ts';

import ErrorMessage from '@/components/form/ErrorMessage';
import { Input, InputContainer, Label } from '@/components/form/input';
import Select from '@/components/form/select/intdex';
import { useRecipeMutation } from '@/hooks/mutations';
import { useServerApiByPass } from '@/hooks/query/shopby';
import { recipeKeys } from '@/hooks/queryKeys';
import useApiError from '@/hooks/useApiError';
import useDialog from '@/hooks/utils/useDialog';
import { ModalLayout } from '@/layout/modal';
import { MemberListResponse } from '@/model/shopby';
import {
    createUserRecipeSchema,
    CreateUserRecipeSchemaType,
} from '@/schema/recipe.schema';
import LoadingWrapper from '@/components/ui/loading-wrapper';
import { MEMBER_SEARCH_TYPE_OPTIONS } from '@/const/recipe';

interface MemberOption {
    value: string;
    label: string;
    memberNo: number;
    memberId: string;
    memberName: string;
}

interface CreateUserRecipeModalProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
}

const CreateUserRecipeModal = ({ ...props }: CreateUserRecipeModalProps) => {
    const { openAsyncDialog } = useDialog();
    const { handleErrorDialog } = useApiError();

    const queryClient = useQueryClient();

    const methods = useForm<CreateUserRecipeSchemaType>({
        resolver: zodResolver(createUserRecipeSchema),
        defaultValues: {
            memberNo: 0,
            memberName: '',
            memberId: '',
            url: '',
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

    const [memberSearchType, setMemberSearchType] = useState('USER_ID');
    const [keywordInput, setKeywordInput] = useState('');
    const [debouncedKeyword] = useDebounceValue(keywordInput.trim(), 300);

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

    const memberOptions: MemberOption[] = useMemo(() => {
        const rows = memberListData?.contents ?? [];
        return rows.map((m) => ({
            value: String(m.memberNo),
            label: `${m.memberId} (${m.memberName})`,
            memberNo: m.memberNo,
            memberId: m.memberId,
            memberName: m.memberName,
        }));
    }, [memberListData]);

    const { createUserRecipe: createUserRecipeMutation } = useRecipeMutation();

    const onSubmit = (data: CreateUserRecipeSchemaType) => {
        createUserRecipeMutation.mutate(data, {
            onSuccess: async () => {
                queryClient.invalidateQueries({
                    queryKey: recipeKeys.lists(),
                });

                await openAsyncDialog({
                    message: '레시피 생성 요청이 완료되었습니다.',
                    description: '1~5분 후 레시피 생성이 완료됩니다.',
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
            title='새 레시피 생성'
            subtitle='새로운 레시피를 생성하고 정보를 입력하세요.'
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
                    <Label className='text-xs font-medium text-[#364153]'>
                        사용자 아이디 <span className='text-[#ff6900]'>*</span>
                    </Label>

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
                                    <Select<MemberOption>
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
                    <Label className='text-xs font-medium text-[#364153]'>
                        유튜브 / 인스타그램 URL{' '}
                        <span className='text-[#ff6900]'>*</span>
                    </Label>

                    <Input
                        type='text'
                        placeholder='URL을 입력하세요'
                        {...register('url')}
                    />

                    <ErrorMessage name='url' control={control} />
                </InputContainer>
            </div>
        </ModalLayout>
    );
};

export default CreateUserRecipeModal;
