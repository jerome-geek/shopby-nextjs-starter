import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const addressList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    paddingBottom: '8px',
});

export const addressCard = style({
    padding: '16px',
    borderRadius: '4px',
    border: `1px solid ${vars.color.gray['50']}`,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    transition: 'all 0.2s ease',
    backgroundColor: vars.color.white,
});

export const activeCard = style({
    borderWidth: '2px',
    borderColor: vars.color.green['80'],
    backgroundColor: vars.color.green['20'],
});

export const cardHeader = style({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
});

export const addressAlias = style([
    textStyles.headingSemibold,
    {
        color: vars.color.gray['90'],
        '@media': {
            [media.mobile]: {
                fontSize: '1.5rem',
            },
        },
    },
]);

export const defaultBadge = style([
    textStyles.caption1Semibold,
    {
        backgroundColor: vars.color.green['80'],
        color: vars.color.white,
        padding: '3px 6px',
        borderRadius: '2px',
        '@media': {
            [media.mobile]: {
                fontSize: '1rem',
            },
        },
    },
]);

export const addressTextBlock = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
});

export const addressText = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['80'],
        '@media': {
            [media.mobile]: {
                fontSize: '1.3rem',
            },
        },
    },
]);

export const recipientText = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['60'],
        '@media': {
            [media.mobile]: {
                fontSize: '1.2rem',
            },
        },
    },
]);

export const registerButton = style([
    textStyles.headingSemibold,
    {
        width: '100%',
        padding: '18px',
        borderRadius: '4px',
        border: `1px solid ${vars.color.gray['50']}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        cursor: 'pointer',
        backgroundColor: vars.color.white,
        color: vars.color.black,
        transition: 'all 0.2s ease',
        '@media': {
            [media.mobile]: {
                fontSize: '1.5rem',
            },
        },
    },
]);
