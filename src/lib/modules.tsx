import { useState, type FormEvent } from "react";
import { ACCOUNT, TRENDS } from "../content";

/**
 * The flat modules: the feed's tabs, the composer, and Explore's full
 * trends list. Lists stay lists; the composer posts nothing and says so.
 */
export function FeedTabs({ current }: { current: "for-you" | "following" }) {
  return (
    <nav className="feedtabs" aria-label="Timeline">
      <a href="./index.html" aria-current={current === "for-you" ? "page" : undefined}>For you</a>
      <a href="./index.html#following" aria-current={current === "following" ? "page" : undefined}>Following</a>
    </nav>
  );
}

export function Composer() {
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  const limit = 280;
  const onSubmit = (e: FormEvent) => { e.preventDefault(); setSent(true); };
  return (
    <form className="compose" id="compose" onSubmit={onSubmit} aria-labelledby="compose-title" aria-describedby="compose-note">
      <h2 id="compose-title" className="visually-hidden">Compose a post</h2>
      <span className="avatar avatar--me" aria-hidden="true">{ACCOUNT.initial}</span>
      <div className="compose__body">
        <label htmlFor="compose-text" className="visually-hidden">What is happening?</label>
        <textarea id="compose-text" placeholder="What is happening?!" rows={2} maxLength={limit} value={text} onChange={(e) => { setText(e.target.value); setSent(false); }} />
        <div className="compose__bar">
          <span className="compose__tools" aria-hidden="true">▣ ▶ ☰ ☺ ◷ ⌖</span>
          <span className="compose__count muted">{text.length}/{limit}</span>
          <button type="submit" className="btn btn--primary" disabled={!text.trim()}>Post</button>
        </div>
        <p id="compose-note" className="note" aria-live="polite">{sent ? "Nothing was posted; this composer is part of a layout study." : "The composer posts nothing."}</p>
      </div>
    </form>
  );
}

export function TrendsList() {
  const when = new Date(TRENDS.captured).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York", timeZoneName: "short" });
  const col = (title: string, rows: { rank: number; name: string }[], tag: string) => (
    <section className="trendcol" aria-labelledby={`${tag}-title`}>
      <h3 id={`${tag}-title`} className="trendcol__title">{title}</h3>
      <ol className="trends trends--full">
        {rows.map((t) => {
          const nobel = /ノーベル化学賞/.test(t.name);
          return (
            <li key={t.rank} id={encodeURIComponent(t.name)} className={nobel ? "is-topic" : undefined}>
              <span className="trends__meta">{t.rank} · Trending{nobel ? " · Science" : ""}</span>
              <span className="trends__name">{t.name}</span>
              {nobel && <a className="trends__link" href="#topic">Nobel Prize in Chemistry — see the topic above</a>}
            </li>
          );
        })}
      </ol>
    </section>
  );
  return (
    <section className="list-band" id="trends" aria-labelledby="trendlist-title">
      <h2 id="trendlist-title" className="band__title">Trending now</h2>
      <p className="band__lesson">A public aggregator's snapshot of X's trends at {when} on October 7, 2026, worldwide and in the United States, in the aggregator's order; earlier in the day the Nobel Prize in Chemistry (ノーベル化学賞) led the worldwide list. Post counts are not shown because the snapshot does not carry them.</p>
      <div className="trendcols">
        {col("Worldwide", TRENDS.worldwide.slice(0, 20), "ww")}
        {col("United States", TRENDS.us.slice(0, 20), "us")}
      </div>
      <p className="note">Source: {TRENDS.source}.</p>
    </section>
  );
}
