import Link from "next/link";
import { stadiumsWithImageCredits } from "@/lib/stadiums";
import { formatImageCredit, hasImageCreditDetails } from "@/lib/imageCredits";

function hasText(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export default function ImageCreditsPage() {
  const stadiums = stadiumsWithImageCredits();
  const completedCount = stadiums.filter((stadium) =>
    stadium.image?.credit ? hasImageCreditDetails(stadium.image.credit) : false
  ).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-10">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1
          className="text-2xl sm:text-3xl"
          style={{
            fontFamily: "var(--font-display), Impact, sans-serif",
            color: "var(--gold-light)",
            textTransform: "uppercase",
            letterSpacing: "0.03em",
          }}
        >
          Image Credits
        </h1>
        <Link
          href="/"
          className="text-xs sm:text-sm font-bold uppercase tracking-wider underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
          style={{ color: "var(--gold-light)" }}
        >
          Back home
        </Link>
      </div>

      <p className="text-xs sm:text-sm text-white/65 mb-4">
        {completedCount} of {stadiums.length} image credits completed.
      </p>

      <div className="space-y-4">
        {stadiums.map((stadium) => {
          const credit = stadium.image?.credit;
          if (!credit) return null;

          const hasDetails = hasImageCreditDetails(credit);
          const sourceName = hasText(credit.sourceName)
            ? credit.sourceName
            : "Wikimedia Commons";

          return (
            <article
              key={stadium.id}
              className="rounded-md border border-white/15 bg-black/20 p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-white">
                  {stadium.stadium}
                </h2>
                <span
                  className={`text-[10px] sm:text-xs uppercase font-bold tracking-wider ${
                    hasDetails ? "text-emerald-300" : "text-white/55"
                  }`}
                >
                  {hasDetails ? "Complete" : "Details pending"}
                </span>
              </div>
              <p className="text-xs text-white/70 mb-2">{stadium.club}</p>

              {!hasDetails ? (
                <p className="text-sm text-white/60 italic">
                  Image credit (add details)
                </p>
              ) : (
                <p className="text-sm text-white/80 leading-relaxed break-words">
                  {formatImageCredit(credit)}
                </p>
              )}

              <div className="mt-3 grid gap-1 text-xs text-white/70">
                <p>
                  <span className="font-semibold text-white/85">Title:</span>{" "}
                  {hasText(credit.title) ? credit.title : "Not set"}
                </p>
                <p>
                  <span className="font-semibold text-white/85">Author:</span>{" "}
                  {hasText(credit.authorName) ? credit.authorName : "Not set"}
                </p>
                <p>
                  <span className="font-semibold text-white/85">
                    Author URL:
                  </span>{" "}
                  {hasText(credit.authorUrl) ? (
                    <a
                      href={credit.authorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
                    >
                      {credit.authorUrl}
                    </a>
                  ) : (
                    "Not set"
                  )}
                </p>
                <p>
                  <span className="font-semibold text-white/85">Source:</span>{" "}
                  {sourceName}
                </p>
                <p>
                  <span className="font-semibold text-white/85">
                    Source URL:
                  </span>{" "}
                  {hasText(credit.sourceUrl) ? (
                    <a
                      href={credit.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
                    >
                      {credit.sourceUrl}
                    </a>
                  ) : (
                    "Not set"
                  )}
                </p>
                <p>
                  <span className="font-semibold text-white/85">License:</span>{" "}
                  {hasText(credit.licenseName) ? credit.licenseName : "Not set"}
                </p>
                <p>
                  <span className="font-semibold text-white/85">
                    License URL:
                  </span>{" "}
                  {hasText(credit.licenseUrl) ? (
                    <a
                      href={credit.licenseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
                    >
                      {credit.licenseUrl}
                    </a>
                  ) : (
                    "Not set"
                  )}
                </p>
                <p>
                  <span className="font-semibold text-white/85">Modified:</span>{" "}
                  {credit.modified ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-semibold text-white/85">Notes:</span>{" "}
                  {hasText(credit.notes) ? credit.notes : "None"}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
