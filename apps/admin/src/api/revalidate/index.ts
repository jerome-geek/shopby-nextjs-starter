const webBaseUrl = import.meta.env.VITE_WEB_BASE_URL as string;
const revalidateToken = import.meta.env.VITE_REVALIDATE_TOKEN as string;

export const revalidatePath = async (path: string): Promise<void> => {
    const res = await fetch(
        `${webBaseUrl}/api/revalidate?path=${encodeURIComponent(path)}`,
        {
            headers: { 'x-revalidate-token': revalidateToken },
        },
    );

    if (!res.ok) {
        throw new Error(`revalidation failed (${res.status}): ${path}`);
    }
};
