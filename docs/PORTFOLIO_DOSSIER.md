# PORTFOLIO_DOSSIER.md
# Portfolio Project Dossier (v8.1, aligned to the CV pack). Version history: CHANGELOG.md.
# v8.1 split this file in two: honesty rules, index and routing stay here; per-entry detail moved to PORTFOLIO_ENTRIES.md. No content changed.
# v8.2 (30 Oct 2026): the per-entry detail now lives in one file per entry under portfolio/ (PORTFOLIO_ENTRIES.md is the index). No content changed.

An audit of every entry on the portfolio site (vibhor.work),
written as source material for job applications.

**Purpose.** Attach this alongside the CV when drafting an application. Given a
job description, use the routing guide to pick the two or three entries that
actually match the domain, then pull specifics from that entry's file under portfolio/
(listed in PORTFOLIO_ENTRIES.md). Every entry is recorded there with its problem, the
decisions made, the tradeoffs accepted, the metrics defined, and, critically,
what is measured versus projected.

**Last audited:** 24 September 2026, against the deployed site.
**Aligned:** 7 October 2026, to the master CVs, CANDIDATE_STRATEGY.md v9.2 and the Curo repo bank. Dates (Curo start, BeamerHeld period) aligned 21 October 2026. Curo entry rewritten 21-22 October 2026 (CURO_UPDATE_2026-10-21.md). Product name updated to Gyro Health 24 October 2026.

**Site and CV status.** The site and the CVs agreed as of 27 September 2026. The October 2026 corrections are not yet live on the site: CMGRS 28% and BeamerHeld 109 residents (WEBSITE_CHANGES.md), the Curo page and LinkedIn rewrite (CURO_UPDATE_2026-10-21.md Section 4), and the product's new name. The product page is not cited or linked until its rewrite and the rename ship. Until the CMGRS and BeamerHeld corrections ship, an application never puts a corrected figure in the same sentence as that page's link, so a reader clicking through does not meet two numbers side by side. Where this file marks something CV-only,
the fact is true and usable but has no page of its own to link to.

**How this file is used in the application pipeline.** Step 3 starts from the track routing table below, then picks
the entry that best proves the JD responsibility Paragraph 3 opens on. The cover letter cites that entry once, in
Paragraph 3, as a decision story with its deep link (see CANDIDATE_STRATEGY.md Section 10). The networking package
may use a second entry in the hiring manager email. Facts come from the CVs, the metric bank and CURO_UPDATE_2026-10-21.md Section 2;
this file governs how pre-launch work is described. The decision detail for the cited entries comes from the entry files under portfolio/.

**Links.** Root: https://vibhor.work . Deep links: https://vibhor.work/project/<id> for Work and Side quest entries, https://vibhor.work/case-study/<id> for case studies. The site is client-side rendered, so these pages cannot be fetched as text; this file and PORTFOLIO_ENTRIES.md are the readable record. vibhor.work is the only domain used in any application artefact. vibhor.producthq.workers.dev serves the same build (verified September 2026) but is retired, and qa_check.py fails any file that carries it. The deep link column in the routing table is the allow-list the script checks against: add, rename or remove an entry here and update ENTRY_LINKS in qa_check.py in the same edit. The site returns a page for any path, so a mistyped deep link looks live and only the allow-list catches it.

---

## Honesty rules (read before drafting anything)

The portfolio is deliberately scrupulous about not overclaiming, and an
application drawn from it has to hold the same line. A recruiter who checks will
find the same distinctions stated plainly on the site.

1. **Only two entries have shipped, measured outcomes.** CMGRS (3M+ citizens,
   28% fewer average days from registration to case closure) and BeamerHeld (109
   residents, live, in daily use). Everything else is pre-launch, pre-build, or pre-pilot.
2. **Never present a target as a result.** Gyro Health's pass thresholds, engine gates and red-team gate, Typecast's "under 20 seconds", RasaHub's ">0.75% conversion" and
   CommonsTrace's "50%+ duplicate-collection reduction" are all *defined
   targets*, not achievements. The site labels each one; so should any CV line.
3. **Three entries ran no user interviews.** RasaHub, Haqdaar and Typecast say
   this outright. Their discovery is secondary research, practitioner
   observation, or steelman review. Do not imply user research that did not
   happen.
4. **Market figures are not product metrics.** Haqdaar's "4.3M+ pending cheque
   bounce cases" is national court data. CommonsTrace's "EUDR mandatory mid-2025"
   is regulatory timing. Neither is a result this candidate produced.
5. **CMGRS has a confidentiality boundary.** Scale, the accountability problem
   and the redesign approach are discussable. Internal architecture, dashboards
   and department-level performance data are not public and must not be invented.

6. **Gyro Health's engine figures are simulation results; its gates and plans are not results.** Applications use 68% of pattern-free simulated users shown a false pattern by v1, 3% after the redesign, always "in simulation". Gyro Health is built and in testing, not launched: a tagged MVP, not a shipped one. "In testing" means a working app under test, not live users, retention data, revenue or any measured outcome. Pass thresholds, engine gates, the red-team gate, the pilot size and every price are plans or targets. The engine (v2) is deployed but not live or in production. The pilot starts 11 Nov 2026; interviews begin 20-26 Oct; until Vibhor confirms otherwise, no findings exist. The patient cohort is the planned pilot cohort: never written as recruited, enrolled or giving feedback before it happens. The Article 50 label is "aligned to" the transparency duties, never compliance, certification, an EU launch or EU users.
7. **Haqdaar has two versions.** v1 is the Google Gen AI Academy APAC build (April 2026): a deployed agent on
   gig worker rights under the Code on Social Security 2020. The current version, on the site, pivots to cheque
   bounce and tenancy disputes routed to Lok Adalats and has run no test. Claims about deployment belong to v1 only. Never "zero hallucination": describe the constraint (temperature 0.1, verified sources only, helpline referral) instead.
8. **Legal tenure follows the CV.** Two years as a legal associate (Jun 2019 to Aug 2021, 200+ cases, making
   submissions in some and assisting senior counsel in others), six internships in 2018, pro bono legal aid with the
   Delhi State Legal Services Authority in 2018 to 2019. The site matches this; the old "four years" wording is gone
   sitewide. Never reintroduce it.
9. **The CommonsTrace research base is co-authored.** A 4-person Hertie School and GIZ policy brief. Never sole.
10. **CMGRS decisions are team decisions.** The site credits the requirements rebuild, the routing of
    registration and escalation through central oversight, and the sprint ownership restructure to the team
    ("we"). The candidate's own claim is the project-lead role and owning post-launch quality monitoring.
    Application drafts keep the same split: "we" for those decisions, "I" only for the lead role and the
    ownership the site states. The 28% is the platform's outcome after the team's rebuild; the north star change
    is a decision told as a decision, never as the cause of the 28%. qa_check.py enforces both.
11. **Product live-site gap.** The live product page and LinkedIn still carry the earlier description and the old name. Until CURO_UPDATE_2026-10-21.md Section 4 and the rename ship, no application links vibhor.work/project/curo, and none states a fact that only the earlier page would support. qa_check.py v1.6 blocks the link (GYRO_PAGE_LIVE), the old name in letters and CVs, and the legacy terms.

Framing that works: *"defined the metric framework and validation gates for X"*
is true and strong. *"achieved X"* is false for five of the seven entries.

---

## Quick index

| Entry | Type | Role | Period | Domain | Evidence status | Deep link |
|---|---|---|---|---|---|---|
| **Gyro Health** | Work | Site: Founder, CEO & Technical Product Lead. CVs: Technical Product Lead and Founder | Feb 2026 → | Digital health, AI/ML, consumer | Pre-launch; tagged MVP in testing | /project/curo (suspended until the page is updated and renamed) |
| **CMGRS** | Work | Consultant & Project Lead (IPAC) | 2022 to 2023 | GovTech, public service delivery | **Shipped, 3M+ users, measured** | /project/cmgrs |
| **RasaHub** | Side quest | Solo founder / technical PM | 2026 → (Experimental) | Marketplace, payments, regulated commerce | Pre-launch, concierge gate | /project/rasahub |
| **Haqdaar** | Side quest | Solo founder / product lead | v1 Apr 2026; pivot in build | LegalTech, access to justice, India | v1 deployed; current MVP in build, test pending | /project/haqdaar |
| **BeamerHeld** | Side quest | Solo build | Mar 2025 - Sep 2025 | Internal tooling, booking, RAG | **Shipped, 109 users, expanding** | /project/beamerheld |
| **Typecast** | Case study | Concept author | 2025 | Productivity, AI capture, B2C SaaS | Concept + PRD, pre-build | /case-study/typecast |
| **CommonsTrace** | Case study | Concept author | 2026 | AgTech, EU compliance, data governance | Pre-pilot, scorecard-validated | /case-study/commonstrace |
| *Umang App* | Case study | n/a | n/a | Indian public digital services | Placeholder, no content yet | do not link |

---

## Track routing (use this first)

Maps to the five application tracks in CANDIDATE_STRATEGY.md. Start here, then pick the entry that best proves the
responsibility Paragraph 3 opens on; that may differ from the default lead (Weflow moved from CMGRS to Gyro Health because
Gyro Health proved the threshold-setting duty the letter argued). The second entry is for outreach only.

| Track / sub-archetype | Lead entry | Second (outreach) | The decision story to tell |
|---|---|---|---|
| D1, FDE / Solutions Architect | CMGRS | BeamerHeld | Ghost-closure diagnosis and centralised accountability at 3M+ scale (team decisions, told with "we"); BeamerHeld as software adopted by an institution that asked for more |
| D2, Trust and Safety / AI Governance PM | Gyro Health | BeamerHeld | The FDR gate: an empty Insights tab beats a false positive. BeamerHeld's low-temperature RAG that says "I don't know". For marketplace policy-writing roles, CMGRS's independent check on case closure leads (team decision) |
| D3, Platform / Infrastructure PM (regulated) | Gyro Health | RasaHub | Condition-agnostic architecture before revenue justified it; RasaHub's Stripe Connect agency model chosen to keep the artist the legal donor |
| A2, regulated-domain health PM | Gyro Health | CMGRS | Statistical honesty over feature velocity; the intended-use boundary locked before build. Expect Moderate fit for EU-regulated roles |
| A1 / A3, health product generalist | Gyro Health | BeamerHeld | Free core forever, Plus and the sponsored-access route designed before any revenue |
| E1, consumer app PM | Gyro Health | BeamerHeld | Right now mode and the 15-second check-in, built around a person's worst day, no streaks; BeamerHeld's cut of login, profile and extra pages that moved residents off the group chat. Where the JD stresses shipping and adoption, BeamerHeld leads and Gyro Health moves to outreach |
| E1, productivity or AI tooling apps | Typecast | BeamerHeld | The declined pre-build probe: a habit that only shows under weeks of real use cannot be tested in a five-person prototype; BeamerHeld's no-login decision |
| E2, growth and monetisation PM | Gyro Health | RasaHub | Free core forever and Plus designed before any revenue, with a randomised price test planned; RasaHub's processing-fee decision that moved modelled break-even |
| E3, marketplace, fintech, e-commerce | RasaHub | CMGRS | The legal gate that killed the pre-ticked donation model before any schema, and the agency model that kept the artist the legal donor; CMGRS north star replacing closure count (a team decision, told with "we") |

(While the product link is suspended, a row whose lead entry is Gyro Health tells the Gyro Health decision in prose and takes its single link from the second entry, or from CMGRS, BeamerHeld or Haqdaar.)
| E3, B2B SaaS or publishing without an AI or compliance screen | CMGRS | BeamerHeld | North star moved from closure count to satisfaction plus turnaround across engineering, UX and policy (team); BeamerHeld as software an institution adopted and asked to expand. Where the role screens on cutting friction, BeamerHeld leads |
| C, digitalisation / development | CMGRS | CommonsTrace | Multi-modal access and IVR dropoff; CommonsTrace's paper-first pilot and QR plus SMS design assuming no smartphone |
| C, India or access-to-justice portfolios | Haqdaar | CMGRS | Choosing a founder-staffed concierge (ICE 7.3) over automating what v1 already proved |
| B, policy with a delivery mandate | CommonsTrace | CMGRS | The research finding that moved the thesis from compliance complexity to data governance and market power |
| Legal tech (insider-user roles) | Haqdaar | Gyro Health | v1's constraint to verified legal sources with helpline referral; the current version's concierge chosen over automation |
| Ambiguous (strategy, chief of staff, founder's associate) | CMGRS | RasaHub | Diagnosis beneath the visible problem; RasaHub's legal gate that killed a pricing model before any schema. For founder's associate roles, Gyro Health often proves the threshold or scoping duty better |

Suppression by track follows CANDIDATE_STRATEGY.md Section 6: no RasaHub pricing detail for Track C, no clinical
language for non-health D1 and D2, no Typecast outside productivity, AI tooling or consumer productivity roles
(Track E1 included). On Track E, every pre-launch entry is cited as a decision, never as a result: see the honesty
rules above.

## Role-routing guide (generic, for roles outside the track table)

Pick the two or three entries that match. Leading with the wrong one wastes the
strongest material.

**Product Manager, health / medtech**
→ **Gyro Health** (lead), then **CMGRS** for scale credibility.
Gyro Health carries health-data architecture (intended-use boundary, India-only storage under the DPDP Act, six separate consents), a statistical-rigour decision most PMs never have to make, and pass thresholds for 13 experiments written before any user data.

**Product Manager, public sector / GovTech / civic tech**
→ **CMGRS** (lead), then **Haqdaar**.
CMGRS is the only entry with delivered scale. Haqdaar shows the same instinct
applied solo, plus constitutional and regulatory literacy.

**Product Manager, marketplace / fintech / payments**
→ **RasaHub** (lead), then **CMGRS** for multi-stakeholder complexity.
RasaHub has unit economics worked to the cent, Stripe Connect architecture,
three-sided incentive design and a legally-gated options matrix.

**Product Manager, AI / ML products**
→ **Gyro Health** and **Typecast**, then **BeamerHeld** for a shipped RAG system.
Gyro Health: the site describes Spearman correlation with Benjamini-Hochberg FDR control,
LightGBM and FastTreeSHAP. Applications cite the repo's v2 engine instead: a
circular-shift permutation null, weighted BH, split-half replication, and a
ground-truth harness that judged it (CURO_UPDATE_2026-10-21.md Section 2). Typecast:
per-span confidence scoring as a trust mechanism. BeamerHeld: low-temperature RAG
that refuses to answer outside documented policy.

**Product Manager, regulated / compliance / privacy-heavy**
→ **RasaHub** and **CommonsTrace**, then **Gyro Health**.
Between them: German consumer protection statute and case law, EUDR, India's DPDP Act, CDSCO software guidance (mapped, not cleared), GDPR, and unauthorised-practice-of-law limits.

**Founding PM / 0→1 / early-stage generalist**
→ **Gyro Health**, **RasaHub**, **BeamerHeld**.
Gyro Health is a live founder role, built solo to a tagged MVP in 12 days. RasaHub shows
validation discipline before code. BeamerHeld is proof something solo actually
shipped and got adopted.

**Technical PM**
→ **Gyro Health**, **Haqdaar**, **BeamerHeld**.
Named stacks, architecture decisions, and build tradeoffs throughout.

**Policy / AI governance / responsible tech**
→ **CommonsTrace** and **CMGRS**, then **Gyro Health**.
CommonsTrace builds on a co-authored Hertie School / GIZ policy brief and
reframes a compliance problem as a data-governance one.

---

## Entries

Per-entry detail (at a glance, problem, decisions and tradeoffs, metrics, skills, lead-with-this-when, do-not-claim, and the evidence inventory) is in one file per entry under **portfolio/**, listed with paths in the **PORTFOLIO_ENTRIES.md** index (for example portfolio/4-haqdaar.md). Read the cited entry's file with project_read before writing its decision story; the honesty rules above govern every line taken from it.

---

# Cross-cutting themes

These recur across entries and make strong interview answers or cover-letter
throughlines.

**1. Regulatory literacy as a product input, not a compliance afterthought.**
intended use, DPDP, consent design and the Article 50 AI-disclosure label (Gyro Health), §312a BGB and UWG (RasaHub), India's DPDP
Act and unauthorised-practice-of-law limits (Haqdaar), EUDR (CommonsTrace),
privacy-by-default (BeamerHeld). A law degree, two years of litigation practice (200+ cases) and pro bono legal aid
applied directly to architecture decisions. Few PMs can do this.

**2. Diagnosing the real problem beneath the visible one.**
CMGRS: slow resolution was the symptom; a metric that let departments hide
non-resolution was the cause. CommonsTrace: compliance complexity was the
assumption; data governance and market power were the cause. BeamerHeld: the group
chat was failing on friction, not features. Typecast: the market needs a trust
path, not better OCR. Gyro Health: the engine's statistical guarantee looked sound until a
ground-truth harness showed autocorrelated data had broken it.

**3. Choosing the cheap test over the confident build.**
RasaHub's zero-code concierge gate. CommonsTrace's paper-only phase. Haqdaar's
founder-staffed manual triage, Gyro Health's pass thresholds and kill criteria written before data. Each defers engineering cost until the load-bearing
assumption is checked, and each names explicit kill criteria.

**4. Trust as the central design constraint.**
Gyro Health's statistical gate (an empty tab beats a false positive) and its release held
until measurement backed it. Typecast's per-span confidence and never-silently-auto-file.
RasaHub's subtractable euro amounts. BeamerHeld's RAG that says "I don't know". A
consistent willingness to ship less certainty rather than fake it.

**5. Access and inclusion treated as product problems.**
CMGRS's IVR dropoff, multi-language support and human fast-track. CommonsTrace's
QR + SMS assuming no smartphone, and witnessed-thumbprint consent. Gyro Health's sponsored-access route for anyone Plus excludes on cost.

**6. Intellectual honesty about evidence.**
Every pre-launch entry states what has not been validated, where research is
absent, and what the retrospective gap is. This is unusual and worth surfacing
explicitly, it reads as senior judgment rather than weak results.

**For Track E, themes 2, 3 and 4 lead.** Diagnosing the real problem (BeamerHeld: friction, not features), cheap tests before confident builds, and trust
as a design constraint are the consumer PM story. Theme 1 drops to one clause unless the company is health,
payments or otherwise regulated.

---

# Candidate framing

> **Do not import into applications.** This is the site's founder-positioned copy. The application layer uses the
> track framing in CANDIDATE_STRATEGY.md, and "5+ years" (Section 5A). The site's "six years" sits inside "5+" and
> needs no change. Kept here only so the agent knows what a reader clicking through will see.

**Positioning line used on the site:** "Product manager building digital products
for large-scale social problems. Six years across law, government delivery and
product, from a 3M+ user public platform to an AI care companion for people with
long-term conditions. Every role has been the same job in a different medium:
work out why a system is failing the people inside it, then rebuild it so it
does not."

**The through-line worth leading with:** a law and policy background converted
into product judgment, applied to systems that fail the people inside them. The
regulatory fluency is not a side note, it is the differentiator, and it shows up
as concrete architecture decisions in five of seven entries.

**The honest weakness to pre-empt:** only two entries have shipped outcomes, and
the most recent work is pre-launch. Counter with: CMGRS delivered at population
scale, BeamerHeld is live and expanding by request, and the pre-launch entries
demonstrate exactly the validation discipline that prevents wasted build cycles.
