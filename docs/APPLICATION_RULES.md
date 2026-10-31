# APPLICATION_RULES.md
# Vibhor Ahlawat, Job Application Agent: Rules and Generation Layer
# v12.5, 30 October 2026. Version history: CHANGELOG.md.
# AGENT NOTE: this is the "how to generate" layer. CANDIDATE_STRATEGY.md is the "what to say" layer.
# Read Section 0 before every generation, and Section 2.0 before drafting any letter.
# Sections 0-10: voice and cover letter. Section 8A: hiring manager review. Sections 11-14: CV, outreach, ATS,
# ambiguous roles. Section 15: the Role Brief that every artefact is built from.

---

## SECTION 0: THE PRE-WRITE GATE (READ FIRST, APPLY TO EVERY ARTEFACT)

### 0.0 Product name

The product is **Gyro Health**, always written in full. "Curo" never appears in a CV, letter or outreach message, and no artefact says the product was renamed, rebranded or used to be called something else (the same rule as never describing the product as having changed). The live portfolio page and the LinkedIn profile may still show the old name until they are updated; that is why the product deep link stays suspended (GYRO_PAGE_LIVE in qa_check.py). Internal file names such as CURO_UPDATE_2026-10-21.md keep their old spelling; they never appear in artefacts.

### 0.1 Dash ban, absolute

No em dashes. No en dashes. Not in the CV, cover letter, outreach, run card, or chat. This is the single clearest tell of machine-written text and it appeared in every early test output.

Replace with:
- A comma, where the clause is subordinate
- A colon, where the second half explains the first
- A full stop, where the sentence is doing two jobs (usually the right answer)
- Parentheses, where the content is genuinely an aside
- A plain hyphen, only inside ranges and compounds: 20-30 interviews, 33-67%, 12-day, Dec 2025 - Present, BH-FDR

**Sweep before every file write.** Scan the full text for the characters `—` and `–`. Zero permitted. Where a dash was carrying a clause, do not simply swap in a comma: reread the sentence and decide whether it should be two sentences.

The sweep is enforced by qa_check.py (Section 0.5). The script is the gate; the model's own sweep is a first pass, not a substitute.

### 0.2 AI-tell sweep

Before writing any file, check for and remove:

| Tell | Fix |
|---|---|
| Em or en dashes | Section 0.1 |
| Any word or phrase in the AI-isms lexicon (0.2a) | Use the plain word: "use" for leverage, "ran" for spearheaded, "the thing that changed it" for pivotal |
| Triads everywhere ("X, Y, and Z" three times in a paragraph) | Vary. Two items, or four, or a list broken across sentences |
| Every sentence the same length (metronomic rhythm) | Follow a long sentence with a short one. At least one sentence under 10 words and one over 22 in every letter; qa_check.py warns when the spread is narrow |
| Zero contractions, or a contraction in every other sentence | Section 0.3a: a few, placed where a person would naturally use them |
| "It is not just X, it is Y" | Delete. State Y |
| "This is precisely why", "It is worth noting", "Fundamentally" | Delete |
| "I was able to [verb]" | "I [verb]ed" |
| Asserted fit: "I am confident", "I believe I would be a great fit", "my skills align perfectly" | Show the outcome that earns it, then stop |
| Enthusiasm without a named thing ("excited about your innovative culture") | Name the specific thing or cut the sentence |
| Template openers and closers (0.2a list) | Section 2.1 hook types; Section 2 Para 4 close |
| A letter with no stated view | One opinion a reader could disagree with, stated once (Section 8A, item 11) |
| A paragraph that still works with a competitor's name swapped in | Rewrite it around a fact only this company has (name-swap test, 8A item 11) |
| Restating a point or idea already made in a previous paragraph | Delete the second instance. No paragraph re-establishes an earlier claim, even in different words |
| Credential strings ("A, B, C and D certifications") | Name at most two, inside a sentence that does work |
| Tech stack strings ("React Native, Supabase, Cloud Run, PostHog") | Name what it let him do, then at most two components |
| Adverb stacking (successfully, effectively, proactively) | Delete |
| Symmetrical paragraph openings | Vary the entry, and open each paragraph on a hand-off from the last (Section 8.0) |
| Sentences that could appear in any candidate's letter | Rewrite with a fact only Vibhor can state |

### 0.2a The AI-isms lexicon

Source: the recruiter-flag list Vibhor supplied (October 2026), checked against his own voice. qa_check.py mirrors both tiers (HARD_LEXICON, SOFT_LEXICON).

**Hard tier: never in a letter, outreach message or interview prep file (qa_check.py FAILS in cl and net, WARNS in cv).**
- Words: delve, realm, intricate, showcase or showcasing, pivotal, leverage or leveraged, utilise or utilize, underscore, illuminate, elevate, foster, embark, revolutionise or revolutionize, unlock, unveil, propel, bolster, spearhead or spearheaded, resonate, transformative, meticulous, multifaceted, vibrant, cutting-edge, paramount, impactful, tapestry, testament, interplay, synergy, underpinnings, paradigm, seasoned, honed, thrilled.
- Descriptors: results-driven, proven track record, hard-working, detail-oriented, dynamic leader, strategic thinker, diverse background, skills and expertise.
- Openers: "I am writing to express", "I am reaching out to express", "please allow me to introduce myself", "I am confident that", "I believe I would be", "I believe my skills", "align perfectly", "I am passionate about", "I am eager to".
- Closers and fillers: "I look forward to the opportunity", "thank you for considering", "welcome the opportunity", "at your earliest convenience", "continued success", "in summary", "in conclusion", "in essence", "it is important to note", "it's worth mentioning", "I was able to".

**Soft tier: allowed where it is the precise word, warned on everywhere (qa_check.py WARNS).** navigate, facilitate, streamline, enhance, robust, nuanced, innovative, seamless, dynamic, comprehensive, crucial, diverse, landscape, ecosystem, "cross-functional collaboration", "contribute to". "Digital public infrastructure ecosystem" on Track C, or "robust" as a statistics term in a Track D letter, can stand; name the reason in the decisions log.

**Never banned, because they are required wording:** "aligned to" (the Article 50 label), "harness" as a noun (the evaluation harness), "cross-functional" alone.

### 0.3 Vibhor's voice, the calibration

Direct. Plain nouns and verbs. Specific over abstract. Occasionally blunt. Comfortable stating a view and moving on rather than justifying it.

He writes short declaratives after a long clause. He names the concrete thing (the intended-use boundary, the 15,004 centres, the pass thresholds written before data, the release he held) instead of the category it belongs to. He does not hedge.

**Enthusiasm.** He does not perform enthusiasm: no "excited", "thrilled", "passionate", "dream role". He does state it, once in Para 2 and once in Para 4, as a concrete reason he wants this specific work, in his own words ("I want to write those rules", "that is the room I want to be in"). The reason must name something from the JD or the company: the users, the problem, founder proximity, the ownership the role carries, a value the company publishes. A letter with no stated reason reads as cold, which the revision round corrected four times.

**One stated view.** Every letter carries one opinion about the work that a reasonable reader could disagree with ("Consistency is a design problem before it is a training problem."). Stated once, not defended at length.

Test for every paragraph: could this sentence appear in a letter from any competent applicant? If yes, it is not his voice. Replace it with something only he could write.

### 0.3a Contractions: few, never none

A letter with zero contractions reads machine-made; a letter full of them reads casual. Minimise, do not eliminate.

- **Tracks A, D and E:** 1-2 contractions per letter, 3 at most.
- **Tracks B and C, and formal institutional letters signed "With respect":** 0-1. A B or C letter may leave the zero-contraction warning standing, logged as "formal register".
- **Where they go.** Where a person speaking would use one: the stated reason ("that's the work I want to do next"), a short declarative ("It isn't a training problem."), or the forward move ("In this role I'd..."). Never in the founder disclosure, the limitation confession's figures, or a sentence carrying a compliance term.
- **Which ones.** I'd, I've, it's, that's, isn't, don't, can't, wasn't. Never "I'm excited", never "gonna" or slang.
- **CVs carry none.**

qa_check.py counts them in every letter: it WARNS at zero and above three.

### 0.4 Readability rule, all artefacts

- Sentence length ceiling: 30 words. If a sentence needs a semicolon plus two commas, split it.
- One idea per clause, maximum two clauses per bullet or sentence.
- Expand an acronym on first use, then use the short form.
- **Cold-reader test.** A hiring manager outside his specialisms should understand every sentence in one read. Keep a piece of jargon or a method name (BH-FDR, RAG, permutation, PostHog, classifier) only if the JD itself uses it, or it is the proper name of a regulation or standard the role screens for. Outcome before mechanism: say what the thing does for the user, then, if earned, how.
- Never change the substance to simplify. Same claim, fewer barriers to reading it.

### 0.5 QA gate, qa_check.py (blocking)

qa_check.py lives in the tools repository ([tools], RUN SETUP in the project instructions) and runs through run_all.js. It checks mechanically what the model tends to skip under load. It runs after the Hiring Manager Review (Section 8A), never instead of it.

**When.** run_all.js runs it in Step 5.5, after the Hiring Manager Review: the hm record, then cv and cl on the text drafts (/home/claude/CV.txt and /home/claude/CL.txt, written by build_application.js) with --jd /home/claude/JD.txt so the jargon check can tell earned terms from unearned ones, then both .docx files after the build, then net once the networking package exists. Fix every FAIL and rerun until PASS. A file that has not passed is never presented. Any single check can still be run by hand: `python3 [tools]/qa_check.py cv|cl|net|hm <file> [--jd /home/claude/JD.txt]`.

**Draft format for the evidence-table letter (2.5).** In CL.txt, write Para 3 as one block with no blank lines inside it: the lead-in sentence, then the table rows as lines beginning with a pipe, one row per line (`| Skill phrase | Example with a number |`), then the follow-up. The script detects the format from those lines and reads the block as one paragraph.

**What it blocks.** Em and en dashes. The Section 0.2 phrases and denial sentences. The hard tier of the AI-isms lexicon (0.2a) in letters, outreach and prep files. The old product name "Curo" in a letter or CV. A question mark anywhere in a letter body. A Para 1 opening on "Imagine", "Picture this", "In today's" or a question. Visa or permit wording in Para 1. Future-tense learning promises. The regex-checkable CANDIDATE_STRATEGY.md Section 5B claims, including the retired figures (30% resolution, 200+ residents, 30+ advisory reports, 15-20 patient cohort, 60-70% false positives, old thesis titles and wording), the CMGRS ownership and causation claims, and the Gyro Health repo claims (a CTO-led or co-built Gyro Health, "shipped the MVP", the engine as live or in production, cohort "weekly feedback", the 38-47 week estimate and 16-week MVP, Charité BIH as a partner, MoSCoW on Gyro Health, a per-token cost model, an ML-based output filter, and the simulation figures 68%, 19.5% and 33-67% without "in simulation"). Any co-founder, CTO or named teammate on Gyro Health. Legacy Gyro Health terms (OBGYN, Flare Mode, Curo Heroes, Van Westendorp, the old 15-patient cohort or a cohort that set decisions before code, 59 of 61, EU-region, PCOS or Germany near the product). Article 50 overclaims (compliant, certified, AI Act ready). A claimed pilot run. The vibhor.work/project/curo link while GYRO_PAGE_LIVE is False. A prose letter outside 360-400 words or not four paragraphs; a table letter outside 300-360 words, with fewer than 3 or more than 4 rows, a row with no number, or a figure in two rows. No founder disclosure in Para 2 or 3. Not exactly one deep link, or a link outside Para 3. Para 1 opening on the applicant. Bullets in a letter. A CV without "Portfolio: vibhor.work". A .docx CV or letter whose LinkedIn profile or portfolio is plain text rather than a clickable link. Any producthq.workers.dev link. Any deep link not in the PORTFOLIO_DOSSIER.md entry list. A Profile Summary over 55 words or containing "I".

**What it warns on.** Paragraph budgets. Sentences over 30 words. No sentence under 10 words. A narrow spread of sentence lengths (metronomic rhythm). Zero contractions, or more than three, in a letter. The soft tier of the lexicon. A Para 1 opening on "As a", or a first sentence over 25 words. CV bullets over 35 words. Para 3 without an "I would" approach sentence. Para 4 sharing fewer than two content words with Para 1 (spine not closed). Three or more consecutive sentences with no "I" or "we" in Para 1 or Para 3 (a heuristic for intel not tied to his evidence). An evidence-table row whose example runs over 25 words, or whose skill label runs over 6 words. More than 5 product bullets or more than 4 IPAC bullets. Any figure used more than twice in the CV. Jargon terms in CV bullets that the JD does not contain. MDCG or DiGA mentions (held), a cohort with no 'pilot', 'planned' or 'about 35' nearby, build counts (held), gate figures without 'target', 'gate' or 'plan' nearby, 'steelman committee' without 'simulated'. Fix warnings where possible. Any warning left standing is named in the decisions log with the reason.

**What it cannot check.** Whether the spine holds, whether the hook would stop a reader, insight specificity, voice, flow, whether a bridge overclaims, whether research is integrated, whether the Para 4 value is quoted as the company publishes it, register. Those are Section 8A's job. A PASS is not a quality verdict.

**Logging.** Every decisions log carries "HM review: [N]/12 pass" and "QA: PASS, [N] warnings".

**Maintenance.** The script mirrors this section, Section 0.2a, Section 12.6 and CANDIDATE_STRATEGY.md Section 5B. Any edit to those lists is mirrored in the script in the same change.

---

## SECTION 1: FIVE TRACKS AT A GLANCE

Ranked, not equal. The weights are a planning target measured monthly, not a per-role rule. Fit still decides.

| Track | Weight | Label | CV File | Register | Target Roles |
|-------|--------|-------|---------|----------|--------------|
| D | 35%, primary | Technical PM / AI Gov PM / FDE | TECH_PM_MASTER_CV.md | Technical authority / compliance architect | Enterprise AI, big tech, regulated industry tech, FDE, B2B SaaS where AI, platform or compliance depth is screened. Defence and weapons excluded |
| A | 25%, co-primary | PM, Digital Health and regulated domains | PM_MASTER_CV.md | Builder / clinical domain | HealthTech PM, clinical AI PM, MedTech PM, health infrastructure |
| E | 20%, co-primary | PM, General and Consumer | PM_MASTER_CV.md (Track E summary and notes) | Builder / user-outcome / metrics | Consumer app PM, growth and monetisation PM, non-regulated B2B SaaS, marketplace, fintech and e-commerce PM |
| C | 15%, secondary | Digitalisation Expert / Intl Dev | POLICY_MASTER_CV.md plus Dev Variant | Operator / systems thinker | GIZ, KfW, World Bank and UNDP European offices, Co-Develop, DPGA, EU digital development, civic tech |
| B | 5%, opportunistic | Tech Policy and AI Governance | POLICY_MASTER_CV.md | Researcher / intellectual | Policy orgs, regulators and think tanks, only where the role carries a delivery mandate |

**Track A sub-archetype priority:** A2 (regulated-domain PM: DiGA, MDR, NHS, health data) leads. A1 and A3 are secondary.

**Track D sub-archetypes:** D1 Forward Deployed Engineer / Solutions Architect. D2 Trust and Safety / AI Governance PM. D3 Platform / Core Infrastructure PM (HealthTech, FinTech, GovTech).

**Track E sub-archetypes:** E1 Consumer app PM. E2 Growth and monetisation PM. E3 Generalist PM in non-regulated B2B SaaS, marketplace, fintech or e-commerce.

**Consumer and generalist PM roles are in track.** They are Track E, not out-of-track stretches, and never declined for lacking a regulated domain.

**Exclusion screen runs before track selection.** Direct Gyro Health competitors, defence and weapons, mass surveillance and predictive policing, and any role that would require the public writing to go quiet. The Gyro Health competitor test: is the product's core loop patient-facing episode, symptom or medicine logging, or between-visit self-management, for epilepsy, migraine or any other long-term condition, or a patient-facing symptom checker? If yes, decline. Fitness, nutrition, sleep, meditation and general wellness apps are in scope, as is all adjacent health tech. Reproductive and menstrual trackers are a per-role judgment call raised with Vibhor. Dual-use government platforms are escalated per role.

**Track C is European-based.** Employment in India is out of scope.

**Overlap resolution:** AI governance plus product delivery at a tech company, D over B. Public sector delivery plus tech policy, C over B. Health tech requiring regulatory depth, A over D. AI, platform or compliance depth screened in a B2B or consumer role, D over E. Health or medtech company, A over E. Consumer, growth or non-regulated B2B without those screens, E. **Run these rules before labelling any role "ambiguous".** A customer-facing product role at a non-regulated company is E3, never "ambiguous" or "Other" (Springer Nature was mislabelled on its first pass).

---

## SECTION 2: COVER LETTER ARCHITECTURE

Four paragraphs. Two formats (2.5): **prose** (default) and **evidence table**. Structure is constant across tracks; content, hook and register change.

**Prose format word budget:** 380 words target, 400 hard ceiling, 360 floor. Para 1: 95-120. Para 2: 115-140. Para 3: 105-125. Para 4: 40-60. If the draft exceeds 400, cut from Para 2 and Para 3 first, never from the hook, the limitation confession, the founder disclosure, or the forward move.

**Evidence-table format word budget:** 300-360 words, table included. Para 1: 85-110. Para 2: 95-125. Para 3 (lead-in, table and follow-up together): 80-115. Para 4: 35-55.

**Disclosure allocation rule.** The founder disclosure and the limitation confession are one argument, stated once. Decide before drafting which paragraph carries it. If Paragraph 2 carries the full confession, Paragraph 3 compresses the disclosure to a clause. Stating it twice is a restatement defect.

**The three questions every letter answers.** Para 1: I know what you need and I can do it. Paras 2 and 3: why me, and why this role is the next step. Para 4: why this company. Each is shown, never asserted.

### 2.0 The Argument Spine (read before drafting)

**The defect this fixes.** In all five audited letters the paragraphs were individually good and added up to nothing a reader could carry away. Every letter was rewritten around one argument.

**Before drafting, take the thesis sentence from the Role Brief (Section 15).** One sentence: the job this role exists to do, and why he has already done a version of it. Example (Vinted): "Category policy at Vinted is an independent-check problem, and I have built independent checks into a 3M+ user system." Optionally name the argument as two or three nouns (Vinted: independent certification, one shared rule, a feedback loop).

**How each paragraph serves it.**
- **Para 1 states it.** The hook from the reader's world, his evidence that he has done this job, the role as the place the two meet.
- **Para 2 proves it from his past** and says why this role: the arc, one metric, the limitation confession, and a specific reason he wants this work.
- **Para 3 shows how he would do it here.** Two or three named JD responsibilities, his evidence for each, and one forward approach sentence.
- **Para 4 closes on it.** A return to the thesis or the Para 1 story, in Para 1's words, plus the desire-and-values sentence.

**Test.** After reading the letter, can a hiring manager state in one sentence why this person fits this role? If not, the spine failed. Para 4 must share the thesis or story nouns with Para 1 (qa_check.py warns if it does not).

**Every experience invoked names the responsibility it proves.** "At IPAC I..." is never a free-standing credential. It is evidence for a named duty from the JD, written in the JD's words. An experience sentence that proves no JD responsibility is cut.

**Hand-offs.** Each paragraph opens on a connector from the previous one ("I first met that failure at...", "That is the work this role does at scale."), never on a fresh subject-verb declaration. No idea appears in two paragraphs.

### 2.1 The hook (the first one or two sentences of Para 1)

**Why.** The hook is the only part of the letter a hiring manager reads before deciding whether to read the rest. Everything else they read that day is generic. The hook must be about their world: their product, their users, their market, their organisation, or the job itself. **It is never his work achievement or CV evidence.** His evidence arrives in the very next move and appears again in Paras 2 and 3; putting it in the hook spends the opening on the thing the reader will see four more times.

**Three hook types.** Pick one per letter, log it on the run card.

- **H1, company insight.** A sharp observation about the specific problem this company's product solves, or a decision it has made, framed as the job the role exists to do. Built from company intelligence. Test: would this sentence be equally true of three competitors? If yes, push it down one level until it is about the actual thing they build.
- **H2, market or user moment.** A concrete moment from their users' or their market's world, told as a scene rather than a statistic: what a user does, faces or gives up, or what a dated market or regulatory event forces. Built from verifiable research (Step 6a), the company's own published material, or a public figure with a source. Example shape: "A seller who lists a used phone on a Sunday evening finds out by Monday whether the marketplace trusts her or the buyer." Never invented, never a composite presented as a real person.
- **H3, personal encounter.** His own experience as a user, customer, resident, citizen, or member of the group the product serves, tied to this company's product or market. Drawn from the Story Bank (CANDIDATE_STRATEGY.md Section 7A, Part 1) or from a hook note Vibhor supplies in the trigger. 30-50 words, one place, one thing he saw, one thing it showed him. The insider-user variant (below) is the strongest form of H3. Every detail must be in the Story Bank or the hook note: the agent never adds a day, a place, a person or a feeling that is not written there.

**Selection order.** H3 when a Story Bank entry or hook note shares a mechanism with this company's product or market. Otherwise H2 when research gives a concrete, sourced moment. Otherwise H1.

**Impact test (Section 8A, item 12).** Would this hiring manager stop and reread the opening because it names something true about their users or their product that most applicants miss? It must be specific to them, short, and concrete enough to picture.

**Never in a hook.** "Imagine...", "Picture this", a rhetorical question, a quotation, a dictionary definition, "Since I was a child", "In today's fast-paced world", a statistic with no human in it, flattery ("As an admirer of..."), or his own job title.

### Paragraph 1, The Thesis (95-120 words; table format 85-110)

Four moves in order:

1. **The hook** (2.1). One or two sentences from their world.
2. **The bridge to his evidence.** Within one sentence of the hook, first-person evidence that he has done the same kind of work, sharing its mechanism, not just its topic. Vinted test: their electronics verification is an independent-certifier mechanism, so the evidence is IPAC routing case closure through independent central oversight, not "I worked on trust". For H3, the bridge is the turn from the user he was to the builder he became.
3. **The capability signal (mandatory).** A concrete artefact or number proving he already holds the core capability. Never "I am a strong fit", never "I am confident". It may be the same sentence as move 2.
4. **The intersection.** Name the role, in the JD's words for its core job, as the place the hook and the capability meet. This is the thesis sentence, or close to it. This is how the paragraph says "I know what you need and I can do it" without saying it.

**Mutual-fit close: optional.** "I suspect [COMPANY] may find the same" was removed by hand in two of five letters. Use it only if it fits naturally; the default last sentence is the intersection.

**Insider-user variant.** If the product's users are a profession or group he has belonged to (lawyers using legal research databases, public sector officers, residents of a shared building, policy analysts), open from the user side ("I spent two years on the receiving end of..."), then the builder side, tied by one shared rule. This leads on every track it applies to, Track E included, and overrides the Track E rule keeping legal background out of Para 1 when the users are lawyers.

**Company description budget: one sentence per paragraph, plus the hook.** After the hook, two consecutive sentences about the company without an "I" or "we" sentence between them is a defect. The Hiring Manager Review judges this; qa_check.py warns only at three consecutive sentences with no "I" or "we", since an H1 or H2 hook legitimately precedes the intel.

### Paragraph 2, The Journey and the Reason (115-140 words; table format 95-125)

Career story as a directed path that proves the thesis, never chronological listing. Each experience answers: what was I solving, what did it achieve, what could it not do, why does that lead here.

**The drift failure:** the paragraph opens with a strong arc and collapses into a list of roles and credentials. Every sentence after the first must advance the argument or close a loop opened earlier.

**Evidence vignettes.** Where a past experience is told as a moment rather than a role, use the Story Bank's evidence vignettes (CANDIDATE_STRATEGY.md Section 7A, Part 2), at most one per letter, in one or two sentences. A vignette proves; it never replaces the metric.

**Limitation confession (mandatory, visible).** An explicit sentence pair with three components:
- what the past work achieved, with a number or a concrete result
- the structural ceiling it hit, named
- what this organisation has that removes that ceiling: **something specific from the JD or the company** (a named user base, founder proximity, ownership of a roadmap, a product surface, a release cadence). "Scale" or "install base" alone is not specific enough and was rewritten by hand in four of five letters.

Approved patterns:
- "That work cut average days to case closure by 28% for three million users. What it could not do was change anything faster than a procurement cycle allowed. [COMPANY]'s [specific thing] can."
- "Gyro Health taught me to build compliance into architecture from the first commit. What a one-person team cannot give me is [the specific thing this org has: e.g. 300 customers whose closed quarters grade every decision, a founder I work beside, a policy surface used by millions of sellers]."
- "Advising thirty companies on where data protection law actually bites shows you the pattern. It does not put you in the room when the product decision gets made. That room is here." (Data protection and cross-border market entry only. Never an AI Act consulting claim.)
- Track E: "Gyro Health has pass thresholds for 13 experiments written before any user data. What a pre-launch product cannot give me is traffic: enough users to run an experiment and trust the result. [COMPANY] has [the specific traffic or surface]." (Never implies Gyro Health has users, retention or conversion data.)

**The reason (mandatory, once).** Para 2 closes on one sentence of stated desire tied to the specific thing named above: "I want to write those rules." "That's the problem I want to work on next." Section 0.3 governs the register. It answers "why this role"; Para 4 answers "why this company", so the two never repeat each other.

**Consulting variant.** For consulting and advisory employers (public-sector digital consulting, GIZ implementers and similar delivery organisations, strategy and transformation consultancies, and Section 14 strategy roles), the specific thing in the confession may be the breadth of the firm's client work: the range of institutions, sectors or countries it works across, named as the firm names them. Back it with his own moves across law, government delivery and product, which show he already works well across contexts. "Steep learning curve", "continuous growth" and "exposure to diverse industries" never appear, and the reason is never phrased as wanting to learn (Standing Approval Policy).

**One metric in prose**, embedded in a sentence, never called out.

### Paragraph 3, How He Would Do the Job (105-125 words; table format: 2.5)

**Order: responsibility, evidence, implication.** Credentials and experiences never stand alone, and in the prose format the paragraph never lists.

1. **Open on a JD responsibility** (or a specific view on how that responsibility plays out at this company), in the JD's words. Not on credentials, not on their blog post.
2. **Evidence.** One or two pieces of his work that prove he has done it. The portfolio decision story usually sits here.
3. **The forward move (mandatory).** One sentence beginning "In this role I would..." (or "In this role I'd...", or a natural variant), naming a concrete approach to a JD responsibility, the method, and how success would be judged. Inside the JD's scope: no claims about responsibilities the JD does not list, no promises of results. Example (Weflow): "In this role I would set a stricter bar for recurring agents, written with reps and RevOps leads as acceptance criteria, and judge it by how often reps overwrite the fields the agent fills."

**Future tense, clarified.** Approach statements like the forward move are allowed and expected. What stays banned is the learning promise: "I will learn", "I plan to complete", "I would quickly get up to speed". The test: does the sentence describe how he would do the work, or promise to acquire a skill he lacks? The first is the point of Para 3; the second is a deficit confession.

**Portfolio reference (mandatory, one per letter).** One entry from PORTFOLIO_DOSSIER.md, chosen by its track routing table, told as a decision story: the choice, the alternative rejected, and why. One or two sentences, with the entry's deep link written once in plain text (e.g. vibhor.work/project/cmgrs). It serves as the evidence in move 2, so it must be the entry that best proves the responsibility Para 3 opens on, even if that differs from the routing table's default (Weflow moved CMGRS to Gyro Health for this reason). It never restates a CV bullet, never presents a target as a result, and never cites RasaHub or Haqdaar as a venture he runs. While GYRO_PAGE_LIVE is False the letter does not link the product page: Para 3 tells a Gyro Health decision without the link or uses CMGRS, BeamerHeld or Haqdaar for the link. The exactly-one-link rule still applies (CANDIDATE_STRATEGY.md Section 10).

**Credentials are woven, never listed.** Maximum two named, each inside a sentence that does argumentative work.

**Founder disclosure (mandatory, Para 2 or Para 3).** One sentence or one clause naming the Gyro Health founder role, per CANDIDATE_STRATEGY.md Objection 7: early stage and pre-revenue, built by him alone with AI coding agents, and what a one-person team cannot provide is what this organisation has. It reads as the reason he is credible, not as a caveat. Never name a co-founder, a CTO or any teammate (blocked by qa_check.py). If Para 2 already carried the confession, the disclosure compresses to a clause. In the table format the disclosure is always prose, never a table row.

For Track A, and for Track E at any health or wellness-adjacent consumer company, add a half-clause confirming Gyro Health does not sit in the employer's competitive space.

**Gap handling.** A JD requirement needing acknowledgement appears as present-tense working familiarity in one clause. If the present-tense version is not honestly available, leave the gap out and let adjacent evidence carry it.

### Paragraph 4, The Close (40-60 words; table format 35-55; 2-3 sentences)

**Synthesis, not a template.** The v11 template ("I would welcome the chance to discuss... I can be reached at...") was replaced by hand in all five letters.

1. **The return.** Back to the thesis, or to the Para 1 story, in Para 1's own words: the two or three things he brings, named as they were named at the start, or the scene's concrete noun carried to its conclusion. Never a summary of the letter, never "In summary".
2. **Desire and values, one sentence.** Why he wants this work at this company, carried by one value or achievement the company itself publishes (its values page, mission line, annual or impact report, a launch note, or the JD's "what we offer" section), **named exactly as they name it**, in quotation marks where it is a phrase of theirs. This sentence answers "why this company". It does not pair the value with a decision he made, does not claim he shares the value ("I share your commitment to" is banned), and uses one or two adjectives at most across the whole paragraph. Example shape: "Northwind says it wants 'a marketplace people trust with their second-hand things', and that's the trust work I want to do next."
3. **Invitation, only if the paragraph needs a landing.** "I would like to talk about how I would run the first quarter." (or the first rollout, the first policy cycle). Optional; leave it out when the desire-and-values sentence already lands.

**Never in Para 4.** A question of any kind (qa_check.py fails a question mark anywhere in the body). Contact details (they are in the header). "Thank you for considering", "I look forward to", "at your earliest convenience" (0.2a). A second statement of the Para 2 reason.

**Source logging.** The run card records the published value and where it came from (URL or document), so the networking package and the interview prep can reuse it.

### 2.5 Format choice: prose or evidence table

**Default: prose.** It carries an argument, which most PM, technical PM and policy hiring managers read for.

**Evidence-table format.** Para 3 becomes a one-sentence lead-in, a 3-4 row table, and a short follow-up. Use it only when all three hold:
1. The Role Brief has at least 3 GREEN responsibilities, each with a distinct Section 5A metric.
2. The role is skills-screened: E3 generalist, startup or scale-up founder-facing roles (founder's associate, chief of staff, business operations), operations-heavy delivery roles (technical project manager, programme manager, implementation or delivery lead), or a JD listing 6 or more discrete must-have skills.
3. The track is not B or C, and the role is not a D2 policy-writing role. Those readers judge the argument, not a checklist.

**The table.**
- **Left column:** the JD's exact skill phrase, 6 words or fewer. **Right column:** one specific example of using that skill, with a number and the impact, 25 words or fewer.
- **3 or 4 rows.** Each row maps to a ranked Role Brief responsibility.
- **No years of experience per skill** (CANDIDATE_STRATEGY.md Section 5A bans a years figure tied to one discipline). The example is the evidence.
- **No figure in two rows**, and no figure that already appears in Para 1 or Para 2.
- **Not a copy of a CV Key Achievement.** Each row adds the decision or context the KA lacks (what he chose, what he cut, who it served).
- **Honesty rules carry over.** Gyro Health rows say "in simulation", "target", "designed" or "planned" as 5A tags require; CMGRS rows credit the team.
- **Founder disclosure and portfolio link stay in prose**, never in a cell.

**The follow-up (after the table, one or two sentences).** The portfolio decision story with its single deep link, and the forward move ("In this role I would..."). Both stay mandatory.

**Example row shapes (facts from Section 5A):**
| Skill (JD phrase) | Example |
|---|---|
| Cross-functional delivery | As project lead on a 3M+ user platform, worked across engineering, UX and policy while the team rebuilt it; average days to closure fell 28%. |
| Adoption and rollout | Took a programme from 0% to 25% uptake in 6 months across 15,004 centres by building around the access people actually had. |
| Shipping and iteration | Cut login, profile and extra pages from a booking app; 109 residents moved off the group chat and leadership asked for 4 more offices. |

**Logging.** The run card states "CL format: prose / evidence table, reason". Airtable records it in CL Format, so Pattern Review can compare the two.

---

## SECTION 3: VOICE AND LANGUAGE RULES

### Always
- Open on the reader's world (Section 2.1), never on the applicant (except the insider-user variant, which opens on the user he was)
- One argument from first line to last (Section 2.0)
- Numbers inside sentences
- Confident peer register, not supplicant
- Short sentence after a long one
- A few contractions, never none (Section 0.3a)
- One stated view (Section 0.3)

### Never
- "I am excited to apply", "I am writing to express my interest", any variant, or anything in the 0.2a lexicon
- Bullet points in the body (the evidence table in 2.5 is the only structured element allowed)
- A question in the body
- Chronological CV summary
- Hedging: "I hope to", "I believe I could potentially"
- Purple prose
- Em dashes or en dashes (Section 0.1)
- Filler: "certainly", "absolutely", "great opportunity"
- Restating a point or idea from an earlier paragraph
- Any sentence naming what he is not ("not a pivot", "despite a non-traditional background")
- The old product name, or any mention that the product was renamed (Section 0.0)
- Exceeding one A4 page

### Tone by track

| Track | Tone | What the reader should feel |
|-------|------|------|
| A | Grounded, outcome-driven, clinically aware | "This person has built in healthcare and understands our users" |
| B | Intellectual, rigorous, principled | "This person understands the real tension here" |
| C | Systems-thinking, institutionally literate | "This person has operated inside these constraints" |
| D | Technically authoritative, compliance-native, precise | "This person can lead engineers and clear legal on the same day" |
| E | Plain, user-first, metric-literate, honest about stage | "This person decides from what users do and would read our experiment results straight" |

### Track A vocabulary
"wrote [X] before any user data", "built to a tagged MVP in [N] days", "held the release until [measured evidence]", "north star metric", "compliance as an architecture constraint from day one", "intended-use boundary". Governance language sits in Para 3 only. Method names (BH-FDR, RAG) only where the JD uses them (Section 0.4).

### Track D vocabulary
"translating regulatory requirements into engineering-ready specifications", "model evaluation (precision, recall, false positive rate)", "a launch bar set as a measured error rate", "error thresholds and edge-case boundaries for probabilistic systems", "data drift monitoring", "telemetry", "EU AI Act architecture", "data residency", "compliance-first architecture", "population-scale systems engineering", "rules-based system" when referencing the legal work.

Avoid: mission and impact framing as the lead, generic PM vocabulary, and any denial sentence.

### Track E vocabulary
"core loop", "activation", "retention", "north star metric", "counter metric", "guardrail", "experiment", "funnel", "scope cut", "wrote [X] before any user data", "designed [X] to cut [Y]" for pre-launch design properties, "shipped" (BeamerHeld only; Gyro Health is "built"), "adopted by request", "drove adoption from zero to [X]% in [Y] months", "unit economics", "take rate", "willingness to pay".

Avoid: compliance or governance language as the lead, regulatory acronyms beyond one clause unless the company is health or wellness adjacent, legal background as identity (except the insider-user variant), "achieved" or "grew" next to any Gyro Health target.

### The continuity rule (Track D)

The background is one methodology applied across different mediums. **State it positively and never name the objection.** "My background is not a pivot from law to technology" is banned in all outputs.

Approved openings for the Para 2 arc:
- "The same method runs through all of it. Take a complex rule-bound system, find where it fails under pressure, rebuild the requirements from there."
- "Every job I have held has been the same job in a different medium: work out why a rule-bound system is failing the people inside it, then rebuild it so it does not."
- "Appellate work, government delivery, and building Gyro Health have been one continuous exercise in the same skill, applied at different scales."

**Track E version.** "Every product I have worked on started with the same question: where do the people using it drop out, and what do they do instead?" The legal work does not appear in the arc (unless the insider-user variant applies).

**CMGRS credit rule, all tracks.** The requirements rebuild, the central routing of case closure and the north star change were team decisions: write "we" or "the team". "I" covers only the project-lead role and owning post-launch quality monitoring (PORTFOLIO_DOSSIER.md honesty rule 10). The 28% is the outcome of the team's rebuild of the platform and may be stated as such ("the team rebuilt its requirements; average days to case closure fell 28%"). What may never be claimed is that one decision caused it: the north star change is a decision told as a decision, never as the reason for the 28%. The 28% compares the six months after relaunch with the six months before, under a closure definition that tightened in the same window; where a role screens measurement, the letter may say "against the six months before", and the interview answer carries the caveat (CANDIDATE_STRATEGY.md Section 5A). qa_check.py fails "I led the redesign" patterns and north-star-caused-28% wording.

---

## SECTION 4: SEVEN RHETORICAL MOVES

**Move 1, Hook (Para 1 opening).** A moment or insight from the reader's world, never his CV (Section 2.1).

**Move 2, Thesis (Para 1).** The hook turned into the job the role exists to do.

**Move 3, Capability signal (Para 1, mandatory).** The reader finishes Para 1 already knowing he can do the job.

**Move 4, Evidence tied to responsibility (Paras 1-3).** Every intel line and every experience points at a named JD duty.

**Move 5, Limitation as motivation (Para 2, mandatory).** Three components, the third specific to this company, closed by a stated reason.

**Move 6, The forward move (Para 3, mandatory).** How he would do one JD responsibility here, inside scope.

**Move 7, Return and values close (Para 4).** The thesis or the story returned to, in Para 1's words, and one sentence that ties desire to a value the company publishes.

---

## SECTION 5: TRACK-SPECIFIC PARAGRAPH FORMULAS

Hooks below are H1 insight patterns, not templates to paste. Every one must be re-pointed at the specific product before use, and every one feeds the Section 2.0 spine. An H2 or H3 hook (Section 2.1) may replace the opening insight; the sub-archetype capability signal still follows it.

### Track A

*A1, early-stage health product or patient populations:* Open on the mismatch between the patient the product assumes and the patient who actually uses it, stated for this company's population. Capability signal: pass thresholds for 13 experiments and 3 kill criteria written before any user data, ahead of a planned pilot cohort of about 35 patients.

*A2, regulated domain PM (DiGA, MDR, NHS):* Open on the sequencing failure specific to their regulatory surface: build first, classify later. Capability signal: the intended-use boundary locked before Gyro Health's build, with CDSCO and DPDP duties mapped as requirements.

*A3, clinical AI trust gap:* Open on the distance between validation performance and clinical trust in their workflow. Capability signal: the engine held from release until a ground-truth harness showed false patterns down from 68% to 3% in simulation, or the output boundary that blocks diagnostic language, built as a product boundary rather than a content policy.

**Para 2 Track A arc:** IPAC origin (a 3M+ user platform the team rebuilt; 28% fewer average days to closure), limitation (institutional delivery moves at procurement speed), Gyro Health (compliance as architecture, one specific decision), reason tied to their product.

**Para 3 Track A:** a JD responsibility, one Gyro Health decision as evidence (portfolio story), the forward move.

### Track B

**Para 1 hook:** the gap between regulatory intent and technical implementation, pointed at the regulation or domain this organisation works on. Capability signal: Haqdaar v1, Gyro Health's regulatory architecture (the Article 50 label and the Insurance Firewall the database enforces, six separate consents), or the cross-border advisory practice translating data protection obligations into practical requirements. Never an AI Act consulting claim.

**EU AI Act urgency variant:** with Article 50 transparency duties applying from August 2026 and high-risk duties phased after the 2026 Omnibus, work that was advisory becomes operational. Check current dates before quoting them.

**Para 2 arc:** litigation origin, IPAC (policy at delivery scale, 1.5M data points), limitation, bridge through the thesis and Haqdaar v1 to their mandate.

**Para 3:** a JD responsibility, thesis specificity (15 indicators, EU and Indian contexts) or Haqdaar v1 as evidence, the forward move.

### Track C

**Para 1 hook:** technology deployed without matching the infrastructure users actually operate within, pointed at their programme. Capability signal: 15,004 delivery centres designed around real user access infrastructure, zero to 25% adoption in six months.

**Para 2 arc:** legal aid origin, IPAC delivery, limitation (state programmes cannot create interoperability), bridge to open standards and digital public infrastructure. Consulting variant (Section 2) for implementing organisations.

**Para 3:** a JD responsibility, the co-authored Hertie School and GIZ brief or IPAC as evidence (the survey's codebook, training workshops, pilot batch and spot-checks for research-quality duties), Haqdaar as last-mile design proof where relevant, the forward move.

### Track D

**Para 1 hooks by sub-archetype.** All three must be re-pointed at the company's actual product surface.

*D1, FDE / Solutions Architect:* what happens between the model and the institutional environment it has to run inside. Capability signal: delivery inside state government infrastructure at population scale.

*D2, Trust and Safety / AI Governance PM:* the wall where the model works, the product ships, and compliance blocks the rollout because nobody turned the regulation into an engineering constraint. Capability signal: the AI feature held from release until measured false patterns fell from 68% to 3% in simulation; the Insurance Firewall, a health-data segregation requirement enforced at the database as a user-visible feature; or (for policy-writing roles) IPAC's independent check on case closure.

*D3, Platform / Core Infrastructure PM:* in regulated domains, the decisions that matter are made before the first line of code. Capability signal: the intended-use boundary and data architecture set before Gyro Health's build.

**Para 2 Track D arc:**
1. Positive continuity opening (Section 3). Never the denial sentence.
2. Appellate litigation as adversarial edge-case analysis of a rules-based system. One line, then move.
3. IPAC as population-scale systems engineering: as project lead on a 3M+ user platform where the team rebuilt requirements around central oversight, average days to closure fell 28%. Team credit per Section 3.
4. Gyro Health as convergence: ML architecture, product delivery and regulatory architecture as one set of constraints, built solo with AI coding agents, with one named specific.
5. Limitation confession with the specific thing this company has, and the stated reason.

**Para 3 Track D:** a JD responsibility; the triangular moat expressed as one sentence about what he can do; one piece of evidence (D1: IPAC institutional credibility; D2: the release hold or the Insurance Firewall; D3: the in-house analytics design, the CI gates and SQL depth); the forward move. D1 and D3 delivery-heavy roles may take the evidence-table format (2.5); D2 policy-writing roles never do.

### Track E

**Para 1 hooks by sub-archetype.** All three must be re-pointed at the company's actual core loop.

*E1, Consumer app PM:* the gap between how the product assumes users behave and what they do on an ordinary bad day, in terms of this company's core loop. Capability signal: Gyro Health's Right now mode and 15-second check-in, built around what a person can do on their worst day, with no streaks or guilt language, or BeamerHeld's login flow removed until 109 residents left the group chat for it.

*E2, Growth and monetisation PM:* the difference between the metric a product optimises and the behaviour it actually wants. Capability signal: the IPAC team's move of the north star from closure count to citizen satisfaction plus turnaround ("we", never the cause of the 28%), or Gyro Health's free core forever with a paid Plus tier and a sponsored route, designed before any revenue.

*E3, Generalist PM (B2B SaaS, marketplace, fintech, e-commerce, publishing):* the one constraint in their market that shapes the product more than any feature. Capability signal: RasaHub's pricing model killed on German consumer law before any schema, or IPAC's delivery across government, engineering and citizens at 3M+ scale. Where the JD gives a timeline ("in your first 90 days"), the letter can follow it: Para 2 proves the first-90-days work, Para 3 the months-3-12 work. E3 is the most common home of the evidence-table format (2.5).

**Para 2 Track E arc:**
1. Track E continuity opening (Section 3), unless the insider-user variant applies.
2. IPAC: adoption from 0% to 25% in 6 months across 15,004 centres, or the 3M+ platform and the team's north star change ("we"). One metric, in prose.
3. BeamerHeld: shipped, cut to the essentials, adopted by 109 residents, expansion requested. One line.
4. Gyro Health: pass thresholds for 13 experiments written before any user data, built to a tagged MVP in 12 days, and a metric framework defined before launch.
5. Limitation confession, Track E pattern, with the specific traffic or surface this company has, and the stated reason.

**Para 3 Track E:** a JD responsibility, the portfolio decision story as evidence, the founder disclosure (Track E framing, plus the non-competitor half-clause for health or wellness-adjacent companies), the forward move. At most one credential, a product analytics or data one, or Google Gen AI Master for consumer AI products.

---

## SECTION 6: COMPANY RESEARCH INTEGRATION

**Placement:** the Para 1 hook (H1 and H2) and the Para 1 intel line, primary. Para 3, secondary. Para 4, the one published value. Never Para 2, except the specific thing named in the limitation confession.

**The integration test.** Research is integrated when (a) removing the finding breaks the sentence's argument, and (b) it is followed within one sentence by his own evidence on a JD responsibility, sharing its mechanism. A finding that only shows the site was read fails, however sharp it is. The audit failure: four of five letters described the company's product back to its own hiring manager ("the information the hiring manager would already know about their own product"). A hook is the one place company intelligence may lead, and only because it is turned into a moment or an insight the reader recognises, not a description of their product.

| Do not write | Write |
|---|---|
| "I saw your Series B announcement" | "The expansion into [area] puts [constraint] on the critical path. I met the same constraint at [his evidence], where [what he did]." |
| "Your new verification flow checks every item before it ships" | "Electronics verification works only if the checker is independent of the seller. At IPAC we routed case closure away from the departments that owned the cases, for the same reason." |
| "Based on your website, your mission is" | "[COMPANY]'s position on [issue] means [the role] has to [duty]. That is the work I did at [evidence]." |
| "I share your commitment to trust" (Para 4) | "[COMPANY] says it wants '[their published phrase]', and that's the work I want to do next." |

**Research prompt:** product launches or major announcements in the last six months, published research or frameworks relevant to the track, leadership statements on priorities, the company's own published values, mission line or impact report (for the Para 4 value), what its users publicly say or do (app reviews, community posts, the company's own user research) for an H2 moment, and the JD's own "what we offer" section (founder access, ownership, the user base), which is often the sharpest material for the Para 2 reason. Use the one finding that most changes what the role has to solve.

**Networking alignment.** The networking package reuses the letter's hook or intelligence finding. It never builds its hooks on a finding the letter dropped (Weflow's NET.md drift).

---

## SECTION 7: FORMATTING (COVER LETTER)

Build every letter with cl_template_builder.js v1.2 (Section 11.4a). It renders this layout:

```
Vibhor Ahlawat
[Title line by track]
Berlin, Germany  ·  +49 1622801918  ·  vibhorahlawat17@gmail.com  ·  linkedin.com/in/vibhorahlawat  ·  Portfolio: vibhor.work

[Date in full, e.g. 14 July 2026]

[Hiring Manager Name]
[Company Name]
[City]

Dear [Name or "Hiring Team"],

[Four body paragraphs; in the table format, Para 3 is lead-in, table, follow-up]

Warm regards,
Vibhor Ahlawat
```

**Title line by track:**
- A: "Founder and Technical Product Lead, Gyro Health | MPP, Hertie School Berlin"
- B: "AI Governance and Digital Policy Specialist | MPP (AI Governance and Digital Transformation), Hertie School Berlin"
- C: "Digital Transformation Specialist and Product Lead | MPP, Hertie School Berlin"
- D: "Technical Product Lead, AI and Data Platforms | Google Gen AI Master · IBM AI PM · MPP and LL.B."
- E: "Product Manager | [Role's domain, e.g. Consumer, Growth and Marketplace Products] | MPP, Hertie School Berlin"
- Ambiguous or improvised roles: mirror the role title ("Founder's Associate, Product | ..."), never a stale track line.

**Header links:** the LinkedIn profile and the portfolio on the contact line are clickable links (header.linkedin and header.portfolio in cl_template_builder.js), matching the CV. qa_check.py fails a .docx letter where either is plain text.

**Evidence table (2.5):** pass Para 3 as an object `{ lead, rows, after }` in data.paragraphs[2]. The builder renders the lead-in, then a two-column borderless table with no header row (skill label in bold dark on the left, about a quarter of the width; the example in regular dark on the right), 11pt like the body, then the follow-up paragraph.

**Rules:** no bold, underline, or bullets in the body, except the evidence table's skill labels. One A4 page, four paragraphs. Named salutation wherever possible. "Warm regards" as standard, "With respect" for formal government and institutional contexts. Date written out in full and set to the generation date. No dashes anywhere. Contact details live in the header only; Para 4 does not repeat them.

---

## SECTION 8: QUALITY CHECKLIST

Items marked [QA] are enforced or warned on by qa_check.py (Section 0.5). Items marked [HM] are scored in the Hiring Manager Review (Section 8A). Verify the rest by reading.

### 8.0 AI-tell, flow and honesty sweep (run first, blocks output)
- [ ] [QA] Zero em dashes and en dashes
- [ ] [QA] No hard-tier lexicon word or phrase (0.2a); soft-tier words only where they are the precise word
- [ ] [QA] Contractions: a few, never none (0.3a); none in the CV
- [ ] [QA] Sentence lengths vary, at least one sentence under 10 words
- [ ] [QA] The product is named Gyro Health; the old name never appears, and nothing says it was renamed
- [ ] [HM] No idea appears in two paragraphs, in any wording (repeated-idea sweep, not only repeated words)
- [ ] [HM] Each paragraph opens on a hand-off from the previous one; no jumps inside a paragraph
- [ ] [HM] One stated view; no paragraph survives a competitor-name swap
- [ ] No credential list of three or more items in one sentence
- [ ] [QA] No claim listed in CANDIDATE_STRATEGY.md Section 5B
- [ ] [QA] CMGRS decisions credited to the team ("we"), "I" only for the lead role and quality monitoring; the 28% never presented as caused by the north star change
- [ ] [QA] Gyro Health built solo (never by the CTO), a tagged MVP (never "shipped"), every engine figure "in simulation"
- [ ] [QA] Gyro Health described only as it is today: no earlier condition, market, stack, name or team, no co-founder or CTO, no pilot or interview result
- [ ] Every figure matches the CV and Section 5A exactly (28%, 109, 15, 14, 68% to 3%, 12 days)
- [ ] Every Story Bank detail used is written in the Story Bank or the hook note; nothing added
- [ ] No tech stack string
- [ ] [QA] No denial sentence
- [ ] [QA] No future-tense learning promise (approach statements are fine, Section 2)
- [ ] Every sentence contains something only Vibhor could write, or it is cut

### 8.1 Universal
- [ ] [HM] Thesis statable in one sentence after one read; Para 1 states it, Para 4 returns to it
- [ ] [HM] The hook is about their product, users, market, organisation or the role (H1, H2 or H3), never his CV, and passes the impact test
- [ ] Para 1 hook is specific to this company
- [ ] [HM] Every intel sentence is followed by his evidence on a JD duty, sharing its mechanism
- [ ] [HM] No two consecutive sentences about the company after the hook (qa_check.py warns at three with no I or we)
- [ ] Para 2 is a journey arc, not a role list
- [ ] Para 2 contains one metric in prose and an explicit three-component limitation confession
- [ ] [HM] The confession names something specific this company has, and Para 2 states a reason he wants the work
- [ ] [HM] Para 3 runs responsibility, evidence, implication; in prose it lists nothing, in the table format every row carries a number
- [ ] [QA] [HM] Para 3 contains a forward approach sentence inside JD scope
- [ ] [HM] Every experience invoked names the JD responsibility it proves
- [ ] Para 3 names at most two credentials, each inside a working sentence
- [ ] [QA] Founder disclosure present once, Para 2 or 3, per Objection 7, in prose
- [ ] [QA] Exactly one portfolio entry, in Para 3, with its deep link, nothing in it presenting a target as a result
- [ ] [HM] Para 4 returns to the thesis or story in Para 1's words, fuses desire with one value the company publishes (quoted as they say it), carries one or two adjectives at most, no contact details
- [ ] [QA] No question anywhere in the body
- [ ] No bullets, no purple prose, no hedging, no filler
- [ ] [QA] Word count in band (prose 360-400, table 300-360), budgets respected
- [ ] Format choice (prose or table) matches Section 2.5 and is logged
- [ ] Register matches the track

### 8.2 Track A
- [ ] Non-competitor assurance offered in Para 3, unprompted
- [ ] Sub-archetype identified, correct hook re-pointed
- [ ] PM vocabulary used
- [ ] At least one specific Gyro Health product decision cited
- [ ] Policy language confined to Para 3
- [ ] Journey arc opens from the operational frame, not the legal one

### 8.3 Track B
- [ ] AI Act dates referenced only where they create real urgency, and checked before quoting
- [ ] Thesis cited with specificity (15 indicators, EU and Indian contexts)
- [ ] Haqdaar v1 used as policy-to-product proof
- [ ] Analytical rigour shown, not mission alignment alone
- [ ] Prose format only; 0-1 contractions

### 8.4 Track C
- [ ] IPAC delivery numbers used (15,004 centres, 3M+ users, 25%, 28%)
- [ ] GIZ referenced where the organisation sits in that ecosystem
- [ ] Institutional and delivery register, not commercial
- [ ] Evidence of working inside institutional constraints
- [ ] Consulting variant used for implementing organisations, without "learning curve" language
- [ ] Prose format only; 0-1 contractions

### 8.5 Track D
- [ ] Sub-archetype identified, correct hook re-pointed
- [ ] Track D title line used
- [ ] Track D cert priority applied
- [ ] Track D vocabulary used
- [ ] One specific Gyro Health architecture decision cited as a product decision
- [ ] Positive continuity framing in Para 2, denial sentence absent
- [ ] Triangular moat expressed as one capability
- [ ] Appellate work framed as adversarial edge-case analysis
- [ ] IPAC framed as population-scale systems engineering, with team credit
- [ ] Mission and impact language absent from Paras 1 and 2

### 8.6 Track E
- [ ] Sub-archetype identified (E1, E2 or E3); overlap rules run before any "ambiguous" label
- [ ] Track E title line used, middle segment matched to the role
- [ ] Track E vocabulary used, plain PM register
- [ ] Track E limitation confession (traffic to experiment) present, or an equivalent three-component confession naming the specific thing this company has
- [ ] Regulatory acronyms limited to one clause unless the company is health or wellness adjacent
- [ ] At least one shipped or adopted outcome cited (BeamerHeld or IPAC)
- [ ] Every Gyro Health number stated as designed, a target, a tagged build or "in simulation"
- [ ] Legal and policy background absent from Paras 1 and 2 unless the insider-user variant applies
- [ ] Non-competitor assurance offered where the company is health or wellness adjacent

---

## SECTION 8A: HIRING MANAGER REVIEW (runs before qa_check.py)

**Why.** Every revision in the five-role audit came from a whole-document read by a hiring manager's eye. qa_check.py checks parts; this step checks the whole.

**Who does it.** Preferably a fresh agent that sees only the JD, the Role Brief (Section 15) and the two drafts, not the drafting reasoning, so it does not grade its own work. Where no agent tool is available, the drafting model runs it in place, as a rubric, never as an open "review this".

**Persona.** The hiring manager for this specific role, who reads 200 applications a cycle and is also an expert in application writing. Six seconds on the CV first, then the letter in full.

**Constraints on the reviewer.** It may reorder, reframe, cut and rewrite wording. It may not add a fact, upgrade a claim, add a Story Bank detail that is not written there, or touch anything CANDIDATE_STRATEGY.md Section 5B or the dossier honesty rules govern. "Make it stronger" never means "claim more".

**Rubric.** Each item scored pass or fail, with the line from the draft quoted as evidence.

1. **Thesis.** After one read, the reviewer can state why this person fits this role in one sentence, and it matches the Role Brief thesis.
2. **Intel earns its place.** Every company-intelligence sentence is followed by his evidence on a JD duty, sharing its mechanism. Nothing tells the hiring manager about their own product.
3. **Responsibility coverage.** Each top-ranked responsibility in the Role Brief is evidenced in the CV, and the top two or three are argued in the letter. Each Areas of Expertise term is proved by the bullet that carries its word (the script checks the word; this item checks the sense).
4. **Forward move.** Para 3 says how he would do a named JD responsibility, with a method and a success test, inside JD scope.
5. **Why this role.** Para 2 names something specific this company has and states a reason he wants the work.
6. **Close and why this company.** Para 4 returns to the thesis or the Para 1 story in Para 1's words, and one sentence fuses desire with a value or achievement the company publishes, quoted as they name it. No template, no question, at most two adjectives.
7. **Flow.** Paragraphs hand off; no idea repeats; no jumps.
8. **Cold reader.** Every CV bullet and every side-project line makes sense to a non-specialist in one read. The product's first bullet says what it is and what he owns.
9. **Honesty.** Nothing a 5B, dossier or CMGRS-credit check would catch. Every figure matches the CV and CURO_UPDATE_2026-10-21.md Section 2. Every hook and vignette detail is in the Story Bank or the hook note.
10. **Six-second CV skim.** Headline, summary first sentence and the top metric land in six seconds, and the summary is three full sentences with evidence.
11. **Human voice.** One stated view a reasonable reader could disagree with; no paragraph still works with a competitor's name swapped in; rhythm varies; contractions present and few (0.3a).
12. **Hook impact.** The opening is from the reader's world (H1, H2 or H3), not his CV, and the hiring manager would stop on it: specific to their users, product, market or role, concrete enough to picture, untrue of three competitors.

**Process.** One revision pass on every failed item, then qa_check.py. If an item still fails after the pass, it is named in the decisions log rather than looped. Chat output: one line, "HM review: [N]/12 pass, revised: [items]".

---

## SECTION 9: APPLICATION INPUT VARIABLES

| Variable | Notes |
|---|---|
| Role title | Exact from JD |
| Company | Full name |
| Track | A / B / C / D / E / ambiguous (Section 14, only after the overlap rules) |
| Sub-archetype | A1-A3, D1-D3, E1-E3, or blank |
| Hiring manager | LinkedIn, company site, JD footer |
| Role Brief | Section 15, built in Step 3 |
| Recent research | Announcements, publications, priorities, the JD's own offer |
| Hook type and source | H1, H2 or H3 (Section 2.1); Story Bank ID or hook note for H3; the source for H2 |
| Hook note | Optional one line Vibhor adds to the trigger: a personal experience with this company's product, users or market. Used only as written |
| Published value | The value or achievement Para 4 quotes, with its source |
| CL format | Prose or evidence table (Section 2.5), with the reason |
| Insider connections | Named people, collaborations, programmes |
| Omissions | Distracting for this role |
| Portfolio entry | The entry that best proves the Para 3 responsibility, from the dossier routing table |
| Language | English default, German if required |

---

## SECTION 10: ANCHOR CLAIMS AND SUPPRESSION

### Anchor claims, never removed (all tracks)
1. IPAC 3M+ user grievance platform, 28% reduction in average days from registration to case closure (team-credited per Section 3)
2. Gyro Health technical product leadership (built solo with AI coding agents to a tagged MVP in 12 days, the release held until false patterns fell from 68% to 3% in simulation, pass thresholds for 13 experiments written before any user data, an intended-use boundary locked before build, India-only data specified, an AI-disclosure label aligned to EU AI Act Article 50, and a planned pilot cohort of about 35 patients)
3. MPP thesis, "From Guarantee to Guardrail: Measuring How India's AI Governance Framework Operationalising Constitutional Equality", a 15-indicator framework across EU and Indian regulatory contexts

**Track E note.** The anchors stay on the CV. In a Track E letter, Anchor 2 is told through product decisions rather than regulatory detail, and Anchor 3 is carried by the CV education line only.

### Per-track suppression

| Track A omit | Track B omit | Track C omit | Track D omit | Track E omit |
|---|---|---|---|---|
| Legal background as lead | Startup commercial metrics as lead | Gyro Health as commercial venture | Any denial or pivot sentence | Legal or policy background as identity (except insider-user variant) |
| Takshashila / Pegasus | Builder PM as opening identity | ML architecture depth | Mission and impact language as lead | Takshashila / Pegasus |
| GIZ as "policy research" | Van Westendorp, pricing | PM vocabulary (sprint, MoSCoW) | Policy language as opening identity | Thesis as a letter credential |
| Governance language as lead | ML architecture as headline | Private sector framing | UVA Darden cert | Governance and compliance language as lead |
| Thesis as primary credential | Track D cert stack as lead | Commercial metrics | Generic PM vocabulary as lead | Regulatory acronyms beyond one clause (non-health companies) |
| IBM and Mixpanel certs | Solo builds as lead PM work | Evidence-table format | "passionate", "committed" | Pro bono legal aid, IPAC framed as consulting |

### Objection pre-emption
**Non-linear PM path:** frame IPAC in PM language so the objection never surfaces.
**Work authorisation:** outreach only. Berlin residence permit, right to work, no sponsorship.
**Founder concern (Objection 7, mandatory disclosure):** name the founder role in one sentence before it is asked. Early stage, pre-revenue, built by him alone with AI coding agents, and what a one-person team cannot provide is the specific thing this employer has. Frame as the reason he is credible, not as a caveat. Track A, and Track E at health or wellness-adjacent companies, add the non-competitor assurance. Never call it a side project, never promise to abandon it. Full framings in CANDIDATE_STRATEGY.md Objection 7.
**No shipped consumer growth metrics (Objection 8, Track E):** pre-empt with the Track E limitation confession and at least one shipped or adopted outcome. Never inflate Gyro Health.
**German:** CV states A2 developing towards B1. Do not overclaim.
**Track D continuity:** pre-empt through positive framing. Never name it.

---

## SECTION 11: CV CUSTOMISATION RULES

### 11.1 Core principles

**Headline is non-negotiable.** One target role title plus 2-3 JD-aligned skills plus domain. Tailored per application.

**Profile Summary is non-negotiable.** Spec in 11.4.

**Show, never tell.** Quality claims out, outcome evidence in.

**Metrics are mandatory.** Minimum two metric-bearing bullets per role. Every Key Achievement carries a metric. Numerals, never words.

**Each figure at most twice.** A figure (28%, 3M+, 15,004, 68%, 12 days, 109) appears at most twice across summary, Key Achievements and bullets, and never twice in the same section. If a Key Achievement carries a figure, the matching experience bullet uses a different fact or a different figure (for Gyro Health: 19.5% to 1.0% or 33-67% instead of 68% to 3%). qa_check.py warns at three uses.

**Bullet counts.** Gyro Health 4-5 bullets on every track; merge before dropping (the assistant with the output boundary, pricing with the access model), never drop a fact the role screens for. IPAC 3-4 bullets. Advisory practice 2-3 bullets. Outsay 2 bullets. Internships 2 bullets. Older roles are bullets too, not paragraphs. qa_check.py warns above 5 product bullets or 4 IPAC.

**Brevity.** 1 to 1.5 pages, never over 2 at 10pt. Cut from oldest experience first.

**F-pattern.** Strongest bullets at the top of each role.

**Fold test.** Left third must show company names, role titles, strongest metrics.

**Lexicon.** No hard-tier word from 0.2a on a CV (qa_check.py warns); "spearheaded", "leveraged" and "utilised" in particular are replaced by Led, Used and Ran.

### 11.2 The bullet formula

> Action Verb + Task or Project + Metric or Result

All three elements, plus the Section 0.4 constraints: 35 words maximum, two clauses maximum, one semicolon maximum, acronyms expanded on first use, the cold-reader test.

**Product entries open on what the product is.** The first bullet of Gyro Health, and the first line of any side project, states what the product is, its stage, who uses it, and what he owns. A fresh reader of the first Gyro Health draft "can't figure out what the role is or what this candidate does".

> Leads product on Gyro Health, a pre-launch app that helps people with epilepsy and migraine in India log episodes and bring a one-page report to their doctor, owning discovery, roadmap and the regulatory path.

**Cold-reader rewrite, before and after:**

Before:
> Built a synthetic ground-truth validation harness that showed the v1 Benjamini-Hochberg (BH-FDR) correlation engine would show a false pattern to 68% of pattern-free users within 90 days, then redesigned it to bring that to 3% in simulation.

After (non-technical JD):
> Stress-tested the app's pattern-finding engine against simulated patients with known answers, found it would mislead two in three users, and redesigned it to cut false patterns to 3% in simulation.

The technical version stays available for Track D and roles whose JD names statistics, evaluation or ML methods. Gyro Health facts come from the master CVs or CURO_UPDATE_2026-10-21.md Section 2 only.

**JD vocabulary in every entry.** Relevance is shown by the JD's own verbs and nouns inside the sentence, never by labels. No bold tags or prefixes on experience bullets ("**Stakeholder alignment:** ..." is a Key Achievement format only).

**Eliminate:** adverbs, support verbs (helped, assisted, worked on), pronouns, buzzwords.

**Action verb banks:** Ownership (Led, Directed, Drove, Owned, Built, Founded). Analysis (Analysed, Diagnosed, Identified, Restructured, Resolved). Delivery (Designed, Developed, Implemented, Deployed, Shipped, Established). Growth (Increased, Generated, Reduced, Accelerated, Improved). For CMGRS team decisions, the verb belongs to the team: "As project lead, owned...; the team rebuilt...". For Gyro Health, "Shipped" is never used: it is a tagged build in testing.

### 11.3 Key Achievements section

Placement: between Areas of Expertise and Professional Experience.

Build per application:
1. Take the top 3-4 responsibilities from the Role Brief (Section 15). Ignore boilerplate; hunt the "bonus points if", named tools and domain tells.
2. Write one item per responsibility, each proving it with a metric.
3. Format: **[Skill label in the JD's own words]:** action verb, task or project, metric result.

**Metric rule, hard.** Pull only from CANDIDATE_STRATEGY.md Section 5A. Never ship a Key Achievement without a number.

Track D example:
> **Technical product leadership in a regulated domain:** Built Gyro Health solo with AI coding agents, from first commit to a tagged MVP in 12 days, and held its AI feature from release until false patterns fell from 68% to 3% in simulation.

Track E example:
> **Shipping and adoption:** Shipped a booking web app now used by 109 dormitory residents after cutting login, profile and extra pages; dorm leadership then requested a rollout to 4 offices.

### 11.3a Areas of Expertise: requirement coverage, the echo rule and gaps

**Purpose.** This block names the role's requirements in the JD's own words, so a six-second reader and an ATS see the match in the first third of the page. It also narrows the CV's gaps, but only through vocabulary he can honestly say: a requirement becomes a term when a bullet already proves it, and that bullet is reworded so the term's own word appears in it. It never invents coverage.

**Build, per application.**
1. **Source the terms from the Role Brief, not from the master's default list.** Take the ranked responsibilities and must-haves (Section 15), and use the JD's exact phrase for each one he can evidence. Nine terms fill the 3x3 grid, most important first (minimum six). The master's default nine are only for gaps in the JD's own language, and are never padding for terms the JD does not screen.
2. **Rate each term from the evidence map.** GREEN: list it. YELLOW (adjacent evidence, named bridge): list it only after the closest bullet is reworded to carry the term's word (step 3). RED (no direct evidence): never listed, never a skill; it is mitigated in the letter per the Standing Approval Policy or left out. CANDIDATE_STRATEGY.md Section 9B holds the requirement-by-requirement table, the echo wording and the rating.
3. **Echo rule (blocking).** Every term, split at "and", "&", "/" and commas, needs one of its own words, or that word's stem, in a bullet, Key Achievement, the summary, a certification or an education line. If it is missing, reword the closest bullet into that word (11.5 step 2: the fact, figure and scope stay exactly as in the master) or drop the term. Generic words (product, delivery, management, development, strategy, planning, design, process, framework, platform) do not count when the term has a distinctive word: "Agile Delivery" needs "agile", "Product Roadmapping" needs "roadmap".
4. **Brackets.** A bracket may hold a language or a regulation ("Data Analysis (SQL, Python, R)", "Regulatory Compliance (EU AI Act, DPDP Act, GDPR)"). Product tools do not go in brackets; they go on the Tools line (11.3b).
5. **The word match is mechanical; the sense is judged.** The Hiring Manager Review (8A, item 3) confirms the echo bullet genuinely proves the term. "Operational frameworks" in a legal bullet does not prove "Metric Frameworks".

**Never.** A term with no echo bullet. A RED term (MLOps, Backlogs and Risk Registers, OKR Development, Experiment Design, People Management, Wireframing and Prototyping until he names a screen he built). A level word ("advanced", "expert") or "Scrum Master" anywhere. A YELLOW term claimed beyond its bridge (Agile Delivery rests on the team's sprint ownership restructure, not on a certification; Team Leadership rests on the 25-person research team).

### 11.3b The Tools line

Directly under the Areas of Expertise grid: a bold "Tools:" label, then tool names separated by commas. The data field is `tools` in cv_template_builder.js v4.2.

- **Confirmed tools only** (CANDIDATE_STRATEGY.md Section 9B: Figma, Jira, Miro, Notion, Supabase, PostHog, Mixpanel, Amplitude, SQL, Google Cloud Run, Cursor, Claude Code, AWS Bedrock, Vertex AI, pgvector, Expo, plus PostgreSQL, Python, R, React Native, Google ADK and Gemini as already named in the masters). A tool the JD names that is not on that list (Salesforce, Confluence, Tableau, Looker, Power BI and the like) never goes on the CV; the letter uses the Section 9 bridge.
- **Order and size.** The JD's named tools first, then the rest by relevance. Maximum 10. A policy or development-sector role with no tool in the JD keeps the short default line.
- **Names only.** No level words and no usage claims. "Jira" on the line is not a claim that he managed a backlog; a bullet claiming it needs its own evidence.
- **Not echoed.** The Tools line is exempt from the echo rule, and its words never count as an echo for an Areas of Expertise term.
- **QA.** qa_check.py FAILS a missing line, a tool not in CONFIRMED_TOOLS, or a level word; it WARNS above 10 tools, and (with --jd) when the JD names a confirmed tool the line leaves out.

### 11.4 Formatting and layout

**Layout is fixed in code.** cv_template_builder.js v4.2 renders the locked template: Times New Roman, the navy palette, 10pt from the Profile Summary down, A4 with 0.625in margins, the section order (Profile Summary, Areas of Expertise, Key Achievements, Professional Experience, Side Projects, Certifications, Education), locations and dates right-aligned by a tab stop, the borderless 3x3 Areas of Expertise table with the Tools line under it, bold Key Achievement labels, and bold Problem: and Solution: labels under Side Projects. The full visual spec (fonts, palette, sizes, spacing, borders) is docs/CV_LAYOUT.md in the tools repository; it is for maintaining the builder and is never read during an application.

**What the data still has to get right.**
- Header: one title line, "[Role Title]  |  [Domain A]  |  [Domain B]", and header.linkedin and header.portfolio set, so the LinkedIn profile and "Portfolio: vibhor.work" render as clickable links.
- Dates: "Dec 2025 - Present", "Jan 2022 - Apr 2023": month, year, a spaced plain hyphen, never an en dash.
- Key Achievements: a label in the JD's words, a colon, then the description.
- Side Projects: heading "SIDE PROJECTS"; one Problem sentence; a Solution line of one or two sentences that passes the cold-reader test (what it does for the user before any stack names). "Delivered:" is retired.
- Certifications: completed credentials only (UVA Darden waits until completed).

**Profile Summary, mandatory.** Section heading "PROFILE SUMMARY", between the header and Areas of Expertise, rendered through data.summary. The spec:
- **Three full sentences**, implied third person, no "I", each with a finite verb.
- **Sentence 1, what he does**, in the JD's own words for the role's core responsibility, with the years figure where it helps: "5+ years across law, government delivery and product" (the only years phrasing permitted, CANDIDATE_STRATEGY.md Section 5A).
- **Sentence 2, proof**: the strongest evidence for the top responsibility, carrying the one metric.
- **Sentence 3, fit**: how his combination maps to the second and third responsibilities, with evidence (a named product, a named outcome), never a bare assertion. "Same method across Supreme Court, government and product scale" with nothing behind it is the defect that was cut.
- Maximum 55 words. The years figure does not count toward the one-metric limit. qa_check.py checks the summary on its own (word cap, no "I").

**Proofread three times.**

### 11.4a Building the files (use the scaffold, never rebuild from spec)

init_app.js scaffolds cv_data.js and cl_data.js from the selected track's skeleton, so the data shape is already on disk: edit the scaffold in place. build_application.js, run through run_all.js, builds CV.txt, CL.txt and both .docx files with cv_template_builder.js v4.2 and cl_template_builder.js v1.2. Never read the builder source or the example data files to learn the shape, and never regenerate paragraph or table calls from the prose spec. The skeleton holds the master's default text, not facts chosen for this role: every fact still comes from the masters, CANDIDATE_STRATEGY.md Section 5A and CURO_UPDATE_2026-10-21.md Section 2.

### 11.5 Tailoring strategy

**The 80/20 rule is retired.** In the audit, tailoring only the headline, summary and Key Achievements left every entry in master wording, and three of five CVs were rewritten entry by entry.

**Every entry is tailored, facts unchanged:**
1. **Responsibility map first.** From the Role Brief, take the ranked JD responsibilities. Map each to the CV line that proves it. A responsibility with no line goes to the RED list (and Section 9 of CANDIDATE_STRATEGY.md for mitigation), never onto the CV as an unevidenced keyword.
2. **Reword every bullet into the JD's vocabulary** where a true equivalent exists ("Blended commercial and customer needs" where the JD says so). The fact, the number and the scope stay exactly as in the master.
3. **Reselect within each entry.** Choose which master bullets (and merges) best prove the mapped responsibilities, within the 11.1 counts.
4. **Fixed:** education and certifications content (order follows track cert priority).

### 11.6 Track-specific CV rules

Read the agent notes at the end of each CV file alongside this section.
- Track A: PM_MASTER_CV.md notes. Gyro Health product decisions and IPAC outcomes lead.
- Track B: POLICY_MASTER_CV.md Track B notes. Thesis, GIZ, Haqdaar governance lead. No commercial metrics.
- Track C: POLICY_MASTER_CV.md Development Sector Variant.
- Track D: TECH_PM_MASTER_CV.md notes for D1, D2, or D3. Triangular moat throughout, continuity rule enforced.
- Track E: PM_MASTER_CV.md with the Track E summary and the E1, E2 or E3 notes. BeamerHeld promoted and listed first under Side Projects.
- Insider-user roles (Section 2): the legal or user-side Key Achievement leads on any track, and the Outsay entry names the professional tools he used where the JD's product is one of them.

### 11.7 CV quick audit
- [ ] [QA] Zero em dashes and en dashes
- [ ] [QA] Product named Gyro Health throughout; no hard-tier lexicon word
- [ ] Headline: one role, JD-aligned skills
- [ ] [QA] Profile Summary: three full sentences, under 55 words, no "I", one metric, every sentence with evidence
- [ ] [QA] Areas of Expertise: built from the Role Brief in the JD's phrases; every term's own word appears in a bullet, Key Achievement or the summary; no RED term; nine terms
- [ ] [QA] Tools line present under Areas of Expertise: confirmed tools only, JD's tools first, no level words, maximum 10
- [ ] Key Achievements: 3-4 items, every one metric-backed, each from a top Role Brief responsibility
- [ ] Every entry reworded into JD vocabulary, facts unchanged; each top responsibility mapped to a line
- [ ] The product's first bullet says what it is, its stage, its users and his ownership
- [ ] [QA] Cold-reader test: no unearned method names
- [ ] [QA] Product 4-5 bullets, IPAC 3-4; each figure at most twice
- [ ] [QA] CMGRS team credit, and the north star never presented as the cause of the 28%
- [ ] [QA] Gyro Health built solo, a tagged build, every engine figure "in simulation"
- [ ] Every bullet: verb, task, metric, under 35 words, maximum two clauses, no bold tags
- [ ] Advisory and internship entries are bullets
- [ ] Dates read "Mon YYYY - Mon YYYY" or "- Present"
- [ ] Side Projects with bold Problem: and Solution: labels
- [ ] [QA] Contact line carries LinkedIn and "Portfolio: vibhor.work" as working links
- [ ] qa_check.py cv passed on the .docx, not only on the draft text
- [ ] Built with cv_template_builder.js v4: 10pt below the header, borderless Areas of Expertise table
- [ ] Under two pages, fold test passed
- [ ] Track cert priority applied; only completed certificates listed

---

## SECTION 12: OUTREACH RULES

### 12.1 Stakeholder logic

| Stakeholder | Goal | Approach | Timing |
|---|---|---|---|
| Recruiter | Get the application flagged | Fit-driven, direct, portfolio linked | Same day |
| Hiring manager | Referral or direct introduction | Specific to their problem, same thesis as the letter | Same day |
| Peers | Relationship first, referral later | No pitch in the first message | Same day, ask only after 2-3 exchanges |

Target five contacts per application: one recruiter, one hiring manager, three peers. Hooks reuse the letter's hook or intelligence finding and thesis (Section 6). The 0.2a lexicon applies to every message (qa_check.py net fails the hard tier).

### 12.2 Finding recruiters
Method 1: the LinkedIn posting often names the recruiter. Method 2 (best): LinkedIn search for job title plus company, filter by Posts. Method 3: company page, People, filter by location, search Recruiter, Talent Acquisition, Talent Partner, People Partner, Recruiting Manager. Message two or three, the wrong one usually redirects.

### 12.3 Recruiter templates

LinkedIn note (280 chars):
```
Hi [Name], I saw the [Job Title] role at [Company] and wanted to reach out
directly. I work in [skill area] and would like to connect and introduce myself.
```

InMail:
```
Hi [Name],

I came across the [Role] opening at [Company] and wanted to reach out directly.
I work in [area] with 5+ years across law, government delivery and product,
most recently [one metric-backed achievement].

What stood out about this role: [one specific non-generic element].

CV attached. Happy to share more or have a short chat.

Vibhor Ahlawat | vibhor.work
```

### 12.4 Hiring manager templates

LinkedIn note (step 1, no pitch):
```
Hi [Name], I came across your profile while reading up on the team at [Company].
I would like to connect and follow what you are building.
```

Follow-up (step 2, after acceptance):
```
Hi [Name], thanks for connecting.

I noticed you are hiring for [Role]. The focus on [specific problem, not from
the JD] stood out. [One sentence of his evidence on that problem, with metric.]

CV attached. Happy to share more or chat briefly if useful. The decision
behind [lead entry] is written up here: [lead entry deep link]

vibhor.work
```

Cold email:
```
Subject: [Role Title] at [Company], Vibhor Ahlawat

Hi [Name],

Saw you are hiring for [Role Title] and wanted to reach out directly.
[The letter's hook or intelligence finding, tied to his evidence in one sentence.]

Three things I would bring:
[JD responsibility 1]: [evidence with metric]
[JD responsibility 2]: [evidence with metric]
[JD responsibility 3]: [evidence with metric]

The call I made on [lead entry decision] is written up here: [lead entry deep link]

Happy to answer questions by email or find 15 minutes.

Vibhor Ahlawat | +49 1622801918 | vibhor.work
```

### 12.5 Peer templates

Never pitch or ask for a referral in the first message.

Same domain:
```
Hi [Name], came across your profile and saw you are working in [domain].
I would like to connect and stay in touch with others in this space.
```

Similar international path:
```
Hi [Name], I noticed you made an international move to [city] too. I am building
my career in [profession] here and would like to connect with someone who has
navigated a similar path.
```

Recently joined:
```
Hi [Name], I saw you recently joined [Company] as [Position], congratulations.
I work in [role] and would like to connect and hear about your experience
when you have a moment.
```

Follow-up after acceptance:
```
Hi [Name], thanks for connecting. I have been following your path at [Company]
and would like to hear how you navigated [specific aspect]. If you are open to
it, would you be up for 15 to 20 minutes in the next few weeks?
```

Referral ask (only after 2-3 exchanges):
```
I applied for the [role] at [company] last week. If you ever feel comfortable
making an intro, I would appreciate it. No pressure at all.
```

### 12.6 Portfolio links

Root: vibhor.work. Deep links: /project/<id> for curo, cmgrs, rasahub, haqdaar and beamerheld; /case-study/<id> for typecast and commonstrace. The product page keeps the /project/curo slug until the site renames it; when it does, update ENTRY_LINKS in qa_check.py and the dossier in the same edit. Never link Umang, and never link a page PORTFOLIO_DOSSIER.md marks as pending correction. Write links without "https://". vibhor.work is the only domain used in any artefact; qa_check.py fails any file carrying vibhor.producthq.workers.dev. The product link is suspended while GYRO_PAGE_LIVE is False in qa_check.py (v12.3, extended in v12.4: the page must also carry the Gyro Health name).

- **Recruiter LinkedIn note (280 characters).** Add the lead entry's deep link only if it fits. If not, drop the link, never the hook.
- **Recruiter InMail.** Root link in the sign-off line.
- **Hiring manager connection note (step 1).** No link.
- **Hiring manager follow-up (step 2) and cold email.** The lead entry's deep link, framed as a decision, plus the root in the sign-off. Never more than two links in one message.
- **Peer notes.** No link in the first message.
- **Follow-ups.** Root link in the sign-off. A deep link only if not already used.

**Live-site figures.** Until the website changes for 28% and 109 residents are live, outreach never quotes those figures next to a deep link to the CMGRS or BeamerHeld page. Until GYRO_PAGE_LIVE is True, outreach does not link the product page at all, and never quotes a Gyro Health engine figure next to any deep link.

### 12.7 Sequencing
No response after 5-7 days, one follow-up per stakeholder, never more. Two-step rule for hiring managers and peers: connect first, ask after acceptance. Work authorisation is stated proactively in recruiter outreach only.

---

## SECTION 13: ATS NOTE

ATS is a database that stores applications, posts jobs, tracks stages, and supports keyword search if a recruiter chooses to use it. It is not an AI that rejects candidates.

The only real automated rejection is the knockout question: sponsorship, location, right to work, salary floor. Rejection within seconds of submitting is almost always this.

The real problem is invisibility, not rejection. Roughly 20% of applicants are ever seen by a human. The answer is a CV that cannot be skimmed past, plus networking into that 20%.

Ignore: keyword-rejection myths, third-party compliance scores, white font tricks, and the belief that silence means algorithmic rejection. Optimise entirely for a human skimming for six seconds. Many screeners now also read for machine-written text (the 0.2a lexicon is the list they flag), so the human-voice rules in Section 0 are part of being seen.

---

## SECTION 14: AMBIGUOUS AND OUTSIDE-TRACK ROLES

For roles that do not map cleanly to a track (strategy associate, chief of staff, business operations, founder's associate, generalist founding roles), the five-track register is a starting point. Run the Section 1 overlap rules first: consumer app, growth, generalist and customer-facing PM roles at non-regulated companies are Track E, not ambiguous.

**Rules:**
1. Pick the closest track for the CV base, then override the register to match the role's own language. Mirror the role title in the letter title line.
2. **Use the full evidence base, including the legal record.** For analytical and strategy roles, appellate litigation (200+ cases at Supreme Court and High Court tier, making submissions in some and assisting senior counsel in others) plus IPAC (1.5M data points collected and coded by a 25-person team under a codebook) is the strongest analytical proof.
3. **Insider-user rule.** Where the product's users are a profession or group he has belonged to, the user-side experience leads (Section 2, Para 1 variant), on any track.
4. **Founder-facing roles** (founder's associate, chief of staff): the why-us comes from the JD's offer (founder proximity, ownership of roadmap or quality, the customer base whose results grade each decision), never from scale. These roles are prime candidates for the evidence-table format (2.5).
5. **Strategy and consulting roles** may use the consulting variant of the Para 2 reason (Section 2).
6. You may make reasonable presentation assumptions, as long as every fact stays true.
7. Suppression tables in Section 10 are track-scoped.
8. Log the improvised positioning in Airtable.

---

## SECTION 15: THE ROLE BRIEF (built in Step 3)

**Why.** The spine, the responsibility mapping, the forward move and the why-us all need the same input: an explicit picture of what this role exists to do and what proves someone can do it. The old GREEN/YELLOW/RED list described gaps and left the drafts with a checklist instead of an argument.

**Guardrail.** The ideal-candidate profile is the scoring rubric, not a target the drafts write toward. The evidence map is honest: a requirement he cannot evidence stays RED and is mitigated per the Standing Approval Policy, never stretched. "Surpassing" the profile comes only from naming the advantage he genuinely has that most applicants will not.

**The six parts** (built internally; the compact form goes on the run card):

1. **The role's job in one sentence.** What a hiring manager would be relieved to have handled. Not the JD summary: the problem underneath it.
2. **Ranked responsibilities.** The top 5-8 duties and must-haves, ranked by what the hiring manager actually screens (CANDIDATE_STRATEGY.md Section 3), not by JD order. Each in the JD's own words.
3. **The ideal candidate.** 4-5 traits, including the unstated screens.
4. **Evidence map.** Each ranked responsibility mapped to the exact CV line or Section 7 evidence item that proves it, rewritten in the JD's vocabulary, rated GREEN (direct), YELLOW (named bridge, CANDIDATE_STRATEGY.md Section 4) or RED (no direct evidence; Section 9 mitigation, or left out).
5. **The unfair advantage.** One line: what he has that most applicants for this role will not (the lawyer who used the product category, an institution that asked for more of his software, a classification call made before code, a release held on measured evidence).
6. **The thesis sentence.** The job (part 1) plus why he has already done a version of it (parts 4-5). This sentence drives Section 2.0.

**Then three letter inputs, from the brief and the research:** the hook (type, and the Story Bank entry, hook note or research source behind it), the format (prose or table, Section 2.5), and the published value for Para 4.

**Downstream use.** Key Achievements come from the top 3-4 responsibilities. Every CV entry is reworded against the evidence map. Para 3 argues the top two or three responsibilities. The Hiring Manager Review (Section 8A) grades the drafts against this brief.
