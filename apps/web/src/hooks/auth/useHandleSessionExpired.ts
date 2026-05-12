import { useCallback } from 'react';

import { controller } from '@/api/core/controller';
import { PATHS } from '@/const/paths';
import { useMyApp } from '@/hooks/myapp';
import { useDialog } from '@/hooks/utils';
import { memberCookie } from '@/utils/cookie';

/**
 * 401 Unauthorized 발생 시 통합 세션 만료 처리를 위한 훅
 * - 인터셉터에서 호출할 수 있도록 메모이제이션된 함수를 반환합니다.
 */
export const useHandleSessionExpired = () => {
    const { openAsyncDialog } = useDialog();
    const { handleSendRefreshTokenExpired, handleSendLoginView, isMyApp } =
        useMyApp();

    const handleSessionExpired = useCallback(async () => {
        // 1. 진행 중이던 모든 fetch 중단
        controller.abort('refresh-token-expiration');

        // 2. 인증 쿠키 정리
        memberCookie.clearAll();

        // 3. 앱(MyApp) 환경일 경우 전용 핸들러 호출
        if (isMyApp) {
            handleSendRefreshTokenExpired();
            handleSendLoginView({
                option: {
                    returnUrl: `${window.location.pathname}${window.location.search}`,
                },
            });
            return;
        }

        // 4. 세션 만료 알림 대화상자 노출
        await openAsyncDialog({
            message: '로그인 세션이 만료되었습니다.',
            description: '다시 로그인해주세요.',
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        // 5. 현재 페이지 정보를 담아 로그인 페이지로 이동
        const searchParams = new URLSearchParams(window.location.search);
        const returnUrl =
            searchParams.get('returnUrl') ||
            `${window.location.pathname}${window.location.search}`;

        const loginUrl = `${PATHS.AUTH.LOGIN}?returnUrl=${encodeURIComponent(
            returnUrl,
        )}`;

        window.location.replace(loginUrl);
    }, [
        openAsyncDialog,
        handleSendRefreshTokenExpired,
        handleSendLoginView,
        isMyApp,
    ]);

    return { handleSessionExpired };
};
