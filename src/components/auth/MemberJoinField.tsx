import { ReactNode, memo } from 'react';

import { InputLabel } from '@/components/ui/input/label';
import { useMall } from '@/hooks/suspenseQuery/admin/mall';
import { MemberJoinConfig } from '@/models/admin/mall';
import { css } from '@/styled-system/css';

interface MemberJoinFieldProps {
    children?: ReactNode;
    name: keyof MemberJoinConfig;
    label: string;
}

const MemberJoinField = ({ name, label, children }: MemberJoinFieldProps) => {
    const { data } = useMall();

    if (!data) {
        return null;
    }

    const configValue = data.memberJoinConfig[name];

    if (configValue === 'NOT_USED') {
        return null;
    }

    return (
        <div
            className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
            })}
        >
            <InputLabel isRequired={configValue === 'REQUIRED'}>
                {label}
            </InputLabel>

            {children}
        </div>
    );
};

export default memo(MemberJoinField);
