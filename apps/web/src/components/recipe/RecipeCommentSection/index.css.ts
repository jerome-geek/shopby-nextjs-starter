import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { media } from '@/styles/media';
import { textStyles } from '@/styles/typography.css';

export const commentSection = style({
    background: 'none',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    '@media': {
        [media.desktop]: {
            background: vars.color.gray['10'],
            padding: '40px',
            borderRadius: '12px',
            gap: '32px',
        },
    },
});

export const commentTitle = style({
    fontSize: '18px',
    fontWeight: 'bold',
});

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
    border: `1px solid ${vars.color.gray['30']}`,
    borderRadius: '8px',
    background: vars.color.white,
    overflow: 'hidden',
});

export const commentTextArea = style({
    width: '100%',
    minHeight: '80px',
    padding: '16px',
    border: 'none',
    resize: 'none',
    outline: 'none',
    fontSize: '15px',
});

export const commentToolbar = style({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderTop: `1px solid ${vars.color.gray['10']}`,
    background: vars.color.gray['10'],
});

export const attachButton = style({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: vars.color.gray['60'],
    fontSize: '14px',
});

export const submitButton = style({
    padding: '8px 16px',
    background: vars.color.primary,
    color: vars.color.white,
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
});
