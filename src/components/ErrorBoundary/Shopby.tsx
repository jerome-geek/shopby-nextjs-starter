import { ErrorBoundary, ErrorBoundaryFallbackProps } from '@suspensive/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import { ReactNode } from 'react';

interface ShopbyApiErrorBoundaryProps {
    children: ReactNode;
    /**
     * 에러 발생 시 렌더할 fallback 컴포넌트
     * - ReactNode: 정적 fallback
     * - Function: ErrorBoundaryFallbackProps를 받아 동적으로 렌더
     * - 미지정 시 빈 fragment 렌더 (에러 무시)
     */
    fallback?: ReactNode | ((props: ErrorBoundaryFallbackProps) => ReactNode);
    /**
     * 에러 리셋 시 호출될 콜백
     */
    onReset?: () => void;
    /**
     * 특정 에러를 상위로 throw할지 결정하는 추가 함수
     * true 반환 시 해당 에러는 상위 ErrorBoundary로 전파됨
     * (503 에러는 기본적으로 throw됨)
     */
    shouldThrow?: (error: Error) => boolean;
}

/**
 * 503 에러(서버 점검)는 기본적으로 상위로 throw
 */
const isServiceUnavailable = (error: Error): boolean => {
    return (
        isAxiosError(error) &&
        error.response?.status === HttpStatusCode.ServiceUnavailable
    );
};

const ShopbyApiErrorBoundary = ({
    children,
    fallback,
    onReset,
    shouldThrow,
}: ShopbyApiErrorBoundaryProps) => {
    return (
        <QueryErrorResetBoundary>
            {({ reset }) => (
                <ErrorBoundary
                    onReset={() => {
                        reset();
                        onReset?.();
                    }}
                    fallback={(props) => {
                        // 503 에러(서버 점검)는 무조건 상위로 throw
                        if (isServiceUnavailable(props.error)) {
                            throw props.error;
                        }

                        // 사용자 지정 shouldThrow 처리
                        if (shouldThrow?.(props.error)) {
                            throw props.error;
                        }

                        // fallback 미지정 시 빈 fragment (에러 무시)
                        if (fallback === undefined) {
                            return <></>;
                        }

                        // 함수형 fallback
                        if (typeof fallback === 'function') {
                            return <>{fallback(props)}</>;
                        }

                        // 정적 fallback
                        return <>{fallback}</>;
                    }}
                >
                    {children}
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    );
};

export default ShopbyApiErrorBoundary;
