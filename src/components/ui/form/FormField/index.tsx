import { ReactNode } from 'react';
import { css } from '@/styled-system/css';

import InputField from '@/components/ui/input/field';
import { InputLabel } from '@/components/ui/input/label';
import ErrorMessage from '@/components/ui/form/ErrorMessage';

interface FormFieldProps {
    /**
     * 필드 이름 (react-hook-form의 register name과 동일)
     */
    name: string;
    /**
     * 라벨 텍스트
     */
    label?: ReactNode;
    /**
     * 라벨의 필수 표시 여부
     */
    isRequired?: boolean;
    /**
     * InputField에 전달할 props
     */
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    /**
     * 커스텀 필드 컴포넌트 (InputField 대신 사용)
     */
    children?: ReactNode;
    /**
     * 에러 메시지 표시 여부
     * @default true
     */
    showError?: boolean;
    /**
     * 컨테이너 추가 클래스명
     */
    className?: string;
}

/**
 * FormField 컴포넌트
 * InputLabel, InputField, ErrorMessage를 함께 묶어서 제공하는 컴포넌트
 *
 * @example
 * ```tsx
 * <FormField
 *     name="memberId"
 *     label="아이디"
 *     isRequired
 *     inputProps={{
 *         type: "text",
 *         placeholder: "아이디를 입력하세요"
 *     }}
 * />
 * ```
 *
 * @example 커스텀 필드 사용
 * ```tsx
 * <FormField
 *     name="customField"
 *     label="커스텀 필드"
 * >
 *     <CustomInput {...register('customField')} />
 * </FormField>
 * ```
 */
export default function FormField({
    name,
    label,
    isRequired,
    inputProps,
    children,
    showError = true,
    className,
}: FormFieldProps) {
    return (
        <div
            className={css(
                {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { base: '8px' },
                },
                className
            )}
        >
            {label && (
                <InputLabel htmlFor={inputProps?.id || name} isRequired={isRequired}>
                    {label}
                </InputLabel>
            )}
            {children || <InputField id={name} {...inputProps} />}
            {showError && <ErrorMessage name={name} />}
        </div>
    );
}



