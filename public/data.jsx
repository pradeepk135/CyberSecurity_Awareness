// =====================================================
// Data: modules, lessons, quiz questions, team
// =====================================================

const MODULES = [
  {
    id: 1,
    code: "01",
    title: "Why Security Matters",
    summary: "How everyday actions protect the company, our customers, and you personally.",
    duration: 12,
    chapters: [
      { id: "1.1", title: "The cost of a breach",  duration: "3:24", videoUrl: "/videos/video-01.mp4" },
      { id: "1.2", title: "Your role in the chain", duration: "4:10", videoUrl: "/videos/video-02.mp4" },
      { id: "1.3", title: "Regulatory context",     duration: "4:26", videoUrl: "/videos/video-03.mp4" },
    ],
    transcript: [
      { t: "0:00", text: "Welcome to the Synersys Security Awareness Training Program. This first module sets the foundation for everything that follows." },
      { t: "0:18", text: "Cybersecurity is not a problem reserved for the IT department. Every employee, regardless of role, handles information that, if mishandled, can cause material harm to the organisation." },
      { t: "0:42", text: "In the last year alone, the average cost of a data breach reached 4.88 million USD, with the majority of incidents originating from human factors — not technical exploits." },
      { t: "1:05", text: "By the end of this module you will understand the basic threat landscape, your responsibilities under company policy, and the regulatory frameworks that govern our work." },
      { t: "1:32", text: "Let's begin." },
    ],
    knowledgeCheck: [
      {
        q: "Cybersecurity is primarily the responsibility of:",
        choices: ["The IT department only", "Senior leadership", "Every employee who handles company information", "External vendors"],
        answer: 2,
        explain: "Cybersecurity is a shared responsibility. The majority of incidents start from routine human actions, not technical exploits.",
      },
      {
        q: "Roughly what proportion of breaches involve a human element?",
        choices: ["Less than 10%", "Around 25%", "Around 50%", "The majority"],
        answer: 3,
        explain: "Industry reporting consistently places the human element in the majority of incidents — phishing, misdelivery, credentials, and configuration errors.",
      },
      {
        q: "Which statement best describes the purpose of this training?",
        choices: [
          "To replace technical security controls",
          "To meet a regulatory check-box only",
          "To equip every employee to recognise and respond to risk",
          "To assign blame after incidents",
        ],
        answer: 2,
        explain: "Training complements technical controls; it does not replace them. Its purpose is preparedness, not blame.",
      },
    ],
  },
  {
    id: 2,
    code: "02",
    title: "Company Policies",
    summary: "Acceptable use, data classification, and the policies you must acknowledge each year.",
    duration: 14,
    chapters: [
      { id: "2.1", title: "Acceptable Use Policy", duration: "4:12" },
      { id: "2.2", title: "Data classification levels", duration: "5:01" },
      { id: "2.3", title: "Reporting obligations", duration: "4:30" },
    ],
    knowledgeCheck: [
      {
        q: "Information classified as Restricted may be:",
        choices: ["Shared internally without restriction", "Forwarded to personal email if encrypted", "Shared only with named recipients on a need-to-know basis", "Posted on internal collaboration platforms"],
        answer: 2,
        explain: "Restricted data is the highest sensitivity tier. Distribution is limited to specifically named, business-justified recipients.",
      },
      {
        q: "If you are unsure how to classify a document you are creating, you should:",
        choices: ["Default to Public", "Default to the most restrictive plausible level and consult your manager", "Skip classification", "Ask the recipient"],
        answer: 1,
        explain: "When in doubt, classify up. You can always relax classification later with approval; you cannot un-leak data.",
      },
    ],
  },
  {
    id: 3,
    code: "03",
    title: "Passwords and Account Security",
    summary: "Strong passphrases, MFA, password managers, and account hygiene.",
    duration: 11,
    chapters: [
      { id: "3.1", title: "Anatomy of a strong passphrase", duration: "3:40" },
      { id: "3.2", title: "Multi-factor authentication", duration: "3:55" },
      { id: "3.3", title: "Using the company password manager", duration: "3:25" },
    ],
    knowledgeCheck: [
      {
        q: "Which of these is the strongest password practice?",
        choices: ["A 10-character password reused across sites", "A long, unique passphrase stored in the company password manager, with MFA", "A short complex password rotated weekly", "Saving passwords in a browser on a shared device"],
        answer: 1,
        explain: "Length and uniqueness beat complexity. A password manager plus MFA is the company standard.",
      },
      {
        q: "If you suspect a password has been exposed, you should:",
        choices: ["Wait for IT to notice", "Change it the next time you log in", "Change it immediately and report the suspected exposure", "Add a digit at the end"],
        answer: 2,
        explain: "Treat suspected exposure as confirmed. Change the credential and report so we can review related access.",
      },
    ],
  },
  {
    id: 4,
    code: "04",
    title: "Protecting Data",
    summary: "Handling, storing, transmitting, and destroying company information safely.",
    duration: 13,
    chapters: [
      { id: "4.1", title: "Handling and storage", duration: "4:50" },
      { id: "4.2", title: "Safe transmission", duration: "4:00" },
      { id: "4.3", title: "Secure destruction", duration: "4:10" },
    ],
    knowledgeCheck: [
      {
        q: "A colleague asks you to send a customer list to their personal Gmail to 'work on it from home'. You should:",
        choices: ["Send it — they have a legitimate reason", "Send it but password-protect the file", "Decline and direct them to approved remote access", "Send a redacted version"],
        answer: 2,
        explain: "Customer data may not leave sanctioned systems. Approved remote access is the only correct route.",
      },
    ],
  },
  {
    id: 5,
    code: "05",
    title: "Online Threats and Phishing",
    summary: "Recognising phishing, smishing, vishing, and social engineering tactics.",
    duration: 16,
    chapters: [
      { id: "5.1", title: "Anatomy of a phishing email", duration: "5:30" },
      { id: "5.2", title: "Smishing and vishing", duration: "5:00" },
      { id: "5.3", title: "Reporting suspicious messages", duration: "5:30" },
    ],
    knowledgeCheck: [
      {
        q: "Which signal is most reliable for spotting a phishing email?",
        choices: [
          "The sender display name appears familiar",
          "The email is well-written with no typos",
          "An unusual request paired with urgency or a mismatched link domain",
          "The message contains the company logo",
        ],
        answer: 2,
        explain: "Display names, formatting, and logos are trivial to spoof. Unusual requests, urgency, and domain mismatches are the high-signal cues.",
      },
      {
        q: "You receive an unexpected SMS asking you to confirm a delivery via a shortened link. You should:",
        choices: ["Tap the link to check", "Reply STOP", "Delete the message and report it via the Report Phish channel", "Forward it to colleagues to warn them"],
        answer: 2,
        explain: "Do not interact. Report via the dedicated channel so the security team can block the campaign at the perimeter.",
      },
    ],
  },
  {
    id: 6,
    code: "06",
    title: "Device and Network Safety",
    summary: "Endpoint hygiene, public Wi-Fi, VPN use, and updates.",
    duration: 10,
    chapters: [
      { id: "6.1", title: "Endpoint basics", duration: "3:30" },
      { id: "6.2", title: "Public Wi-Fi and VPN", duration: "3:20" },
      { id: "6.3", title: "Patching and updates", duration: "3:10" },
    ],
    knowledgeCheck: [
      {
        q: "When working from a café, which is required?",
        choices: ["Nothing extra — the café Wi-Fi is fine", "Connect via the company VPN before accessing any internal system", "Use a personal hotspot instead", "Avoid all email"],
        answer: 1,
        explain: "VPN use is mandatory whenever you are off the corporate network and accessing internal resources.",
      },
    ],
  },
  {
    id: 7,
    code: "07",
    title: "Physical Security",
    summary: "Tailgating, clean desk, badge use, and the security of printed material.",
    duration: 9,
    chapters: [
      { id: "7.1", title: "Tailgating and badge discipline", duration: "3:00" },
      { id: "7.2", title: "Clean desk policy", duration: "3:00" },
      { id: "7.3", title: "Printers and physical media", duration: "3:00" },
    ],
    knowledgeCheck: [
      {
        q: "Someone in business attire asks you to hold the door because they 'forgot their badge'. You should:",
        choices: ["Hold it — they look like a colleague", "Politely decline and direct them to reception", "Hold it but ask their name", "Ignore them"],
        answer: 1,
        explain: "Tailgating bypasses every other access control we have. Always direct unbadged visitors to reception, regardless of appearance.",
      },
    ],
  },
  {
    id: 8,
    code: "08",
    title: "Reporting and Staying Trained",
    summary: "How to report incidents, near-misses, and stay current between annual cycles.",
    duration: 8,
    chapters: [
      { id: "8.1", title: "What to report", duration: "2:40" },
      { id: "8.2", title: "How to report", duration: "2:40" },
      { id: "8.3", title: "Staying current", duration: "2:40" },
    ],
    knowledgeCheck: [
      {
        q: "You clicked a link in what now looks like a phishing email but didn't enter credentials. You should:",
        choices: ["Do nothing — no harm done", "Mention it to a colleague", "Report it immediately so the security team can investigate", "Delete the email and clear browser history"],
        answer: 2,
        explain: "Even a click can trigger payloads or beaconing. Report immediately, every time, without exception.",
      },
    ],
  },
];

// Final assessment — 10 questions sampled across modules
const ASSESSMENT_QUESTIONS = [
  {
    q: "Which of the following best describes the company's stance on cybersecurity responsibility?",
    choices: [
      "It is solely the responsibility of the IT and Security teams.",
      "It is shared across all employees, regardless of role or seniority.",
      "It applies only to staff who handle customer data.",
      "It is an executive-level concern only.",
    ],
    answer: 1,
  },
  {
    q: "Restricted data may be shared:",
    choices: [
      "With anyone inside the organisation",
      "Only with named recipients on a need-to-know basis",
      "Externally if password-protected",
      "Via personal email if encrypted",
    ],
    answer: 1,
  },
  {
    q: "Which is the strongest authentication practice?",
    choices: [
      "A 10-character password reused across services",
      "A short complex password rotated weekly",
      "A long unique passphrase stored in the password manager, plus MFA",
      "Browser-saved passwords on a shared device",
    ],
    answer: 2,
  },
  {
    q: "A colleague asks you to send a customer list to their personal Gmail. The correct action is to:",
    choices: [
      "Send it — they have a legitimate business reason",
      "Send a password-protected version",
      "Decline and direct them to approved remote access",
      "Send a redacted subset",
    ],
    answer: 2,
  },
  {
    q: "The most reliable indicator of a phishing email is:",
    choices: [
      "Spelling and grammar errors",
      "An unfamiliar sender",
      "An unusual request paired with urgency or mismatched link domains",
      "Lack of a corporate logo",
    ],
    answer: 2,
  },
  {
    q: "When working from a public network, you must:",
    choices: [
      "Use the corporate VPN before accessing any internal system",
      "Use any available Wi-Fi if the venue is reputable",
      "Disable MFA to speed up sign-in",
      "Use a colleague's personal hotspot",
    ],
    answer: 0,
  },
  {
    q: "Someone without a visible badge asks you to hold a secure door. You should:",
    choices: [
      "Hold the door — they look like a colleague",
      "Hold it and ask for their name",
      "Politely decline and direct them to reception",
      "Ignore the request",
    ],
    answer: 2,
  },
  {
    q: "You suspect, but are not certain, that a password has been exposed. You should:",
    choices: [
      "Change it during your next routine sign-in",
      "Append a digit and continue using it",
      "Wait for IT to detect any misuse",
      "Change it immediately and report the suspected exposure",
    ],
    answer: 3,
  },
  {
    q: "You clicked a link in what turns out to be a phishing email, but did not enter credentials. You should:",
    choices: [
      "Take no further action since no credentials were submitted",
      "Mention it informally to a colleague",
      "Report the incident immediately through the official channel",
      "Clear your browser history and move on",
    ],
    answer: 2,
  },
  {
    q: "If you are unsure how to classify a document you are creating, you should:",
    choices: [
      "Default to Public",
      "Default to the most restrictive plausible level and consult your manager",
      "Leave it unclassified",
      "Ask the eventual recipient to decide",
    ],
    answer: 1,
  },
];

// Simulated team for manager view
const TEAM = [
  { name: "Pradeep K",       role: "Administrator",    progress: 100, status: "Complete",    score: 95,   started: "Apr 28", due: "May 14", modulesCompleted: 8, email: "pradeep.k@zentiti.com" },
  { name: "Amelia Carter",   role: "Senior Analyst",   progress: 100, status: "Complete",    score: 92,   started: "Apr 28", due: "May 14", modulesCompleted: 8, email: "a.carter@zentiti.com" },
  { name: "Jonas Beck",      role: "Operations Lead",  progress: 100, status: "Complete",    score: 88,   started: "Apr 28", due: "May 14", modulesCompleted: 8, email: "j.beck@zentiti.com" },
  { name: "Priya Raman",     role: "Account Manager",  progress: 75,  status: "In progress", score: null, started: "Apr 29", due: "May 14", modulesCompleted: 6, email: "p.raman@zentiti.com" },
  { name: "Marcus Lindqvist",role: "Engineer II",      progress: 62,  status: "In progress", score: null, started: "Apr 29", due: "May 14", modulesCompleted: 5, email: "m.lindqvist@zentiti.com" },
  { name: "Sara Okonkwo",    role: "Engineer I",       progress: 38,  status: "In progress", score: null, started: "Apr 30", due: "May 14", modulesCompleted: 3, email: "s.okonkwo@zentiti.com" },
  { name: "Daniel Vogel",    role: "Customer Success", progress: 25,  status: "In progress", score: null, started: "Apr 30", due: "May 14", modulesCompleted: 2, email: "d.vogel@zentiti.com" },
  { name: "Hina Patel",      role: "Finance Analyst",  progress: 12,  status: "Started",     score: null, started: "Apr 30", due: "May 14", modulesCompleted: 1, email: "h.patel@zentiti.com" },
  { name: "Robert Hassan",   role: "Account Executive",progress: 0,   status: "Not started", score: null, started: null,     due: "May 14", modulesCompleted: 0, email: "r.hassan@zentiti.com" },
  { name: "Yui Tanaka",      role: "Designer",         progress: 0,   status: "Not started", score: null, started: null,     due: "May 14", modulesCompleted: 0, email: "y.tanaka@zentiti.com" },
];

Object.assign(window, { MODULES, ASSESSMENT_QUESTIONS, TEAM });
