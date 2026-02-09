import type { Options } from 'ky';
import qs from 'qs';

import { request } from '@/api/core/request';
import {
    GetClosedEventsParams,
    GetClosedEventsResponse,
    GetEventByIdParams,
    GetEventParams,
    GetEventProductDisplaySectionParams,
    GetEventProductDisplaySectionResponse,
    GetEventResponse,
    GetEventsByProductNoResponse,
    GetEventsByProductNosParams,
    GetEventsByProductNosResponse,
    GetEventsParams,
    GetEventsResponse,
    GetEventsV2Params,
    GetSectionsByEventNosResponse,
    SearchEventsByEventNosParams,
    SearchEventsByEventNosResponse,
    SearchEventsByName,
    SearchEventsByProgressParams,
    SearchEventsByProgressResponse,
} from '@/models/display/event';

const event = {
    /**
     * 이벤트 기간안에 포함된 모든 이벤트 목록 조회하기
     *  - 이벤트 기간안에 포함된 모든 이벤트 목록 조회하는 API입니다
     */
    getEvents: (params?: GetEventsParams, options?: Options) => {
        return request.get<GetEventsResponse>('display/events', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 기획전 조회하기 v2.0
     *  - 기획전을 조회하는 API 입니다.
     *  - 키워드 타입: 기획전 이름(NAME), 기획전 번호(NO), 태그(TAG), 아이디(ID)
     *   - 예시: 기획전 이름으로 조회 시 - keywordInfo.type(=NAME), keywordInfo.value(=특별 할인)
     *   - NAME 타입은 keywordInfo.value에 1가지 값으로 조회 가능합니다
     *   - keywordInfo.value가 없는 경우에는 검색조건으로 사용되지 않습니다
     *  - header의 'Version' 값을 2.0으로 요청해야 정상 동작합니다
     */
    getEventsV2: (params: GetEventsV2Params, options?: Options) => {
        return request.get<GetEventsResponse>('display/events', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'repeat',
                allowDots: true,
            }),
            ...options,
            headers: {
                ...options?.headers,
                version: '2.0',
            },
        });
    },

    /**
     * 종료된 모든 이벤트 목록 조회하기
     *  - 종료된 모든 이벤트 목록 조회하는 API입니다
     */
    getClosedEvents: (params?: GetClosedEventsParams, options?: Options) => {
        return request.get<GetClosedEventsResponse>('display/events/close', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 다수의 상품 번호로 이벤트 목록 조회하기
     *  - 다수의 상품 번호로 이벤트 목록 조회하는 API입니다
     *   - 예시. 10001, 10002 상품으로 조회 시, 10001상품이 포함된 기획전과 10002 상품이 포함된 기획전 모두 조회
     */
    getEventsByProductNos: (
        params: GetEventsByProductNosParams,
        options?: Options,
    ) => {
        return request.get<GetEventsByProductNosResponse>(
            'display/events/products',
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            },
        );
    },

    /**
     * 기획전명으로 기획전 검색하기
     *  - 기획전명으로 기획전을 조회하는 API ( like 검색 )
     */
    searchEventsByName: (params: SearchEventsByName, options?: Options) => {
        return request.get<GetEventsResponse>('display/events/search-by-name', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 기획전번호 리스트로 기획전 조회하기
     * - 기획전번호 리스트로 기획전을 조회하는 API 입니다.
     * - 현재 진행중인 기획전만 조회되고, 그 이외(진행대기, 종료)에는 조회되지 않습니다.
     * - 플랫폼별, 멤버그룹별, 멤버등급별에 따라 접근 불가능한 기획전은 조회되지 않습니다.
     */
    searchEventsByEventNos: (
        params: SearchEventsByEventNosParams,
        options?: Options,
    ) => {
        return request.get<SearchEventsByEventNosResponse>(
            'display/events/search-by-nos',
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            },
        );
    },

    /**
     * 키워드별, 진행상태별로 기획전 검색하기
     *  - 키워드별(기획전명 or 태그)와 진행상태별(진행중 or 진행종료 or 진행예정)로 기획전을 조회하는 API입니다.
     */
    searchEventsByProgress: (
        params: SearchEventsByProgressParams,
        options?: Options,
    ) => {
        return request.get<SearchEventsByProgressResponse>(
            'display/events/search-by-progress',
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            },
        );
    },

    /**
     * 다수의 기획전 번호로 기획전 섹션 목록 조회하기
     *  - 다수의 기획전 번호로 기획전 상품진열 목록 조회하는 API입니다.
     *  - 현재 진행중인 기획전만 조회되고, 그 이외(진행대기, 종료)에는 조회되지 않습니다.
     *  - 플랫폼별, 멤버그룹별, 멤버등급별에 따라 접근 불가능한 기획전은 조회되지 않습니다.
     */
    getSectionsByEventNos: (eventNos: number[], options?: Options) => {
        return request.get<GetSectionsByEventNosResponse>(
            'display/events/sections',
            {
                searchParams: qs.stringify(eventNos, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            },
        );
    },

    /**
     * 특정 상품을 포함하는 이벤트 목록 조회하기
     *  - 특정 상품을 포함하는 이벤트 목록 조회 API입니다
     */
    getEventsByProduct: (productNo: number, options?: Options) => {
        return request.get<GetEventsByProductNoResponse>(
            `display/events/products/${productNo}`,
            options,
        );
    },

    /**
     * 기획전 상세 조회하기 v2.0
     *  - 1.0은 deprecated 되었습니다.
     *  -기획전을 조회하는 API입니다.
     *  - 기획전에 상품진열을 조회하는 API는 GET /display/events/{eventNo}/sections/{sectionNo} 를 이용바랍니다.
     *  - eventNo와 eventId 둘 다 검색 가능합니다.
     *  - 현재 진행중인 기획전만 조회되고, 그 이외(진행대기, 종료)에는 조회되지 않습니다.
     *  - 플랫폼별, 멤버그룹별, 멤버등급별에 따라 접근 불가능한 기획전은 조회되지 않습니다.
     */
    getEvent: (
        eventKey: string | number,
        params?: GetEventParams,
        options?: Options,
    ) => {
        return request.get<GetEventResponse>(`display/events/${eventKey}/`, {
            searchParams: qs.stringify(params),
            ...options,
            headers: {
                ...options?.headers,
                version: '2.0',
            },
        });
    },

    /**
     * 기획전 ID로 상세 조회하기 v2.0
     *  - ID로 기획전을 조회하는 API입니다.
     *  - 현재 진행중인 기획전만 조회되고, 그 이외(진행대기, 종료)에는 조회되지 않습니다.
     *  - 플랫폼별, 멤버그룹별, 멤버등급별에 따라 접근 불가능한 기획전은 조회되지 않습니다.
     */
    getEventById: (
        eventId: string,
        params?: GetEventByIdParams,
        options?: Options,
    ) => {
        return request.get<GetEventResponse>(`display/events/ids/${eventId}`, {
            searchParams: qs.stringify(params),
            ...options,
            headers: {
                ...options?.headers,
                version: '2.0',
            },
        });
    },

    /**
     * 기획전 상품진열 상품 조회
     *  - 기획전번호와 상품진열 번호로 해당 상품진열에 있는 상품을 조회하는 API입니다.
     *  - size: 상품을 조회하는 최대 페이지 사이즈는 30입니다.
     *  - 현재 진행중인 기획전만 조회되고, 그 이외(진행대기, 종료)에는 조회되지 않습니다.
     *  - 플랫폼별, 멤버그룹별, 멤버등급별에 따라 접근 불가능한 상품진열 상품은 조회되지 않습니다.
     */
    getEventProductDisplaySection: (
        eventNo: number,
        sectionNo: number,
        params?: GetEventProductDisplaySectionParams,
        options?: Options,
    ) => {
        return request.get<GetEventProductDisplaySectionResponse>(
            `display/events/${eventNo}/sections/${sectionNo}`,
            {
                searchParams: qs.stringify(params),
                ...options,
            },
        );
    },
};

export default event;
