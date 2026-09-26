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
