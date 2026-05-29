import { useRouter } from 'next/router';
import { useEffect, type ReactNode } from 'react';

import Seo from '@/shared/components/common/seo';
import { MypageLayout } from '@/shared/components/layout';
import * as card from '@/features/mypage/common/mypage-list-card/index.css';
import { ReviewForm } from '@/components/mypage/review/form';
import { PATHS } from '@/const/paths';

export default function MypageReviewModifyPage() {
    const router = useRouter();
    const reviewNo = Number(router.query.reviewNo) || 0;
    const productNo = Number(router.query.productNo) || 0;

    useEffect(() => {
        if (router.isReady && (!reviewNo || !productNo)) {
            router.replace(PATHS.MYPAGE.REVIEWS.MAIN);
        }
    }, [router.isReady]);

    return (
        <>
            <Seo title='리뷰 수정' noindex={true} />
            <div className={card.container}>
            <section className={card.section} data-type='form'>
                <ReviewForm reviewNo={reviewNo} />
            </section>
        </div>
        </>
    );
}

MypageReviewModifyPage.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};
