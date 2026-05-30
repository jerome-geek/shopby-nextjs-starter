import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { ClaimPriceInfo as ClaimPriceInfoType } from '@/models/claim';
import { CURRENCY } from '@/utils/currency';

interface ClaimPriceInfoProps {
    claimPriceData: ClaimPriceInfoType;
}

export const ClaimPriceInfo = ({ claimPriceData }: ClaimPriceInfoProps) => {
    const { t } = useTranslation();
    const { setValue } = useFormContext();

    const isAdditionalPay = claimPriceData.additionalPayAmt > 0;
    const isRefund = claimPriceData.refundMainPayAmt > 0;

    useEffect(() => {
        if (claimPriceData.refundPayType !== 'ACCOUNT') {
            setValue('bankAccountInfo', undefined);
        }
    }, [claimPriceData.refundPayType, setValue]);

    if (!isAdditionalPay && !isRefund) {
        return null;
    }

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
                    {isAdditionalPay ? t('추가결제정보') : t('환불정보')}
                </h3>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        padding: '16px',
                        border: '1px solid #eee',
                        borderRadius: '8px',
                    }}
                >
                    {isAdditionalPay ? (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '14px',
                            }}
                        >
                            <span style={{ color: '#666' }}>
                                {t('추가결제금액')}
                            </span>
                            <span style={{ fontWeight: 600 }}>
                                {CURRENCY(
                                    claimPriceData.additionalPayAmt || 0,
                                ).format()}
                            </span>
                        </div>
                    ) : (
                        <>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '14px',
                                }}
                            >
                                <span style={{ color: '#666' }}>
                                    {t('환불방법')}
                                </span>
                                <span>{claimPriceData.refundTypeLabel}</span>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '14px',
                                }}
                            >
                                <span style={{ color: '#666' }}>
                                    {t('환불금액')}
                                </span>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 600 }}>
                                        {CURRENCY(
                                            claimPriceData.refundMainPayAmt ||
                                                0,
                                        ).format()}
                                    </div>
                                    <div
                                        style={{
                                            color: '#888',
                                            fontSize: '12px',
                                            marginTop: '4px',
                                        }}
                                    >
                                        {t('상품')}{' '}
                                        {CURRENCY(
                                            claimPriceData.productAmtInfo
                                                ?.totalAmt || 0,
                                        ).format()}
                                        {' / '}
                                        {t('배송비')}{' '}
                                        {CURRENCY(
                                            claimPriceData.deliveryAmtInfo
                                                ?.totalAmt || 0,
                                        ).format()}
                                    </div>
                                </div>
                            </div>
                            {claimPriceData.refundSubPayAmt > 0 && (
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: '14px',
                                    }}
                                >
                                    <span style={{ color: '#666' }}>
                                        {t('적립금환불금액')}
                                    </span>
                                    <span>
                                        {CURRENCY(
                                            claimPriceData.refundSubPayAmt || 0,
                                        ).format()}
                                    </span>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ClaimPriceInfo;
