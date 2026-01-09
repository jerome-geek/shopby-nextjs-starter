'use client';

import { useMemo } from 'react';

import { PATHS } from '@/const/paths';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type QueryParams = Record<string, unknown>;

const EXCLUDE_PARAM_DATA = [
    {
        path: PATHS.SEARCH,
        params: ['type', 'keyword'],
    },
];

export const useQueryParams = <T extends QueryParams>() => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const updateQueryParams = (updates: Partial<T>) => {
        const newParams = new URLSearchParams(searchParams);

        Object.entries(updates).forEach(([key, value]) => {
            if (value === undefined || value === null || value === '') {
                newParams.delete(key);
            } else {
                const encodedValue =
                    typeof value === 'object'
                        ? encodeURIComponent(JSON.stringify(value))
                        : String(value);
                newParams.set(key, encodedValue);
            }
        });

        router.push(`${pathname}?${newParams.toString()}`);
    };

    const parseQueryParams = (): T => {
        const params: QueryParams = {};

        searchParams.forEach((value, key) => {
            try {
                const decodedValue = decodeURIComponent(value);

                params[key] = JSON.parse(decodedValue);
            } catch {
                params[key] = value;
            }
        });

        return params as T;
    };

    const excludeParamList = useMemo(() => {
        const excludeParamList =
            EXCLUDE_PARAM_DATA.find((item) => item.path === pathname)?.params ??
            [];

        return excludeParamList;
    }, [location.pathname]);

    const deleteAllQueryParams = () => {
        const newParams = new URLSearchParams(searchParams.toString());

        const filteredParams = Object.fromEntries(
            Object.entries(newParams).filter(([key]) =>
                excludeParamList.includes(key),
            ),
        );

        const updatedParams = {
            ...filteredParams,
            childCategoryNo: searchParams.get('childCategoryNo') || '',
        };

        router.push(
            `${pathname}?${new URLSearchParams(updatedParams).toString()}`,
        );
    };

    return {
        queryParams: parseQueryParams(),
        updateQueryParams,
        deleteAllQueryParams,
    };
};
