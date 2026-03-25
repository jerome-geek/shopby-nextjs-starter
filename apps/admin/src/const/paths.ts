export const PATHS = {
    DASHBOARD: '/',
    ERROR_400: '/*',
    AUTH: {
        LOGIN: '/login',
    },
    APP: {
        COLLECTION_GROUP: {
            LIST: '/collection-group',
            DETAIL: '/collection-group/:sno',
        },
        RECIPE_GROUP: {
            LIST: '/recipe-group',
            DETAIL: '/recipe-group/:sno',
        },
        USER_COLLECTION: {
            LIST: '/user-collection',
            DETAIL: '/user-collection/:sno',
        },
        USER_RECIPE: {
            LIST: '/user-recipe',
            DETAIL: '/user-recipe/:sno',
        },
    },
};
