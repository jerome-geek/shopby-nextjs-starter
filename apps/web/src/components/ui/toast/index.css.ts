import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const toastWrapperBase = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    color: vars.color.white,
    padding: '16px 24px',
    borderRadius: '8px',
    fontSize: vars.typography.fontSize['body-2'],
    fontWeight: vars.typography.fontWeight.regular,
    minWidth: '320px',
    maxWidth: 'calc(100vw - 40px)',
    boxShadow: vars.shadow.md,
});

export const toastWrapper = styleVariants({
    default: [toastWrapperBase, { backgroundColor: vars.color.gray['60'] }],
    success: [toastWrapperBase, { backgroundColor: vars.color.green['100'] }],
    error: [toastWrapperBase, { backgroundColor: vars.color.red }],
});

export const toastMessage = style({
    flex: 1,
    textAlign: 'center',
});

export const toastMessageWithLink = style([
    toastMessage,
    {
        textAlign: 'left',
    },
]);

export const toastLink = style({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: vars.color.white,
    textDecoration: 'none',
    fontWeight: vars.typography.fontWeight.medium,
    whiteSpace: 'nowrap',
    ':hover': {
        opacity: 0.8,
    },
});
