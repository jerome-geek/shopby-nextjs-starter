import { useState } from 'react';

import { Modal } from '@/components/ui/modal';
import { ReactComponent as SearchIcon } from '@/icons/search.svg?react';
import { ReactComponent as ChevronDownSimpleIcon } from '@/icons/chevron-down-simple.svg?react';
import { ReactComponent as CloseThickIcon } from '@/icons/close-thick.svg?react';

// ─────────────────────────────────────────────
// 더미 컬렉션 데이터
// ─────────────────────────────────────────────
interface CollectionItem {
    id: string;
    name: string;
    thumbnailColor: string; // 썸네일 대체 색상
}

const COLLECTIONS: CollectionItem[] = [
    { id: 'col_001', name: '간편한 한끼 레시피', thumbnailColor: '#e5e7eb' },
    { id: 'col_002', name: '봄나물 요리', thumbnailColor: '#bbf7d0' },
    { id: 'col_003', name: '다이어트 식단', thumbnailColor: '#fed7aa' },
    { id: 'col_004', name: '주말 브런치', thumbnailColor: '#bfdbfe' },
    { id: 'col_005', name: '집들이 요리', thumbnailColor: '#fde68a' },
];

const GROUP_ID_OPTIONS = [
    { value: '', label: '그룹 아이디 선택' },
    { value: 'collection_group_1', label: 'collection_group_1' },
    { value: 'collection_group_2', label: 'collection_group_2' },
    { value: 'collection_group_3', label: 'collection_group_3' },
    { value: 'new', label: '+ 새 그룹 아이디 생성' },
];

// ─────────────────────────────────────────────
// Toggle 컴포넌트
// ─────────────────────────────────────────────
function Toggle({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: (v: boolean) => void;
}) {
    return (
        <button
            type='button'
            role='switch'
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                checked ? 'bg-[#ff6900]' : 'bg-[#d1d5db]'
            }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                    checked ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </button>
    );
}

// ─────────────────────────────────────────────
// 모달 Props
// ─────────────────────────────────────────────
interface AddCollectionGroupModalProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
}

const AddCollectionGroupModal = ({
    isOpen,
    close,
    unmount,
}: AddCollectionGroupModalProps) => {
    const [groupId, setGroupId] = useState('');
    const [groupName, setGroupName] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const [description, setDescription] = useState('');
    const [collectionSearch, setCollectionSearch] = useState('');
    const [selectedCollections, setSelectedCollections] = useState<string[]>([]);

    const filteredCollections = COLLECTIONS.filter((c) =>
        c.name.includes(collectionSearch),
    );

    const toggleCollection = (id: string) => {
        setSelectedCollections((prev) =>
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
        );
    };

    const handleClose = () => {
        // 폼 초기화
        setGroupId('');
        setGroupName('');
        setIsVisible(true);
        setDescription('');
        setCollectionSearch('');
        setSelectedCollections([]);
        close();
    };

    return (
        <Modal
            isOpen={isOpen}
            close={handleClose}
            unmount={unmount}
            showCloseButton={false}
            className='max-w-[520px] w-full mx-4 shadow-xl rounded-2xl overflow-hidden'
        >
            <div className='flex flex-col'>
                {/* 헤더 */}
                <div className='flex items-start justify-between px-6 pt-6 pb-4'>
                    <div className='flex flex-col gap-1'>
                        <h3 className='text-base font-semibold text-[#101828] leading-6'>
                            새 컬렉션 그룹 추가
                        </h3>
                        <p className='text-xs font-normal text-[#6a7282] leading-5'>
                            컬렉션 그룹을 생성하고 컬렉션을 선택하세요.
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        className='ml-4 shrink-0 flex items-center justify-center w-6 h-6 text-[#6a7282] hover:text-[#101828] transition-colors'
                        aria-label='닫기'
                    >
                        <CloseThickIcon className="w-4 h-4 text-inherit" />
                    </button>
                </div>

                {/* 폼 영역 */}
                <div className='px-6 pb-4 flex flex-col gap-4 max-h-[460px] overflow-y-auto'>
                    {/* 그룹 아이디 */}
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-xs font-medium text-[#364153]'>
                            그룹 아이디
                            <span className='text-[#ff6900] ml-0.5'>*</span>
                        </label>
                        <div className='relative'>
                            <select
                                value={groupId}
                                onChange={(e) => setGroupId(e.target.value)}
                                className='w-full h-9 pl-3 pr-8 bg-white border border-[#e5e7eb] rounded-lg text-sm text-[#101828] appearance-none focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20 focus:border-[#ff6900] transition-colors cursor-pointer'
                            >
                                {GROUP_ID_OPTIONS.map((opt) => (
                                    <option
                                        key={opt.value}
                                        value={opt.value}
                                        disabled={opt.value === ''}
                                    >
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                            <span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2'>
                                <ChevronDownSimpleIcon className="w-3.5 h-3.5 text-[#6a7282]" />
                            </span>
                        </div>
                    </div>

                    {/* 그룹명 */}
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-xs font-medium text-[#364153]'>
                            그룹명
                            <span className='text-[#ff6900] ml-0.5'>*</span>
                        </label>
                        <input
                            type='text'
                            placeholder='그룹명을 입력하세요'
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            className='w-full h-9 px-3 bg-white border border-[#e5e7eb] rounded-lg text-sm text-[#101828] placeholder:text-[#99a1af] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20 focus:border-[#ff6900] transition-colors'
                        />
                    </div>

                    {/* 노출 여부 */}
                    <div className='flex items-center justify-between'>
                        <label className='text-xs font-medium text-[#364153]'>
                            노출 여부
                        </label>
                        <Toggle checked={isVisible} onChange={setIsVisible} />
                    </div>

                    {/* 설명 */}
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-xs font-medium text-[#364153]'>
                            설명
                        </label>
                        <textarea
                            placeholder='그룹 명을 입력하세요'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className='w-full px-3 py-2 bg-white border border-[#e5e7eb] rounded-lg text-sm text-[#101828] placeholder:text-[#99a1af] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20 focus:border-[#ff6900] transition-colors resize-none'
                        />
                    </div>

                    {/* 컬렉션 선택 */}
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-xs font-medium text-[#364153]'>
                            컬렉션 선택
                            <span className='text-[#ff6900] ml-0.5'>*</span>
                        </label>

                        {/* 검색 인풋 */}
                        <div className='relative'>
                            <span className='absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none'>
                                <SearchIcon className="w-[14px] h-[14px] text-[#99a1af]" />
                            </span>
                            <input
                                type='text'
                                placeholder='컬렉션 검색...'
                                value={collectionSearch}
                                onChange={(e) =>
                                    setCollectionSearch(e.target.value)
                                }
                                className='w-full h-9 pl-8 pr-3 bg-white border border-[#e5e7eb] rounded-lg text-sm text-[#101828] placeholder:text-[#99a1af] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20 focus:border-[#ff6900] transition-colors'
                            />
                        </div>

                        {/* 컬렉션 목록 */}
                        <div className='flex flex-col border border-[#e5e7eb] rounded-lg overflow-hidden'>
                            {filteredCollections.length === 0 ? (
                                <p className='px-3 py-4 text-sm text-center text-[#99a1af]'>
                                    검색 결과가 없습니다.
                                </p>
                            ) : (
                                filteredCollections.map((collection, idx) => {
                                    const isSelected =
                                        selectedCollections.includes(
                                            collection.id,
                                        );
                                    return (
                                        <label
                                            key={collection.id}
                                            className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors hover:bg-[#fafafa] ${
                                                idx !== 0
                                                    ? 'border-t border-[#f3f4f6]'
                                                    : ''
                                            } ${isSelected ? 'bg-[#fff7ed]' : ''}`}
                                        >
                                            {/* 체크박스 */}
                                            <input
                                                type='checkbox'
                                                checked={isSelected}
                                                onChange={() =>
                                                    toggleCollection(
                                                        collection.id,
                                                    )
                                                }
                                                className='w-4 h-4 rounded border-[#d1d5db] text-[#ff6900] accent-[#ff6900] focus:ring-[#ff6900] cursor-pointer shrink-0'
                                            />

                                            {/* 썸네일 */}
                                            <span
                                                className='shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white'
                                                style={{
                                                    backgroundColor:
                                                        collection.thumbnailColor,
                                                }}
                                            />

                                            {/* 이름 + ID */}
                                            <div className='flex-1 min-w-0'>
                                                <p className='text-sm font-medium text-[#101828] truncate leading-5'>
                                                    {collection.name}
                                                </p>
                                                <p className='text-xs text-[#6a7282] leading-4'>
                                                    ID: {collection.id}
                                                </p>
                                            </div>
                                        </label>
                                    );
                                })
                            )}
                        </div>

                        {/* 선택 개수 표시 */}
                        {selectedCollections.length > 0 && (
                            <p className='text-xs text-[#ff6900] font-medium'>
                                {selectedCollections.length}개 선택됨
                            </p>
                        )}
                    </div>
                </div>

                {/* 하단 버튼 */}
                <div className='flex items-center justify-end gap-2 px-6 py-4 border-t border-[#e5e7eb]'>
                    <button
                        onClick={handleClose}
                        className='h-9 px-4 rounded-lg border border-[#e5e7eb] bg-white text-sm font-medium text-[#364153] hover:bg-gray-50 transition-colors'
                    >
                        취소
                    </button>
                    <button
                        onClick={handleClose}
                        className='h-9 px-4 rounded-lg bg-[#ff6900] text-white text-sm font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                        disabled={
                            !groupId ||
                            !groupName.trim() ||
                            selectedCollections.length === 0
                        }
                    >
                        추가
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default AddCollectionGroupModal;
