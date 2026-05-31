import { SingleValue } from 'react-select';

import { toSelectedOption } from '@/helpers/product';
import type {
    FlatOption,
    MultiLevelOption,
} from '@/models/product/productOption';
import { useProductOptionStore } from '@/store/useProductOptionStore';

interface UseProductOptionChangeProps {
    productNo?: number;
    /** 추가상품 처리를 위한 본 상품 번호 */
    baseProductNo?: number;
}

const useProductOptionChange = (props: UseProductOptionChangeProps) => {
    const { addOption } = useProductOptionStore();

    const onFlatOptionChange = (
        option: SingleValue<FlatOption>,
        productNo?: number,
        baseProductNo?: number,
    ) => {
        if (!option) {
            return;
        }

        const targetProductNo = productNo ?? props?.productNo;
        const targetBaseProductNo = baseProductNo ?? props?.baseProductNo;

        if (!targetProductNo) {
            return;
        }

        addOption(
            toSelectedOption(option, targetProductNo, targetBaseProductNo),
        );
    };

    const onMultiOptionChange = (
        option: SingleValue<MultiLevelOption>,
        productNo?: number,
        baseProductNo?: number,
    ) => {
        if (!option) {
            return;
        }

        const targetProductNo = productNo ?? props?.productNo;
        const targetBaseProductNo = baseProductNo ?? props?.baseProductNo;

        if (!targetProductNo) {
            return;
        }

        // MultiLevelOption이 FlatOption의 속성(optionNo 등)을 가지고 있는 경우에만 추가
        if ('optionNo' in option) {
            addOption(
                toSelectedOption(
                    option as FlatOption,
                    targetProductNo,
                    targetBaseProductNo,
                ),
            );
        }
    };

    return { onFlatOptionChange, onMultiOptionChange };
};

export default useProductOptionChange;
