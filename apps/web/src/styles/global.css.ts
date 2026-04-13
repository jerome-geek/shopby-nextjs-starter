import {
    createGlobalTheme,
    globalKeyframes,
    globalStyle,
    style,
} from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const visuallyHidden = style({
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0',
});

// Reset & Base Styles
globalStyle('*', {
    boxSizing: 'border-box',
    lineHeight: 1.2,
    wordBreak: 'keep-all',
    wordWrap: 'break-word',
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'manipulation',
});

globalStyle('*, *::before, *::after', {
    boxSizing: 'border-box',
});

globalStyle('html', {
    fontSize: 'calc(10 / 16 * 100%)', // 10px base (62.5%)
    margin: 0,
    padding: 0,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    colorScheme: 'light',
});

globalStyle('html, body', {
    maxWidth: '100vw',
    overflowX: 'clip',
});

globalStyle('body', {
    fontFamily:
        '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
    color: vars.color.black,
    backgroundColor: vars.color.white,
    minHeight: '100vh',
    letterSpacing: '-0.02em',
    margin: 0,
    padding: 0,
});

globalStyle('#__next', {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
});

// Typography
globalStyle('p, h1, h2, h3, h4, h5, h6', {
    overflowWrap: 'break-word',
    margin: 0,
});

globalStyle('b', {
    fontWeight: 'bold',
});

// Links
globalStyle('a', {
    display: 'block',
    color: 'inherit',
    textDecoration: 'none',
});

// Media
globalStyle('img, picture, video, canvas, svg', {
    display: 'block',
    maxWidth: '100%',
});

// Lists
globalStyle('ul, ol, dl, dt, dd', {
    margin: 0,
    padding: 0,
    listStyle: 'none',
});

// Form Elements
globalStyle('input, button, textarea, select', {
    font: 'inherit',
});

globalStyle('input, button', {
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    fontFamily: 'inherit',
});

// Input Reset
globalStyle('input', {
    WebkitBorderRadius: 0,
    borderRadius: 0,
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
});

globalStyle('input:focus', {
    outline: 'none',
});

// Remove number input arrows (Chrome, Safari, Edge, Opera)
globalStyle(
    'input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button',
    {
        WebkitAppearance: 'none',
        margin: 0,
    },
);

// Firefox
globalStyle('input[type="number"]', {
    MozAppearance: 'textfield',
});

// IE10+ clear button
globalStyle('input::-ms-clear', {
    display: 'none',
});

// Chrome autofill background
globalStyle('input:-webkit-autofill', {
    WebkitBoxShadow: '0 0 0 1000px transparent inset',
    WebkitTextFillColor: `${vars.color.black} !important`,
});

globalStyle(
    'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active',
    {
        transition: 'background-color 5000s ease-in-out 0s',
    },
);

// Button Reset
globalStyle('button', {
    padding: 0,
    color: 'inherit',
    fontSize: 'inherit',
    cursor: 'pointer',
});

globalStyle('label', {
    cursor: 'pointer',
});

globalKeyframes('slideDownFade', {
    from: {
        opacity: 0,
        transform: 'translateY(-10px)',
    },
    to: {
        opacity: 1,
        transform: 'translateY(0)',
    },
});

export const globalVars = createGlobalTheme(':root', {
    header: {
        height: '90px',
        mobileHeight: '56px',
    },
    input: { checkboxSize: '16px' },
});
