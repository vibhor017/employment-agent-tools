const data = {
  header: {
    name: "Vibhor Ahlawat",
    titleLine: "Trust and Safety Product Manager  |  AI Guardrails and Safety Testing  |  Legal Requirements to Product",
    contact: "Berlin, DE  ·  +49 1622801918  ·  vibhorahlawat17@gmail.com",
    linkedin: "https://www.linkedin.com/in/vibhorahlawat",
    portfolio: "vibhor.work",
    languages: "English (C2)  ·  German (A2, working towards B1)  ·  Hindi (C2)  ·  French (B1)"
  },

  summary: "AI safety product manager who turns legal and safety requirements into acceptance criteria, with 5+ years across law, government delivery and product. Held an AI feature from release until false patterns fell from 68% to 3% in simulation. Built Gyro Health's fail-closed output filter and an AI-disclosure label aligned to the EU AI Act.",

  areasOfExpertise: [
    ["Safety and Legal Product Requirements", "Moderation Rules and Thresholds", "AI Guardrails"],
    ["Adversarial Testing and Release Gates", "Regulatory Compliance (EU AI Act, DPDP Act, GDPR)", "Acceptance Criteria"],
    ["Safety Monitoring and Quality Assurance", "Risk Assessment", "Cross-Functional Delivery"]
  ],

  tools: ["Claude Code", "Cursor", "Vertex AI", "Gemini", "AWS Bedrock", "Supabase", "SQL", "Python", "Jira", "Notion"],

  keyAchievements: [
    { label: "Legal requirements as engineering rules:", text: "Locked 2 of 38 product decisions as rules (the intended-use boundary and the Insurance Firewall), with 6 consents, 9 kill switches and India-only storage specified under the DPDP Act." },
    { label: "Detection thresholds tested against ground truth:", text: "Built an evaluation harness showing autocorrelated data broke the pattern engine's significance test, then rebuilt the test to cut false positives from 19.5% to 1.0% in simulation." },
    { label: "Adversarial findings held to closure:", text: "Assessed AI validation findings by risk on an S0-S4 severity scale; 4 top-severity (S1) findings blocked release until each was fixed." },
    { label: "Quality monitoring at population scale:", text: "As project lead on a 3M+ user state grievance platform, owned post-launch quality monitoring while the team moved case closure under independent central oversight; average days to closure fell 28%." }
  ],

  experience: [
    {
      org: "Gyro Health, Care Companion for Long-Term Conditions",
      location: "Berlin, DE",
      role: "Technical Product Lead and Founder",
      dates: "Feb 2026 - Present",
      bullets: [
        "Leads product on Gyro Health, a pre-launch AI care companion for people with epilepsy and migraine in India, owning discovery, safety requirements, the regulatory path and the pattern engine, built solo with AI coding agents.",
        "Wrote acceptance criteria for the pattern engine before any user data (targets: at most 5% false findings, at least 60% detection), then rejected a shortcut that measured 33-67% false patterns in simulation.",
        "Made AI guardrails structural: outputs with no free-text field, and a fail-closed moderation filter on AI-written answers, hardened against adversarial evasion (zero-width and homoglyph characters) and proven by a live stub.",
        "Reviewed the AI assistant for foreseeable misuse before build, rejecting live web retrieval as a prompt-injection channel and limiting answers to reviewed, cited cards in Hindi and English.",
        "Made an AI-disclosure label mandatory for every AI-written answer, aligned to EU AI Act Article 50, and set a red-team release gate (target): 100 prompts per language per condition, zero escapes."
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
        "As project lead on a 3M+ user state grievance platform, coordinated cross-functional delivery across engineering, UX and policy while the team rebuilt requirements around independent oversight of case closure.",
        "Owned post-launch quality monitoring on the mobile app and IVR channels; when drop-off appeared before case registration, the team added multi-language support and fast-tracked callers to a human.",
        "Directed a 25-person research team to collect and code 1.5M survey data points, with data quality held by a codebook, training workshops, a pilot batch and spot-checks; the analysis set roadmap priorities."
      ]
    },
    {
      org: "Outsay Legal, Advocates and Consultants",
      location: "New Delhi, IN",
      role: "Legal Associate, Constitutional Law and Public Policy",
      dates: "Jun 2019 - Aug 2021",
      bullets: [
        "Researched and prepared 200+ cases before the Supreme Court of India, the Delhi High Court and tribunals, making submissions in some and assisting senior counsel in others, isolating procedural edge cases.",
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
      org: "Haqdaar v1, AI Legal Rights Assistant",
      location: "India / Cloud",
      role: "Solo Build, Google Gen AI Academy APAC, Track 1",
      dates: "Apr 2026",
      problem: "India's 12M+ gig workers gained legal rights under the Code on Social Security 2020 with no accessible way to act on them.",
      solution: "Built an AI legal assistant that answers only from verified legal sources and refers everything else to a legal helpline, live on a public API (Google ADK, Gemini). Now narrowing to Lok Adalat dispute routing."
    },
    {
      org: "Beamer Held, Dormitory Booking System",
      location: "Berlin, DE",
      role: "Solo Build, Theologisches Konvikt Berlin",
      dates: "Mar 2025 - Sep 2025",
      problem: "109 residents were booking a shared projector over WhatsApp, causing weekly double-bookings and lost inventory.",
      solution: "Shipped a mobile-first booking web app with conflict detection and no login, which replaced the group chat; dorm leadership then requested a rollout across 4 offices, now a separate build in progress."
    }
  ],

  certifications: [
    { label: "AI Product Management", text: "Professional Certificate, IBM", year: 2026 },
    { label: "Google Cloud Gen AI Master", text: "Certificate, Google Academy APAC", year: 2026 },
    { label: "Product Analytics", text: "Certification, Product School and Mixpanel", year: 2026 },
    { label: "Machine Learning Specialization", text: "(Andrew Ng), DeepLearning.AI", year: 2025 },
    { label: "Advanced SQL,", text: "Kaggle Learn (Google) and HackerRank", year: 2025 },
    { label: "Certificate in Digital Governance,", text: "Hertie School Berlin", year: 2026 }
  ],

  education: [
    {
      org: "Hertie School", location: "Berlin, DE", degree: "Master of Public Policy (MPP)", dates: "Sep 2023 - May 2026",
      extraLines: [
        "Specialisation: AI Governance and Digital Transformation; Management and Organisation.",
        "Thesis: “From Guarantee to Guardrail: Measuring How India's AI Governance Framework Operationalising Constitutional Equality”, a 15-indicator evaluation framework across EU and Indian regulatory contexts."
      ]
    },
    { org: "Faculty of Law, University of Delhi", location: "New Delhi, IN", degree: "Bachelor of Laws (LL.B.)", dates: "Aug 2016 - Jun 2019" },
    { org: "Shaheed Bhagat Singh College, University of Delhi", location: "New Delhi, IN", degree: "Bachelor of Arts (Hons), Political Science", dates: "Aug 2013 - Jun 2016" }
  ]
};
module.exports = { data };
