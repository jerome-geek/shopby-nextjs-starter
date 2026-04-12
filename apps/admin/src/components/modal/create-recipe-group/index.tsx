import { useState } from 'react';

import { ModalLayout } from '@/layout/modal';
import { ReactComponent as SearchIcon } from '@/icons/search.svg?react';
import { ReactComponent as ChevronDownSimpleIcon } from '@/icons/chevron-down-simple.svg?react';

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

interface CreateRecipeGroupModalProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
}

const CreateRecipeGroupModal = ({
    close,
    ...props
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
        setGroupId('');
        setGroupName('');
        setIsVisible(true);
        setDescription('');
        setRecipeSearch('');
        setSelectedRecipes([]);
        close();
    };

    const isSubmitDisabled =
        !groupId || !groupName.trim() || selectedRecipes.length === 0;

    return (
        <ModalLayout
            {...props}
            close={close}
            title='새 레시피 그룹 생성'
            subtitle='레시피 그룹을 생성하고 레시피를 선택하세요.'
            footer={
                <>
                    <button
                        type='button'
                        onClick={handleClose}
                        className='h-9 rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm font-medium text-[#364153] transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                    >
                        취소
                    </button>
                    <button
                        type='button'
                        onClick={handleClose}
                        className='h-9 rounded-lg bg-[#ff6900] px-4 text-sm font-medium text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50'
                        disabled={isSubmitDisabled}
                    >
                        생성
                    </button>
                </>
            }
        >
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1.5'>
                    <label className='text-xs font-medium text-[#364153]'>
                        그룹 아이디
                        <span className='ml-0.5 text-[#ff6900]'>*</span>
                    </label>
                    <div className='relative'>
                        <select
                            value={groupId}
                            onChange={(e) => setGroupId(e.target.value)}
                            className='h-9 w-full cursor-pointer appearance-none rounded-lg border border-[#e5e7eb] bg-white pl-3 pr-8 text-sm text-[#101828] transition-colors focus:border-[#ff6900] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20'
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
                            <ChevronDownSimpleIcon className='h-3.5 w-3.5 text-[#6a7282]' />
                        </span>
                    </div>
                </div>

                <div className='flex flex-col gap-1.5'>
                    <label className='text-xs font-medium text-[#364153]'>
                        그룹명
                        <span className='ml-0.5 text-[#ff6900]'>*</span>
                    </label>
                    <input
                        type='text'
                        placeholder='그룹명을 입력하세요'
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className='h-9 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#101828] transition-colors placeholder:text-[#99a1af] focus:border-[#ff6900] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20'
                    />
                </div>

                <div className='flex items-center justify-between'>
                    <label className='text-xs font-medium text-[#364153]'>
                        노출 여부
                    </label>
                    <Toggle checked={isVisible} onChange={setIsVisible} />
                </div>

                <div className='flex flex-col gap-1.5'>
                    <label className='text-xs font-medium text-[#364153]'>
                        설명
                    </label>
                    <textarea
                        placeholder='그룹 명을 입력하세요'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className='w-full resize-none rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#101828] transition-colors placeholder:text-[#99a1af] focus:border-[#ff6900] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20'
                    />
                </div>

                <div className='flex flex-col gap-1.5'>
                    <label className='text-xs font-medium text-[#364153]'>
                        레시피 선택
                        <span className='ml-0.5 text-[#ff6900]'>*</span>
                    </label>

                    <div className='relative'>
                        <span className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2'>
                            <SearchIcon className='h-[14px] w-[14px] text-[#99a1af]' />
                        </span>
                        <input
                            type='text'
                            placeholder='레시피 검색...'
                            value={recipeSearch}
                            onChange={(e) => setRecipeSearch(e.target.value)}
                            className='h-9 w-full rounded-lg border border-[#e5e7eb] bg-white pl-8 pr-3 text-sm text-[#101828] transition-colors placeholder:text-[#99a1af] focus:border-[#ff6900] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20'
                        />
                    </div>

                    <div className='flex flex-col overflow-hidden rounded-lg border border-[#e5e7eb] bg-white'>
                        {filteredRecipes.length === 0 ? (
                            <p className='px-3 py-4 text-center text-sm text-[#99a1af]'>
                                검색 결과가 없습니다.
                            </p>
                        ) : (
                            filteredRecipes.map((recipe, idx) => {
                                const isSelected = selectedRecipes.includes(
                                    recipe.id,
                                );
                                return (
                                    <label
                                        key={recipe.id}
                                        className={`flex cursor-pointer items-center gap-3 px-3 py-2.5 transition-colors hover:bg-[#fafafa] ${
                                            idx !== 0
                                                ? 'border-t border-[#f3f4f6]'
                                                : ''
                                        } ${isSelected ? 'bg-[#fff7ed]' : ''}`}
                                    >
                                        <input
                                            type='checkbox'
                                            checked={isSelected}
                                            onChange={() =>
                                                toggleRecipe(recipe.id)
                                            }
                                            className='h-4 w-4 shrink-0 cursor-pointer rounded border-[#d1d5db] text-[#ff6900] accent-[#ff6900] focus:ring-[#ff6900]'
                                        />

                                        <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] text-sm shadow-sm'>
                                            {recipe.emoji}
                                        </div>

                                        <div className='min-w-0 flex-1'>
                                            <p className='truncate text-sm font-medium leading-5 text-[#101828]'>
                                                {recipe.name}
                                            </p>
                                            <p className='text-xs leading-4 text-[#6a7282]'>
                                                ID: {recipe.id}
                                            </p>
                                        </div>
                                    </label>
                                );
                            })
                        )}
                    </div>

                    {selectedRecipes.length > 0 && (
                        <p className='text-xs font-medium text-[#ff6900]'>
                            {selectedRecipes.length}개 선택됨
                        </p>
                    )}
                </div>
            </div>
        </ModalLayout>
    );
};

export default CreateRecipeGroupModal;
