import { AUTHOR, fmtDate } from "@/lib/authors";

/* The visible byline on guides and tools: who wrote it, in what role,
   and when it was first published and last updated. */
export function Byline({ published, updated, locale = "en" }: { published?: string; updated?: string; locale?: "en" | "ar" }) {
  const ar = locale === "ar";
  const showPublished = published && published !== updated;
  return (
    <p className="hw-byline" style={{ margin: "0 0 28px", fontSize: "15px", lineHeight: 1.5, color: "var(--hw-sub, #46566A)" }}>
      {ar ? "بقلم " : "Written by "}
      <a href={`/authors/${AUTHOR.slug}`} rel="author"><strong>{AUTHOR.name}</strong></a>
      {ar ? `، ${AUTHOR.ar.jobTitle}، ${AUTHOR.org}` : `, ${AUTHOR.jobTitle}, ${AUTHOR.org}`}
      {showPublished && <>{" · "}{ar ? "نُشر " : "Published "}<time dateTime={published}>{fmtDate(published!)}</time></>}
      {updated && <>{" · "}{ar ? "حُدّث " : "Updated "}<time dateTime={updated}>{fmtDate(updated)}</time></>}
    </p>
  );
}
