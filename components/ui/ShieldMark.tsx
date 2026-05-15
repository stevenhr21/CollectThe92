interface ShieldMarkProps {
  className?: string;
  label?: string;
}

export default function ShieldMark({
  className = "",
  label = "92",
}: ShieldMarkProps) {
  return (
    <span className={`shield-mark ${className}`} aria-hidden="true">
      <span>{label}</span>
    </span>
  );
}
