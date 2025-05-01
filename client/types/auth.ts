import { UserResponse } from './user';

export interface RegisterRequest {
  username: string;
  handle: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  profile_image_url?: string;
  layout_version?: string;
  custom_domain?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  email: string;
  new_password: string;
  confirm_password: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface LogoutRequest {
  user_id: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: UserResponse;
}

/**
 * Password validation result
 */
export interface PasswordValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Password validation helper
 */
export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/[^a-zA-Z0-9]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Utility function to store auth data in local storage
 */
export function storeAuthData(authResponse: AuthResponse): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', authResponse.access_token);
    localStorage.setItem('refreshToken', authResponse.refresh_token);
    localStorage.setItem('tokenExpiry', authResponse.expires_at.toString());
    localStorage.setItem('user', JSON.stringify(authResponse.user));
  }
}

/**
 * Utility function to clear auth data from local storage
 */
export function clearAuthData(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('user');
  }
}

/**
 * Utility function to check if user is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const token = localStorage.getItem('accessToken');
  const expiry = localStorage.getItem('tokenExpiry');

  if (!token || !expiry) {
    return false;
  }

  return Date.now() < parseInt(expiry, 10);
}

/**
 * Utility function to get current user profile
 */
export function getCurrentUser(): UserResponse | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const userJson = localStorage.getItem('user');

  if (!userJson) {
    return null;
  }

  try {
    return JSON.parse(userJson) as UserResponse;
  } catch {
    // Ignore parsing errors and return null
    return null;
  }
}
