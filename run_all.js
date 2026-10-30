/**
 * run_all.js v1.0, 30 October 2026
 * The whole mechanical gate in one command, with output cut to what needs a decision.
 *
 * USAGE
 *   node run_all.js [app_dir] [--no-docx]
 *
 * Runs, in order, stopping at the first blocking step:
 *   1. build_application.js   (marker gate, letter word band, writes CV.txt and CL.txt)
 *   2. qa_check.py hm          (hm_review.md)
 *   3. qa_check.py cv / cl     (on the text drafts, with --jd)
 *   4. build_application.js docx, then qa_check.py cv / cl on both .docx files   (skipped with --no-docx)
 *   5. qa_check.py net         (only if <app_dir>/out/<base>_NET.md exists)
 *
 * Output: the per-paragraph word counts, then only FAIL and WARN lines (cut to 170 characters), then one line:
 *   RUN_ALL: PASS (n warnings)   or   RUN_ALL: FAIL at <step>
 * Exit code 0 on PASS, 1 on any FAIL. Nothing here changes what a check enforces: it calls the same scripts the
 * agent used to call one by one, so one run replaces about eight tool calls and their raw output.
 */
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const args = process.argv.slice(2);
const noDocx = args.includes("--no-docx");
const appDir = path.resolve(args.find((a) => !a.startsWith("--")) || "/home/claude/app");
const DRAFT_DIR = process.env.DRAFT_DIR || "/home/claude";
const jd = path.join(DRAFT_DIR, "JD.txt");
const here = __dirname;
const meta = JSON.parse(fs.readFileSync(path.join(appDir, "meta.json"), "utf8"));
const out = path.join(appDir, "out");

let warnTotal = 0;
const lines = [];
const say = (s) => lines.push(s);
const cut = (s) => (s.length > 170 ? s.slice(0, 167) + "..." : s);

function run(cmd, argv, label) {
  const r = spawnSync(cmd, argv, { encoding: "utf8", env: process.env });
  const text = (r.stdout || "") + (r.stderr || "");
  return { code: r.status, text, label };
}
function report(r, { showHead } = {}) {
  for (const l of r.text.split("\n")) {
    if (!l.trim()) continue;
    if (/^\s*(FAIL|WARN)\b/.test(l) || /BUDGET|UNTAILORED|HM REVIEW MISSING|budget WARN/.test(l)) {
      if (/^\s*WARN\b|budget WARN/.test(l)) warnTotal++;
      say(`  [${r.label}] ${cut(l.trim())}`);
    } else if (showHead && /^drafts written/.test(l)) say(l.trim());
  }
}
function stop(r, step) {
  report(r, { showHead: true });
  say(`RUN_ALL: FAIL at ${step}`);
  console.log(lines.join("\n"));
  process.exit(1);
}

// Tailoring accountability (informational): how many Gyro Health and IPAC bullets are still the master default.
function tailoringNote() {
  try {
    if (!meta.track) return;
    const skPath = path.join(here, "skeletons", meta.track, "cv_data.js");
    if (!fs.existsSync(skPath)) return;
    const sk = require(skPath).data, cv = require(path.join(appDir, "cv_data.js")).data;
    const pick = (d) => (d.experience || []).filter((e) => /Gyro Health|IPAC|Indian Political/.test(e.org)).flatMap((e) => e.bullets || []);
    const base = new Set(pick(sk)), mine = pick(cv);
    if (!mine.length) return;
    const same = mine.filter((b) => base.has(b)).length;
    say(`tailoring: ${mine.length - same} of ${mine.length} Gyro Health and IPAC bullets reworded from the master default`);
    if (same / mine.length > 0.6) { warnTotal++; say(`  [tailor] WARN ${same} of ${mine.length} Gyro Health and IPAC bullets are still the master default; reword each into the JD vocabulary (APPLICATION_RULES.md 11.5)`); }
  } catch (e) { /* informational only */ }
}

// 1. build drafts
let r = run("node", [path.join(here, "build_application.js"), appDir], "build");
if (r.code !== 0) stop(r, "build");
report(r, { showHead: true });
tailoringNote();

// 2. hm review record
const hmPath = path.join(appDir, "hm_review.md");
if (!fs.existsSync(hmPath)) { say("  [hm] hm_review.md missing: write it (APPLICATION_RULES.md 8A) and rerun"); say("RUN_ALL: FAIL at hm"); console.log(lines.join("\n")); process.exit(1); }
if (fs.readFileSync(hmPath, "utf8").includes("⟦")) { say("  [hm] hm_review.md still holds a ⟦TAILOR⟧ template line"); say("RUN_ALL: FAIL at hm"); console.log(lines.join("\n")); process.exit(1); }
r = run("python3", [path.join(here, "qa_check.py"), "hm", hmPath], "hm");
const hmHead = (r.text.split("\n")[0] || "").match(/\((\d+\/12 pass)\)/);
if (r.code !== 0) stop(r, "hm");
report(r);

// 3. text drafts
for (const mode of ["cv", "cl"]) {
  r = run("python3", [path.join(here, "qa_check.py"), mode, path.join(DRAFT_DIR, mode.toUpperCase() + ".txt"), "--jd", jd], mode + ".txt");
  report(r);
  if (r.code !== 0) stop(r, `${mode} draft`);
}

// 4. docx
if (!noDocx) {
  r = run("node", [path.join(here, "build_application.js"), appDir, "docx"], "docx");
  if (r.code !== 0) stop(r, "docx build");
  for (const mode of ["cv", "cl"]) {
    const f = path.join(out, `${meta.base}_${mode.toUpperCase()}.docx`);
    if (!fs.existsSync(f)) { say(`  [docx] missing ${f}`); stop({ text: "", label: "docx" }, "docx build"); }
    r = run("python3", [path.join(here, "qa_check.py"), mode, f, "--jd", jd], mode + ".docx");
    report(r);
    if (r.code !== 0) stop(r, `${mode} docx`);
  }
}

// 5. networking package, if written
const net = path.join(out, `${meta.base}_NET.md`);
let netNote = "";
if (fs.existsSync(net)) {
  r = run("python3", [path.join(here, "qa_check.py"), "net", net], "net");
  report(r);
  if (r.code !== 0) stop(r, "net");
  netNote = ", net checked";
} else netNote = ", NET.md not written yet";

say(`RUN_ALL: PASS (${warnTotal} warning${warnTotal === 1 ? "" : "s"}; HM ${hmHead ? hmHead[1] : "ok"}${noDocx ? ", docx skipped" : ", docx built and checked"}${netNote})`);
console.log(lines.join("\n"));
