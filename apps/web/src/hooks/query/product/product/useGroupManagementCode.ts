import { useQuery } from '@tanstack/react-query';

import {
    groupManagementCodeOptions,
    type GroupManagementCodeOptionsParams,
} from '@/entities/product/queries';
import type { GroupManagementCodeResponse } from '@/models/product/product';

const useGroupManagementCode = <T = GroupManagementCodeResponse>({
    searchParams,
    options,
}: GroupManagementCodeOptionsParams<T>) => {
    return useQuery(groupManagementCodeOptions({ searchParams, options }));
};

export default useGroupManagementCode;
