// import { filter, flatMap, head, isEmpty, pipe } from '@fxts/core';
// import { overlay } from 'overlay-kit';

// import { OptionSelectBottomSheetStyle as S } from '@/components/BottomSheet/OptionSelect/index.styled';
// import * as Input from '@/components/Common/Input';
// import BottomSheetLayout, {
//     DefaultBottomSheetProps,
// } from '@/components/Layout/BottomSheet';
// import ExtraInput from '@/components/Product/ExtraInput';
// import {
//     FlatProductOption,
//     MultiProductOption,
//     RequiredProductOption,
//     SelectedProductOption,
// } from '@/components/ProductOption';
// import { OVERLAY_ID } from '@/const/overlay';
// import useProduct from '@/hooks/product/useProduct';
// import useProductOption from '@/hooks/product/useProductOption';
// import useProductOptionChange from '@/hooks/product/useProductOptionChange';
// import { useResponsive } from '@/hooks/utils';

// interface OptionSelectBottomSheetProps extends DefaultBottomSheetProps {
//     productNo: number;
// }

// const OptionSelectBottomSheet = ({
//     productNo,
//     ...props
// }: OptionSelectBottomSheetProps) => {
//     const { isTablet } = useResponsive();

//     const { productDetailData } = useProduct({
//         productNo,
//     });

//     const {
//         isRequiredOptionUsed,
//         isFlatOptionUsed,
//         isMultiLevelOptionUsed,
//         getSelectedOptionValue,
//         textOptionInputs,
//         selectedOptionList,
//         productTextOptionInputs,
//         filteredSelectedOptionList,
//     } = useProductOption({
//         productNo,
//     });

//     const {
//         onFlatOptionChange,
//         onMultiOptionChange,
//         onRequiredOptionChange,
//         onOptionDeleteClick,
//         onMinusClick,
//         onPlusClick,
//         onChangeProductCount,
//         onInputOptionChange,
//     } = useProductOptionChange({
//         productNo,
//     });

//     const onOptionDeleteClickV2 = (optionNo: number) => {
//         onOptionDeleteClick(optionNo);
//     };

//     const onClose = () => {
//         overlay.closeAll();
//     };

//     const getInputOptionValue = (inputNo: number) => {
//         return pipe(
//             selectedOptionList,
//             flatMap((a) => a.optionInputs),
//             filter((c) => c && c.inputNo === inputNo),
//             head,
//             (d) => d?.inputValue || '',
//         );
//     };

//     return (
//         <BottomSheetLayout
//             {...props}
//             overlayId={OVERLAY_ID.OPTION_BOTTOM_SHEET}
//             isCloseButton={false}
//             bottom={0}
//             isUnmountCondition={!isTablet}
//             close={onClose}
//             footerButtonList={[<button></button>]}
//         >
//             <S.Container>
//                 <S.SelectOptionText>제품 옵션(필수)</S.SelectOptionText>
//                 <S.InnerContainer>
//                     <S.OptionContainer>
//                         {isFlatOptionUsed && (
//                             <FlatProductOption
//                                 productNo={productNo}
//                                 onChange={onFlatOptionChange}
//                             />
//                         )}

//                         {isMultiLevelOptionUsed && (
//                             <MultiProductOption
//                                 productNo={productNo}
//                                 onChange={onMultiOptionChange}
//                             />
//                         )}

//                         {isRequiredOptionUsed && (
//                             <RequiredProductOption
//                                 productNo={productNo}
//                                 onChange={onRequiredOptionChange}
//                             />
//                         )}

//                         <SelectedProductOption
//                             customProperties={
//                                 productDetailData?.baseInfo.customPropertise ||
//                                 []
//                             }
//                             selectedOptionList={filteredSelectedOptionList}
//                             onOptionDeleteClick={onOptionDeleteClickV2}
//                             onPlusClick={onPlusClick}
//                             onMinusClick={onMinusClick}
//                             onChangeProductCount={onChangeProductCount}
//                             getSelectedOptionValue={getSelectedOptionValue}
//                             textOptionList={textOptionInputs['OPTION']}
//                             onInputOptionChange={onInputOptionChange}
//                         />

//                         {!isEmpty(productTextOptionInputs) && (
//                             <S.TextOptionInputContainer>
//                                 {productTextOptionInputs.map(
//                                     ({ inputNo, inputLabel, required }) => {
//                                         return (
//                                             <Input.Container
//                                                 key={`text-option-input-product-${inputNo}`}
//                                             >
//                                                 <Input.Label
//                                                     isRequired={required}
//                                                 >
//                                                     {inputLabel}
//                                                 </Input.Label>
//                                                 <Input.Field
//                                                     type='text'
//                                                     required={required}
//                                                     data-input-no={inputNo}
//                                                     data-input-label={
//                                                         inputLabel
//                                                     }
//                                                     data-product-no={productNo}
//                                                     placeholder={`${inputLabel}을 입력해주세요.`}
//                                                     defaultValue={getInputOptionValue(
//                                                         inputNo,
//                                                     )}
//                                                     onBlur={onInputOptionChange}
//                                                 />
//                                             </Input.Container>
//                                         );
//                                     },
//                                 )}
//                             </S.TextOptionInputContainer>
//                         )}

//                         <ExtraInput />
//                     </S.OptionContainer>
//                 </S.InnerContainer>
//             </S.Container>
//             <div
//                 style={{
//                     width: '100%',
//                     height: '100px',
//                 }}
//             />
//         </BottomSheetLayout>
//     );
// };

// export default OptionSelectBottomSheet;
