import type {
  ApiBlog,
  ApiProject,
  ApiProperty,
  ApiRealisation,
  ApiResponse,
  ContactPayload,
  AdminDashboard,
  LoginPayload,
  LoginResponse,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  token?: string;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const payload = (await response.json().catch(() => null)) as
    | ApiResponse<T>
    | null;

  if (!response.ok || !payload?.success) {
    throw new ApiError(
      payload?.message || `API request failed: ${path}`,
      response.status,
    );
  }

  return payload.data;
}

export const api = {
  login(payload: LoginPayload) {
    return request<LoginResponse>("/auth/login", {
      method: "POST",
      body: payload,
    });
  },

  me(token: string) {
    return request("/auth/me", { token });
  },

  getAdminDashboard(token: string) {
    return request<AdminDashboard>("/admin/dashboard", { token });
  },

  getAdminCollection<T>(path: string, token: string) {
    return request<T[]>(path, { token });
  },

  createAdminRecord<T>(path: string, token: string, body: unknown) {
    return request<T>(path, { method: "POST", token, body });
  },

  updateAdminRecord<T>(path: string, token: string, body: unknown) {
    return request<T>(path, { method: "PUT", token, body });
  },

  deleteAdminRecord(path: string, token: string) {
    return request<{ message?: string }>(path, { method: "DELETE", token });
  },

  getProperties() {
    return request<ApiProperty[]>("/properties", {
      next: { revalidate: 300 },
    });
  },

  getProperty(id: string) {
    return request<ApiProperty>(`/properties/${id}`, {
      next: { revalidate: 300 },
    });
  },

  getProjects() {
    return request<ApiProject[]>("/projects", {
      next: { revalidate: 300 },
    });
  },

  getProject(id: string) {
    return request<ApiProject>(`/projects/${id}`, {
      next: { revalidate: 300 },
    });
  },

  getRealisations() {
    return request<ApiRealisation[]>("/realisations", {
      next: { revalidate: 300 },
    });
  },

  getRealisation(id: string) {
    return request<ApiRealisation>(`/realisations/${id}`, {
      next: { revalidate: 300 },
    });
  },

  getBlogs() {
    return request<ApiBlog[]>("/blogs", {
      next: { revalidate: 300 },
    });
  },

  getBlogBySlug(slug: string) {
    return request<ApiBlog>(`/blogs/slug/${slug}`, {
      next: { revalidate: 300 },
    });
  },

  createContact(payload: ContactPayload) {
    return request<{ id: string }>("/contacts", {
      method: "POST",
      body: payload,
    });
  },
};

export async function safeApi<T>(
  loader: () => Promise<T>,
  fallback: T,
): Promise<T> {
  try {
    const data = await loader();
    if (Array.isArray(data) && data.length === 0) return fallback;
    return data;
  } catch {
    return fallback;
  }
}
