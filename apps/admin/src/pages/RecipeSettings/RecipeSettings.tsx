import { useEffect, useMemo, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { overlay } from 'overlay-kit';

import PageMeta from '@/components/common/PageMeta';
import { Input, InputContainer, Label } from '@/components/form/input';
import { Modal } from '@/components/ui/modal';
import LoadingWrapper from '@/components/ui/loading-wrapper';
import useLimitMutation from '@/hooks/mutations/useLimitMutation';
import useLimitSettings from '@/hooks/query/limit/useLimitSettings';
import limitKeys from '@/hooks/queryKeys/limitKeys';
import useApiError from '@/hooks/useApiError';
import { useDialog } from '@/hooks/utils';
import type { RecipeLimitExceptionRow } from '@/model/limit';

import { PlugInIcon } from '@/icons';

import { ReactComponent as PlusSimpleIcon } from '@/icons/plus-simple.svg?react';
import { ReactComponent as SearchIcon } from '@/icons/search.svg?react';
import { ReactComponent as TrashSimpleIcon } from '@/icons/trash-simple.svg?react';

const INITIAL_EXCEPTIONS: RecipeLimitExceptionRow[] = [
    {
        id: '1',
        email: 'premium@example.com',
        name: '프리미엄 사용자',
        addedAt: '2026-03-15',
    },
];

interface AddExceptionModalProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
    onAdd: (row: Omit<RecipeLimitExceptionRow, 'id' | 'addedAt'>) => void;
}

const AddExceptionModal = ({
    isOpen,
    close,
    unmount,
    onAdd,
}: AddExceptionModalProps) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const handleClose = () => {
        setEmail('');
        setName('');
        close();
    };

    const handleSubmit = () => {
        const e = email.trim();
        const n = name.trim();
        if (!e || !n) {
            return;
        }
        onAdd({ email: e, name: n });
        handleClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            close={handleClose}
            unmount={unmount}
            showCloseButton={false}
            className='mx-4 w-full max-w-[400px] overflow-hidden rounded-2xl shadow-xl'
        >
            <div className='flex flex-col px-6 pt-6 pb-4'>
                <h3 className='text-base font-semibold text-[#101828]'>
                    예외 계정 추가
                </h3>
                <p className='mt-1 text-xs text-[#6a7282]'>
                    제한이 적용되지 않을 계정을 등록합니다.
                </p>
            </div>
            <div className='flex flex-col gap-3 px-6 pb-4'>
                <InputContainer>
                    <Label isRequired>이메일</Label>
                    <Input
                        type='email'
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                        placeholder='email@example.com'
                    />
                </InputContainer>
                <InputContainer>
                    <Label isRequired>이름</Label>
                    <Input
                        type='text'
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                        placeholder='표시 이름'
                    />
                </InputContainer>
            </div>
            <div className='flex justify-end gap-2 border-t border-[#e5e7eb] px-6 py-4'>
                <button
                    type='button'
                    onClick={handleClose}
                    className='h-9 rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm font-medium text-[#364153] transition-colors hover:bg-gray-50'
                >
                    취소
                </button>
                <button
                    type='button'
                    onClick={handleSubmit}
                    disabled={!email.trim() || !name.trim()}
                    className='h-9 rounded-lg bg-[#ff6900] px-4 text-sm font-medium text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50'
                >
                    추가
                </button>
            </div>
        </Modal>
    );
};

const RecipeSettings = () => {
    const queryClient = useQueryClient();
    const { openAsyncDialog, openDialog } = useDialog();
    const { handleErrorDialog } = useApiError();

    const { data: limitSettings, isLoading: isLimitLoading } =
        useLimitSettings();

    const { updateCreationLimit } = useLimitMutation();

    const [dailyLimit, setDailyLimit] = useState('');
    const [monthlyLimit, setMonthlyLimit] = useState('');
    const [exceptions, setExceptions] =
        useState<RecipeLimitExceptionRow[]>(INITIAL_EXCEPTIONS);

    const searchRef = useRef<HTMLInputElement>(null);
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        if (!limitSettings) {
            return;
        }
        setDailyLimit(String(limitSettings.dailyLimit));
        setMonthlyLimit(String(limitSettings.monthlyLimit));
    }, [limitSettings]);

    const filteredExceptions = useMemo(() => {
        if (searchKeyword === '') {
            return exceptions;
        }
        return exceptions.filter(
            (row) =>
                row.email.includes(searchKeyword) ||
                row.name.includes(searchKeyword),
        );
    }, [exceptions, searchKeyword]);

    const applySearch = () => {
        setSearchKeyword(searchRef.current?.value.trim() ?? '');
    };

    const handleSaveLimits = () => {
        const daily = Number(dailyLimit);
        const monthly = Number(monthlyLimit);
        if (
            !Number.isFinite(daily) ||
            !Number.isFinite(monthly) ||
            daily < 0 ||
            monthly < 0
        ) {
            openDialog({ message: '올바른 숫자를 입력해 주세요.' });
            return;
        }

        updateCreationLimit.mutate(
            { dailyLimit: daily, monthlyLimit: monthly },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: limitKeys.settings(),
                    });
                    openDialog({ message: '설정이 저장되었습니다.' });
                },
                onError: (err) => handleErrorDialog(err),
            },
        );
    };

    const openAddException = () => {
        overlay.open((props) => (
            <AddExceptionModal
                {...props}
                onAdd={({ email, name }) => {
                    setExceptions((prev) => [
                        {
                            id: `${Date.now()}`,
                            email,
                            name,
                            addedAt: new Date().toISOString().slice(0, 10),
                        },
                        ...prev,
                    ]);
                }}
            />
        ));
    };

    const handleRemoveException = async (id: string) => {
        const ok = await openAsyncDialog({
            message: '이 예외 계정을 삭제할까요?',
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });
        if (!ok) {
            return;
        }
        setExceptions((prev) => prev.filter((r) => r.id !== id));
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

                <LoadingWrapper
                    isLoading={isLimitLoading}
                    containerStyle={{ minHeight: 120 }}
                >
                    <div className='rounded-[14px] border border-[#e5e7eb] bg-white p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]'>
                        <div className='mb-6 flex items-center gap-2'>
                            <PlugInIcon className='h-5 w-5 shrink-0 text-[#ff6900]' />
                            <h2 className='text-base font-semibold text-[#101828]'>
                                레시피 생성 제한
                            </h2>
                        </div>

                        <div className='grid gap-6 md:grid-cols-2'>
                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-medium text-[#364153]'>
                                    하루 생성 가능한 레시피 수
                                </label>
                                <div className='flex items-center gap-2'>
                                    <input
                                        type='number'
                                        min={0}
                                        value={dailyLimit}
                                        onChange={(e) =>
                                            setDailyLimit(e.target.value)
                                        }
                                        className='h-10 w-full max-w-[200px] rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#101828] focus:border-[#ff6900] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20'
                                    />
                                    <span className='text-sm text-[#6a7282]'>
                                        개
                                    </span>
                                </div>
                                <p className='text-xs text-[#6a7282]'>
                                    회원이 하루에 만들 수 있는 레시피 수입니다.
                                </p>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-medium text-[#364153]'>
                                    한달 생성 가능한 레시피 수
                                </label>
                                <div className='flex items-center gap-2'>
                                    <input
                                        type='number'
                                        min={0}
                                        value={monthlyLimit}
                                        onChange={(e) =>
                                            setMonthlyLimit(e.target.value)
                                        }
                                        className='h-10 w-full max-w-[200px] rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#101828] focus:border-[#ff6900] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20'
                                    />
                                    <span className='text-sm text-[#6a7282]'>
                                        개
                                    </span>
                                </div>
                                <p className='text-xs text-[#6a7282]'>
                                    회원이 한 달에 만들 수 있는 레시피 수입니다.
                                </p>
                            </div>
                        </div>

                        <div className='mt-6'>
                            <button
                                type='button'
                                onClick={handleSaveLimits}
                                disabled={updateCreationLimit.isPending}
                                className='h-9 rounded-lg bg-[#ff6900] px-4 text-sm font-medium text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50'
                            >
                                설정 저장
                            </button>
                        </div>
                    </div>
                </LoadingWrapper>

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
                                    ref={searchRef}
                                    type='search'
                                    placeholder='이메일 또는 이름으로 검색...'
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

                    <div className='overflow-x-auto'>
                        <table className='w-full min-w-[640px]'>
                            <thead>
                                <tr className='border-b border-[#e5e7eb] bg-[#f9fafb]'>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282]'>
                                        이메일
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282]'>
                                        이름
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282] w-[130px]'>
                                        추가일
                                    </th>
                                    <th className='px-6 py-3 text-right text-xs font-medium uppercase text-[#6a7282] w-[80px]'>
                                        작업
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredExceptions.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={4}
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
                                            key={row.id}
                                            className='border-b border-[#e5e7eb] last:border-b-0 hover:bg-[#fafafa]'
                                        >
                                            <td className='px-6 py-4 text-sm text-[#101828]'>
                                                {row.email}
                                            </td>
                                            <td className='px-6 py-4 text-sm font-medium text-[#101828]'>
                                                {row.name}
                                            </td>
                                            <td className='px-6 py-4 text-sm text-[#4a5565]'>
                                                {row.addedAt}
                                            </td>
                                            <td className='px-6 py-4 text-right'>
                                                <button
                                                    type='button'
                                                    aria-label='삭제'
                                                    onClick={() =>
                                                        handleRemoveException(
                                                            row.id,
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
                </div>
            </div>
        </>
    );
};

export default RecipeSettings;
