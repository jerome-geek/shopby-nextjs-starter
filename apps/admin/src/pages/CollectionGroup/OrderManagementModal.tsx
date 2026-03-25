import { useState } from 'react';

import { Modal } from '@/components/ui/modal';
import { motion, Reorder, useDragControls } from 'motion/react';

interface OrderItem {
    id: string;
    groupName: string;
    collectionName: string;
}

interface GroupOrderData {
    groupId: string;
    items: OrderItem[];
}

const GROUP_ORDER_DATA: GroupOrderData[] = [
    {
        groupId: 'collection_group_1',
        items: [
            {
                id: 'cg1-1',
                groupName: '인기 컬렉션',
                collectionName: '간편한 한끼 레시피',
            },
            {
                id: 'cg1-2',
                groupName: '인기 컬렉션 2',
                collectionName: '주말 브런치',
            },
            {
                id: 'cg1-3',
                groupName: '인기 컬렉션 3',
                collectionName: '집들이 요리',
            },
        ],
    },
    {
        groupId: 'collection_group_2',
        items: [
            {
                id: 'cg2-1',
                groupName: '계절 특집',
                collectionName: '봄나물 요리',
            },
        ],
    },
    {
        groupId: 'collection_group_3',
        items: [
            {
                id: 'cg3-1',
                groupName: '건강식',
                collectionName: '다이어트 식단',
            },
        ],
    },
];

const SELECT_OPTIONS = [
    { value: 'all', label: '전체 보기' },
    ...GROUP_ORDER_DATA.map((g) => ({ value: g.groupId, label: g.groupId })),
];

// ─────────────────────────────────────────────
// 아이콘
// ─────────────────────────────────────────────
function DragHandleIcon() {
    return (
        <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <circle cx='5.5' cy='4' r='1.5' fill='#99a1af' />
            <circle cx='5.5' cy='8' r='1.5' fill='#99a1af' />
            <circle cx='5.5' cy='12' r='1.5' fill='#99a1af' />
            <circle cx='10.5' cy='4' r='1.5' fill='#99a1af' />
            <circle cx='10.5' cy='8' r='1.5' fill='#99a1af' />
            <circle cx='10.5' cy='12' r='1.5' fill='#99a1af' />
        </svg>
    );
}

function ArrowUpIcon() {
    return (
        <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M8 12V4M4.5 7.5L8 4L11.5 7.5'
                stroke='#6a7282'
                strokeWidth='1.2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

function ArrowDownIcon() {
    return (
        <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M8 4V12M11.5 8.5L8 12L4.5 8.5'
                stroke='#6a7282'
                strokeWidth='1.2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

// ─────────────────────────────────────────────
// 개별 드래그 아이템
// ─────────────────────────────────────────────
interface ReorderItemProps {
    item: OrderItem;
    index: number;
    total: number;
    groupId: string;
    onMove: (groupId: string, fromIdx: number, toIdx: number) => void;
}

function ReorderItem({
    item,
    index,
    total,
    groupId,
    onMove,
}: ReorderItemProps) {
    const dragControls = useDragControls();

    return (
        <Reorder.Item
            value={item}
            dragListener={false}
            dragControls={dragControls}
            className='flex items-center gap-2 bg-white border border-[#e5e7eb] rounded-lg px-3 py-2.5 cursor-default'
            style={{ listStyle: 'none' }}
            whileDrag={{
                scale: 1.02,
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                borderColor: '#ff6900',
                zIndex: 10,
            }}
            transition={{ duration: 0.2 }}
            layout
        >
            {/* 드래그 핸들 - 이 영역에서만 드래그 가능 */}
            <span
                className='shrink-0 cursor-grab active:cursor-grabbing text-[#99a1af] touch-none'
                onPointerDown={(e) => dragControls.start(e)}
            >
                <DragHandleIcon />
            </span>

            {/* 번호 - 이동 시 숫자가 교차 페이드 */}
            <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className='shrink-0 w-5 text-sm font-medium text-[#6a7282] text-center'
            >
                {index + 1}
            </motion.span>

            {/* 그룹명 + 컬렉션명 */}
            <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-[#101828] truncate leading-5'>
                    {item.groupName}
                </p>
                <p className='text-xs font-normal text-[#6a7282] truncate leading-4'>
                    {item.collectionName}
                </p>
            </div>

            {/* 위/아래 버튼 */}
            <div className='flex items-center gap-1 shrink-0'>
                <motion.button
                    onClick={() =>
                        index > 0 && onMove(groupId, index, index - 1)
                    }
                    disabled={index === 0}
                    className='flex items-center justify-center w-7 h-7 rounded bg-[#f3f4f6] hover:bg-[#e5e7eb] disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
                    aria-label='위로'
                    whileTap={index > 0 ? { scale: 0.85 } : {}}
                >
                    <ArrowUpIcon />
                </motion.button>
                <motion.button
                    onClick={() =>
                        index < total - 1 && onMove(groupId, index, index + 1)
                    }
                    disabled={index === total - 1}
                    className='flex items-center justify-center w-7 h-7 rounded bg-[#f3f4f6] hover:bg-[#e5e7eb] disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
                    aria-label='아래로'
                    whileTap={index < total - 1 ? { scale: 0.85 } : {}}
                >
                    <ArrowDownIcon />
                </motion.button>
            </div>
        </Reorder.Item>
    );
}

interface OrderManagementModalProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
}

export default function OrderManagementModal({
    isOpen,
    close,
    unmount,
}: OrderManagementModalProps) {
    const [selectedGroupId, setSelectedGroupId] = useState<string>('all');
    const [orderData, setOrderData] =
        useState<GroupOrderData[]>(GROUP_ORDER_DATA);

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

    const reorderGroup = (groupId: string, newItems: OrderItem[]) => {
        setOrderData((prev) =>
            prev.map((group) =>
                group.groupId === groupId
                    ? { ...group, items: newItems }
                    : group,
            ),
        );
    };

    return (
        <Modal
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            showCloseButton={false}
            className='max-w-[340px] w-full mx-4 shadow-xl rounded-2xl overflow-hidden'
        >
            <div className='flex flex-col'>
                {/* 헤더 */}
                <div className='flex items-start justify-between px-6 pt-6 pb-3'>
                    <div className='flex flex-col gap-1'>
                        <h3 className='text-base font-semibold text-[#101828] leading-6'>
                            노출 순서 관리
                        </h3>
                        <p className='text-xs font-normal text-[#6a7282] leading-5'>
                            같은 그룹 아이디 내에서 컬렉션의 노출 순서를 변경할
                            수 있습니다.
                        </p>
                    </div>
                    <button
                        onClick={close}
                        className='ml-4 shrink-0 flex items-center justify-center w-6 h-6 text-[#6a7282] hover:text-[#101828] transition-colors'
                        aria-label='닫기'
                    >
                        <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M3.36 3.36a.75.75 0 0 1 1.06 0L8 6.94l3.58-3.58a.75.75 0 1 1 1.06 1.06L9.06 8l3.58 3.58a.75.75 0 1 1-1.06 1.06L8 9.06l-3.58 3.58a.75.75 0 0 1-1.06-1.06L6.94 8 3.36 4.42a.75.75 0 0 1 0-1.06Z'
                                fill='currentColor'
                            />
                        </svg>
                    </button>
                </div>

                {/* 그룹 아이디 선택 */}
                <div className='px-6 pb-4'>
                    <label className='block text-xs font-medium text-[#364153] mb-1.5'>
                        그룹 아이디 선택
                    </label>
                    <div className='relative'>
                        <select
                            value={selectedGroupId}
                            onChange={(e) => setSelectedGroupId(e.target.value)}
                            className='w-full h-9 pl-3 pr-8 bg-white border border-[#e5e7eb] rounded-lg text-sm text-[#101828] appearance-none focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20 focus:border-[#ff6900] transition-colors cursor-pointer'
                        >
                            {SELECT_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        <span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6a7282]'>
                            <svg
                                width='14'
                                height='14'
                                viewBox='0 0 14 14'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M3.5 5.25L7 8.75L10.5 5.25'
                                    stroke='currentColor'
                                    strokeWidth='1.2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            </svg>
                        </span>
                    </div>
                </div>

                {/* 그룹 목록 */}
                <div className='px-6 pb-4 flex flex-col gap-4 max-h-[320px] overflow-y-auto'>
                    {displayedGroups.map((group) => (
                        <div key={group.groupId}>
                            {/* 그룹 아이디 헤더 */}
                            <div className='flex items-center gap-2 mb-2'>
                                <span className='font-mono text-xs font-medium text-[#364153] bg-[#f3f4f6] px-2 py-0.5 rounded'>
                                    {group.groupId}
                                </span>
                                <span className='text-xs font-medium text-[#6a7282]'>
                                    ({group.items.length}개)
                                </span>
                            </div>

                            {/* Reorder 리스트 - layout 애니메이션 자동 적용 */}
                            <Reorder.Group
                                axis='y'
                                values={group.items}
                                onReorder={(newItems) =>
                                    reorderGroup(group.groupId, newItems)
                                }
                                className='flex flex-col gap-2'
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

                {/* 하단 버튼 */}
                <div className='flex items-center justify-end gap-2 px-6 py-4 border-t border-[#e5e7eb]'>
                    <button
                        onClick={close}
                        className='h-9 px-4 rounded-lg border border-[#e5e7eb] bg-white text-sm font-medium text-[#364153] hover:bg-gray-50 transition-colors'
                    >
                        닫기
                    </button>
                    <button
                        onClick={close}
                        className='h-9 px-4 rounded-lg bg-[#ff6900] text-white text-sm font-medium hover:bg-orange-600 transition-colors'
                    >
                        저장
                    </button>
                </div>
            </div>
        </Modal>
    );
}
