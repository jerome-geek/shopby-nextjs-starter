'use client';

import { map, pipe, toArray } from '@fxts/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { overlay, useOverlayData } from 'overlay-kit';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import Categories from '@/components/drawer/categories';
import { MenuIcon } from '@/components/icons';
import { OVERLAY_ID } from '@/const/overlay';
import { PATHS } from '@/const/paths';
import { GetCategoryResponse } from '@/models/display/category';
import { css, cva } from '@/styled-system/css';
import { text } from '@/styled-system/recipes';
import { token } from '@/styled-system/tokens';

const Menu = ({ categoryData }: { categoryData?: GetCategoryResponse }) => {
    const { t } = useTranslation();

    const pathname = usePathname();

    const overlayData = useOverlayData();

    const menuList = useMemo(() => {
        const categoryLinkList = pipe(
            categoryData?.multiLevelCategories?.[0]?.children ?? [],
            map((category) => ({
                label: category.label,
                href: `/categories/${category.categoryNo}/products`,
            })),
            toArray,
        );

        const menuLinkList = [
            {
                label: t('베스트'),
                href: PATHS.PRODUCTS.BEST,
            },
            {
                label: t('신상'),
                href: PATHS.PRODUCTS.NEW,
            },
        ];

        return [...categoryLinkList, ...menuLinkList];
    }, [categoryData]);

    const isOpen = overlayData?.[OVERLAY_ID.CATEGORIES_DRAWER]?.isOpen ?? false;

    const handleCategoriesClick = () => {
        if (isOpen) {
            overlay.close(OVERLAY_ID.CATEGORIES_DRAWER);
            return;
        }

        overlay.open(
            (props) => {
                return <Categories {...props} categoryData={categoryData} />;
            },
            {
                overlayId: OVERLAY_ID.CATEGORIES_DRAWER,
            },
        );
    };

    const swiperOptions: SwiperProps = {
        slidesPerView: 'auto',
    };

    return (
        <Swiper
            {...swiperOptions}
            className={css({
                display: 'flex !important',
                alignItems: 'center',
                padding: {
                    base: '0 20px !important',
                    md: '33px 0 25px !important',
                },
                position: {
                    base: 'absolute !important',
                    md: 'static !important',
                },
                width: { base: '100% !important', md: 'auto !important' },
                top: { base: 'calc(100% + 19px)', md: 'auto' },
                left: { base: '0', md: 'auto' },
            })}
        >
            <SwiperSlide
                className={css({
                    width: 'auto !important',
                    display: {
                        base: 'none !important',
                        md: 'block !important',
                    },
                    marginRight: { base: '6px', md: '4px' },
                })}
            >
                <button
                    className={menuItemStyle({
                        isCategoryButton: true,
                    })}
                    aria-selected={isOpen}
                    aria-label={t('카테고리')}
                    onClick={handleCategoriesClick}
                >
                    <MenuIcon
                        className={css({
                            width: '20px',
                            height: '20px',
                        })}
                        currentColor={isOpen ? 'white' : 'black'}
                    />
                    <span
                        className={text({
                            size: { base: 'headline1' },
                            weight: { base: 'regular', md: 'medium' },
                        })}
                        style={{
                            lineHeight: '20px',
                            color: isOpen ? 'white' : 'black',
                        }}
                    >
                        {t('카테고리')}
                    </span>
                </button>
            </SwiperSlide>

            {menuList.map((menu) => (
                <SwiperSlide
                    key={menu.label}
                    className={css({
                        width: 'auto !important',
                        marginRight: { base: '6px', md: '4px' },
                        '&:last-of-type': {
                            marginRight: 0,
                        },
                    })}
                >
                    <Link
                        href={menu.href}
                        className={menuItemStyle()}
                        aria-selected={isOpen ? false : pathname === menu.href}
                        aria-label={menu.label}
                    >
                        <span
                            className={text({
                                size: { base: 'headline1' },
                                weight: { base: 'regular', md: 'medium' },
                            })}
                            style={{
                                lineHeight: '20px',
                                color: 'inherit',
                            }}
                        >
                            {menu.label}
                        </span>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

const menuItemStyle = cva({
    base: {
        height: 'auto',
        padding: { base: '6px 14px', md: '7px 16px' },
        borderRadius: '64px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'background-color 0.2s ease',
        '&:hover': {
            opacity: 0.8,
        },
        '&[aria-selected="true"]': {
            backgroundColor: token('colors.black'),
            color: token('colors.white'),
        },
    },
    variants: {
        isCategoryButton: {
            true: {
                backgroundColor: token('colors.gray20'),
                border: `1px solid ${token('colors.gray20')}`,
            },
            false: {
                backgroundColor: token('colors.white'),
                border: `1px solid ${token('colors.gray50')}`,
            },
        },
    },
    defaultVariants: {
        isCategoryButton: false,
    },
});

export default Menu;
