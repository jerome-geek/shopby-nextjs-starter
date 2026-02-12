import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { media } from '@/styles/media';

export const footerContainer = style({
    width: '100%',
    padding: '48px 20px 60px', // Mobile padding
    backgroundColor: vars.color.gray[20],
    color: vars.color.black,

    '@media': {
        [media.tablet]: {
            padding: '60px 24px 100px',
        },
        [media.desktop]: {
            padding: '60px 24px 100px',
        },
    },
});

export const footerInnerContainer = style({
    maxWidth: '1200px', // Header와 동일한 너비
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    '@media': {
        [media.tablet]: {
            flexDirection: 'row',
            gap: '24px',
            alignItems: 'flex-start',
        },
        [media.desktop]: {
            flexDirection: 'row',
            gap: '24px',
            alignItems: 'flex-start',
        },
    },
});

// ===== 왼쪽 섹션: 회사 정보 =====
export const companyInfoSection = style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '17px',
    maxWidth: '318px',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease-in-out',

    '@media': {
        [media.tablet]: {
            maxWidth: '100%',
            gap: '20px',
            overflow: 'visible',
            transition: 'none',
        },
        [media.desktop]: {
            maxWidth: '100%',
            gap: '20px',
            overflow: 'visible',
            transition: 'none',
        },
    },
});

export const companyTitle = style({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    margin: 0,
    fontWeight: 600,
    fontSize: '13px',
    color: '#8a8684',
    lineHeight: '130%',
    cursor: 'pointer',

    '@media': {
        [media.tablet]: {
            fontWeight: 700,
            fontSize: '16px',
            color: vars.color.gray[80],
        },
        [media.desktop]: {
            fontWeight: 700,
            fontSize: '16px',
            color: vars.color.gray[80],
        },
    },
});

export const companyTitleIcon = style({
    transition: 'transform 0.3s ease-in-out',
    flexShrink: 0,

    selectors: {
        '&[data-expanded="true"]': {
            transform: 'rotate(-90deg) translateX(2px)',
        },
        '&[data-expanded="false"]': {
            transform: 'rotate(90deg) translateX(-2px)',
        },
    },

    '@media': {
        [media.tablet]: {
            display: 'none',
        },
        [media.desktop]: {
            display: 'none',
        },
    },
});

// 웹 버전 상세 정보 (데스크톱만)
export const companyDetailsList = style({
    display: 'none',
    flexDirection: 'column',
    gap: '8px',

    selectors: {
        '&[data-expanded="true"]': {
            display: 'flex',
        },
    },

    '@media': {
        [media.tablet]: {
            display: 'flex',
            maxWidth: '588px',
        },
        [media.desktop]: {
            display: 'flex',
            maxWidth: '588px',
        },
    },
});

export const companyDetailsItem = style({
    display: 'flex',
    gap: '12px',
});

globalStyle(`${companyDetailsItem} dt`, {
    fontWeight: 500,
    fontSize: '14px',
    color: vars.color.gray[60],
    whiteSpace: 'nowrap',
});

globalStyle(`${companyDetailsItem} dd`, {
    fontWeight: 400,
    fontSize: '14px',
    color: vars.color.gray[80],
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    margin: 0,
});

globalStyle(`${companyDetailsItem} dd a`, {
    color: vars.color.gray[60],
    textDecoration: 'underline',
    cursor: 'pointer',
});

globalStyle(`${companyDetailsItem} dd a:hover`, {
    color: vars.color.gray[80],
});

// Tablet/Desktop overrides for companyDetailsItem
const desktopAndTablet = `${media.desktop}, ${media.tablet}`;

globalStyle(`${companyDetailsItem} dt`, {
    '@media': {
        [desktopAndTablet]: {
            fontWeight: 600,
            fontSize: '13px',
            color: '#8a8684',
            lineHeight: '130%',
        },
    },
});

globalStyle(`${companyDetailsItem} dd`, {
    '@media': {
        [desktopAndTablet]: {
            fontWeight: 400,
            fontSize: '13px',
            color: '#8a8684',
            lineHeight: '130%',
        },
    },
});

globalStyle(`${companyDetailsItem} dd a`, {
    '@media': {
        [desktopAndTablet]: {
            color: '#8a8684',
        },
    },
});

globalStyle(`${companyDetailsItem} dd a:hover`, {
    '@media': {
        [desktopAndTablet]: {
            color: '#5a5552',
        },
    },
});

// 모바일 저작권 섹션
export const mobileCopyrightSection = style({
    display: 'none',
    flexDirection: 'column',
    gap: 0,
    fontSize: '12px',
    color: '#8a8684',
    lineHeight: '140%',
    maxWidth: '335px',
    marginTop: '4px',

    selectors: {
        '&[data-expanded="true"]': {
            display: 'flex',
        },
    },

    '@media': {
        [media.tablet]: {
            display: 'none',
        },
        [media.desktop]: {
            display: 'none',
        },
    },
});

globalStyle(`${mobileCopyrightSection} p`, {
    margin: 0,
    fontWeight: 400,
    fontSize: '12px',
    color: '#8a8684',
    lineHeight: '140%',
});

// ===== 오른쪽 섹션: 네비게이션, 소셜, 저작권 =====
export const linksSection = style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    '@media': {
        [media.tablet]: {
            maxWidth: '588px',
            gap: '88px',
        },
        [media.desktop]: {
            maxWidth: '588px',
            gap: '88px',
        },
    },
});

export const navigationWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '17px',

    '@media': {
        [media.tablet]: {
            maxWidth: '588px',
            gap: '20px',
        },
        [media.desktop]: {
            maxWidth: '588px',
            gap: '20px',
        },
    },
});

export const navigationContainer = style({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    gap: '8px 10px',
    maxWidth: '276px',

    '@media': {
        [media.tablet]: {
            maxWidth: '100%',
            gap: '12px',
        },
        [media.desktop]: {
            maxWidth: '100%',
            gap: '12px',
        },
    },
});

export const menuGroupList = style({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    listStyle: 'none',
    padding: 0,
    margin: 0,
});

export const menuGroupItem = style({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    height: '17px',

    selectors: {
        '&:not(:last-child)::after': {
            content: '""',
            width: '3px',
            height: '3px',
            background: '#777472',
            borderRadius: '50%',
            marginLeft: '10px',
            marginRight: '10px',
        },
    },

    '@media': {
        [media.tablet]: {
            height: 'auto',
            selectors: {
                '&:not(:last-child)::after': {
                    content: '"·"',
                    width: 'auto',
                    height: 'auto',
                    background: 'none',
                    borderRadius: 0,
                    marginLeft: '6px',
                    marginRight: '6px',
                    color: vars.color.gray[50],
                    fontWeight: 'bold',
                },
            },
        },
        [media.desktop]: {
            height: 'auto',
            selectors: {
                '&:not(:last-child)::after': {
                    content: '"·"',
                    width: 'auto',
                    height: 'auto',
                    background: 'none',
                    borderRadius: 0,
                    marginLeft: '6px',
                    marginRight: '6px',
                    color: vars.color.gray[50],
                    fontWeight: 'bold',
                },
            },
        },
    },
});

export const menuGroupLink = style({
    fontSize: '13px',
    fontWeight: 400,
    color: '#5a5552',
    textDecoration: 'none',
    transition: 'color 0.2s',
    whiteSpace: 'nowrap',
    lineHeight: '130%',

    selectors: {
        '&:hover': {
            color: '#433f3d',
        },
    },

    '@media': {
        [media.tablet]: {
            fontWeight: 500,
            fontSize: '15px',
        },
        [media.desktop]: {
            fontWeight: 500,
            fontSize: '15px',
        },
    },
});

globalStyle(`${menuGroupLink} strong`, {
    fontWeight: 600,
    fontSize: '13px',
    color: '#5a5552',

    '@media': {
        [desktopAndTablet]: {
            fontSize: '15px',
        },
    },
});

globalStyle(`${menuGroupLink} span`, {
    fontWeight: 400,
    fontSize: '13px',
    color: '#5a5552',

    '@media': {
        [desktopAndTablet]: {
            fontWeight: 500,
            fontSize: '15px',
        },
    },
});

export const socialMediaList = style({
    display: 'flex',
    gap: '10px',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    maxWidth: '74px',

    '@media': {
        [media.tablet]: {
            gap: '8px',
            maxWidth: '100%',
        },
        [media.desktop]: {
            gap: '8px',
            maxWidth: '100%',
        },
    },
});

export const socialMediaItem = style({
    listStyle: 'none',
    width: '32px',
    height: '32px',
});

export const socialMediaLink = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: vars.color.white,
    color: 'inherit',
    textDecoration: 'none',
    transition: 'all 0.2s',

    selectors: {
        '&:hover': {
            backgroundColor: '#e8e7e6',
        },
    },

    '@media': {
        [media.tablet]: {
            selectors: {
                '&:hover': {
                    backgroundColor: vars.color.gray[80],
                    color: vars.color.white,
                },
            },
        },
        [media.desktop]: {
            selectors: {
                '&:hover': {
                    backgroundColor: vars.color.gray[80],
                    color: vars.color.white,
                },
            },
        },
    },
});

globalStyle(`${socialMediaLink} svg`, {
    width: '20px',
    height: '20px',
});

// 데스크톱 저작권 섹션
export const desktopCopyrightSection = style({
    display: 'none',
    flexDirection: 'column',

    '@media': {
        [media.tablet]: {
            display: 'flex',
            maxWidth: '588px',
        },
        [media.desktop]: {
            display: 'flex',
            maxWidth: '588px',
        },
    },
});

globalStyle(`${desktopCopyrightSection} p`, {
    margin: 0,
    fontSize: '12px',
    color: vars.color.gray[60],
    lineHeight: 1.6,

    '@media': {
        [desktopAndTablet]: {
            fontWeight: 400,
            color: '#8a8684',
            lineHeight: '140%',
        },
    },
});

globalStyle(`${desktopCopyrightSection} p:first-child`, {
    '@media': {
        [desktopAndTablet]: {
            marginBottom: 0,
        },
    },
});

globalStyle(`${desktopCopyrightSection} p:last-child`, {
    fontWeight: 500,

    '@media': {
        [desktopAndTablet]: {
            fontWeight: 400,
        },
    },
});
