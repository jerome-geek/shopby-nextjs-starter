import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    overflow: 'hidden',
});

export const imageList = style({
    display: 'flex',
    flexDirection: 'row',
    height: '116px',
    margin: 0,
    padding: 0,
    listStyle: 'none',
    overflow: 'hidden',
});

export const imagePlaceholder = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '116px',
    backgroundColor: vars.color.gray['10'],
});

export const imageListItem = style({
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

export const collectionInfo = style({
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '16px',
    background: vars.color.green['20'],
});

export const collectionInfoContent = style({
    flex: '1',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});

export const collectionTitle = style([
    textStyles.headlineMedium,
    {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
        color: vars.color.gray['90'],
    },
]);

export const collectionDescription = style([
    textStyles.body2Regular,
    {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
        color: vars.color.gray['80'],
        minHeight: 'calc(1.3rem * 1.3)',
        '@media': {
            [media.desktop]: {
                fontSize: '1.4rem',
                lineHeight: '1.4',
                letterSpacing: '-2%',
                minHeight: 'calc(1.4rem * 1.4)',
            },
        },
    },
]);

export const collectionInfoFooter = style({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
});

export const collectionInfoFooterItem = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
        '@media': {
            [media.desktop]: {
                fontSize: '1.3rem',
                lineHeight: '1.3',
                letterSpacing: '-1.3%',
            },
        },
    },
]);

export const dot = style({
    width: '3px',
    height: '3px',
    borderRadius: '50%',
    backgroundColor: vars.color.gray['50'],
});
