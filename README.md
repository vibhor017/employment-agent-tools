# employment-agent-tools

Code for the Employment Agent Claude project. This repository is the single source of truth: the project instructions tell the agent to clone it at the start of a session and run everything from here.

| File | Version | What it does |
|---|---|---|
| qa_check.py | v1.7 | Blocking mechanical QA gate: `python3 qa_check.py cv|cl|net <file> [--jd JD.txt]`, and `hm <hm_review.md>` for the Hiring Manager Review record |
| cv_template_builder.js | v4.2 | Builds the CV .docx (locked template) |
| cl_template_builder.js | v1.2 | Builds the cover letter .docx, prose or evidence table |
| init_app.js | v1.0 | Step 1 setup: `node init_app.js <jd_file> [app_dir]` creates the app folder, copies the JD to JD.txt unchanged, installs docx only if missing (no lockfile) |
| build_application.js | v1.1 | One data folder in: writes CV.txt and CL.txt for the QA gate and, with `docx`, both .docx files. Exits 3 when the letter is outside its word band, 4 when `docx` is asked for before hm_review.md exists |
| cv_template_example_data.js, cl_template_example_data.js | | Reference shapes only; the agent does not read them during an application |
| tests/ | | Regression fixture and `run_smoke.sh` |

Run order per application: `node init_app.js <jd_file>`, write the data files, `node build_application.js <app_dir>` (fix any BUDGET line), write `hm_review.md` and run `python3 qa_check.py hm`, then `qa_check.py cv` and `cl` on the drafts, then `node build_application.js <app_dir> docx` and QA on both .docx files.

Test: `npm test` rebuilds a sample application for a fictional company in `tests/sample` (known PASS) and runs the QA gate on all four files. Run it after any change to `qa_check.py` or a builder. If it fails, the change altered behaviour: fix the change, never the fixture. When a rule change makes the old letter legitimately fail (a new banned phrase, say), update the fixture data in the same commit and say why in the message.

Rule: when CANDIDATE_STRATEGY.md Section 5A or 5B, APPLICATION_RULES.md Section 0, or the portfolio entry list changes, update qa_check.py here in the same change, and bump its version line.
