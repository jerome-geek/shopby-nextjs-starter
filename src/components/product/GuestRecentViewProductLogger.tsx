'use client';

import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

interface GuestRecentViewProductLoggerProps {
    productNo: number;
}

/**
 * 비회원(게스트)의 최근 본 상품을 로컬스토리지에 기록하는 컴포넌트입니다.
 */
export default function GuestRecentViewProductLogger({
    productNo,
}: GuestRecentViewProductLoggerProps) {
    const [_, setMallProductNos] = useLocalStorage<number[]>(
        'GUEST_RECENT_VIEW_PRODUCT',
        []
    );

    useEffect(() => {
        setMallProductNos((prev) => {
            if (prev.includes(productNo)) {
                return prev;
            }
            // 최신 항목을 앞에 추가하고 최대 50개까지만 유지
            return [productNo, ...prev].slice(0, 50);
        });
    }, [productNo, setMallProductNos]);

    return null;
}
