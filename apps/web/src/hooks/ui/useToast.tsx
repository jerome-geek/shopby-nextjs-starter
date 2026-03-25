import Link from 'next/link';
import { useCallback } from 'react';
import { toast } from 'sonner';

import * as styles from '@/components/ui/Toast/Toast.css';
import { ChevronRight } from 'lucide-react';

interface ToastLink {
    label: string;
    href: string;
}

interface ToastOptions {
    link?: ToastLink;
}

export const useToast = () => {
    const showToast = useCallback((message: string, options?: ToastOptions) => {
        const { link } = options || {};

        if (link) {
            toast.custom((t) => (
                <div className={styles.toastWrapper}>
                    <div className={styles.toastMessageWithLink}>{message}</div>
                    <Link href={link.href} className={styles.toastLink} onClick={() => toast.dismiss(t)}>
                        {link.label}
                        <ChevronRight size={16} />
                    </Link>
                </div>
            ));
            return;
        }

        toast.custom(() => (
            <div className={styles.toastWrapper}>
                <div className={styles.toastMessage}>{message}</div>
            </div>
        ));
    }, []);

    return { showToast };
};
