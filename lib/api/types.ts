export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

export type ApiProperty = {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  bedrooms?: number | null;
  bathrooms?: number | null;
  area?: number | null;
  imageUrl?: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiProject = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  category?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ApiRealisation = {
  id: string;
  title: string;
  slug: string;
  client?: string | null;
  location?: string | null;
  completionDate?: string | null;
  imageUrl?: string | null;
  gallery: string[];
  description: string;
  servicesUsed: string[];
  published: boolean;
  featured: boolean;
  metaTitle?: string | null;
  metaDescription?: string | null;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ApiBlog = {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "EDITOR" | string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: AuthUser;
  token: string;
};

export type AdminDashboard = {
  widgets: {
    totalProjects: number;
    totalProperties: number;
    totalBlogs: number;
    totalMessages: number;
    websiteVisitors: number;
  };
  recentContacts: Array<Record<string, unknown>>;
  recentProjects: Array<Record<string, unknown>>;
  recentBlogs: Array<Record<string, unknown>>;
  latestActivity: Array<Record<string, unknown>>;
  charts: {
    projectsPerMonth: Array<Record<string, unknown>>;
    contactsPerMonth: Array<Record<string, unknown>>;
  };
};
