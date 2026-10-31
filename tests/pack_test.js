/**
 * tests/pack_test.js: checks run_pack.md for all five tracks against an EXPLICIT allow-list written out here
 * (deliberately not imported from build_run_pack.js, so a manifest bug cannot hide itself).
 * For each track it checks: every allow-listed heading line is in the pack; every block's header sha256, word count and line
 * range match the block text; every block is an exact substring of its docs/ source; no source outside the allowed set
 * (no other track's master CV); Section 12 is not in the pack; docs/ matches docs/VERSION.json. It also checks that --full
 * contains the four complete documents byte for byte, and that a renamed heading fails loudly.
 */
const fs = require("fs"), path = require("path"), os = require("os"), cp = require("child_process"), crypto = require("crypto");
const root = path.join(__dirname, ".."), docs = path.join(root, "docs");
const sha = (s) => crypto.createHash("sha256").update(s).digest("hex");
const words = (s) => (s.match(/\S+/g) || []).length;
const rd = (rel) => fs.readFileSync(path.join(docs, rel), "utf8");
let fails = 0;
const bad = (m) => { fails++; console.log("FAIL: " + m); };

const AR_H = ["## SECTION 0: THE PRE-WRITE GATE (READ FIRST, APPLY TO EVERY ARTEFACT)", "## SECTION 2: COVER LETTER ARCHITECTURE",
  "### 2.5 Format choice: prose or evidence table", "## SECTION 7: FORMATTING (COVER LETTER)", "## SECTION 8A: HIRING MANAGER REVIEW (runs before qa_check.py)",
  "## SECTION 11: CV CUSTOMISATION RULES", "## SECTION 15: THE ROLE BRIEF (built in Step 3)", "### 0.2a The AI-isms lexicon"];
const CS_COMMON = ["## SECTION 1: IDENTITY NARRATIVE", "## SECTION 4: KNOWN OBJECTIONS AND BRIDGES",
  "### Objection 2: Indian national in Berlin, work authorisation",
  "### Objection 7: he is an active founder, will he leave in six months (the highest-frequency silent rejection)",
  "## SECTION 5A: METRIC BANK (USE FOR EVERY KEY ACHIEVEMENT)", "### 5B. CLAIMS THAT MUST NOT BE MADE", "## SECTION 7A: STORY BANK (new in v9.4)",
  "## SECTION 9: GAP MITIGATION LIBRARY", "## SECTION 9B: AREAS OF EXPERTISE ECHO MAP, GAP COVERAGE AND CONFIRMED TOOLS"];
const PD_H = ["## Honesty rules (read before drafting anything)", "## Quick index"];
const T = {
  A: { master: "PM_MASTER_CV.md", cs: ["### Track A, Product Manager: Digital Health and AI", "### Track A, PM hiring manager"], rows: ["| A2, ", "| A1 / A3, "], entries: ["portfolio/1-gyro-health.md"] },
  B: { master: "POLICY_MASTER_CV.md", cs: ["### Track B, Tech Policy and AI Governance", "### Track B, policy hiring manager"], rows: ["| B, "], entries: ["portfolio/7-commonstrace.md", "portfolio/2-cmgrs.md"] },
  C: { master: "POLICY_MASTER_CV.md", cs: ["### Track C, Digitalisation Expert / Public Sector / International Development", "### Track C, digitalisation hiring manager"], rows: ["| C, digitalisation", "| C, India"], entries: [] },
  D: { master: "TECH_PM_MASTER_CV.md", cs: ["### Track D, Technical PM / AI Governance PM / Forward Deployed Engineer", "### Track D, technical PM and FDE hiring manager"], rows: ["| D1, ", "| D2, ", "| D3, "], entries: [] },
  E: { master: "PM_MASTER_CV.md", cs: ["### Track E, Product Manager: General and Consumer", "### Track E, consumer and general PM hiring manager"], rows: ["| E1, consumer", "| E1, productivity", "| E2, ", "| E3, marketplace", "| E3, B2B"], entries: [] },
};
const ALL_MASTERS = ["PM_MASTER_CV.md", "POLICY_MASTER_CV.md", "TECH_PM_MASTER_CV.md"];
const HDR = /^<<< PACK \| src=docs\/(\S+) \| lines=(\d+)-(\d+) \| heading="(.*)" \| sha256=([0-9a-f]{64}) \| words=(\d+) >>>$/;

// docs/ vs VERSION.json
const ver = JSON.parse(rd("VERSION.json"));
for (const [rel, rec] of Object.entries(ver.files)) if (sha(fs.readFileSync(path.join(docs, rel))) !== rec.sha256) bad(`docs/${rel} differs from VERSION.json`);

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "pack_test_"));
const jd = path.join(root, "tests", "sample", "JD.txt");
function build(track, extra = []) {
  const out = path.join(tmp, track + extra.join(""));
  const r = cp.spawnSync("node", [path.join(root, "build_run_pack.js"), track, jd, "--out", out, ...extra], { encoding: "utf8" });
  return { r, text: r.status === 0 ? fs.readFileSync(path.join(out, "run_pack.md"), "utf8") : "" };
}
for (const t of Object.keys(T)) {
  const { r, text } = build(t);
  if (r.status !== 0) { bad(`track ${t}: build exited ${r.status}: ${r.stderr}`); continue; }
  const lines = text.split("\n"), spec = T[t];
  const want = [...AR_H, ...CS_COMMON, ...spec.cs, ...PD_H];
  for (const h of want) if (!lines.includes(h)) bad(`track ${t}: heading missing from pack: ${h}`);
  for (const p of spec.rows) if (!lines.some((l) => l.startsWith(p))) bad(`track ${t}: routing row missing: ${p}`);
  // blocks
  const idx = lines.map((l, i) => (l.startsWith("<<< PACK |") ? i : -1)).filter((i) => i >= 0);
  const srcs = [];
  idx.forEach((i, k) => {
    const m = lines[i].match(HDR);
    if (!m) { bad(`track ${t}: malformed header line ${lines[i].slice(0, 80)}`); return; }
    const [, src, a, b, , h, w] = m;
    const end = k + 1 < idx.length ? idx[k + 1] : lines.length;
    let body = lines.slice(i + 1, end).join("\n").replace(/\n+$/, "");
    srcs.push(src);
    if (sha(body) !== h) bad(`track ${t}: sha mismatch in block from ${src} lines ${a}-${b}`);
    if (words(body) !== +w) bad(`track ${t}: word count mismatch in block from ${src} lines ${a}-${b}`);
    const doc = rd(src);
    if (!doc.includes(body)) bad(`track ${t}: block from ${src} lines ${a}-${b} is NOT a substring of docs/${src}`);
    const slice = doc.split("\n").slice(+a - 1, +b).join("\n");
    if (slice !== body) bad(`track ${t}: block from ${src} does not equal lines ${a}-${b} of docs/${src}`);
  });
  const allowedSrc = new Set(["APPLICATION_RULES.md", "CANDIDATE_STRATEGY.md", "PORTFOLIO_DOSSIER.md", spec.master, ...spec.entries]);
  for (const s of srcs) if (!allowedSrc.has(s)) bad(`track ${t}: unexpected source in pack: ${s}`);
  for (const m of ALL_MASTERS) if (m !== spec.master && srcs.includes(m)) bad(`track ${t}: other track's master CV in pack: ${m}`);
  for (const e of spec.entries) if (!srcs.includes(e)) bad(`track ${t}: default entry missing: ${e}`);
  for (const s of ["APPLICATION_RULES.md", "CANDIDATE_STRATEGY.md", "PORTFOLIO_DOSSIER.md", spec.master]) if (!srcs.includes(s)) bad(`track ${t}: no block from ${s}`);
  if (lines.includes("## SECTION 12: OUTREACH RULES")) bad(`track ${t}: Section 12 must not be in the pack`);
  if (!text.includes(rd(spec.master).replace(/\n+$/, ""))) bad(`track ${t}: master CV not in full`);
  // --full
  const f = build(t, ["--full"]);
  if (f.r.status !== 0) bad(`track ${t}: --full exited ${f.r.status}`);
  else for (const d of ["APPLICATION_RULES.md", "CANDIDATE_STRATEGY.md", "PORTFOLIO_DOSSIER.md", spec.master]) if (!f.text.includes(rd(d).replace(/\n+$/, ""))) bad(`track ${t}: --full lacks the complete ${d}`);
}
// a renamed heading must fail loudly (library level, on an in-memory copy; docs/ is untouched)
const L = require(path.join(root, "pack_lib.js"));
const renamed = rd("APPLICATION_RULES.md").replace("## SECTION 8A: HIRING MANAGER REVIEW", "## SECTION 8A: PEER REVIEW");
try { L.extract(renamed, { prefix: "SECTION 8A: HIRING MANAGER REVIEW", level: 2 }, "t"); bad("a renamed heading did not throw"); } catch { /* expected */ }
const dup = rd("CANDIDATE_STRATEGY.md") + "\n## SECTION 7A: STORY BANK again\n";
try { L.extract(dup, { prefix: "SECTION 7A:", level: 2 }, "t"); bad("an ambiguous heading did not throw"); } catch { /* expected */ }
// section printing
const s = cp.spawnSync("node", [path.join(root, "build_run_pack.js"), "--section", "APPLICATION_RULES.md", "SECTION 12"], { encoding: "utf8" });
if (s.status !== 0 || !s.stdout.includes("## SECTION 12: OUTREACH RULES") || !rd("APPLICATION_RULES.md").includes(s.stdout.split("\n").slice(1).join("\n").replace(/\n+$/, ""))) bad("--section SECTION 12 did not print the section verbatim");
fs.rmSync(tmp, { recursive: true, force: true });
console.log(fails ? `PACK TEST: FAIL (${fails})` : "PACK TEST: PASS");
process.exit(fails ? 1 : 0);
