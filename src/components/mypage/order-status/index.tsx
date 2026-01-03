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

export default function OrderStatus({
    depositPending = 0,
    shippingPending = 0,
    shipping = 0,
    deliveryCompleted = 0,
    cancel = 6,
    exchange = 0,
    return: returnCount = 0,
}: OrderStatusProps) {
    return (
        <section className={css({ marginBottom: '60px' })}>
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
                        fontSize: '20px',
                        fontWeight: 'bold',
                    })}
                >
                    주문 현황
                </h3>
                <span className={css({ fontSize: '13px', color: '#888' })}>
                    최근 3개월 기준
                </span>
            </div>

            <div
                className={css({
                    display: 'flex',
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
                        padding: '30px 0',
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
                        width: '240px',
                        backgroundColor: '#f9f9f9',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: '0 30px',
                        gap: '12px',
                        borderLeft: '1px solid #eee',
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
                position: 'relative',
            })}
        >
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                })}
            >
                <div
                    className={css({
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        backgroundColor: '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: count > 0 ? '#000' : '#aaa', // 숫자가 있으면 검정, 0이면 회색
                    })}
                >
                    {count}
                </div>
                <span
                    className={css({
                        fontSize: '14px',
                        color: '#333',
                        fontWeight: '500',
                    })}
                >
                    {label}
                </span>
            </div>

            {hasArrow && (
                <div
                    className={css({
                        fontSize: '18px',
                        color: '#ddd',
                        marginLeft: '40px', // 화살표 간격 조정
                        marginBottom: '30px', // 텍스트 높이 고려하여 살짝 위로
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
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '13px',
                color: '#666',
            })}
        >
            <span>{label}</span>
            <span
                className={css({
                    fontWeight: count > 0 ? 'bold' : 'normal',
                    color: count > 0 ? '#000' : '#888',
                })}
            >
                {count}
            </span>
        </div>
    );
}
