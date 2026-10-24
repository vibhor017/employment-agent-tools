/**
 * cl_template_builder.js
 * Reusable cover letter template, APPLICATION_RULES.md v12.4 Sections 2, 2.5 and 7. Matches the CV's header block
 * (Times New Roman, navy name, mid grey title line, light grey contact line with clickable LinkedIn and portfolio links)
 * so the CV and the letter read as one set.
 *
 * USAGE
 *   const { buildCLDocument } = require("./cl_template_builder");
 *   const { Packer } = require("docx");
 *   const fs = require("fs");
 *   const doc = buildCLDocument(data);   // see cl_template_example_data.js for the `data` and `tableData` shapes
 *   Packer.toBuffer(doc).then(buf => fs.writeFileSync("CL.docx", buf));
 *
 * Layout: header block, date, recipient lines, "Dear ...,", four body paragraphs, sign-off, name.
 * Body paragraphs are real paragraphs with spacing after, no spacer paragraphs, so qa_check.py reads the body
 * cleanly from the "Dear" line to the sign-off. No bold, underline or bullets in the body, except the bold
 * left-hand labels of an evidence table. Contact details live in the header only; Para 4 never repeats them.
 *
 * Two formats (APPLICATION_RULES.md Section 2.5):
 *   prose:          paragraphs is four strings.
 *   evidence table: paragraphs[2] is { lead, rows, after }, where lead is the lead-in sentence, rows is 3-4 pairs of
 *                   [JD skill phrase, one specific example with a numeral], and after is the portfolio decision story
 *                   and the forward move. The table is borderless, two columns, no header row. qa_check.py v1.6 reads
 *                   the lead-in, the table and the closing prose as one paragraph.
 *
 * v1.2, 24 October 2026: evidence-table format for Para 3 (APPLICATION_RULES.md v12.4, Section 2.5). Para 4 closes on a
 *   statement: no question (qa_check.py v1.6 fails a question mark in the body).
 * v1.1, October 2026: LinkedIn rendered as a clickable link, same as the CV (header.linkedin or auto-detected).
 * v1, October 2026.
 */

const {
  Document, Paragraph, TextRun, ExternalHyperlink, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, VerticalAlign
} = require("docx");

const FONT = "Times New Roman";
const NAVY = "1E3A5F";
const DARK = "111827";
const MID = "374151";
const GRAY = "6B7280";

const SZ_NAME = 38;     // 19pt
const SZ_TITLE = 20;    // 10pt
const SZ_CONTACT = 17;  // 8.5pt
const SZ_BODY = 22;     // 11pt

const PAGE_WIDTH = 11906;   // A4
const PAGE_HEIGHT = 16838;
const MARGIN = 1080;        // 0.75in
const TEXT_WIDTH = PAGE_WIDTH - 2 * MARGIN;   // 9746 twips
const LABEL_WIDTH = 2700;                     // left column of the evidence table

function run(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: SZ_BODY, color: DARK, ...opts });
}

function line(text, after = 0, opts = {}) {
  return new Paragraph({ spacing: { before: 0, after }, children: [run(text, opts)] });
}

function bodyPara(text, after = 200, before = 0) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before, after, line: 264 },
    children: [run(text)]
  });
}

// Contact line: plain text, with the LinkedIn profile and the portfolio rendered as clickable navy links.
// LinkedIn comes from header.linkedin ("https://www.linkedin.com/in/vibhorahlawat" or { display, url }); if absent,
// any "linkedin.com/in/<handle>" written inside header.contact is detected and linked automatically.
const LINKEDIN_RE = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?/;
function linkRun(display, url) {
  return new ExternalHyperlink({
    link: url,
    children: [new TextRun({ text: display, font: FONT, size: SZ_CONTACT, color: NAVY, underline: {} })]
  });
}
function normLink(v, defaultPrefix) {
  if (!v) return null;
  if (typeof v === "object") return v;
  const display = v.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
  const url = v.startsWith("http") ? v : defaultPrefix + v.replace(/^www\./, "");
  return { display, url };
}
function contactRunsFor(header) {
  const grey = (t) => new TextRun({ text: t, font: FONT, size: SZ_CONTACT, color: GRAY });
  const runs = [];
  const contact = header.contact || "";
  let li = normLink(header.linkedin, "https://www.");
  const m = contact.match(LINKEDIN_RE);
  if (m) {
    if (!li) li = normLink(m[0], "https://www.");
    if (contact.slice(0, m.index)) runs.push(grey(contact.slice(0, m.index)));
    runs.push(linkRun(li.display, li.url));
    if (contact.slice(m.index + m[0].length)) runs.push(grey(contact.slice(m.index + m[0].length)));
  } else {
    if (contact) runs.push(grey(contact));
    if (li) { runs.push(grey("  ·  ")); runs.push(linkRun(li.display, li.url)); }
  }
  const p = normLink(header.portfolio, "https://");
  if (p) { runs.push(grey("  ·  Portfolio: ")); runs.push(linkRun(p.display, p.url)); }
  return runs;
}

// Evidence table (Section 2.5): borderless, two columns, bold JD phrase on the left, the example on the right.
const NO_BORDER = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const NO_BORDERS = { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER };
function evidenceTable(rows) {
  if (!Array.isArray(rows) || rows.length < 3 || rows.length > 4) {
    throw new Error("cl_template_builder: the evidence table needs 3-4 rows (APPLICATION_RULES.md Section 2.5)");
  }
  const cell = (text, width, bold) => new TableCell({
    width: { size: width, type: WidthType.DXA },
    borders: NO_BORDERS,
    verticalAlign: VerticalAlign.TOP,
    margins: { top: 40, bottom: 40, left: bold ? 0 : 160, right: bold ? 120 : 0 },
    children: [new Paragraph({ spacing: { before: 0, after: 0, line: 252 }, children: [run(text, bold ? { bold: true } : {})] })]
  });
  return new Table({
    width: { size: TEXT_WIDTH, type: WidthType.DXA },
    columnWidths: [LABEL_WIDTH, TEXT_WIDTH - LABEL_WIDTH],
    borders: { ...NO_BORDERS, insideHorizontal: NO_BORDER, insideVertical: NO_BORDER },
    rows: rows.map(([label, example]) => {
      if (!label || !example) throw new Error("cl_template_builder: each evidence row is [label, example]");
      return new TableRow({ children: [cell(label, LABEL_WIDTH, true), cell(example, TEXT_WIDTH - LABEL_WIDTH, false)] });
    })
  });
}

/**
 * data = {
 *   header: { name, titleLine, contact, linkedin, portfolio },  // contact: location, phone, email; linkedin and portfolio render as links
 *   date: "24 October 2026",                         // written out in full, generation date
 *   recipient: ["Hiring Manager Name", "Company", "City"],
 *   salutation: "Dear Ms Weber,",                     // or "Dear Hiring Team,"
 *   paragraphs: ["Para 1", "Para 2", "Para 3", "Para 4"],
 *     // evidence-table letter: paragraphs[2] = { lead: "...", rows: [["JD phrase", "example with a numeral"], ...], after: "..." }
 *   signoff: "Warm regards,",                         // "With respect," for formal institutions
 *   signature: "Vibhor Ahlawat"
 * }
 */
function buildCLDocument(data) {
  if (!Array.isArray(data.paragraphs) || data.paragraphs.length !== 4) {
    throw new Error("cl_template_builder: exactly four body paragraphs required (APPLICATION_RULES.md Section 2)");
  }
  data.paragraphs.forEach((p, i) => {
    if (typeof p === "object" && i !== 2) {
      throw new Error("cl_template_builder: only Para 3 may carry the evidence table (APPLICATION_RULES.md Section 2.5)");
    }
  });
  const children = [];

  // Header block
  children.push(new Paragraph({
    spacing: { after: 40 },
    children: [new TextRun({ text: data.header.name, bold: true, font: FONT, size: SZ_NAME, color: NAVY })]
  }));
  children.push(new Paragraph({
    spacing: { after: 60 },
    children: [new TextRun({ text: data.header.titleLine, font: FONT, size: SZ_TITLE, color: MID })]
  }));
  const contactRuns = contactRunsFor(data.header);
  children.push(new Paragraph({ spacing: { after: 320 }, children: contactRuns }));

  // Date and recipient
  children.push(line(data.date, 240));
  (data.recipient || []).forEach((r, i, arr) => children.push(line(r, i === arr.length - 1 ? 240 : 0)));

  // Salutation
  children.push(line(data.salutation || "Dear Hiring Team,", 200));

  // Body
  data.paragraphs.forEach(p => {
    if (typeof p === "string") {
      children.push(bodyPara(p));
      return;
    }
    if (!p.lead || !p.after) {
      throw new Error("cl_template_builder: an evidence-table Para 3 needs lead, rows and after");
    }
    children.push(bodyPara(p.lead, 100));
    children.push(evidenceTable(p.rows));
    children.push(bodyPara(p.after, 200, 100));
  });

  // Sign-off
  children.push(line(data.signoff || "Warm regards,", 360));
  children.push(line(data.signature || data.header.name, 0));

  return new Document({
    styles: { default: { document: { run: { font: FONT, size: SZ_BODY, color: DARK } } } },
    sections: [{
      properties: {
        page: {
          size: { width: PAGE_WIDTH, height: PAGE_HEIGHT },
          margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN }
        }
      },
      children
    }]
  });
}

module.exports = { buildCLDocument };
