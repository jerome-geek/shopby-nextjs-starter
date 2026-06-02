import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Props, SingleValue } from 'react-select';

import * as styles from '@/features/product/option/required/index.css';
import useProductOption from '@/hooks/product/useProductOption';
import type { MultiLevelOption } from '@/models/product/productOption';
import { Select } from '@/shared/ui/input';

interface RequiredProductOptionProps {
    productNo: number;
    onChange: (option: SingleValue<MultiLevelOption>) => void;
    checkOptionDisabled?: (option: MultiLevelOption) => boolean;
    classNames?: Props<MultiLevelOption>['classNames'];
    menuPortalTarget?: HTMLElement | null;
    isExtraProduct?: boolean;
}

export const RequiredProductOption = ({
    productNo,
    onChange,
    checkOptionDisabled,
    classNames,
    menuPortalTarget = typeof window !== 'undefined' ? document.body : null,
    isExtraProduct = false,
}: RequiredProductOptionProps) => {
    const { t } = useTranslation();

    const [selected, setSelected] = useState<MultiLevelOption | null>(null);

    const {
        productOptionListData,
        isOptionDisabled,
        getMultiLevelOptionLabel,
    } = useProductOption({
        productNo,
    });

    const onOptionChange = (v: MultiLevelOption) => {
        onChange(v);
        setSelected(null);
    };

    return productOptionListData?.multiLevelOptions.map((option) => (
        <div className={styles.container} key={option.label}>
            {!isExtraProduct && (
                <label
                    className={styles.optionLabel({
                        required: option.isRequiredOption,
                    })}
                    htmlFor={`required-option-select-${option.label}`}
                >
                    {option.label}
                </label>
            )}

            <Select
                id={`required-option-select-${option.label}`}
                value={selected}
                options={option.children as MultiLevelOption[]}
                placeholder={t(`${option.label}을 선택해 주세요.`)}
                getOptionLabel={getMultiLevelOptionLabel}
                getOptionValue={(option) => option.value}
                isOptionDisabled={checkOptionDisabled ?? isOptionDisabled}
                onChange={(v) => onOptionChange(v as MultiLevelOption)}
                // menuPlacement={isMobile ? 'bottom' : 'auto'}
                menuPortalTarget={menuPortalTarget}
                maxMenuHeight={200}
                classNames={classNames}
            />
        </div>
    ));
};
