'use client';

import { append, compact, find, join, map, pipe } from '@fxts/core';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SingleValue } from 'react-select';

// import useProductOption from '@/hooks/product/useProductOption';
// import { useResponsive } from '@/hooks/utils';
import {
    FlatOptionWithChildren,
    MultiLevelBranch,
    MultiLevelOption,
    ProductOptionResponse,
} from '@/models/product/productOption';
import Select from '@/components/ui/Select';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { addPriceString } from '@/utils/currency';

interface MultiProductOptionProps {
    productOptionListData: ProductOptionResponse;
    // onChange: (option: SingleValue<MultiLevelOption>) => void;
    checkOptionDisabled?: (option: MultiLevelOption) => boolean;
}

const FIRST_OPTION_INDEX = 0;
const SECOND_OPTION_INDEX = 1;
const THIRD_OPTION_INDEX = 2;
const FOURTH_OPTION_INDEX = 3;
const FIFTH_OPTION_INDEX = 4;

const MultiProductOption = ({
    productOptionListData,
    // onChange,
    checkOptionDisabled,
}: MultiProductOptionProps) => {
    const { t } = useTranslation();

    // const { isMobile } = useResponsive();

    const [firstOptionList, setFirstOptionList] =
        useState<Nullable<MultiLevelOption[]>>(null);
    const [secondOptionList, setSecondOptionList] =
        useState<Nullable<MultiLevelOption[]>>(null);
    const [thirdOptionList, setThirdOptionList] =
        useState<Nullable<MultiLevelOption[]>>(null);
    const [fourthOptionList, setFourthOptionList] =
        useState<Nullable<MultiLevelOption[]>>(null);
    const [fifthOptionList, setFifthOptionList] =
        useState<Nullable<MultiLevelOption[]>>(null);

    // const {
    //     // getMultiLevelOptionLabel,
    //     // isFlatOption,
    //     isOptionDisabled,
    // } = useProductOption({
    //     productNo,
    // });

    const isOptionDisabled = (
        option: MultiLevelOption | FlatOptionWithChildren,
    ) => {
        return 'optionNo' in option
            ? option.saleType === 'SOLDOUT' ||
                  option.stockCnt === 0 ||
                  option.forcedSoldOut
            : false;
    };

    const isFlatOption = (option: MultiLevelOption) => {
        return !!option && 'optionNo' in option;
    };

    const getMultiLevelOptionLabel = (option: MultiLevelOption) => {
        if (isFlatOption(option)) {
            if (
                option.saleType === 'SOLDOUT' ||
                option.stockCnt === 0 ||
                option.forcedSoldOut
            ) {
                return `${option.value} - ${t('품절')}`;
            }

            if (option.addPrice > 0) {
                return `${option.value} ${addPriceString(option.addPrice)}`;
            }
        }

        return option.value;
    };

    useEffect(() => {
        if (productOptionListData) {
            setFirstOptionList(productOptionListData.multiLevelOptions);
        }
    }, [productOptionListData]);

    const getOptions = (index: number) => {
        switch (index) {
            case FIRST_OPTION_INDEX:
                return firstOptionList || [];
            case SECOND_OPTION_INDEX:
                return secondOptionList || [];
            case THIRD_OPTION_INDEX:
                return thirdOptionList || [];
            case FOURTH_OPTION_INDEX:
                return fourthOptionList || [];
            case FIFTH_OPTION_INDEX:
                return fifthOptionList || [];
            default:
                return [];
        }
    };

    const [selectedValueList, setSelectedValueList] = useState<
        Nullable<MultiLevelOption>[]
    >([null, null, null, null, null]);

    const onOptionChange = (
        v: SingleValue<MultiLevelBranch | FlatOptionWithChildren>,
        index: number,
    ) => {
        if (!v) {
            return;
        }

        setSelectedValueList((prev) =>
            prev.map((selectedValue, selectedIndex) => {
                if (selectedIndex < index) {
                    return selectedValue ?? null;
                }
                if (selectedIndex === index) {
                    return v ?? null;
                }
                return null;
            }),
        );

        // onChange({
        //     ...v,
        //     label: `${t('옵션')} : ${pipe(
        //         selectedValueList,
        //         compact,
        //         append(v),
        //         map((a) => t(a?.value || '')),
        //         join('|'),
        //     )}`,
        // });

        if (isFlatOption(v)) {
            setSecondOptionList(null);
            setThirdOptionList(null);
            setFourthOptionList(null);
            setFifthOptionList(null);
            setSelectedValueList([null, null, null, null]);
        }

        switch (index) {
            case FIRST_OPTION_INDEX:
                setSecondOptionList(v?.children || []);
                setThirdOptionList(null);
                setFourthOptionList(null);
                setFifthOptionList(null);
                break;
            case SECOND_OPTION_INDEX:
                setThirdOptionList(v?.children || []);
                setFourthOptionList(null);
                setFifthOptionList(null);
                break;
            case THIRD_OPTION_INDEX:
                setFourthOptionList(v?.children || []);
                setFifthOptionList(null);
                break;
            case FOURTH_OPTION_INDEX:
                setFifthOptionList(v?.children || []);
                break;
        }
    };

    const noOptionsMessage = (index: number, labels: string[]) => {
        switch (index) {
            case FIRST_OPTION_INDEX:
                return (
                    <span>{`${
                        labels[FIRST_OPTION_INDEX - 1]
                    }을 먼저 선택해 주세요.`}</span>
                );
            case SECOND_OPTION_INDEX:
                return (
                    <span>{`${
                        labels[SECOND_OPTION_INDEX - 1]
                    }을 먼저 선택해 주세요.`}</span>
                );
            case THIRD_OPTION_INDEX:
                return (
                    <span>{`${
                        labels[THIRD_OPTION_INDEX - 1]
                    }을 먼저 선택해 주세요.`}</span>
                );
            case FOURTH_OPTION_INDEX:
                return (
                    <span>{`${
                        labels[FOURTH_OPTION_INDEX - 1]
                    }을 먼저 선택해 주세요.`}</span>
                );
            case FIFTH_OPTION_INDEX:
                return (
                    <span>{`${
                        labels[FIFTH_OPTION_INDEX - 1]
                    }을 먼저 선택해 주세요.`}</span>
                );
            default:
                return <span>{`옵션을 선택해 주세요.`}</span>;
        }
    };

    if (!productOptionListData) {
        return null;
    }

    return (
        <div
            className={flex({ gap: '8px' })}
            role='group'
            aria-label={t('분리형 옵션')}
        >
            {productOptionListData.labels.map((label, index) => {
                return (
                    <Select
                        key={`multiLevelOption-${index}`}
                        name={label}
                        aria-label={label}
                        placeholder={label}
                        isSearchable={false}
                        options={getOptions(index)}
                        getOptionLabel={getMultiLevelOptionLabel}
                        isOptionDisabled={
                            checkOptionDisabled
                                ? index ===
                                  productOptionListData.labels.length - 1
                                    ? checkOptionDisabled
                                    : () => false
                                : isOptionDisabled
                        }
                        value={
                            find(
                                (v) => v?.label === label,
                                selectedValueList,
                            ) ?? null
                        }
                        onChange={(v) => onOptionChange(v, index)}
                        noOptionsMessage={() =>
                            noOptionsMessage(
                                index,
                                productOptionListData.labels,
                            )
                        }
                        menuPortalTarget={document.body}
                        // menuPlacement={isMobile ? 'top' : 'auto'}
                    />
                );
            })}
        </div>
    );
};

export default MultiProductOption;
