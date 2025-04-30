export const isProd = process.env.NODE_ENV == 'production' ? true : false;
export const hideLogin = process.env.NEXT_PUBLIC_API_HIDELOGIN == "true" ? true : false;