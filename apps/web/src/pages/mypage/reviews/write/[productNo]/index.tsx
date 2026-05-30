import { useRouter } from 'next/router';
import { useEffect, type ReactNode } from 'react';

import Seo from '@/shared/components/common/seo';
import { MypageLayout } from '@/shared/components/layout';
import * as card from '@/features/mypage/common/mypage-list-card/index.css';
import { ReviewForm } from '@/features/mypage/review/form';
import { PATHS } from '@/const/paths';

export default function MypageReviewWritePage() {
    const router = useRouter();
    const productNo = Number(router.query.productNo) || 0;
    const optionNo = Number(router.query.optionNo) || 0;
    const orderOptionNo = Number(router.query.orderOptionNo) || 0;
    const orderNo = String(router.query.orderNo ?? '') || '';

    useEffect(() => {
        if (!router.isReady) {
            return;
        }

        if (!productNo || !optionNo || !orderOptionNo || !orderNo) {
            router.replace(PATHS.MYPAGE.REVIEWS.MAIN);
        }
    }, [router.isReady]);

    return (
        <>
            <Seo title='리뷰 작성' noindex={true} />
            <div className={card.container}>
            <section className={card.section} data-type='form'>
                <ReviewForm orderNo={orderNo} />
            </section>
        </div>
        </>
    );
}

MypageReviewWritePage.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};
