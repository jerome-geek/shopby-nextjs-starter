import { ReactNode } from 'react';

import InputContainer from '@/components/ui/input/InputContainer';
import { InputLabel } from '@/components/ui/input/label';
import { useMall } from '@/hooks/query/admin/mall';
import { MemberJoinConfig } from '@/models/admin/mall';

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
        <InputContainer>
            <InputLabel
                isRequired={mallData.memberJoinConfig[name] === 'REQUIRED'}
            >
                {label}
            </InputLabel>

            {children}
        </InputContainer>
    );
};

export default WithMemberJoinConfig;
