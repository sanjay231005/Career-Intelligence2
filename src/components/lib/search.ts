import { Meeting } from "@/types/meeting";

const STOPWORDS = new Set(
  "the a an and or of to in on for with about which what when who how is are was were be been being did do does discuss discussed talk talked said say meeting our we it that this at as by from into we're".split(
    " "
  )
);

/** Split text into meaningful lowercase tokens, removing stopwords. */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

interface Field {
  field: string;
  text: string;
  weight: number;
}

function meetingFields(m: Meeting): Field[] {
  return [
    { field: "Title", text: m.title, weight: 3 },
    { field: "Tags", text: m.tags.join(" "), weight: 2.5 },
    { field: "Decisions", text: m.decisions.join(" "), weight: 2 },
    { field: "Summary", text: m.summary, weight: 1.6 },
    {
      field: "Action Items",
      text: m.actionItems.map((a) => `${a.task} ${a.owner}`).join(" "),
      weight: 1.4,
    },
    { field: "Participants", text: m.participants.join(" "), weight: 1.2 },
    {
      field: "Transcript",
      text: m.transcript.map((t) => `${t.speaker} ${t.text}`).join(" "),
      weight: 1,
    },
  ];
}

function bestSnippet(text: string, tokens: string[]): string {
  const sentences = text.split(/(?<=[.?!])\s+/).filter(Boolean);
  let best = sentences[0] ?? text;
  let bestScore = -1;
  for (const s of sentences) {
    const lower = s.toLowerCase();
    const score = tokens.reduce((acc, t) => acc + (lower.includes(t) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = s;
    }
  }
  return best.trim();
}

export interface SearchHit {
  meeting: Meeting;
  score: number;
  matchedField: string;
  snippet: string;
  matchedTerms: string[];
}

/**
 * Lightweight semantic-style ranking computed dynamically from meeting content.
 * (V1.0 stand-in for vector similarity search — swapped for pgvector + embeddings later.)
 */
export function searchMeetings(query: string, source: Meeting[]): SearchHit[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const hits: SearchHit[] = [];

  for (const meeting of source) {
    const fields = meetingFields(meeting);
    let score = 0;
    let topField = "";
    let topFieldScore = 0;
    const matched = new Set<string>();

    for (const { field, text, weight } of fields) {
      const lower = text.toLowerCase();
      let fieldScore = 0;
      for (const token of tokens) {
        const occurrences = lower.split(token).length - 1;
        if (occurrences > 0) {
          matched.add(token);
          fieldScore += occurrences * weight;
        }
      }
      score += fieldScore;
      if (fieldScore > topFieldScore) {
        topFieldScore = fieldScore;
        topField = field;
      }
    }

    if (score > 0) {
      const fieldText =
        fields.find((f) => f.field === topField)?.text ?? meeting.summary;
      hits.push({
        meeting,
        score: Math.round(score * 10) / 10,
        matchedField: topField,
        snippet: bestSnippet(fieldText, tokens),
        matchedTerms: [...matched],
      });
    }
  }

  return hits.sort((a, b) => b.score - a.score);
}
