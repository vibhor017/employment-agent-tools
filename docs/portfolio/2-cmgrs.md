<!-- portfolio entry file, split verbatim from PORTFOLIO_ENTRIES.md v8.1 on 30 October 2026. Honesty rules and routing: PORTFOLIO_DOSSIER.md -->
## 2. CMGRS (Chief Minister's Grievance Redressal System)

### At a glance
- **Role:** Consultant and Project Lead, IPAC. Client: Government of Andhra Pradesh
- **Period:** 2022 to 2023
- **Type:** Government digital delivery, public sector, India
- **Product:** PGRS portal · Spandana · Jaganannaku Chebudam helpline (1902)
- **Scale:** 3M+ citizens
- **Status:** Delivered. **The only entry with measured outcomes at scale**

### The problem
Resolution did not depend on how serious a case was. It depended on which
department picked it up and how motivated that department's local office was to
close it. Multi-department cases had no single owner, so turnaround times and
leakages were an accountability problem, not a volume problem. Separately, a
large share of citizens were dropping off inside an automated IVR flow before
their case was ever registered, so fixing accountability alone would not have
mattered.

### Measured outcomes
- **3M+ citizens served**
- **28% reduction in average days from registration to case closure** (the live site still reads 30% until WEBSITE_CHANGES.md ships)

**How the 28% was measured (for interviews and any measurement-heavy role).** Average days from registration to
closure over the six months after relaunch, against the six months before, from internal performance monitoring
while he was on the project. Before the rebuild, "closure" meant the owning department marking its own case closed;
after it, closure ran through central oversight. The definition tightened in the same window, so the two periods are
not measured on identical terms, and the tighter definition would, if anything, lengthen recorded times. State this
proactively when asked; it is a before-and-after comparison, not a causal estimate.

### What the team did, and what was owned
The site credits the requirements rebuild, the central routing of registration and escalation, and the sprint
restructure to the team. The candidate's own ownership is the project-lead role and post-launch quality
monitoring on both channels.

**Diagnosing the ghost-closure problem.** Cases were marked resolved by the same
department that owned them, with no independent check on whether the citizen's
issue was actually fixed. Requirements were rebuilt from first principles rather
than patching the existing workflow, starting from the gap between what the
system reported (closed cases) and what was happening (unresolved grievances
marked closed).

**Centralising accountability.** Registration and escalation were routed through
a central state oversight layer, making local departments accountable to an
independent body instead of self-certifying closures.

**Redefining what success meant.** Sprint ownership was restructured across
engineering, UX and policy around a single north star: citizen satisfaction on
resolution, paired with turnaround time, replacing closure count as the metric
the system optimised for. A team decision, told as a decision and never as the cause of the 28%.

**Building and iterating on multi-modal access.** Two access channels were built,
a mobile app and an IVR system, with post-launch quality monitoring owned on
both. Multi-language support was introduced and the flow restructured to
fast-track callers to a human representative instead of routing them through the
full automated sequence.

### What this demonstrated
- Diagnosing systemic failure rather than surface symptoms: the visible problem was slow resolution; the real problem was a metric that let departments hide non-resolution
- Redesigning accountability structures, not just workflows: centralising oversight at state level was a governance change made through product decisions
- Operating across engineering, UX and policy simultaneously, around one shared metric
- Treating access as a product problem: reading IVR dropoff data and acting on it is the same instinct as the ghost-closure diagnosis

### Skills evidenced
Public-sector delivery at population scale · systemic diagnosis · metric redesign
· governance through product · cross-functional leadership across three functions
· multi-modal and multi-language access design · post-launch quality monitoring

### Lead with this when
The role is GovTech, civic tech, public service delivery, trust and safety policy, or any position where
demonstrated scale or independent oversight matters more than recency. Also the strongest proof of
cross-functional work.

### Related IPAC work, CV-only (no page)
The 25-person research team that collected and coded 1.5M state-wide survey data points, with consistency held by
a codebook, training sessions and workshops, a pilot batch and spot-checks of samples; its service-gap analysis set
roadmap and product priorities. No agreement statistic was computed. Strongest for evaluation, annotation, research
operations and Track C roles (CANDIDATE_STRATEGY.md Section 7, item 21).

### Confidentiality boundary
CMGRS is a publicly documented state programme. Scale, the accountability problem
and the redesign approach are all discussable. Internal system architecture,
dashboards and department-level performance data are not public and are not shown
on the site. The site credits the team at role level, "an engineering, UX and policy team across IPAC and the
Government of Andhra Pradesh"; named individuals remain open pending permission.

---
