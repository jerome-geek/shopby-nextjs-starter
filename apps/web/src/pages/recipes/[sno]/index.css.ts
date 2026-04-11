import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { media } from '@/styles/media';

export const container = style({
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px 40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    '@media': {
        [media.desktop]: {
            padding: '40px 16px',
            gap: '60px',
        },
    },
});

// --- Header Area ---
export const headerArea = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    '@media': {
        [media.desktop]: {
            flexDirection: 'row',
            gap: '40px',
        },
    },
});

export const imageCarousel = style({
    width: 'calc(100% + 32px)',
    marginLeft: '-16px',
    aspectRatio: '1/1',
    borderRadius: '0',
    overflow: 'hidden',
    position: 'relative',
    '@media': {
        [media.desktop]: {
            width: '600px',
            marginLeft: '0',
            flexShrink: 0,
            borderRadius: '12px',
        },
    },
});

export const carouselImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const headerInfo = style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
});

export const titleRow = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
});

export const title = style({
    fontSize: '32px',
    fontWeight: 'bold',
    color: vars.color.black,
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

export const actionButton = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: vars.color.gray['60'],
    fontSize: '12px',
    flexShrink: 0,
    minWidth: '40px',
});

export const author = style({
    fontSize: '14px',
    color: vars.color.gray['60'],
    marginBottom: '16px',
});

export const description = style({
    fontSize: '16px',
    color: vars.color.gray['80'],
    lineHeight: '1.6',
    marginBottom: '24px',
});

export const metaList = style({
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    background: 'none',
    padding: '0',
    '@media': {
        [media.desktop]: {
            gap: '24px',
            background: vars.color.gray['10'],
            padding: '16px 24px',
            borderRadius: '8px',
        },
    },
});

export const metaItem = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: vars.color.gray['80'],
    fontSize: '14px',
});

// --- Section General ---
export const sectionTitleRow = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '24px',
});

export const sectionTitle = style({
    fontSize: '20px',
    fontWeight: 'bold',
});

// --- Ingredients ---
export const ingredientsGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '0',
    marginTop: '16px',
    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
        },
    },
});

export const ingredientItem = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 0',
    background: 'none',
    '@media': {
        [media.desktop]: {
            padding: '12px 16px',
            background: vars.color.gray['10'],
            borderRadius: '8px',
        },
    },
});

export const ingredientExpandBtn = style({
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: vars.color.secondary,
    color: vars.color.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
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

export const buyButton = style({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 10px',
    border: `1px solid ${vars.color.gray['20']}`,
    borderRadius: '4px',
    background: vars.color.white,
    color: vars.color.primary,
    fontSize: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
});

// --- Tools ---
export const toolsGrid = style({
    display: 'flex',
    gap: '16px',
    overflowX: 'auto',
    paddingBottom: '16px',
    scrollSnapType: 'x mandatory',
});

export const toolCard = style({
    width: '200px',
    flexShrink: 0,
    scrollSnapAlign: 'start',
});

// --- Steps ---
export const stepList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
});

export const stepItem = style({
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
});

export const stepNumber = style({
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: vars.color.primary,
    color: vars.color.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    flexShrink: 0,
});

export const stepContent = style({
    flex: 1,
    paddingTop: '2px', // Align with number
});

export const stepDescription = style({
    fontSize: '16px',
    color: vars.color.black,
    lineHeight: '1.6',
    marginBottom: '8px',
});

export const stepTime = style({
    fontSize: '14px',
    color: vars.color.gray['50'],
});

export const stepImage = style({
    width: '200px',
    height: '200px',
    borderRadius: '8px',
    objectFit: 'cover',
    marginTop: '12px',
});

// --- Comments ---


// --- Recommended ---
export const recommendedGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(4, 1fr)',
        },
    },
});

export const recipeCard = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    cursor: 'pointer',
});

export const recipeCardThumbWrapper = style({
    position: 'relative',
    width: '100%',
    aspectRatio: '1/1',
    borderRadius: '8px',
    overflow: 'hidden',
});

export const recipeCardThumb = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const recipeCardBookmarkBtn = style({
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'rgba(0,0,0,0.4)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
});

export const recipeCardTitle = style({
    fontSize: '16px',
    fontWeight: 'bold',
    color: vars.color.black,
});

export const recipeCardAuthor = style({
    fontSize: '14px',
    color: vars.color.gray['60'],
});

export const recipeCardMeta = style({
    display: 'flex',
    gap: '12px',
    fontSize: '12px',
    color: vars.color.gray['50'],
});
