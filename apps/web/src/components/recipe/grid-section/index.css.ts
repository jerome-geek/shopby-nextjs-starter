import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

const shimmer = keyframes({
    '0%': { backgroundPosition: '-200% 0' },
    '100%': { backgroundPosition: '200% 0' },
});

const rotate = keyframes({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
});

export const section = style({
    display: 'flex',
    flexDirection: 'column',
    '@media': {
        [media.desktop]: {
            gap: '16px',
        },
    },
});

export const sectionHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const sectionTitle = style([
    textStyles.title1Bold,
    { color: vars.color.black },
]);

export const viewAll = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['40'],
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        cursor: 'pointer',
    },
]);

export const recipeGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '20px',
        },
    },
});

export const recipeImgArea = style({
    position: 'relative',
    aspectRatio: '3 / 4',
    borderRadius: '8px',
    overflow: 'hidden',
});

export const productImg = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const productInfo = style({
    marginTop: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
});

export const recipeTitle = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    },
]);

export const recipeAuthor = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const productName = style([
    textStyles.body2Regular,
    {
        color: vars.color.black,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    },
]);

export const brandName = style([
    textStyles.caption2Regular,
    {
        color: vars.color.gray['40'],
    },
]);

export const recipeMeta = style([
    textStyles.body2Regular,
    {
        display: 'flex',
        color: vars.color.gray['40'],

        '@media': {
            [media.desktop]: {
                gap: '12px',
            },
        },
    },
]);

export const iconText = style({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
});

export const pagination = style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    marginTop: '32px',
    color: vars.color.gray['30'],
});

/* Processing / Skeleton Styles */
export const processingCard = style({
    position: 'relative',
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundColor: vars.color.gray['10'],
    cursor: 'default',
});

export const processingThumbnail = style({
    width: '100%',
    aspectRatio: '3 / 4',
    position: 'relative',
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundColor: vars.color.gray['10'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const failedThumbnail = style({
    width: '100%',
    aspectRatio: '3 / 4',
    position: 'relative',
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundColor: '#fdf5f5', // 은은한 에러 배경색
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #fae6e6',
});

export const skeletonThumbnail = style({
    width: '100%',
    aspectRatio: '3 / 4',
    position: 'relative',
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundColor: '#f9fbf8', // 아주 연한 세이지 톤 배경
    background: `linear-gradient(135deg, ${vars.color.gray['10']} 0%, #f2f5f1 50%, ${vars.color.gray['10']} 100%)`,
    backgroundSize: '200% 200%',
    animation: `${shimmer} 2s infinite ease-in-out`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const loadingIconArea = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    zIndex: 1,
});

export const loadingText = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['30'],
        letterSpacing: '-0.01em',
    },
]);

export const processingOverlay = style({
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    color: vars.color.gray['80'],
});

export const spinner = style({
    animation: `${rotate} 2s infinite linear`,
    color: '#8da287',
});

export const processingTitle = style([
    textStyles.caption1Semibold,
    {
        color: vars.color.gray['60'],
        textAlign: 'center',
        padding: '0 12px',
    },
]);

export const container = style({
    cursor: 'pointer',
    display: 'block',
    textDecoration: 'none',
    color: 'inherit',

    ':hover': {
        textDecoration: 'none',
    },
});

export const recipeCardContainer = style({
    display: 'flex',
    flexDirection: 'column',

    '@media': {
        [media.desktop]: { gap: '16px' },
    },
});

export const emptyState = style({
    padding: '80px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    textAlign: 'center',
    backgroundColor: '#fafaf9',
    borderRadius: '24px',
    margin: '12px 0',
});

export const emptyIconArea = style({
    width: '64px',
    height: '64px',
    borderRadius: '20px',
    backgroundColor: '#f2f5f1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#8da287',
});

export const emptyTitle = style([
    textStyles.headingBold,
    {
        color: vars.color.black,
        marginBottom: '8px',
    },
]);

export const emptyDescription = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['40'],
        lineHeight: 1.6,
    },
]);

export const createRecipeButton = style([
    textStyles.headlineSemibold,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 24px',
        backgroundColor: vars.color.green['100'],
        color: vars.color.white,
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        marginTop: '12px',
        boxShadow: '0 4px 12px rgba(141, 162, 135, 0.2)',

        ':hover': {
            backgroundColor: vars.color.gray['90'],
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 16px rgba(141, 162, 135, 0.3)',
        },

        ':active': {
            transform: 'translateY(0)',
        },
    },
]);
