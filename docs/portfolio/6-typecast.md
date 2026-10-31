<!-- portfolio entry file, split verbatim from PORTFOLIO_ENTRIES.md v8.1 on 30 October 2026. Honesty rules and routing: PORTFOLIO_DOSSIER.md -->
## 6. Typecast

### At a glance
- **Period:** 2025
- **Stage:** Concept and PRD complete, pre-build. No product interface exists
- **Location:** Berlin, DE
- **One-liner:** From scrawl to trusted, filed note in under 20 seconds, in your own vocabulary, landed where you already work

### The problem
People take notes on paper: notebooks, sticky notes, whiteboard photos, margins.
That capture rarely reaches the systems they work in, because retyping and
correcting a page takes longer than the note is worth. The note dies in the
notebook, and the action items die with it.

**The user is specific:** not "knowledge workers" but a consultant, policy analyst
or PM who handwrites in meetings and is personally on the hook for those action
items surviving into a tracked system. When the note dies, they miss a
commitment, a painkiller, not a nice-to-have.

**Why existing tools miss:** Goodnotes and Apple Notes serve people already
writing on an iPad. Google Lens transcribes but does not structure, route, or
flag what it is unsure about. Nobody trusts a scan enough to skip the manual
check, and the manual check is the entire bottleneck. The market does not need
better OCR; it needs a faster path from a page of scrawl to filed and trusted.

### Reasons to believe (pre-build, not outcomes)
- **Minutes back per note.** Cutting retyping to under 20 seconds turns an abandoned habit into a kept one
- **A wedge Apple can't close.** Apple's on-device handwriting intelligence stops at Apple's own apps. Android gets none of it, and no one gets a route into Notion. Structural, not temporary
- **A near-empty lane.** Devanagari and mixed-script handwriting is a documented accuracy gap for every major incumbent, with almost no competition on the relevant search terms
- **A reason to come back.** Most capture tools are one-and-done; a weekly rollup makes the notebook worth opening again

### Discovery insight
The working assumption was that "Notion-native" is the segment. It is not: living
in Notion and handwriting meeting notes heavily are weakly correlated, not the
same behaviour. That distinction came from stress-testing the beachhead against
**steelman review**, not user interviews, and it narrowed the target from "Notion
users" to the named early-adopter profile.

**No user interviews have happened.** Stated as a real gap and the first thing
being closed: 5 to 10 conversations with the named profile before more scope gets
locked, plus mining Notion community threads and app-store reviews.

### Key decisions and tradeoffs
- **Confidence exposed per span, not per page.** A single uncertain word should not force a full re-check. This is the mechanism the entire "trusted in seconds" claim depends on. *Cost:* more surface area in the verify view
- **Never silently auto-file.** High-confidence entries file automatically; low-confidence ones ask first. The first wrong silent categorisation is where trust breaks. *Cost:* friction lands on the pages already hardest to read
- **Privacy as a visible feature, not a policy footnote.** A toggle and a plain-language explainer, since Apple's whole pitch is on-device privacy. *Cost:* fewer processing options
- **Go-to-market through the Notion ecosystem.** Listed integration, companion template, community presence, rather than app-store search. *Cost:* team and prosumer pricing deferred

### The judgment call worth citing in interviews
The standard move is a cheap pre-build probe: a prototype tested with five people
before committing to build. **That was deliberately declined.** A short test of a
habit-forming feature like weekly resurface cannot produce real usage-cadence
data, because the thing being tested only shows up under repeated real use over
weeks. "Building a fake version to test a rhythm you can only observe in a real
rhythm is theatre." Instead: build the full payoff layer, instrument every open
and action from day one, and treat the first six weeks of real usage as the
probe, with a guardrail bounding the cost.

**Beachhead decision:** Option A (Notion-native and Android) chosen for its
existing distribution community; Option B (Devanagari and mixed-script) kept as
the *named second market* rather than dropped.

### Metrics framework (projected)
- **North star:** median time from photo capture to "verified, filed". Target under 20 seconds
- **Leading:** weekly digest/resurface open rate (30%+); pages processed per active user per week (3+, sustained past week 4)
- **Lagging:** free-to-paid conversion within 60 days (5%+); signup share from Notion-ecosystem channels (50%+)
- **Counter:** abandonment after a wrong silent auto-file; margin per page staying positive even on the free tier
- **Guardrail:** if digest open rate is under 15% by week 6, cut resurface complexity and re-test a simpler version

### Skills evidenced
Segment definition and correction · trust-mechanism design · competitive wedge
analysis · deliberate validation-method choice with stated reasoning · metric
frameworks with real guardrails · GTM channel strategy

### Lead with this when
The role is productivity/SaaS, AI-powered consumer tooling, or wherever
product-thinking rigour matters more than shipped scale. The declined-probe
decision is a strong "tell me about a judgment call" answer.

### Do not claim
Nothing is built. No users, no interviews, no data.

---
