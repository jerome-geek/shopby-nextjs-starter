import { globalStyle, style } from '@vanilla-extract/css';

export const dimmed = style({
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    zIndex: 1000,
});

export const container = style({
    position: 'fixed',
    zIndex: 1001,
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
});

export const body = style({
    padding: 0,
    overflow: 'hidden',
    flexShrink: 0,
});

export const content = style({
    fontSize: '14px',
    lineHeight: 1.6,
    color: '#374151',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
});

globalStyle(`${content} img`, {
    maxWidth: '100%',
    maxHeight: '100%',
    display: 'block',
    objectFit: 'contain',
});

export const imageList = style({
    display: 'grid',
    gap: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
});

export const image = style({
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'contain',
});

export const footer = style({
    display: 'flex',
    borderTop: '1px solid #e5e7eb',
    flexShrink: 0,
});

export const button = style({
    flex: 1,
    height: '46px',
    border: 0,
    backgroundColor: 'transparent',
    color: '#111827',
    fontSize: '14px',
    cursor: 'pointer',
});

export const hideTodayButton = style([
    button,
    {
        borderRight: '1px solid #e5e7eb',
        fontWeight: 600,
    },
]);
