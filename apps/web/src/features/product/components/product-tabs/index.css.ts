import { globalStyle, style } from '@vanilla-extract/css';

import { globalVars } from '@/styles/global.css';
import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const tabsContainer = style({
    display: 'flex',
    marginTop: '20px',
    marginBottom: '32px',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
    position: 'sticky',
    top: globalVars.header.height,
    backgroundColor: vars.color.white,
    zIndex: 100,

    '@media': {
        [media.tablet]: {
            top: globalVars.header.mobileHeight,
            marginLeft: '-20px',
            width: 'calc(100% + 40px)',
        },
        [media.mobile]: {
            top: globalVars.header.mobileHeight,
            marginLeft: '-20px',
            width: 'calc(100% + 40px)',
        },
    },
});

export const tabButton = style([
    textStyles.body1Medium,
    {
        flex: 1,
        textAlign: 'center',
        color: vars.color.gray['60'],
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
        height: '45px',

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headlineMedium,
            },
        },

        selectors: {
            '&[aria-selected="true"]': {
                color: vars.color.black,
            },
        },
    },
]);

export const activeTabIndicator = style({
    position: 'absolute',
    bottom: '-1px',
    left: 0,
    width: '100%',
    height: '2px',
    backgroundColor: vars.color.green['80'],
});

export const tabContentContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '120px',

    '@media': {
        [media.mobile]: {
            gap: '102px',
        },
    },
});

globalStyle(`${tabContentContainer} > div:after`, {
    content: '""',
    position: 'absolute',
    bottom: '-60px',
    left: 0,
    width: '100%',
    height: '1px',
    backgroundColor: vars.color.gray['20'],

    '@media': {
        [media.mobile]: {
            bottom: '-51px',
            height: '8px',
            marginLeft: '-20px',
            width: 'calc(100% + 40px)',
        },
    },
});

globalStyle(`${tabContentContainer} > :last-child:after`, {
    content: '""',
    display: 'none',
});

export const descriptionSection = style({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
});

export const infoContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',

    selectors: {
        '&:empty': {
            display: 'none',
        },
    },
});

export const productsContainer = style({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',

    selectors: {
        '&:empty': {
            display: 'none',
        },
    },
});

export const descriptionText = style([
    textStyles.body2Regular,
    {
        width: '100%',
        lineHeight: 1.6,
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
    },
]);

export const descriptionTextCollapsed = style({
    maxHeight: '800px',
    overflow: 'hidden',
});

export const descriptionContentWrapper = style({
    position: 'relative',
    width: '100%',
});

export const descriptionFade = style({
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '120px',
    background:
        'linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
    pointerEvents: 'none',
});

export const descriptionToggleButton = style([
    textStyles.headingSemibold,
    {
        width: '100%',
        height: '63px',
        borderRadius: '8px',
        border: `1px solid ${vars.color.gray['50']}`,
        backgroundColor: vars.color.white,
        color: vars.color.gray['80'],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        cursor: 'pointer',

        '@media': {
            [media.mobile]: {
                height: '53px',
                fontSize: '1.5rem',
                lineHeight: '1.4',
                letterSpacing: '-0.2%',
            },
        },
    },
]);

export const descriptionToggleIcon = style({
    width: '16px',
    height: '16px',
    color: vars.color.gray['60'],
});

globalStyle(`${descriptionText} *`, {
    maxWidth: '100% !important',
});

globalStyle(`${descriptionText} img, ${descriptionText} video`, {
    maxWidth: '100% !important',
    height: 'auto',
    objectFit: 'contain',
});

globalStyle(`${descriptionText} p`, {
    margin: 0,
});
