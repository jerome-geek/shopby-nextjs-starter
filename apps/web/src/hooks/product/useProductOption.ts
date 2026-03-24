import {
    compact,
    filter,
    flatMap,
    groupBy,
    head,
    map,
    pipe,
    some,
    sortBy,
    toArray
} from '@fxts/core';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { sortRequiredFirst } from '@/helpers/product';
import { useProfile } from '@/hooks/query/member/profile';
import { useProductOptionList } from '@/hooks/query/product/product';
import { productKeys } from '@/hooks/queryKeys';
import {
    FlatOption,
    MultiLevelOption,
    ProductOptionResponse,
} from '@/models/product/productOption';
import { useProductOptionStore } from '@/store/useProductOptionStore';
import { addPriceString } from '@/utils/currency';

interface UseOptionProps {
    productNo: number;
}

const useProductOption = ({ productNo }: UseOptionProps) => {
    const { t } = useTranslation();

    const { data: profileData } = useProfile();
    const {
        data: productOptionListData,
        isFetched: isProductOptionListFetched,
    } = useProductOptionList({
        productNo,
        memberNo: profileData?.memberNo,
        options: {
            enabled: productNo !== 0,
        },
    });

    const queryClient = useQueryClient();

    const textOptionRequiredInfoList = pipe(
        // NOTE : 옵션 쿼리키를 가진 캐싱 데이터 조회
        queryClient.getQueryCache().findAll({
            queryKey: productKeys.options(),
        }),
        // NOTE : 현재 페이지에서 사용하지 않는 캐싱 데이터는 필터링 처리
        filter((query) => query.getObserversCount() > 0),
        map((query) => {
            const queryKey = query.queryKey as [string, string, number];
            const data = query.state.data as ProductOptionResponse | undefined;

            if (!data) {
                return undefined;
            }

            return {
                queryKey,
                data,
            };
        }),
        compact,
        map(({ queryKey, data }) => {
            return {
                productNo: queryKey[2],
                isTextOptionRequired: some(
                    (input) => input.required,
                    data.inputs,
                ),
            };
        }),
        toArray,
    );

    // TODO: zustand로 변경
    const { selectedOptions: selectedOptionList } = useProductOptionStore();
    // const selectedOptionList = useTypedSelector(
    //     (state) => state.productOption.selected,
    // );

    if (!productOptionListData) {
        return {
            productOptionListData,
            textOptionInputs: { PRODUCT: [], OPTION: [], AMOUNT: [] },
            productTextOptionInputs: [],
            getMultiLevelOptionLabel: (option: MultiLevelOption) =>
                option.value,
            getFlatOptionLabel: (option: FlatOption) => option.value,
            isDefaultOptionUsed: false,
            isFlatOptionUsed: false,
            isFlatOption: (
                opt: MultiLevelOption | FlatOption,
            ): opt is FlatOption => !!opt && 'optionNo' in opt,
            isMultiLevelOption: (
                opt: MultiLevelOption | FlatOption,
            ): opt is MultiLevelOption => !!opt && !('optionNo' in opt),
            isMultiLevelOptionUsed: false,
            isRequiredOptionUsed: false,
            isTextOptionUsed: false,
            isTextOptionRequired: false,
            textOptionRequiredInfoList,
            isSomeOptionSoldOut: false,
            getSelectedOptionValue: () => '',
            isOptionDisabled: () => false,
            isProductOptionListFetched,
            selectedOptionList,
            filteredSelectedOptionList: [],
        };
    }

    const { type, selectType, inputs, flatOptions, multiLevelOptions } =
        productOptionListData;

    const isDefaultOptionUsed = type === 'DEFAULT';
    const isFlatOptionUsed =
        selectType === 'FLAT' &&
        type === 'COMBINATION' &&
        flatOptions.length > 0;
    const isMultiLevelOptionUsed =
        selectType === 'MULTI' &&
        type === 'COMBINATION' &&
        multiLevelOptions.length > 0;
    const isRequiredOptionUsed =
        selectType === 'MULTI' &&
        type === 'REQUIRED' &&
        multiLevelOptions.length > 0;

    const isTextOptionUsed = inputs.length > 0;
    const isTextOptionRequired = some((input) => input.required, inputs);
    const isSomeOptionSoldOut = some((a) => a.stockCnt === 0, flatOptions);

    const textOptionInputs = () => {
        if (inputs.length === 0) {
            return { PRODUCT: [], OPTION: [], AMOUNT: [] };
        }

        return pipe(
            inputs,
            sortBy(sortRequiredFirst),
            map((a) => {
                const inputValue =
                    pipe(
                        selectedOptionList,
                        flatMap((b) => b.optionInputs ?? []),
                        filter((c) => c.inputNo === a.inputNo),
                        head,
                    )?.inputValue || '';

                if (a.inputMatchingType === 'PRODUCT') {
                    return {
                        ...a,
                        inputValue,
                    };
                }

                return a;
            }),
            groupBy((a) => a.inputMatchingType),
        );
    };

    const productTextOptionInputs = () => {
        return pipe(
            textOptionInputs()['PRODUCT'],
            filter((a) => {
                return some(
                    (b) => b.optionInputs?.some((c) => c.inputNo === a.inputNo),
                    selectedOptionList,
                );
            }),
            toArray,
        );
    };

    const isFlatOption = (
        option: MultiLevelOption | FlatOption,
    ): option is FlatOption => {
        return !!option && 'optionNo' in option;
    };

    const isMultiLevelOption = (
        option: MultiLevelOption | FlatOption,
    ): option is MultiLevelOption => {
        return !('optionNo' in option);
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

    const getFlatOptionLabel = (option: FlatOption) => {
        const value = option.value.split('|').join(' / ');

        if (option.saleType === 'SOLDOUT') {
            return `${value} - ${t('품절')}`;
        }

        if (option.addPrice > 0) {
            return `${value} ${addPriceString(option.addPrice)}`;
        }

        return value;
    };

    const getSelectedOptionValue = (optionNo: number) => {
        const option = flatOptions.find((opt) => opt.optionNo === optionNo);

        if (!option) {
            return '';
        }

        if (option.addPrice > 0) {
            return `${option.value} ${addPriceString(option.addPrice)}`;
        }

        return option.value;
    };

    const isOptionDisabled = (option: MultiLevelOption | FlatOption) => {
        return 'optionNo' in option
            ? option.saleType === 'SOLDOUT' ||
                  option.stockCnt === 0 ||
                  option.forcedSoldOut
            : false;
    };

    const filteredSelectedOptionList = selectedOptionList.filter(
        (option) => option.productNo === productNo,
    );

    return {
        productOptionListData,
        textOptionInputs: textOptionInputs(),
        productTextOptionInputs: productTextOptionInputs(),
        getMultiLevelOptionLabel,
        getFlatOptionLabel,
        isDefaultOptionUsed,
        isFlatOptionUsed,
        isFlatOption,
        isMultiLevelOption,
        isMultiLevelOptionUsed,
        isRequiredOptionUsed,
        isTextOptionUsed,
        isTextOptionRequired,
        textOptionRequiredInfoList,
        isSomeOptionSoldOut,
        getSelectedOptionValue,
        isOptionDisabled,
        isProductOptionListFetched,
        selectedOptionList,
        filteredSelectedOptionList,
    };
};

export default useProductOption;
