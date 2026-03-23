import { style, globalStyle } from '@vanilla-extract/css';

export const article = style({
    padding: '24px 16px',
    '@media': {
        'screen and (min-width: 768px)': {
            padding: '40px 20px',
        },
    },
});

export const header = style({
    borderBottom: '2px solid #000',
    paddingBottom: '20px',
    marginBottom: '30px',
});

export const title = style({
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#111',
    marginBottom: '20px',
    '@media': {
        'screen and (min-width: 768px)': {
            fontSize: '32px',
        },
    },
});

export const date = style({
    marginTop: '10px',
    fontSize: '14px',
    color: '#666',
});

export const content = style({
    lineHeight: '1.7',
    fontSize: '15px',
    color: '#333',
});

globalStyle(`${content} p`, {
    marginBottom: '1em',
});

globalStyle(`${content} table`, {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
    border: '1px solid #ddd',
});

globalStyle(`${content} th, ${content} td`, {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
});

globalStyle(`${content} th`, {
    backgroundColor: '#f9f9f9',
});
