import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    '@media': {
        [media.desktop]: {
            gap: '32px',
            padding: '36px 0',
            maxWidth: '1200px',
            margin: '0 auto',
        },
    },
});

export const title = style([textStyles.display1Semibold]);

export const border = style({
    width: '100vw',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
    marginLeft: 'calc(50% - 50vw)',
    marginRight: 'calc(50% - 50vw)',
});

export const productGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    columnGap: '4px',
    rowGap: '24px',

    '@media': {
        [media.tablet]: {
            gridTemplateColumns: 'repeat(4, 1fr)',
            columnGap: '18px',
            rowGap: '36px',
        },
        [media.desktop]: {
            gridTemplateColumns: 'repeat(5, 1fr)',
            columnGap: '25px',
            rowGap: '48px',
        },
    },
});
