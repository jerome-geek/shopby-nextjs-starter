export const CURRENCY = (value: number, options?: { precision?: number }) => {
    const val = value;
    return {
        subtract: (amt: number) => CURRENCY(val - amt, options),
        format: () => val.toLocaleString('ko-KR') + '원',
    };
};
