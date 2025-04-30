export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface ApiSuccessResponse<T> {
  success: true;
  message?: string;
  data: T;
  meta?: PaginationMeta;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  code?: string;
  details?: any;
}

export interface PaginationMeta {
  current_page: number;
  total_pages: number;
  per_page: number;
  total_records: number;
}
