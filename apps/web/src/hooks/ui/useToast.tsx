import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useCallback } from 'react';
import { toast } from 'sonner';

import * as styles from '@/components/ui/Toast/Toast.css';

interface ToastLink {
    label: string;
    href: string;
}

type ToastVariant = 'default' | 'success' | 'error';

interface AddToastParams {
    message: string;
    variant?: ToastVariant;
    link?: ToastLink;
}

export const useToast = () => {
    const addToast = useCallback(
        ({ message, variant = 'default', link }: AddToastParams) => {
            if (link) {
                toast.custom((t) => (
                    <div className={styles.toastWrapper[variant]}>
                        <div className={styles.toastMessageWithLink}>
                            {message}
                        </div>
                        <Link
                            href={link.href}
                            className={styles.toastLink}
                            onClick={() => toast.dismiss(t)}
                        >
                            {link.label}
                            <ChevronRight size={16} />
                        </Link>
                    </div>
                ));
                return;
            }

            toast.custom(() => (
                <div className={styles.toastWrapper[variant]}>
                    <div className={styles.toastMessage}>{message}</div>
                </div>
            ));
        },
        [],
    );

    return { addToast };
};
