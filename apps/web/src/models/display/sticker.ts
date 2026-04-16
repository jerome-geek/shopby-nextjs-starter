import type { StickerInfoType } from '@/models';

export interface Sticker {
    /** 스티커 명 */
    stickerName: string;
    /** 전시 순서 */
    displayOrder: number;
    /** 스티커 번호 */
    stickerNo: number;
    /** 사용 여부 */
    useYn: string;
    /** 스티커 유형 */
    stickerType: StickerInfoType;
    /** 적용된 제품 개수 */
    productCount: number;
    /** 내용 */
    content: string;
}

export type GetStickersResponse = Sticker[];
