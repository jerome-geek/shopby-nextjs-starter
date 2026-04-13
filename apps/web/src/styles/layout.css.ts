import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from './theme.css';

export const flexRecipe = recipe({
    base: {
        display: 'flex',
    },
    variants: {
        direction: {
            row: { flexDirection: 'row' },
            column: { flexDirection: 'column' },
        },
        align: {
            start: { alignItems: 'flex-start' },
            center: { alignItems: 'center' },
            end: { alignItems: 'flex-end' },
            stretch: { alignItems: 'stretch' },
            baseline: { alignItems: 'baseline' },
        },
        justify: {
            start: { justifyContent: 'flex-start' },
            center: { justifyContent: 'center' },
            end: { justifyContent: 'flex-end' },
            between: { justifyContent: 'space-between' },
            around: { justifyContent: 'space-around' },
        },
        wrap: {
            nowrap: { flexWrap: 'nowrap' },
            wrap: { flexWrap: 'wrap' },
        },
        gap: {
            xs: { gap: vars.spacing.xs }, // 4px
            sm: { gap: vars.spacing.sm }, // 8px
            md: { gap: vars.spacing.md }, // 16px
            lg: { gap: vars.spacing.lg }, // 24px
            xl: { gap: vars.spacing.xl }, // 32px
            '6px': { gap: '6px' },
            '8px': { gap: '8px' }, // vars.spacing.sm과 동일하지만 명시적 사용 지원
            '10px': { gap: '10px' },
            '12px': { gap: '12px' },
            none: { gap: 0 },
        },
    },
    defaultVariants: {
        direction: 'row',
        align: 'stretch',
        justify: 'start',
        wrap: 'nowrap',
    },
});

export type FlexVariants = RecipeVariants<typeof flexRecipe>;
