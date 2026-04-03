import { globalStyle, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

/** 요약 영역 — 목록 카드(section)와 동일한 카드 톤 */
export const summaryCard = style({
    backgroundColor: vars.color.gray['10'],
    border: `1px solid ${vars.color.gray['30']}`,
    borderRadius: '4px',
    padding: '20px',
    marginBottom: '20px',
    width: '100%',
    '@media': {
        [media.mobile]: {
            padding: '16px',
            marginBottom: '16px',
        },
    },
});

export const summaryList = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px',
    margin: 0,
    padding: 0,
    listStyle: 'none',
    width: '100%',
    '@media': {
        [media.mobile]: {
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: '0',
        },
        [media.tablet]: { gap: '16px' },
        [media.desktop]: { gap: '16px' },
    },
});

export const summaryListItem = style({
    flex: 1,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    minWidth: 0,
    selectors: {
        '&:not(:last-child)': {
            borderRight: `1px solid ${vars.color.gray['20']}`,
            paddingRight: '12px',
        },
    },
    '@media': {
        [media.mobile]: {
            textAlign: 'left',
            selectors: {
                '&:not(:last-child)': {
                    borderRight: 'none',
                    paddingRight: 0,
                    borderBottom: `1px solid ${vars.color.gray['20']}`,
                    paddingBottom: '16px',
                    marginBottom: '16px',
                },
            },
        },
    },
});

export const summaryTitle = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['70'],
    },
]);

export const summaryValue = style([
    textStyles.body2Semibold,
    {
        color: vars.color.black,
    },
]);

export const reasonLine = style([
    textStyles.body1Bold,
    {
        color: vars.color.black,
        wordBreak: 'break-word',
    },
]);

export const content = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['70'],
    },
]);

export const muted = style([
    textStyles.body1Regular,
    {
        color: vars.color.black,
    },
]);

export const positive = style([
    textStyles.body1Bold,
    {
        color: vars.color.primary,
    },
]);

export const accordionContainer = style({
    display: 'flex',
    flexDirection: 'column',
});

export const accordionHeader = style([
    textStyles.body2Regular,
    {
        display: 'flex',
        alignItems: 'center',
        padding: '16px 0',
        width: '100%',
        justifyContent: 'space-between',
    },
]);

globalStyle(`${accordionHeader} > div`, {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
});

export const accordionTitle = style([
    textStyles.body2Semibold,
    {
        color: vars.color.black,
    },
]);

export const accordionContent = style([
    textStyles.body2Regular,
    {
        padding: '20px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        justifyContent: 'space-between',
        backgroundColor: vars.color.gray['10'],
    },
]);
