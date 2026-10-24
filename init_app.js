/**
 * init_app.js v1.0, 24 October 2026
 * Step 1 setup in one call, so nothing is retyped and nothing is installed twice.
 *
 * USAGE
 *   node init_app.js <jd_file> [app_dir]
 *     jd_file   the attached or pasted JD, already on disk (an attachment path, or a file the agent saved once)
 *     app_dir   default /home/claude/app
 *
 * What it does
 *   1. Creates app_dir (and app_dir/out).
 *   2. Copies the JD byte for byte to $DRAFT_DIR/JD.txt (default /home/claude/JD.txt), the file qa_check.py --jd reads.
 *      The JD is never retyped: a retyped JD costs output tokens and can drift from the posting.
 *   3. Runs `npm install --no-package-lock` in this folder only if docx is not installed yet, so a fresh clone works
 *      and no lockfile is left untracked in the repo.
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const [jdArg, appArg] = process.argv.slice(2);
if (!jdArg) {
  console.error("usage: node init_app.js <jd_file> [app_dir]");
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
console.log(`app dir ready: ${appDir} | JD copied to ${path.join(draftDir, "JD.txt")} (${words} words) | docx ${installed}`);
