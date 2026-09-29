/* ── Working-paper strip (Tick & Tie, brand/tick-and-tie/BRAND.md) ────
   Opens each homepage section the way a page opens in an audit file:
   a reference on the left, who prepared it (or "Illustrative data") on
   the right. The reference is structure, not decoration: H-1 to H-13
   follow the page order. */

export function Wp({ r, children, right }: { r: string; children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <p className="tt-wp">
      <span>W/P ref <b>{r}</b> · {children}</span>
      {right && <span>{right}</span>}
    </p>
  );
}

/* A red review mark. Decorative: the words beside it always say the same thing. */
export function Tm({ m, label }: { m: string; label?: string }) {
  return label ? <span className="tt-tm" role="img" aria-label={label}>{m}</span> : <span className="tt-tm" aria-hidden="true">{m}</span>;
}
