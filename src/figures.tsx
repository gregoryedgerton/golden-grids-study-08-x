/**
 * The figures, drawn from the chemistry in the page's own inks. Each has a
 * label that says what it shows; none is a reproduction of the Academy's
 * illustrations.
 */
import { WEEK } from "./content";

/** Two mirror-image molecules: a central carbon with four different groups, and its reflection. */
export function Chirality() {
  const Mol = ({ x, flip }: { x: number; flip: boolean }) => {
    const s = flip ? -1 : 1;
    const c = [x, 110];
    const arms: [number, number, string][] = [[c[0] + s * 0, 50, "A"], [c[0] + s * -52, 140, "B"], [c[0] + s * 52, 140, "C"], [c[0] + s * 14, 165, "D"]];
    return (
      <g>
        {arms.map(([ax, ay, l]) => <line key={l} x1={c[0]} y1={c[1]} x2={ax} y2={ay} className="fig__bond" />)}
        <circle cx={c[0]} cy={c[1]} r="14" className="fig__atom fig__atom--c" />
        {arms.map(([ax, ay, l], i) => <g key={l}><circle cx={ax} cy={ay} r={i === 3 ? 9 : 12} className={`fig__atom fig__atom--${i + 1}`} /><text x={ax} y={ay + 4} className="fig__tag">{l}</text></g>)}
      </g>
    );
  };
  return (
    <svg className="fig" viewBox="0 0 360 200" role="img" aria-label="Two mirror-image forms of a chiral molecule: a central carbon bonded to four different groups, A, B, C and D, and its reflection, which cannot be turned to match it">
      <Mol x={95} flip={false} />
      <line x1="180" y1="20" x2="180" y2="185" className="fig__mirror" />
      <text x="180" y="196" className="fig__cap" textAnchor="middle">mirror</text>
      <Mol x={265} flip />
    </svg>
  );
}

/** Non-linear effects: product excess against catalyst excess, with the linear expectation. */
export function NonLinear() {
  const w = 360, h = 220, pad = 36;
  const x = (v: number) => pad + (v / 100) * (w - pad - 12);
  const y = (v: number) => h - pad + 4 - (v / 100) * (h - pad - 20);
  const pts = (f: (v: number) => number) => Array.from({ length: 21 }, (_, i) => `${x(i * 5).toFixed(1)},${y(f(i * 5)).toFixed(1)}`).join(" ");
  const positive = (v: number) => 100 * (1 - Math.pow(1 - v / 100, 2.6));
  const negative = (v: number) => 100 * Math.pow(v / 100, 2.2);
  return (
    <svg className="fig" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Product excess plotted against catalyst excess: the straight line chemists expected, a curve above it where the product is more one-handed than the catalyst, and a curve below it where it is less">
      <line x1={x(0)} y1={y(0)} x2={x(100)} y2={y(0)} className="fig__axis" />
      <line x1={x(0)} y1={y(0)} x2={x(0)} y2={y(100)} className="fig__axis" />
      <polyline points={pts((v) => v)} className="fig__line fig__line--expected" />
      <polyline points={pts(positive)} className="fig__line fig__line--pos" />
      <polyline points={pts(negative)} className="fig__line fig__line--neg" />
      <text x={x(50)} y={h - 8} className="fig__cap" textAnchor="middle">catalyst excess (ee)</text>
      <text x="10" y={y(50)} className="fig__cap" transform={`rotate(-90 10 ${y(50)})`} textAnchor="middle">product ee</text>
      <text x={x(42)} y={y(positive(42)) - 8} className="fig__cap fig__cap--pos">(+)-NLE</text>
      <text x={x(70)} y={y(negative(70)) + 16} className="fig__cap fig__cap--neg">(−)-NLE</text>
      <text x={x(78)} y={y(78) - 6} className="fig__cap fig__cap--muted" transform={`rotate(-37 ${x(78)} ${y(78)})`}>linear</text>
    </svg>
  );
}

/** Autocatalysis: a slight excess of one hand amplified over cycles of the Soai reaction. */
export function Autocatalysis() {
  const w = 360, h = 220, pad = 36, cycles = 8;
  const x = (i: number) => pad + (i / cycles) * (w - pad - 12);
  const y = (v: number) => h - pad + 4 - ((v + 100) / 200) * (h - pad - 20);
  let ee = 0.6; const series = [ee];
  for (let i = 1; i <= cycles; i++) { ee = 100 * Math.tanh(1.9 * Math.atanh(Math.min(ee, 99.9) / 100)); series.push(ee); }
  return (
    <svg className="fig" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Enantiomeric excess over successive cycles of an autocatalytic reaction: from under one percent toward one hundred, as the product catalyses more of its own hand">
      <line x1={x(0)} y1={y(0)} x2={x(cycles)} y2={y(0)} className="fig__axis fig__axis--mid" />
      <line x1={x(0)} y1={y(-100)} x2={x(0)} y2={y(100)} className="fig__axis" />
      <polyline points={series.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ")} className="fig__line fig__line--pos" />
      {series.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="4" className="fig__dot" />)}
      <text x={x(cycles / 2)} y={h - 8} className="fig__cap" textAnchor="middle">reaction cycles</text>
      <text x={x(0) + 6} y={y(100) + 12} className="fig__cap">+100% one hand</text>
      <text x={x(0) + 6} y={y(-100) - 4} className="fig__cap">−100% the other</text>
      <text x={x(0) + 6} y={y(0) - 6} className="fig__cap fig__cap--muted">racemic</text>
    </svg>
  );
}

/** The week: six prizes on a line, three announced. */
export function Week() {
  const w = 360, h = 160;
  return (
    <svg className="fig" viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`Nobel week: ${WEEK.map((d) => `${d.prize} ${d.status.toLowerCase()}`).join(", ")}`}>
      <line x1="24" y1="70" x2={w - 24} y2="70" className="fig__axis" />
      {WEEK.map((d, i) => {
        const cx = 36 + (i / (WEEK.length - 1)) * (w - 72);
        const done = d.status.startsWith("Announced");
        return (
          <g key={d.prize}>
            <circle cx={cx} cy="70" r={d.status === "Announced today" ? 11 : 8} className={`fig__dot${done ? " fig__dot--done" : " fig__dot--open"}`} />
            <text x={cx} y="40" className="fig__cap" textAnchor="middle">{d.day}</text>
            <text x={cx} y="100" className="fig__cap fig__cap--small" textAnchor="middle">{d.prize.split(" ")[0]}</text>
            {d.prize.split(" ").length > 1 && <text x={cx} y="114" className="fig__cap fig__cap--small" textAnchor="middle">{d.prize.split(" ").slice(1).join(" ")}</text>}
          </g>
        );
      })}
      <text x={w / 2} y="146" className="fig__cap fig__cap--muted" textAnchor="middle">filled: announced · open: to come</text>
    </svg>
  );
}

/** A racemic mixture and a homochiral one, as two rows of hands. */
export function Excess() {
  const cells = (ratio: number, y: number) => Array.from({ length: 16 }, (_, i) => {
    const left = i < Math.round(16 * ratio);
    const x = 24 + i * 20;
    return <path key={i} d={left ? `M${x} ${y + 18} v-14 h5 v-6 h4 v6 h3 v-4 h4 v18 z` : `M${x + 16} ${y + 18} v-14 h-5 v-6 h-4 v6 h-3 v-4 h-4 v18 z`} className={left ? "fig__hand fig__hand--l" : "fig__hand fig__hand--r"} />;
  });
  return (
    <svg className="fig" viewBox="0 0 360 150" role="img" aria-label="Two mixtures of a chiral molecule: a racemic one with equal left and right hands, and a homochiral one with only left hands, which is what life uses and what a medicine needs">
      <text x="24" y="22" className="fig__cap">racemic · 50 : 50</text>
      {cells(0.5, 30)}
      <text x="24" y="92" className="fig__cap">homochiral · 100 : 0</text>
      {cells(1, 100)}
    </svg>
  );
}

export const FIGURES = { chirality: Chirality, nonlinear: NonLinear, autocatalysis: Autocatalysis, week: Week, excess: Excess };
export const FIGURE_CAPTIONS: Record<keyof typeof FIGURES, string> = {
  chirality: "A chiral centre and its mirror image. No rotation makes one match the other.",
  nonlinear: "Kagan, 1986: the product's excess need not follow the catalyst's.",
  autocatalysis: "Soai, 1995–2003: the product catalyses its own hand; a trace becomes all.",
  week: "The six announcements, October 5–12.",
  excess: "What a racemic and a homochiral mixture look like, hand by hand.",
};
