import { css } from '@/styled-system/css';

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            className={css({
                padding: { base: '0 0 60px', md: '50px 20px 120px' },
            })}
        >
            {children}
        </div>
    );
};

export default ProductsLayout;
