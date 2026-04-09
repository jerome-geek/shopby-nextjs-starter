'use client';

import { isAxiosError, type AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import useDialog from '@/hooks/utils/useDialog';
import { useToast } from '@/hooks/ui';

/**
 * API 에러 핸들링을 위한 설정 인터페이스
 */
export interface ErrorHandlerConfig {
    /**
     * 특정 HTTP 상태 코드별 커스텀 동작.
     * 문자열 반환 시 팝업을 띄우고, null 반환 시 동작만 수행 후 종료합니다.
     */
    statusHandlers?: Record<
        number,
        (error: AxiosError) => string | null | Promise<string | null>
    >;
    /** true일 경우 팝업을 띄우지 않고 에러 메시지만 반환합니다. */
    silent?: boolean;
    /** 에러 발생 시 콘솔 로그 출력 여부 (기본값: true) */
    log?: boolean;
}

/**
 * 에러 처리 전략 구현을 위한 인터페이스
 */
interface ErrorStrategy {
    name: string;
    /** 이 전략이 처리할 에러인지 판단하는 가드 함수 */
    isMatch: (error: unknown) => boolean;
    /** 에러 메시지를 추출하거나 동작을 수행함 (메시지가 없으면 null 반환) */
    getMessage: (
        error: unknown,
        config: ErrorHandlerConfig,
    ) => Promise<string | null>;
}

/**
 * API 에러를 전역적으로 핸들링하는 훅입니다.
 * - 모든 반환은 비동기(Promise)로 처리되어 Next.js의 최신 관례와 일치합니다.
 *
 * @example
 * const { handleErrorDialog, handleErrorToast } = useApiError();
 *
 * try { ... } catch (err) {
 *    await handleError(err);
 * }
 */
const useApiError = () => {
    const { t } = useTranslation();
    const { openDialog } = useDialog();
    const { addToast } = useToast();

    // 에러 처리 전략 목록
    const strategies: ErrorStrategy[] = [
        {
            name: 'HttpError',
            isMatch: (e): e is AxiosError => {
                return isAxiosError(e) && e.response !== undefined;
            },
            getMessage: async (err: unknown, config) => {
                const e = err as AxiosError;
                const status = e.response?.status;

                if (status && config.statusHandlers?.[status]) {
                    const result = await config.statusHandlers[status](e);
                    return result;
                }

                try {
                    const errorData = e.response?.data as { message?: string };
                    return (
                        errorData?.message ||
                        t('알 수 없는 서버 오류가 발생했습니다.')
                    );
                } catch {
                    return t('서버 응답 형식이 올바르지 않습니다.');
                }
            },
        },
        {
            name: 'TimeoutError',
            isMatch: (e): e is AxiosError => {
                return (
                    isAxiosError(e) &&
                    (e.code === 'ECONNABORTED' || e.code === 'ETIMEDOUT')
                );
            },
            getMessage: async () => {
                return t('요청 시간이 초과되었습니다. 다시 시도해 주세요.');
            },
        },
        {
            name: 'NetworkError',
            isMatch: (e): e is TypeError | AxiosError => {
                return (
                    e instanceof TypeError ||
                    (isAxiosError(e) && e.request && !e.response)
                );
            },
            getMessage: async () => {
                return t(
                    '네트워크 연결이 원활하지 않습니다. 인터넷 접속 상태를 확인해 주세요.',
                );
            },
        },
        {
            name: 'GeneralError',
            isMatch: (e): e is Error => {
                return e instanceof Error;
            },
            getMessage: async (err: unknown) => {
                const e = err as Error;
                return e.message;
            },
        },
        {
            name: 'UnknownError',
            isMatch: () => {
                return true;
            },
            getMessage: async () => {
                return t('예기치 못한 오류가 발생했습니다.');
            },
        },
    ];

    /**
     * 에러를 가공하여 적절한 처리(팝업 등)를 수행합니다.
     */
    const handleError = async (
        error: unknown,
        config: ErrorHandlerConfig = {},
        type: 'dialog' | 'toast' = 'dialog',
    ): Promise<string | null> => {
        const { log = true, silent = false } = config;

        if (log) {
            console.error('🚀 useApiError Handle:', error);
        }

        for (const strategy of strategies) {
            if (strategy.isMatch(error)) {
                const message = await strategy.getMessage(error, config);

                if (message && !silent) {
                    if (type === 'dialog') {
                        openDialog({ message });
                    } else {
                        addToast({ message, variant: 'error' });
                    }
                }

                return message;
            }
        }

        return null;
    };

    const handleErrorDialog = async (
        error: unknown,
        config: ErrorHandlerConfig = {},
    ): Promise<string | null> => {
        return await handleError(error, config, 'dialog');
    };

    const handleErrorToast = async (
        error: unknown,
        config: ErrorHandlerConfig = {},
    ): Promise<string | null> => {
        return await handleError(error, config, 'toast');
    };

    return { handleError, handleErrorDialog, handleErrorToast };
};

export default useApiError;
