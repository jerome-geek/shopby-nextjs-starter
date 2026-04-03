import { SearchAddressParams } from '@/models/manage/address';
import { GetPagedShippingAddressParams } from '@/models/order/shippingAddress';

const addressKeys = {
    all: ['addresses'] as const,
    config: () => [...addressKeys.all, 'config'] as const,

    /** 배송지 리스트 */
    lists: () => [...addressKeys.all, 'list'] as const,
    list: (params: GetPagedShippingAddressParams, memberNo: number) =>
        [...addressKeys.lists(), params, memberNo] as const,
    infiniteList: (params: GetPagedShippingAddressParams, memberNo?: number) =>
        [...addressKeys.lists(), params, memberNo, 'infinite'] as const,

    noPagingList: () => [...addressKeys.lists(), 'noPaging'] as const,

    /** 배송지 상세 조회 */
    details: () => [...addressKeys.all, 'detail'] as const,
    detail: (addressNo: number) =>
        [...addressKeys.details(), addressNo] as const,

    /** 주소검색 리스트 */
    searchLists: () => [...addressKeys.all, 'search'] as const,
    searchList: (params: SearchAddressParams) =>
        [...addressKeys.searchLists(), params] as const,
    searchInfiniteList: (params: SearchAddressParams) =>
        [...addressKeys.searchLists(), params, 'infinite'] as const,
};

export default addressKeys;
