import { Suspense } from '@suspensive/react';
import { type ReactNode } from 'react';

import { css } from '@/styled-system/css';

export default function AuthLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>): ReactNode {
    return (
        <div
            className={css({
                paddingX: { base: '20px', lg: '0' },
                paddingY: { base: '20px', md: '80px' },
                width: '100%',
                maxWidth: '500px',
                marginX: 'auto',
                minHeight: '80vh',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            })}
        >
            <Suspense fallback={<div>로딩중...</div>}>{children}</Suspense>
        </div>
    );
}
