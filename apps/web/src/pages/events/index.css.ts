import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const pageContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '60px',
    width: '100%',
    marginTop: '30px',
    '@media': {
        'screen and (min-width: 769px)': {
            padding: '40px 0 0',
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
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    listStyle: 'none',
    padding: '0',
    margin: '0',
    '@media': {
        'screen and (min-width: 769px)': {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            columnGap: '23px',
            rowGap: '48px',
        },
    },
});

export const listItem = style({
    width: '100%',
    '@media': {
        'screen and (min-width: 769px)': {
            aspectRatio: '384 / 543',
            height: 'fit-content',
        },
    },
});
