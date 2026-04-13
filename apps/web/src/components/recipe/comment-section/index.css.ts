import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { media } from '@/styles/media';
import { textStyles } from '@/styles/typography.css';

export const commentSection = style({
    background: 'none',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',

    '@media': {
        [media.desktop]: {
            gap: '24px',
        },
    },
});

export const commentTitle = style([
    textStyles.title1Bold,
    {
        color: vars.color.black,
        display: 'flex',
        gap: '6px',
        alignItems: 'center',
    },
]);

export const commentCount = style([
    textStyles.title1Bold,
    {
        color: vars.color.gray['60'],
    },
]);

export const commentList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    listStyle: 'none',
    padding: 0,
    margin: 0,
});

export const commentItem = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    paddingBottom: '24px',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
});

export const commentHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
});

export const commentAuthorInfo = style({
    display: 'flex',
    alignItems: 'center',

    '@media': {
        [media.desktop]: {
            gap: '8px',
        },
    },
});

export const commentAuthor = style([
    textStyles.headlineSemibold,
    {
        color: vars.color.gray['90'],
    },
]);

export const commentDate = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const commentReportBtn = style({
    color: vars.color.gray['40'],
    fontSize: '12px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
});

export const commentText = style({
    fontSize: '15px',
    lineHeight: '1.5',
    color: vars.color.gray['80'],
});

export const commentImages = style({
    display: 'flex',
    gap: '8px',
    marginTop: '8px',
});

export const commentImage = style({
    width: '100px',
    height: '100px',
    borderRadius: '8px',
    objectFit: 'cover',
});

export const commentInputArea = style({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: vars.color.ivory['10'],
    borderRadius: '8px',

    '@media': {
        [media.desktop]: {
            gap: '14px',
            padding: '20px 16px',
        },
    },
});

export const commentTextArea = style({
    width: '100%',
    minHeight: '100px',
    padding: '16px',
});

export const commentToolbar = style({
    display: 'flex',
    justifyContent: 'space-between',
});

export const attachButton = style([
    textStyles.body1Semibold,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        borderRadius: '2px',
        cursor: 'pointer',
        color: vars.color.gray['80'],
        backgroundColor: vars.color.green['40'],
        padding: '8px 10px',
    },
]);

export const submitButton = style([
    textStyles.body1Semibold,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        borderRadius: '2px',
        cursor: 'pointer',
        color: vars.color.white,
        backgroundColor: vars.color.gray['80'],
        padding: '8px 10px',
        border: 'none',
        transition: 'all 0.2s ease-in-out',

        selectors: {
            '&:disabled': {
                backgroundColor: vars.color.gray['20'],
                color: vars.color.gray['40'],
                cursor: 'not-allowed',
            },
        },
    },
]);
