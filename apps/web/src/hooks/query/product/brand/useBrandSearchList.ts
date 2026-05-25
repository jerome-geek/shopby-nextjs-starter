import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
    brandSearchListOptions,
    type BrandSearchListOptionsParams,
} from '@/entities/product/brand/queries';
import type { SearchBrandResponse } from '@/models/product/brand';

const useBrandSearchList = <T = SearchBrandResponse>({
    searchParams,
    options,
}: BrandSearchListOptionsParams<T>) => {
    return useQuery({
        ...brandSearchListOptions({ searchParams, options }),
        placeholderData: keepPreviousData,
    });
};

export default useBrandSearchList;
