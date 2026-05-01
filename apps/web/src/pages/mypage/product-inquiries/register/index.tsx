import type { ReactNode } from 'react';

import { MypageLayout } from '@/components/layout';
import { ProductInquiryRegisterForm } from '@/components/mypage/product-inquiries/product-inquiry-register-form';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';

export default function MypageProductInquiryRegisterPage() {
    return (
        <div className={card.container}>
            <section className={card.section} data-type='form'>
                <ProductInquiryRegisterForm />
            </section>
        </div>
    );
}

MypageProductInquiryRegisterPage.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};

