<!-- portfolio entry file, split verbatim from PORTFOLIO_ENTRIES.md v8.1 on 30 October 2026. Honesty rules and routing: PORTFOLIO_DOSSIER.md -->
## 3. RasaHub

### At a glance
- **Role:** Solo build, founder and technical PM
- **Period:** 2026 to present (Experimental)
- **Type:** Three-sided marketplace, regulatory-constrained product
- **Status:** Pre-launch, concierge validation phase (Phase −1, zero code by design)
- **Stack:** Next.js, Supabase, Stripe Connect, Printify, Resend. Built with Claude Code, model-tiered by task risk
- **Advisors:** Steuerberater and lawyer, engaged before schema work
- **Location:** Berlin, DE

### The problem
A marketplace where emerging artists publish numbered print editions tied to a
charity they choose. Every sale carries a fixed euro amount, printed on the page,
that goes to that cause. No pre-checked donation box, no percentage-of-profit
vagueness. At checkout the buyer sees a full price waterfall down to the cent,
then receives an Impact Certificate proving it.

Three users, named specifically: the **artist** (emerging European artist who
wants to sell prints, support a cause, and not lose most of their earnings); the
**buyer** (wants to know in euros where their money goes, without being asked to
add anything); the **charity** (small-to-mid nonprofit needing a low-effort
channel to new donors).

**Value proposition for charities (designed, not a result):** every artist who picks a charity becomes a
standing fundraising channel for it, reaching new donors through art sales with no campaign to run. Pre-launch:
no charity is confirmed and no funds have been raised.

### The discovery that reframed the product
The working model was the standard pre-ticked "add €5 for the cause" box. Legal
research showed it is not merely weak UX in Germany but unenforceable: §312a
Abs. 3 BGB bars an obligation to pay beyond the main service from being created
through a pre-setting, and courts have ruled on near-identical facts. That single
finding forced a full rebuild: **the artist, not the buyer, had to become the
legal donor**, and the giving amount had to move from an optional add-on into the
price itself.

**Methods, stated honestly:** secondary research only, no interviews. German
consumer protection statute (§312a BGB, §5 and §5a UWG); three corroborating
appellate and district rulings (OLG Karlsruhe 26.03.2024 on pre-selected paid
express shipping, with LG Freiburg and Kammergericht Berlin reaching the same
conclusion); the peer-reviewed field study on point-of-sale opt-in giving (Horn &
Karlan, 2018, run on eBay); a line-by-line pricing audit across five comparable
platforms plus the one directly comparable cause-driven model, Andy Okay.

### Proof points (pre-launch, honest)
- **2 pricing models tested, 1 killed on legal grounds** before any schema was written
- **5 competitor platforms benchmarked** (Society6, Redbubble, Displate/TeePublic, INPRNT, Etsy+Printify), priced line by line on artist payout
- **€36.13 artist take-home on a €75 print**, within €1.40 of the best-paying curated fine-art platform, plus €10 to the artist's cause on top
- **Zero-code validation gate:** a two-week concierge test with defined kill criteria decides whether Phase 0 build starts

### Options analysis
Four options scored on a weighted matrix, with legal enforceability as a
pass/fail **gate** rather than a weighted criterion, because a legal fail is fatal
regardless of anything else.

| Criterion (weight) | Pre-ticked donation | Margin-substitution (Andy Okay) | % of profit | **Fixed Cause Price (chosen)** |
|---|---|---|---|---|
| Legal enforceability (gate) | **Fail**, §312a BGB | Pass | Pass, flagged misleading-ad risk | Pass |
| Artist economics (40%) | gated out | 1/5 | 3/5 | **5/5** |
| Buyer verifiability (25%) | gated out | 3/5 | 1/5 | **5/5** |
| Build/operational cost (15%) | gated out | 4/5 | 4/5 | 3/5 |
| Buyer emotional resonance (20%) | gated out | 5/5 | 2/5 | 4/5 |

*Tradeoff accepted:* the buyer loses any sense of personal choice in the giving,
and gives up the tax receipt entirely, since a mandatory amount tied to receiving
goods is not a gratuitous gift under German tax law.

### Key decisions and business impact
**Agency model over merchant-of-record.** Preserves the artist's small-business
VAT status and makes them the legal, provable donor. *Impact:* more complex
Stripe Connect setup (direct charges with an application fee) accepted because
platform-as-legal-donor breaks the artist-as-donor claim, the only truly
defensible part of the positioning.

**Stripe bills the artist's connected account directly for processing.** *Impact:*
raises contribution margin at every price tier, drops break-even from roughly 6.8
orders/month to roughly 5, and lifts maximum sustainable blended CAC from €7.16 to
€9.69. *Tradeoff:* the artist absorbs their own 1.5% + €0.25 fee, itemised
honestly on their dashboard rather than folded invisibly into commission.

**Fixed-cent pricing policies, snapshotted at cart time.** A percentage that can
move between cart and checkout breaks the "displayed cents equal charged cents"
promise. *Tradeoff:* rigidity chosen on purpose; a policy edited mid-session does
not apply to an order already in a cart.

**Attribution-based match doubling, not a higher artist cut.** On a €75 print
RasaHub nets €12.92 platform-sourced versus €10.92 artist-sourced, a €2.00
give-up, in exchange for orders arriving through a channel with no CAC.

### Metrics framework
- **North star:** euros reaching charity per active artist per month (taken from the product's own admin dashboard requirements, not invented for the portfolio)
- **Leading:** artist-referred conversion rate (kill criterion >0.75%); charity list activation (kill criterion: charity mobilises its own list)
- **Lagging:** euros to charity per artist per month; artist retention (re-listing rate); repeat buyer rate
- **Counter:** buyer complaints about giving transparency; artist churn on perceived take-rate unfairness
- **Guardrails:** any order where displayed cents ≠ charged cents halts immediately; any SKU where cause + artist + fees exceeds net gross profit blocks publish (the price floor)

### Retrospective (strong interview material)
"I designed the donation mechanic before checking German consumer law, not after.
That cost a full schema rebuild, from percentage splits to fixed cents, before I'd
written a line of application code. If I were starting over, the legal review
happens in week one." Also underestimated how far a narrow decision, who eats the
Stripe processing fee, would ripple into unit economics.

**Open risk:** the €25,000 Kleinunternehmer VAT cliff triggers an automatic 19%
price rise across every SKU, with unknown buyer reaction.

### Skills evidenced
Regulatory-first product design · unit economics to the cent · three-sided
marketplace incentive design · payment architecture (Stripe Connect) · weighted
options analysis with gating criteria · competitor pricing teardown · validation
gates before build

### Lead with this when
The role is marketplace, fintech/payments, e-commerce, or any regulated-commerce
product. Also the best evidence of commercial and legal reasoning.

### Do not claim
No live marketplace, no artists signed, no charity confirmed, no sales. The
concierge test has not run. No user interviews were conducted.

---
