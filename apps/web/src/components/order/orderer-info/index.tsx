// TODO: useFormContext로 react-hook-form 연결
// TODO: 로그인 회원의 경우 기본값으로 회원 정보 자동 입력
// TODO: 비회원의 경우 직접 입력 필드 제공
// TODO: CSS 모듈 적용

const OrdererInfo = () => {
    return (
        <section>
            <h3>주문자 정보</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px' }}>
                        이름
                    </label>
                    {/* TODO: register('ordererName') 연결 */}
                    <input
                        type='text'
                        placeholder='홍길동'
                        style={{
                            width: '100%',
                            height: '48px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            padding: '0 12px',
                            fontSize: '14px',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px' }}>
                        전화번호
                    </label>
                    {/* TODO: register('ordererContact1') 연결 */}
                    <input
                        type='tel'
                        placeholder='010-1234-5678'
                        style={{
                            width: '100%',
                            height: '48px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            padding: '0 12px',
                            fontSize: '14px',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>
            </div>
        </section>
    );
};

export default OrdererInfo;
