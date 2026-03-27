import { useState } from 'react';

import { Modal } from '@/components/ui/modal';
import { ReactComponent as SearchIcon } from '@/icons/search.svg?react';
import { ReactComponent as ChevronDownSimpleIcon } from '@/icons/chevron-down-simple.svg?react';
import { ReactComponent as CloseThickIcon } from '@/icons/close-thick.svg?react';

// ─────────────────────────────────────────────
// 더미 레시피 데이터
// ─────────────────────────────────────────────
interface RecipeItem {
    id: string;
    name: string;
    emoji: string;
}

const RECIPES: RecipeItem[] = [
    { id: 'recipe_001', name: '김치찌개 황금레시피', emoji: '🍲' },
    { id: 'recipe_002', name: '봄나물 비빔밥', emoji: '🥗' },
    { id: 'recipe_003', name: '닭가슴살 샐러드', emoji: '🥦' },
    { id: 'recipe_004', name: '크림 파스타', emoji: '🍝' },
    { id: 'recipe_005', name: '김밥 만들기', emoji: '🍱' },
];

const GROUP_ID_OPTIONS = [
    { value: '', label: '그룹 아이디 선택' },
    { value: 'recipe_group_1', label: 'recipe_group_1' },
    { value: 'recipe_group_2', label: 'recipe_group_2' },
    { value: 'recipe_group_3', label: 'recipe_group_3' },
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
interface CreateRecipeGroupModalProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
}

const CreateRecipeGroupModal = ({
    isOpen,
    close,
    unmount,
}: CreateRecipeGroupModalProps) => {
    const [groupId, setGroupId] = useState('');
    const [groupName, setGroupName] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const [description, setDescription] = useState('');
    const [recipeSearch, setRecipeSearch] = useState('');
    const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);

    const filteredRecipes = RECIPES.filter((r) =>
        r.name.includes(recipeSearch),
    );

    const toggleRecipe = (id: string) => {
        setSelectedRecipes((prev) =>
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
        );
    };

    const handleClose = () => {
        // 폼 초기화
        setGroupId('');
        setGroupName('');
        setIsVisible(true);
        setDescription('');
        setRecipeSearch('');
        setSelectedRecipes([]);
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
                            새 레시피 그룹 생성
                        </h3>
                        <p className='text-xs font-normal text-[#6a7282] leading-5'>
                            레시피 그룹을 생성하고 레시피를 선택하세요.
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

                    {/* 레시피 선택 */}
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-xs font-medium text-[#364153]'>
                            레시피 선택
                            <span className='text-[#ff6900] ml-0.5'>*</span>
                        </label>

                        {/* 검색 인풋 */}
                        <div className='relative'>
                            <span className='absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none'>
                                <SearchIcon className="w-[14px] h-[14px] text-[#99a1af]" />
                            </span>
                            <input
                                type='text'
                                placeholder='레시피 검색...'
                                value={recipeSearch}
                                onChange={(e) => setRecipeSearch(e.target.value)}
                                className='w-full h-9 pl-8 pr-3 bg-white border border-[#e5e7eb] rounded-lg text-sm text-[#101828] placeholder:text-[#99a1af] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20 focus:border-[#ff6900] transition-colors'
                            />
                        </div>

                        {/* 레시피 목록 */}
                        <div className='flex flex-col border border-[#e5e7eb] rounded-lg overflow-hidden bg-white'>
                            {filteredRecipes.length === 0 ? (
                                <p className='px-3 py-4 text-sm text-center text-[#99a1af]'>
                                    검색 결과가 없습니다.
                                </p>
                            ) : (
                                filteredRecipes.map((recipe, idx) => {
                                    const isSelected = selectedRecipes.includes(recipe.id);
                                    return (
                                        <label
                                            key={recipe.id}
                                            className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors hover:bg-[#fafafa] ${
                                                idx !== 0 ? 'border-t border-[#f3f4f6]' : ''
                                            } ${isSelected ? 'bg-[#fff7ed]' : ''}`}
                                        >
                                            {/* 체크박스 */}
                                            <input
                                                type='checkbox'
                                                checked={isSelected}
                                                onChange={() => toggleRecipe(recipe.id)}
                                                className='w-4 h-4 rounded border-[#d1d5db] text-[#ff6900] accent-[#ff6900] focus:ring-[#ff6900] cursor-pointer shrink-0'
                                            />

                                            {/* 썸네일 (사각형 유지/컬렉션과 동일) */}
                                            <div className='shrink-0 w-8 h-8 rounded-lg bg-[#f3f4f6] border border-[#e5e7eb] flex items-center justify-center text-sm shadow-sm'>
                                                {recipe.emoji}
                                            </div>

                                            {/* 이름 */}
                                            <div className='flex-1 min-w-0'>
                                                <p className='text-sm font-medium text-[#101828] truncate leading-5'>
                                                    {recipe.name}
                                                </p>
                                                <p className='text-xs text-[#6a7282] leading-4'>
                                                    ID: {recipe.id}
                                                </p>
                                            </div>
                                        </label>
                                    );
                                })
                            )}
                        </div>

                        {/* 선택 개수 표시 */}
                        {selectedRecipes.length > 0 && (
                            <p className='text-xs text-[#ff6900] font-medium'>
                                {selectedRecipes.length}개 선택됨
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
                            selectedRecipes.length === 0
                        }
                    >
                        생성
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default CreateRecipeGroupModal;
