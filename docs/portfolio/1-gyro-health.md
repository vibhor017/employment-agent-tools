<!-- portfolio entry file, split verbatim from PORTFOLIO_ENTRIES.md v8.1 on 30 October 2026. Honesty rules and routing: PORTFOLIO_DOSSIER.md -->
## 1. Gyro Health (the live site still shows the earlier name)

### At a glance
- **Role:** Founder, CEO & Technical Product Lead on the site. The CVs use Technical Product Lead and Founder. Use the CV designation in applications
- **Period:** February 2026 to present (first commit 7 July 2026; tagged MVP 19 July 2026)
- **Type:** AI-native health tech, consumer app, bootstrapped
- **Focus:** A private care companion for people with long-term conditions, epilepsy and migraine first, for Hindi- and English-speaking users in India, on Android and WhatsApp. Condition-neutral architecture
- **Location:** Berlin, DE
- **Team:** Built solo by Vibhor with AI coding agents (Cursor, Claude Code), including the pattern engine and its validation harness, and run solo through the pilot. A data science advisor reviews the statistical engine and a health governance advisor reviews policy. No co-founder, CTO or named teammate appears in applications. Neurologist and headache-specialist advisors are being sought, not signed
- **Status:** Pre-launch. A tagged MVP in testing, with a four-wave build plan to a 9 Nov 2026 release candidate. A pilot cohort of about 35 patients is planned from 11 Nov 2026, to test and iterate the app. No users, no interview findings, no retention and no revenue exist. The v2 engine is deployed but not live or in production

### The problem
**Positioning line:** a private care companion that helps people with long-term conditions manage the weeks between appointments and bring a clear, one-page record to each one.

A clinic appointment is short, and the weeks between visits go unrecorded, so patients arrive with a summary rebuilt from memory. Gyro Health turns that unrecorded time into evidence: a quick capture of each episode, a pattern engine that shows only what passes a statistical threshold, and a one-page report ordered around the decisions a doctor makes.

### The loop (designed; the app is in testing)
My plan (rule-based, reviewed cards) -> capture -> pattern engine -> one-page doctor report -> after-visit capture.
- **Capture:** a Right now mode for recording an episode in the moment, a guided What happened form, a 15-second check-in, a single-use witness link that needs no app so a family member can describe an episode, and "I was told" entries
- **Patterns:** statistical checks that show a link only when it passes a threshold and replicates; an empty page beats a false pattern
- **Report:** one page, decision-ordered, for the doctor
- **Assistant:** answers only from reviewed, cited cards, behind a fail-closed, rule-based filter (specified)
- **AI disclosure:** a mandatory, database-enforced label on every AI-written answer, aligned to EU AI Act Article 50 (a build fact; the Mumbai re-audit is pending, so no "zero unlabelled rows")
- **Languages and channels:** Hindi and English on Android and WhatsApp, with native-speaker review of every Hindi string

### Stage signals
- A tagged MVP in 12 days, solo with AI coding agents (repo, CV-only)
- Pass thresholds for 13 experiments and 3 kill criteria written before any user data
- A record of 38 product decisions, two locked (intended-use boundary, Insurance Firewall)
- A release held until the engine passed ground-truth testing (repo, CV-only)
- An AI-disclosure label on every AI-written answer, enforced by the database and aligned to EU AI Act Article 50
- Customer interviews planned from 20-26 Oct; a pilot cohort of about 35 patients, enrolled through doctors, planned from 11 Nov. Neither has produced findings

### Key decisions and tradeoffs
**Condition-neutral architecture, built before a single paying user justified it.** The backend supports any long-term condition from day one, with epilepsy and migraine first. *Tradeoff:* more engineering time before revenue and a slower first demo, accepted so each new condition is configuration, not a rebuild.

**Free core forever, paid Plus, and a sponsored route, designed before revenue.** Capture and the doctor report's basics stay free permanently; Plus (₹49 a month or ₹299 a year) adds deeper patterns and the family tier is ₹499; founding Plus is free for pilot users; a sponsored route covers people who cannot pay; a randomised annual price test (₹199, ₹299, ₹499) is planned. All a plan. *Tradeoff:* committing to free access in a bootstrapped, pre-revenue business before validating that anyone pays.

**Statistical honesty over feature velocity.** Every pattern is gated behind a statistical threshold. A false pattern costs more trust than a blank page. *Tradeoff:* the patterns page stays empty for the first weeks (about four weeks in simulation), exactly when users decide whether to stay; early-value cards carry the gap.

**The release hold (CV-only until the page is updated).** A ground-truth harness showed the v1 engine would have shown a false pattern to 68% of pattern-free simulated users within 90 days, because autocorrelated daily data broke the Benjamini-Hochberg guarantee. Release was held until the redesign reached 3% in simulation, with no threshold loosened. A proposed shortcut that leaked 33-67% false patterns in simulation was rejected the same day. The strongest Gyro Health decision story for D2, AI PM and evaluation roles.

**Decisions defined before data.** Pass thresholds for 13 experiments and 3 kill criteria were written before any user data, so each result is read against a target set in advance. *Tradeoff:* a threshold set too early can be wrong; each can change only through a written decision.

**AI disclosure as a database rule.** Every AI-written answer must carry a label, and the database refuses to store one without it, so the rule cannot be skipped in a rush. Aligned to the EU AI Act Article 50 transparency duties; Gyro Health has no EU users, and the EU is a planned later market. *Tradeoff:* a small amount of screen space and engineering effort on every answer, accepted so users can always tell machine-written text from reviewed content.

**Pilot cohort as the test-and-iterate loop (planned).** About 35 patients (about 20 epilepsy, 15 migraine) enrolled through doctors at 2-3 private clinics from 11 Nov, onboarded and followed for 6 weeks each, with event tracking of names, counts and timings only, a pass bar across the 13 experiments, 3 kill criteria, and a day-90 review on 9 Jan 2027. The product-lifecycle work a PM owns: recruitment route, onboarding, instrumentation, success criteria, stop rules, iteration. *Tradeoff:* a small, doctor-referred cohort limits what the numbers can show, accepted for a safer first test. All a plan; no patient is enrolled yet.

**Intended-use boundary and Insurance Firewall, locked.** The product never diagnoses, predicts or advises on medicines, and health data never reaches insurer-facing features or is sold. *Tradeoff:* some features users would value are permanently excluded.

### Metrics defined (all targets, none measured)
- Day-90 pass bar (9 Jan 2027): most of the 13 experiments pass and no kill criterion fires
- Engine release targets: at most 5% confirmed findings on pattern-free data; at least 60% sensitivity for a real effect
- Red-team gate: 100 prompts per language per condition, zero escapes
- Pilot cohort: about 35 patients (about 20 epilepsy, 15 migraine), 6 weeks each, enrolled through doctors at 2-3 private clinics from 11 Nov, to test and iterate the app

### Regulatory posture (application wording)
- Intended-use boundary locked before build, enforced by system architecture and a rule-based output filter that fails closed
- Mapped against CDSCO's 2026 software-as-medical-device guidance and the DPDP Act; counsel questions open until 8 Nov 2026. Never "compliant", "cleared" or "approved"
- All data stored and processed in India (specified; confirmed after the Mumbai move); six separate consents and nine kill switches
- Insurance Firewall: restrictive row-level security on health-data tables, plus a no-data-selling rule
- A mandatory, database-enforced AI-disclosure label on every AI-written answer, aligned to EU AI Act Article 50. Say "aligned to", never "compliant" or "certified"; no EU users or EU launch
- Held (not used unless a JD screens it and Vibhor confirms): MDCG wellness classification, DiGA, the "disclosure screen before first AI use", "zero unprotected tables", "zero unlabelled rows"

**CV-only, no page to link to:** the 12-day tagged MVP, the release hold and its figures, the S0-S4 triage, the 38-decision record and the pass thresholds. True and usable in prose; do not imply a reader can check them on the site.

### What's next
Four-wave build to a 9 Nov release candidate; pilot cohort onboarding through doctors 11-20 Nov; day-90 go or stop decision on 9 Jan 2027; launch planned 26 Mar 2027 (Purple Day), if the gates pass.

### Skills evidenced
Founder-level ownership, solo build with AI coding agents, health-data architecture, statistical rigour as a product and release decision, evaluation against ground truth, decisions and thresholds defined before data, pilot and cohort design across the product lifecycle, AI-disclosure design, access-model and pricing design, Hindi-first and doctor-led design, condition-neutral platform architecture.

### Lead with this when
The role is health/medtech, AI-native consumer product, AI evaluation or governance, founding PM, or anywhere handling sensitive personal data.

### Do not claim
No live users, no interview findings, no pilot results, no retention data, no revenue. Not "shipped", "launched" or "in production". No co-founder, CTO or named teammate. No neurologist advisors, clinic partners, CSR, pharma or e-pharmacy partners. No CDSCO approval or compliance. No gate, threshold, price or pilot number as a result. The pilot cohort is not recruited or enrolled until it is. No Article 50 compliance, certification, EU launch or EU users, and no "zero unlabelled rows" until the Mumbai re-audit. No mention that the product changed condition, market, stack, name or team.

---
