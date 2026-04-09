import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

/**
 * 데스크탑 전용 리스트 헤더 행
 * orders/index.css.ts의 headerRow와 동일하나,
 * 클레임 페이지는 3컬럼(상품정보 / 주문상태 / 선택) 구조
 */
export const listHeader = style([
    textStyles.caption1Semibold,
    {
        display: 'none',

        '@media': {
            [media.tablet]: {
                display: 'grid',
                gridTemplateColumns: '1.8fr 0.8fr 0.8fr',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 12px',
                borderTop: `1px solid ${vars.color.black}`,
                borderBottom: `1px solid ${vars.color.gray['20']}`,
                color: vars.color.gray['80'],
                fontSize: '1.4rem',
                fontWeight: 600,
                lineHeight: '1.4',
                letterSpacing: '-1.3%',
            },
            [media.desktop]: {
                display: 'grid',
                gridTemplateColumns: '1.8fr 0.8fr 0.8fr',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 12px',
                borderTop: `1px solid ${vars.color.black}`,
                borderBottom: `1px solid ${vars.color.gray['20']}`,
                color: vars.color.gray['80'],
                fontSize: '1.4rem',
                fontWeight: 600,
                lineHeight: '1.4',
                letterSpacing: '-1.3%',
            },
        },
    },
]);

/** 주 컬럼 (주문번호/상품정보) — 좌측 정렬 */
export const headerCellMain = style({
    textAlign: 'left',
    paddingLeft: '8px',
});

/** 보조 컬럼 (주문상태 / 선택) — 중앙 정렬 */
export const headerCellCenter = style({
    textAlign: 'center',
});
