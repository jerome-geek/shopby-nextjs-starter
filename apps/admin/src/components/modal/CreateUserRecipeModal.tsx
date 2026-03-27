import { useState } from 'react';

import { ReactComponent as SearchIcon } from '@/icons/search.svg?react';
import { ReactComponent as UploadIcon } from '@/icons/upload.svg?react';
import { ReactComponent as CloseThickIcon } from '@/icons/close-thick.svg?react';
import { Modal } from '@/components/ui/modal';

// ─────────────────────────────────────────────
// 모달 Props
// ─────────────────────────────────────────────
interface CreateUserRecipeModalProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
}

const CreateUserRecipeModal = ({
    isOpen,
    close,
    unmount,
}: CreateUserRecipeModalProps) => {
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
                            새 레시피 생성
                        </h3>
                        <p className='text-xs font-normal text-[#6a7282] leading-5'>
                            새로운 레시피를 생성하고 정보를 입력하세요.
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        className='ml-4 shrink-0 flex items-center justify-center w-6 h-6 text-[#6a7282] hover:text-[#101828] transition-colors'
                        aria-label='닫기'
                    >
                        <CloseThickIcon className='w-4 h-4 text-inherit' />
                    </button>
                </div>

                {/* 폼 영역 */}
                <div className='px-6 pb-4 flex flex-col gap-4 max-h-[520px] overflow-y-auto'>
                    {/* 사용자 아이디 */}
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-xs font-medium text-[#364153]'>
                            사용자 아이디{' '}
                            <span className='text-[#ff6900]'>*</span>
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
                                <SearchIcon className='w-[14px] h-[14px] text-[#99a1af]' />
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
                            className='w-full h-9 px-3 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg text-sm text-[#101828] placeholder:text-[#99a1af] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20 focus:border-[#ff6900] transition-colors'
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
                            className='w-full h-9 px-3 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg text-sm text-[#101828] placeholder:text-[#99a1af] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20 focus:border-[#ff6900] transition-colors'
                        />
                    </div>

                    {/* 썸네일 이미지 */}
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-xs font-medium text-[#364153]'>
                            썸네일 이미지
                        </label>
                        <div className='w-full h-[120px] border-2 border-dashed border-[#e5e7eb] rounded-xl flex flex-col items-center justify-center gap-2 bg-[#f9fafb] hover:bg-[#f3f4f6] transition-colors cursor-pointer group'>
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
                            className='w-full p-3 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg text-sm text-[#101828] placeholder:text-[#99a1af] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20 focus:border-[#ff6900] transition-colors resize-none'
                        />
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
};

export default CreateUserRecipeModal;
