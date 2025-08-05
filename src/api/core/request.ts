import ky from 'ky';

const request = ky.create({
    prefixUrl: 'https://shop-api.e-ncp.com',
    timeout: 10000,
    headers: {
        version: '1.0',
        clientId: '',
        platform: 'PC',
        language: 'ko',
        currency: 'KRW',
    },
});

export default request;
