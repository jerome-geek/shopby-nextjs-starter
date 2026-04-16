import type { AxiosRequestConfig } from 'axios';

import { geekRequest } from '@/api/core/geekRequest';

export interface CommonUploadResponse {
    filePath: string;
    originFileName: string;
    size: number;
    contentType: string;
}

const common = {
    /**
     * 공용 이미지 업로드 (Geek 백엔드)
     */
    upload: (formData: FormData, options?: AxiosRequestConfig) => {
        return geekRequest<CommonUploadResponse>({
            method: 'POST',
            url: '/common/upload',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            ...options,
        });
    },
};

export default common;
