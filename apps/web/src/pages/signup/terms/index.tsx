import {
    entries,
    every,
    filter,
    includes,
    map,
    pipe,
    toArray,
} from '@fxts/core';
import Seo from '@/shared/components/common/seo';
import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import { type ReactElement, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { shopbyRequest } from '@/api/core/request';
import { AuthLayout } from '@/shared/components/layout';
import { Button } from '@/shared/ui/button';
import TermDialog from '@/shared/ui/dialog/term';
import { InputCheckbox } from '@/shared/ui/input';
import { SHOPBY_TERMS_TYPE_MAP } from '@/const/label';
import { PATHS } from '@/const/paths';
import { CertificationCheckContext } from '@/features/member/certification-check';
import { useTermList } from '@/hooks/query/manage/terms';
import useSnsLogin from '@/features/member/hooks/useSnsLogin';
import { useKcpCertification } from '@/hooks/utils';
import useDialog from '@/hooks/utils/useDialog';
import { NextPageWithLayout } from '@/pages/_app';

import * as styles from '@/pages/signup/terms/index.css';

// 회원가입 약관 리스트 정의
const SIGN_UP_TERM_LIST = [
    { type: 'USE', label: '이용약관', isRequired: true },
    { type: 'PI_PROCESS', label: '개인정보 처리방침', isRequired: true },
    {
        type: 'PI_COLLECTION_AND_USE_REQUIRED',
        label: '개인정보 수집 및 이용 동의',
        isRequired: true,
    },
    { type: 'PI_14_AGE', label: '만 14세 이상 가입 동의', isRequired: true },
] as const;

const OPT_IN_LIST = [
    { type: 'smsAgreed', label: 'SMS 수신 동의', isRequired: false },
    { type: 'directMailAgreed', label: '이메일 수신 동의', isRequired: false },
] as const;

type ExtraJoinData = {
    provider?: string | string[];
    accessToken?: string | string[];
    refreshToken?: string | string[];
    code?: string | string[];
    expiry?: string | string[];
    refreshTokenExpiresIn?: string | string[];
    returnUrl?: string | string[];
    key?: string;
};

const SignupTerms: NextPageWithLayout = () => {
    const { t } = useTranslation();

    const router = useRouter();

    const { openDialog } = useDialog();

    const value = useContext(CertificationCheckContext);
    const isAuthenticationByPhone = value?.isAuthenticationByPhone;

    const { openKcpAuthRegister } = useSnsLogin();

    // 체크된 약관 타입들을 관리 (Anti-pattern: 객체 배열 상태 관리 지양)
    const [checkedTypes, setCheckedTypes] = useState<string[]>([]);

    // 실제 쇼핑몰에서 서버로부터 조회한 사용 중인 약관 리스트
    const { data: termListData } = useTermList({
        searchParams: {
            termsTypes: pipe(
                SIGN_UP_TERM_LIST,
                map((a) => a.type),
                toArray,
            ),
        },
    });

    // 화면에 노출할 약관 리스트 (Anti-pattern: Effect를 통한 상태 동기화 대신 useMemo 사용)
    const visibleTerms = useMemo(() => {
        if (!termListData) {
            return [];
        }

        const usedTerms = pipe(
            termListData,
            entries,
            filter(([, v]) => v.used),
            map(([k]) => k.toUpperCase()),
            toArray,
        );

        return pipe(
            SIGN_UP_TERM_LIST,
            filter((a) => includes(a.type, usedTerms)),
            toArray,
        );
    }, [termListData]);

    const isAllAgreed = useMemo(() => {
        const totalCount = visibleTerms.length + OPT_IN_LIST.length;
        if (totalCount === 0) {
            return false;
        }

        return (
            checkedTypes.length === totalCount &&
            every(
                (type) => includes(type, checkedTypes),
                [
                    ...map((a) => a.type, visibleTerms),
                    ...map((a) => a.type, OPT_IN_LIST),
                ],
            )
        );
    }, [visibleTerms, checkedTypes]);

    const onAllAgreeChangeClick = () => {
        if (isAllAgreed) {
            setCheckedTypes([]);
        } else {
            const allTypes = [
                ...map((a) => a.type, visibleTerms),
                ...map((a) => a.type, OPT_IN_LIST),
            ];
            setCheckedTypes(allTypes);
        }
    };

    const toggleCheck = (type: string) => {
        setCheckedTypes((prev) =>
            includes(type, prev)
                ? [...filter((t) => t !== type, prev)]
                : [...prev, type],
        );
    };

    const onDetailClick = (type: string) => {
        const termDetail =
            termListData?.[type.toLowerCase() as keyof typeof termListData];

        overlay.open(({ isOpen, close, unmount }) => (
            <TermDialog
                isOpen={isOpen}
                close={close}
                unmount={unmount}
                title={
                    SHOPBY_TERMS_TYPE_MAP[
                        type as keyof typeof SHOPBY_TERMS_TYPE_MAP
                    ] || t(type)
                }
                contents={termDetail?.contents ?? ''}
            />
        ));
    };

    const moveNextPage = (extraData?: ExtraJoinData) => {
        const agreedJoinTerms = pipe(
            visibleTerms,
            filter((a) => includes(a.type, checkedTypes)),
            map((a) => a.type),
            toArray,
        );

        router.replace({
            pathname: PATHS.SIGNUP.REGISTER,
            query: {
                terms: agreedJoinTerms.join(','),
                smsAgreed: includes('smsAgreed', checkedTypes),
                directMailAgreed: includes('directMailAgreed', checkedTypes),
                ...extraData,
            },
        });
    };

    const onNextClick = () => {
        const isRequiredAllAgreed = every(
            (term) => includes(term.type, checkedTypes),
            pipe(
                visibleTerms,
                filter((a) => a.isRequired),
                toArray,
            ),
        );

        if (!isRequiredAllAgreed) {
            openDialog({
                message: t('필수항목에 대한 동의를 체크해주세요.'),
            });
            return;
        }

        if (isAuthenticationByPhone) {
            openKcpAuthRegister();
            return;
        }

        const {
            provider,
            accessToken,
            refreshToken,
            code,
            expiry,
            returnUrl,
            refreshTokenExpiresIn,
        } = router.query;

        moveNextPage({
            provider,
            accessToken,
            refreshToken,
            code,
            expiry,
            refreshTokenExpiresIn,
            returnUrl,
        });
    };

    useKcpCertification({
        onNext: async (data: {
            key?: string;
            accessToken?: string;
            provider?: string;
            code?: string;
            expiry?: string;
            returnUrl?: string;
        }) => {
            try {
                if (data.provider && data.accessToken && data.key) {
                    await shopbyRequest({
                        method: 'POST',
                        url: '/profile/rename',
                        data: {
                            key: data.key,
                        },
                        headers: {
                            'Shop-By-Authorization': `Bearer ${data.accessToken}`,
                        },
                    });
                }
            } catch (error) {
                console.error(error);
            }

            moveNextPage({
                ...data,
            });
        },
    });

    return (
        <div className={styles.container}>
            <Seo title='약관동의' noindex />
            <div className={styles.titleContainer}>
                <div className={styles.contentsContainer}>
                    {/* 전체 동의 섹션 */}
                    <div className={styles.allAgreeContainer}>
                        <label className={styles.label}>
                            <InputCheckbox
                                checked={isAllAgreed}
                                onCheckedChange={onAllAgreeChangeClick}
                            />
                            <span className={styles.allAgreeLabel}>
                                {t('전체 동의하기 (선택 포함)')}
                            </span>
                        </label>
                        <p className={styles.description}>
                            {t(
                                '선택항목에 대한 동의를 거부하여도 서비스는 이용이 가능합니다.',
                            )}
                        </p>
                    </div>

                    <div className={styles.allAgreeSeparator} />

                    {/* 개별 약관 리스트 */}
                    <ul className={styles.termList}>
                        {visibleTerms.map(({ type, label, isRequired }) => (
                            <li key={type} className={styles.termListItem}>
                                <label className={styles.label}>
                                    <InputCheckbox
                                        checked={includes(type, checkedTypes)}
                                        onCheckedChange={() =>
                                            toggleCheck(type)
                                        }
                                    />
                                    <span className={styles.termLabel}>{`[${
                                        isRequired ? t('필수') : t('선택')
                                    }] ${t(label)}`}</span>
                                </label>
                                <button
                                    type='button'
                                    className={styles.detailButton}
                                    onClick={() => onDetailClick(type)}
                                >
                                    {t('자세히')}
                                </button>
                            </li>
                        ))}

                        {OPT_IN_LIST.map(({ type, label, isRequired }) => (
                            <li key={type} className={styles.termListItem}>
                                <label className={styles.label}>
                                    <InputCheckbox
                                        checked={includes(type, checkedTypes)}
                                        onCheckedChange={() =>
                                            toggleCheck(type)
                                        }
                                    />
                                    <span className={styles.termLabel}>{`[${
                                        isRequired ? t('필수') : t('선택')
                                    }] ${t(label)}`}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <Button
                variant='primary'
                frame='solid'
                onClick={onNextClick}
                className={styles.nextButton}
            >
                {t(isAuthenticationByPhone ? '본인 인증하기' : '다음으로')}
            </Button>
        </div>
    );
};

SignupTerms.getLayout = (page: ReactElement) => (
    <AuthLayout title='약관동의'>{page}</AuthLayout>
);

export default SignupTerms;
