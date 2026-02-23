"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getSupabase } from "@/lib/supabase";
import type { LeagueDetail } from "@/lib/types";

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

export default function LeagueDetailPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const leagueId = params.id as string;

  const [league, setLeague] = useState<LeagueDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const authedFetch = useAuthedFetch();

  const loadLeague = useCallback(async () => {
    try {
      const res = await authedFetch(`/api/leagues/${leagueId}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to load league");
        return;
      }
      setLeague(data as LeagueDetail);
    } catch {
      setError("Failed to load league");
    } finally {
      setLoading(false);
    }
  }, [authedFetch, leagueId]);

  useEffect(() => {
    if (!authLoading && user) loadLeague();
    if (!authLoading && !user) {
      setLoading(false);
      setError("Sign in to view this league");
    }
  }, [authLoading, user, loadLeague]);

  const handleCopyCode = useCallback(async () => {
    if (!league) return;
    try {
      await navigator.clipboard.writeText(league.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback: do nothing */
    }
  }, [league]);

  const handleLeave = useCallback(async () => {
    if (!league) return;
    setLeaving(true);
    try {
      const isCreator = league.createdBy === user?.id;
      const query = isCreator ? "?destroy=1" : "";
      await authedFetch(`/api/leagues/${leagueId}${query}`, { method: "DELETE" });
      router.push("/leagues");
    } catch {
      setLeaving(false);
    }
  }, [league, user, authedFetch, leagueId, router]);

  if (authLoading || loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="h-8 w-48 rounded animate-pulse mb-8" style={{ background: "rgba(255,255,255,0.06)" }} />
        <div className="h-64 rounded-lg animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />
      </div>
    );
  }

  if (error || !league) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-white/50 text-sm mb-4">{error || "League not found"}</p>
        <Link href="/leagues" className="text-xs text-[var(--gold)] hover:underline">
          Back to My Leagues
        </Link>
      </div>
    );
  }

  const isCreator = league.createdBy === user?.id;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back link */}
      <Link
        href="/leagues"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-6 transition-colors"
        style={{ color: "#C0B090" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        My Leagues
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1
            className="text-2xl mb-1"
            style={{ fontFamily: "var(--font-display), Impact, sans-serif", color: "var(--gold-light)" }}
          >
            {league.name}
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Invite Code</span>
            <button
              onClick={handleCopyCode}
              className="league-invite-code cursor-pointer"
              title="Copy invite code"
            >
              <span>{league.code}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0"
              >
                {copied ? (
                  <polyline points="20 6 9 17 4 12" />
                ) : (
                  <>
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Standings table */}
      <div className="league-table-wrapper">
        <table className="league-table">
          <thead>
            <tr>
              <th className="league-th league-th-rank">#</th>
              <th className="league-th league-th-name">Name</th>
              <th className="league-th league-th-stat" style={{ color: "var(--league-pl)" }}>PL</th>
              <th className="league-th league-th-stat" style={{ color: "var(--league-ch)" }}>CH</th>
              <th className="league-th league-th-stat" style={{ color: "var(--league-l1)" }}>L1</th>
              <th className="league-th league-th-stat" style={{ color: "var(--league-l2)" }}>L2</th>
              <th className="league-th league-th-total">Total</th>
            </tr>
          </thead>
          <tbody>
            {league.standings.map((s, i) => {
              const isMe = s.userId === user?.id;
              return (
                <tr key={s.userId} className={isMe ? "league-row-me" : ""}>
                  <td className="league-td league-td-rank">{i + 1}</td>
                  <td className="league-td league-td-name">
                    {s.displayName}
                    {isMe && <span className="league-you-badge">You</span>}
                  </td>
                  <td className="league-td league-td-stat">{s.pl}</td>
                  <td className="league-td league-td-stat">{s.ch}</td>
                  <td className="league-td league-td-stat">{s.l1}</td>
                  <td className="league-td league-td-stat">{s.l2}</td>
                  <td className="league-td league-td-total">{s.total}<span className="league-total-max">/92</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Leave / Delete */}
      <div className="mt-8 pt-6 border-t border-white/10">
        {!confirmLeave ? (
          <button
            onClick={() => setConfirmLeave(true)}
            className="text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            style={{ color: "rgba(255,100,100,0.6)" }}
          >
            {isCreator ? "Delete League" : "Leave League"}
          </button>
        ) : (
          <div className="space-y-2">
            <p className="text-[11px] text-white/50">
              {isCreator
                ? "This will permanently delete the league for all members."
                : "You will be removed from this league."}
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleLeave}
                disabled={leaving}
                className="py-1.5 px-4 rounded text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-colors"
                style={{
                  background: leaving ? "rgba(255,100,100,0.15)" : "rgba(255,100,100,0.2)",
                  color: leaving ? "rgba(255,100,100,0.5)" : "#E88",
                  border: "1px solid rgba(255,100,100,0.25)",
                }}
              >
                {leaving ? "Leaving..." : "Confirm"}
              </button>
              <button
                onClick={() => setConfirmLeave(false)}
                disabled={leaving}
                className="py-1.5 px-4 rounded text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-colors"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
