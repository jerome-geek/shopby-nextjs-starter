import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { MypageLayout } from '@/components/layout';
import { ClaimCancelForm } from '@/components/mypage/claims/forms/cancel';
import { ClaimExchangeForm } from '@/components/mypage/claims/forms/exchange';
import { ClaimReturnForm } from '@/components/mypage/claims/forms/return';
import { CLAIM_TYPE_MAP } from '@/const/label';
import { PATHS } from '@/const/paths';
import { useDialog } from '@/hooks/utils';

export const ClaimRequest = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { openDialog } = useDialog();

    const claimType = String(router.query.claimType ?? '');
    const orderOptionNo = String(router.query.orderOptionNo ?? '');

    const parseClaimType =
        CLAIM_TYPE_MAP[claimType as keyof typeof CLAIM_TYPE_MAP];

    useEffect(() => {
        if (!router.isReady) return;

        if (!parseClaimType || !orderOptionNo) {
            const redirect = () => {
                router.replace(PATHS.MYPAGE.CLAIMS.MAIN);
            };
            openDialog({
                message: t('잘못된 접근입니다.'),
                confirm: redirect,
                cancel: redirect,
            });
        }
    }, [router.isReady, parseClaimType, orderOptionNo, openDialog, router, t]);

    if (!parseClaimType || !orderOptionNo) {
        return null;
    }

    return (
        <>
            {claimType === 'CANCEL' && <ClaimCancelForm />}
            {claimType === 'RETURN' && <ClaimReturnForm />}
            {claimType === 'EXCHANGE' && <ClaimExchangeForm />}
        </>
    );
};

ClaimRequest.getLayout = (page: React.ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};

export default ClaimRequest;
