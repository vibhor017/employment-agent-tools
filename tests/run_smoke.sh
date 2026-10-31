#!/usr/bin/env bash
# Regression test: rebuilds the sample application (a fictional company, known PASS) and runs the QA gate on all four files.
# Any FAIL here means a change to qa_check.py or a builder altered behaviour. Fix the change, never the fixture.
set -euo pipefail
cd "$(dirname "$0")/.."
T=tests/sample
rm -rf "$T/out" "$T/CV.txt" "$T/CL.txt"
DRAFT_DIR="$T" node build_application.js "$T" docx
fail=0
check() { # mode file
  local out; out=$(python3 qa_check.py "$1" "$2" --jd "$T/JD.txt" || true)
  echo "$out" | tail -1
  echo "$out" | grep -q '^QA .*: PASS$' || fail=1
}
out=$(python3 qa_check.py hm "$T/hm_review.md" || true); echo "$out" | head -1; echo "$out" | grep -q "^QA HM .*: PASS" || fail=1
check cv "$T/CV.txt"; for f in "$T"/out/*_CV.docx; do check cv "$f"; done
check cl "$T/CL.txt"; for f in "$T"/out/*_CL.docx; do check cl "$f"; done

# run_all.js must reproduce the same verdict on the sample in one command
out=$(DRAFT_DIR="$T" node run_all.js "$T" || true); echo "$out" | tail -1
echo "$out" | grep -q '^RUN_ALL: PASS' || fail=1

# Scaffolds: every track must (a) be blocked by the TAILOR marker gate and (b) build and pass the CV QA once the markers are stripped
for tr in A B C D E; do
  S=$(mktemp -d); DRAFT_DIR="$S" node init_app.js "$T/JD.txt" "$S/app" --track "$tr" --company Test --role Role >/dev/null
  DRAFT_DIR="$S" node build_application.js "$S/app" >/dev/null 2>&1 && { echo "scaffold $tr: marker gate did not block"; fail=1; }
  sed -i 's/\xe2\x9f\xa6TAILOR\xe2\x9f\xa7 //g' "$S/app/cv_data.js"
  cp "$T/cl_data.js" "$S/app/cl_data.js"
  DRAFT_DIR="$S" node build_application.js "$S/app" >/dev/null 2>&1 || { echo "scaffold $tr: stripped skeleton does not build"; fail=1; }
  python3 qa_check.py cv "$S/CV.txt" | head -1 | grep -q ': PASS$' || { echo "scaffold $tr: skeleton CV fails QA"; fail=1; }
  rm -rf "$S"
done
echo "scaffolds A-E checked"

# Run pack: every track, allow-list, byte equality with docs/
node tests/pack_test.js || fail=1
node tests/log_test.js || fail=1
[ $fail -eq 0 ] && echo "SMOKE TEST: PASS" || { echo "SMOKE TEST: FAIL"; exit 1; }
