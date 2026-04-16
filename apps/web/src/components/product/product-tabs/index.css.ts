import { style, globalStyle } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { globalVars } from '@/styles/global.css';
import { media } from '@/styles/media';

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
    textStyles.headlineMedium,
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
                fontSize: '1.4rem',
                lineHeight: '1.4',
                letterSpacing: '-2%',
            },
        },

        selectors: {
            '&[aria-selected="true"]': {
                color: vars.color.black,
                fontWeight: 600,
            },
        },
    },
]);

export const activeTabIndicator = style({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '2px',
    backgroundColor: vars.color.green['100'],
});

export const tabContentContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '120px',
});

export const descriptionSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
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
