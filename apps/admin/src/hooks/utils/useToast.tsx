import { useCallback } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';

import { ReactComponent as ChevronRightSmallIcon } from '@/icons/chevron-right-small.svg?react';

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

const variantWrapperClassName: Record<ToastVariant, string> = {
    default: [
        'flex items-center justify-between gap-3',
        'rounded-xl border border-[#e5e7eb] bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]',
        'px-4 py-3',
        'text-[14px] text-[#101828]',
        'max-w-[360px]',
    ].join(' '),
    success: [
        'flex items-center justify-between gap-3',
        'rounded-xl border border-emerald-200 bg-emerald-50 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]',
        'px-4 py-3',
        'text-[14px] text-emerald-900',
        'max-w-[360px]',
    ].join(' '),
    error: [
        'flex items-center justify-between gap-3',
        'rounded-xl border border-rose-200 bg-rose-50 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]',
        'px-4 py-3',
        'text-[14px] text-rose-900',
        'max-w-[360px]',
    ].join(' '),
};

const messageClassName = 'min-w-0 flex-1 break-words';

const messageWithLinkClassName = [
    messageClassName,
    'line-clamp-2',
].join(' ');

const linkClassName = [
    'flex shrink-0 items-center gap-1',
    'text-[13px] font-semibold text-brand-500 hover:text-brand-600 hover:underline',
].join(' ');

const useToast = () => {
    const addToast = useCallback(
        ({ message, variant = 'default', link }: AddToastParams) => {
            if (link) {
                toast.custom((t) => (
                    <div className={variantWrapperClassName[variant]}>
                        <div className={messageWithLinkClassName}>
                            {message}
                        </div>
                        <Link
                            to={link.href}
                            className={linkClassName}
                            onClick={() => toast.dismiss(t)}
                        >
                            {link.label}
                            <ChevronRightSmallIcon className='h-4 w-4' />
                        </Link>
                    </div>
                ));
                return;
            }

            toast.custom(() => (
                <div className={variantWrapperClassName[variant]}>
                    <div className={messageClassName}>{message}</div>
                </div>
            ));
        },
        [],
    );

    return { addToast };
};

export default useToast;
