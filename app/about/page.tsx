import Link from "next/link";
import KofiButton from "@/components/KofiButton";

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
      <h1
        className="merlin-title-3d text-3xl"
      >
        About CollectThe92
      </h1>

      <div className="space-y-5 text-sm leading-relaxed" style={{ color: "#C0B8A8" }}>
        <p>
          <strong className="text-white">CollectThe92</strong> is a digital sticker album inspired by the
          classic football sticker albums of the 2000s. The goal is simple: visit all 92 English
          league football grounds and mark them off in your personal collection.
        </p>

        <p>
          No proof is required – this is an honour-system tracker. Tick off grounds
          you&apos;ve visited and watch your album fill up, spread by spread.
        </p>

        <h2
          className="text-lg pt-4"
          style={{
            fontFamily: "var(--font-display), Impact, sans-serif",
            textTransform: "uppercase",
            color: "var(--gold)",
            textShadow: "1px 1px 0 var(--gold-dark)",
          }}
        >
          How it works
        </h2>
        <ul className="list-disc list-inside space-y-1.5 ml-2">
          <li>Browse leagues: Premier League, Championship, League One, League Two</li>
          <li>Click on any sticker slot to see stadium details</li>
          <li>Mark stadiums as visited to &ldquo;place the sticker&rdquo;</li>
          <li>Track your progress across all 92 grounds</li>
        </ul>

        <h2
          className="text-lg pt-4"
          style={{
            fontFamily: "var(--font-display), Impact, sans-serif",
            textTransform: "uppercase",
            color: "var(--gold)",
            textShadow: "1px 1px 0 var(--gold-dark)",
          }}
        >
          Accounts, syncing and local mode
        </h2>
        <p>You&apos;ve now got two ways to save progress:</p>
        <ul className="list-disc list-inside space-y-1.5 ml-2">
          <li>Create an account (recommended): your collection is saved to your profile, so you can log in on any device and pick up where you left off</li>
          <li>No account: your progress is saved locally in your browser. This is device-specific - if you clear your browser data, switch browsers, or change device, you&apos;ll lose that local progress</li>
        </ul>

        <h2
          className="text-lg pt-4"
          style={{
            fontFamily: "var(--font-display), Impact, sans-serif",
            textTransform: "uppercase",
            color: "var(--gold)",
            textShadow: "1px 1px 0 var(--gold-dark)",
          }}
        >
          Leagues with friends
        </h2>
        <p>Want to make it competitive? You can:</p>
        <ul className="list-disc list-inside space-y-1.5 ml-2">
          <li><b>Create a league</b> and invite friends to join</li>
          <li><b>Join an existing league</b></li>
          <li>Compete to see who can <b>collect the 92 first</b></li>
        </ul>

        <h2
          className="text-lg pt-4"
          style={{
            fontFamily: "var(--font-display), Impact, sans-serif",
            textTransform: "uppercase",
            color: "var(--gold)",
            textShadow: "1px 1px 0 var(--gold-dark)",
          }}
        >
          Disclaimer
        </h2>
        <p>
          This is an independent fan project. It is not affiliated with, endorsed by,
          or connected to any football league, club, or sticker album brand. All
          stadium data is approximate and for entertainment purposes.
        </p>
      </div>

      <div
        className="mt-8 rounded-lg border p-5 text-center space-y-3"
        style={{
          borderColor: "rgba(218, 165, 32, 0.2)",
          background: "rgba(218, 165, 32, 0.04)",
        }}
      >
        <h2
          className="text-lg"
          style={{
            fontFamily: "var(--font-display), Impact, sans-serif",
            textTransform: "uppercase",
            color: "var(--gold)",
            textShadow: "1px 1px 0 var(--gold-dark)",
          }}
        >
          Support the project
        </h2>
        <p className="text-sm" style={{ color: "#C0B8A8" }}>
          CollectThe92 is free and always will be. If you enjoy using it,
          consider buying us a coffee to help keep it running.
        </p>
        <KofiButton variant="gold" />
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
