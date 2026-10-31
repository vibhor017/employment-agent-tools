// tests/log_test.js: log_application.js accepts the fixture and rejects each kind of bad value.
const fs = require("fs"), path = require("path"), os = require("os"), cp = require("child_process");
const root = path.join(__dirname, ".."), fx = path.join(__dirname, "log_fixture");
let fails = 0; const bad = (m) => { fails++; console.log("FAIL: " + m); };
const run = (meta, dec, extra = ["--no-file-check"]) => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "log_test_"));
  fs.writeFileSync(path.join(d, "meta.json"), JSON.stringify(meta)); fs.writeFileSync(path.join(d, "decisions.json"), JSON.stringify(dec));
  const r = cp.spawnSync("node", [path.join(root, "log_application.js"), d, ...extra], { encoding: "utf8" });
  fs.rmSync(d, { recursive: true, force: true }); return r;
};
const meta = JSON.parse(fs.readFileSync(path.join(fx, "meta.json"), "utf8")), dec = JSON.parse(fs.readFileSync(path.join(fx, "decisions.json"), "utf8"));
let r = run(meta, dec);
if (r.status !== 0) bad("fixture rejected: " + r.stderr);
else {
  const call = JSON.parse(r.stdout.split("\n")[1]), f = call.records[0].fields;
  if (call.baseId !== "appwCXHvQt6PU5kIq" || call.tableId !== "tblON1TowWRGtLPYv") bad("base or table id wrong");
  for (const k of ["fldxKM5Gv0q7BY83c", "fld054uDKfPBPGJQJ", "fldjEORtjEYnv15OI", "fld8zE6VkeJMnMA76", "fldKzcQrTXzR0GAO8"]) if (k in f) bad("field that must stay empty was written: " + k);
  if (f.fld3WYOKq2cOY1oDj !== meta.base + "_CV.docx" || f.fld9be1Wn6UZEO3oo !== meta.base + "_CL.docx") bad("file names");
  if ("fldrBGHpQV6qpxtgQ" in f) bad("null deadline should be omitted");
}
const cases = {
  "bad fit": [meta, { ...dec, fit: "Weak" }], "bad hook": [meta, { ...dec, hook_type: "H4" }], "bad cl_format": [meta, { ...dec, cl_format: "Table" }],
  "track label from the project text (not live)": [meta, { ...dec, track: "Technical PM (Track D)" }],
  "track vs meta mismatch": [meta, { ...dec, track: "PM" }], "em dash": [meta, { ...dec, positioning: "a \u2014 b" }],
  "en dash in array": [meta, { ...dec, peers: ["x \u2013 y"] }], "bad deadline": [meta, { ...dec, deadline: "31/10/2026" }],
  "wrong cv name": [meta, { ...dec, cv_file: "other_CV.docx" }], "no company in meta": [{ base: meta.base, track: "D" }, dec],
  "null deadline without note": [meta, { ...dec, outcome_notes: "Nothing." }],
};
for (const [n, [m, d]] of Object.entries(cases)) if (run(m, d).status === 0) bad("accepted: " + n);
if (run(meta, dec, []).status === 0) bad("accepted missing .docx files without --no-file-check");
console.log(fails ? `LOG TEST: FAIL (${fails})` : "LOG TEST: PASS"); process.exit(fails ? 1 : 0);
