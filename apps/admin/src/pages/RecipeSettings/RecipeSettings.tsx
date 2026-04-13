import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { overlay } from 'overlay-kit';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { isEmpty } from '@fxts/core';

import PageMeta from '@/components/common/PageMeta';
import ErrorMessage from '@/components/form/ErrorMessage';
import { Input } from '@/components/form/input';
import AddExceptionUserModal from '@/components/modal/add-exception-user';
import useLimitMutation from '@/hooks/mutations/useLimitMutation';
import { useLimitSettings } from '@/hooks/query/limit';
import useExceptionList from '@/hooks/query/limit/useExceptionList';
import limitKeys from '@/hooks/queryKeys/limitKeys';
import useApiError from '@/hooks/useApiError';
import { useDialog } from '@/hooks/utils';
import {
    updateCreationLimitSchema,
    UpdateCreationLimitSchemaType,
} from '@/schema';
import LoadingWrapper from '@/components/ui/loading-wrapper';

import { ReactComponent as PlusSimpleIcon } from '@/icons/plus-simple.svg?react';
import { ReactComponent as SearchIcon } from '@/icons/search.svg?react';
import { ReactComponent as SettingsIcon } from '@/icons/settings.svg?react';
import { ReactComponent as TrashSimpleIcon } from '@/icons/trash-simple.svg?react';

const tableLayout = {
    minWidth: 'min-w-[860px]',
    column: {
        memberNo: 'w-[150px]',
        memberId: 'w-[150px]',
        memberName: 'w-[150px]',
        memo: '',
        actions: 'w-[100px]',
    },
} as const;

const tableTh = {
    left: 'px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282]',
    right: 'px-6 py-3 text-right text-xs font-medium uppercase text-[#6a7282]',
} as const;

const RecipeSettings = () => {
    const queryClient = useQueryClient();
    const { openAsyncDialog, openDialog } = useDialog();
    const { handleErrorDialog } = useApiError();

    const { data: limitSettingsData } = useLimitSettings();

    const { data: exceptionListData = [], isLoading: isExceptionListLoading } =
        useExceptionList();

    const inputRef = useRef<HTMLInputElement>(null);
    const [searchKeyword, setSearchKeyword] = useState('');

    const methods = useForm<UpdateCreationLimitSchemaType>({
        resolver: zodResolver(updateCreationLimitSchema),
        defaultValues: {
            dailyLimit: 0,
            monthlyLimit: 0,
        },
    });

    const {
        control,
        formState: { isDirty },
        register,
        handleSubmit,
        reset,
    } = methods;

    useEffect(() => {
        if (!limitSettingsData) {
            return;
        }

        reset(
            {
                dailyLimit: limitSettingsData.dailyLimit ?? 0,
                monthlyLimit: limitSettingsData.monthlyLimit ?? 0,
            },
            {
                keepFieldsRef: true,
                keepDirty: false,
            },
        );
    }, [limitSettingsData, reset]);

    const filteredExceptions = useMemo(() => {
        if (searchKeyword === '') {
            return exceptionListData;
        }

        const keyword = searchKeyword.toLowerCase();
        return exceptionListData.filter((row) => {
            const memberId = (row.memberId ?? '').toLowerCase();
            const memberName = (row.memberName ?? '').toLowerCase();
            const memo = (row.memo ?? '').toLowerCase();

            return (
                memberId.includes(keyword) ||
                memberName.includes(keyword) ||
                memo.includes(keyword)
            );
        });
    }, [exceptionListData, searchKeyword]);

    const applySearch = () => {
        setSearchKeyword(inputRef.current?.value.trim() ?? '');
    };

    const { updateCreationLimit, deleteException } = useLimitMutation();

    const handleSaveLimits = handleSubmit((data) => {
        updateCreationLimit.mutate(data, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: limitKeys.settings(),
                });

                openDialog({ message: '설정이 저장되었습니다.' });

                reset(
                    {
                        dailyLimit: data?.dailyLimit ?? 0,
                        monthlyLimit: data?.monthlyLimit ?? 0,
                    },
                    {
                        keepFieldsRef: true,
                        keepDirty: false,
                    },
                );
            },
            onError: (err) => handleErrorDialog(err),
        });
    });

    const openAddException = () => {
        overlay.open((props) => <AddExceptionUserModal {...props} />);
    };

    const handleRemoveException = async (memberNo: number) => {
        const isAgree = await openAsyncDialog({
            message: '이 예외 계정을 삭제할까요?',
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (!isAgree) {
            return;
        }

        deleteException.mutate(memberNo, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: limitKeys.exceptionLists(),
                });

                openDialog({ message: '예외 계정이 삭제되었습니다.' });
            },
            onError: (err) => handleErrorDialog(err),
        });
    };

    return (
        <>
            <PageMeta
                title='레시피 설정 | JollyPot 관리자'
                description='레시피 생성 제한 및 예외 계정을 관리합니다'
            />

            <div className='flex flex-col gap-6 pt-6 px-6 pb-10'>
                <div className='flex flex-col gap-1'>
                    <h1 className='text-2xl font-bold tracking-tight text-[#101828]'>
                        레시피 설정
                    </h1>
                    <p className='text-base text-[#6a7282]'>
                        레시피 생성 제한 및 예외 계정을 관리합니다
                    </p>
                </div>

                <div className='rounded-[14px] border border-[#e5e7eb] bg-white p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]'>
                    <div className='mb-6 flex items-center gap-2'>
                        <SettingsIcon className='h-5 w-5 shrink-0 text-[#ff6900]' />
                        <h2 className='text-base font-semibold text-[#101828]'>
                            레시피 생성 제한
                        </h2>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSaveLimits();
                        }}
                        className='grid gap-6 md:grid-cols-2'
                    >
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-medium text-[#364153]'>
                                하루 생성 가능한 레시피 수
                            </label>
                            <div className='flex items-center gap-2'>
                                <Input
                                    type='number'
                                    min={0}
                                    step={1}
                                    {...register('dailyLimit', {
                                        valueAsNumber: true,
                                    })}
                                    className='h-10 w-full max-w-[200px] rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#101828] focus:border-[#ff6900] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20'
                                />
                                <span className='text-sm text-[#6a7282]'>
                                    개
                                </span>
                            </div>

                            <ErrorMessage name='dailyLimit' control={control} />

                            <p className='text-xs text-[#6a7282]'>
                                회원이 하루에 만들 수 있는 레시피 수입니다.
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-medium text-[#364153]'>
                                한달 생성 가능한 레시피 수
                            </label>
                            <div className='flex items-center gap-2'>
                                <Input
                                    type='number'
                                    min={0}
                                    step={1}
                                    {...register('monthlyLimit', {
                                        valueAsNumber: true,
                                    })}
                                    className='h-10 w-full max-w-[200px] rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#101828] focus:border-[#ff6900] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20'
                                />
                                <span className='text-sm text-[#6a7282]'>
                                    개
                                </span>
                            </div>

                            <ErrorMessage
                                name='monthlyLimit'
                                control={control}
                            />

                            <p className='text-xs text-[#6a7282]'>
                                회원이 한 달에 만들 수 있는 레시피 수입니다.
                            </p>
                        </div>
                        <div className='mt-2 md:col-span-2'>
                            <button
                                type='submit'
                                disabled={
                                    updateCreationLimit.isPending || !isDirty
                                }
                                className='h-9 rounded-lg bg-[#ff6900] px-4 text-sm font-medium text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50'
                            >
                                설정 저장
                            </button>
                        </div>
                    </form>
                </div>

                <div className='rounded-[14px] border border-[#e5e7eb] bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]'>
                    <div className='flex flex-col gap-4 border-b border-[#e5e7eb] px-6 py-5 sm:flex-row sm:items-start sm:justify-between'>
                        <div className='flex flex-col gap-1'>
                            <h2 className='text-base font-semibold text-[#101828]'>
                                예외 계정 설정
                            </h2>
                            <p className='text-sm text-[#6a7282]'>
                                레시피 생성 제한이 적용되지 않는 계정을
                                관리합니다
                            </p>
                        </div>
                        <button
                            type='button'
                            onClick={openAddException}
                            className='inline-flex h-9 shrink-0 items-center gap-2 self-start rounded-lg bg-[#ff6900] px-3 text-sm font-medium text-white transition-colors hover:bg-orange-600 sm:self-auto'
                        >
                            <PlusSimpleIcon className='h-4 w-4 text-white' />
                            예외 계정 추가
                        </button>
                    </div>

                    <div className='border-b border-[#e5e7eb] px-6 py-4'>
                        <form
                            className='flex gap-2'
                            onSubmit={(e) => {
                                e.preventDefault();
                                applySearch();
                            }}
                        >
                            <div className='relative min-w-0 flex-1'>
                                <span className='pointer-events-none absolute left-3 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center text-[#717182]'>
                                    <SearchIcon className='h-full w-full' />
                                </span>
                                <input
                                    ref={inputRef}
                                    type='search'
                                    placeholder='아이디, 이름, 메모로 검색...'
                                    className='h-10 w-full rounded-xl border border-transparent bg-[#f3f3f5] pl-10 pr-4 text-[14px] text-[#101828] placeholder:text-[#99a1af] focus:border-[#ff6900]/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20'
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

                    <LoadingWrapper isLoading={isExceptionListLoading}>
                        <div className='overflow-x-auto'>
                            <table className={`w-full ${tableLayout.minWidth}`}>
                                <thead>
                                    <tr className='border-b border-[#e5e7eb] bg-[#f9fafb]'>
                                        <th
                                            className={`${tableTh.left} ${tableLayout.column.memberNo}`}
                                        >
                                            회원 번호
                                        </th>
                                        <th
                                            className={`${tableTh.left} ${tableLayout.column.memberId}`}
                                        >
                                            아이디
                                        </th>
                                        <th
                                            className={`${tableTh.left} ${tableLayout.column.memberName}`}
                                        >
                                            이름
                                        </th>
                                        <th
                                            className={`${tableTh.left} ${tableLayout.column.memo}`}
                                        >
                                            메모
                                        </th>
                                        <th
                                            className={`${tableTh.right} ${tableLayout.column.actions}`}
                                        >
                                            작업
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isEmpty(filteredExceptions) ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className='px-6 py-12 text-center text-sm text-[#6a7282]'
                                            >
                                                {searchKeyword
                                                    ? '검색 결과가 없습니다.'
                                                    : '등록된 예외 계정이 없습니다.'}
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredExceptions.map((row) => (
                                            <tr
                                                key={row.memberNo}
                                                className='border-b border-[#e5e7eb] last:border-b-0 hover:bg-[#fafafa]'
                                            >
                                                <td className='px-6 py-4 text-sm text-[#101828]'>
                                                    {row.memberNo}
                                                </td>
                                                <td className='px-6 py-4 text-sm text-[#101828]'>
                                                    {row.memberId || '-'}
                                                </td>
                                                <td className='px-6 py-4 text-sm font-medium text-[#101828]'>
                                                    {row.memberName || '-'}
                                                </td>
                                                <td className='px-6 py-4 text-sm text-[#4a5565]'>
                                                    {row.memo || '-'}
                                                </td>
                                                <td className='px-6 py-4 text-right'>
                                                    <button
                                                        type='button'
                                                        aria-label='삭제'
                                                        onClick={() =>
                                                            handleRemoveException(
                                                                row.memberNo,
                                                            )
                                                        }
                                                        className='inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#f54900] transition-colors hover:bg-red-50'
                                                    >
                                                        <TrashSimpleIcon className='h-4 w-4' />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
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

export default RecipeSettings;
