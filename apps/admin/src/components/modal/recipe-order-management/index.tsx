import { useState } from 'react';
import { motion, Reorder, useDragControls } from 'motion/react';

import { ModalLayout } from '@/layout/modal';
import { ReactComponent as DragHandleIcon } from '@/icons/drag-handle.svg?react';
import { ReactComponent as ArrowUpSimpleIcon } from '@/icons/arrow-up-simple.svg?react';
import { ReactComponent as ArrowDownSimpleIcon } from '@/icons/arrow-down-simple.svg?react';
import { ReactComponent as ChevronDownSimpleIcon } from '@/icons/chevron-down-simple.svg?react';

interface RecipeOrderItem {
    id: string;
    groupName: string;
    recipeName: string;
}

interface RecipeGroupOrderData {
    groupId: string;
    items: RecipeOrderItem[];
}

const RECIPE_GROUP_ORDER_DATA: RecipeGroupOrderData[] = [
    {
        groupId: 'recipe_group_1',
        items: [
            {
                id: 'rg1-1',
                groupName: '인기 레시피',
                recipeName: '김치찌개 황금레시피',
            },
            {
                id: 'rg1-2',
                groupName: '인기 레시피 2',
                recipeName: '크림 파스타',
            },
            {
                id: 'rg1-3',
                groupName: '인기 레시피 3',
                recipeName: '김밥 만들기',
            },
        ],
    },
    {
        groupId: 'recipe_group_2',
        items: [
            {
                id: 'rg2-1',
                groupName: '계절 특집',
                recipeName: '봄나물 비빔밥',
            },
        ],
    },
    {
        groupId: 'recipe_group_3',
        items: [
            {
                id: 'rg3-1',
                groupName: '다이어트',
                recipeName: '닭가슴살 샐러드',
            },
        ],
    },
];

const SELECT_OPTIONS = [
    { value: 'all', label: '전체 보기' },
    ...RECIPE_GROUP_ORDER_DATA.map((g) => ({
        value: g.groupId,
        label: g.groupId,
    })),
];

interface ReorderItemProps {
    item: RecipeOrderItem;
    index: number;
    total: number;
    groupId: string;
    onMove: (groupId: string, fromIdx: number, toIdx: number) => void;
}

const ReorderItem = ({
    item,
    index,
    total,
    groupId,
    onMove,
}: ReorderItemProps) => {
    const dragControls = useDragControls();

    return (
        <Reorder.Item
            value={item}
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
                <p className='truncate text-sm font-medium leading-5 text-[#101828]'>
                    {item.groupName}
                </p>
                <p className='truncate text-xs font-normal leading-4 text-[#6a7282]'>
                    {item.recipeName}
                </p>
            </div>

            <div className='flex shrink-0 items-center gap-1'>
                <motion.button
                    type='button'
                    onClick={() =>
                        index > 0 && onMove(groupId, index, index - 1)
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
                        index < total - 1 && onMove(groupId, index, index + 1)
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

interface RecipeOrderManagementModalProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
}

const RecipeOrderManagementModal = ({
    close,
    ...props
}: RecipeOrderManagementModalProps) => {
    const [selectedGroupId, setSelectedGroupId] = useState<string>('all');
    const [orderData, setOrderData] = useState<RecipeGroupOrderData[]>(() =>
        RECIPE_GROUP_ORDER_DATA.map((g) => ({
            ...g,
            items: [...g.items],
        })),
    );

    const displayedGroups =
        selectedGroupId === 'all'
            ? orderData
            : orderData.filter((g) => g.groupId === selectedGroupId);

    const moveItem = (groupId: string, fromIdx: number, toIdx: number) => {
        setOrderData((prev) =>
            prev.map((group) => {
                if (group.groupId !== groupId) return group;
                const newItems = [...group.items];
                const [removed] = newItems.splice(fromIdx, 1);
                newItems.splice(toIdx, 0, removed);
                return { ...group, items: newItems };
            }),
        );
    };

    const reorderGroup = (groupId: string, newItems: RecipeOrderItem[]) => {
        setOrderData((prev) =>
            prev.map((group) =>
                group.groupId === groupId
                    ? { ...group, items: newItems }
                    : group,
            ),
        );
    };

    const handleClose = () => {
        setSelectedGroupId('all');
        setOrderData(
            RECIPE_GROUP_ORDER_DATA.map((g) => ({
                ...g,
                items: [...g.items],
            })),
        );
        close();
    };

    const handleSave = () => {
        // TODO: API 연동 시 순서 저장
        handleClose();
    };

    return (
        <ModalLayout
            {...props}
            close={close}
            title='노출 순서 관리'
            subtitle='같은 그룹 아이디 내에서 레시피의 노출 순서를 변경할 수 있습니다.'
            footer={
                <>
                    <button
                        type='button'
                        onClick={handleClose}
                        className='h-9 rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm font-medium text-[#364153] transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                    >
                        닫기
                    </button>
                    <button
                        type='button'
                        onClick={handleSave}
                        className='h-9 rounded-lg bg-[#ff6900] px-4 text-sm font-medium text-white transition-colors hover:bg-orange-600'
                    >
                        저장
                    </button>
                </>
            }
        >
            <div className='flex flex-col gap-4'>
                <div>
                    <label className='mb-1.5 block text-xs font-medium text-[#364153]'>
                        그룹 아이디 선택
                    </label>
                    <div className='relative'>
                        <select
                            value={selectedGroupId}
                            onChange={(e) => setSelectedGroupId(e.target.value)}
                            className='h-9 w-full cursor-pointer appearance-none rounded-lg border border-[#e5e7eb] bg-white pl-3 pr-8 text-sm text-[#101828] transition-colors focus:border-[#ff6900] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20'
                        >
                            {SELECT_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        <span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6a7282]'>
                            <ChevronDownSimpleIcon className='h-3.5 w-3.5' />
                        </span>
                    </div>
                </div>

                <div className='flex max-h-[380px] flex-col gap-6 overflow-y-auto pt-1'>
                    {displayedGroups.map((group) => (
                        <div
                            key={group.groupId}
                            className='rounded-xl border border-[#e5e7eb] p-4'
                        >
                            <div className='mb-2 flex items-center gap-2'>
                                <span className='rounded bg-[#f3f4f6] px-2 py-0.5 font-mono text-xs font-medium text-[#364153]'>
                                    {group.groupId}
                                </span>
                                <span className='text-xs font-medium text-[#6a7282]'>
                                    ({group.items.length}개)
                                </span>
                            </div>

                            <Reorder.Group
                                axis='y'
                                values={group.items}
                                onReorder={(newItems) =>
                                    reorderGroup(group.groupId, newItems)
                                }
                                className='flex flex-col'
                                style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0,
                                }}
                            >
                                {group.items.map((item, idx) => (
                                    <ReorderItem
                                        key={item.id}
                                        item={item}
                                        index={idx}
                                        total={group.items.length}
                                        groupId={group.groupId}
                                        onMove={moveItem}
                                    />
                                ))}
                            </Reorder.Group>
                        </div>
                    ))}
                </div>
            </div>
        </ModalLayout>
    );
};

export default RecipeOrderManagementModal;
