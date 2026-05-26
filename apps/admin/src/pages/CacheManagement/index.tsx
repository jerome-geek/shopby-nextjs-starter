import { overlay } from 'overlay-kit';
import { useState } from 'react';

import { revalidatePath } from '@/api/revalidate';
import PageMeta from '@/components/common/PageMeta';
import SelectEventModal from '@/components/modal/select-event';
import SelectProductModal from '@/components/modal/select-product';
import useApiError from '@/hooks/useApiError';
import { useToast } from '@/hooks/utils';

interface StaticPage {
    name: string;
    description: string;
    path: string;
}

const STATIC_PAGES: StaticPage[] = [
    { name: '메인 페이지', description: '홈 화면', path: '/' },
    { name: '발견 페이지', description: '쇼핑 발견', path: '/shop' },
    { name: '키즈 페이지', description: '키즈 전용관', path: '/shop/kids' },
    { name: '라이프 페이지', description: '라이프 전용관', path: '/shop/life' },
    {
        name: '로그인 페이지',
        description: '로그인 화면',
        path: '/login',
    },
    { name: '특가 페이지', description: '타임특가', path: '/time-sale' },
    {
        name: '베스트 상품',
        description: '베스트 상품 목록',
        path: '/products/best',
    },
    {
        name: '신상품',
        description: '신상품 목록',
        path: '/products/new',
    },
    {
        name: '기획전 목록',
        description: '기획전 리스트',
        path: '/events',
    },
];

const StaticPageCard = ({ page }: { page: StaticPage }) => {
    const { addToast } = useToast();
    const { handleErrorToast } = useApiError();
    const [isLoading, setIsLoading] = useState(false);

    const handleRevalidate = async () => {
        setIsLoading(true);
        try {
            await revalidatePath(page.path);
            addToast({
                variant: 'success',
                message: `[${page.name}] 캐시를 갱신했습니다.`,
            });
        } catch (error) {
            handleErrorToast(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex flex-col gap-4 rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm'>
            <div className='flex flex-col gap-1'>
                <span className='text-sm font-semibold text-[#101828]'>
                    {page.name}
                </span>
                <span className='text-xs text-[#6a7282]'>
                    {page.description}
                </span>
                <span className='mt-1 font-mono text-xs text-[#9ca3af]'>
                    {page.path}
                </span>
            </div>
            <button
                type='button'
                onClick={handleRevalidate}
                disabled={isLoading}
                className='h-9 w-full rounded-lg border border-[#e5e7eb] bg-white text-sm font-medium text-[#364153] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
            >
                {isLoading ? '갱신 중...' : '캐시 갱신'}
            </button>
        </div>
    );
};

interface DynamicPage {
    name: string;
    description: string;
    pathTemplate: string;
    onSelect: () => void;
}

const DynamicPageCard = ({ page }: { page: DynamicPage }) => (
    <div className='flex flex-col gap-4 rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm'>
        <div className='flex flex-col gap-1'>
            <span className='text-sm font-semibold text-[#101828]'>
                {page.name}
            </span>
            <span className='text-xs text-[#6a7282]'>{page.description}</span>
            <span className='mt-1 font-mono text-xs text-[#9ca3af]'>
                {page.pathTemplate}
            </span>
        </div>
        <button
            type='button'
            onClick={page.onSelect}
            className='h-9 w-full rounded-lg bg-[#ff6900] text-sm font-medium text-white transition-colors hover:bg-orange-600'
        >
            페이지 선택
        </button>
    </div>
);

const CacheManagement = () => {
    const openProductModal = () => {
        overlay.open((props) => <SelectProductModal {...props} />);
    };

    const openEventModal = () => {
        overlay.open((props) => <SelectEventModal {...props} />);
    };

    const dynamicPages: DynamicPage[] = [
        {
            name: '상품 상세 페이지',
            description: '개별 상품 상세',
            pathTemplate: '/products/[productNo]',
            onSelect: openProductModal,
        },
        {
            name: '기획전 상세 페이지',
            description: '개별 기획전 상세',
            pathTemplate: '/events/[eventNoOrId]',
            onSelect: openEventModal,
        },
    ];

    return (
        <>
            <PageMeta
                title='ISR 캐시 관리'
                description='웹 페이지의 ISR 캐시를 수동으로 갱신합니다.'
            />
            <div className='flex flex-col gap-8'>
                <div>
                    <h2 className='text-xl font-bold text-[#101828]'>
                        ISR 캐시 관리
                    </h2>
                    <p className='mt-1 text-sm text-[#6a7282]'>
                        정보 변경 후 웹에 바로 반영되지 않을 경우, 해당 페이지의
                        캐시를 직접 갱신하세요.
                    </p>
                </div>

                <section className='flex flex-col gap-4'>
                    <h3 className='text-sm font-semibold uppercase tracking-wide text-[#6a7282]'>
                        정적 페이지
                    </h3>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                        {STATIC_PAGES.map((page) => (
                            <StaticPageCard key={page.path} page={page} />
                        ))}
                    </div>
                </section>

                <section className='flex flex-col gap-4'>
                    <h3 className='text-sm font-semibold uppercase tracking-wide text-[#6a7282]'>
                        동적 페이지
                    </h3>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                        {dynamicPages.map((page) => (
                            <DynamicPageCard
                                key={page.pathTemplate}
                                page={page}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default CacheManagement;
