import { vars } from '@/styles/theme.css';

import { style } from '@vanilla-extract/css';

export const infoTitleContainer = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${vars.color.black}`,
    padding: '12px 0',
});

export const infoContentContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px 8px',
});
