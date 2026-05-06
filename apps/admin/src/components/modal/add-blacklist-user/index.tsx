import { isEmpty } from '@fxts/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDebounceValue } from 'usehooks-ts';

import ErrorMessage from '@/components/form/ErrorMessage';
import { Input, InputContainer, Label } from '@/components/form/input';
import Select from '@/components/form/select/intdex';
import LoadingWrapper from '@/components/ui/loading-wrapper';
import { MEMBER_SEARCH_TYPE_OPTIONS } from '@/const/recipe';
import useCommentMutation from '@/hooks/mutations/useCommentMutation';
import { useServerApiByPass } from '@/hooks/query/shopby';
import commentKeys from '@/hooks/queryKeys/comment';
import useApiError from '@/hooks/useApiError';
import { useToast } from '@/hooks/utils';
import { DefaultModalLayoutProps, ModalLayout } from '@/layout/modal';
import { MemberListResponse } from '@/model/shopby';
import {
    addCommentBlacklistSchema,
    AddCommentBlacklistSchemaType,
} from '@/schema';

type MemberOption = {
    value: string;
    label: string;
    memberNo: number;
    memberId?: string;
    memberName?: string;
};

interface AddCommentBlacklistModalProps extends DefaultModalLayoutProps {
    memberNo?: number;
    memberId?: string;
    memberName?: string;
}

const AddExceptionUserModal = ({
    memberNo,
    memberId,
    memberName,
    ...props
}: AddCommentBlacklistModalProps) => {
    const { addToast } = useToast();
    const { handleErrorToast } = useApiError();

    const queryClient = useQueryClient();

    const methods = useForm<AddCommentBlacklistSchemaType>({
        resolver: zodResolver(addCommentBlacklistSchema),
        defaultValues: {
            memberNos: [],
            memo: '',
        },
    });

    const {
        control,
        formState: { isSubmitting, isDirty },
        register,
        handleSubmit,
        setValue,
    } = methods;

    const isDirectMode = !!memberNo;

    const [memberSearchType, setMemberSearchType] = useState('USER_ID');
    const [keywordInput, setKeywordInput] = useState('');
    const [debouncedKeyword] = useDebounceValue(keywordInput.trim(), 300);
    const [selectedMembers, setSelectedMembers] = useState<MemberOption[]>([]);

    useEffect(() => {
        if (!isDirectMode) {
            return;
        }

        setSelectedMembers([
            {
                value: String(memberNo),
                label: `${memberId ?? '-'}${
                    memberName ? ` (${memberName})` : ''
                }`,
                memberNo: memberNo as number,
                memberId: memberId ?? undefined,
                memberName: memberName ?? undefined,
            },
        ]);

        setValue('memberNos', [memberNo as number], {
            shouldDirty: true,
            shouldValidate: true,
        });
    }, [isDirectMode, memberId, memberName, memberNo, setValue]);

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
                enabled: !isDirectMode && debouncedKeyword.length > 0,
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

    const { addCommentBlacklist: addCommentBlacklistMutation } =
        useCommentMutation();

    const onSubmit = async (data: AddCommentBlacklistSchemaType) => {
        try {
            const uniqueMemberNos = Array.from(new Set(data.memberNos));

            if (isEmpty(uniqueMemberNos)) {
                return;
            }

            const selectedMap = new Map(
                selectedMembers.map((m) => [m.memberNo, m]),
            );

            const results = await Promise.allSettled(
                uniqueMemberNos.map((memberNo) => {
                    const selected = selectedMap.get(memberNo);
                    return addCommentBlacklistMutation.mutateAsync({
                        memberNo,
                        memberId: selected?.memberId,
                        memberName: selected?.memberName,
                        memo: data.memo ?? '',
                    });
                }),
            );

            const successCount = results.filter(
                (r) => r.status === 'fulfilled',
            ).length;

            const failedCount = results.length - successCount;

            await queryClient.invalidateQueries({
                queryKey: commentKeys.blackLists(),
            });

            if (failedCount > 0) {
                addToast({
                    variant: 'success',
                    message: `블랙리스트에 사용자를 추가했습니다. (성공: ${successCount} / 실패: ${failedCount})`,
                });
                return;
            }

            addToast({
                variant: 'success',
                message: `블랙리스트에 사용자를 추가했습니다. (총 ${successCount}명)`,
            });

            props.close();
        } catch (error) {
            handleErrorToast(error);
        }
    };

    return (
        <ModalLayout
            {...props}
            title='블랙리스트 사용자 추가'
            subtitle='블랙리스트에 추가할 사용자를 등록합니다.'
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
                        추가
                    </button>
                </>
            }
        >
            <div className='flex flex-col gap-4 pb-1'>
                <InputContainer>
                    <Label isRequired>사용자</Label>

                    {isDirectMode ? (
                        <div className='flex flex-col gap-2 rounded-lg border border-[#e5e7eb] bg-white p-3'>
                            <div className='text-xs font-medium text-[#6a7282]'>
                                선택된 계정
                            </div>
                            <div className='text-sm text-[#101828]'>
                                {memberId ?? '-'}{' '}
                                {memberName ? `(${memberName})` : ''}
                            </div>
                            <div className='text-xs text-[#6a7282]'>
                                회원 번호: {memberNo}
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-2 sm:flex-row'>
                            <div className='flex-1'>
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
                                        setSelectedMembers([]);
                                        setValue('memberNos', [], {
                                            shouldDirty: true,
                                            shouldValidate: true,
                                        });
                                    }}
                                    isSearchable={false}
                                    placeholder='검색 유형'
                                />
                            </div>

                            <div className='flex-1'>
                                <Controller
                                    name='memberNos'
                                    control={control}
                                    render={() => (
                                        <Select<MemberOption, true>
                                            isMulti
                                            options={
                                                memberOptions as MemberOption[]
                                            }
                                            value={selectedMembers}
                                            controlShouldRenderValue={false}
                                            isClearable={false}
                                            classNames={{
                                                control: () => {
                                                    return clsx(
                                                        'min-w-[220px] max-w-[220px]',
                                                    );
                                                },
                                            }}
                                            components={{
                                                ClearIndicator: () => null,
                                            }}
                                            closeMenuOnSelect={false}
                                            blurInputOnSelect={false}
                                            onChange={(option) => {
                                                const next = (option ??
                                                    []) as MemberOption[];
                                                setSelectedMembers(next);
                                                setValue(
                                                    'memberNos',
                                                    next.map((o) => o.memberNo),
                                                    {
                                                        shouldDirty: true,
                                                        shouldValidate: true,
                                                    },
                                                );
                                            }}
                                            onInputChange={(newValue, meta) => {
                                                if (
                                                    meta.action ===
                                                    'input-change'
                                                ) {
                                                    setKeywordInput(newValue);
                                                }
                                                return newValue;
                                            }}
                                            isLoading={isMemberListLoading}
                                            isSearchable
                                            placeholder='키워드로 사용자 검색...'
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
                    )}

                    <ErrorMessage name='memberNos' control={control} />

                    {!isDirectMode && selectedMembers.length > 0 && (
                        <div className='mt-3 flex flex-col gap-2 rounded-lg border border-[#e5e7eb] bg-white p-3'>
                            <div className='text-xs font-medium text-[#6a7282]'>
                                선택된 계정 ({selectedMembers.length})
                            </div>
                            <ul className='flex flex-col gap-1.5'>
                                {selectedMembers.map((m) => (
                                    <li
                                        key={m.memberNo}
                                        className='flex items-center justify-between gap-3 rounded-md bg-[#f9fafb] px-3 py-2 text-sm'
                                    >
                                        <div className='min-w-0'>
                                            <div className='truncate text-[#101828]'>
                                                {m.memberId ?? '-'}
                                                {m.memberName
                                                    ? ` (${m.memberName})`
                                                    : ''}
                                            </div>
                                            <div className='text-xs text-[#6a7282]'>
                                                회원 번호: {m.memberNo}
                                            </div>
                                        </div>
                                        <button
                                            type='button'
                                            className='shrink-0 rounded-md px-2 py-1 text-xs font-medium text-[#f54900] hover:bg-red-50'
                                            onClick={() => {
                                                const next =
                                                    selectedMembers.filter(
                                                        (x) =>
                                                            x.memberNo !==
                                                            m.memberNo,
                                                    );
                                                setSelectedMembers(next);
                                                setValue(
                                                    'memberNos',
                                                    next.map((o) => o.memberNo),
                                                    {
                                                        shouldDirty: true,
                                                        shouldValidate: true,
                                                    },
                                                );
                                            }}
                                        >
                                            제거
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </InputContainer>

                <InputContainer>
                    <Label>메모</Label>

                    <Input
                        type='text'
                        placeholder='메모를 입력하세요'
                        {...register('memo')}
                    />
                </InputContainer>
            </div>
        </ModalLayout>
    );
};

export default AddExceptionUserModal;
