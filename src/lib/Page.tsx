import type { ReactNode } from "react";
import { Tools } from "./tools";
import { ACCOUNT, CREDITS, DATELINE, DESKS, TRENDS, WHO_TO_FOLLOW, PREMIUM } from "../content";

/**
 * The signed-in shell, after the reference's three columns: a left rail of
 * destinations and a Post control, the page in the centre, and a right
 * rail of search, a subscription card, "What's happening" and "Who to
 * follow". At phone width the rail becomes a bottom tab bar and the right
 * rail folds under the page. GIFcommit is a fictional network; the trends
 * are a real snapshot (captures/trends.json) and the posts are the
 * network's own desks.
 */
export const NAV: [string, string, string][] = [["index.html", "Home", "⌂"], ["explore.html", "Explore", "#"], ["notifications", "Notifications", "◔"], ["messages", "Messages", "✉"], ["bookmarks", "Bookmarks", "▭"], ["communities", "Communities", "⚇"], ["premium", "Premium", "✦"], ["profile", "Profile", "◯"]];

export function Page({ current, title, standfirst, children, rightFirst }: { current: string; title: string; standfirst?: string; children: ReactNode; rightFirst?: ReactNode }) {
  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      <Tools />
      <div className="app">
        <nav className="rail" aria-label="Sections">
          <a className="wordmark" href="./index.html" aria-label="GIFcommit home"><span className="wordmark__mark" aria-hidden="true">G</span></a>
          <ul>
            {NAV.map(([href, label, glyph]) => {
              const real = href.endsWith(".html");
              return (
                <li key={href}>
                  {real
                    ? <a href={`./${href}`} aria-current={href === current ? "page" : undefined}><span className="rail__glyph" aria-hidden="true">{glyph}</span><span className="rail__label">{label}</span></a>
                    : <span className="rail__item rail__item--off" aria-disabled="true" title="Not part of this study"><span className="rail__glyph" aria-hidden="true">{glyph}</span><span className="rail__label">{label}</span></span>}
                </li>
              );
            })}
          </ul>
          <a className="btn btn--primary rail__post" href="#compose">Post</a>
          <p className="rail__account"><span className="avatar avatar--me" aria-hidden="true">{ACCOUNT.initial}</span><span className="rail__label"><strong>{ACCOUNT.name}</strong> <span className="muted">@{ACCOUNT.handle}</span></span></p>
        </nav>

        <div className="frame">
          <main id="content">
            <header className="masthead">
              <h1 className="masthead__title">{title}</h1>
              {standfirst && <p className="masthead__standfirst">{standfirst}</p>}
              <p className="masthead__date">{DATELINE}</p>
            </header>
            {children}
          </main>
          <footer className="colophon">
            <p>
              A layout study of X's signed-in home and Explore pages, built from their known structure without a
              capture (the pages require an account). GIFcommit is a fictional network. Every post is by one of
              the network's own desks and states facts from the Royal Swedish Academy of Sciences' press release of
              7 October 2026 (<a href="https://www.nobelprize.org/prizes/chemistry/2026/press-release/">NobelPrize.org</a>),
              NobelPrize.org's announcements of 5 and 6 October, and Wikipedia (CC BY-SA 4.0, linked where used); no
              post is attributed to a real person and no engagement figure is shown. Trends are a public
              aggregator's snapshot of X trends at {new Date(TRENDS.captured).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York", timeZoneName: "short" })} on
              October 7, 2026 ({TRENDS.source}). Nothing from X — marks, design, posts — is reproduced. Built with{" "}
              <a href="https://github.com/gregoryedgerton/golden-grids">Golden Grids</a> ·{" "}
              <a href="https://www.npmjs.com/package/@gifcommit/golden-grids">npm</a> ·{" "}
              <a href="https://gregoryedgerton.github.io/golden-grids/">generator</a>.
            </p>
            <details className="credits">
              <summary>Photograph credits</summary>
              <ul>{CREDITS.map((p) => <li key={p.src}><a href={p.page}>{p.alt}</a> — {p.credit}, {p.licence}.</li>)}</ul>
            </details>
          </footer>
        </div>

        <aside className="side" aria-label="What's happening">
          <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="q" className="visually-hidden">Search</label>
            <input id="q" type="search" placeholder="Search" autoComplete="off" />
          </form>
          {rightFirst}
          <section className="card" aria-labelledby="premium-title">
            <h2 id="premium-title" className="card__title">Subscribe to {PREMIUM.name}</h2>
            <p className="card__text">{PREMIUM.pitch}</p>
            <p className="card__price"><strong>{PREMIUM.price}</strong> {PREMIUM.period}</p>
            <button type="button" className="btn btn--primary">{PREMIUM.cta}</button>
            <p className="note">A fictional subscription; the button does nothing.</p>
          </section>
          <section className="card" aria-labelledby="trends-title">
            <h2 id="trends-title" className="card__title">What's happening</h2>
            <ol className="trends">
              {TRENDS.us.slice(0, 8).map((t) => (
                <li key={t.rank}>
                  <span className="trends__meta">{t.rank} · Trending in United States</span>
                  <a className="trends__name" href={`./explore.html#${encodeURIComponent(t.name)}`}>{t.name}</a>
                </li>
              ))}
            </ol>
            <a className="card__more" href="./explore.html">Show more</a>
          </section>
          <section className="card" aria-labelledby="follow-title">
            <h2 id="follow-title" className="card__title">Who to follow</h2>
            <ul className="follow">
              {WHO_TO_FOLLOW.map((d) => (
                <li key={d.handle}>
                  <span className={`avatar avatar--${d.tone}`} aria-hidden="true">{d.initial}</span>
                  <span className="follow__who"><strong>{d.name}</strong><span className="muted">@{d.handle}</span></span>
                  <button type="button" className="btn btn--small" aria-label={`Follow ${d.name}`}>Follow</button>
                </li>
              ))}
            </ul>
          </section>
          <p className="side__foot">Desks: {Object.values(DESKS).map((d) => `@${d.handle}`).join(" · ")}. All fictional.</p>
        </aside>
      </div>
      <nav className="tabbar" aria-label="Sections, phone">
        {NAV.slice(0, 2).map(([href, label]) => <a key={href} href={`./${href}`} aria-current={href === current ? "page" : undefined}>{label}</a>)}
        <a href="#compose">Post</a>
        <a href="#trends-title">Trends</a>
      </nav>
    </>
  );
}
