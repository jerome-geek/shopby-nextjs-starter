import { useMutation } from '@tanstack/react-query';

import { auth } from '@/api/auth';
import { LoginRequest } from '@/model/auth';

const useAuthMutation = () => {
    return {
        login: useMutation({
            mutationFn: async ({ id, pwd }: LoginRequest) =>
                await auth.login({ id, pwd }),
        }),
        logout: useMutation({
            mutationFn: async () => await auth.logout(),
        }),
    };
};

export default useAuthMutation;
