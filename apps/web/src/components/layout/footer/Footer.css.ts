import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const footerContainer = style({
    width: '100%',
    padding: '48px 20px calc(48px + 70px)', // Mobile padding
    backgroundColor: '#F8F8F8', // Light background matching image
    borderTop: `1px solid ${vars.color.gray[20]}`,
    color: vars.color.black,

    '@media': {
        [media.desktop]: {
            padding: '60px 0',
        },
    },
});

export const footerInner = style({
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',

    '@media': {
        [media.desktop]: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            columnGap: '60px',
            rowGap: '60px',
            padding: '0 20px',
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
        color: vars.color.black, // Darker for title
        margin: '0 0 12px 0',
        fontSize: '1.4rem',
    },
]);

export const infoList = style([
    textStyles.body2Regular,
    {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        color: '#888888', // Lighter gray for info
        fontSize: '1.2rem',
    },
]);

export const infoItem = style({
    display: 'flex',
    gap: '4px',
});

export const rightGroup = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
});

export const bottomLinks = style({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '12px', // Specific gap for separators
});

export const bottomLink = style([
    textStyles.body2Semibold,
    {
        color: vars.color.black,
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.2rem',

        selectors: {
            '&:not(:last-child)::after': {
                content: '"|"',
                display: 'inline-block',
                color: '#E0E0E0',
                marginLeft: '12px',
                fontWeight: 'normal',
            },
        },
    },
]);

export const bottomLinkHighlight = style([
    textStyles.body2Semibold,
    {
        color: vars.color.black,
        fontWeight: 700,
    },
]);

// ===== 저작권 섹션 =====
export const copyrightSection = style({
    gridColumn: '1 / -1',
    marginTop: '40px',
    paddingTop: '20px',
    borderTop: '1px solid #E0E0E0',
});

export const copyright = style([
    textStyles.caption1Regular,
    {
        color: '#AAAAAA',
        fontSize: '1.1rem',
    },
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
