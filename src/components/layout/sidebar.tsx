import { NavLink } from "react-router-dom";
import { LayoutDashboard, Sparkles, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/search", label: "AI Assistant", icon: Sparkles, end: false },
];

export default function Sidebar() {
  return (
    <aside className="w-full shrink-0 border-b border-border bg-card lg:h-screen lg:w-64 lg:border-b-0 lg:border-r lg:sticky lg:top-0 flex lg:flex-col">
      <div className="flex items-center gap-2.5 px-5 py-4 lg:py-6">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
          <BrainCircuit className="h-5 w-5" />
        </div>
        <div className="leading-tight">
          <p className="font-display text-lg font-700 tracking-tight">Recall</p>
          <p className="text-xs text-muted-foreground">Meeting Knowledge</p>
        </div>
      </div>

      <nav className="flex gap-1 px-3 pb-3 lg:flex-col lg:pb-0 lg:pt-2 overflow-x-auto">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors whitespace-nowrap",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto hidden lg:block p-4">
        <div className="rounded-xl border border-border bg-muted/50 p-4">
          <p className="text-xs font-semibold text-foreground">V1.0 preview</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Semantic search & RAG run on a local dataset. Connect OnSpace Cloud to enable live embeddings.
          </p>
        </div>
      </div>
    </aside>
  );
}
