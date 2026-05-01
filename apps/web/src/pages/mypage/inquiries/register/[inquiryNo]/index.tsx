import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

import { MypageLayout } from '@/components/layout';
import { InquiryRegisterForm } from '@/components/mypage/inquiries/inquiry-register-form';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';

export default function MypageInquiryEditPage() {
    const router = useRouter();

    const inquiryNo = Number(router.query.inquiryNo) || 0;

    return (
        <div className={card.container}>
            <section className={card.section} data-type='form'>
                <InquiryRegisterForm inquiryNo={inquiryNo} />
            </section>
        </div>
    );
}

MypageInquiryEditPage.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};
