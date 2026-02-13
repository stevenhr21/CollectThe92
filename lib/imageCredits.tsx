import type { ReactNode } from "react";
import type { ImageCredit } from "@/lib/types";

function hasText(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function hasImageCreditDetails(credit: ImageCredit): boolean {
  return (
    hasText(credit.title) ||
    hasText(credit.authorName) ||
    hasText(credit.authorUrl) ||
    hasText(credit.sourceName) ||
    hasText(credit.sourceUrl) ||
    hasText(credit.licenseName) ||
    hasText(credit.licenseUrl) ||
    credit.modified ||
    hasText(credit.notes)
  );
}

export function formatImageCredit(credit: ImageCredit): ReactNode {
  const title = hasText(credit.title) ? `"${credit.title}"` : "Untitled image";

  const author = hasText(credit.authorName)
    ? credit.authorName
    : hasText(credit.authorUrl)
      ? "author"
      : "unknown author";

  const source = hasText(credit.sourceName)
    ? credit.sourceName
    : "Wikimedia Commons";

  const license = hasText(credit.licenseName)
    ? credit.licenseName
    : hasText(credit.licenseUrl)
      ? "license"
      : "Unspecified license";

  return (
    <>
      {title} by{" "}
      {hasText(credit.authorUrl) ? (
        <a
          href={credit.authorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-dotted underline-offset-2 hover:decoration-solid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
        >
          {author}
        </a>
      ) : (
        author
      )}
      {", via "}
      {hasText(credit.sourceUrl) ? (
        <a
          href={credit.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-dotted underline-offset-2 hover:decoration-solid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
        >
          {source}
        </a>
      ) : (
        source
      )}
      {", "}
      {hasText(credit.licenseUrl) ? (
        <a
          href={credit.licenseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-dotted underline-offset-2 hover:decoration-solid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
        >
          {license}
        </a>
      ) : (
        license
      )}
      .
      {credit.modified ? " Modified." : ""}
      {hasText(credit.notes) ? ` ${credit.notes}.` : ""}
    </>
  );
}
