import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "../lib/Page";
import { PostBand } from "../bands/bands";
import { FeedTabs, Composer } from "../lib/modules";
import { POSTS, OTHER_POSTS } from "../content";
import "../styles.css";

/** Home: For you. The feed, newest first, with the day's topic through it. */
const FEED = [POSTS[5], OTHER_POSTS[0], POSTS[4], POSTS[2], POSTS[3], POSTS[1], POSTS[0]];

function App() {
  return (
    <Page current="index.html" title="Home" standfirst="The timeline of a fictional network on the morning the Nobel Prize in Chemistry was announced: the network's desks on the prize, the week, and last night's game.">
      <FeedTabs current="for-you" />
      <Composer />
      {FEED.map((p, i) => <PostBand key={p.id} post={p} index={i} />)}
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
