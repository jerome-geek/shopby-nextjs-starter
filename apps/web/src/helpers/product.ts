import type { ChannelType } from '@/models';
import type { OptionInputs } from '@/models/order';
import type {
    FlatOption,
    TextOptionInput,
} from '@/models/product/productOption';
import { SelectedOption } from '@/store/useProductOptionStore';
// import { SelectedOption } from '@/state/slices/productOption';

type TextOptionInputWithInputValue = TextOptionInput & { inputValue?: string };

export const toSelectedOption = <T extends FlatOption>(
    option: T,
    productNo: number,
    baseProductNo: number | undefined = undefined,
    textOptionInputs: TextOptionInputWithInputValue[] = [],
    orderCnt: number = 1,
) => {
    return {
        productNo,
        baseProductNo,
        optionNo: option.optionNo,
        stockCnt: option.stockCnt,
        price: option.buyPrice,
        orderCnt,
        label: option.label,
        value: option.value,
        buyPrice: option.buyPrice,
        addPrice: option.addPrice,
        isRequiredOption: option.isRequiredOption,
        optionInputs: textOptionInputs.map((input) => ({
            inputNo: input.inputNo,
            inputValue: input.inputValue || '',
            required: input.required,
            inputLabel: input.inputLabel,
            inputMatchingType: input.inputMatchingType,
        })),
    };
};

export const toOrderSheetOption = (
    option: SelectedOption,
    channelType?: Nullable<ChannelType>,
) => {
    return {
        ...option,
        ...(channelType && { channelType }),
    };
};

export const toModifiableOption = (
    option: SelectedOption,
    productNo: number,
    channelType?: Nullable<ChannelType>,
    cartNo: number = 0,
) => {
    return {
        ...option,
        productNo,
        cartNo,
        ...(channelType && { channelType }),
    };
};

export const sortRequiredFirst = <T extends { required: boolean }>(a: T) => {
    return !a.required;
};

export const isRequiredInputOptionMissing = (optionInput: OptionInputs) => {
    return optionInput.required && !optionInput.inputValue;
};
