import { Meeting } from "@/types/meeting";

export const meetings: Meeting[] = [
  {
    id: "platform-db-migration",
    title: "Platform Architecture & Database Migration Review",
    date: "2026-09-12",
    durationMinutes: 58,
    participants: ["Priya Nair", "Marcus Chen", "Elena Rossi", "David Okoro"],
    tags: ["engineering", "database", "infrastructure"],
    summary:
      "The team reviewed the plan to migrate the primary production database from MySQL to PostgreSQL. A phased migration was approved to minimize downtime, starting with read replicas. The group also agreed to adopt pgvector for future semantic search workloads and to freeze schema changes during the cutover window.",
    decisions: [
      "Approved migration of the primary database from MySQL to PostgreSQL using a phased, read-replica-first approach.",
      "Adopt pgvector as the standard for semantic search and embedding storage.",
      "Freeze all schema changes during the 48-hour cutover window.",
    ],
    actionItems: [
      { id: "ai-1", task: "Prepare the database migration runbook", owner: "Priya Nair", deadline: "2026-09-30", status: "in-progress" },
      { id: "ai-2", task: "Set up the staging PostgreSQL cluster", owner: "Marcus Chen", deadline: "2026-09-25", status: "open" },
      { id: "ai-3", task: "Benchmark pgvector similarity search performance", owner: "David Okoro", deadline: "2026-10-05", status: "open" },
    ],
    transcript: [
      { id: "t1", speaker: "Priya Nair", timestamp: "00:02", text: "Our main goal today is to finalize the database migration plan from MySQL to PostgreSQL." },
      { id: "t2", speaker: "Marcus Chen", timestamp: "07:41", text: "I recommend we go read-replica first so we can validate the new PostgreSQL cluster before the full cutover." },
      { id: "t3", speaker: "Elena Rossi", timestamp: "18:20", text: "If we are moving to PostgreSQL, we should standardize on pgvector for the semantic search work coming next quarter." },
      { id: "t4", speaker: "David Okoro", timestamp: "31:05", text: "Agreed. I'll benchmark pgvector similarity search so we know the latency profile before we commit." },
    ],
  },
  {
    id: "mobile-launch-planning",
    title: "Mobile Application Launch Planning",
    date: "2026-09-18",
    durationMinutes: 45,
    participants: ["Sofia Alvarez", "Liam Walsh", "Priya Nair", "Hana Kim"],
    tags: ["product", "mobile", "launch"],
    summary:
      "The team finalized scope and timeline for the public launch of the mobile application on iOS and Android. A firm launch deadline was set and the group agreed to ship both platforms simultaneously, gated by a two-week closed beta.",
    decisions: [
      "Set the mobile application public launch deadline for November 15, 2026.",
      "Ship iOS and Android simultaneously rather than staggering releases.",
      "Require a two-week closed beta before launch approval.",
    ],
    actionItems: [
      { id: "ai-4", task: "Finalize mobile app store assets and screenshots", owner: "Sofia Alvarez", deadline: "2026-10-20", status: "open" },
      { id: "ai-5", task: "Complete closed beta testing for the mobile application", owner: "Liam Walsh", deadline: "2026-11-01", status: "open" },
      { id: "ai-6", task: "Prepare launch-day support runbook", owner: "Hana Kim", deadline: "2026-11-10", status: "open" },
    ],
    transcript: [
      { id: "t5", speaker: "Sofia Alvarez", timestamp: "01:10", text: "We need a firm launch deadline for the mobile application so marketing can plan the campaign." },
      { id: "t6", speaker: "Priya Nair", timestamp: "12:33", text: "Engineering is comfortable committing to November 15 if we lock scope this week." },
      { id: "t7", speaker: "Liam Walsh", timestamp: "22:48", text: "I want a two-week closed beta before we approve launch, so we catch crashes early." },
      { id: "t8", speaker: "Hana Kim", timestamp: "35:15", text: "I'll own the launch-day support runbook so we're ready for the volume spike." },
    ],
  },
  {
    id: "onboarding-retro",
    title: "Q3 Customer Onboarding Retrospective",
    date: "2026-08-28",
    durationMinutes: 40,
    participants: ["Hana Kim", "David Okoro", "Elena Rossi"],
    tags: ["customer-success", "retrospective"],
    summary:
      "The team reviewed Q3 onboarding metrics. Time-to-first-value dropped from 9 to 5 days after the guided setup wizard shipped. The group decided to invest in in-app checklists and to reduce required onboarding fields.",
    decisions: [
      "Invest in an in-app onboarding checklist for Q4.",
      "Reduce required onboarding form fields from twelve to six.",
    ],
    actionItems: [
      { id: "ai-7", task: "Design the in-app onboarding checklist", owner: "Hana Kim", deadline: "2026-09-20", status: "done" },
      { id: "ai-8", task: "Trim onboarding form to six required fields", owner: "Elena Rossi", deadline: "2026-09-15", status: "done" },
    ],
    transcript: [
      { id: "t9", speaker: "Hana Kim", timestamp: "03:22", text: "Time-to-first-value dropped from nine days to five after the setup wizard launched." },
      { id: "t10", speaker: "David Okoro", timestamp: "15:47", text: "The biggest drop-off is still the twelve-field signup form. We should cut it down." },
      { id: "t11", speaker: "Elena Rossi", timestamp: "24:10", text: "I'll reduce it to six required fields and move the rest into progressive profiling." },
    ],
  },
  {
    id: "security-audit",
    title: "Security & Compliance Audit Sync",
    date: "2026-09-05",
    durationMinutes: 52,
    participants: ["Marcus Chen", "Priya Nair", "Noah Bennett"],
    tags: ["security", "compliance"],
    summary:
      "The security team walked through the SOC 2 audit findings. Two medium findings were raised around access logging and secret rotation. The group agreed to enforce automated secret rotation and to enable audit logging on all production services before the next audit window.",
    decisions: [
      "Enforce automated secret rotation every 90 days across all services.",
      "Enable audit logging on every production service before the next audit.",
    ],
    actionItems: [
      { id: "ai-9", task: "Roll out automated secret rotation", owner: "Noah Bennett", deadline: "2026-10-10", status: "in-progress" },
      { id: "ai-10", task: "Enable audit logging on production services", owner: "Marcus Chen", deadline: "2026-10-01", status: "open" },
    ],
    transcript: [
      { id: "t12", speaker: "Noah Bennett", timestamp: "05:30", text: "The audit flagged two medium findings: inconsistent access logging and manual secret rotation." },
      { id: "t13", speaker: "Priya Nair", timestamp: "19:14", text: "Let's enforce automated secret rotation on a 90-day cycle to close that gap." },
      { id: "t14", speaker: "Marcus Chen", timestamp: "33:52", text: "I'll enable audit logging on all production services before the next audit window." },
    ],
  },
  {
    id: "marketing-kickoff",
    title: "Growth Marketing Campaign Kickoff",
    date: "2026-09-22",
    durationMinutes: 38,
    participants: ["Sofia Alvarez", "Hana Kim", "Noah Bennett"],
    tags: ["marketing", "growth"],
    summary:
      "The marketing team kicked off the Q4 growth campaign timed to the mobile application launch. They agreed on a content-led strategy with a referral incentive and set a target of 20,000 new signups for the quarter.",
    decisions: [
      "Run a content-led Q4 campaign anchored to the mobile launch.",
      "Introduce a double-sided referral incentive.",
      "Target 20,000 new signups for Q4.",
    ],
    actionItems: [
      { id: "ai-11", task: "Draft the Q4 content calendar", owner: "Sofia Alvarez", deadline: "2026-10-05", status: "open" },
      { id: "ai-12", task: "Design the referral incentive mechanics", owner: "Noah Bennett", deadline: "2026-10-12", status: "open" },
    ],
    transcript: [
      { id: "t15", speaker: "Sofia Alvarez", timestamp: "02:05", text: "The Q4 campaign should be anchored to the mobile application launch in November." },
      { id: "t16", speaker: "Hana Kim", timestamp: "14:40", text: "A double-sided referral incentive worked well last year, let's bring it back." },
      { id: "t17", speaker: "Noah Bennett", timestamp: "26:18", text: "I'll design the referral mechanics so they're ready before launch." },
    ],
  },
  {
    id: "design-system",
    title: "Design System Standardization",
    date: "2026-09-08",
    durationMinutes: 47,
    participants: ["Elena Rossi", "Sofia Alvarez", "Liam Walsh"],
    tags: ["design", "engineering"],
    summary:
      "The design and frontend teams agreed to consolidate three divergent component libraries into a single design system with semantic tokens. They decided to adopt accessible color contrast standards and to document every component before migration.",
    decisions: [
      "Consolidate three component libraries into a single design system.",
      "Adopt semantic color tokens with a 4.5:1 minimum contrast standard.",
    ],
    actionItems: [
      { id: "ai-13", task: "Audit existing components across the three libraries", owner: "Elena Rossi", deadline: "2026-09-28", status: "in-progress" },
      { id: "ai-14", task: "Define semantic color tokens", owner: "Liam Walsh", deadline: "2026-10-02", status: "open" },
    ],
    transcript: [
      { id: "t18", speaker: "Elena Rossi", timestamp: "04:12", text: "We have three component libraries drifting apart. We should consolidate into one design system." },
      { id: "t19", speaker: "Liam Walsh", timestamp: "17:36", text: "Let's build it on semantic tokens with a 4.5 to 1 contrast minimum for accessibility." },
      { id: "t20", speaker: "Sofia Alvarez", timestamp: "29:44", text: "Every component should be documented before we migrate any product surface." },
    ],
  },
];

export function getMeetingById(id: string): Meeting | undefined {
  return meetings.find((m) => m.id === id);
}
