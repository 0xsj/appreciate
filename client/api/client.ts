import axios, { AxiosError } from 'axios';
import { ApiResult, ApiError } from '@/types/api';

/**
 * Interface for API error response
 */
interface ApiErrorResponse {
  message?: string;
  code?: string;
  details?: {
    entity?: string;
    id?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  }

  /**
   * Transform HTTP errors to ApiError
   */
  private handleAxiosError(error: AxiosError): ApiError {
    if (!error.response) {
      return ApiError.network('Network error or server not responding');
    }

    const status = error.response.status;
    const data = error.response.data as unknown as ApiErrorResponse;
    const message = data?.message || error.message;

    switch (status) {
      case 400:
        return ApiError.badRequest(message, {
          context: data?.details || {},
          source: error,
        });
      case 401:
        return ApiError.unauthorized(message, { source: error });
      case 403:
        return ApiError.forbidden(message, { source: error });
      case 404:
        return ApiError.notFound(
          data?.details?.entity || 'Resource',
          data?.details?.id || 'unknown',
          error
        );
      case 409:
        return ApiError.conflict(message, {
          context: data?.details || {},
          source: error,
        });
      default:
        return ApiError.internalServer(message, { source: error });
    }
  }

  /**
   * Generic request method returning ApiResult
   */
  async request<T>(config: {
    method: string;
    path: string;
    data?: unknown;
    params?: Record<string, string>;
  }): Promise<ApiResult<T>> {
    try {
      const { method, path, data, params } = config;

      // Get token from localStorage in client-side code
      // Use Record<string, string> to allow dynamic property assignment
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };

      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      }

      const response = await axios({
        method,
        url: `${this.baseURL}${path}`,
        data,
        params,
        headers,
      });

      return { kind: 'success', data: response.data.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          kind: 'error',
          error: this.handleAxiosError(error),
        };
      }

      return {
        kind: 'error',
        error: ApiError.internalServer(error instanceof Error ? error.message : 'Unknown error', {
          source: error instanceof Error ? error : undefined,
        }),
      };
    }
  }

  /**
   * Type-safe convenience methods
   */
  async get<T>(path: string, params?: Record<string, string>): Promise<ApiResult<T>> {
    return this.request<T>({ method: 'GET', path, params });
  }

  async post<T>(path: string, data?: unknown): Promise<ApiResult<T>> {
    return this.request<T>({ method: 'POST', path, data });
  }

  async put<T>(path: string, data?: unknown): Promise<ApiResult<T>> {
    return this.request<T>({ method: 'PUT', path, data });
  }

  async patch<T>(path: string, data?: unknown): Promise<ApiResult<T>> {
    return this.request<T>({ method: 'PATCH', path, data });
  }

  async delete<T>(path: string): Promise<ApiResult<T>> {
    return this.request<T>({ method: 'DELETE', path });
  }
}

// Export a singleton instance
export const apiClient = new ApiClient();
