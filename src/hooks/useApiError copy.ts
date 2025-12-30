'use client';

import { HTTPError, TimeoutError } from 'ky';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import useDialog from './useDialog';

export type ErrorHandlerConfig = {
    /** 특정 HTTP 상태 코드별로 커스텀 동작을 정의 (문자열 반환 시 그 메시지로 덮어씀) */
    statusHandlers?: Record<number, (error: HTTPError) => void | string>;
    /** true일 경우 팝업을 띄우지 않음 */
    silent?: boolean;
    /** 에러 로그 출력 여부 (기본값: true) */
    log?: boolean;
};

/**
 * API 에러를 처리하는 Hook
 * 복잡한 패턴 없이, '에러 타입별 처리 함수'를 분리하여 가독성을 높였습니다.
 */
const useApiError = () => {
    const { t } = useTranslation();
    const { openDialog } = useDialog();

    // 1. HTTP 에러 처리 (가장 복잡한 로직)
    const handleHttpError = async (
        error: HTTPError,
        config: ErrorHandlerConfig
    ) => {
        const { status } = error.response;

        // 커스텀 핸들러가 있으면 우선 실행
        if (config.statusHandlers?.[status]) {
            const result = config.statusHandlers[status](error);
            if (typeof result === 'string') return result;
            return null; // 핸들러가 직접 처리했으므로 메시지 없음
        }

        // 서버 응답 본문에서 메시지 추출
        try {
            const errorData = await error.response.clone().json();
            return (
                errorData.message || t('알 수 없는 서버 오류가 발생했습니다.')
            );
        } catch {
            return t('서버 응답 형식이 올바르지 않습니다.');
        }
    };

    // 2. 메인 에러 핸들러
    const handleError = useCallback(
        async (error: unknown, config: ErrorHandlerConfig = {}) => {
            const { log = true, silent = false } = config;

            if (log) {
                console.error('🚀 useApiError Handle:', error);
            }

            let message: string | null = '';

            // 직관적인 if-else 구조로 분기 (누구나 이해하기 쉬움)
            if (error instanceof HTTPError) {
                message = await handleHttpError(error, config);
            } else if (error instanceof TimeoutError) {
                message = t('요청 시간이 초과되었습니다. 다시 시도해 주세요.');
            } else if (error instanceof TypeError) {
                message = t(
                    '네트워크 연결이 원활하지 않습니다. 인터넷 접속 상태를 확인해 주세요.'
                );
            } else if (error instanceof Error) {
                message = error.message;
            } else {
                message = t('예기치 못한 오류가 발생했습니다.');
            }

            // 메시지가 있으면 팝업 노출
            if (message && !silent) {
                openDialog({ message });
            }

            return message;
        },
        [t, openDialog]
    );

    return { handleError };
};

export default useApiError;
