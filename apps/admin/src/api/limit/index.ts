import { request } from '@/api/core/request';
import { CreationLimitResponse, UpdateCreationLimitBody } from '@/model/limit';

export const limit = {
    getCreationLimit: () => {
        return request<CreationLimitResponse>({
            method: 'GET',
            url: '/admin/recipe/creation-limit',
        });
    },
    updateCreationLimit: (data: UpdateCreationLimitBody) => {
        return request({
            method: 'PUT',
            url: '/admin/recipe/creation-limit',
            data,
        });
    },
};
