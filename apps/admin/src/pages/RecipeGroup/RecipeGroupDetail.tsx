import { Link, useParams } from 'react-router';

import PageMeta from '@/components/common/PageMeta';
import { PATHS } from '@/const/paths';

// ─────────────────────────────────────────────
// 더미 데이터
// ─────────────────────────────────────────────
type RecipeSource = 'YouTube' | 'Instagram';

interface Recipe {
    id: string;
    emoji: string;
    title: string;
    author: string;
    source: RecipeSource;
    views: number;
    likes: number;
}

interface RecipeGroupDetailData {
    groupId: string;
    groupName: string;
    description: string;
    isVisible: boolean;
    createdAt: string;
    recipes: Recipe[];
}

const MOCK_DETAIL: Record<string, RecipeGroupDetailData> = {
    recipe_group_1: {
        groupId: 'recipe_group_1',
        groupName: '인기 레시피',
        description: '사용자들이 가장 많이 본 레시피',
        isVisible: true,
        createdAt: '2026-03-15',
        recipes: [
            {
                id: 'r1',
                emoji: '🍲',
                title: '김치찌개 황금 레시피',
                author: '요리왕',
                source: 'YouTube',
                views: 45000,
                likes: 3200,
            },
            {
                id: 'r2',
                emoji: '🍳',
                title: '계란말이 만들기',
                author: '쿡스타그램',
                source: 'Instagram',
                views: 32000,
                likes: 2100,
            },
            {
                id: 'r3',
                emoji: '🍝',
                title: '파스타 레시피',
                author: '이탈리안셰프',
                source: 'YouTube',
                views: 38000,
                likes: 2800,
            },
        ],
    },
    recipe_group_2: {
        groupId: 'recipe_group_2',
        groupName: '계절 특집',
        description: '봄 시즌 추천 레시피',
        isVisible: true,
        createdAt: '2026-03-10',
        recipes: [
            {
                id: 'r4',
                emoji: '🌿',
                title: '봄나물 비빔밥',
                author: '나물요리사',
                source: 'YouTube',
                views: 9800,
                likes: 720,
            },
        ],
    },
    recipe_group_3: {
        groupId: 'recipe_group_3',
        groupName: '다이어트',
        description: '다이어터를 위한 추천 건강식',
        isVisible: false,
        createdAt: '2026-03-05',
        recipes: [
            {
                id: 'r5',
                emoji: '🥦',
                title: '닭가슴살 샐러드',
                author: '헬스쿡',
                source: 'Instagram',
                views: 21000,
                likes: 1800,
            },
        ],
    },
};

function SourceBadge({ source }: { source: RecipeSource }) {
    if (source === 'YouTube') {
        return (
            <span className='inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#ffe2e2] text-[#9f0712]'>
                <svg
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M11.12 3.24a1.34 1.34 0 0 0-.94-.94C9.27 2 6 2 6 2s-3.27 0-4.18.3a1.34 1.34 0 0 0-.94.94C.6 4.15.6 6 .6 6s0 1.85.28 2.76c.16.57.57.98 1 1.13.82.3 4.19.3 4.19.3s3.27 0 4.18-.3a1.34 1.34 0 0 0 .94-.94c.27-.91.27-2.76.27-2.76s0-1.85-.28-2.75Z'
                        fill='currentColor'
                    />
                    <path d='M4.8 7.8 8.4 6 4.8 4.2v3.6Z' fill='white' />
                </svg>
                YouTube
            </span>
        );
    }
    return (
        <span className='inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#fce7f3] text-[#a3004c]'>
            <svg
                width='12'
                height='12'
                viewBox='0 0 12 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <rect
                    x='1'
                    y='1'
                    width='10'
                    height='10'
                    rx='3'
                    stroke='currentColor'
                    strokeWidth='1.2'
                />
                <circle
                    cx='6'
                    cy='6'
                    r='2'
                    stroke='currentColor'
                    strokeWidth='1.2'
                />
                <circle cx='8.75' cy='3.25' r='0.75' fill='currentColor' />
            </svg>
            Instagram
        </span>
    );
}

// ─────────────────────────────────────────────
// 노출 상태 배지
// ─────────────────────────────────────────────
function VisibilityBadge({ isVisible }: { isVisible: boolean }) {
    if (isVisible) {
        return (
            <span className='inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#dcfce7] text-[#016630]'>
                <svg
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M6 2C3.6 2 1.6 3.76 1 6c.6 2.24 2.6 4 5 4s4.4-1.76 5-4c-.6-2.24-2.6-4-5-4Zm0 6.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm0-4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z'
                        fill='currentColor'
                    />
                </svg>
                노출
            </span>
        );
    }
    return (
        <span className='inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f3f4f6] text-[#1e2939]'>
            비노출
        </span>
    );
}

// ─────────────────────────────────────────────
// 외부 링크 버튼
// ─────────────────────────────────────────────
function ExternalLinkButton() {
    return (
        <button className='flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[#f3f4f6] transition-colors text-[#6a7282] hover:text-[#101828]'>
            <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3M9 2h5m0 0v5m0-5L7 10'
                    stroke='currentColor'
                    strokeWidth='1.3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            </svg>
        </button>
    );
}

// ─────────────────────────────────────────────
// 메인 컴포넌트
// ─────────────────────────────────────────────
const RecipeGroupDetail = () => {
    const { sno } = useParams<{ sno: string }>();
    const detail = sno ? MOCK_DETAIL[sno] : null;

    if (!detail) {
        return (
            <div className='flex-1 p-6 flex items-center justify-center'>
                <p className='text-sm text-[#6a7282]'>
                    레시피 그룹을 찾을 수 없습니다.
                </p>
            </div>
        );
    }

    return (
        <>
            <PageMeta
                title={`${detail.groupName} | 레시피 그룹 상세`}
                description={detail.description}
            />

            <div className='flex-1 px-6 pt-6 pb-10 flex flex-col gap-6'>
                {/* 뒤로 가기 + 페이지 타이틀 */}
                <div className='flex flex-col gap-3'>
                    <Link
                        to={PATHS.APP.RECIPE_GROUP.LIST}
                        className='inline-flex items-center gap-1.5 text-sm font-medium text-[#0a0a0a] hover:text-[#ff6900] transition-colors w-fit'
                    >
                        <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M10 3L5 8L10 13'
                                stroke='currentColor'
                                strokeWidth='1.3'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                        목록으로
                    </Link>
                    <h1 className='text-2xl font-bold text-[#101828] tracking-tight'>
                        레시피 그룹 상세
                    </h1>
                </div>

                {/* 그룹 기본 정보 카드 */}
                <div className='bg-white border border-[#e5e7eb] rounded-2xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] px-6 pt-6 pb-5'>
                    <div className='grid grid-cols-2 gap-x-6 gap-y-6'>
                        {/* 그룹 아이디 */}
                        <div className='flex flex-col gap-1.5'>
                            <span className='text-xs font-normal text-[#6a7282]'>
                                그룹 아이디
                            </span>
                            <span className='inline-block w-fit bg-[#f3f4f6] rounded-lg px-2.5 py-1 font-mono text-xs text-[#364153]'>
                                {detail.groupId}
                            </span>
                        </div>

                        {/* 그룹명 */}
                        <div className='flex flex-col gap-1.5'>
                            <span className='text-xs font-normal text-[#6a7282]'>
                                그룹명
                            </span>
                            <span className='text-sm font-medium text-[#101828]'>
                                {detail.groupName}
                            </span>
                        </div>

                        {/* 설명 */}
                        <div className='flex flex-col gap-1.5'>
                            <span className='text-xs font-normal text-[#6a7282]'>
                                설명
                            </span>
                            <span className='text-sm font-normal text-[#364153]'>
                                {detail.description}
                            </span>
                        </div>

                        {/* 노출 상태 + 생성일 */}
                        <div className='flex items-start gap-6'>
                            <div className='flex flex-col gap-1.5'>
                                <span className='text-xs font-normal text-[#6a7282]'>
                                    노출 상태
                                </span>
                                <VisibilityBadge isVisible={detail.isVisible} />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <span className='text-xs font-normal text-[#6a7282]'>
                                    생성일
                                </span>
                                <span className='text-sm font-normal text-[#364153]'>
                                    {detail.createdAt}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 레시피 목록 카드 */}
                <div className='bg-white border border-[#e5e7eb] rounded-2xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] overflow-hidden'>
                    {/* 카드 헤더 */}
                    <div className='px-6 py-4 border-b border-[#e5e7eb]'>
                        <h2 className='text-sm font-semibold text-[#101828]'>
                            레시피 목록 ({detail.recipes.length}개)
                        </h2>
                    </div>

                    {/* 테이블 */}
                    <div className='overflow-x-auto'>
                        <table className='w-full'>
                            <thead>
                                <tr className='bg-[#f9fafb] border-b border-[#e5e7eb]'>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282] w-[90px]'>
                                        썸네일
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282]'>
                                        제목
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282] w-[150px]'>
                                        작성자
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282] w-[150px]'>
                                        소스
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282] w-[110px]'>
                                        조회수
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282] w-[100px]'>
                                        좋아요
                                    </th>
                                    <th className='px-6 py-3 text-right text-xs font-medium uppercase text-[#6a7282] w-[80px]'>
                                        작업
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {detail.recipes.map((recipe) => (
                                    <tr
                                        key={recipe.id}
                                        className={`border-b border-[#e5e7eb] last:border-b-0 hover:bg-[#fafafa] transition-colors`}
                                    >
                                        {/* 썸네일 */}
                                        <td className='px-6 py-4'>
                                            <div className='flex items-center justify-center w-10 h-10 bg-[#f3f4f6] rounded-xl text-xl shadow-sm'>
                                                {recipe.emoji}
                                            </div>
                                        </td>

                                        {/* 제목 */}
                                        <td className='px-6 py-4'>
                                            <span className='text-[14px] font-medium text-[#101828]'>
                                                {recipe.title}
                                            </span>
                                        </td>

                                        {/* 작성자 */}
                                        <td className='px-6 py-4'>
                                            <span className='text-[14px] font-normal text-[#6a7282]'>
                                                {recipe.author}
                                            </span>
                                        </td>

                                        {/* 소스 */}
                                        <td className='px-6 py-4'>
                                            <SourceBadge
                                                source={recipe.source}
                                            />
                                        </td>

                                        {/* 조회수 */}
                                        <td className='px-6 py-4'>
                                            <span className='text-[14px] font-normal text-[#6a7282]'>
                                                {recipe.views.toLocaleString()}
                                            </span>
                                        </td>

                                        {/* 좋아요 */}
                                        <td className='px-6 py-4'>
                                            <span className='text-[14px] font-normal text-[#6a7282]'>
                                                {recipe.likes.toLocaleString()}
                                            </span>
                                        </td>

                                        {/* 작업 */}
                                        <td className='px-6 py-4 text-right'>
                                            <ExternalLinkButton />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecipeGroupDetail;
