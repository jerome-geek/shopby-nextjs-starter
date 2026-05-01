import type { ReactNode } from 'react';

import { MypageLayout } from '@/components/layout';
import { InquiryRegisterForm } from '@/components/mypage/inquiries/inquiry-register-form';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';

export default function MypageInquiryRegisterPage() {
    return (
        <div className={card.container}>
            <section className={card.section} data-type='form'>
                <InquiryRegisterForm />
            </section>
        </div>
    );
}

MypageInquiryRegisterPage.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};
