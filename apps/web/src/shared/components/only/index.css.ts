import { recipe } from '@vanilla-extract/recipes';

import { media } from '@/styles/media';

export const responsiveRecipe = recipe({
    base: {
        width: '100%',
    },
    variants: {
        view: {
            mobile: {
                display: 'none',
                '@media': {
                    [media.mobile]: {
                        display: 'block',
                    },
                },
            },
            desktop: {
                display: 'block',
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
