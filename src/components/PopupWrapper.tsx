'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from '@suspensive/react';
import Popup from './Popup';

interface PopupWrapperProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
    apiEndpoint?: string;
    checkCondition?: string;
    triggerCondition?: boolean;
}

function PopupSkeleton() {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 animate-pulse">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-1/3"></div>
                </div>
                <div className="p-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
                </div>
            </div>
        </div>
    );
}

// 조건부 팝업 컴포넌트
function ConditionalPopup(props: PopupWrapperProps) {
    // triggerCondition이 false이거나 조건이 없으면 렌더링하지 않음
    if (
        !props.triggerCondition ||
        (!props.checkCondition && !props.apiEndpoint)
    ) {
        return null;
    }

    return <Popup {...props} />;
}

function PopupError({ reset }: { reset: () => void }) {
    return (
        <dialog
            className="backdrop:bg-black backdrop:bg-opacity-50 bg-transparent p-0 max-w-none max-h-none"
            open
        >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-red-600">
                        오류 발생
                    </h2>
                </div>
                <div className="p-4">
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                        팝업을 불러오는 중 오류가 발생했습니다.
                    </p>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={reset}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            다시 시도
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    );
}

export default function PopupWrapper(props: PopupWrapperProps) {
    return (
        <ErrorBoundary fallback={PopupError}>
            <Suspense fallback={<PopupSkeleton />}>
                <ConditionalPopup {...props} />
            </Suspense>
        </ErrorBoundary>
    );
}
