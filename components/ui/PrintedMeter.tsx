interface PrintedMeterProps {
  current: number;
  total: number;
  className?: string;
}

export default function PrintedMeter({
  current,
  total,
  className = "",
}: PrintedMeterProps) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className={["printed-meter", className].join(" ")}>
      <div className="printed-meter-fill" style={{ width: `${pct}%` }} />
      <div className="printed-meter-ticks" aria-hidden="true" />
    </div>
  );
}
