import { globalStyle, keyframes, style } from '@vanilla-extract/css';

import { globalVars } from '@/styles/global.css';
import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyleTokens } from '@/styles/typography.css';

export const drawerContainer = style({
    position: 'fixed',
    top: globalVars.header.height,
    left: 0,
    width: '100%',
    backgroundColor: vars.color.gray['10'],
    borderBottom: `1px solid ${vars.color.gray['20']}`,
    zIndex: 100,
    maxHeight: `calc(100vh - ${globalVars.header.height})`,
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',

    '@media': {
        [media.tablet]: {
            top: `calc(${globalVars.header.mobileHeight} + 1px)`,
        },
    },
});

export const drawerInner = style({
    maxWidth: '1240px',
    margin: '0 auto',
    padding: '48px 20px 60px',
    display: 'flex',
    gap: '50px',
    height: 'auto',
    minHeight: '300px',
});

// 좌측 사이드바
export const sidebar = style({
    width: '130px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    flexShrink: 0,
});

export const sidebarItem = style({
    ...textStyleTokens.headingMedium,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    height: '27px',
    color: vars.color.green['80'],
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'color 0.2s ease',

    ':hover': {
        color: vars.color.gray['80'],
    },
});

export const sidebarItemActive = style({
    ...textStyleTokens.headingBold,
    color: vars.color.green['100'],
});

// 우측 컨텐츠 영역 100% - (sidebar width + drawerInner gap)
export const content = style({
    width: 'calc(100% - 180px)',
});

export const contentWrapper = style({
    position: 'relative',
    width: '100%',
    height: '100%',
});

globalStyle(`${contentWrapper} > .swiper`, {
    height: '100%',
    width: '100%',
});

export const scrollContainer = style({
    display: 'flex',
    gap: '29px',
});

const opacity = keyframes({
    '0%': {
        opacity: 0,
    },
    '100%': {
        opacity: 1,
    },
});

export const subCategoryColumn = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    minWidth: '102px',
    maxWidth: '102px',
    flexShrink: 0,
    animation: `${opacity} 0.2s ease-in-out`,
    willChange: 'opacity',
});

export const subCategoryTitle = style({
    ...textStyleTokens.headlineSemibold,
    textDecoration: 'none',
    color: vars.color.gray['90'],

    ':hover': {
        textDecoration: 'underline',
    },
});

export const leafCategoryLink = style({
    ...textStyleTokens.headlineRegular,
    color: vars.color.gray['80'],
    textDecoration: 'none',

    ':hover': {
        textDecoration: 'underline',
    },
});

// 우측 화살표 버튼
export const scrollButton = style({
    position: 'absolute',
    right: 0,
    top: '40%',
    transform: 'translateY(-50%)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: vars.color.white,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: `1px solid ${vars.color.gray['40']}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 10,
    transition: 'all 0.2s ease',

    ':hover': {
        backgroundColor: vars.color.gray['10'],
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
});

export const scrollButtonLeft = style({
    left: 0,
    right: 'auto',
});
