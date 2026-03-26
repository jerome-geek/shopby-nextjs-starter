import { Link, useParams } from 'react-router';

import PageMeta from '@/components/common/PageMeta';
import { PATHS } from '@/const/paths';

// ─────────────────────────────────────────────
// 더미 데이터
// ─────────────────────────────────────────────
interface Recipe {
    id: string;
    title: string;
    author: string;
    views: number;
    likes: number;
    platform: 'YouTube' | 'Instagram';
    thumbnail: string;
}

interface UserCollectionDetailData {
    id: string;
    collectionName: string;
    userName: string;
    userId: string;
    description: string;
    bookmarks: number;
    createdAt: string;
    recipes: Recipe[];
}

const MOCK_DETAIL: Record<string, UserCollectionDetailData> = {
    '1': {
        id: '1',
        collectionName: '여름 별미 레시피',
        userName: '홍길동',
        userId: 'user123',
        description: '더운 여름에 먹기 좋은 시원한 레시피 모음',
        bookmarks: 24,
        createdAt: '2024.03.15',
        recipes: [
            {
                id: 'r1',
                title: '여름 냉파스타 만들기',
                author: '쿠킹마마',
                views: 15420,
                likes: 890,
                platform: 'YouTube',
                thumbnail: '🍝',
            },
            {
                id: 'r2',
                title: '시원한 콩국수 레시피',
                author: '집밥요리사',
                views: 8920,
                likes: 456,
                platform: 'Instagram',
                thumbnail: '🍜',
            },
            {
                id: 'r3',
                title: '수박화채 만드는 법',
                author: '디저트킹',
                views: 12340,
                likes: 678,
                platform: 'YouTube',
                thumbnail: '🍉',
            },
        ],
    },
};

// ─────────────────────────────────────────────
// 플랫폼 아이콘
// ─────────────────────────────────────────────
function PlatformIcon({ platform }: { platform: 'YouTube' | 'Instagram' }) {
    if (platform === 'YouTube') {
        return (
            <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1.13 8.12 1.13 12 1.13 12s0 3.88.27 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2c0-1.7.27-5.58.27-5.58s0-3.88-.27-5.58Z'
                    fill='#FF0000'
                />
                <path d='m10 15 5-3-5-3v6z' fill='#FFF' />
            </svg>
        );
    }
    return (
        <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <rect x='2' y='2' width='20' height='20' rx='5' fill='#E1306C' />
            <path
                d='M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5.5-8.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z'
                fill='#FFF'
            />
        </svg>
    );
}

// ─────────────────────────────────────────────
// 메인 컴포넌트
// ─────────────────────────────────────────────
const UserCollectionDetail = () => {
    const { sno } = useParams<{ sno: string }>();
    const detail = sno ? MOCK_DETAIL[sno] || MOCK_DETAIL['1'] : MOCK_DETAIL['1'];

    return (
        <>
            <PageMeta
                title={`${detail.collectionName} | 사용자 컬렉션 상세`}
                description={detail.description}
            />

            <div className='flex-1 flex flex-col gap-6 px-6 pt-6 pb-10'>
                {/* 목록으로 */}
                <Link
                    to={PATHS.APP.USER_COLLECTION.LIST}
                    className='flex items-center gap-1.5 text-[13px] font-medium text-[#6a7282] hover:text-[#101828] transition-colors w-fit'
                >
                    <svg
                        width='14'
                        height='14'
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M10 13L5 8L10 3'
                            stroke='currentColor'
                            strokeWidth='1.3'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                    목록으로
                </Link>

                {/* 컬렉션 헤더 카드 */}
                <div className='bg-white border border-[#e5e7eb] rounded-2xl p-8 flex flex-col gap-4 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-[24px] font-bold text-[#101828] tracking-tight'>
                            {detail.collectionName}
                        </h1>
                        <div className='flex items-center gap-2 text-[14px] text-[#6a7282]'>
                            <span>사용자: {detail.userName} ({detail.userId})</span>
                            <span className='w-[3px] h-[3px] rounded-full bg-[#d1d5db]' />
                            <span>생성일: {detail.createdAt}</span>
                        </div>
                    </div>

                    <p className='text-[15px] font-normal text-[#364153] leading-relaxed'>
                        {detail.description}
                    </p>

                    <div className='flex items-center gap-2 text-[#6a7282] mt-2'>
                        <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M3 3V13.5L8 10L13 13.5V3C13 2.44772 12.5523 2 12 2H4C3.44772 2 3 2.44772 3 3Z'
                                stroke='currentColor'
                                strokeWidth='1.2'
                                strokeLinejoin='round'
                            />
                        </svg>
                        <span className='text-[14px] font-semibold'>북마크 {detail.bookmarks}</span>
                    </div>
                </div>

                {/* 포함된 레시피 섹션 */}
                <div className='flex flex-col gap-4'>
                    <h2 className='text-[16px] font-bold text-[#101828] px-2'>
                        포함된 레시피 ({detail.recipes.length})
                    </h2>

                    <div className='bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]'>
                        {detail.recipes.map((recipe, idx) => (
                            <div
                                key={recipe.id}
                                className={`flex items-center gap-6 p-6 transition-colors hover:bg-[#fafafa] relative ${
                                    idx !== detail.recipes.length - 1 ? 'border-b border-[#f3f4f6]' : ''
                                }`}
                            >
                                {/* 썸네일 */}
                                <div className='shrink-0 w-[120px] h-[80px] rounded-xl bg-[#f3f4f6] flex items-center justify-center text-3xl shadow-sm border border-[#e5e7eb]'>
                                    {recipe.thumbnail}
                                </div>

                                {/* 레시피 정보 */}
                                <div className='flex-1 flex flex-col gap-1.5 min-w-0'>
                                    <h4 className='text-[16px] font-bold text-[#101828] truncate'>
                                        {recipe.title}
                                    </h4>
                                    <p className='text-[13px] font-normal text-[#6a7282]'>
                                        {recipe.author}
                                    </p>
                                    <div className='flex items-center gap-3 mt-1'>
                                        <div className='flex items-center gap-1.5 text-[12px] text-[#6a7282]'>
                                            <span>조회 {recipe.views.toLocaleString()}</span>
                                        </div>
                                        <div className='flex items-center gap-1.5 text-[12px] text-[#6a7282]'>
                                            <svg
                                                width='14'
                                                height='14'
                                                viewBox='0 0 24 24'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <path
                                                    d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
                                                    stroke='currentColor'
                                                    strokeWidth='1.5'
                                                />
                                            </svg>
                                            {recipe.likes.toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                {/* 플랫폼 아이콘 (우측 상단 혹은 중간 우측) */}
                                <div className='absolute top-6 right-6'>
                                    <PlatformIcon platform={recipe.platform} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserCollectionDetail;
