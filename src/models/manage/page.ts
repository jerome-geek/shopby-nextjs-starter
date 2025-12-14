import { DeviceType, PageType } from '@/models';

export interface GetExternalScriptsParams {
    pageTypes: PageType[];
}

interface ExternalScript {
    /** 기기 타입 (PC: 피씨, MOBILE: 모바일, BASE: 기본도메인) */
    deviceType: DeviceType;
    /** 페이지 타입 */
    pageType: PageType;
    /** 페이지 타입 Label */
    pageTypeLabel: string;
    /** 스크립트 */
    content?: string;
}

export type GetExternalScriptsResponse = ExternalScript[];
