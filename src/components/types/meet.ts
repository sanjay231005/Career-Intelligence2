export type ActionItemStatus = "open" | "in-progress" | "done";

export interface ActionItem {
  id: string;
  task: string;
  owner: string;
  deadline: string; // ISO date
  status: ActionItemStatus;
}

export interface TranscriptSection {
  id: string;
  speaker: string;
  timestamp: string;
  text: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string; // ISO date
  durationMinutes: number;
  participants: string[];
  tags: string[];
  summary: string;
  decisions: string[];
  actionItems: ActionItem[];
  transcript: TranscriptSection[];
}
