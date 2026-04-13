import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

import { MypageLayout } from '@/components/layout';
import { ProductInquiryRegisterForm } from '@/components/mypage/product-inquiries/product-inquiry-register-form';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';

const MypageProductInquiryEditPage = () => {
    const router = useRouter();

    const inquiryNo = Number(router.query.inquiryNo) || 0;

    return (
        <div className={card.container}>
            <section className={card.section} data-type='form'>
                <ProductInquiryRegisterForm inquiryNo={inquiryNo} />
            </section>
        </div>
    );
};

MypageProductInquiryEditPage.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};

export default MypageProductInquiryEditPage;

