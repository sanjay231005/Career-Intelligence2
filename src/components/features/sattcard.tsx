import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  accent?: boolean;
}

export default function StatCard({ icon: Icon, label, value, accent }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <div
          className={
            accent
              ? "grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent-foreground"
              : "grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"
          }
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="leading-tight">
          <p className="font-display text-2xl font-700 tabular-nums">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
}
