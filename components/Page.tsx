"use client";

import type { ReactNode } from "react";
import Plaque from "@/components/ui/Plaque";

interface PageProps {
  children: ReactNode;
  side: "left" | "right";
  pageColor: string;
  pageColorLight: string;
  pageNumber?: number;
  leagueName?: string;
  spreadNumber: number;
  visitedCount: number;
  totalCount: number;
}

export default function Page({
  children,
  side,
  pageColor,
  pageColorLight,
  pageNumber,
  leagueName,
  spreadNumber,
  visitedCount,
  totalCount,
}: PageProps) {
  return (
    <div
      className={`album-page papergrain relative flex flex-col min-w-0 h-full
                  ${side === "left" ? "rounded-l-lg" : "rounded-r-lg"}`}
      style={{
        background: `linear-gradient(135deg, ${pageColorLight} 0%, ${pageColor} 40%, ${pageColor} 100%)`,
        boxShadow:
          side === "left"
            ? "inset -6px 0 18px -4px rgba(0,0,0,0.35), inset 0 0 30px rgba(0,0,0,0.1)"
            : "inset 6px 0 18px -4px rgba(0,0,0,0.35), inset 0 0 30px rgba(0,0,0,0.1)",
      }}
    >
      {/* Stitch border */}
      <div
        className="absolute pointer-events-none z-[3]"
        style={{
          inset: "5px",
          border: "2px dashed rgba(255,255,255,0.13)",
          borderRadius: "3px",
        }}
      />

      {/* Corner flourishes */}
      <span className="absolute top-2 left-3 text-white/[0.07] text-sm z-[3] select-none pointer-events-none">✦</span>
      <span className="absolute top-2 right-3 text-white/[0.07] text-sm z-[3] select-none pointer-events-none">✦</span>
      <span className="absolute bottom-2 left-3 text-white/[0.07] text-sm z-[3] select-none pointer-events-none">✦</span>
      <span className="absolute bottom-2 right-3 text-white/[0.07] text-sm z-[3] select-none pointer-events-none">✦</span>

      {/* League watermark behind content */}
      {leagueName && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1] overflow-hidden">
          <span
            className="select-none whitespace-nowrap"
            style={{
              fontFamily: "var(--font-display), Impact, sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.03)",
              transform: "rotate(-15deg)",
            }}
          >
            {leagueName}
          </span>
        </div>
      )}

      {/* Top: league label */}
      <div className="relative z-[5] px-2.5 sm:px-3 lg:px-4 pt-1.5 flex-shrink-0">
        <div className="album-page-header">
          <div>
            <p className="album-page-header-title">{leagueName || "Album"}</p>
            <p className="album-page-header-meta">
              Spread {spreadNumber} - {visitedCount}/{totalCount} collected
            </p>
          </div>
          <Plaque className="text-[8px] px-2 py-0.5 bg-black/30 border-white/35 text-white/80">
            Official Sticker Collection
          </Plaque>
        </div>
      </div>

      {/* Content area – stretches to fill all available space */}
      <div className="relative z-[5] flex-1 flex flex-col px-2.5 sm:px-3 lg:px-4 pb-1.5 min-h-0">
        {children}
      </div>

      {pageNumber != null && (
        <span
          className={`page-corner-number ${
            side === "left" ? "page-corner-number-left" : "page-corner-number-right"
          }`}
        >
          page {pageNumber}
        </span>
      )}
    </div>
  );
}
