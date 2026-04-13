import type { ReactNode } from 'react';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { MypageLayout } from '@/components/layout';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import { ReviewForm } from '@/components/mypage/review/review-form';
import { PATHS } from '@/const/paths';

const MypageReviewModifyPage = () => {
    const router = useRouter();
    const reviewNo = Number(router.query.reviewNo) || 0;

    return (
        <div className={card.container}>
            <section className={card.section} data-type='form'>
                <ReviewForm reviewNo={reviewNo} />
            </section>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const reviewNo = Number(ctx.params?.reviewNo) || 0;
    const productNo = Number(ctx.query.productNo) || 0;

    if (!reviewNo || !productNo) {
        return {
            redirect: {
                destination: PATHS.MYPAGE.REVIEWS.MAIN,
                permanent: false,
            },
        };
    }

    return { props: {} };
};

MypageReviewModifyPage.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};

export default MypageReviewModifyPage;
