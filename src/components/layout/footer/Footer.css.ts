import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { media } from '@/styles/media';

export const footerContainer = style({
    width: '100%',
    padding: '40px 20px 80px', // Bottom padding increased for BottomNav
    backgroundColor: vars.color.white,
    borderTop: `1px solid ${vars.color.gray[20]}`,
    color: vars.color.black,

    '@media': {
        [media.tablet]: {
            padding: '60px 24px 60px',
        },
        [media.desktop]: {
            padding: '60px 0 60px',
        },
    },
});

export const footerInnerContainer = style({
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
});

// ===== 회사 정보 섹션 =====
export const companySection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});

export const companyName = style({
    fontSize: '16px',
    fontWeight: 700,
    color: vars.color.black,
    margin: 0,
});

export const infoList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
});

export const infoItem = style({
    fontSize: '13px',
    color: vars.color.gray[60],
    lineHeight: '1.4',
    display: 'flex',
    gap: '8px',
});

// ===== 고객센터 섹션 =====
export const csSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});

export const csTitle = style({
    fontSize: '16px',
    fontWeight: 700,
    color: vars.color.black,
    margin: 0,
});

// ===== 하단 링크 섹션 =====
export const bottomLinks = style({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '12px',
    marginTop: '8px',
});

export const bottomLink = style({
    fontSize: '14px',
    fontWeight: 500,
    color: vars.color.gray[70],
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',

    selectors: {
        '&:not(:last-child)::after': {
            content: '""',
            display: 'inline-block',
            width: '1px',
            height: '12px',
            backgroundColor: vars.color.gray[30],
            marginLeft: '12px',
        },
    },
});

// ===== 저작권 섹션 =====
export const copyrightSection = style({
    marginTop: '8px',
});

export const copyright = style({
    fontSize: '12px',
    color: vars.color.gray[50],
    margin: 0,
});

// 기존 스타일 유지를 위한 stub (필요 시 수정/삭제 가능)
export const companyInfoSection = style({});
export const companyTitle = style({});
export const companyTitleIcon = style({});
export const companyDetailsList = style({});
export const companyDetailsItem = style({});
export const mobileCopyrightSection = style({});
export const linksSection = style({});
export const navigationWrapper = style({});
export const navigationContainer = style({});
export const menuGroupList = style({});
export const menuGroupItem = style({});
export const menuGroupLink = style({});
export const socialMediaList = style({});
export const socialMediaItem = style({});
export const socialMediaLink = style({});
export const desktopCopyrightSection = style({});
