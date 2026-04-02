import { media } from '@/styles/media';
import { style } from '@vanilla-extract/css';

export const container = style({
    width: '100%',
    maxWidth: '792px',
    margin: '0 auto',
    padding: '40px 20px',

    '@media': {
        [media.desktop]: {
            width: '100%',
            padding: 0,
        },
    },
});

export const banner = style({
    background: '#f7fcf5',
    borderRadius: '16px',
    padding: '40px 20px',
    textAlign: 'center',
    marginBottom: '40px',
    border: '1px solid #f0f0f0',
});

export const bannerIcon = style({
    fontSize: '48px',
    marginBottom: '20px',
});

export const bannerTitle = style({
    fontSize: '24px',
    fontWeight: '700',
    color: '#111',
});

export const infoGrid = style({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '40px',
    padding: '0 10px',
    '@media': {
        'screen and (max-width: 480px)': {
            gridTemplateColumns: '1fr',
        },
    },
});

export const infoColumn = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});

export const infoRow = style({
    display: 'flex',
    fontSize: '14px',
    color: '#666',
});

export const infoLabel = style({
    width: '80px',
    flexShrink: 0,
});

export const infoValue = style({
    color: '#111',
    fontWeight: '500',
    flex: 1,
    lineHeight: '1.4',
});

export const divider = style({
    border: '0',
    borderTop: '1px solid #eee',
    marginBottom: '40px',
});

export const sectionTitle = style({
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#111',
});

export const productItem = style({
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
});

export const productImage = style({
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '1px solid #f0f0f0',
    flexShrink: 0,
});

export const productContent = style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
});

export const productBrand = style({
    fontSize: '13px',
    color: '#999',
    marginBottom: '4px',
});

export const productName = style({
    fontSize: '15px',
    fontWeight: '500',
    marginBottom: '8px',
    color: '#111',
});

export const productFooter = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
});

export const orderCount = style({
    fontSize: '14px',
    color: '#666',
});

export const productPrice = style({
    fontSize: '16px',
    fontWeight: '700',
    color: '#111',
});

export const summaryContainer = style({
    background: '#fff',
    padding: '20px 0',
    borderTop: '1px solid #eee',
});

export const summaryRow = style({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    color: '#666',
    fontSize: '14px',
});

export const totalRow = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '12px',
});

export const totalLabel = style({
    fontSize: '18px',
    fontWeight: '700',
    color: '#111',
});

export const totalPrice = style({
    fontSize: '24px',
    fontWeight: '700',
    color: '#ff4d4d',
});

export const buttonGroup = style({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginTop: '60px',
});

export const ghostButton = style({
    padding: '16px',
    textAlign: 'center',
    borderRadius: '8px',
    border: '1px solid #ddd',
    background: '#fff',
    fontWeight: '500',
    color: '#111',
    textDecoration: 'none',
    transition: 'background 0.2s',
    ':hover': {
        background: '#f9f9f9',
    },
});

export const primaryButton = style({
    padding: '16px',
    textAlign: 'center',
    borderRadius: '8px',
    background: '#3d5236',
    fontWeight: '500',
    color: '#fff',
    textDecoration: 'none',
    border: 'none',
    transition: 'opacity 0.2s',
    ':hover': {
        opacity: 0.9,
    },
});

export const failContainer = style({
    textAlign: 'center',
    padding: '100px 20px',
});

export const failIcon = style({
    fontSize: '64px',
    marginBottom: '20px',
});

export const failTitle = style({
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '12px',
    color: '#111',
});

export const failDescription = style({
    color: '#666',
    marginBottom: '40px',
    lineHeight: '1.6',
});
