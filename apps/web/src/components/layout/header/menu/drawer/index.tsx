import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper/types';

import * as styles from '@/components/layout/header/menu/drawer/index.css';
import { PATHS } from '@/const/paths';
import { useSuspenseMainCategory } from '@/hooks/useMainCategory';
import { useResponsive } from '@/hooks/utils/useResponsive';
import { vars } from '@/styles/theme.css';

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

    const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const activeCategoryNo = selectedCategoryNo ?? oneDepthDefaultCategoryNo;

    const activeCategory = useMemo(() => {
        return mainCategoryChildrenList.find(
            (cat) => cat.categoryNo === activeCategoryNo,
        );
    }, [mainCategoryChildrenList, activeCategoryNo]);

    const { isMobile } = useResponsive();

    const syncSwiperNavState = (s?: SwiperInstance | null) => {
        const instance = s ?? swiper;
        if (!instance) {
            setCanScrollPrev(false);
            setCanScrollNext(false);
            return;
        }

        // slides가 1페이지면 isLocked=true
        const locked = Boolean(instance.isLocked);
        setCanScrollPrev(!locked && !instance.isBeginning);
        setCanScrollNext(!locked && !instance.isEnd);
    };

    const handlePrevClick = () => {
        if (!swiper) {
            return;
        }
        swiper.slidePrev();
        requestAnimationFrame(() => syncSwiperNavState(swiper));
    };

    const handleNextClick = () => {
        if (!swiper) {
            return;
        }
        swiper.slideNext();
        requestAnimationFrame(() => syncSwiperNavState(swiper));
    };

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
    }, [isOpen, setIsOpen]);

    useEffect(() => {
        queueMicrotask(() => syncSwiperNavState());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCategoryNo, swiper]);

    if (isMobile) {
        setIsOpen(false);
        return null;
    }

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
                    style={{ overflow: 'hidden' }}
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
                                        <ArrowRight
                                            size={16}
                                            strokeWidth={2}
                                            color={vars.color.green['100']}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className={styles.content}>
                            <div className={styles.contentWrapper}>
                                <Swiper
                                    key={activeCategoryNo}
                                    slidesPerView={'auto'}
                                    spaceBetween={29}
                                    onSwiper={(s) => {
                                        setSwiper(s);
                                        syncSwiperNavState(s);

                                        s.on('reachBeginning', () =>
                                            syncSwiperNavState(s),
                                        );
                                        s.on('reachEnd', () =>
                                            syncSwiperNavState(s),
                                        );
                                        s.on('fromEdge', () =>
                                            syncSwiperNavState(s),
                                        );
                                    }}
                                    onSlideChange={(s) => syncSwiperNavState(s)}
                                    onResize={(s) => syncSwiperNavState(s)}
                                >
                                    {activeCategory?.children?.map(
                                        (subCategory) => (
                                            <SwiperSlide
                                                key={subCategory.categoryNo}
                                                style={{ width: 'auto' }}
                                            >
                                                <div
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
                                                                    setIsOpen(
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
                                            </SwiperSlide>
                                        ),
                                    )}
                                </Swiper>

                                {canScrollPrev ? (
                                    <button
                                        className={`${styles.scrollButton} ${styles.scrollButtonLeft}`}
                                        type='button'
                                        onClick={handlePrevClick}
                                        aria-label='Prev'
                                    >
                                        <ArrowLeft
                                            size={20}
                                            color={vars.color.gray['60']}
                                        />
                                    </button>
                                ) : null}

                                {canScrollNext ? (
                                    <button
                                        className={styles.scrollButton}
                                        type='button'
                                        onClick={handleNextClick}
                                        aria-label='Next'
                                    >
                                        <ArrowRight
                                            size={20}
                                            color={vars.color.gray['60']}
                                        />
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
