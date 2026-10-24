/**
 * cv_template_example_data.js
 * Worked example in the shape cv_template_builder.js v4.2 expects, built from the TECH_PM_MASTER_CV.md v14 defaults
 * for an illustrative Track D2 trust and safety policy role. Copy this structure per application and rework every
 * entry against the Role Brief responsibility map (APPLICATION_RULES.md v12.4, Sections 11.5 and 15).
 * This file shows the SHAPE. Every fact in a real application comes from the master CVs, CANDIDATE_STRATEGY.md
 * Section 5A and CURO_UPDATE_2026-10-21.md Section 2, never from this example.
 *
 * v12.4 reminders (24 Oct 2026):
 *  - the product is Gyro Health in every artefact; the old name never appears and no CV mentions a rename
 *  - Gyro Health is built solo with AI coding agents; a tagged MVP, never "shipped"; every engine figure "in simulation"
 *  - IPAC 28% is average days from registration to case closure
 *  - summary: three full sentences, max 55 words, no "I", one metric (the "5+ years" span does not count)
 *  - every experience entry is bulleted; product 4-5 bullets, IPAC 3-4, each figure used at most twice
 *  - dates "Mon YYYY - Mon YYYY" (the builder also normalises " to ")
 *  - side projects: `problem` and `solution`; heading defaults to "SIDE PROJECTS"
 *  - no hard-tier AI-isms (APPLICATION_RULES.md 0.2a): Led, Used, Ran, never spearheaded, leveraged, utilised
 */

const data = {
  header: {
    name: "Vibhor Ahlawat",
    titleLine: "Policy Manager  |  Trust and Safety  |  Marketplace Integrity",
    contact: "Berlin, DE  ·  +49 1622801918  ·  vibhorahlawat17@gmail.com",
    linkedin: "https://www.linkedin.com/in/vibhorahlawat",
    portfolio: "vibhor.work",
    languages: "English (C2)  ·  German (A2, working towards B1)  ·  Hindi (C2)  ·  French (B1)"
  },

  summary: "Policy lead who turns rules into checks a platform can enforce, with 5+ years across law, government delivery and product. Project lead on a 3M+ user grievance platform where average days to closure fell 28% after the team put closure under independent oversight. Leads Gyro Health, setting its data and safety rules before code.",

  // Areas of Expertise (APPLICATION_RULES.md 11.3a): the JD's phrases for the responsibilities he can evidence, nine terms,
  // each echoed by a word in a bullet, Key Achievement or the summary. RED terms are never listed.
  areasOfExpertise: [
    ["Policy Design and Oversight", "Regulatory Compliance (EU AI Act, DPDP Act, GDPR)", "Cross-Functional Leadership"],
    ["Policy Operations and Quality Monitoring", "Stakeholder Alignment", "User Research and Discovery"],
    ["Data Analysis (SQL, Python, R)", "Policy Research and Analysis", "Prioritisation and Release Decisions"]
  ],

  // Tools line (11.3b): confirmed tools only (CANDIDATE_STRATEGY.md Section 9B), the JD's named tools first, maximum 10.
  tools: ["Jira", "SQL", "Notion", "Miro"],

  keyAchievements: [
    { label: "Independent oversight at scale:", text: "As project lead on a failing 3M+ user government platform, aligned engineering, UX and policy while the team moved case closure under central oversight; average days to closure fell 28%." },
    { label: "Rules held to measured evidence:", text: "Built Gyro Health solo with AI coding agents and held its AI feature from release until false patterns fell from 68% to 3% in simulation." },
    { label: "Privacy rules as product features:", text: "Enforced the Insurance Firewall at the database and set 6 separate consents and 9 kill switches, with India-only data storage specified." },
    { label: "Adoption across a large network:", text: "Drove programme adoption from 0% to 25% in 6 months across 15,004 delivery centres by building around the access infrastructure users actually had." }
  ],

  experience: [
    {
      org: "Gyro Health, Care Companion for Long-Term Conditions",
      location: "Berlin, DE",
      role: "Technical Product Lead and Founder",
      dates: "Feb 2026 - Present",
      bullets: [
        "Leads product on Gyro Health, a pre-launch app that helps people with epilepsy and migraine in India log episodes and bring a one-page report to their doctor, owning discovery, roadmap and the regulatory path.",
        "Graded validation findings on an S0-S4 severity scale and blocked release on four S1 findings, after rejecting a shortcut that leaked 33-67% false patterns in simulation.",
        "Locked the intended-use boundary (no diagnosis, prediction or medicine advice), enforced by a rule-based output filter that fails closed; the assistant is designed to answer only from reviewed, cited cards.",
        "Built the Insurance Firewall, a database rule keeping health data from insurer-facing features, and a mandatory AI-disclosure label on every AI-written answer, aligned to EU AI Act Article 50.",
        "Specified six separate consents and nine kill switches for AI and data features, with India-only data storage and processing under the DPDP Act."
      ]
    },
    {
      org: "Independent Advisory Practice, Data Protection and Technology",
      location: "Remote, IN and EU",
      role: "Independent Advisor",
      dates: "Nov 2023 - Present",
      bullets: [
        "Advises 30+ technology companies and law firms across Indian and EU markets on data protection, technology contracts and cross-border market entry.",
        "Advises Indian technology companies operating in the EU on what GDPR requires in practice."
      ]
    },
    {
      org: "Indian Political Action Committee (IPAC) Consulting Pvt. Ltd.",
      location: "Hyderabad, IN",
      role: "Consultant and Project Lead, Public Sector",
      dates: "Jan 2022 - Apr 2023",
      bullets: [
        "As project lead on a state grievance-redressal platform, coordinated cross-functional engineering, UX and policy stakeholders while the team routed case closure away from the departments that owned the cases to a central oversight layer.",
        "Owned post-launch quality monitoring on the mobile app and IVR channels, where the team added multi-language support and fast-tracked callers to a human after drop-off appeared before case registration.",
        "Directed a 25-person research team to collect and code 1.5M survey data points, holding consistency with a codebook, training workshops, a pilot batch and spot-checks; the analysis set product priorities."
      ]
    },
    {
      org: "Outsay Legal, Advocates and Consultants",
      location: "New Delhi, IN",
      role: "Legal Associate, Constitutional Law and Public Policy",
      dates: "Jun 2019 - Aug 2021",
      bullets: [
        "Researched and prepared 200+ cases before the Supreme Court of India, the Delhi High Court and tribunals, making submissions in some and assisting senior counsel in others.",
        "Drafted 14 advisory reports translating data protection and environmental legislation into data governance frameworks adopted by state committees."
      ]
    },
    {
      org: "Khaitan & Co. | Shardul Amarchand Mangaldas & Co. | 4 Further Legal Practices",
      location: "New Delhi, IN",
      role: "Legal Intern, Compliance, Corporate Law, Policy and Litigation",
      dates: "Aug 2018 - Nov 2018",
      bullets: [
        "Completed 6 legal internships across compliance, corporate law, policy and litigation, including case-law research and dispute-resolution support at Khaitan & Co.",
        "Delivered policy advisory on government service delivery at SAM & Co., alongside 4 placements across state prosecution and private litigation."
      ]
    }
  ],

  productsBuilt: [
    {
      org: "Beamer Held, Dormitory Booking System",
      location: "Berlin, DE",
      role: "Solo Build, Theologisches Konvikt Berlin",
      dates: "Mar 2025 - Sep 2025",
      problem: "109 residents were booking a shared projector over WhatsApp, causing weekly double-bookings and lost inventory.",
      solution: "Shipped a mobile-first booking web app with conflict detection and no login, which replaced the group chat; dorm leadership then requested a rollout across 4 offices, now in build."
    },
    {
      org: "Haqdaar v1, AI Legal Rights Assistant",
      location: "India / Cloud",
      role: "Solo Build, Google Gen AI Academy APAC, Track 1",
      dates: "Apr 2026",
      problem: "India's 12M+ gig workers gained legal rights under the Code on Social Security 2020 with no accessible way to act on them.",
      solution: "Built an AI legal assistant that answers only from verified legal sources and refers everything else to a legal helpline, live on a public API. Now narrowing to cheque bounce and tenancy disputes routed to Lok Adalats."
    }
  ],

  certifications: [
    { label: "AI Product Management", text: "Professional Certificate, IBM", year: 2026 },
    { label: "Google Cloud Gen AI Master", text: "Certificate, Google Academy APAC", year: 2026 },
    { label: "Product Analytics", text: "Certification, Product School and Mixpanel", year: 2026 },
    { label: "Advanced SQL,", text: "Kaggle Learn (Google) and HackerRank", year: 2025 },
    { label: "Certificate in Digital Governance,", text: "Hertie School Berlin", year: 2026 }
  ],

  education: [
    {
      org: "Hertie School",
      location: "Berlin, DE",
      degree: "Master of Public Policy (MPP)",
      dates: "Sep 2023 - May 2026",
      extraLines: [
        "Specialisation: AI Governance and Digital Transformation; Management and Organisation.",
        "Thesis: “From Guarantee to Guardrail: Measuring How India's AI Governance Framework Operationalising Constitutional Equality”, a 15-indicator evaluation framework across EU and Indian regulatory contexts."
      ]
    },
    {
      org: "Faculty of Law, University of Delhi",
      location: "New Delhi, IN",
      degree: "Bachelor of Laws (LL.B.)",
      dates: "Aug 2016 - Jun 2019"
    },
    {
      org: "Shaheed Bhagat Singh College, University of Delhi",
      location: "New Delhi, IN",
      degree: "Bachelor of Arts (Hons), Political Science",
      dates: "Aug 2013 - Jun 2016"
    }
  ]
};

module.exports = { data };
