// lib/api.ts

export interface ApiRequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Make an API request with automatic error handling and token
 */
export async function apiCall<T = unknown>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const url = `${baseUrl}${endpoint}`;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: 'include', // Include cookies
  });

  // Handle unauthorized - could trigger logout here
  if (response.status === 401) {
    // In a real app, trigger logout here
    if (typeof window !== 'undefined') {
      // Client-side: redirect to login
      window.location.href = '/login';
    }
  }

  const data = await response.json();

  if (!response.ok) {
    const errorMessage =
      data.error ||
      data.message ||
      `API Error: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }

  return data as T;
}

/**
 * GET request
 */
export function apiGet<T = unknown>(
  endpoint: string,
  options?: ApiRequestOptions
): Promise<T> {
  return apiCall<T>(endpoint, {
    ...options,
    method: 'GET',
  });
}

/**
 * POST request
 */
export function apiPost<T = unknown>(
  endpoint: string,
  body?: unknown,
  options?: ApiRequestOptions
): Promise<T> {
  return apiCall<T>(endpoint, {
    ...options,
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * PUT request
 */
export function apiPut<T = unknown>(
  endpoint: string,
  body?: unknown,
  options?: ApiRequestOptions
): Promise<T> {
  return apiCall<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * DELETE request
 */
export function apiDelete<T = unknown>(
  endpoint: string,
  options?: ApiRequestOptions
): Promise<T> {
  return apiCall<T>(endpoint, {
    ...options,
    method: 'DELETE',
  });
}
