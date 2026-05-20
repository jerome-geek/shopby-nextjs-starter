import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const container = style({
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    padding: '12px 0',

    '@media': {
        [media.desktop]: {
            gap: '32px',
            padding: 0,
        },
    },
});

export const form = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',

    '@media': {
        [media.desktop]: {
            gap: '60px',
        },
    },
});

export const header = style({
    // marginBottom: '40px',
});

export const pageTitle = style([
    textStyles.display1Semibold,
    {
        color: vars.color.black,
    },
]);

export const section = style({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

export const labelArea = style({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
});

export const labelText = style({
    fontSize: vars.typography.fontSize.headline,
    fontWeight: vars.typography.fontWeight.bold,
    color: vars.color.black,
});

export const requiredDot = style({
    color: vars.color.red,
    fontSize: '14px',
    fontWeight: vars.typography.fontWeight.bold,
});

export const labelHint = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['50'],
    },
]);

export const imageUploadGrid = style({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',

    '@media': {
        [media.mobile]: {
            display: 'grid',
            gap: '12px',
            gridTemplateColumns: 'repeat(3, 1fr)',
        },
    },
});

export const imageSlot = style({
    aspectRatio: '1 / 1',
    width: '100%',
    backgroundColor: vars.color.gray['10'],
    border: `1px dashed ${vars.color.gray['50']}`,
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'visible',
    // 모바일에서 터치 스크롤 제스처가 드래그를 가로채지 않도록 함
    touchAction: 'none',
    WebkitUserSelect: 'none',
    transition: 'all 0.2s ease',
    '@media': {
        [media.desktop]: {
            maxWidth: '130px',
        },
    },
    selectors: {
        '&:hover': {
            backgroundColor: vars.color.gray['20'],
            borderColor: vars.color.gray['40'],
        },
    },
});

export const plusIcon = style({
    fontSize: '32px',
    color: vars.color.gray['40'],
});

export const mainBadge = style([
    textStyles.body1Semibold,
    {
        position: 'absolute',
        top: '0',
        left: '0',
        backgroundColor: 'rgba(26, 26, 26, 0.8)',
        color: vars.color.white,
        padding: '4px 8px',
        borderBottomRightRadius: '4px',
        zIndex: 10,
    },
]);

export const deleteButtonWrapper = style({
    position: 'absolute',
    top: '-12px',
    right: '-12px',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: vars.color.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',

    selectors: {
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
});

export const deleteButton = style({
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    backgroundColor: vars.color.gray['50'],
    color: vars.color.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const inputGroup = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    '@media': {
        [media.mobile]: {
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
        },
    },
});

export const ingredientRow = style({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr auto auto',
    gap: '8px',
    alignItems: 'center',
    marginBottom: '8px',
});

export const stepSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
});

export const stepCard = style({
    backgroundColor: '#FAFAF9',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    position: 'relative',
});

export const stepHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const stepNumber = style({
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: vars.color.secondary,
    color: vars.color.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
});

export const stepActions = style({
    display: 'flex',
    gap: '8px',
});

export const iconButton = style({
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    selectors: {
        '&:hover': {
            opacity: 0.8,
            transform: 'scale(1.05)',
        },
        '&:active': {
            transform: 'scale(0.95)',
        },
    },
});

export const addStepIcon = style([
    iconButton,
    {
        backgroundColor: vars.color.green['20'],
        color: vars.color.secondary,
    },
]);

export const removeStepIcon = style([
    iconButton,
    {
        backgroundColor: vars.color.pink['20'],
        color: vars.color.red,
    },
]);

export const stepImageGrid = style({
    display: 'flex',
    gap: '8px',

    selectors: {
        '&:empty': {
            display: 'none',
        },
    },
});

export const stepImageSlot = style({
    width: '120px',
    height: '120px',
});

export const submitButton = style({
    width: '100%',
    maxWidth: '400px',
    margin: '60px auto 0',
    backgroundColor: vars.color.gray['10'],
    color: vars.color.gray['60'],
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: vars.typography.fontSize.headline,
    fontWeight: vars.typography.fontWeight.bold,
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    selectors: {
        '&:hover': {
            backgroundColor: vars.color.gray['20'],
        },
    },
});
