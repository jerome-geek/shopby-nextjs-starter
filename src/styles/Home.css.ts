import { style, globalStyle, createVar } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { media } from '@/styles/media';

const background = createVar();
const foreground = createVar();
const textPrimary = createVar();
const textSecondary = createVar();
const buttonPrimaryHover = createVar();
const buttonSecondaryHover = createVar();
const buttonSecondaryBorder = createVar();

export const main = style({
    // vars: {
    //     [background]: vars.color.white,
    //     [foreground]: vars.color.white,
    //     [textPrimary]: vars.color.black,
    //     [textSecondary]: vars.color.gray['500'],
    //     [buttonPrimaryHover]: vars.color.gray['800'],
    //     [buttonSecondaryHover]: vars.color.gray['20'],
    //     [buttonSecondaryBorder]: vars.color.gray['30'],
    // },

    // minHeight: '100vh',
    backgroundColor: background,
    // maxWidth: '1200px',
    // padding: '0 20px',
    // margin: '0 auto',
    // width: '100%',
    // '@media': {
    //     '(prefers-color-scheme: dark)': {
    //         vars: {
    //             [background]: vars.color.black,
    //             [foreground]: vars.color.black,
    //             [textPrimary]: vars.color.gray['20'],
    //             [textSecondary]: vars.color.gray['500'],
    //             [buttonPrimaryHover]: vars.color.gray['300'],
    //             [buttonSecondaryHover]: vars.color.gray['900'],
    //             [buttonSecondaryBorder]: vars.color.gray['900'],
    //         },
    //     },
    // },
    display: 'flex',
    flexDirection: 'column',
    gap: '48px',

    '@media': {
        [media.desktop]: {
            padding: '24px 0px',
            gap: '96px',
        },
    },
});

export const primary = style({
    background: textPrimary,
    color: background,
    gap: '8px',
    '@media': {
        '(hover: hover) and (pointer: fine)': {
            ':hover': {
                background: buttonPrimaryHover,
                borderColor: 'transparent',
            },
        },
    },
});

export const secondary = style({
    borderColor: buttonSecondaryBorder,
    '@media': {
        '(hover: hover) and (pointer: fine)': {
            ':hover': {
                background: buttonSecondaryHover,
                borderColor: 'transparent',
            },
        },
    },
});

export const logo = style({
    '@media': {
        '(prefers-color-scheme: dark)': {
            filter: 'invert()',
        },
    },
});

// src/styles/Home.css.ts 에 추가
export const recipeGrid = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '48px', // 모바일 여백

    '@media': {
        [media.desktop]: {
            flexDirection: 'row',
            gap: '80px', // PC 여백
        },
    },
});
