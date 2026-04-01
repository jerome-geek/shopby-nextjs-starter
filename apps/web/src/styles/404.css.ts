import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    padding: vars.spacing.xl,
    backgroundColor: vars.color.white,
    textAlign: 'center',
});

export const title = style([
    textStyles.display1Semibold,
    {
        color: vars.color.black,
        marginBottom: vars.spacing.md,
    },
]);

export const description = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray[60],
        marginBottom: vars.spacing.xl,
        whiteSpace: 'pre-wrap',
    },
]);

export const button = style([
    textStyles.body1Semibold,
    {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${vars.spacing.sm} ${vars.spacing.lg}`,
        backgroundColor: vars.color.primary,
        color: vars.color.white,
        borderRadius: '8px',
        textDecoration: 'none',
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
        border: 'none',

        ':hover': {
            opacity: 0.9,
            transform: 'translateY(-1px)',
        },

        ':active': {
            opacity: 0.8,
            transform: 'translateY(1px)',
        },
    },
]);
