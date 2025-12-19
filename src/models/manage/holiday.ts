export interface GetHolidayParams {
    /** 연도 */
    year: number;
    /** 월 */
    month: number;
}

export interface GetHolidayResponse {
    /** 공휴일 목록 */
    holidays: number[];
}
