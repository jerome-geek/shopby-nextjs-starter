import type { ReactNode } from 'react';

import Seo from '@/shared/components/common/seo';
import { AddressWriteForm } from '@/components/mypage/addresses/address-write-form';
import { MypageLayout } from '@/shared/components/layout';
import * as card from '@/features/mypage/common/mypage-list-card/index.css';

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
