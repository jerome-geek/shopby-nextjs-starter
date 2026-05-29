import { concat, filter, isEmpty, map, pipe, toArray } from '@fxts/core';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { CSSProperties } from 'react';

import { CustomAccordion } from '@/shared/ui/accordion';
import * as styles from '@/features/mypage/common/option-text/index.css';

interface OptionTextProps {
    optionTitle?: Nullable<string>;
    optionValue?: Nullable<string>;
    optionName?: Nullable<string>;
    productName?: Nullable<string>;
    inputs?: Nullable<
        Array<{
            inputValue?: Nullable<string>;
            inputLabel?: Nullable<string>;
        }>
    >;
    orderCnt?: Nullable<number>;
    containerStyle?: CSSProperties;
    optionTextStyle?: CSSProperties;
    isOpenAccordion?: boolean;
}

const formatOptionText = ({
    optionTitle,
    optionName,
    optionValue,
    orderCnt,
}: Pick<
    OptionTextProps,
    'optionTitle' | 'optionName' | 'optionValue' | 'orderCnt'
>) => {
    const title = optionTitle?.trim() ?? '';

    const orderCntText = `· ${(orderCnt ?? 0).toLocaleString() ?? ''}개`;

    if (title) {
        return `${title} ${orderCnt ? orderCntText : ''}`;
    }

    const name = optionName?.trim() ?? '';
    const value = optionValue?.trim() ?? '';

    if (name && value) {
        if (name === value) {
            return `${value} ${orderCnt ? orderCntText : ''}`;
        }
        return `${name}: ${value} ${orderCnt ? orderCntText : ''}`;
    }

    return '';
};

export const OptionText = ({
    optionTitle = '',
    optionName = '',
    optionValue = '',
    productName = '',
    inputs,
    orderCnt = 0,
    containerStyle,
    optionTextStyle,
    isOpenAccordion = false,
}: OptionTextProps) => {
    const { t } = useTranslation();

    const optionText = useMemo(() => {
        return formatOptionText({
            optionTitle,
            optionName,
            optionValue,
            orderCnt,
        });
    }, [optionTitle, optionName, optionValue, orderCnt]);

    const optionLabelList = useMemo(() => {
        return pipe(
            inputs ?? [],
            map((input) =>
                input?.inputValue
                    ? `${input.inputLabel ?? ''}: ${input.inputValue}`
                    : '',
            ),
            concat([optionText === productName ? '' : optionText]),
            filter(Boolean),
            toArray,
        );
    }, [inputs, optionText, productName]);

    return (
        <div className={styles.container} style={containerStyle}>
            {!isEmpty(optionLabelList) &&
                (optionLabelList.length > 1 ? (
                    <div className={styles.accordionContainer}>
                        <CustomAccordion
                            type='single'
                            defaultValue={isOpenAccordion ? 'optionLabels' : ''}
                            items={[
                                {
                                    value: 'optionLabels',
                                    header: (
                                        <p
                                            className={styles.optionText}
                                            style={optionTextStyle}
                                        >
                                            {optionLabelList[0]}
                                        </p>
                                    ),
                                    content: (
                                        <ul className={styles.optionList}>
                                            {optionLabelList
                                                .slice(1)
                                                .map((label, index) => (
                                                    <li
                                                        key={`${label}-${index}`}
                                                    >
                                                        <p
                                                            className={
                                                                styles.optionText
                                                            }
                                                            style={
                                                                optionTextStyle
                                                            }
                                                        >
                                                            {label}
                                                        </p>
                                                    </li>
                                                ))}
                                        </ul>
                                    ),
                                },
                            ]}
                        />
                    </div>
                ) : (
                    <p className={styles.optionText} style={optionTextStyle}>
                        {optionLabelList[0]}
                    </p>
                ))}
        </div>
    );
};

export default OptionText;
