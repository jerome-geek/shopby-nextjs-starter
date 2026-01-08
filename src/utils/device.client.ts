import { UAParser } from 'ua-parser-js';

import type { Platform } from './device.server';

// 클라이언트 컴포넌트용 (useEffect에서 사용)
export function getPlatformClient(): Platform {
    if (typeof window === 'undefined') {
        return 'PC';
    }

    const parser = new UAParser(window.navigator.userAgent);
    const device = parser.getDevice();
    const os = parser.getOS();

    const isMobile = device.type === 'mobile' || device.type === 'tablet';

    if (!isMobile) {
        return 'PC';
    }

    const osName = os.name?.toLowerCase();

    if (osName === 'ios') {
        return 'IOS';
    } else if (osName === 'android') {
        return 'AOS';
    } else {
        return 'MOBILE_WEB';
    }
}

export function getIsMobileClient() {
    if (typeof window === 'undefined') {
        return false;
    }

    const parser = new UAParser(window.navigator.userAgent);
    const device = parser.getDevice();

    return device.type === 'mobile' || device.type === 'tablet';
}
