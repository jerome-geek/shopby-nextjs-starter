import { useState } from 'react';

import LoadingWrapper from '@/components/ui/loading-wrapper';
import { revalidatePath } from '@/api/revalidate';
import { useServerApiByPass } from '@/hooks/query/shopby';
import { useToast } from '@/hooks/utils';
import useApiError from '@/hooks/useApiError';
import { DefaultModalLayoutProps, ModalLayout } from '@/layout/modal';

interface EventContent {
    eventNo: number;
    label: string;
    url: string;
}

interface EventsResponse {
    totalCount: number;
    contents: EventContent[];
}

const ALL_EVENTS_PARAM = { keyword: '', categoryNos: [] };

const SelectEventModal = ({ ...props }: DefaultModalLayoutProps) => {
    const { addToast } = useToast();
    const { handleErrorToast } = useApiError();

    const [selectedNos, setSelectedNos] = useState<Set<number>>(new Set());
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data, isLoading } = useServerApiByPass<EventsResponse>({
        url: '/display/events',
        param: ALL_EVENTS_PARAM,
        options: { staleTime: 30_000 },
    });

    const events = data?.contents ?? [];

    const toggleAll = () => {
        if (selectedNos.size === events.length && events.length > 0) {
            setSelectedNos(new Set());
        } else {
            setSelectedNos(new Set(events.map((e) => e.eventNo)));
        }
    };

    const toggle = (eventNo: number) => {
        setSelectedNos((prev) => {
            const next = new Set(prev);
            next.has(eventNo) ? next.delete(eventNo) : next.add(eventNo);
            return next;
        });
    };

    const handleConfirm = async () => {
        if (selectedNos.size === 0) return;
        setIsSubmitting(true);

        const results = await Promise.allSettled(
            Array.from(selectedNos).map((no) =>
                revalidatePath(`/events/${no}`),
            ),
        );

        const failCount = results.filter((r) => r.status === 'rejected').length;
        const successCount = results.length - failCount;

        if (failCount > 0) {
            handleErrorToast(
                new Error(
                    `갱신 완료: ${successCount}개 성공, ${failCount}개 실패`,
                ),
            );
        } else {
            addToast({
                variant: 'success',
                message: `${successCount}개 기획전 상세 페이지 캐시를 갱신했습니다.`,
            });
        }

        setIsSubmitting(false);
        props.close();
    };

    const isAllSelected =
        events.length > 0 && selectedNos.size === events.length;

    return (
        <ModalLayout
            {...props}
            title='기획전 상세 페이지 선택'
            subtitle='캐시를 갱신할 기획전을 선택하세요.'
            footer={
                <>
                    <button
                        type='button'
                        onClick={props.close}
                        className='h-9 rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm font-medium text-[#364153] transition-colors hover:bg-gray-50'
                    >
                        취소
                    </button>
                    <button
                        type='button'
                        onClick={handleConfirm}
                        disabled={isSubmitting || selectedNos.size === 0}
                        className='h-9 rounded-lg bg-[#ff6900] px-4 text-sm font-medium text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                        캐시 갱신 ({selectedNos.size})
                    </button>
                </>
            }
        >
            <LoadingWrapper isLoading={isLoading}>
                <div className='max-h-[320px] overflow-y-auto rounded-lg border border-[#e5e7eb]'>
                    {events.length === 0 ? (
                        <div className='flex h-20 items-center justify-center text-sm text-[#6a7282]'>
                            기획전이 없습니다.
                        </div>
                    ) : (
                        <>
                            <label className='flex cursor-pointer items-center gap-3 border-b border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-sm font-medium text-[#364153]'>
                                <input
                                    type='checkbox'
                                    checked={isAllSelected}
                                    onChange={toggleAll}
                                    className='size-4 accent-[#ff6900]'
                                />
                                전체 선택 ({events.length})
                            </label>
                            <ul>
                                {events.map((event) => (
                                    <li
                                        key={event.eventNo}
                                        className='border-b border-[#e5e7eb] last:border-0'
                                    >
                                        <label className='flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-[#f9fafb]'>
                                            <input
                                                type='checkbox'
                                                checked={selectedNos.has(
                                                    event.eventNo,
                                                )}
                                                onChange={() =>
                                                    toggle(event.eventNo)
                                                }
                                                className='size-4 accent-[#ff6900]'
                                            />
                                            <div className='min-w-0'>
                                                <div className='truncate text-sm text-[#101828]'>
                                                    {event.label}
                                                </div>
                                                <div className='text-xs text-[#6a7282]'>
                                                    No. {event.eventNo}
                                                </div>
                                            </div>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </LoadingWrapper>
        </ModalLayout>
    );
};

export default SelectEventModal;
