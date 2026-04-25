import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '48px',

    '@media': {
        [media.desktop]: {
            gap: '96px',
            padding: '40px 0',
        },
    },
});

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

export const collectionCard = style({
    display: 'block',
    textDecoration: 'none',
    color: 'inherit',
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundColor: vars.color.white,
    width: '100%',
    border: '1px solid rgba(0, 0, 0, 0.05)',
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
    height: '110px',
    backgroundColor: vars.color.gray['10'],
    '@media': {
        [media.desktop]: {
            height: '130px',
        },
    },
});

export const collageImage = style({
    flex: 1,
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    borderRight: `1px solid ${vars.color.white}`,
    selectors: {
        '&:last-child': {
            borderRight: 'none',
        },
    },
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
    textStyles.body1Regular,
    {
        color: vars.color.gray['80'],
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
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
