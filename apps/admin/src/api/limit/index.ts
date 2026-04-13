import { request } from '@/api/core/request';
import {
    CreateExceptionBody,
    CreationLimitResponse,
    UpdateCreationLimitBody,
    ExceptionsResponse,
} from '@/model/limit';

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
    getExceptionList: () => {
        return request<ExceptionsResponse>({
            method: 'GET',
            url: '/admin/recipe/creation-limit/exceptions',
        });
    },
    createException: (data: CreateExceptionBody) => {
        return request({
            method: 'POST',
            url: '/admin/recipe/creation-limit/exceptions',
            data,
        });
    },
    deleteException: (memberNo: number) => {
        return request({
            method: 'DELETE',
            url: `/admin/recipe/creation-limit/exceptions/${memberNo}`,
        });
    },
};
