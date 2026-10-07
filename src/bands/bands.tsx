import type React from "react";
import { GoldenGrid, GoldenBox } from "@gifcommit/golden-grids";
import type { PlacementValue } from "@gifcommit/golden-grids";
import { useViewport, pick, type Viewport } from "../lib/viewport";
import { useExpandGroup } from "../lib/expand";
import { Fact, Figure } from "../lib/boxes";
import { PhotoCard, FactCard } from "../lib/cards";
import { Band } from "./Band";
import { DESKS, PHOTOS, PRIZE, WEEK, TRENDS, brief, type Post } from "../content";
import { FIGURES, FIGURE_CAPTIONS } from "../figures";

/**
 * A post is a band: the author line, then one grid — the text in the
 * hero square, set as large as the square allows, with the post's figure,
 * photograph and facts in the squares that follow — then the action row.
 * The feed is a stack of these, each in its own orientation, so a column
 * of posts reads as a column of different cards rather than one repeated.
 */
type O = [PlacementValue, boolean];
const orient = (v: Viewport, desktop: O, mobile: O) => pick<O>(v, { mobile, tablet: desktop, desktop });

/** One grid, or below desktop two stacked (a three and the rest), so no square falls under about 114px. */
function Grids({ boxes, placement, cw, split }: { boxes: React.ReactNode[]; placement: PlacementValue; cw: boolean; split: boolean }) {
  if (!split || boxes.length < 5) return <GoldenGrid from={1} to={boxes.length} placement={placement} clockwise={cw}>{boxes}</GoldenGrid>;
  const first = 3, rest = boxes.length - first;
  return (
    <div className="stack">
      <GoldenGrid from={1} to={first} placement="top" clockwise={cw}>{boxes.slice(0, first)}</GoldenGrid>
      <GoldenGrid from={1} to={rest} placement={rest % 2 ? "bottom" : "right"} clockwise={!cw}>{boxes.slice(first)}</GoldenGrid>
    </div>
  );
}
const noteFor = (v: Viewport, n: number, placement: PlacementValue, cw: boolean) => v !== "desktop" && n >= 5 ? `two grids: from=1 to=3 · placement="top" / from=1 to=${n - 3}` : `from=1 to=${n} · placement="${placement}" · clockwise=${cw}`;

/** Eight orientations for even and odd counts, cycled by the post's position in the feed. */
const EVEN: O[] = [["right", true], ["left", false], ["right", false], ["left", true]];
const ODD: O[] = [["top", true], ["bottom", false], ["top", false], ["bottom", true]];
const EVEN_M: O[] = [["top", true], ["bottom", false], ["top", false], ["bottom", true]];
const ODD_M: O[] = [["right", true], ["left", false], ["right", false], ["left", true]];

export function PostBand({ post, index }: { post: Post; index: number }) {
  const v = useViewport();
  const x = useExpandGroup();
  const desk = DESKS[post.desk];
  const boxes: React.ReactNode[] = [];
  boxes.push(
    <GoldenBox key="text" {...x.boxProps("text")}>
      <Fact
        fitClass="fit--post"
        max={120}
        body={post.long ? <p>{brief(post.long[0])}</p> : undefined}
        source={post.source?.label}
        expand={post.long ? { group: x, slotKey: "text", title: `@${desk.handle}`, full: <div className="cell__body"><p className="cell__post">{post.text}</p>{post.long.map((p, i) => <p key={i}>{p}</p>)}{post.source && <p className="cell__source">Source: <a href={post.source.url}>{post.source.label}</a>.</p>}</div> } : undefined}
      >
        {post.text}
      </Fact>
    </GoldenBox>,
  );
  if (post.figure) {
    const Fig = FIGURES[post.figure];
    boxes.push(<GoldenBox key="fig"><Figure caption={FIGURE_CAPTIONS[post.figure]}><Fig /></Figure></GoldenBox>);
  }
  if (post.photo) {
    boxes.push(<GoldenBox key="photo" {...x.boxProps("photo")}><PhotoCard photo={PHOTOS[post.photo]} caption={post.photoCaption} x={x} slotKey="photo" /></GoldenBox>);
  }
  for (const [i, f] of (post.facts ?? []).entries()) {
    boxes.push(<GoldenBox key={`f${i}`}><FactCard fact={{ label: f.label, line: f.line, body: f.body, fitClass: f.fitClass }} /></GoldenBox>);
  }
  const n = boxes.length;
  const [placement, cw] = n % 2 === 0 ? orient(v, EVEN[index % 4], EVEN_M[index % 4]) : orient(v, ODD[index % 4], ODD_M[index % 4]);
  return (
    <article className="post" aria-labelledby={`${post.id}-title`}>
      <header className="post__head">
        <span className={`avatar avatar--${desk.tone}`} aria-hidden="true">{desk.initial}</span>
        <p className="post__who" id={`${post.id}-title`}><strong>{desk.name}</strong> <span className="muted">@{desk.handle} · {post.time}</span></p>
      </header>
      <Band id={post.id} title={post.text} quiet note={noteFor(v, n, placement, cw)}>
        <Grids placement={placement} cw={cw} split={v !== "desktop"} boxes={boxes} />
      </Band>
      <ul className="actions" aria-label="Post actions">
        {[["Reply", "↩"], ["Repost", "⟲"], ["Like", "♡"], ["Bookmark", "▭"], ["Share", "↗"]].map(([label, glyph]) => (
          <li key={label}><button type="button" className="action" aria-label={`${label} (does nothing in this study)`}><span aria-hidden="true">{glyph}</span><span className="action__label">{label}</span></button></li>
        ))}
      </ul>
    </article>
  );
}

/** Explore: the trending topic as a band — the citation in the hero, the laureates and the prize around it. */
export function TopicBand() {
  const v = useViewport();
  const x = useExpandGroup();
  const [placement, cw] = orient(v, ["left", true], ["bottom", true]);
  const rank = TRENDS.worldwide.find((t) => /ノーベル化学賞/.test(t.name))?.rank;
  const boxes = [
    <GoldenBox key="cite" {...x.boxProps("cite")}>
      <Fact label="Nobel Prize in Chemistry 2026" fitClass="fit--post" max={120}
        body={<p>Henri B. Kagan and Kenso Soai, announced by the Royal Swedish Academy of Sciences in Stockholm this morning; 12 million kronor shared equally.</p>}
        source={PRIZE.source.label}
        expand={{ group: x, slotKey: "cite", title: "Nobel Prize in Chemistry 2026", full: <div className="cell__body"><p className="cell__post">“{PRIZE.citation}”</p>{PRIZE.laureates.map((l) => <p key={l.name}><strong>{l.name}</strong>, born {l.born} in {l.birthplace}. {l.phd}. {l.post}. In {l.step} he {l.did}</p>)}<p>“{PRIZE.quote}” — {PRIZE.chair}, {PRIZE.chairRole}.</p><p className="cell__source">Source: <a href={PRIZE.source.url}>{PRIZE.source.label}</a>.</p></div> }}>
        {`“${PRIZE.citation}”`}
      </Fact>
    </GoldenBox>,
    <GoldenBox key="photo" {...x.boxProps("photo")}><PhotoCard photo={PHOTOS.announcement} caption="The Academy's press room, where the prize is read out" x={x} slotKey="photo" /></GoldenBox>,
    <GoldenBox key="kagan"><FactCard fact={{ label: "Henri B. Kagan", line: "1986", fitClass: "fit--num", body: "Non-linear effects: a product more one-handed than its catalyst. Born 1930, Boulogne-Billancourt; Université Paris-Sud." }} /></GoldenBox>,
    <GoldenBox key="soai"><FactCard fact={{ label: "Kenso Soai", line: "2003", fitClass: "fit--num", body: "A reaction forming only one mirror image. Born 1950, Hiroshima; Tokyo University of Science." }} /></GoldenBox>,
    <GoldenBox key="rank"><FactCard fact={{ label: "Worldwide trend", line: rank ? `#${rank}` : "#1", fitClass: "fit--num", body: rank ? `At the snapshot; earlier today the top trend worldwide, as ノーベル化学賞.` : "The top trend worldwide earlier today, as ノーベル化学賞." }} /></GoldenBox>,
    <GoldenBox key="sek"><FactCard fact={{ label: "Prize", line: "SEK\n12M", fitClass: "fit--num", body: "Shared equally." }} /></GoldenBox>,
  ];
  return (
    <Band id="topic" kicker="Trending · Science" title="Nobel Prize in Chemistry" lesson="Announced in Stockholm this morning: Henri B. Kagan and Kenso Soai, for the discovery of non-linear effects and autocatalysis in asymmetric organic synthesis. For part of the morning the most-posted topic on the network worldwide." note={noteFor(v, boxes.length, placement, cw)}>
      <Grids placement={placement} cw={cw} split={v !== "desktop"} boxes={boxes} />
    </Band>
  );
}

/** Nobel week as six squares: three announced with photographs, three to come as dates. */
export function WeekBand() {
  const v = useViewport();
  const x = useExpandGroup();
  const [placement, cw] = orient(v, ["right", false], ["top", false]);
  const boxes = WEEK.map((d, i) => {
    const key = `d${i}`;
    if (d.photo) {
      return <GoldenBox key={key} {...x.boxProps(key)}><PhotoCard photo={PHOTOS[d.photo]} kicker={`${d.day} · ${d.prize}`} caption={`${d.who}: ${d.what}`} x={x} slotKey={key} /></GoldenBox>;
    }
    return <GoldenBox key={key}><FactCard fact={{ label: d.prize, line: d.day, body: `${d.status}. ${d.what}` }} /></GoldenBox>;
  });
  // Announced first so the photographs take the larger squares; today's prize leads.
  const order = [2, 1, 0, 3, 4, 5].map((i) => boxes[i]);
  return (
    <Band id="week" kicker="Nobel week" title="Six prizes, October 5–12" lesson="Three announced, three to come. Medicine for optogenetics on Monday, physics for IceCube's neutrinos on Tuesday, chemistry today; literature on Thursday, peace on Friday in Oslo, economic sciences on Monday." note={noteFor(v, 6, placement, cw)}>
      <Grids placement={placement} cw={cw} split={v !== "desktop"} boxes={order} />
    </Band>
  );
}
