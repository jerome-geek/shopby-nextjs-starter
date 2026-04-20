import { globalStyle, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

export const header = style({
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: '12px',
});

export const title = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
        '@media': {
            [media.mobile]: {
                ...textStyleTokens.headlineBold,
            },
        },
    },
]);

export const subtitle = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['60'],
        marginTop: '4px',
    },
]);

export const backButton = style({});

export const grid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',

    '@media': {
        [media.mobile]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '4px',
        },
    },
});

export const tileButton = style({
    width: '100%',
    aspectRatio: '1 / 1',
    borderRadius: '4px',
    overflow: 'hidden',
    border: 0,
    padding: 0,
    backgroundColor: vars.color.gray['20'],
    cursor: 'pointer',
    position: 'relative',
});

globalStyle(`${tileButton}:hover > img`, {
    transform: 'scale(1.02)',
    transition: 'transform 0.3s ease',
});

export const tileImg = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
});

export const badgeRow = style({
    position: 'absolute',
    left: '6px',
    right: '6px',
    bottom: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    gap: '6px',
    pointerEvents: 'none',
});

export const badgeGroup = style({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '6px 10px',
    borderRadius: '999px',
    backgroundColor: 'rgba(0,0,0,0.55)',
    color: vars.color.white,
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
});

export const badgeItem = style([
    textStyles.caption2Regular,
    {
        display: 'inline-flex',
        alignItems: 'center',
        lineHeight: 0,
        gap: '4px',
    },
]);

export const paging = style({
    marginTop: '10px',
});
