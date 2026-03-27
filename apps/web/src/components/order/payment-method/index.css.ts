import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
});

export const title = style([
    textStyles.headingBold,
    {
        color: vars.color.black,
    },
]);

export const radioGroupRoot = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '12px',
});

export const radioGroupItem = style({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '20px',
    border: `1px solid ${vars.color.gray['20']}`,
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: '#fff',
    width: '100%',
    textAlign: 'left',

    selectors: {
        '&:hover': {
            borderColor: vars.color.green['80'],
        },
        // 선택됐을 때: 테두리 Green 80, 배경 Green 20
        '&[data-state="checked"]': {
            borderColor: vars.color.green['80'],
            backgroundColor: vars.color.green['20'],
        },
        '&:focus-visible': {
            outline: `2px solid ${vars.color.green['80']}`,
            outlineOffset: '2px',
        },
    },
});

export const methodLabel = style([
    textStyles.body1Medium,
    {
        color: vars.color.black,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
    },
]);

export const radioCircle = style({
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    border: `1px solid ${vars.color.gray['50']}`,
    display: 'flex', // 사실 absolute를 쓰면 flex는 빼도 무방합니다
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor: '#fff',
    position: 'relative',
    boxSizing: 'border-box', // 명시적으로 추가
});

export const radioIndicator = style({
    position: 'absolute',
    // 부모의 1px border를 덮어버리려면 -1px을 사용합니다.
    // 만약 테두리 안쪽에 딱 맞추고 싶다면 inset: 0을 사용하세요.
    // top: -1,
    // left: -1,
    top: -1,
    left: -1,
    width: '18px',
    height: '18px',
    '::after': {
        content: '""',
        display: 'block',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        backgroundColor: vars.color.white,
        // 테두리 두께를 조절해서 원하는 비주얼을 만드세요
        border: `5px solid ${vars.color.green['80']}`,
        boxSizing: 'border-box',
    },
});
