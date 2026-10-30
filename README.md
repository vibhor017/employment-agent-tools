# employment-agent-tools

Code for the Employment Agent Claude project. This repository is the single source of truth: the project instructions tell the agent to clone it at the start of a session and run everything from here.

| File | Version | What it does |
|---|---|---|
| qa_check.py | v1.7 | Blocking mechanical QA gate: `python3 qa_check.py cv|cl|net <file> [--jd JD.txt]`, and `hm <hm_review.md>` for the Hiring Manager Review record |
| cv_template_builder.js | v4.2 | Builds the CV .docx (locked template) |
| cl_template_builder.js | v1.2 | Builds the cover letter .docx, prose or evidence table |
| init_app.js | v1.1 | Step 1 setup: `node init_app.js <jd_file> [app_dir] --track D --company "Libra" --role "AI Product Manager"` creates the app folder, copies the JD to JD.txt unchanged, installs docx only if missing (no lockfile), and with `--track` scaffolds cv_data.js, cl_data.js, meta.json and hm_review.md from `skeletons/` (never overwrites without `--force`) |
| build_application.js | v1.2 | One data folder in: writes CV.txt and CL.txt for the QA gate and, with `docx`, both .docx files. Exits 3 when the letter is outside its word band, 4 when `docx` is asked for before hm_review.md exists, 5 while any skeleton field still carries the TAILOR marker |
| run_all.js | v1.0 | The whole mechanical gate in one command: `node run_all.js [app_dir] [--no-docx]`. Build, hm check, cv and cl checks on the drafts, docx build, checks on both .docx, and the net check once NET.md exists. Prints word counts, only FAIL and WARN lines, a tailoring line, and one `RUN_ALL: PASS/FAIL` line |
| master_to_skeleton.js | v1.0 | `node master_to_skeleton.js <master.md> <track> <out_dir>` turns a master CV into the default cv_data.js for one track. Regenerate `skeletons/<track>/` after any master CV change |
| skeletons/ | | Default cv_data.js per track (A, B, C, D, E), cl_data.template.js, hm_review.template.md |
| docs_from_transcript.js | v1.0 | Maintenance helper: saves project documents read in a session to disk from the transcript |
| cv_template_example_data.js, cl_template_example_data.js | | Reference shapes only; the agent does not read them during an application |
| tests/ | | Regression fixture and `run_smoke.sh` |

Run order per application: `node init_app.js <jd_file> --track X --company C --role R`, edit the scaffolded cv_data.js, cl_data.js and hm_review.md (every TAILOR marker must go), then `node run_all.js` (fix every FAIL and fixable WARN in one edit, rerun once), write NET.md into `app/out/<base>_NET.md`, `node run_all.js` again. The individual commands (`build_application.js`, `qa_check.py hm|cv|cl|net`) still work on their own.

Test: `npm test` rebuilds a sample application for a fictional company in `tests/sample` (known PASS) and runs the QA gate on all four files. Run it after any change to `qa_check.py` or a builder. If it fails, the change altered behaviour: fix the change, never the fixture. When a rule change makes the old letter legitimately fail (a new banned phrase, say), update the fixture data in the same commit and say why in the message.

Rule: when CANDIDATE_STRATEGY.md Section 5A or 5B, APPLICATION_RULES.md Section 0, or the portfolio entry list changes, update qa_check.py here in the same change, and bump its version line.
