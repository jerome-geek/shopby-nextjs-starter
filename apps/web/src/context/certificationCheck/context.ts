import { createContext } from 'react';

interface CertificationCheckContextType {
    isCertified: boolean;
    showCertificationDialog: () => void;
    isAuthenticationByPhone: boolean;
}

const CertificationCheckContext =
    createContext<CertificationCheckContextType | null>(null);

export default CertificationCheckContext;
