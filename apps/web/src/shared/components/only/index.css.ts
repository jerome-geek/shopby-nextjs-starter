import { recipe } from '@vanilla-extract/recipes';

import { media } from '@/styles/media';

export const responsiveRecipe = recipe({
    base: {
        selectors: {
            '&:empty': {
                display: 'none',
            },
        },
    },
    variants: {
        view: {
            mobile: {
                display: 'none',
                '@media': {
                    [media.mobile]: {
                        display: 'contents',
                    },
                },
            },
            desktop: {
                display: 'contents',
                '@media': {
                    [media.mobile]: {
                        display: 'none',
                    },
                },
            },
        },
    },
    defaultVariants: {
        view: 'desktop',
    },
});
