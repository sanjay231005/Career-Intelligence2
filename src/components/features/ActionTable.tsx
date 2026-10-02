import { ActionItem, ActionItemStatus } from "@/types/meeting";
import { Badge } from "@/components/features/Badge";
import { formatDate, initials } from "@/lib/utils";

const statusStyles: Record<ActionItemStatus, string> = {
  open: "bg-muted text-muted-foreground",
  "in-progress": "bg-accent/15 text-accent-foreground",
  done: "bg-success/15 text-success",
};

const statusLabels: Record<ActionItemStatus, string> = {
  open: "Open",
  "in-progress": "In progress",
  done: "Done",
};

export default function ActionItemsTable({ items }: { items: ActionItem[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex flex-col gap-3 rounded-xl border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">{item.task}</p>
            <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                {initials(item.owner)}
              </span>
              {item.owner}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="text-xs text-muted-foreground">
              Due {formatDate(item.deadline)}
            </span>
            <Badge className={statusStyles[item.status]}>
              {statusLabels[item.status]}
            </Badge>
          </div>
        </li>
      ))}
    </ul>
  );
}
