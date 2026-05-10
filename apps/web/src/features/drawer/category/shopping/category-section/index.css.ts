import { globalStyle, style } from '@vanilla-extract/css';

import { globalVars } from '@/styles/global.css';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

const CATEGORY_SECTION_HEADER_HEIGHT = '57px';

export const oneDepthCategorySwiperContainer = style({
    width: '100%',
    padding: '12px 0',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
    position: 'sticky',
    top: globalVars.header.mobileHeight,
    backgroundColor: vars.color.white,
    height: CATEGORY_SECTION_HEADER_HEIGHT,
});

globalStyle(`${oneDepthCategorySwiperContainer} .swiper`, {
    padding: '0 20px',
});

globalStyle(`${oneDepthCategorySwiperContainer} .swiper-slide`, {
    width: 'auto',
});

export const oneDepthCategoryItem = style([
    textStyles.body1Regular,
    {
        height: '32px',
        padding: '0 12px',
        color: vars.color.green['80'],
        backgroundColor: vars.color.green['20'],
        borderRadius: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',

        selectors: {
            '&[aria-pressed="true"]': {
                color: vars.color.white,
                backgroundColor: vars.color.green['80'],
            },
        },
    },
]);

export const childCategoryContainer = style({
    width: '100%',
    display: 'flex',
    backgroundColor: vars.color.gray['20'],
});

export const twoDepthCategoryList = style({
    display: 'flex',
    flexDirection: 'column',
    minWidth: '108px',
    width: '26%',
    backgroundColor: vars.color.gray['20'],
    position: 'sticky',
    top: `calc(${globalVars.header.mobileHeight} + ${CATEGORY_SECTION_HEADER_HEIGHT})`,
    overflow: 'auto',
    overscrollBehaviorY: 'contain',
    height: '100%',
    maxHeight: `calc(100dvh - ${globalVars.header.mobileHeight} - ${CATEGORY_SECTION_HEADER_HEIGHT})`,
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',

    selectors: {
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
});

export const twoDepthCategoryListItem = style({
    height: '44px',
    minHeight: '44px',
    display: 'flex',
    alignItems: 'center',
});

export const twoDepthCategoryButton = style({
    ...textStyleTokens.body1Regular,
    width: '100%',
    height: '100%',
    padding: '0 8px 0 20px',
    textAlign: 'left',
    color: vars.color.gray['80'],
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',

    selectors: {
        '&[aria-pressed="true"]': {
            color: vars.color.black,
            fontWeight: '600',
            backgroundColor: vars.color.white,
        },
    },
});

export const threeDepthCategoryList = style({
    backgroundColor: vars.color.white,
    width: '74%',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 20px',
    height: '100%',

    selectors: {
        '&::-webkit-scrollbar': {
            width: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: vars.color.gray['30'],
            borderRadius: '10px',
        },
    },
});

export const threeDepthCategoryListItem = style({
    padding: '20px 0',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    selectors: {
        '&:last-of-type': {
            borderBottom: 'none',
        },
    },
});

export const threeDepthCategoryContainer = style({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

export const threeDepthCategoryLink = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
});

export const threeDepthCategoryIconContainer = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

export const threeDepthCategoryIcon = style({
    width: '28px',
    height: '28px',
    minWidth: '28px',
    aspectRatio: '1/1',
    objectFit: 'cover',
});

export const threeDepthCategoryLabel = style({
    ...textStyleTokens.headlineSemibold,
    wordBreak: 'break-all',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    maxWidth: '100%',
});

export const threeDepthCategoryInnerList = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    rowGap: '16px',
    columnGap: '11px',

    selectors: {
        '&:empty': {
            display: 'none',
        },
        '&[data-single="true"]': {
            gridTemplateColumns: '1fr',
            columnGap: 0,
        },
    },
});

export const threeDepthCategoryInnerListItem = style({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '20px',
});

export const threeDepthCategoryItemLink = style([
    textStyleTokens.body1Regular,
    {
        color: vars.color.gray['60'],
        wordBreak: 'break-all',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
    },
]);
