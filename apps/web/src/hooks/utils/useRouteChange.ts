import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const useRouteChange = (fn: (...args: any[]) => void) => {
    const pathname = usePathname();
    const ref = useRef('');

    useEffect(() => {
        if (ref.current) {
            if (ref.current !== pathname) {
                fn();
            }
        }
    });

    useEffect(() => {
        ref.current = pathname;
    }, [pathname]);

    return null;
};

export default useRouteChange;
