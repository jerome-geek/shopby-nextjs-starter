import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

const spin = keyframes({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
});

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '12px 0',
});

export const imageGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '18px',
    listStyle: 'none',
    padding: 0,
    margin: 0,
});

export const imageItem = style({
    position: 'relative',
    aspectRatio: '1',
});

export const imageAddCell = style({
    width: '100%',
    height: '100%',
    borderRadius: '4px',
    border: `2px dashed ${vars.color.gray['50']}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: 'pointer',
    backgroundColor: vars.color.gray['10'],
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none',

    ':hover': {
        borderColor: vars.color.green['80'],
        backgroundColor: vars.color.green['20'],
        transform: 'translateY(-2px)',
    },
});

export const imageAddLabel = style([
    textStyles.caption1Semibold,
    {
        color: vars.color.gray['60'],
    },
]);

export const imageWrapper = style({
    width: '100%',
    height: '100%',
    borderRadius: '4px',
    overflow: 'hidden',
    position: 'relative',
    border: `1px solid ${vars.color.gray['20']}`,
});

export const imageThumb = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const imageBadge = style([
    textStyles.caption1Semibold,
    {
        position: 'absolute',
        top: '8px',
        left: '8px',
        width: '26px',
        height: '26px',
        borderRadius: '50%',
        backgroundColor: '#1a1a1a',
        color: vars.color.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        fontSize: '13px',
    },
]);

export const imageDeleteBtn = style({
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: vars.color.red['40'],
    color: vars.color.white,
    border: `2.5px solid ${vars.color.white}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 2,
    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
    transition: 'all 0.2s ease',

    ':hover': {
        backgroundColor: vars.color.red['50'],
        transform: 'scale(1.1) rotate(90deg)',
    },
});

export const nextButtonContainer = style({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

export const hint = style([
    textStyles.body2Medium,
    {
        color: vars.color.gray['50'],
        textAlign: 'center',
        marginTop: '8px',
        fontSize: '13px',
    },
]);

export const nextButton = style([
    textStyles.headlineSemibold,
    {
        width: '100%',
        height: '53px',
        backgroundColor: vars.color.pink['50'],
        color: vars.color.white,
        borderRadius: '12px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',

        ':hover': {
            opacity: 0.9,
            boxShadow: '0 4px 12px rgba(239, 184, 190, 0.4)',
        },
        ':disabled': {
            backgroundColor: '#efb8be88',
            cursor: 'not-allowed',
        },
    },
]);

export const spinner = style({
    display: 'block',
    animation: `${spin} 1s linear infinite`,
});
