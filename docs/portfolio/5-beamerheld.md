<!-- portfolio entry file, split verbatim from PORTFOLIO_ENTRIES.md v8.1 on 30 October 2026. Honesty rules and routing: PORTFOLIO_DOSSIER.md -->
## 5. BeamerHeld

### At a glance
- **Role:** Solo build
- **Period:** Mar 2025 - Sep 2025 (build period; the app is recorded as still live and in use, see Status). Earlier note: v1, then redesigned and relaunched (v2, current)
- **Type:** Booking and inventory management, expanding into a dormitory-wide resource platform
- **Where:** Theologisches Konvikt, Berlin
- **Stack:** React Native / PWA frontend; Supabase backend handling booking state and conflict detection
- **Status:** **Live and in active use.** Multi-office expansion actively in build (a separate build in progress, after the Mar 2025 - Sep 2025 build period)

### The problem
Theologisches Konvikt's 109 residents were booking the dorm's single shared
projector through a WhatsApp group chat, and double bookings were a weekly
occurrence.

### Real outcomes
- **109 residents served**, live (the live site still reads 200+ until WEBSITE_CHANGES.md ships)
- **Replaced the manual sign-up sheet and WhatsApp coordination entirely**
- **Dorm leadership requested dormitory-wide expansion**, asked for, not pitched
- **4 offices in active build:** Werkstattamt (workshop tools), Möbelkeller (furniture), Gartenamt (garden equipment), Kneipe (party room)
- **RAG Q&A system built, pending launch**

### Key decisions and tradeoffs
**No accounts, no login.** The first version required sign-up before booking,
the same friction that made the WhatsApp group unreliable, recreated inside an
app. Authentication was removed entirely; a booking needs a name and WG number at
the point of reservation. The system does not need to know who a resident is over
time, only who has the projector tonight. *Tradeoff:* no booking history per
resident, no account-level way to catch repeat abuse, no easy path to per-person
analytics. For a building of 109 residents where everyone knows everyone, social
accountability covers what authentication usually does, and this identity
pattern is what the other offices are now copying.

**Night-based calendar as the default view.** Residents book the way they'd book
a hotel room, not "8:14pm to 10:37pm". Rebuilt around night-length bookings with
a Custom Time toggle beneath. *Tradeoff:* the rare two-hour afternoon slot takes
one extra step. Optimised for the majority pattern on purpose.

**Low-temperature RAG for resident questions.** Residents kept messaging admins
with policy questions. The Q&A system answers strictly from actual usage
guidelines and office policy documents, tuned low-temperature so it stays literal
rather than generative. *Tradeoff:* answers are flatter and less conversational,
and it says "I don't know" rather than guess outside documented policy. The right
tradeoff for a liability or curfew question; the wrong one for open conversation.

### What it proved
The first prototype had a login flow, a profile page and several separate pages,
reasonable defaults for a generic booking app, wrong ones for a 109-resident dorm.
Cutting all three is what got people to use it instead of falling back to the
group chat.

- **Friction, not features.** The group chat was not failing for missing features; every v2 decision removed a step instead of adding one
- **Privacy by default, not by patch.** Personal data went admin-only before anyone asked. That default is what the other offices inherit
- **A working side project isn't a finished one.** The identity, privacy and booking pattern was generalised into something four offices could adopt without modification

### Expansion signal (the strongest validation story here)
The usual sequence is a small experiment before committing to a platform bet.
Here it ran the other way: BeamerHeld working cleanly for 109 residents *was*
the concierge test. Leadership did not need a pitch; they had already seen it
work.

*Projected signals for the expansion, not yet measured:* each office reaching
comparable booking activity within weeks without manual onboarding; direct admin
messages for policy questions dropping once RAG goes live; at least one more
office asking to join unprompted.

### Skills evidenced
Shipped product with real adoption · friction diagnosis · privacy-by-design ·
RAG implementation with deliberate constraints · pattern generalisation across
use cases · earning organisational buy-in through working software

### Lead with this when
Evidence of shipping is needed, or the role involves internal tooling, RAG/LLM
applications, or B2B2C adoption. Excellent counterweight to the pre-launch
entries, and the strongest single entry for Track E consumer roles that screen on shipping.

### Do not claim
Expansion outcomes are projected. It is a solo build, so there are no collaborators to name; a live public
link is the one remaining open item.

---
