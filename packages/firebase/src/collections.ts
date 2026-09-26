/**
 * Central place for Firestore collection names, so a typo can't silently
 * create a new collection. Import COLLECTIONS everywhere instead of
 * hardcoding string literals.
 */
export const COLLECTIONS = {
  profile: "profile",       // single doc: profile/main
  about: "about",           // single doc: about/main
  skills: "skills",
  techStack: "techStack",
  experience: "experience",
  projects: "projects",
  research: "research",
  services: "services",
  messages: "messages",
  github: "github",         // single doc: github/settings
  socialLinks: "socialLinks", // single doc: socialLinks/main
  settings: "settings",     // single doc: settings/main
  media: "media",
} as const;
