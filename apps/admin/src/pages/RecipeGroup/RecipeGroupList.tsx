import { useState } from 'react';
import { Link } from 'react-router';

import PageMeta from '@/components/common/PageMeta';
import { PATHS } from '@/const/paths';
import RecipeOrderManagementModal from '@/components/modal/RecipeOrderManagementModal';
import CreateRecipeGroupModal from '@/components/modal/CreateRecipeGroupModal';
import { ReactComponent as EyeSmallIcon } from '@/icons/eye-small.svg?react';
import { ReactComponent as EyeOffIcon } from '@/icons/eye-off.svg?react';
import { ReactComponent as GridDotsIcon } from '@/icons/grid-dots.svg?react';
import { ReactComponent as PlusSimpleIcon } from '@/icons/plus-simple.svg?react';
import { ReactComponent as SearchIcon } from '@/icons/search.svg?react';
import { ReactComponent as PencilSimpleIcon } from '@/icons/pencil-simple.svg?react';
import { ReactComponent as TrashSimpleIcon } from '@/icons/trash-simple.svg?react';

type RecipeGroupStatus = '노출' | '비노출';

interface RecipeGroup {
    id: string;
    groupName: string;
    description: string;
    recipeName: string;
    status: RecipeGroupStatus;
    createdAt: string;
}

const MOCK_DATA: RecipeGroup[] = [
    {
        id: 'recipe_group_1',
        groupName: '인기 레시피',
        description: '가장 많이 조회된 레시피',
        recipeName: '김치찌개 황금레시피',
        status: '노출',
        createdAt: '2026-03-15',
    },
    {
        id: 'recipe_group_1',
        groupName: '인기 레시피 2',
        description: '두 번째로 인기있는 레시피',
        recipeName: '크림 파스타',
        status: '노출',
        createdAt: '2026-03-16',
    },
    {
        id: 'recipe_group_1',
        groupName: '인기 레시피 3',
        description: '세 번째로 인기있는 레시피',
        recipeName: '김밥 만들기',
        status: '노출',
        createdAt: '2026-03-17',
    },
    {
        id: 'recipe_group_2',
        groupName: '계절 특집',
        description: '봄 시즌 추천 레시피',
        recipeName: '봄나물 비빔밥',
        status: '노출',
        createdAt: '2026-03-10',
    },
    {
        id: 'recipe_group_3',
        groupName: '다이어트',
        description: '건강한 다이어트 레시피',
        recipeName: '닭가슴살 샐러드',
        status: '비노출',
        createdAt: '2026-03-05',
    },
];

const StatusBadge = ({ status }: { status: RecipeGroupStatus }) => {
    if (status === '노출') {
        return (
            <span className='inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#dcfce7] text-[#016630] text-xs font-medium whitespace-nowrap'>
                <EyeSmallIcon className='w-3 h-3 text-[#016630]' />
                노출
            </span>
        );
    }
    return (
        <span className='inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f3f4f6] text-[#1e2939] text-xs font-medium whitespace-nowrap'>
            <EyeOffIcon className='w-3 h-3 text-[#1e2939]' />
            비노출
        </span>
    );
}

const RecipeGroupList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const filteredData = MOCK_DATA.filter(
        (item) =>
            item.groupName.includes(searchQuery) ||
            item.recipeName.includes(searchQuery) ||
            item.id.includes(searchQuery),
    );

    return (
        <>
            <PageMeta
                title='레시피 그룹 관리 | JollyPot 관리자'
                description='레시피 그룹을 관리합니다'
            />
            <div className='flex flex-col gap-6 pt-6 px-6'>
                {/* 페이지 헤더 */}
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-2xl font-bold leading-8 tracking-[0.07px] text-[#101828]'>
                            레시피 그룹 관리
                        </h2>
                        <p className='text-base font-normal leading-6 tracking-[-0.31px] text-[#6a7282]'>
                            레시피 그룹을 관리합니다
                        </p>
                    </div>

                    {/* 액션 버튼 영역 */}
                    <div className='flex items-center gap-3'>
                        {/* 순서 관리 버튼 */}
                        <button
                            onClick={() => setIsOrderModalOpen(true)}
                            className='flex items-center gap-2 h-9 px-3 rounded-lg border border-[#ff6900] bg-white text-[#ff6900] text-sm font-medium transition-colors hover:bg-orange-50'
                        >
                            <GridDotsIcon className='w-4 h-4 text-[#ff6900]' />
                            순서 관리
                        </button>

                        {/* 그룹 생성 버튼 */}
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className='flex items-center gap-2 h-9 px-3 rounded-lg bg-[#ff6900] text-white text-sm font-medium transition-colors hover:bg-orange-600'
                        >
                            <PlusSimpleIcon className='w-4 h-4 text-white' />
                            그룹 생성
                        </button>
                    </div>
                </div>

                {/* 테이블 카드 */}
                <div className='bg-white border border-[#e5e7eb] rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] overflow-hidden'>
                    {/* 검색 영역 */}
                    <div className='px-4 py-4 border-b border-[#e5e7eb]'>
                        <div className='relative'>
                            <span className='absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#717182] flex items-center justify-center w-4 h-4'>
                                <SearchIcon className='w-full h-full' />
                            </span>
                            <input
                                type='text'
                                placeholder='그룹명으로 검색...'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='w-full h-9 pl-10 pr-3 py-1 bg-[#f3f3f5] rounded-lg text-sm text-[#101828] placeholder:text-[#99a1af] focus:outline-none focus:ring-2 focus:ring-[#ff6900]/20 focus:bg-white transition-colors'
                            />
                        </div>
                    </div>

                    {/* 테이블 */}
                    <div className='overflow-x-auto'>
                        <table className='w-full min-w-[900px]'>
                            <thead>
                                <tr className='bg-[#f9fafb] border-b border-[#e5e7eb]'>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282] w-[170px]'>
                                        그룹 아이디
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282]'>
                                        그룹명
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282]'>
                                        레시피
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282] w-[130px]'>
                                        노출여부
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase text-[#6a7282] w-[130px]'>
                                        생성일
                                    </th>
                                    <th className='px-6 py-3 text-right text-xs font-medium uppercase text-[#6a7282] w-[100px]'>
                                        작업
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
                                    filteredData.map((item, idx) => (
                                        <tr
                                            key={`${item.id}-${idx}`}
                                            className='border-b border-[#e5e7eb] last:border-b-0 hover:bg-[#fafafa] transition-colors'
                                        >
                                            {/* 그룹 아이디 */}
                                            <td className='px-6 py-5'>
                                                <span className='inline-block font-mono text-sm font-medium text-[#6a7282]'>
                                                    {item.id}
                                                </span>
                                            </td>

                                            {/* 그룹명 */}
                                            <td className='px-6 py-5'>
                                                <div className='flex flex-col gap-1'>
                                                    <Link
                                                        to={PATHS.APP.RECIPE_GROUP.DETAIL.replace(
                                                            ':sno',
                                                            item.id,
                                                        )}
                                                        className='text-[15px] font-semibold text-[#ff6900] hover:underline'
                                                    >
                                                        {item.groupName}
                                                    </Link>
                                                    <span className='text-xs font-normal text-[#6a7282]'>
                                                        {item.description}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* 레시피 */}
                                            <td className='px-6 py-5'>
                                                <span className='text-sm font-medium text-[#364153]'>
                                                    {item.recipeName}
                                                </span>
                                            </td>

                                            {/* 노출여부 */}
                                            <td className='px-6 py-5'>
                                                <StatusBadge
                                                    status={item.status}
                                                />
                                            </td>

                                            {/* 생성일 */}
                                            <td className='px-6 py-5'>
                                                <span className='text-sm font-normal text-[#6a7282]'>
                                                    {item.createdAt}
                                                </span>
                                            </td>

                                            {/* 작업 버튼 */}
                                            <td className='px-6 py-5 text-right'>
                                                <div className='flex items-center justify-end gap-2'>
                                                    {/* 수정 버튼 */}
                                                    <button
                                                        className='flex items-center justify-center w-8 h-8 rounded-lg text-[#364153] hover:bg-gray-100 transition-colors'
                                                        aria-label='수정'
                                                    >
                                                        <PencilSimpleIcon className='w-4 h-4 text-[#364153]' />
                                                    </button>

                                                    {/* 삭제 버튼 */}
                                                    <button
                                                        className='flex items-center justify-center w-8 h-8 rounded-lg text-[#f54900] hover:bg-red-50 transition-colors'
                                                        aria-label='삭제'
                                                    >
                                                        <TrashSimpleIcon className='w-4 h-4 text-[#f54900]' />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 순서 관리 모달 */}
            <RecipeOrderManagementModal
                isOpen={isOrderModalOpen}
                close={() => setIsOrderModalOpen(false)}
                unmount={() => setIsOrderModalOpen(false)}
            />

            {/* 그룹 생성 모달 */}
            <CreateRecipeGroupModal
                isOpen={isCreateModalOpen}
                close={() => setIsCreateModalOpen(false)}
                unmount={() => setIsCreateModalOpen(false)}
            />
        </>
    );
};

export default RecipeGroupList;
