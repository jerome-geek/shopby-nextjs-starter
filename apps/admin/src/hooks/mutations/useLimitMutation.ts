import { useMutation } from '@tanstack/react-query';

import { limit } from '@/api/limit';
import type {
    CreateExceptionBody,
    UpdateCreationLimitBody,
} from '@/model/limit';

const useLimitMutation = () => {
    return {
        updateCreationLimit: useMutation({
            mutationFn: async (data: UpdateCreationLimitBody) =>
                await limit.updateCreationLimit(data),
        }),
        createException: useMutation({
            mutationFn: async (data: CreateExceptionBody) =>
                await limit.createException(data),
        }),
        deleteException: useMutation({
            mutationFn: async (memberNo: number) =>
                await limit.deleteException(memberNo),
        }),
    };
};

export default useLimitMutation;
