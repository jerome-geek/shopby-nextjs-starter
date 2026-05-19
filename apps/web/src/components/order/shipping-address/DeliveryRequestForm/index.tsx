import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
    InputField,
    InputFieldContainer,
    InputLabel,
    Select,
} from '@/components/ui/input';
import { PaymentReserveSchemaType } from '@/schema';

const DELIVERY_REQUEST_DIRECT = 'DIRECT';

export const DeliveryRequestForm = () => {
    const { t } = useTranslation();
    const { setValue, control } = useFormContext<PaymentReserveSchemaType>();

    // 폼 상태의 addressMemo 값을 동적으로 추적
    const memoValue = useWatch({ control, name: 'orderMemo' }) || '';

    const deliveryRequestOptions = [
        { value: 'DOOR', label: t('문 앞에 놓아주세요') },
        { value: 'SECURITY', label: t('경비실에 맡겨주세요') },
        { value: 'BOX', label: t('택배함에 넣어주세요') },
        { value: DELIVERY_REQUEST_DIRECT, label: t('직접 입력') },
    ];

    // 기존 폼 값과 정적 템플릿 간의 매칭 옵션 도출 (파생 상태)
    const currentSelectOption =
        deliveryRequestOptions.find(
            (opt) =>
                opt.value !== DELIVERY_REQUEST_DIRECT &&
                opt.label === memoValue,
        ) ||
        deliveryRequestOptions.find(
            (opt) => opt.value === DELIVERY_REQUEST_DIRECT,
        ) ||
        deliveryRequestOptions[3];

    const isDirectInput = currentSelectOption.value === DELIVERY_REQUEST_DIRECT;

    const setAddressMemo = (memo: string) => setValue('orderMemo', memo);

    const handleDeliveryRequestChange = (
        option: (typeof deliveryRequestOptions)[number] | null,
    ) => {
        if (!option) return;

        if (option.value !== DELIVERY_REQUEST_DIRECT) {
            setAddressMemo(option.label);
        } else {
            setAddressMemo('');
        }
    };

    return (
        <InputFieldContainer>
            <InputLabel>{t('배송 요청사항')}</InputLabel>
            <Select
                options={deliveryRequestOptions}
                value={currentSelectOption}
                onChange={handleDeliveryRequestChange}
            />
            {isDirectInput && (
                <InputField
                    placeholder={t('배송지 메모를 입력해주세요')}
                    style={{ marginTop: '8px' }}
                    value={memoValue}
                    onChange={(e) => setAddressMemo(e.target.value)}
                />
            )}
        </InputFieldContainer>
    );
};
