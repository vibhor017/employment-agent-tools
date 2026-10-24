/**
 * build_application.js v1.0, 24 October 2026
 * One data folder in, the QA drafts and both .docx files out. Uses cv_template_builder.js v4.2 and
 * cl_template_builder.js v1.2 from the same folder as this script, unchanged.
 *
 * USAGE
 *   node build_application.js <app_dir>          writes /home/claude/CV.txt and /home/claude/CL.txt (for qa_check.py)
 *   node build_application.js <app_dir> docx     also writes <app_dir>/out/<base>_CV.docx and <base>_CL.docx
 *
 * <app_dir> holds:
 *   cv_data.js   module.exports = { data }   same shape as cv_template_example_data.js (documented in cv_template_builder.js)
 *   cl_data.js   module.exports = { data }   same shape as cl_template_example_data.js: paragraphs is four strings, or
 *                                            paragraphs[2] = { lead, rows: [[skill, example], ...], after } for the evidence table
 *   meta.json    { "base": "20261024Northwind_ProductManagerTrustSafety" }   the file-name stem (Step 6e naming)
 *
 * Why: the text drafts the QA gate checks and the .docx files are generated from the same data, so they cannot drift,
 * and no draft text is retyped between the two.
 */
const fs = require("fs");
const path = require("path");
const { Packer } = require("docx");
const { buildCVDocument } = require(path.join(__dirname, "cv_template_builder"));
const { buildCLDocument } = require(path.join(__dirname, "cl_template_builder"));

const appDir = path.resolve(process.argv[2] || ".");
const wantDocx = process.argv[3] === "docx";
const DRAFT_DIR = process.env.DRAFT_DIR || "/home/claude";
const cv = require(path.join(appDir, "cv_data.js")).data;
const cl = require(path.join(appDir, "cl_data.js")).data;
const meta = JSON.parse(fs.readFileSync(path.join(appDir, "meta.json"), "utf8"));

// ---- CV.txt, in the layout qa_check.py reads ----
function cvText(d) {
  const h = d.header;
  const t = [h.name, h.titleLine, `${h.contact}  ·  linkedin.com/in/vibhorahlawat  ·  Portfolio: ${h.portfolio}`, h.languages || "", ""];
  if (d.summary) t.push("PROFILE SUMMARY", d.summary, "");
  if (d.areasOfExpertise) {
    t.push("AREAS OF EXPERTISE");
    d.areasOfExpertise.forEach(r => t.push(r.join(" | ")));
    if (d.tools) t.push("Tools: " + (Array.isArray(d.tools) ? d.tools.join(", ") : d.tools));
    t.push("");
  }
  if (d.keyAchievements) { t.push("KEY ACHIEVEMENTS"); d.keyAchievements.forEach(k => t.push(`- ${k.label} ${k.text}`)); t.push(""); }
  if (d.experience) {
    t.push("PROFESSIONAL EXPERIENCE");
    d.experience.forEach(e => {
      t.push("", `${e.org}\t${e.location || ""}`, `${e.role}\t${e.dates || ""}`);
      (e.bullets || []).forEach(b => t.push("- " + b));
      if (e.paragraph) t.push(e.paragraph);
    });
    t.push("");
  }
  if (d.productsBuilt && d.productsBuilt.length) {
    t.push(d.productsBuiltHeading || "SIDE PROJECTS");
    d.productsBuilt.forEach(p => {
      t.push("", `${p.org}\t${p.location || ""}`, `${p.role}\t${p.dates || ""}`);
      if (p.problem) t.push("Problem: " + p.problem);
      if (p.solution || p.delivered) t.push("Solution: " + (p.solution || p.delivered));
      (p.bullets || []).forEach(b => t.push("- " + b));
    });
    t.push("");
  }
  if (d.certifications) {
    t.push("CERTIFICATIONS");
    const item = c => (typeof c === "string" ? `- ${c}` : `- ${c.label} ${c.text}\t${c.year}`);
    if (Array.isArray(d.certifications)) d.certifications.forEach(c => t.push(item(c)));
    else (d.certifications.groups || []).forEach(g => { t.push(g.label); g.items.forEach(c => t.push(item(c))); });
    t.push("");
  }
  if (d.education) {
    t.push("EDUCATION");
    d.education.forEach(e => { t.push("", `${e.org}\t${e.location || ""}`, `${e.degree}\t${e.dates || ""}`); (e.extraLines || []).forEach(l => t.push(l)); });
  }
  return t.join("\n");
}

// ---- CL.txt: header, Dear line, four paragraphs separated by blank lines, sign-off ----
// An evidence-table Para 3 is written as one block with no blank lines: lead, "| skill | example |" rows, follow-up.
function clText(d) {
  const paras = d.paragraphs.map(p => (typeof p === "string" ? p
    : [p.lead, ...p.rows.map(([a, b]) => `| ${a} | ${b} |`), p.after].join("\n")));
  return [d.header.name, d.header.titleLine, d.header.contact, "", d.date, "", ...(d.recipient || []), "",
    d.salutation || "Dear Hiring Team,", "", paras.join("\n\n"), "", d.signoff || "Warm regards,", d.signature || d.header.name].join("\n");
}

// ---- word counts, printed so budgets are checked before the first QA run ----
function words(s) { return (s.match(/[A-Za-z0-9][A-Za-z0-9'%+.,\/-]*/g) || []).length; }
const plain = cl.paragraphs.map(p => (typeof p === "string" ? p : [p.lead, ...p.rows.flat(), p.after].join(" ")));
const counts = plain.map(words);
const isTable = cl.paragraphs.some(p => typeof p !== "string");

fs.writeFileSync(path.join(DRAFT_DIR, "CV.txt"), cvText(cv));
fs.writeFileSync(path.join(DRAFT_DIR, "CL.txt"), clText(cl));
console.log(`drafts written | letter (${isTable ? "evidence table" : "prose"}): paras ${counts.join("/")}, total ${counts.reduce((a, b) => a + b, 0)}`);

if (wantDocx) {
  const out = path.join(appDir, "out");
  fs.mkdirSync(out, { recursive: true });
  Promise.all([
    Packer.toBuffer(buildCVDocument(cv)).then(b => fs.writeFileSync(path.join(out, `${meta.base}_CV.docx`), b)),
    Packer.toBuffer(buildCLDocument(cl)).then(b => fs.writeFileSync(path.join(out, `${meta.base}_CL.docx`), b))
  ]).then(() => console.log(`docx written to ${out}`));
}
