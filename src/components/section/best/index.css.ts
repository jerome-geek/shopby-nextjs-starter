import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const section = style({
    padding: '40px 20px',
    backgroundColor: vars.color.white,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    '@media': {
        'screen and (min-width: 768px)': {
            padding: '60px 40px',
            maxWidth: '1200px',
            margin: '0 auto',
        },
    },
});

export const header = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const titleWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
});

export const title = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
    },
]);

export const subtitle = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray[60],
    },
]);

export const viewAll = style([
    textStyles.caption1Regular,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        color: vars.color.gray[60],
    },
]);

export const categoryList = style({
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    paddingBottom: '24px',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    selectors: {
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
});

export const categoryTab = style({
    padding: '10px 20px',
    borderRadius: '24px',
    fontSize: '15px',
    fontWeight: 500,
    backgroundColor: vars.color.gray[10],
    color: vars.color.gray[60],
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s ease',
});

export const categoryTabActive = style({
    backgroundColor: '#869D8A', // Muted green matching the image
    color: vars.color.white,
    fontWeight: 600,
});

export const swiperContainer = style({
    width: '100%',
    paddingBottom: '40px !important',
});

export const productGridItem = style({
    height: 'auto',
    position: 'relative',
});

export const rankBadge = style([
    textStyles.caption1Semibold,
    {
        position: 'absolute',
        top: '0',
        left: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: vars.color.white,
        zIndex: 2,
        borderTopLeftRadius: '4px',
        width: '24px',
        height: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
]);

export const moreButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '16px',
    marginTop: '32px',
    backgroundColor: '#F7F9F7',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 600,
    color: vars.color.black,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    selectors: {
        '&:hover': {
            backgroundColor: '#EEF2EE',
        },
    },
});

export const emptyMessage = style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '40px 0',
    color: vars.color.gray[60],
    fontSize: '14px',
    backgroundColor: vars.color.gray[10],
    borderRadius: '4px',
});
