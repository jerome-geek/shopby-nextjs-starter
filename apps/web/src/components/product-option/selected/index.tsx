import { Minus, Plus, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
                        </span>
                        {isRemovable && (
                            <button
                                className={styles.deleteButton}
                                onClick={() => removeOption(option.optionNo)}
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {/* 옵션별 텍스트 입력항목 (OPTION 매칭 타입) */}
                    {(textOptionInputs.OPTION ?? []).length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {(textOptionInputs.OPTION ?? []).map((input) => (
                                <InputContainer
                                    key={input.inputNo}
                                >
                                    <InputLabel>{input.inputLabel}</InputLabel>
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
                                            updateTextOptionValue({
                                                productNo,
                                                inputNo: input.inputNo,
                                                inputValue: e.target.value,
                                                optionNo: option.optionNo
                                            })
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
                                <Minus size={14} />
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
                                <Plus size={14} />
                            </button>
                        </div>
                        <span className={styles.priceValue}>
                            {CURRENCY(
                                (option.price + option.addPrice) *
                                    option.orderCnt,
                            ).format()}
                        </span>
                    </div>
                </li>
            ))}
        </ul>
    );
};
