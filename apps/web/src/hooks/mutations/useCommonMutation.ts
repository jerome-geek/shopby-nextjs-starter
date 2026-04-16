import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { common } from '@/api/shop';
import { useToast } from '@/hooks/ui';

const useCommonMutation = () => {
    const { t } = useTranslation();
    const { addToast } = useToast();

    const onMutationError = (error: Error) => {
        const errorMessage = isAxiosError(error)
            ? error.response?.data?.message || error.message
            : t('오류가 발생했습니다.');
        addToast({ variant: 'error', message: errorMessage });
    };

    return {
        /**
         * 공용 이미지 업로드 (Geek 백엔드)
         */
        upload: useMutation({
            mutationFn: async (formData: FormData) =>
                await common.upload(formData),
            onError: onMutationError,
        }),
    };
};

export default useCommonMutation;
