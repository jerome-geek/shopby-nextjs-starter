'use client';

import { useEffect, useRef, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

interface PopupProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
    apiEndpoint?: string;
    checkCondition?: string;
    triggerCondition?: boolean;
}

// API 호출 함수들
const fetchNotificationCheck = async (): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Math.random() > 0.5;
};

const fetchPromotionCheck = async (): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return Math.random() > 0.7;
};

const fetchApiEndpoint = async (endpoint: string): Promise<boolean> => {
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error('API 호출 실패');
    }
    const data = await response.json();
    return data.shouldShow || false;
};

export default function Popup({
    title,
    children,
    className = '',
    apiEndpoint,
    checkCondition,
    triggerCondition = true,
}: PopupProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);

    // useSuspenseQuery를 사용한 데이터 fetching
    const { data: shouldShow } = useSuspenseQuery({
        queryKey: ['popup', checkCondition, apiEndpoint],
        queryFn: async () => {
            if (checkCondition === 'notification') {
                return await fetchNotificationCheck();
            } else if (checkCondition === 'promotion') {
                return await fetchPromotionCheck();
            } else if (apiEndpoint) {
                return await fetchApiEndpoint(apiEndpoint);
            }

            return false;
        },
    });

    useEffect(() => {
        if (shouldShow && triggerCondition) {
            setIsOpen(true);
        }
    }, [shouldShow, triggerCondition]);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === dialogRef.current) {
            handleClose();
        }
    };

    // shouldShow가 false면 아무것도 렌더링하지 않음
    if (!shouldShow) {
        return null;
    }

    return (
        <dialog
            ref={dialogRef}
            className="backdrop:bg-black backdrop:bg-opacity-50 bg-transparent p-0 max-w-none max-h-none"
            onClick={handleBackdropClick}
            onClose={handleClose}
        >
            <div
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 ${className}`}
            >
                {title && (
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-semibold">{title}</h2>
                        <button
                            onClick={handleClose}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl"
                        >
                            ×
                        </button>
                    </div>
                )}
                <div className="p-4">{children}</div>
            </div>
        </dialog>
    );
}
