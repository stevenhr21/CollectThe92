/**
 * Sync abstraction – currently stubs for localStorage-only MVP.
 * When Supabase is added later, implement these to push/pull from the cloud.
 */

import type { AlbumProgress } from "./types";

/** Export progress as a JSON blob (for manual backup or future cloud sync). */
export function exportProgress(): AlbumProgress | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("collect92_progress_v1");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AlbumProgress;
  } catch {
    return null;
  }
}

/** Import progress from a JSON blob (for restore or future cloud sync). */
export function importProgress(progress: AlbumProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("collect92_progress_v1", JSON.stringify(progress));
}
