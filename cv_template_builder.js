/**
 * cv_template_builder.js
 * Reusable CV template, visual format locked per APPLICATION_RULES.md Section 11.4.
 * Palette: Navy 1E3A5F, Dark 111827, Mid grey 374151, Light grey 6B7280. Font: Times New Roman.
 * Org/role lines and certification years are right-aligned via a real paragraph tab stop
 * (docx.js Tab run inside a paragraph with tabStops set), not literal "\t" text and not
 * inline " | " separators.
 *
 * USAGE
 *   const { buildCVDocument } = require("./cv_template_builder");
 *   const { Packer } = require("docx");
 *   const fs = require("fs");
 *   const doc = buildCVDocument(data);   // see cv_template_example_data.js for the `data` shape
 *   Packer.toBuffer(doc).then(buf => fs.writeFileSync("CV.docx", buf));
 *
 * Requires: npm install docx
 *
 * v4.2, October 2026: optional Tools line under the Areas of Expertise table (data.tools, array or string),
 *   rendered as a bold "Tools:" label plus the confirmed tool names (APPLICATION_RULES.md Section 11.3b).
 * v4.1, October 2026: the LinkedIn profile on the contact line is a clickable link (header.linkedin, or
 *   auto-detected from "linkedin.com/in/<handle>" in header.contact), styled like the portfolio link.
 * v4, October 2026 (APPLICATION_RULES.md v12):
 *   - Everything from the Profile Summary heading down is 10pt (headings, org lines, role lines, dates,
 *     body, bullets, Key Achievements, Areas of Expertise, side projects, certifications, education).
 *     The header block (name 19pt, title 10pt, contact and languages 8.5pt) is unchanged.
 *   - Areas of Expertise table is borderless, inside borders included (v3 drew single inside lines,
 *     contradicting the spec).
 *   - Org and role lines keep with the next paragraph, so a role header never orphans at a page foot.
 *   - The side-projects section defaults to the heading "SIDE PROJECTS". Each entry renders a bold
 *     "Problem:" label and a bold "Solution:" label, sentence text in mid grey. data uses `solution`;
 *     the v3 field `delivered` is still accepted as a fallback.
 *   - Date strings are normalised: "Dec 2025 to Present" becomes "Dec 2025 - Present", and any en dash
 *     becomes a plain hyphen.
 * v3, September 2026: data.summary renders a mandatory PROFILE SUMMARY section.
 * v2, September 2026: optional header.portfolio renders "Portfolio: <domain>" as a clickable hyperlink.
 */

const {
  Document, Paragraph, TextRun, Tab, TabStopType, BorderStyle,
  AlignmentType, LevelFormat, WidthType, Table, TableRow, TableCell, ExternalHyperlink
} = require("docx");

// ---- locked palette ----
const FONT = "Times New Roman";
const NAVY = "1E3A5F";
const DARK = "111827";
const MID = "374151";
const GRAY = "6B7280";

// ---- locked sizes (half-points) ----
const SZ_NAME = 38;    // 19pt
const SZ_TITLE = 20;   // 10pt
const SZ_CONTACT = 17; // 8.5pt
const SZ_HEAD = 20;    // 10pt (v4)
const SZ_ORG = 20;     // 10pt (v4)
const SZ_BODY = 20;    // 10pt (v4)

// ---- locked page geometry ----
const PAGE_WIDTH = 11906;   // A4, twips
const PAGE_HEIGHT = 16838;
const MARGIN = 900;         // 0.625in, all sides

// Right tab stop at the right text boundary: page width minus both margins.
const RIGHT_TAB_POS = PAGE_WIDTH - MARGIN - MARGIN;
const RIGHT_TAB_STOPS = [{ type: TabStopType.RIGHT, position: RIGHT_TAB_POS }];

// "Dec 2025 to Present" -> "Dec 2025 - Present"; en dash -> plain hyphen.
const MONTH = "(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)";
function normDates(s) {
  if (s === undefined || s === null) return "";
  return String(s)
    .replace(/\u2013|\u2014/g, "-")
    .replace(new RegExp(`(${MONTH} \\d{4}|\\d{4}) to (Present|${MONTH} \\d{4}|\\d{4})`, "g"), "$1 - $2")
    .replace(/\s*-\s*/g, (m) => (m.trim() === "-" ? " - " : m));
}

// ---- building blocks ----

function sectionHeading(text) {
  return new Paragraph({
    spacing: { before: 200, after: 100 },
    keepNext: true,
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY, space: 2 } },
    children: [new TextRun({ text, bold: true, font: FONT, size: SZ_HEAD, color: NAVY })]
  });
}

function rightTab(color = GRAY) {
  return new TextRun({ children: [new Tab()], font: FONT, size: SZ_BODY, color });
}

// org / institution name (bold, dark), tab, location (light grey), flush right. Keeps with next.
function orgLine(org, loc) {
  return new Paragraph({
    tabStops: RIGHT_TAB_STOPS,
    keepNext: true,
    keepLines: true,
    spacing: { before: 160, after: 20 },
    children: [
      new TextRun({ text: org, bold: true, font: FONT, size: SZ_ORG, color: DARK }),
      rightTab(),
      new TextRun({ text: loc || "", font: FONT, size: SZ_BODY, color: GRAY })
    ]
  });
}

// role title / degree (mid grey), tab, dates (light grey), flush right. Keeps with next.
function roleLine(role, dates) {
  return new Paragraph({
    tabStops: RIGHT_TAB_STOPS,
    keepNext: true,
    keepLines: true,
    spacing: { before: 0, after: 70 },
    children: [
      new TextRun({ text: role, font: FONT, size: SZ_BODY, color: MID }),
      rightTab(),
      new TextRun({ text: normDates(dates), font: FONT, size: SZ_BODY, color: GRAY })
    ]
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullet-list", level: 0 },
    spacing: { after: 60 },
    children: [new TextRun({ text, font: FONT, size: SZ_BODY, color: DARK })]
  });
}

function bodyPara(text, spacingAfter = 100) {
  return new Paragraph({
    spacing: { before: 0, after: spacingAfter },
    children: [new TextRun({ text, font: FONT, size: SZ_BODY, color: DARK })]
  });
}

// Key Achievement: bold dark label, then regular dark description
function kaBullet(label, text) {
  return new Paragraph({
    numbering: { reference: "bullet-list", level: 0 },
    spacing: { after: 70 },
    children: [
      new TextRun({ text: label + " ", bold: true, font: FONT, size: SZ_BODY, color: DARK }),
      new TextRun({ text, font: FONT, size: SZ_BODY, color: DARK })
    ]
  });
}

// Certification bullet: bold cert name, regular description, tab, year flush right.
function certBullet(label, text, year) {
  return new Paragraph({
    numbering: { reference: "bullet-list", level: 0 },
    tabStops: RIGHT_TAB_STOPS,
    spacing: { after: 60 },
    children: [
      new TextRun({ text: label + " ", bold: true, font: FONT, size: SZ_BODY, color: DARK }),
      new TextRun({ text, font: FONT, size: SZ_BODY, color: DARK }),
      rightTab(),
      new TextRun({ text: String(year), font: FONT, size: SZ_BODY, color: GRAY })
    ]
  });
}

// "Problem:" / "Solution:" line: bold dark label, sentence in mid grey (v4)
function pdLine(label, text, spacingAfter = 40) {
  return new Paragraph({
    spacing: { before: 0, after: spacingAfter },
    children: [
      new TextRun({ text: label + " ", bold: true, font: FONT, size: SZ_BODY, color: DARK }),
      new TextRun({ text, font: FONT, size: SZ_BODY, color: MID })
    ]
  });
}

// bold sub-header inside a section (e.g. certification group labels)
function subLabel(text) {
  return new Paragraph({
    spacing: { before: 0, after: 60 },
    keepNext: true,
    children: [new TextRun({ text, bold: true, font: FONT, size: SZ_BODY, color: DARK })]
  });
}

const NO_BORDER = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };

function aoeCell(text) {
  return new TableCell({
    width: { size: 3000, type: WidthType.DXA },
    margins: { top: 40, bottom: 40, left: 80, right: 80 },
    borders: { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER },
    children: [new Paragraph({
      spacing: { after: 0 },
      children: [
        new TextRun({ text: "•  ", bold: true, font: FONT, size: SZ_BODY, color: NAVY }),
        new TextRun({ text, font: FONT, size: SZ_BODY, color: DARK })
      ]
    })]
  });
}

// rows: array of 3-item arrays. Every border none, inside borders included (v4).
function aoeTable(rows) {
  return new Table({
    width: { size: 9000, type: WidthType.DXA },
    columnWidths: [3000, 3000, 3000],
    borders: {
      top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER,
      insideHorizontal: NO_BORDER, insideVertical: NO_BORDER
    },
    rows: rows.map(items => new TableRow({ children: items.map(aoeCell) }))
  });
}


// Tools line (v4.2): one 10pt line directly under the Areas of Expertise table. Names only, in JD order.
function toolsLine(tools) {
  const list = Array.isArray(tools) ? tools : String(tools).split(/\s*,\s*/);
  const text = list.map(t => String(t).trim()).filter(Boolean).join(", ");
  return new Paragraph({
    spacing: { before: 60, after: 100 },
    children: [
      new TextRun({ text: "Tools: ", bold: true, font: FONT, size: SZ_BODY, color: DARK }),
      new TextRun({ text, font: FONT, size: SZ_BODY, color: DARK })
    ]
  });
}

/**
 * buildCVDocument(data) -> docx Document
 *
 * data = {
 *   header: { name, titleLine, contact, linkedin, portfolio, languages },  // contact: location, phone, email
 *   summary: "...",                                   // three full sentences, max 55 words, no "I"
 *   areasOfExpertise: [[a,b,c],[d,e,f],[g,h,i]],     // 3x3 grid, borderless table
 *   tools: ["Figma", "Jira", ...],                      // confirmed tools only, JD order; array or comma string
 *   keyAchievements: [{ label, text }, ...],           // 3-4 items
 *   experience: [
 *     { org, location, role, dates, bullets: [...] }   // every role is bulleted from v12
 *     { org, location, role, dates, paragraph: "..." } // still supported, not used by the masters
 *   ],
 *   productsBuiltHeading: "SIDE PROJECTS",             // optional override, default "SIDE PROJECTS"
 *   productsBuilt: [ { org, location, role, dates, problem, solution } ],   // `delivered` accepted as fallback
 *   certifications: [ "plain", { label, text, year }, ... ] or { groups: [{ label, items }] },
 *   education: [ { org, location, degree, dates, extraLines: [...] } ]
 * }
 */
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

function buildCVDocument(data) {
  const children = [];

  // Header
  children.push(new Paragraph({
    spacing: { after: 40 },
    children: [new TextRun({ text: data.header.name, bold: true, font: FONT, size: SZ_NAME, color: NAVY })]
  }));
  children.push(new Paragraph({
    spacing: { after: 70 },
    children: [new TextRun({ text: data.header.titleLine, font: FONT, size: SZ_TITLE, color: MID })]
  }));
  const contactRuns = contactRunsFor(data.header);
  children.push(new Paragraph({ spacing: { after: 30 }, children: contactRuns }));
  children.push(new Paragraph({
    spacing: { after: 100 },
    children: [new TextRun({ text: data.header.languages, font: FONT, size: SZ_CONTACT, color: GRAY })]
  }));

  // Profile Summary
  if (data.summary) {
    children.push(sectionHeading("PROFILE SUMMARY"));
    children.push(bodyPara(data.summary, 60));
  }

  // Areas of Expertise
  if (data.areasOfExpertise) {
    children.push(sectionHeading("AREAS OF EXPERTISE"));
    children.push(aoeTable(data.areasOfExpertise));
    if (data.tools && (Array.isArray(data.tools) ? data.tools.length : String(data.tools).trim())) {
      children.push(toolsLine(data.tools));
    }
  }

  // Key Achievements
  if (data.keyAchievements) {
    children.push(sectionHeading("KEY ACHIEVEMENTS"));
    data.keyAchievements.forEach(ka => children.push(kaBullet(ka.label, ka.text)));
  }

  // Professional Experience
  if (data.experience) {
    children.push(sectionHeading("PROFESSIONAL EXPERIENCE"));
    data.experience.forEach(role => {
      children.push(orgLine(role.org, role.location));
      children.push(roleLine(role.role, role.dates));
      if (role.bullets) {
        role.bullets.forEach(b => children.push(bullet(b)));
      } else if (role.paragraph) {
        children.push(bodyPara(role.paragraph));
      }
    });
  }

  // Side Projects (renamed from Products Built in v4)
  if (data.productsBuilt && data.productsBuilt.length) {
    children.push(sectionHeading(data.productsBuiltHeading || "SIDE PROJECTS"));
    data.productsBuilt.forEach(p => {
      children.push(orgLine(p.org, p.location));
      children.push(roleLine(p.role, p.dates));
      if (p.problem) children.push(pdLine("Problem:", p.problem, 40));
      const sol = p.solution || p.delivered;
      if (sol) children.push(pdLine("Solution:", sol, 100));
      if (p.bullets) p.bullets.forEach(b => children.push(bullet(b)));
      if (p.paragraph) children.push(bodyPara(p.paragraph));
    });
  }

  // Certifications
  if (data.certifications) {
    children.push(sectionHeading("CERTIFICATIONS"));
    const renderCertItem = (c) => (typeof c === "string" ? bullet(c) : certBullet(c.label, c.text, c.year));
    if (Array.isArray(data.certifications)) {
      data.certifications.forEach(c => children.push(renderCertItem(c)));
    } else if (data.certifications.groups) {
      data.certifications.groups.forEach(g => {
        children.push(subLabel(g.label));
        g.items.forEach(i => children.push(renderCertItem(i)));
      });
    }
  }

  // Education
  if (data.education) {
    children.push(sectionHeading("EDUCATION"));
    data.education.forEach(e => {
      children.push(orgLine(e.org, e.location));
      children.push(roleLine(e.degree, e.dates));
      const extra = e.extraLines || [];
      extra.forEach((line, idx) => {
        const isLast = idx === extra.length - 1;
        children.push(bodyPara(line, isLast ? 80 : 30));
      });
    });
  }

  return new Document({
    styles: { default: { document: { run: { font: FONT, size: SZ_BODY, color: DARK } } } },
    numbering: {
      config: [{
        reference: "bullet-list",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 400, hanging: 280 } } }
        }]
      }]
    },
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

module.exports = { buildCVDocument, normDates };
