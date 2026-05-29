import { useRouter } from 'next/router';
import { type ReactNode } from 'react';

import Seo from '@/shared/components/common/seo';
import { MypageLayout } from '@/shared/components/layout';
import { AddressWriteForm } from '@/components/mypage/addresses/address-write-form';
import * as card from '@/features/mypage/common/mypage-list-card/index.css';

export default function MypageAddressEditPage() {
    const router = useRouter();

    const addressNo = Number(router.query.addressNo) || 0;

    return (
        <>
            <Seo title='배송지 수정' noindex={true} />
            <div className={card.container}>
            <section className={card.section} data-type='form'>
                <AddressWriteForm addressNo={addressNo} />
            </section>
        </div>
        </>
    );
}

MypageAddressEditPage.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};
