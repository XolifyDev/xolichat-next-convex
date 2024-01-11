/**
 * An array of routes that do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = [
    '/',
    '/auth/login',
    '/auth/register',
]

/**
 * An array of routes that require authentication.
 * @type {string[]}
 */
export const authRoutes = [
    "/needauth"
]

export const apiAuthPrefix = '/api/auth'

export const DEFAULT_LOGIN_REDIRECT = "/settings";