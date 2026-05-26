import { useQuery } from '@tanstack/react-query';

import {
    timeSaleSectionProductsOptions,
    type UseTimeSaleSectionProductsParams,
} from '@/entities/shop/timeSale/queries';

const useTimeSaleSectionProducts = (
    params: UseTimeSaleSectionProductsParams,
) => useQuery(timeSaleSectionProductsOptions(params));

export default useTimeSaleSectionProducts;
