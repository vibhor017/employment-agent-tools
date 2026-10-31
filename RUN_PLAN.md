# RUN_PLAN.md: the call plan for one application (v1.0, 31 October 2026)

Every model call re-reads the whole context, so the call count is the cost. Target: 8 calls after the JD is in hand, 5 if nothing fails.
This file changes how many steps are taken, never what the documents say or what the QA gate checks.

Before call 1 (not counted): fetch or save the JD, fix the track (Step 2). `node init_app.js <JD> --track X --company "C" --role "R"` scaffolds the folder and builds /home/claude/pack/run_pack.md, printing only its path and the size report.

| Call | One message carries | Can merge with |
|---|---|---|
| 1 | Read run_pack.md. In the same message: `node log_application.js --mix` output used for the Airtable track-mix lookup (one list_records_for_table call), `node build_run_pack.js --section APPLICATION_RULES.md "SECTION 12"` (needed later for the networking step), the research batch (one company page, at most four searches, the Airtable and firecrawl tools loaded in one ToolSearch) | init_app.js, if the track is already certain |
| 2 | The run card (chat) plus the first writes: every TAILOR field in cv_data.js and cl_data.js (Write or Edit), meta.json if the stem needs fixing | none: it needs call 1's research |
| 3 | `node build_application.js /home/claude/app` alone: the per-paragraph word counts and the BUDGET line | call 4, when the letter was drafted inside the band (run_all.js builds first and stops on BUDGET FAIL, so a miss costs one extra call, not more) |
| 4 | Write hm_review.md, then `node run_all.js /home/claude/app` | NET.md written in the same message (run_all.js checks it as its last step), so call 6 disappears |
| 5 | One edit that fixes every FAIL and fixable WARN, then `run_all.js` once more | skipped when call 4 printed RUN_ALL: PASS |
| 6 | Write NET.md, then `node run_all.js /home/claude/app --no-docx` | call 4, as above (draft the networking package from the letter's hook and the call 1 research) |
| 7 | Write decisions.json, run `node log_application.js /home/claude/app` | call 6, when decisions.json is written with NET.md |
| 8 | Paste the printed payload into one create_records_for_table call, and in the same message SendUserFile for the CV, CL and NET files, then the final chat summary | nothing: the payload must exist first |

Floor with every merge taken: 1, 2, 3 (build, hm_review and NET.md, run_all.js), 4 (log script), 5 (Airtable and file delivery). A failed gate adds one fix call; a failed budget adds one.

Rules that stay as they were
- One run_pack.md read per session. Section 12 is printed once, at call 1, not read from the Project again.
- Never project_read a document the pack already carries. If a rule is missing: `node build_run_pack.js --section <FILE.md> "<heading>"`. If the whole pack misses an edge case: `node build_run_pack.js <track> <JD> --full --out /home/claude/pack`.
- The pack is built from docs/. After any edit of a document in the Project, run sync_docs.js (below) before the next application, or the pack is stale.
- A pack build that exits 3 (docs/ differs from VERSION.json) or 4 (heading missing or renamed) means the mirror is out of date: tell Vibhor, use --full for this run.
- Task list: one TaskCreate call at the start, TaskUpdate only inside messages that also do real work.

Refreshing docs/ after a Project edit
1. In a session, project_read every changed document (all 16 is simplest).
2. `node docs_from_transcript.js /home/claude/docs` saves them byte for byte.
3. `node sync_docs.js /home/claude/docs --instructions-version vX.Y --instructions-date "D Month YYYY"` rewrites docs/ and docs/VERSION.json.
4. `npm test` must print SMOKE TEST: PASS; then commit docs/.
