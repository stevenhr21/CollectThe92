"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getSupabase } from "@/lib/supabase";
import type { LeagueSummary } from "@/lib/types";

function useAuthedFetch() {
  return useCallback(async (url: string, opts: RequestInit = {}) => {
    const {
      data: { session },
    } = await getSupabase().auth.getSession();
    if (!session) throw new Error("Not signed in");
    return fetch(url, {
      ...opts,
      headers: {
        ...opts.headers,
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
    });
  }, []);
}

/* ------------------------------------------------------------------ */
/*  Create / Join modal                                                */
/* ------------------------------------------------------------------ */

function LeagueModal({
  mode,
  onClose,
  onSuccess,
}: {
  mode: "create" | "join";
  onClose: () => void;
  onSuccess: (leagueId: string) => void;
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const authedFetch = useAuthedFetch();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const trimmed = value.trim();
    if (!trimmed) {
      setError(mode === "create" ? "Please enter a league name." : "Please enter an invite code.");
      return;
    }

    setSubmitting(true);
    try {
      const url = mode === "create" ? "/api/leagues" : "/api/leagues/join";
      const body = mode === "create" ? { name: trimmed } : { code: trimmed };
      const res = await authedFetch(url, { method: "POST", body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        setSubmitting(false);
        return;
      }
      onSuccess(data.league.id);
    } catch {
      setError("Something went wrong");
      setSubmitting(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={mode === "create" ? "Create a league" : "Join a league"}
    >
      <div
        ref={dialogRef}
        className="relative max-w-sm w-full overflow-hidden rounded-lg"
        style={{
          border: "4px solid var(--gold)",
          boxShadow: "0 0 0 2px var(--gold-dark), 0 12px 40px rgba(0,0,0,0.6)",
          background: "#1A1714",
        }}
      >
        <div
          className="px-6 py-4 text-white"
          style={{
            background: "linear-gradient(135deg, var(--album-green-500) 0%, var(--album-green-700) 100%)",
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/70 hover:text-white text-2xl leading-none
                       w-8 h-8 flex items-center justify-center rounded transition hover:bg-white/20 z-10 cursor-pointer"
            aria-label="Close modal"
          >
            &times;
          </button>
          <h2
            className="text-xl leading-tight"
            style={{
              fontFamily: "var(--font-display), Impact, sans-serif",
              textTransform: "uppercase",
              textShadow: "2px 2px 0 rgba(0,0,0,0.4)",
            }}
          >
            {mode === "create" ? "Create League" : "Join League"}
          </h2>
          <p className="text-sm opacity-80 mt-0.5 font-bold">
            {mode === "create"
              ? "Start a league and invite your friends"
              : "Enter the invite code from your friend"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label htmlFor="league-input" className="fixture-form-label">
              {mode === "create" ? "League Name" : "Invite Code"}
            </label>
            <input
              id="league-input"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="fixture-form-input"
              style={mode === "join" ? { textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 700 } : undefined}
              placeholder={mode === "create" ? "e.g. The Groundhoppers" : "e.g. ABC123"}
              maxLength={mode === "create" ? 40 : 6}
              autoFocus
              disabled={submitting}
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="premium-button shine-sweep w-full text-center cursor-pointer"
            style={{
              background: submitting
                ? "rgba(255,255,255,0.1)"
                : "linear-gradient(150deg, var(--foil-gold-3) 0%, var(--foil-gold-1) 38%, var(--foil-gold-2) 50%, var(--foil-gold-1) 64%, var(--foil-gold-3) 100%)",
              color: submitting ? "rgba(255,255,255,0.4)" : "#1b150c",
              cursor: submitting ? "not-allowed" : "pointer",
            }}
          >
            {submitting ? "Loading..." : mode === "create" ? "Create" : "Join"}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function LeaguesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [leagues, setLeagues] = useState<LeagueSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"create" | "join" | null>(null);
  const authedFetch = useAuthedFetch();

  const loadLeagues = useCallback(async () => {
    try {
      const res = await authedFetch("/api/leagues");
      const data = await res.json();
      if (res.ok) setLeagues(data.leagues);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, [authedFetch]);

  useEffect(() => {
    if (!authLoading && user) loadLeagues();
    if (!authLoading && !user) setLoading(false);
  }, [authLoading, user, loadLeagues]);

  if (authLoading || loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="h-8 w-48 rounded animate-pulse mb-8" style={{ background: "rgba(255,255,255,0.06)" }} />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-lg animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1
          className="text-2xl mb-3"
          style={{ fontFamily: "var(--font-display), Impact, sans-serif", color: "var(--gold-light)" }}
        >
          My Leagues
        </h1>
        <p className="text-white/50 text-sm">Sign in to create or join leagues with your friends.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1
          className="text-2xl"
          style={{ fontFamily: "var(--font-display), Impact, sans-serif", color: "var(--gold-light)" }}
        >
          My Leagues
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setModal("create")}
            className="grey-button shine-sweep cursor-pointer"
            style={{ minHeight: "2rem", padding: "0 0.85rem", fontSize: "0.7rem" }}
          >
            Create
          </button>
          <button
            onClick={() => setModal("join")}
            className="grey-button shine-sweep cursor-pointer"
            style={{ minHeight: "2rem", padding: "0 0.85rem", fontSize: "0.7rem" }}
          >
            Join
          </button>
        </div>
      </div>

      {leagues.length === 0 ? (
        <div
          className="rounded-lg p-8 text-center"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-white/40 text-sm mb-1">No leagues yet</p>
          <p className="text-white/25 text-xs">Create a league or join one with an invite code.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {leagues.map((league) => (
            <Link
              key={league.id}
              href={`/leagues/${league.id}`}
              className="league-card"
            >
              <div className="flex-1 min-w-0">
                <p className="league-card-name">{league.name}</p>
                <p className="text-[11px] text-white/35 mt-0.5">
                  {league.memberCount} {league.memberCount === 1 ? "member" : "members"}
                </p>
              </div>
              <div className="league-card-code">{league.code}</div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white/20 flex-shrink-0"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          ))}
        </div>
      )}

      {modal && (
        <LeagueModal
          mode={modal}
          onClose={() => setModal(null)}
          onSuccess={(id) => {
            setModal(null);
            router.push(`/leagues/${id}`);
          }}
        />
      )}
    </div>
  );
}
