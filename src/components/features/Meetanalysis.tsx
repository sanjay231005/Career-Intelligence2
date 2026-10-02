import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { Meeting } from "@/types/meeting";

const BAR_COLOR = "hsl(var(--primary))";

export default function MeetingAnalytics({ meeting }: { meeting: Meeting }) {
  const speakerData = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const s of meeting.transcript) {
      counts[s.speaker] = (counts[s.speaker] ?? 0) + 1;
    }
    return Object.entries(counts).map(([name, value]) => ({
      name: name.split(" ")[0],
      value,
    }));
  }, [meeting]);

  const done = meeting.actionItems.filter((a) => a.status === "done").length;
  const completion = meeting.actionItems.length
    ? Math.round((done / meeting.actionItems.length) * 100)
    : 0;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <p className="mb-3 text-sm font-medium text-foreground">Speaker contributions</p>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={speakerData} margin={{ top: 4, right: 8, bottom: 0, left: -24 }}>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "hsl(var(--muted))" }}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid hsl(var(--border))",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} name="Segments">
                {speakerData.map((_, i) => (
                  <Cell key={i} fill={BAR_COLOR} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-4">
        <div>
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-medium text-foreground">Action item completion</p>
            <p className="font-display text-sm font-600 text-primary">{completion}%</p>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${completion}%` }} />
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {done} of {meeting.actionItems.length} completed
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-background p-3">
            <p className="font-display text-xl font-700">{meeting.decisions.length}</p>
            <p className="text-xs text-muted-foreground">Key decisions</p>
          </div>
          <div className="rounded-xl border border-border bg-background p-3">
            <p className="font-display text-xl font-700">{meeting.participants.length}</p>
            <p className="text-xs text-muted-foreground">Participants</p>
          </div>
        </div>
      </div>
    </div>
  );
}
