'use client';

import { useRouter } from 'next/navigation';
import { overlay } from 'overlay-kit';
import {
    entries,
    map,
    pipe,
    filter,
    toArray,
    includes,
    head,
} from '@fxts/core';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';
import { OPT_IN_LIST, SIGN_UP_TERM_LIST } from '@/const/terms';
import { useTermList } from '@/hooks/suspenseQuery/manage/terms';
import InputCheckbox from '@/components/ui/input/Checkbox';
import { SHOPBY_TERMS_TYPE_MAP } from '@/const/label';
import TermDialog from '@/components/ui/dialog/term';
import { CreateProfileData } from '@/models/member/profile';
import { PATHS } from '@/const/paths';
import useDialog from '@/hooks/useDialog';
import { InputLabel } from '@/components/ui/input/label';

export default function SignupTermsPage() {
    const [checkedTermList, setCheckedTermList] = useState<
        CreateProfileData['joinTermsAgreements'][number][]
    >([]);
    const [checkedOptInList, setCheckedOptInList] = useState<
        ('smsAgreed' | 'directMailAgreed')[]
    >([]);

    const { data: termListData } = useTermList({
        searchParams: {
            termsTypes: [...map((a) => a.type, SIGN_UP_TERM_LIST)],
        },
    });

    const agreeTermList = useMemo(() => {
        return pipe(
            termListData,
            entries,
            filter(([, v]) => v.used),
            map(([k]) => k.toUpperCase()),
            toArray
        );
    }, [termListData]);

    const requiredTermList = useMemo(() => {
        return pipe(
            SIGN_UP_TERM_LIST,
            filter((a) => includes(a.type, agreeTermList)),
            toArray
        );
    }, [agreeTermList]);
    console.log('🚀 ~ SignupTermsPage ~ requiredTermList:', requiredTermList);

    const isRequiredTermsChecked = useMemo(() => {
        const requiredTermTypeList = requiredTermList.map((a) => a.type);

        return (
            requiredTermTypeList.length > 0 &&
            requiredTermTypeList.every((type) =>
                includes(type, checkedTermList)
            )
        );
    }, [requiredTermList, checkedTermList]);

    const allTermTypes = useMemo(
        () => SIGN_UP_TERM_LIST.map((a) => a.type),
        []
    );
    const allOptInTypes = useMemo(() => OPT_IN_LIST.map((a) => a.type), []);

    const isAllAgreed = useMemo(() => {
        const allTermsChecked =
            allTermTypes.length > 0 &&
            allTermTypes.every((type) => includes(type, checkedTermList));
        const allOptInsChecked =
            allOptInTypes.length > 0 &&
            allOptInTypes.every((type) => includes(type, checkedOptInList));
        return allTermsChecked && allOptInsChecked;
    }, [checkedTermList, checkedOptInList, allTermTypes, allOptInTypes]);

    const onAllAgreeClick = (checked: boolean) => {
        setCheckedTermList(checked ? allTermTypes : []);
        setCheckedOptInList(checked ? allOptInTypes : []);
    };

    const onAgreeClick = (type: any) => {
        setCheckedTermList((prev) =>
            includes(type, prev)
                ? prev.filter((item) => item !== type)
                : [...prev, type]
        );
    };

    const onOptInClick = (type: 'smsAgreed' | 'directMailAgreed') => {
        setCheckedOptInList((prev) =>
            includes(type, prev)
                ? prev.filter((item) => item !== type)
                : [...prev, type]
        );
    };

    const onDetailClick = (
        type: CreateProfileData['joinTermsAgreements'][number]
    ) => {
        const termDetail =
            termListData &&
            pipe(
                termListData,
                entries,
                filter(([k]) => k.toUpperCase() === type),
                map(([, v]) => v),
                head
            );

        overlay.open((props) => {
            return (
                <TermDialog
                    {...props}
                    title={
                        SHOPBY_TERMS_TYPE_MAP[
                            type.toLowerCase() as keyof typeof SHOPBY_TERMS_TYPE_MAP
                        ]
                    }
                    contents={termDetail?.contents ?? ''}
                />
            );
        });
    };

    const { openDialog } = useDialog();

    const router = useRouter();
    const onNexButtonClick = () => {
        if (!isRequiredTermsChecked) {
            openDialog({
                message: '필수 약관에 동의해주세요.',
            });
            return;
        }

        sessionStorage.setItem(
            'signupTerms',
            JSON.stringify({
                checkedTermList,
                checkedOptInList,
            })
        );
        router.push(PATHS.SIGNUP.FORM);
    };

    // TODO: 다른페이지 다녀와도 무조건 동의가 되어 있는데 이게 맞는지?
    useEffect(() => {
        const stored = sessionStorage.getItem('signupTerms');
        if (stored) {
            try {
                const { checkedTermList, checkedOptInList } =
                    JSON.parse(stored);
                setCheckedTermList(checkedTermList);
                setCheckedOptInList(checkedOptInList);
            } catch (error) {}
        }
    }, []);

    return (
        <div
            className={css({
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
            })}
        >
            <div>
                <h2
                    className={css({
                        fontSize: '4rem',
                        lineHeight: '5rem',
                        fontWeight: 'bold',
                        letterSpacing: '-2%',
                        color: token('colors.black'),
                    })}
                >
                    회원가입
                </h2>
            </div>

            <div>
                <div
                    className={css({
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    })}
                >
                    <InputCheckbox
                        id="isAllAgreed"
                        checked={isAllAgreed}
                        onCheckedChange={(checked) => {
                            onAllAgreeClick(checked);
                        }}
                    />
                    <label
                        htmlFor="isAllAgreed"
                        className={css({
                            color: token('colors.black'),
                            fontSize: { base: '1.4rem', md: '1.5rem' },
                            lineHeight: { base: '2rem', md: '2.2rem' },
                            fontWeight: '700',
                        })}
                    >
                        전체 동의하기 (선택 포함)
                    </label>
                </div>
                <p
                    className={css({
                        marginLeft: 'calc(var(--checkbox-size, 18px) + 8px)',
                    })}
                >
                    선택항목에 대한 동의를 거부하여도 서비스는 이용이
                    가능합니다.
                </p>
            </div>

            <ul
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { base: '10px', md: '8px' },
                })}
            >
                {SIGN_UP_TERM_LIST.map(({ type, label, isRequired }) => {
                    return (
                        <li
                            key={type}
                            className={css({
                                display: 'flex',
                                justifyContent: 'space-between',
                            })}
                        >
                            <InputLabel isCheckbox>
                                <InputCheckbox
                                    id={type}
                                    checked={includes(type, checkedTermList)}
                                    onCheckedChange={() => onAgreeClick(type)}
                                />
                                <p>
                                    {`[${isRequired ? '필수' : '선택'}] ${label}`}
                                </p>
                            </InputLabel>

                            <button
                                type="button"
                                className={css({
                                    textDecoration: 'underline',
                                    color: token('colors.gray70'),
                                    fontSize: { base: '1.2rem', md: '1.4rem' },
                                })}
                                onClick={() => onDetailClick(type)}
                            >
                                <span>자세히</span>
                            </button>
                        </li>
                    );
                })}

                {OPT_IN_LIST.map(({ type, label, isRequired }) => {
                    return (
                        <li
                            key={type}
                            className={css({
                                display: 'flex',
                                justifyContent: 'space-between',
                            })}
                        >
                            <InputLabel isCheckbox>
                                <InputCheckbox
                                    id={type}
                                    checked={includes(type, checkedOptInList)}
                                    onCheckedChange={() => onOptInClick(type)}
                                />
                                <p
                                    // type={isMobile ? 't13' : 't15'}
                                    style={{
                                        color: 'var(--color-gray-700)',
                                    }}
                                >
                                    {`[${isRequired ? '필수' : '선택'}] ${label}`}
                                </p>
                            </InputLabel>
                        </li>
                    );
                })}
            </ul>

            <Button frame="solid" variant="primary" onClick={onNexButtonClick}>
                <span>동의하고 본인인증하기</span>
            </Button>
        </div>
    );
}
