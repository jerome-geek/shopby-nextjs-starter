import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    width: '100%',
    position: 'relative',
    gap: 'clamp(40px, 8vw, 60px)',
    margin: '0 auto',
    padding: '80px 0 0',

    '@media': {
        [media.tablet]: {
            padding: '20px 0 0',
        },

        [media.mobile]: {
            display: 'flex',
            width: '100%',
            position: 'relative',
            padding: '20px 0',
        },
    },
});

export const sectionContainer = style({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    minWidth: 0,
    gap: '24px',

    '@media': {
        [media.mobile]: {
            gap: 0,
        },
    },
});

export const titleContainer = style({});

export const title = style([
    textStyles.headingBold,
    {
        color: vars.color.black,
    },
]);

export const fetchFallback = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    width: '100%',
});

/** 하위 페이지 콘텐츠 영역 */
export const content = style({
    width: '100%',
});
