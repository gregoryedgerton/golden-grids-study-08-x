import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "../lib/Page";
import { PostBand, TopicBand, WeekBand } from "../bands/bands";
import { TrendsList } from "../lib/modules";
import { POSTS } from "../content";
import "../styles.css";

/** Explore: the trending topic opened, the week, the trends list, and the topic's posts. */
function App() {
  return (
    <Page current="explore.html" title="Explore" standfirst="What is trending, and the day's top topic opened: the 2026 Nobel Prize in Chemistry, announced in Stockholm this morning.">
      <nav className="feedtabs" aria-label="Explore">
        <a href="./explore.html" aria-current="page">Trending</a><a href="./explore.html#week">Science</a><a href="./explore.html#trends">All trends</a>
      </nav>
      <TopicBand />
      <WeekBand />
      <TrendsList />
      {[POSTS[3], POSTS[2], POSTS[5]].map((p, i) => <PostBand key={p.id} post={p} index={i + 3} />)}
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
