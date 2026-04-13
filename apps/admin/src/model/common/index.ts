export interface PageParams {
    take: number;
    page: number;
    order?: 'DESC' | 'ASC';
}

export interface PageResponse<T> {
    count: number;
    currentPage: number;
    data: T[];
    lastPage: number;
    nextPage: number | null;
    prevPage: number | null;
    statusCode: 'success' | 'fail';
}
