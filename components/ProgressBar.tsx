"use client";

import PrintedMeter from "@/components/ui/PrintedMeter";

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showCount?: boolean;
}

export default function ProgressBar({
  current,
  total,
  label,
  showCount = true,
}: ProgressBarProps) {
  return (
    <div className="w-full">
      {label && (
        <p className="text-[10px] font-bold mb-1.5 tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {label}
        </p>
      )}
      <div className="flex items-center gap-3">
        <PrintedMeter current={current} total={total} className="flex-1" />
        {showCount && (
          <span
            className="text-sm font-extrabold whitespace-nowrap"
            style={{
              fontFamily: "var(--font-display), Impact, sans-serif",
              color: "var(--gold-light)",
              textShadow: "0 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            {current}/{total}
          </span>
        )}
      </div>
    </div>
  );
}
