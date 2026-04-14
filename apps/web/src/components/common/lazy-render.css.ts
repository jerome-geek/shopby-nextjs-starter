import { style } from '@vanilla-extract/css';

export const wrapper = style({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
});

/**
 * 뷰포트에 들어온 이후(isInView=true)에도 children이 비어있으면
 * flex gap에 영향을 주지 않도록 영역 자체를 접습니다.
 */
export const collapseWhenEmpty = style({
    selectors: {
        '&:empty': {
            display: 'none',
        },
    },
});

