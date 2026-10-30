/**
 * docs_from_transcript.js v1.1, 30 October 2026
 * Maintenance helper. Project documents can only be read into the conversation (Projects tool), never straight to disk.
 * After a maintenance session has read a document, this saves it from the session transcript to a folder, so scripts such as
 * master_to_skeleton.js can run on it without the text being sent through the model a second time.
 *
 *   node docs_from_transcript.js <out_dir> [transcript.jsonl]
 *   node docs_from_transcript.js --section <saved_doc.md> "<heading text>"
 *     v1.1: prints one section, from the first heading containing the text (case-insensitive) to the next heading of the
 *     same or higher level. Used in an application after the Step 1 batch read, so a later step, or any step after a
 *     compaction, reads one section from disk instead of project_read-ing a whole document again.
 * Default transcript: the newest *.jsonl under ${CLAUDE_CONFIG_DIR:-~/.claude}/projects.
 */
const fs = require("fs"), path = require("path"), os = require("os");
if (process.argv[2] === "--section") {
  const file = process.argv[3], head = process.argv.slice(4).join(" ").trim();
  if (!file || !head) { console.error('usage: node docs_from_transcript.js --section <saved_doc.md> "<heading text>"'); process.exit(2); }
  const lines = fs.readFileSync(file, "utf8").split("\n");
  const isHead = (l) => /^#{1,6}\s/.test(l);
  const level = (l) => l.match(/^#+/)[0].length;
  const i = lines.findIndex((l) => isHead(l) && l.toLowerCase().includes(head.toLowerCase()));
  if (i < 0) { console.error(`no heading containing "${head}" in ${file}`); process.exit(1); }
  let j = i + 1;
  while (j < lines.length && !(isHead(lines[j]) && level(lines[j]) <= level(lines[i]))) j++;
  console.log(lines.slice(i, j).join("\n").trimEnd());
  process.exit(0);
}
const [outArg, tArg] = process.argv.slice(2);
if (!outArg) { console.error("usage: node docs_from_transcript.js <out_dir> [transcript.jsonl]"); process.exit(2); }
function newest(dir) {
  let best = null;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { const c = newest(p); if (c && (!best || c.m > best.m)) best = c; }
    else if (e.name.endsWith(".jsonl")) { const m = fs.statSync(p).mtimeMs; if (!best || m > best.m) best = { p, m }; }
  }
  return best;
}
const root = path.join(process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), ".claude"), "projects");
const file = tArg || (newest(root) || {}).p;
if (!file) { console.error("no transcript found"); process.exit(2); }
fs.mkdirSync(outArg, { recursive: true });
let n = 0;
for (const line of fs.readFileSync(file, "utf8").split("\n")) {
  if (!line.includes('"method":"project_read"') && !line.includes('\\"method\\":\\"project_read\\"')) continue;
  let row; try { row = JSON.parse(line); } catch { continue; }
  const c = row && row.message && row.message.content;
  if (!Array.isArray(c)) continue;
  for (const b of c) {
    if (!b || b.type !== "tool_result") continue;
    let t = b.content; if (Array.isArray(t)) t = t.map((x) => x.text || "").join(" ");
    if (typeof t !== "string" || !t.startsWith('{"method":"project_read"')) continue;
    try { const j = JSON.parse(t); fs.writeFileSync(path.join(outArg, path.basename(j.path)), j.content); n++; } catch { /* partial result */ }
  }
}
console.log(`saved ${n} document read(s) from ${file} to ${outArg}`);
