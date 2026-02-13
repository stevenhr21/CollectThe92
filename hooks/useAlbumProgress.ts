"use client";

import { useState, useEffect, useCallback } from "react";
import type { AlbumProgress, League } from "@/lib/types";
import { stadiumsByLeague } from "@/lib/stadiums";

const STORAGE_KEY = "collect92_progress_v1";

function loadProgress(): AlbumProgress {
  if (typeof window === "undefined") {
    return { version: 1, visited: {}, updatedAt: new Date().toISOString() };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AlbumProgress;
      if (parsed.version === 1) return parsed;
    }
  } catch {
    // corrupted – reset
  }
  return { version: 1, visited: {}, updatedAt: new Date().toISOString() };
}

function saveProgress(progress: AlbumProgress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function useAlbumProgress() {
  const [progress, setProgress] = useState<AlbumProgress>({
    version: 1,
    visited: {},
    updatedAt: "",
  });

  useEffect(() => {
    const loaded = loadProgress();
    const frame = window.requestAnimationFrame(() => {
      setProgress(loaded);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const isVisited = useCallback(
    (id: string) => !!progress.visited[id],
    [progress.visited]
  );

  const toggleVisited = useCallback((id: string) => {
    setProgress((prev) => {
      const next = { ...prev.visited };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = true;
      }
      const updated: AlbumProgress = {
        ...prev,
        visited: next,
        updatedAt: new Date().toISOString(),
      };
      saveProgress(updated);
      return updated;
    });
  }, []);

  const visitedCountByLeague = useCallback(
    (league: League) => {
      const ids = stadiumsByLeague(league).map((s) => s.id);
      return ids.filter((id) => progress.visited[id]).length;
    },
    [progress.visited]
  );

  const totalVisited = useCallback(() => {
    return Object.keys(progress.visited).length;
  }, [progress.visited]);

  const clearAll = useCallback(() => {
    const empty: AlbumProgress = {
      version: 1,
      visited: {},
      updatedAt: new Date().toISOString(),
    };
    saveProgress(empty);
    setProgress(empty);
  }, []);

  return {
    progress,
    isVisited,
    toggleVisited,
    visitedCountByLeague,
    totalVisited,
    clearAll,
  };
}
