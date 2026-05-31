import { SuspenseQuery } from '@suspensive/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/shared/components/common/loading-wrapper';
import Seo from '@/shared/components/common/seo';
import { GuestLayout } from '@/shared/components/layout';
import { ClaimCancelForm } from '@/features/mypage/claims/forms/cancel';
import { ClaimExchangeForm } from '@/features/mypage/claims/forms/exchange';
import { ClaimReturnForm } from '@/features/mypage/claims/forms/return';
import { CLAIM_TYPE_MAP } from '@/const/label';
import { PATHS } from '@/const/paths';
import { guestOrderOptionDetailForClaimOptions } from '@/entities/claim/queries';
import { useDialog } from '@/hooks/utils';
import type { ClaimType } from '@/models';
import type { GetOrderOptionDetailForClaimResponse } from '@/entities/claim/model/member';
import { NextPageWithLayout } from '@/pages/_app';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';

interface GuestClaimRequestQueryProps {
    claimType: ClaimType;
    orderOptionNo: number;
}

const GuestClaimRequestQuery = ({
    claimType,
    orderOptionNo,
}: GuestClaimRequestQueryProps) => {
    const renderForm = (data: GetOrderOptionDetailForClaimResponse) => {
        if (claimType === 'CANCEL') {
            return <ClaimCancelForm orderOptionData={data} />;
        }

        if (claimType === 'RETURN') {
            return <ClaimReturnForm orderOptionData={data} />;
        }

        return <ClaimExchangeForm orderOptionData={data} />;
    };

    return (
        <ShopbyAsyncBoundary
            fallback={
                <LoadingWrapper isLoading>
                    <span />
                </LoadingWrapper>
            }
        >
            <SuspenseQuery
                {...guestOrderOptionDetailForClaimOptions({
                    orderOptionNo,
                    searchParams: { claimType },
                })}
            >
                {({ data }) => renderForm(data)}
            </SuspenseQuery>
        </ShopbyAsyncBoundary>
    );
};

const GuestClaimRequestPage: NextPageWithLayout = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { openDialog } = useDialog();

    const claimType = String(router.query.claimType ?? '');
    const orderOptionNo = Number(router.query.orderOptionNo) || 0;
    const parsedClaimType = (
        claimType === 'CANCEL' ||
        claimType === 'RETURN' ||
        claimType === 'EXCHANGE'
            ? claimType
            : null
    ) as ClaimType | null;

    const claimTypeLabel = parsedClaimType
        ? CLAIM_TYPE_MAP[parsedClaimType]
        : null;

    useEffect(() => {
        if (!router.isReady) return;

        if (!claimTypeLabel || !orderOptionNo) {
            const redirect = () => {
                router.replace(PATHS.MYPAGE.CLAIMS.MAIN);
            };
            openDialog({
                message: t('잘못된 접근입니다.'),
                confirm: redirect,
                cancel: redirect,
            });
        }
    }, [router.isReady, claimTypeLabel, orderOptionNo, openDialog, router, t]);

    if (!claimTypeLabel || !orderOptionNo || !parsedClaimType) {
        return null;
    }

    return (
        <>
            <Seo title='비회원 클레임 신청' noindex />
            <GuestClaimRequestQuery
                claimType={parsedClaimType}
                orderOptionNo={orderOptionNo}
            />
        </>
    );
};

GuestClaimRequestPage.getLayout = (page) => (
    <GuestLayout title='비회원 클레임 신청'>{page}</GuestLayout>
);

export default GuestClaimRequestPage;
