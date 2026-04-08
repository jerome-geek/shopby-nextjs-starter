import { every } from '@fxts/core';
import dayjs from 'dayjs';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/mypage/edit/edit-form/term-check-list/index.css';
import InputCheckbox from '@/components/ui/input/checkbox';
import { useProfile } from '@/hooks/suspenseQuery/member/profile';
import { useMemo } from 'react';

const OPT_IN_LIST = [
    {
        type: 'smsAgreed' as const,
        label: 'SMS 수신동의',
        isRequired: false,
        isChecked: false,
    },
    {
        type: 'directMailAgreed' as const,
        label: '이메일 수신동의',
        isRequired: false,
        isChecked: false,
    },
] as const;

type OptInType = (typeof OPT_IN_LIST)[number]['type'];

export const TermCheckList = () => {
    const { t } = useTranslation();
    const { control, setValue, getValues } = useFormContext<{
        smsAgreed: boolean;
        directMailAgreed: boolean;
    }>();

    const smsAgreedWatch = useWatch({ control, name: 'smsAgreed' });
    const directMailAgreedWatch = useWatch({
        control,
        name: 'directMailAgreed',
    });

    const { data: profileData } = useProfile();

    const checkedOptInList = useMemo(
        () =>
            OPT_IN_LIST.map((optIn) => {
                const isChecked = Boolean(
                    optIn.type === 'smsAgreed'
                        ? smsAgreedWatch
                        : directMailAgreedWatch,
                );

                return { ...optIn, isChecked };
            }),
        [smsAgreedWatch, directMailAgreedWatch],
    );

    const onAllAgreeChangeClick = (checked: boolean) => {
        OPT_IN_LIST.forEach(({ type }) => {
            setValue(type, checked);
        });
    };

    const onOptInClick = (type: OptInType) => {
        const current = Boolean(getValues(type));
        setValue(type, !current);
    };

    return (
        <div className={styles.termContainer}>
            <ul className={styles.termList}>
                <li className={styles.termListItem}>
                    <InputCheckbox
                        id='check-all'
                        checked={every((a) => a.isChecked, checkedOptInList)}
                        onCheckedChange={onAllAgreeChangeClick}
                    />
                    <label htmlFor='check-all' className={styles.termLabel}>
                        <span className={styles.termLabelSpan}>
                            {t('전체 동의하기')}
                        </span>
                    </label>
                </li>
            </ul>

            <ul className={styles.termList}>
                {checkedOptInList.map(
                    ({ type, label, isRequired, isChecked }) => {
                        const isSms = type === 'smsAgreed';
                        const isDirectMail = type === 'directMailAgreed';

                        return (
                            <li key={type} className={styles.termListItem}>
                                <InputCheckbox
                                    id={type}
                                    checked={isChecked}
                                    onCheckedChange={() => {
                                        onOptInClick(type);
                                    }}
                                />
                                <label
                                    htmlFor={type}
                                    className={styles.termLabel}
                                >
                                    <p className={styles.termLabelTitle}>
                                        {`[${
                                            isRequired ? t('필수') : t('선택')
                                        }] ${t(label)}`}
                                    </p>

                                    {isSms && profileData?.smsAgreeYmdt && (
                                        <p className={styles.termLabelSubText}>
                                            {profileData.smsAgreed
                                                ? t(
                                                      'SMS 수신동의 시간 : {{smsAgreeYmdt}}',
                                                      {
                                                          smsAgreeYmdt: dayjs(
                                                              profileData.smsAgreeYmdt,
                                                          ).format(
                                                              'YYYY-MM-DD HH:mm:ss',
                                                          ),
                                                      },
                                                  )
                                                : t(
                                                      'SMS 수신거부 시간 : {{smsDisagreeYmdt}}',
                                                      {
                                                          smsDisagreeYmdt:
                                                              dayjs(
                                                                  profileData.smsDisagreeYmdt,
                                                              ).format(
                                                                  'YYYY-MM-DD HH:mm:ss',
                                                              ),
                                                      },
                                                  )}
                                        </p>
                                    )}

                                    {isDirectMail &&
                                        profileData?.directMailAgreeYmdt && (
                                            <p
                                                className={
                                                    styles.termLabelSubText
                                                }
                                            >
                                                {profileData.directMailAgreed
                                                    ? t(
                                                          '이메일 수신동의 시간 : {{directMailAgreeYmdt}}',
                                                          {
                                                              directMailAgreeYmdt:
                                                                  dayjs(
                                                                      profileData.directMailAgreeYmdt,
                                                                  ).format(
                                                                      'YYYY-MM-DD HH:mm:ss',
                                                                  ),
                                                          },
                                                      )
                                                    : t(
                                                          '이메일 수신거부 시간 : {{directMailDisagreeYmdt}}',
                                                          {
                                                              directMailDisagreeYmdt:
                                                                  dayjs(
                                                                      profileData.directMailDisagreeYmdt,
                                                                  ).format(
                                                                      'YYYY-MM-DD HH:mm:ss',
                                                                  ),
                                                          },
                                                      )}
                                            </p>
                                        )}
                                </label>
                            </li>
                        );
                    },
                )}
            </ul>
        </div>
    );
};
