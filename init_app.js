/**
 * init_app.js v1.1, 30 October 2026
 * Step 1 setup in one call, so nothing is retyped and nothing is installed twice.
 *
 * USAGE
 *   node init_app.js <jd_file> [app_dir] [--track A|B|C|D|E] [--company "Name"] [--role "Title"]
 *     jd_file   the attached or pasted JD, already on disk (an attachment path, or a file the agent saved once)
 *     app_dir   default /home/claude/app
 *     --track   scaffold the application folder from skeletons/<track>/ (default content of that track's master CV)
 *     --company, --role   used for the file-name stem in meta.json: YYYYMMDD + Company + RoleTitle, letters and digits only
 *
 * What it does
 *   1. Creates app_dir (and app_dir/out).
 *   2. Copies the JD byte for byte to $DRAFT_DIR/JD.txt (default /home/claude/JD.txt), the file qa_check.py --jd reads.
 *      The JD is never retyped: a retyped JD costs output tokens and can drift from the posting.
 *   3. Runs `npm install --no-package-lock` in this folder only if docx is not installed yet, so a fresh clone works
 *      and no lockfile is left untracked in the repo.
 *   4. With --track: writes cv_data.js, cl_data.js, meta.json and hm_review.md into app_dir. Fields the Role Brief
 *      must rewrite carry the TAILOR marker; build_application.js exits 5 until every marker is gone. Existing files in
 *      app_dir are never overwritten (pass --force to replace them).
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const argv = process.argv.slice(2);
const flag = (name) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : undefined; };
const force = argv.includes("--force");
const valueFlags = new Set(["--track", "--company", "--role"]);
const positional = [];
for (let i = 0; i < argv.length; i++) {
  if (valueFlags.has(argv[i])) { i++; continue; }
  if (argv[i].startsWith("--")) continue;
  positional.push(argv[i]);
}
const [jdArg, appArg] = positional;
if (!jdArg) {
  console.error('usage: node init_app.js <jd_file> [app_dir] [--track A|B|C|D|E] [--company "Name"] [--role "Title"]');
  process.exit(2);
}
const jd = path.resolve(jdArg);
if (!fs.existsSync(jd)) {
  console.error(`JD file not found: ${jd}`);
  process.exit(2);
}
const appDir = path.resolve(appArg || "/home/claude/app");
const draftDir = process.env.DRAFT_DIR || "/home/claude";

fs.mkdirSync(path.join(appDir, "out"), { recursive: true });
fs.copyFileSync(jd, path.join(draftDir, "JD.txt"));

let installed = "already installed";
if (!fs.existsSync(path.join(__dirname, "node_modules", "docx"))) {
  execSync("npm install --no-package-lock --silent", { cwd: __dirname, stdio: "inherit" });
  installed = "installed";
}
const words = (fs.readFileSync(jd, "utf8").match(/\S+/g) || []).length;
let msg = `app dir ready: ${appDir} | JD copied to ${path.join(draftDir, "JD.txt")} (${words} words) | docx ${installed}`;

const track = (flag("--track") || "").toUpperCase();
if (track) {
  if (!/^[A-E]$/.test(track)) { console.error("--track must be A, B, C, D or E"); process.exit(2); }
  const sk = path.join(__dirname, "skeletons");
  const TITLES = {
    A: "Founder and Technical Product Lead, Gyro Health  |  MPP, Hertie School Berlin",
    B: "AI Governance and Digital Policy Specialist  |  MPP (AI Governance and Digital Transformation), Hertie School Berlin",
    C: "Digital Transformation Specialist and Product Lead  |  MPP, Hertie School Berlin",
    D: "Technical Product Lead, AI and Data Platforms  |  Google Gen AI Master · IBM AI PM · MPP and LL.B.",
    E: "⟦TAILOR⟧ Product Manager  |  [role's domain]  |  MPP, Hertie School Berlin"
  };
  const stem = (s) => (s || "").replace(/[^A-Za-z0-9]+/g, "");
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const long = d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const base = flag("--company") && flag("--role") ? `${ymd}${stem(flag("--company"))}_${stem(flag("--role"))}` : "⟦TAILOR⟧";
  const files = {
    "cv_data.js": fs.readFileSync(path.join(sk, track, "cv_data.js"), "utf8"),
    "cl_data.js": fs.readFileSync(path.join(sk, "cl_data.template.js"), "utf8").replace("{{TITLE}}", TITLES[track]).replace("{{DATE}}", long),
    "meta.json": JSON.stringify({ base, track }, null, 0) + "\n",
    "hm_review.md": fs.readFileSync(path.join(sk, "hm_review.template.md"), "utf8")
  };
  const written = [], kept = [];
  for (const [name, text] of Object.entries(files)) {
    const p = path.join(appDir, name);
    if (fs.existsSync(p) && !force) kept.push(name); else { fs.writeFileSync(p, text); written.push(name); }
  }
  msg += ` | Track ${track} scaffold: wrote ${written.join(", ") || "nothing"}${kept.length ? `; kept existing ${kept.join(", ")}` : ""}`;
  if (base.includes("⟦")) msg += " | meta.json base still needs the company and role (YYYYMMDDCompany_RoleTitle)";
}
console.log(msg);
