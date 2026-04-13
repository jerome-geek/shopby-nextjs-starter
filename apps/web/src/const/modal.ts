export const MODAL_QUERY_KEY = 'modal';

export const MODAL_TYPE = {
    RECIPE_CREATE: 'recipe-create',
    RECIPE_IMAGE_UPLOAD: 'recipe-image-upload',
    RECIPE_URL_INPUT: 'recipe-url-input',
    RECIPE_SAVE: 'recipe-save',
} as const;

export type ModalType = typeof MODAL_TYPE[keyof typeof MODAL_TYPE];
