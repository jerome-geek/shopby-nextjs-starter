import { AfterResponseHook, BeforeRequestHook } from 'ky';

const DEFAULT_API_RETRY_BACKOFF_LIMIT = 3 * 1000;
const DEFAULT_API_RETRY_LIMIT = 4;
const DEFAULT_API_TIMEOUT = 10 * 1000;

const logRequest: BeforeRequestHook = (request) => {
    console.log('Request:', request);
    if (process.env.NODE_ENV === 'development') {
        console.log('API Request:', request.url);
    }
};

const logResponse: AfterResponseHook = (request, options, response) => {
    console.log('Response:', response);
    if (process.env.NODE_ENV === 'development') {
        console.log('API Response:', response.status, request.url);
    }
};

export {
    DEFAULT_API_RETRY_BACKOFF_LIMIT,
    DEFAULT_API_RETRY_LIMIT,
    DEFAULT_API_TIMEOUT,
    logRequest,
    logResponse,
};
