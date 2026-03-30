import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const addressList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

export const addressCard = style({
    padding: '20px',
    borderRadius: '8px',
    border: `1px solid ${vars.color.gray['30']}`,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    transition: 'all 0.2s ease',
    ':hover': {
        borderColor: vars.color.green['80'],
    },
});

export const activeCard = style({
    borderColor: vars.color.green['100'],
    backgroundColor: vars.color.green['20'],
});

export const cardHeader = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

export const addressAlias = style([
    textStyles.body1Semibold,
    {
        color: vars.color.black,
    },
]);

export const defaultBadge = style([
    textStyles.caption2Regular,
    {
        backgroundColor: vars.color.gray['50'],
        color: vars.color.white,
        padding: '2px 6px',
        borderRadius: '4px',
    },
]);

export const addressText = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['90'],
    },
]);

export const recipientText = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const cardActions = style({
    display: 'flex',
    gap: '8px',
    marginTop: '4px',
});

export const editButton = style([
    textStyles.caption1Regular,
    {
        padding: '4px 10px',
        borderRadius: '4px',
        border: `1px solid ${vars.color.gray['30']}`,
        backgroundColor: vars.color.white,
        color: vars.color.gray['70'],
        cursor: 'pointer',
        ':hover': {
            backgroundColor: vars.color.gray['10'],
        },
    },
]);

export const footer = style({
    padding: '24px',
    borderTop: `1px solid ${vars.color.gray['10']}`,
});

export const registerButton = style([
    textStyles.body1Semibold,
    {
        width: '100%',
        height: '56px',
        borderRadius: '8px',
        border: `1px solid ${vars.color.gray['30']}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        cursor: 'pointer',
        backgroundColor: vars.color.white,
        transition: 'all 0.2s ease',
        ':hover': {
            backgroundColor: vars.color.gray['10'],
        },
    },
]);
