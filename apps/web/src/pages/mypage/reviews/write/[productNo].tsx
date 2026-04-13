import type { ReactNode } from 'react';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { MypageLayout } from '@/components/layout';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import { ReviewForm } from '@/components/mypage/review/review-form';
import { PATHS } from '@/const/paths';

export const MypageReviewWrite = () => {
    const router = useRouter();
    const orderNo = String(router.query.orderNo) || '';

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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const productNo = Number(context.params?.productNo) || 0;
    const optionNo = Number(context.query.optionNo) || 0;
    const orderOptionNo = Number(context.query.orderOptionNo) || 0;

    if (!productNo || !optionNo || !orderOptionNo) {
        return {
            redirect: {
                destination: PATHS.MYPAGE.REVIEWS.MAIN,
                permanent: false,
            },
        };
    }

    return { props: {} };
};
