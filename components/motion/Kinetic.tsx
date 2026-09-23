/* ── Kinetic type (brand/MOTION.md, round 2) ─────────────────────────
   Server components. Everything renders as plain, readable text; CSS in
   app/motion.css animates it on first paint and reduced motion shows it
   still. Ideas ported from MIT-licensed kits, rebuilt in plain CSS:
   MaskRevealUp and ScrollRevealParagraph (SmoothUI, Eduardo Calvo),
   Staggered Letter Text Swap (MicroKit, henriquegpb), NumberFlow digit
   reels (SmoothUI). */

import { Children, Fragment, cloneElement, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from "react";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/** Headline lines that rise out of a mask, one after another. */
export function KineticLines({ lines, delay = 0 }: { lines: ReactNode[]; delay?: number }) {
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="m-kin-line" style={{ "--i": i, "--m-kin-delay": `${delay}ms` } as Vars}>
            <span className="m-kin-in">{line}</span>
          </span>
        </Fragment>
      ))}
    </>
  );
}

/** A marker highlight that sweeps in behind a word once its line lands. */
export function Mark({ children, at = 700 }: { children: ReactNode; at?: number }) {
  return <span className="m-mark" style={{ "--m-mark-at": `${at}ms` } as Vars}>{children}</span>;
}

/** A button label whose letters roll to a fresh copy on hover. `whole`
    rolls the label as one piece: required for Arabic, whose letters must
    never be split apart (it would break their joining). */
export function SwapLabel({ text, whole = false }: { text: string; whole?: boolean }) {
  if (whole) {
    return (
      <span className="m-swap m-swap--whole">
        <span className="hw-sr">{text}</span>
        <span className="m-swap-row" aria-hidden="true">
          <span className="m-swap-l" style={{ "--i": 0 } as Vars}><span>{text}</span><span>{text}</span></span>
        </span>
      </span>
    );
  }
  const letters = Array.from(text);
  return (
    <span className="m-swap">
      <span className="hw-sr">{text}</span>
      <span className="m-swap-row" aria-hidden="true">
        {letters.map((ch, i) => (
          <span className="m-swap-l" key={i} style={{ "--i": i } as Vars}>
            <span>{ch === " " ? " " : ch}</span>
            <span>{ch === " " ? " " : ch}</span>
          </span>
        ))}
      </span>
    </span>
  );
}

/** A figure whose digits spin on reels and settle on the value. The real
    text is what screen readers and crawlers get. */
export function DigitRoll({ value, delay = 0 }: { value: string; delay?: number }) {
  let d = 0;
  return (
    <span className="m-roll" style={{ "--m-roll-delay": `${delay}ms` } as Vars}>
      <span className="hw-sr">{value}</span>
      <span aria-hidden="true" className="m-roll-row">
        {Array.from(value).map((ch, i) => {
          if (!/\d/.test(ch)) return <span className="m-roll-ch" key={i}>{ch}</span>;
          const n = +ch;
          const k = d++;
          return (
            <span className="m-roll-reel" key={i} style={{ "--d": n, "--k": k } as Vars}>
              <span className="m-roll-col">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x, j) => <span key={j}>{x}</span>)}
              </span>
              <span className="m-roll-sizer">{ch}</span>
            </span>
          );
        })}
      </span>
    </span>
  );
}

/** A statement whose words light up as it scrolls through the viewport.
    Pass `lines` to set each sentence on its own line (one index across). */
export function ScrollWords({ text, lines, className }: { text?: string; lines?: string[]; className?: string }) {
  const groups = (lines ?? [text ?? ""]).map((l) => l.split(/\s+/));
  const n = groups.reduce((a, g) => a + g.length, 0);
  let i = 0;
  const word = (w: string) => { const k = i++; return <span key={k} style={{ "--i": k } as Vars}>{w} </span>; };
  return (
    <p className={`m-words ${className ?? ""}`} data-scrollwords="" style={{ "--n": n } as Vars}>
      {lines ? groups.map((g, j) => <span className="m-words-line" key={`l${j}`}>{g.map(word)}</span>) : groups[0].map(word)}
    </p>
  );
}

/** A marquee of short items. Duplicated for the loop; the copy is hidden
    from assistive tech. Hover pauses it; reduced motion wraps it still. */
export function Ticker({ items, label, className }: { items: string[]; label: string; className?: string }) {
  return (
    <div className={`m-ticker ${className ?? ""}`} role="region" aria-label={label}>
      <div className="m-ticker-track">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 || undefined}>
            {items.map((t) => <li key={t}>{t}</li>)}
          </ul>
        ))}
      </div>
    </div>
  );
}

/* ── Titles written as <>line one<br /><span>line two</span></> ──────── */

type El = ReactElement<{ children?: ReactNode }>;

/** Plain text of a node, for length checks. */
export function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement(node)) return textOf((node as El).props.children);
  return "";
}

/** Split a title at its <br /> elements into lines, including a <br />
    inside an accent <span> (the span is cloned onto each piece). Lines are
    whole: words and Arabic letter joining are never broken. */
export function titleLines(title: ReactNode): ReactNode[][] {
  const kids = isValidElement(title) && title.type === Fragment ? Children.toArray((title as El).props.children) : Children.toArray(title);
  const lines: ReactNode[][] = [[]];
  kids.forEach((k, i) => {
    if (isValidElement(k) && k.type === "br") { lines.push([]); return; }
    if (isValidElement(k) && typeof k.type === "string" && Children.toArray((k as El).props.children).some((c) => isValidElement(c) && c.type === "br")) {
      let part: ReactNode[] = [];
      let n = 0;
      const flush = () => { if (part.length) lines[lines.length - 1].push(cloneElement(k as El, { key: `${i}-${n++}` }, ...part)); part = []; };
      Children.toArray((k as El).props.children).forEach((c) => {
        if (isValidElement(c) && c.type === "br") { flush(); lines.push([]); } else part.push(c);
      });
      flush();
      return;
    }
    lines[lines.length - 1].push(k);
  });
  return lines.filter((l) => l.length > 0);
}

/** A title as kinetic lines. The first line that is only a short accent
    <span> becomes a marker sweep (short, so it never has to wrap). */
export function KineticTitle({ title, maxMark = 16, markAt = 760, delay = 0 }: { title: ReactNode; maxMark?: number; markAt?: number; delay?: number }) {
  let marked = false;
  const lines = titleLines(title).map((line) => {
    const only = line.length === 1 ? line[0] : null;
    if (!marked && isValidElement(only) && only.type === "span" && textOf(only).trim().length <= maxMark) {
      marked = true;
      return <Mark at={markAt}>{(only as El).props.children}</Mark>;
    }
    return <>{line}</>;
  });
  return <KineticLines lines={lines} delay={delay} />;
}
