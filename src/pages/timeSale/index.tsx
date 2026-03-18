import { motion } from 'motion/react';
import { useLenis } from 'lenis/react';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';

import * as toggleStyles from '@/components/section/timeSale/toggle.css';
import * as tabStyles from '@/components/section/timeSale/tab.css';
import * as styles from '@/pages/timeSale/index.css';

export type TimeSaleType = 'life' | 'kids';
export type TimeSaleStatus = 'today-open' | 'best' | 'closing-soon';

const TimeSale = () => {
    const router = useRouter();
    const lenis = useLenis();
    const tabParam = (router.query.tab as TimeSaleType) || 'life';
    const activeTab: TimeSaleType = ['life', 'kids'].includes(tabParam)
        ? tabParam
        : 'life';

    const [activeStatus, setActiveStatus] =
        useState<TimeSaleStatus>('today-open');
    const isScrollingRef = useRef(false);

    const options = [
        { label: '라이프 타임특가', value: 'life' },
        { label: '키즈 타임특가', value: 'kids' },
    ] as const;

    const statusOptions = [
        { label: '오늘 오픈', value: 'today-open' },
        { label: '베스트', value: 'best' },
        { label: '마감 임박', value: 'closing-soon' },
    ] as const;

    const handleTabChange = (value: TimeSaleType) => {
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, tab: value },
            },
            undefined,
            { shallow: true, scroll: false }, // 스크롤이 위로 튀는 것을 방지
        );
    };

    const handleStatusChange = (value: TimeSaleStatus) => {
        setActiveStatus(value);
        isScrollingRef.current = true;
        lenis?.scrollTo(`#${value}`, {
            offset: window.innerWidth >= 768 ? -140 : -106, // 데스크탑 90+50, 모바일 56+50
            duration: 1.2,
            onComplete: () => {
                isScrollingRef.current = false;
            },
        });
    };

    // 스크롤 위치에 따라 활성 탭 업데이트
    useLenis(() => {
        if (isScrollingRef.current) return;

        const margin = window.innerWidth >= 768 ? 160 : 120; // threshold 고려

        const elToday = document.getElementById('today-open');
        const elBest = document.getElementById('best');
        const elClosing = document.getElementById('closing-soon');

        if (!elToday || !elBest || !elClosing) return;

        const bestTop = elBest.getBoundingClientRect().top;
        const closingTop = elClosing.getBoundingClientRect().top;

        if (closingTop <= margin) {
            setActiveStatus('closing-soon');
        } else if (bestTop <= margin) {
            setActiveStatus('best');
        } else {
            setActiveStatus('today-open');
        }
    });

    return (
        <div className={styles.container}>
            <div className={styles.topContainer}>
                <div>
                    <img
                        src={'https://placehold.co/486x486'}
                        alt="placeholder"
                    />
                </div>

                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>타임특가</h1>
                    <div className={styles.subTitleContainer}>
                        <h2 className={styles.subTitle}>오늘만 이 가격!</h2>
                        <p className={styles.description}>
                            매일 새로운 특가 상품을 만나보세요.
                            <br /> 선착순 한정 수량으로 최대 50% 할인된 가격에
                            제공됩니다.
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <div className={toggleStyles.container}>
                    {options.map((option) => (
                        <button
                            key={option.value}
                            className={toggleStyles.button({
                                active: activeTab === option.value,
                            })}
                            onClick={() => handleTabChange(option.value)}
                        >
                            {activeTab === option.value && (
                                <motion.div
                                    layoutId="active-pill"
                                    className={toggleStyles.activeBg}
                                    transition={{
                                        type: 'spring',
                                        bounce: 0.2,
                                        duration: 0.6,
                                    }}
                                />
                            )}
                            <span
                                className={toggleStyles.label({
                                    active: activeTab === option.value,
                                })}
                            >
                                {option.label}
                            </span>
                        </button>
                    ))}
                </div>

                <div className={tabStyles.container}>
                    {statusOptions.map((option) => (
                        <button
                            key={option.value}
                            className={tabStyles.button({
                                active: activeStatus === option.value,
                            })}
                            onClick={() => handleStatusChange(option.value)}
                        >
                            <span
                                className={tabStyles.label({
                                    active: activeStatus === option.value,
                                })}
                            >
                                {option.label}
                            </span>
                            {activeStatus === option.value && (
                                <motion.div
                                    layoutId="active-underline"
                                    className={tabStyles.underline}
                                    transition={{
                                        type: 'spring',
                                        bounce: 0.2,
                                        duration: 0.6,
                                    }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                <div>
                    <section
                        id="today-open"
                        style={{ minHeight: '800px', paddingTop: '40px' }}
                    >
                        <h2>오늘 오픈</h2>
                        <div style={{ height: '600px', background: '#f9f9f9' }}>
                            상품 리스트 ({activeTab} 데이터)
                        </div>
                    </section>

                    <section
                        id="best"
                        style={{ minHeight: '800px', paddingTop: '40px' }}
                    >
                        <h2>베스트</h2>
                        <div style={{ height: '600px', background: '#f5f5f5' }}>
                            상품 리스트 ({activeTab} 데이터)
                        </div>
                    </section>

                    <section
                        id="closing-soon"
                        style={{ minHeight: '800px', paddingTop: '40px' }}
                    >
                        <h2>마감 임박</h2>
                        <div style={{ height: '600px', background: '#f0f0f0' }}>
                            상품 리스트 ({activeTab} 데이터)
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TimeSale;
