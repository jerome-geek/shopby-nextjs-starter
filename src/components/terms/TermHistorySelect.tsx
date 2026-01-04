'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import Select from '@/components/ui/Select';
import { TermHistory } from '@/models/manage/terms';
import { css } from '@/styled-system/css';

interface TermsHistorySelectProps {
    historyList: TermHistory[];
    currentTermsNo?: number;
}

export default function TermsHistorySelect({
    historyList,
    currentTermsNo,
}: TermsHistorySelectProps) {
    const id = useId();

    const { t } = useTranslation();

    const router = useRouter();
    const searchParams = useSearchParams();

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
        const params = new URLSearchParams(searchParams.toString());
        params.set('termsNo', item.termsNo.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <div
            className={css({
                width: 'fit-content',
                minWidth: '220px',
                marginBottom: '20px',
            })}
        >
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
