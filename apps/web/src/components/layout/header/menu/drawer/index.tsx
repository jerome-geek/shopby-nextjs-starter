import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

import * as styles from '@/components/layout/header/menu/index.css';
import { PATHS } from '@/const/paths';
import { useSuspenseMainCategory } from '@/hooks/useMainCategory';
import { useResponsive } from '@/hooks/utils/useResponsive';

interface MenuDrawerProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export function MenuDrawer({ isOpen, setIsOpen }: MenuDrawerProps) {
    const { mainCategoryChildrenList, oneDepthDefaultCategoryNo } =
        useSuspenseMainCategory();

    const [selectedCategoryNo, setSelectedCategoryNo] = useState<number | null>(
        null,
    );
    const [canScrollRight, setCanScrollRight] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);

    const activeCategoryNo = selectedCategoryNo ?? oneDepthDefaultCategoryNo;

    const activeCategory = useMemo(() => {
        return mainCategoryChildrenList.find(
            (cat) => cat.categoryNo === activeCategoryNo,
        );
    }, [mainCategoryChildrenList, activeCategoryNo]);

    const { isMobile } = useResponsive();

    // 스크롤 가능 여부 체크
    const checkScrollable = () => {
        if (scrollRef.current) {
            const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
            // 여유분 1px
            setCanScrollRight(
                scrollWidth > clientWidth &&
                    scrollWidth - clientWidth > scrollLeft + 1,
            );
        }
    };

    // 카테고리 변경 시 스크롤 체크
    useEffect(() => {
        if (activeCategory) {
            setTimeout(checkScrollable, 0);
        }
    }, [activeCategory]);

    const handleScrollNext = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    // 스크롤 이벤트 리스너
    useEffect(() => {
        const handleScroll = () => {
            checkScrollable();
        };

        const container = scrollRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [activeCategory]);

    // 외부 클릭 닫기
    useEffect(() => {
        const drawerRef = document.getElementById(
            'header-menu-container',
        ) as HTMLDivElement;

        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef && !drawerRef.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {!isMobile && isOpen && (
                <motion.div
                    className={styles.drawerContainer}
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{
                        damping: 50,
                        stiffness: 500,
                        type: 'spring',
                    }}
                    style={{ overflow: 'hidden' }} // 애니메이션 중 내용 넘침 방지
                >
                    <div className={styles.drawerInner}>
                        <div className={styles.sidebar}>
                            {mainCategoryChildrenList?.map((category) => (
                                <button
                                    key={category.categoryNo}
                                    className={styles.sidebarItem}
                                    onClick={() =>
                                        setSelectedCategoryNo(
                                            category.categoryNo,
                                        )
                                    }
                                    onMouseEnter={() =>
                                        setSelectedCategoryNo(
                                            category.categoryNo,
                                        )
                                    }
                                >
                                    <span
                                        className={
                                            activeCategoryNo ===
                                            category.categoryNo
                                                ? styles.sidebarItemActive
                                                : ''
                                        }
                                    >
                                        {category.label}
                                    </span>
                                    {activeCategoryNo ===
                                        category.categoryNo && (
                                        <svg
                                            width='16'
                                            height='16'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            style={{ marginLeft: 'auto' }}
                                        >
                                            <path
                                                d='M9 18L15 12L9 6'
                                                stroke='currentColor'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className={styles.content}>
                            <div className={styles.contentWrapper}>
                                <div
                                    className={styles.scrollContainer}
                                    ref={scrollRef}
                                >
                                    {activeCategory?.children?.map(
                                        (subCategory) => (
                                            <div
                                                key={subCategory.categoryNo}
                                                className={
                                                    styles.subCategoryColumn
                                                }
                                            >
                                                <Link
                                                    href={PATHS.CATEGORIES.DETAIL(
                                                        subCategory.categoryNo,
                                                    )}
                                                    className={
                                                        styles.subCategoryTitle
                                                    }
                                                    onClick={() =>
                                                        setIsOpen(false)
                                                    }
                                                >
                                                    {subCategory.label}
                                                </Link>
                                                {subCategory.children?.map(
                                                    (leafCategory) => (
                                                        <Link
                                                            key={
                                                                leafCategory.categoryNo
                                                            }
                                                            href={PATHS.CATEGORIES.DETAIL(
                                                                leafCategory.categoryNo,
                                                            )}
                                                            className={
                                                                styles.leafCategoryLink
                                                            }
                                                            onClick={() =>
                                                                setIsOpen(false)
                                                            }
                                                        >
                                                            {leafCategory.label}
                                                        </Link>
                                                    ),
                                                )}
                                            </div>
                                        ),
                                    )}
                                </div>
                                {canScrollRight && (
                                    <button
                                        className={styles.scrollButton}
                                        onClick={handleScrollNext}
                                        aria-label='Next'
                                    >
                                        <ArrowRightIcon />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const ArrowRightIcon = () => (
    <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
        <path
            d='M9 18L15 12L9 6'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
);
