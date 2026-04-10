import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',

    '@media': {
        [media.desktop]: {
            gap: vars.spacing.lg,
            padding: '32px 0',
        },
    },
});

export const fieldGroup = style({
    display: 'flex',
    flexDirection: 'column',
    gap: vars.spacing.sm,
});

export const labelWithTooltip = style({
    display: 'flex',
    alignItems: 'center',
    gap: vars.spacing.xs,
});

export const tooltipTrigger = style({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: vars.color.gray['50'],
    cursor: 'help',
});

export const tooltip = style({
    visibility: 'hidden',
    position: 'absolute',
    bottom: '140%',
    left: '0',
    backgroundColor: vars.color.gray['80'],
    color: vars.color.white,
    padding: '10px 14px',
    borderRadius: '4px',
    fontSize: vars.typography.fontSize['caption-1'],
    whiteSpace: 'nowrap',
    zIndex: 10,
    opacity: 0,
    transform: 'translateY(4px)',
    transition: 'all 0.2s ease-in-out',
    boxShadow: vars.shadow.md,
    pointerEvents: 'none',

    '::after': {
        content: '""',
        position: 'absolute',
        top: '100%',
        left: '10px',
        borderWidth: '5px',
        borderStyle: 'solid',
        borderColor: `${vars.color.gray['80']} transparent transparent transparent`,
    },
});

export const footer = style({
    marginTop: vars.spacing.xl,
});

export const submitButton = style({
    width: '100%',
});
