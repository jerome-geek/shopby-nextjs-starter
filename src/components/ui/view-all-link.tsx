import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

import { css, cx } from '@/styled-system/css';
import { SystemStyleObject } from '@/styled-system/types';

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
    /** 추가적인 텍스트 스타일 */
    textStyle?: SystemStyleObject;
}

export default function ViewAllLink({
    href,
    children,
    className,
    color = '#888',
    hoverColor = '#333',
    fontSize = '12px',
    gap = '8px',
    textStyle,
    ...props
}: ViewAllLinkProps) {
    return (
        <Link
            href={href}
            {...props}
            className={cx(
                css({
                    display: 'inline-flex',
                    alignItems: 'center',
                    position: 'relative',
                    transition: 'color 0.2s, font-weight 0.2s',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    // 외부 주입 스타일
                    color,
                    fontSize,
                    paddingRight: gap,
                    _hover: {
                        color: hoverColor,
                    },
                    _after: {
                        content: '""',
                        position: 'absolute',
                        right: '0',
                        top: '50%',
                        width: '5px',
                        height: '5px',
                        borderTop: '1.2px solid currentColor',
                        borderRight: '1.2px solid currentColor',
                        transform: 'translateY(-50%) rotate(45deg)',
                        marginTop: '0.5px', // 시각적 중앙 보정
                        transition: 'transform 0.2s',
                    },
                    ...textStyle,
                }),
                className
            )}
        >
            {children}
        </Link>
    );
}
