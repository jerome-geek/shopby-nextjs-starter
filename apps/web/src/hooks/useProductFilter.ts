import { useRouter } from 'next/router';
import { ParsedUrlQuery, ParsedUrlQueryInput } from 'querystring';
import { useCallback, useMemo, useState } from 'react';

import { PRICE_FILTER_OPTIONS } from '@/const/product';
import type { OrderByType, OrderDirectionType } from '@/models';
import type { ProductSearchParams } from '@/models/product/product';

type PriceFilterId = (typeof PRICE_FILTER_OPTIONS)[number]['id'] | 'custom';
type DeliveryFilterType = 'FREE' | 'CONDITIONAL' | 'FIXED_FEE';

export interface PendingProductFilter {
    deliveryConditionType?: DeliveryFilterType;
    onlySaleProduct?: true;
    soldout?: false;
    priceFilterId?: PriceFilterId;
    priceMin?: number;
    priceMax?: number;
    brandNos?: string[];
}

type UseProductFilterParams = {
    categoryNo?: number;
    categoryNos?: number[];
    pageSize?: number;
    keywords?: string;
    brandNos?: string[];
};

/** 필터(상품정보·가격·브랜드)만 — 정렬(by/direction) 제외 */
const PRODUCT_FILTER_QUERY_KEYS = [
    'deliveryConditionType',
    'onlySaleProduct',
    'soldout',
    'priceFilterId',
    'priceMin',
    'priceMax',
    'brandNos',
] as const;

/** 전체 초기화(reset) 시 제거할 쿼리 — 정렬·페이지 포함 */
const FILTER_QUERY_KEYS = [
    ...PRODUCT_FILTER_QUERY_KEYS,
    'pageNumber',
    'by',
    'direction',
] as const;

const getSingleValue = (value?: string | string[]) => {
    if (Array.isArray(value)) {
        return value[0];
    }

    return value;
};

const parseBoolean = (value?: string | string[]) => {
    const raw = getSingleValue(value);

    if (!raw) {
        return undefined;
    }

    if (raw === 'true') {
        return true;
    }

    if (raw === 'false') {
        return false;
    }

    return undefined;
};

const parseNumber = (value?: string | string[]) => {
    const raw = getSingleValue(value);
    if (!raw) {
        return undefined;
    }

    const parsed = Number(raw);

    return Number.isNaN(parsed) ? undefined : parsed;
};

const parseBrandNos = (value?: string | string[]) => {
    if (!value) {
        return undefined;
    }

    const list = (Array.isArray(value) ? value : value.split(','))
        .map((item) => item.trim())
        .filter(Boolean);

    return list.length > 0 ? [...new Set(list)] : undefined;
};

const parsePendingFilters = (query: ParsedUrlQuery): PendingProductFilter => {
    const deliveryConditionType = getSingleValue(query.deliveryConditionType);
    const priceFilterId = getSingleValue(query.priceFilterId);
    const priceMin = parseNumber(query.priceMin);
    const priceMax = parseNumber(query.priceMax);
    const brandNos = parseBrandNos(query.brandNos);

    return {
        ...((deliveryConditionType === 'FREE' ||
            deliveryConditionType === 'CONDITIONAL' ||
            deliveryConditionType === 'FIXED_FEE') && {
            deliveryConditionType,
        }),
        ...(parseBoolean(query.onlySaleProduct) === true && {
            onlySaleProduct: true as const,
        }),
        ...(parseBoolean(query.soldout) === false && {
            soldout: false as const,
        }),
        ...((priceFilterId === 'custom' ||
            PRICE_FILTER_OPTIONS.some(
                (option) => option.id === priceFilterId,
            )) && {
            priceFilterId: priceFilterId as PriceFilterId,
        }),
        ...(priceMin != null && { priceMin }),
        ...(priceMax != null && { priceMax }),
        ...(brandNos && { brandNos }),
    };
};

const serializePendingFilters = (
    filters: PendingProductFilter,
): ParsedUrlQueryInput => {
    return {
        ...(filters.deliveryConditionType && {
            deliveryConditionType: filters.deliveryConditionType,
        }),
        ...(filters.onlySaleProduct && { onlySaleProduct: 'true' }),
        ...(filters.soldout === false && { soldout: 'false' }),
        ...(filters.priceFilterId && { priceFilterId: filters.priceFilterId }),
        ...(filters.priceMin != null && { priceMin: String(filters.priceMin) }),
        ...(filters.priceMax != null && { priceMax: String(filters.priceMax) }),
        ...(filters.brandNos?.length && { brandNos: filters.brandNos }),
    };
};

export const useProductFilter = ({
    categoryNo,
    categoryNos = [],
    pageSize = 20,
    keywords,
    brandNos,
}: UseProductFilterParams = {}) => {
    const router = useRouter();
    const queryFilters = parsePendingFilters(router.query);
    const [draftFilters, setDraftFilters] = useState<PendingProductFilter>({});
    const [isDirty, setIsDirty] = useState(false);
    const pendingFilters = isDirty ? draftFilters : queryFilters;
    const appliedFilters = queryFilters;

    const setPendingFilter = useCallback(
        <K extends keyof PendingProductFilter>(
            key: K,
            value: PendingProductFilter[K],
        ) => {
            setDraftFilters((prev) => ({
                ...(isDirty ? prev : queryFilters),
                [key]: value,
            }));
            setIsDirty(true);
        },
        [isDirty, queryFilters],
    );

    const applyFilters = useCallback(() => {
        const nextQuery: ParsedUrlQueryInput = { ...router.query };

        PRODUCT_FILTER_QUERY_KEYS.forEach((key) => {
            delete nextQuery[key];
        });
        delete nextQuery.pageNumber;

        const replacePromise = router.replace(
            {
                pathname: router.pathname,
                query: {
                    ...nextQuery,
                    pageNumber: '1',
                    ...serializePendingFilters(pendingFilters),
                },
            },
            undefined,
            { shallow: true },
        );
        void replacePromise.finally(() => setIsDirty(false));
    }, [pendingFilters, router]);

    const resetFilters = useCallback(() => {
        setDraftFilters({});
        setIsDirty(true);

        const nextQuery: ParsedUrlQueryInput = {
            ...router.query,
            pageNumber: '1',
        };

        FILTER_QUERY_KEYS.forEach((key) => {
            delete nextQuery[key];
        });

        router.replace(
            {
                pathname: router.pathname,
                query: nextQuery,
            },
            undefined,
            { shallow: true },
        );
    }, [router]);

    const appliedSearchParams = useMemo((): ProductSearchParams => {
        const query = router.query;
        const queryCategoryNo = getSingleValue(query.childCategoryNo);
        const queryBrandNos = parseBrandNos(query.brandNos);
        const resolvedCategoryNos = [
            ...(queryCategoryNo ? [Number(queryCategoryNo)] : []),
            ...(queryCategoryNo ? [] : categoryNo != null ? [categoryNo] : []),
            ...categoryNos,
        ].filter((value, index, list) => list.indexOf(value) === index);
        const resolvedBrandNos = [
            ...(queryBrandNos ?? []),
            ...(brandNos ?? []),
        ].filter((value, index, list) => list.indexOf(value) === index);

        const priceFilterId = getSingleValue(query.priceFilterId);
        const priceOption =
            priceFilterId && priceFilterId !== 'custom'
                ? PRICE_FILTER_OPTIONS.find(
                      (option) => option.id === priceFilterId,
                  )
                : undefined;
        const priceMin = parseNumber(query.priceMin);
        const priceMax = parseNumber(query.priceMax);
        const useCustomPrice =
            priceFilterId === 'custom' &&
            priceMin != null &&
            priceMax != null &&
            !Number.isNaN(priceMin) &&
            !Number.isNaN(priceMax);

        const keywordFromQuery = getSingleValue(query.keyword)?.trim();
        const resolvedKeywords =
            keywordFromQuery && keywordFromQuery.length > 0
                ? keywordFromQuery
                : keywords != null && keywords.trim().length > 0
                ? keywords.trim()
                : undefined;
        const deliveryConditionType = getSingleValue(
            query.deliveryConditionType,
        );
        const resolvedDeliveryConditionType =
            deliveryConditionType === 'FREE' ||
            deliveryConditionType === 'CONDITIONAL' ||
            deliveryConditionType === 'FIXED_FEE'
                ? deliveryConditionType
                : undefined;

        return {
            ...(resolvedCategoryNos.length > 0 && {
                categoryNos: resolvedCategoryNos,
            }),
            pageNumber: parseNumber(query.pageNumber) ?? 1,
            pageSize,
            hasTotalCount: true,
            order: {
                by: (getSingleValue(query.by) as OrderByType) ?? 'MD_RECOMMEND',
                direction:
                    (getSingleValue(query.direction) as OrderDirectionType) ??
                    'ASC',
            },
            filter: {
                soldout: parseBoolean(query.soldout) === false ? false : true,
                ...(resolvedDeliveryConditionType && {
                    deliveryConditionType: resolvedDeliveryConditionType,
                }),
                ...(priceOption?.discountedComparison &&
                    priceOption.discountedPrices && {
                        discountedComparison: priceOption.discountedComparison,
                        discountedPrices: priceOption.discountedPrices,
                    }),
                ...(useCustomPrice && {
                    discountedComparison: 'BETWEEN' as const,
                    discountedPrices: [priceMin, priceMax],
                }),
                ...(resolvedKeywords && { keywords: resolvedKeywords }),
            },
            ...(resolvedBrandNos.length > 0 && { brandNos: resolvedBrandNos }),
            ...(parseBoolean(query.onlySaleProduct) === true && {
                onlySaleProduct: true,
            }),
            categoryOperator: 'AND',
        };
    }, [brandNos, categoryNo, categoryNos, keywords, pageSize, router.query]);

    return {
        pendingFilters,
        appliedFilters,
        setPendingFilter,
        applyFilters,
        resetFilters,
        appliedSearchParams,
    };
};
