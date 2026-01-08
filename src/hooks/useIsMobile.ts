'use client';

import { useEffect, useState } from 'react';
import { UAParser } from 'ua-parser-js';

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const parser = new UAParser(window.navigator.userAgent);
        const device = parser.getDevice();
        setIsMobile(device.type === 'mobile' || device.type === 'tablet');
    }, []);

    return isMobile;
};
