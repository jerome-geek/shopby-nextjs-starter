import { AuthenticationType } from '@/models';
import { createContext } from 'react';

interface CertificationCheckContextType {
    isCertified: boolean;
    showCertificationDialog: () => void;
    isAuthenticationByPhone: boolean;
    authenticationType?: AuthenticationType;
}

const CertificationCheckContext =
    createContext<CertificationCheckContextType | null>(null);

export default CertificationCheckContext;
