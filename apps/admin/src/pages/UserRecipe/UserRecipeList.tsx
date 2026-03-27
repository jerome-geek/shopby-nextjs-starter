import { useState } from 'react';
import { Link } from 'react-router';

import PageMeta from '@/components/common/PageMeta';
import { PATHS } from '@/const/paths';
import CreateUserRecipeModal from '@/components/modal/CreateUserRecipeModal';
import { ReactComponent as SearchIcon } from '@/icons/search.svg?react';
import { ReactComponent as BookmarkIcon } from '@/icons/bookmark.svg?react';
import { ReactComponent as HeartIcon } from '@/icons/heart.svg?react';
import { ReactComponent as PlusSimpleIcon } from '@/icons/plus-simple.svg?react';
import { ReactComponent as ChevronLeftSmallIcon } from '@/icons/chevron-left-small.svg?react';
import { ReactComponent as ChevronRightSmallIcon } from '@/icons/chevron-right-small.svg?react';

interface UserRecipe {
    id: string;
    title: string;
    emoji: string;
    userId: string;
    source: 'YouTube' | 'Instagram';
    bookmarks: number;
    likes: number;
    createdAt: string;
}

const MOCK_DATA: UserRecipe[] = [
    { id: '1', emoji: '🍝', title: '10분 완성 파스타', userId: 'user123', source: 'YouTube', bookmarks: 456, likes: 2890, createdAt: '2026-03-21' },
    { id: '2', emoji: '🥪', title: '초간단 샌드위치', userId: 'user456', source: 'Instagram', bookmarks: 289, likes: 1567, createdAt: '2026-03-21' },
    { id: '3', emoji: '🥗', title: '건강 샐러드 볼', userId: 'user789', source: 'YouTube', bookmarks: 678, likes: 4123, createdAt: '2026-03-20' },
    { id: '4', emoji: '🍲', title: '김치찌개 레시피', userId: 'user234', source: 'YouTube', bookmarks: 892, likes: 5678, createdAt: '2026-03-19' },
    { id: '5', emoji: '🍳', title: '계란말이 만들기', userId: 'user567', source: 'Instagram', bookmarks: 534, likes: 3201, createdAt: '2026-03-18' },
    { id: '6', emoji: '🍰', title: '티라미수 레시피', userId: 'user890', source: 'YouTube', bookmarks: 723, likes: 4567, createdAt: '2026-03-17' },
    { id: '7', emoji: '🥘', title: '된장찌개', userId: 'user111', source: 'YouTube', bookmarks: 412, likes: 2456, createdAt: '2026-03-16' },
    { id: '8', emoji: '🍝', title: '까르보나라', userId: 'user222', source: 'Instagram', bookmarks: 645, likes: 3890, createdAt: '2026-03-15' },
    { id: '9', emoji: '🍚', title: '비빔밥', userId: 'user333', source: 'YouTube', bookmarks: 567, likes: 3456, createdAt: '2026-03-14' },
    { id: '10', emoji: '🥤', title: '과일 스무디', userId: 'user444', source: 'Instagram', bookmarks: 389, likes: 2134, createdAt: '2026-03-13' },
];

const SourceBadge = ({ source }: { source: 'YouTube' | 'Instagram' }) => {
    if (source === 'YouTube') {
        return (
            <span className='inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#ffe2e2] text-[#9f0712]'>
                YouTube
            </span>
        );
    }
    return (
        <span className='inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#fce7f3] text-[#a3004c]'>
            Instagram
        </span>
    );
}

const UserRecipeList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const filteredData = MOCK_DATA.filter(
        (item) =>
            item.title.includes(searchQuery) ||
            item.userId.includes(searchQuery)
    );

    return (
        <>
            <PageMeta
                title='사용자 레시피 관리 | JollyPot 관리자'
                description='사용자가 등록한 레시피를 관리합니다'
            />
            <div className='flex flex-col gap-6 pt-6 px-6'>
                {/* 페이지 헤더 */}
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-2xl font-bold leading-8 tracking-[0.07px] text-[#101828]'>
                            사용자 레시피 관리
                        </h2>
                        <p className='text-base font-normal leading-6 tracking-[-0.31px] text-[#6a7282]'>
                            사용자가 등록한 레시피를 관리합니다
                        </p>
                    </div>

                    {/* 액션 버튼 */}
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className='flex items-center gap-2 h-10 px-4 rounded-xl bg-[#ff6900] text-white text-sm font-semibold transition-all hover:bg-orange-600 shadow-sm'
                    >
                        <PlusSimpleIcon className='w-4 h-4 text-white' />
                        레시피 생성
                    </button>
                </div>

                {/* 테이블 카드 */}
                <div className='bg-white border border-[#e5e7eb] rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] overflow-hidden'>
                    {/* 검색 영역 */}
                    <div className='px-4 py-4 border-b border-[#e5e7eb]'>
                        <div className='relative'>
                            <span className='absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#717182] flex items-center justify-center w-4 h-4'>
                                <SearchIcon className='w-full h-full' />
                            </span>
                            <input
                                type='text'
                                placeholder='레시피 또는 사용자 검색...'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='w-full h-10 pl-10 pr-4 py-1 bg-[#f3f3f5] rounded-xl text-[14px] text-[#101828] placeholder:text-[#99a1af] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20 focus:bg-white transition-all'
                            />
                        </div>
                    </div>

                    {/* 테이블 */}
                    <div className='overflow-x-auto'>
                        <table className='w-full min-w-[900px]'>
                            <thead>
                                <tr className='bg-[#f9fafb] border-b border-[#e5e7eb]'>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282]'>
                                        레시피
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282] w-[150px]'>
                                        사용자
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282] w-[150px]'>
                                        소스
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282] w-[120px]'>
                                        북마크
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282] w-[120px]'>
                                        좋아요
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282] w-[130px]'>
                                        생성일
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className='px-6 py-12 text-center text-sm text-[#6a7282]'
                                        >
                                            검색 결과가 없습니다.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((item) => (
                                        <tr
                                            key={item.id}
                                            className='border-b border-[#e5e7eb] last:border-b-0 hover:bg-[#fafafa] transition-colors group'
                                        >
                                            <td className='px-6 py-6'>
                                                <div className='flex items-center gap-2'>
                                                    <span className='text-lg'>{item.emoji}</span>
                                                    <Link
                                                        to={PATHS.APP.USER_RECIPE.DETAIL.replace(
                                                            ':sno',
                                                            item.id,
                                                        )}
                                                        className='text-[15px] font-bold text-[#ff6900] hover:underline'
                                                    >
                                                        {item.title}
                                                    </Link>
                                                </div>
                                            </td>
                                            <td className='px-6 py-6 text-[14px] text-[#364153]'>
                                                {item.userId}
                                            </td>
                                            <td className='px-6 py-6'>
                                                <SourceBadge source={item.source} />
                                            </td>
                                            <td className='px-6 py-6'>
                                                <div className='flex items-center gap-1.5 text-[14px] font-medium text-[#364153]'>
                                                    <BookmarkIcon className='w-4 h-4 text-[#6a7282]' />
                                                    {item.bookmarks.toLocaleString()}
                                                </div>
                                            </td>
                                            <td className='px-6 py-6'>
                                                <div className='flex items-center gap-1.5 text-[14px] font-medium text-[#364153]'>
                                                    <HeartIcon className='w-4 h-4 text-[#6a7282]' />
                                                    {item.likes.toLocaleString()}
                                                </div>
                                            </td>
                                            <td className='px-6 py-6 text-[14px] text-[#6a7282]'>
                                                {item.createdAt}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 하단 푸터 (총 개수 + 페이지네이션) */}
                <div className='flex items-center justify-between pb-10'>
                    <p className='text-sm text-[#6a7282]'>
                        총 12개 중 1-10개 표시
                    </p>
                    <div className='flex items-center gap-2'>
                        <button className='w-8 h-8 flex items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#6a7282] hover:bg-gray-50 disabled:opacity-50'>
                            <ChevronLeftSmallIcon className='w-4 h-4' />
                        </button>
                        <button className='w-8 h-8 flex items-center justify-center rounded-lg bg-[#ff6900] text-white text-sm font-semibold'>
                            1
                        </button>
                        <button className='w-8 h-8 flex items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-sm font-medium text-[#6a7282] hover:bg-gray-50'>
                            2
                        </button>
                        <button className='w-8 h-8 flex items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#6a7282] hover:bg-gray-50'>
                            <ChevronRightSmallIcon className='w-4 h-4' />
                        </button>
                    </div>
                </div>
            </div>

            {/* 레시피 생성 모달 */}
            <CreateUserRecipeModal
                isOpen={isCreateModalOpen}
                close={() => setIsCreateModalOpen(false)}
                unmount={() => setIsCreateModalOpen(false)}
            />
        </>
    );
};

export default UserRecipeList;
