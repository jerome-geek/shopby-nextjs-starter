import type React from 'react';

export interface InfoListItem {
    label: string;
    content: string | React.ReactNode;
}

export interface PaymentInfoDetail {
    title: string;
    content: string | number;
}

export interface PaymentInfoItem {
    totalPayTitle: string;
    totalPay: string;
    detailList: PaymentInfoDetail[];
}
