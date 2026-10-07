# Layout study — X's signed-in home and Explore, as GIFcommit

**Live:** [`https://gregoryedgerton.github.io/golden-grids-study-08-x/`](https://gregoryedgerton.github.io/golden-grids-study-08-x/)

An unaffiliated layout study. It rebuilds the structure of X's signed-in
home (For you) and Explore (Trending) pages as stacked golden grids for
GIFcommit, a fictional network, on Wednesday, October 7, 2026 — the day
the Nobel Prize in Chemistry was announced and, for part of the morning,
the most-trended topic on X worldwide. Every post is by one of the
network's own desks and states facts from the Royal Swedish Academy of
Sciences' press release; no post is attributed to a real person and no
engagement figure is shown. The reference was not captured (the pages
require an account), so the structure is from how the app is known to be
organised. Nothing from X — marks, design, posts — is reproduced. Built
with [Golden Grids](https://github.com/gregoryedgerton/golden-grids) from
the [study template](https://github.com/gregoryedgerton/golden-grids-study-template).

## Reference

X's web app, signed in, as of 2026: three columns at 1440 — a left rail
(Home, Explore, Notifications, Messages, Bookmarks, Communities, Premium,
Profile, a Post control, the account), a 600px centre with the For you /
Following tabs, a composer and the feed of posts (author line, text,
media, an action row), and a right rail of search, a Premium card, "What's
happening" with trends and "Who to follow". Explore leads with a trends
list under its own tabs. At phone width the rail becomes a bottom bar. No
capture exists in `captures/`; the register (white, `#0f1419` text,
`#536471` secondary, `#1d9bf0` blue, pills and 16px cards, the system
face; "lights out" black in dark) is the app's long-documented one, not
measured here.

The topic is from the record: [`captures/trends.json`](captures/trends.json)
is a public aggregator's snapshot of X's trends, worldwide and United
States, at 9:08 AM EDT on October 7, 2026, with a note that ノーベル化学賞
(Nobel Prize in Chemistry) led the worldwide list earlier that morning.

## The claim

A timeline is a column of cards of one size that treats a two-line
remark and a day's news the same; here each post is one grid, its text in
the hero square set as large as the square allows, its figure, photograph
and facts in the squares that follow, and each post in its own
orientation, so the feed reads as a column of different cards.

## The pages

Two Vite entries, no router; `src/lib/Page.tsx` is the three-column shell.
A post is a band ([`src/bands/bands.tsx`](src/bands/bands.tsx), `PostBand`):
author line, grid, action row. Orientation cycles with the post's position
in the feed (`EVEN`/`ODD` tables), so all eight appear across the two pages;
below desktop a five- or six-square post is dealt into two stacked grids so
no square is under about 114px. Measured sizes are the grid's width×height
at 390 / 820 / 1440 (the centre column is 647px at 1440).

| Page · band | Range · placement · cw (desktop) | Measured | What it holds |
| --- | --- | --- | --- |
| Home · Why it matters (Explains) | 1–4 · right · cw | 366×610 / 715×429 / 647×388 | Text; the racemic/homochiral figure; 2001; the field |
| Home · Padres 4, Brewers 3 (Live) | 1–3 · bottom · ccw | 366×549 / 715×477 / 647×431 | Text; 2–1; 47,708 |
| Home · Nobel week (Live) | 1–5 · top · ccw | 366×244+183 / 715×477+358 / 647×404 | Text; the week figure; IceCube; SEK 12M; Dec. 10 |
| Home · Kagan, 1986 (Science) | 1–4 · left · cw | 366×610 / 715×429 / 647×388 | Text; the non-linear-effect figure; 1986; y = x |
| Home · Soai, 1995 and 2003 (Science) | 1–5 · top · cw | 366×244+183 / 715×477+358 / 647×404 | Text; the autocatalysis figure; Tokyo University of Science; 1995; 2003 |
| Home · Why "handed" molecules matter (Explains) | 1–4 · left · ccw | 366×610 / 715×429 / 647×388 | Text; the chirality figure; L · D; 1 of 2 |
| Home · The prize (News) | 1–5 · top · ccw | 366×244+183 / 715×477+358 / 647×404 | Text; the Academy; SEK 12M; 1930; 1950 |
| Explore · Nobel Prize in Chemistry | 1–6 · left · cw | 2×(366×244) / 2×(715×477) / 647×398 | The citation; the press room; 1986; 2003; the worldwide rank; SEK 12M |
| Explore · Six prizes, October 5–12 | 1–6 · right · ccw | 2×(366×244) / 2×(715×477) / 647×398 | Three announced with photographs; three dates to come |
| Explore · three posts | 1–5 · bottom · cw; 1–4 · right · ccw; 1–4 · left · ccw | as above | Soai, Kagan, Why it matters |

Flat modules: the composer (posts nothing), the feed tabs, the right-rail
cards (Premium, What's happening, Who to follow), the action rows (no
counts; the buttons do nothing), and Explore's full trends list.

## The subject

The 2026 Nobel Prize in Chemistry, to Henri B. Kagan and Kenso Soai "for
the discovery of non-linear effects and autocatalysis in asymmetric organic
synthesis": every fact in `src/content.ts` is from the Academy's
[press release](https://www.nobelprize.org/prizes/chemistry/2026/press-release/)
of 7 October 2026 (births, degrees, posts, the 1986, 1995 and 2003 steps,
the prize sum, the committee chair's quotation), NobelPrize.org's
announcements of 5 and 6 October (optogenetics; IceCube), and Wikipedia's
articles on chirality and the Soai reaction (CC BY-SA 4.0, linked). The
figures ([`src/figures.tsx`](src/figures.tsx)) are drawn from the
chemistry, not reproduced from the Academy's illustrations. Photographs
are Wikimedia Commons files under CC BY-SA, credited in the footer and in
[`captures/commons.tsv`](captures/commons.tsv); no photograph of either
laureate is available under a free licence, so the Academy's building and
press room, Soai's university, Halzen, IceCube and Deisseroth stand in.

## How it works

- Post text is a `Fact` ([`src/lib/boxes.tsx`](src/lib/boxes.tsx)) with
  its line fitted by [`src/lib/fit.tsx`](src/lib/fit.tsx), capped at
  120px; the opening of the longer passage sits under it (cut at a
  sentence, `brief`), and More opens the whole passage with its source.
- Every photograph expands to its full frame and credit; the topic card
  expands to both laureates' biographies and the chair's quotation.
- The right rail's trends and Explore's list are the snapshot in the
  aggregator's order, the Nobel entry marked and linked to the topic.
- Light is the app's; dark is "lights out", by device preference. The
  action blue has a text token and a button token per scheme.
- [`captures/scan.cjs`](captures/scan.cjs), Chrome and WebKit, 390 / 820 /
  1440, light and dark, both pages: nothing overflows, no fitted line
  under 12px, axe (WCAG 2.0/2.1/2.2 A/AA, best practice) clean with a More
  open. No screen-reader user has tested it.

## What did not

- No capture, so no side-by-side and no measured tokens; the structure is
  from knowledge of the app.
- The posts are the network's own, because no real post can be
  reproduced and none should be invented in a real person's name. A
  timeline of one voice is not what the reference shows.
- Engagement counts, the thing the reference prints under every post, are
  absent: there are none to print. The action row shows controls only.
- The trends snapshot carries no post counts, so "What's happening" lacks
  the figure the reference puts under each trend.
- The 120px cap leaves a 647px hero mostly ground when the text is short
  (the Padres post); the longer posts fill it.

## Study tools

A floating panel (top right) toggles grid outlines (`g`), band notes (`n`,
which carry each band's range and placement) and reduced motion (`m`).

## Running and deploying

```bash
npm install
npm run dev
```

`npm run build` type-checks and builds to `dist/`; pushing to `main` deploys
to GitHub Pages. The library is consumed from npm at its published version,
never linked locally.
