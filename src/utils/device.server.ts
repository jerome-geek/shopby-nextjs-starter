import { headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';

export type Platform = 'PC' | 'IOS' | 'AOS' | 'MOBILE_WEB';

export async function getPlatform(): Promise<Platform> {
    const headersList = await headers();
    const userAgent = headersList.get?.('user-agent') || '';
    const parser = new UAParser(userAgent);

    const device = parser.getDevice();
    const os = parser.getOS();

    // 모바일 디바이스인지 확인
    const isMobile = device.type === 'mobile' || device.type === 'tablet';

    if (!isMobile) {
        return 'PC';
    }

    // OS 확인
    const osName = os.name?.toLowerCase();

    if (osName === 'ios') {
        return 'IOS';
    } else if (osName === 'android') {
        return 'AOS';
    } else {
        // 모바일이지만 iOS/Android가 아닌 경우 (예: Windows Mobile 등)
        return 'MOBILE_WEB';
    }
}

export async function getIsMobile() {
    const headersList = await headers();
    const userAgent = headersList.get?.('user-agent') || '';
    const parser = new UAParser(userAgent);
    const device = parser.getDevice();

    return device.type === 'mobile' || device.type === 'tablet';
}
