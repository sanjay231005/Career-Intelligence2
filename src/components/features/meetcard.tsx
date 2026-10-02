import { Link } from "react-router-dom";
import { Calendar, Clock, Users, CheckSquare, ArrowUpRight } from "lucide-react";
import { Meeting } from "@/types/meeting";
import { Badge } from "@/components/features/Badge";
import { formatDate, cn } from "@/lib/utils";

interface MeetingCardProps {
  meeting: Meeting;
  featured?: boolean;
}

export default function MeetingCard({ meeting, featured }: MeetingCardProps) {
  const openItems = meeting.actionItems.filter((a) => a.status !== "done").length;

  return (
    <Link
      to={`/meetings/${meeting.id}`}
      className={cn(
        "group flex flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.35)]",
        featured && "sm:p-6"
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        {meeting.tags.map((tag) => (
          <Badge key={tag} className="bg-primary/10 text-primary capitalize">
            {tag}
          </Badge>
        ))}
      </div>

      <h3
        className={cn(
          "mt-3 font-display font-600 leading-snug text-foreground",
          featured ? "text-xl sm:text-2xl" : "text-base"
        )}
      >
        {meeting.title}
      </h3>

      <p
        className={cn(
          "mt-2 text-sm leading-relaxed text-muted-foreground",
          featured ? "line-clamp-3" : "line-clamp-2"
        )}
      >
        {meeting.summary}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" /> {formatDate(meeting.date)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" /> {meeting.durationMinutes} min
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" /> {meeting.participants.length}
        </span>
        {openItems > 0 && (
          <span className="inline-flex items-center gap-1.5 text-accent-foreground">
            <CheckSquare className="h-3.5 w-3.5" /> {openItems} open
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
        View meeting <ArrowUpRight className="h-4 w-4" />
      </div>
    </Link>
  );
}
