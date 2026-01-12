import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { productInquiry } from '@/api/display';
import {
    ReportProductInquiryData,
    UpdateProductInquiryData,
    WriteProductInquiryData,
} from '@/models/display/productInquiry';
import useDialog from '@/hooks/useDialog';

// onError Callback의 dialog는 마지막 dialog가 노출되므로 기본 onError Callback 세팅
const useProductInquiryMutation = () => {
    return {
        /** 상품문의 등록 */
        register: useMutation({
            mutationFn: async ({
                productNo,
                data,
            }: {
                productNo: number;
                data: WriteProductInquiryData;
            }) => await productInquiry.writeProductInquiry(productNo, data),
        }),

        /** 상품문의 수정 */
        update: useMutation({
            mutationFn: async ({
                inquiryNo,
                data,
            }: {
                inquiryNo: number;
                data: UpdateProductInquiryData;
            }) => await productInquiry.updateProductInquiry(inquiryNo, data),
        }),

        /** 상품문의 삭제 */
        delete: useMutation({
            mutationFn: async ({ inquiryNo }: { inquiryNo: number }) =>
                await productInquiry.deleteProductInquiry(inquiryNo),
        }),

        /** 상품문의 신고 */
        report: useMutation({
            mutationFn: async ({
                productNo,
                data,
            }: {
                productNo: number;
                data: ReportProductInquiryData;
            }) => await productInquiry.reportProductInquiry(productNo, data),
        }),
    };
};

export default useProductInquiryMutation;
