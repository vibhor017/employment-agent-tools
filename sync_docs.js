/**
 * sync_docs.js v1.0, 31 October 2026
 * Rewrites docs/ (a byte-exact mirror of the Project documents) and docs/VERSION.json.
 *
 *   node sync_docs.js <folder> [--instructions-version v9.8] [--instructions-date "30 October 2026"] [--partial]
 *
 * <folder> holds freshly read Project documents, for example the output of
 *   node docs_from_transcript.js <folder>
 * run in a session that has project_read every document. Portfolio entry files may sit flat in <folder> (that is how
 * docs_from_transcript.js saves them) or in a portfolio/ subfolder; they are written to docs/portfolio/.
 * Files are copied as bytes, never re-encoded or edited. Without --partial every expected file must be present, so a
 * half-synced mirror cannot be written by accident. With --partial only the files found are replaced and the rest of
 * docs/ is kept (VERSION.json is still recomputed for all of docs/).
 * After ANY edit of a document in the Project, re-run this sync, otherwise run_pack.md is built from stale text.
 */
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const DOCS = path.join(__dirname, "docs");
const TOP = ["CANDIDATE_STRATEGY.md", "APPLICATION_RULES.md", "PORTFOLIO_DOSSIER.md", "PORTFOLIO_ENTRIES.md",
  "PM_MASTER_CV.md", "POLICY_MASTER_CV.md", "TECH_PM_MASTER_CV.md"];
const PORTFOLIO = ["1-gyro-health.md", "2-cmgrs.md", "3-rasahub.md", "4-haqdaar.md", "5-beamerheld.md", "6-typecast.md",
  "7-commonstrace.md", "8-umang-app.md", "evidence-inventory.md"];
const sha = (b) => crypto.createHash("sha256").update(b).digest("hex");

function main(argv) {
  const args = argv.slice(2);
  const opt = (n) => { const i = args.indexOf(n); if (i < 0) return null; const v = args[i + 1]; args.splice(i, 2); return v; };
  const iv = opt("--instructions-version"), idt = opt("--instructions-date");
  const pi = args.indexOf("--partial"), partial = pi >= 0; if (pi >= 0) args.splice(pi, 1);
  const src = args[0];
  if (!src || !fs.existsSync(src) || !fs.statSync(src).isDirectory()) {
    console.error("usage: node sync_docs.js <folder of freshly read project files> [--instructions-version vX.Y] [--instructions-date \"D Month YYYY\"] [--partial]");
    return 2;
  }
  const find = (name, sub) => [path.join(src, name), path.join(src, "portfolio", name)].find((p) => fs.existsSync(p) && fs.statSync(p).isFile()) || null;
  const plan = [];
  const missing = [];
  for (const n of TOP) { const p = find(n); p ? plan.push({ rel: n, from: p }) : missing.push(n); }
  for (const n of PORTFOLIO) { const p = find(n); p ? plan.push({ rel: "portfolio/" + n, from: p }) : missing.push("portfolio/" + n); }
  if (missing.length && !partial) {
    console.error("SYNC FAIL: missing from " + src + ":\n  " + missing.join("\n  ") + "\nRead every document with project_read, save them with docs_from_transcript.js, or pass --partial.");
    return 1;
  }
  if (!plan.length) { console.error("SYNC FAIL: nothing to sync"); return 1; }
  let prev = {};
  try { prev = JSON.parse(fs.readFileSync(path.join(DOCS, "VERSION.json"), "utf8")); } catch { /* first sync */ }
  const version = iv || prev.instructions_version, date = idt || prev.instructions_date;
  if (!version || !date) { console.error("SYNC FAIL: pass --instructions-version and --instructions-date on the first sync"); return 2; }
  fs.mkdirSync(path.join(DOCS, "portfolio"), { recursive: true });
  let changed = 0;
  for (const { rel, from } of plan) {
    const bytes = fs.readFileSync(from), to = path.join(DOCS, rel);
    const old = fs.existsSync(to) ? fs.readFileSync(to) : null;
    if (!old || !old.equals(bytes)) { fs.writeFileSync(to, bytes); changed++; console.log("updated  " + rel); }
  }
  const files = {};
  for (const rel of [...TOP, ...PORTFOLIO.map((n) => "portfolio/" + n)]) {
    const p = path.join(DOCS, rel);
    if (!fs.existsSync(p)) continue;
    const b = fs.readFileSync(p); files[rel] = { sha256: sha(b), bytes: b.length };
  }
  const out = { instructions_version: version, instructions_date: date, files };
  fs.writeFileSync(path.join(DOCS, "VERSION.json"), JSON.stringify(out, null, 2) + "\n");
  console.log(`SYNC OK: ${plan.length} file(s) read, ${changed} changed, VERSION.json written (${Object.keys(files).length} files, instructions ${version}, ${date})`);
  return 0;
}
module.exports = { TOP, PORTFOLIO, sha };
if (require.main === module) process.exit(main(process.argv));
