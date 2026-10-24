/**
 * cl_template_example_data.js
 * Worked examples in the shapes cl_template_builder.js v1.2 expects, written to APPLICATION_RULES.md v12.4.
 * Both companies are fictional ("Northwind"), and so are their published lines and figures (electronics
 * verification, the quoted mission lines, forty thousand bookings a week). Never reuse them. Every fact about
 * Vibhor comes from CANDIDATE_STRATEGY.md v9.4 Sections 5A, 7 and 7A. Replace every sentence for a real application.
 *
 * data (prose letter): Track D2, "Northwind Marketplace", Policy Manager, Trust and Safety.
 *   Hook: H2, a user moment from the company's own market (a seller waiting to learn whether she is believed).
 *   Thesis: marketplace trust policy only holds when the check is independent of the team being checked, and he
 *   has built that kind of check before.
 *   P1 hook, bridge to his evidence by mechanism, capability signal, the role as the meeting point.
 *   P2 arc, one metric, founder disclosure, confession naming what this company has, the reason (why this role).
 *   P3 responsibility, one stated view, the CMGRS decision story with its one deep link, the forward move.
 *   P4 return to P1's words, desire fused with the value the company publishes (why this company), optional
 *   invitation. No question. Two contractions.
 *
 * tableData (evidence-table letter): Track E3, "Northwind Home", Product Manager, Booking.
 *   Hook: H3, Story Bank P3 (the projector booked through a WhatsApp group). Para 3 is { lead, rows, after }.
 *   One contraction.
 *
 * v12.4 (24 Oct 2026): hook types, Gyro Health, few contractions, values close without a question, table example.
 */

const header = {
  name: "Vibhor Ahlawat",
  contact: "Berlin, Germany  ·  +49 1622801918  ·  vibhorahlawat17@gmail.com",
  linkedin: "https://www.linkedin.com/in/vibhorahlawat",
  portfolio: "vibhor.work"
};

const data = {
  header: {
    ...header,
    titleLine: "Technical Product Lead, AI and Data Platforms  |  Google Gen AI Master · IBM AI PM · MPP and LL.B."
  },
  date: "24 October 2026",
  recipient: ["Hiring Team", "Northwind Marketplace", "Berlin"],
  salutation: "Dear Hiring Team,",
  paragraphs: [
    "A seller who lists a used phone on Northwind on a Sunday evening learns by Monday whether the marketplace believes her or the buyer. That verdict holds only when the check is independent of the team being checked. I've built that kind of check before. As project lead on a 3M+ user grievance platform in India, I watched departments close their own cases. We moved closure under central oversight, and average days to case closure fell 28%. Northwind's decision to verify electronics before they ship puts the same principle at the centre of this role. Policy Manager, Trust and Safety is where that work meets millions of listings.",
    "I first met that pattern in court. At Outsay Legal I worked on 200+ cases, making submissions in some, finding where a rule-bound system failed the people inside it. At IPAC I owned post-launch quality monitoring on the app and the phone line, where callers hung up inside the automated menu before their case existed. Gyro Health, the health app I founded, is where I now set rules before any code, such as which data an insurer can never see. It is early stage and pre-revenue, and I have built it myself with AI coding agents. What a one-person team cannot give me is a policy surface that millions of buyers and sellers test every day. I want to write rules at that scale.",
    "The role asks for category policy that operations teams apply the same way every time. Consistency is a design problem before it is a training problem. On Gyro Health I chose a blank patterns page over an unverified pattern, because one false signal costs more trust than a month of silence. On CMGRS the team made the same trade at state scale, taking case closure away from the departments that owned the cases: vibhor.work/project/cmgrs. In this role I'd write each category's policy as one page that reviewers, sellers and engineers read the same way. I would judge it by how often two reviewers disagree on the same case.",
    "An independent check, one rule every reviewer reads the same way, and a measure that shows when the rule is wrong. Northwind says it wants to be \"the marketplace people trust with their second-hand things\", and that is the trust work I want to do next. I would like to talk about how I would run the first policy cycle."
  ],
  signoff: "Warm regards,",
  signature: "Vibhor Ahlawat"
};

const tableData = {
  header: {
    ...header,
    titleLine: "Product Manager  |  Marketplace and Booking Products  |  MPP, Hertie School Berlin"
  },
  date: "24 October 2026",
  recipient: ["Hiring Team", "Northwind Home", "Berlin"],
  salutation: "Dear Hiring Team,",
  paragraphs: [
    "In my Berlin dormitory, 109 residents shared one projector and booked it through a WhatsApp group. Double bookings happened most weeks, and when the first booking app asked people to sign up, they went straight back to the chat. I built the version they stayed with: no login, just a name and a room number. Northwind's customers make the same choice whenever a booking flow asks one question too many before a cleaner is confirmed. Product Manager, Booking is the job of removing that question for a whole city.",
    "Every product I've worked on started from the same question: where people drop out, and what they do instead. At IPAC it ran across a 3M+ user grievance platform, where the team rebuilt the requirements around central oversight and average days to case closure fell 28%. Gyro Health, the health app I founded, is early stage and pre-revenue, and I have built it myself with AI coding agents. What a pre-launch product cannot give me is traffic: enough bookings to run an experiment and trust the result. Northwind has forty thousand a week. That is the volume I want to decide with.",
    {
      lead: "Each screen in the role has an example behind it.",
      rows: [
        ["Adoption and rollout", "Took a state programme from 0% to 25% uptake in 6 months across 15,004 centres."],
        ["Operational data quality", "Directed a 25-person team coding 1.5M survey answers, kept consistent by a codebook, a pilot batch and spot-checks."],
        ["Decisions before data", "Wrote pass thresholds for 13 experiments and 3 kill criteria before any patient joins the planned Gyro Health pilot."]
      ],
      after: "The dormitory app's decision is at vibhor.work/project/beamerheld: I cut login and profile pages instead of adding features. In this role I would cut one step at a time from Northwind's booking flow and judge each cut by completed bookings per visit."
    },
    "No login, one less question, a booking that sticks. Northwind says it exists \"so a booked job is a done job\", and that is the promise I want to help keep. I would like to talk about how I would run the first quarter."
  ],
  signoff: "Warm regards,",
  signature: "Vibhor Ahlawat"
};

module.exports = { data, tableData };
