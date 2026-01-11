'use client';

import { pipe, prop, sortBy, toArray } from '@fxts/core';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SingleValue } from 'react-select';

// import useProductOption from '@/hooks/product/useProductOption';
import {
    FlatOption,
    ProductOptionResponse,
} from '@/models/product/productOption';
// import { useResponsive } from '@/hooks/utils';
import Select from '@/components/ui/Select';
import { useProductOptionActions } from '@/store/product/useProductOptionStore';

interface FlatProductOptionProps {
    // productNo: number;
    productOptionListData: ProductOptionResponse;
    isOptionDisabled: (option: FlatOption) => boolean;
    getFlatOptionLabel: (option: FlatOption) => string;
    // onChange: (option: SingleValue<FlatOption>) => void;
    checkOptionDisabled?: (option: FlatOption) => boolean;
}

const FlatProductOption = ({
    // productNo,
    productOptionListData,
    isOptionDisabled,
    getFlatOptionLabel,
    // onChange,
    checkOptionDisabled,
}: FlatProductOptionProps) => {
    const { t } = useTranslation();
    const { addOption } = useProductOptionActions();

    // const { isMobile } = useResponsive();

    const [selected, setSelected] = useState<SingleValue<FlatOption>>(null);

    // const { productOptionListData, isOptionDisabled, getFlatOptionLabel } =
    //     useProductOption({
    //         productNo,
    //     });

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
        if (v) {
            addOption(v);
        }
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
            menuPortalTarget={document.body}
            // menuPlacement={isMobile ? 'top' : 'auto'}
        />
    );
};

export default FlatProductOption;
