import { Link, useParams } from 'react-router';

import PageMeta from '@/components/common/PageMeta';
import { PATHS } from '@/const/paths';
import { ReactComponent as YoutubeIcon } from '@/icons/youtube.svg?react';
import { ReactComponent as InstagramIcon } from '@/icons/instagram.svg?react';
import { ReactComponent as ChevronLeftSmallIcon } from '@/icons/chevron-left-small.svg?react';
import { ReactComponent as BookmarkIcon } from '@/icons/bookmark.svg?react';
import { ReactComponent as HeartIcon } from '@/icons/heart.svg?react';

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
const PlatformIcon = ({ platform }: { platform: 'YouTube' | 'Instagram' }) => {
    if (platform === 'YouTube') {
        return <YoutubeIcon className='w-5 h-5' />;
    }
    return <InstagramIcon className='w-5 h-5' />;
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
                    <ChevronLeftSmallIcon className='w-3.5 h-3.5' />
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
                        <BookmarkIcon className='w-4 h-4 text-[#6a7282]' />
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
                                            <HeartIcon className='w-3.5 h-3.5 text-[#6a7282]' />
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
