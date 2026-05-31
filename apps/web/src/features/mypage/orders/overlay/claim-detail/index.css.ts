import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
});

export const claimInfoList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '24px 0',
});

export const claimInfoListItem = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '16px',
});

export const claimInfoLabel = style({
    fontSize: '14px',
    color: vars.color.gray[70],
    minWidth: '100px',
    lineHeight: '1.5',
});

export const claimContentContainer = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px',
    flex: 1,
    textAlign: 'right',
});

export const claimInfoValue = style({
    fontSize: '14px',
    color: vars.color.gray[90],
    lineHeight: '1.5',
    wordBreak: 'break-all',
    whiteSpace: 'pre-wrap',
});

export const claimInfoValueHighlight = style([
    claimInfoValue,
    {
        color: vars.color.primary,
        fontWeight: 600,
    }
]);

export const claimInfoImageList = style({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    justifyContent: 'flex-end',
});

export const claimInfoImageListItem = style({
    width: '64px',
    height: '64px',
    borderRadius: '4px',
    overflow: 'hidden',
    border: `1px solid ${vars.color.gray[20]}`,
    cursor: 'pointer',
    background: 'none',
    padding: 0,
});

export const claimImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const loadingContainer = style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
});
