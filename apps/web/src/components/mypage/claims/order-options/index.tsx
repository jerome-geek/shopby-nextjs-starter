import { useTranslation } from 'react-i18next';
import { useFormContext, Controller } from 'react-hook-form';
import { OrderOptionsItem } from '@/components/mypage/orders/order-options-item';
import { InputCheckbox } from '@/components/ui/input/checkbox';
import ErrorMessage from '@/components/ui/form/ErrorMessage';
import { ClaimableOption } from '@/models/claim';

interface ClaimOrderOptionsProps {
    orderOptionList: ClaimableOption[];
}

export const ClaimOrderOptions = ({
    orderOptionList,
}: ClaimOrderOptionsProps) => {
    const { t } = useTranslation();
    const { control } = useFormContext();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
                {t('상품 정보')}
            </h3>
            <ul
                style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                }}
            >
                {orderOptionList.map((option, index) => (
                    <li
                        key={option.orderOptionNo}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '16px',
                            border: '1px solid #eee',
                            borderRadius: '8px',
                        }}
                    >
                        {orderOptionList.length > 1 && (
                            <Controller
                                name={`claimedProductOptions.${index}.isChecked`}
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <InputCheckbox
                                        checked={value}
                                        onCheckedChange={onChange}
                                    />
                                )}
                            />
                        )}
                        <div style={{ flex: 1 }}>
                            <OrderOptionsItem
                                {...option}
                                optionTitle={
                                    option.optionTitle || option.optionName
                                }
                                nextActions={[]}
                            />
                        </div>
                    </li>
                ))}
            </ul>
            <ErrorMessage name='claimedProductOptions' />
        </div>
    );
};

export default ClaimOrderOptions;
