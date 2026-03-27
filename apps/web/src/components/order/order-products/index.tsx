// TODO: orderSheetData에서 주문 상품 목록을 가져와 렌더링
// TODO: useOrderSheet hook으로 상품 데이터 조회
// TODO: 상품 이미지, 브랜드명, 상품명, 수량, 가격 표시
// TODO: CSS 모듈 적용

const OrderProducts = () => {
    return (
        <section>
            <h3>주문 상품</h3>

            {/* TODO: 상품 목록 렌더링 */}
            {/* orderSheetData.orderSheetProducts 또는 유사한 필드 사용 */}
            <ul>
                <li
                    style={{
                        display: 'flex',
                        gap: '12px',
                        padding: '16px 0',
                        borderBottom: '1px solid #eee',
                    }}
                >
                    {/* TODO: 상품 썸네일 이미지 */}
                    <div
                        style={{
                            width: '80px',
                            height: '80px',
                            background: '#f5f5f5',
                            borderRadius: '4px',
                            flexShrink: 0,
                        }}
                    />
                    <div style={{ flex: 1 }}>
                        {/* TODO: 브랜드명 */}
                        <p style={{ fontSize: '12px', color: '#999' }}>브랜드명</p>
                        {/* TODO: 상품명 */}
                        <p style={{ fontSize: '14px', fontWeight: 500 }}>상품명</p>
                        {/* TODO: 수량 */}
                        <p style={{ fontSize: '13px', color: '#666', marginTop: '8px' }}>
                            수량 1개
                        </p>
                    </div>
                    {/* TODO: 상품 금액 */}
                    <p style={{ fontSize: '15px', fontWeight: 700 }}>0원</p>
                </li>
            </ul>
        </section>
    );
};

export default OrderProducts;
