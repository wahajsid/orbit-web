/* ── Working-paper strip (Tick & Tie, brand/tick-and-tie/BRAND.md) ────
   Opens each homepage section the way a page opens in an audit file:
   a reference at the start, who prepared it (or "Illustrative data") at
   the end. The reference is structure, not decoration: H-1 to H-13
   follow the page order. On Arabic pages the strip reads right to left;
   the reference itself stays Latin, as it would in the file. */

export type Locale = "en" | "ar";

export function Wp({ r, children, right, locale = "en" }: { r: string; children: React.ReactNode; right?: React.ReactNode; locale?: Locale }) {
  return (
    <p className="tt-wp">
      <span>{locale === "ar" ? "مرجع ورقة العمل" : "W/P ref"} <b><bdi>{r}</bdi></b> · {children}</span>
      {right && <span>{right}</span>}
    </p>
  );
}

/* A red review mark. Decorative: the words beside it always say the same thing. */
export function Tm({ m, label }: { m: string; label?: string }) {
  return label ? <span className="tt-tm" role="img" aria-label={label}>{m}</span> : <span className="tt-tm" aria-hidden="true">{m}</span>;
}
