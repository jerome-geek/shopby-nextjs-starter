import { useState } from 'react';

import { Modal } from '@/components/ui/modal';
import { ReactComponent as SearchIcon } from '@/icons/search.svg?react';
import { ReactComponent as CloseThickIcon } from '@/icons/close-thick.svg?react';

// ─────────────────────────────────────────────
// 더미 데이터
// ─────────────────────────────────────────────
interface RecipeItem {
    id: string;
    title: string;
    author: string;
    thumbnail: string; // 이모지로 대체 가능하나 디자인상 이미지가 어울림
}

const RECIPES: RecipeItem[] = [
    { id: 'r1', title: '여름 냉파스타 만들기', author: '쿠킹마마', thumbnail: '🍝' },
    { id: 'r2', title: '시원한 콩국수 레시피', author: '집밥요리사', thumbnail: '🍜' },
    { id: 'r3', title: '수박화채 만드는 법', author: '디저트킹', thumbnail: '🍉' },
    { id: 'r4', title: '토마토 카프레제', author: '이탈리안쿡', thumbnail: '🥗' },
];

// ─────────────────────────────────────────────
// 모달 Props
// ─────────────────────────────────────────────
interface CreateUserCollectionModalProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
}

const CreateUserCollectionModal = ({
    isOpen,
    close,
    unmount,
}: CreateUserCollectionModalProps) => {
    const [userId, setUserId] = useState('');
    const [collectionName, setCollectionName] = useState('');
    const [recipeSearch, setRecipeSearch] = useState('');
    const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);

    const filteredRecipes = RECIPES.filter((r) =>
        r.title.includes(recipeSearch) || r.author.includes(recipeSearch)
    );

    const toggleRecipe = (id: string) => {
        setSelectedRecipes((prev) =>
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
        );
    };

    const handleClose = () => {
        setUserId('');
        setCollectionName('');
        setRecipeSearch('');
        setSelectedRecipes([]);
        close();
    };

    const isFormValid = userId.trim() && collectionName.trim() && selectedRecipes.length > 0;

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
                            새 컬렉션 생성
                        </h3>
                        <p className='text-xs font-normal text-[#6a7282] leading-5'>
                            사용자의 컬렉션을 생성하고 레시피를 선택하세요.
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
                <div className='px-6 pb-4 flex flex-col gap-4 max-h-[480px] overflow-y-auto'>
                    {/* 사용자 아이디 */}
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-xs font-medium text-[#364153]'>
                            사용자 아이디 <span className='text-[#ff6900]'>*</span>
                        </label>
                        <div className='flex gap-2'>
                            <input
                                type='text'
                                placeholder='사용자 아이디를 입력하세요'
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                className='flex-1 h-9 px-3 bg-white border border-[#e5e7eb] rounded-lg text-sm text-[#101828] placeholder:text-[#99a1af] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20 focus:border-[#ff6900] transition-colors'
                            />
                            <button className='h-9 px-4 rounded-lg border border-[#e5e7eb] bg-white text-sm font-medium text-[#364153] hover:bg-gray-50 transition-colors flex items-center gap-1.5'>
                                <SearchIcon className="w-[14px] h-[14px] text-[#99a1af]" />
                                검색
                            </button>
                        </div>
                    </div>

                    {/* 컬렉션명 */}
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-xs font-medium text-[#364153]'>
                            컬렉션명 <span className='text-[#ff6900]'>*</span>
                        </label>
                        <input
                            type='text'
                            placeholder='컬렉션명을 입력하세요'
                            value={collectionName}
                            onChange={(e) => setCollectionName(e.target.value)}
                            className='w-full h-9 px-3 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg text-sm text-[#101828] placeholder:text-[#99a1af] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20 focus:border-[#ff6900] transition-colors'
                        />
                    </div>

                    {/* 레시피 선택 */}
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-xs font-medium text-[#364153]'>
                            레시피 선택 <span className='text-[#ff6900]'>*</span>
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
                                className='w-full h-9 pl-8 pr-3 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg text-sm text-[#101828] placeholder:text-[#99a1af] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20 focus:border-[#ff6900] transition-colors'
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
                                            className={`flex items-center gap-3 px-3 py-3 cursor-pointer transition-colors hover:bg-[#fafafa] ${
                                                idx !== 0 ? 'border-t border-[#f3f4f6]' : ''
                                            } ${isSelected ? 'bg-[#fff7ed]' : ''}`}
                                        >
                                            {/* 썸네일 */}
                                            <div className='shrink-0 w-10 h-10 rounded-lg bg-[#f3f4f6] border border-[#e5e7eb] flex items-center justify-center text-xl shadow-sm'>
                                                {recipe.thumbnail}
                                            </div>

                                            {/* 이름 + 작성자 */}
                                            <div className='flex-1 min-w-0'>
                                                <p className='text-sm font-medium text-[#101828] truncate leading-5'>
                                                    {recipe.title}
                                                </p>
                                                <p className='text-[11px] text-[#6a7282] leading-4'>
                                                    {recipe.author}
                                                </p>
                                            </div>

                                            {/* 체크박스 (우측 배치 가능하나 디자인상 레시피 이미지 좌측 혹은 선택 상태 하이라이트만 가능. 피그마에는 체크박스 명시 안되어있으나 선택 기능 필요) */}
                                            <input
                                                type='checkbox'
                                                checked={isSelected}
                                                onChange={() => toggleRecipe(recipe.id)}
                                                className='w-4 h-4 rounded border-[#d1d5db] text-[#ff6900] accent-[#ff6900] focus:ring-[#ff6900] cursor-pointer shrink-0'
                                            />
                                        </label>
                                    );
                                })
                            )}
                        </div>

                        {/* 선택 개수 표시 */}
                        <p className='text-[12px] text-[#6a7282] font-normal mt-1'>
                            {selectedRecipes.length}개 선택됨
                        </p>
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
                        className='h-9 px-6 rounded-lg bg-[#ffae74] text-white text-sm font-semibold hover:bg-orange-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm'
                        disabled={!isFormValid}
                    >
                        생성
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default CreateUserCollectionModal;
