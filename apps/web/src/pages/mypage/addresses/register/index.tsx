import type { ReactNode } from 'react';

import { AddressWriteForm } from '@/components/mypage/addresses/address-write-form';
import { MypageLayout } from '@/components/layout';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';

const MypageAddressRegisterPage = () => {
    return (
        <div className={card.container}>
            <section className={card.section} data-type='form'>
                <AddressWriteForm />
            </section>
        </div>
    );
};

MypageAddressRegisterPage.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};

export default MypageAddressRegisterPage;
