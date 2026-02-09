import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

import { PATHS } from '@/const/paths';
import { GetCategoryResponse } from '@/models/display/category';
import * as styles from './Menu.css';

interface MenuProps {
    categoryData?: GetCategoryResponse;
}

const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        {isOpen ? (
            <path
                d="M6 18L18 6M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        ) : (
            <path
                d="M3 12H21M3 6H21M3 18H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        )}
    </svg>
);

const ArrowRightIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export function Menu({ categoryData }: MenuProps) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [activeCategoryNo, setActiveCategoryNo] = useState<number | null>(
        null,
    );
    const [canScrollRight, setCanScrollRight] = useState(false);

    const drawerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const rootCategories =
        categoryData?.multiLevelCategories?.[0]?.children ?? [];

    const activeCategory = useMemo(() => {
        return rootCategories.find(
            (cat) => cat.categoryNo === activeCategoryNo,
        );
    }, [rootCategories, activeCategoryNo]);

    // Drawer 열릴 때 첫 번째 자동 선택
    useEffect(() => {
        if (isDrawerOpen && rootCategories.length > 0 && !activeCategoryNo) {
            setActiveCategoryNo(rootCategories[0].categoryNo);
        }
    }, [isDrawerOpen, rootCategories, activeCategoryNo]);

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

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
        const handleClickOutside = (event: MouseEvent) => {
            if (
                drawerRef.current &&
                !drawerRef.current.contains(event.target as Node)
            ) {
                setIsDrawerOpen(false);
            }
        };

        if (isDrawerOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDrawerOpen]);

    return (
        <div className={styles.container} ref={drawerRef}>
            <button
                className={styles.categoryButton}
                onClick={toggleDrawer}
                aria-expanded={isDrawerOpen}
            >
                <MenuIcon isOpen={isDrawerOpen} />
                카테고리
            </button>

            <div className={styles.menuList}>
                <Link href={PATHS.PRODUCTS.BEST} className={styles.menuItem}>
                    베스트
                </Link>
                <Link href={PATHS.PRODUCTS.NEW} className={styles.menuItem}>
                    신상
                </Link>
                <Link href={PATHS.PRODUCTS.LIST} className={styles.menuItem}>
                    전체보기
                </Link>
            </div>

            <AnimatePresence>
                {isDrawerOpen && (
                    <motion.div
                        className={styles.drawerContainer}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }} // 애니메이션 중 내용 넘침 방지
                    >
                        <div className={styles.drawerInner}>
                            <div className={styles.sidebar}>
                                {rootCategories.map((category) => (
                                    <button
                                        key={category.categoryNo}
                                        className={styles.sidebarItem}
                                        onClick={() =>
                                            setActiveCategoryNo(
                                                category.categoryNo,
                                            )
                                        }
                                        onMouseEnter={() =>
                                            setActiveCategoryNo(
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
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                style={{ marginLeft: 'auto' }}
                                            >
                                                <path
                                                    d="M9 18L15 12L9 6"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
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
                                                            setIsDrawerOpen(
                                                                false,
                                                            )
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
                                                                    setIsDrawerOpen(
                                                                        false,
                                                                    )
                                                                }
                                                            >
                                                                {
                                                                    leafCategory.label
                                                                }
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
                                            aria-label="Next"
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
        </div>
    );
}

export default Menu;
