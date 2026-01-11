'use client';

import { overlay } from 'overlay-kit';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ProductInquiryDialog from '@/components/ui/dialog/product-inquiry';
import ViewAllLink from '@/components/ui/view-all-link';
import { GetMallResponse } from '@/models/admin/mall';

interface RegisterButtonProps {
    inquiryTypeList: GetMallResponse['productInquiryType'];
}

export default function RegisterButton({
    inquiryTypeList,
}: RegisterButtonProps) {
    const { t } = useTranslation();

    const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        e.stopPropagation();

        overlay.open((props) => {
            return (
                <ProductInquiryDialog
                    title='문의하기'
                    inquiryTypeList={inquiryTypeList}
                    {...props}
                />
            );
        });
    };

    return (
        <ViewAllLink href='/inquiry' onClick={onClick}>
            {t('문의하기')}
        </ViewAllLink>
    );
}
