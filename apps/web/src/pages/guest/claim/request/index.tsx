import { GuestLayout } from '@/components/layout';
import { ClaimCancelForm } from '@/components/mypage/claims/forms/cancel';
import { ClaimExchangeForm } from '@/components/mypage/claims/forms/exchange';
import { ClaimReturnForm } from '@/components/mypage/claims/forms/return';
import { CLAIM_TYPE_MAP } from '@/const/label';
import { PATHS } from '@/const/paths';
import { useDialog } from '@/hooks/utils';
import { NextPageWithLayout } from '@/pages/_app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const GuestClaimRequestPage: NextPageWithLayout = () => {
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

GuestClaimRequestPage.getLayout = (page) => (
    <GuestLayout title='비회원 클레임 신청'>{page}</GuestLayout>
);

export default GuestClaimRequestPage;
