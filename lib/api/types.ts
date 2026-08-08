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
  category?: string | null;
  categoryLabel?: string | null;
  year?: number | null;
  client?: string | null;
  location?: string | null;
  completionDate?: string | null;
  imageUrl?: string | null;
  gallery: string[];
  description: string;
  surface?: string | null;
  surfaceValue?: number | null;
  levels?: string | null;
  budget?: string | null;
  result?: string | null;
  color?: string | null;
  servicesUsed: string[];
  technicalTags: string[];
  features: string[];
  published: boolean;
  featured: boolean;
  displayOrder?: number | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  metrics?: Array<{
    id?: string;
    label: string;
    value: string;
    displayOrder?: number | null;
  }>;
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

export type HomepageStatus = "DRAFT" | "PUBLISHED";

export type OrderedItem = {
  order?: number;
};

export type HomepageContent = {
  status: HomepageStatus;
  hero: {
    badge: string;
    eyebrow: string;
    titlePrefix: string;
    titleSuffix: string;
    highlightedTitle: string;
    description: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    mediaUrl?: string;
    mediaAlt?: string;
    stats: Array<OrderedItem & { value: string; label: string }>;
  };
  whatsapp: {
    href: string;
    label: string;
    detail: string;
  };
  expertise: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    services: Array<OrderedItem & { icon: string; title: string; description: string }>;
  };
  portfolio: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    ctaLabel: string;
    ctaHref: string;
    projects: Array<OrderedItem & { tag: string; name: string; location: string; featured?: boolean }>;
  };
  about: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    highlightedTitle: string;
    description: string;
    values: Array<OrderedItem & { text: string }>;
    stats: Array<OrderedItem & { value: string; label: string; detail: string }>;
  };
  process: {
    eyebrow: string;
    title: string;
    steps: Array<OrderedItem & { number: string; firstLine: string; secondLine: string }>;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    items: Array<OrderedItem & { initials: string; name: string; role: string; quote: string }>;
  };
  blog: {
    eyebrow: string;
    title: string;
    posts: Array<OrderedItem & { icon: string; category: string; title: string; date: string }>;
  };
  finalCta: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    highlightedTitle: string;
    description: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
};

export type AdminHomepageContent = {
  draft: HomepageContent;
  published: HomepageContent | null;
  updatedAt: string | null;
};

export type ApiServiceCard = OrderedItem & {
  id?: string;
  icon?: string | null;
  title: string;
  description: string;
  tags: string[];
  displayOrder?: number;
};

export type ApiServiceFeature = OrderedItem & {
  id?: string;
  text: string;
  displayOrder?: number;
};

export type ApiServiceProcessStep = OrderedItem & {
  id?: string;
  number: string;
  firstLine: string;
  secondLine: string;
  displayOrder?: number;
};

export type ApiServiceFaq = OrderedItem & {
  id?: string;
  question: string;
  answer: string;
  displayOrder?: number;
};

export type ApiServicePricingPlan = OrderedItem & {
  id?: string;
  name: string;
  price: string;
  note?: string | null;
  features: string[];
  featured?: boolean;
  displayOrder?: number;
};

export type ApiServicePricingRow = OrderedItem & {
  id?: string;
  item: string;
  price: string;
  duration: string;
  highlighted?: boolean;
  displayOrder?: number;
};

export type ApiServiceTestimonial = OrderedItem & {
  id?: string;
  quote: string;
  name: string;
  role: string;
  displayOrder?: number;
};

export type ApiServiceEngagement = OrderedItem & {
  id?: string;
  icon?: string | null;
  title: string;
  description: string;
  displayOrder?: number;
};

export type ApiService = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string | null;
  category?: string | null;
  tabId?: string | null;
  tabLabel?: string | null;
  eyebrow?: string | null;
  heroTitle?: string | null;
  heroHighlight?: string | null;
  featuredLabel?: string | null;
  featuredTitle?: string | null;
  featuredCtaLabel?: string | null;
  featuredCtaHref?: string | null;
  processTitle?: string | null;
  faqTitle?: string | null;
  ctaTitle?: string | null;
  ctaSubtitle?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  pricingNote?: string | null;
  priceTableHeaders: string[];
  showTestimonials?: boolean;
  showEngagements?: boolean;
  icon?: string | null;
  imageUrl?: string | null;
  gallery: string[];
  displayOrder?: number;
  published?: boolean;
  metaTitle?: string | null;
  metaDescription?: string | null;
  createdAt?: string;
  updatedAt?: string;
  cards: ApiServiceCard[];
  features: ApiServiceFeature[];
  processSteps: ApiServiceProcessStep[];
  faqs: ApiServiceFaq[];
  pricingPlans: ApiServicePricingPlan[];
  pricingRows: ApiServicePricingRow[];
  testimonials: ApiServiceTestimonial[];
  engagements: ApiServiceEngagement[];
};

export type ServicePageSettings = {
  hero: {
    eyebrow: string;
    titleBeforeHighlight: string;
    highlightedTitle: string;
    titleAfterHighlight: string;
    description: string;
  };
  stats: Array<OrderedItem & { value: string; label: string; displayOrder?: number }>;
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
    totalServices: number;
    totalProjects: number;
    totalRealisations: number;
    totalProperties: number;
    publishedBlogPosts: number;
    unreadContactMessages: number;
  };
  recentContacts: Array<Record<string, unknown>>;
  recentProjects: Array<Record<string, unknown>>;
  recentRealisations: Array<Record<string, unknown>>;
  recentUploads: Array<Record<string, unknown>>;
  recentBlogs: Array<Record<string, unknown>>;
  latestActivity: Array<Record<string, unknown>>;
};
