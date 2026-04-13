import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import { ImagesType } from '@/models/manage';

const file = {
    /**
     * 파일 업로드
     *  - 저장소에 임시 파일을 업로드합니다.
     *  - 업로드된 파일을 내부 API에 리퀘스트로 사용시 영구 저장되며, 변경되지 않은 임시 파일은 일주일 뒤 삭제됩니다.
     *  - 파일명에는 다음 특수 문자 ' " ` < > ; . 을 포함할 수 없습니다.
     */
    uploadFile: (options?: AxiosRequestConfig) => {
        return shopbyRequest<ImagesType>({
            method: 'POST',
            url: '/storage/temporary-files',
            headers: {
                ...options?.headers,
                'Content-Type': 'multipart/form-data',
            },
            ...options,
        });
    },
};

export default file;
