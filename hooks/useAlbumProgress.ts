"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { AlbumProgress, FixtureInfo, League } from "@/lib/types";
import { stadiumsByLeague } from "@/lib/stadiums";
import { useAuth } from "@/contexts/AuthContext";
import {
  getLocalProgress,
  setLocalProgress,
  clearLocalProgress,
  cloudPull,
  cloudPush,
} from "@/lib/sync";

const EMPTY: AlbumProgress = {
  version: 1,
  visited: {},
  fixtures: {},
  updatedAt: new Date().toISOString(),
};

function freshEmpty(): AlbumProgress {
  return { ...EMPTY, updatedAt: new Date().toISOString() };
}

export function useAlbumProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<AlbumProgress>({
    ...EMPTY,
    updatedAt: "",
  });
  const [syncing, setSyncing] = useState(false);
  const pushTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userIdRef = useRef<string | null>(null);
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    userIdRef.current = user?.id ?? null;
  }, [user]);

  useEffect(() => {
    let cancelled = false;
    const prevUserId = prevUserIdRef.current;
    const currentUserId = user?.id ?? null;
    prevUserIdRef.current = currentUserId;

    async function init() {
      if (!user) {
        // Signed out: if we were previously signed in, clear the cached
        // cloud data so the anonymous session starts fresh.
        if (prevUserId !== undefined && prevUserId !== null) {
          clearLocalProgress();
          if (!cancelled) setProgress(freshEmpty());
        } else {
          // Initial mount or never signed in -- load local anonymous data
          const local = getLocalProgress() ?? freshEmpty();
          if (!cancelled) setProgress(local);
        }
        return;
      }

      // Signed in: load cloud data only (ignore local anonymous data)
      setSyncing(true);
      const cloud = await cloudPull(user.id);
      if (cancelled) return;

      const accountData = cloud ?? freshEmpty();
      setLocalProgress(accountData);
      setProgress(accountData);
      setSyncing(false);
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [user]);

  // Debounced cloud push whenever progress changes (authed only)
  const schedulePush = useCallback(
    (updated: AlbumProgress) => {
      if (pushTimerRef.current) clearTimeout(pushTimerRef.current);
      pushTimerRef.current = setTimeout(() => {
        const uid = userIdRef.current;
        if (uid) {
          cloudPush(uid, updated);
        }
      }, 1000);
    },
    []
  );

  const persist = useCallback(
    (updated: AlbumProgress) => {
      setLocalProgress(updated);
      if (userIdRef.current) schedulePush(updated);
    },
    [schedulePush]
  );

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
      persist(updated);
      return updated;
    });
  }, [persist]);

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
      persist(updated);
      return updated;
    });
  }, [persist]);

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
      persist(updated);
      return updated;
    });
  }, [persist]);

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
    persist(empty);
    setProgress(empty);
  }, [persist]);

  return {
    progress,
    syncing,
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
