'use client';

import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';
import { isEmpty } from '@fxts/core';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Portal } from 'radix-ui';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperClass, SwiperProps, SwiperSlide } from 'swiper/react';

import { CategoriesProps } from '@/components/drawer/categories';
import { SmallCaretIcon } from '@/components/icons';

const DeskTopCategories = ({
    oneDepthCategoryList,
    twoDepthCategoryList,
    selectCategoryNo,
    setSelectCategoryNo,
}: CategoriesProps) => {
    const { t } = useTranslation();

    const params = useParams();
    const categoryNo = (params.categoryNo ?? '') as string;

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

    const swiperRef = useRef<SwiperClass | null>(null);
    const [isSlideNext, setIsSlideNext] = useState(false);
    const [isSlidePrev, setIsSlidePrev] = useState(false);

    const swiperOptions: SwiperProps = {
        slidesPerView: 'auto',
        spaceBetween: 48,
        initialSlide: findTwoDepthCategoryIndex,
        onSwiper: (swiper) => {
            swiperRef.current = swiper;
            updateSlideState(swiper);
        },
        onSlideChange: (swiper) => {
            updateSlideState(swiper);
        },
        onResize: (swiper) => {
            updateSlideState(swiper);
        },
    };

    const updateSlideState = (swiper: SwiperClass) => {
        setIsSlideNext(!swiper.isEnd);
        setIsSlidePrev(!swiper.isBeginning);
    };

    const handleSlidePrev = () => {
        if (swiperRef.current && isSlidePrev) {
            swiperRef.current.slidePrev();
        }
    };

    const handleSlideNext = () => {
        if (swiperRef.current && isSlideNext) {
            swiperRef.current.slideNext();
        }
    };

    return (
        <Portal.Root container={document.getElementById('header')}>
            <div
                className={css({
                    position: 'absolute',
                    top: 'calc(100% + 1px)',
                    left: 0,
                    width: '100%',
                    backgroundColor: '{colors.gray10}',
                    zIndex: 21,
                    display: 'flex',
                    justifyContent: 'center',
                })}
            >
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 50,
                    }}
                    className={css({
                        width: '100%',
                        display: 'flex',
                        gap: '20px',
                        justifyContent: 'start',
                        maxWidth: '1200px',
                        padding: '0 16px',
                        overflow: 'hidden',
                    })}
                >
                    <ul
                        aria-label={t('1차 카테고리 목록')}
                        className={css({
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                            width: '120px',
                            minWidth: '120px',
                            padding: '32px 0 48px',
                        })}
                    >
                        {oneDepthCategoryList.map((category) => (
                            <li
                                key={category.categoryNo}
                                className={css({
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '2px',
                                })}
                                onMouseOver={() => {
                                    setSelectCategoryNo(category.categoryNo);
                                }}
                            >
                                <span
                                    className={css({
                                        textStyle: 'headline1.medium',
                                        lineHeight: '20px',
                                        color:
                                            selectCategoryNo ===
                                            category.categoryNo
                                                ? 'black'
                                                : 'gray60',
                                    })}
                                >
                                    {category.label}
                                </span>

                                {selectCategoryNo === category.categoryNo && (
                                    <SmallCaretIcon direction='right' />
                                )}
                            </li>
                        ))}
                    </ul>
                    {isEmpty(twoDepthCategoryList) ? null : (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            key={selectCategoryNo}
                            className={css({
                                width: 'calc(100% - 140px)',
                                padding: '32px 0 48px',
                                position: 'relative',
                            })}
                        >
                            {isSlidePrev && (
                                <button
                                    onClick={handleSlidePrev}
                                    className={css({
                                        position: 'absolute',
                                        top: '50%',
                                        left: '8px',
                                        transform: 'translateY(-50%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        backgroundColor: token('colors.white'),
                                        boxShadow:
                                            '0 2px 8px rgba(0, 0, 0, 0.15)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        zIndex: 10,
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            backgroundColor:
                                                token('colors.gray20'),
                                            transform:
                                                'translateY(-50%) scale(1.1)',
                                        },
                                        '&:active': {
                                            transform:
                                                'translateY(-50%) scale(0.95)',
                                        },
                                    })}
                                    aria-label={t('이전 카테고리로 이동')}
                                >
                                    <SmallCaretIcon
                                        direction='left'
                                        className={css({
                                            width: '16px',
                                            height: '16px',
                                            color: token('colors.gray80'),
                                        })}
                                    />
                                </button>
                            )}

                            {isSlideNext && (
                                <button
                                    onClick={handleSlideNext}
                                    className={css({
                                        position: 'absolute',
                                        top: '50%',
                                        right: '8px',
                                        transform: 'translateY(-50%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        backgroundColor: token('colors.white'),
                                        boxShadow:
                                            '0 2px 8px rgba(0, 0, 0, 0.15)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        zIndex: 10,
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            backgroundColor:
                                                token('colors.gray20'),
                                            transform:
                                                'translateY(-50%) scale(1.1)',
                                        },
                                        '&:active': {
                                            transform:
                                                'translateY(-50%) scale(0.95)',
                                        },
                                    })}
                                    aria-label={t('다음 카테고리로 이동')}
                                >
                                    <SmallCaretIcon
                                        direction='right'
                                        className={css({
                                            width: '16px',
                                            height: '16px',
                                            color: token('colors.gray80'),
                                        })}
                                    />
                                </button>
                            )}
                            <Swiper
                                {...swiperOptions}
                                style={{
                                    margin: 0,
                                }}
                                aria-label={t('2차 카테고리 목록')}
                            >
                                {twoDepthCategoryList.map((category) => (
                                    <SwiperSlide
                                        key={category.categoryNo}
                                        className={css({
                                            display: 'flex !important',
                                            flexDirection: 'column',
                                            gap: '12px',
                                        })}
                                        style={{
                                            width: '100px',
                                        }}
                                    >
                                        <Link
                                            href={`/categories/${category.categoryNo}/products`}
                                            aria-selected={
                                                categoryNo ===
                                                category.categoryNo.toString()
                                            }
                                            className={css({
                                                '&[aria-selected="true"]': {
                                                    textDecoration: 'underline',
                                                },
                                                '&:hover': {
                                                    textDecoration: 'underline',
                                                },
                                            })}
                                        >
                                            <span
                                                className={css({
                                                    textStyle:
                                                        'headline1.medium',
                                                    color: 'black',
                                                    whiteSpace: 'nowrap',
                                                })}
                                            >
                                                {category.label}
                                            </span>
                                        </Link>

                                        <ul
                                            className={css({
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '8px',
                                            })}
                                        >
                                            {category.children.map((child) => (
                                                <li
                                                    key={child.categoryNo}
                                                    className={css({
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '2px',
                                                    })}
                                                >
                                                    <Link
                                                        href={`/categories/${child.categoryNo}/products`}
                                                        aria-selected={
                                                            categoryNo ===
                                                            child.categoryNo.toString()
                                                        }
                                                        className={css({
                                                            '&[aria-selected="true"]':
                                                                {
                                                                    textDecoration:
                                                                        'underline',
                                                                },
                                                            '&:hover': {
                                                                textDecoration:
                                                                    'underline',
                                                            },
                                                        })}
                                                    >
                                                        <span
                                                            className={css({
                                                                textStyle:
                                                                    'body1.regular',
                                                                color: 'gray90',
                                                            })}
                                                        >
                                                            {child.label}
                                                        </span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </Portal.Root>
    );
};

export default DeskTopCategories;
