'use client';

import { useTranslation } from 'react-i18next';

import { css } from '@/styled-system/css';
import { flex, vstack } from '@/styled-system/patterns';
import { token } from '@/styled-system/tokens';
import {
    useProductOptionActions,
    useProductOptionTotalPrice,
    useSelectedOptions,
} from '@/store/product/useProductOptionStore';
import { KRW } from '@/utils/currency';

const SelectedOptionList = () => {
    const { t } = useTranslation();

    const selectedOptions = useSelectedOptions();
    const { updateCount, removeOption } = useProductOptionActions();
    const totalPrice = useProductOptionTotalPrice();

    if (selectedOptions.length === 0) return null;

    return (
        <div
            className={vstack({
                alignItems: 'stretch',
                gap: '24px',
            })}
        >
            <ul className={flex({ flexDirection: 'column', gap: '8px' })}>
                {selectedOptions.map((option) => (
                    <li
                        key={option.optionNo}
                        className={vstack({
                            alignItems: 'stretch',
                            gap: '12px',
                            padding: '16px',
                        })}
                    >
                        <div
                            className={flex({
                                justifyContent: 'space-between',
                            })}
                        >
                            <span
                                className={css({
                                    textStyle: 'headline2.semibold',
                                })}
                            >
                                {option.value}
                            </span>
                            <button
                                type='button'
                                onClick={() => removeOption(option.optionNo)}
                                className={css({ cursor: 'pointer' })}
                            >
                                X
                            </button>
                        </div>
                        <div
                            className={flex({
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            })}
                        >
                            <div
                                className={flex({
                                    alignItems: 'center',
                                    border: `1px solid ${token('colors.gray20')}`,
                                    backgroundColor: 'white',
                                })}
                            >
                                <button
                                    type='button'
                                    className={css({
                                        padding: '4px 8px',
                                        borderRight: `1px solid ${token('colors.gray20')}`,
                                    })}
                                    onClick={() =>
                                        updateCount(
                                            option.optionNo,
                                            option.count - 1,
                                        )
                                    }
                                >
                                    -
                                </button>
                                <span
                                    className={css({
                                        padding: '4px 12px',
                                        minWidth: '40px',
                                        textAlign: 'center',
                                    })}
                                >
                                    {option.count}
                                </span>
                                <button
                                    type='button'
                                    className={css({
                                        padding: '4px 12px',
                                        borderLeft: `1px solid ${token('colors.gray20')}`,
                                    })}
                                    onClick={() =>
                                        updateCount(
                                            option.optionNo,
                                            option.count + 1,
                                        )
                                    }
                                >
                                    +
                                </button>
                            </div>
                            <span
                                className={css({
                                    textStyle: 'headline2.semibold',
                                })}
                            >
                                {KRW(option.buyPrice * option.count).format()}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>

            <div
                className={vstack({
                    gap: '16px',
                    width: '100%',
                    alignItems: 'stretch',
                })}
            >
                <hr
                    className={css({
                        border: `2px solid ${token('colors.black')}`,
                    })}
                />

                <div
                    className={flex({
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px 0',
                        borderTop: `1px solid ${token('colors.gray20')}`,
                        marginTop: '8px',
                    })}
                >
                    <span
                        className={css({
                            textStyle: 'heading.semibold',
                            color: token('colors.gray90'),
                        })}
                    >
                        {t('예상 결제 금액')}
                    </span>
                    <span
                        className={css({
                            textStyle: 'title1.bold',
                            color: token('colors.red'),
                        })}
                    >
                        {KRW(totalPrice).format()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SelectedOptionList;
