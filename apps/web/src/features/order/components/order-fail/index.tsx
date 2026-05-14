import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import * as styles from '@/features/order/components/order-fail/index.css';
import { useRouter } from 'next/router';
import { PATHS } from '@/const/paths';

/**
 * [주문 실패 컴포넌트]
 */
const OrderFail = () => {
    const { t } = useTranslation();

    const router = useRouter();

    const { message, orderSheetNo } = router.query;

    return (
        <div className={styles.failContainer}>
            <div className={styles.failIcon}>⚠️</div>
            <h1 className={styles.failTitle}>{t('주문에 실패하였습니다')}</h1>
            <p className={styles.failDescription}>
                {message ? (
                    message
                ) : (
                    <>
                        {t(
                            '결제 도중 오류가 발생했거나 주문 정보가 유효하지 않습니다.',
                        )}
                        {t('문제가 지속되면 고객센터로 문의해주세요.')}
                    </>
                )}
                <br />
            </p>
            <div className={styles.buttonGroup}>
                <Link href='/' className={styles.ghostButton}>
                    {t('메인으로 가기')}
                </Link>
                {orderSheetNo ? (
                    <Link
                        href={`${PATHS.ORDER.MAIN}/${orderSheetNo}`}
                        className={styles.primaryButton}
                    >
                        {t('다시 주문하기')}
                    </Link>
                ) : (
                    <button
                        onClick={() => router.back()}
                        className={styles.primaryButton}
                    >
                        {t('다시 시도하기')}
                    </button>
                )}
            </div>
        </div>
    );
};

export default OrderFail;
