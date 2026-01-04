import { ChannelType } from '@/models';

declare global {
    /**
     * 페이지별 SearchParams 타입을 관리하는 맵 (전역)
     * 새로운 페이지가 생기면 어디서든 이 인터페이스를 확장할 수 있습니다.
     */
    interface SearchParamsMap {
        '/products/[productNo]': {
            channelType?: ChannelType;
            preview?: boolean;
        };
        '/terms/[termsType]': { termsNo?: string };
    }
    /**
     * Next.js가 생성한 글로벌 PageProps를 활용하여
     * params는 자동 추론하고 searchParams만 우리가 제어합니다.
     */
    interface AppPageProps<
        Route extends keyof SearchParamsMap,
        TSearchParams = SearchParamsMap[Route],
    > {
        // Route를 직접 전달하여 Next.js가 추론한 해당 경로의 params 타입을 정확하게 가져옴
        params: PageProps<Route>['params'];
        searchParams: Promise<TSearchParams>;
    }
}

export {};
