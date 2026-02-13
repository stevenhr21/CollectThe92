import Link from "next/link";

export default function BadgesPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center space-y-6">
      <h1 className="merlin-title-3d text-3xl">
        Badges
      </h1>

      <div
        className="rounded-lg p-10"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "3px solid var(--gold-dark)",
          boxShadow: "0 4px 0 0 #3D352C, 0 6px 16px rgba(0,0,0,0.3)",
        }}
      >
        <div className="text-6xl mb-4">🏅</div>
        <h2
          className="text-xl"
          style={{
            fontFamily: "var(--font-display), Impact, sans-serif",
            color: "var(--gold)",
            textTransform: "uppercase",
          }}
        >
          Coming Soon
        </h2>
        <p className="mt-3 max-w-sm mx-auto text-sm" style={{ color: "#8B7B6B" }}>
          Earn badges for milestones like completing a league, visiting 50 grounds, or
          going to all London stadiums. Check back soon!
        </p>
      </div>

      <Link
        href="/"
        className="inline-block mt-6 text-sm font-bold uppercase tracking-wider"
        style={{ color: "var(--gold)" }}
      >
        ← Back to Home
      </Link>
    </div>
  );
}
