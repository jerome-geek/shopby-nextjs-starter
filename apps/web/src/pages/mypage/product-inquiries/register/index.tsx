import type { ReactNode } from 'react';

import Seo from '@/shared/components/common/seo';
import { MypageLayout } from '@/shared/components/layout';
import { ProductInquiryRegisterForm } from '@/components/mypage/product-inquiries/register-form';
import * as card from '@/features/mypage/common/mypage-list-card/index.css';

export default function MypageProductInquiryRegisterPage() {
    return (
        <>
            <Seo title='상품 문의 등록' noindex={true} />
            <div className={card.container}>
            <section className={card.section} data-type='form'>
                <ProductInquiryRegisterForm />
            </section>
        </div>
        </>
    );
}

MypageProductInquiryRegisterPage.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};
