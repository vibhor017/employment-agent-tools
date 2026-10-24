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
[ $fail -eq 0 ] && echo "SMOKE TEST: PASS" || { echo "SMOKE TEST: FAIL"; exit 1; }
