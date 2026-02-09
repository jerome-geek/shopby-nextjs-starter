export interface GetFeedsResponse {
    data: {
        /** 미디어 유형(VIDEO, IMAGE, CAROUSEL_ALBUM) */
        media_type: string;
        /** 썸네일 URL(VIDEO 미디어에만 제공) */
        media_url: string;
        /** 미디어 영구 URL(미디어에 저작권이 있는 자료가 포함되어 있거나 저작권 위반 플래그가 지정된 경우 생략) */
        permalink: string;
        /** 미디어 URL */
        thumbnail_url: string;
        /** 인스타그램 유저 이름 */
        username: string;
    }[];
    error: {
        /** 에러 코드 */
        code: number;
        /** 에러 유형 */
        type: string;
        /** 에러 메세지 */
        message: string;
        /** 내부 지원 식별자 */
        fbtrace_id: string;
    };
}
