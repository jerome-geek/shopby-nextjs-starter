import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    position: 'relative',
});

export const searchInputForm = style({
    display: 'flex',
    position: 'sticky',
    top: 0,
    backgroundColor: vars.color.white,
    padding: '12px 0 0',
});

export const searchButton = style({
    position: 'absolute',
    right: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: vars.color.black,
    background: 'none',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const addressList = style({
    display: 'flex',
    flexDirection: 'column',
    borderTop: `1px solid ${vars.color.gray['10']}`,
});

export const addressListItem = style({
    borderBottom: `1px solid ${vars.color.gray['10']}`,
    transition: 'background-color 0.2s ease',
    ':hover': {
        backgroundColor: vars.color.gray['10'],
    },
});

export const addressButton = style({
    width: '100%',
    padding: '20px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    cursor: 'pointer',

    '@media': {
        [media.mobile]: {
            padding: '20px 0',
        },
    },
});

export const zipCode = style([
    textStyles.body1Semibold,
    {
        color: vars.color.green['100'],
    },
]);

export const addressRow = style([
    textStyles.body2Regular,
    {
        display: 'flex',
        gap: '8px',
        color: vars.color.gray['90'],
    },
]);

export const addressBadge = style([
    textStyles.caption2Semibold,
    {
        flexShrink: 0,
        backgroundColor: vars.color.gray['10'],
        border: `1px solid ${vars.color.gray['30']}`,
        color: vars.color.gray['60'],
        padding: '2px 6px',
        borderRadius: '4px',
        height: 'fit-content',
    },
]);

export const pagingContainer = style({
    display: 'flex',
    justifyContent: 'center',
    padding: '24px', // 상하좌우 여백 확보
});
