import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import type {
    GetPagedShippingAddressListResponse,
    GetPagedShippingAddressParams,
    GetRecentShippingAddressResponse,
    GetShippingAddressListResponse,
    GetShippingAddressResponse,
    GetShippingEnumInfoResponse,
    RegisterShippingAddressData,
    RegisterShippingAddressResponse,
    UpdateDefaultShippingAddressResponse,
} from '@/models/order/shippingAddress';

const shippingAddress = {
    /**
     * 배송지 목록 가져오기
     *  - 주소지정보를 조회하는 API 입니다
     *  - 기본 배송지(defaultAddress)가 가장 상단에 노출되며, 이후 최근 사용된 주소 순서로 나열됩니다 (최근 사용시간의 역순로 정렬)
     */
    getShippingAddressList: (options?: AxiosRequestConfig) => {
        return shopbyRequest<GetShippingAddressListResponse>({
            method: 'GET',
            url: '/profile/shipping-addresses',
            ...options,
        });
    },

    /**
     * 배송지 등록하기
     *  - 주소지정보를 추가하는 API 입니다
     *  - 주소록 배송지(AddressType.BOOK)는 제한없이 등록이 가능하고 최근 배송지(AddressType.RECENT)는 최대 10개 까지 등록이 됩니다
     *  - 최근 배송지가 10개가 등록된 상태에서 추가로 최근 배송지를 등록하면
     *  - 기본 배송지가 아닌 최근 배송지중에 사용한지 가장 오래된 최근 배송지가 삭제 됩니다
     */
    registerShippingAddress: (
        data: RegisterShippingAddressData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<RegisterShippingAddressResponse>({
            method: 'POST',
            url: '/profile/shipping-addresses',
            data,
            ...options,
        });
    },
    /**
     * 패이징 처리 된 배송지 목록 가져오기
     *  - 페이징 처리 된 주소지정보를 조회하는 API 입니다.
     */
    getPagedShippingAddressList: (
        params: GetPagedShippingAddressParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetPagedShippingAddressListResponse>({
            method: 'GET',
            url: '/profile/shipping-addresses/booked',
            params,
            ...options,
        });
    },

    /**
     * 최근 배송지 가져오기
     *  - 로그인한 사용자의 최근배송지 목록을 조회하는 API 입니다.
     */
    getRecentShippingAddress: (options?: AxiosRequestConfig) => {
        return shopbyRequest<GetRecentShippingAddressResponse>({
            method: 'GET',
            url: '/profile/shipping-addresses/recent',
            ...options,
        });
    },

    /**
     * 배송지 가져오기
     *  - 선택한 배송지의 세부 정보를 조회하는 API 입니다
     */
    getShippingAddress: (addressNo: number, options?: AxiosRequestConfig) => {
        return shopbyRequest<GetShippingAddressResponse>({
            method: 'GET',
            url: `/profile/shipping-addresses/${addressNo}`,
            ...options,
        });
    },

    /**
     *  배송지 수정하기
     *  - 선택한 배송지 주소를 수정하는 API 입니다
     *  - [참고사항] 주소지 정보 중 'nullable'한 값은 해당 값을 입력하지 않은 경우에 기존 값이 유지되고, 공백을 넣어 요청할 경우 공백으로 수정됩니다.
     */
    updateShippingAddress: (
        addressNo: number,
        data: RegisterShippingAddressData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<RegisterShippingAddressResponse>({
            method: 'PUT',
            url: `/profile/shipping-addresses/${addressNo}`,
            data,
            ...options,
        });
    },

    /**
     * 배송지 삭제하기
     *  - 선택한 배송지 주소를 삭제하는 API 입니다
     */
    deleteShippingAddress: (
        addressNo: number,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'DELETE',
            url: `/profile/shipping-addresses/${addressNo}`,
            ...options,
        });
    },
    /**
     * 기본 배송지 수정하기
     *  - 선택한 배송지를 기본배송지로 지정하는 API 입니다
     */
    updateDefaultShippingAddress: (
        addressNo: number,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<UpdateDefaultShippingAddressResponse>({
            method: 'PUT',
            url: `/profile/shipping-addresses/${addressNo}/default`,
            ...options,
        });
    },

    /**
     *  배송 enum 정보 조회
     */
    getShippingEnumInfo: (options?: AxiosRequestConfig) => {
        return shopbyRequest<GetShippingEnumInfoResponse>({
            method: 'GET',
            url: '/shippings/enums',
            ...options,
        });
    },
};

export default shippingAddress;
