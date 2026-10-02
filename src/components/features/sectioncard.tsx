import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  className?: string;
  count?: number;
}

export default function SectionCard({
  icon: Icon,
  title,
  children,
  className,
  count,
}: SectionCardProps) {
  return (
    <section className={cn("rounded-2xl border border-border bg-card p-5 sm:p-6", className)}>
      <div className="mb-4 flex items-center gap-2.5">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <h2 className="font-display text-lg font-600">{title}</h2>
        {typeof count === "number" && (
          <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {count}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}
