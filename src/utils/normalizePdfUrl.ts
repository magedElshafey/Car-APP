/**
 * Temporary fix for malformed PDF URLs coming from backend
 * Example:
 * https://domain.com//storage/file.pdf
 * →
 * https://domain.com/storage/file.pdf
 */
export const normalizePdfUrl = (url?: string | null): string | null => {
    if (!url) return null;

    return url.replace(/([^:]\/)\/+/g, "$1");
};
