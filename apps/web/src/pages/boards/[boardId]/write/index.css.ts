import { globalStyle, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const page = style({
    width: '100%',
    maxWidth: '100%',
    minWidth: 0,
    paddingTop: '20px',
    paddingBottom: '40px',
    '@media': {
        [media.desktop]: {
            paddingTop: 0,
        },
    },
});

export const pageTitle = style([
    textStyles.display1Semibold,
    {
        color: vars.color.black,
    },
]);

export const container = style({
    overflowY: 'auto',
    paddingRight: '8px',
    '::-webkit-scrollbar': {
        width: '4px',
    },
    '::-webkit-scrollbar-thumb': {
        backgroundColor: vars.color.gray['30'],
        borderRadius: '10px',
    },
});

export const form = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',

    '@media': {
        [media.desktop]: {
            maxWidth: '70%',
            gap: '32px',
        },
    },
});

export const label = style([
    textStyles.body1Medium,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: vars.color.gray['90'],
    },
]);

export const imageUploadButton = style([
    {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '88px',
        height: 'auto',
        aspectRatio: '1/1',
        backgroundColor: vars.color.gray['10'],
        borderRadius: '4px',
        border: `1px dashed ${vars.color.gray['50']}`,
    },
]);

export const imageUploadDescription = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['80'],
    },
]);

export const termContents = style([
    textStyles.body1Regular,
    {
        width: '100%',
        height: 'auto',
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: vars.color.gray['10'],
        color: vars.color.gray['80'],
    },
]);

globalStyle(`${termContents} p`, {
    fontWeight: '400 !important',
    fontSize: '1.3rem !important',
    lineHeight: '1.3 !important',
    letterSpacing: '-1.3% !important',
    color: vars.color.gray['80'],
});

export const buttonContainer = style({
    maxWidth: '668px',
    width: '100%',
    margin: '0 auto',
});
