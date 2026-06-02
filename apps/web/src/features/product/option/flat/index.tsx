import { pipe, prop, sortBy, toArray } from '@fxts/core';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Props, SingleValue } from 'react-select';

import * as styles from '@/features/product/option/flat/index.css';
import useProductOption from '@/hooks/product/useProductOption';
import type { FlatOption } from '@/models/product/productOption';
import { Select } from '@/shared/ui/input';

interface FlatProductOptionProps {
    productNo: number;
    onChange: (option: SingleValue<FlatOption>) => void;
    checkOptionDisabled?: (option: FlatOption) => boolean;
    classNames?: Props<FlatOption>['classNames'];
    menuPortalTarget?: HTMLElement | null;
    isExtraProduct?: boolean;
}

export const FlatProductOption = ({
    productNo,
    onChange,
    checkOptionDisabled,
    classNames,
    menuPortalTarget = typeof window !== 'undefined' ? document.body : null,
    isExtraProduct = false,
}: FlatProductOptionProps) => {
    const { t } = useTranslation();

    const [selected, setSelected] = useState<SingleValue<FlatOption>>(null);

    const { productOptionListData, isOptionDisabled, getFlatOptionLabel } =
        useProductOption({
            productNo,
        });

    const options = useMemo(() => {
        if (!productOptionListData) {
            return [];
        }

        return pipe(
            productOptionListData,
            prop('flatOptions'),
            sortBy((a) => a.main),
            toArray,
        );
    }, [productOptionListData]);

    const onOptionChange = (v: SingleValue<FlatOption>) => {
        onChange(v);
        setSelected(null);
    };

    return (
        <div className={styles.container}>
            {/* TODO: 필수옵션인지 여부에 따라서 after속성 다르게 보여줘야함 */}
            {!isExtraProduct && (
                <label
                    className={styles.optionLabel({
                        required: !!productOptionListData?.isRequiredOption,
                    })}
                    htmlFor={`flat-option-select-${productNo}`}
                >
                    {productOptionListData?.labels?.[0] || t('옵션')}
                </label>
            )}

            <Select
                id={`flat-option-select-${productNo}`}
                value={selected}
                options={options}
                placeholder={t('옵션을 선택해 주세요.')}
                getOptionLabel={(option) => {
                    return `${
                        option.isRequiredOption ? '(필수)' : ''
                    } ${getFlatOptionLabel(option)}`;
                }}
                getOptionValue={(option) => option.value}
                isOptionDisabled={checkOptionDisabled ?? isOptionDisabled}
                onChange={(v) => onOptionChange(v as SingleValue<FlatOption>)}
                // menuPlacement={isMobile ? 'bottom' : 'auto'}
                menuPortalTarget={menuPortalTarget}
                maxMenuHeight={200}
                classNames={classNames}
            />
        </div>
    );
};
