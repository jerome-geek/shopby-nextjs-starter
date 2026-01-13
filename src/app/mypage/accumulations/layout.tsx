import React from 'react';

import AccumulationSummary from '@/components/mypage/accumulation/Summary';
import MypageSearchPeriod from '@/components/mypage/search-period';
import { VStack } from '@/styled-system/jsx';

export default function AccumulationsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <VStack gap='10' alignItems='stretch'>
            <AccumulationSummary />

            <VStack alignItems='stretch'>
                <MypageSearchPeriod />
                {children}
            </VStack>
        </VStack>
    );
}
