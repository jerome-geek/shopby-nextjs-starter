import { isEmpty } from '@fxts/core';
import dayjs from 'dayjs';
import { clsx } from 'clsx';
import { overlay } from 'overlay-kit';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { PATHS } from '@/const/paths';
import type { GetInquiriesItem } from '@/models/manage/inquiry';
import * as styles from '@/features/mypage/inquiries/accordion-content/index.css';
import { ImageDetailModal } from '@/shared/overlay/image-detail/modal';

interface InquiryContentProps extends GetInquiriesItem {
    onDeleteButtonClick: (inquiryNo: number) => void;
    className?: string;
}

export const InquiryContent = ({
    onDeleteButtonClick,
    className,
    ...props
}: InquiryContentProps) => {
    const { inquiryNo, inquiryContent, answer, imageUrls } = props;
    const { t } = useTranslation();
    const router = useRouter();

    const images = imageUrls ?? [];

    const openImagePreview = (imageUrl: string) => {
        overlay.open((props) => <ImageDetailModal src={imageUrl} {...props} />);
    };

    return (
        <div className={clsx(styles.container, className)} data-lenis-prevent>
            <div
                className={styles.body}
                dangerouslySetInnerHTML={{
                    __html: inquiryContent ?? '',
                }}
            />

            {images.length > 0 ? (
                <ul className={styles.imageList}>
                    {images.map((image, index) => (
                        <li key={`${inquiryNo}-${index}`}>
                            <button
                                type='button'
                                className={styles.imageButton}
                                onClick={() => openImagePreview(image)}
                            >
                                <img
                                    src={image}
                                    alt=''
                                    className={styles.thumbImg}
                                />
                            </button>
                        </li>
                    ))}
                </ul>
            ) : null}

            {isEmpty(answer) ? (
                <div className={styles.actions}>
                    <button
                        type='button'
                        className={styles.textButton}
                        onClick={() =>
                            router.push(
                                PATHS.MYPAGE.INQUIRIES.MODIFY.replace(
                                    '[inquiryNo]',
                                    String(inquiryNo),
                                ),
                            )
                        }
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
            ) : (
                <ul className={styles.answerList}>
                    {(answer ? [answer] : []).map(
                        ({ answerNo, answerContent, answerRegisterYmdt }) => (
                            <li
                                key={String(answerNo ?? answerRegisterYmdt)}
                                className={styles.answerItem}
                            >
                                <span className={styles.answerBadge}>
                                    {t('↳ 답변')}
                                </span>
                                <div
                                    className={styles.answerBody}
                                    dangerouslySetInnerHTML={{
                                        __html: answerContent ?? '',
                                    }}
                                />
                                <p className={styles.answerDate}>
                                    {answerRegisterYmdt
                                        ? dayjs(answerRegisterYmdt).format(
                                              'YYYY-MM-DD',
                                          )
                                        : ''}
                                </p>
                            </li>
                        ),
                    )}
                </ul>
            )}
        </div>
    );
};
