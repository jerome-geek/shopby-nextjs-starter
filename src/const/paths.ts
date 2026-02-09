export const PATHS = {
    HOME: '/',
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REGISTER: '/auth/register',
    },
    PRODUCTS: {
        LIST: '/products',
        NEW: '/products/new',
        BEST: '/products/best',
        DETAIL: (productNo: string | number) => `/products/${productNo}`,
    },
    CATEGORIES: {
        LIST: '/categories',
        DETAIL: (categoryNo: string | number) => `/categories/${categoryNo}`,
    },
    CART: '/cart',
    MYPAGE: {
        INDEX: '/mypage',
        ORDERS: '/mypage/orders',
        WISHLIST: '/mypage/wishlist',
    },
} as const;
