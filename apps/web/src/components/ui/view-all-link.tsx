import Link, { LinkProps } from 'next/link';
import { CSSProperties, ReactNode } from 'react';
import * as styles from './view-all-link.css';

interface ViewAllLinkProps extends LinkProps {
    children: ReactNode;
    className?: string;
    /** 색상 지정 (기본: #888 / hover: #333) */
    color?: string;
    /** 호버 시 색상 */
    hoverColor?: string;
    /** 폰트 크기 (기본: 12px) */
    fontSize?: string | number;
    /** 화살표와의 간격 (기본: 8px) */
    gap?: string | number;
    /** 추가적인 인라인 스타일 */
    style?: CSSProperties;
}

export const ViewAllLink = ({
    href = '/',
    children,
    className,
    color = '#888',
    hoverColor = '#333',
    fontSize = '12px',
    gap = '8px',
    style,
    ...props
}: ViewAllLinkProps) => {
    const inlineStyle: CSSProperties = {
        color,
        fontSize,
        paddingRight: gap,
        ...style,
    };

    return (
        <Link
            href={href}
            {...props}
            className={`${styles.viewAllLink()} ${className || ''}`}
            style={inlineStyle}
            onMouseEnter={(e) => {
                e.currentTarget.style.color = hoverColor;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.color = color;
            }}
        >
            {children}
        </Link>
    );
}
