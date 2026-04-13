// import styled from 'styled-components';

// import DefaultButton from '@/components/Common/Button/DefaultButton';
// import { fontSize, fontWeight } from '@/styles/mixin';
// import { theme } from '@/styles/theme';

// const Container = styled.div`
//     display: flex;
//     flex-direction: column;
//     gap: 8px;
//     height: 100%;
// `;

// const InnerContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     gap: 12px;
// `;

// const OptionContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     gap: 20px;
// `;

// const TextOptionInputContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     gap: 12px;
// `;

// const CloseButton = styled.button`
//     width: 56px;
//     height: 4px;
//     border-radius: 999px;
//     background-color: ${({ theme }) => theme.gray500};
//     opacity: 0.4;
// `;

// const RestockButton = styled(DefaultButton)`
//     width: fit-content;
//     height: 26px;
//     ${fontSize(12)};
//     background-color: ${theme.black};
//     color: ${theme.white};
//     margin-left: auto;
//     border-radius: 0;
// `;

// const SelectOptionText = styled.p`
//     ${fontSize(14)}
//     color: ${({ theme }) => theme.accentForeground};
// `;

// const ButtonContainer = styled.div`
//     display: flex;
//     gap: 8px;
//     width: 100%;

//     > button {
//         flex: 1;
//     }
// `;

// const TotalPriceContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 8px;
//     margin-top: 4px;
//     margin-bottom: 20px;
// `;

// const TotalPriceInnerContainer = styled.div`
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     width: 100%;
// `;

// const DeliveryPriceLabel = styled.label`
//     ${fontSize(14)};
//     line-height: 20px;
//     ${fontWeight.medium};
//     color: ${({ theme }) => theme.accentForeground};
// `;

// const DeliveryPriceText = styled.p`
//     ${fontSize(14)};
//     line-height: 20px;
//     ${fontWeight.medium};
//     color: ${({ theme }) => theme.accentForeground};
// `;

// const PriceLabel = styled.label`
//     ${fontSize(16)};
//     line-height: 20px;
//     ${fontWeight.medium};
// `;

// export const OptionSelectBottomSheetStyle = {
//     Container,
//     InnerContainer,
//     OptionContainer,
//     TextOptionInputContainer,
//     CloseButton,
//     RestockButton,
//     SelectOptionText,
//     ButtonContainer,
//     TotalPriceContainer,
//     TotalPriceInnerContainer,
//     DeliveryPriceLabel,
//     DeliveryPriceText,
//     PriceLabel,
// };
