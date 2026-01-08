'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Paging from '@/components/ui/paging';

interface SearchPagingProps {
    totalCount: number;
    pageSize: number;
}

export default function SearchPaging({
    totalCount,
    pageSize,
}: SearchPagingProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get('pageNumber')) || 1;

    const handlePageClick = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('pageNumber', pageNumber.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <Paging
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={pageSize}
            onPageClick={handlePageClick}
        />
    );
}
