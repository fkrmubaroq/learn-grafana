/**
 * Utility functions untuk handle localStorage username dan userId
 */

const USERNAME_KEY = 'calmlogs_username';
const USER_ID_KEY = 'calmlogs_userId';

/**
 * Generate random string untuk userId
 */
function generateUserId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Simpan username dan userId ke localStorage
 */
export function saveUser(username: string, userId?: string): void {
  const finalUserId = userId || generateUserId();
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(USER_ID_KEY, finalUserId);
}

/**
 * Ambil username dari localStorage
 */
export function getUsername(): string | null {
  return localStorage.getItem(USERNAME_KEY);
}

/**
 * Ambil userId dari localStorage
 */
export function getUserId(): string | null {
  return localStorage.getItem(USER_ID_KEY);
}

/**
 * Check apakah user sudah terdaftar (ada username dan userId)
 */
export function isUserRegistered(): boolean {
  return getUsername() !== null && getUserId() !== null;
}

/**
 * Hapus data user dari localStorage
 */
export function clearUser(): void {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(USER_ID_KEY);
}
