import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/router';

import { MypageLayout } from '@/components/layout';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import { ReviewForm } from '@/components/mypage/review/review-form';
import { PATHS } from '@/const/paths';

export const MypageReviewWrite = () => {
    const router = useRouter();
    const productNo = Number(router.query.productNo) || 0;
    const optionNo = Number(router.query.optionNo) || 0;
    const orderOptionNo = Number(router.query.orderOptionNo) || 0;
    const orderNo = String(router.query.orderNo) || '';

    useEffect(() => {
        if (router.isReady && (!productNo || !optionNo || !orderOptionNo)) {
            void router.replace(PATHS.MYPAGE.REVIEWS.MAIN);
        }
    }, [router.isReady, productNo, optionNo, orderOptionNo]);

    return (
        <div className={card.container}>
            <section className={card.section} data-type='form'>
                <ReviewForm orderNo={orderNo} />
            </section>
        </div>
    );
};

MypageReviewWrite.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};

export default MypageReviewWrite;
