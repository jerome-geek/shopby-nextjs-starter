import { flatMap, pipe, some } from '@fxts/core';

import { isRequiredInputOptionMissing } from '@/helpers/product';
import { useProduct, useProductOption } from '@/hooks/product';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/ui';

type AddToCartFailCode =
    | 'CANNOT_ADD_TO_CART'
    | 'NO_OPTIONS'
    | 'SOLD_OUT'
    | 'REQUIRED_NOT_SELECTED'
    | 'REQUIRED_TEXT_OPTION_NOT_ENTERED';

type OrderFailCode =
    | 'MEMBER_ONLY'
    | 'NO_OPTIONS'
    | 'SOLD_OUT'
    | 'REQUIRED_NOT_SELECTED'
    | 'REQUIRED_TEXT_OPTION_NOT_ENTERED';

type ValidateResponse<T> = { status: true } | { status: false; reason: T };
type ValidateAddToCartResponse = ValidateResponse<AddToCartFailCode>;
type ValidateOrderResponse = ValidateResponse<OrderFailCode>;

const useOrderActionValidation = ({ productNo }: { productNo: number }) => {
    const isLogin = useAuth();
    const { addToast } = useToast();

    const { isSoldOut, productDetailData } = useProduct({ productNo });
    const { textOptionRequiredInfoList, selectedOptionList } = useProductOption(
        {
            productNo,
        },
    );

    const isTextOptionInvalid = () => {
        return textOptionRequiredInfoList.some((a) => {
            const filteredSelectedOptionList = selectedOptionList.filter(
                (b) => b.productNo === a.productNo,
            );

            return (
                a.isTextOptionRequired &&
                pipe(
                    filteredSelectedOptionList,
                    flatMap((a) => a.optionInputs || []),
                    some(isRequiredInputOptionMissing),
                )
            );
        });
    };

    const validateAddToCart = (): ValidateAddToCartResponse => {
        if (!productDetailData?.limitations.canAddToCart) {
            return { status: false, reason: 'CANNOT_ADD_TO_CART' };
        }

        if (selectedOptionList.length <= 0) {
            return { status: false, reason: 'NO_OPTIONS' };
        }

        if (isSoldOut) {
            return { status: false, reason: 'SOLD_OUT' };
        }

        if (isTextOptionInvalid()) {
            return {
                status: false,
                reason: 'REQUIRED_TEXT_OPTION_NOT_ENTERED',
            };
        }

        return { status: true };
    };

    const ensureAddToCart = () => {
        const response = validateAddToCart();

        if (response.status) {
            return true;
        }

        switch (response.reason) {
            case 'CANNOT_ADD_TO_CART':
                addToast({
                    message: '장바구니 담기가 불가능한 상품입니다.',
                    variant: 'error',
                });
                break;
            case 'NO_OPTIONS':
                addToast({
                    message: '옵션을 선택해주세요.',
                    variant: 'error',
                });
                break;
            case 'SOLD_OUT':
                addToast({
                    message: '품절 상품은 장바구니에 담을 수 없습니다.',
                    variant: 'error',
                });
                break;
            case 'REQUIRED_NOT_SELECTED':
                addToast({
                    message: '필수 옵션을 선택해주세요.',
                    variant: 'error',
                });
                break;
            case 'REQUIRED_TEXT_OPTION_NOT_ENTERED':
                addToast({
                    message: '필수 텍스트옵션을 입력해주세요.',
                    variant: 'error',
                });
                break;
        }
        return false;
    };

    const validateCheckout = (): ValidateOrderResponse => {
        if (productDetailData?.limitations.memberOnly && !isLogin) {
            return { status: false, reason: 'MEMBER_ONLY' };
        }

        if (selectedOptionList.length <= 0) {
            return { status: false, reason: 'NO_OPTIONS' };
        }

        if (isSoldOut) {
            return { status: false, reason: 'SOLD_OUT' };
        }

        if (isTextOptionInvalid()) {
            return {
                status: false,
                reason: 'REQUIRED_TEXT_OPTION_NOT_ENTERED',
            };
        }

        return { status: true };
    };

    const ensureOrder = () => {
        const response = validateCheckout();

        if (response.status) {
            return true;
        }

        switch (response.reason) {
            case 'MEMBER_ONLY':
                addToast({
                    message: '비회원은 구매할 수 없습니다.',
                    variant: 'error',
                });
                break;
            case 'NO_OPTIONS':
                addToast({
                    message: '옵션을 선택해주세요.',
                    variant: 'error',
                });
                break;
            case 'SOLD_OUT':
                addToast({
                    message: '품절 상품은 구매할 수 없습니다.',
                    variant: 'error',
                });
                break;
            case 'REQUIRED_NOT_SELECTED':
                addToast({
                    message: '필수 옵션을 선택해주세요.',
                    variant: 'error',
                });
                break;
            case 'REQUIRED_TEXT_OPTION_NOT_ENTERED':
                addToast({
                    message: '필수 텍스트옵션을 입력해주세요.',
                    variant: 'error',
                });
                break;
        }
        return false;
    };

    return { ensureAddToCart, ensureOrder };
};

export default useOrderActionValidation;
