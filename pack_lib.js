/**
 * pack_lib.js v1.0, 31 October 2026
 * Section extraction for build_run_pack.js. Same idea as docs_from_transcript.js --section (a heading to the next heading
 * of the same or higher level), with three differences that make it safe to feed a run:
 *   1. Headings are matched by their exact leading text (prefix, so a trailing edit such as "(new in v9.4)" is tolerated),
 *      scoped to a parent section where the same words occur twice, and the match must be UNIQUE.
 *   2. A missing, renamed or ambiguous heading throws. Nothing is ever skipped silently.
 *   3. Code fences are respected, so a "# comment" inside a fence is not read as a heading.
 * An extracted block is a contiguous run of lines of the source, only trailing blank and "---" lines trimmed, so it is
 * always an exact substring of the source document. Rule text is never edited, re-wrapped or summarised.
 */
const crypto = require("crypto");
const sha256 = (s) => crypto.createHash("sha256").update(s).digest("hex");
const words = (s) => (s.match(/\S+/g) || []).length;

function headings(lines) {
  const out = []; let fence = null;
  lines.forEach((l, i) => {
    const f = l.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (f) { if (!fence) fence = f[1][0]; else if (f[1][0] === fence) fence = null; return; }
    if (fence) return;
    const m = l.match(/^(#{1,6})\s+(.*)$/);
    if (m) out.push({ i, level: m[1].length, text: m[2] });
  });
  return out;
}
function endOf(hs, k, n) {
  for (let j = k + 1; j < hs.length; j++) if (hs[j].level <= hs[k].level) return hs[j].i;
  return n;
}
function trimTail(lines) {
  let e = lines.length;
  while (e > 0 && (lines[e - 1].trim() === "" || lines[e - 1].trim() === "---")) e--;
  return lines.slice(0, e);
}
/** spec: { prefix, level?, within? } -> { heading, text, startLine, endLine } (lines 1-based, end inclusive) */
function extract(docText, spec, label) {
  const lines = docText.split("\n"), hs = headings(lines);
  let lo = 0, hi = lines.length, scope = "";
  if (spec.within) {
    const p = hs.filter((h) => h.text.startsWith(spec.within));
    if (p.length !== 1) throw new Error(`${label}: parent heading "${spec.within}" matched ${p.length} times (expected exactly 1)`);
    const k = hs.indexOf(p[0]); lo = p[0].i + 1; hi = endOf(hs, k, lines.length); scope = ` inside "${spec.within}"`;
  }
  const c = hs.filter((h) => h.i >= lo && h.i < hi && h.text.startsWith(spec.prefix) && (!spec.level || h.level === spec.level));
  if (c.length !== 1) {
    const near = hs.filter((h) => h.text.toLowerCase().includes(spec.prefix.slice(0, 18).toLowerCase())).slice(0, 5).map((h) => h.text).join(" | ");
    throw new Error(`${label}: heading "${spec.prefix}"${scope} matched ${c.length} times (expected exactly 1). ` +
      `The document was probably edited in the Project: re-run sync_docs.js and update the manifest. Near matches: ${near || "none"}`);
  }
  const k = hs.indexOf(c[0]), end = endOf(hs, k, lines.length);
  const block = trimTail(lines.slice(c[0].i, end));
  return { heading: "#".repeat(c[0].level) + " " + c[0].text, text: block.join("\n"), startLine: c[0].i + 1, endLine: c[0].i + block.length };
}
/** Verbatim lines of one table or list: every line that starts with one of the prefixes, each prefix must match exactly once. */
function extractLines(docText, within, prefixes, label) {
  const sec = extract(docText, within, label).text.split("\n"), out = [];
  for (const p of prefixes) {
    const m = sec.map((l, i) => [l, i]).filter(([l]) => l.startsWith(p));
    if (m.length !== 1) throw new Error(`${label}: row starting "${p}" matched ${m.length} times (expected exactly 1)`);
    out.push(m[0]);
  }
  return out.sort((a, b) => a[1] - b[1]).map(([l]) => l);
}
/** A block of a section from the line starting with `from` up to (not including) the line starting with `to` (or the blank line after a paragraph). */
function extractBetween(docText, within, from, to, label) {
  const sec = extract(docText, within, label).text.split("\n");
  const a = sec.map((l, i) => [l, i]).filter(([l]) => l.startsWith(from));
  if (a.length !== 1) throw new Error(`${label}: line starting "${from}" matched ${a.length} times (expected exactly 1)`);
  let e = a[0][1];
  if (to === null) { while (e < sec.length && sec[e].trim() !== "") e++; }
  else { const b = sec.map((l, i) => [l, i]).filter(([l, i]) => i > a[0][1] && l.startsWith(to)); if (b.length < 1) throw new Error(`${label}: end line starting "${to}" not found`); e = b[0][1]; }
  return trimTail(sec.slice(a[0][1], e)).join("\n");
}
module.exports = { sha256, words, headings, extract, extractLines, extractBetween, trimTail };
