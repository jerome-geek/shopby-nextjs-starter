import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0, // Flex child collapse 방지

    '@media': {
        [media.desktop]: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
    },
});

export const swiperWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '16px',

    '@media': {
        [media.desktop]: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            maxWidth: '666px',
        },
    },
});

export const mainSwiperContainer = style({
    width: '100%',
    maxWidth: 'none',
    minWidth: 0,

    '@media': {
        [media.desktop]: {
            maxWidth: '564px',
        },
    },
});

export const mainSwiper = style({
    width: '100%',
    height: 'auto',
});

export const imageWrapper = style({
    width: '100%',
    maxWidth: 'none',
    aspectRatio: '1 / 1',
    position: 'relative',
    overflow: 'hidden',
    margin: '0 auto',

    '@media': {
        [media.desktop]: {
            maxWidth: '564px',
            borderRadius: '8px',
        },
    },
});

export const thumbnail = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
});

export const thumbsSwiperContainer = style({
    display: 'none',

    '@media': {
        [media.desktop]: {
            display: 'block',
            width: '86px',
            height: '564px', // 메인 이미지 높이에 맞춤
            flexShrink: 0,
        },
    },
});

export const thumbsSwiper = style({
    width: '100%',
    height: '100%',
});

export const thumbSlide = style({
    width: '100%',
    height: 'auto !important',
});

export const thumbImageWrapper = style({
    width: '100%',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '8px',
    border: `1px solid transparent`,
    transition: 'all 0.2s ease',
});

export const activeThumb = style({
    borderColor: vars.color.black,
});

export const thumbImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const navButton = style({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'none', // 💡 모바일은 기본적으로 숨김
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 10,
    border: 'none',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.2s',

    '@media': {
        [media.desktop]: {
            display: 'flex', // 💡 데스크탑에서만 표시
        },
    },

    selectors: {
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
        },
        '&:disabled': {
            display: 'none',
        },
    },
});

export const prevButton = style([navButton, { left: '16px' }]);
export const nextButton = style([navButton, { right: '16px' }]);
