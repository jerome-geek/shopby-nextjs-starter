import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '12px',
    width: '100%',
    textAlign: 'left',
    padding: '16px 0',
});

export const inner = style({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: '8px',
    flex: 1,
    minWidth: 0,
});

export const badgeRow = style({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '6px',
});

export const statusBadge = style([
    textStyles.caption1Semibold,
    {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '1.2rem',
        lineHeight: 1.3,
    },
]);

export const statusBadgeActive = style({
    backgroundColor: vars.color.gray['20'],
    color: vars.color.primary,
    border: `1px solid ${vars.color.gray['30']}`,
});

export const statusBadgeInactive = style({
    backgroundColor: vars.color.gray['20'],
    color: vars.color.gray['70'],
    border: `1px solid ${vars.color.gray['30']}`,
});

export const typeBadge = style([
    textStyles.caption1Regular,
    {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '1.2rem',
        lineHeight: 1.3,
        backgroundColor: vars.color.gray['10'],
        color: vars.color.gray['80'],
        border: `1px solid ${vars.color.gray['30']}`,
    },
]);

export const title = style([
    textStyles.body2Semibold,
    {
        color: vars.color.gray['90'],
        wordBreak: 'break-word',
        '@media': {
            [media.mobile]: {
                fontSize: '1.4rem',
            },
        },
    },
]);

export const date = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['70'],
        flexShrink: 0,
    },
]);
