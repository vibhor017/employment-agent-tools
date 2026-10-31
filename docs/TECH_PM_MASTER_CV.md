# TECH\_PM\_MASTER\_CV.md

# Vibhor Ahlawat, Technical PM / AI Governance PM / FDE Track (Track D)

# Source: VibhorAhlawat\_CV\_PM\_TechPM.docx + FDE notes | Rewritten July 2026 (v3)

# v14, 24 October 2026. Version history: CHANGELOG.md. Never mention the product rename in a CV.

# AGENT NOTE: Track D only. D1 Forward Deployed Engineer / Solutions Architect.

# D2 Trust and Safety / AI Governance PM. D3 Platform / Core Infrastructure PM (regulated domains).

# The triangular moat (Technical Depth + Scaled Execution + Regulatory Advantage) is the positioning,

# and it is expressed as ONE capability, never as three backgrounds.

# CONTINUITY RULE: state the continuity positively. Never write "not a pivot", "despite", or any

# sentence naming what the background is not.

# TAILORING: every entry is reworded into the JD's vocabulary against the Role Brief responsibility map

# (APPLICATION\_RULES.md Sections 11.5 and 15). Method names (BH-FDR, RAG, permutation, PostHog) only where the JD uses

# them or the role screens ML depth; otherwise use the plain variants from the bullet bank. Any Gyro Health fact not carried

# here comes from CURO\_UPDATE\_2026-10-21.md Section 2 (the product fact sheet).

# FORMATTING: zero em dashes and en dashes. Build with cv\_template\_builder.js v4.2.

\---

## CONTACT

*(In the builder data: contact holds location, phone and email; header.linkedin = "https://www.linkedin.com/in/vibhorahlawat" and header.portfolio = "vibhor.work" render as clickable links.)*

Vibhor Ahlawat | Technical Product Manager
Berlin, DE · +49 1622801918 · vibhorahlawat17@gmail.com · linkedin.com/in/vibhorahlawat · Portfolio: vibhor.work
English (C2) · German (A2, working towards B1) · Hindi (C2) · French (B1)

\---

## PROFILE SUMMARY

*(Mandatory, tailored per application to APPLICATION\_RULES.md 11.4: three full sentences, what he does in the JD's words, proof with one metric, fit with evidence. Maximum 55 words, no "I". One capability, not three backgrounds. The base below is a starting point.)*

Technical product manager who builds AI systems inside regulatory constraints, with 5+ years across law, government delivery and product. Built Gyro Health, a pre-launch AI care companion, solo with AI coding agents, cutting false patterns from 68% to 3% in simulation. Turns intended-use limits, DPDP consent duties and EU AI Act labelling into engineering rules.

\---

## AREAS OF EXPERTISE

*(Built from the Role Brief per APPLICATION\_RULES.md 11.3a: the JD's own terms for the responsibilities he can evidence. Every term must appear as a word in a bullet, Key Achievement or the summary; qa\_check.py fails a term with no echo. The nine below are the defaults, each echoed by a default bullet. Other JD terms: CANDIDATE\_STRATEGY.md Section 9B. A RED term (MLOps, Backlogs and Risk Registers, OKR Development, Experiment Design) never goes on the CV. List "EU AI Act" in the Regulatory Compliance term only while Gyro Health default bullet 5 (the Article 50 label) is on the CV.)*

* AI Product Development
* Model Evaluation
* Product Roadmapping and Prioritisation
* Regulatory Compliance (EU AI Act, DPDP Act, GDPR)
* System Architecture
* Cross-Functional Leadership
* Product Analytics
* Data Analysis (SQL, Python, R)
* User Research and Discovery

**Tools:** Supabase, Google Cloud Run, Vertex AI, AWS Bedrock, PostHog, Cursor, Claude Code, Jira, Figma, SQL

*(Tools line, builder field `tools`: confirmed tools only (CANDIDATE\_STRATEGY.md Section 9B), the JD's named tools first, maximum 10, names only with no level words. No echo needed. Swap in Mixpanel, Amplitude, Notion, Miro, pgvector or Expo where the JD names them.)*

\---

## KEY ACHIEVEMENTS

*(Tailor per application, one per top Role Brief responsibility. Every item carries a metric from CANDIDATE\_STRATEGY.md Section 5A, including the Gyro Health item. A figure used here is not repeated in the matching experience bullet, and no figure appears more than twice across the CV.)*

**Technical product leadership in a regulated domain:** Built Gyro Health solo with AI coding agents, from first commit to a tagged MVP in 12 days, and held its AI feature from release until false patterns fell from 68% to 3% in simulation.

*(KA1 and the base summary both carry 68% to 3%, which is the two-use cap. Any engine bullet then uses the 19.5% to 1.0% or 33-67% figures, never 68% again.)*

**Government-scale digital delivery:** As project lead on a failing 3M+ user government platform, aligned engineering, UX and policy while the team rebuilt its requirements around one measurable outcome; average days to case closure fell 28%.

**Growth from zero adoption:** Drove programme adoption from 0% to 25% in 6 months across 15,004 delivery centres, by replacing a failing digital-first rollout with a network model built around the access infrastructure users actually had.

**Privacy and safety built as product architecture:** Locked two decisions in a 38-decision record (the intended-use boundary and the Insurance Firewall) and set 6 separate consents and 9 kill switches, with India-only data storage specified.

*(Write "stored in India" only after the Mumbai move is confirmed. Restore "zero unprotected health-data tables" only after the Mumbai re-audit.)*

\---

## PROFESSIONAL EXPERIENCE

### Gyro Health, Care Companion for Long-Term Conditions

**Technical Product Lead and Founder** | Berlin, DE | Feb 2026 - Present

*Default 5 bullets. 4-5 on every sub-archetype; merge from the bank before dropping a fact the role screens for. Bullet 1 always says what Gyro Health is and what he owns. Gyro Health is pre-launch: a tagged MVP in testing. The engine is deployed but not live or in production. Every engine figure carries "in simulation"; every gate, pilot number and the patient cohort is a plan or a target.*

* Leads product on Gyro Health, a pre-launch AI care companion for people with epilepsy and migraine in India, owning discovery, prioritisation, the regulatory path and the pattern engine, built solo with AI coding agents.
* Built a ground-truth evaluation harness showing autocorrelated data broke the v1 BH-FDR engine, then rebuilt its significance test with permutation nulls and split-half replication, cutting false positives from 19.5% to 1.0% in simulation.
* Specified an AI assistant with retrieval (RAG) over reviewed, cited cards in Hindi and English, a fail-closed output filter, and all inference on regional endpoints in India (Vertex AI).
* Locked the intended-use boundary as a product decision (no diagnosis, prediction, test or medicine advice) and enforced it through system architecture rather than content policy.
* Built the Insurance Firewall in the database and made an AI-disclosure label mandatory for every AI-written answer, aligned to EU AI Act Article 50, with CI gates for statistical validation and schema drift.

**Gyro Health bullet bank (swap or merge per the Role Brief):**

* *Build plan (D3, date-bound):* Planned the build as four weekly waves to a 9 Nov 2026 release candidate, with CI gates for statistical validation and schema drift and in-house analytics that never log health content.
* *Engine detail, for statistics JDs:* Rebuilt the engine's significance test with a circular-shift permutation null, weighted BH and split-half replication, after the harness showed the v1 guarantee broke on autocorrelated data.
* *Launch bar (D2, AI PM; only if 68% and 3% are not already used twice):* Set the AI feature's launch bar as a measured error rate: a simulation harness showed v1 misleading 68% of pattern-free users, so release was held until the rebuild reached 3% in simulation.
* *Release targets:* Set release targets for the pattern engine before any user data: at most 5% confirmed findings on pattern-free data and at least 60% detection of a real effect, both to be checked in simulation.
* *Trade-off owned:* Retired an unreachable sensitivity target and rejected a proposed shortcut the same day it measured 33-67% false patterns in simulation.
* *Release triage:* Graded AI validation findings on an S0-S4 severity scale; four S1 findings blocked release until fixed.
* *Harness integrity:* Found two validation studies reporting a perfect 0/200 because they could never surface anything, fixed them, and made the harness fail when it measures nothing.
* *Safety by construction (D2):* Made AI safety structural: schema-only structured outputs with no free-text field, a filter hardened against zero-width and homoglyph evasion, and a live stub proving the filter blocks.
* *Red-team gate (target):* Set a release gate for the assistant: 100 red-team prompts per language per condition, with zero escapes allowed before any user sees an answer.
* *Retrieval strategy:* Rejected live web retrieval as a prompt-injection channel, choosing reviewed, cited cards written offline with specialist review before any answer can use them.
* *Privacy architecture (D3):* Designed the Insurance Firewall as a user-visible feature, enforced by restrictive row-level security on health-data tables and re-asserted in server code.
* *Article 50, extended (only if Vibhor confirms the disclosure screen before first AI use is still in the build):* Added an AI-disclosure screen before first AI use and a database-enforced label on every AI-written answer, aligned to EU AI Act Article 50 transparency duties.
* *Privacy controls:* Specified six separate consents and nine kill switches for AI and data features, with India-only data storage and processing under the DPDP Act.
* *Stack:* Specified the product stack (Expo React Native, Supabase, Cloud Run) for Mumbai-region hosting, with Cloud Run scaling to zero when idle, and built it with AI coding agents.
* *Specialist review gate:* Set a release rule: no personal-plan rule, answer card or report template reaches a user without specialist review, and the pilot start slips before unreviewed content goes out.
* *Experiments and pilot cohort:* Wrote pass thresholds for 13 experiments and 3 kill criteria before any patient data, so a planned pilot cohort of about 35 patients can end in a clear go or stop decision.
* *Regulatory mapping (date-bound):* Mapped the product against CDSCO's 2026 software-as-medical-device guidance and the DPDP Act, with the open questions going to outside counsel by 8 Nov 2026.
* *Plain variant for non-ML JDs (replaces the engine bullet):* Stress-tested the pattern-finding engine against simulated patients with known answers, found it would mislead two in three users, and redesigned it to cut false patterns to 3% in simulation.
* *Plain variant for non-ML JDs (replaces the assistant bullet):* Designed an AI assistant that answers only from reviewed, cited cards, blocks diagnostic language, and is specified to run all AI inference in India.

**Held bullets (need a JD that screens the topic AND your confirmation the build carries it):** the MDCG wellness classification bullet (exactly as listed in the Gyro Health block of PM\_MASTER\_CV v18) and the "zero gaps" and "zero unlabelled rows" audit wording. Also held: any test-suite, migration or CI-workflow count (recount after the build closes on 9 Nov), the per-user daily AI budget and the 50k-user batch projection (confirm they survive the new Gemini Flash setup).

### Independent Advisory Practice, Data Protection and Technology

**Independent Advisor** | Remote, IN and EU | Nov 2023 - Present

* Advises 30+ technology companies and law firms across Indian and EU markets on data protection, technology contracts and cross-border market entry.
* Advises Indian technology companies operating in the EU on what GDPR requires in practice.
* Practice now limited as focus shifts to Gyro Health and full-time roles.

### Indian Political Action Committee (IPAC) Consulting Pvt. Ltd.

**Consultant and Project Lead, Public Sector** | Hyderabad, IN | Jan 2022 - Apr 2023

*Team credit applies (PORTFOLIO\_DOSSIER.md honesty rule 10). The 28% is average days from registration to closure, the six months after relaunch against the six months before (CANDIDATE\_STRATEGY.md Section 5A).*

* As project lead on a 3M+ user state grievance platform, coordinated cross-functional delivery while the team rebuilt requirements around central oversight of case closure; average days to closure fell 28%.
* Owned post-launch quality monitoring on the mobile app and IVR channels, where the team added multi-language support and fast-tracked callers to a human after drop-off appeared before case registration.
* Directed a 25-person research team to collect and code 1.5M survey data points, holding consistency with a codebook, training workshops, a pilot batch and spot-checks; the service-gap analysis set roadmap priorities.
* Designed a network delivery plan across 15,004 equipped centres after mapping the infrastructure constraints blocking a digital-first rollout, reaching 25% uptake in 6 months.

**IPAC bullet bank:**

* *Metrics and platform roles:* Worked within the team's restructure of sprint ownership across engineering, UX and policy around a single north star, citizen satisfaction plus turnaround, replacing closure count. (Never stated as the cause of the 28%.)
* *Evaluation, data labelling and rating roles (echoes "Data Quality" or "Annotation"):* Directed a 25-person team collecting and coding 1.5M survey data points, with data quality held by a codebook, training workshops, a pilot batch and sample spot-checks, the same controls an annotation programme uses.

### Outsay Legal, Advocates and Consultants

**Legal Associate, Constitutional Law and Public Policy** | New Delhi, IN | Jun 2019 - Aug 2021

* Researched and prepared 200+ cases before the Supreme Court of India, the Delhi High Court and tribunals, making submissions in some and assisting senior counsel in others, isolating procedural edge cases under time pressure.
* Drafted 14 advisory reports translating data protection and environmental legislation into data governance frameworks adopted by state committees.

**Outsay bullet bank:**

* *Insider-user variant (legal tech, research platforms, professional tools):* Ran daily research and case preparation on online case-law databases and client and case management software across 200+ matters. (Do not name vendors unless Vibhor confirms them.)

### Khaitan \& Co. | Shardul Amarchand Mangaldas \& Co. | 4 Further Legal Practices

**Legal Intern, Compliance, Corporate Law, Policy and Litigation** | New Delhi, IN | Aug 2018 - Nov 2018

* Completed 6 legal internships across compliance, corporate law, policy and litigation, including case-law research and dispute-resolution support at Khaitan \& Co.
* Delivered policy advisory on government service delivery at SAM \& Co., alongside 4 placements across state prosecution and private litigation.

\---

## SIDE PROJECTS

*(Section heading "SIDE PROJECTS", bold "Problem:" and "Solution:" labels.)*

### Haqdaar v1, AI Legal Rights Assistant

**Solo Build, Google Gen AI Academy APAC, Track 1** | India / Cloud | Apr 2026

**Problem:** India's 12M+ gig workers gained legal rights under the Code on Social Security 2020 with no accessible way to act on them.
**Solution:** Built an agentic legal assistant (Google ADK, Gemini 2.5 Flash, Cloud Run) grounded at temperature 0.1, answering only from verified legal sources with helpline referral for the rest, live on a public API. Now narrowing to Lok Adalat dispute routing.

### Beamer Held, Dormitory Booking System

**Solo Build, Theologisches Konvikt Berlin** | Berlin, DE | Mar 2025 - Sep 2025

**Problem:** 109 residents were booking a shared projector over WhatsApp, causing weekly double-bookings and lost inventory.
**Solution:** Shipped a mobile-first booking web app on Supabase with conflict detection and no login, which replaced the group chat; dorm leadership then requested a rollout across 4 offices, now a separate build in progress.

\---

## CERTIFICATIONS

**Technical and AI (lead credentials for Track D):**

* AI Product Management Professional Certificate, IBM, 2026
* Google Cloud Gen AI Master Certificate, Google Academy APAC, 2026
* Product Analytics Certification, Product School and Mixpanel, 2026
* Machine Learning Specialization (Andrew Ng), DeepLearning.AI, 2025
* Advanced SQL, Kaggle Learn (Google) and HackerRank, 2025

**Governance and policy (Layer 3 support):**

* Certificate in Digital Governance, Hertie School Berlin, 2026
* Social Innovation for Public Purpose, Hertie School Berlin, 2025

\---

## EDUCATION

**Hertie School** | Berlin, DE | Sep 2023 - May 2026
Master of Public Policy (MPP). Specialisation: AI Governance and Digital Transformation; Management and Organisation.
Thesis: "From Guarantee to Guardrail: Measuring How India's AI Governance Framework Operationalising Constitutional Equality", a 15-indicator evaluation framework across EU and Indian regulatory contexts.

**Faculty of Law, University of Delhi** | New Delhi, IN | Aug 2016 - Jun 2019
Bachelor of Laws (LL.B.)

**Shaheed Bhagat Singh College, University of Delhi** | New Delhi, IN | Aug 2013 - Jun 2016
Bachelor of Arts (Hons), Political Science

\---

## AGENT CUSTOMISATION NOTES, TRACK D

### D1, Forward Deployed Engineer / Solutions Architect

**Targets:** Scale AI, enterprise AI consultancies, big tech deployment teams, enterprise software deploying into banks, insurers, hospital groups and public bodies. Defence and weapons companies are excluded. Palantir and equivalent dual-use government platforms are escalated per role.

**Ordering:** IPAC first (institutional stakeholder complexity, multi-agency operations, population-scale delivery, quality monitoring), then Gyro Health technical depth, then the regulatory layer (data residency, regulatory review navigation).

**Emphasis:** institutional credibility. IPAC plus appellate litigation is exactly the combination those roles need.

**For AI-focused FDE roles:** Google Gen AI Master, the Mumbai-region stack bullet from the bank, the CI gates, and the in-house analytics design.

**Suppress:** health-specific clinical language (CDSCO, intended use, DPDP) unless their clients are in health. Replace with regulated-domain compliance architecture.

### D2, Trust and Safety / AI Governance PM

**Targets:** Anthropic, OpenAI, Google DeepMind, Meta AI, Mistral, any large platform with an AI governance or content safety product team, and marketplace trust and safety policy teams.

**Ordering:** the regulatory layer first (appellate analysis as adversarial edge-case detection, MPP AI governance, EU AI Act work), then Gyro Health technical depth (the launch bar, safety by construction, the Article 50 label and the red-team gate from the bank), then Haqdaar (safety operationalised in production), then IPAC (independent oversight of case closure, quality monitoring).

**Emphasis:** the release hold on measured evidence (68% to 3% in simulation) and the fail-closed filter with a live stub are now the strongest AI governance proof points; the Insurance Firewall stays the best privacy one. For policy-writing roles (marketplace trust and safety), the CMGRS independent check on case closure is the closest mechanism match, told with team credit. For evaluation and rating teams, the IPAC coding-consistency bank bullet maps directly onto annotation quality.

**Vocabulary:** Annex III classification, model evaluation (precision, recall, false positive rate), release gating, severity triage, guardrails, compliance verification, engineering-ready requirements.

**Suppress:** the consulting framing of IPAC. Pricing is irrelevant here.

### D3, Platform / Core Infrastructure PM (regulated domains)

**Targets:** HealthTech with complex data architectures, FinTech with compliance requirements, GovTech, enterprise software in regulated industries.

**Ordering:** Gyro Health first (all default bullets relevant, plus the privacy architecture bullet from the bank), then IPAC, then the technical credentials.

**Emphasis:** telemetry and data fluency. Lead the in-house analytics design (names, counts and timings only), the CI gates and the SQL credentials.

**Suppress:** appellate litigation as the primary Layer 3 signal. Use Gyro Health's regulatory architecture instead. The advisory practice is a supporting signal for cross-border data protection only, never for AI Act work.

\---

## TRIANGULAR MOAT REFERENCE

For constructing Para 3. Express as one capability in a sentence, never as a list.

**Layer 1, Technical Depth:** Google Gen AI Master, IBM AI PM, Mixpanel PAC, Andrew Ng ML, Advanced SQL, the ground-truth evaluation harness and the redesigned correlation engine (68% to 3% in simulation), an AI assistant specified over reviewed cards behind a fail-closed filter, a database-enforced AI-disclosure label, in-house analytics design, Expo React Native, Supabase, Cloud Run, Vertex AI, Google ADK in production.

**Layer 2, Scaled Execution:** project lead on a 3M+ user platform the team rebuilt (28% fewer average days to closure), a health app taken from first commit to a tagged MVP in 12 days solo with AI coding agents, 0% to 25% adoption across 15,004 centres, solo production AI builds.

**Layer 3, Regulatory Advantage:** appellate litigation (200+ cases, adversarial edge-case analysis), MPP AI governance ("From Guarantee to Guardrail", 15-indicator framework, EU and Indian contexts), 30+ companies advised on cross-border data protection and market entry, the locked intended-use boundary, the Article 50 label, the CDSCO and DPDP mapping.

**Sourcing rule for Layer 3.** AI Act fluency comes from the thesis and from Gyro Health. It does not come from client work.

**Compression example for Para 3:** "Between the evaluation harness and the intended-use boundary, Gyro Health needed one person who could hold model behaviour and regulatory exposure in the same decision. In this role I would do the same for \[named JD responsibility]."

\---

## KEY ACHIEVEMENT 4, SWAP VARIANTS

KA1 carries the release hold. Do not restate it in KA4.

**Default (privacy and safety architecture, first-hand):** the two locked decisions, six consents, nine kill switches and India-only data specified, as written above. Use for D2 and D3.

**Swap for evaluation-heavy roles (D2 at labs and evaluation teams):** "Release gating on measured evidence: Graded AI validation findings on an S0-S4 severity scale, with four S1 findings blocking release until fixed." Use only if KA1 is not already the release hold; otherwise use the IPAC coding-consistency item with its 1.5M figure.

**Swap for roles that screen on breadth or client-facing scale (D1):** "Cross-border data protection advisory: Advised 30+ technology companies and law firms on data protection, technology contracts and market entry between India and the EU." Carries a count. Data protection and market entry only. Never "translating GDPR obligations into product changes" and never an AI Act consulting claim, see CANDIDATE\_STRATEGY.md Section 5B.

\---

**Formatting reminders for every generated version:** zero em and en dashes, bullets under 35 words and two clauses, acronyms expanded on first use, every Key Achievement metric-backed including the Gyro Health item, each figure used at most twice, dates "Mon YYYY - Mon YYYY" right-aligned on the role line, built with cv\_template\_builder.js v4.2, and no sentence anywhere that names what the background is not. Profile Summary mandatory, three full sentences, before Areas of Expertise.
