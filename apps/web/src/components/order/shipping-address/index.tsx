// TODO: useOrderSheet로 회원 기본 배송지 조회
// TODO: 배송지 선택 오버레이 구현 (overlay-kit 사용)
// TODO: 선택된 배송지를 useFormContext의 shippingAddress 필드에 반영
// TODO: 비회원의 경우 직접 주소 입력 폼 제공
// TODO: CSS 모듈 적용

const ShippingAddress = () => {
    const handleSelectAddress = () => {
        // TODO: overlay-kit으로 배송지 선택 모달 오픈
    };

    return (
        <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>배송지 정보</h3>
                <button
                    type='button'
                    onClick={handleSelectAddress}
                    style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '14px',
                        color: '#666',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                    }}
                >
                    배송지 선택하기 {'>'}
                </button>
            </div>

            {/* TODO: 선택된 배송지 카드 렌더링 */}
            {/* TODO: 기본배송지 여부에 따라 뱃지 표시 */}
            <div
                style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '16px',
                    marginTop: '12px',
                }}
            >
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                    {/* TODO: addressAlias (배송지 별칭) */}
                    <span style={{ fontWeight: 600 }}>집</span>
                    {/* TODO: 기본배송지인 경우에만 표시 */}
                    <span
                        style={{
                            fontSize: '11px',
                            background: '#333',
                            color: '#fff',
                            padding: '2px 6px',
                            borderRadius: '4px',
                        }}
                    >
                        기본배송지
                    </span>
                </div>
                {/* TODO: 전체 주소 (우편번호 + 기본주소 + 상세주소) */}
                <p style={{ fontSize: '14px', color: '#333', marginBottom: '4px' }}>
                    서울시 강남구 테헤란로 123, @@건물 201호 (00000)
                </p>
                {/* TODO: 수령인 이름 + 전화번호 */}
                <p style={{ fontSize: '13px', color: '#666' }}>홍길동 (010-1234-5678)</p>
            </div>
        </section>
    );
};

export default ShippingAddress;
