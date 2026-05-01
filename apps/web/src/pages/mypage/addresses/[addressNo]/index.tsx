import { useRouter } from 'next/router';
import { type ReactNode } from 'react';

import { MypageLayout } from '@/components/layout';
import { AddressWriteForm } from '@/components/mypage/addresses/address-write-form';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';

export default function MypageAddressEditPage() {
    const router = useRouter();

    const addressNo = Number(router.query.addressNo) || 0;

    return (
        <div className={card.container}>
            <section className={card.section} data-type='form'>
                <AddressWriteForm addressNo={addressNo} />
            </section>
        </div>
    );
}

MypageAddressEditPage.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};
