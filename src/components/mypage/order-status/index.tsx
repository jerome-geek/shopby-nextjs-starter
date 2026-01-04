import { css } from '@/styled-system/css';

interface OrderStatusProps {
    depositPending?: number;
    shippingPending?: number;
    shipping?: number;
    deliveryCompleted?: number;
    cancel?: number;
    exchange?: number;
    return?: number;
}

export default async function OrderStatus({
    depositPending = 0,
    shippingPending = 0,
    shipping = 0,
    deliveryCompleted = 0,
    cancel = 6,
    exchange = 0,
    return: returnCount = 0,
}: OrderStatusProps) {
    return (
        <section
            className={css({ marginBottom: { base: '40px', md: '60px' } })}
        >
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
                    주문 현황
                </h3>
                <span className={css({ fontSize: '12px', color: '#888' })}>
                    최근 3개월 기준
                </span>
            </div>

            <div
                className={css({
                    display: 'flex',
                    flexDirection: { base: 'column', md: 'row' },
                    border: '1px solid #eee',
                    backgroundColor: '#fff',
                })}
            >
                {/* 메인 주문 상태 (입금대기 ~ 배송완료) */}
                <div
                    className={css({
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        padding: { base: '24px 0', md: '30px 0' },
                        gap: { base: '2px', sm: '4px', md: '0' },
                    })}
                >
                    <StatusStep
                        label="입금 대기"
                        count={depositPending}
                        hasArrow
                    />
                    <StatusStep
                        label="출고 대기"
                        count={shippingPending}
                        hasArrow
                    />
                    <StatusStep label="배송중" count={shipping} hasArrow />
                    <StatusStep label="배송 완료" count={deliveryCompleted} />
                </div>

                {/* 취소/교환/반품 상태 */}
                <div
                    className={css({
                        width: { base: '100%', md: '240px' },
                        backgroundColor: '#f9f9f9',
                        display: 'flex',
                        flexDirection: { base: 'row', md: 'column' },
                        justifyContent: { base: 'space-around', md: 'center' },
                        padding: { base: '15px 10px', md: '0 30px' },
                        gap: { base: '20px', md: '12px' },
                        borderLeft: { base: 'none', md: '1px solid #eee' },
                        borderTop: { base: '1px solid #eee', md: 'none' },
                    })}
                >
                    <SubStatusItem label="취소" count={cancel} />
                    <SubStatusItem label="교환" count={exchange} />
                    <SubStatusItem label="반품" count={returnCount} />
                </div>
            </div>
        </section>
    );
}

function StatusStep({
    label,
    count,
    hasArrow = false,
}: {
    label: string;
    count: number;
    hasArrow?: boolean;
}) {
    return (
        <div
            className={css({
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
            })}
        >
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { base: '8px', md: '12px' },
                })}
            >
                <div
                    className={css({
                        width: { base: '60px', sm: '64px', md: '70px' },
                        height: { base: '60px', sm: '64px', md: '70px' },
                        borderRadius: '50%',
                        backgroundColor: '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: { base: '18px', md: '24px' },
                        fontWeight: 'bold',
                        color: count > 0 ? '#000' : '#aaa', // 숫자가 있으면 검정, 0이면 회색
                    })}
                >
                    {count}
                </div>
                <span
                    className={css({
                        fontSize: { base: '11px', sm: '12px', md: '14px' },
                        color: '#333',
                        fontWeight: '500',
                        textAlign: 'center',
                        wordBreak: 'keep-all',
                    })}
                >
                    {label}
                </span>
            </div>

            {hasArrow && (
                <div
                    className={css({
                        fontSize: { base: '12px', md: '18px' },
                        color: '#ddd',
                        marginLeft: { base: '2px', sm: '8px', md: '20px' },
                        marginRight: { base: '2px', sm: '8px', md: '0' },
                        // 화살표를 동그라미 높이에 맞춰 정렬
                        transform: {
                            base: 'translateY(-10px)',
                            md: 'translateY(-15px)',
                        },
                    })}
                >
                    {'>'}
                </div>
            )}
        </div>
    );
}

function SubStatusItem({ label, count }: { label: string; count: number }) {
    return (
        <div
            className={css({
                display: 'flex',
                flexDirection: { base: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: { base: '12px', md: '13px' },
                color: '#666',
                gap: { base: '4px', md: '0' },
                flex: { base: 1, md: 'none' },
            })}
        >
            <span>{label}</span>
            <span
                className={css({
                    fontWeight: count > 0 ? 'bold' : 'normal',
                    color: count > 0 ? '#000' : '#888',
                    fontSize: { base: '14px', md: '13px' },
                })}
            >
                {count}
            </span>
        </div>
    );
}
