import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%',
    boxSizing: 'border-box',
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
    width: '100%',
    boxSizing: 'border-box',
    minWidth: 0, // 자식 요소들이 부모 너비 안에서 줄어들 수 있도록 보장
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
    boxSizing: 'border-box',
    minWidth: 0,

    selectors: {
        '&:hover': {
            borderColor: vars.color.green['80'],
        },
        '&:active': {
            transform: 'scale(0.98)',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor: '#fff',
    position: 'relative',
    boxSizing: 'border-box',
});

export const radioIndicator = style({
    position: 'absolute',
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
        border: `5px solid ${vars.color.green['80']}`,
        boxSizing: 'border-box',
    },
});

export const bankTransferContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '24px 16px',
    backgroundColor: vars.color.gray['10'],
    borderRadius: '12px',
    marginTop: '16px',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
    minWidth: 0,

    '@media': {
        [media.desktop]: {
            padding: '24px',
            gap: '20px',
        },
    },
});

export const fieldRow = style({
    display: 'grid',
    gridTemplateColumns: '1fr',
    alignItems: 'flex-start',
    gap: '8px',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    minWidth: 0,

    '@media': {
        [media.desktop]: {
            gridTemplateColumns: '80px 1fr',
            gap: '16px',
            alignItems: 'center',
        },
    },
});

export const fieldLabel = style([
    textStyles.body2Medium,
    {
        color: vars.color.black,
        display: 'flex',
        alignItems: 'center',
    },
]);

export const requiredDot = style({
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: '#FF4D00',
    marginLeft: '4px',
    marginTop: '-4px', // 텍스트 상단에 위치하도록 살짝 조정
});

export const divider = style({
    height: '1px',
    backgroundColor: vars.color.gray['20'],
    width: '100%',
});

export const cashReceiptSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    paddingTop: '24px',
    borderTop: `1px solid ${vars.color.gray['30']}`,
    marginTop: '32px',
    width: '100%',
    boxSizing: 'border-box',

    '@media': {
        [media.desktop]: {
            marginTop: '40px',
            gap: '16px',
        },
    },
});

export const cashReceiptTitle = style([
    textStyles.headingBold,
    {
        color: vars.color.black,
    },
]);

export const cashReceiptDescription = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['60'],
        marginBottom: '4px',
        wordBreak: 'keep-all',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
    },
]);

export const cashReceiptRadioGroup = style({
    display: 'flex',
    flexDirection: 'column', // 모바일에서는 수직 정렬
    gap: '12px',
    marginBottom: '8px',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',

    '@media': {
        [media.desktop]: {
            flexDirection: 'row', // 데스크탑에서만 가로 배치
            gap: '24px',
        },
    },
});

export const cashReceiptRadioItem = style([
    textStyles.body2Regular,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        flexShrink: 0,
    },
]);

export const phoneNumberRow = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '16px',
    width: '100%',
    boxSizing: 'border-box',
});

export const inputGroup = style({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '12px',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    minWidth: 0,

    '@media': {
        [media.desktop]: {
            gridTemplateColumns: '120px 1fr',
            gap: '16px',
        },
    },
});
