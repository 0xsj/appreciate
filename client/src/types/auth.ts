export interface User {
  id: string;
  username: string;
  handle: string;
  email: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  profile_image_url?: string;
  layout_version?: string;
  custom_domain?: string;
  is_premium: boolean;
  is_admin: boolean;
  onboarded: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

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

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: User;
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
