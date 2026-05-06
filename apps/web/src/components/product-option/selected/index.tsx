import { useTranslation } from 'react-i18next';

import { CloseIcon } from '@/components/icons/Close';
import { MinusIcon } from '@/components/icons/Minus';
import { PlusIcon } from '@/components/icons/Plus';
import * as styles from '@/components/product-option/selected/index.css';
import { InputContainer, InputField, InputLabel } from '@/components/ui/input';

import { useProductOption } from '@/hooks/product';
import { useProductOptionStore } from '@/store/useProductOptionStore';
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

    const {
        selectedOptionList,
        updateOptionCnt,
        removeOption,
        updateTextOptionValue,
    } = useProductOptionStore();

    const getInputOptionDefaultValue = (inputNo: number, optionNo?: number) => {
        const findOption = optionNo
            ? selectedOptionList.find((a) => a.optionNo === optionNo)
            : selectedOptionList[0];

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

    if (selectedOptionList.length === 0) {
        return null;
    }

    return (
        <ul className={styles.optionList}>
            {selectedOptionList.map((option) => (
                <li key={option.optionNo} className={styles.optionListItem}>
                    <div className={styles.optionHeader}>
                        <span className={styles.optionLabel}>
                            {option.label}
                            {option.value && ` [${option.value.replace(/\|/g, ' / ')}]`}
                        </span>
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
                                        <InputLabel>
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
                        <div className={styles.quantitySelector}>
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
                        </div>
                        <span className={styles.priceValue}>
                            {CURRENCY(option.buyPrice)
                                .multiply(option.orderCnt)
                                .format()}
                        </span>
                    </div>
                </li>
            ))}

            {selectedOptionList.some((opt) => isMainProductOption(opt.productNo)) &&
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
