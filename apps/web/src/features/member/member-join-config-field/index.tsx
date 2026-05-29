import type { ReactNode } from 'react';

import { InputFieldContainer, InputLabel } from '@/shared/ui/input';
import { useMall } from '@/hooks/query/admin/mall';
import type { MemberJoinConfig } from '@/models/admin/mall';

interface WithMemberJoinConfigProps {
    children?: ReactNode;
    name: keyof MemberJoinConfig;
    label: string;
}

const WithMemberJoinConfig = ({
    children,
    name,
    label,
}: WithMemberJoinConfigProps) => {
    const { data: mallData } = useMall();

    if (!mallData) {
        return null;
    }

    if (mallData.memberJoinConfig[name] === 'NOT_USED') {
        return null;
    }

    return (
        <InputFieldContainer>
            <InputLabel
                isRequired={mallData.memberJoinConfig[name] === 'REQUIRED'}
            >
                {label}
            </InputLabel>

            {children}
        </InputFieldContainer>
    );
};

export default WithMemberJoinConfig;
