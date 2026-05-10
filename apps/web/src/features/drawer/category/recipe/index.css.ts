import { style } from '@vanilla-extract/css';

import { textStyleTokens } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    gap: '16px',
});

export const sectionTitle = style({
    ...textStyleTokens.headlineSemibold,
});

export const recipeList = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    columnGap: '16px',
    rowGap: '32px',
});
