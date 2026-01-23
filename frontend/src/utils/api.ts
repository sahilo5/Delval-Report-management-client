const BASE_URL = "http://localhost:8080/api";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions extends RequestInit {
    headers?: Record<string, string>;
}

class ApiClient {
    private async request<T>(endpoint: string, method: RequestMethod, data?: unknown, options: RequestOptions = {}): Promise<T> {
        const token = localStorage.getItem("accessToken");

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            ...options.headers,
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const config: RequestInit = {
            method,
            headers,
            ...options,
        };

        if (data) {
            config.body = JSON.stringify(data);
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, config);

        if (!response.ok) {
            // Try to parse error message from JSON, fallback to status text
            let errorMessage = `Error: ${response.status} ${response.statusText}`;
            try {
                const errorData = await response.json();
                if (errorData && errorData.message) {
                    errorMessage = errorData.message;
                }
            } catch (e) {
                // Ignore JSON parse error
            }
            throw new Error(errorMessage);
        }

        // Handle 204 No Content
        if (response.status === 204) {
            return {} as T;
        }

        return response.json();
    }

    get<T>(endpoint: string, options?: RequestOptions) {
        return this.request<T>(endpoint, "GET", undefined, options);
    }

    post<T>(endpoint: string, data: unknown, options?: RequestOptions) {
        return this.request<T>(endpoint, "POST", data, options);
    }

    put<T>(endpoint: string, data: unknown, options?: RequestOptions) {
        return this.request<T>(endpoint, "PUT", data, options);
    }

    delete<T>(endpoint: string, options?: RequestOptions) {
        return this.request<T>(endpoint, "DELETE", undefined, options);
    }
}

export const api = new ApiClient();
