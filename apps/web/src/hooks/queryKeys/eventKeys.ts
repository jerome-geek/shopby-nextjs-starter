import type { GetEventInfoParams } from '@/models/display';
import {
    GetEventParams,
    GetEventProductDisplaySectionParams,
    GetEventsParams,
    GetEventsV2Params,
    SearchEventsByEventNosParams,
} from '@/models/display/event';

const eventKeys = {
    all: ['events'] as const,

    /** 기획전 목록 조회 */
    lists: () => [...eventKeys.all, 'list'] as const,
    list: (params: GetEventsParams | GetEventsV2Params) =>
        [...eventKeys.lists(), params] as const,
    infiniteList: (searchParams: GetEventsParams | GetEventsV2Params) =>
        [...eventKeys.lists(), searchParams, 'infinite'] as const,

    /** 기획전 상세 조회 */
    details: () => [...eventKeys.all, 'detail'] as const,
    detail: (eventKey: string | number, searchParams?: GetEventParams) =>
        [...eventKeys.details(), eventKey, searchParams] as const,

    detailById: (eventId: string, searchParams?: GetEventInfoParams) =>
        [...eventKeys.details(), eventId, searchParams] as const,
    detailByProduct: (productNo: number) =>
        [...eventKeys.details(), productNo] as const,

    searchByEventNos: (searchParams: SearchEventsByEventNosParams) =>
        [...eventKeys.all, 'searchByEventNos', searchParams] as const,

    /** 기획전 상품 진열 조회 */
    productSection: (
        eventNo: number,
        sectionNo: number,
        searchParams: GetEventProductDisplaySectionParams,
    ) =>
        [
            ...eventKeys.all,
            'productSection',
            eventNo,
            sectionNo,
            searchParams,
        ] as const,
};

export default eventKeys;
