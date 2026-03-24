import { OptionInputs } from '@/models/order';
import { FlatOption, TextOptionInput } from '@/models/product/productOption';
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
        buyPrice: option.buyPrice,
        addPrice: option.addPrice,
        isRequiredOption: option.isRequiredOption,
        optionInputs: textOptionInputs.map((input) => ({
            inputNo: input.inputNo,
            inputValue: input.inputValue || '',
            required: input.required,
            inputLabel: input.inputLabel,
        })),
    };
};

// export const toOrderSheetOption = (
//     option: SelectedOption,
//     channelType?: string,
// ) => {
//     return {
//         ...option,
//         channelType,
//     };
// };

// export const toModifiableOption = (
//     option: SelectedOption,
//     productNo: number,
//     channelType?: string,
//     cartNo: number = 0,
// ) => {
//     return {
//         ...option,
//         productNo,
//         cartNo,
//         channelType,
//     };
// };

export const sortRequiredFirst = <T extends { required: boolean }>(a: T) => {
    return !a.required;
};

export const isRequiredInputOptionMissing = (optionInput: OptionInputs) => {
    return optionInput.required && !optionInput.inputValue;
};
