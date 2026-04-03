import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

/** 마이페이지 폼 공통 래퍼 (카드 내부에서 폭 제한) */
export const form = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%',
    maxWidth: '560px',
    margin: '0 auto',
});

/** 마이페이지 폼 공통 컨텐츠 패널 */
export const content = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
    borderRadius: '8px',
    border: `1px solid ${vars.color.gray['20']}`,
    backgroundColor: vars.color.gray['10'],
});

/** 마이페이지 폼 공통 하단 액션 영역 */
export const actions = style({
    display: 'flex',
    gap: '12px',
    paddingTop: '20px',
    borderTop: `1px solid ${vars.color.gray['30']}`,
});

/** 버튼이 두 개일 때 모바일에서 꽉 차도록 */
export const actionButton = style({
    width: '100%',
});

/** 우편번호 찾기 등 입력 옆 버튼 */
export const postcodeButton = style({
    whiteSpace: 'nowrap',
    fontSize: '1.6rem',
    height: '100%',
    minWidth: '100px',

    '@media': {
        [media.mobile]: {
            fontSize: '1.4rem',
        },
    },
});

export const checkboxRow = style({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
});

export const checkboxLabel = style([
    textStyles.body2Regular,
    {
        cursor: 'pointer',
        color: vars.color.gray['80'],
    },
]);

