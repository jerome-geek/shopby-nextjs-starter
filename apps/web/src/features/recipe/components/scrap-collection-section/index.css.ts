import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const section = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    '@media': {
        [media.desktop]: {
            gap: '24px',
        },
    },
});

export const sectionHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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

export const collectionGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '12px',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    width: '100%',

    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '24px',
        },
    },
});

export const collectionItem = style({
    minWidth: 0,
    width: '100%',
    listStyle: 'none',
});

export const collectionArticle = style({
    width: '100%',
    minWidth: 0,
});

export const collectionCard = style({
    display: 'block',
    textDecoration: 'none',
    color: 'inherit',
    borderRadius: '8px',
    overflow: 'hidden',
    background: vars.color.green['20'],
    width: '100%',
    transition: 'box-shadow 0.3s ease',
    cursor: 'pointer',
    selectors: {
        '&:hover': {
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
            textDecoration: 'none',
        },
    },
});

export const collageGrid = style({
    display: 'flex',
    width: '100%',
    height: '116px',
    backgroundColor: vars.color.gray['10'],
});

export const collageImage = style({
    position: 'relative',
    flex: '1',
    minWidth: 0,
    height: '100%',
});

export const imageListItemOverlap = style({
    marginLeft: '-12px',
    boxShadow: '-8px 0 14px -4px rgba(30, 35, 31, 0.35)',
});

export const image = style({
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const collagePlaceholder = style({
    height: '110px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: vars.color.green['40'],
    '@media': {
        [media.desktop]: {
            height: '130px',
        },
    },
});

export const skeletonPlaceholder = style({
    backgroundColor: '#f5f5f5',
});

export const collectionInfo = style({
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
});

export const collectionTitleArea = style({
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',

    '@media': {
        [media.desktop]: {
            gap: '10px',
        },
    },
});

export const collectionTitle = style([
    textStyles.headlineMedium,
    {
        color: vars.color.gray['90'],
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
    },
]);

export const collectionDesc = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['80'],
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        minHeight: 'calc(1.3rem * 1.3)',

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body2Regular,
                minHeight: 'calc(1.4rem * 1.4)',
            },
        },
    },
]);

export const collectionFooter = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['60'],
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
]);

export const buttonContainer = style({
    display: 'flex',
    gap: '2px',
    flexShrink: 0,
    marginLeft: '12px',
    alignItems: 'center',
    '@media': {
        [media.desktop]: {
            gap: '4px',
        },
    },
});

export const bookmarkButton = style({
    background: 'none',
    border: 'none',
    padding: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s ease',
    zIndex: 2,
    selectors: {
        '&:active': {
            transform: 'scale(0.9)',
        },
    },
});

export const createButton = style([
    textStyles.headlineSemibold,
    {
        width: '100%',
        maxWidth: '588px',
        padding: '16px 0',
        margin: '0 auto',
        borderRadius: '4px',
        border: `1px solid ${vars.color.gray['50']}`,
        backgroundColor: vars.color.white,
        color: vars.color.black,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        cursor: 'pointer',

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headingSemibold,
                padding: '16px 0',
            },
        },
    },
]);

export const skeletonTitle = style({
    borderRadius: '6px',
    marginBottom: '8px',
});

export const skeletonDescription = style({
    borderRadius: '4px',
    marginBottom: '4px',
});

export const skeletonMeta = style({
    borderRadius: '4px',
});

export const skeletonSectionTitle = style({
    borderRadius: '8px',
});
