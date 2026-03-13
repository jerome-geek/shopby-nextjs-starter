import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

import { PATHS } from '@/const/paths';
import { GetCategoryResponse } from '@/models/display/category';
import * as styles from './Menu.css';

interface MenuProps {
    categoryData?: GetCategoryResponse;
}

const MenuIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
            d="M3 12H21M3 6H21M3 18H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
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
    const [selectedCategoryNo, setSelectedCategoryNo] = useState<number | null>(
        null,
    );
    const [canScrollRight, setCanScrollRight] = useState(false);

    const drawerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const rootCategories = useMemo(() => {
        return categoryData?.multiLevelCategories?.[0]?.children ?? [];
    }, [categoryData]);

    const activeCategoryNo =
        selectedCategoryNo ?? rootCategories[0]?.categoryNo;

    const activeCategory = useMemo(() => {
        return rootCategories.find(
            (cat) => cat.categoryNo === activeCategoryNo,
        );
    }, [rootCategories, activeCategoryNo]);

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
                <MenuIcon />
                <span>카테고리</span>
            </button>

            <div className={styles.menuListContainer}>
                <Link href={PATHS.MAIN} className={styles.homeItem}>
                    <span>홈</span>
                </Link>

                <div className={styles.separator} />

                <ul className={styles.menuList}>
                    <li>
                        <Link
                            href={PATHS.SHOP.DISCOVERY}
                            className={styles.menuItem}
                        >
                            <span>발견</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={PATHS.SHOP.KIDS}
                            className={styles.menuItem}
                        >
                            <span>키즈</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={PATHS.SHOP.LIFE}
                            className={styles.menuItem}
                        >
                            <span>라이프</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={PATHS.PRODUCTS.BEST}
                            className={styles.menuItem}
                        >
                            <span>베스트</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={PATHS.EVENTS.MAIN}
                            className={styles.menuItem}
                        >
                            <span>기획전</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={PATHS.PRODUCTS.NEW}
                            className={styles.menuItem}
                        >
                            <span>신상품</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={PATHS.MAIN} className={styles.menuItem}>
                            <span>특가</span>
                        </Link>
                    </li>
                </ul>
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
