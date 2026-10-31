/**
 * build_run_pack.js v1.0, 31 October 2026
 * Builds run_pack.md: the parts of the Project documents an application run actually uses, copied byte for byte from docs/.
 *
 *   node build_run_pack.js <track A|B|C|D|E> <JD file> [--out /home/claude/pack] [--full] [--entries a,b | --entries none]
 *   --also "FILE.md::heading start"  (repeatable) adds one more verbatim section, for example --also "CANDIDATE_STRATEGY.md::SECTION 6"
 *   node build_run_pack.js --section <FILE.md> "<heading start>"    print one section of docs/ with its header line
 *                                                                  (for example APPLICATION_RULES.md "SECTION 12" at the networking step)
 *
 * Every block is preceded by a header line:  <<< PACK | src=... | lines=a-b | heading="..." | sha256=... | words=N >>>
 * The sha256 is of the block text, which is an exact substring of the source file. Nothing is edited, wrapped or summarised.
 * A heading that is missing, renamed or ambiguous stops the build (exit 4). A docs/ file that no longer matches
 * docs/VERSION.json stops it too (exit 3): run sync_docs.js again.
 * --full writes the four complete documents (rules, strategy, the track's master CV, dossier) to run_pack.md instead: the fallback
 * for an edge case the pack does not cover. --entries overrides the default portfolio entries (names matched by file name).
 */
const fs = require("fs"), path = require("path");
const L = require("./pack_lib.js");
const DOCS = path.join(__dirname, "docs");
const MASTER = { A: "PM_MASTER_CV.md", E: "PM_MASTER_CV.md", B: "POLICY_MASTER_CV.md", C: "POLICY_MASTER_CV.md", D: "TECH_PM_MASTER_CV.md" };
const AR = "APPLICATION_RULES.md", CS = "CANDIDATE_STRATEGY.md", PD = "PORTFOLIO_DOSSIER.md";

// ---- manifest -------------------------------------------------------------------------------------------------------
const AR_SECTIONS = [
  "SECTION 0: THE PRE-WRITE GATE", "SECTION 2: COVER LETTER ARCHITECTURE", "SECTION 7: FORMATTING (COVER LETTER)",
  "SECTION 8A: HIRING MANAGER REVIEW", "SECTION 11: CV CUSTOMISATION RULES", "SECTION 15: THE ROLE BRIEF",
];
const CS_TRACK_DIFF = {
  A: "Track A, Product Manager: Digital Health and AI", B: "Track B, Tech Policy and AI Governance",
  C: "Track C, Digitalisation Expert / Public Sector / International Development",
  D: "Track D, Technical PM / AI Governance PM / Forward Deployed Engineer", E: "Track E, Product Manager: General and Consumer",
};
const CS_TRACK_SCREEN = {
  A: "Track A, PM hiring manager", B: "Track B, policy hiring manager", C: "Track C, digitalisation hiring manager",
  D: "Track D, technical PM and FDE hiring manager", E: "Track E, consumer and general PM hiring manager",
};
const CS_COMMON = ["SECTION 4: KNOWN OBJECTIONS AND BRIDGES", "SECTION 5A: METRIC BANK", "SECTION 7A: STORY BANK",
  "SECTION 9: GAP MITIGATION LIBRARY", "SECTION 9B: AREAS OF EXPERTISE ECHO MAP"];
const ROUTE_ROWS = {
  A: ["| A2, ", "| A1 / A3, "], B: ["| B, "], C: ["| C, digitalisation", "| C, India"], D: ["| D1, ", "| D2, ", "| D3, "],
  E: ["| E1, consumer", "| E1, productivity", "| E2, ", "| E3, marketplace", "| E3, B2B"],
};
const ENTRY_FILES = { "Gyro Health": "1-gyro-health.md", CMGRS: "2-cmgrs.md", RasaHub: "3-rasahub.md", Haqdaar: "4-haqdaar.md",
  BeamerHeld: "5-beamerheld.md", Typecast: "6-typecast.md", CommonsTrace: "7-commonstrace.md" };

function fail(code, msg) { console.error("PACK FAIL: " + msg); process.exit(code); }
const read = (rel) => fs.readFileSync(path.join(DOCS, rel), "utf8");
// whole-file blocks drop only the final newline(s), so the block is still an exact substring of the file
const whole = (rel) => read(rel).replace(/\n+$/, "");

function verifyDocs(version, rels) {
  for (const rel of rels) {
    const rec = version.files[rel];
    if (!rec) fail(3, `${rel} is not listed in docs/VERSION.json. Run sync_docs.js.`);
    const h = L.sha256(fs.readFileSync(path.join(DOCS, rel)));
    if (h !== rec.sha256) fail(3, `docs/${rel} does not match docs/VERSION.json (edited by hand, or the mirror is stale). Run sync_docs.js with freshly read Project files.`);
  }
}
const header = (src, a, b, heading, text) =>
  `<<< PACK | src=docs/${src} | lines=${a}-${b} | heading="${heading.replace(/"/g, "'")}" | sha256=${L.sha256(text)} | words=${L.words(text)} >>>`;

function defaultEntries(track, dossier) {
  const rows = ROUTE_ROWS[track].map((p) => dossier.split("\n").find((l) => l.startsWith(p)));
  if (rows.some((r) => !r)) fail(4, `routing rows for track ${track} not found in ${PD}`);
  const cells = rows.map((r) => r.split("|").map((c) => c.trim()));
  const lead = new Set(cells.map((c) => c[2])), second = new Set(cells.map((c) => c[3]));
  const out = [];
  if (lead.size === 1) out.push([...lead][0]);
  if (second.size === 1) out.push([...second][0]);
  return [...new Set(out)];
}

function buildBlocks(track, entriesOpt, also = []) {
  const blocks = [], add = (src, heading, text, a, b) => blocks.push({ src, heading, text, a, b });
  const sec = (file, doc, spec) => { const s = L.extract(doc, { level: 2, ...spec }, `${file} "${spec.prefix}"`); add(file, s.heading, s.text, s.startLine, s.endLine); };
  const ar = read(AR), cs = read(CS), pd = read(PD);
  for (const p of AR_SECTIONS) sec(AR, ar, { prefix: p });
  sec(CS, cs, { prefix: "SECTION 1: IDENTITY NARRATIVE" });
  sec(CS, cs, { prefix: CS_TRACK_DIFF[track], level: 3, within: "SECTION 2: TRACK DIFFERENTIATION" });
  sec(CS, cs, { prefix: CS_TRACK_SCREEN[track], level: 3, within: "SECTION 3: HIRING MANAGER EXPECTATIONS" });
  for (const p of CS_COMMON) sec(CS, cs, { prefix: p });
  // sanity: the objections the brief names must still be there (they sit inside Section 4)
  for (const o of ["Objection 2:", "Objection 7:"]) L.extract(cs, { prefix: o, level: 3, within: "SECTION 4:" }, `${CS} "${o}"`);
  const master = MASTER[track], mtext = whole(master), ml = mtext.split("\n").length;
  add(master, "(whole file)", mtext, 1, ml);
  sec(PD, pd, { prefix: "Honesty rules" });
  sec(PD, pd, { prefix: "Quick index" });
  const routing = L.extract(pd, { prefix: "Track routing", level: 2 }, `${PD} "Track routing"`);
  const rl = routing.text.split("\n"), base = routing.startLine;
  const lineNo = (i) => base + i;
  const pieces = [];
  const para = (from) => { const i = rl.findIndex((l) => l.startsWith(from)); if (i < 0 || rl.filter((l) => l.startsWith(from)).length !== 1) fail(4, `${PD}: routing paragraph starting "${from}" not found exactly once`); let e = i; while (e < rl.length && rl[e].trim() !== "" && !(e > i && rl[e].startsWith("|"))) e++; return [i, e]; };
  pieces.push({ label: "routing intro", r: para("Maps to the five application tracks") });
  const th = rl.findIndex((l) => l.startsWith("| Track / sub-archetype")), sep = th + 1;
  if (th < 0 || !/^\|[-| ]+\|$/.test(rl[sep] || "")) fail(4, `${PD}: routing table header not found`);
  pieces.push({ label: "routing table header", r: [th, sep + 1] });
  const rowIdx = ROUTE_ROWS[track].map((p) => { const m = rl.map((l, i) => [l, i]).filter(([l]) => l.startsWith(p)); if (m.length !== 1) fail(4, `${PD}: routing row "${p}" matched ${m.length} times (expected 1)`); return m[0][1]; }).sort((x, y) => x - y);
  let g = [rowIdx[0]];
  const flush = () => { pieces.push({ label: "routing rows", r: [g[0], g[g.length - 1] + 1] }); };
  for (const i of rowIdx.slice(1)) { if (i === g[g.length - 1] + 1) g.push(i); else { flush(); g = [i]; } }
  flush();
  pieces.push({ label: "link suspension note", r: para("(While the product link is suspended") });
  pieces.push({ label: "suppression note", r: para("Suppression by track follows") });
  pieces.sort((x, y) => x.r[0] - y.r[0]);
  for (const p of pieces) add(PD, `${routing.heading} [${p.label}]`, rl.slice(p.r[0], p.r[1]).join("\n"), lineNo(p.r[0]), lineNo(p.r[1] - 1));
  // default portfolio entries
  let names;
  if (entriesOpt === "none") names = [];
  else if (entriesOpt) names = entriesOpt.split(",").map((s) => s.trim()).filter(Boolean);
  else names = defaultEntries(track, pd);
  const files = names.map((n) => {
    const hit = Object.entries(ENTRY_FILES).find(([k, f]) => k.toLowerCase() === n.toLowerCase() || f.toLowerCase().includes(n.toLowerCase()));
    if (!hit) fail(4, `unknown portfolio entry "${n}"`);
    return hit[1];
  });
  for (const f of files) { const t = whole("portfolio/" + f); add("portfolio/" + f, "(whole file)", t, 1, t.split("\n").length); }
  for (const x of also) {
    const [f, ...h] = x.split("::");
    if (!f || !h.length) fail(2, `--also expects FILE.md::heading start, got "${x}"`);
    const { rel, s } = resolveSection(f, h.join("::"));
    if (blocks.some((b) => b.src === rel && b.a === s.startLine)) continue;
    add(rel, s.heading, s.text, s.startLine, s.endLine);
  }
  return { blocks, entries: files };
}

function buildPack(track, jdFile, outDir, opts = {}) {
  track = String(track || "").toUpperCase();
  if (!MASTER[track]) fail(2, "track must be one of A B C D E");
  if (!jdFile || !fs.existsSync(jdFile)) fail(2, `JD file not found: ${jdFile}`);
  let version; try { version = JSON.parse(read("VERSION.json")); } catch { fail(3, "docs/VERSION.json missing or unreadable. Run sync_docs.js."); }
  const need = [AR, CS, PD, MASTER[track], "PORTFOLIO_ENTRIES.md"];
  verifyDocs(version, need);
  const jd = fs.readFileSync(jdFile, "utf8");
  let blocks = [], entries = [], mode = "pack";
  const fullWords = {}; for (const r of need) fullWords[r] = L.words(read(r));
  const four = [AR, CS, MASTER[track], PD];
  if (opts.full) {
    mode = "full";
    for (const r of four) { const t = whole(r); blocks.push({ src: r, heading: "(whole file)", text: t, a: 1, b: t.split("\n").length }); }
  } else {
    try { ({ blocks, entries } = buildBlocks(track, opts.entries, opts.also || [])); }
    catch (e) { fail(4, e.message); }
    verifyDocs(version, entries.map((e) => "portfolio/" + e));
  }
  const incl = new Set(blocks.map((b) => b.src));
  const omitted = [];
  if (!opts.full) for (const r of [AR, CS, PD]) {
    const doc = read(r), kept = blocks.filter((b) => b.src === r).map((b) => b.heading.replace(/^#+ /, "").replace(/ \[.*\]$/, ""));
    const lines = doc.split("\n");
    const miss = L.headings(lines).filter((h) => h.level === 2 && !kept.some((k) => k.startsWith(h.text) || h.text.startsWith(k))).map((h) => h.text.replace(/\s*\(.*$/, ""));
    omitted.push(`${r}: ${miss.join("; ")}`);
  }
  const pre = [
    `# RUN PACK | Track ${track} | ${mode === "full" ? "FULL documents (fallback)" : "verbatim extracts"} | docs mirror ${version.instructions_version}, ${version.instructions_date}`,
    `JD: ${path.basename(jdFile)} (${L.words(jd)} words, sha256 ${L.sha256(jd).slice(0, 16)}).`,
    mode === "full"
      ? "Complete documents follow, each after a header line that carries its source and sha256."
      : "Each block below is copied byte for byte from docs/ and sits after a header line with its source, line range and sha256. Nothing is paraphrased or shortened.",
    ...(mode === "full" ? [] : [
      `Level 2 sections NOT extracted whole, by document (a track subsection of SECTION 2 and SECTION 3 of the strategy is included for this track): ${omitted.join(" | ")}.`,
      `If a rule you need is not here: node build_run_pack.js --section <FILE.md> "<heading start>" prints one section with its header line (APPLICATION_RULES.md "SECTION 12" for the networking step); node build_run_pack.js ${track} <JD> --full --out <dir> rebuilds this file with the four complete documents.`,
    ]),
  ].join("\n");
  const body = blocks.map((b) => header(b.src, b.a, b.b, b.heading, b.text) + "\n" + b.text).join("\n\n");
  const text = pre + "\n\n" + body + "\n";
  fs.mkdirSync(outDir, { recursive: true });
  const packPath = path.join(outDir, "run_pack.md");
  fs.writeFileSync(packPath, text);
  // size report
  const per = {};
  for (const b of blocks) per[b.src] = (per[b.src] || 0) + L.words(b.text);
  const rows = Object.entries(per).map(([s, w]) => `  ${s.padEnd(34)} ${String(w).padStart(6)} words` + (fullWords[s] ? `  (full document ${fullWords[s]})` : ""));
  const fourFull = four.reduce((a, r) => a + fullWords[r], 0), packWords = L.words(text);
  const report = [`RUN PACK: ${packPath} | track ${track} | ${mode}`, ...rows,
    `  run_pack.md total ${packWords} words | the four full documents ${fourFull} words | ${mode === "full" ? "no saving (--full)" : "saving " + (100 * (1 - packWords / fourFull)).toFixed(1) + "%"}`].join("\n");
  return { packPath, report, packWords, fourFull, blocks, entries };
}

function resolveSection(file, heading) {
  const rel = fs.existsSync(path.join(DOCS, file)) ? file : fs.existsSync(path.join(DOCS, "portfolio", file)) ? "portfolio/" + file : null;
  if (!rel) fail(2, `no such file in docs/: ${file}`);
  const doc = read(rel), hs = L.headings(doc.split("\n"));
  let cand = hs.filter((h) => h.text.startsWith(heading));
  if (cand.length === 0) cand = hs.filter((h) => h.text.toLowerCase().includes(heading.toLowerCase()));
  if (cand.length !== 1) fail(4, `heading "${heading}" matched ${cand.length} times in ${rel}: ${cand.slice(0, 6).map((h) => h.text).join(" | ")}`);
  let version; try { version = JSON.parse(read("VERSION.json")); } catch { fail(3, "docs/VERSION.json missing"); }
  verifyDocs(version, [rel]);
  const s = L.extract(doc, { prefix: cand[0].text, level: cand[0].level }, rel);
  return { rel, s };
}
function printSection(file, heading) {
  const { rel, s } = resolveSection(file, heading);
  console.log(header(rel, s.startLine, s.endLine, s.heading, s.text) + "\n" + s.text);
}

if (require.main === module) {
  const a = process.argv.slice(2);
  if (a[0] === "--section") { if (!a[1] || !a[2]) fail(2, 'usage: --section <FILE.md> "<heading start>"'); printSection(a[1], a.slice(2).join(" ")); process.exit(0); }
  const take = (n) => { const i = a.indexOf(n); if (i < 0) return null; const v = a[i + 1]; a.splice(i, 2); return v; };
  const out = take("--out") || "/home/claude/pack", entries = take("--entries");
  const also = []; for (let x = take("--also"); x; x = take("--also")) also.push(x);
  const fi = a.indexOf("--full"), full = fi >= 0; if (full) a.splice(fi, 1);
  if (a.length < 2) fail(2, "usage: node build_run_pack.js <track A|B|C|D|E> <JD file> [--out dir] [--full] [--entries a,b|none]");
  const r = buildPack(a[0], a[1], out, { full, entries, also });
  console.log(r.report);
}
module.exports = { buildPack, MASTER };
