import type { AlbumProgress, FixtureInfo } from "./types";
import { supabase } from "./supabase";

const STORAGE_KEY = "collect92_progress_v1";

// ---------------------------------------------------------------------------
// localStorage helpers
// ---------------------------------------------------------------------------

export function getLocalProgress(): AlbumProgress | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as AlbumProgress;
    if (parsed.version === 1) {
      if (!parsed.fixtures) parsed.fixtures = {};
      return parsed;
    }
  } catch {
    // corrupted
  }
  return null;
}

export function setLocalProgress(progress: AlbumProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function clearLocalProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

// ---------------------------------------------------------------------------
// Supabase cloud helpers
// ---------------------------------------------------------------------------

export async function cloudPull(userId: string): Promise<AlbumProgress | null> {
  const { data, error } = await supabase
    .from("user_progress")
    .select("visited, fixtures, updated_at")
    .eq("id", userId)
    .maybeSingle();

  if (error || !data) return null;

  return {
    version: 1,
    visited: (data.visited as Record<string, boolean>) ?? {},
    fixtures: (data.fixtures as Record<string, FixtureInfo[]>) ?? {},
    updatedAt: data.updated_at as string,
  };
}

export async function cloudPush(
  userId: string,
  progress: AlbumProgress
): Promise<boolean> {
  const { error } = await supabase.from("user_progress").upsert(
    {
      id: userId,
      visited: progress.visited,
      fixtures: progress.fixtures ?? {},
      updated_at: progress.updatedAt,
    },
    { onConflict: "id" }
  );

  return !error;
}

// ---------------------------------------------------------------------------
// Merge: union of visited + deduplicated fixtures
// ---------------------------------------------------------------------------

export function mergeProgress(
  local: AlbumProgress | null,
  cloud: AlbumProgress | null
): AlbumProgress {
  const empty: AlbumProgress = {
    version: 1,
    visited: {},
    fixtures: {},
    updatedAt: new Date().toISOString(),
  };

  if (!local && !cloud) return empty;
  if (!local) return cloud!;
  if (!cloud) return local;

  const visited = { ...cloud.visited, ...local.visited };

  const allStadiumIds = new Set([
    ...Object.keys(local.fixtures ?? {}),
    ...Object.keys(cloud.fixtures ?? {}),
  ]);

  const fixtures: Record<string, FixtureInfo[]> = {};
  for (const sid of allStadiumIds) {
    const localFixtures = local.fixtures?.[sid] ?? [];
    const cloudFixtures = cloud.fixtures?.[sid] ?? [];
    const seen = new Set<string>();
    const merged: FixtureInfo[] = [];
    for (const f of [...cloudFixtures, ...localFixtures]) {
      if (!seen.has(f.id)) {
        seen.add(f.id);
        merged.push(f);
      }
    }
    if (merged.length > 0) fixtures[sid] = merged;
  }

  const latestDate =
    local.updatedAt > cloud.updatedAt ? local.updatedAt : cloud.updatedAt;

  return { version: 1, visited, fixtures, updatedAt: latestDate };
}
