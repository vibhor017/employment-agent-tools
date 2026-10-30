/**
 * cl_data.js skeleton. Rewrite every field that contains the TAILOR marker; build_application.js exits 5 until none is left.
 * Shape: header, date (generation date, already set), recipient lines, salutation, paragraphs (four strings, or paragraphs[2] =
 * { lead, rows: [[skill, example], ...3-4 rows], after } for the evidence-table format), signoff, signature.
 * Word budgets, prose: P1 95-120, P2 115-140, P3 105-125, P4 40-60, total 360-400 (table: 85-110 / 95-125 / 80-115 / 35-55, total 300-360).
 * The first build prints each paragraph's count. titleLine below is the Section 7 default for the track; mirror the role title for improvised roles.
 */
const data = {
  header: {
    name: "Vibhor Ahlawat",
    titleLine: "{{TITLE}}",
    contact: "Berlin, Germany  ·  +49 1622801918  ·  vibhorahlawat17@gmail.com",
    linkedin: "https://www.linkedin.com/in/vibhorahlawat",
    portfolio: "vibhor.work"
  },
  date: "{{DATE}}",
  recipient: ["⟦TAILOR⟧ Hiring manager or Hiring Team", "⟦TAILOR⟧ Company", "⟦TAILOR⟧ City"],
  salutation: "Dear Hiring Team,",
  paragraphs: [
    "⟦TAILOR⟧ Para 1: hook from the reader's world, bridge to his evidence, capability signal, the role as the intersection",
    "⟦TAILOR⟧ Para 2: journey arc, one metric, Gyro Health founder disclosure, limitation confession naming what this company has, the reason",
    "⟦TAILOR⟧ Para 3: JD responsibility, the portfolio decision story with its one deep link, 'In this role I would...' with a method and a success test",
    "⟦TAILOR⟧ Para 4: return to Para 1's words, desire fused with the value the company publishes"
  ],
  signoff: "Warm regards,",
  signature: "Vibhor Ahlawat"
};
module.exports = { data };
