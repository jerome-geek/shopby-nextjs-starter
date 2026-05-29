import { includes } from '@fxts/core';
import {
    ErrorBoundary,
    ErrorBoundaryFallbackProps,
    Suspense,
} from '@suspensive/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

import { Button } from '@/shared/ui/button';
import * as styles from '@/shared/boundary/shopby-async-boundary.css';
import { RedirectHandler } from '@/shared/components/RedirectHandler';
import { RedirectError } from '@/shared/errors';

interface ShopbyAsyncBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    /**
     * 에러 발생 시 렌더할 fallback 컴포넌트
     * - ReactNode: 정적 fallback
     * - Function: ErrorBoundaryFallbackProps를 받아 동적으로 렌더
     * - null 또는 미지정 시 DefaultErrorFallback 사용
     */
    errorFallback?:
        | ReactNode
        | ((props: ErrorBoundaryFallbackProps) => ReactNode);
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

/**
 * 기본 에러 Fallback 컴포넌트 (404 페이지 스타일)
 */
const DefaultErrorFallback = ({ error, reset }: ErrorBoundaryFallbackProps) => {
    const router = useRouter();
    const message = isAxiosError(error)
        ? error.response?.data?.message || error.message
        : error.message || '알 수 없는 에러가 발생했습니다.';

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>데이터를 불러오지 못했습니다.</h1>
            <p className={styles.description}>{message}</p>
            <div className={styles.buttonGroup}>
                <div className={styles.buttonWrapper}>
                    <Button
                        frame='solid'
                        variant='primary'
                        onClick={reset}
                        style={{ width: '100%' }}
                    >
                        다시 시도
                    </Button>
                </div>
                <div className={styles.buttonWrapper}>
                    <Button
                        frame='outlined'
                        variant='secondary'
                        onClick={() => router.push('/')}
                        style={{ width: '100%' }}
                    >
                        홈으로 돌아가기
                    </Button>
                </div>
            </div>
        </div>
    );
};

const ShopbyAsyncBoundary = ({
    children,
    fallback,
    errorFallback,
    onReset,
    shouldThrow,
}: ShopbyAsyncBoundaryProps) => {
    return (
        <QueryErrorResetBoundary>
            {({ reset }) => (
                <ErrorBoundary
                    onReset={() => {
                        reset();
                        onReset?.();
                    }}
                    fallback={(props) => {
                        // RedirectError 발생 시 즉시 리다이렉트 핸들러 렌더링
                        const error = props.error;
                        const isRedirectError =
                            error instanceof RedirectError ||
                            includes(error.name, [
                                'RedirectError',
                                'InvalidParameterError',
                            ]);

                        if (isRedirectError) {
                            return (
                                <RedirectHandler
                                    path={(error as RedirectError).path}
                                />
                            );
                        }

                        // 503 에러(서버 점검)는 무조건 상위로 throw
                        if (isServiceUnavailable(props.error)) {
                            throw props.error;
                        }

                        // 사용자 지정 shouldThrow 처리
                        if (shouldThrow?.(props.error)) {
                            throw props.error;
                        }

                        // 사용자 지정 fallback 처리
                        if (typeof errorFallback === 'function') {
                            return <>{errorFallback(props)}</>;
                        }

                        if (errorFallback) {
                            return <>{errorFallback}</>;
                        }

                        // 기본 fallback
                        return <DefaultErrorFallback {...props} />;
                    }}
                >
                    <Suspense fallback={fallback}>{children}</Suspense>
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    );
};

export default ShopbyAsyncBoundary;
