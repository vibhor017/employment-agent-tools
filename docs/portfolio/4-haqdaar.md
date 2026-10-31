<!-- portfolio entry file, split verbatim from PORTFOLIO_ENTRIES.md v8.1 on 30 October 2026. Honesty rules and routing: PORTFOLIO_DOSSIER.md -->
## 4. Haqdaar

### At a glance
- **Role:** Solo build, founder and product lead
- **Period:** v1 April 2026 (Google Gen AI Academy APAC, Track 1); current version 2025 to present, in build. The site carries both deliberately: a Duration row reading "2025 to present" and a separate "Version 1, April 2026, Google Gen AI Academy APAC" row
- **Stage:** MVP in development, initial validation test pending
- **Scope:** Two dispute types (cheque bounce, tenancy), 1-2 districts
- **Team:** Solo. Advocate pilot partners in recruitment; none committed yet
- **Architecture:** WhatsApp Business API → Cloud Run (Python) → PostgreSQL; guidance/reasoning engine on Google ADK; founder/advocate dashboard

### Version 1 (the CV entry)
Agentic AI legal rights assistant for India's 12M+ gig workers under the Code on Social Security 2020. Google ADK,
Gemini 2.5 Flash, Cloud Run. Grounded at temperature 0.1, constitutional law source verification, mandatory legal
helpline referral, live on a public API. The site names it in a dedicated **Version 1** section
(/project/haqdaar#version-one) and calls it v1 in every back-reference, so this is citable from the page rather
than only from the CV. v1 is what proved the guidance engine, which is why the current version tests trust, not AI.

### The problem (current version)
Article 39A of the Indian Constitution directs the state to secure equal justice
regardless of economic disability. For two of the highest-frequency, most
time-urgent legal situations an ordinary Indian faces, that guarantee is rarely
realised, not because the process does not exist, but because almost no one
knows it does. Lok Adalats, a statutorily backed settlement forum, already handle
these exact case types on a recurring public schedule.

Existing options: ask a personal network, find the informal advocate cluster
outside district courts, call NALSA's 15100 helpline, try Nyaya Setu (the
government's free legal chatbot), or absorb the loss. Nyaya Setu solved breadth;
what it does not do is close the loop from answer to resolved case.

**Positioning:** closer to the matching layer of a platform like Doctolib applied
to legal aid than to a legal chatbot. WhatsApp is the distribution channel, not
the product's identity.

### Market evidence (not product metrics)
- 4.3M+ pending cheque bounce cases nationally
- ~29% of Delhi's civil court backlog is Rent Control disputes alone

### Discovery, stated honestly
Pre-test, not post-test. No structured user interviews have run. The MVP itself,
a founder-staffed WhatsApp concierge, *is* the discovery mechanism. The problem
hypothesis comes from pro bono legal aid and litigation practice where the same
failure mode recurred: people with a legitimate claim lost it to process
confusion, not weak facts. That is practitioner observation, not primary research.

**Assumptions the concierge test is designed to check:** that a named early
adopter is reachable at a real Lok Adalat event; that people will accept referral
to an advocate they have never met rather than defaulting to their own network;
that the guidance layer can stay on the information side of the
unauthorised-practice-of-law line; and that Nyaya Setu is under-executed enough on
event-anchoring and practitioner connection to leave room.

### Prioritisation method (a deliberate choice)
RICE was the instinct, but RICE needs Reach data and there is no pre-launch usage
baseline to estimate it honestly. ICE fits a pre-PMF, solo-build, minimal-data
stage better.

| Option | Impact | Confidence | Ease | ICE | Optimises for |
|---|---|---|---|---|---|
| A. Automate citizen-facing triage on the existing engine | 8 | 3 | 9 | 6.7 | Speed to scale |
| B. Keep the broad multi-subject guidance layer | 5 | 5 | 8 | 6.0 | Coverage |
| **C. Founder-staffed manual concierge, 2 dispute types** | 8 | 8 | 6 | **7.3** | Testing the real unknown |
| D. Pure referral partnership with the advocate cluster | 3 | 7 | 9 | 6.3 | Speed, zero build cost |

Option C chosen. The engine's capability was already proven in v1;
what was never tested is whether a person with money or housing on the line
trusts a WhatsApp assistant enough to accept a stranger-advocate. A was killed for
testing something already known. B for competing with Nyaya Setu on the one axis
it already wins. D for having no product in it, just a phone number.

### Key decisions and tradeoffs
- **Manual triage before automated triage.** Tests trust and behaviour, the real unknown, not AI capability, the known. *Tradeoff:* does not scale; the founder is a single point of failure across a Berlin-India time difference
- **Matching layer only, not practitioner-side infrastructure.** *Tradeoff:* advocates get a manually drafted summary over email or WhatsApp, fine for a 2-3 advocate pilot, not for scale
- **Information, not advice.** Protects the user from bad guidance and the founder's standing in an unresolved regulatory space. *Tradeoff:* some citizens will want more than the product will give
- **Event-anchoring as the core mechanic.** A real date, venue and next step is the one thing competitors do not offer. *Tradeoff:* manually maintained event data at MVP
- **Encrypted phone numbers, last-4-digit display only.** Security-by-design given DPDP Act exposure. *Tradeoff:* slower internal lookup during triage
- **Phased rollout gated by evidence, not calendar.** Phase 2 auto-reply is scoped as toggleable and disabled by default, conditional on hitting the threshold

### Metrics framework (projected)
- **North star:** confirmed advocate handoffs, target 3+ in two weeks
- **Leading:** triage conversations initiated (target 10+); time from inbound message to founder response (same-day)
- **Lagging:** Lok Adalat outcome rate for handed-off cases
- **Counter:** rate of out-of-scope questions (drift toward Nyaya Setu's territory)
- **Guardrails:** advocate non-response beyond 3 days; any citizen-data retention practice undefined against the DPDP Act

### Retrospective
"I scoped the MVP and picked the validation metric before locking down which
districts to pilot in or securing a single practitioner commitment. If I were
doing this over, I'd want at least one advocate conversation confirmed before
finalising the district, since a willing practitioner might be the actual
bottleneck, not citizen engagement."

### Skills evidenced
Domain expertise from practice (pro bono legal aid and 200+ cases litigated) · regulatory boundary design
(UPL, DPDP Act) · prioritisation-framework selection with justification · scope
discipline · concierge-MVP design · competitive positioning against an incumbent

### Lead with this when
The role is LegalTech, access-to-justice, emerging-markets product, WhatsApp/
conversational product, or India-market. Also strong for prioritisation-reasoning
questions.

### Do not claim
No conversations have happened. No advocate has committed. No test has run.

---
