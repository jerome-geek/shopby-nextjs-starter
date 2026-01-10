import {
    GetAccumulationsParams,
    GetAccumulationSummaryParams,
    GetExpirationAccumulationListParams,
} from '@/models/manage/accumulation';

const accumulationKeys = {
    all: ['accumulation'] as const,

    lists: () => [...accumulationKeys.all, 'list'] as const,
    list: (memberNo?: number, searchParams?: GetAccumulationsParams) =>
        [...accumulationKeys.lists(), memberNo, searchParams] as const,
    infiniteList: (memberNo?: number, searchParams?: GetAccumulationsParams) =>
        [
            ...accumulationKeys.lists(),
            'infinite',
            memberNo,
            searchParams,
        ] as const,
    expirationList: (
        memberNo?: number,
        searchParams?: GetExpirationAccumulationListParams,
    ) =>
        [
            ...accumulationKeys.lists(),
            'expiration',
            memberNo,
            searchParams,
        ] as const,

    summary: () => [...accumulationKeys.all, 'summary'] as const,
    summaryDetail: (
        memberNo?: number,
        searchParams?: GetAccumulationSummaryParams,
    ) =>
        [
            ...accumulationKeys.summary(),
            'detail',
            memberNo,
            searchParams,
        ] as const,

    waiting: () => [...accumulationKeys.all, 'waiting'] as const,
    waitingDetail: (memberNo?: number) =>
        [...accumulationKeys.waiting(), 'detail', memberNo] as const,
};

export default accumulationKeys;
