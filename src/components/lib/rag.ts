import { Meeting } from "@/types/meeting";
import { formatDate } from "@/lib/utils";
import { searchMeetings, tokenize, SearchHit } from "@/lib/search";

export type Confidence = "high" | "medium" | "low" | "none";

export interface RagSource {
  meeting: Meeting;
  snippet: string;
  matchedField: string;
}

export interface RagResult {
  answer: string;
  confidence: Confidence;
  sources: RagSource[];
}

const DEADLINE_HINTS = ["deadline", "due", "when", "date", "timeline", "launch"];

function relevantStatements(meeting: Meeting, tokens: string[], wantsDeadline: boolean): string[] {
  const pool: string[] = [
    ...meeting.decisions,
    ...meeting.actionItems.map(
      (a) => `${a.task} (owner: ${a.owner}, due ${formatDate(a.deadline)}, ${a.status})`
    ),
    ...meeting.summary.split(/(?<=[.?!])\s+/),
  ];

  return pool
    .map((statement) => {
      const lower = statement.toLowerCase();
      let score = tokens.reduce((acc, t) => acc + (lower.includes(t) ? 1 : 0), 0);
      if (wantsDeadline && /\b(20\d{2}|due|deadline|launch)\b/.test(lower)) score += 1;
      return { statement, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((x) => x.statement);
}

/**
 * Retrieval-Augmented Generation stand-in: composes a grounded answer strictly
 * from retrieved meeting content. Never returns hardcoded or invented facts.
 * (V1.0 stand-in for OnSpace AI LLM synthesis over vector-retrieved context.)
 */
export function answerQuestion(question: string, source: Meeting[]): RagResult {
  const tokens = tokenize(question);
  const hits: SearchHit[] = searchMeetings(question, source);

  if (hits.length === 0 || hits[0].score === 0) {
    return {
      answer:
        "I couldn't find any meeting in the repository that discusses this. Try rephrasing your question, or confirm that the relevant meeting has been added.",
      confidence: "none",
      sources: [],
    };
  }

  const wantsDeadline = DEADLINE_HINTS.some((h) => question.toLowerCase().includes(h));
  const top = hits.slice(0, 3);
  const primary = top[0].meeting;
  const statements = relevantStatements(primary, tokens, wantsDeadline);
  const body = statements.length
    ? statements.join(" ")
    : primary.summary.split(/(?<=[.?!])\s+/)[0];

  let answer = `Based on "${primary.title}" (${formatDate(primary.date)}): ${body}`;

  if (top.length > 1) {
    const others = top
      .slice(1)
      .map((h) => `"${h.meeting.title}"`)
      .join(" and ");
    answer += ` This topic was also referenced in ${others}.`;
  }

  const confidence: Confidence =
    top[0].score >= 6 ? "high" : top[0].score >= 3 ? "medium" : "low";

  return {
    answer,
    confidence,
    sources: top.map((h) => ({
      meeting: h.meeting,
      snippet: h.snippet,
      matchedField: h.matchedField,
    })),
  };
}
