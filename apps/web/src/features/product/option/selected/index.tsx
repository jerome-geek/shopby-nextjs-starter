import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import * as styles from '@/features/product/option/selected/index.css';
import { useProductOptionStore } from '@/features/product/option/store/useProductOptionStore';
import { useProduct, useProductOption } from '@/hooks/product';
import { QuantityController } from '@/shared/ui';
import { CloseIcon } from '@/shared/ui/icons/Close';
import { InputContainer, InputField, InputLabel } from '@/shared/ui/input';
import { CURRENCY } from '@/utils/currency';

interface SelectedProductOptionProps {
    productNo: number;
    isRemovable?: boolean;
}

export const SelectedProductOption = ({
    productNo,
    isRemovable = false,
}: SelectedProductOptionProps) => {
    const { t } = useTranslation();

    const { textOptionInputs } = useProductOption({
        productNo,
    });

    const { minBuyCnt } = useProduct({
        productNo,
    });

    const {
        selectedOptionList,
        updateOptionCnt,
        removeOption,
        updateTextOptionValue,
    } = useProductOptionStore();

    const filteredSelectedOptionList = useMemo(() => {
        return selectedOptionList.filter(
            (option) => option.productNo === productNo,
        );
    }, [selectedOptionList, productNo]);

    const getInputOptionDefaultValue = (inputNo: number, optionNo?: number) => {
        const findOption = optionNo
            ? filteredSelectedOptionList.find((a) => a.optionNo === optionNo)
            : filteredSelectedOptionList[0];

        return (
            findOption?.optionInputs?.find((a) => a.inputNo === inputNo)
                ?.inputValue || ''
        );
    };

    const handleTextOptionChange = (
        inputValue: string,
        inputNo: number,
        optionNo?: number,
    ) => {
        const allInputs = [
            ...(textOptionInputs['PRODUCT'] || []),
            ...(textOptionInputs['OPTION'] || []),
        ];
        const inputInfo = allInputs.find((input) => input.inputNo === inputNo);

        if (inputInfo) {
            updateTextOptionValue({
                ...inputInfo,
                inputValue,
                optionNo,
                productNo,
            });
        }
    };

    const isMainProductOption = (currentProductNo: number) =>
        currentProductNo === productNo;

    if (filteredSelectedOptionList.length === 0) {
        return null;
    }

    return (
        <ul className={styles.optionList}>
            {filteredSelectedOptionList.map((option) => (
                <li key={option.optionNo} className={styles.optionListItem}>
                    <div className={styles.optionHeader}>
                        <span
                            className={styles.optionLabel}
                            dangerouslySetInnerHTML={{
                                __html: `${option.label}${
                                    option.value &&
                                    ` [${option.value.replace(/\|/g, ' / ')}]`
                                }`,
                            }}
                        />
                        {isRemovable && (
                            <button
                                className={styles.deleteButton}
                                onClick={() => removeOption(option.optionNo)}
                            >
                                <CloseIcon />
                            </button>
                        )}
                    </div>

                    {/* 옵션별 텍스트 입력항목 (OPTION 매칭 타입) */}
                    {isMainProductOption(option.productNo) &&
                        textOptionInputs['OPTION']?.length > 0 && (
                            <div className={styles.textOptionList}>
                                {textOptionInputs['OPTION'].map((input) => (
                                    <InputContainer key={input.inputNo}>
                                        <InputLabel isRequired={input.required}>
                                            {input.inputLabel}
                                        </InputLabel>
                                        <InputField
                                            placeholder={t(
                                                '메시지를 입력해주세요.',
                                            )}
                                            value={
                                                option.optionInputs.find(
                                                    (v) =>
                                                        v.inputNo ===
                                                        input.inputNo,
                                                )?.inputValue || ''
                                            }
                                            onChange={(e) =>
                                                handleTextOptionChange(
                                                    e.target.value,
                                                    input.inputNo,
                                                    option.optionNo,
                                                )
                                            }
                                        />
                                    </InputContainer>
                                ))}
                            </div>
                        )}

                    <div className={styles.optionFooter}>
                        {/* <div className={styles.quantitySelector}>
                            <button
                                className={styles.countButton}
                                disabled={option.orderCnt <= 1}
                                onClick={() =>
                                    updateOptionCnt(
                                        option.optionNo,
                                        option.orderCnt - 1,
                                    )
                                }
                            >
                                <MinusIcon />
                            </button>
                            <span className={styles.countValue}>
                                {option.orderCnt}
                            </span>
                            <button
                                className={styles.countButton}
                                onClick={() =>
                                    updateOptionCnt(
                                        option.optionNo,
                                        option.orderCnt + 1,
                                    )
                                }
                            >
                                <PlusIcon />
                            </button>
                        </div> */}
                        <QuantityController
                            value={option.orderCnt}
                            min={minBuyCnt || 1}
                            max={option.stockCnt}
                            onChange={(nextValue) =>
                                updateOptionCnt(option.optionNo, nextValue)
                            }
                        />
                        <span className={styles.priceValue}>
                            {CURRENCY(option.buyPrice)
                                .multiply(option.orderCnt)
                                .format()}
                        </span>
                    </div>
                </li>
            ))}

            {filteredSelectedOptionList.some((opt) =>
                isMainProductOption(opt.productNo),
            ) &&
                textOptionInputs['PRODUCT']?.map(
                    ({ inputNo, inputLabel, required, inputValue }) => (
                        <InputContainer key={inputNo}>
                            <InputLabel
                                isRequired={required}
                                htmlFor={`product-text-option-${inputNo}`}
                            >
                                {t(`${inputLabel} (상품별 옵션)`)}
                            </InputLabel>

                            <InputField
                                id={`product-text-option-${inputNo}`}
                                placeholder={t(
                                    `${inputLabel} 을/를 입력해주세요.`,
                                )}
                                value={inputValue || ''}
                                required={required}
                                onChange={(e) =>
                                    handleTextOptionChange(
                                        e.target.value,
                                        inputNo,
                                    )
                                }
                            />
                        </InputContainer>
                    ),
                )}
        </ul>
    );
};
