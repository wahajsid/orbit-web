/* Release check: the homepage must ship with its hero capture and
   all five walkthrough captures. The page itself degrades to a labelled "pending"
   panel when one is missing; this makes that state fail a release.

     npm run check:release                                              */

import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "public", "home", "screens");
// Tight crops are deliberate (legibility beats width), so the floor is
// per file rather than a blanket 1400px.
const REQUIRED = [
  ["00-hero-intake.png", 600],
  ["01-app-intake.png", 1400],
  ["02-app-coded-checked.png", 700],
  ["03-app-second-opinion.png", 1400],
  ["04-app-journal-why.png", 1400],
  ["05-app-position.png", 1400],
];

let failed = 0;
for (const [file, minWidth] of REQUIRED) {
  const full = path.join(DIR, file);
  if (!fs.existsSync(full)) { console.error(`MISSING  ${file}`); failed++; continue; }
  const buf = fs.readFileSync(full);
  const width = buf.toString("ascii", 1, 4) === "PNG" ? buf.readUInt32BE(16) : 0;
  if (!width) { console.error(`NOT PNG  ${file}`); failed++; continue; }
  if (width < minWidth) { console.error(`NARROW   ${file} is ${width}px wide, wants at least ${minWidth}px`); failed++; continue; }
  console.log(`ok       ${file} (${width}px)`);
}

if (failed) {
  console.error(`\n${failed} of ${REQUIRED.length} homepage captures are not release-ready. Do not deploy the homepage.`);
  process.exit(1);
}
console.log("\nAll homepage captures are present.");
