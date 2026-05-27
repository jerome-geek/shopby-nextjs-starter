import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

import Seo from '@/components/common/seo';
import { MypageLayout } from '@/components/layout';
import { ProductInquiryRegisterForm } from '@/components/mypage/product-inquiries/register-form';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';

export default function MypageProductInquiryEditPage() {
    const router = useRouter();

    const inquiryNo = Number(router.query.inquiryNo) || 0;

    return (
        <>
            <Seo title='상품 문의 수정' noindex={true} />
            <div className={card.container}>
            <section className={card.section} data-type='form'>
                <ProductInquiryRegisterForm inquiryNo={inquiryNo} />
            </section>
        </div>
        </>
    );
}

MypageProductInquiryEditPage.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};
