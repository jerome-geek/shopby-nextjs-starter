import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
});

export const titleContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
});

export const title = style([
    textStyles.headingBold,
    {
        margin: 0,
    },
]);

export const guideBox = style({
    padding: '12px 14px',
    borderRadius: '6px',
    backgroundColor: vars.color.gray['10'],
});

export const guideTitle = style([
    textStyles.body2Semibold,
    {
        margin: 0,
        color: vars.color.gray['80'],
    },
]);

export const guideList = style([
    textStyles.caption1Regular,
    {
        margin: '8px 0 0',
        paddingLeft: '18px',
        color: vars.color.gray['70'],
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
]);

globalStyle(`${guideList} li`, {
    listStyle: 'disc',
});

export const guideSubText = style({
    margin: '4px 0 0',
    paddingLeft: '4px',
    color: vars.color.gray['60'],
});
