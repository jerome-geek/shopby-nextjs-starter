import { Link, useParams } from 'react-router';

import PageMeta from '@/components/common/PageMeta';
import { PATHS } from '@/const/paths';
import { ReactComponent as YoutubeSimpleIcon } from '@/icons/youtube-simple.svg?react';
import { ReactComponent as InstagramSimpleIcon } from '@/icons/instagram-simple.svg?react';
import { ReactComponent as EyeSmallIcon } from '@/icons/eye-small.svg?react';
import { ReactComponent as ExternalLinkIcon } from '@/icons/external-link.svg?react';
import { ReactComponent as ChevronLeftSmallIcon } from '@/icons/chevron-left-small.svg?react';

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

interface CollectionGroupDetailData {
    groupId: string;
    groupName: string;
    description: string;
    isVisible: boolean;
    createdAt: string;
    collectionName: string;
    collectionAuthor: string;
    collectionId: string;
    recipes: Recipe[];
}

const MOCK_DETAIL: Record<string, CollectionGroupDetailData> = {
    collection_group_1: {
        groupId: 'collection_group_1',
        groupName: '인기 컬렉션',
        description: '사용자들이 가장 많이 저장한 컬렉션',
        isVisible: true,
        createdAt: '2026-03-15',
        collectionName: '간편한 한끼 레시피',
        collectionAuthor: 'user123',
        collectionId: 'col_001',
        recipes: [
            {
                id: 'r1',
                emoji: '🍲',
                title: '10분만에 완성! 김치찌개 황금 레시피',
                author: '요리왕김치',
                source: 'YouTube',
                views: 12500,
                likes: 890,
            },
            {
                id: 'r2',
                emoji: '🍳',
                title: '폭신폭신 계란말이 만들기',
                author: '쿡스타그램',
                source: 'Instagram',
                views: 8900,
                likes: 650,
            },
            {
                id: 'r3',
                emoji: '🥘',
                title: '집밥 된장찌개 레시피',
                author: '엄마손요리',
                source: 'YouTube',
                views: 15200,
                likes: 1100,
            },
        ],
    },
    collection_group_2: {
        groupId: 'collection_group_2',
        groupName: '계절 특집',
        description: '봄 시즌 추천 레시피 컬렉션',
        isVisible: true,
        createdAt: '2026-03-10',
        collectionName: '봄나물 요리',
        collectionAuthor: 'user456',
        collectionId: 'col_002',
        recipes: [
            {
                id: 'r4',
                emoji: '🌿',
                title: '향긋한 봄나물 비빔밥',
                author: '나물요리사',
                source: 'YouTube',
                views: 9800,
                likes: 720,
            },
        ],
    },
    collection_group_3: {
        groupId: 'collection_group_3',
        groupName: '건강식',
        description: '건강을 생각하는 레시피 모음',
        isVisible: false,
        createdAt: '2026-03-05',
        collectionName: '다이어트 식단',
        collectionAuthor: 'user789',
        collectionId: 'col_003',
        recipes: [
            {
                id: 'r5',
                emoji: '🥗',
                title: '저칼로리 닭가슴살 샐러드',
                author: '헬스쿡',
                source: 'Instagram',
                views: 21000,
                likes: 1800,
            },
        ],
    },
};

// ─────────────────────────────────────────────
// 소스 배지 컴포넌트
// ─────────────────────────────────────────────
const SourceBadge = ({ source }: { source: RecipeSource }) => {
    if (source === 'YouTube') {
        return (
            <span className='inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ffe2e2] text-[#9f0712]'>
                <YoutubeSimpleIcon className='w-3 h-3' />
                YouTube
            </span>
        );
    }
    return (
        <span className='inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#fce7f3] text-[#a3004c]'>
            <InstagramSimpleIcon className='w-3 h-3' />
            Instagram
        </span>
    );
};

// ─────────────────────────────────────────────
// 노출 상태 배지
// ─────────────────────────────────────────────
const VisibilityBadge = ({ isVisible }: { isVisible: boolean }) => {
    if (isVisible) {
        return (
            <span className='inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#dcfce7] text-[#016630]'>
                <EyeSmallIcon className='w-3 h-3' />
                노출
            </span>
        );
    }
    return (
        <span className='inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f3f4f6] text-[#1e2939]'>
            숨김
        </span>
    );
};

// ─────────────────────────────────────────────
// 외부 링크 버튼
// ─────────────────────────────────────────────
const ExternalLinkButton = () => {
    return (
        <button className='flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[#f3f4f6] transition-colors text-[#6a7282] hover:text-[#101828]'>
            <ExternalLinkIcon className='w-4 h-4' />
        </button>
    );
};

// ─────────────────────────────────────────────
// 메인 컴포넌트
// ─────────────────────────────────────────────
const CollectionGroupDetail = () => {
    const { sno } = useParams<{ sno: string }>();
    const detail = sno ? MOCK_DETAIL[sno] : null;

    if (!detail) {
        return (
            <div className='flex-1 p-6 flex items-center justify-center'>
                <p className='text-sm text-[#6a7282]'>
                    컬렉션 그룹을 찾을 수 없습니다.
                </p>
            </div>
        );
    }

    return (
        <>
            <PageMeta
                title={`${detail.groupName} | 컬렉션 그룹 상세`}
                description={detail.description}
            />

            <div className='flex-1 px-6 pt-6 pb-10 flex flex-col gap-6'>
                {/* 뒤로 가기 + 페이지 타이틀 */}
                <div className='flex flex-col gap-3'>
                    <Link
                        to={PATHS.APP.COLLECTION_GROUP.LIST}
                        className='inline-flex items-center gap-1.5 text-sm font-medium text-[#0a0a0a] hover:text-[#ff6900] transition-colors w-fit'
                    >
                        <ChevronLeftSmallIcon className='w-4 h-4' />
                        목록으로
                    </Link>
                    <h1 className='text-2xl font-bold text-[#101828] tracking-tight'>
                        컬렉션 그룹 상세
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

                {/* 컬렉션 정보 카드 */}
                <div className='bg-white border border-[#e5e7eb] rounded-2xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] px-6 pt-5 pb-5 flex flex-col gap-4'>
                    <h2 className='text-sm font-semibold text-[#101828]'>
                        컬렉션 정보
                    </h2>
                    <div className='bg-[#fff7ed] border border-[#ffd6a8] rounded-xl px-4 pt-4 pb-4'>
                        <div className='grid grid-cols-2 gap-x-6 gap-y-4'>
                            {/* 컬렉션명 */}
                            <div className='flex flex-col gap-1'>
                                <span className='text-xs font-normal text-[#6a7282]'>
                                    컬렉션명
                                </span>
                                <span className='text-sm font-medium text-[#101828]'>
                                    {detail.collectionName}
                                </span>
                            </div>
                            {/* 작성자 */}
                            <div className='flex flex-col gap-1'>
                                <span className='text-xs font-normal text-[#6a7282]'>
                                    작성자
                                </span>
                                <span className='text-sm font-medium text-[#101828]'>
                                    {detail.collectionAuthor}
                                </span>
                            </div>
                            {/* 컬렉션 아이디 */}
                            <div className='flex flex-col gap-1'>
                                <span className='text-xs font-normal text-[#6a7282]'>
                                    컬렉션 아이디
                                </span>
                                <span className='font-mono text-xs text-[#364153]'>
                                    {detail.collectionId}
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
                                {detail.recipes.map((recipe, idx) => (
                                    <tr
                                        key={recipe.id}
                                        className={`border-b border-[#e5e7eb] last:border-b-0 hover:bg-[#fafafa] transition-colors ${
                                            idx % 2 === 0 ? '' : ''
                                        }`}
                                    >
                                        {/* 썸네일 */}
                                        <td className='px-6 py-4'>
                                            <div className='flex items-center justify-center w-12 h-12 bg-[#f3f4f6] rounded-xl text-2xl'>
                                                {recipe.emoji}
                                            </div>
                                        </td>

                                        {/* 제목 */}
                                        <td className='px-6 py-4'>
                                            <span className='text-sm font-medium text-[#101828]'>
                                                {recipe.title}
                                            </span>
                                        </td>

                                        {/* 작성자 */}
                                        <td className='px-6 py-4'>
                                            <span className='text-sm font-normal text-[#4a5565]'>
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
                                            <span className='text-sm font-normal text-[#4a5565]'>
                                                {recipe.views.toLocaleString()}
                                            </span>
                                        </td>

                                        {/* 좋아요 */}
                                        <td className='px-6 py-4'>
                                            <span className='text-sm font-normal text-[#4a5565]'>
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

export default CollectionGroupDetail;
