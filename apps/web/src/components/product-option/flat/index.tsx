import { pipe, prop, sortBy, toArray } from '@fxts/core';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SingleValue } from 'react-select';

import Select from '@/components/ui/select';
import useProductOption from '@/hooks/product/useProductOption';
import { useResponsive } from '@/hooks/utils';
import { FlatOption } from '@/models/product/productOption';

interface FlatProductOptionProps {
    productNo: number;
    onChange: (option: SingleValue<FlatOption>) => void;
    checkOptionDisabled?: (option: FlatOption) => boolean;
}

const FlatProductOption = ({
    productNo,
    onChange,
    checkOptionDisabled,
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
        <Select
            value={selected}
            options={options}
            placeholder={t('옵션을 선택해 주세요.')}
            getOptionLabel={getFlatOptionLabel}
            getOptionValue={(option) => option.value}
            isOptionDisabled={checkOptionDisabled ?? isOptionDisabled}
            onChange={onOptionChange}
            menuPlacement={isMobile ? 'bottom' : 'auto'}
            maxMenuHeight={200}
        />
    );
};

export default FlatProductOption;
