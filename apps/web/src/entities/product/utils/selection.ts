import type { ChannelType } from '@/models';
import type { OptionInputs } from '@/models/order';
import type {
    FlatOption,
    TextOptionInput,
} from '@/models/product/productOption';
import { SelectedOption } from '@/features/product/option/store/useProductOptionStore';
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

type RequiredTextOptionInput = Pick<
    TextOptionInput,
    'inputNo' | 'inputMatchingType'
>;

const hasFilledTextOptionInput = (
    inputNo: number,
    optionInputs: OptionInputs[],
) =>
    optionInputs.some(
        (input) => input.inputNo === inputNo && !!input.inputValue?.trim(),
    );

/** 상품/옵션별 필수 텍스트옵션이 모두 입력됐는지 검사 (미입력 시 true) */
export const isRequiredTextOptionsMissing = (
    requiredInputs: RequiredTextOptionInput[],
    selectedOptions: Pick<SelectedOption, 'optionInputs'>[],
) => {
    if (requiredInputs.length === 0) {
        return false;
    }

    const productRequiredInputs = requiredInputs.filter(
        (input) => input.inputMatchingType === 'PRODUCT',
    );
    const perOptionRequiredInputs = requiredInputs.filter(
        (input) => input.inputMatchingType !== 'PRODUCT',
    );

    const allEnteredInputs = selectedOptions.flatMap(
        (option) => option.optionInputs ?? [],
    );

    const isProductInputMissing = productRequiredInputs.some(
        (required) =>
            !hasFilledTextOptionInput(required.inputNo, allEnteredInputs),
    );

    const isPerOptionInputMissing =
        perOptionRequiredInputs.length > 0 &&
        selectedOptions.some((selected) =>
            perOptionRequiredInputs.some(
                (required) =>
                    !hasFilledTextOptionInput(
                        required.inputNo,
                        selected.optionInputs ?? [],
                    ),
            ),
        );

    return isProductInputMissing || isPerOptionInputMissing;
};
