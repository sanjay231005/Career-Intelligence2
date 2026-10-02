import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Sparkles, CalendarDays, CheckSquare, Users, Layers } from "lucide-react";
import { meetings } from "@/data/meetings";
import MeetingCard from "@/components/features/MeetingCard";
import StatCard from "@/components/features/StatCard";
import { Badge } from "@/components/features/Badge";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const navigate = useNavigate();
  const [heroQuery, setHeroQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(
    () => Array.from(new Set(meetings.flatMap((m) => m.tags))).sort(),
    []
  );

  const openActions = useMemo(
    () =>
      meetings.reduce(
        (acc, m) => acc + m.actionItems.filter((a) => a.status !== "done").length,
        0
      ),
    []
  );
  const uniqueParticipants = useMemo(
    () => new Set(meetings.flatMap((m) => m.participants)).size,
    []
  );

  const sorted = useMemo(
    () => [...meetings].sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    []
  );

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return sorted.filter((m) => {
      const matchesTag = !activeTag || m.tags.includes(activeTag);
      const matchesText =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.summary.toLowerCase().includes(q) ||
        m.tags.some((t) => t.includes(q));
      return matchesTag && matchesText;
    });
  }, [sorted, filter, activeTag]);

  const submitHero = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(heroQuery.trim())}`);
  };

  const [featured, ...rest] = filtered;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-primary p-6 text-primary-foreground sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <Badge className="bg-white/15 text-primary-foreground">
            <Sparkles className="mr-1 h-3 w-3" /> AI-powered
          </Badge>
          <h1 className="mt-4 max-w-2xl font-display text-3xl font-700 leading-tight text-balance sm:text-4xl">
            Ask anything about your past meetings
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
            Search transcripts, summaries, decisions, and action items in natural
            language — and get grounded answers cited from the source meeting.
          </p>

          <form onSubmit={submitHero} className="mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                value={heroQuery}
                onChange={(e) => setHeroQuery(e.target.value)}
                placeholder="e.g. Which meeting discussed the database migration?"
                className="w-full rounded-xl border border-transparent bg-background py-3 pl-12 pr-4 text-sm text-foreground outline-none ring-accent placeholder:text-muted-foreground focus:ring-2"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-600 text-accent-foreground transition-transform hover:brightness-105 active:scale-[0.98]"
            >
              <Sparkles className="h-4 w-4" /> Ask AI
            </button>
          </form>
        </div>
      </section>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard icon={CalendarDays} label="Meetings archived" value={meetings.length} />
        <StatCard icon={CheckSquare} label="Open action items" value={openActions} accent />
        <StatCard icon={Users} label="People involved" value={uniqueParticipants} />
        <StatCard icon={Layers} label="Topics tracked" value={allTags.length} />
      </div>

      {/* Meeting library */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-700">Meeting library</h2>
          <p className="text-sm text-muted-foreground">
            {filtered.length} of {meetings.length} meetings
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter meetings…"
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-3 text-sm outline-none ring-primary focus:ring-2"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTag(null)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium transition-colors",
            !activeTag ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors",
              activeTag === tag ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="font-display text-lg font-600">No meetings match your filters</p>
          <p className="mt-1 text-sm text-muted-foreground">Try a different tag or search term.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {featured && (
            <div className="lg:col-span-3">
              <MeetingCard meeting={featured} featured />
            </div>
          )}
          {rest.map((m) => (
            <MeetingCard key={m.id} meeting={m} />
          ))}
        </div>
      )}
    </div>
  );
}
