import type { Options } from 'ky';

import { request } from '@/api/core/request';
import { UploadImageResponse } from '@/models/storage';

const image = {
    /**
     * 이미지 업로드
     *  - 저장소에 임시 이미지를 업로드합니다.
     *  - 해당 url을 내부 API에 리퀘스트로 사용시 영구 URL로 변경되어서 저장되며, 변경되지 않은 임시 이미지는 일주일 뒤 삭제됩니다.
     */
    uploadImage: (options?: Options) => {
        return request.post<UploadImageResponse>('storage/temporary-images', {
            ...options,
            headers: {
                ...options?.headers,
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};

export default image;
