'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

import { SmallCaretIcon } from '@/components/icons';
import { css } from '@/styled-system/css';
import { flex, vstack } from '@/styled-system/patterns';

interface ProductDescriptionProps {
    children: ReactNode;
    threshold?: number;
}

export default function ProductDescription({
    children,
    threshold = 600,
}: ProductDescriptionProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflow, setIsOverflow] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            if (contentRef.current.scrollHeight > threshold) {
                setIsOverflow(true);
            }
        }
    }, [threshold, children]);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <div className={vstack({ width: '100%', alignItems: 'stretch' })}>
            <div
                ref={contentRef}
                className={css({
                    position: 'relative',
                    overflow: 'hidden',
                    maxHeight: isExpanded ? 'none' : `${threshold}px`,
                    transition: 'max-height 0.3s ease-in-out',
                })}
            >
                {children}

                {isOverflow && !isExpanded && (
                    <div
                        className={css({
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: '160px',
                            background:
                                'linear-gradient(to bottom, transparent, white)',
                            pointerEvents: 'none',
                        })}
                    />
                )}
            </div>

            {isOverflow && (
                <button
                    type='button'
                    onClick={toggleExpand}
                    className={flex({
                        width: '100%',
                        height: '52px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        border: '1px solid {colors.gray20}',
                        borderRadius: '8px',
                        marginTop: '20px',
                        cursor: 'pointer',
                        backgroundColor: 'white',
                    })}
                >
                    <span
                        className={css({
                            fontSize: '1.4rem',
                            fontWeight: '500',
                            color: 'black',
                        })}
                    >
                        {isExpanded ? '상품 정보 접기' : '상품 정보 더보기'}
                    </span>
                    <SmallCaretIcon
                        direction={isExpanded ? 'up' : 'down'}
                        className={css({ color: 'gray60' })}
                    />
                </button>
            )}
        </div>
    );
}
