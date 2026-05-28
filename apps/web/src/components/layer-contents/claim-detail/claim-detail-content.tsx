import dayjs from 'dayjs';
import { overlay } from 'overlay-kit';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/shared/components/common/loading-wrapper';
import * as styles from '@/components/layer-contents/claim-detail/index.css';
import { ImageDetailModal } from '@/components/modal';
import { CLAIM_REASON_MAP, CLAIM_TYPE_MAP } from '@/const/label';
import useGuestClaimDetail from '@/hooks/query/claim/guest/useGuestClaimDetail';
import useClaimDetail from '@/hooks/query/claim/member/useClaimDetail';
import { useAuth } from '@/hooks/useAuth';
import { CURRENCY } from '@/utils/currency';

interface ClaimDetailContentProps {
    claimNo: number;
}

export const ClaimDetailContent = ({ claimNo }: ClaimDetailContentProps) => {
    const { t } = useTranslation();
    const isLogin = useAuth();

    const { data: claimDetailData, isFetched: isClaimDetailFetched } =
        useClaimDetail({
            claimNo,
            options: {
                enabled: isLogin === true,
            },
        });

    const { data: guestClaimDetailData, isFetched: isGuestClaimDetailFetched } =
        useGuestClaimDetail({
            claimNo,
            options: {
                enabled: isLogin === false,
            },
        });

    if (isLogin === null) return null;

    const claimData = isLogin ? claimDetailData : guestClaimDetailData;
    const isFetched = isLogin
        ? isClaimDetailFetched
        : isGuestClaimDetailFetched;

    const claimInfoList = !claimData
        ? []
        : [
              {
                  label: t('클레임 종류'),
                  value: CLAIM_TYPE_MAP[
                      claimData.claimType as keyof typeof CLAIM_TYPE_MAP
                  ],
              },
              {
                  label: t('신청일자'),
                  value: dayjs(claimData.claimYmdt).format(
                      'YYYY.MM.DD HH:mm:ss',
                  ),
              },
              {
                  label: t('사유'),
                  value:
                      CLAIM_REASON_MAP[
                          claimData.claimReasonType as keyof typeof CLAIM_REASON_MAP
                      ] || claimData.claimReasonType,
              },
              {
                  label: t('상세 사유'),
                  value: claimData.claimReasonDetail,
              },
              {
                  label: t('첨부 이미지'),
                  value: claimData.claimImageUrls,
              },
              {
                  label: t('환불 방법'),
                  value: claimData.claimPriceInfo?.refundTypeLabel,
              },
              {
                  label: t('환불 계좌 정보'),
                  value: claimData.refundBankAccount?.bankAccount
                      ? [
                            claimData.refundBankAccount?.bankName,
                            claimData.refundBankAccount?.bankAccount,
                            claimData.refundBankAccount?.bankDepositorName,
                        ]
                            .filter(Boolean)
                            .join(' ')
                      : null,
              },
              {
                  label: t('환불 배송비'),
                  value: CURRENCY(
                      claimData.claimPriceInfo?.deliveryAmtInfo?.totalAmt ?? 0,
                  ).format(),
              },
              {
                  label: t('환불 금액'),
                  value: CURRENCY(
                      claimData.claimPriceInfo?.refundMainPayAmt ?? 0,
                  ).format(),
              },
              {
                  label: t('적립금 환불 금액'),
                  value: CURRENCY(
                      claimData.claimPriceInfo?.refundSubPayAmt ?? 0,
                  ).format(),
              },
              {
                  label: t('총 환불 금액'),
                  value: CURRENCY(
                      claimData.claimPriceInfo?.refundPayAmt ?? 0,
                  ).format(),
              },
              {
                  label: t('추가 결제 금액'),
                  value: claimData.claimPriceInfo?.additionalPayAmt
                      ? CURRENCY(
                            claimData.claimPriceInfo.additionalPayAmt,
                        ).format()
                      : null,
              },
          ].filter((item) => {
              if (Array.isArray(item.value)) return item.value.length > 0;
              return (
                  item.value !== null &&
                  item.value !== undefined &&
                  item.value !== ''
              );
          });

    const handleClickImage = (imageUrl: string) => {
        overlay.open((props) => {
            return <ImageDetailModal {...props} src={imageUrl} />;
        });
    };

    return (
        <LoadingWrapper isLoading={!isFetched} isLoadedAnimation>
            {!claimData ? null : (
                <div className={styles.container}>
                    <ul className={styles.claimInfoList}>
                        {claimInfoList.map((item) => (
                            <li
                                key={item.label}
                                className={styles.claimInfoListItem}
                            >
                                <span className={styles.claimInfoLabel}>
                                    {item.label}
                                </span>
                                <div className={styles.claimContentContainer}>
                                    {item.label === t('첨부 이미지') &&
                                    Array.isArray(item.value) ? (
                                        <div
                                            className={
                                                styles.claimInfoImageList
                                            }
                                        >
                                            {item.value.map((url, idx) => (
                                                <button
                                                    key={idx}
                                                    className={
                                                        styles.claimInfoImageListItem
                                                    }
                                                    onClick={() =>
                                                        handleClickImage(url)
                                                    }
                                                >
                                                    <img
                                                        src={url}
                                                        alt='클레임 첨부 이미지'
                                                        className={
                                                            styles.claimImage
                                                        }
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <span
                                            className={
                                                item.label === t('총 환불 금액')
                                                    ? styles.claimInfoValueHighlight
                                                    : styles.claimInfoValue
                                            }
                                        >
                                            {Array.isArray(item.value)
                                                ? item.value.join('\n')
                                                : item.value}
                                        </span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </LoadingWrapper>
    );
};
