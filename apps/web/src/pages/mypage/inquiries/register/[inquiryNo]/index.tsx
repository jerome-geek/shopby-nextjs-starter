import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

import Seo from '@/shared/components/common/seo';
import { MypageLayout } from '@/shared/components/layout';
import { InquiryRegisterForm } from '@/components/mypage/inquiries/inquiry-register-form';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';

export default function MypageInquiryEditPage() {
    const router = useRouter();

    const inquiryNo = Number(router.query.inquiryNo) || 0;

    return (
        <>
            <Seo title='1:1 문의 수정' noindex={true} />
            <div className={card.container}>
            <section className={card.section} data-type='form'>
                <InquiryRegisterForm inquiryNo={inquiryNo} />
            </section>
        </div>
        </>
    );
}

MypageInquiryEditPage.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};
