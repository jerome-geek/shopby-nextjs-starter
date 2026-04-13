import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const section = style({
    padding: '40px 0',
    backgroundColor: vars.color.white,
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
});

export const header = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '0 16px',
    marginBottom: '20px',
});

export const titleWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1,
    paddingRight: '16px',
});

export const title = style({
    fontSize: '20px',
    fontWeight: '700',
    color: vars.color.black,
    lineHeight: '1.4',
    letterSpacing: '-0.02em',
});

export const subtitle = style({
    fontSize: '14px',
    fontWeight: '400',
    color: vars.color.gray[60],
    lineHeight: '1.4',
    letterSpacing: '-0.02em',
});

export const moreLink = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    backgroundColor: vars.color.gray[10],
    borderRadius: '50%',
    color: vars.color.black,
    flexShrink: 0,
    transition: 'background-color 0.2s',
    ':active': {
        backgroundColor: vars.color.gray[20],
    },
});

export const linkIcon = style({
    width: '16px',
    height: '16px',
});

export const swiperContainer = style({
    width: '100%',
});

export const swiperSlide = style({
    width: 'auto',
    height: 'auto',
});
