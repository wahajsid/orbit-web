"use client";

/* The nav's FOUNDING COHORT link — opens the hero capture form in place
   (one click to typing an email) instead of anchoring down the page. */

import { CLAIM_EVENT } from "./Hero";

export function NavClaim() {
  return (
    <a
      href="#top"
      className="nav-cta"
      onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event(CLAIM_EVENT)); }}
    >
      FOUNDING COHORT →
    </a>
  );
}
