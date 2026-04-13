import { isEmpty } from '@fxts/core';
import { useQueryClient } from '@tanstack/react-query';
import { motion, Reorder, useDragControls } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { InputContainer, Label } from '@/components/form/input';
import Select from '@/components/form/select/intdex';
import LoadingWrapper from '@/components/ui/loading-wrapper';
import useCollectionMutation from '@/hooks/mutations/useCollectionMutation';
import { useCollectionExposureGroupList } from '@/hooks/query/collection';
import { collectionKeys } from '@/hooks/queryKeys';
import useApiError from '@/hooks/useApiError';
import { ModalLayout } from '@/layout/modal';
import type { CollectionExposureGroup } from '@/model/collection';
import {
    collectionExposureLocationLabel,
    groupCollectionExposureByLocation,
} from '@/utils/collection';

import { ReactComponent as ArrowDownSimpleIcon } from '@/icons/arrow-down-simple.svg?react';
import { ReactComponent as ArrowUpSimpleIcon } from '@/icons/arrow-up-simple.svg?react';
import { ReactComponent as DragHandleIcon } from '@/icons/drag-handle.svg?react';

interface CollectionOrderManagementModalProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
}

const CollectionOrderManagementModal = ({
    close,
    isOpen,
    ...props
}: CollectionOrderManagementModalProps) => {
    const queryClient = useQueryClient();

    const { data: collectionExposureGroupListData = [], isLoading } =
        useCollectionExposureGroupList();

    const { updateCollectionExposureGroupsSortOrder } = useCollectionMutation();

    const [selectedFilter, setSelectedFilter] = useState<string>('all');
    const [orderData, setOrderData] = useState<
        CollectionExposureLocationGroup[]
    >([]);

    const initialGroupSnosByExposureLocation = useRef<Map<string, number[]>>(
        new Map(),
    );

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const grouped = groupCollectionExposureByLocation(
            collectionExposureGroupListData,
        );
        setOrderData(cloneGrouped(grouped));
        initialGroupSnosByExposureLocation.current = new Map(
            grouped.map(([exposureLocation, groups]) => [
                exposureLocation,
                groups.map((group) => group.sno),
            ]),
        );
    }, [isOpen, collectionExposureGroupListData]);

    const selectOptions = useMemo(() => {
        const fromData = orderData.map((section) => ({
            value: section.exposureLocation,
            label: collectionExposureLocationLabel(section.exposureLocation),
        }));
        return [{ value: 'all', label: '전체 보기' }, ...fromData];
    }, [orderData]);

    const displayedSections =
        selectedFilter === 'all'
            ? orderData
            : orderData.filter(
                  (section) => section.exposureLocation === selectedFilter,
              );

    const moveGroup = (
        exposureLocation: string,
        fromIndex: number,
        toIndex: number,
    ) => {
        setOrderData((previous) =>
            previous.map((section) => {
                if (section.exposureLocation !== exposureLocation) {
                    return section;
                }
                const nextGroups = [...section.groups];
                const [removed] = nextGroups.splice(fromIndex, 1);
                nextGroups.splice(toIndex, 0, removed);
                return { ...section, groups: nextGroups };
            }),
        );
    };

    const reorderSection = (
        exposureLocation: string,
        nextGroups: CollectionExposureGroup[],
    ) => {
        setOrderData((previous) =>
            previous.map((section) =>
                section.exposureLocation === exposureLocation
                    ? { ...section, groups: nextGroups }
                    : section,
            ),
        );
    };

    const handleClose = () => {
        setSelectedFilter('all');
        setOrderData(
            cloneGrouped(
                groupCollectionExposureByLocation(
                    collectionExposureGroupListData,
                ),
            ),
        );
        close();
    };

    const { handleErrorDialog } = useApiError();

    const handleSave = async () => {
        try {
            const sectionsWithOrderChanged = orderData.filter((section) => {
                const nextGroupSnos = section.groups.map((group) => group.sno);
                const initialGroupSnos =
                    initialGroupSnosByExposureLocation.current.get(
                        section.exposureLocation,
                    );

                if (initialGroupSnos === undefined) {
                    return nextGroupSnos.length > 0;
                }

                return !areNumberSequencesEqual(
                    initialGroupSnos,
                    nextGroupSnos,
                );
            });

            await Promise.all(
                sectionsWithOrderChanged.map((section) =>
                    updateCollectionExposureGroupsSortOrder.mutateAsync({
                        exposureLocation: section.exposureLocation,
                        groupSnos: section.groups.map((group) => group.sno),
                    }),
                ),
            );

            queryClient.invalidateQueries({
                queryKey: collectionKeys.all,
                refetchType: 'all',
            });

            handleClose();
        } catch (error) {
            handleErrorDialog(error);
        }
    };

    const isPending = updateCollectionExposureGroupsSortOrder.isPending;

    return (
        <ModalLayout
            {...props}
            isOpen={isOpen}
            close={close}
            title='컬렉션 그룹 노출 순서 관리'
            subtitle='같은 그룹 아이디(노출 위치) 안에서 컬렉션 노출 그룹의 정렬 순서를 바꿀 수 있습니다.'
            footer={
                <>
                    <button
                        type='button'
                        onClick={handleClose}
                        disabled={isPending}
                        className='h-9 rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm font-medium text-[#364153] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                    >
                        닫기
                    </button>
                    <button
                        type='button'
                        onClick={handleSave}
                        disabled={
                            isPending ||
                            isLoading ||
                            collectionExposureGroupListData.length === 0
                        }
                        className='h-9 rounded-lg bg-[#ff6900] px-4 text-sm font-medium text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                        저장
                    </button>
                </>
            }
        >
            <div className='flex flex-col gap-4'>
                <InputContainer>
                    <Label>그룹 아이디 선택</Label>

                    <Select
                        options={selectOptions}
                        value={
                            selectOptions.find(
                                (option) => option.value === selectedFilter,
                            ) ?? null
                        }
                        onChange={(option) =>
                            setSelectedFilter(option?.value ?? 'all')
                        }
                        isDisabled={isLoading}
                        placeholder='그룹 아이디를 선택하세요'
                    />
                </InputContainer>

                <LoadingWrapper
                    isLoading={isLoading}
                    containerStyle={{ minHeight: 200 }}
                >
                    {isEmpty(displayedSections) ? (
                        <p className='py-8 text-center text-sm text-[#6a7282]'>
                            등록된 컬렉션 노출 그룹이 없습니다.
                        </p>
                    ) : (
                        <div className='flex max-h-[380px] flex-col gap-6 pt-1'>
                            {displayedSections.map((section) => (
                                <div
                                    key={section.exposureLocation}
                                    className='rounded-xl border border-[#e5e7eb] p-4'
                                >
                                    <div className='mb-2 flex items-center gap-2'>
                                        <span className='rounded bg-[#f3f4f6] px-2 py-0.5 font-mono text-xs font-medium text-[#364153]'>
                                            {section.exposureLocation}
                                        </span>
                                        <span className='text-xs font-medium text-[#6a7282]'>
                                            ({section.groups.length}개)
                                        </span>
                                    </div>

                                    <Reorder.Group
                                        axis='y'
                                        values={section.groups}
                                        onReorder={(nextGroups) =>
                                            reorderSection(
                                                section.exposureLocation,
                                                nextGroups,
                                            )
                                        }
                                        className='flex flex-col'
                                        style={{
                                            listStyle: 'none',
                                            padding: 0,
                                            margin: 0,
                                        }}
                                    >
                                        {section.groups.map((group, index) => (
                                            <CollectionReorderItem
                                                key={group.sno}
                                                group={group}
                                                index={index}
                                                total={section.groups.length}
                                                exposureLocation={
                                                    section.exposureLocation
                                                }
                                                onMove={moveGroup}
                                            />
                                        ))}
                                    </Reorder.Group>
                                </div>
                            ))}
                        </div>
                    )}
                </LoadingWrapper>
            </div>
        </ModalLayout>
    );
};

export default CollectionOrderManagementModal;

type CollectionExposureLocationGroup = {
    exposureLocation: string;
    groups: CollectionExposureGroup[];
};

interface CollectionReorderItemProps {
    group: CollectionExposureGroup;
    index: number;
    total: number;
    exposureLocation: string;
    onMove: (
        exposureLocation: string,
        fromIndex: number,
        toIndex: number,
    ) => void;
}

const cloneGrouped = (tuples: [string, CollectionExposureGroup[]][]) =>
    tuples.map(([exposureLocation, groups]) => ({
        exposureLocation,
        groups: [...groups],
    }));

const areNumberSequencesEqual = (a: number[], b: number[]): boolean =>
    a.length === b.length && a.every((value, index) => value === b[index]);

const CollectionReorderItem = ({
    group,
    index,
    total,
    exposureLocation,
    onMove,
}: CollectionReorderItemProps) => {
    const dragControls = useDragControls();

    return (
        <Reorder.Item
            value={group}
            dragListener={false}
            dragControls={dragControls}
            className='mt-2 flex cursor-default items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5'
            style={{ listStyle: 'none' }}
            animate={{
                scale: 1,
                borderColor: '#e5e7eb',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0)',
            }}
            whileDrag={{
                scale: 1.02,
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                borderColor: '#ff6900',
                zIndex: 10,
            }}
            transition={{ duration: 0.2 }}
            layout
        >
            <span
                className='shrink-0 cursor-grab touch-none text-[#99a1af] active:cursor-grabbing'
                onPointerDown={(e) => dragControls.start(e)}
            >
                <DragHandleIcon className='h-4 w-4' />
            </span>

            <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className='w-5 shrink-0 text-center text-sm font-medium text-[#6a7282]'
            >
                {index + 1}
            </motion.span>

            <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-medium leading-5 text-[#101828] max-w-[200px] overflow-hidden text-ellipsis'>
                    {group.groupName}
                </p>
                <p className='truncate text-xs font-normal leading-4 text-[#6a7282] max-w-[200px] overflow-hidden text-ellipsis'>
                    {group.description?.trim()
                        ? group.description
                        : `${
                              group.collection.title
                          } · 레시피 ${group.collection.recipeCount.toLocaleString()}개 · sno ${
                              group.sno
                          }`}
                </p>
            </div>

            <div className='flex shrink-0 items-center gap-1'>
                <motion.button
                    type='button'
                    onClick={() =>
                        index > 0 && onMove(exposureLocation, index, index - 1)
                    }
                    disabled={index === 0}
                    className='flex h-7 w-7 items-center justify-center rounded bg-[#f3f4f6] transition-colors hover:bg-[#e5e7eb] disabled:cursor-not-allowed disabled:opacity-30'
                    aria-label='위로'
                    whileTap={index > 0 ? { scale: 0.85 } : {}}
                >
                    <ArrowUpSimpleIcon className='h-4 w-4' />
                </motion.button>
                <motion.button
                    type='button'
                    onClick={() =>
                        index < total - 1 &&
                        onMove(exposureLocation, index, index + 1)
                    }
                    disabled={index === total - 1}
                    className='flex h-7 w-7 items-center justify-center rounded bg-[#f3f4f6] transition-colors hover:bg-[#e5e7eb] disabled:cursor-not-allowed disabled:opacity-30'
                    aria-label='아래로'
                    whileTap={index < total - 1 ? { scale: 0.85 } : {}}
                >
                    <ArrowDownSimpleIcon className='h-4 w-4' />
                </motion.button>
            </div>
        </Reorder.Item>
    );
};
