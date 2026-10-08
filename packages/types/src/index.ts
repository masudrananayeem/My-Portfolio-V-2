// Shared domain types — single source of truth for the web and admin apps.

export interface Profile {
  name: string;
  role: string;
  roles: string[];
  tagline: string;
  bio: string;
  education: string;
  university: string;
  avatarUrl: string;
  resumeUrl: string;
  location?: string;
  availableForWork: boolean;
}

export interface CodingProfile {
  platform: string;
  handle: string;
  url: string;
  solved: number;
  accent?: string;
}

export interface AboutContent {
  eyebrow: string;
  title: string;
  intro: string;
  body: string;
  highlights: string[];
  codingProfiles?: {
    beecrowd?: CodingProfile;
    codeforces?: CodingProfile;
    codechef?: CodingProfile;
  };
  order?: number;
}

export type SkillCategory = "languages" | "frontend" | "backend" | "database" | "cloud" | "devops" | "ai-ml" | "data" | "testing" | "security" | "tools" | "architecture";
export interface Skill { id: string; name: string; category: SkillCategory; icon?: string; order: number; }
export interface TechStackItem { id: string; name: string; icon?: string; row: 1 | 2; order: number; enabled: boolean; }

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl?: string;
  publicId?: string;
  description?: string;
  order: number;
}

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string | null;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  order: number;
}

export type ProjectStatus = "draft" | "published";
export interface ProjectImage { url: string; publicId: string; alt?: string; }
export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  year: number;
  technologies: string[];
  images: ProjectImage[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  status: ProjectStatus;
  problem?: string;
  solutionText?: string;
  features?: string[];
  architecture?: string;
  challenges?: string;
  results?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: ProjectImage;
  category: string;
  publishedAt: string;
  readingTime?: string;
  featured: boolean;
  order: number;
  status: ProjectStatus;
}

export interface ResearchProject {
  id: string;
  slug: string;
  title: string;
  abstract: string;
  summary?: string;
  coverImage?: ProjectImage;
  dataset?: string;
  methodology?: string;
  models?: string[];
  results?: string;
  technologies: string[];
  paperUrl?: string;
  order: number;
}

export interface Service { id: string; title: string; description: string; icon?: string; order: number; }
export type MessageStatus = "unread" | "read" | "archived" | "deleted";
export interface ContactMessage { id: string; name: string; email: string; subject: string; message: string; status: MessageStatus; createdAt: string; }
export interface GithubSettings { username: string; profileUrl: string; showContributions: boolean; showRepoStats: boolean; cachedContributionCount?: number; cachedAt?: string; }
export interface SocialLinks { github?: string; linkedin?: string; facebook?: string; email?: string; other?: { label: string; url: string }[]; }
export interface SiteSettings { socialLinks: SocialLinks; contact?: { phone?: string; whatsapp?: string; location?: string; intro?: string; }; seo: { title: string; description: string; ogImageUrl?: string; }; }
export interface MediaAsset { id: string; publicId: string; url: string; filename: string; type: "image" | "raw" | "video"; usage?: string; uploadedAt: string; }
export interface AdminUser { uid: string; email: string; }
