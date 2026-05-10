import { filter, flatMap, map, pipe, toArray } from '@fxts/core';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import * as styles from '@/features/drawer/category/shopping/category-section/index.css';
import { useSuspenseMainCategory } from '@/hooks/useMainCategory';
import { vars } from '@/styles/theme.css';

const SEARCH_BAR_HEIGHT = 70;
const ONE_DEPTH_CATEGORY_SWIPER_HEIGHT = 57;
const OFFSET_HEIGHT = SEARCH_BAR_HEIGHT + ONE_DEPTH_CATEGORY_SWIPER_HEIGHT;
const EXTRA_DETECTION_OFFSET = 100;
const BASE_OFFSET_TOP = OFFSET_HEIGHT + EXTRA_DETECTION_OFFSET;
const TWO_DEPTH_AUTO_SCROLL_TOP_GAP = 50;
const SCROLL_SPY_LOCK_MS = 800;
const THREE_DEPTH_ITEM_ID_PREFIX = 'three-depth-category-list-item-';

type ScrollSpyLock = {
    lockedCategoryNo: number | null;
    timeoutId: number | null;
};

const CategorySection = () => {
    const { mainCategoryChildrenList, oneDepthDefaultCategoryNo } =
        useSuspenseMainCategory();

    const parentOneDepthByTwoDepthCategoryNo = useMemo(() => {
        return new Map(
            pipe(
                mainCategoryChildrenList ?? [],
                flatMap((oneDepth) =>
                    pipe(
                        oneDepth.children ?? [],
                        map(
                            (twoDepth) =>
                                [
                                    twoDepth.categoryNo,
                                    oneDepth.categoryNo,
                                ] as const,
                        ),
                    ),
                ),
                toArray,
            ),
        );
    }, [mainCategoryChildrenList]);

    const twoDepthCategoryList = useMemo(() => {
        return pipe(
            mainCategoryChildrenList ?? [],
            flatMap((category) => category.children ?? []),
            toArray,
        );
    }, [mainCategoryChildrenList]);

    const [selectedTwoDepthCategoryNo, setSelectedTwoDepthCategoryNo] =
        useState(() => twoDepthCategoryList?.[0]?.categoryNo ?? 0);

    const activeOneDepthCategoryNo = useMemo(() => {
        return (
            parentOneDepthByTwoDepthCategoryNo.get(
                selectedTwoDepthCategoryNo,
            ) ?? oneDepthDefaultCategoryNo
        );
    }, [
        oneDepthDefaultCategoryNo,
        parentOneDepthByTwoDepthCategoryNo,
        selectedTwoDepthCategoryNo,
    ]);

    const rafIdRef = useRef<number | null>(null);
    const scrollSpyLockRef = useRef<ScrollSpyLock>({
        lockedCategoryNo: null,
        timeoutId: null,
    });

    useEffect(() => {
        const drawerContainer = document.getElementById(
            'category-drawer-container',
        );
        const threeDepthList = document.getElementById(
            'three-depth-category-list',
        );
        const lock = scrollSpyLockRef.current;

        if (!drawerContainer || !threeDepthList) {
            return;
        }

        const getThreeDepthItems = () =>
            Array.from(
                threeDepthList.querySelectorAll<HTMLElement>(
                    `[id^="${THREE_DEPTH_ITEM_ID_PREFIX}"]`,
                ),
            );

        const findActiveCategoryNo = (offsetTop: number) => {
            const items = getThreeDepthItems();
            if (items.length === 0) {
                return null;
            }

            const containerRect = drawerContainer.getBoundingClientRect();

            const candidates = pipe(
                items,
                map((el) => {
                    const rect = el.getBoundingClientRect();
                    const relativeTop = rect.top - containerRect.top;
                    const distance = offsetTop - relativeTop;
                    const no = parseCategoryNoFromThreeDepthItemId(el.id);

                    return {
                        distance,
                        no: Number.isFinite(no) ? no : null,
                    };
                }),
                filter(({ distance, no }) => distance >= 0 && no !== null),
                toArray,
            );

            const activeNo = candidates.reduce<{
                distance: number;
                no: number | null;
            } | null>((acc, cur) => {
                if (cur.no === null) {
                    return acc;
                }
                if (acc === null) {
                    return cur;
                }
                return cur.distance < acc.distance ? cur : acc;
            }, null)?.no;

            if (activeNo !== null && activeNo !== undefined) {
                return activeNo;
            }

            return parseCategoryNoFromThreeDepthItemId(items[0].id);
        };

        const onScroll = () => {
            if (rafIdRef.current !== null) {
                return;
            }

            rafIdRef.current = window.requestAnimationFrame(() => {
                rafIdRef.current = null;

                const items = getThreeDepthItems();
                if (items.length === 0) {
                    return;
                }

                const dynamicOffsetTop = calcDynamicOffsetTop(
                    drawerContainer,
                    BASE_OFFSET_TOP,
                );

                const nextNo = findActiveCategoryNo(dynamicOffsetTop);

                if (nextNo === null) {
                    return;
                }
                if (!Number.isFinite(nextNo)) {
                    return;
                }

                const { lockedCategoryNo } = lock;
                if (lockedCategoryNo !== null && nextNo !== lockedCategoryNo) {
                    return;
                }

                setSelectedTwoDepthCategoryNo((prev) =>
                    prev === nextNo ? prev : nextNo,
                );

                if (lockedCategoryNo !== null && nextNo === lockedCategoryNo) {
                    lock.lockedCategoryNo = null;
                    if (lock.timeoutId !== null) {
                        window.clearTimeout(lock.timeoutId);
                        lock.timeoutId = null;
                    }
                }
            });
        };

        drawerContainer.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        return () => {
            drawerContainer.removeEventListener('scroll', onScroll);
            if (rafIdRef.current !== null) {
                window.cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = null;
            }
            if (lock.timeoutId !== null) {
                window.clearTimeout(lock.timeoutId);
                lock.timeoutId = null;
            }
        };
    }, [twoDepthCategoryList]);

    useEffect(() => {
        const twoDepthList = document.getElementById('two-depth-category-list');
        if (!twoDepthList) {
            return;
        }

        const activeButton = twoDepthList.querySelector<HTMLElement>(
            `[data-two-depth-category-no="${selectedTwoDepthCategoryNo}"]`,
        );

        if (!activeButton) {
            return;
        }

        scrollToWithinContainer(
            twoDepthList,
            activeButton,
            TWO_DEPTH_AUTO_SCROLL_TOP_GAP,
        );
    }, [selectedTwoDepthCategoryNo]);

    const onClickTwoDepthCategory = useCallback(
        (categoryNo: number, isChangeOneDepthCategory: boolean = false) => {
            // 2차 클릭으로 드로어가 스크롤될 때, 스크롤 스파이가 다른 값으로 덮어쓰지 않도록 잠금
            scrollSpyLockRef.current.lockedCategoryNo = categoryNo;
            if (scrollSpyLockRef.current.timeoutId !== null) {
                window.clearTimeout(scrollSpyLockRef.current.timeoutId);
            }
            scrollSpyLockRef.current.timeoutId = window.setTimeout(() => {
                scrollSpyLockRef.current.lockedCategoryNo = null;
                scrollSpyLockRef.current.timeoutId = null;
            }, SCROLL_SPY_LOCK_MS);

            if (!isChangeOneDepthCategory) {
                setSelectedTwoDepthCategoryNo(categoryNo);
            }

            const drawerContainer = document.getElementById(
                'category-drawer-container',
            );
            const oneDepthSwiper = document.getElementById(
                'one-depth-category-swiper-container',
            );

            if (drawerContainer && oneDepthSwiper) {
                scrollToWithinContainer(
                    drawerContainer,
                    oneDepthSwiper,
                    OFFSET_HEIGHT,
                    'instant',
                );
            }

            const categoryItem = document.getElementById(
                `${THREE_DEPTH_ITEM_ID_PREFIX}${categoryNo}`,
            );

            if (drawerContainer && categoryItem) {
                scrollToWithinContainer(
                    drawerContainer,
                    categoryItem,
                    OFFSET_HEIGHT,
                    'instant',
                );
            }
        },
        [],
    );

    const onClickOneDepthCategory = useCallback(
        (categoryNo: number) => {
            const selectedTwoDepthCategory = mainCategoryChildrenList?.find(
                (category) => category.categoryNo === categoryNo,
            );

            const defaultTwoDepthCategoryNo =
                selectedTwoDepthCategory?.children?.[0]?.categoryNo ?? 0;

            setSelectedTwoDepthCategoryNo(defaultTwoDepthCategoryNo);

            setTimeout(() => {
                onClickTwoDepthCategory(defaultTwoDepthCategoryNo, true);
            }, 0);
        },
        [onClickTwoDepthCategory, mainCategoryChildrenList],
    );

    return (
        <section>
            <div
                className={styles.oneDepthCategorySwiperContainer}
                id='one-depth-category-swiper-container'
                aria-label='1차 카테고리 스와이퍼'
            >
                <Swiper slidesPerView={'auto'} spaceBetween={4}>
                    {mainCategoryChildrenList.map((category) => (
                        <SwiperSlide key={category.categoryNo}>
                            <div
                                className={styles.oneDepthCategoryItem}
                                role='button'
                                tabIndex={0}
                                aria-pressed={
                                    activeOneDepthCategoryNo ===
                                    category.categoryNo
                                }
                                onClick={() =>
                                    onClickOneDepthCategory(category.categoryNo)
                                }
                            >
                                <span>{category.label}</span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className={styles.childCategoryContainer}>
                <ul
                    className={styles.twoDepthCategoryList}
                    aria-label='2차 카테고리 목록'
                    id='two-depth-category-list'
                    data-lenis-prevent
                >
                    {twoDepthCategoryList.map((category) => (
                        <li
                            className={styles.twoDepthCategoryListItem}
                            key={category.categoryNo}
                        >
                            <button
                                className={styles.twoDepthCategoryButton}
                                data-two-depth-category-no={category.categoryNo}
                                aria-pressed={
                                    selectedTwoDepthCategoryNo ===
                                    category.categoryNo
                                }
                                onClick={() =>
                                    onClickTwoDepthCategory(category.categoryNo)
                                }
                            >
                                {category.label}
                            </button>
                        </li>
                    ))}
                </ul>

                <ul
                    className={styles.threeDepthCategoryList}
                    aria-label='3차 카테고리 목록'
                    id='three-depth-category-list'
                >
                    {twoDepthCategoryList.map((category) => (
                        <li
                            key={category.categoryNo}
                            className={styles.threeDepthCategoryListItem}
                            id={`three-depth-category-list-item-${category.categoryNo}`}
                        >
                            <div className={styles.threeDepthCategoryContainer}>
                                <Link
                                    href={`/categories/${category.categoryNo}`}
                                    className={styles.threeDepthCategoryLink}
                                >
                                    <div
                                        className={
                                            styles.threeDepthCategoryIconContainer
                                        }
                                    >
                                        {category.icon && (
                                            <img
                                                src={category.icon}
                                                alt={category.label}
                                                className={
                                                    styles.threeDepthCategoryIcon
                                                }
                                            />
                                        )}

                                        <span
                                            className={
                                                styles.threeDepthCategoryLabel
                                            }
                                        >
                                            {category.label}
                                        </span>
                                    </div>
                                    <ChevronRight
                                        color={vars.color.gray['50']}
                                        width='20'
                                        height='20'
                                        strokeWidth={1.4}
                                        style={{
                                            minWidth: '20px',
                                        }}
                                    />
                                </Link>
                            </div>

                            <ul
                                className={styles.threeDepthCategoryInnerList}
                                data-single={category.children.length === 1}
                            >
                                {category.children.map((child) => (
                                    <li
                                        key={child.categoryNo}
                                        className={
                                            styles.threeDepthCategoryInnerListItem
                                        }
                                    >
                                        <Link
                                            href={`/categories/${child.categoryNo}`}
                                            className={
                                                styles.threeDepthCategoryItemLink
                                            }
                                        >
                                            {child.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default CategorySection;

const scrollToWithinContainer = (
    container: HTMLElement,
    target: HTMLElement,
    offsetTop = 0,
    behavior: ScrollBehavior | undefined = 'smooth',
) => {
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const nextTop =
        container.scrollTop + (targetRect.top - containerRect.top) - offsetTop;

    container.scrollTo({ top: nextTop, behavior });
};

const parseCategoryNoFromThreeDepthItemId = (id: string) => {
    const categoryNo = Number(id.replace(THREE_DEPTH_ITEM_ID_PREFIX, ''));
    return Number.isFinite(categoryNo) ? categoryNo : null;
};

const calcDynamicOffsetTop = (
    container: HTMLElement,
    baseOffsetTop: number,
) => {
    const remainingScroll =
        container.scrollHeight - (container.scrollTop + container.clientHeight);

    // NOTE: 상단 기준선을 지나갈 수 없는 구간(바닥 근처)에서는 감지 포인트를 아래로 이동
    return remainingScroll < container.clientHeight - baseOffsetTop
        ? container.clientHeight - remainingScroll
        : baseOffsetTop;
};
