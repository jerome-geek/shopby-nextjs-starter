import { useQueryClient } from '@tanstack/react-query';
import { type AxiosError, HttpStatusCode, isAxiosError } from 'axios';
import { overlay } from 'overlay-kit';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import { oauth2 } from '@/api/auth';
import { profile } from '@/api/member';
import { PATHS } from '@/const/paths';
import { useDialog } from '@/hooks/utils';
import { catchErrorTyped } from '@/utils/promise';
import { accessTokenCookie } from '@/utils/cookie';

const useUpdateProfile = () => {
    const { openDialog } = useDialog();

    const queryClient = useQueryClient();

    const { t } = useTranslation();

    const router = useRouter();

    const updateProfile = async (key: string) => {
        const [error, response] = await catchErrorTyped(
            profile.updateProfileByCertification({
                key,
            }),
            [AxiosError<ShopByErrorResponse>],
        );

        if (error) {
            openDialog({
                message: isAxiosError(error)
                    ? (error.response?.data.message ??
                      t('알 수 없는 오류가 발생했습니다.'))
                    : t('알 수 없는 오류가 발생했습니다.'),
            });

            router.replace(PATHS.MAIN);
        } else {
            if (response.status === HttpStatusCode.Ok) {
                try {
                    const response = await oauth2.updateAccessToken();

                    if (response.data.accessToken) {
                        accessTokenCookie.set(
                            response.data.accessToken,
                            response.data.expiresIn,
                        );
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    queryClient.removeQueries();
                    await queryClient.resetQueries();

                    overlay.closeAll();

                    openDialog({
                        message: t('본인인증이 완료되었습니다.'),
                    });
                }
            }
        }
    };

    return { updateProfile };
};

export default useUpdateProfile;
