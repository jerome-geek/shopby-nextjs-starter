import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useRouteChange = (fn: () => void) => {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChangeComplete = () => {
            fn();
        };

        router.events.on('routeChangeComplete', handleRouteChangeComplete);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
        };
    }, [fn, router]);

    return null;
};

export default useRouteChange;
