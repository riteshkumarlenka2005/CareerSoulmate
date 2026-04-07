const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Centralized API client with auth headers, error handling, and response parsing.
 */
class ApiClient {
  static getToken(): string | null {
    return localStorage.getItem('careersoulmate-token');
  }

  static getHeaders(includeAuth = true): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = ApiClient.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  static async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ success: boolean; message: string; data: T; errors?: any[]; pagination?: any }> {
    const url = `${API_URL}${endpoint}`;

    const config: RequestInit = {
      headers: ApiClient.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);

      // Handle 401 — token expired
      if (response.status === 401) {
        localStorage.removeItem('careersoulmate-token');
        localStorage.removeItem('careersoulmate-user');
        // Don't redirect here — let the AuthContext handle it
      }

      const data = await response.json();

      if (!response.ok) {
        throw {
          status: response.status,
          message: data.message || 'Request failed',
          errors: data.errors || null,
        };
      }

      return data;
    } catch (error: any) {
      if (error.status) throw error;

      throw {
        status: 0,
        message: 'Network error. Please check your connection.',
        errors: null,
      };
    }
  }

  // ─── Convenience Methods ─────────────────────────────

  static get<T = any>(endpoint: string) {
    return ApiClient.request<T>(endpoint, { method: 'GET' });
  }

  static post<T = any>(endpoint: string, body?: any) {
    return ApiClient.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  static put<T = any>(endpoint: string, body?: any) {
    return ApiClient.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  static patch<T = any>(endpoint: string, body?: any) {
    return ApiClient.request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  static delete<T = any>(endpoint: string) {
    return ApiClient.request<T>(endpoint, { method: 'DELETE' });
  }
}

export default ApiClient;
export { API_URL };
