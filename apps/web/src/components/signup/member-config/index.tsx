import { memo, useCallback, useEffect, useMemo } from 'react';
import {
    FieldError,
    useFormContext,
    useFormState,
    useWatch,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SingleValue } from 'react-select';

import FileUpload from '@/components/ui/file-upload';
import { ErrorMessage } from '@/components/ui/form';
import InputCheckbox from '@/components/ui/input/checkbox';
import InputField from '@/components/ui/input/field';
import InputContainer from '@/components/ui/input/container';
import { InputLabel } from '@/components/ui/input/label';
import InputRadio from '@/components/ui/input/Radio';
import Select from '@/components/ui/select';
import { GetMemberExtraInfoResponse } from '@/models/member/memberConfig';
import { SignupFormSchemaType } from '@/schema';
import * as styles from '@/components/signup/member-config/index.css';

type MemberConfigProps =
    GetMemberExtraInfoResponse['extraInfoContents'][number] & {
        defaultData?: {
            extraInfoNo: number;
            extraInfoOptionNos: (string | number | boolean)[];
            extraInfoOptionTextContent?: string;
        };
    };

const MemberConfig = ({
    extraInfoNo,
    extraInfoName,
    extraInfoType,
    extraInfoOptions,
    defaultData,
    status,
}: MemberConfigProps) => {
    const { t } = useTranslation();

    const { setValue, control } = useFormContext<SignupFormSchemaType>();

    useEffect(() => {
        if (!defaultData) {
            return;
        }

        setValue(`extraInfo.${extraInfoKey}`, {
            extraInfoNo,
            extraInfoName,
            extraInfoOptionNos: defaultData.extraInfoOptionNos.map(
                (item) => String(item) || '',
            ),
            extraInfoOptionTextContent:
                defaultData.extraInfoOptionTextContent ?? '',
        });
    }, [defaultData]);

    const extraInfoKey = `no_${extraInfoNo}`;

    const { errors } = useFormState({
        control,
        name: [`extraInfo.${extraInfoKey}`],
    });

    const errorMessage =
        (errors?.['extraInfo'] as Record<string, FieldError>)?.[extraInfoKey]
            ?.message ?? '';

    const currentExtraInfo = useWatch({
        name: `extraInfo.${extraInfoKey}`,
        control,
    });

    const isChecked = useCallback(
        (extraInfoOptionNo: number) => {
            const extraInfoOptionNos = currentExtraInfo?.extraInfoOptionNos;

            return !!extraInfoOptionNos?.includes(String(extraInfoOptionNo));
        },
        [currentExtraInfo?.extraInfoOptionNos],
    );

    const onCheckboxClick = useCallback(
        (extraInfoOptionNo: number) => {
            const isExist = currentExtraInfo?.extraInfoOptionNos?.includes(
                String(extraInfoOptionNo),
            );

            const currentExtraInfoOptionNos =
                currentExtraInfo?.extraInfoOptionNos ?? [];

            setValue(
                `extraInfo.${extraInfoKey}`,
                {
                    extraInfoNo,
                    extraInfoName,
                    extraInfoOptionNos: isExist
                        ? currentExtraInfoOptionNos.filter(
                              (no) => no !== String(extraInfoOptionNo),
                          )
                        : [
                              ...currentExtraInfoOptionNos,
                              String(extraInfoOptionNo),
                          ],
                    extraInfoOptionTextContent: '',
                },
                {
                    shouldValidate: true,
                },
            );
        },
        [currentExtraInfo, extraInfoKey, extraInfoName, extraInfoNo, setValue],
    );

    const dropdownOptions = useMemo(() => {
        return extraInfoOptions.map((option) => ({
            value: option.extraInfoOptionNo,
            label: t(option.extraInfoOptionName),
        }));
    }, [extraInfoOptions, t]);

    const onDropdownChange = useCallback(
        (selectedOption: SingleValue<{ value: number; label: string }>) => {
            if (!selectedOption) {
                return;
            }

            setValue(
                `extraInfo.${extraInfoKey}`,
                {
                    extraInfoNo,
                    extraInfoName,
                    extraInfoOptionNos: [selectedOption.value],
                    extraInfoOptionTextContent: '',
                },
                {
                    shouldValidate: true,
                },
            );
        },
        [extraInfoKey, extraInfoName, extraInfoNo, setValue],
    );

    const radioOptions = useMemo(() => {
        return extraInfoOptions.map((option) => ({
            value: String(option.extraInfoOptionNo),
            label: t(option.extraInfoOptionName),
        }));
    }, [extraInfoOptions, t]);

    const onRadioChange = useCallback(
        (value: string) => {
            setValue(
                `extraInfo.${extraInfoKey}`,
                {
                    extraInfoNo,
                    extraInfoName,
                    extraInfoOptionNos: [value],
                    extraInfoOptionTextContent: '',
                },
                {
                    shouldValidate: true,
                },
            );
        },
        [extraInfoKey, extraInfoName, extraInfoNo, setValue],
    );

    const onFileChange = useCallback(
        (file: File) => {
            setValue(
                `extraInfo.${extraInfoKey}`,
                {
                    extraInfoNo,
                    extraInfoName,
                    extraInfoOptionNos: [],
                    extraInfoOptionTextContent: '',
                    extraFileInfo: file ? file : undefined,
                },
                {
                    shouldValidate: true,
                },
            );
        },
        [extraInfoKey, extraInfoName, extraInfoNo, setValue],
    );

    const onBlurText = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            setValue(
                `extraInfo.${extraInfoKey}`,
                {
                    extraInfoNo,
                    extraInfoName,
                    extraInfoOptionNos:
                        currentExtraInfo?.extraInfoOptionNos ?? [],
                    extraInfoOptionTextContent: e.target.value,
                },
                {
                    shouldValidate: true,
                },
            );
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
                    defaultValue={defaultData?.extraInfoOptionTextContent}
                    data-error={!!errorMessage}
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
                    defaultValue={dropdownOptions?.find(
                        (item) =>
                            item.value === defaultData?.extraInfoOptionNos?.[0],
                    )}
                    onChange={onDropdownChange}
                />
            )}

            {extraInfoType === 'RADIOBUTTON' && (
                <InputRadio
                    onChange={onRadioChange}
                    options={radioOptions}
                    defaultValue={
                        String(defaultData?.extraInfoOptionNos?.[0]) ||
                        undefined
                    }
                />
            )}

            {extraInfoType === 'IMAGE' && (
                <>
                    <FileUpload
                        initialFileList={
                            defaultData?.extraInfoOptionTextContent
                                ? [defaultData.extraInfoOptionTextContent]
                                : []
                        }
                        setFileList={(fileList) => {
                            onFileChange(fileList[0] as File);
                        }}
                        maxLength={1}
                    />

                    <span className={styles.fileUploadDescription}>
                        {t(
                            'jpg, jpeg, gif, png, bmp 형식/5MB 이하/최대 1개 등록만 등록할 수 있습니다.',
                        )}
                    </span>
                </>
            )}

            <ErrorMessage name={`extraInfo.${extraInfoKey}`} />
        </InputContainer>
    );
};

export default memo(MemberConfig);
