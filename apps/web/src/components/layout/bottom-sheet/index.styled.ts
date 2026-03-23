// import { motion } from 'motion/react';
// import styled from 'styled-components';

// import { fontSize, fontWeight } from '@/styles/mixin';

// const Dimmed = styled(motion.div)`
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: ${(props) => props.theme.black};
// `;
// const BottomSheetContainer = styled(motion.div)<{
//     $type: 'partial' | 'fullscreen';
// }>`
//     position: fixed;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     display: flex;
//     flex-direction: column;
//     background-color: white;
//     height: ${({ $type }) =>
//         $type === 'fullscreen' ? 'calc(var(--vh, 1vh) * 100)' : 'auto'};
//     border-radius: ${({ $type }) =>
//         $type === 'fullscreen' ? '0' : 'var(--radius-12) var(--radius-12) 0 0'};
//     padding: 0;

//     ::-webkit-scrollbar {
//         width: 6px;
//     }

//     ::-webkit-scrollbar-thumb {
//         background-color: ${(props) => props.theme.tailwindGray300};
//         border-radius: var(--spacing-999);
//     }

//     ::-webkit-scrollbar-track {
//         background-color: ${(props) => props.theme.tailwindGray100};
//     }
// `;

// const BottomSheetHeader = styled.div`
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 24px 20px 24px;

//     h4 {
//         ${fontSize(18)};
//         ${fontWeight.medium};
//     }
// `;

// const NoTitleCloseButton = styled.button`
//     width: 100%;
//     margin: 8px auto 12px;

//     > span {
//         width: 56px;
//         height: 4px;
//         border-radius: 999px;
//         background-color: #dddddd;
//     }
// `;

// const BottomSheetContent = styled.div<{
//     $isHeader: boolean;
//     $isFooter: boolean;
// }>`
//     flex: 1;
//     overflow-y: auto;
//     overflow-x: hidden;
//     max-height: ${({ $isHeader, $isFooter }) =>
//         $isHeader && $isFooter
//             ? 'calc(100% - 116px)'
//             : $isHeader
//               ? 'calc(100% - 44px)'
//               : '100%'};
//     padding: 0 20px 20px;
// `;

// const BottomSheetFooter = styled.div`
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     padding: 12px 20px 20px;
//     border-top: 1px solid ${(props) => props.theme.tailwindGray100};

//     button {
//         flex: 1;
//         ${fontSize(14)};
//     }
// `;

// export const BottomSheetStyle = {
//     Dimmed,
//     BottomSheetContainer,
//     BottomSheetHeader,
//     NoTitleCloseButton,
//     BottomSheetContent,
//     BottomSheetFooter,
// };
