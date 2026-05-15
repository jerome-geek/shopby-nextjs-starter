import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';

export const pageContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '60px',
    width: '100%',
    marginTop: '30px',
    padding: '40px 0 0',

    '@media': {
        [media.mobile]: {
            padding: '0',
        },
    },
});

export const title = style({
    fontSize: '40px',
    fontWeight: '600',
    letterSpacing: '-0.02em',
    lineHeight: '1.32',
    color: vars.color.gray[90],
});

export const contentsList = style({
    listStyle: 'none',
    padding: '0',
    margin: '0',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    columnGap: '23px',
    rowGap: '48px',

    '@media': {
        [media.mobile]: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
        },
    },
});

export const listItem = style({
    width: '100%',

    '@media': {
        [media.desktop]: {
            aspectRatio: '384 / 543',
            height: 'fit-content',
        },
        [media.tablet]: {
            aspectRatio: '384 / 543',
            height: 'fit-content',
        },
    },
});
