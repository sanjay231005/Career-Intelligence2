
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Sparkles,
  Search as SearchIcon,
  Loader2,
  FileSearch,
  ArrowUpRight,
  BadgeCheck,
} from "lucide-react";
import { meetings } from "@/data/meetings";
import { searchMeetings, SearchHit } from "@/lib/search";
import { answerQuestion, RagResult, Confidence } from "@/lib/rag";
import { Badge } from "@/components/features/Badge";
import { formatDate, cn } from "@/lib/utils";

const EXAMPLES = [
  "Which meeting discussed the database migration?",
  "What deadline was decided for the mobile application?",
  "What security decisions were made?",
  "Who owns the onboarding checklist?",
];

const confidenceStyles: Record<Confidence, string> = {
  high: "bg-success/15 text-success",
  medium: "bg-accent/15 text-accent-foreground",
  low: "bg-muted text-muted-foreground",
  none: "bg-muted text-muted-foreground",
};

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<RagResult | null>(null);
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [searched, setSearched] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const run = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setLoading(true);
    setSearched(true);
    setParams({ q: trimmed });
    // Simulated retrieval latency — well under the 3s target.
    window.clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setAnswer(answerQuestion(trimmed, meetings));
      setHits(searchMeetings(trimmed, meetings));
      setLoading(false);
    }, 550);
  };

  // Run once on mount if a query param is present.
  useEffect(() => {
    const q = params.get("q");
    if (q) run(q);
    return () => window.clearTimeout(timer.current);
  }, [params, run]); // Add 'run' to the dependency array, as it's used inside useEffect.

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    run(query);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="flex items-center gap-2.5">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-700 leading-tight">AI Assistant</h1>
          <p className="text-sm text-muted-foreground">
            Grounded answers retrieved from your meeting knowledge base
          </p>
        </div>
      </div>

      <form onSubmit={submit} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question about your meetings…"
            className="w-full rounded-xl border border-border bg-card py-3 pl-12 pr-4 text-sm outline-none ring-primary placeholder:text-muted-foreground focus:ring-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-600 text-primary-foreground transition-transform hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          Ask
        </button>
      </form>

      {!searched && (
        <div className="mt-4 flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => {
                setQuery(ex);
                run(ex);
              }}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          Retrieving relevant meetings and composing a grounded answer…
        </div>
      )}

      {!loading && answer && (
        <div className="mt-8 animate-fade-up space-y-8">
          {/* Grounded answer */}
          <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-primary" />
              <span className="text-sm font-600 text-primary">AI answer</span>
              <Badge className={cn("ml-auto capitalize", confidenceStyles[answer.confidence])}>
                {answer.confidence === "none" ? "no match" : `${answer.confidence} confidence`}
              </Badge>
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground">{answer.answer}</p>

            {answer.sources.length > 0 && (
              <div className="mt-5 border-t border-primary/15 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Sources
                </p>
                <div className="mt-3 space-y-2">
                  {answer.sources.map((src) => (
                    <Link
                      key={src.meeting.id}
                      to={`/meetings/${src.meeting.id}`}
                      className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary/40"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-600 text-foreground">
                          {src.meeting.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(src.meeting.date)} · matched in {src.matchedField}
                        </p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Semantic search results */}
          <section>
            <div className="flex items-center gap-2">
              <FileSearch className="h-4 w-4 text-primary" />
              <h2 className="font-display text-lg font-600">
                Relevant meetings
                <span className="ml-2 text-sm font-400 text-muted-foreground">
                  {hits.length} {hits.length === 1 ? "result" : "results"}
                </span>
              </h2>
            </div>

            {hits.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-dashed border-border p-8 text-center">
                <p className="font-display text-base font-600">No relevant meetings found</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try different keywords or a broader question.
                </p>
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {hits.map((hit) => (
                  <li key={hit.meeting.id}>
                    <Link
                      to={`/meetings/${hit.meeting.id}`}
                      className="group block rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-[0_8px_30px_-14px_hsl(var(--primary)/0.3)]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="truncate font-display text-base font-600 text-foreground">
                          {hit.meeting.title}
                        </h3>
                        <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-600 text-primary">
                          {hit.score.toFixed(1)}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDate(hit.meeting.date)} · matched in {hit.matchedField}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        “{hit.snippet}”
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
