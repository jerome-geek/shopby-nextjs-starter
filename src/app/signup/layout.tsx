import type { ReactNode } from 'react';

import { css } from '@/styled-system/css';

export default function SignupLayout({
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
                maxWidth: { base: '100%', md: '500px' },
                marginX: 'auto',
            })}
        >
            {children}
        </div>
    );
}
