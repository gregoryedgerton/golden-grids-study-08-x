/**
 * GIFcommit — a fictional social network's signed-in home and Explore on
 * Wednesday, October 7, 2026, the day the Nobel Prize in Chemistry was
 * announced and, for part of the day, the most-trended topic on X
 * worldwide (captures/trends.json records the snapshot and its source).
 *
 * Every post here is by one of the network's own editorial desks and
 * carries facts from the Royal Swedish Academy of Sciences' press release
 * of October 7, 2026, from NobelPrize.org, and from Wikipedia. No post is
 * attributed to a real person; no engagement figure is shown, because
 * none exists. Photographs are Wikimedia Commons files, credited in
 * `CREDITS`; the figures are drawn from the chemistry.
 */
import trends from "./data/trends.json";

export const DATELINE = "Wednesday, October 7, 2026";

/** The opening of a passage, cut at a sentence boundary within `max` characters, for a square's body copy. */
export function brief(text: string, max = 220) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("; "));
  return end > 60 ? cut.slice(0, end + 1) : cut.replace(/\s+\S*$/, "") + "…";
}
export const TRENDS = trends as { captured: string; source: string; earlier: string; us: { rank: number; name: string }[]; worldwide: { rank: number; name: string }[] };

export interface Desk { handle: string; name: string; initial: string; tone: string; bio: string }
export const DESKS: Record<string, Desk> = {
  science: { handle: "GIFcommitScience", name: "GIFcommit Science", initial: "S", tone: "t1", bio: "The network's science desk. Prizes, papers and the people behind them, with the sources linked." },
  news: { handle: "GIFcommitNews", name: "GIFcommit News", initial: "N", tone: "t2", bio: "What is happening now, in order, from the record." },
  explain: { handle: "GIFcommitExplains", name: "GIFcommit Explains", initial: "E", tone: "t3", bio: "One idea at a time. Figures drawn, terms defined." },
  live: { handle: "GIFcommitLive", name: "GIFcommit Live", initial: "L", tone: "t4", bio: "Announcements and games as they happen." },
};

export const ACCOUNT = { name: "Greg", handle: "greg", initial: "G" };

/** A photograph from Wikimedia Commons, with the attribution its licence asks for. */
export interface Photo { src: string; alt: string; credit: string; licence: string; page: string; position?: string }
const P = (file: string, alt: string, credit: string, licence: string, page: string, position?: string): Photo =>
  ({ src: `${import.meta.env.BASE_URL}assets/s08-${file}.jpg`, alt, credit, licence, page, position });
export const PHOTOS = {
  academy: P("academy", "The main building of the Royal Swedish Academy of Sciences in Stockholm, where the chemistry prize is announced", "I99pema", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Royal_Swedish_Academy_of_Sciences_-_main_building_01.jpg", "50% 60%"),
  announcement: P("announcement", "The press room of the Royal Swedish Academy of Sciences during a Nobel Prize in Chemistry announcement (2012)", "Bengt Oberger", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Nobel_Prize_Chemistry_2012_announcement.JPG"),
  tus: P("tus", "Tokyo University of Science, Kagurazaka campus, where Kenso Soai is professor emeritus", "Hexen", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:TokyoUniversityOfScience-Kagurazaka.jpg"),
  halzen: P("halzen", "Francis Halzen, the 2026 physics laureate, speaking at a neutrino telescope workshop in 2025", "Mauro Mezzetto", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Halzen-Neutel.jpg", "50% 20%"),
  icecube: P("icecube", "The IceCube Neutrino Observatory at the South Pole, 2023", "Christopher Michel", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:IceCube_Neutrino_Observatory_in_2023_01.jpg"),
  deisseroth: P("deisseroth", "Karl Deisseroth, one of the three 2026 laureates in physiology or medicine, in 2022", "Christopher Michel", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Karl_Deisseroth_by_Christopher_Michel_01.jpg", "50% 25%"),
} satisfies Record<string, Photo>;
export const CREDITS: Photo[] = Object.values(PHOTOS);

/** The prize, from the Academy's press release of October 7, 2026. */
export const PRIZE = {
  citation: "for the discovery of non-linear effects and autocatalysis in asymmetric organic synthesis",
  amount: "12 million Swedish kronor", amountShort: "SEK 12M", shared: "shared equally between the laureates",
  chair: "Heiner Linke", chairRole: "chair of the Nobel Committee for Chemistry",
  quote: "Henri Kagan and Kenso Soai have provided a solution to a chemical mystery that is over a century old: how homochirality can emerge spontaneously. The chemical reactions they have developed are spectacular.",
  laureates: [
    { name: "Henri B. Kagan", born: "1930", birthplace: "Boulogne-Billancourt, France", phd: "PhD 1960, Collège de France", post: "Professor Emeritus, Université Paris-Sud (Orsay)", step: "1986", did: "discovered non-linear effects: a catalyst that is only partly one-handed can give a product far more one-handed than itself, which let chemists make a greater excess of one mirror image than had been thought possible." },
    { name: "Kenso Soai", born: "1950", birthplace: "Hiroshima, Japan", phd: "PhD 1979, University of Tokyo", post: "Professor Emeritus, Tokyo University of Science", step: "1995 · 2003", did: "designed, in 1995, the first reaction with the potential to be homochiral: its product catalyses its own formation and amplifies whichever hand is in slight excess. In 2003 he showed a reaction forming only one of the two mirror images, which nothing but life had done before." },
  ],
  source: { label: "Press release, NobelPrize.org, 7 Oct 2026", url: "https://www.nobelprize.org/prizes/chemistry/2026/press-release/" },
};

/** The week, from the Nobel Foundation's calendar and the press releases of October 5 and 6. */
export const WEEK = [
  { day: "Mon 5", prize: "Physiology or Medicine", status: "Announced", who: "Karl Deisseroth, Peter Hegemann, Georg Nagel", what: "for their discoveries concerning light-gated ion channels and optogenetics", photo: "deisseroth" as const },
  { day: "Tue 6", prize: "Physics", status: "Announced", who: "Francis Halzen", what: "for decisive contributions to the IceCube Neutrino Observatory and the discovery of high-energy neutrinos of astrophysical origin", photo: "halzen" as const },
  { day: "Wed 7", prize: "Chemistry", status: "Announced today", who: "Henri B. Kagan, Kenso Soai", what: PRIZE.citation, photo: "academy" as const },
  { day: "Thu 8", prize: "Literature", status: "Tomorrow", who: "—", what: "Announced by the Swedish Academy in Stockholm." },
  { day: "Fri 9", prize: "Peace", status: "Friday", who: "—", what: "Announced by the Norwegian Nobel Committee in Oslo." },
  { day: "Mon 12", prize: "Economic Sciences", status: "Monday", who: "—", what: "The Sveriges Riksbank Prize in Economic Sciences in Memory of Alfred Nobel." },
];

/** A fact that fits a square. */
export interface Fact { label: string; line: string; fitClass?: string; body?: string; source?: string; long?: string }

/** The posts: each a band. `desk` is the author; `figure` names a drawing in src/figures.tsx. */
export interface Post {
  id: string; desk: keyof typeof DESKS; time: string; text: string; long?: string[];
  photo?: keyof typeof PHOTOS; photoCaption?: string; figure?: "chirality" | "nonlinear" | "autocatalysis" | "week" | "excess";
  facts?: { label: string; line: string; body?: string; fitClass?: string }[];
  source?: { label: string; url: string };
}
export const POSTS: Post[] = [
  {
    id: "announce", desk: "news", time: "5:47 AM", text: "The 2026 Nobel Prize in Chemistry goes to Henri B. Kagan and Kenso Soai, for the discovery of non-linear effects and autocatalysis in asymmetric organic synthesis.",
    long: [
      "The Royal Swedish Academy of Sciences announced the prize in Stockholm this morning. Kagan, born in 1930 in Boulogne-Billancourt, is professor emeritus at Université Paris-Sud; Soai, born in 1950 in Hiroshima, is professor emeritus at Tokyo University of Science. They share 12 million Swedish kronor equally.",
      "“Henri Kagan and Kenso Soai have provided a solution to a chemical mystery that is over a century old: how homochirality can emerge spontaneously,” said Heiner Linke, chair of the Nobel Committee for Chemistry. “The chemical reactions they have developed are spectacular.”",
    ],
    photo: "academy", photoCaption: "The Royal Swedish Academy of Sciences, Stockholm, this morning",
    facts: [
      { label: "Prize", line: "SEK\n12M", fitClass: "fit--num", body: "Twelve million Swedish kronor, about $1.2 million, shared equally." },
      { label: "Kagan", line: "1930", fitClass: "fit--num", body: "Born in Boulogne-Billancourt, France. PhD 1960, Collège de France." },
      { label: "Soai", line: "1950", fitClass: "fit--num", body: "Born in Hiroshima, Japan. PhD 1979, University of Tokyo." },
    ],
    source: PRIZE.source,
  },
  {
    id: "chirality", desk: "explain", time: "6:20 AM", text: "Why “handed” molecules matter. Many molecules come in two mirror-image forms, like a left and a right hand. Life uses only one of each. The prize is for showing how that one-sidedness can arise.",
    long: [
      "Chemists call a molecule chiral when it cannot be superposed on its mirror image. Amino acids, the building blocks of proteins, are chiral, and the proteins in every cell are built from one of the two forms almost exclusively; the other is rare in nature. Life's chemistry is homochiral, from the Greek for “same” and “hand”.",
      "Left to itself, a reaction that can make either hand makes equal amounts of both. That was the mystery, and the practical problem: in a medicine, usually only one hand has the intended effect, so chemists needed reactions that make one and not the other.",
    ],
    figure: "chirality",
    facts: [
      { label: "Two forms", line: "L · D", body: "The two mirror images of a chiral molecule; a 50:50 mixture is called racemic." },
      { label: "In proteins", line: "1 of 2", fitClass: "fit--num", body: "Living things build proteins from one hand of each amino acid." },
    ],
    source: { label: "Chirality (chemistry), Wikipedia", url: "https://en.wikipedia.org/wiki/Chirality_(chemistry)" },
  },
  {
    id: "kagan", desk: "science", time: "7:05 AM", text: "Kagan's step, 1986: a catalyst need not be perfectly one-handed to give a nearly one-handed product. The output is not proportional to the input. Chemists call this a non-linear effect.",
    long: [
      "Before 1986 the working assumption was linear: a catalyst that was, say, 60 percent one hand would give a product about 60 percent one hand. Kagan showed cases where the product's excess ran well ahead of the catalyst's, and cases where it lagged. The explanation lies in how catalyst molecules pair up: mismatched pairs can be sidelined, leaving the matched majority to do the work.",
      "The practical consequence was large. A chemist no longer needed a perfectly pure catalyst to reach a very pure product, which made asymmetric synthesis cheaper and more reliable, and it opened the question Soai would answer: could the excess feed on itself?",
    ],
    figure: "nonlinear",
    facts: [
      { label: "Kagan", line: "1986", fitClass: "fit--num", body: "The paper describing non-linear effects in asymmetric catalysis." },
      { label: "The rule it broke", line: "y = x", fitClass: "fit--num", body: "Product excess was assumed to track catalyst excess one for one." },
    ],
    source: PRIZE.source,
  },
  {
    id: "soai", desk: "science", time: "7:40 AM", text: "Soai's step, 1995 and 2003: a reaction whose product is its own catalyst. A tiny excess of one hand is amplified round after round, until in 2003 only one mirror image came out. Nothing but life had done that.",
    long: [
      "In the Soai reaction, pyrimidine-5-carbaldehyde is alkylated by diisopropylzinc, and the chiral alcohol that forms catalyses the same reaction, favouring its own hand. A starting excess that is barely measurable grows with each cycle. The reaction has been studied for what it suggests about the origin of homochirality in biological molecules.",
      "The 1995 publication described the design; in 2003 Soai presented a run in which only one of the two possible mirror images was formed. The Academy's words: other than life itself, no one had previously achieved this feat.",
    ],
    figure: "autocatalysis", photo: "tus", photoCaption: "Tokyo University of Science, Kagurazaka",
    facts: [
      { label: "Soai", line: "1995", fitClass: "fit--num", body: "The first reaction designed with the potential to be homochiral." },
      { label: "Soai", line: "2003", fitClass: "fit--num", body: "A reaction forming only one of the two mirror images." },
    ],
    source: { label: "Soai reaction, Wikipedia; press release", url: "https://en.wikipedia.org/wiki/Soai_reaction" },
  },
  {
    id: "week", desk: "live", time: "8:15 AM", text: "Nobel week, day three. Medicine on Monday for optogenetics; physics on Tuesday for IceCube's neutrinos; chemistry today for homochirality. Literature tomorrow, peace on Friday, economics Monday.",
    long: [
      "Monday's prize in physiology or medicine went to Karl Deisseroth, Peter Hegemann and Georg Nagel for their discoveries concerning light-gated ion channels and optogenetics. Tuesday's physics prize went to Francis Halzen for decisive contributions to the IceCube Neutrino Observatory and the discovery of high-energy neutrinos of astrophysical origin.",
      "The literature prize is announced by the Swedish Academy on Thursday, the peace prize by the Norwegian Nobel Committee in Oslo on Friday, and the prize in economic sciences on Monday, October 12. Each prize is 12 million kronor; the ceremonies are on December 10, the anniversary of Alfred Nobel's death.",
    ],
    figure: "week", photo: "icecube", photoCaption: "IceCube, the South Pole: Tuesday's prize",
    facts: [
      { label: "Each prize", line: "SEK\n12M", fitClass: "fit--num", body: "Whether to one laureate, a small group or an organisation." },
      { label: "Ceremony", line: "Dec. 10", body: "Stockholm and Oslo, on the anniversary of Nobel's death." },
    ],
    source: { label: "NobelPrize.org, announcements 5–12 October", url: "https://www.nobelprize.org/" },
  },
  {
    id: "pharma", desk: "explain", time: "9:02 AM", text: "Why it matters outside the lab: most medicines are chiral, and usually one hand works while the other does nothing or does harm. Reactions that make one hand only are how such drugs are made.",
    long: [
      "The Academy's release puts it plainly: in the development of molecules that will interact with living beings, such as pharmaceuticals, only one mirror image will have the desired effect. Kagan's non-linear effects let manufacturers reach high purity without perfect catalysts; Soai's autocatalysis showed that a reaction can be made to choose a hand on its own.",
      "The prize's citation names asymmetric organic synthesis, the branch of chemistry that builds one-handed molecules on purpose. It has been recognised before: the 2001 chemistry prize went to Knowles, Noyori and Sharpless for chirally catalysed reactions. This year's prize is for the mechanism underneath.",
    ],
    figure: "excess",
    facts: [
      { label: "Earlier prize", line: "2001", fitClass: "fit--num", body: "Knowles, Noyori and Sharpless, for chirally catalysed hydrogenation and oxidation." },
      { label: "Field", line: "Asymmetric\nsynthesis", body: "Building one mirror image of a molecule on purpose." },
    ],
    source: PRIZE.source,
  },
];

/** The timeline's non-Nobel posts, for the home feed's variety. */
export const OTHER_POSTS: Post[] = [
  {
    id: "padres", desk: "live", time: "1:12 AM", text: "Padres 4, Brewers 3. San Diego forces Game 4 of the NLDS; Michael King, Sunday's starter, pitched the eighth and ninth for the save in front of 47,708 at Petco Park. Milwaukee still leads 2–1.",
    long: ["Jake Cronenworth's fifth-inning home run put San Diego ahead for good; Christian Yelich's seventh-inning single made it 4–3. Game 4 is Wednesday at 10 p.m. ET at Petco Park."],
    facts: [{ label: "Series", line: "2–1\nMIL", fitClass: "fit--num", body: "Game 4 Wednesday, 10 p.m. ET, FS1." }, { label: "Attendance", line: "47,708", fitClass: "fit--num" }],
    source: { label: "ESPN box score", url: "https://www.espn.com/mlb/game/_/gameId/401908004" },
  },
];

export const WHO_TO_FOLLOW: Desk[] = [DESKS.science, DESKS.explain, DESKS.live];

export const PREMIUM = {
  name: "GIFcommit Premium", price: "$8", period: "a month", pitch: "Longer posts, an edit window, fewer promoted posts, and a share of the network's revenue for creators. Billed yearly.", cta: "Subscribe",
  bullets: ["Edit for an hour after posting", "Half the promoted posts", "Posts up to 25,000 characters"],
};
