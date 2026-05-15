"use client";

import type { ReactNode } from "react";
import Plaque from "@/components/ui/Plaque";
import ShieldMark from "@/components/ui/ShieldMark";

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
      className={`album-page album-paper-page papergrain relative flex flex-col min-w-0 h-full
                  ${side === "left" ? "rounded-l-lg" : "rounded-r-lg"}`}
      style={{
        ["--page-accent" as string]: pageColor,
        ["--page-accent-light" as string]: pageColorLight,
        boxShadow:
          side === "left"
            ? "inset -16px 0 24px -18px rgba(0,0,0,0.55), inset 0 0 38px rgba(96,67,25,0.14)"
            : "inset 16px 0 24px -18px rgba(0,0,0,0.55), inset 0 0 38px rgba(96,67,25,0.14)",
      }}
    >
      {/* Stitch border */}
      <div
        className="album-page-keyline absolute pointer-events-none z-[3]"
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
          <div className="flex items-center gap-2 min-w-0">
            <ShieldMark className="page-shield" />
            <div className="min-w-0">
              <p className="album-page-header-title truncate">
                {leagueName || "Album"}
              </p>
              <p className="album-page-header-meta">
                Spread {spreadNumber} - {visitedCount}/{totalCount} collected
              </p>
            </div>
          </div>
          <Plaque className="page-edition-plaque text-[8px] px-2 py-0.5">
            2025/26
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
