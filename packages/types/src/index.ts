// ============================================================
// Shared domain types — used by apps/web, apps/admin, and the
// Cloudflare Worker backend. Keep this the single source of
// truth for Firestore document shapes.
// ============================================================

export interface Profile {
  name: string;
  role: string;
  roles: string[]; // e.g. ["Software Engineer", "AI/ML Enthusiast", "Researcher"]
  tagline: string;
  bio: string;
  education: string;
  university: string;
  avatarUrl: string; // Cloudinary URL
  resumeUrl: string; // Cloudinary URL
  location?: string;
  availableForWork: boolean;
}

export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "cloud"
  | "devops"
  | "ai-ml"
  | "tools"
  | "architecture";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  icon?: string;
  order: number;
}

export interface TechStackItem {
  id: string;
  name: string;
  icon?: string;
  row: 1 | 2; // marquee row 1 = left, row 2 = right
  order: number;
  enabled: boolean;
}

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  startDate: string; // ISO
  endDate: string | null; // null = present
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  order: number;
}

export type ProjectStatus = "draft" | "published";

export interface ProjectImage {
  url: string;
  publicId: string;
  alt?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string; // short
  longDescription?: string;
  category: string; // e.g. "Full Stack", "Frontend", "AI/ML"
  year: number;
  technologies: string[];
  images: ProjectImage[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  status: ProjectStatus;
  // Detail-page fields
  problem?: string;
  solutionText?: string;
  features?: string[];
  architecture?: string;
  challenges?: string;
  results?: string;
}

export interface ResearchProject {
  id: string;
  slug: string;
  title: string;
  abstract: string;
  dataset?: string;
  methodology?: string;
  models?: string[];
  results?: string;
  technologies: string[];
  paperUrl?: string;
  order: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  order: number;
}

export type MessageStatus = "unread" | "read" | "archived" | "deleted";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: MessageStatus;
  createdAt: string; // ISO
}

export interface GithubSettings {
  username: string;
  profileUrl: string;
  showContributions: boolean;
  showRepoStats: boolean;
  cachedContributionCount?: number;
  cachedAt?: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  facebook?: string;
  email?: string;
  other?: { label: string; url: string }[];
}

export interface SiteSettings {
  socialLinks: SocialLinks;
  seo: {
    title: string;
    description: string;
    ogImageUrl?: string;
  };
}

export interface MediaAsset {
  id: string;
  publicId: string;
  url: string;
  filename: string;
  type: "image" | "raw" | "video";
  usage?: string; // e.g. "project:bloodbridge", "profile-avatar"
  uploadedAt: string;
}

export interface AdminUser {
  uid: string;
  email: string;
}
