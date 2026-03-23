'use client';

import { useEffect } from 'react';

const useKeyDown = ({
    key,
    fn,
}: {
    key: KeyboardEvent['key'];
    fn: (...args: unknown[]) => void;
}) => {
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === key) {
                fn();
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [key, fn]);
};

export default useKeyDown;
