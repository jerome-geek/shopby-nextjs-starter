import { Link, useParams } from 'react-router';

import PageMeta from '@/components/common/PageMeta';
import { PATHS } from '@/const/paths';
import { ReactComponent as YoutubeIcon } from '@/icons/youtube.svg?react';
import { ReactComponent as InstagramIcon } from '@/icons/instagram.svg?react';
import { ReactComponent as ChevronLeftSmallIcon } from '@/icons/chevron-left-small.svg?react';
import { ReactComponent as ChevronRightSmallIcon } from '@/icons/chevron-right-small.svg?react';
import { ReactComponent as HeartIcon } from '@/icons/heart.svg?react';
import { ReactComponent as EyeIcon } from '@/icons/eye-simple.svg?react';
import { ReactComponent as TimeIcon } from '@/icons/time-simple.svg?react';
import { ReactComponent as UsersIcon } from '@/icons/users.svg?react';

// ─────────────────────────────────────────────
// 더미 데이터
// ─────────────────────────────────────────────
interface UserRecipeDetailData {
    id: string;
    title: string;
    description: string;
    userName: string;
    userId: string;
    author: string;
    createdAt: string;
    views: number;
    likes: number;
    time: string;
    servings: string;
    platform: 'YouTube' | 'Instagram';
    imageUrl: string;
    ingredients: string[];
    steps: string[];
}

const MOCK_DETAIL: Record<string, UserRecipeDetailData> = {
    '1': {
        id: '1',
        title: '여름 냉파스타 만들기',
        description: '더운 여름날 먹기 좋은 시원한 냉파스타입니다. 간단하게 만들 수 있어요!',
        userName: '홍길동',
        userId: 'user123',
        author: '쿠킹마마',
        createdAt: '2024.03.15',
        views: 15420,
        likes: 890,
        time: '30분',
        servings: '2인분',
        platform: 'YouTube',
        imageUrl: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=1287&auto=format&fit=crop',
        ingredients: [
            '스파게티면 200g',
            '방울토마토 10개',
            '올리브유 3T',
            '마늘 3쪽',
            '바질 적당량',
            '소금, 후추 약간',
        ],
        steps: [
            '냄비에 물을 끓여 스파게티면을 삶아주세요.',
            '방울토마토는 반으로 자르고, 마늘은 편으로 썰어주세요.',
            '팬에 올리브유를 두르고 마늘을 볶다가 토마토를 넣어주세요.',
            '삶은 면을 찬물에 헹구고 소스와 버무려주세요.',
            '접시에 담고 바질을 올려 완성합니다.',
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
const UserRecipeDetail = () => {
    const { sno } = useParams<{ sno: string }>();
    const detail = sno ? MOCK_DETAIL[sno] || MOCK_DETAIL['1'] : MOCK_DETAIL['1'];

    return (
        <>
            <PageMeta
                title={`${detail.title} | 사용자 레시피 상세`}
                description={detail.description}
            />

            <div className='flex-1 flex flex-col gap-6 px-6 pt-6 pb-10'>
                {/* 목록으로 */}
                <Link
                    to={PATHS.APP.USER_RECIPE.LIST}
                    className='flex items-center gap-1.5 text-[13px] font-medium text-[#6a7282] hover:text-[#101828] transition-colors w-fit'
                >
                    <ChevronLeftSmallIcon className='w-3.5 h-3.5' />
                    목록으로
                </Link>

                {/* 메인 레시피 카드 */}
                <div className='bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]'>
                    {/* 히어로 이미지 */}
                    <div className='w-full aspect-[21/9] bg-[#f3f4f6] relative overflow-hidden'>
                        <img
                            src={detail.imageUrl}
                            alt={detail.title}
                            className='w-full h-full object-cover'
                        />
                    </div>

                    {/* 상세 정보 */}
                    <div className='p-8 flex flex-col gap-6'>
                        <div className='flex flex-col gap-3'>
                            <div className='flex items-center gap-2'>
                                <h1 className='text-[26px] font-bold text-[#101828]'>
                                    {detail.title}
                                </h1>
                                <PlatformIcon platform={detail.platform} />
                            </div>
                            <div className='flex items-center gap-2 text-[14px] text-[#6a7282]'>
                                <span>사용자: {detail.userName} ({detail.userId})</span>
                                <span className='w-[3px] h-[3px] rounded-full bg-[#d1d5db]' />
                                <span>작성자: {detail.author}</span>
                                <span className='w-[3px] h-[3px] rounded-full bg-[#d1d5db]' />
                                <span>등록일: {detail.createdAt}</span>
                            </div>
                        </div>

                        <p className='text-[16px] text-[#364153] leading-relaxed'>
                            {detail.description}
                        </p>

                        <div className='flex items-center gap-5 py-4 border-y border-[#f3f4f6]'>
                            <div className='flex items-center gap-1.5 text-[14px] text-[#6a7282] font-medium'>
                                <EyeIcon className='w-4 h-4 text-[#6a7282]' strokeWidth='1.5' />
                                조회 {detail.views.toLocaleString()}
                            </div>
                            <div className='flex items-center gap-1.5 text-[14px] text-[#6a7282] font-medium'>
                                <HeartIcon className='w-4 h-4 text-[#6a7282]' strokeWidth='1.5' />
                                좋아요 {detail.likes.toLocaleString()}
                            </div>
                            <div className='flex items-center gap-1.5 text-[14px] text-[#6a7282] font-medium'>
                                <TimeIcon className='w-4 h-4 text-[#6a7282]' />
                                {detail.time}
                            </div>
                            <div className='flex items-center gap-1.5 text-[14px] text-[#6a7282] font-medium'>
                                <UsersIcon className='w-4 h-4 text-[#6a7282]' />
                                {detail.servings}
                            </div>
                        </div>

                        <button className='flex items-center gap-1.5 text-[14px] font-bold text-[#ff6900] hover:underline w-fit'>
                            원본 레시피 보기
                            <ChevronRightSmallIcon className='w-3.5 h-3.5' strokeWidth={2} />
                        </button>
                    </div>
                </div>

                {/* 그리드: 재료 + 조리 순서 */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* 재료 카드 */}
                    <div className='bg-white border border-[#e5e7eb] rounded-2xl p-8 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]'>
                        <h3 className='text-[18px] font-bold text-[#101828] mb-6'>재료</h3>
                        <ul className='flex flex-col gap-4'>
                            {detail.ingredients.map((item, idx) => (
                                <li key={idx} className='flex items-center gap-2 text-[15px] text-[#364153]'>
                                    <span className='w-1.5 h-1.5 rounded-full bg-[#ff6900]' />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 조리 순서 카드 */}
                    <div className='bg-white border border-[#e5e7eb] rounded-2xl p-8 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]'>
                        <h3 className='text-[18px] font-bold text-[#101828] mb-6'>조리 순서</h3>
                        <div className='flex flex-col gap-6'>
                            {detail.steps.map((step, idx) => (
                                <div key={idx} className='flex gap-4'>
                                    <span className='shrink-0 w-6 h-6 rounded-md bg-[#fff7ed] text-[#ff6900] text-[13px] font-bold flex items-center justify-center'>
                                        {idx + 1}
                                    </span>
                                    <p className='text-[15px] text-[#364153] leading-relaxed'>
                                        {step}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserRecipeDetail;
