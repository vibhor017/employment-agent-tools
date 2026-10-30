/**
 * master_to_skeleton.js v1.0, 30 October 2026
 * Turns a master CV (markdown, as kept in the Claude project) into the default cv_data.js for one track.
 *
 * Why: the agent used to author cv_data.js and cl_data.js from scratch on every application (about 15,000 output
 * tokens, which are the most expensive tokens in a run) and then read builder source code to learn the data shape.
 * With a skeleton on disk the agent edits what the Role Brief changes and leaves the rest untouched.
 *
 * USAGE
 *   node master_to_skeleton.js <master.md> <track A|B|C|D|E> <out_dir>
 *   Writes <out_dir>/cv_data.js (default content of the master, with the fields that must be tailored marked).
 *   Regenerate the skeletons in skeletons/<track>/ whenever a master CV changes (WORKFLOWS.md, "Update CV").
 *
 * Markers: every field the Role Brief must rewrite carries the text "⟦TAILOR⟧" (headline, Profile Summary, the first
 * Areas of Expertise term, each Key Achievement label). build_application.js exits 5 while any marker is left in
 * cv_data.js, cl_data.js or hm_review.md, so an untailored default can never reach a .docx.
 *
 * What it takes from the master: contact block, the track's Profile Summary base, Areas of Expertise defaults, Tools,
 * Key Achievement defaults, the default bullets of each role (not the bullet banks), Side Projects (or the policy
 * master's Research, Projects and Community), Certifications, Education. Bullet banks, swap variants and agent notes
 * stay in the master, which the agent still reads: it needs them to tailor.
 */
const fs = require("fs");
const path = require("path");

const MARK = "⟦TAILOR⟧";
const [mdPath, track, outDir] = process.argv.slice(2);
if (!mdPath || !/^[A-E]$/.test(track || "") || !outDir) {
  console.error("usage: node master_to_skeleton.js <master.md> <track A|B|C|D|E> <out_dir>");
  process.exit(2);
}

const unesc = (s) => s.replace(/\\([_&\-.*()\[\]#+!|`~>])/g, "$1");
const lines = fs.readFileSync(mdPath, "utf8").split("\n").map(unesc);

// ---- split into level-2 sections ----
const sections = [];
let cur = { name: "HEADER", lines: [] };
for (const l of lines) {
  const m = l.match(/^## (.*)$/);
  if (m) { sections.push(cur); cur = { name: m[1].trim(), lines: [] }; } else cur.lines.push(l);
}
sections.push(cur);
const sec = (prefix) => (sections.find((s) => s.name.toUpperCase().startsWith(prefix.toUpperCase())) || { lines: [] }).lines;
const nonEmpty = (a) => a.filter((l) => l.trim() !== "");
const isItalicNote = (l) => /^\*\(.*\)\*\s*$/.test(l.trim()) || /^\*[^*].*[^*]\*\s*$/.test(l.trim());
const isBullet = (l) => /^\* /.test(l) && !/^\* \*/.test(l);
const clean = (s) => s.replace(/\s*\(date-bound\)\s*$/, "").trim();

// ---- header ----
const contactLines = nonEmpty(sec("CONTACT")).filter((l) => !isItalicNote(l));
const roleLabel = (contactLines[0] || "").split("|")[1] ? contactLines[0].split("|")[1].trim() : "Product Manager";
const parts = (contactLines[1] || "").split(" · ").map((s) => s.trim());
const contact = parts.filter((p) => !/linkedin\.com|^Portfolio:/i.test(p)).join("  ·  ").replace("Berlin, DE", "Berlin, DE");
const languages = contactLines[2] || "";

// ---- summary ----
function summaryFor() {
  const body = nonEmpty(sec("PROFILE SUMMARY"));
  if (track === "A" || track === "E") {
    const i = body.findIndex((l) => l.includes(`Track ${track} base`));
    if (i >= 0) return body.slice(i + 1).find((l) => !l.startsWith("**") && !isItalicNote(l)) || "";
  }
  if (track === "C") {
    const v = sections.find((s) => s.name.toUpperCase().startsWith("DEVELOPMENT SECTOR VARIANT"));
    if (v) {
      const i = v.lines.findIndex((l) => /Adjusted profile summary/i.test(l));
      if (i >= 0) return nonEmpty(v.lines.slice(i + 1)).find((l) => !l.startsWith("#") && !l.startsWith("**") && !isItalicNote(l)) || "";
    }
  }
  return body.find((l) => !l.startsWith("**") && !isItalicNote(l) && !l.startsWith("#")) || "";
}

// ---- areas of expertise and tools ----
const aoeLines = sec("AREAS OF EXPERTISE");
const terms = aoeLines.filter(isBullet).map((l) => l.replace(/^\* /, "").trim()).slice(0, 9);
while (terms.length < 9) terms.push("");
terms[0] = `${MARK} ${terms[0]}`;
const grid = [terms.slice(0, 3), terms.slice(3, 6), terms.slice(6, 9)];
const toolsLine = aoeLines.find((l) => /^\*\*Tools:\*\*/.test(l));
const tools = toolsLine ? toolsLine.replace(/^\*\*Tools:\*\*\s*/, "").split(",").map((s) => s.trim()).filter(Boolean) : [];

// ---- key achievements ----
function parseKA() {
  const out = [];
  for (const l of sec("KEY ACHIEVEMENTS")) {
    let m = l.match(/^\*\*Swap[^:]*:\*\*\s*\*\*(.+?):\*\*\s*(.+)$/) || l.match(/^\*\*(.+?):\*\*\s*(.+)$/);
    if (!m) continue;
    out.push({ label: m[1].replace(/\s*\(.*?\)\s*/g, " ").trim(), text: m[2].trim() });
  }
  if (track === "E") {
    const want = ["Shipping and adoption", "Government-scale digital delivery", "Decisions defined before data", "Growth from zero adoption"];
    const picked = want.map((w) => out.find((k) => k.label.startsWith(w))).filter(Boolean);
    if (picked.length === 4) return picked;
  }
  return out.slice(0, 4);
}
const keyAchievements = parseKA().map((k) => ({ label: `${MARK} ${k.label}:`, text: k.text.replace(/\s*\(If used.*\)\s*$/, "") }));

// ---- experience ----
function parseRoleLine(l) {
  const m = l.match(/^\*\*(.+?)\*\*\s*\|\s*(.+?)\s*\|\s*(.+)$/);
  return m ? { role: m[1].trim(), location: m[2].trim(), dates: m[3].trim() } : null;
}
function parseEntries(sectionLines, plain) {
  const entries = [];
  let e = null, i = 0;
  const L = sectionLines;
  while (i < L.length) {
    const l = L[i];
    const h = l.match(/^### (.*)$/);
    if (h) {
      e = { org: h[1].trim() };
      entries.push(e);
      i++;
      // role line
      while (i < L.length && L[i].trim() === "") i++;
      const r = i < L.length ? parseRoleLine(L[i]) : null;
      if (r && !plain) { Object.assign(e, r); i++; }
      else if (plain) {
        const [org, role] = e.org.split(" | ");
        e.org = org.trim(); e.role = (role || "").trim(); e.location = ""; e.dates = "";
      }
      // body
      const bullets = []; let started = false; let problem, solution, para;
      while (i < L.length && !/^### /.test(L[i])) {
        const b = L[i];
        if (isBullet(b)) { bullets.push(clean(b.replace(/^\* /, ""))); started = true; }
        else if (b.trim() === "") { /* skip */ }
        else if (started && bullets.length) { /* bank or note after the default list: stop collecting bullets */ while (i < L.length && !/^### /.test(L[i])) i++; break; }
        else if (/^\*\*Problem:\*\*/.test(b)) problem = b.replace(/^\*\*Problem:\*\*\s*/, "").trim();
        else if (/^\*\*Solution:\*\*/.test(b)) solution = b.replace(/^\*\*Solution:\*\*\s*/, "").trim();
        else if (plain && !b.startsWith("*") && !b.startsWith("#") && !para) para = b.trim();
        i++;
      }
      if (bullets.length) e.bullets = bullets;
      if (problem) e.problem = problem;
      if (solution) e.solution = solution;
      if (para) e.paragraph = para;
      continue;
    }
    i++;
  }
  return entries.filter((x) => x.bullets || x.problem || x.solution || x.paragraph);
}
const experience = parseEntries(sec("PROFESSIONAL EXPERIENCE"), false);
let sideName = "SIDE PROJECTS";
let sideLines = sec("SIDE PROJECTS");
let plainSide = false;
if (!sideLines.length) { sideLines = sec("RESEARCH, PROJECTS AND COMMUNITY"); sideName = "RESEARCH, PROJECTS AND COMMUNITY"; plainSide = true; }
const productsBuilt = parseEntries(sideLines, plainSide);

// ---- certifications ----
function certItem(t) {
  const p = t.split(", ").map((s) => s.trim());
  if (p.length >= 3 && /^\d{4}$/.test(p[p.length - 1])) {
    return { label: p[0] + ",", text: p.slice(1, -1).join(", "), year: p[p.length - 1] };
  }
  return t;
}
function parseCerts() {
  const L = sec("CERTIFICATIONS");
  const groups = []; let flat = []; let g = null;
  for (const l of L) {
    const gm = l.match(/^\*\*(.+?):\*\*\s*$/);
    if (gm) { g = { label: gm[1].replace(/\s*\(.*?\)\s*/g, " ").trim() + ":", items: [] }; groups.push(g); continue; }
    if (isBullet(l)) { const it = certItem(l.replace(/^\* /, "").trim()); (g ? g.items : flat).push(it); }
  }
  return groups.length ? { groups } : flat;
}

// ---- education ----
function parseEducation() {
  const L = nonEmpty(sec("EDUCATION"));
  const out = []; let e = null;
  for (const l of L) {
    const m = l.match(/^\*\*(.+?)\*\*\s*\|\s*(.+?)\s*\|\s*(.+)$/);
    if (m) { e = { org: m[1].trim(), location: m[2].trim(), dates: m[3].trim(), lines: [] }; out.push(e); }
    else if (e && !l.startsWith("\\---") && !l.startsWith("---")) e.lines.push(l.trim());
  }
  return out.map((x) => {
    const first = x.lines[0] || "";
    const dot = first.indexOf(". ");
    const degree = dot > 0 ? first.slice(0, dot) : first.replace(/\.$/, "");
    const extra = [];
    if (dot > 0) extra.push(first.slice(dot + 2));
    extra.push(...x.lines.slice(1));
    const o = { org: x.org, location: x.location, degree, dates: x.dates };
    if (extra.length) o.extraLines = extra;
    return o;
  });
}

const data = {
  header: {
    name: "Vibhor Ahlawat",
    titleLine: `${MARK} ${roleLabel}`,
    contact,
    linkedin: "https://www.linkedin.com/in/vibhorahlawat",
    portfolio: "vibhor.work",
    languages
  },
  summary: `${MARK} ${summaryFor()}`,
  areasOfExpertise: grid,
  tools,
  keyAchievements,
  experience,
  productsBuiltHeading: sideName,
  productsBuilt,
  certifications: parseCerts(),
  education: parseEducation()
};

fs.mkdirSync(outDir, { recursive: true });
const head = `/**\n * cv_data.js skeleton, Track ${track}, generated by master_to_skeleton.js from ${path.basename(mdPath)}.\n * Edit in place: rewrite every field that contains ${MARK} (headline, summary, first Areas of Expertise term, Key Achievement\n * labels), then change only what the Role Brief says to change. Bullet banks, swap variants and agent notes are in the master CV.\n * build_application.js exits 5 while any ${MARK} marker remains.\n */\n`;
fs.writeFileSync(path.join(outDir, "cv_data.js"), `${head}const data = ${JSON.stringify(data, null, 2)};\nmodule.exports = { data };\n`);
const nb = experience.reduce((a, e) => a + (e.bullets ? e.bullets.length : 0), 0);
console.log(`Track ${track}: ${experience.length} roles, ${nb} bullets, ${productsBuilt.length} side entries, ${terms.filter(Boolean).length} terms, ${keyAchievements.length} KAs -> ${path.join(outDir, "cv_data.js")}`);
