import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const failContainer = style({
    textAlign: 'center',
    padding: '100px 20px',
});

export const failIcon = style({
    fontSize: '64px',
    marginBottom: '20px',
});

export const failTitle = style([
    textStyles.title1Bold,
    {
        marginBottom: '12px',
        color: vars.color.black,
    },
]);

export const failDescription = style([
    textStyles.headlineRegular,
    {
        color: vars.color.gray['60'],
        marginBottom: '40px',
        lineHeight: '1.6',
    },
]);

export const buttonGroup = style({
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
});

export const ghostButton = style([
    textStyles.headingSemibold,
    {
        padding: '12px 32px',
        borderRadius: '4px',
        border: `1px solid ${vars.color.gray['50']}`,
        backgroundColor: vars.color.white,
        color: vars.color.black,
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.2s',
        ':hover': {
            backgroundColor: vars.color.gray['10'],
        },
    },
    {
        '@media': {
            [media.mobile]: {
                fontSize: '1.4rem',
                padding: '8px 24px',
            },
        },
    },
]);

export const primaryButton = style([
    textStyles.headingSemibold,
    {
        padding: '12px 32px',
        borderRadius: '4px',
        backgroundColor: vars.color.green['100'],
        color: vars.color.white,
        textDecoration: 'none',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'opacity 0.2s',
        ':hover': {
            opacity: 0.9,
        },
    },
    {
        '@media': {
            [media.mobile]: {
                fontSize: '1.4rem',
                padding: '10px 24px',
            },
        },
    },
]);
