import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { OrderOptionsItem } from '@/features/mypage/orders/order-options-item';
import { InputCheckbox } from '@/shared/ui/input/checkbox';
import { QuantityController } from '@/shared/ui/quantity-controller';
import type { ClaimableOption } from '@/entities/claim/model';
import { ErrorMessage } from '@/shared/components/form';

interface ClaimOrderOptionsProps {
    orderOptionList: ClaimableOption[];
}

export const ClaimOrderOptions = ({
    orderOptionList,
}: ClaimOrderOptionsProps) => {
    const { t } = useTranslation();
    const { control, setValue } = useFormContext();

    const claimedProductOptions = useWatch({
        control,
        name: 'claimedProductOptions',
    }) as Array<{ isChecked?: boolean } | undefined> | undefined;

    const isMultipleOptions = orderOptionList.length > 1;
    const totalCount = orderOptionList.length;
    const checkedCount =
        claimedProductOptions?.filter((opt) => !!opt?.isChecked).length ?? 0;
    const isAllChecked = totalCount > 0 && checkedCount === totalCount;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                }}
            >
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
                    {t('상품 정보')}
                </h3>

                {isMultipleOptions && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <InputCheckbox
                            checked={isAllChecked}
                            onCheckedChange={() => {
                                const nextChecked = !isAllChecked;

                                orderOptionList.forEach((_, index) => {
                                    setValue(
                                        `claimedProductOptions.${index}.isChecked`,
                                        nextChecked,
                                        {
                                            shouldDirty: true,
                                            shouldTouch: true,
                                        },
                                    );
                                });
                            }}
                        />
                        <button
                            type='button'
                            onClick={() => {
                                const nextChecked = !isAllChecked;

                                orderOptionList.forEach((_, index) => {
                                    setValue(
                                        `claimedProductOptions.${index}.isChecked`,
                                        nextChecked,
                                        {
                                            shouldDirty: true,
                                            shouldTouch: true,
                                        },
                                    );
                                });
                            }}
                            style={{
                                border: 0,
                                background: 'transparent',
                                padding: 0,
                                marginLeft: '8px',
                                fontSize: '14px',
                                fontWeight: 500,
                                cursor: 'pointer',
                            }}
                        >
                            {isAllChecked ? t('전체 해제') : t('전체 선택')}
                        </button>
                    </div>
                )}
            </div>
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
                    // `claimedProductOptions`는 상위 폼에서 `orderOptionList` 기반으로 reset 되며 인덱스가 매칭된다고 가정합니다.
                    <li
                        key={option.orderOptionNo}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '16px',
                            border: '1px solid #eee',
                            borderRadius: '8px',
                            flexWrap: 'wrap',
                        }}
                    >
                        {/**
                         * 복수 옵션일 때만 체크박스 노출
                         * 단일 옵션일 경우 상위에서 기본값이 체크(true)로 세팅됩니다.
                         */}
                        {isMultipleOptions && (
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
                        <div style={{ flex: '1 1 300px', minWidth: 0 }}>
                            <OrderOptionsItem
                                {...option}
                                optionTitle={
                                    option.optionTitle || option.optionName
                                }
                                nextActions={[]}
                                showInquiryButton={false}
                            />
                        </div>

                        <Controller
                            name={`claimedProductOptions.${index}.productCnt`}
                            control={control}
                            render={({ field: { value, onChange } }) => {
                                const currentCnt = value ?? 1;
                                const minCnt = 1;
                                const maxCnt = option.orderCnt;

                                return (
                                    <div style={{ marginLeft: 'auto' }}>
                                        <QuantityController
                                            value={currentCnt}
                                            min={minCnt}
                                            max={maxCnt}
                                            onChange={onChange}
                                        />
                                    </div>
                                );
                            }}
                        />
                    </li>
                ))}
            </ul>
            <ErrorMessage name='claimedProductOptions' />
        </div>
    );
};

export default ClaimOrderOptions;
