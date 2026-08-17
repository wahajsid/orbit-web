"use client";

import { usePathname } from "next/navigation";

/* The EN ⇄ ع switcher. Maps the current path to its twin in the other
   language. Guide articles and calculator pages have no Arabic twin yet,
   so they fall back to the Arabic index of their section. */

function twinOf(path: string): { isAr: boolean; target: string } {
  const isAr = path === "/ar" || path.startsWith("/ar/");
  if (isAr) {
    const rest = path === "/ar" ? "/" : path.slice(3) || "/";
    return { isAr, target: rest };
  }
  let p = path;
  if (p.startsWith("/guides/")) p = "/guides";
  if (p.startsWith("/tools/")) p = "/tools";
  return { isAr, target: p === "/" ? "/ar" : `/ar${p}` };
}

export function LangSwitch() {
  const { isAr, target } = twinOf(usePathname() || "/");
  return (
    <a
      href={target}
      className="mg-lang"
      aria-label={isAr ? "English" : "العربية"}
      style={{ textDecoration: "none" }}
    >
      {isAr ? (
        <>
          <span className="mg-lang-alt">EN</span> · ع
        </>
      ) : (
        <>
          EN · <span className="mg-lang-alt">ع</span>
        </>
      )}
    </a>
  );
}

/* Footer variant — the plain-text "EN / العربية" tag, alternate linked. */
export function LangSwitchFooter() {
  const { isAr, target } = twinOf(usePathname() || "/");
  return isAr ? (
    <>
      <a href={target} style={{ color: "inherit" }}>EN</a> / <bdi>العربية</bdi>
    </>
  ) : (
    <>
      EN / <a href={target} style={{ color: "inherit" }}><bdi>العربية</bdi></a>
    </>
  );
}
