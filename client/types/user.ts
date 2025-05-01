export interface CreateUserRequest {
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  handle?: string;
  bio?: string;
  profile_image_url?: string;
  layout_version?: string;
  custom_domain?: string;
  is_premium?: boolean;
  is_admin?: boolean;
  onboarded?: boolean;
}

export interface UserResponse {
  id: string;
  username: string;
  handle?: string;
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
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  profile_image_url?: string;
  layout_version?: string;
  custom_domain?: string;
}

export interface UpdateHandleRequest {
  handle: string;
}

export interface UpdatePremiumStatusRequest {
  is_premium: boolean;
}

export interface UpdateAdminStatusRequest {
  is_admin: boolean;
}

export interface UpdateOnboardedStatusRequest {
  onboarded: boolean;
}
