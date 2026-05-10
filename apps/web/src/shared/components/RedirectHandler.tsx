import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface RedirectHandlerProps {
    path: string;
}

/**
 * ErrorBoundary fallback 안에서 렌더링되어 리다이렉트를 수행하는 컴포넌트
 */
export const RedirectHandler = ({ path }: RedirectHandlerProps) => {
    const router = useRouter();

    useEffect(() => {
        router.replace(path);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path]);

    return null;
};
