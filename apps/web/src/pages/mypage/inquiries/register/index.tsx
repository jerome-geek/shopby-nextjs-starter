import type { ReactNode } from 'react';

import Seo from '@/shared/components/common/seo';
import { MypageLayout } from '@/shared/components/layout';
import { InquiryRegisterForm } from '@/components/mypage/inquiries/inquiry-register-form';
import * as card from '@/features/mypage/common/mypage-list-card/index.css';

export default function MypageInquiryRegisterPage() {
    return (
        <>
            <Seo title='1:1 문의 등록' noindex={true} />
            <div className={card.container}>
            <section className={card.section} data-type='form'>
                <InquiryRegisterForm />
            </section>
        </div>
        </>
    );
}

MypageInquiryRegisterPage.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};
