import { useEffect, useState } from "react";
import { getCollection, getDocument, COLLECTIONS, orderBy } from "@nayeem/firebase";
import type { DocumentData } from "@nayeem/firebase";
import type {
  Profile, Skill, TechStackItem, ExperienceItem, Project,
  ResearchProject, Service, GithubSettings, SiteSettings,
} from "@nayeem/types";

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useDocument<T extends DocumentData>(collectionName: string, docId: string): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: true, error: null });

  useEffect(() => {
    let active = true;
    getDocument<T>(collectionName, docId)
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch((e) => active && setState({ data: null, loading: false, error: e.message }));
    return () => { active = false; };
  }, [collectionName, docId]);

  return state;
}

function useOrderedCollection<T extends DocumentData>(collectionName: string): AsyncState<T[]> {
  const [state, setState] = useState<AsyncState<T[]>>({ data: null, loading: true, error: null });

  useEffect(() => {
    let active = true;
    getCollection<T>(collectionName, [orderBy("order", "asc")])
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch((e) => active && setState({ data: null, loading: false, error: e.message }));
    return () => { active = false; };
  }, [collectionName]);

  return state;
}

export const useProfile = () => useDocument<Profile>(COLLECTIONS.profile, "main");
export const useSkills = () => useOrderedCollection<Skill>(COLLECTIONS.skills);
export const useTechStack = () => useOrderedCollection<TechStackItem>(COLLECTIONS.techStack);
export const useExperience = () => useOrderedCollection<ExperienceItem>(COLLECTIONS.experience);
export const useProjects = () => useOrderedCollection<Project>(COLLECTIONS.projects);
export const useResearch = () => useOrderedCollection<ResearchProject>(COLLECTIONS.research);
export const useServices = () => useOrderedCollection<Service>(COLLECTIONS.services);
export const useGithubSettings = () => useDocument<GithubSettings>(COLLECTIONS.github, "settings");
export const useSiteSettings = () => useDocument<SiteSettings>(COLLECTIONS.settings, "main");


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

const WORKER_API_URL = (import.meta.env.VITE_WORKER_API_URL ?? "").replace(/\/$/, "");

async function fetchWorker<T>(path: string): Promise<T> {
  if (!WORKER_API_URL) throw new Error("VITE_WORKER_API_URL is not configured");
  const response = await fetch(`${WORKER_API_URL}${path}`, {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error(`GitHub API request failed (${response.status})`);
  const json = await response.json() as { success: boolean; data?: T; error?: string };
  if (!json.success || !json.data) throw new Error(json.error ?? "GitHub API request failed");
  return json.data;
}

export function useGithubActivity(enabled = true): AsyncState<GithubActivityData> {
  const { data: settings } = useGithubSettings();
  const [state, setState] = useState<AsyncState<GithubActivityData>>({
    data: null, loading: enabled, error: null,
  });

  useEffect(() => {
    if (!enabled) {
      setState({ data: null, loading: false, error: null });
      return;
    }
    let active = true;
    setState((current) => ({ ...current, loading: true, error: null }));
    fetchWorker<GithubActivityData>("/api/github/contributions")
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch((error: Error) => {
        if (!active) return;
        const fallback = settings?.cachedContributionCount;
        setState({
          data: fallback != null ? { totalContributions: fallback, days: [] } : null,
          loading: false,
          error: error.message,
        });
      });
    return () => { active = false; };
  }, [enabled, settings?.cachedContributionCount]);

  return state;
}

export function useGithubProfile(enabled = true): AsyncState<GithubProfileData> {
  const [state, setState] = useState<AsyncState<GithubProfileData>>({
    data: null, loading: enabled, error: null,
  });

  useEffect(() => {
    if (!enabled) return;
    let active = true;
    fetchWorker<GithubProfileData>("/api/github/profile")
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch((error: Error) => active && setState({ data: null, loading: false, error: error.message }));
    return () => { active = false; };
  }, [enabled]);

  return state;
}
