import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const dimmed = style({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1000,
});

export const modalContainer = recipe({
    base: {
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: vars.color.white,
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 1000,
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        maxWidth: '100vw',
    },
    variants: {
        size: {
            small: { width: '400px' },
            medium: { width: '560px' },
            large: { width: '800px' },
            auto: { width: 'auto' },
            full: { width: '95vw', height: '95vh' },
        },
    },
    defaultVariants: {
        size: 'auto',
    },
});

export const modalHeader = style({
    padding: '24px 24px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
});

export const modalTitle = style([
    textStyles.title2Semibold,
    {
        color: vars.color.black,
    },
]);

export const closeButton = style({
    cursor: 'pointer',
    color: vars.color.black,
    transition: 'opacity 0.2s ease',
    ':hover': {
        opacity: 0.6,
    },
});

export const modalContent = style({
    padding: '0 24px 24px',
    overflowY: 'auto',
    flex: 1,
    minHeight: 0, // flex-item의 overflow scroll을 위해 필수
    maxHeight: '70vh',

    '::-webkit-scrollbar': {
        width: '4px',
    },
    '::-webkit-scrollbar-thumb': {
        backgroundColor: vars.color.gray['30'],
        borderRadius: '10px',
    },
});

export const modalFooter = style({
    padding: '16px 24px 24px',
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    borderTop: `1px solid ${vars.color.gray['10']}`,
    flexShrink: 0,
});
