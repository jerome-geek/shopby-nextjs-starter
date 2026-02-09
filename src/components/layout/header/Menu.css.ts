import { style } from '@vanilla-extract/css';

export const container = style({
    position: 'static',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

export const categoryButton = style({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    backgroundColor: '#111111',
    color: '#ffffff',
    border: 'none',
    borderRadius: '24px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    zIndex: 101,

    ':hover': {
        backgroundColor: '#333333',
    },
});

export const menuList = style({
    display: 'flex',
    gap: '8px',

    '@media': {
        '(max-width: 768px)': {
            display: 'none',
        },
    },
});

export const menuItem = style({
    padding: '8px 16px',
    color: '#333333',
    fontSize: '14px',
    fontWeight: 500,
    textDecoration: 'none',
    borderRadius: '24px',
    border: '1px solid #e5e5e5',
    transition: 'all 0.2s ease',

    ':hover': {
        backgroundColor: '#f5f5f5',
        borderColor: '#cccccc',
        color: '#111111',
    },
});

export const drawerContainer = style({
    position: 'fixed',
    top: '73px',
    left: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #f5f5f5',
    zIndex: 100,
    padding: '30px 0 50px',
    maxHeight: 'calc(100vh - 73px)',
    overflow: 'hidden',
    // animation 제거됨 (Framer Motion 사용)
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
    color: '#999999',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    transition: 'color 0.2s ease',

    ':hover': {
        color: '#555555',
    },
});

export const sidebarItemActive = style({
    color: '#111111',
    fontWeight: 700,
    ':hover': {
        color: '#111111',
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
    color: '#888888',
    textDecoration: 'none',
    transition: 'color 0.2s',

    ':hover': {
        color: '#333333',
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
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e5e5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 10,
    transition: 'all 0.2s ease',

    ':hover': {
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
});
