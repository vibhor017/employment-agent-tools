# CV layout spec (cv_template_builder.js v4.2)

Moved verbatim from APPLICATION_RULES.md v12.4 Section 11.4 on 30 October 2026. The builder implements all of this, so no drafting step decides it and the agent never reads this file during an application. Change it together with cv_template_builder.js, and run npm test.

**Visual template, locked.** Every CV uses this palette, font and structure, implemented in cv_template_builder.js v4.

**Font:** Times New Roman throughout.

**Colour palette (hex):**
| Element | Colour | Use |
|---|---|---|
| Navy `1E3A5F` | bold | Name, section headings, section-heading bottom rule, Areas of Expertise bullet dot |
| Dark `111827` | regular / bold | Body text, bullets, Key Achievement labels and descriptions, org names (bold), Problem: and Solution: labels (bold) |
| Mid grey `374151` | regular | Title line under name, role titles, degree lines, Problem / Solution sentences |
| Light grey `6B7280` | regular | Contact line, languages line, location text, date text |

**Sizes (pt):** everything from the Profile Summary heading down is 10pt.
| Element | Size | Weight | Colour |
|---|---|---|---|
| Name | 19 | bold | Navy |
| Title/tagline line | 10 | regular | Mid grey |
| Contact + languages | 8.5 | regular | Light grey |
| Section headings | 10 | bold | Navy, 0.5pt navy bottom rule |
| Org / institution name | 10 | bold | Dark |
| Role title / degree line | 10 | regular | Mid grey |
| Location / dates | 10 | regular | Light grey |
| Body, summary, bullets, Key Achievements, Areas of Expertise, side projects, certifications, education lines | 10 | regular (labels bold) | Dark / mid grey |

**Page:** A4, 0.625in (900 twips) margins on all sides.

**Header block:** Name, then a single title line "[Role Title]  |  [Domain A]  |  [Domain B]", then the contact line (location, phone, email, LinkedIn, "Portfolio: vibhor.work"), then the languages line. The LinkedIn profile (linkedin.com/in/vibhorahlawat, linking to https://www.linkedin.com/in/vibhorahlawat) and the portfolio are both clickable navy underlined links, set through header.linkedin and header.portfolio in the builder data. Never leave either as plain text.

**Section headings:** bold navy, 10pt, single-line 0.5pt navy bottom border. Spacing: 200 twips before, 100 after. Section order: Profile Summary, Areas of Expertise, Key Achievements, Professional Experience, Side Projects, Certifications, Education.

**Org/institution and role lines.** Two lines, with location and dates right-aligned to the right margin by a real right tab stop (the builder's Tab run, never a literal tab character and never inline " | " separators):
- Line 1: org or institution name, bold, dark, 10pt, then location in light grey 10pt flush right. Spacing: 160 before, 20 after.
- Line 2: role title or degree, mid grey, 10pt, then dates in light grey 10pt flush right. Spacing: 0 before, 70 after.
Both lines keep with the next paragraph, so a role header never orphans at a page foot.

**Date format:** "Dec 2025 - Present", "Jan 2022 - Apr 2023": month, year, a spaced plain hyphen, month, year. Plain hyphen only, never an en dash. The builder normalises " to " into " - " as a safety net.

**Bullets:** character `•`, indent left 400 twips, hanging 280 twips, 10pt dark, 60 twips after.

**Areas of Expertise:** a 3-column, 3-row table, every border including inside borders set to none, width 9000 twips. Each cell: a bold navy "•  " then the skill in dark 10pt. The only table in the CV.

**Tools line:** one paragraph directly below the Areas of Expertise table, 10pt, bold dark "Tools:" then the tool names in regular dark, comma separated; 60 twips before, 100 after.

**Key Achievements:** bullet style, bold dark label followed by a colon and space, then the regular description.

**Side Projects.** Section heading "SIDE PROJECTS". Each entry: the org/role two-line header, then two lines:
- "**Problem:** [one sentence]", label bold dark, sentence mid grey, 40 twips after.
- "**Solution:** [one or two sentences]", label bold dark, sentence mid grey, 100 twips after.
The Solution line passes the cold-reader test: what it does for the user before any stack names. "Delivered:" is retired.

**Certifications:** flat bulleted list, bold cert name, year right-aligned. Only completed credentials (UVA Darden waits until completed).

## Section 11.4a as it stood in v12.4 (superseded by the scaffold)

Two docx-js modules sit in the project files:
- **cv_template_builder.js v4.2** with **cv_template_example_data.js**: the CV.
- **cl_template_builder.js v1.2** with **cl_template_example_data.js**: the cover letter, prose (`data`) and evidence-table (`tableData`) examples.

Every generation step:
1. Copy the module and its example data from /mnt/project/ to the working directory.
2. Populate a `data` object matching the example's shape.
3. Call buildCVDocument(data) or buildCLDocument(data), pack it, write the .docx.
4. Do not regenerate paragraph or table calls from the prose spec.

The example data files show the shape, not the facts: every fact in an application comes from the masters, Section 5A and CURO_UPDATE_2026-10-21.md Section 2. The CV module must be v4 or later (10pt, Side Projects, bold labels, borderless table, keepNext). The CL module must be v1.2 or later for the evidence table. If the project copy is older, flag it to Vibhor and patch locally before building.
