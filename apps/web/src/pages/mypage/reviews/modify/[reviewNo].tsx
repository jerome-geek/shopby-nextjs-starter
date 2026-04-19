import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/router';

import { MypageLayout } from '@/components/layout';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import { ReviewForm } from '@/components/mypage/review/review-form';
import { PATHS } from '@/const/paths';

const MypageReviewModifyPage = () => {
    const router = useRouter();
    const reviewNo = Number(router.query.reviewNo) || 0;
    const productNo = Number(router.query.productNo) || 0;

    useEffect(() => {
        if (router.isReady && (!reviewNo || !productNo)) {
            void router.replace(PATHS.MYPAGE.REVIEWS.MAIN);
        }
    }, [router.isReady, reviewNo, productNo]);

    return (
        <div className={card.container}>
            <section className={card.section} data-type='form'>
                <ReviewForm reviewNo={reviewNo} />
            </section>
        </div>
    );
};

MypageReviewModifyPage.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};

export default MypageReviewModifyPage;
