import { style } from '@vanilla-extract/css';

export const infoSection = style({
    marginTop: '40px',
});

export const infoTitle = style({
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '1px solid #111',
});

export const infoList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '0 8px',
});

export const infoRow = style({
    display: 'flex',
    fontSize: '14px',
    lineHeight: '20px',
});

export const infoLabel = style({
    minWidth: '100px',
    maxWidth: '140px',
    width: '20vw',
    flexShrink: 0,
    color: '#666',
});

export const infoContent = style({
    color: '#111',
    flex: 1,
    wordBreak: 'break-all',
});
