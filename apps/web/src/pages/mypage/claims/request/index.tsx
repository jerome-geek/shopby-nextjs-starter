import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SuspenseQuery } from '@suspensive/react-query';

import LoadingWrapper from '@/components/common/loading-wrapper';
import Seo from '@/components/common/seo';
import { MypageLayout } from '@/components/layout';
import { ClaimCancelForm } from '@/components/mypage/claims/forms/cancel';
import { ClaimExchangeForm } from '@/components/mypage/claims/forms/exchange';
import { ClaimReturnForm } from '@/components/mypage/claims/forms/return';
import { CLAIM_TYPE_MAP } from '@/const/label';
import { PATHS } from '@/const/paths';
import {
    guestOrderOptionDetailForClaimOptions,
    memberOrderOptionDetailForClaimOptions,
} from '@/entities/claim/queries';
import { useAuth } from '@/hooks/useAuth';
import { useDialog } from '@/hooks/utils';
import type { ClaimType } from '@/models';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';

interface ClaimRequestQueryProps {
    claimType: ClaimType;
    orderOptionNo: number;
}

const ClaimRequestQuery = ({
    claimType,
    orderOptionNo,
}: ClaimRequestQueryProps) => {
    const isLogin = useAuth();

    if (isLogin === null) {
        return (
            <LoadingWrapper isLoading>
                <span />
            </LoadingWrapper>
        );
    }

    const renderForm = (data: Parameters<typeof ClaimCancelForm>[0]['orderOptionData']) => {
        if (claimType === 'CANCEL') {
            return <ClaimCancelForm orderOptionData={data} />;
        }

        if (claimType === 'RETURN') {
            return <ClaimReturnForm orderOptionData={data} />;
        }

        return <ClaimExchangeForm orderOptionData={data} />;
    };

    return isLogin ? (
        <ShopbyAsyncBoundary
            fallback={
                <LoadingWrapper isLoading>
                    <span />
                </LoadingWrapper>
            }
        >
            <SuspenseQuery
                {...memberOrderOptionDetailForClaimOptions({
                    orderOptionNo,
                    searchParams: { claimType },
                })}
            >
                {({ data }) => renderForm(data)}
            </SuspenseQuery>
        </ShopbyAsyncBoundary>
    ) : (
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

export default function MypageClaimRequestPage() {
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

    const claimTitle =
        parsedClaimType === 'CANCEL'
            ? t('취소 신청')
            : parsedClaimType === 'RETURN'
            ? t('반품 신청')
            : t('교환 신청');

    return (
        <>
            <Seo title={claimTitle} noindex={true} />
            <ClaimRequestQuery
                claimType={parsedClaimType}
                orderOptionNo={orderOptionNo}
            />
        </>
    );
}

MypageClaimRequestPage.getLayout = (page: React.ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};
