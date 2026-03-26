import { useState } from 'react';
import { Link } from 'react-router';

import PageMeta from '@/components/common/PageMeta';
import { PATHS } from '@/const/paths';
import CreateUserCollectionModal from '@/components/modal/CreateUserCollectionModal';

interface UserCollection {
    id: string;
    collectionName: string;
    userName: string;
    userId: string;
    recipeCount: number;
    bookmarks: number;
    likes: number;
    createdAt: string;
}

const MOCK_DATA: UserCollection[] = [
    {
        id: '1',
        collectionName: '여름 별미 레시피',
        userName: '홍길동',
        userId: 'user123',
        recipeCount: 12,
        bookmarks: 24,
        likes: 156,
        createdAt: '2024.03.15',
    },
    {
        id: '2',
        collectionName: '간단한 아침 식사',
        userName: '김영희',
        userId: 'user456',
        recipeCount: 8,
        bookmarks: 18,
        likes: 92,
        createdAt: '2024.03.14',
    },
    {
        id: '3',
        collectionName: '다이어트 요리 모음',
        userName: '이철수',
        userId: 'user789',
        recipeCount: 15,
        bookmarks: 45,
        likes: 234,
        createdAt: '2024.03.13',
    },
    {
        id: '4',
        collectionName: '주말 브런치 레시피',
        userName: '박민수',
        userId: 'user234',
        recipeCount: 10,
        bookmarks: 31,
        likes: 178,
        createdAt: '2024.03.12',
    },
    {
        id: '5',
        collectionName: '아이 간식 만들기',
        userName: '최지은',
        userId: 'user567',
        recipeCount: 20,
        bookmarks: 52,
        likes: 298,
        createdAt: '2024.03.11',
    },
];

const UserCollections = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const filteredData = MOCK_DATA.filter(
        (item) =>
            item.collectionName.includes(searchQuery) ||
            item.userName.includes(searchQuery) ||
            item.userId.includes(searchQuery),
    );

    return (
        <>
            <PageMeta
                title='사용자 컬렉션 관리 | JollyPot 관리자'
                description='사용자가 생성한 컬렉션을 관리합니다'
            />
            <div className='flex flex-col gap-6 pt-6 px-6'>
                {/* 페이지 헤더 */}
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-2xl font-bold leading-8 tracking-[0.07px] text-[#101828]'>
                            사용자 컬렉션 관리
                        </h2>
                        <p className='text-base font-normal leading-6 tracking-[-0.31px] text-[#6a7282]'>
                            사용자가 생성한 컬렉션을 관리합니다
                        </p>
                    </div>

                    {/* 액션 버튼 */}
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className='flex items-center gap-2 h-10 px-4 rounded-xl bg-[#ff6900] text-white text-sm font-semibold transition-all hover:bg-orange-600 shadow-sm'
                    >
                        <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M8 3V13M3 8H13'
                                stroke='white'
                                strokeWidth='1.5'
                                strokeLinecap='round'
                            />
                        </svg>
                        컬렉션 생성
                    </button>
                </div>

                {/* 테이블 카드 */}
                <div className='bg-white border border-[#e5e7eb] rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] overflow-hidden'>
                    {/* 검색 영역 */}
                    <div className='px-4 py-4 border-b border-[#e5e7eb]'>
                        <div className='relative'>
                            <span className='absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none'>
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
                                        d='M6.5 2C4.01472 2 2 4.01472 2 6.5C2 8.98528 4.01472 11 6.5 11C8.98528 11 11 8.98528 11 6.5C11 4.01472 8.98528 2 6.5 2ZM1 6.5C1 3.46243 3.46243 1 6.5 1C9.53757 1 12 3.46243 12 6.5C12 7.74835 11.5841 8.89804 10.8833 9.81596L14.8536 13.7864C15.0488 13.9817 15.0488 14.2983 14.8536 14.4935C14.6583 14.6888 14.3417 14.6888 14.1464 14.4935L10.176 10.5231C9.25804 11.2239 8.10835 11.6399 6.86 11.6399C6.74 11.6399 6.62 11.6361 6.5 11.6286'
                                        fill='#717182'
                                    />
                                </svg>
                            </span>
                            <input
                                type='text'
                                placeholder='컬렉션명 또는 사용자명으로 검색...'
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
                                        컬렉션명
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282] w-[180px]'>
                                        사용자
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282] w-[120px]'>
                                        레시피 수
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
                                                <Link
                                                    to={PATHS.APP.USER_COLLECTION.DETAIL.replace(
                                                        ':sno',
                                                        item.id,
                                                    )}
                                                    className='text-[15px] font-bold text-[#ff6900] hover:underline'
                                                >
                                                    {item.collectionName}
                                                </Link>
                                            </td>
                                            <td className='px-6 py-6'>
                                                <div className='flex flex-col gap-0.5 text-[14px]'>
                                                    <span className='font-medium text-[#101828]'>
                                                        {item.userName}
                                                    </span>
                                                    <span className='text-[12px] text-[#6a7282]'>
                                                        {item.userId}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className='px-6 py-6'>
                                                <span className='text-[14px] font-medium text-[#364153]'>
                                                    {item.recipeCount}
                                                </span>
                                            </td>
                                            <td className='px-6 py-6'>
                                                <div className='flex items-center gap-1.5 text-[14px] font-medium text-[#364153]'>
                                                    <svg
                                                        width='16'
                                                        height='16'
                                                        viewBox='0 0 16 16'
                                                        fill='none'
                                                        xmlns='http://www.w3.org/2000/svg'
                                                    >
                                                        <path
                                                            d='M3 3V13.5L8 10L13 13.5V3C13 2.44772 12.5523 2 12 2H4C3.44772 2 3 2.44772 3 3Z'
                                                            stroke='#6a7282'
                                                            strokeWidth='1.2'
                                                            strokeLinejoin='round'
                                                        />
                                                    </svg>
                                                    {item.bookmarks}
                                                </div>
                                            </td>
                                            <td className='px-6 py-6'>
                                                <div className='flex items-center gap-1.5 text-[14px] font-medium text-[#364153]'>
                                                    <svg
                                                        width='16'
                                                        height='16'
                                                        viewBox='0 0 24 24'
                                                        fill='none'
                                                        xmlns='http://www.w3.org/2000/svg'
                                                    >
                                                        <path
                                                            d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
                                                            stroke='#6a7282'
                                                            strokeWidth='1.2'
                                                        />
                                                    </svg>
                                                    {item.likes}
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
            </div>

            {/* 컬렉션 생성 모달 */}
            <CreateUserCollectionModal
                isOpen={isCreateModalOpen}
                close={() => setIsCreateModalOpen(false)}
                unmount={() => setIsCreateModalOpen(false)}
            />
        </>
    );
};

export default UserCollections;
