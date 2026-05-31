import { useTranslation } from 'react-i18next';

import * as styles from '@/features/member/find-id/overlay/find-id-result/content/index.css';
import type { FindIdResponse } from '@/models/member/profile';
import dayjs from '@/utils/dayjs';

interface FindIdResultProps {
    memberName: string;
    result: FindIdResponse;
}

export const FindIdResult = ({ memberName, result }: FindIdResultProps) => {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <p
                className={styles.title}
                dangerouslySetInnerHTML={{
                    __html: t('<b>{{memberName}}</b> 님의 아이디입니다.', {
                        memberName,
                    }),
                }}
            />

            <ul className={styles.list}>
                {result.map((info) => (
                    <li key={info.id} className={styles.item}>
                        <span className={styles.itemId}>{info.id}</span>
                        <span className={styles.itemMeta}>
                            {t('가입일')}{' '}
                            {dayjs(info.joinYmdt).format('YYYY.MM.DD')}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
