import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { KCPCertification } from '@/api/auth';
import { PATHS } from '@/const/paths';
import useApiError from '@/hooks/useApiError';

export const KcpAuthCallbackPage = () => {
    const router = useRouter();

    const { handleErrorDialog } = useApiError();

    const { mutate } = useMutation({
        mutationFn: async () =>
            await KCPCertification.getKCPForm({
                returnUrl: `${window.location.origin}${PATHS.CALLBACK.KCP_AUTH}`,
            }),
    });

    useEffect(() => {
        if (!router.isReady) {
            return;
        }

        const key = router.query.key as string;
        const accessToken = router.query.accessToken as string;
        const provider = router.query.provider as string;
        const code = router.query.code as string;

        if (!window.opener?.location.href) {
            return;
        }

        if (key) {
            window.opener.postMessage(
                { key, accessToken, provider, code },
                window.location.origin,
            );

            window.close();
        } else {
            mutate(undefined, {
                onSuccess: ({ data }) => {
                    document.write(data);
                    const form =
                        document.querySelector<HTMLFormElement>('#form_auth');
                    if (form) {
                        form.submit();
                    }
                },
                onError: async (error) => {
                    await handleErrorDialog(error);

                    window.close();
                },
            });
        }
    }, [router.isReady]);

    return null;
};
