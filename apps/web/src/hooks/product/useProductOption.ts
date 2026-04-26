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
    toArray,
} from '@fxts/core';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { sortRequiredFirst } from '@/helpers/product';
import { useProfile } from '@/hooks/query/member/profile';
import { useProductOptionList } from '@/hooks/query/product/product';
import { productKeys } from '@/hooks/queryKeys';
import { useAuth } from '@/hooks/useAuth';
import type {
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

    const queryClient = useQueryClient();

    const isLogin = useAuth();

    const { data: profileData } = useProfile({
        options: {
            enabled: !!isLogin,
        },
    });
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

    // NOTE: queryCache는 외부 시스템이라 useMemo 의존성으로 안정적으로 추적하기 어려움
    // 따라서 isProductOptionListFetched를 트리거로 사용
    const textOptionRequiredInfoList = useMemo(
        () =>
            pipe(
                queryClient.getQueryCache().findAll({
                    queryKey: productKeys.options(),
                }),
                filter((query) => query.getObserversCount() > 0),
                map((query) => {
                    const queryKey = query.queryKey as [string, string, number];
                    const data = query.state.data as
                        | ProductOptionResponse
                        | undefined;

                    if (!data) {
                        return undefined;
                    }

                    return { queryKey, data };
                }),
                compact,
                map(({ queryKey, data }) => ({
                    productNo: queryKey[2],
                    isTextOptionRequired: some(
                        (input) => input.required,
                        data.inputs,
                    ),
                })),
                toArray,
            ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isProductOptionListFetched, queryClient],
    );

    const { selectedOptionList } = useProductOptionStore();

    // ── 타입 가드 (순수 함수 → useCallback으로 안정화) ──────────────────────

    const isFlatOption = useCallback(
        (option: MultiLevelOption | FlatOption): option is FlatOption =>
            !!option && 'optionNo' in option,
        [],
    );

    const isMultiLevelOption = useCallback(
        (option: MultiLevelOption | FlatOption): option is MultiLevelOption =>
            !('optionNo' in option),
        [],
    );

    // ── 파생 플래그 ─────────────────────────────────────────────────────────

    const isDefaultOptionUsed = productOptionListData?.type === 'DEFAULT';
    const isFlatOptionUsed =
        productOptionListData?.selectType === 'FLAT' &&
        productOptionListData?.type === 'COMBINATION' &&
        (productOptionListData?.flatOptions.length ?? 0) > 0;
    const isMultiLevelOptionUsed =
        productOptionListData?.selectType === 'MULTI' &&
        productOptionListData?.type === 'COMBINATION' &&
        (productOptionListData?.multiLevelOptions.length ?? 0) > 0;
    const isRequiredOptionUsed =
        productOptionListData?.selectType === 'MULTI' &&
        productOptionListData?.type === 'REQUIRED' &&
        (productOptionListData?.multiLevelOptions.length ?? 0) > 0;

    const inputs = useMemo(
        () => productOptionListData?.inputs ?? [],
        [productOptionListData],
    );
    const flatOptions = useMemo(
        () => productOptionListData?.flatOptions ?? [],
        [productOptionListData],
    );

    const isTextOptionUsed = inputs.length > 0;
    const isTextOptionRequired = useMemo(
        () => some((input) => input.required, inputs),
        [inputs],
    );
    const isSomeOptionSoldOut = useMemo(
        () => some((a) => a.stockCnt === 0, flatOptions),
        [flatOptions],
    );

    // ── 텍스트 옵션 가공 (selectedOptionList 포함, useMemo 필수) ─────────────

    const textOptionInputs = useMemo(() => {
        if (inputs.length === 0) {
            return {
                PRODUCT: [] as typeof inputs,
                OPTION: [] as typeof inputs,
                AMOUNT: [] as typeof inputs,
            };
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
                    return { ...a, inputValue };
                }

                return a;
            }),
            groupBy((a) => a.inputMatchingType),
        ) as {
            PRODUCT: typeof inputs;
            OPTION: typeof inputs;
            AMOUNT: typeof inputs;
        };
    }, [inputs, selectedOptionList]);

    const productTextOptionInputs = useMemo(
        () =>
            pipe(
                textOptionInputs['PRODUCT'] ?? [],
                filter((a) =>
                    some(
                        (b) =>
                            some(
                                (c) => c.inputNo === a.inputNo,
                                b.optionInputs ?? [],
                            ),
                        selectedOptionList,
                    ),
                ),
                toArray,
            ),
        [textOptionInputs, selectedOptionList],
    );

    // ── 레이블 생성 함수 (useCallback으로 안정화) ───────────────────────────

    const getMultiLevelOptionLabel = useCallback(
        (option: MultiLevelOption) => {
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
        },
        [isFlatOption, t],
    );

    const getFlatOptionLabel = useCallback(
        (option: FlatOption) => {
            const value = option.value.split('|').join(' / ');

            if (option.saleType === 'SOLDOUT') {
                return `${value} - ${t('품절')}`;
            }

            if (option.addPrice > 0) {
                return `${value} ${addPriceString(option.addPrice)}`;
            }

            return value;
        },
        [t],
    );

    const getSelectedOptionValue = useCallback(
        (optionNo: number) => {
            const option = flatOptions.find((opt) => opt.optionNo === optionNo);

            if (!option) return '';

            if (option.addPrice > 0) {
                return `${option.value} ${addPriceString(option.addPrice)}`;
            }

            return option.value;
        },
        [flatOptions],
    );

    const isOptionDisabled = useCallback(
        (option: MultiLevelOption | FlatOption) =>
            'optionNo' in option
                ? option.saleType === 'SOLDOUT' ||
                  option.stockCnt === 0 ||
                  option.forcedSoldOut
                : false,
        [],
    );

    // ── 필터링된 선택 옵션 목록 ─────────────────────────────────────────────

    const filteredSelectedOptionList = useMemo(
        () =>
            selectedOptionList.filter(
                (option) => option.productNo === productNo,
            ),
        [selectedOptionList, productNo],
    );

    return {
        productOptionListData,
        textOptionInputs,
        productTextOptionInputs,
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
