import { useRouter } from 'next/router';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import Select from '@/components/ui/Select';
import { TermHistory } from '@/models/manage/terms';

import * as styles from './TermHistorySelect.css';

interface TermsHistorySelectProps {
    historyList: TermHistory[];
    currentTermsNo?: number;
}

export default function TermsHistorySelect({
    historyList,
    currentTermsNo,
}: TermsHistorySelectProps) {
    const id = useId();
    const router = useRouter();
    const { termsType: queryTermsType } = router.query;
    const termsType = queryTermsType as string;

    const { t } = useTranslation();

    const currentValue = currentTermsNo
        ? historyList.find((item) => item.termsNo === currentTermsNo)
        : historyList[0];

    const getOptionLabel = (item: TermHistory) => {
        if (item.termsEnforcementStatusLabel) {
            return `${item.enforcementDate} ${t('시행')} (${item.termsEnforcementStatusLabel})`;
        }
        return item.enforcementDate;
    };

    const onChange = (item: TermHistory | null) => {
        if (!item) {
            return;
        }
        // 이력 선택 시 /terms/[termsType]/[termsNo] 경로로 이동
        router.push(`/terms/${termsType}/${item.termsNo}`);
    };

    return (
        <div className={styles.container}>
            <Select
                instanceId={id}
                options={historyList}
                value={currentValue}
                onChange={onChange}
                getOptionLabel={getOptionLabel}
                getOptionValue={(item) => item.termsNo.toString()}
                placeholder={t('시행일 선택')}
            />
        </div>
    );
}
