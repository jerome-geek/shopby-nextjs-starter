import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import type { UploadImageResponse } from '@/models/storage';

const image = {
    /**
     * 이미지 업로드
     *  - 저장소에 임시 이미지를 업로드합니다.
     *  - 해당 url을 내부 API에 리퀘스트로 사용시 영구 URL로 변경되어서 저장되며, 변경되지 않은 임시 이미지는 일주일 뒤 삭제됩니다.
     */
    uploadImage: (options?: AxiosRequestConfig) => {
        return shopbyRequest<UploadImageResponse>({
            method: 'POST',
            url: '/storage/temporary-images',
            ...options,
            headers: {
                'Content-Type': undefined,
                ...options?.headers,
            },
        });
    },
};

export default image;
