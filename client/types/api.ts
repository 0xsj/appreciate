export type ApiErrorKind =
  | 'bad_request'
  | 'unauthorized'
  | 'forbidden'
  | 'not_found'
  | 'conflict'
  | 'internal_server'
  | 'network';

export class ApiError extends Error {
  public readonly context?: Record<string, unknown>;
  public readonly source?: Error;

  private constructor(
    public readonly kind: ApiErrorKind,
    message: string,
    options?: {
      context?: Record<string, unknown>;
      source?: Error;
    }
  ) {
    super(message);
    this.context = options?.context;
    this.source = options?.source;
    this.name = 'ApiError';
  }

  static badRequest(
    message: string,
    options?: {
      context?: Record<string, unknown>;
      source?: Error;
    }
  ): ApiError {
    return new ApiError('bad_request', message, options);
  }

  static unauthorized(
    message: string = 'Authentication required',
    options?: {
      context?: Record<string, unknown>;
      source?: Error;
    }
  ): ApiError {
    return new ApiError('unauthorized', message, options);
  }

  static forbidden(
    message: string = 'Access denied',
    options?: {
      context?: Record<string, unknown>;
      source?: Error;
    }
  ): ApiError {
    return new ApiError('forbidden', message, options);
  }

  static notFound(entity: string, id: string, source?: Error): ApiError {
    return new ApiError('not_found', `${entity} not found: ${id}`, {
      context: { entity, id },
      source,
    });
  }

  static conflict(
    message: string,
    options?: {
      context?: Record<string, unknown>;
      source?: Error;
    }
  ): ApiError {
    return new ApiError('conflict', message, options);
  }

  static internalServer(
    message: string = 'Internal server error',
    options?: {
      context?: Record<string, unknown>;
      source?: Error;
    }
  ): ApiError {
    return new ApiError('internal_server', message, options);
  }

  static network(
    message: string = 'Network error',
    options?: {
      context?: Record<string, unknown>;
      source?: Error;
    }
  ): ApiError {
    return new ApiError('network', message, options);
  }

  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      kind: this.kind,
      message: this.message,
      context: this.context,
      source: this.source ? this.source.message : undefined,
      stack: this.stack,
    };
  }
}

export type ApiResult<T> = { kind: 'success'; data: T } | { kind: 'error'; error: ApiError };
