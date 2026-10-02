import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  Gavel,
  CheckSquare,
  MessageSquareText,
  BarChart3,
} from "lucide-react";
import { getMeetingById } from "@/data/meetings";
import SectionCard from "@/components/features/SectionCard";
import ActionItemsTable from "@/components/features/ActionItemsTable";
import TranscriptView from "@/components/features/TranscriptView";
import MeetingAnalytics from "@/components/features/MeetingAnalytics";
import { Badge } from "@/components/features/Badge";
import { formatDate, initials } from "@/lib/utils";

export default function MeetingDetail() {
  const { id } = useParams();
  const meeting = id ? getMeetingById(id) : undefined;

  if (!meeting) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-700">Meeting not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This meeting may have been removed or the link is incorrect.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-600 text-primary-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to library
      </Link>

      {/* Header */}
      <header className="mt-4 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="flex flex-wrap gap-2">
          {meeting.tags.map((tag) => (
            <Badge key={tag} className="bg-primary/10 text-primary capitalize">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="mt-3 font-display text-2xl font-700 leading-tight sm:text-3xl">
          {meeting.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4" /> {formatDate(meeting.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> {meeting.durationMinutes} minutes
          </span>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {meeting.participants.map((p) => (
            <span
              key={p}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background py-1 pl-1 pr-3 text-xs text-foreground"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                {initials(p)}
              </span>
              {p}
            </span>
          ))}
        </div>
      </header>

      <div className="mt-6 space-y-6">
        <SectionCard icon={FileText} title="Summary">
          <p className="text-sm leading-relaxed text-muted-foreground">{meeting.summary}</p>
        </SectionCard>

        <SectionCard icon={Gavel} title="Key decisions" count={meeting.decisions.length}>
          <ul className="space-y-3">
            {meeting.decisions.map((d, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/20 text-[11px] font-700 text-accent-foreground">
                  {i + 1}
                </span>
                {d}
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard icon={CheckSquare} title="Action items" count={meeting.actionItems.length}>
          <ActionItemsTable items={meeting.actionItems} />
        </SectionCard>

        <SectionCard icon={BarChart3} title="Meeting analytics">
          <MeetingAnalytics meeting={meeting} />
        </SectionCard>

        <SectionCard icon={MessageSquareText} title="Transcript" count={meeting.transcript.length}>
          <TranscriptView sections={meeting.transcript} />
        </SectionCard>
      </div>
    </div>
  );
}
