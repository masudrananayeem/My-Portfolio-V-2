import { useCallback, useEffect, useState } from "react";
import {
  getCollection,
  getDocument,
  COLLECTIONS,
  orderBy,
  where,
} from "@nayeem/firebase";
import type { DocumentData } from "@nayeem/firebase";

import type {
  Profile,
  AboutContent,
  Skill,
  TechStackItem,
  ExperienceItem,
  Certificate,
  Project,
  Article,
  ResearchProject,
  Service,
  GithubSettings,
  SiteSettings,
} from "@nayeem/types";

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useDocument<T extends DocumentData>(
  collectionName: string,
  docId: string
): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;

    getDocument<T>(collectionName, docId)
      .then((data) => {
        if (active) {
          setState({
            data,
            loading: false,
            error: null,
          });
        }
      })
      .catch((e) => {
        if (active) {
          setState({
            data: null,
            loading: false,
            error: e.message,
          });
        }
      });

    return () => {
      active = false;
    };
  }, [collectionName, docId]);

  return state;
}

function useOrderedCollection<T extends DocumentData>(
  collectionName: string
): AsyncState<T[]> {
  const [state, setState] = useState<AsyncState<T[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;

    getCollection<T>(collectionName, [orderBy("order", "asc")])
      .then((data) => {
        if (active) {
          setState({
            data,
            loading: false,
            error: null,
          });
        }
      })
      .catch((e) => {
        if (active) {
          setState({
            data: null,
            loading: false,
            error: e.message,
          });
        }
      });

    return () => {
      active = false;
    };
  }, [collectionName]);

  return state;
}

/* ============================================================
   FIRESTORE HOOKS
============================================================ */

export const useProfile = () =>
  useDocument<Profile>(COLLECTIONS.profile, "main");

export const useAbout = () =>
  useDocument<AboutContent>(COLLECTIONS.about, "main");

export const useSkills = () =>
  useOrderedCollection<Skill>(COLLECTIONS.skills);

export const useTechStack = () =>
  useOrderedCollection<TechStackItem>(COLLECTIONS.techStack);

export const useExperience = () =>
  useOrderedCollection<ExperienceItem>(COLLECTIONS.experience);

export const useCertificates = () =>
  useOrderedCollection<Certificate>(COLLECTIONS.certificates);

export const useServices = () =>
  useOrderedCollection<Service>(COLLECTIONS.services);

/* ============================================================
   PROJECTS
============================================================ */

export function useProjects() {
  const [state, setState] = useState<AsyncState<Project[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;

    getCollection<Project>(COLLECTIONS.projects, [
      where("status", "==", "published"),
    ])
      .then((items) => {
        if (active) {
          setState({
            data: items.sort(
              (a, b) => (a.order ?? 0) - (b.order ?? 0)
            ),
            loading: false,
            error: null,
          });
        }
      })
      .catch((e) => {
        if (active) {
          setState({
            data: null,
            loading: false,
            error: e.message,
          });
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return state;
}

/* ============================================================
   ARTICLES
============================================================ */

export function useArticles() {
  const [state, setState] = useState<AsyncState<Article[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;

    getCollection<Article>(COLLECTIONS.articles, [
      where("status", "==", "published"),
    ])
      .then((items) => {
        if (active) {
          setState({
            data: items.sort(
              (a, b) => (a.order ?? 0) - (b.order ?? 0)
            ),
            loading: false,
            error: null,
          });
        }
      })
      .catch((e) => {
        if (active) {
          setState({
            data: null,
            loading: false,
            error: e.message,
          });
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return state;
}

export const useResearch = () =>
  useOrderedCollection<ResearchProject>(COLLECTIONS.research);

export const useGithubSettings = () =>
  useDocument<GithubSettings>(COLLECTIONS.github, "settings");

export const useSiteSettings = () =>
  useDocument<SiteSettings>(COLLECTIONS.settings, "main");

/* ============================================================
   GITHUB
============================================================ */

export interface GithubContributionDay {
  date: string;
  count: number;
}

export interface GithubActivityData {
  totalContributions: number;
  days: GithubContributionDay[];
}

export interface GithubProfileData {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  followers: number;
  following: number;
  publicRepos: number;
}

const WORKER_API_URL = (
  import.meta.env.VITE_WORKER_API_URL ?? ""
).replace(/\/$/, "");

async function fetchWorker<T>(path: string): Promise<T> {
  if (!WORKER_API_URL) {
    throw new Error("VITE_WORKER_API_URL is not configured");
  }

  const response = await fetch(`${WORKER_API_URL}${path}`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `GitHub API request failed (${response.status})`
    );
  }

  const json = (await response.json()) as {
    success: boolean;
    data?: T;
    error?: string;
  };

  if (!json.success || !json.data) {
    throw new Error(
      json.error ?? "GitHub API request failed"
    );
  }

  return json.data;
}

export function useGithubActivity(
  enabled = true
): AsyncState<GithubActivityData> & {
  refresh: () => void;
} {
  const { data: settings } = useGithubSettings();

  const [refreshKey, setRefreshKey] = useState(0);

  const [state, setState] = useState<
    AsyncState<GithubActivityData>
  >({
    data: null,
    loading: enabled,
    error: null,
  });

  const refresh = useCallback(
    () => setRefreshKey((value) => value + 1),
    []
  );

  useEffect(() => {
    if (!enabled) {
      setState({
        data: null,
        loading: false,
        error: null,
      });
      return;
    }

    let active = true;

    setState((current) => ({
      ...current,
      loading: true,
      error: null,
    }));

    fetchWorker<GithubActivityData>(
      "/api/github/contributions"
    )
      .then((data) => {
        if (active) {
          setState({
            data,
            loading: false,
            error: null,
          });
        }
      })
      .catch((error: Error) => {
        if (!active) return;

        const fallback =
          settings?.cachedContributionCount;

        setState({
          data:
            fallback != null
              ? {
                  totalContributions: fallback,
                  days: [],
                }
              : null,
          loading: false,
          error: error.message,
        });
      });

    return () => {
      active = false;
    };
  }, [
    enabled,
    settings?.cachedContributionCount,
    refreshKey,
  ]);

  return {
    ...state,
    refresh,
  };
}

export function useGithubProfile(
  enabled = true
): AsyncState<GithubProfileData> {
  const [state, setState] = useState<
    AsyncState<GithubProfileData>
  >({
    data: null,
    loading: enabled,
    error: null,
  });

  useEffect(() => {
    if (!enabled) return;

    let active = true;

    fetchWorker<GithubProfileData>("/api/github/profile")
      .then((data) => {
        if (active) {
          setState({
            data,
            loading: false,
            error: null,
          });
        }
      })
      .catch((error: Error) => {
        if (active) {
          setState({
            data: null,
            loading: false,
            error: error.message,
          });
        }
      });

    return () => {
      active = false;
    };
  }, [enabled]);

  return state;
}