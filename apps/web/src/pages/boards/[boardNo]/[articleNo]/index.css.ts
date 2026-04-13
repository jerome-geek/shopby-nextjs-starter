import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const title = style([
    textStyles.display1Semibold,
    {
        color: vars.color.black,
    },
]);

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    paddingTop: '20px',
    minWidth: 0,
    width: '100%',
    maxWidth: '100%',

    '@media': {
        [media.desktop]: {
            gap: vars.spacing.xl,
            padding: 0,
            maxWidth: 'none',
        },
    },
});

export const articleContainer = style({
    display: 'flex',
    flexDirection: 'column',
    borderTop: `2px solid ${vars.color.green['80']}`,
    borderBottom: `2px solid ${vars.color.gray['20']}`,
});

export const articleHeader = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    padding: '10px',
    backgroundColor: vars.color.green['20'],
    borderBottom: `1px solid ${vars.color.gray['20']}`,
});

export const articleHeaderInfo = style({
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    width: '100%',
});

export const articleHeaderInfoRight = style({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: vars.spacing.sm,
});

export const viewCount = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['80'],
    },
]);

export const articleTitle = style([
    textStyles.headingSemibold,
    {
        width: '100%',
        color: vars.color.black,
    },
]);

export const articleWriter = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['80'],
    },
]);

export const articleRegisterYmdt = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['80'],
    },
]);

export const articleContent = style([
    textStyles.body1Regular,
    {
        width: '100%',
        minHeight: '20vh',
        padding: '10px',
        whiteSpace: 'pre-wrap',
    },
]);

export const articleAttachmentList = style({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    padding: '10px',
});

export const articleAttachmentListItem = style({
    width: '88px',
    height: '88px',
    borderRadius: '4px',
    overflow: 'hidden',
    '@media': {
        [media.desktop]: {
            width: '130px',
            height: '130px',
        },
    },
});

export const attachmentImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const bottomButton = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['80'],
        selectors: {
            '&[aria-pressed="true"]': {
                color: vars.color.black,
            },
        },
    },
]);

export const listLink = style([
    textStyles.headlineSemibold,
    {
        padding: '16px 0',
        textAlign: 'center',
        color: vars.color.black,
        border: `1px solid ${vars.color.gray['50']}`,
        borderRadius: '4px',
    },
]);
