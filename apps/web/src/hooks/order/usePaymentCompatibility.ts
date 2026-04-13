// import { filter, flatMap, includes, pipe, toArray } from '@fxts/core';
// import { useCallback } from 'react';

// import { useOrderSheet } from '@/hooks/suspenseQuery/orderSheet';
// import { PayType, PgType } from '@/models';

// type PaymentValidationResult =
//     | { ok: true; message?: never }
//     | { ok: false; message: string };

// const usePaymentCompatibility = (orderSheetNo: string) => {
//     const { data: orderSheetData } = useOrderSheet({
//         orderSheetNo,
//         searchParams: {
//             includeMemberAddress: true,
//         },
//     });

//     /**
//      * 결제 직전 payType과 pgType이 맞는지 검증
//      *  - 주문시 payType과 pgType이 맞지 않아도 주문이 되는 경우가 있어 추가
//      */
//     const validatePayment = useCallback(
//         (
//             selectedPayType: PayType,
//             selectedPgType: PgType,
//         ): PaymentValidationResult => {
//             const targetPgTypeList = pipe(
//                 orderSheetData.availablePayTypes,
//                 filter((a) => a.payType === selectedPayType),
//                 flatMap((b) => b.pgTypes),
//                 toArray,
//             );

//             if (targetPgTypeList.length === 0) {
//                 return { ok: false, message: '유효하지 않은 결제 수단입니다.' };
//             }

//             // 해당 결제수단에 허용된 PG 리스트에 포함되는지 확인
//             const isSupported = includes(selectedPgType, targetPgTypeList);

//             if (!isSupported) {
//                 return {
//                     ok: false,
//                     message:
//                         '선택하신 결제 수단과<br/>PG의 조합이 올바르지 않습니다.',
//                 };
//             }

//             return { ok: true };
//         },
//         [orderSheetData], // orderSheetData가 변경될 때만 함수 재생성
//     );
//     return { validatePayment };
// };

// export default usePaymentCompatibility;
