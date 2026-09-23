"use client";

export function PeachScroller({ phrases }: { phrases: string[] }) {
  const doubled = [...phrases, ...phrases];
  return (
    <div className="hw-band" aria-label="Statement strip">
      <div className="hw-band-clip">
        <div className="hw-band-track" style={{ animationDuration: `${Math.max(35, phrases.length * 7)}s` }}>
          {doubled.map((p, i) => (
            <span key={i} aria-hidden={i >= phrases.length || undefined}>
              {p} ·&nbsp;
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
