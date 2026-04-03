import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const section = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    backgroundColor: vars.color.white,
    border: `1px solid ${vars.color.gray['30']}`,
    borderRadius: '4px',
    padding: '20px',
});

export const titleRow = style({
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
});

export const title = style([
    textStyles.headlineBold,
    {
        color: vars.color.black,

        '@media': {
            [media.mobile]: {
                fontSize: '1.4rem',
            },
        },
    },
]);

export const subtitle = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['70'],

        '@media': {
            [media.mobile]: {
                fontSize: '1.2rem',
            },
        },
    },
]);

export const list = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
});

export const item = style({
    flex: '1 1 0',
    textAlign: 'center',
});

export const count = style([
    textStyles.body1Bold,
    {
        display: 'grid',
        placeItems: 'center',
        aspectRatio: '1 / 1',
        maxWidth: '92px',
        width: '100%',
        margin: '0 auto 10px',
        borderRadius: '999px',
        backgroundColor: vars.color.gray['10'],
        border: `1px solid ${vars.color.gray['30']}`,
        color: vars.color.black,
    },
]);

export const countPrimary = style({
    color: vars.color.primary,
});

export const label = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['80'],

        '@media': {
            [media.mobile]: {
                fontSize: '1.2rem',
            },
        },
    },
]);
