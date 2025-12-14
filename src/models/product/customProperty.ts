export interface GetCustomPropertiesResponse {
    /** 상품항목 */
    customProperties: {
        /** 상품항목 번호 */
        no: number;
        /** 상품항목값 목록 */
        values: {
            /** 상품항목값 번호 */
            no: number;
            /** 상품항목 값 */
            value: string;
        }[];
        /** 상품항목 명 */
        name: string;
    }[];
}
