import type { AxiosResponse } from 'axios';

import { request } from '@/api/core/request';
import { ServerApiByPassParams } from '@/model/shopby';

export const shopby = {
    serverApiByPass: <T>(
        data: ServerApiByPassParams,
    ): Promise<AxiosResponse<T>> =>
        request({
            method: 'POST',
            url: '/app/admin/shopby/server-api',
            data: {
                url: data.url,
                httpMethod: 'GET',
                param: JSON.stringify(data.param),
                version: data.version,
            },
        }),
};
