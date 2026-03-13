import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const container = style({
    position: 'static',
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
});

export const categoryButton = style([
    textStyles.headlineSemibold,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '7.5px 10px',
        backgroundColor: vars.color.white,
        color: vars.color.black,
        border: `1px solid ${vars.color.gray['60']}`,
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        zIndex: 101,

        ':hover': {
            backgroundColor: vars.color.gray['80'],
            borderColor: vars.color.gray['80'],
            color: vars.color.white,
        },

        selectors: {
            '&[aria-expanded="true"]': {
                backgroundColor: vars.color.gray['80'],
                borderColor: vars.color.gray['80'],
                color: vars.color.white,
            },
        },
    },
]);

export const menuListContainer = style({
    display: 'flex',
    alignItems: 'center',
    gap: '18px',

    '@media': {
        '(max-width: 768px)': {
            display: 'none',
        },
    },
});

export const menuList = style({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
});

export const menuItem = style([
    textStyles.headlineSemibold,
    {
        color: vars.color.gray['80'],
        textDecoration: 'none',
        transition: 'color 0.2s ease',
        whiteSpace: 'nowrap',

        ':hover': {
            color: vars.color.black,
        },
    },
]);

export const separator = style({
    width: '1px',
    height: '12px',
    backgroundColor: vars.color.gray['50'],
});

export const homeItem = style([menuItem, { color: vars.color.black }]);

export const drawerContainer = style({
    position: 'fixed',
    top: '80px', // Header height
    left: 0,
    width: '100%',
    backgroundColor: vars.color.white,
    borderBottom: `1px solid ${vars.color.gray['20']}`,
    zIndex: 100,
    padding: '30px 0 50px',
    maxHeight: 'calc(100vh - 80px)',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
});

export const drawerInner = style({
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    gap: '60px',
    height: 'auto',
    minHeight: '400px',
});

// 좌측 사이드바
export const sidebar = style({
    width: '160px',
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flexShrink: 0,
});

export const sidebarItem = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 0',
    fontSize: '15px',
    fontWeight: 500,
    color: vars.color.gray['500'],
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    transition: 'color 0.2s ease',

    ':hover': {
        color: vars.color.gray['600'],
    },
});

export const sidebarItemActive = style({
    color: vars.color.gray['100'],
    fontWeight: 700,
    ':hover': {
        color: vars.color.gray['100'],
    },
});

// 우측 컨텐츠 영역 (Carousel)
export const content = style({
    flex: 1,
    padding: '10px 0',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
});

export const contentWrapper = style({
    position: 'relative',
    width: '100%',
    height: '100%',
});

export const scrollContainer = style({
    display: 'flex',
    gap: '40px',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    paddingBottom: '20px',
    height: '100%',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '::-webkit-scrollbar': {
        display: 'none',
    },
});

export const subCategoryColumn = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    minWidth: '140px',
    flexShrink: 0,
});

export const subCategoryTitle = style({
    fontSize: '14px',
    fontWeight: 700,
    color: '#111111',
    marginBottom: '2px',
    textDecoration: 'none',

    ':hover': {
        textDecoration: 'underline',
    },
});

export const leafCategoryLink = style({
    fontSize: '13px',
    color: vars.color.gray['500'],
    textDecoration: 'none',
    transition: 'color 0.2s',

    ':hover': {
        color: vars.color.gray['80'],
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
    border: `1px solid ${vars.color.gray['200']}`,
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
