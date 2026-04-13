import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import { ONE_WEEK } from '@/const/time';
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

const EVENT_REVALIDATE_MS = ONE_WEEK;

const event = {
    /**
     * 이벤트 기간안에 포함된 모든 이벤트 목록 조회하기
     *  - 이벤트 기간안에 포함된 모든 이벤트 목록 조회하는 API입니다
     *  - 1일 캐시하여 사용하고 있습니다. (cached)
     */
    getEvents: (params?: GetEventsParams, options?: AxiosRequestConfig) => {
        return shopbyRequest<GetEventsResponse>({
            method: 'GET',
            url: '/display/events',
            params,
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
    getEventsV2: (params: GetEventsV2Params, options?: AxiosRequestConfig) => {
        return shopbyRequest<GetEventsResponse>({
            method: 'GET',
            url: '/display/events',
            headers: {
                ...options?.headers,
                version: '2.0',
            },
            params,
            ...options,
        });
    },

    /**
     * 종료된 모든 이벤트 목록 조회하기
     *  - 종료된 모든 이벤트 목록 조회하는 API입니다
     *  - 1일 캐시하여 사용하고 있습니다. (cached)
     */
    getClosedEvents: (
        params?: GetClosedEventsParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetClosedEventsResponse>({
            method: 'GET',
            url: '/display/events/close',
            params,
            ...options,
        });
    },

    /**
     * 다수의 상품 번호로 이벤트 목록 조회하기
     *  - 다수의 상품 번호로 이벤트 목록 조회하는 API입니다
     *   - 예시. 10001, 10002 상품으로 조회 시, 10001상품이 포함된 기획전과 10002 상품이 포함된 기획전 모두 조회
     *  - 1일 캐시하여 사용하고 있습니다. (cached)
     */
    getEventsByProductNos: (
        params: GetEventsByProductNosParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetEventsByProductNosResponse>({
            method: 'GET',
            url: '/display/events/products',
            params,
            ...options,
        });
    },

    /**
     * 기획전명으로 기획전 검색하기
     *  - 기획전명으로 기획전을 조회하는 API ( like 검색 )
     */
    searchEventsByName: (
        params: SearchEventsByName,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetEventsResponse>({
            method: 'GET',
            url: '/display/events/search-by-name',
            params,
            ...options,
        });
    },

    /**
     * 기획전번호 리스트로 기획전 조회하기
     * - 기획전번호 리스트로 기획전을 조회하는 API 입니다.
     * - 현재 진행중인 기획전만 조회되고, 그 이외(진행대기, 종료)에는 조회되지 않습니다.
     * - 플랫폼별, 멤버그룹별, 멤버등급별에 따라 접근 불가능한 기획전은 조회되지 않습니다.
     * - products: 상품 목록 응답
     *   - 응답에서 기획전 내 상품목록은 전시순서가 가장 앞선 1개의 섹션 상품 목록이 조회되며, 상품 전시 순서에 의해 정렬됩니다.
     *   - 상품 목록은 countPerEvent 변수에 의해 응답 상품 개수가 제한되며,
     *   - 그 중 품절상품, 판매종료된 상품은 soldout, saleStatus 파라미터에 의해 다시 제외될 수 있습니다.
     *   - 예를 들어, 15개의 상품 목록은 먼저 countPerEvent = 10에 의해 10개 상품으로 제한되고, 품절상품 및 판매 종료 상품이 제외되어 실제 결과가 10개 미만으로 표시될 수 있습니다.
     */
    searchEventsByEventNos: (
        params: SearchEventsByEventNosParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<SearchEventsByEventNosResponse>({
            method: 'GET',
            url: '/display/events/search-by-nos',
            params,
            ...options,
        });
    },

    /**
     * 키워드별, 진행상태별로 기획전 검색하기
     *  - 키워드별(기획전명 or 태그)와 진행상태별(진행중 or 진행종료 or 진행예정)로 기획전을 조회하는 API입니다.
     */
    searchEventsByProgress: (
        params: SearchEventsByProgressParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<SearchEventsByProgressResponse>({
            method: 'GET',
            url: '/display/events/search-by-progress',
            params,
            ...options,
        });
    },

    /**
     * 다수의 기획전 번호로 기획전 섹션 목록 조회하기
     *  - 다수의 기획전 번호로 기획전 상품진열 목록 조회하는 API입니다.
     *  - 현재 진행중인 기획전만 조회되고, 그 이외(진행대기, 종료)에는 조회되지 않습니다.
     *  - 플랫폼별, 멤버그룹별, 멤버등급별에 따라 접근 불가능한 기획전은 조회되지 않습니다.
     */
    getSectionsByEventNos: (
        eventNos: number[],
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetSectionsByEventNosResponse>({
            method: 'GET',
            url: '/display/events/sections',
            params: eventNos,
            ...options,
        });
    },

    /**
     * 특정 상품을 포함하는 이벤트 목록 조회하기
     *  - 특정 상품을 포함하는 이벤트 목록 조회 API입니다
     *  - 1일 캐시하여 사용하고 있습니다. (cached)
     */
    getEventsByProduct: (productNo: number, options?: AxiosRequestConfig) => {
        return shopbyRequest<GetEventsByProductNoResponse>({
            method: 'GET',
            url: `/display/events/products/${productNo}`,
            ...options,
        });
    },

    /**
     * 기획전 상세 조회하기 v2.0
     *  - 1.0은 deprecated 되었습니다.
     *  -기획전을 조회하는 API입니다.
     *  - 기획전에 상품진열을 조회하는 API는 GET /display/events/{eventNo}/sections/{sectionNo} 를 이용바랍니다.
     *  - eventNo와 eventId 둘 다 검색 가능합니다.
     *  - 현재 진행중인 기획전만 조회되고, 그 이외(진행대기, 종료)에는 조회되지 않습니다.
     *  - 플랫폼별, 멤버그룹별, 멤버등급별에 따라 접근 불가능한 기획전은 조회되지 않습니다.
     *  - 에러코드: EVEC0001(기획전이 존재하지 않는 경우), EVEC0002(현재 진행중인 기획전이 아닌 경우), EVEC0003(접근할 수 없는 기획전인 경우)
     */
    getEvent: (
        eventKey: string | number,
        params?: GetEventParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetEventResponse>({
            method: 'GET',
            url: `/display/events/${eventKey}/`,
            params,
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
     *  - 에러코드: EVEC0001(기획전이 존재하지 않는 경우), EVEC0002(현재 진행중인 기획전이 아닌 경우), EVEC0003(접근할 수 없는 기획전인 경우)
     */
    getEventById: (
        eventId: string,
        params?: GetEventByIdParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetEventResponse>({
            method: 'GET',
            url: `/display/events/ids/${eventId}`,
            params,
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
     *  - 에러코드: EVEC0001(기획전이 존재하지 않는 경우), EVEC0002(현재 진행중인 기획전이 아닌 경우), EVEC0003(접근할 수 없는 기획전인 경우)
     */
    getEventProductDisplaySection: (
        eventNo: number,
        sectionNo: number,
        params?: GetEventProductDisplaySectionParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetEventProductDisplaySectionResponse>({
            method: 'GET',
            url: `/display/events/${eventNo}/sections/${sectionNo}`,
            params,
            ...options,
        });
    },
};

export default event;
