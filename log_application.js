/**
 * log_application.js v1.0, 31 October 2026
 * Step 6d in one paste. Reads <app_dir>/meta.json and <app_dir>/decisions.json, validates them, and prints the exact JSON
 * arguments of ONE mcp__Airtable__create_records_for_table call (Applications table). The model pastes it; nothing is retyped.
 *
 *   node log_application.js <app_dir>                  validate and print the create payload, then the track-mix query
 *   node log_application.js <app_dir> --no-file-check  same, without requiring out/<base>_CV.docx and _CL.docx on disk
 *   node log_application.js --mix                      only the track-mix query (call 1, before decisions.json exists)
 *
 * meta.json      { base, track, company, role }   (init_app.js --company --role writes it)
 * decisions.json { track?, sub_archetype, fit, deadline|null, hm_name, positioning, jd_requirements (string or array),
 *                  outcome_notes, peers (array), cl_format, hook_type,
 *                  optional: status (default Pending), recruiter_name, recruiter_linkedin, hm_linkedin, cv_file, cl_file }
 * Always left empty by design: Networking Status, First Response Date and From, Interview Prep Done, Hook Type (retired).
 * Exit 1 on any validation failure. No value may contain an em dash or an en dash.
 */
const fs = require("fs"), path = require("path");
const BASE = "appwCXHvQt6PU5kIq", TABLE = "tblON1TowWRGtLPYv";
const F = {
  date: "fldRa2x9xOwLm5C4f", company: "fldAwQh5LbEXfbYNQ", role: "fldhvuHIEE8G50bH9", fit: "fldVLDCXLZIsvj8YD", track: "fldzSOwcuHNSDIABa",
  status: "fld0KEavF9LIJhA2T", sub: "fld19PES2JWBIopeV", deadline: "fldrBGHpQV6qpxtgQ", cv: "fld3WYOKq2cOY1oDj", cl: "fld9be1Wn6UZEO3oo",
  recName: "fldMN9atNr5IVhA7K", recLi: "fldEESZN0eaPPi18u", hmName: "fld10WPABiJTFtl6U", hmLi: "fldi6UwkMPTlBDgUW",
  positioning: "fldQ5aCUHcDBPbrpn", jd: "fldHNblKH3E68ftka", notes: "fldohxwtQEfuw6C0v", peers: "fldtj7QUYRs2tQ2UM", outreach: "fldVhUsmFm1KAb2Wd",
  clFormat: "fldnUT4oyJCzyPbAL", hook: "fldLEk03WkE9WyrDx",
};
// Live option names, read from the table schema on 31 October 2026. Re-check with get_table_schema if Airtable changes.
const OPT = {
  fit: ["Strong", "Moderate", "Stretch"],
  status: ["Pending", "Applied", "Screen", "Interview 1", "Interview 2", "Final", "Offer", "Rejected", "Ghosted", "Excluded"],
  clFormat: ["Prose", "Evidence table"],
  hook: ["H1 Company insight", "H2 Market or user moment", "H3 Personal encounter", "Insider-user"],
  track: ["PM", "Tech Policy", "Digitalisation", "Technical PM-FDE", "Technical PM-FDE (Track D)", "PM-General / Consumer", "PM-General / Consumer (Track E)", "Other"],
};
// Track letter -> acceptable live labels; the first is the default (the label the latest records use).
const TRACK_LABELS = {
  A: ["PM"], B: ["Tech Policy"], C: ["Digitalisation"],
  D: ["Technical PM-FDE (Track D)", "Technical PM-FDE"], E: ["PM-General / Consumer (Track E)", "PM-General / Consumer"],
};
const DASH = /[\u2013\u2014]/;
const errs = [];
const err = (m) => errs.push(m);

const mixQuery = () => ({ tool: "mcp__Airtable__list_records_for_table", args: { baseId: BASE, tableId: TABLE, fieldIds: [F.track, F.status], pageSize: 500 } });

function main(argv) {
  const a = argv.slice(2);
  if (a[0] === "--mix") { console.log("TRACK MIX QUERY (one call; count Track by Status):\n" + JSON.stringify(mixQuery().args)); return 0; }
  const noFiles = a.includes("--no-file-check");
  const dir = a.find((x) => !x.startsWith("--"));
  if (!dir) { console.error("usage: node log_application.js <app_dir> [--no-file-check] | --mix"); return 2; }
  const load = (n) => { try { return JSON.parse(fs.readFileSync(path.join(dir, n), "utf8")); } catch (e) { err(`${n}: ${e.message}`); return {}; } };
  const meta = load("meta.json"), d = load("decisions.json");
  const str = (o, k, name) => { const v = o[k]; if (typeof v !== "string" || !v.trim()) { err(`${name}: required text is missing`); return ""; } return v.trim(); };
  const base = str(meta, "base", "meta.base"), company = str(meta, "company", "meta.company (re-run init_app.js with --company and --role, or add it)"), role = str(meta, "role", "meta.role");
  if (/⟦/.test(base)) err("meta.base still carries the TAILOR marker");
  const letter = String(meta.track || "").toUpperCase();
  if (!TRACK_LABELS[letter]) err(`meta.track must be A-E, got "${meta.track}"`);
  const oneOf = (v, set, name) => { if (!set.includes(v)) err(`${name}: "${v}" is not an allowed option (${set.join(" / ")})`); return v; };
  const track = d.track ? oneOf(d.track, OPT.track, "decisions.track") : (TRACK_LABELS[letter] || [""])[0];
  if (TRACK_LABELS[letter] && !TRACK_LABELS[letter].includes(track) && track !== "Other") err(`decisions.track "${track}" does not match meta.track ${letter} (expected ${TRACK_LABELS[letter].join(" or ")})`);
  const fit = oneOf(d.fit, OPT.fit, "decisions.fit");
  const status = oneOf(d.status || "Pending", OPT.status, "decisions.status");
  const clFormat = oneOf(d.cl_format, OPT.clFormat, "decisions.cl_format");
  const hook = oneOf(d.hook_type, OPT.hook, "decisions.hook_type");
  const sub = typeof d.sub_archetype === "string" ? d.sub_archetype.trim() : "";
  if (d.sub_archetype === undefined) err("decisions.sub_archetype: missing (use \"\" or \"ambiguous\" if none)");
  else if (sub && !/^([ADE][1-3]|ambiguous)$/i.test(sub)) err(`decisions.sub_archetype: "${sub}" is not A1-A3, D1-D3, E1-E3, "ambiguous" or ""`);
  const hm = str(d, "hm_name", "decisions.hm_name"), positioning = str(d, "positioning", "decisions.positioning"), notes = str(d, "outcome_notes", "decisions.outcome_notes");
  const lines = (v, name) => { const arr = Array.isArray(v) ? v : typeof v === "string" ? v.split("\n") : []; const out = arr.map((x) => String(x).trim()).filter(Boolean); if (!out.length) err(`${name}: at least one entry required`); return out.join("\n"); };
  const jdReq = lines(d.jd_requirements, "decisions.jd_requirements"), peers = lines(d.peers, "decisions.peers");
  if (/\n/.test(positioning)) err("decisions.positioning must be one line (the field is single-line text)");
  const iso = /^\d{4}-\d{2}-\d{2}$/;
  if (d.deadline !== null && d.deadline !== undefined && (typeof d.deadline !== "string" || !iso.test(d.deadline) || isNaN(Date.parse(d.deadline)))) err(`decisions.deadline must be YYYY-MM-DD or null, got "${d.deadline}"`);
  if (d.deadline == null && !/deadline/i.test(notes)) err("deadline is null: decisions.outcome_notes must say the JD gives no deadline");
  const url = (v, name) => { if (v === undefined || v === null || v === "") return null; if (typeof v !== "string" || !/^https:\/\/\S+$/.test(v)) err(`${name} must be an https URL`); return v; };
  const recLi = url(d.recruiter_linkedin, "decisions.recruiter_linkedin"), hmLi = url(d.hm_linkedin, "decisions.hm_linkedin");
  const cv = `${base}_CV.docx`, cl = `${base}_CL.docx`;
  if (d.cv_file !== undefined && d.cv_file !== cv) err(`decisions.cv_file "${d.cv_file}" must equal ${cv}`);
  if (d.cl_file !== undefined && d.cl_file !== cl) err(`decisions.cl_file "${d.cl_file}" must equal ${cl}`);
  if (!/^\d{8}[A-Za-z0-9]+_[A-Za-z0-9]+$/.test(base)) err(`meta.base "${base}" is not YYYYMMDDCompany_RoleTitle`);
  if (!noFiles) for (const f of [cv, cl]) if (!fs.existsSync(path.join(dir, "out", f))) err(`out/${f} does not exist yet (build first, or pass --no-file-check)`);

  const fields = {
    [F.date]: new Date().toISOString(), [F.company]: company, [F.role]: role, [F.track]: track, [F.fit]: fit, [F.status]: status,
    [F.cv]: cv, [F.cl]: cl, [F.hmName]: hm, [F.positioning]: positioning, [F.jd]: jdReq, [F.notes]: notes, [F.peers]: peers,
    [F.outreach]: "Pending", [F.clFormat]: clFormat, [F.hook]: hook,
  };
  if (sub) fields[F.sub] = sub.toLowerCase() === "ambiguous" ? "ambiguous" : sub.toUpperCase();
  if (d.deadline) fields[F.deadline] = d.deadline;
  if (typeof d.recruiter_name === "string" && d.recruiter_name.trim()) fields[F.recName] = d.recruiter_name.trim();
  if (recLi) fields[F.recLi] = recLi;
  if (hmLi) fields[F.hmLi] = hmLi;
  for (const [k, v] of Object.entries(fields)) if (typeof v === "string" && DASH.test(v)) err(`field ${k}: contains an em or en dash (use a comma, colon, semicolon, full stop or a plain hyphen)`);
  for (const [k, v] of Object.entries(d)) if (DASH.test(JSON.stringify(v))) err(`decisions.${k}: contains an em or en dash`);
  if (errs.length) { console.error("LOG FAIL:\n  " + errs.join("\n  ")); return 1; }
  const call = { baseId: BASE, tableId: TABLE, records: [{ fields }] };
  console.log("AIRTABLE CREATE (paste as the arguments of one mcp__Airtable__create_records_for_table call):\n" + JSON.stringify(call));
  console.log("\nTRACK MIX QUERY (mcp__Airtable__list_records_for_table; run at the start, count Track by Status):\n" + JSON.stringify(mixQuery().args));
  console.log("\nLOG OK: Networking Status, First Response Date/From, Interview Prep Done and Hook Type (retired) left empty by design.");
  return 0;
}
module.exports = { OPT, TRACK_LABELS, F };
if (require.main === module) process.exit(main(process.argv));
