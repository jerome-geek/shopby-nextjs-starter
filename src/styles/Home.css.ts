import { style, globalStyle, createVar } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

const background = createVar();
const foreground = createVar();
const textPrimary = createVar();
const textSecondary = createVar();
const buttonPrimaryHover = createVar();
const buttonSecondaryHover = createVar();
const buttonSecondaryBorder = createVar();

export const page = style({
    // vars: {
    //     [background]: vars.color.white,
    //     [foreground]: vars.color.white,
    //     [textPrimary]: vars.color.black,
    //     [textSecondary]: vars.color.gray['500'],
    //     [buttonPrimaryHover]: vars.color.gray['800'],
    //     [buttonSecondaryHover]: vars.color.gray['20'],
    //     [buttonSecondaryBorder]: vars.color.gray['30'],
    // },
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: 'var(--font-geist-sans)',
    backgroundColor: background,
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
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
});

export const main = style({
    display: 'flex',
    width: '100%',
    maxWidth: '1200px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: foreground,
    padding: '60px 24px',
    margin: '0 auto',
    '@media': {
        '(max-width: 600px)': {
            padding: '48px 24px',
        },
    },
});

export const intro = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    gap: '24px',
    '@media': {
        '(max-width: 600px)': {
            gap: '16px',
        },
    },
});

globalStyle(`${intro} h1`, {
    maxWidth: '320px',
    fontSize: '40px',
    fontWeight: 600,
    lineHeight: '48px',
    letterSpacing: '-2.4px',
    textWrap: 'balance' as any,
    color: textPrimary,
    '@media': {
        '(max-width: 600px)': {
            fontSize: '32px',
            lineHeight: '40px',
            letterSpacing: '-1.92px',
        },
    },
});

globalStyle(`${intro} p`, {
    maxWidth: '440px',
    fontSize: '18px',
    lineHeight: '32px',
    textWrap: 'balance' as any,
    color: textSecondary,
});

globalStyle(`${intro} a`, {
    fontWeight: 500,
    color: textPrimary,
});

export const ctas = style({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    maxWidth: '440px',
    gap: '16px',
    fontSize: '14px',
});

globalStyle(`${ctas} a`, {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40px',
    padding: '0 16px',
    borderRadius: '128px',
    border: '1px solid transparent',
    transition: '0.2s',
    cursor: 'pointer',
    width: 'fit-content',
    fontWeight: 500,
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
