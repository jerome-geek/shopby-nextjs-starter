import { accumulation } from '@/api/manage';
import { getTranslation } from '@/i18n/server';
import { css } from '@/styled-system/css';
import { POINT } from '@/utils/currency';

export default async function AccumulationSummary() {
    const { t } = await getTranslation();

    let waitingAccumulation = 0;
    let totalAvailableAmt = 0;

    try {
        const [accumulationSummaryData, expectAccumulationData] =
            await Promise.all([
                accumulation.getAccumulationSummary().json(),
                accumulation.getExpectAccumulation().json(),
            ]);

        totalAvailableAmt = accumulationSummaryData.totalAvailableAmt;
        waitingAccumulation = expectAccumulationData.waitingAccumulation;
    } catch (error) {
        console.error('Error fetching waiting accumulation:', error);
    }

    return (
        <section className={css({ mb: '60px' })}>
            <h3
                className={css({
                    fontSize: '18px',
                    fontWeight: 'bold',
                    mb: '16px',
                    color: '#222',
                })}
            >
                {t('적립금내역')}
            </h3>

            <div
                className={css({
                    display: 'flex',
                    border: '1px solid #e5e5e5',
                    padding: '40px 0',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                })}
            >
                {/* 적립금 정보 (좌측) */}
                <div className={css({ display: 'flex', flex: '1.5' })}>
                    <div
                        className={css({
                            flex: 1,
                            textAlign: 'center',
                            borderRight: '1px solid #eee',
                        })}
                    >
                        <p
                            className={css({
                                fontSize: '14px',
                                color: '#666',
                                mb: '10px',
                            })}
                        >
                            {t('사용가능 적립금')}
                        </p>
                        <p
                            className={css({
                                fontSize: '28px',
                                fontWeight: '800',
                                color: '#333',
                            })}
                        >
                            {POINT(totalAvailableAmt).format()}
                        </p>
                    </div>
                    <div
                        className={css({
                            flex: 1,
                            textAlign: 'center',
                            borderRight: '1px solid #eee',
                        })}
                    >
                        <p
                            className={css({
                                fontSize: '14px',
                                color: '#666',
                                mb: '10px',
                            })}
                        >
                            {t('적립예상 적립금')}
                        </p>
                        <p
                            className={css({
                                fontSize: '28px',
                                fontWeight: '800',
                                color: '#333',
                            })}
                        >
                            {POINT(waitingAccumulation).format()}
                        </p>
                    </div>
                    <div className={css({ flex: 1, textAlign: 'center' })}>
                        <p
                            className={css({
                                fontSize: '14px',
                                color: '#666',
                                mb: '10px',
                            })}
                        >
                            {t('30일내 소멸예정')}
                        </p>
                        <p
                            className={css({
                                fontSize: '28px',
                                fontWeight: '800',
                                color: '#333',
                            })}
                        >
                            0P
                        </p>
                    </div>
                </div>

                {/* 안내 문구 및 정책 버튼 (우측) */}
                <div
                    className={css({
                        flex: 1,
                        paddingLeft: '50px',
                        borderLeft: '1px solid #eee',
                        display: 'flex',
                        flexDirection: 'column',
                    })}
                >
                    <ul
                        className={css({
                            fontSize: '13px',
                            color: '#888',
                            lineHeight: '1.8',
                            mb: '16px',
                            listStyle: 'none',
                        })}
                    >
                        <li
                            className={css({
                                position: 'relative',
                                pl: '12px',
                                _before: {
                                    content: '"·"',
                                    position: 'absolute',
                                    left: 0,
                                    fontWeight: 'bold',
                                },
                            })}
                        >
                            적립일기준 유효기간은 1년입니다.
                        </li>
                        <li
                            className={css({
                                position: 'relative',
                                pl: '12px',
                                _before: {
                                    content: '"·"',
                                    position: 'absolute',
                                    left: 0,
                                    fontWeight: 'bold',
                                },
                            })}
                        >
                            적립금사용은 결제금액 기준 100% 전액 사용하실 수
                            있습니다.
                        </li>
                        <li
                            className={css({
                                position: 'relative',
                                pl: '12px',
                                _before: {
                                    content: '"·"',
                                    position: 'absolute',
                                    left: 0,
                                    fontWeight: 'bold',
                                },
                            })}
                        >
                            자세한 안내는 적립금 정책 안내 페이지에서 확인해
                            주시기 바랍니다.
                        </li>
                    </ul>
                    <button
                        className={css({
                            width: 'fit-content',
                            backgroundColor: '#303f50',
                            color: '#fff',
                            padding: '10px 24px',
                            fontSize: '13px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'opacity 0.2s',
                            _hover: { opacity: 0.9 },
                        })}
                    >
                        적립금정책 자세히보기
                    </button>
                </div>
            </div>
        </section>
    );
}
