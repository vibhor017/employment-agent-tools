<!-- portfolio entry file, split verbatim from PORTFOLIO_ENTRIES.md v8.1 on 30 October 2026. Honesty rules and routing: PORTFOLIO_DOSSIER.md -->
## 7. CommonsTrace

### At a glance
- **Period:** 2026, concept and validation phase
- **Research base:** builds on a 4-person Hertie School / GIZ policy brief co-authored by the candidate
- **Stage:** Pre-pilot, validated on paper against a steelman review and idea scorecard
- **One-liner:** Collect once, prove it everywhere

### The problem
A cooperative selling to more than one EU-bound buyer collects the same plot
geolocation and transaction data repeatedly, once per buyer, because each buyer
hands down its own proprietary traceability tool. The cost is not the
regulation's data requirements, which are narrow, no personal data, no land
title, just plot geolocation. **The cost is the fragmentation built on top of
it.**

**The user is specific:** a cooperative data officer already supplying two or
more EU-bound buyers, re-entering the same farmer and plot data every time a new
buyer runs due diligence.

EUDR became mandatory for SMEs and micro-enterprises mid-2025, turning a standing
fragmentation problem into a dated, forced choice.

### Targets (pre-pilot, not results)
- 50%+ target reduction in duplicate data-collection effort
- 50-200 farmers a single cooperative can bring under one governed record
- **North star: 2+ distinct buyers accepting one cooperative's export**, portability proven, not just adoption

### The research finding that moved the thesis
The working assumption, shared by most compliance tooling in this space, is that
smallholder exclusion is a **regulatory-complexity problem**. The research says
otherwise: EUDR's actual data ask is light; the real driver is **data governance
and market power**. Farmers rarely see or control data collected about them, and
every buyer relationship comes with its own lock-in.

That moved the product thesis from *"make compliance easier"* to *"make the data
portable and visible to the person it describes."*

Three further findings shaped the concept: first-mile traceability (farm to
cooperative) is the costliest link and every tool re-solves it per buyer; no
category combines cooperative ownership, multi-buyer portability and a governance
template that avoids standing up a new legal entity; digital literacy and gender
gaps are named adoption blockers, which is why nothing assumes a smartphone.

**Honest provenance:** this is inherited research, not primary research run for
CommonsTrace. The policy brief drew on structured input from GIZ practitioners,
practitioner-level input, not cooperative or farmer interviews for this product.

### Options analysis
Five directions scored against unfair advantage, pain intensity, reachability,
feasibility and differentiation:
1. Full farmer-owned data licensing platform, strong differentiation, weak feasibility
2. Portability middleware on existing traceability apps, reachable, but risks becoming a feature of someone else's platform
3. Cooperative data-insights marketplace, mid-tier everywhere, no sharp edge
4. **Data cooperative-in-a-box toolkit (chosen)**, the only option pilotable manually, and a deliberate wedge into the licensing platform later
5. National, government-backed data trust, ruled out; reachability and feasibility score lowest for a solo founder with no institutional backing

**The bigger fork was sequencing, not feature scope.** Instead of building the app
first, the pilot opens with a manual, paper-only phase: a printed QR consent
record, a shared export template and a one-page bylaws clause, built to test buyer
acceptance and staff persistence before any build cost. If a buyer will not sign
off on a non-proprietary export, or staff abandon the process, no software fixes
that. Cheaper to find out on paper.

### Key decisions and tradeoffs
- **Append-only, hash-chained log, not a blockchain.** Tamper-evident enough for a buyer and a farmer to trust; a blockchain adds cost with no buyer-facing benefit. *Tradeoff:* gives up the marketing shine of "blockchain-verified"
- **Import adapters before new registration flows.** Asking stretched staff to re-collect data they already hold kills adoption before the pilot starts. *Tradeoff:* slower initial build, in exchange for derisking the adoption assumption directly
- **QR plus SMS, never a smartphone.** A smartphone-first design excludes the farmer from the half of the product meant to give them visibility. *Tradeoff:* the farmer experience compresses into what a QR scan or SMS can carry
- **Witnessed-thumbprint fallback for consent.** A digital-only flow reproduces the "signed but not understood" pattern the research flags. *Tradeoff:* a manual witnessing step, slower per farmer. Kept anyway

### Metrics framework (projected)
- **North star:** distinct buyers accepting one cooperative's export across 2+ relationships
- **Leading:** a buyer confirms acceptance in writing; a federation asks about a post-grant fee unprompted
- **Lagging:** % reduction in duplicate collection effort (target 50%+); % converting grant-funded to fee-paying
- **Counter:** consent captured but not understood, signatures with zero follow-up questions or revocation requests
- **Guardrail:** zero buyer confirmations in the test window means the app does not get built

### What is already real, pre-build
The scorecard pass caught both load-bearing risks, buyer acceptance and staff
habit, before any code, and reordered the pitch itself. Farmer data rights was
the planned opener; the scorecard moved that to the underlying architecture and
put the cooperative's own time savings first.

**Still exposed:** warm intros run through a GIZ-adjacent network; donor
dependency is named as a high-severity risk in the brief itself; the
grant-to-fee conversion point is an open question.

### Skills evidenced
Policy-to-product translation · thesis reframing from research · inclusive design
under real constraints (no smartphone, low literacy) · sequencing decisions that
defer build cost · scorecard and steelman validation · EU regulatory fluency (EUDR)

### Lead with this when
The role is AgTech, ESG/sustainability tech, data governance, development-sector
technology, or policy-adjacent product. The strongest evidence of policy literacy
translating into product decisions.

### Do not claim
No pilot has run. No buyer has confirmed. No cooperative is signed. The research
is inherited, not primary.

---
