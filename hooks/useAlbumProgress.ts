"use client";

import { useState, useEffect, useCallback } from "react";
import type { AlbumProgress, FixtureInfo, League } from "@/lib/types";
import { stadiumsByLeague } from "@/lib/stadiums";

const STORAGE_KEY = "collect92_progress_v1";

function loadProgress(): AlbumProgress {
  if (typeof window === "undefined") {
    return { version: 1, visited: {}, fixtures: {}, updatedAt: new Date().toISOString() };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AlbumProgress;
      if (parsed.version === 1) {
        if (!parsed.fixtures) parsed.fixtures = {};
        return parsed;
      }
    }
  } catch {
    // corrupted – reset
  }
  return { version: 1, visited: {}, fixtures: {}, updatedAt: new Date().toISOString() };
}

function saveProgress(progress: AlbumProgress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function useAlbumProgress() {
  const [progress, setProgress] = useState<AlbumProgress>({
    version: 1,
    visited: {},
    fixtures: {},
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
      const nextFixtures = { ...prev.fixtures };
      if (next[id]) {
        delete next[id];
        delete nextFixtures[id];
      } else {
        next[id] = true;
      }
      const updated: AlbumProgress = {
        ...prev,
        visited: next,
        fixtures: nextFixtures,
        updatedAt: new Date().toISOString(),
      };
      saveProgress(updated);
      return updated;
    });
  }, []);

  const getFixtures = useCallback(
    (stadiumId: string): FixtureInfo[] => {
      return progress.fixtures?.[stadiumId] ?? [];
    },
    [progress.fixtures]
  );

  const addFixture = useCallback((stadiumId: string, fixture: FixtureInfo) => {
    setProgress((prev) => {
      const existing = prev.fixtures?.[stadiumId] ?? [];
      const updated: AlbumProgress = {
        ...prev,
        fixtures: {
          ...prev.fixtures,
          [stadiumId]: [...existing, fixture],
        },
        updatedAt: new Date().toISOString(),
      };
      saveProgress(updated);
      return updated;
    });
  }, []);

  const removeFixture = useCallback((stadiumId: string, fixtureId: string) => {
    setProgress((prev) => {
      const existing = prev.fixtures?.[stadiumId] ?? [];
      const filtered = existing.filter((f) => f.id !== fixtureId);
      const updated: AlbumProgress = {
        ...prev,
        fixtures: {
          ...prev.fixtures,
          [stadiumId]: filtered,
        },
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
      fixtures: {},
      updatedAt: new Date().toISOString(),
    };
    saveProgress(empty);
    setProgress(empty);
  }, []);

  return {
    progress,
    isVisited,
    toggleVisited,
    getFixtures,
    addFixture,
    removeFixture,
    visitedCountByLeague,
    totalVisited,
    clearAll,
  };
}
