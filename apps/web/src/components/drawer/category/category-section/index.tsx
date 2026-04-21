import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import * as styles from '@/components/drawer/category/category-section/index.css';
import { CATEGORY_CODE } from '@/const/category';
import { useCategoryAll } from '@/hooks/suspenseQuery/display/category';
import { vars } from '@/styles/theme.css';

const CategorySection = () => {
    const { data: categoryAllData } = useCategoryAll();

    const mainCategory = categoryAllData?.multiLevelCategories.find(
        (category) => category.managementCode === CATEGORY_CODE.MAIN,
    );

    const defaultOneDepthCategoryNo = mainCategory?.children?.[0]?.categoryNo;

    const [selectedOneDepthCategoryNo, setSelectedOneDepthCategoryNo] =
        useState(() => defaultOneDepthCategoryNo);

    const selectedOneDepthCategory = useMemo(() => {
        return mainCategory?.children?.find(
            (category) => category.categoryNo === selectedOneDepthCategoryNo,
        );
    }, [mainCategory?.children, selectedOneDepthCategoryNo]);

    const twoDepthCategoryList = useMemo(() => {
        return selectedOneDepthCategory?.children ?? [];
    }, [selectedOneDepthCategory?.children]);

    const [selectedTwoDepthCategoryNo, setSelectedTwoDepthCategoryNo] =
        useState(() => twoDepthCategoryList?.[0]?.categoryNo ?? 0);

    const onClickTwoDepthCategory = useCallback(
        (categoryNo: number, isChangeOneDepthCategory: boolean = false) => {
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
                const SEARCH_BAR_HEIGHT = 70;
                scrollToWithinContainer(
                    drawerContainer,
                    oneDepthSwiper,
                    SEARCH_BAR_HEIGHT,
                );
            }

            const threeDepthCategoryList = document.getElementById(
                'three-depth-category-list',
            );
            const categoryItem = document.getElementById(
                `three-depth-category-list-item-${categoryNo}`,
            );

            if (threeDepthCategoryList && categoryItem) {
                scrollToWithinContainer(threeDepthCategoryList, categoryItem);
            }
        },
        [],
    );

    const onClickOneDepthCategory = useCallback(
        (categoryNo: number) => {
            setSelectedOneDepthCategoryNo(categoryNo);

            const selectedTwoDepthCategory = mainCategory?.children?.find(
                (category) => category.categoryNo === categoryNo,
            );

            const defaultTwoDepthCategoryNo =
                selectedTwoDepthCategory?.children?.[0]?.categoryNo ?? 0;

            setSelectedTwoDepthCategoryNo(defaultTwoDepthCategoryNo);

            setTimeout(() => {
                onClickTwoDepthCategory(defaultTwoDepthCategoryNo, true);
            }, 0);
        },
        [onClickTwoDepthCategory, mainCategory?.children],
    );

    return (
        <section>
            <div
                className={styles.oneDepthCategorySwiperContainer}
                id='one-depth-category-swiper-container'
            >
                <Swiper slidesPerView={'auto'} spaceBetween={4}>
                    {mainCategory?.children.map((category) => (
                        <SwiperSlide key={category.categoryNo}>
                            <div
                                className={styles.oneDepthCategoryItem}
                                role='button'
                                tabIndex={0}
                                aria-pressed={
                                    selectedOneDepthCategoryNo ===
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
                    data-lenis-prevent
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
                                        <img
                                            src={category.icon}
                                            alt={category.label}
                                            className={
                                                styles.threeDepthCategoryIcon
                                            }
                                        />
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
) => {
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const nextTop =
        container.scrollTop + (targetRect.top - containerRect.top) - offsetTop;

    container.scrollTo({ top: nextTop, behavior: 'smooth' });
};
