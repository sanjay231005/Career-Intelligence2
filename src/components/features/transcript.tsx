import { TranscriptSection } from "@/types/meeting";
import { initials } from "@/lib/utils";

export default function TranscriptView({
  sections,
}: {
  sections: TranscriptSection[];
}) {
  return (
    <ol className="space-y-5">
      {sections.map((s) => (
        <li key={s.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {initials(s.speaker)}
            </span>
          </div>
          <div className="min-w-0 flex-1 pb-1">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-foreground">{s.speaker}</span>
              <span className="font-mono text-xs text-muted-foreground">{s.timestamp}</span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
