import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const section = style({
    padding: '40px 20px',
    backgroundColor: vars.color.white,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    '@media': {
        'screen and (min-width: 768px)': {
            padding: '60px 40px',
            maxWidth: '1200px',
            margin: '0 auto',
        },
    },
});

export const header = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const titleWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
});

export const titleRow = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

export const title = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
    },
]);

export const timer = style([
    textStyles.headingBold,
    {
        color: vars.color.pink['100'],
        fontVariantNumeric: 'tabular-nums',
    },
]);

export const subtitle = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const viewAll = style([
    textStyles.caption1Regular,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        color: vars.color.gray['60'],
        textDecoration: 'none',
    },
]);

export const productGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    '@media': {
        'screen and (min-width: 768px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
        },
    },
});

// Custom sticker for the timer badge on top of image
export const timerBadge = style({
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: vars.color.pink['100'],
    color: vars.color.white,
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 700,
    zIndex: 2,
});

export const productItem = style({
    position: 'relative',
});
