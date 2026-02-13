"use client";

interface SpreadNavigatorProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onJump?: (spread: number) => void;
}

export default function SpreadNavigator({
  current,
  total,
  onPrev,
  onNext,
  onJump,
}: SpreadNavigatorProps) {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <button
        onClick={onPrev}
        disabled={current <= 0}
        className="px-4 py-2 rounded-md font-extrabold text-xs uppercase tracking-wider
                   transition-all active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed"
        style={{
          fontFamily: "var(--font-display), Impact, sans-serif",
          background: "linear-gradient(180deg, #555 0%, #333 100%)",
          color: "#DDD",
          border: "2px solid #666",
          boxShadow: "0 2px 0 0 #222, 0 3px 6px rgba(0,0,0,0.3)",
          textShadow: "0 1px 2px rgba(0,0,0,0.5)",
        }}
        aria-label="Previous spread"
      >
        ◀ Prev
      </button>

      {onJump ? (
        <select
          value={current}
          onChange={(e) => onJump(Number(e.target.value))}
          className="px-3 py-2 rounded-md text-xs font-extrabold uppercase
                     cursor-pointer text-center min-w-[130px]"
          style={{
            fontFamily: "var(--font-display), Impact, sans-serif",
            background: "linear-gradient(180deg, #444 0%, #2A2520 100%)",
            color: "var(--gold-light)",
            border: "2px solid var(--gold-dark)",
            boxShadow: "0 2px 0 0 #111, 0 3px 6px rgba(0,0,0,0.3)",
          }}
          aria-label="Jump to spread"
        >
          {Array.from({ length: total }, (_, i) => (
            <option key={i} value={i}>
              Spread {i + 1} of {total}
            </option>
          ))}
        </select>
      ) : (
        <span
          className="text-xs font-extrabold min-w-[100px] text-center uppercase tracking-wider"
          style={{
            fontFamily: "var(--font-display), Impact, sans-serif",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          Spread {current + 1} of {total}
        </span>
      )}

      <button
        onClick={onNext}
        disabled={current >= total - 1}
        className="px-4 py-2 rounded-md font-extrabold text-xs uppercase tracking-wider
                   transition-all active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed"
        style={{
          fontFamily: "var(--font-display), Impact, sans-serif",
          background: "linear-gradient(180deg, #555 0%, #333 100%)",
          color: "#DDD",
          border: "2px solid #666",
          boxShadow: "0 2px 0 0 #222, 0 3px 6px rgba(0,0,0,0.3)",
          textShadow: "0 1px 2px rgba(0,0,0,0.5)",
        }}
        aria-label="Next spread"
      >
        Next ▶
      </button>
    </div>
  );
}
