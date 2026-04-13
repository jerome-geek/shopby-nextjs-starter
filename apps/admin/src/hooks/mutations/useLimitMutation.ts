import { useMutation } from '@tanstack/react-query';

import { limit } from '@/api/limit';
import type { UpdateCreationLimitBody } from '@/model/limit';

const useLimitMutation = () => {
    return {
        updateCreationLimit: useMutation({
            mutationFn: async (data: UpdateCreationLimitBody) =>
                await limit.updateCreationLimit(data),
        }),
    };
};

export default useLimitMutation;
