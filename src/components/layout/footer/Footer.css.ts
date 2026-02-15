import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { media } from '@/styles/media';
import { textStyles } from '@/styles/typography.css';

export const footerContainer = style({
    width: '100%',
    padding: '48px 20px calc(70px + 90px)', // Bottom padding increased for BottomNav
    backgroundColor: vars.color.white,
    borderTop: `1px solid ${vars.color.gray[20]}`,
    color: vars.color.black,
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',

    '@media': {
        [media.tablet]: {
            padding: '60px 24px 60px',
        },
        [media.desktop]: {
            padding: '60px 0 60px',
        },
    },
});

export const footerSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});

export const footerSectionTitle = style([
    textStyles.body1Bold,
    {
        color: vars.color.gray[80],
        margin: 0,
    },
]);

export const infoList = style([
    textStyles.body2Regular,
    {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        color: vars.color.gray[60],
    },
]);

export const infoItem = style({
    display: 'flex',
    gap: '4px',
});

export const bottomLinks = style({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '20px',
});

export const bottomLink = style([
    textStyles.body1Medium,
    {
        color: vars.color.gray[80],
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',

        selectors: {
            '&:not(:last-child)::after': {
                content: '""',
                display: 'inline-block',
                width: '1px',
                height: '10px',
                backgroundColor: vars.color.gray[30],
                marginLeft: '12px',
            },
        },
    },
]);

export const bottomLinkHighlight = style([
    textStyles.body1Semibold,
    {
        color: vars.color.gray[90],
    },
]);

// ===== 저작권 섹션 =====
export const copyrightSection = style({
    paddingTop: '12px',
    borderTop: `1px solid ${vars.color.gray[60]}`,
});

export const copyright = style([
    textStyles.caption1Regular,
    { color: vars.color.gray[60] },
]);

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
