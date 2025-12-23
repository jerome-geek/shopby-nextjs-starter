'use client';

import { useEffect, useState } from 'react';

const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState<boolean | null>(null);

    useEffect(() => {
        const media = window.matchMedia(query);
        setMatches(media.matches);

        const handler = () => setMatches(media.matches);
        media.addEventListener('change', handler);

        return () => {
            media.removeEventListener('change', handler);
        };
    }, [query]);

    return matches;
};

export default useMediaQuery;
