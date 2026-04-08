import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MypageLayout } from '@/components/layout';
import { CheckAccountForm } from '@/components/mypage/edit/check-account-form';
import { EditForm } from '@/components/mypage/edit/edit-form';

export const MypageEdit = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const [password, setPassword] = useState<string | 'SOCIAL_LOGIN'>('');

    return !!password ? (
        <EditForm password={password} setPassword={setPassword} />
    ) : (
        <CheckAccountForm setPassword={setPassword} />
    );
};

MypageEdit.getLayout = (page: React.ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};

export default MypageEdit;
