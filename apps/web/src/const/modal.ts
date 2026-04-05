export const MODAL_QUERY_KEY = 'modal';

export const MODAL_TYPE = {
    RECIPE_CREATE: 'recipe-create',
} as const;

export type ModalType = typeof MODAL_TYPE[keyof typeof MODAL_TYPE];
