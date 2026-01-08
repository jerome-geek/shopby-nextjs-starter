'use client';

import { ProductSearchBottomSheet } from '@/components/ProductSearchBottomSheet';
import useDialog from '@/hooks/useDialog';
import { css } from '@/styled-system/css';
import { usePathname, useSearchParams } from 'next/navigation';
// import { overlay } from 'overlay-kit';

export default function ProductSearchFilter() {
    const { openDialog } = useDialog();
    const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('🚀 ~ onButtonClick ~ e:', e);
        // overlay.open((props) => {
        //     return <ProductSearchBottomSheet {...props} />;
        // });
        openDialog({
            message: 'test',
        });
    };

    const searchParams = useSearchParams();
    const pathname = usePathname();

    console.log('🚀 ~ ProductSearchFilter ~ searchParams:', searchParams);
    console.log(searchParams.toString());
    const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    console.log('🚀 ~ ProductSearchFilter ~ currentUrl:', currentUrl);
    const params = new URLSearchParams({
        returnUrl: currentUrl,
    });
    console.log('🚀 ~ ProductSearchFilter ~ params:', params);

    return (
        <div className={css({ padding: '10px' })}>
            <button onClick={onButtonClick}>test</button>
        </div>
    );
}
