import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '48px',

    '@media': {
        [media.desktop]: {
            gap: '96px',
        },
    },
});

export const sectionTitle = style([textStyles.headingSemibold, {}]);

export const allViewButton = style([
    textStyles.caption1Regular,
    {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2px',
        color: vars.color.gray['60'],
    },
]);

export const moreButton = style([
    textStyles.headlineSemibold,
    {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        height: '53px',
        border: `1px solid ${vars.color.gray['50']}`,
        borderRadius: '4px',
        color: vars.color.black,
    },
]);

export const divider = style({
    width: 'calc(100% + 40px)',
    margin: '0 -20px',
    height: '6px',
    background: vars.color.gray['20'],
});

export const noResult = style([
    textStyles.body2Semibold,
    {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px',
        color: vars.color.gray['60'],
        '@media': {
            [media.desktop]: {
                height: '80px',
                fontWeight: '400',
                fontSize: '1.5rem',
                lineHeight: '1.4',
                letterSpacing: '-0.2%',
            },
        },
    },
]);
