import { Minus, Plus, X } from 'lucide-react';

import { useProductOptionStore } from '@/store/useProductOptionStore';
import * as styles from '@/components/product/option/selected/index.css';
import { formatPrice } from '@/utils/currency';

const SelectedProductOption = () => {
    const { selectedOptionList, updateOptionCnt, removeOption } =
        useProductOptionStore();
    console.log(
        '🚀 ~ SelectedProductOption ~ selectedOptionList:',
        selectedOptionList,
    );

    if (selectedOptionList.length === 0) {
        return null;
    }

    const handleMinusClick = (optionNo: number, currentCnt: number) => {
        if (currentCnt > 1) {
            updateOptionCnt(optionNo, currentCnt - 1);
        }
    };

    const handlePlusClick = (
        optionNo: number,
        currentCnt: number,
        stockCnt: number,
    ) => {
        if (stockCnt === -999 || currentCnt < stockCnt) {
            updateOptionCnt(optionNo, currentCnt + 1);
        }
    };

    const handleRemoveClick = (optionNo: number) => {
        removeOption(optionNo);
    };

    return (
        <ul className={styles.optionList}>
            {selectedOptionList.map((option) => {
                return (
                    <li key={option.optionNo} className={styles.optionListItem}>
                        <div className={styles.optionHeader}>
                            <p className={styles.optionLabel}>{option.value}</p>
                            <button
                                className={styles.deleteButton}
                                onClick={() =>
                                    handleRemoveClick(option.optionNo)
                                }
                                aria-label='옵션 삭제'
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className={styles.optionFooter}>
                            <div className={styles.quantitySelector}>
                                <button
                                    className={styles.countButton}
                                    onClick={() =>
                                        handleMinusClick(
                                            option.optionNo,
                                            option.orderCnt,
                                        )
                                    }
                                    disabled={option.orderCnt <= 1}
                                    aria-label='수량 감소'
                                >
                                    <Minus size={20} />
                                </button>
                                <div className={styles.countValue}>
                                    {option.orderCnt}
                                </div>
                                <button
                                    className={styles.countButton}
                                    onClick={() =>
                                        handlePlusClick(
                                            option.optionNo,
                                            option.orderCnt,
                                            option.stockCnt,
                                        )
                                    }
                                    disabled={
                                        option.stockCnt !== -999 &&
                                        option.orderCnt >= option.stockCnt
                                    }
                                    aria-label='수량 증가'
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                            <div className={styles.priceValue}>
                                {formatPrice(option.price * option.orderCnt)}
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default SelectedProductOption;
