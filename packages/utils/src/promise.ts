/**
 * Promise의 결과를 [error, data] 튜플 형태로 반환하는 유틸리티 함수입니다.
 * Go 언어의 에러 핸들링 스타일을 TypeScript에서 구현하여 try-catch 지옥을 방지합니다.
 *
 * @param promise - 처리할 Promise 객체
 * @param errorsToCatch - 선택사항. 특정 에러 타입만 캐치하고 싶을 때 배열로 전달
 * @returns [undefined, T] (성공 시) 또는 [Error] (실패 시)
 */
export const catchErrorTyped = <T, E extends new (message?: string) => Error>(
    promise: Promise<T>,
    errorsToCatch?: E[],
): Promise<[undefined, T] | [InstanceType<E>]> => {
    return promise
        .then((data) => {
            return [undefined, data] as [undefined, T];
        })
        .catch((error) => {
            if (errorsToCatch === undefined) {
                return [error];
            }

            if (errorsToCatch.some((e) => error instanceof e)) {
                return [error];
            }

            throw error;
        });
};
