import type { ReactNode } from 'react';

import Seo from '@/components/common/seo';
import { AddressWriteForm } from '@/components/mypage/addresses/address-write-form';
import { MypageLayout } from '@/components/layout';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';

export default function MypageAddressRegisterPage() {
    return (
        <>
            <Seo title='배송지 등록' noindex={true} />
            <div className={card.container}>
            <section className={card.section} data-type='form'>
                <AddressWriteForm />
            </section>
        </div>
        </>
    );
}

MypageAddressRegisterPage.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};
