import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLenis } from 'lenis/react';

import * as styles from '@/features/product/components/product-tabs/index.css';

const MAX_HEIGHT_PX = 800;

const ProductContents = ({
    content,
    onClick,
}: {
    content?: string;
    onClick: () => void;
}) => {
    const contentRef = useRef<HTMLDivElement | null>(null);

    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);

    const sanitizedContent = useMemo(() => content || '', [content]);

    useEffect(() => {
        const element = contentRef.current;

        if (!element) {
            return;
        }

        const setOverflowing = () => {
            setIsOverflowing(element.scrollHeight > MAX_HEIGHT_PX);
        };

        setOverflowing();

        const resizeObserver = new ResizeObserver(() => setOverflowing());
        resizeObserver.observe(element);

        const onLoad = () => setOverflowing();
        element.addEventListener('load', onLoad, true);

        return () => {
            resizeObserver.disconnect();
            element.removeEventListener('load', onLoad, true);
        };
    }, [sanitizedContent]);

    const lenis = useLenis();

    return (
        <>
            <div className={styles.descriptionContentWrapper}>
                <div
                    ref={contentRef}
                    className={[
                        styles.descriptionText,
                        !isExpanded &&
                            isOverflowing &&
                            styles.descriptionTextCollapsed,
                    ]
                        .filter(Boolean)
                        .join(' ')}
                    dangerouslySetInnerHTML={{
                        __html: sanitizedContent,
                    }}
                />
                {!isExpanded && isOverflowing && (
                    <div className={styles.descriptionFade} />
                )}
            </div>

            {isOverflowing && (
                <button
                    type='button'
                    className={styles.descriptionToggleButton}
                    onClick={() => {
                        setIsExpanded((prev) => !prev);

                        if (isExpanded) {
                            onClick();
                        }
                    }}
                    aria-expanded={isExpanded}
                >
                    {isExpanded ? (
                        <ChevronUp className={styles.descriptionToggleIcon} />
                    ) : (
                        <ChevronDown className={styles.descriptionToggleIcon} />
                    )}
                    {isExpanded ? '상품 정보 접기' : '상품 정보 더보기'}
                </button>
            )}
        </>
    );
};

export default memo(ProductContents);
