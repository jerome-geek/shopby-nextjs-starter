import type { Options } from 'ky';

import { publicRequest } from '@/api/core/request';
import { GetFeedsResponse } from '@/models/manage/instagram';

const instagram = {
    /**
     * instagram 피드(게시글 목록) 조회하기
     *  - 해당 쇼핑몰의 인스타그램 게시글 목록을 조회하는 API 입니다.
     *  - 조회간 에러 발생시, 에러 정보가 Response 객체에 포함됩니다.
     */
    getFeeds: (options?: Options) => {
        return publicRequest.get<GetFeedsResponse>('shopby/instagram/media', {
            ...options,
        });
    },
};

export default instagram;
