'use client';

import { isEmpty, pipe, prepend, toArray } from '@fxts/core';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { MultiLevelCategory } from '@/models/display';
import { css } from '@/styled-system/css';
import { vstack } from '@/styled-system/patterns';
import useMediaQuery from '@/hooks/useMediaQuery';

export default function ChildCategory({
    categoryNo,
    selectCategoryNo,
    childCategoryList,
    isMobile,
}: {
    categoryNo: number;
    selectCategoryNo: number;
    childCategoryList: MultiLevelCategory[];
    isMobile: boolean;
}) {
    const { t } = useTranslation();

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const isMobileView = useMediaQuery('(max-width: 767px)');
    const activeIsMobile = isMobileView ?? isMobile;

    const handleChildCategoryClick = (categoryNo: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('childCategoryNo', categoryNo.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    const isEmptyChildCategory = isEmpty(childCategoryList);

    const categoryList = useMemo(() => {
        return pipe(
            childCategoryList,
            prepend({
                categoryNo,
                label: t('전체'),
            }),
            toArray,
        );
    }, [childCategoryList]);

    const initialIndex = useMemo(() => {
        return categoryList.findIndex((a) => selectCategoryNo === a.categoryNo);
    }, [categoryList, selectCategoryNo]);

    const swiperOptions: SwiperProps = {
        slidesPerView: 'auto',
        initialSlide: initialIndex,
    };

    if (isEmptyChildCategory) {
        return null;
    }

    return activeIsMobile ? (
        <div
            className={css({
                borderBottom: '1px solid {colors.gray20}',
                display: { base: 'block', md: 'none' },
            })}
        >
            <Swiper
                {...swiperOptions}
                className={css({
                    padding: '0 20px !important',
                })}
            >
                {categoryList.map((category) => {
                    return (
                        <SwiperSlide
                            key={category.categoryNo}
                            className={css({
                                width: 'auto !important',
                                marginRight: '14px',
                                '&:last-of-type': {
                                    marginRight: 0,
                                },
                            })}
                        >
                            <Link
                                href={`/categories/${categoryNo}/products?childCategoryNo=${category.categoryNo}`}
                                className={css({
                                    textStyle: 'headline1.regular',
                                    color: 'gray60',
                                    '&[aria-selected="true"]': {
                                        color: '{colors.black}',
                                        fontWeight: 'medium',
                                        '&:after': {
                                            content: '""',
                                            position: 'absolute',
                                            width: '100%',
                                            height: '2px',
                                            bottom: '0',
                                            left: '0',
                                            backgroundColor: '{colors.black}',
                                        },
                                    },
                                    position: 'relative',
                                    paddingBottom: '12px',
                                })}
                                aria-selected={
                                    selectCategoryNo === category.categoryNo
                                }
                            >
                                <span>{category.label}</span>
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    ) : (
        <ul
            className={vstack({
                gap: '12px',
                alignItems: 'start',
                borderTop: `2px solid {colors.black}`,
                borderBottom: `2px solid {colors.black}`,
                padding: '24px 0',
                display: { base: 'none', md: 'flex' },
            })}
        >
            {categoryList.map((category) => {
                return (
                    <li key={category.categoryNo}>
                        <button
                            onClick={() =>
                                handleChildCategoryClick(category.categoryNo)
                            }
                            className={css({
                                textStyle: 'heading.semibold',
                                color: 'gray60',
                                '&[aria-selected="true"]': {
                                    color: '{colors.black}',
                                },
                            })}
                            aria-selected={
                                selectCategoryNo === category.categoryNo
                            }
                        >
                            <span>{category.label}</span>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}
