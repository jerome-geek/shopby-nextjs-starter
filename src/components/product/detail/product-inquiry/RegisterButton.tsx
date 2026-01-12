'use client';

import { overlay } from 'overlay-kit';
import { useTranslation } from 'react-i18next';

import TextButton from '@/components/ui/button/TextButton';
import ProductInquiryDialog from '@/components/ui/dialog/product-inquiry';
import { GetMallResponse } from '@/models/admin/mall';
import { SmallCaretIcon } from '@/components/icons';

interface RegisterButtonProps {
    inquiryTypeList: GetMallResponse['productInquiryType'];
}

export default function RegisterButton({
    inquiryTypeList,
}: RegisterButtonProps) {
    const { t } = useTranslation();

    const onClick = () => {
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
        <TextButton frame='text' variant='primary' onClick={onClick}>
            <span>{t('문의하기')}</span>
            <SmallCaretIcon direction='right' />
        </TextButton>
    );
}
