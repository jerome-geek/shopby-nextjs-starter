export const DEFAULT_API_RETRY_BACKOFF_LIMIT = 3 * 1000;
export const DEFAULT_API_RETRY_LIMIT = 4;
export const DEFAULT_API_TIMEOUT = 10 * 1000;

export const defaultHeaders = () => {
    return {};
};

export const logOnDev = (message: string, color?: string) => {
    console.log(
        `%c${message}`,
        `color: ${color || 'orange'}; font-weight:bold;`,
    );
};
