"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import type { Stadium, League, FixtureInfo } from "@/lib/types";
import { LEAGUE_META } from "@/lib/types";
import PremiumButton from "@/components/ui/PremiumButton";
import FixtureForm from "@/components/FixtureForm";

interface StadiumModalProps {
  stadium: Stadium;
  isVisited: boolean;
  onToggle: () => void;
  onClose: () => void;
  fixtures: FixtureInfo[];
  onAddFixture: (fixture: FixtureInfo) => void;
  onRemoveFixture: (fixtureId: string) => void;
}

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function StadiumModal({
  stadium,
  isVisited,
  onToggle,
  onClose,
  fixtures,
  onAddFixture,
  onRemoveFixture,
}: StadiumModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  const handleVisitedClick = useCallback(() => {
    onToggle();
    setShowForm(true);
  }, [onToggle]);

  const handleSaveFixture = useCallback(
    (fixture: FixtureInfo) => {
      onAddFixture(fixture);
      setShowForm(false);
    },
    [onAddFixture]
  );

  const handleCancelForm = useCallback(() => {
    setShowForm(false);
  }, []);

  const meta = LEAGUE_META[stadium.league as League];
  const mapsUrl = `https://www.google.com/maps?q=${stadium.lat},${stadium.lng}`;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`${stadium.stadium} details`}
    >
      <div
        ref={dialogRef}
        className="relative max-w-md w-full overflow-hidden animate-modal-enter rounded-lg"
        style={{
          border: "4px solid var(--gold)",
          boxShadow: "0 0 0 2px var(--gold-dark), 0 12px 40px rgba(0,0,0,0.6)",
          background: "#1A1714",
          maxHeight: "90vh",
        }}
      >
        <div className="overflow-y-auto" style={{ maxHeight: "90vh" }}>
          {/* Header */}
          <div
            className="halftone-overlay halftone-light px-6 py-4 text-white"
            style={{
              background: `linear-gradient(135deg, ${meta.colorLight} 0%, ${meta.color} 100%)`,
            }}
          >
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-3 right-3 text-white/70 hover:text-white text-2xl leading-none
                         w-8 h-8 flex items-center justify-center rounded transition hover:bg-white/20 z-10"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h2
              className="text-xl pr-8 leading-tight"
              style={{
                fontFamily: "var(--font-display), Impact, sans-serif",
                textTransform: "uppercase",
                textShadow: "2px 2px 0 rgba(0,0,0,0.4)",
              }}
            >
              {stadium.stadium}
            </h2>
            <p className="text-sm opacity-80 mt-0.5 font-bold">{stadium.club}</p>
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-4">
            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { label: "City", value: stadium.city },
                { label: "Capacity", value: stadium.capacity.toLocaleString() },
                { label: "Opened", value: String(stadium.opened) },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center rounded-md p-2.5"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <p className="text-[9px] uppercase font-bold tracking-widest" style={{ color: "var(--gold)" }}>
                    {stat.label}
                  </p>
                  <p className="text-sm font-bold text-white mt-0.5">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* League + map link */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">
                League:{" "}
                <strong style={{ color: meta.colorLight }}>{meta.name}</strong>
              </span>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-wider hover:underline"
                style={{ color: "var(--gold)" }}
              >
                View on Maps →
              </a>
            </div>

            {stadium.notes && (
              <p className="text-xs text-gray-500 italic">{stadium.notes}</p>
            )}

            {/* Fixture form (shown after just marking visited) */}
            {showForm && isVisited && (
              <div
                className="rounded-md p-4"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <FixtureForm
                  stadiumClub={stadium.club}
                  onSave={handleSaveFixture}
                  onCancel={handleCancelForm}
                />
              </div>
            )}

            {/* Existing fixtures list */}
            {isVisited && !showForm && fixtures.length > 0 && (
              <div className="space-y-2">
                <p
                  className="text-[10px] uppercase tracking-[0.18em] font-bold"
                  style={{ color: "var(--gold)" }}
                >
                  Matches attended
                </p>
                {fixtures.map((f) => (
                  <div
                    key={f.id}
                    className="rounded-md p-3 group/fixture"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-white leading-tight">
                          {f.homeTeam}
                          {f.homeScore != null && f.awayScore != null && (
                            <span style={{ color: "var(--gold-light)" }}>
                              {" "}{f.homeScore} – {f.awayScore}{" "}
                            </span>
                          )}
                          {f.homeScore == null && " v "}
                          {f.awayTeam}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {formatDate(f.date)} · {f.competition}
                        </p>
                        {f.notes && (
                          <p className="text-[10px] text-gray-500 italic mt-0.5">{f.notes}</p>
                        )}
                      </div>
                      <button
                        onClick={() => onRemoveFixture(f.id)}
                        className="opacity-0 group-hover/fixture:opacity-100 transition-opacity
                                   text-red-400/60 hover:text-red-400 text-xs p-1"
                        aria-label={`Remove ${f.homeTeam} v ${f.awayTeam} match`}
                        title="Remove match"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 pb-5 space-y-2">
            {isVisited ? (
              <>
                {!showForm && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full py-2.5 rounded-md font-extrabold text-xs uppercase tracking-wider transition-all
                               hover:brightness-110"
                    style={{
                      fontFamily: "var(--font-display), Impact, sans-serif",
                      background: "rgba(255,255,255,0.06)",
                      color: "var(--gold)",
                      border: "1px solid rgba(218,165,32,0.3)",
                    }}
                  >
                    + Add match
                  </button>
                )}
                {!showForm && (
                  <button
                    onClick={onToggle}
                    className="w-full py-2.5 rounded-md font-extrabold text-xs uppercase tracking-wider transition-all
                               hover:brightness-110"
                    style={{
                      fontFamily: "var(--font-display), Impact, sans-serif",
                      background: "rgba(255,255,255,0.04)",
                      color: "#E88",
                      border: "1px solid rgba(255,100,100,0.2)",
                    }}
                    aria-label={`Unmark ${stadium.stadium} as visited`}
                  >
                    Remove from collection ✕
                  </button>
                )}
              </>
            ) : (
              <PremiumButton
                onClick={handleVisitedClick}
                className="w-full text-center"
                aria-label={`Mark ${stadium.stadium} as visited`}
              >
                Visited ✓
              </PremiumButton>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
