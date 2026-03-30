import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { get, useFormContext, useFormState, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { filter, includes, pipe, prop, some } from '@fxts/core';

import { GetMemberExtraInfoResponse } from '@/models/member/memberConfig';
import { SignupFormSchemaType } from '@/schema';
import InputContainer from '@/components/ui/input/InputContainer';
import { InputLabel } from '@/components/ui/input/label';
import InputField from '@/components/ui/input/field';
import { ErrorMessage } from '@/components/ui/form';
import InputCheckbox from '@/components/ui/input/Checkbox';

import Select from '@/components/ui/select';

import CloseIcon from '@/assets/icons/circle-minus.svg';
import * as styles from '@/components/signup/member-config/index.css';

const MemberConfig = ({
    extraInfoNo,
    extraInfoName,
    extraInfoType,
    extraInfoOptions,
    status,
}: GetMemberExtraInfoResponse['extraInfoContents'][number]) => {
    const { t } = useTranslation();

    const { setValue, getValues, control } =
        useFormContext<SignupFormSchemaType>();

    const extraInfoKey = `no_${extraInfoNo}`;

    const { errors } = useFormState({
        name: [`extraInfo.${extraInfoKey}`],
    });

    const hasError = !!get(errors, `extraInfo.${extraInfoKey}`);

    // 에러 표시는 ErrorMessage 컴포넌트에서 처리합니다.
    const extraInfo = useWatch({
        name: `extraInfo`,
        control,
    });

    console.log(extraInfo, 'extraInfo');

    const currentExtraInfo = useWatch({
        name: `extraInfo.${extraInfoKey}`,
        control,
    });

    const dropdownOptions = useMemo(() => {
        return extraInfoOptions.map((option) => ({
            value: option.extraInfoOptionNo,
            label: t(option.extraInfoOptionName),
        }));
    }, [extraInfoOptions, t]);

    // const dropdownValue = useMemo(() => {
    //     return dropdownOptions.find((option) =>
    //         (extraInfo?.find((e) => e.extraInfoNo === extraInfoNo)?.extraInfoOptionNos ?? []
    //         ).includes(option.value),
    //     );
    // }, [extraInfo, extraInfoNo, extraInfoOptions, t]);

    const isChecked = useCallback(
        (extraInfoOptionNo: number) => {
            const extraInfoOptionNos = currentExtraInfo?.extraInfoOptionNos;

            return !!extraInfoOptionNos?.includes(String(extraInfoOptionNo));
        },
        [currentExtraInfo],
    );

    const onCheckboxClick = useCallback(
        (extraInfoOptionNo: number) => {
            const isExist = currentExtraInfo?.extraInfoOptionNos?.includes(
                String(extraInfoOptionNo),
            );

            const currentExtraInfoOptionNos =
                currentExtraInfo?.extraInfoOptionNos ?? [];

            setValue(`extraInfo.${extraInfoKey}`, {
                extraInfoNo,
                extraInfoName,
                extraInfoOptionNos: isExist
                    ? currentExtraInfoOptionNos.filter(
                          (no) => no !== String(extraInfoOptionNo),
                      )
                    : [...currentExtraInfoOptionNos, String(extraInfoOptionNo)],
                extraInfoOptionTextContent: '',
            });
        },
        [currentExtraInfo, extraInfoKey, extraInfoName, extraInfoNo, setValue],
    );

    useEffect(() => {
        if (extraInfoType !== 'RADIOBUTTON') {
            return;
        }

        if (currentExtraInfo) {
            return;
        }

        if (extraInfoOptions.length === 0) {
            return;
        }

        const defaultValue = String(extraInfoOptions[0].extraInfoOptionNo);
        setValue(`extraInfo.${extraInfoKey}`, {
            extraInfoNo,
            extraInfoName,
            extraInfoOptionNos: [defaultValue],
            extraInfoOptionTextContent: '',
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onBlurText = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            setValue(`extraInfo.${extraInfoKey}`, {
                extraInfoNo,
                extraInfoName,
                extraInfoOptionNos: currentExtraInfo?.extraInfoOptionNos ?? [],
                extraInfoOptionTextContent: e.target.value,
            });
        },
        [currentExtraInfo, extraInfoKey, extraInfoName, extraInfoNo, setValue],
    );

    if (status === 'NOT_USED') {
        return null;
    }

    return (
        <InputContainer>
            <InputLabel isRequired={status === 'REQUIRED'}>
                {t(extraInfoName)}
            </InputLabel>

            {extraInfoType === 'TEXTBOX' && (
                <InputField
                    onBlur={onBlurText}
                    placeholder={t('{{extraInfoName}}을(를) 입력해 주세요.', {
                        extraInfoName: extraInfoName,
                    })}
                    data-error={hasError}
                />
            )}

            {extraInfoType === 'CHECKBOX' && (
                <ul className={styles.checkboxList}>
                    {extraInfoOptions.map(
                        ({ extraInfoOptionName, extraInfoOptionNo }) => {
                            return (
                                <li
                                    key={extraInfoOptionNo}
                                    className={styles.checkboxListItem}
                                >
                                    <label
                                        htmlFor={`${extraInfoOptionNo}`}
                                        className={styles.checkboxLabel}
                                    >
                                        <InputCheckbox
                                            id={`${extraInfoOptionNo}`}
                                            checked={isChecked(
                                                extraInfoOptionNo,
                                            )}
                                            onCheckedChange={() =>
                                                onCheckboxClick(
                                                    extraInfoOptionNo,
                                                )
                                            }
                                        />
                                        {t(extraInfoOptionName)}
                                    </label>
                                </li>
                            );
                        },
                    )}
                </ul>
            )}

            {extraInfoType === 'DROPDOWN' && (
                <Select
                    placeholder={t(extraInfoName)}
                    options={dropdownOptions}
                    // value={
                    //     extraInfoOptions
                    //         .filter((option) =>
                    //             (
                    //                 watch('extraInfo')?.find(
                    //                     (e) => e.extraInfoNo === extraInfoNo,
                    //                 )?.extraInfoOptionNos ?? []
                    //             ).includes(option.extraInfoOptionNo),
                    //         )
                    //         .map((option) => ({
                    //             value: option.extraInfoOptionNo,
                    //             label: t(option.extraInfoOptionName),
                    //         }))[0] || null
                    // }
                    // onChange={onDropdownChange}
                />
            )}

            {/* {extraInfoType === 'RADIOBUTTON' && (
                <RadioGroup.Root
                    defaultValue={`${extraInfoOptions[0].extraInfoOptionNo}`}
                    value={selectedRadioValue}
                    onValueChange={onRadioClick}
                >
                    <S.RadioGroupList>
                        {extraInfoOptions.map(
                            ({ extraInfoOptionNo, extraInfoOptionName }) => {
                                return (
                                    <S.RadioGroupListItem
                                        key={extraInfoOptionNo}
                                    >
                                        <Input.InputStyle.RadioGroupItem
                                            value={`${extraInfoOptionNo}`}
                                            id={`${extraInfoOptionNo}`}
                                        >
                                            <Input.InputStyle.RadioGroupIndicator />
                                        </Input.InputStyle.RadioGroupItem>
                                        <S.CheckboxLabel
                                            htmlFor={`${extraInfoOptionNo}`}
                                        >
                                            {t(extraInfoOptionName)}
                                        </S.CheckboxLabel>
                                    </S.RadioGroupListItem>
                                );
                            },
                        )}
                    </S.RadioGroupList>
                </RadioGroup.Root>
            )} */}
            {/* 
            {extraInfoType === 'IMAGE' && (
                <Input.FieldContainer>
                    <Input.FieldContainer isFlex>
                        <input
                            type='file'
                            id='uploadFile'
                            accept='.jpg,.jpeg,.gif,.png,.bmp'
                            onChange={onFileChange}
                            style={{ display: 'none' }}
                        />

                        {imageName && (
                            <S.ImageContainer>
                                <S.UploadImage
                                    src={imageName}
                                    alt={imageName}
                                />
                                <S.ImageDeleteButton
                                    type='button'
                                    onClick={deleteImage}
                                >
                                    <CloseIcon />
                                </S.ImageDeleteButton>
                            </S.ImageContainer>
                        )}

                        {!imageName && (
                            <SecondaryButton
                                onClick={onFileUploadClick}
                                style={{
                                    borderRadius: 'var(--spacing-6)',
                                }}
                            >
                                <span>{t('파일 첨부')}</span>
                            </SecondaryButton>
                        )}
                    </Input.FieldContainer>

                    <DescriptionText>
                        {t(
                            'jpg, jpeg, gif, png, bmp 형식/5MB 이하/최대 1개 등록만 등록할 수 있습니다.',
                        )}
                    </DescriptionText>
                </Input.FieldContainer>
            )} */}

            <ErrorMessage name={`extraInfo.${extraInfoKey}`} />
        </InputContainer>
    );
};

export default memo(MemberConfig);
