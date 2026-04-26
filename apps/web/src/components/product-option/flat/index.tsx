import { pipe, prop, sortBy, toArray } from '@fxts/core';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Props, SingleValue } from 'react-select';

import * as bottomSheetStyles from '@/components/bottom-sheet/option-select/index.css';
import { Select } from '@/components/ui/input';
import useProductOption from '@/hooks/product/useProductOption';
import { useResponsive } from '@/hooks/utils';
import type { FlatOption } from '@/models/product/productOption';

interface FlatProductOptionProps {
    productNo: number;
    onChange: (option: SingleValue<FlatOption>) => void;
    checkOptionDisabled?: (option: FlatOption) => boolean;
    classNames?: Props<FlatOption>['classNames'];
}

export const FlatProductOption = ({
    productNo,
    onChange,
    checkOptionDisabled,
    classNames,
}: FlatProductOptionProps) => {
    const { t } = useTranslation();

    const { isMobile } = useResponsive();

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
        <div>
            <p className={bottomSheetStyles.optionLabel}>
                {t('옵션')}{' '}
                <span className={bottomSheetStyles.required}>*</span>
            </p>
            <Select
                value={selected}
                options={options}
                placeholder={t('옵션을 선택해 주세요.')}
                getOptionLabel={getFlatOptionLabel}
                getOptionValue={(option) => option.value}
                isOptionDisabled={checkOptionDisabled ?? isOptionDisabled}
                onChange={(v) => onOptionChange(v as SingleValue<FlatOption>)}
                menuPlacement={isMobile ? 'bottom' : 'auto'}
                maxMenuHeight={200}
                classNames={classNames}
            />
        </div>
    );
};
