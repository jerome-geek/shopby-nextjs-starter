'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import ViewAllLink from '@/components/ui/view-all-link';
import { PATHS } from '@/const/paths';
import { css } from '@/styled-system/css';

export default function RecentOrders() {
    const { t } = useTranslation();

    return (
        <section className={css({ marginTop: { base: '40px', md: '60px' } })}>
            <div
                className={css({
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '15px',
                    borderBottom: '2px solid #000',
                    paddingBottom: '15px',
                })}
            >
                <h3
                    className={css({
                        fontSize: { base: '18px', md: '20px' },
                        fontWeight: 'bold',
                    })}
                >
                    {t('최근 주문')}
                </h3>
                <ViewAllLink href={PATHS.MYPAGE.ORDERS.MAIN}>
                    {t('전체보기')}
                </ViewAllLink>
            </div>

            <div
                className={css({
                    borderBottom: '1px solid #eee',
                    backgroundColor: '#fff',
                })}
            >
                {/* 테이블 헤더 - 데스크탑 전용 */}
                <div
                    className={css({
                        display: { base: 'none', md: 'flex' },
                        padding: '15px 0',
                        borderBottom: '1px solid #f5f5f5',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#333',
                    })}
                >
                    <div className={css({ width: '15%' })}>{t('주문일')}</div>
                    <div className={css({ flex: 1 })}>{t('주문내역')}</div>
                    <div className={css({ width: '20%' })}>{t('주문번호')}</div>
                    <div className={css({ width: '15%' })}>{t('결제금액')}</div>
                </div>

                {/* 빈 상태 표시 */}
                <div
                    className={css({
                        padding: '80px 0',
                        textAlign: 'center',
                        color: '#999',
                        fontSize: '14px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px',
                    })}
                >
                    <p>{t('최근 주문 내역이 없습니다.')}</p>
                </div>
            </div>
        </section>
    );
}
