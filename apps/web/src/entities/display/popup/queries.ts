import { queryOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError, AxiosRequestConfig } from 'axios';

import { popup } from '@/entities/display/api';
import { popupKeys } from '@/hooks/queryKeys';
import type {
    DesignPopupData,
    GetAllPopupParams,
    GetAllPopupResponse,
    GetDesignPopupResponse,
} from '@/entities/display/model/popup';

export interface AllPopupListOptionsParams<T = GetAllPopupResponse> {
    params?: GetAllPopupParams;
    platform?: string;
    axiosRequestConfig?: AxiosRequestConfig;
    options?: Omit<
        UseQueryOptions<
            GetAllPopupResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof popupKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const allPopupListOptions = <T = GetAllPopupResponse>({
    params,
    platform,
    axiosRequestConfig,
    options,
}: AllPopupListOptionsParams<T>) =>
    queryOptions({
        queryKey: popupKeys.list(params, platform, axiosRequestConfig),
        queryFn: async () => {
            const { data } = await popup.getAllPopups(
                params,
                platform,
                axiosRequestConfig,
            );
            return data;
        },
        ...options,
    });

export interface DesignPopupListOptionsParams<T = GetDesignPopupResponse> {
    data: DesignPopupData;
    platform?: string;
    options?: Omit<
        UseQueryOptions<
            GetDesignPopupResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof popupKeys)['design']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const designPopupListOptions = <T = GetDesignPopupResponse>({
    data,
    platform,
    options,
}: DesignPopupListOptionsParams<T>) =>
    queryOptions({
        queryKey: popupKeys.design(data, platform),
        queryFn: async () => {
            const { data: responseData } = await popup.getDesignPopups(
                data,
                platform,
            );
            return responseData;
        },
        ...options,
    });

export interface PopupListOptionsParams<T = GetAllPopupResponse> {
    popupNos: number[];
    params?: GetAllPopupParams;
    options?: Omit<
        UseQueryOptions<
            GetAllPopupResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof popupKeys)['detailByPopupNos']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const popupListOptions = <T = GetAllPopupResponse>({
    popupNos,
    params,
    options,
}: PopupListOptionsParams<T>) =>
    queryOptions({
        queryKey: popupKeys.detailByPopupNos(popupNos),
        queryFn: async () => {
            const { data } = await popup.getPopups(popupNos, params);
            return data;
        },
        ...options,
    });
