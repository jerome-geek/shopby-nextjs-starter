import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const container = style({
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '48px',

    '@media': {
        [media.desktop]: {
            padding: '0 16px 40px',
            gap: '60px',
        },
    },
});

// --- Header Area ---
export const headerArea = style({
    display: 'contents',

    '@media': {
        [media.desktop]: {
            display: 'flex',
            flexDirection: 'row',
            gap: '40px',
        },
    },
});

export const imageCarouselContainer = recipe({
    base: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '24px',
        backgroundColor: vars.color.white,

        '@media': {
            [media.desktop]: {
                position: 'static',
                zIndex: 'auto',
                gap: '16px',
                marginBottom: 0,
                backgroundColor: 'transparent',
            },
        },
    },
    variants: {
        sticky: {
            true: {
                position: 'sticky',
                top: 0,
                zIndex: 1000,
            },
            false: {
                position: 'relative',
                top: 'auto',
                zIndex: 'auto',
            },
        },
    },
    defaultVariants: {
        sticky: false,
    },
});

export const imageCarousel = recipe({
    base: {
        width: 'calc(100% + 40px)',
        margin: '0 -20px',
        overflow: 'hidden',
        position: 'relative',

        '@media': {
            [media.desktop]: {
                width: '600px',
                margin: '0',
                flexShrink: 0,
                borderRadius: '12px',
            },
        },
    },
    variants: {
        ratio: {
            square: {
                aspectRatio: '1 / 1',
            },
            wide: {
                aspectRatio: '16 / 9',
            },
        },
    },
    defaultVariants: {
        ratio: 'square',
    },
});

export const carouselImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const carouselVideo = style({
    width: '100%',
    height: '100%',
    border: 0,
    display: 'block',
});

export const headerInfo = style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',

    '@media': {
        [media.desktop]: {
            gap: '24px',
            alignSelf: 'flex-start',
        },
    },
});

export const recipeInfo = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',

    '@media': {
        [media.desktop]: {
            gap: '12px',
        },
    },
});

export const titleRow = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
});

export const titleContainer = style({
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    flex: 1,
    minWidth: 0,
});

export const title = style([
    textStyles.title1Semibold,
    {
        flex: 1,
        color: vars.color.black,

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.display1Semibold,
            },
        },
    },
]);

export const moreMenuWrapper = style({
    flexShrink: 0,
});

export const actionButtons = style({
    display: 'none',
    '@media': {
        [media.desktop]: {
            display: 'flex',
            gap: '16px',
            flexShrink: 0,
            marginLeft: '24px',
        },
    },
});

export const actionButton = style([
    textStyles.body1Medium,
    {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: vars.color.gray['60'],
        flexShrink: 0,
        transition: 'all 0.2s ease',

        selectors: {
            // 좋아요 활성화 상태 (Pink)
            '&[data-active="true"][data-type="like"]': {
                color: vars.color.pink['80'],
            },
            // 북마크 활성화 상태 (Green)
            '&[data-active="true"][data-type="bookmark"]': {
                color: vars.color.green['100'],
            },
        },
    },
]);

export const author = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['80'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headlineRegular,
            },
        },
    },
]);

export const description = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['60'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body1Regular,
            },
        },
    },
]);

export const metaList = style({
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    padding: '0',

    '@media': {
        [media.desktop]: {
            gap: '12px',
        },
    },
});

export const iconTimerText = style([
    textStyles.body2Semibold,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: vars.color.gray['80'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body1Semibold,
            },
        },
    },
]);

export const iconText = style([
    textStyles.body2Regular,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: vars.color.gray['60'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body1Regular,
            },
        },
    },
]);

// --- Section General ---
export const sectionContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    '@media': {
        [media.desktop]: {
            gap: '24px',
        },
    },
});

export const sectionTitle = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.title1Bold,
            },
        },
    },
]);

export const sectionHeader = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    '@media': {
        [media.desktop]: {
            gap: '8px',
        },
    },
});

// --- Ingredients ---
export const partnersDisclaimer = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body2Regular,
            },
        },
    },
]);

export const ingredientsGrid = style({
    display: 'grid',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '8px',

    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px 32px',
        },
    },
});

export const ingredientItem = style({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'none',
    paddingLeft: '13px',

    selectors: {
        '&::before': {
            content: '""',
            position: 'absolute',
            left: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: vars.color.green['80'],
        },
    },

    '@media': {
        [media.desktop]: {
            padding: '4px 2px 4px 13px',
        },
    },
});

export const ingredientInfo = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

export const ingredientName = style({
    fontSize: '15px',
    color: vars.color.black,
});

export const ingredientAmount = style({
    fontSize: '14px',
    color: vars.color.gray['50'],
});

export const buyButton = style([
    textStyles.body2Semibold,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 10px',
        borderRadius: '2px',
        background: vars.color.green['40'],
        color: vars.color.gray['80'],
        cursor: 'pointer',
    },
]);

export const buyIcon = style({
    width: '14px',
    height: '14px',

    '@media': {
        [media.desktop]: {
            width: '16px',
            height: '16px',
        },
    },
});

// --- Steps ---
const STEP_NUMBER_SIZE = 24;
const STEP_LINE_HEIGHT = 28;
const STEP_MARGIN_TOP = (STEP_LINE_HEIGHT - STEP_NUMBER_SIZE) / 2;

const STEP_NUMBER_SIZE_DESKTOP = 28;
const STEP_LINE_HEIGHT_DESKTOP = 34;
const STEP_MARGIN_TOP_DESKTOP =
    (STEP_LINE_HEIGHT_DESKTOP - STEP_NUMBER_SIZE_DESKTOP) / 2;

export const stepList = style({
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    gap: '16px',
});

export const stepItem = style({
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
});

export const stepNumber = style([
    textStyles.body1Semibold,
    {
        width: `${STEP_NUMBER_SIZE}px`,
        height: `${STEP_NUMBER_SIZE}px`,
        borderRadius: '50%',
        background: vars.color.green['80'],
        color: vars.color.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginTop: `${STEP_MARGIN_TOP}px`,

        '@media': {
            [media.desktop]: {
                width: `${STEP_NUMBER_SIZE_DESKTOP}px`,
                height: `${STEP_NUMBER_SIZE_DESKTOP}px`,
                marginTop: `${STEP_MARGIN_TOP_DESKTOP}px`,
            },
        },
    },
]);

export const stepContent = style({
    flex: 1,
});

export const stepDescription = style([
    textStyles.headlineRegular,
    {
        color: vars.color.gray['80'],
        lineHeight: `${STEP_LINE_HEIGHT}px`,
        '@media': {
            [media.desktop]: {
                lineHeight: `${STEP_LINE_HEIGHT_DESKTOP}px`,
            },
        },
    },
]);

export const stepTime = style([
    textStyles.headlineRegular,
    {
        border: 'none',
        background: 'none',
        padding: 0,
        color: vars.color.green['80'],
        marginLeft: '8px',
        display: 'inline-block',
        textDecoration: 'none',
        cursor: 'pointer',
        ':hover': {
            textDecoration: 'underline',
        },
    },
]);

// --- Comments ---

export const mobileDivider = style({
    backgroundColor: vars.color.gray['20'],
    height: '6px',
    border: 'none',
    width: 'calc(100% + 40px)',
    margin: '0 -20px',
    padding: 0,

    '@media': {
        [media.desktop]: {
            display: 'none',
        },
    },
});
