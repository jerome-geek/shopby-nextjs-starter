import { useState } from 'react';

import { ModalLayout } from '@/layout/modal';

import { ReactComponent as SearchIcon } from '@/icons/search.svg?react';
import { ReactComponent as UploadIcon } from '@/icons/upload.svg?react';

interface CreateUserRecipeModalProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
}

const CreateUserRecipeModal = ({ ...props }: CreateUserRecipeModalProps) => {
    const [userId, setUserId] = useState('');
    const [recipeName, setRecipeName] = useState('');
    const [recipeUrl, setRecipeUrl] = useState('');
    const [description, setDescription] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setThumbnail] = useState<File | null>(null);

    const handleClose = () => {
        setUserId('');
        setRecipeName('');
        setRecipeUrl('');
        setDescription('');
        setThumbnail(null);
        close();
    };

    const isFormValid = userId.trim() && recipeName.trim() && recipeUrl.trim();

    return (
        <ModalLayout
            {...props}
            title='새 레시피 생성'
            subtitle='새로운 레시피를 생성하고 정보를 입력하세요.'
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
                        className='h-9 rounded-lg bg-[#ffae74] px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50'
                        disabled={!isFormValid}
                    >
                        생성
                    </button>
                </>
            }
        >
            <div className='flex flex-col gap-4'>
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
                            className='h-9 flex-1 rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#101828] transition-colors placeholder:text-[#99a1af] focus:border-[#ff6900] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20'
                        />
                        <button
                            type='button'
                            className='flex h-9 items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm font-medium text-[#364153] transition-colors hover:bg-gray-50'
                        >
                            <SearchIcon className='h-[14px] w-[14px] text-[#99a1af]' />
                            검색
                        </button>
                    </div>
                </div>

                {/* 레시피 명 */}
                <div className='flex flex-col gap-1.5'>
                    <label className='text-xs font-medium text-[#364153]'>
                        레시피 명 <span className='text-[#ff6900]'>*</span>
                    </label>
                    <input
                        type='text'
                        placeholder='레시피 명을 입력하세요'
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                        className='h-9 w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-3 text-sm text-[#101828] transition-colors placeholder:text-[#99a1af] focus:border-[#ff6900] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20'
                    />
                </div>

                {/* 유튜브 / 인스타그램 URL */}
                <div className='flex flex-col gap-1.5'>
                    <label className='text-xs font-medium text-[#364153]'>
                        유튜브 / 인스타그램 URL{' '}
                        <span className='text-[#ff6900]'>*</span>
                    </label>
                    <input
                        type='text'
                        placeholder='URL을 입력하세요'
                        value={recipeUrl}
                        onChange={(e) => setRecipeUrl(e.target.value)}
                        className='h-9 w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-3 text-sm text-[#101828] transition-colors placeholder:text-[#99a1af] focus:border-[#ff6900] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20'
                    />
                </div>

                {/* 썸네일 이미지 */}
                <div className='flex flex-col gap-1.5'>
                    <label className='text-xs font-medium text-[#364153]'>
                        썸네일 이미지
                    </label>
                    <div className='group flex h-[120px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#e5e7eb] bg-[#f9fafb] transition-colors hover:bg-[#f3f4f6]'>
                        <UploadIcon />
                        <p className='text-[13px] text-[#99a1af] group-hover:text-[#6a7282]'>
                            이미지를 업로드하세요
                        </p>
                    </div>
                </div>

                {/* 상세 설명 */}
                <div className='flex flex-col gap-1.5'>
                    <label className='text-xs font-medium text-[#364153]'>
                        상세 설명
                    </label>
                    <textarea
                        placeholder='상세 내용을 입력하세요'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className='w-full resize-none rounded-lg border border-[#e5e7eb] bg-[#f9fafb] p-3 text-sm text-[#101828] transition-colors placeholder:text-[#99a1af] focus:border-[#ff6900] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20'
                    />
                </div>
            </div>
        </ModalLayout>
    );
};

export default CreateUserRecipeModal;
