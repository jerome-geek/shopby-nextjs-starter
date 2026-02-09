'use client';

import { isUndefined } from '@fxts/core';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { overlay } from 'overlay-kit';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { CategoriesProps } from '@/components/drawer/categories';
import Toggle from '@/components/drawer/categories/Toggle';
import {
    BigBellIcon,
    BigCartIcon,
    BigSearchIcon,
    SmallCaretIcon,
} from '@/components/icons';
import { OVERLAY_ID } from '@/const/overlay';
import { PATHS } from '@/const/paths';
import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';

const cartCount = 13;
const BOTTOM_NAVIGATION_HEIGHT = 61;

const MobileCategories = ({
    oneDepthCategoryList,
    twoDepthCategoryList,
    selectCategoryNo,
    setSelectCategoryNo,
}: CategoriesProps) => {
    const { t } = useTranslation();

    const params = useParams();
    const searchParams = useSearchParams();
    const childCategoryNo = searchParams.get('childCategoryNo') ?? '';
    const categoryNo = childCategoryNo || ((params.categoryNo ?? '') as string);

    const twoDepthCategoryListRef = useRef<HTMLUListElement>(null);
    const threeDepthCategoryListRef = useRef<HTMLUListElement>(null);
    const categorySectionRefs = useRef<Map<number, HTMLLIElement>>(new Map());

    const findTwoDepthCategoryIndex = twoDepthCategoryList.findIndex(
        (category) => {
            if (category.categoryNo === Number(categoryNo)) {
                return true;
            }

            return category.children.some(
                (child) => child.categoryNo === Number(categoryNo),
            );
        },
    );

    const iconList = useMemo(
        () => [
            {
                icon: <BigSearchIcon />,
                label: t('검색'),
                href: PATHS.SEARCH,
            },
            {
                icon: <BigBellIcon />,
                label: t('알림'),
                href: '',
                onClick: () => {
                    console.log('알림');
                },
            },
            {
                icon: <BigCartIcon />,
                label: t('장바구니'),
                href: PATHS.ORDER.CART,
                count: cartCount,
            },
        ],
        [t, cartCount],
    );

    const findTwoDepthCategoryElement = (index: number) => {
        if (!threeDepthCategoryListRef.current) {
            return null;
        }

        return threeDepthCategoryListRef.current?.children?.[index] ?? null;
    };

    const updateButtonSelection = useCallback(
        (categoryNo: number) => {
            twoDepthCategoryList.forEach((category) => {
                const button = document.getElementById(
                    `${category.categoryNo}-button`,
                ) as HTMLButtonElement;
                if (button) {
                    button.setAttribute('aria-selected', 'false');
                }
            });

            const selectedButton = document.getElementById(
                `${categoryNo}-button`,
            ) as HTMLButtonElement;

            if (selectedButton) {
                selectedButton.setAttribute('aria-selected', 'true');

                if (twoDepthCategoryListRef.current) {
                    const container = twoDepthCategoryListRef.current;
                    const containerRect = container.getBoundingClientRect();
                    const buttonRect = selectedButton.getBoundingClientRect();

                    const MARGIN = -60;

                    const isAboveViewport =
                        buttonRect.bottom < containerRect.top - MARGIN;
                    const isBelowViewport =
                        buttonRect.top > containerRect.bottom + MARGIN;

                    if (isAboveViewport || isBelowViewport) {
                        selectedButton.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest',
                        });
                    }
                }
            }
        },
        [twoDepthCategoryList],
    );

    useEffect(() => {
        if (!threeDepthCategoryListRef.current) {
            return;
        }

        const element = findTwoDepthCategoryElement(
            findTwoDepthCategoryIndex || 0,
        );

        if (element) {
            element.scrollIntoView({
                behavior: 'instant',
                block: 'center',
            });
        }
    }, []);

    useEffect(() => {
        if (!threeDepthCategoryListRef.current) {
            return;
        }

        const observerOptions = {
            root: threeDepthCategoryListRef.current,
            rootMargin: '-40% 0px -40% 0px',
            threshold: [0],
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            let categoryNos: number[] = [];

            entries.forEach((entry) => {
                const categoryNo = Number(
                    entry.target.getAttribute('data-category-no'),
                );

                if (entry.isIntersecting) {
                    categoryNos.push(categoryNo);
                }
            });

            if (categoryNos.length > 0) {
                updateButtonSelection(categoryNos[categoryNos.length - 1] ?? 0);
            } else {
                if (!threeDepthCategoryListRef.current) {
                    return;
                }

                const container = threeDepthCategoryListRef.current;
                const containerRect = container.getBoundingClientRect();
                const containerHeight = containerRect.height;
                const centerY = containerRect.top + containerHeight * 0.5;

                let closestCategoryNo: number | null = null;
                let minDistance: number | null = null;

                categorySectionRefs.current.forEach(
                    (sectionElement, categoryNo) => {
                        if (sectionElement) {
                            const rect = sectionElement.getBoundingClientRect();
                            const sectionCenterY = rect.top + rect.height / 2;
                            const distance = Math.abs(sectionCenterY - centerY);

                            if (
                                minDistance === null ||
                                distance < minDistance
                            ) {
                                minDistance = distance;
                                closestCategoryNo = categoryNo;
                            }
                        }
                    },
                );

                if (closestCategoryNo !== null) {
                    updateButtonSelection(closestCategoryNo);
                }
            }
        };

        const observer = new IntersectionObserver(
            observerCallback,
            observerOptions,
        );

        categorySectionRefs.current.forEach((element) => {
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, [updateButtonSelection]);

    return (
        <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{
                type: 'spring',
                stiffness: 500,
                damping: 50,
            }}
            className={css({
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: `calc(100% - ${BOTTOM_NAVIGATION_HEIGHT}px)`,
                backgroundColor: '{colors.white}',
                zIndex: 99,
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '100%',
                overflow: 'hidden',
            })}
        >
            <div
                className={css({
                    width: '100%',
                    padding: '29px 20px 19px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 'fit-content',
                })}
            >
                <h2
                    className={css({
                        textStyle: 'title2.semibold',
                        color: 'black',
                    })}
                >
                    {t('카테고리 ')}
                </h2>

                <ul
                    className={css({
                        display: 'flex',
                        gap: '16px',
                    })}
                >
                    {iconList.map((icon) => (
                        <li key={icon.label}>
                            <Link
                                className={css({
                                    position: 'relative',
                                })}
                                href={icon.href}
                                onClick={(e) => {
                                    if (icon?.onClick) {
                                        e.preventDefault();
                                        icon.onClick();
                                    }
                                }}
                            >
                                {icon.icon}

                                {isUndefined(icon.count) ? null : (
                                    <span
                                        className={css({
                                            position: 'absolute',
                                            top: '-6px',
                                            right: '-6px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '20px',
                                            height: '20px',
                                            fontSize: '1rem',
                                            fontWeight: 'semibold',
                                            lineHeight: '1.5',
                                            letterSpacing: '-2%',
                                            color: token('colors.white'),
                                            backgroundColor:
                                                token('colors.red'),
                                            borderRadius: '50%',
                                        })}
                                    >
                                        {cartCount > 99 ? '99+' : cartCount}
                                    </span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div
                className={css({
                    padding: '0 0 14px',
                    borderBottom: '1px solid {colors.gray20}',
                })}
                aria-label={t('1차 카테고리')}
            >
                <Toggle
                    items={oneDepthCategoryList.map((category) => ({
                        value: category.categoryNo.toString(),
                        label: category.label,
                    }))}
                    defaultValue={selectCategoryNo.toString()}
                    onValueChange={(value) => {
                        if (!threeDepthCategoryListRef.current) {
                            return;
                        }

                        threeDepthCategoryListRef.current.scrollTo({
                            top: 0,
                            behavior: 'instant',
                        });

                        setSelectCategoryNo(Number(value));
                    }}
                />
            </div>
            <div
                className={css({
                    display: 'flex',
                    height: '100px',
                    flex: 1,
                })}
            >
                <ul
                    className={css({
                        display: 'flex',
                        flexDirection: 'column',
                        width: '110px',
                        minWidth: '110px',
                        height: '100%',
                        backgroundColor: '{colors.gray20}',
                        overflow: 'auto',
                    })}
                    aria-label={t('2차 카테고리 목록')}
                    ref={twoDepthCategoryListRef}
                >
                    {twoDepthCategoryList.map((category, index) => (
                        <li key={category.categoryNo}>
                            <button
                                id={`${category.categoryNo.toString()}-button`}
                                className={css({
                                    width: '100%',
                                    height: '43px',
                                    textAlign: 'left',
                                    padding: '0 20px',
                                    '&[aria-selected="true"]': {
                                        backgroundColor: '{colors.white}',

                                        '& > span': {
                                            color: '{colors.black}',
                                            fontWeight: 'semibold',
                                        },
                                    },
                                })}
                                onClick={() => {
                                    const element =
                                        findTwoDepthCategoryElement(index);

                                    if (element) {
                                        element.scrollIntoView({
                                            behavior: 'instant',
                                            block: 'center',
                                        });
                                    }

                                    setTimeout(() => {
                                        updateButtonSelection(
                                            category.categoryNo,
                                        );
                                    }, 1);
                                }}
                                aria-selected={index === 0}
                            >
                                <span
                                    className={css({
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        maxWidth: '100%',
                                        display: 'block',
                                        textStyle: 'headline2.medium',
                                        color: 'gray90',
                                    })}
                                >
                                    {category.label}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
                <ul
                    className={css({
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        padding: '20px',
                        gap: '16px',
                        overflow: 'auto',
                    })}
                    ref={threeDepthCategoryListRef}
                >
                    {twoDepthCategoryList.map((category) => (
                        <li
                            key={category.categoryNo}
                            ref={(el) => {
                                if (el) {
                                    categorySectionRefs.current.set(
                                        category.categoryNo,
                                        el,
                                    );
                                    return;
                                }

                                categorySectionRefs.current.delete(
                                    category.categoryNo,
                                );
                            }}
                            data-category-no={category.categoryNo}
                            className={css({
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                                width: '100%',
                                borderBottom: '1px solid {colors.gray20}',
                                paddingBottom: '16px',
                                '&:last-of-type': {
                                    borderBottom: 'none',
                                    paddingBottom: '40px',
                                },
                            })}
                        >
                            <Link
                                href={`/categories/${category.categoryNo}/products`}
                                aria-selected={
                                    categoryNo ===
                                    category.categoryNo.toString()
                                }
                                className={css({
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    '&[aria-selected="true"]': {
                                        textDecoration: 'underline',
                                    },
                                })}
                            >
                                <span
                                    className={css({
                                        textStyle: 'heading.semibold',
                                        color: 'black',
                                    })}
                                >
                                    {category.label}
                                </span>
                                <SmallCaretIcon
                                    className={css({
                                        width: '20px',
                                        height: '20px',
                                    })}
                                    direction='right'
                                />
                            </Link>

                            <ul
                                aria-label={t('3차 카테고리 목록')}
                                className={css({
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    columnGap: '8px',
                                    rowGap: '16px',
                                })}
                            >
                                {category.children.map((child) => (
                                    <li key={child.categoryNo}>
                                        <Link
                                            href={`/categories/${category.categoryNo}/products?childCategoryNo=${child.categoryNo}`}
                                            onClick={() =>
                                                overlay.close(
                                                    OVERLAY_ID.CATEGORIES_DRAWER,
                                                )
                                            }
                                            aria-selected={
                                                categoryNo ===
                                                child.categoryNo.toString()
                                            }
                                            className={css({
                                                '&[aria-selected="true"]': {
                                                    textDecoration: 'underline',
                                                },
                                            })}
                                        >
                                            <span
                                                className={css({
                                                    textStyle: 'body1.regular',
                                                    color: 'gray90',
                                                })}
                                            >
                                                {child.label}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};

export default MobileCategories;
