import { useContext } from 'react';

import { CertificationCheckContext } from '@/features/member/certification-check';

export function useCertificationCheck() {
    const context = useContext(CertificationCheckContext);
    if (!context) {
        throw new Error(
            'useCertification must be used within CertificationCheckProvider',
        );
    }
    return context;
}

export default useCertificationCheck;
