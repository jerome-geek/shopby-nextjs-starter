import { ReactNode } from 'react';

import * as styles from '@/shared/components/only/index.css';

export interface OnlyProps {
    children: ReactNode;
    className?: string;
}

function Mobile({ children, className }: OnlyProps) {
    return (
        <div className={`${styles.responsiveRecipe({ view: 'mobile' })} ${className ?? ''}`}>
            {children}
        </div>
    );
}

function Desktop({ children, className }: OnlyProps) {
    return (
        <div className={`${styles.responsiveRecipe({ view: 'desktop' })} ${className ?? ''}`}>
            {children}
        </div>
    );
}

export const Only = {
    Mobile,
    Desktop,
};
