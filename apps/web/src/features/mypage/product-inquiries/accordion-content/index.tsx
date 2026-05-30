import { isEmpty } from '@fxts/core';
import { clsx } from 'clsx';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import * as styles from '@/features/mypage/product-inquiries/accordion-content/index.css';
import { PATHS } from '@/const/paths';
import type { InquiryItem } from '@/models/display/productInquiry';

interface ProductInquiryContentProps extends InquiryItem {
    onDeleteButtonClick: (inquiryNo: number) => void;
    className?: string;
}

export const ProductInquiryContent = ({
    onDeleteButtonClick,
    className,
    ...props
}: ProductInquiryContentProps) => {
    const { t } = useTranslation();
    const router = useRouter();

    const { inquiryNo, content, answers, productNo, modifiable } = props;

    return (
        <div className={clsx(styles.container, className)} data-lenis-prevent>
            <div
                className={styles.body}
                dangerouslySetInnerHTML={{
                    __html: content ?? '',
                }}
            />

            {modifiable ? (
                <div className={styles.actions}>
                    <button
                        type='button'
                        className={styles.textButton}
                        onClick={() => {
                            const pathname =
                                PATHS.MYPAGE.PRODUCT_INQUIRIES.MODIFY.replace(
                                    '[inquiryNo]',
                                    String(inquiryNo),
                                );
                            router.push({
                                pathname,
                                query: { productNo },
                            });
                        }}
                    >
                        {t('수정')}
                    </button>
                    <button
                        type='button'
                        className={styles.textButton}
                        onClick={() => onDeleteButtonClick(inquiryNo)}
                    >
                        {t('삭제')}
                    </button>
                </div>
            ) : null}

            {!isEmpty(answers) ? (
                <ul className={styles.answerList}>
                    {answers.map(({ inquiryNo, content, registerYmdt }) => (
                        <li
                            key={String(inquiryNo ?? registerYmdt)}
                            className={styles.answerItem}
                        >
                            <span className={styles.answerBadge}>
                                {t('↳ 답변')}
                            </span>
                            <div
                                className={styles.answerBody}
                                dangerouslySetInnerHTML={{
                                    __html: content ?? '',
                                }}
                            />
                            <p className={styles.answerDate}>
                                {registerYmdt
                                    ? dayjs(registerYmdt).format('YYYY-MM-DD')
                                    : ''}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};
