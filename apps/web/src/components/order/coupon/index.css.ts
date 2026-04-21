import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const benefitContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
});

export const title = style([
    textStyles.headingBold,
    {
        color: vars.color.black,
    },
]);

export const selectBox = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: '56px',
    padding: '12px 16px',
    border: `1px solid ${vars.color.gray['20']}`,
    borderRadius: '8px',
    backgroundColor: vars.color.white,
    transition: 'border-color 0.2s',
    cursor: 'pointer',
    selectors: {
        '&:hover': {
            borderColor: vars.color.green['80'],
        },
    },
});

export const selectLeft = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
});

export const selectedLabel = style([
    textStyles.body1Medium,
    {
        color: vars.color.black,
    },
]);

export const discountBadgeGroup = style({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
});

export const discountBadge = style({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 8px',
    borderRadius: '4px',
    backgroundColor: vars.color.pink['20'],
    color: vars.color.red,
    fontSize: vars.typography.fontSize['caption-1'],
    fontWeight: vars.typography.fontWeight.semibold,
});

export const countWrapper = style({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '14px',
    color: vars.color.gray['50'],
});
