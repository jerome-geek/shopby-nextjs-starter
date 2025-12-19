export const generateCSRFToken = (): string => {
    const array = new Uint8Array(32); // 256비트
    window.crypto.getRandomValues(array); // CSPRNG 사용
    return btoa(String.fromCharCode(...array)); // base64 인코딩
};
