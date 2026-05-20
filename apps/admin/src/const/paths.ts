export const PATHS = {
    DASHBOARD: '/',
    ERROR_400: '/*',
    AUTH: {
        LOGIN: '/login',
    },
    APP: {
        COLLECTION_GROUP: {
            LIST: '/collection-groups',
            DETAIL: '/collection-groups/:sno',
        },
        RECIPE_GROUP: {
            LIST: '/recipe-groups',
            DETAIL: '/recipe-groups/:sno',
        },
        USER_COLLECTION: {
            LIST: '/user-collections',
            DETAIL: '/user-collections/:sno',
        },
        USER_RECIPE: {
            LIST: '/user-recipes',
            DETAIL: '/user-recipes/:sno',
        },
        COMMENT: {
            LIST: '/comments',
            BLACKLIST: '/comments/blacklist',
        },
        RECIPE_SETTINGS: '/recipe-settings',
        CACHE_MANAGEMENT: '/cache-management',
    },
};
