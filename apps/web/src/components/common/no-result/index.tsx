import { CircleAlert } from 'lucide-react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/common/no-result/index.css';

export interface NoResultProps extends HTMLAttributes<HTMLDivElement> {
    icon?: ReactNode;
    isIconVisible?: boolean;
    text?: string | ReactNode;
    button?: ReactNode;
    textStyles?: CSSProperties;
}

export const NoResult = ({
    text = '',
    icon = <CircleAlert />,
    isIconVisible = true,
    button,
    textStyles,
    ...props
}: NoResultProps) => {
    const { t } = useTranslation();

    return (
        <div className={styles.noResult} {...props}>
            {isIconVisible && icon}
            {typeof text === 'string' ? (
                <p style={textStyles}>{text || t('검색 결과가 없습니다.')}</p>
            ) : (
                text
            )}
            {button}
        </div>
    );
};
