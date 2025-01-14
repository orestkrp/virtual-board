export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const secretKey = process.env.NEXT_PUBLIC_SESSION_SECRET_KEY!;
export const encodedKey = new TextEncoder().encode(secretKey);
