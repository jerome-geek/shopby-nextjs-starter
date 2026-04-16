import { SingleValue } from 'react-select';

import type { FlatOption, MultiLevelOption } from '@/models/product/productOption';
import { useProductOptionStore } from '@/store/useProductOptionStore';
import { toSelectedOption } from '@/helpers/product';

const useProductOptionChange = ({ productNo }: { productNo: number }) => {
    const { addOption } = useProductOptionStore();

    const onFlatOptionChange = (option: SingleValue<FlatOption>) => {
        if (!option) {
            return;
        }

        addOption(toSelectedOption(option, productNo));
    };

    const onMultiOptionChange = (option: SingleValue<MultiLevelOption>) => {
        if (!option) {
            return;
        }

        // MultiLevelOption이 FlatOption의 속성(optionNo 등)을 가지고 있는 경우에만 추가
        if ('optionNo' in option) {
            addOption(toSelectedOption(option as FlatOption, productNo));
        }
    };

    return { onFlatOptionChange, onMultiOptionChange };
};

export default useProductOptionChange;
