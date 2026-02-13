"use client";

import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import type { Stadium, League } from "@/lib/types";
import { LEAGUE_META } from "@/lib/types";
import PremiumButton from "@/components/ui/PremiumButton";

interface StadiumModalProps {
  stadium: Stadium;
  isVisited: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function StadiumModal({
  stadium,
  isVisited,
  onToggle,
  onClose,
}: StadiumModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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
        }}
      >
        {/* Header – League colored with halftone */}
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
                       w-8 h-8 flex items-center justify-center rounded transition hover:bg-white/20"
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
        </div>

        {/* Footer – Action button */}
        <div className="px-6 pb-5">
          {isVisited ? (
            <button
              onClick={onToggle}
              className="w-full py-3 rounded-md font-extrabold text-sm uppercase tracking-wider transition-all
                         hover:brightness-110"
              style={{
                fontFamily: "var(--font-display), Impact, sans-serif",
                background: "rgba(255,255,255,0.08)",
                color: "#E88",
                border: "2px solid rgba(255,100,100,0.3)",
              }}
              aria-label={`Unmark ${stadium.stadium} as visited`}
            >
              Remove from collection ✕
            </button>
          ) : (
            <PremiumButton
              onClick={onToggle}
              className="w-full text-center"
              aria-label={`Mark ${stadium.stadium} as visited`}
            >
              Place sticker ✓
            </PremiumButton>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
