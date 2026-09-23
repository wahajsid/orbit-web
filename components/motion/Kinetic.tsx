/* ── Kinetic type (brand/MOTION.md, round 2) ─────────────────────────
   Server components. Everything renders as plain, readable text; CSS in
   app/motion.css animates it on first paint and reduced motion shows it
   still. Ideas ported from MIT-licensed kits, rebuilt in plain CSS:
   MaskRevealUp and ScrollRevealParagraph (SmoothUI, Eduardo Calvo),
   Staggered Letter Text Swap (MicroKit, henriquegpb), NumberFlow digit
   reels (SmoothUI). */

import type { CSSProperties, ReactNode } from "react";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/** Headline lines that rise out of a mask, one after another. */
export function KineticLines({ lines, delay = 0 }: { lines: ReactNode[]; delay?: number }) {
  return (
    <>
      {lines.map((line, i) => (
        <span className="m-kin-line" key={i} style={{ "--i": i, "--m-kin-delay": `${delay}ms` } as Vars}>
          <span className="m-kin-in">{line}</span>
        </span>
      ))}
    </>
  );
}

/** A marker highlight that sweeps in behind a word once its line lands. */
export function Mark({ children, at = 700 }: { children: ReactNode; at?: number }) {
  return <span className="m-mark" style={{ "--m-mark-at": `${at}ms` } as Vars}>{children}</span>;
}

/** A button label whose letters roll to a fresh copy on hover. */
export function SwapLabel({ text }: { text: string }) {
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

/** A statement whose words light up as it scrolls through the viewport. */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(/\s+/);
  return (
    <p className={`m-words ${className ?? ""}`} data-scrollwords="" style={{ "--n": words.length } as Vars}>
      {words.map((w, i) => (
        <span key={i} style={{ "--i": i } as Vars}>{w} </span>
      ))}
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
